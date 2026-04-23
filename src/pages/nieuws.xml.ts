import rss from '@astrojs/rss';
import type { APIContext } from 'astro';


export const prerender = true;

export async function GET(context: APIContext) {
  let features: any[] = [];

  try {
    const raw = await import('../data/reports/tool_feature_news.json');
    const data: any = raw.default ?? raw;
    features = data.features ?? [];
  } catch {
    // No data yet
  }

  return rss({
    title: 'AI Tool Nieuws — debesteaitools.nl',
    description: 'Wekelijks overzicht van nieuwe features en updates voor AI-tools. Samengesteld uit nieuws, Hacker News, Reddit en social media.',
    site: context.site ?? 'https://debesteaitools.nl',
    items: features.map((feature: any) => ({
      title: `${feature.tool_name}: ${feature.feature_title}`,
      description: feature.summary_nl ?? '',
      link: `/ai-tools/${feature.tool_slug}`,
      pubDate: feature.detected_at ? new Date(feature.detected_at) : new Date(),
      categories: [feature.tool_category ?? ''],
    })),
    customData: '<language>nl</language>',
  });
}
