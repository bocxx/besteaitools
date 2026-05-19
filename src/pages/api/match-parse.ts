/**
 * /api/match-parse — free-text intake → structured profile (Fase 2)
 *
 * POST { text } → { profile: Partial<UserProfile>, interpretation: string,
 *                   confidence: number }
 *
 * The user can describe their situation in one Dutch paragraph; the LLM
 * extracts whatever fields it can reliably infer and leaves the rest
 * unset. The wizard then prefills the form so the user only has to
 * confirm / refine.
 *
 * The LLM only fills fields it's confident about. Required fields
 * (segment, useCaseBuckets, aiComfort) are guessed when signal is
 * strong; we always surface a plain-language interpretation so the user
 * can see what was inferred.
 */

import type { APIRoute } from 'astro';
import { z } from 'astro/zod';
import {
  segments, useCaseBuckets, aiComfortLevels, budgetBuckets,
  dutchOutputQualityLevels, integrations as integrationsTax,
  verenigingTypes, verenigingTimeSinks,
} from '../../lib/taxonomies';
import {
  callLlmWithJson,
  jsonError,
  llmErrorToResponse,
  resolveLlmKeys,
} from '../../lib/matching/llm';

export const prerender = false;

// ─── Helpers to build enum lists ────────────────────────────────

const segmentKeys = Object.keys(segments);
const bucketKeys = Object.keys(useCaseBuckets);
const comfortKeys = Object.keys(aiComfortLevels);
const budgetKeys = Object.keys(budgetBuckets);
const dutchQualityKeys = Object.keys(dutchOutputQualityLevels);
const integrationKeys = Object.keys(integrationsTax);
const verenigingTypeKeys = Object.keys(verenigingTypes);
const verenigingTimeSinkKeys = Object.keys(verenigingTimeSinks);

// ─── Request + response schemas ─────────────────────────────────

const RequestSchema = z.object({
  text: z.string().min(10).max(2000),
});

// Strict JSON Schema on OpenRouter/Anthropic hangs when properties are
// declared as optional (not in `required`). Workaround: declare all
// fields required, allow `null` on the ones the LLM should skip, and
// normalise null → undefined post-parse.
const RawParsedSchema = z.object({
  segment: z.string().nullable(),
  teamSize: z.number().int().nullable(),
  useCaseBuckets: z.array(z.string()).nullable(),
  aiComfort: z.string().nullable(),
  budget: z.string().nullable(),
  minDutchOutputQuality: z.string().nullable(),
  requireEuHosting: z.boolean().nullable(),
  disallowTraining: z.boolean().nullable(),
  requiredIntegrations: z.array(z.string()).nullable(),
  currentStack: z.array(z.string()).nullable(),
  verenigingType: z.string().nullable(),
  verenigingTimeSink: z.string().nullable(),
  interpretation: z.string(),
  confidence: z.number().min(0).max(1),
});

// ─── System prompt ──────────────────────────────────────────────

function buildSystemPrompt(): string {
  const describe = (key: string, list: Record<string, { label: string; description?: string }>) =>
    Object.entries(list)
      .map(([k, v]) => `  - ${k}: ${v.label}${'description' in v && v.description ? ` — ${v.description}` : ''}`)
      .join('\n');

  const intJsonList = integrationKeys.slice(0, 40).join(', ');

  return `Je bent de intake-parser van debesteaitools.nl. Je krijgt één vrije-tekst Nederlandse
beschrijving van een gebruiker (zzp, MKB, vereniging, overheid) en haalt daaruit een
gestructureerd profiel voor onze matching-engine.

## Opdracht
Lees de tekst en vul alleen de velden in waarvan je met redelijke zekerheid kunt
afleiden wat de gebruiker bedoelt. **Laat velden leeg als je moet gokken.**

## Velden met toegestane waarden (exact deze strings)

\`segment\`:
${describe('segment', segments)}

\`useCaseBuckets\` (array van 1+):
${describe('buckets', useCaseBuckets)}

\`aiComfort\`:
${describe('comfort', aiComfortLevels)}

\`budget\`:
${describe('budget', budgetBuckets as unknown as Record<string, { label: string }>)}

\`minDutchOutputQuality\` (alleen als gebruiker expliciet noemt):
${describe('quality', dutchOutputQualityLevels)}

\`verenigingType\` (alleen bij segment=vereniging of stichting):
${describe('verType', verenigingTypes)}

\`verenigingTimeSink\` (idem):
${describe('timeSink', verenigingTimeSinks)}

\`requiredIntegrations\` + \`currentStack\` (array van keys):
${intJsonList}...

\`teamSize\` (integer): lees uit tekst als "12 mensen", "5 vrijwilligers", etc.

\`requireEuHosting\`, \`disallowTraining\` (booleans): zet alleen op true bij expliciete
vermelding ("moet EU-gehost", "mijn data mag niet gebruikt worden voor training").

## Output

Return altijd:
- \`interpretation\`: één Nederlandse zin waarin je samenvat wat je hebt begrepen
  ("MKB van 12 mensen, vooral klantmails, al regelmatig AI-tools in gebruik")
- \`confidence\`: 0.0-1.0 hoe zeker je bent van je interpretatie

**Geef nooit waarden die niet in de lijsten hierboven staan.** Bij twijfel: laat weg.

Bij segment-inferenties:
- "ik ben zzp" / "freelance" → zzp
- "vrijwilliger bij een sportclub" → vereniging
- "we zijn met 8 mensen in de IT" → mkb_klein
- "stichting" → stichting
- "gemeente" / "gemeentelijk" → overheid_klein

Bij comfort-inferenties:
- "ik heb ChatGPT geprobeerd" → tried_chatgpt
- "gebruik ChatGPT dagelijks en soms Claude" → regular_1_2
- "ik bouw zelf agents" → power_user
- "nooit AI gebruikt" → never

Bij budget-inferenties:
- "gratis" / "geen budget" → free
- "tientje" / "€20" → under_20
- "honderd euro" → under_200
- "maakt niet uit" → any

Als de tekst te kort of vaag is om iets zinnigs af te leiden: geef lege velden + lage
confidence + eerlijk \`interpretation\` ("te weinig info om iets af te leiden").`;
}

// ─── Strict-value post-filter ───────────────────────────────────

function keepIfInSet<T extends string>(
  value: T | null | undefined,
  allowed: readonly string[],
): T | undefined {
  return value && allowed.includes(value) ? value : undefined;
}

function filterArray<T extends string>(
  arr: T[] | null | undefined,
  allowed: readonly string[],
): T[] | undefined {
  if (!arr) return undefined;
  const filtered = arr.filter((v) => allowed.includes(v)) as T[];
  return filtered.length > 0 ? filtered : undefined;
}

function stripUnknownValues(raw: z.infer<typeof RawParsedSchema>) {
  return {
    segment: keepIfInSet(raw.segment, segmentKeys),
    teamSize: typeof raw.teamSize === 'number' && raw.teamSize > 0 ? raw.teamSize : undefined,
    useCaseBuckets: filterArray(raw.useCaseBuckets, bucketKeys),
    aiComfort: keepIfInSet(raw.aiComfort, comfortKeys),
    budget: keepIfInSet(raw.budget, budgetKeys),
    minDutchOutputQuality: keepIfInSet(raw.minDutchOutputQuality, dutchQualityKeys),
    requireEuHosting: raw.requireEuHosting || undefined,
    disallowTraining: raw.disallowTraining || undefined,
    requiredIntegrations: filterArray(raw.requiredIntegrations, integrationKeys),
    currentStack: filterArray(raw.currentStack, integrationKeys),
    verenigingType: keepIfInSet(raw.verenigingType, verenigingTypeKeys),
    verenigingTimeSink: keepIfInSet(raw.verenigingTimeSink, verenigingTimeSinkKeys),
  };
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
    return jsonError(400, 'text moet minimaal 10 en max 2000 tekens bevatten');
  }

  const availability = resolveLlmKeys();
  if (!availability.available) {
    return jsonError(503, availability.reason!);
  }

  try {
    const result = await callLlmWithJson({
      system: buildSystemPrompt(),
      user: parsed.data.text,
      schema: RawParsedSchema,
      openrouterJsonSchema: {
        name: 'profile',
        schema: {
          type: 'object',
          additionalProperties: false,
          // OpenAI/Anthropic structured outputs require ALL properties
          // to be listed in `required` when strict mode is on. Use
          // nullable types so the LLM can still say "don't know" via null.
          required: [
            'segment', 'teamSize', 'useCaseBuckets', 'aiComfort', 'budget',
            'minDutchOutputQuality', 'requireEuHosting', 'disallowTraining',
            'requiredIntegrations', 'currentStack', 'verenigingType',
            'verenigingTimeSink', 'interpretation', 'confidence',
          ],
          properties: {
            segment: { type: ['string', 'null'] },
            teamSize: { type: ['integer', 'null'] },
            useCaseBuckets: { type: ['array', 'null'], items: { type: 'string' } },
            aiComfort: { type: ['string', 'null'] },
            budget: { type: ['string', 'null'] },
            minDutchOutputQuality: { type: ['string', 'null'] },
            requireEuHosting: { type: ['boolean', 'null'] },
            disallowTraining: { type: ['boolean', 'null'] },
            requiredIntegrations: { type: ['array', 'null'], items: { type: 'string' } },
            currentStack: { type: ['array', 'null'], items: { type: 'string' } },
            verenigingType: { type: ['string', 'null'] },
            verenigingTimeSink: { type: ['string', 'null'] },
            interpretation: { type: 'string' },
            confidence: { type: 'number' },
          },
        },
      },
      maxTokens: 800,
    });

    const profile = stripUnknownValues(result.parsed);
    // Drop undefined entries for clean JSON
    const cleanProfile: Record<string, unknown> = {};
    for (const [k, v] of Object.entries(profile)) {
      if (v !== undefined) cleanProfile[k] = v;
    }

    return new Response(
      JSON.stringify({
        profile: cleanProfile,
        interpretation: result.parsed.interpretation,
        confidence: result.parsed.confidence,
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
