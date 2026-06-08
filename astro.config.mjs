import { defineConfig, fontProviders } from 'astro/config';
import cloudflare from '@astrojs/cloudflare';
import sitemap from '@astrojs/sitemap';
import react from '@astrojs/react';
import markdoc from '@astrojs/markdoc';
import rehypeExternalLinks from 'rehype-external-links';

const isDev = process.argv.includes('dev');

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
        item.lastmod = new Date().toISOString();
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
    optimizeDeps: {
      exclude: ['astro'],
    },
    ssr: {
      external: ['set-cookie-parser'],
    },
  },
});
