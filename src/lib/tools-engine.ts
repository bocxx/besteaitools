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

/** Get all tools with stats merged in */
export async function getAllTools(): Promise<Tool[]> {
  const [contentEntries, statsMap] = await Promise.all([
    getCollection('tools', ({ data }) => !data.draft),
    loadStats(),
  ]);

  return contentEntries.map((entry) => ({
    ...entry.data,
    stats: statsMap.get(entry.data.slug),
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
