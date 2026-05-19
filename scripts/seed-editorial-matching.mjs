#!/usr/bin/env node
/**
 * Editorial seed for matching-plan v2 fields.
 *
 * Populates curated values for well-known tools so the matching
 * engine has real differentiation to work with. Values represent
 * editorial judgment as of the seed date (2026-04-23) and should
 * be revisited when tools materially change.
 *
 * Fields populated:
 *   - verenigingSuitable  (bool)
 *   - outputLanguageQualityNl (native/good/basic/poor)
 *   - beginnerFriendlyScore (1-10)
 *   - dataUsedForTraining (yes/no/opt-out/opt-in)
 *   - aiActRiskClass (minimal/limited/high)
 *   - vendorLockInRisk (low/medium/high)
 *   - typicalWeeklyTimeSaved (string)
 *   - matchSegments (adds 'vereniging'/'stichting' where suitable)
 *
 * Run:
 *   node scripts/seed-editorial-matching.mjs --dry-run
 *   node scripts/seed-editorial-matching.mjs                # additive
 *   node scripts/seed-editorial-matching.mjs --force        # overwrite
 */

import { readFileSync, writeFileSync } from 'fs';
import { join } from 'path';

const ROOT = join(import.meta.dirname, '..');
const TOOLS_DIR = join(ROOT, 'src', 'content', 'tools');
const DRY = process.argv.includes('--dry-run');
const FORCE = process.argv.includes('--force');

/**
 * Per-tool editorial overrides. Keys are filename stems.
 * Everything omitted is left to the migration-script defaults.
 */
const seed = {
  // ═══════════ MAJOR CHATBOTS ═══════════
  'chatgpt': {
    verenigingSuitable: true,
    outputLanguageQualityNl: 'native',
    beginnerFriendlyScore: 10,
    dataUsedForTraining: 'opt-out',
    aiActRiskClass: 'minimal',
    vendorLockInRisk: 'low',
    typicalWeeklyTimeSaved: '3-6 uur/week voor tekst- en e-mailtaken',
    addMatchSegments: ['vereniging', 'stichting', 'overheid_klein', 'onderwijs'],
  },
  'claude': {
    verenigingSuitable: true,
    outputLanguageQualityNl: 'native',
    beginnerFriendlyScore: 9,
    dataUsedForTraining: 'no',
    aiActRiskClass: 'minimal',
    vendorLockInRisk: 'low',
    typicalWeeklyTimeSaved: '4-8 uur/week voor analyse en lange teksten',
    addMatchSegments: ['vereniging', 'stichting', 'overheid_klein', 'onderwijs'],
  },
  'gemini': {
    verenigingSuitable: true,
    outputLanguageQualityNl: 'native',
    beginnerFriendlyScore: 9,
    dataUsedForTraining: 'opt-out',
    aiActRiskClass: 'minimal',
    vendorLockInRisk: 'medium',
    typicalWeeklyTimeSaved: '3-5 uur/week als je al Google Workspace gebruikt',
    addMatchSegments: ['vereniging', 'stichting', 'onderwijs'],
  },
  'copilot': {
    verenigingSuitable: true,
    outputLanguageQualityNl: 'native',
    beginnerFriendlyScore: 9,
    dataUsedForTraining: 'no',
    aiActRiskClass: 'minimal',
    vendorLockInRisk: 'medium',
    typicalWeeklyTimeSaved: '3-6 uur/week in code + docs',
    addMatchSegments: ['overheid_klein', 'onderwijs'],
  },
  'microsoft-copilot': {
    verenigingSuitable: true,
    outputLanguageQualityNl: 'native',
    beginnerFriendlyScore: 8,
    dataUsedForTraining: 'no',
    aiActRiskClass: 'minimal',
    vendorLockInRisk: 'high',
    typicalWeeklyTimeSaved: '4-8 uur/week in M365-workflows',
    addMatchSegments: ['overheid_klein', 'onderwijs'],
  },
  'perplexity': {
    verenigingSuitable: true,
    outputLanguageQualityNl: 'good',
    beginnerFriendlyScore: 9,
    dataUsedForTraining: 'opt-out',
    aiActRiskClass: 'minimal',
    vendorLockInRisk: 'low',
    typicalWeeklyTimeSaved: '2-4 uur/week voor research',
    addMatchSegments: ['vereniging', 'stichting', 'onderwijs'],
  },
  'you.com': {
    outputLanguageQualityNl: 'good',
    beginnerFriendlyScore: 8,
    dataUsedForTraining: 'opt-out',
    vendorLockInRisk: 'low',
  },
  'grok': {
    outputLanguageQualityNl: 'basic',
    beginnerFriendlyScore: 7,
    dataUsedForTraining: 'yes',
    aiActRiskClass: 'minimal',
    vendorLockInRisk: 'medium',
  },
  'pi': {
    outputLanguageQualityNl: 'good',
    beginnerFriendlyScore: 10,
    dataUsedForTraining: 'opt-out',
    vendorLockInRisk: 'low',
  },
  'character.ai': {
    outputLanguageQualityNl: 'basic',
    beginnerFriendlyScore: 8,
    dataUsedForTraining: 'yes',
    vendorLockInRisk: 'high',
  },

  // ═══════════ OPEN-WEIGHT / INFRA (mostly dev) ═══════════
  'deepseek': {
    outputLanguageQualityNl: 'basic',
    beginnerFriendlyScore: 5,
    dataUsedForTraining: 'yes',
    vendorLockInRisk: 'low',
  },
  'qwen': {
    outputLanguageQualityNl: 'basic',
    beginnerFriendlyScore: 5,
    dataUsedForTraining: 'yes',
    vendorLockInRisk: 'low',
  },
  'llama': {
    outputLanguageQualityNl: 'basic',
    beginnerFriendlyScore: 3,
    dataUsedForTraining: 'no',
    vendorLockInRisk: 'low',
  },
  'mistral': {
    outputLanguageQualityNl: 'good',
    beginnerFriendlyScore: 6,
    dataUsedForTraining: 'opt-out',
    vendorLockInRisk: 'low',
  },
  'cohere': {
    outputLanguageQualityNl: 'good',
    beginnerFriendlyScore: 5,
    dataUsedForTraining: 'opt-out',
    vendorLockInRisk: 'low',
  },
  'huggingface': {
    outputLanguageQualityNl: 'basic',
    beginnerFriendlyScore: 3,
    dataUsedForTraining: 'opt-in',
    vendorLockInRisk: 'low',
  },
  'together-ai': {
    outputLanguageQualityNl: 'basic',
    beginnerFriendlyScore: 3,
    dataUsedForTraining: 'no',
    vendorLockInRisk: 'low',
  },
  'fireworks-ai': {
    beginnerFriendlyScore: 3,
    dataUsedForTraining: 'no',
    vendorLockInRisk: 'low',
  },
  'openrouter': {
    beginnerFriendlyScore: 4,
    dataUsedForTraining: 'no',
    vendorLockInRisk: 'low',
  },
  'replicate': {
    beginnerFriendlyScore: 3,
    dataUsedForTraining: 'no',
    vendorLockInRisk: 'low',
  },
  'groq': {
    beginnerFriendlyScore: 4,
    dataUsedForTraining: 'no',
    vendorLockInRisk: 'low',
  },
  'ollama': {
    beginnerFriendlyScore: 4,
    dataUsedForTraining: 'no',
    vendorLockInRisk: 'low',
  },
  'litellm': {
    beginnerFriendlyScore: 2,
    dataUsedForTraining: 'no',
    vendorLockInRisk: 'low',
  },
  'vllm': {
    beginnerFriendlyScore: 1,
    dataUsedForTraining: 'no',
    vendorLockInRisk: 'low',
  },
  'open-webui': {
    beginnerFriendlyScore: 4,
    dataUsedForTraining: 'no',
    vendorLockInRisk: 'low',
  },
  'mcp': {
    beginnerFriendlyScore: 2,
    vendorLockInRisk: 'low',
  },

  // ═══════════ IMAGE / DESIGN ═══════════
  'canva-ai': {
    verenigingSuitable: true,
    outputLanguageQualityNl: 'good',
    beginnerFriendlyScore: 10,
    dataUsedForTraining: 'opt-out',
    aiActRiskClass: 'minimal',
    vendorLockInRisk: 'high',
    typicalWeeklyTimeSaved: '2-4 uur/week voor posters, social visuals, drukwerk',
    addMatchSegments: ['vereniging', 'stichting', 'onderwijs'],
  },
  'dall-e': {
    outputLanguageQualityNl: 'native',
    beginnerFriendlyScore: 9,
    dataUsedForTraining: 'opt-out',
    vendorLockInRisk: 'low',
  },
  'midjourney': {
    outputLanguageQualityNl: 'basic',
    beginnerFriendlyScore: 6,
    dataUsedForTraining: 'yes',
    vendorLockInRisk: 'medium',
  },
  'stable-diffusion': {
    beginnerFriendlyScore: 4,
    dataUsedForTraining: 'no',
    vendorLockInRisk: 'low',
  },
  'ideogram': {
    outputLanguageQualityNl: 'basic',
    beginnerFriendlyScore: 8,
    dataUsedForTraining: 'opt-out',
    vendorLockInRisk: 'low',
  },
  'flux': {
    beginnerFriendlyScore: 6,
    dataUsedForTraining: 'no',
    vendorLockInRisk: 'low',
  },
  'leonardo': {
    beginnerFriendlyScore: 7,
    dataUsedForTraining: 'opt-out',
    vendorLockInRisk: 'medium',
  },
  'adobe-firefly': {
    outputLanguageQualityNl: 'good',
    beginnerFriendlyScore: 8,
    dataUsedForTraining: 'no',
    vendorLockInRisk: 'high',
  },
  'figma-ai': {
    beginnerFriendlyScore: 7,
    dataUsedForTraining: 'opt-out',
    vendorLockInRisk: 'high',
  },
  'claude-design': {
    outputLanguageQualityNl: 'native',
    beginnerFriendlyScore: 8,
    dataUsedForTraining: 'no',
    vendorLockInRisk: 'low',
  },

  // ═══════════ VIDEO / AUDIO ═══════════
  'runway': {
    beginnerFriendlyScore: 7,
    dataUsedForTraining: 'opt-out',
    vendorLockInRisk: 'medium',
  },
  'sora': {
    beginnerFriendlyScore: 8,
    dataUsedForTraining: 'opt-out',
    vendorLockInRisk: 'low',
  },
  'veo': {
    beginnerFriendlyScore: 7,
    dataUsedForTraining: 'opt-out',
    vendorLockInRisk: 'medium',
  },
  'pika': {
    beginnerFriendlyScore: 7,
    dataUsedForTraining: 'yes',
    vendorLockInRisk: 'medium',
  },
  'luma': {
    beginnerFriendlyScore: 7,
    dataUsedForTraining: 'opt-out',
    vendorLockInRisk: 'medium',
  },
  'kling': {
    beginnerFriendlyScore: 7,
    dataUsedForTraining: 'yes',
    vendorLockInRisk: 'medium',
  },
  'hailuo': {
    beginnerFriendlyScore: 7,
    dataUsedForTraining: 'yes',
    vendorLockInRisk: 'medium',
  },
  'seedance': {
    beginnerFriendlyScore: 6,
    dataUsedForTraining: 'yes',
    vendorLockInRisk: 'medium',
  },
  'heygen': {
    beginnerFriendlyScore: 8,
    dataUsedForTraining: 'opt-out',
    vendorLockInRisk: 'medium',
  },
  'descript': {
    outputLanguageQualityNl: 'basic',
    beginnerFriendlyScore: 7,
    dataUsedForTraining: 'opt-out',
    vendorLockInRisk: 'medium',
  },
  'elevenlabs': {
    outputLanguageQualityNl: 'good',
    beginnerFriendlyScore: 7,
    dataUsedForTraining: 'opt-out',
    vendorLockInRisk: 'low',
  },
  'suno': {
    beginnerFriendlyScore: 9,
    dataUsedForTraining: 'yes',
    vendorLockInRisk: 'medium',
  },
  'udio': {
    beginnerFriendlyScore: 9,
    dataUsedForTraining: 'yes',
    vendorLockInRisk: 'medium',
  },
  'whisper': {
    outputLanguageQualityNl: 'native',
    beginnerFriendlyScore: 3,
    dataUsedForTraining: 'no',
    vendorLockInRisk: 'low',
  },
  'deepgram': {
    outputLanguageQualityNl: 'good',
    beginnerFriendlyScore: 4,
    dataUsedForTraining: 'no',
    vendorLockInRisk: 'low',
  },
  'assemblyai': {
    outputLanguageQualityNl: 'good',
    beginnerFriendlyScore: 4,
    dataUsedForTraining: 'no',
    vendorLockInRisk: 'low',
  },

  // ═══════════ MEETINGS / NOTES ═══════════
  'fireflies': {
    verenigingSuitable: true,
    outputLanguageQualityNl: 'good',
    beginnerFriendlyScore: 9,
    dataUsedForTraining: 'opt-out',
    aiActRiskClass: 'minimal',
    vendorLockInRisk: 'medium',
    typicalWeeklyTimeSaved: '2-3 uur/week voor vergadernotulen',
    addMatchSegments: ['vereniging', 'stichting', 'overheid_klein'],
  },
  'fireflies-ai': {
    verenigingSuitable: true,
    outputLanguageQualityNl: 'good',
    beginnerFriendlyScore: 9,
    dataUsedForTraining: 'opt-out',
    aiActRiskClass: 'minimal',
    vendorLockInRisk: 'medium',
    typicalWeeklyTimeSaved: '2-3 uur/week voor vergadernotulen',
    addMatchSegments: ['vereniging', 'stichting', 'overheid_klein'],
  },
  'otter-ai': {
    outputLanguageQualityNl: 'basic',
    beginnerFriendlyScore: 8,
    dataUsedForTraining: 'opt-out',
    vendorLockInRisk: 'medium',
  },
  'krisp': {
    beginnerFriendlyScore: 9,
    dataUsedForTraining: 'no',
    vendorLockInRisk: 'low',
  },
  'notebooklm': {
    verenigingSuitable: true,
    outputLanguageQualityNl: 'good',
    beginnerFriendlyScore: 9,
    dataUsedForTraining: 'no',
    aiActRiskClass: 'minimal',
    vendorLockInRisk: 'low',
    addMatchSegments: ['vereniging', 'stichting', 'onderwijs'],
  },
  'notion-ai': {
    verenigingSuitable: true,
    outputLanguageQualityNl: 'good',
    beginnerFriendlyScore: 8,
    dataUsedForTraining: 'opt-out',
    vendorLockInRisk: 'high',
    addMatchSegments: ['vereniging', 'stichting'],
  },

  // ═══════════ CODING ═══════════
  'cursor': {
    beginnerFriendlyScore: 6,
    dataUsedForTraining: 'opt-out',
    vendorLockInRisk: 'medium',
  },
  'windsurf': {
    beginnerFriendlyScore: 6,
    dataUsedForTraining: 'opt-out',
    vendorLockInRisk: 'medium',
  },
  'claude-code': {
    beginnerFriendlyScore: 4,
    dataUsedForTraining: 'no',
    vendorLockInRisk: 'low',
  },
  'claude-desktop': {
    beginnerFriendlyScore: 8,
    dataUsedForTraining: 'no',
    vendorLockInRisk: 'low',
  },
  'cline': {
    beginnerFriendlyScore: 4,
    dataUsedForTraining: 'no',
    vendorLockInRisk: 'low',
  },
  'aider': {
    beginnerFriendlyScore: 3,
    dataUsedForTraining: 'no',
    vendorLockInRisk: 'low',
  },
  'bolt': {
    beginnerFriendlyScore: 8,
    dataUsedForTraining: 'opt-out',
    vendorLockInRisk: 'medium',
  },
  'lovable': {
    beginnerFriendlyScore: 9,
    dataUsedForTraining: 'opt-out',
    vendorLockInRisk: 'medium',
  },
  'v0': {
    beginnerFriendlyScore: 8,
    dataUsedForTraining: 'opt-out',
    vendorLockInRisk: 'medium',
  },
  'replit': {
    beginnerFriendlyScore: 7,
    dataUsedForTraining: 'opt-out',
    vendorLockInRisk: 'medium',
  },
  'devin': {
    beginnerFriendlyScore: 5,
    dataUsedForTraining: 'no',
    vendorLockInRisk: 'medium',
  },
  'augment-code': {
    beginnerFriendlyScore: 5,
    dataUsedForTraining: 'no',
    vendorLockInRisk: 'medium',
  },

  // ═══════════ AUTOMATION ═══════════
  'zapier': {
    verenigingSuitable: true,
    outputLanguageQualityNl: 'good',
    beginnerFriendlyScore: 7,
    dataUsedForTraining: 'no',
    aiActRiskClass: 'minimal',
    vendorLockInRisk: 'medium',
    addMatchSegments: ['vereniging', 'stichting'],
  },
  'make': {
    beginnerFriendlyScore: 5,
    dataUsedForTraining: 'no',
    vendorLockInRisk: 'medium',
  },
  'n8n': {
    beginnerFriendlyScore: 4,
    dataUsedForTraining: 'no',
    vendorLockInRisk: 'low',
  },
  'bardeen': {
    beginnerFriendlyScore: 7,
    dataUsedForTraining: 'opt-out',
    vendorLockInRisk: 'medium',
  },
  'relevance-ai': {
    beginnerFriendlyScore: 5,
    dataUsedForTraining: 'no',
    vendorLockInRisk: 'medium',
  },
  'dify': {
    beginnerFriendlyScore: 5,
    dataUsedForTraining: 'no',
    vendorLockInRisk: 'low',
  },
  'flowise': {
    beginnerFriendlyScore: 4,
    dataUsedForTraining: 'no',
    vendorLockInRisk: 'low',
  },
  'langchain': {
    beginnerFriendlyScore: 2,
    dataUsedForTraining: 'no',
    vendorLockInRisk: 'low',
  },
  'llamaindex': {
    beginnerFriendlyScore: 2,
    dataUsedForTraining: 'no',
    vendorLockInRisk: 'low',
  },
  'crewai': {
    beginnerFriendlyScore: 3,
    dataUsedForTraining: 'no',
    vendorLockInRisk: 'low',
  },
  'autogpt': {
    beginnerFriendlyScore: 3,
    dataUsedForTraining: 'no',
    vendorLockInRisk: 'low',
  },

  // ═══════════ ADMIN / FINANCE ═══════════
  'quickbooks': {
    outputLanguageQualityNl: 'poor',
    beginnerFriendlyScore: 6,
    dataUsedForTraining: 'no',
    vendorLockInRisk: 'high',
  },
  'xero': {
    outputLanguageQualityNl: 'poor',
    beginnerFriendlyScore: 6,
    dataUsedForTraining: 'no',
    vendorLockInRisk: 'high',
  },
  'rossum': {
    beginnerFriendlyScore: 7,
    dataUsedForTraining: 'no',
    vendorLockInRisk: 'high',
  },
  'vic-ai': {
    beginnerFriendlyScore: 7,
    dataUsedForTraining: 'no',
    vendorLockInRisk: 'high',
  },

  // ═══════════ HR / RECRUITMENT ═══════════
  'breezy-hr': {
    beginnerFriendlyScore: 7,
    dataUsedForTraining: 'no',
    aiActRiskClass: 'limited',
    vendorLockInRisk: 'high',
  },
  'hirevue': {
    beginnerFriendlyScore: 7,
    dataUsedForTraining: 'no',
    aiActRiskClass: 'high',
    vendorLockInRisk: 'high',
  },
  'paradox': {
    beginnerFriendlyScore: 6,
    dataUsedForTraining: 'no',
    aiActRiskClass: 'limited',
    vendorLockInRisk: 'high',
  },
  'zoho-recruit': {
    beginnerFriendlyScore: 6,
    dataUsedForTraining: 'no',
    aiActRiskClass: 'limited',
    vendorLockInRisk: 'high',
  },

  // ═══════════ SALES / CRM ═══════════
  'hubspot-ai': {
    outputLanguageQualityNl: 'good',
    beginnerFriendlyScore: 7,
    dataUsedForTraining: 'no',
    vendorLockInRisk: 'high',
  },
  'apollo-io': {
    beginnerFriendlyScore: 7,
    dataUsedForTraining: 'no',
    vendorLockInRisk: 'medium',
  },
  'clay': {
    beginnerFriendlyScore: 5,
    dataUsedForTraining: 'no',
    vendorLockInRisk: 'medium',
  },
  'salesforce-einstein': {
    beginnerFriendlyScore: 4,
    dataUsedForTraining: 'no',
    vendorLockInRisk: 'high',
  },

  // ═══════════ CUSTOMER SUPPORT ═══════════
  'intercom-fin': {
    outputLanguageQualityNl: 'good',
    beginnerFriendlyScore: 7,
    dataUsedForTraining: 'no',
    vendorLockInRisk: 'high',
  },
  'zendesk-ai': {
    outputLanguageQualityNl: 'good',
    beginnerFriendlyScore: 6,
    dataUsedForTraining: 'no',
    vendorLockInRisk: 'high',
  },
  'ada': {
    outputLanguageQualityNl: 'good',
    beginnerFriendlyScore: 6,
    dataUsedForTraining: 'no',
    vendorLockInRisk: 'high',
  },
  'cosupport-ai': {
    beginnerFriendlyScore: 6,
    dataUsedForTraining: 'no',
    vendorLockInRisk: 'high',
  },

  // ═══════════ LEGAL ═══════════
  'harvey': {
    outputLanguageQualityNl: 'good',
    beginnerFriendlyScore: 7,
    dataUsedForTraining: 'no',
    aiActRiskClass: 'limited',
    vendorLockInRisk: 'medium',
  },
  'spellbook': {
    beginnerFriendlyScore: 8,
    dataUsedForTraining: 'no',
    aiActRiskClass: 'limited',
    vendorLockInRisk: 'medium',
  },
  'ironclad': {
    beginnerFriendlyScore: 6,
    dataUsedForTraining: 'no',
    aiActRiskClass: 'limited',
    vendorLockInRisk: 'high',
  },
};

// ─── Runner ────────────────────────────────────────────────────

let touched = 0;
let skipped = 0;
const missing = [];

for (const [slug, overrides] of Object.entries(seed)) {
  const path = join(TOOLS_DIR, `${slug}.json`);
  let raw;
  try {
    raw = readFileSync(path, 'utf8');
  } catch {
    missing.push(slug);
    continue;
  }
  const tool = JSON.parse(raw);
  const before = JSON.stringify(tool);

  for (const [k, v] of Object.entries(overrides)) {
    if (k === 'addMatchSegments') {
      const curr = new Set(tool.matchSegments ?? []);
      for (const s of v) curr.add(s);
      tool.matchSegments = [...curr];
      continue;
    }
    if (FORCE || tool[k] == null) {
      tool[k] = v;
    }
  }

  const after = JSON.stringify(tool);
  if (before === after) {
    skipped++;
    continue;
  }
  if (!DRY) {
    writeFileSync(path, JSON.stringify(tool, null, 2) + '\n', 'utf8');
  }
  touched++;
  console.log(`  ${DRY ? '[dry]' : '[write]'} ${slug}.json`);
}

console.log('');
console.log(`Seeded: ${touched} tools`);
console.log(`Unchanged: ${skipped} tools`);
if (missing.length > 0) {
  console.log(`Missing (seed entry but no JSON file): ${missing.join(', ')}`);
}
if (DRY) console.log('\n(dry-run — no files written)');
