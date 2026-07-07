import rss from '@astrojs/rss';
import type { APIContext } from 'astro';
import { getCollection } from 'astro:content';
import { getCategoryName } from '../lib/categories';


export const prerender = true;

export async function GET(context: APIContext) {
  const tools = await getCollection('tools', ({ data }) => !data.draft);

  return rss({
    title: 'debesteaitools.nl — AI-tools',
    description: 'De onafhankelijke gids voor de beste AI-tools: reviews, vergelijkingen en wekelijkse top 10-lijsten.',
    site: context.site ?? 'https://debesteaitools.nl',
    items: tools.map((tool) => ({
      title: tool.data.name,
      description: tool.data.shortDescription,
      link: `/ai-tools/${tool.id}`,
      categories: [getCategoryName(tool.data.category)],
    })),
    customData: '<language>nl</language>',
  });
}
