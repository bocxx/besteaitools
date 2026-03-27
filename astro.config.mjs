import { defineConfig } from 'astro/config';
import cloudflare from '@astrojs/cloudflare';
import sitemap from '@astrojs/sitemap';
import react from '@astrojs/react';
import markdoc from '@astrojs/markdoc';
import keystatic from '@keystatic/astro';
import rehypeExternalLinks from 'rehype-external-links';

export default defineConfig({
  site: 'https://debesteaitools.nl',
  output: 'static',
  adapter: cloudflare(),
  integrations: [
    react(),
    markdoc(),
    keystatic(),
    sitemap(),
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
      exclude: ['astro']
    }
  },
  experimental: {
    svgo: true
  }
});
