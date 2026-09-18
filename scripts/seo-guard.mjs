#!/usr/bin/env node
/**
 * SEO-poort na elke build (draait als postbuild, dus ook in CI vóór deploy).
 *
 * Aanleiding (18 sep 2026): debesteaitools.nl verloor in juni vrijwel al zijn
 * Google-zichtbaarheid. Onder de oorzaken zaten fouten die geen enkele check
 * ving: 298 noindex-pagina's in de sitemap, redirect-pagina's in de sitemap,
 * 26 kapotte interne links, en _redirects-regels die live niet werkten.
 * Deze poort maakt van zulke fouten een mislukte build.
 *
 * FOUT (build faalt):
 *   - sitemap-URL zonder gebouwde pagina (en geen on-demand route)
 *   - sitemap-URL met `noindex` of een meta-refresh ("Redirecting…"-stub)
 *   - sitemap-URL waarvan de canonical niet exact die URL is
 *   - interne link naar een pagina die niet bestaat (404)
 * WAARSCHUWING (build gaat door):
 *   - interne link naar een URL uit public/_redirects (onnodige redirect-hop)
 *
 * Gebruik: node scripts/seo-guard.mjs [--dist dist/client]
 */
import { readFileSync, existsSync, readdirSync, statSync } from 'node:fs';
import { join, relative } from 'node:path';

const argDist = process.argv.indexOf('--dist');
const DIST = argDist > -1 ? process.argv[argDist + 1] : 'dist/client';
const SITE = 'https://debesteaitools.nl';

// Routes met `prerender = false`: bestaan alleen on-demand, niet als bestand.
const SSR_ROUTES = new Set(['/nieuws', '/radar', '/digest', '/launch-radar', '/weekradar']);
const SSR_PREFIXES = ['/api/'];

if (!existsSync(join(DIST, 'sitemap-0.xml'))) {
  console.error(`seo-guard: ${DIST}/sitemap-0.xml ontbreekt — draai eerst astro build.`);
  process.exit(1);
}

const norm = (p) => {
  let x = p.split('#')[0].split('?')[0];
  try { x = decodeURI(x); } catch { /* laat staan */ }
  return x !== '/' ? x.replace(/\/+$/, '') || '/' : x;
};

function pageFile(pathname) {
  if (pathname === '/') return join(DIST, 'index.html');
  for (const c of [join(DIST, pathname, 'index.html'), join(DIST, `${pathname}.html`)]) {
    if (existsSync(c)) return c;
  }
  return null;
}
const isAsset = (pathname) => {
  const f = join(DIST, pathname);
  return existsSync(f) && statSync(f).isFile();
};
const isSsr = (p) => SSR_ROUTES.has(p) || SSR_PREFIXES.some((x) => p.startsWith(x));

// _redirects-bronnen (exact + splat)
const redirectExact = new Set();
const redirectSplats = [];
try {
  for (const line of readFileSync(join(DIST, '_redirects'), 'utf-8').split(/\r?\n/)) {
    const t = line.trim();
    if (!t || t.startsWith('#')) continue;
    const [from] = t.split(/\s+/);
    if (from.endsWith('/*')) redirectSplats.push(from.slice(0, -1));
    else redirectExact.add(norm(from));
  }
} catch { /* geen _redirects */ }
const isRedirect = (p) => redirectExact.has(p) || redirectSplats.some((s) => (p + '/').startsWith(s));

const errors = [];
const warnings = [];

// ── 1. Sitemap ────────────────────────────────────────────────────────────
const sitemapXml = readdirSync(DIST)
  .filter((f) => /^sitemap-\d+\.xml$/.test(f))
  .map((f) => readFileSync(join(DIST, f), 'utf-8'))
  .join('\n');
const locs = [...sitemapXml.matchAll(/<loc>([^<]+)<\/loc>/g)].map((m) => m[1]);
for (const loc of locs) {
  const p = norm(loc.replace(SITE, '') || '/');
  if (isRedirect(p)) { errors.push(`sitemap bevat redirect-URL: ${p}`); continue; }
  const file = pageFile(p);
  if (!file) {
    if (!isSsr(p)) errors.push(`sitemap-URL zonder pagina: ${p}`);
    continue;
  }
  const html = readFileSync(file, 'utf-8');
  const robots = html.match(/<meta name="robots" content="([^"]*)"/)?.[1] ?? '';
  if (/noindex/i.test(robots)) errors.push(`sitemap bevat noindex-pagina: ${p}`);
  if (/<meta http-equiv="refresh"/i.test(html)) errors.push(`sitemap bevat redirect-stub: ${p}`);
  const canonical = html.match(/<link rel="canonical" href="([^"]*)"/)?.[1];
  const expected = p === '/' ? `${SITE}/` : `${SITE}${p}`;
  if (!canonical) errors.push(`geen canonical: ${p}`);
  else if (canonical !== expected && canonical !== loc) {
    errors.push(`canonical wijkt af: ${p} → ${canonical}`);
  }
}

// ── 2. Interne links op alle gebouwde pagina's ────────────────────────────
function* htmlFiles(dir) {
  for (const e of readdirSync(dir, { withFileTypes: true })) {
    const f = join(dir, e.name);
    if (e.isDirectory()) { if (e.name !== 'assets' && e.name !== 'pagefind') yield* htmlFiles(f); }
    else if (e.name.endsWith('.html')) yield f;
  }
}
const broken = new Map();
const viaRedirect = new Map();
let pages = 0;
for (const file of htmlFiles(DIST)) {
  const rel = '/' + relative(DIST, file).replace(/index\.html$/, '').replace(/\.html$/, '');
  if (rel === '/404') continue;
  pages++;
  const html = readFileSync(file, 'utf-8');
  const robots = html.match(/<meta name="robots" content="([^"]*)"/)?.[1] ?? '';
  if (/http-equiv="refresh"/i.test(html)) continue; // redirect-stubs overslaan
  for (const m of html.matchAll(/href="(\/[^"]*)"/g)) {
    const raw = m[1];
    if (raw.startsWith('//')) continue;
    const p = norm(raw);
    if (!p || p.startsWith('/_') || p.startsWith('/cdn-cgi/')) continue;
    if (isRedirect(p)) { (viaRedirect.get(p) ?? viaRedirect.set(p, new Set()).get(p)).add(norm(rel)); continue; }
    if (pageFile(p) || isAsset(p) || isSsr(p)) continue;
    (broken.get(p) ?? broken.set(p, new Set()).get(p)).add(norm(rel) + (robots.includes('noindex') ? ' (noindex)' : ''));
  }
}
for (const [target, from] of broken) {
  errors.push(`kapotte interne link: ${target} ← ${[...from].slice(0, 3).join(', ')}${from.size > 3 ? ` (+${from.size - 3})` : ''}`);
}
for (const [target, from] of viaRedirect) {
  warnings.push(`link via redirect: ${target} ← ${[...from].slice(0, 2).join(', ')}${from.size > 2 ? ` (+${from.size - 2})` : ''}`);
}

console.log(`seo-guard: ${locs.length} sitemap-URL's, ${pages} pagina's gecontroleerd.`);
for (const w of warnings.slice(0, 20)) console.warn(`  ⚠ ${w}`);
if (warnings.length > 20) console.warn(`  ⚠ … en nog ${warnings.length - 20} waarschuwingen`);
if (errors.length) {
  for (const e of errors.slice(0, 50)) console.error(`  ✗ ${e}`);
  if (errors.length > 50) console.error(`  ✗ … en nog ${errors.length - 50} fouten`);
  console.error(`seo-guard: ${errors.length} fout(en) — build afgekeurd.`);
  process.exit(1);
}
console.log('seo-guard: ✓ geen fouten.');
