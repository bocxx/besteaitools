import { defineConfig } from 'astro/config';
import cloudflare from '@astrojs/cloudflare';
import sitemap from '@astrojs/sitemap';
import react from '@astrojs/react';
import markdoc from '@astrojs/markdoc';
import keystatic from '@keystatic/astro';
import rehypeExternalLinks from 'rehype-external-links';

const isDev = process.argv.includes('dev');

export default defineConfig({
  site: 'https://debesteaitools.nl',
  output: 'static',
  adapter: isDev ? undefined : cloudflare(),
  integrations: [
    react(),
    markdoc(),
    // Keystatic only active in dev — local CMS for editing tool profiles
    // Access at: http://localhost:4321/keystatic
    ...(isDev ? [keystatic()] : []),
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
});
