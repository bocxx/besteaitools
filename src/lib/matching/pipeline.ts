/**
 * Matching Engine — Pipeline Orchestration
 *
 * Entry point: run(). Chains filter → score → rank → confidence →
 * follow-up. Pure function, no side effects, fully deterministic for a
 * given (profile, tools) input.
 *
 * Source: DEBESTEAITOOLS_MATCHING_PLAN.md §6a.
 */

import type { Tool } from '../../types/tools-domain';
import { segments } from '../taxonomies';
import type { ScoringFactor } from '../taxonomies';
import { applyFilters } from './filter';
import { scoreBreakdown, finalScore } from './score';
import { computeConfidence, buildFollowUp, isLowConfidence } from './confidence';
import type {
  MatchInput, MatchOutput, MatchResult, ScoreBreakdown,
} from './types';

/** Run the full matching pipeline. */
export function run(input: MatchInput): MatchOutput {
  const { profile, tools } = input;

  // ── Stage 1: hard filters ──
  const { candidates, rejected } = applyFilters(tools, profile);

  // ── Stage 2: score each candidate ──
  const scored: MatchResult[] = candidates.map((tool) => {
    const breakdown = scoreBreakdown(tool, profile);
    const score = finalScore(breakdown);
    return { slug: tool.slug, score, breakdown, rank: 0 };
  });

  // ── Stage 3: rank ──
  scored.sort((a, b) => b.score - a.score);
  scored.forEach((r, i) => { r.rank = i + 1; });

  // ── Stage 4: reasons + whyNot ──
  for (const r of scored.slice(0, 6)) {
    r.reason = buildReason(r, profile.segment);
  }
  for (const r of scored.slice(3, 6)) {
    r.whyNotTop3 = buildWhyNot(r, scored[2]);
  }

  // ── Stage 5: confidence + follow-up ──
  const top3 = scored.slice(0, 3);
  const alternatives = scored.slice(3, 6);
  const confidence = computeConfidence(top3, profile, candidates.length);
  const suppressed = isLowConfidence(confidence);
  const followUp = suppressed ? buildFollowUp(top3, profile) : undefined;

  return {
    top3,
    alternatives,
    rejected,
    confidence,
    suppressed,
    followUp,
    candidateCount: candidates.length,
    totalToolCount: tools.length,
  };
}

// ============================================
// REASON TEMPLATES (template-based, no LLM)
// ============================================

function buildReason(result: MatchResult, segmentKey: keyof typeof segments): string {
  const breakdown = result.breakdown;
  const strongest = topFactorsByRaw(breakdown, 2);
  const labels = strongest.map(factorLabel).join(' + ');
  const weight = segments[segmentKey].defaultWeights;
  const weightedTop = topFactorsByWeighted(breakdown, 1)[0];
  const primary = factorLabel(weightedTop);

  return `${result.score}% match — sterk op ${labels} (${primary} weegt ${Math.round((weight[weightedTop] ?? 0) * 100)}% voor ${segmentKey})`;
}

function buildWhyNot(result: MatchResult, top3Last: MatchResult): string {
  const gap = top3Last.score - result.score;
  const diffFactor = biggestFactorGap(result.breakdown, top3Last.breakdown);
  if (!diffFactor) return `${gap} punten onder top-3`;
  return `${gap} punten onder top-3 — zwakker op ${factorLabel(diffFactor)}`;
}

function topFactorsByRaw(b: ScoreBreakdown, n: number): ScoringFactor[] {
  return (Object.keys(b) as ScoringFactor[])
    .filter((f) => b[f].weight > 0)
    .sort((a, z) => b[z].raw - b[a].raw)
    .slice(0, n);
}

function topFactorsByWeighted(b: ScoreBreakdown, n: number): ScoringFactor[] {
  return (Object.keys(b) as ScoringFactor[])
    .sort((a, z) => b[z].weighted - b[a].weighted)
    .slice(0, n);
}

function biggestFactorGap(a: ScoreBreakdown, ref: ScoreBreakdown): ScoringFactor | null {
  let worstGap = 0;
  let worst: ScoringFactor | null = null;
  for (const f of Object.keys(a) as ScoringFactor[]) {
    const gap = ref[f].raw - a[f].raw;
    if (gap > worstGap) {
      worstGap = gap;
      worst = f;
    }
  }
  return worst;
}

const factorLabels: Record<ScoringFactor, string> = {
  jobFit:       'taak-fit',
  techComfort:  'tech-comfort',
  budgetFit:    'budget',
  nlContext:    'NL-ondersteuning',
  integrations: 'integraties',
  security:     'beveiliging',
  teamFit:      'team-fit',
};

function factorLabel(f: ScoringFactor): string {
  return factorLabels[f];
}
