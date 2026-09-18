/**
 * Eén plek die bepaalt of een pagina geïndexeerd mag worden.
 * Gebruikt door src/layouts/Layout.astro (robots-meta) én astro.config.mjs
 * (sitemap-filter), zodat die twee nooit uit elkaar lopen: een pagina met
 * `noindex` hoort niet in de sitemap, en omgekeerd.
 *
 * Regels (DBAT-snoeiaanpak, 18 sep 2026):
 *  1. Paden in src/data/seo-noindex.json → noindex, follow.
 *  2. /vergelijk/<a>-vs-<b> is alleen indexeerbaar als het paar in
 *     src/data/comparison-index.json staat. Automatisch gegenereerde paren
 *     zijn standaard noindex tot ze bewezen waarde hebben.
 */
import noindexData from '../data/seo-noindex.json' with { type: 'json' };
import comparisonIndex from '../data/comparison-index.json' with { type: 'json' };

const NOINDEX_PATHS = new Set(noindexData.paths ?? []);
const INDEXABLE_COMPARISONS = new Set(comparisonIndex.slugs ?? []);

/** @param {string} pathname — met of zonder trailing slash */
export function isNoindexPath(pathname) {
  const p = pathname !== '/' ? pathname.replace(/\/+$/, '') || '/' : pathname;
  if (NOINDEX_PATHS.has(p)) return true;
  const vs = p.match(/^\/vergelijk\/([^/]+-vs-[^/]+)$/);
  if (vs) return !INDEXABLE_COMPARISONS.has(vs[1]);
  return false;
}

export const NOINDEX_ROBOTS = 'noindex, follow';
