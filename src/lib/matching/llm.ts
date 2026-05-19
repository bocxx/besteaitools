/**
 * Matching Engine — LLM client helpers
 *
 * Shared infrastructure for /api/match-explain and /api/match-parse:
 *   - Env resolution (Cloudflare runtime → process.env, with placeholder
 *     detection and .dev.vars precedence over shell leaks)
 *   - Single `callLlmWithJson()` entry point that routes to Anthropic
 *     direct (primary) or OpenRouter (fallback) based on which key is set
 *
 * Both providers return a parsed-JSON object validated against the Zod
 * schema you pass. Length/numeric constraints in the schema are only
 * enforced client-side — Anthropic structured outputs (both direct and
 * via OpenRouter) reject min/max JSON Schema keywords.
 */

import Anthropic from '@anthropic-ai/sdk';
import { zodOutputFormat } from '@anthropic-ai/sdk/helpers/zod';
import type { z } from 'astro/zod';
import { env as cfEnv } from 'cloudflare:workers';

const ANTHROPIC_MODEL = 'claude-haiku-4-5';
const OPENROUTER_MODEL = 'anthropic/claude-haiku-4.5';

export interface LlmResult<T> {
  parsed: T;
  usage: { input_tokens: number; output_tokens: number } | null;
  provider: 'anthropic' | 'openrouter';
}

export interface LlmAvailability {
  available: boolean;
  reason?: string;
  anthropicKey?: string;
  openrouterKey?: string;
}

/** Resolve env keys with .dev.vars precedence and placeholder stripping. */
export function resolveLlmKeys(): LlmAvailability {
  const env = cfEnv as Record<string, string | undefined>;
  const devVarsHasExplain = !!(env?.ANTHROPIC_API_KEY || env?.OPENROUTER_API_KEY);

  const get = (key: 'ANTHROPIC_API_KEY' | 'OPENROUTER_API_KEY'): string | undefined => {
    if (devVarsHasExplain) return env?.[key];
    return typeof process !== 'undefined' ? process.env?.[key] : undefined;
  };

  // Strip placeholder values (".dev.vars copied verbatim") so a pasted
  // example doesn't masquerade as a real key.
  const real = (v: string | undefined) =>
    v && !v.includes('...') && v.length > 16 ? v : undefined;

  const anthropicKey = real(get('ANTHROPIC_API_KEY'));
  const openrouterKey = real(get('OPENROUTER_API_KEY'));

  if (anthropicKey || openrouterKey) {
    return { available: true, anthropicKey, openrouterKey };
  }
  return {
    available: false,
    reason:
      'LLM niet beschikbaar (zet ANTHROPIC_API_KEY óf OPENROUTER_API_KEY in .dev.vars)',
  };
}

/**
 * Call the LLM with a system prompt + user message and return JSON
 * validated against `schema`. Routes through whichever provider has a
 * key configured; Anthropic direct wins if both are set.
 */
export async function callLlmWithJson<T>(args: {
  system: string;
  user: string;
  schema: z.ZodType<T>;
  /** Schema sent to OpenRouter — must be pure JSON Schema, no min/max. */
  openrouterJsonSchema: {
    name: string;
    schema: Record<string, unknown>;
  };
  maxTokens?: number;
}): Promise<LlmResult<T>> {
  const keys = resolveLlmKeys();
  if (!keys.available) {
    throw new Error(keys.reason ?? 'No LLM provider configured');
  }

  const maxTokens = args.maxTokens ?? 1500;

  if (keys.anthropicKey) {
    return callAnthropic(keys.anthropicKey, args.system, args.user, args.schema, maxTokens);
  }
  return callOpenRouter(
    keys.openrouterKey!,
    args.system,
    args.user,
    args.schema,
    args.openrouterJsonSchema,
    maxTokens,
  );
}

async function callAnthropic<T>(
  apiKey: string,
  system: string,
  user: string,
  schema: z.ZodType<T>,
  maxTokens: number,
): Promise<LlmResult<T>> {
  const client = new Anthropic({ apiKey });
  const response = await client.messages.parse({
    model: ANTHROPIC_MODEL,
    max_tokens: maxTokens,
    system,
    messages: [{ role: 'user', content: user }],
    output_config: { format: zodOutputFormat(schema as z.ZodType<object>) },
  });

  if (!response.parsed_output) {
    throw new Error('Anthropic returned no parseable output');
  }
  return {
    parsed: response.parsed_output as T,
    usage: {
      input_tokens: response.usage.input_tokens,
      output_tokens: response.usage.output_tokens,
    },
    provider: 'anthropic',
  };
}

async function callOpenRouter<T>(
  apiKey: string,
  system: string,
  user: string,
  schema: z.ZodType<T>,
  jsonSchemaSpec: { name: string; schema: Record<string, unknown> },
  maxTokens: number,
): Promise<LlmResult<T>> {
  const res = await fetch('https://openrouter.ai/api/v1/chat/completions', {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${apiKey}`,
      'Content-Type': 'application/json',
      'HTTP-Referer': 'https://debesteaitools.nl',
      'X-Title': 'debesteaitools.nl matching engine',
    },
    body: JSON.stringify({
      model: OPENROUTER_MODEL,
      max_tokens: maxTokens,
      messages: [
        { role: 'system', content: system },
        { role: 'user', content: user },
      ],
      response_format: {
        type: 'json_schema',
        json_schema: {
          name: jsonSchemaSpec.name,
          strict: true,
          schema: jsonSchemaSpec.schema,
        },
      },
    }),
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
  if (!content) throw new Error('OpenRouter returned no message content');

  let rawParsed: unknown;
  try {
    rawParsed = JSON.parse(content);
  } catch {
    throw new Error(`OpenRouter content was not valid JSON: ${content.slice(0, 200)}`);
  }

  const validated = schema.safeParse(rawParsed);
  if (!validated.success) {
    throw new Error(`OpenRouter JSON failed schema validation: ${validated.error.message}`);
  }

  return {
    parsed: validated.data,
    usage: json.usage
      ? {
          input_tokens: json.usage.prompt_tokens ?? 0,
          output_tokens: json.usage.completion_tokens ?? 0,
        }
      : null,
    provider: 'openrouter',
  };
}

/** Map unknown errors to HTTP responses with useful status codes. */
export function llmErrorToResponse(err: unknown): Response {
  if (err instanceof Anthropic.RateLimitError) {
    return jsonErr(429, 'LLM rate limit hit');
  }
  if (err instanceof Anthropic.APIError) {
    return jsonErr(502, `Anthropic API ${err.status}: ${err.message}`);
  }
  const msg = err instanceof Error ? err.message : 'Unknown error';
  const status = msg.startsWith('OpenRouter ') ? 502 : 500;
  return jsonErr(status, `LLM call failed: ${msg}`);
}

function jsonErr(status: number, message: string) {
  return new Response(JSON.stringify({ error: message }), {
    status,
    headers: { 'Content-Type': 'application/json; charset=utf-8' },
  });
}

export function jsonError(status: number, message: string, details?: unknown) {
  return new Response(JSON.stringify({ error: message, details }), {
    status,
    headers: { 'Content-Type': 'application/json; charset=utf-8' },
  });
}
