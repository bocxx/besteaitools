/**
 * Segments Taxonomy — matching intake Laag 1
 *
 * Maps the 5 primary user segments (zzp, MKB klein, MKB middel,
 * vereniging, overheid klein) plus adjacent categories (stichting,
 * onderwijs, enterprise) used across the matching engine.
 *
 * Source: DEBESTEAITOOLS_MATCHING_PLAN.md §2, §6b.
 */

import { z } from 'astro/zod';

export const segments = {
  zzp: {
    label: 'ZZP / solo',
    description: 'Eén persoon, weinig tijd, laag budget.',
    teamSizeRange: { min: 1, max: 1 },
    defaultWeights: {
      jobFit: 0.30,
      techComfort: 0.25,
      budgetFit: 0.20,
      nlContext: 0.10,
      integrations: 0.05,
      security: 0.05,
      teamFit: 0.05,
    },
  },
  mkb_klein: {
    label: 'MKB klein (1-10 mdw)',
    description: 'Eén persoon beheert tools, betaalbare eerste integraties.',
    teamSizeRange: { min: 2, max: 10 },
    defaultWeights: {
      jobFit: 0.25,
      techComfort: 0.20,
      budgetFit: 0.15,
      nlContext: 0.15,
      integrations: 0.15,
      security: 0.05,
      teamFit: 0.05,
    },
  },
  mkb_middel: {
    label: 'MKB middel (10-50 mdw)',
    description: 'Team-features, AVG serieus, rol-scheiding.',
    teamSizeRange: { min: 11, max: 50 },
    defaultWeights: {
      jobFit: 0.25,
      techComfort: 0.10,
      budgetFit: 0.10,
      nlContext: 0.15,
      integrations: 0.25,
      security: 0.10,
      teamFit: 0.05,
    },
  },
  vereniging: {
    label: 'Vereniging',
    description: 'Vrijwilligers, ledenadmin, gratis-voorkeur.',
    teamSizeRange: { min: 1, max: 500 },
    defaultWeights: {
      jobFit: 0.25,
      techComfort: 0.30,
      budgetFit: 0.25,
      nlContext: 0.10,
      integrations: 0.05,
      security: 0.05,
      teamFit: 0.00,
    },
  },
  stichting: {
    label: 'Stichting',
    description: 'Vaak vrijwilligers, soms professioneel bestuur.',
    teamSizeRange: { min: 1, max: 500 },
    defaultWeights: {
      jobFit: 0.25,
      techComfort: 0.30,
      budgetFit: 0.25,
      nlContext: 0.10,
      integrations: 0.05,
      security: 0.05,
      teamFit: 0.00,
    },
  },
  overheid_klein: {
    label: 'Kleine overheid / semi-publiek',
    description: 'EU-hosting vaak verplicht, AI Act, aanbesteding.',
    teamSizeRange: { min: 5, max: 500 },
    defaultWeights: {
      jobFit: 0.20,
      techComfort: 0.15,
      budgetFit: 0.10,
      nlContext: 0.25,
      integrations: 0.15,
      security: 0.15,
      teamFit: 0.00,
    },
  },
  onderwijs: {
    label: 'Onderwijs',
    description: 'School, universiteit, opleidingsinstelling.',
    teamSizeRange: { min: 5, max: 5000 },
    defaultWeights: {
      jobFit: 0.25,
      techComfort: 0.20,
      budgetFit: 0.15,
      nlContext: 0.20,
      integrations: 0.10,
      security: 0.10,
      teamFit: 0.00,
    },
  },
  enterprise: {
    label: 'Enterprise (50+ mdw)',
    description: 'Procurement, security, schaal.',
    teamSizeRange: { min: 50, max: 100000 },
    defaultWeights: {
      jobFit: 0.20,
      techComfort: 0.05,
      budgetFit: 0.05,
      nlContext: 0.10,
      integrations: 0.30,
      security: 0.20,
      teamFit: 0.10,
    },
  },
} as const;

export type SegmentKey = keyof typeof segments;
export const segmentKeys = Object.keys(segments) as [SegmentKey, ...SegmentKey[]];
export const segmentSchema = z.enum(segmentKeys);

/** Vereniging-sub-types (extra Laag-1-vraag bij segment "vereniging") */
export const verenigingTypes = {
  sport: { label: 'Sportvereniging' },
  buurt: { label: 'Buurt- of belangenvereniging' },
  politiek: { label: 'Politieke vereniging' },
  kerk: { label: 'Kerkgenootschap' },
  onderwijs: { label: 'Onderwijsvereniging' },
  overig: { label: 'Overig' },
} as const;

export type VerenigingTypeKey = keyof typeof verenigingTypes;
export const verenigingTypeKeys = Object.keys(verenigingTypes) as [VerenigingTypeKey, ...VerenigingTypeKey[]];
export const verenigingTypeSchema = z.enum(verenigingTypeKeys);

/** Scoring factors used by the weight tables above */
export const scoringFactors = [
  'jobFit', 'techComfort', 'budgetFit', 'nlContext',
  'integrations', 'security', 'teamFit',
] as const;
export type ScoringFactor = typeof scoringFactors[number];

/**
 * Verify every segment's defaultWeights sum to 1.0 (within FP tolerance).
 * Runs at module load time. A typo in any segment → throws loudly instead
 * of silently skewing scoring later.
 */
const WEIGHT_SUM_EPSILON = 0.0001;
for (const [key, seg] of Object.entries(segments)) {
  const sum = scoringFactors.reduce(
    (acc, f) => acc + (seg.defaultWeights[f] ?? 0),
    0,
  );
  if (Math.abs(sum - 1) > WEIGHT_SUM_EPSILON) {
    throw new Error(
      `Segment "${key}" defaultWeights sum to ${sum.toFixed(4)} — expected 1.0. ` +
        `Fix src/lib/taxonomies/segments.ts.`,
    );
  }
}
