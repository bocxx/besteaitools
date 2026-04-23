/**
 * Matching Engine — Confidence Calculation
 *
 * Confidence combines three signals:
 *  1. How distinct the top-3 scores are (higher spread = higher confidence)
 *  2. How complete the user's intake profile is (more answers = higher)
 *  3. Whether the candidate set is robust (too small = fragile ranking)
 *
 * Below the threshold, pipeline asks a single disambiguating follow-up
 * instead of returning a weak top-3.
 *
 * Source: DEBESTEAITOOLS_MATCHING_PLAN.md §6d.
 */

import type { UserProfile, MatchResult, FollowUpQuestion } from './types';

const CONFIDENCE_THRESHOLD = 0.6;
const STDEV_WEIGHT_K = 0.02;

/**
 * Confidence score 0-1. Higher = system is sure about the top-3.
 */
export function computeConfidence(
  topResults: MatchResult[],
  profile: UserProfile,
  candidateCount: number,
): number {
  if (topResults.length === 0) return 0;

  // (1) Distinctness: higher stdev = more differentiation
  const scores = topResults.map((r) => r.score);
  const stdev = standardDeviation(scores);
  const distinctness = Math.min(1, stdev * STDEV_WEIGHT_K);

  // (2) Intake completeness: 0-1 ratio of optional fields answered
  const completeness = intakeCompleteness(profile);

  // (3) Candidate-set size
  const robustness = candidateCount >= 10 ? 1 : 0.7;

  // Multiplicative: weakest link caps confidence
  const confidence = distinctness * completeness * robustness;
  return Math.max(0, Math.min(1, confidence));
}

export function isLowConfidence(c: number): boolean {
  return c < CONFIDENCE_THRESHOLD;
}

/**
 * Optional-field completeness ratio. Required fields (segment,
 * useCaseBuckets, aiComfort) are guaranteed; this measures how much
 * Laag 4-5 refinement the user gave.
 */
function intakeCompleteness(profile: UserProfile): number {
  const optionalFields: (keyof UserProfile)[] = [
    'teamSize', 'jtbds',
    'requireEuHosting', 'minDutchOutputQuality', 'requiredIntegrations',
    'disallowTraining', 'requireSso', 'requireAuditLogs',
    'budget', 'currentStack',
  ];

  let answered = 0;
  for (const f of optionalFields) {
    const v = profile[f];
    if (v == null) continue;
    if (Array.isArray(v) && v.length === 0) continue;
    if (v === false) continue;
    answered += 1;
  }

  // Floor at 0.5 so empty optional-fields doesn't nullify confidence
  return 0.5 + (answered / optionalFields.length) * 0.5;
}

function standardDeviation(nums: number[]): number {
  if (nums.length < 2) return 0;
  const mean = nums.reduce((a, b) => a + b, 0) / nums.length;
  const variance = nums.reduce((acc, n) => acc + (n - mean) ** 2, 0) / nums.length;
  return Math.sqrt(variance);
}

// ============================================
// FOLLOW-UP QUESTION PICKER
// ============================================

/**
 * Pick a disambiguating follow-up when confidence is low.
 * Strategy: find the factor where the top-3 tools differ most, and
 * surface a question that resolves it.
 */
export function buildFollowUp(
  topResults: MatchResult[],
  profile: UserProfile,
): FollowUpQuestion | undefined {
  if (topResults.length < 2) return undefined;

  // Find factor with highest variance across top-3
  const factors = Object.keys(topResults[0].breakdown) as (keyof typeof topResults[0]['breakdown'])[];
  let maxVar = 0;
  let maxFactor: typeof factors[number] | null = null;

  for (const f of factors) {
    const rawScores = topResults.map((r) => r.breakdown[f].raw);
    const v = standardDeviation(rawScores);
    if (v > maxVar) {
      maxVar = v;
      maxFactor = f;
    }
  }
  if (!maxFactor) return undefined;

  return questionForFactor(maxFactor, profile);
}

function questionForFactor(
  factor: ReturnType<typeof inferFactor>,
  profile: UserProfile,
): FollowUpQuestion | undefined {
  switch (factor) {
    case 'budgetFit':
      if (profile.budget) return undefined;
      return {
        question: 'Wat weegt zwaarder: lage kosten of volledige features?',
        factor,
        optionA: { label: 'Lage kosten (maximaal €20/mnd)', implies: { budget: 'under_20' } },
        optionB: { label: 'Volledige features (geen probleem)', implies: { budget: 'any' } },
      };
    case 'techComfort':
      return {
        question: 'Wil je snel starten of een krachtigere tool leren?',
        factor,
        optionA: { label: 'Snel starten (onder 15 min)',    implies: { aiComfort: 'never' } },
        optionB: { label: 'Krachtiger (meer leercurve OK)', implies: { aiComfort: 'power_user' } },
      };
    case 'nlContext':
      if (profile.minDutchOutputQuality) return undefined;
      return {
        question: 'Moet de tool écht goed Nederlands schrijven?',
        factor,
        optionA: { label: 'Ja, native-kwaliteit NL',        implies: { minDutchOutputQuality: 'native' } },
        optionB: { label: 'Nee, goed Engels is ook prima',  implies: { minDutchOutputQuality: 'basic' } },
      };
    case 'security':
      if (profile.requireEuHosting != null) return undefined;
      return {
        question: 'Is EU-hosting verplicht voor jouw data?',
        factor,
        optionA: { label: 'Ja, moet EU zijn',              implies: { requireEuHosting: true } },
        optionB: { label: 'Nee, maakt niet uit',           implies: {} },
      };
    case 'integrations':
      if (profile.requiredIntegrations && profile.requiredIntegrations.length > 0) return undefined;
      return {
        question: 'Heb je een specifieke integratie nodig?',
        factor,
        optionA: { label: 'Ja, moet koppelen met bestaande software', implies: {} },
        optionB: { label: 'Nee, standalone is OK',                    implies: {} },
      };
    default:
      return undefined;
  }
}

// Type-helper so the switch is exhaustive-checkable
function inferFactor() {
  return '' as
    | 'jobFit' | 'techComfort' | 'budgetFit' | 'nlContext'
    | 'integrations' | 'security' | 'teamFit';
}
