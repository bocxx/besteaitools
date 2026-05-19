/**
 * Tools Engine
 *
 * Merges editorial tool content (Astro collections) with dynamic stats
 * (newsflux JSON). Provides typed query helpers for pages and components.
 */

import { getCollection } from 'astro:content';
import type {
  Tool,
  ToolStats,
  ToolsRadarData,
  ComputedScores,
  ProductHuntStats,
  LaunchRadarViewData,
} from '../types/tools-domain';
import type { ToolCategoryKey, BusinessFunctionKey } from './tools-schema';
import { businessFunctions } from './tools-schema';
import { isExcludedTool } from '../config/excluded-tools';
import { scrubStatsForRelevance } from './stats-relevance';

// ============================================
// STATS LOADER
// ============================================

let _statsCache: Map<string, ToolStats> | null = null;
let _radarCache: ToolsRadarData | null = null;

/** Load ai_tools_radar.json and index by slug */
async function loadStats(): Promise<Map<string, ToolStats>> {
  if (_statsCache) return _statsCache;

  try {
    const raw = await import('../data/reports/ai_tools_radar.json');
    const data = (raw.default ?? raw) as ToolsRadarData;
    _radarCache = data;

    const map = new Map<string, ToolStats>();
    for (const tool of data.tools) {
      map.set(tool.slug, {
        slug: tool.slug,
        buzz_score: tool.buzz_score,
        trend_direction: tool.trend_direction,
        mentions: tool.mentions,
        velocity: tool.velocity,
        source_count: tool.source_count,
        sources: tool.sources,
        phase: tool.phase,
        days_active: tool.days_active,
        history: tool.history,
        github_stars: tool.github_stars,
        github_repos: tool.github_repos,
        github_top_repos: tool.github_top_repos,
        reddit_posts: tool.reddit_posts,
        product_hunt_mentions: tool.product_hunt_mentions,
        newsletter_mentions: tool.newsletter_mentions,
        source_articles: tool.source_articles,
        youtube_videos: tool.youtube_videos ?? [],
        social_posts: tool.social_posts ?? [],
        // v3 fields (optional — populated once newsflux radar generator exports them)
        acceleration: tool.acceleration,
        expert_ratio: tool.expert_ratio,
        peak_mentions: tool.peak_mentions,
        first_seen: tool.first_seen,
        last_seen: tool.last_seen,
        related_terms: tool.related_terms,
        source_breakdown: tool.source_breakdown,
        npm_downloads: tool.npm_downloads,
        pypi_downloads: tool.pypi_downloads,
        status: tool.status,
        status_confidence: tool.status_confidence,
        status_changed_at: tool.status_changed_at,
      });
    }

    _statsCache = map;
    return map;
  } catch {
    // No stats file yet — that's fine
    _statsCache = new Map();
    return _statsCache;
  }
}

/** Get the raw radar data (for sections, trending repos, etc.) */
export async function getRadarData(): Promise<ToolsRadarData | null> {
  await loadStats();
  return _radarCache;
}

// ============================================
// COMPUTED SCORES
// ============================================

/** Weight map for funding stage maturity (higher = more mature) */
const fundingStageWeight: Record<string, number> = {
  bootstrapped: 20, seed: 25, 'series-a': 40, 'series-b': 55,
  'series-c': 70, growth: 85, public: 100,
};

/** Weight map for time-to-first-value (higher = faster) */
const ttfvWeight: Record<string, number> = {
  minutes: 100, hours: 75, days: 45, weeks: 15,
};

/** Weight map for setup complexity (higher = easier) */
const setupWeight: Record<string, number> = {
  low: 100, medium: 55, high: 15,
};

/** Compute all business readiness scores for a tool */
function computeScores(tool: Omit<Tool, 'scores'>): ComputedScores | undefined {
  // provenScore: yearsActive (30%) + g2 (40%) + customers (15%) + funding (15%)
  const customers = tool.notableCustomers ?? [];
  const hasProvenData = tool.yearsActive != null || tool.g2Rating != null
    || customers.length > 0 || tool.fundingStage != null;

  const yearsNorm = tool.yearsActive != null ? Math.min(tool.yearsActive / 10, 1) * 100 : 0;
  const g2Norm = tool.g2Rating != null ? (tool.g2Rating / 5) * 100 : 0;
  const reviewBonus = tool.g2ReviewCount != null ? Math.min(tool.g2ReviewCount / 500, 1) * 100 : 0;
  const g2Combined = tool.g2Rating != null ? (g2Norm * 0.6 + reviewBonus * 0.4) : 0;
  const customersNorm = Math.min(customers.length / 5, 1) * 100;
  const fundingNorm = tool.fundingStage ? (fundingStageWeight[tool.fundingStage] ?? 0) : 0;

  const provenScore = hasProvenData
    ? Math.round(yearsNorm * 0.3 + g2Combined * 0.4 + customersNorm * 0.15 + fundingNorm * 0.15)
    : 0;

  // timeToValueScore: ttfv (40%) + setup (30%) + !developer (15%) + trial (15%)
  const hasTtvData = tool.timeToFirstValue != null || tool.setupComplexity != null
    || tool.requiresDeveloper != null || tool.freeTrialAvailable != null;

  const ttfvNorm = tool.timeToFirstValue ? (ttfvWeight[tool.timeToFirstValue] ?? 0) : 0;
  const setupNorm = tool.setupComplexity ? (setupWeight[tool.setupComplexity] ?? 0) : 0;
  const devNorm = tool.requiresDeveloper != null ? (tool.requiresDeveloper ? 0 : 100) : 0;
  const trialNorm = tool.freeTrialAvailable ? 100 : 0;

  const timeToValueScore = hasTtvData
    ? Math.round(ttfvNorm * 0.4 + setupNorm * 0.3 + devNorm * 0.15 + trialNorm * 0.15)
    : 0;

  // governanceScore: sum of 6 boolean flags, normalized to 0-100
  const govFlags = [tool.gdprReady, tool.euHostingAvailable, tool.dpaAvailable,
    tool.soc2, tool.sso, tool.auditLogs];
  const hasGovData = govFlags.some((f) => f != null);
  const govSum = govFlags.filter(Boolean).length;
  const governanceScore = hasGovData ? Math.round((govSum / 6) * 100) : 0;

  // businessReadinessScore: weighted average of available scores
  const components: { score: number; weight: number }[] = [];
  if (hasProvenData) components.push({ score: provenScore, weight: 0.3 });
  if (hasTtvData) components.push({ score: timeToValueScore, weight: 0.25 });
  if (hasGovData) components.push({ score: governanceScore, weight: 0.2 });
  if (tool.easeOfUseScore != null) components.push({ score: (tool.easeOfUseScore / 10) * 100, weight: 0.25 });

  // If no data at all, don't produce scores
  if (components.length === 0) return undefined;

  // Re-normalize weights if not all components present
  const totalWeight = components.reduce((sum, c) => sum + c.weight, 0);
  const businessReadinessScore = Math.round(
    components.reduce((sum, c) => sum + c.score * (c.weight / totalWeight), 0),
  );

  return { provenScore, timeToValueScore, governanceScore, businessReadinessScore };
}

// ============================================
// CONTENT + STATS MERGE
// ============================================

/**
 * Normalize a hyphenated slug to the space-separated format
 * used by newsflux stats (e.g. "claude-code" → "claude code").
 */
function toStatsSlug(slug: string): string {
  return slug.replace(/-/g, ' ');
}

/** Get all tools with stats merged in */
export async function getAllTools(): Promise<Tool[]> {
  const [contentEntries, statsMap] = await Promise.all([
    getCollection('tools', ({ data }) => !data.draft),
    loadStats(),
  ]);

  return contentEntries
    .filter((entry) => !isExcludedTool(entry.id))
    .map((entry) => {
      const aliasSlugs = (entry.data.mentionAliases ?? []).flatMap((a) => [a, toStatsSlug(a)]);
      const rawStats = statsMap.get(entry.id)
        ?? statsMap.get(toStatsSlug(entry.id))
        ?? aliasSlugs.map((s) => statsMap.get(s)).find(Boolean);
      const stats = rawStats
        ? scrubStatsForRelevance(rawStats, [
            entry.data.name,
            entry.id,
            toStatsSlug(entry.id),
            ...(entry.data.mentionAliases ?? []),
          ])
        : undefined;
      const base = {
        ...entry.data,
        slug: entry.id,
        stats,
      };
      return { ...base, scores: computeScores(base) };
    });
}

/** Get a single tool by slug */
export async function getToolBySlug(slug: string): Promise<Tool | undefined> {
  const tools = await getAllTools();
  return tools.find((t) => t.slug === slug);
}

// ============================================
// FILTERED QUERIES
// ============================================

/** Get tools filtered by category */
export async function getToolsByCategory(category: ToolCategoryKey): Promise<Tool[]> {
  const tools = await getAllTools();
  return tools.filter((t) => t.category === category);
}

/** Get tools sorted by buzz score (highest first) */
export async function getToolsByBuzz(limit?: number): Promise<Tool[]> {
  const tools = await getAllTools();
  const sorted = tools
    .filter((t) => t.stats)
    .sort((a, b) => (b.stats?.buzz_score ?? 0) - (a.stats?.buzz_score ?? 0));
  return limit ? sorted.slice(0, limit) : sorted;
}

/** Get rising tools (velocity > 0, sorted by velocity) */
export async function getRisingTools(limit?: number): Promise<Tool[]> {
  const tools = await getAllTools();
  const rising = tools
    .filter((t) => t.stats && t.stats.trend_direction === 'rising')
    .sort((a, b) => (b.stats?.velocity ?? 0) - (a.stats?.velocity ?? 0));
  return limit ? rising.slice(0, limit) : rising;
}

/** Get tools by pricing model */
export async function getToolsByPricing(model: string): Promise<Tool[]> {
  const tools = await getAllTools();
  return tools.filter((t) => t.pricingModel === model);
}

/** Get tools filtered by trend phase */
export async function getToolsByPhase(phase: string): Promise<Tool[]> {
  const tools = await getAllTools();
  return tools.filter((t) => t.stats?.phase === phase);
}

// ============================================
// SECTIONED QUERIES (based on radar sections)
// ============================================

export interface RadarSections {
  meestBesproken: Tool[];
  stijgers: Tool[];
  nieuw: Tool[];
  githubHot: Tool[];
  productHuntHot: Tool[];
}

/** Get pre-computed radar sections resolved to full Tool objects */
export async function getSectionedTools(): Promise<RadarSections> {
  const [tools, radar] = await Promise.all([getAllTools(), getRadarData()]);
  const sections = radar?.sections;

  // Stats slugs may use spaces; tool slugs use hyphens — normalize both sides
  const resolve = (slugs: string[] = []): Tool[] =>
    slugs
      .map((s) => tools.find((t) => t.slug === s || t.slug === s.replace(/\s+/g, '-')))
      .filter((t): t is Tool => !!t);

  return {
    meestBesproken: resolve(sections?.meest_besproken),
    stijgers: resolve(sections?.stijgers).sort(
      (a, b) => (b.stats?.velocity ?? 0) - (a.stats?.velocity ?? 0),
    ),
    nieuw: resolve(sections?.nieuw),
    githubHot: resolve(sections?.github_hot),
    productHuntHot: resolve(sections?.product_hunt_hot),
  };
}

// ============================================
// BUSINESS FUNCTION QUERIES (zakelijke pagina)
// ============================================

/** Get tools that match a specific business function */
export async function getToolsByBusinessFunction(fn: BusinessFunctionKey): Promise<Tool[]> {
  const tools = await getAllTools();
  return tools
    .filter((t) => t.businessFunctions?.includes(fn))
    .sort((a, b) => (b.stats?.buzz_score ?? 0) - (a.stats?.buzz_score ?? 0));
}

export interface BusinessFunctionSection {
  key: BusinessFunctionKey;
  name: string;
  icon: string;
  color: string;
  description: string;
  tools: Tool[];
}

/** Get all business function sections with their tools (only non-empty) */
export async function getBusinessFunctionSections(): Promise<BusinessFunctionSection[]> {
  const tools = await getAllTools();
  const sections: BusinessFunctionSection[] = [];

  for (const [key, fn] of Object.entries(businessFunctions)) {
    const fnKey = key as BusinessFunctionKey;
    const matched = tools
      .filter((t) => t.businessFunctions?.includes(fnKey))
      .sort((a, b) => (b.stats?.buzz_score ?? 0) - (a.stats?.buzz_score ?? 0));

    if (matched.length > 0) {
      sections.push({
        key: fnKey,
        name: fn.name,
        icon: fn.icon,
        color: fn.color,
        description: fn.description,
        tools: matched,
      });
    }
  }

  return sections;
}

// ============================================
// COMPARISON PAIRS
// ============================================

export interface ComparisonPair {
  slugA: string;
  slugB: string;
  /** URL-safe slug: "claude-vs-chatgpt" */
  comparisonSlug: string;
  toolA: Tool;
  toolB: Tool;
}

/** Generate comparison pairs for the most relevant tool matchups */
export async function getComparisonPairs(): Promise<ComparisonPair[]> {
  const tools = await getAllTools();
  const withStats = tools
    .filter((t) => t.stats)
    .sort((a, b) => (b.stats?.buzz_score ?? 0) - (a.stats?.buzz_score ?? 0));

  const top20 = withStats.slice(0, 20);
  const pairs = new Map<string, ComparisonPair>();

  function addPair(a: Tool, b: Tool) {
    // Alphabetical order for consistent slugs
    const [first, second] = a.slug < b.slug ? [a, b] : [b, a];
    const key = `${first.slug}-vs-${second.slug}`;
    if (!pairs.has(key)) {
      pairs.set(key, {
        slugA: first.slug,
        slugB: second.slug,
        comparisonSlug: key,
        toolA: first,
        toolB: second,
      });
    }
  }

  // Same-category pairs within top 20
  for (let i = 0; i < top20.length; i++) {
    for (let j = i + 1; j < top20.length; j++) {
      if (top20[i].category === top20[j].category) {
        addPair(top20[i], top20[j]);
      }
    }
  }

  // Cross-category pairs for top 10
  const top10 = top20.slice(0, 10);
  for (let i = 0; i < top10.length; i++) {
    for (let j = i + 1; j < top10.length; j++) {
      addPair(top10[i], top10[j]);
    }
  }

  return Array.from(pairs.values());
}

// ============================================
// WEEKLY HIGHLIGHTS
// ============================================

export interface WeeklyHighlights {
  weekLabel: string;
  generatedAt: string;
  toolVanDeWeek: Tool | null;
  stijgers: Tool[];
  dalers: Tool[];
  nieuwkomers: Tool[];
  totalTools: number;
}

/** Compute weekly highlights from current radar data */
export async function getWeeklyHighlights(): Promise<WeeklyHighlights> {
  const [tools, radar, sections] = await Promise.all([
    getAllTools(),
    getRadarData(),
    getSectionedTools(),
  ]);

  const genDate = radar?.generated_at ? new Date(radar.generated_at) : new Date();
  // ISO week number
  const oneJan = new Date(genDate.getFullYear(), 0, 1);
  const weekNum = Math.ceil(((genDate.getTime() - oneJan.getTime()) / 86400000 + oneJan.getDay() + 1) / 7);
  const weekLabel = `${genDate.getFullYear()}-w${String(weekNum).padStart(2, '0')}`;

  const withStats = tools.filter((t) => t.stats);

  // Stijgers: top 5 by velocity
  const stijgers = [...withStats]
    .filter((t) => t.stats!.velocity > 0)
    .sort((a, b) => (b.stats?.velocity ?? 0) - (a.stats?.velocity ?? 0))
    .slice(0, 5);

  // Dalers: bottom 5 by velocity (negative)
  const dalers = [...withStats]
    .filter((t) => t.stats!.velocity < -0.1)
    .sort((a, b) => (a.stats?.velocity ?? 0) - (b.stats?.velocity ?? 0))
    .slice(0, 5);

  // Tool van de week: highest buzz × positive velocity
  const candidates = withStats.filter((t) => t.stats!.velocity > 0);
  const toolVanDeWeek = candidates.length > 0
    ? candidates.sort((a, b) => {
        const scoreA = (a.stats?.buzz_score ?? 0) * Math.log2(2 + (a.stats?.velocity ?? 0));
        const scoreB = (b.stats?.buzz_score ?? 0) * Math.log2(2 + (b.stats?.velocity ?? 0));
        return scoreB - scoreA;
      })[0]
    : null;

  return {
    weekLabel,
    generatedAt: radar?.generated_at ?? new Date().toISOString(),
    toolVanDeWeek,
    stijgers,
    dalers,
    nieuwkomers: sections.nieuw.slice(0, 5),
    totalTools: tools.length,
  };
}

// ============================================
// RADAR METADATA
// ============================================

// ============================================
// LAUNCH RADAR
// ============================================

/** Stats sub-object on a launch item (aggregated at pipeline time) */
export interface LaunchItemStats {
  points?: number;
  followers?: number;
  stars?: number;
  total_stars?: number;
  day_rank?: number;
  launch_count?: number;
}

export interface LaunchItem {
  name: string;
  description: string;
  url: string;
  favicon: string;
  date: string;
  source: 'product_hunt' | 'github' | 'hackernews' | 'twitter' | 'bluesky';
  source_label: string;
  risk_flags?: { category: string; label_nl: string; hits: number; matched: string[] }[];
  stars?: number;
  total_stars?: number;
  repo?: string;
  points?: number;
  hn_url?: string;
  /** Product Hunt stats (merged from ph_launch_stats.json at build time) */
  ph?: ProductHuntStats;
  /** Aggregated stats from pipeline */
  stats?: LaunchItemStats;
  /** Dutch description (from enrichment) */
  description_nl?: string;
  /** Pre-formatted display description */
  display_description?: string;
  /** Dutch source label */
  source_label_nl?: string;
  /** Pre-formatted display source label */
  display_source_label?: string;
  /** Category slug */
  category?: string;
  /** Dutch category label */
  category_nl?: string;
  /** Number of comments (HN) */
  num_comments?: number;
  /** Previous launches on PH */
  previous_launches?: { date: string; points: number }[];
  /** Website URL (distinct from the launch/source URL) */
  website_url?: string;
  /** PH tagline */
  tagline?: string;
  /** PH direct post URL */
  product_hunt_url?: string;
  /** Whether PH enrichment was applied */
  product_hunt_enriched?: boolean;
  /** PH day rank (top-level, also in stats) */
  day_rank?: number;
  /** PH followers (top-level, also in stats) */
  followers?: number;
  /** PH launch count (top-level, also in stats) */
  launch_count?: number;
}

export interface LaunchRadarData {
  generated_at: string;
  window_days: number;
  total_launches: number;
  by_source: Record<string, number>;
  launches: LaunchItem[];
}

/** Extract product slug from a PH product URL */
function extractPhProductSlug(url: string): string | null {
  const match = url.match(/producthunt\.com\/products\/([^/?#]+)/);
  return match ? match[1] : null;
}

/** Load ph_launch_stats.json sidecar */
async function loadPhLaunchStats(): Promise<Record<string, ProductHuntStats>> {
  try {
    const raw = await import('../data/reports/ph_launch_stats.json');
    return (raw.default ?? raw) as Record<string, ProductHuntStats>;
  } catch {
    return {};
  }
}

/** Load launch_radar.json and merge PH stats */
export async function getLaunchRadar(): Promise<LaunchRadarData | null> {
  try {
    const [raw, phStats] = await Promise.all([
      import('../data/reports/launch_radar.json'),
      loadPhLaunchStats(),
    ]);
    const data = (raw.default ?? raw) as LaunchRadarData;

    // Merge PH stats into launch items
    if (Object.keys(phStats).length > 0) {
      data.launches = data.launches.map((launch) => {
        if (launch.source !== 'product_hunt') return launch;
        const slug = extractPhProductSlug(launch.url);
        if (slug && phStats[slug]) {
          return { ...launch, ph: phStats[slug] };
        }
        return launch;
      });
    }

    return data;
  } catch {
    return null;
  }
}


export async function getLaunchRadarViewData(): Promise<LaunchRadarViewData | null> {
  const data = await getLaunchRadar();
  if (!data) return null;

  const sourceOrder = ['product_hunt', 'github', 'hackernews', 'twitter', 'bluesky'] as const;

  const sourceLabels: Record<string, string> = {
    product_hunt: 'Product Hunt',
    github: 'GitHub',
    hackernews: 'Hacker News',
    twitter: 'X / Twitter',
    bluesky: 'Bluesky',
  };

  const launches = [...(data.launches ?? [])];

  const scoreLaunch = (launch: LaunchItem) => {
    const stats = launch.stats ?? {};
    const points = stats.points ?? launch.points ?? 0;
    const followers = stats.followers ?? 0;
    const stars = stats.stars ?? launch.stars ?? 0;
    const totalStars = stats.total_stars ?? launch.total_stars ?? 0;
    const dayRank = stats.day_rank ?? launch.day_rank ?? 0;
    const riskBonus = (launch.risk_flags?.length ?? 0) * 3;

    return (
      points * 3 +
      followers * 1.5 +
      stars * 2 +
      totalStars * 0.15 +
      (dayRank > 0 ? Math.max(0, 20 - dayRank * 2) : 0) +
      riskBonus
    );
  };

  launches.sort((a, b) => scoreLaunch(b) - scoreLaunch(a));

  const featured = launches.slice(0, 3);
  const latest = [...launches]
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
    .slice(0, 12);

  const sections = sourceOrder
    .map((key) => {
      const sectionLaunches = launches.filter((launch) => launch.source === key);
      return {
        key,
        label: sourceLabels[key],
        count: sectionLaunches.length,
        launches: sectionLaunches,
      };
    })
    .filter((section) => section.count > 0);

  return {
    generatedAt: data.generated_at,
    windowDays: data.window_days,
    totalLaunches: data.total_launches,
    bySource: data.by_source ?? {},
    featured,
    sections,
    latest,
  };
}

/** Get radar generation timestamp */
export async function getRadarTimestamp(): Promise<string | null> {
  const radar = await getRadarData();
  return radar?.generated_at ?? null;
}

/** Get total tools tracked in stats */
export async function getRadarToolCount(): Promise<number> {
  const radar = await getRadarData();
  return radar?.total_tools_tracked ?? 0;
}
