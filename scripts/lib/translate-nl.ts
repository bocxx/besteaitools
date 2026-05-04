/**
 * translate-nl.ts — Vertaal Engelse vrije tekst naar Nederlands met cache.
 *
 * Ontworpen voor sync-scripts die externe data verwerken (Radar API, etc.).
 * Houdt kosten laag via:
 *   1. Taaldetectie vooraf (skip als al NL)
 *   2. Disk-cache op SHA-hash van input
 *   3. Harde limieten (max calls/run, max chars/call)
 *   4. Dry-run modus voor inspectie zonder API-calls
 *
 * Vereist ANTHROPIC_API_KEY in env. Zonder key: helper geeft input ongewijzigd
 * terug (geen crash) — script blijft werken voor diffs/structuur.
 *
 * Env vars:
 *   ANTHROPIC_API_KEY    — vereist voor echte vertaling
 *   DRY_RUN=1            — toon wat vertaald zou worden, geen API-calls
 *   MAX_TRANSLATIONS=N   — hard limiet API-calls per run (default 100)
 *   TRANSLATE_VERBOSE=1  — log per call (default: alleen samenvatting)
 */

import { promises as fs } from 'node:fs';
import path from 'node:path';
import { createHash } from 'node:crypto';

const CACHE_PATH = path.join(process.cwd(), 'src', 'data', 'reports', 'translation-cache.json');
const MODEL = 'claude-haiku-4-5-20251001';
const API_URL = 'https://api.anthropic.com/v1/messages';
const MAX_INPUT_CHARS = 4000;
const PRICE_PER_MTOK_INPUT = 1;   // USD, Haiku 4.5
const PRICE_PER_MTOK_OUTPUT = 5;  // USD
const USD_TO_EUR = 0.92;

type CacheEntry = { nl: string; at: string };
type Cache = Record<string, CacheEntry>;

let cache: Cache | null = null;
let cacheDirty = false;
let stats = {
  cacheHits: 0,
  apiCalls: 0,
  skippedAlreadyDutch: 0,
  skippedLimit: 0,
  inputTokens: 0,
  outputTokens: 0,
  errors: 0,
};

const DRY_RUN = process.env.DRY_RUN === '1';
const VERBOSE = process.env.TRANSLATE_VERBOSE === '1';
const MAX_CALLS = parseInt(process.env.MAX_TRANSLATIONS ?? '100', 10);
const HAS_KEY = !!process.env.ANTHROPIC_API_KEY;

/**
 * Heuristische NL-detectie: telt veelvoorkomende Nederlandse vs. Engelse
 * functiewoorden. Doel is niet 100% accuraat maar wel goedkoop genoeg om elke
 * call uit te voeren — false positives ("al NL") zijn beter dan kosten maken.
 */
const NL_WORDS = new Set([
  'de', 'het', 'een', 'en', 'van', 'voor', 'met', 'aan', 'op', 'is', 'zijn',
  'bij', 'naar', 'om', 'te', 'die', 'dat', 'als', 'maar', 'ook', 'dan', 'tot',
  'door', 'over', 'uit', 'zoals', 'wordt', 'worden', 'kan', 'kunnen', 'heeft',
  'hebben', 'jij', 'je', 'jouw', 'wij', 'we', 'ons', 'onze', 'hun', 'er',
]);
const EN_WORDS = new Set([
  'the', 'a', 'an', 'and', 'or', 'for', 'with', 'to', 'of', 'is', 'are',
  'was', 'were', 'this', 'that', 'these', 'those', 'on', 'at', 'by', 'from',
  'as', 'be', 'been', 'being', 'have', 'has', 'had', 'will', 'would', 'can',
  'could', 'your', 'you', 'our', 'their', 'they', 'we',
]);

export function isLikelyDutch(text: string): boolean {
  if (!text || text.length < 8) return true; // te kort om te bepalen, niet vertalen
  const words = text.toLowerCase().split(/[^a-zà-ÿ']+/).filter(Boolean);
  if (words.length < 4) return true; // korte technische termen ("Text-to-Image", "Drag-and-drop UI") laten staan
  let nl = 0;
  let en = 0;
  for (const w of words) {
    if (NL_WORDS.has(w)) nl++;
    else if (EN_WORDS.has(w)) en++;
  }
  // Vertaal alleen als duidelijk Engels: minstens 2 EN-functiewoorden EN meer EN dan NL.
  // Doel: liever een twijfelgeval als NL behandelen dan onnodig API-calls maken
  // op productnamen of korte technische frases.
  if (en < 2) return true;
  return nl >= en;
}

function hashKey(text: string): string {
  return createHash('sha256').update(text).digest('hex').slice(0, 16);
}

async function loadCache(): Promise<Cache> {
  if (cache) return cache;
  try {
    const raw = await fs.readFile(CACHE_PATH, 'utf8');
    cache = JSON.parse(raw) as Cache;
  } catch {
    cache = {};
  }
  return cache;
}

export async function flushCache(): Promise<void> {
  if (!cache || !cacheDirty) return;
  await fs.mkdir(path.dirname(CACHE_PATH), { recursive: true });
  await fs.writeFile(CACHE_PATH, `${JSON.stringify(cache, null, 2)}\n`, 'utf8');
  cacheDirty = false;
}

async function callApi(text: string): Promise<{ nl: string; inputTokens: number; outputTokens: number }> {
  const systemPrompt =
    'Je bent een professionele vertaler EN→NL voor een Nederlandse AI-tools website. ' +
    'Vertaal de gegeven tekst naar natuurlijk, zakelijk Nederlands. ' +
    'Behoud eigennamen (productnamen, bedrijfsnamen, technische termen die in NL ook Engels zijn zoals "API", "SaaS", "dashboard"). ' +
    'Gebruik "jij/je"-vorm als je iemand aanspreekt. ' +
    'Geef ALLEEN de vertaling terug, geen uitleg, geen quotes, geen markdown.';

  const res = await fetch(API_URL, {
    method: 'POST',
    headers: {
      'content-type': 'application/json',
      'x-api-key': process.env.ANTHROPIC_API_KEY!,
      'anthropic-version': '2023-06-01',
    },
    body: JSON.stringify({
      model: MODEL,
      max_tokens: 1024,
      system: systemPrompt,
      messages: [{ role: 'user', content: text }],
    }),
  });

  if (!res.ok) {
    const errText = await res.text();
    throw new Error(`Anthropic API ${res.status}: ${errText.slice(0, 200)}`);
  }

  const json = await res.json() as {
    content: Array<{ type: string; text?: string }>;
    usage: { input_tokens: number; output_tokens: number };
  };
  const nl = json.content.find((c) => c.type === 'text')?.text?.trim() ?? '';
  return {
    nl,
    inputTokens: json.usage.input_tokens,
    outputTokens: json.usage.output_tokens,
  };
}

/**
 * Vertaal een string naar NL. Geeft input ongewijzigd terug als:
 *  - input leeg of al NL is
 *  - geen ANTHROPIC_API_KEY beschikbaar
 *  - call-limiet bereikt
 *  - DRY_RUN actief (logged what would happen)
 *  - API faalt (logged, returns input)
 */
export async function translateToNl(text: string | undefined | null): Promise<string> {
  if (!text || !text.trim()) return text ?? '';

  if (isLikelyDutch(text)) {
    stats.skippedAlreadyDutch++;
    return text;
  }

  await loadCache();
  const key = hashKey(text);
  const hit = cache![key];
  if (hit) {
    stats.cacheHits++;
    return hit.nl;
  }

  if (!HAS_KEY) {
    if (VERBOSE) console.warn(`  [translate] no ANTHROPIC_API_KEY, skip: "${text.slice(0, 60)}…"`);
    return text;
  }

  if (stats.apiCalls >= MAX_CALLS) {
    stats.skippedLimit++;
    return text;
  }

  if (DRY_RUN) {
    if (VERBOSE) console.log(`  [dry-run] would translate: "${text.slice(0, 80)}…"`);
    stats.apiCalls++; // tel mee voor schatting
    return text;
  }

  const truncated = text.length > MAX_INPUT_CHARS ? text.slice(0, MAX_INPUT_CHARS) : text;
  try {
    const result = await callApi(truncated);
    stats.apiCalls++;
    stats.inputTokens += result.inputTokens;
    stats.outputTokens += result.outputTokens;
    cache![key] = { nl: result.nl, at: new Date().toISOString() };
    cacheDirty = true;
    if (VERBOSE) console.log(`  [translate] ${result.inputTokens}+${result.outputTokens}t: "${text.slice(0, 50)}…" → "${result.nl.slice(0, 50)}…"`);
    return result.nl;
  } catch (err) {
    stats.errors++;
    console.warn(`  [translate] error: ${(err as Error).message}`);
    return text;
  }
}

/** Vertaal elk element in een array. Behoudt volgorde, lege strings. */
export async function translateArrayToNl(arr: string[] | undefined): Promise<string[]> {
  if (!arr || arr.length === 0) return arr ?? [];
  const out: string[] = [];
  for (const item of arr) {
    out.push(await translateToNl(item));
  }
  return out;
}

export function getTranslationStats() {
  const inputCostUsd = (stats.inputTokens / 1_000_000) * PRICE_PER_MTOK_INPUT;
  const outputCostUsd = (stats.outputTokens / 1_000_000) * PRICE_PER_MTOK_OUTPUT;
  const totalEur = (inputCostUsd + outputCostUsd) * USD_TO_EUR;
  return { ...stats, estimatedCostEur: totalEur };
}

export function logTranslationSummary(): void {
  const s = getTranslationStats();
  console.log('');
  console.log('── Vertaalsamenvatting ──');
  console.log(`  Cache hits:        ${s.cacheHits}`);
  console.log(`  Al NL (skipped):   ${s.skippedAlreadyDutch}`);
  console.log(`  API-calls:         ${s.apiCalls}${DRY_RUN ? ' (dry-run)' : ''}`);
  console.log(`  Boven limiet:      ${s.skippedLimit}`);
  console.log(`  Fouten:            ${s.errors}`);
  if (!DRY_RUN && s.apiCalls > 0) {
    console.log(`  Tokens:            ${s.inputTokens} in / ${s.outputTokens} uit`);
    console.log(`  Geschatte kosten:  €${s.estimatedCostEur.toFixed(4)}`);
  }
  if (s.skippedLimit > 0) {
    console.log(`  ⚠️  Limiet (${MAX_CALLS}) bereikt — verhoog MAX_TRANSLATIONS om alles te vertalen.`);
  }
}
