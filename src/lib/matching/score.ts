/**
 * Matching Engine — Per-Factor Scoring
 *
 * Every factor returns a raw 0-100 score; the pipeline multiplies by
 * the segment's weight and sums. Unknown data falls back to 50
 * (neutral) so missing tool metadata doesn't unfairly punish or boost.
 *
 * Source: DEBESTEAITOOLS_MATCHING_PLAN.md §6b.
 */

import type { Tool } from '../../types/tools-domain';
import { segments, jtbds, budgetBuckets, aiComfortLevels } from '../taxonomies';
import type { ScoringFactor } from '../taxonomies';
import type { UserProfile, ScoreBreakdown, FactorScore } from './types';

const NEUTRAL = 50;

// ============================================
// JOB FIT
// ============================================

/**
 * How well does this tool do the jobs the user cares about?
 * - Use-case bucket overlap (50%)
 * - Granular JTBD overlap (30%)
 * - Anti-use-case hit (−100%)
 * - `replacesTools` overlap with user's currentStack (20%)
 */
function scoreJobFit(tool: Tool, profile: UserProfile): number {
  if (profile.useCaseBuckets.length === 0) return NEUTRAL;

  // Bucket overlap
  const toolBuckets = new Set(tool.useCaseBuckets);
  const wantedBuckets = profile.useCaseBuckets;
  const bucketHits = wantedBuckets.filter((b) => toolBuckets.has(b)).length;
  const bucketScore = toolBuckets.size > 0
    ? (bucketHits / wantedBuckets.length) * 100
    : NEUTRAL;

  // JTBD overlap (only if user supplied granular JTBDs)
  let jtbdScore = NEUTRAL;
  if (profile.jtbds && profile.jtbds.length > 0) {
    const toolJtbds = new Set(tool.matchJtbds);
    if (toolJtbds.size > 0) {
      // Count exact + same-bucket hits
      let hits = 0;
      for (const j of profile.jtbds) {
        if (toolJtbds.has(j)) {
          hits += 1;
        } else {
          // Give half credit if tool covers another JTBD in same bucket
          const bucket = jtbds[j]?.bucket;
          if (bucket && tool.useCaseBuckets.includes(bucket)) hits += 0.5;
        }
      }
      jtbdScore = Math.min(100, (hits / profile.jtbds.length) * 100);
    }
  }

  // replacesTools boost
  let replaceBonus = 0;
  if (profile.currentStack && profile.currentStack.length > 0 && tool.replacesTools.length > 0) {
    const replacesLower = tool.replacesTools.map((s) => s.toLowerCase());
    const stackLower = profile.currentStack.map((s) => s.toLowerCase());
    const hits = stackLower.filter((s) => replacesLower.some((r) => r.includes(s))).length;
    replaceBonus = Math.min(20, hits * 10);
  }

  // Anti-use-case penalty (hard-ish)
  let antiPenalty = 0;
  if (tool.antiUseCases.length > 0 && profile.useCaseBuckets.length > 0) {
    // If any anti-use-case text mentions a wanted bucket → penalise
    const antiText = tool.antiUseCases.join(' ').toLowerCase();
    for (const b of profile.useCaseBuckets) {
      if (antiText.includes(b)) antiPenalty = Math.max(antiPenalty, 30);
    }
  }

  const base = bucketScore * 0.6 + jtbdScore * 0.4;
  return Math.max(0, Math.min(100, base + replaceBonus - antiPenalty));
}

// ============================================
// TECH COMFORT / SETUP
// ============================================

/**
 * Setup & learning-curve fit for the user's AI-comfort level.
 * Beginners strongly penalised by high setup times; power-users
 * don't care as much.
 */
function scoreTechComfort(tool: Tool, profile: UserProfile): number {
  const comfortRank = aiComfortLevels[profile.aiComfort].score; // 1..4
  const isBeginner = comfortRank <= 2;

  // Setup time (primary signal)
  const setupScore = setupTimeScore(tool, isBeginner);
  // Beginner-friendliness (if editorial data present)
  const bf = tool.beginnerFriendlyScore;
  const beginnerScore = bf != null ? bf * 10 : NEUTRAL;
  // Requires developer is a hard negative for beginners
  const devPenalty = tool.requiresDeveloper && isBeginner ? 30 : 0;

  if (isBeginner) {
    return clampScore(setupScore * 0.5 + beginnerScore * 0.5 - devPenalty);
  }
  // Power-users care less about setup complexity
  const ease = tool.easeOfUseScore != null ? tool.easeOfUseScore * 10 : NEUTRAL;
  return clampScore(setupScore * 0.3 + ease * 0.7);
}

function setupTimeScore(tool: Tool, isBeginner: boolean): number {
  switch (tool.setupTime) {
    case 'under_15min': return 100;
    case 'under_1h':    return isBeginner ? 75 : 90;
    case 'under_4h':    return isBeginner ? 40 : 70;
    case 'days':        return isBeginner ? 10 : 40;
    default:            return NEUTRAL;
  }
}

// ============================================
// BUDGET FIT
// ============================================

/**
 * How well does pricing fit the user's budget bucket?
 * Already filtered at hard-filter stage, but scoring still rewards
 * tools significantly under budget (headroom).
 */
function scoreBudgetFit(tool: Tool, profile: UserProfile): number {
  if (!profile.budget) return NEUTRAL;
  const maxEur = budgetBuckets[profile.budget].maxEur;

  if (profile.budget === 'free') {
    return tool.hasFreePlan ? 100 : 0;
  }
  if (profile.budget === 'any') return NEUTRAL;

  const price = tool.startingPriceMonthly;
  if (price == null) {
    // Unknown pricing → neutral but slightly penalised (uncertainty)
    return 45;
  }
  if (price === 0) return 100;
  // Linear: price at 0 → 100, price at maxEur → 40, above → 0 (filtered)
  const ratio = 1 - price / maxEur;
  return clampScore(40 + ratio * 60);
}

// ============================================
// NL CONTEXT
// ============================================

/**
 * Dutch-language output, UI, support. If user hasn't set a hard
 * minDutchOutputQuality, score the soft preference.
 */
function scoreNlContext(tool: Tool): number {
  let score = 0;
  let parts = 0;

  if (tool.outputLanguageQualityNl) {
    const map = { native: 100, good: 80, basic: 50, poor: 20 };
    score += map[tool.outputLanguageQualityNl];
    parts += 1;
  } else if (tool.supportsDutchLanguage) {
    score += 60; // bool fallback
    parts += 1;
  }
  if (tool.hasDutchUI) { score += 90; parts += 1; }
  if (tool.offersDutchSupport) { score += 90; parts += 1; }

  if (parts === 0) return 30; // no NL data = assume weak NL
  return clampScore(score / parts);
}

// ============================================
// INTEGRATIONS
// ============================================

function scoreIntegrations(tool: Tool, profile: UserProfile): number {
  // Required integrations already hard-filtered — score rewards overlap
  // with current stack + raw integration count as a proxy for ecosystem.
  const toolInts = new Set(tool.controlledIntegrations);

  if (profile.currentStack && profile.currentStack.length > 0) {
    const hits = profile.currentStack.filter((i) => toolInts.has(i)).length;
    return clampScore((hits / profile.currentStack.length) * 100);
  }
  if (profile.requiredIntegrations && profile.requiredIntegrations.length > 0) {
    // All required present (else filtered) — bonus for extras
    const extras = Math.max(0, toolInts.size - profile.requiredIntegrations.length);
    return clampScore(70 + Math.min(30, extras * 5));
  }
  // No integration signals from user → rank by ecosystem size (capped)
  return clampScore(30 + Math.min(60, toolInts.size * 5));
}

// ============================================
// SECURITY / AVG
// ============================================

function scoreSecurity(tool: Tool): number {
  const flags = [
    tool.gdprReady, tool.euHostingAvailable, tool.dpaAvailable,
    tool.soc2, tool.sso, tool.auditLogs,
  ];
  const hasAny = flags.some((f) => f != null);
  if (!hasAny) return NEUTRAL;
  const trueCount = flags.filter(Boolean).length;
  return Math.round((trueCount / flags.length) * 100);
}

// ============================================
// TEAM FIT
// ============================================

function scoreTeamFit(tool: Tool, profile: UserProfile): number {
  if (!profile.teamSize || !tool.idealTeamSize) return NEUTRAL;
  const { min, max } = tool.idealTeamSize;

  if (profile.teamSize >= min && profile.teamSize <= max) {
    // In range — the closer to midpoint, the better
    const mid = (min + max) / 2;
    const span = Math.max(1, max - min);
    const distance = Math.abs(profile.teamSize - mid);
    return clampScore(100 - (distance / span) * 20);
  }
  return 30; // outside range — already filtered, but scoring defensively
}

// ============================================
// BREAKDOWN + FINAL SCORE
// ============================================

export function scoreBreakdown(tool: Tool, profile: UserProfile): ScoreBreakdown {
  const weights = segments[profile.segment].defaultWeights;

  const raw: Record<ScoringFactor, number> = {
    jobFit:      scoreJobFit(tool, profile),
    techComfort: scoreTechComfort(tool, profile),
    budgetFit:   scoreBudgetFit(tool, profile),
    nlContext:   scoreNlContext(tool),
    integrations: scoreIntegrations(tool, profile),
    security:    scoreSecurity(tool),
    teamFit:     scoreTeamFit(tool, profile),
  };

  const breakdown = {} as ScoreBreakdown;
  for (const factor of Object.keys(raw) as ScoringFactor[]) {
    const weight = weights[factor] ?? 0;
    breakdown[factor] = {
      raw: raw[factor],
      weight,
      weighted: raw[factor] * weight,
    } satisfies FactorScore;
  }

  return breakdown;
}

export function finalScore(breakdown: ScoreBreakdown): number {
  let sum = 0;
  for (const factor of Object.keys(breakdown) as ScoringFactor[]) {
    sum += breakdown[factor].weighted;
  }
  return Math.round(sum);
}

// ============================================
// HELPERS
// ============================================

function clampScore(n: number): number {
  if (n < 0) return 0;
  if (n > 100) return 100;
  return Math.round(n);
}
