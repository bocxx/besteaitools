#!/usr/bin/env tsx
/**
 * apply-diffs.ts
 *
 * Auto-applies safe enrichment diffs from enrichment_diff.json to tool JSON files.
 *
 * TIER 1 — Always apply (new fields, current is always null):
 *   timeToFirstValue, setupComplexity, learningCurve, companySizeFit, bestUseCaseStage
 *
 * TIER 2 — Apply factual fields (overwrite scalars if null, union-merge arrays):
 *   dataResidency, deploymentType, openSource, businessFunctions, targetAudience
 *
 * TIER 3 — Skipped (editorial copy, review manually in Keystatic):
 *   longDescription, bestFor, useCases, strengths, limitations, pricing
 *
 * Usage:
 *   npx tsx scripts/apply-diffs.ts              # dry-run (preview changes)
 *   npx tsx scripts/apply-diffs.ts --apply      # write changes to disk
 *   npx tsx scripts/apply-diffs.ts --apply --tier1-only  # only new v2 fields
 */

import { promises as fs } from 'node:fs';
import path from 'node:path';

const ROOT = process.cwd();
const CONTENT_DIR = path.join(ROOT, 'src', 'content', 'tools');
const DIFF_PATH = path.join(ROOT, 'src', 'data', 'reports', 'enrichment_diff.json');

// ── Tier classification ───────────────────────────────────────────────────────

const TIER1 = new Set([
  'timeToFirstValue',
  'setupComplexity',
  'learningCurve',
  'companySizeFit',
  'bestUseCaseStage',
]);

const TIER2_SCALAR = new Set([
  'dataResidency',
  'deploymentType',
  'openSource',
]);

const TIER2_ARRAY = new Set([
  'businessFunctions',
  'targetAudience',
]);

// ── Args ──────────────────────────────────────────────────────────────────────

const args = process.argv.slice(2);
const DRY_RUN   = !args.includes('--apply');
const TIER1_ONLY = args.includes('--tier1-only');

// ── Helpers ───────────────────────────────────────────────────────────────────

function isAutoApply(field: string): boolean {
  if (TIER1.has(field)) return true;
  if (TIER1_ONLY) return false;
  return TIER2_SCALAR.has(field) || TIER2_ARRAY.has(field);
}

/** Union-merge two arrays, preserving order, deduplicating. */
function mergeArrays(current: unknown, suggested: unknown): string[] {
  const a = Array.isArray(current) ? (current as string[]) : [];
  const b = Array.isArray(suggested) ? (suggested as string[]) : [];
  return [...new Set([...a, ...b])];
}

// ── Main ──────────────────────────────────────────────────────────────────────

async function main() {
  if (DRY_RUN) {
    console.log('🔍 Dry-run mode — pass --apply to write changes\n');
  }

  const rawDiffs = JSON.parse(await fs.readFile(DIFF_PATH, 'utf8')) as Array<{
    slug: string;
    field: string;
    current: unknown;
    suggested: unknown;
    enriched_at?: string;
  }>;

  // Group diffs by slug
  const bySlug = new Map<string, typeof rawDiffs>();
  for (const diff of rawDiffs) {
    if (!bySlug.has(diff.slug)) bySlug.set(diff.slug, []);
    bySlug.get(diff.slug)!.push(diff);
  }

  let appliedTotal = 0;
  let skippedEditorial = 0;
  let skippedHasValue = 0;
  let fileCount = 0;

  for (const [slug, diffs] of bySlug) {
    const filePath = path.join(CONTENT_DIR, `${slug}.json`);

    let tool: Record<string, unknown>;
    try {
      tool = JSON.parse(await fs.readFile(filePath, 'utf8'));
    } catch {
      console.warn(`⚠️  ${slug}.json not found — skipping`);
      continue;
    }

    const changes: Record<string, unknown> = {};

    for (const diff of diffs) {
      const { field, current, suggested } = diff;

      if (!isAutoApply(field)) {
        skippedEditorial++;
        continue;
      }

      // Tier 1: always apply (current is null)
      if (TIER1.has(field)) {
        if (suggested != null) {
          changes[field] = suggested;
          appliedTotal++;
        }
        continue;
      }

      // Tier 2 arrays: union-merge (never lose existing manual values)
      if (TIER2_ARRAY.has(field)) {
        const merged = mergeArrays(current, suggested);
        const currentArr = Array.isArray(current) ? current : [];
        if (JSON.stringify(merged) !== JSON.stringify(currentArr)) {
          changes[field] = merged;
          appliedTotal++;
        }
        continue;
      }

      // Tier 2 scalars: only apply if current is null/undefined (respect manual values)
      if (TIER2_SCALAR.has(field)) {
        if (current == null && suggested != null) {
          changes[field] = suggested;
          appliedTotal++;
        } else if (current != null) {
          skippedHasValue++;
        }
        continue;
      }
    }

    if (Object.keys(changes).length === 0) continue;

    const updated = { ...tool, ...changes };

    if (DRY_RUN) {
      console.log(`📝 ${slug}:`);
      for (const [k, v] of Object.entries(changes)) {
        console.log(`   ${k}: ${JSON.stringify(tool[k] ?? null)} → ${JSON.stringify(v)}`);
      }
    } else {
      await fs.writeFile(filePath, `${JSON.stringify(updated, null, 2)}\n`, 'utf8');
    }

    fileCount++;
  }

  console.log(`\n${ DRY_RUN ? '🔍 Would apply' : '✅ Applied'} ${appliedTotal} changes across ${fileCount} files`);
  console.log(`   ⏭️  Skipped ${skippedEditorial} editorial diffs (Tier 3 — review in Keystatic)`);
  if (skippedHasValue > 0) {
    console.log(`   🔒 Skipped ${skippedHasValue} scalar fields that already have a manual value`);
  }
  if (DRY_RUN) {
    console.log('\nRun with --apply to write changes.');
  }
}

main().catch((e) => { console.error(e); process.exit(1); });
