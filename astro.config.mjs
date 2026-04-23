import { defineConfig } from 'astro/config';
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
  integrations: [
    react(),
    markdoc(),
    sitemap({
      filter: (page) => !page.includes('/og/'),
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
  experimental: {
    svgo: true
  }
});
