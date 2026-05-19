/**
 * Stats relevance filter
 *
 * Newsflux matches tool mentions across nieuws/social/YouTube partly via substring,
 * which produces false positives for short names (v0, dall-e, n8n, flux). For
 * example "v0" matches the substring inside t.co shortlinks like "HwUH0Mn0V0".
 *
 * This filter scrubs each ToolStats so only items that explicitly mention the
 * tool name as a whole word (after stripping URLs) survive.
 */

import type { ToolStats, SocialPost, SourceArticle, YoutubeVideo } from '../types/tools-domain';

const URL_RE = /https?:\/\/\S+/gi;

function escapeRe(s: string): string {
  return s.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}

function stripUrls(text: string): string {
  return text.replace(URL_RE, ' ');
}

/** Build a single regex that matches any of the given signals as a whole word. */
function buildSignalRe(signals: string[]): RegExp | null {
  const cleaned = signals
    .map((s) => s.trim().toLowerCase())
    .filter((s) => s.length >= 2);
  if (cleaned.length === 0) return null;
  const alts = [...new Set(cleaned)].map(escapeRe).join('|');
  return new RegExp(`(?:^|\\W)(?:${alts})(?:\\W|$)`, 'i');
}

function isRelevant(haystack: string, re: RegExp): boolean {
  return re.test(stripUrls(haystack).toLowerCase());
}

function filterArticles(items: SourceArticle[], re: RegExp): SourceArticle[] {
  return items.filter((a) => {
    const blob = [a.title, a.title_nl, a.snippet, a.summary_nl].filter(Boolean).join(' ');
    return isRelevant(blob, re);
  });
}

function filterVideos(items: YoutubeVideo[], re: RegExp): YoutubeVideo[] {
  return items.filter((v) => isRelevant(`${v.title} ${v.channel}`, re));
}

function filterSocial(items: SocialPost[], re: RegExp): SocialPost[] {
  return items.filter((p) => isRelevant(p.text, re));
}

/**
 * Return a copy of `stats` with off-topic articles, videos, and social posts removed.
 * `signals` should include the editorial tool name and any aliases / slug variants.
 */
export function scrubStatsForRelevance(stats: ToolStats, signals: string[]): ToolStats {
  const re = buildSignalRe(signals);
  if (!re) return stats;

  return {
    ...stats,
    source_articles: filterArticles(stats.source_articles ?? [], re),
    youtube_videos: filterVideos(stats.youtube_videos ?? [], re),
    social_posts: filterSocial(stats.social_posts ?? [], re),
  };
}
