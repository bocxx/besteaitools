import { defineConfig, fontProviders } from 'astro/config';
import cloudflare from '@astrojs/cloudflare';
import sitemap from '@astrojs/sitemap';
import react from '@astrojs/react';
import markdoc from '@astrojs/markdoc';
import rehypeExternalLinks from 'rehype-external-links';
import { readdirSync, readFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';

const isDev = process.argv.includes('dev');

// ── Sitemap-lastmod uit echte contentdata ────────────────────────────────────
// Voorheen kreeg elke URL `new Date()` als lastmod — dan lijkt bij elke build
// de hele site gewijzigd en is het signaal voor Google waardeloos (audit
// juli 2026). Hier bouwen we één keer per build een map pathname → echte
// datum uit de content zelf; URL's zonder betrouwbare datum krijgen géén
// lastmod (beter geen signaal dan een vals signaal).
const contentDir = (p) => fileURLToPath(new URL(`./src/content/${p}`, import.meta.url));

function parseDate(value) {
  if (!value) return null;
  const d = new Date(value);
  return Number.isNaN(d.getTime()) ? null : d;
}

function latestOf(...dates) {
  const valid = dates.filter(Boolean);
  return valid.length
    ? new Date(Math.max(...valid.map((d) => d.getTime())))
    : null;
}

/** Datumveld(en) uit markdown-frontmatter halen (alleen platte
 *  `key: 2026-06-09`-regels — geen yaml-dependency nodig). */
function frontmatterDate(raw, keys) {
  const fm = raw.match(/^---\r?\n([\s\S]*?)\r?\n---/);
  if (!fm) return null;
  const found = [];
  for (const key of keys) {
    const m = fm[1].match(
      new RegExp(`^${key}:\\s*["']?(\\d{4}-\\d{2}-\\d{2}[^"'\\r\\n]*)`, 'm'),
    );
    if (m) {
      const d = parseDate(m[1].trim());
      if (d) found.push(d);
    }
  }
  return latestOf(...found);
}

function buildLastmodMaps() {
  const pathDates = new Map(); // pathname (zonder trailing slash) → Date
  const toolDates = new Map(); // tool-slug → Date (voor /vergelijk/a-vs-b)

  // Tools → /ai-tools/<slug> (slug = bestandsnaam, zie tools-engine entry.id)
  try {
    for (const file of readdirSync(contentDir('tools'))) {
      if (!file.endsWith('.json')) continue;
      try {
        const data = JSON.parse(readFileSync(`${contentDir('tools')}/${file}`, 'utf-8'));
        const date = latestOf(parseDate(data.lastUpdated), parseDate(data.lastReviewedAt));
        if (!date) continue;
        const slug = file.replace(/\.json$/, '');
        pathDates.set(`/ai-tools/${slug}`, date);
        toolDates.set(slug, date);
      } catch { /* kapot json-bestand: gewoon geen lastmod */ }
    }
  } catch { /* map ontbreekt: geen lastmods */ }

  // Markdown-collecties → /nieuws/<slug> en /digest/<slug>
  const mdCollections = [
    { dir: 'nieuws', route: '/nieuws', keys: ['updatedAt', 'publishedAt'] },
    { dir: 'digest', route: '/digest', keys: ['date'] },
  ];
  for (const { dir, route, keys } of mdCollections) {
    try {
      for (const file of readdirSync(contentDir(dir))) {
        if (!file.endsWith('.md') || file === 'README.md') continue;
        try {
          const raw = readFileSync(`${contentDir(dir)}/${file}`, 'utf-8');
          const date = frontmatterDate(raw, keys);
          if (date) pathDates.set(`${route}/${file.replace(/\.md$/, '')}`, date);
        } catch { /* onleesbaar bestand: geen lastmod */ }
      }
    } catch { /* map ontbreekt: geen lastmods */ }
  }

  return { pathDates, toolDates };
}

const { pathDates: sitemapPathDates, toolDates: sitemapToolDates } = buildLastmodMaps();

/** Echte lastmod voor een pathname, of null als er geen betrouwbare datum is.
 *  Vergelijk-pagina's krijgen de jongste datum van de twee vergeleken tools. */
function lastmodFor(pathname) {
  const direct = sitemapPathDates.get(pathname);
  if (direct) return direct;
  const vs = pathname.match(/^\/vergelijk\/(.+)-vs-(.+)$/);
  if (vs) {
    return latestOf(sitemapToolDates.get(vs[1]), sitemapToolDates.get(vs[2]));
  }
  return null;
}

export default defineConfig({
  site: 'https://debesteaitools.nl',
  // 'server' mode so /api/* routes run at request time. Every existing
  // page opts back into prerendering via `export const prerender = true`
  // so static build output is unchanged.
  output: 'server',
  adapter: cloudflare(),
  // Brand fonts via the Astro Fonts API — matches the astro-starter look:
  // Boldonse (display/logo), Geist (body/UI), JetBrains Mono.
  fonts: [
    {
      provider: fontProviders.fontsource(),
      name: 'Boldonse',
      cssVariable: '--font-boldonse',
      weights: [400],
      styles: ['normal'],
      subsets: ['latin', 'latin-ext'],
      fallbacks: ['Helvetica Neue', 'Arial', 'sans-serif'],
    },
    {
      provider: fontProviders.fontsource(),
      name: 'Geist',
      cssVariable: '--font-geist',
      weights: ['100 900'],
      styles: ['normal'],
      subsets: ['latin', 'latin-ext'],
      fallbacks: ['Helvetica Neue', 'Arial', 'sans-serif'],
      // optional: gebruik de (metric-aangepaste) fallback als Geist niet binnen
      // ~100ms klaar is, en wissel daarna NIET meer → geen layout-shift (CLS).
      // Samen met preload in Layout.astro is Geist meestal toch op tijd.
      display: 'optional',
    },
    {
      provider: fontProviders.fontsource(),
      name: 'JetBrains Mono',
      cssVariable: '--font-jetbrains-mono',
      weights: [400, 500],
      styles: ['normal'],
      subsets: ['latin'],
      fallbacks: ['SF Mono', 'Menlo', 'monospace'],
      display: 'optional',
    },
  ],
  integrations: [
    react(),
    markdoc(),
    sitemap({
      // Sluit OG-image routes uit, en de /ai-tools redirect-stub: die 301't
      // naar / (zie public/_redirects), dus in de sitemap zou hij als
      // "Pagina met omleiding" in GSC verschijnen.
      filter: (page) =>
        !page.includes('/og/') &&
        page.replace(/\/$/, '').replace(/^https?:\/\/[^/]+/, '') !== '/ai-tools',
      serialize(item) {
        // Zonder trailing slash: matcht de canonical/og:url uit Layout.astro
        // én alle interne links op de site. Zonder deze stap wijst de sitemap
        // naar de mét-slash-vorm terwijl de site zelf overal naar de
        // zonder-slash-vorm linkt — een sitewide canonical-conflict die
        // vermoedelijk de organische terugval van juni/juli 2026 verklaart
        // (zie ook de normalisatie in Layout.astro).
        const url = new URL(item.url);
        if (url.pathname !== '/') {
          url.pathname = url.pathname.replace(/\/+$/, '');
        }
        item.url = url.toString();
        // Echte lastmod uit de content (tools/nieuws/digest/vergelijk); URL's
        // zonder betrouwbare datum (index-, radar-, gids-pagina's) krijgen
        // er bewust geen — zie buildLastmodMaps() bovenaan dit bestand.
        const lastmod = lastmodFor(url.pathname);
        if (lastmod) {
          item.lastmod = lastmod.toISOString();
        } else {
          delete item.lastmod;
        }
        return item;
      },
    }),
  ],
  markdown: {
    rehypePlugins: [
      [rehypeExternalLinks, { target: '_blank', rel: ['noopener', 'noreferrer'] }],
    ],
  },
  build: {
    assets: 'assets'
  },
  prefetch: {
    prefetchAll: false,
    defaultStrategy: 'hover'
  },
  vite: {
    // Sandbox-build (CI / agent-omgeving): de gedeelde node_modules/.vite-cache
    // is door de host (macOS) aangemaakt en kan in een Linux-sandbox niet
    // worden ge-unlinkt (EPERM op mount). Met SANDBOX_BUILD=1 schrijft Vite zijn
    // herbouwbare cache naar /tmp i.p.v. de mount. Geen effect op een normale
    // (lokale of productie-) build, want dan is de env-var niet gezet.
    ...(process.env.SANDBOX_BUILD
      ? { cacheDir: '/tmp/astro-vite-cache-debesteaitools' }
      : {}),
    optimizeDeps: {
      exclude: ['astro'],
    },
    ssr: {
      external: ['set-cookie-parser'],
    },
  },
});
