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

const TOOLS_DIR = join(import.meta.dirname, '..', 'src', 'content', 'tools');
const DRY = process.argv.includes('--dry-run');

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

/** Free-text integration → controlled integration key */
const integrationAliasMap = {
  'exact': 'exact', 'exact online': 'exact',
  'afas': 'afas',
  'twinfield': 'twinfield',
  'moneybird': 'moneybird',
  'snelstart': 'snelstart',
  'visma': 'visma',
  'yuki': 'yuki',
  'microsoft 365': 'microsoft_365', 'm365': 'microsoft_365', 'office 365': 'microsoft_365',
  'google workspace': 'google_workspace', 'gsuite': 'google_workspace',
  'outlook': 'outlook',
  'gmail': 'gmail',
  'microsoft teams': 'teams', 'teams': 'teams', 'ms teams': 'teams',
  'slack': 'slack',
  'notion': 'notion',
  'confluence': 'confluence',
  'sharepoint': 'sharepoint',
  'dropbox': 'dropbox',
  'onedrive': 'onedrive',
  'google drive': 'google_drive', 'gdrive': 'google_drive',
  'box': 'box',
  'hubspot': 'hubspot',
  'salesforce': 'salesforce',
  'pipedrive': 'pipedrive',
  'teamleader': 'teamleader',
  'mailchimp': 'mailchimp',
  'convertkit': 'convertkit', 'kit': 'convertkit',
  'mailerlite': 'mailerlite',
  'laposta': 'laposta',
  'spotler': 'spotler',
  'klaviyo': 'klaviyo',
  'zapier': 'zapier',
  'make': 'make', 'integromat': 'make',
  'n8n': 'n8n',
  'google calendar': 'google_calendar',
  'outlook calendar': 'outlook_calendar',
  'calendly': 'calendly',
  'linkedin': 'linkedin',
  'facebook': 'meta_business', 'instagram': 'meta_business', 'meta business': 'meta_business',
  'buffer': 'buffer',
  'hootsuite': 'hootsuite',
  'github': 'github',
  'gitlab': 'gitlab',
  'vs code': 'vscode', 'vscode': 'vscode', 'visual studio code': 'vscode',
  'jetbrains': 'jetbrains',
  'conscribo': 'conscribo',
  'e-captain': 'e_captain',
  'sportlink': 'sportlink',
  'allunited': 'allunited',
  'zoom': 'zoom',
  'google meet': 'google_meet',
  'zendesk': 'zendesk',
  'intercom': 'intercom',
  'freshdesk': 'freshdesk',
  'api': 'rest_api', 'rest api': 'rest_api',
  'webhook': 'webhook', 'webhooks': 'webhook',
  'android': 'google_workspace', // rough mapping
  'google cloud': 'google_workspace',
  'x / twitter': 'meta_business', // rough mapping
};

// ─── Helpers ────────────────────────────────────────────────────

function deriveSetupTime(tool) {
  if (tool.setupTime) return tool.setupTime; // already set
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
  if (Array.isArray(tool.matchSegments) && tool.matchSegments.length > 0) {
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
  if (tool.idealTeamSize && typeof tool.idealTeamSize === 'object') {
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
  if (Array.isArray(tool.controlledIntegrations) && tool.controlledIntegrations.length > 0) {
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

  // Derive fields (only set if empty / undefined)
  const setupTime = deriveSetupTime(tool);
  if (setupTime && !tool.setupTime) tool.setupTime = setupTime;

  const segments = deriveSegments(tool);
  if (segments.length > 0 && (!tool.matchSegments || tool.matchSegments.length === 0)) {
    tool.matchSegments = segments;
  }

  const teamSize = deriveTeamSize(tool);
  if (teamSize && !tool.idealTeamSize) tool.idealTeamSize = teamSize;

  const controlledInts = deriveControlledIntegrations(tool);
  if (controlledInts.length > 0 && (!tool.controlledIntegrations || tool.controlledIntegrations.length === 0)) {
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
