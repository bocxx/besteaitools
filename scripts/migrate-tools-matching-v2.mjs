#!/usr/bin/env node
/**
 * Matching-plan v2 migration — additive-only.
 *
 * For each tool JSON in src/content/tools/*.json, auto-derive the new
 * matching-plan fields from existing data where possible. Leaves fields
 * undefined where editorial judgment is required. Never removes data.
 *
 * Rules:
 *   - setupTime ← (timeToFirstValue × setupComplexity)
 *   - matchSegments ← targetAudience + companySizeFit
 *   - idealTeamSize ← companySizeFit bounds
 *   - controlledIntegrations ← normalised `integrations` strings
 *
 * Run: node scripts/migrate-tools-matching-v2.mjs
 *      node scripts/migrate-tools-matching-v2.mjs --dry-run
 */

import { readFileSync, writeFileSync, readdirSync } from 'fs';
import { join } from 'path';

const ROOT = join(import.meta.dirname, '..');
const TOOLS_DIR = join(ROOT, 'src', 'content', 'tools');
const ALIAS_FILE = join(ROOT, 'src', 'lib', 'taxonomies', 'integration-aliases.json');
const DRY = process.argv.includes('--dry-run');
const FORCE = process.argv.includes('--force'); // overwrite existing derived fields

// Shared alias map — single source of truth with integrations.ts
const integrationAliasMap = Object.fromEntries(
  Object.entries(JSON.parse(readFileSync(ALIAS_FILE, 'utf8')))
    .filter(([k]) => !k.startsWith('_')),
);

// ─── Rule tables ───────────────────────────────────────────────

/** (timeToFirstValue, setupComplexity) → setupTime bucket */
const setupTimeMatrix = {
  'minutes|low':    'under_15min',
  'minutes|medium': 'under_1h',
  'minutes|high':   'under_4h',
  'hours|low':      'under_1h',
  'hours|medium':   'under_4h',
  'hours|high':     'days',
  'days|low':       'days',
  'days|medium':    'days',
  'days|high':      'days',
  'weeks|low':      'days',
  'weeks|medium':   'days',
  'weeks|high':     'days',
};

/** companySizeFit keys → segment keys */
const companySizeToSegment = {
  solo:       ['zzp'],
  small:      ['mkb_klein'],
  medium:     ['mkb_middel'],
  large:      ['enterprise'],
  enterprise: ['enterprise'],
};

/** targetAudience keys → segment keys */
const targetAudienceToSegment = {
  solo:            ['zzp'],
  freelancer:      ['zzp'],
  mkb:             ['mkb_klein', 'mkb_middel'],
  enterprise:      ['enterprise'],
  // Nieuwe keys zijn 1-op-1
  zzp:             ['zzp'],
  mkb_klein:       ['mkb_klein'],
  mkb_middel:      ['mkb_middel'],
  vereniging:      ['vereniging'],
  stichting:       ['stichting'],
  overheid_klein:  ['overheid_klein'],
  onderwijs:       ['onderwijs'],
};

/** companySizeFit → {min, max} teamsize (merge by min/max across all) */
const companySizeBounds = {
  solo:       { min: 1,    max: 1 },
  small:      { min: 2,    max: 10 },
  medium:     { min: 11,   max: 250 },
  large:      { min: 251,  max: 1000 },
  enterprise: { min: 1000, max: 100000 },
};

// ─── Helpers ────────────────────────────────────────────────────

function deriveSetupTime(tool) {
  if (!FORCE && tool.setupTime) return tool.setupTime; // already set
  const ttfv = tool.timeToFirstValue;
  const setup = tool.setupComplexity;
  if (!ttfv || !setup) {
    // Fallback on just ttfv
    if (ttfv === 'minutes') return 'under_15min';
    if (ttfv === 'hours') return 'under_1h';
    if (ttfv === 'days') return 'days';
    if (ttfv === 'weeks') return 'days';
    return undefined;
  }
  return setupTimeMatrix[`${ttfv}|${setup}`];
}

function deriveSegments(tool) {
  if (!FORCE && Array.isArray(tool.matchSegments) && tool.matchSegments.length > 0) {
    return tool.matchSegments; // already set
  }
  const set = new Set();
  for (const ta of tool.targetAudience ?? []) {
    for (const seg of targetAudienceToSegment[ta] ?? []) set.add(seg);
  }
  for (const cs of tool.companySizeFit ?? []) {
    for (const seg of companySizeToSegment[cs] ?? []) set.add(seg);
  }
  return [...set];
}

function deriveTeamSize(tool) {
  if (!FORCE && tool.idealTeamSize && typeof tool.idealTeamSize === 'object') {
    return tool.idealTeamSize;
  }
  const sizes = tool.companySizeFit ?? [];
  if (sizes.length === 0) return undefined;
  let min = Infinity;
  let max = 0;
  for (const s of sizes) {
    const b = companySizeBounds[s];
    if (!b) continue;
    min = Math.min(min, b.min);
    max = Math.max(max, b.max);
  }
  if (!isFinite(min) || max === 0) return undefined;
  return { min, max };
}

function deriveControlledIntegrations(tool) {
  if (!FORCE && Array.isArray(tool.controlledIntegrations) && tool.controlledIntegrations.length > 0) {
    return tool.controlledIntegrations;
  }
  const raw = tool.integrations ?? [];
  const out = new Set();
  for (const s of raw) {
    const key = integrationAliasMap[s.trim().toLowerCase()];
    if (key) out.add(key);
  }
  return [...out];
}

// ─── Main ───────────────────────────────────────────────────────

const files = readdirSync(TOOLS_DIR).filter((f) => f.endsWith('.json'));
let touched = 0;
let skipped = 0;
const unknownIntegrations = new Set();

for (const file of files) {
  const path = join(TOOLS_DIR, file);
  const raw = readFileSync(path, 'utf8');
  const tool = JSON.parse(raw);

  const before = JSON.stringify(tool);

  // Derive fields. With --force, overwrite existing derived values.
  const setupTime = deriveSetupTime(tool);
  if (setupTime && (FORCE || !tool.setupTime)) tool.setupTime = setupTime;

  const segments = deriveSegments(tool);
  if (segments.length > 0 && (FORCE || !tool.matchSegments || tool.matchSegments.length === 0)) {
    tool.matchSegments = segments;
  }

  const teamSize = deriveTeamSize(tool);
  if (teamSize && (FORCE || !tool.idealTeamSize)) tool.idealTeamSize = teamSize;

  const controlledInts = deriveControlledIntegrations(tool);
  if (FORCE || !tool.controlledIntegrations || tool.controlledIntegrations.length === 0) {
    tool.controlledIntegrations = controlledInts;
  }

  // Track unknown integrations for editorial follow-up
  for (const s of tool.integrations ?? []) {
    if (!integrationAliasMap[s.trim().toLowerCase()]) {
      unknownIntegrations.add(s);
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
  console.log(`  ${DRY ? '[dry]' : '[write]'} ${file}`);
}

console.log('');
console.log(`Migrated: ${touched} files`);
console.log(`Unchanged: ${skipped} files`);

if (unknownIntegrations.size > 0) {
  console.log('');
  console.log(`Unknown integrations (editorial follow-up, ${unknownIntegrations.size}):`);
  for (const s of [...unknownIntegrations].sort()) {
    console.log(`  - ${s}`);
  }
}

if (DRY) console.log('\n(dry-run — no files written)');
