import { defineCollection } from 'astro:content';
import { glob } from 'astro/loaders';
import { z } from 'astro/zod';

const tools = defineCollection({
  loader: glob({ base: './src/content/tools', pattern: '**/*.json' }),
  schema: z.object({
    name: z.string(),
    slug: z.string(),
    category: z.enum([
      'chatbots',
      'coding',
      'image',
      'video',
      'automation',
      'search',
      'audio',
      'productivity',
      'infrastructure',
    ]),
    shortDescription: z.string(),
    websiteUrl: z.string().url(),
    pricingModel: z.enum(['free', 'freemium', 'paid', 'enterprise']).default('freemium'),
    difficulty: z.enum(['beginner', 'intermediate', 'advanced']).default('beginner'),
    tags: z.array(z.string()).default([]),
    draft: z.boolean().default(false),
  }),
});

export const collections = { tools };
