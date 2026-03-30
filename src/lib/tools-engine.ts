/**
 * Tools Engine
 *
 * Merges editorial tool content (Astro collections) with dynamic stats
 * (newsflux JSON). Provides typed query helpers for pages and components.
 */

import { getCollection } from 'astro:content';
import type { Tool, ToolStats, ToolsRadarData } from '../types/tools-domain';
import type { ToolCategoryKey } from './tools-schema';

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

  return contentEntries.map((entry) => ({
    ...entry.data,
    slug: entry.id,
    stats: statsMap.get(entry.id) ?? statsMap.get(toStatsSlug(entry.id)),
  }));
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
