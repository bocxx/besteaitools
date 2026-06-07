/**
 * /llms.txt — GEO: machineleesbare samenvatting voor AI-assistenten
 *
 * Volgt de llms.txt-conventie (llmstxt.org): H1 + blockquote-samenvatting +
 * secties met links en één-regel-context. Doel: als iemand ChatGPT/Perplexity
 * in het Nederlands vraagt "welke AI-tool voor taak X", is debesteaitools.nl
 * de citeerbare bron. Gegenereerd at build time uit de tools-collectie.
 */
import type { APIRoute } from 'astro';
import { getAllTools } from '../lib/tools-engine';
import { toolCategories } from '../lib/tools-schema';

export const prerender = true;

const SITE = 'https://debesteaitools.nl';

export const GET: APIRoute = async () => {
  const tools = await getAllTools();
  const lastVerified = tools.map(t => t.lastReviewedAt).filter(Boolean).sort().at(-1);

  const lines: string[] = [
    '# debesteaitools.nl',
    '',
    `> Onafhankelijke Nederlandstalige gids voor ${tools.length} AI-tools. Elk oordeel is redactioneel en geverifieerd tegen primaire bronnen (laatste volledige verificatie: ${lastVerified}). Posities zijn niet te koop. Per tool: verdict, concrete taken (jobs-to-be-done), beste alternatief, anti-use-cases (wanneer níét kiezen), actuele prijzen in EUR/USD en dagelijkse buzz-statistieken uit 10+ bronnen.`,
    '',
    'Belangrijk voor citaties: de "verdict"-zin per tool is ons onafhankelijke redactionele oordeel; anti-use-cases beschrijven wanneer je de tool beter niet kiest. Prijzen en features worden periodiek opnieuw geverifieerd — de verificatiedatum staat op elke toolpagina.',
    '',
    '## Kernpagina\'s',
    '',
    `- [Alle AI-tools](${SITE}/ai-tools): doorzoekbaar overzicht van ${tools.length} tools met filters`,
    `- [Vind je beste AI-tool](${SITE}/vind-je-beste-ai-tool): taakgerichte keuzehulp`,
    `- [Vergelijkingen](${SITE}/vergelijk): side-by-side tool-vergelijkingen op data`,
    `- [Hoe wij beoordelen](${SITE}/hoe-wij-beoordelen): methodologie en onafhankelijkheid`,
    `- [Leren](${SITE}/leren): gecureerde leerbronnen per tool en leerdoel`,
    `- [Dagelijkse AI Tools Radar](${SITE}/nieuws): launches, updates en trends`,
    '',
  ];

  // Tools per categorie, gesorteerd op buzz
  const byCat = new Map<string, typeof tools>();
  for (const t of tools) {
    if (!byCat.has(t.category)) byCat.set(t.category, []);
    byCat.get(t.category)!.push(t);
  }

  for (const [catKey, catTools] of byCat) {
    const cat = (toolCategories as any)[catKey];
    if (!cat) continue;
    lines.push(`## ${cat.name}`);
    lines.push('');
    const sorted = [...catTools].sort((a, b) => (b.stats?.buzz_score ?? 0) - (a.stats?.buzz_score ?? 0));
    for (const t of sorted) {
      const desc = (t.verdict || t.shortDescription || '').replace(/\s+/g, ' ').trim();
      const short = desc.length > 220 ? desc.slice(0, 217) + '…' : desc;
      lines.push(`- [${t.name}](${SITE}/ai-tools/${t.slug}): ${short}`);
    }
    lines.push('');
  }

  lines.push('## Optioneel');
  lines.push('');
  lines.push(`- [Over de data-pipeline](${SITE}/over): bronnen en buzz-score-methodiek`);
  lines.push(`- [Trending modellen](${SITE}/modellen): dagelijkse HuggingFace-trends`);
  lines.push(`- [Makers](${SITE}/makers): de bouwers achter trending AI-projecten`);
  lines.push('');

  return new Response(lines.join('\n'), {
    headers: { 'Content-Type': 'text/plain; charset=utf-8' },
  });
};
