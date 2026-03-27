import rss from '@astrojs/rss';
import type { APIContext } from 'astro';
import { getCollection } from 'astro:content';
import { getCategoryName } from '../lib/categories';

export async function GET(context: APIContext) {
  const tools = await getCollection('tools', ({ data }) => !data.draft);

  return rss({
    title: 'nuchter.ai',
    description: 'De nuchtere gids voor AI-tools, trends en routes.',
    site: context.site ?? 'https://nuchter.ai',
    items: tools.map((tool) => ({
      title: tool.data.name,
      description: tool.data.shortDescription,
      link: `/ai-tools/${tool.data.slug}`,
      categories: [getCategoryName(tool.data.category)],
    })),
    customData: '<language>nl</language>',
  });
}
