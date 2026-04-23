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

// Output schema — array of 1-3 explanations. Length bounds are soft
// preferences communicated via the system prompt; hard validation would
// reject otherwise-fine responses and Anthropic structured outputs can't
// express them anyway.
const ExplanationsSchema = z.object({
  explanations: z.array(z.string()),
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

  // Cloudflare Workers runtime env (Astro v6+). `cloudflare:workers`
  // resolves in Vite dev via the Cloudflare adapter shim and loads
  // .dev.vars locally. If .dev.vars defines EITHER key we treat that
  // as authoritative intent — shell process.env is only consulted
  // when .dev.vars has neither, to avoid a stray shell key overruling
  // what the developer explicitly put in the config file.
  const env = cfEnv as Record<string, string | undefined>;
  const devVarsHasExplain = !!(env?.ANTHROPIC_API_KEY || env?.OPENROUTER_API_KEY);
  const getEnv = (key: 'ANTHROPIC_API_KEY' | 'OPENROUTER_API_KEY'): string | undefined => {
    if (devVarsHasExplain) return env?.[key];
    return typeof process !== 'undefined' ? process.env?.[key] : undefined;
  };

  // Strip obvious placeholder values (copied from .dev.vars.example verbatim
  // without editing). Anything containing "..." is almost certainly not a
  // real key — saves a round trip to the API and a confusing 401.
  const realKey = (v: string | undefined) =>
    v && !v.includes('...') && v.length > 16 ? v : undefined;

  const anthropicKey = realKey(getEnv('ANTHROPIC_API_KEY'));
  const openrouterKey = realKey(getEnv('OPENROUTER_API_KEY'));

  if (!anthropicKey && !openrouterKey) {
    return jsonError(
      503,
      'LLM niet beschikbaar (zet ANTHROPIC_API_KEY óf OPENROUTER_API_KEY in .dev.vars)',
    );
  }

  const userPrompt = JSON.stringify({ profile, top3 }, null, 2);

  try {
    let explanations: string[];
    let usage: { input_tokens: number; output_tokens: number } | null = null;

    if (anthropicKey) {
      // Direct Anthropic (primary path)
      const client = new Anthropic({ apiKey: anthropicKey });
      const response = await client.messages.parse({
        model: 'claude-haiku-4-5',
        max_tokens: 1500,
        system: buildSystemPrompt(),
        messages: [{ role: 'user', content: userPrompt }],
        output_config: { format: zodOutputFormat(ExplanationsSchema) },
      });
      if (!response.parsed_output) {
        return jsonError(502, 'LLM returned no parseable output');
      }
      explanations = response.parsed_output.explanations;
      usage = {
        input_tokens: response.usage.input_tokens,
        output_tokens: response.usage.output_tokens,
      };
    } else {
      // OpenRouter (OpenAI-compat fallback)
      const result = await callOpenRouter(openrouterKey!, userPrompt);
      explanations = result.explanations;
      usage = result.usage;
    }

    // Pad to match top3 length if LLM returned fewer
    while (explanations.length < top3.length) {
      explanations.push('');
    }

    return new Response(
      JSON.stringify({
        explanations: explanations.slice(0, top3.length),
        usage,
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

// ─── OpenRouter fallback ────────────────────────────────────────
//
// OpenRouter exposes an OpenAI-compatible /chat/completions endpoint.
// We use structured JSON mode via `response_format: { type: "json_schema" }`
// and ask for the same ExplanationsSchema.
const OPENROUTER_MODEL = 'anthropic/claude-haiku-4.5';

async function callOpenRouter(
  apiKey: string,
  userPrompt: string,
): Promise<{ explanations: string[]; usage: { input_tokens: number; output_tokens: number } | null }> {
  const body = {
    model: OPENROUTER_MODEL,
    max_tokens: 1500,
    messages: [
      { role: 'system', content: buildSystemPrompt() },
      { role: 'user', content: userPrompt },
    ],
    // Anthropic structured outputs (under OpenRouter) reject size
    // constraints (min/maxLength, min/maxItems). The SDK normally strips
    // them client-side; since we're hand-rolling the request here, keep
    // the schema minimal and enforce bounds via Zod after parsing.
    response_format: {
      type: 'json_schema',
      json_schema: {
        name: 'explanations',
        strict: true,
        schema: {
          type: 'object',
          additionalProperties: false,
          required: ['explanations'],
          properties: {
            explanations: {
              type: 'array',
              items: { type: 'string' },
            },
          },
        },
      },
    },
  };

  const res = await fetch('https://openrouter.ai/api/v1/chat/completions', {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${apiKey}`,
      'Content-Type': 'application/json',
      'HTTP-Referer': 'https://debesteaitools.nl',
      'X-Title': 'debesteaitools.nl matching engine',
    },
    body: JSON.stringify(body),
  });

  if (!res.ok) {
    const text = await res.text().catch(() => '');
    throw new Error(`OpenRouter ${res.status}: ${text.slice(0, 200)}`);
  }

  const json = await res.json() as {
    choices?: { message?: { content?: string } }[];
    usage?: { prompt_tokens?: number; completion_tokens?: number };
  };

  const content = json.choices?.[0]?.message?.content;
  if (!content) {
    throw new Error('OpenRouter returned no message content');
  }

  let parsed: { explanations?: unknown };
  try {
    parsed = JSON.parse(content);
  } catch {
    throw new Error(`OpenRouter content was not valid JSON: ${content.slice(0, 200)}`);
  }

  const validated = ExplanationsSchema.safeParse(parsed);
  if (!validated.success) {
    throw new Error(`OpenRouter JSON failed schema validation: ${validated.error.message}`);
  }

  return {
    explanations: validated.data.explanations,
    usage: json.usage
      ? {
          input_tokens: json.usage.prompt_tokens ?? 0,
          output_tokens: json.usage.completion_tokens ?? 0,
        }
      : null,
  };
}

// ─── Helpers ───────────────────────────────────────────────────

function jsonError(status: number, message: string, details?: unknown) {
  return new Response(JSON.stringify({ error: message, details }), {
    status,
    headers: { 'Content-Type': 'application/json; charset=utf-8' },
  });
}
