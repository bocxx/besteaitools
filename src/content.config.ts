import { defineCollection } from 'astro:content';
import { z } from 'astro/zod';
import { glob } from 'astro/loaders';
import { toolContentSchema } from './lib/tools-schema';
import { nieuwsCategorySchema } from './lib/nieuws-schema';

const tools = defineCollection({
  loader: glob({ base: './src/content/tools', pattern: '**/*.json' }),
  schema: toolContentSchema,
});

const nieuws = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/nieuws' }),
  schema: z.object({
    title: z.string(),
    description: z.string(),
    publishedAt: z.coerce.date(),
    updatedAt: z.coerce.date().optional(),
    author: z.string().default('Redactie'),
    category: nieuwsCategorySchema.default('nieuws'),
    tags: z.array(z.string()).default([]),
    toolSlug: z.string().optional(),
    featured: z.boolean().default(false),
    draft: z.boolean().default(false),
    heroImage: z.string().optional(),
    readingTime: z.number().optional(),
    keyTakeaways: z.array(z.string()).optional(),
    faq: z.array(z.object({
      q: z.string(),
      a: z.string(),
    })).optional(),
  }),
});

export const collections = { tools, nieuws };
