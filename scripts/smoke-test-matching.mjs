#!/usr/bin/env node
/**
 * Smoke-test the matching pipeline against real tool data.
 * Reads tool JSONs directly (bypasses Astro content collection) and
 * feeds a few sample profiles through run().
 *
 * Run: node scripts/smoke-test-matching.mjs
 *
 * Note: imports .ts modules via tsx loader; requires `tsx` binary.
 */

import { readFileSync, readdirSync } from 'fs';
import { join } from 'path';
import { pathToFileURL } from 'url';

const ROOT = join(import.meta.dirname, '..');
const TOOLS_DIR = join(ROOT, 'src', 'content', 'tools');

// Load tool JSONs
const files = readdirSync(TOOLS_DIR).filter((f) => f.endsWith('.json'));
const tools = files.map((f) => {
  const raw = JSON.parse(readFileSync(join(TOOLS_DIR, f), 'utf8'));
  // Slug from filename. Astro collection strips .json
  raw.slug = f.replace(/\.json$/, '');
  // Back-fill defaults that the Zod schema would apply
  raw.matchSegments ??= [];
  raw.useCaseBuckets ??= [];
  raw.matchJtbds ??= [];
  raw.controlledIntegrations ??= [];
  raw.priceTiers ??= [];
  raw.complementaryTools ??= [];
  raw.replacesTools ??= [];
  raw.targetAudience ??= [];
  raw.companySizeFit ??= [];
  raw.businessFunctions ??= [];
  raw.notableCustomers ??= [];
  raw.primaryJobsToBeDone ??= [];
  raw.antiUseCases ??= [];
  raw.replacementFor ??= [];
  raw.tags ??= [];
  raw.integrations ??= [];
  raw.screenshotUrls ??= [];
  raw.mainCompetitors ??= [];
  raw.keyFeatures ??= [];
  raw.pricingCurrency ??= 'eur';
  raw.supportsDutchLanguage ??= false;
  raw.hasDutchUI ??= false;
  raw.offersDutchSupport ??= false;
  raw.testedByEditor ??= false;
  return raw;
}).filter((t) => !t.draft);

console.log(`Loaded ${tools.length} tools\n`);

// Import the matching engine via tsx dynamic import
const { run } = await import(pathToFileURL(join(ROOT, 'src', 'lib', 'matching', 'index.ts')).href);

// ─── Sample profiles ────────────────────────────────────────────

const profiles = [
  {
    label: 'ZZP tekstschrijver, beginner, beperkt budget',
    profile: {
      segment: 'zzp',
      useCaseBuckets: ['writing', 'social_content'],
      aiComfort: 'tried_chatgpt',
      budget: 'under_20',
    },
  },
  {
    label: 'MKB klein, admin & facturatie, NL-output belangrijk',
    profile: {
      segment: 'mkb_klein',
      teamSize: 8,
      useCaseBuckets: ['admin_finance', 'customer_mail'],
      aiComfort: 'regular_1_2',
      minDutchOutputQuality: 'good',
      requireEuHosting: true,
      budget: 'under_50',
    },
  },
  {
    label: 'Vereniging, nieuwsbrief & social, gratis',
    profile: {
      segment: 'vereniging',
      useCaseBuckets: ['writing', 'social_content'],
      aiComfort: 'never',
      budget: 'free',
      requireEuHosting: true,
    },
  },
];

// ─── Run + print ────────────────────────────────────────────────

for (const { label, profile } of profiles) {
  console.log(`${'─'.repeat(72)}`);
  console.log(`PROFILE: ${label}`);
  console.log(`${'─'.repeat(72)}`);

  const output = run({ profile, tools });

  console.log(`Candidates after filter: ${output.candidateCount}/${output.totalToolCount}`);
  console.log(`Confidence: ${output.confidence.toFixed(2)}`);

  if (output.followUp) {
    console.log(`\n⚠️  Low confidence — follow-up needed:`);
    console.log(`   Q: ${output.followUp.question}`);
    console.log(`   A: ${output.followUp.optionA.label}`);
    console.log(`   B: ${output.followUp.optionB.label}`);
  }

  if (output.top3.length > 0) {
    console.log(`\nTop 3${output.suppressed ? ' (suppressed — UI would hide)' : ''}:`);
    for (const r of output.top3) {
      console.log(`  ${r.rank}. ${r.slug.padEnd(30)} ${r.score}%  ${r.reason}`);
    }
  }

  if (output.alternatives.length > 0) {
    console.log(`\nAlternatives:`);
    for (const r of output.alternatives) {
      console.log(`  ${r.rank}. ${r.slug.padEnd(30)} ${r.score}%  ${r.whyNotTop3 ?? ''}`);
    }
  }

  console.log(`\nRejected: ${output.rejected.length} tools`);
  if (output.rejected.length > 0 && output.rejected.length <= 3) {
    for (const r of output.rejected.slice(0, 3)) {
      console.log(`  - ${r.slug}: ${r.reasons.join('; ')}`);
    }
  }
  console.log();
}
