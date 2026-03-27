import { defineCollection } from 'astro:content';
import { glob } from 'astro/loaders';
import { toolContentSchema } from './lib/tools-schema';

/**
 * Tools Collection
 * JSON files in src/content/tools/ — validated by the shared toolContentSchema.
 * Schema lives in src/lib/tools-schema.ts (single source of truth).
 */
const tools = defineCollection({
  loader: glob({ base: './src/content/tools', pattern: '**/*.json' }),
  schema: toolContentSchema,
});

export const collections = { tools };
