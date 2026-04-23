/**
 * /api/match-explain — LLM uitleg per top-3 tool (Fase 2)
 *
 * POST with { profile, top3 } → returns 3 Dutch explanations (2-3 sentences
 * each) tailored to the user's segment, use-cases, and AI-comfort level.
 *
 * Runs at request time on Cloudflare Workers; non-prerendered.
 * Graceful degradation: if ANTHROPIC_API_KEY is missing or the call
 * fails, returns 503 with a reason — the wizard falls back to the
 * template-based `reason` it already rendered.
 *
 * Model: Haiku 4.5 (claude-haiku-4-5) — fast, cheap, Dutch-native.
 * Prompt caching intentionally omitted: Haiku 4.5 requires a 4096-token
 * minimum prefix and our system prompt is ~500 tokens (would silently
 * not cache). Add caching once the system prompt exceeds 4K tokens.
 */

import type { APIRoute } from 'astro';
import Anthropic from '@anthropic-ai/sdk';
import { z } from 'astro/zod';
import { zodOutputFormat } from '@anthropic-ai/sdk/helpers/zod';
import { segments, useCaseBuckets, aiComfortLevels } from '../../lib/taxonomies';
// Astro v6 Cloudflare adapter exposes env via `cloudflare:workers`.
// Fall back to process.env in Node-based dev without Cloudflare runtime.
import { env as cfEnv } from 'cloudflare:workers';

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
});

// Output schema — array of exactly 3 explanations (pad with '' if fewer tools)
const ExplanationsSchema = z.object({
  explanations: z
    .array(z.string().min(20).max(400))
    .min(1)
    .max(3),
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
Gegeven een gebruikersprofiel + top-3 AI-tools die ons matching-algoritme heeft gekozen:
schrijf per tool **één korte uitleg** (2-3 zinnen, max 300 tekens) waarom deze tool
past bij dit specifieke profiel. Spreek de gebruiker aan met "jij"/"jullie".

## Regels
- **Benoem de concrete match.** Koppel expliciet aan het segment, de use-case(s) en
  AI-niveau uit het profiel. Geen generieke praatjes.
- **Wees eerlijk.** Noem één zwak punt of kanttekening per tool als relevant
  ("maar je hebt wel een M365-abonnement nodig", "setup duurt een paar uur").
- **Geen sterren-opsommingen, geen bullets, geen markdown.** Lopende zinnen.
- **Geen verkooppraat.** Geen "uitstekend", "revolutionair", "game-changer". Wel
  concrete verdienste ("schrijft native Nederlands", "werkt meteen zonder setup").
- **Verwijs naar "jij" als zzp'er, "jullie" als vereniging/MKB.**

## Segment-context
${segmentList}

## Use-case buckets
${bucketList}

## AI-niveau
${comfortList}

## Output-formaat
Return exact 1-3 explanations (één per tool in top-3 volgorde). Geen headers,
geen inleidende zinnen — alleen de 2-3-zins uitleg per tool, als elementen in
de array \`explanations\`.`;
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
  const { profile, top3 } = parsed.data;

  // Cloudflare Workers runtime env (Astro v6+). `cloudflare:workers` also
  // resolves in Vite dev via the Cloudflare adapter shim, so this works
  // locally too provided a .dev.vars / env var is present.
  const apiKey =
    (cfEnv as Record<string, string | undefined>)?.ANTHROPIC_API_KEY
    ?? (typeof process !== 'undefined' ? process.env?.ANTHROPIC_API_KEY : undefined);

  if (!apiKey) {
    return jsonError(503, 'LLM niet beschikbaar (ANTHROPIC_API_KEY niet geconfigureerd)');
  }

  const client = new Anthropic({ apiKey });

  try {
    const response = await client.messages.parse({
      model: 'claude-haiku-4-5',
      max_tokens: 1500,
      system: buildSystemPrompt(),
      messages: [
        {
          role: 'user',
          content: JSON.stringify({ profile, top3 }, null, 2),
        },
      ],
      output_config: {
        format: zodOutputFormat(ExplanationsSchema),
      },
    });

    if (!response.parsed_output) {
      return jsonError(502, 'LLM returned no parseable output');
    }

    // Pad to match top3 length if LLM returned fewer
    const explanations = [...response.parsed_output.explanations];
    while (explanations.length < top3.length) {
      explanations.push('');
    }

    return new Response(
      JSON.stringify({
        explanations: explanations.slice(0, top3.length),
        usage: {
          input_tokens: response.usage.input_tokens,
          output_tokens: response.usage.output_tokens,
        },
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
    if (err instanceof Anthropic.RateLimitError) {
      return jsonError(429, 'Anthropic rate limit hit');
    }
    if (err instanceof Anthropic.APIError) {
      return jsonError(502, `Anthropic API ${err.status}: ${err.message}`);
    }
    const msg = err instanceof Error ? err.message : 'Unknown error';
    return jsonError(500, `LLM call failed: ${msg}`);
  }
};

// ─── Helpers ───────────────────────────────────────────────────

function jsonError(status: number, message: string, details?: unknown) {
  return new Response(JSON.stringify({ error: message, details }), {
    status,
    headers: { 'Content-Type': 'application/json; charset=utf-8' },
  });
}
