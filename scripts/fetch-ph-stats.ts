/**
 * fetch-ph-stats.ts
 *
 * Fetches Product Hunt post stats via the PH GraphQL API v2 and writes
 * src/data/reports/ph_launch_stats.json — a product-slug → stats map that
 * tools-engine.ts merges into LaunchItem at build time.
 *
 * Usage:
 *   PRODUCTHUNT_TOKEN=<your_dev_token> npm run fetch-ph-stats
 */

import { promises as fs } from 'node:fs';
import path from 'node:path';

// ============================================
// CONFIG
// ============================================

const PH_API_URL = 'https://api.producthunt.com/v2/api/graphql';
const ROOT = process.cwd();
const LAUNCH_RADAR_PATH = path.join(ROOT, 'src', 'data', 'reports', 'launch_radar.json');
const OUTPUT_PATH = path.join(ROOT, 'src', 'data', 'reports', 'ph_launch_stats.json');

// ============================================
// TYPES
// ============================================

interface PhPost {
  name: string;
  slug: string;
  tagline: string;
  votesCount: number;
  commentsCount: number;
  reviewsCount: number;
  reviewsRating: number;
  url: string;
  website: string;
  dailyRank: number | null;
  thumbnail: { url: string } | null;
}

interface PhPostEdge {
  node: PhPost;
}

interface PhPostsResponse {
  data: {
    posts: {
      edges: PhPostEdge[];
      pageInfo: {
        hasNextPage: boolean;
        endCursor: string | null;
      };
    };
  };
  errors?: { message: string }[];
}

interface LaunchItem {
  name: string;
  url: string;
  source: string;
}

interface LaunchRadar {
  window_days: number;
  launches: LaunchItem[];
}

interface OutputStats {
  votesCount: number;
  commentsCount: number;
  reviewsRating: number;
  reviewsCount: number;
  thumbnailUrl?: string;
  phPostUrl: string;
  dailyRank?: number;
}

// ============================================
// GRAPHQL
// ============================================

const POSTS_QUERY = `
query RecentPosts($after: String, $postedAfter: DateTime) {
  posts(first: 20, after: $after, postedAfter: $postedAfter, featured: true) {
    edges {
      node {
        name
        slug
        tagline
        votesCount
        commentsCount
        reviewsCount
        reviewsRating
        url
        website
        dailyRank
        thumbnail {
          url
        }
      }
    }
    pageInfo {
      hasNextPage
      endCursor
    }
  }
}
`;

/** Delay helper for rate-limit backoff */
function delay(ms: number): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

async function fetchPosts(token: string, postedAfter: string): Promise<PhPost[]> {
  const allPosts: PhPost[] = [];
  let cursor: string | null = null;
  let page = 0;
  const MAX_PAGES = 30; // safety cap (~600 featured posts)

  while (page < MAX_PAGES) {
    page++;
    const variables: Record<string, unknown> = { postedAfter };
    if (cursor) variables.after = cursor;

    const res = await fetch(PH_API_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ query: POSTS_QUERY, variables }),
    });

    // Handle rate limiting gracefully — return partial results
    if (res.status === 429) {
      const remaining = res.headers.get('x-rate-limit-remaining');
      const resetIn = res.headers.get('x-rate-limit-reset');
      console.warn(`⚠️  Rate limited after ${allPosts.length} posts (remaining: ${remaining}, reset in: ${resetIn}s)`);
      console.warn('   Returning partial results.');
      break;
    }

    if (!res.ok) {
      const text = await res.text();
      throw new Error(`PH API error ${res.status}: ${text}`);
    }

    const json = (await res.json()) as PhPostsResponse;

    if (json.errors?.length) {
      // Rate limit can also come as a GraphQL error
      const rateLimitErr = json.errors.find((e) => e.message.includes('rate_limit'));
      if (rateLimitErr) {
        console.warn(`⚠️  Rate limited (GraphQL) after ${allPosts.length} posts. Returning partial results.`);
        break;
      }
      console.error('GraphQL errors:', json.errors);
      break;
    }

    const edges = json.data.posts.edges;
    for (const edge of edges) {
      allPosts.push(edge.node);
    }

    console.log(`  Page ${page}: fetched ${edges.length} posts (total: ${allPosts.length})`);

    if (!json.data.posts.pageInfo.hasNextPage) break;
    cursor = json.data.posts.pageInfo.endCursor;

    // Small delay to be respectful of rate limits
    await delay(200);
  }

  return allPosts;
}

// ============================================
// MATCHING
// ============================================

/** Extract product slug from a PH product URL (/products/<slug>) */
function extractProductSlug(url: string): string | null {
  const match = url.match(/producthunt\.com\/products\/([^/?#]+)/);
  return match ? match[1] : null;
}

/** Extract post slug from a PH post URL (/posts/<slug>) */
function extractPostSlug(url: string): string | null {
  const match = url.match(/producthunt\.com\/posts\/([^/?#]+)/);
  return match ? match[1] : null;
}

/** Normalize a name for fuzzy matching */
function normalize(name: string): string {
  return name.toLowerCase().replace(/[^a-z0-9]/g, '');
}

// ============================================
// MAIN
// ============================================

async function main() {
  const token = process.env.PRODUCTHUNT_TOKEN;
  if (!token) {
    console.error('❌ Missing PRODUCTHUNT_TOKEN environment variable.');
    console.error('   Set it via: PRODUCTHUNT_TOKEN=<your_dev_token> npm run fetch-ph-stats');
    process.exit(1);
  }

  // 1. Read launch_radar.json
  const radarRaw = await fs.readFile(LAUNCH_RADAR_PATH, 'utf8');
  const radar = JSON.parse(radarRaw) as LaunchRadar;

  // Get PH-sourced launches and their product slugs
  const phLaunches = radar.launches.filter((l) => l.source === 'product_hunt');
  const productSlugs = new Map<string, LaunchItem>();
  for (const launch of phLaunches) {
    const slug = extractProductSlug(launch.url);
    if (slug) productSlugs.set(slug, launch);
  }

  console.log(`📦 ${phLaunches.length} PH launches found, ${productSlugs.size} unique product slugs`);

  // 2. Fetch recent posts from PH API
  const windowDays = radar.window_days || 7;
  const postedAfter = new Date(Date.now() - windowDays * 24 * 60 * 60 * 1000).toISOString();
  console.log(`🔍 Fetching PH posts since ${postedAfter.split('T')[0]}...`);

  const posts = await fetchPosts(token, postedAfter);
  console.log(`✅ Fetched ${posts.length} posts from PH API`);

  // 3. Build indexes for matching
  const postsBySlug = new Map<string, PhPost>();
  const postsByName = new Map<string, PhPost>();
  for (const post of posts) {
    const postSlug = extractPostSlug(post.url);
    if (postSlug) postsBySlug.set(postSlug, post);
    postsByName.set(normalize(post.name), post);
  }

  // 4. Match launches to posts
  const output: Record<string, OutputStats> = {};
  let matched = 0;

  for (const [productSlug, launch] of productSlugs) {
    // Try matching by slug first (product slug often matches post slug)
    let post = postsBySlug.get(productSlug);

    // Fallback: match by normalized name
    if (!post) {
      post = postsByName.get(normalize(launch.name));
    }

    if (post) {
      matched++;
      output[productSlug] = {
        votesCount: post.votesCount,
        commentsCount: post.commentsCount,
        reviewsRating: post.reviewsRating,
        reviewsCount: post.reviewsCount,
        thumbnailUrl: post.thumbnail?.url,
        phPostUrl: post.url,
        ...(post.dailyRank != null && { dailyRank: post.dailyRank }),
      };
    }
  }

  console.log(`🎯 Matched ${matched}/${productSlugs.size} launches to PH posts`);

  // 5. Write output
  await fs.writeFile(OUTPUT_PATH, JSON.stringify(output, null, 2) + '\n', 'utf8');
  console.log(`💾 Written to ${path.relative(ROOT, OUTPUT_PATH)}`);
}

main().catch((err) => {
  console.error('Fatal error:', err);
  process.exit(1);
});
