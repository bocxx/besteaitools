import rss from '@astrojs/rss';
import type { APIContext } from 'astro';
import { getCollection } from 'astro:content';


export const prerender = true;

export async function GET(context: APIContext) {
  const digests = await getCollection('digest', ({ data }) => !data.draft);

  const sorted = digests.sort(
    (a, b) => b.data.date.getTime() - a.data.date.getTime(),
  );

  return rss({
    title: 'AI Tools Radar — debesteaitools.nl',
    description:
      'Dagelijks AI-tools overzicht: nieuwe launches, feature-updates en deep-dive kandidaten uit Product Hunt, Hacker News, Reddit, X en Bluesky.',
    site: context.site ?? 'https://debesteaitools.nl',
    items: sorted.map(entry => ({
      title: entry.data.title,
      description: entry.data.description,
      link: `/digest/${entry.id}`,
      pubDate: entry.data.date,
      categories: entry.data.tags ?? [],
    })),
    customData: '<language>nl</language>',
  });
}
