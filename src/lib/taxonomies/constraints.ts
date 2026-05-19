/**
 * Constraints Taxonomy — matching intake Laag 4 + schema enrichment
 *
 * Enums for AVG / AI Act / NL-output / training-data / vendor-lock-in.
 * Replaces several boolean flags with richer enums where needed.
 *
 * Source: DEBESTEAITOOLS_MATCHING_PLAN.md §5b.
 */

import { z } from 'astro/zod';

/** Quality of Dutch-language *output* (distinct from `supportsDutchLanguage` bool) */
export const dutchOutputQualityLevels = {
  native: { label: 'Native (zo goed als een Nederlander)', color: 'var(--color-success)' },
  good: { label: 'Goed (begrijpbaar, soms onhandig)', color: 'var(--color-info)' },
  basic: { label: 'Basaal (werkt, wisselend)', color: 'var(--color-warning)' },
  poor: { label: 'Slecht (Engels-klinkend NL)', color: 'var(--color-error)' },
} as const;

export type DutchOutputQualityKey = keyof typeof dutchOutputQualityLevels;
export const dutchOutputQualityKeys = Object.keys(dutchOutputQualityLevels) as [DutchOutputQualityKey, ...DutchOutputQualityKey[]];
export const dutchOutputQualitySchema = z.enum(dutchOutputQualityKeys);

/** Whether user data is used for training the underlying model */
export const dataTrainingUseOptions = {
  yes: { label: 'Ja, standaard', color: 'var(--color-error)' },
  no: { label: 'Nee, nooit', color: 'var(--color-success)' },
  'opt-out': { label: 'Standaard wel, maar uit te zetten', color: 'var(--color-warning)' },
  'opt-in': { label: 'Alleen als je expliciet toestemt', color: 'var(--color-info)' },
} as const;

export type DataTrainingUseKey = keyof typeof dataTrainingUseOptions;
export const dataTrainingUseKeys = Object.keys(dataTrainingUseOptions) as [DataTrainingUseKey, ...DataTrainingUseKey[]];
export const dataTrainingUseSchema = z.enum(dataTrainingUseKeys);

/** EU AI Act risk classification */
export const aiActRiskClasses = {
  minimal: { label: 'Minimaal risico', color: 'var(--color-success)' },
  limited: { label: 'Beperkt risico', color: 'var(--color-info)' },
  high: { label: 'Hoog risico', color: 'var(--color-warning)' },
  prohibited: { label: 'Verboden', color: 'var(--color-error)' },
  unknown: { label: 'Onbekend', color: 'var(--text-muted)' },
} as const;

export type AiActRiskClassKey = keyof typeof aiActRiskClasses;
export const aiActRiskClassKeys = Object.keys(aiActRiskClasses) as [AiActRiskClassKey, ...AiActRiskClassKey[]];
export const aiActRiskClassSchema = z.enum(aiActRiskClassKeys);

/** Vendor lock-in risk assessment */
export const vendorLockInRisks = {
  low: { label: 'Laag (data makkelijk exporteerbaar)', color: 'var(--color-success)' },
  medium: { label: 'Middel (export mogelijk met moeite)', color: 'var(--color-warning)' },
  high: { label: 'Hoog (proprietary formats, moeilijk weg)', color: 'var(--color-error)' },
} as const;

export type VendorLockInRiskKey = keyof typeof vendorLockInRisks;
export const vendorLockInRiskKeys = Object.keys(vendorLockInRisks) as [VendorLockInRiskKey, ...VendorLockInRiskKey[]];
export const vendorLockInRiskSchema = z.enum(vendorLockInRiskKeys);

/** Coarse setup-time bucket (replaces the combo timeToFirstValue + setupComplexity) */
export const setupTimeBuckets = {
  'under_15min': { label: 'Onder 15 min', color: 'var(--color-success)' },
  'under_1h': { label: 'Onder 1 uur', color: 'var(--color-info)' },
  'under_4h': { label: 'Onder 4 uur', color: 'var(--color-warning)' },
  'days': { label: 'Meerdere dagen', color: 'var(--color-error)' },
} as const;

export type SetupTimeBucketKey = keyof typeof setupTimeBuckets;
export const setupTimeBucketKeys = Object.keys(setupTimeBuckets) as [SetupTimeBucketKey, ...SetupTimeBucketKey[]];
export const setupTimeBucketSchema = z.enum(setupTimeBucketKeys);

/** Budget buckets (Laag 5) — used both on intake and tool-side for filter */
export const budgetBuckets = {
  free: { label: 'Gratis', maxEur: 0 },
  under_20: { label: '< €20/mnd', maxEur: 20 },
  under_50: { label: '< €50/mnd', maxEur: 50 },
  under_200: { label: '< €200/mnd', maxEur: 200 },
  any: { label: 'Geen probleem', maxEur: Infinity },
} as const;

export type BudgetBucketKey = keyof typeof budgetBuckets;
export const budgetBucketKeys = Object.keys(budgetBuckets) as [BudgetBucketKey, ...BudgetBucketKey[]];
export const budgetBucketSchema = z.enum(budgetBucketKeys);

/** AI-comfort level (Laag 3) */
export const aiComfortLevels = {
  never: { label: 'Nog nooit een AI-tool gebruikt', score: 1 },
  tried_chatgpt: { label: 'Wel eens ChatGPT geprobeerd', score: 2 },
  regular_1_2: { label: 'Gebruik regelmatig 1-2 tools', score: 3 },
  power_user: { label: 'Vrij handig, meerdere tools in gebruik', score: 4 },
} as const;

export type AiComfortLevelKey = keyof typeof aiComfortLevels;
export const aiComfortLevelKeys = Object.keys(aiComfortLevels) as [AiComfortLevelKey, ...AiComfortLevelKey[]];
export const aiComfortLevelSchema = z.enum(aiComfortLevelKeys);
