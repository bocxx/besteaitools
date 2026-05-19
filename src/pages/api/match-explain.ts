/**
 * /api/match-explain — LLM uitleg per top-3 tool (Fase 2)
 *
 * POST with { profile, top3 } → returns 1-3 Dutch explanations (2-3
 * sentences each) tailored to the user's segment, use-cases, and
 * AI-comfort level.
 *
 * Runs at request time on Cloudflare Workers; non-prerendered.
 * Graceful degradation: 503 when no LLM key is configured — the wizard
 * falls back to the template-based `reason` it already rendered.
 */

import type { APIRoute } from 'astro';
import { z } from 'astro/zod';
import { segments, useCaseBuckets, aiComfortLevels } from '../../lib/taxonomies';
import {
  callLlmWithJson,
  jsonError,
  llmErrorToResponse,
  resolveLlmKeys,
} from '../../lib/matching/llm';

export const prerender = false;

// ─── Request / Response schemas ─────────────────────────────────

const ProfileSchema = z.object({
  segment: z.string(),
  teamSize: z.number().optional(),
  useCaseBuckets: z.array(z.string()),
  jtbds: z.array(z.string()).optional(),
  aiComfort: z.string(),
  requireEuHosting: z.boolean().optional(),
  minDutchOutputQuality: z.string().optional(),
  requiredIntegrations: z.array(z.string()).optional(),
  disallowTraining: z.boolean().optional(),
  requireSso: z.boolean().optional(),
  requireAuditLogs: z.boolean().optional(),
  budget: z.string().optional(),
  currentStack: z.array(z.string()).optional(),
  verenigingType: z.string().optional(),
}).passthrough();

const ToolSummarySchema = z.object({
  slug: z.string(),
  name: z.string(),
  score: z.number(),
  shortDescription: z.string(),
  rank: z.number(),
  topFactors: z.array(z.string()).optional(),
  setupTime: z.string().optional(),
  outputLanguageQualityNl: z.string().optional(),
  beginnerFriendlyScore: z.number().optional(),
  hasFreePlan: z.boolean().optional(),
  startingPriceMonthly: z.number().optional(),
  dataUsedForTraining: z.string().optional(),
  euHostingAvailable: z.boolean().optional(),
  typicalWeeklyTimeSaved: z.string().optional(),
  verenigingSuitable: z.boolean().optional(),
}).passthrough();

const RequestSchema = z.object({
  profile: ProfileSchema,
  top3: z.array(ToolSummarySchema).min(1).max(3),
  /** Optional alternatives (rank 4-6) to also get "waarom niet"-reasons for. */
  alternatives: z.array(ToolSummarySchema).max(3).optional(),
});

const ExplanationsSchema = z.object({
  explanations: z.array(z.string()),
  whyNot: z.array(z.string()),
});

// ─── System prompt ──────────────────────────────────────────────

function buildSystemPrompt(): string {
  const segmentList = Object.entries(segments)
    .map(([k, s]) => `- ${k}: ${s.label} — ${s.description}`)
    .join('\n');
  const bucketList = Object.entries(useCaseBuckets)
    .map(([k, b]) => `- ${k}: ${b.label}`)
    .join('\n');
  const comfortList = Object.entries(aiComfortLevels)
    .map(([k, c]) => `- ${k}: ${c.label}`)
    .join('\n');

  return `Je bent de redactie van debesteaitools.nl — een Nederlandstalige AI-tool matching-site
voor MKB, ZZP, verenigingen, stichtingen en kleine overheid. Schrijf nuchter, eerlijk,
geen marketing-taal. Schrijf Nederlands.

## Taak
Gegeven een gebruikersprofiel + top-3 AI-tools + optioneel 1-3 alternatieven (rank 4-6):
1. Schrijf per top-3 tool **één korte uitleg** (2-3 zinnen, max 300 tekens) waarom die
   tool past bij dit specifieke profiel.
2. Schrijf per alternatief **één korte "waarom niet top-3"-reden** (1-2 zinnen,
   max 180 tekens): wat deze tool tekortkomt tegenover de top-3 voor dit profiel.

Spreek de gebruiker aan met "jij"/"jullie".

## Regels voor top-3 uitleg
- **Benoem de concrete match.** Koppel expliciet aan het segment, de use-case(s) en
  AI-niveau uit het profiel. Geen generieke praatjes.
- **Wees eerlijk.** Noem één zwak punt of kanttekening per tool als relevant.
- **Geen sterren-opsommingen, geen bullets, geen markdown.** Lopende zinnen.
- **Geen verkooppraat.** Geen "uitstekend", "revolutionair", "game-changer". Wel
  concrete verdienste ("schrijft native Nederlands", "werkt meteen zonder setup").

## Regels voor "waarom niet top-3"
- **Een concreet tekort.** "Geen gratis plan", "setup te complex voor beginners",
  "mist native NL-output", "te breed georiënteerd voor jouw niche".
- **Niet negatief over de tool zelf.** De tool is prima; alleen niet optimaal voor
  dít profiel.
- **Eén zin, max 180 tekens.**

## Segment-context
${segmentList}

## Use-case buckets
${bucketList}

## AI-niveau
${comfortList}

## Output-formaat
Return:
- \`explanations\`: array van 1-3 strings (één per top-3 tool in volgorde).
- \`whyNot\`: array van 0-3 strings (één per alternatief in volgorde; leeg als er
  geen alternatieven zijn meegegeven).

Geen headers, geen inleidende zinnen — alleen de korte teksten.`;
}

// ─── POST handler ──────────────────────────────────────────────

export const POST: APIRoute = async ({ request }) => {
  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return jsonError(400, 'Invalid JSON body');
  }

  const parsed = RequestSchema.safeParse(body);
  if (!parsed.success) {
    return jsonError(400, 'Invalid request shape', parsed.error.format());
  }
  const { profile, top3, alternatives = [] } = parsed.data;

  const availability = resolveLlmKeys();
  if (!availability.available) {
    return jsonError(503, availability.reason!);
  }

  try {
    const result = await callLlmWithJson({
      system: buildSystemPrompt(),
      user: JSON.stringify({ profile, top3, alternatives }, null, 2),
      schema: ExplanationsSchema,
      openrouterJsonSchema: {
        name: 'explanations',
        schema: {
          type: 'object',
          additionalProperties: false,
          required: ['explanations', 'whyNot'],
          properties: {
            explanations: { type: 'array', items: { type: 'string' } },
            whyNot: { type: 'array', items: { type: 'string' } },
          },
        },
      },
      // Headroom for 3 explanations (~300 chars each) + 3 whyNot (~180 each).
      maxTokens: 2000,
    });

    const explanations = padTo([...result.parsed.explanations], top3.length);
    const whyNot = padTo([...result.parsed.whyNot], alternatives.length);

    return new Response(
      JSON.stringify({
        explanations,
        whyNot,
        usage: result.usage,
        provider: result.provider,
      }),
      {
        status: 200,
        headers: {
          'Content-Type': 'application/json; charset=utf-8',
          'Cache-Control': 'no-store',
        },
      },
    );
  } catch (err) {
    return llmErrorToResponse(err);
  }
};

function padTo(arr: string[], len: number): string[] {
  while (arr.length < len) arr.push('');
  return arr.slice(0, len);
}
