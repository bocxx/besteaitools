/**
 * Tools Schema — Single Source of Truth
 *
 * Zod validators for content collections + UI helper maps for
 * categories, phases, trend directions, and score thresholds.
 *
 * Equivalent of aipulse's pulse-schema.ts but for the tools domain.
 */

import { z } from 'astro/zod';

// ============================================
// 1. TOOL CATEGORIES
// ============================================

export const toolCategories = {
  chatbots:       { name: 'Chatbots',        icon: 'message-square', color: 'var(--primary-bright)',    description: 'Algemene AI-assistenten voor tekst, vragen en werk.' },
  coding:         { name: 'Coding',          icon: 'code',           color: 'var(--secondary-bright)',  description: 'AI-tools voor developers, agents en code review.' },
  automation:     { name: 'Automatisering',  icon: 'workflow',       color: 'var(--color-success)',     description: 'Automatisering, AI-agents en workflow tools.' },
  image:          { name: 'Beeld',           icon: 'image',          color: 'var(--color-warning)',     description: 'AI-beeldgeneratie en visuele bewerking.' },
  video:          { name: 'Video',           icon: 'film',           color: 'var(--tertiary-bright)',   description: 'AI-video, avatars en motion content.' },
  audio:          { name: 'Audio',           icon: 'mic',            color: 'var(--color-error)',       description: 'Transcriptie, spraak en audio-productie.' },
  search:         { name: 'Zoeken',          icon: 'search',         color: 'var(--color-info)',        description: 'Zoeken, research en kennisverrijking.' },
  productivity:   { name: 'Productiviteit',  icon: 'sparkles',       color: 'var(--primary-mid)',       description: 'Dagelijkse AI-tools voor kenniswerk en output.' },
  infrastructure: { name: 'Infrastructuur',  icon: 'server',         color: 'var(--secondary-mid)',     description: 'Modellen, infra, deployment en AI-platforms.' },
  design:         { name: 'Design',          icon: 'palette',        color: '#f0abfc',                 description: 'AI-tools voor grafisch ontwerp en visuele content.' },
} as const;

export type ToolCategoryKey = keyof typeof toolCategories;
export const toolCategoryKeys = Object.keys(toolCategories) as [ToolCategoryKey, ...ToolCategoryKey[]];
export const toolCategorySchema = z.enum(toolCategoryKeys);

// ============================================
// 2. TREND PHASES
// ============================================

export const trendPhases = {
  weak_signal:  { label: 'Niche',        color: 'var(--text-muted)',       badge: 'outline'  },
  emerging:     { label: 'Opkomend',     color: 'var(--color-info)',       badge: 'secondary' },
  accelerating: { label: 'Versnelling',  color: 'var(--color-warning)',    badge: 'primary'  },
  peaking:      { label: 'Piek',         color: 'var(--color-error)',      badge: 'primary'  },
  sustained:    { label: 'Blijver',      color: 'var(--color-success)',    badge: 'secondary' },
  declining:    { label: 'Dalend',       color: 'var(--text-secondary)',   badge: 'outline'  },
  faded:        { label: 'Verdwenen',    color: 'var(--text-muted)',       badge: 'outline'  },
} as const;

export type TrendPhaseKey = keyof typeof trendPhases;
export const trendPhaseKeys = Object.keys(trendPhases) as [TrendPhaseKey, ...TrendPhaseKey[]];
export const trendPhaseSchema = z.enum(trendPhaseKeys);

// ============================================
// 3. TREND DIRECTIONS
// ============================================

export const trendDirections = {
  rising:    { label: '↑', ariaLabel: 'Stijgend',  color: 'var(--color-success)' },
  stable:    { label: '→', ariaLabel: 'Stabiel',   color: 'var(--text-secondary)' },
  declining: { label: '↓', ariaLabel: 'Dalend',    color: 'var(--color-error)' },
} as const;

export type TrendDirectionKey = keyof typeof trendDirections;
export const trendDirectionSchema = z.enum(['rising', 'stable', 'declining']);

// ============================================
// 4. DEPLOYMENT TYPES
// ============================================

export const deploymentTypes = {
  saas:        { label: 'SaaS',          icon: 'cloud',  color: 'var(--color-info)' },
  'self-hosted': { label: 'Self-hosted', icon: 'server', color: 'var(--color-warning)' },
  both:        { label: 'SaaS + Self-hosted', icon: 'layers', color: 'var(--color-success)' },
} as const;

export const deploymentTypeKeys = Object.keys(deploymentTypes) as ['saas', 'self-hosted', 'both'];
export const deploymentTypeSchema = z.enum(deploymentTypeKeys);

// ============================================
// 5. DATA RESIDENCY
// ============================================

export const dataResidencyOptions = {
  eu:      { label: 'EU',       color: 'var(--color-success)' },
  us:      { label: 'VS',       color: 'var(--color-info)' },
  global:  { label: 'Globaal',  color: 'var(--text-secondary)' },
  unknown: { label: 'Onbekend', color: 'var(--text-muted)' },
} as const;

export const dataResidencyKeys = Object.keys(dataResidencyOptions) as ['eu', 'us', 'global', 'unknown'];
export const dataResidencySchema = z.enum(dataResidencyKeys);

// ============================================
// 6. TARGET AUDIENCE
// ============================================

export const targetAudienceOptions = {
  mkb:        { label: 'MKB',        color: 'var(--color-info)' },
  enterprise: { label: 'Enterprise', color: 'var(--color-warning)' },
  solo:       { label: 'Solo',       color: 'var(--color-success)' },
  freelancer: { label: 'Freelancer', color: 'var(--text-secondary)' },
} as const;

export const targetAudienceKeys = Object.keys(targetAudienceOptions) as ['mkb', 'enterprise', 'solo', 'freelancer'];
export const targetAudienceSchema = z.enum(targetAudienceKeys);

// ============================================
// 7. PRICING MODELS
// ============================================

export const pricingModels = {
  free:       { label: 'Gratis',     color: 'var(--color-success)' },
  freemium:   { label: 'Freemium',   color: 'var(--color-info)' },
  paid:       { label: 'Betaald',    color: 'var(--color-warning)' },
  enterprise: { label: 'Enterprise', color: 'var(--text-secondary)' },
} as const;

export const pricingModelKeys = Object.keys(pricingModels) as ['free', 'freemium', 'paid', 'enterprise'];
export const pricingModelSchema = z.enum(pricingModelKeys);

// ============================================
// 8. DIFFICULTY LEVELS
// ============================================

export const difficultyLevels = {
  beginner:     { label: 'Beginner',     color: 'var(--color-success)' },
  intermediate: { label: 'Gemiddeld',    color: 'var(--color-warning)' },
  advanced:     { label: 'Gevorderd',    color: 'var(--color-error)' },
} as const;

export const difficultyLevelKeys = Object.keys(difficultyLevels) as ['beginner', 'intermediate', 'advanced'];
export const difficultyLevelSchema = z.enum(difficultyLevelKeys);

// ============================================
// 8a. FUNDING STAGES (marktrijpheid)
// ============================================

export const fundingStages = {
  bootstrapped: { label: 'Bootstrapped', color: 'var(--text-secondary)' },
  seed:         { label: 'Seed',         color: 'var(--text-muted)' },
  'series-a':   { label: 'Series A',     color: 'var(--color-info)' },
  'series-b':   { label: 'Series B',     color: 'var(--color-info)' },
  'series-c':   { label: 'Series C',     color: 'var(--color-warning)' },
  growth:       { label: 'Growth',       color: 'var(--color-success)' },
  public:       { label: 'Beursgenoteerd', color: 'var(--primary-bright)' },
} as const;

export type FundingStageKey = keyof typeof fundingStages;
export const fundingStageKeys = Object.keys(fundingStages) as [FundingStageKey, ...FundingStageKey[]];
export const fundingStageSchema = z.enum(fundingStageKeys);

// ============================================
// 8b. TIME TO FIRST VALUE (inzetbaarheid)
// ============================================

export const timeToFirstValueOptions = {
  minutes: { label: 'Minuten',  icon: 'zap',   color: 'var(--color-success)' },
  hours:   { label: 'Uren',     icon: 'clock', color: 'var(--color-info)' },
  days:    { label: 'Dagen',    icon: 'clock', color: 'var(--color-warning)' },
  weeks:   { label: 'Weken',    icon: 'clock', color: 'var(--color-error)' },
} as const;

export type TimeToFirstValueKey = keyof typeof timeToFirstValueOptions;
export const timeToFirstValueKeys = Object.keys(timeToFirstValueOptions) as [TimeToFirstValueKey, ...TimeToFirstValueKey[]];
export const timeToFirstValueSchema = z.enum(timeToFirstValueKeys);

// ============================================
// 8c. SETUP COMPLEXITY (inzetbaarheid)
// ============================================

export const setupComplexityLevels = {
  low:    { label: 'Eenvoudig',   color: 'var(--color-success)' },
  medium: { label: 'Gemiddeld',   color: 'var(--color-warning)' },
  high:   { label: 'Complex',     color: 'var(--color-error)' },
} as const;

export type SetupComplexityKey = keyof typeof setupComplexityLevels;
export const setupComplexityKeys = Object.keys(setupComplexityLevels) as [SetupComplexityKey, ...SetupComplexityKey[]];
export const setupComplexitySchema = z.enum(setupComplexityKeys);

// ============================================
// 8d. LEARNING CURVE (UX & adoptie)
// ============================================

export const learningCurveLevels = {
  low:    { label: 'Laag',      color: 'var(--color-success)' },
  medium: { label: 'Gemiddeld', color: 'var(--color-warning)' },
  high:   { label: 'Hoog',      color: 'var(--color-error)' },
} as const;

export type LearningCurveKey = keyof typeof learningCurveLevels;
export const learningCurveKeys = Object.keys(learningCurveLevels) as [LearningCurveKey, ...LearningCurveKey[]];
export const learningCurveSchema = z.enum(learningCurveKeys);

// ============================================
// 8e. QUALITY LEVEL (documentatie, support)
// ============================================

export const qualityLevels = {
  poor:      { label: 'Slecht',    color: 'var(--color-error)' },
  adequate:  { label: 'Voldoende', color: 'var(--color-warning)' },
  good:      { label: 'Goed',      color: 'var(--color-info)' },
  excellent: { label: 'Uitstekend', color: 'var(--color-success)' },
} as const;

export type QualityLevelKey = keyof typeof qualityLevels;
export const qualityLevelKeys = Object.keys(qualityLevels) as [QualityLevelKey, ...QualityLevelKey[]];
export const qualityLevelSchema = z.enum(qualityLevelKeys);

// ============================================
// 8f. COMPANY SIZE FIT (concrete fit)
// ============================================

export const companySizeFitOptions = {
  solo:       { label: 'Solo',             color: 'var(--text-secondary)' },
  small:      { label: 'Klein (2-10)',     color: 'var(--color-info)' },
  medium:     { label: 'Midden (11-250)',  color: 'var(--color-warning)' },
  large:      { label: 'Groot (250+)',     color: 'var(--color-success)' },
  enterprise: { label: 'Enterprise',       color: 'var(--primary-bright)' },
} as const;

export type CompanySizeFitKey = keyof typeof companySizeFitOptions;
export const companySizeFitKeys = Object.keys(companySizeFitOptions) as [CompanySizeFitKey, ...CompanySizeFitKey[]];
export const companySizeFitSchema = z.enum(companySizeFitKeys);

// ============================================
// 8g. USE CASE STAGE (concrete fit)
// ============================================

export const useCaseStages = {
  experiment:       { label: 'Experiment',       color: 'var(--color-info)' },
  'team-rollout':   { label: 'Team rollout',     color: 'var(--color-warning)' },
  'mission-critical': { label: 'Mission critical', color: 'var(--color-success)' },
} as const;

export type UseCaseStageKey = keyof typeof useCaseStages;
export const useCaseStageKeys = Object.keys(useCaseStages) as [UseCaseStageKey, ...UseCaseStageKey[]];
export const useCaseStageSchema = z.enum(useCaseStageKeys);

// ============================================
// 8h. REVIEW METHODS (redactionele betrouwbaarheid)
// ============================================

export const reviewMethods = {
  desk_research:     { label: 'Desk research',      color: 'var(--text-secondary)' },
  vendor_claims:     { label: 'Leveranciersinfo',   color: 'var(--text-muted)' },
  hands_on:          { label: 'Hands-on getest',    color: 'var(--color-success)' },
  customer_feedback: { label: 'Gebruikersfeedback', color: 'var(--color-info)' },
} as const;

export type ReviewMethodKey = keyof typeof reviewMethods;
export const reviewMethodKeys = Object.keys(reviewMethods) as [ReviewMethodKey, ...ReviewMethodKey[]];
export const reviewMethodSchema = z.enum(reviewMethodKeys);

// ============================================
// 8i. PRICING CURRENCY
// ============================================

export const pricingCurrencies = {
  eur: { label: '€', symbol: '€' },
  usd: { label: '$', symbol: '$' },
} as const;

export type PricingCurrencyKey = keyof typeof pricingCurrencies;
export const pricingCurrencyKeys = Object.keys(pricingCurrencies) as [PricingCurrencyKey, ...PricingCurrencyKey[]];
export const pricingCurrencySchema = z.enum(pricingCurrencyKeys);

// ============================================
// 8j. FEATURE GROUPS & BADGES (capabilities)
// ============================================

export const featureGroups = {
  core:        { label: 'Kern',         color: 'var(--primary-bright)' },
  input:       { label: 'Invoer',       color: 'var(--color-info)' },
  output:      { label: 'Uitvoer',      color: 'var(--secondary-bright)' },
  integration: { label: 'Integraties',  color: 'var(--tertiary-bright)' },
  enterprise:  { label: 'Enterprise',   color: 'var(--color-success)' },
  beta:        { label: 'Experimenteel', color: 'var(--color-warning)' },
} as const;

export type FeatureGroupKey = keyof typeof featureGroups;
export const featureGroupKeys = Object.keys(featureGroups) as [FeatureGroupKey, ...FeatureGroupKey[]];
export const featureGroupSchema = z.enum(featureGroupKeys);

export const featureBadges = {
  nieuw: { label: 'Nieuw', color: 'var(--color-success)' },
  beta:  { label: 'Beta',  color: 'var(--color-warning)' },
  pro:   { label: 'Pro',   color: 'var(--primary-bright)' },
} as const;

export type FeatureBadgeKey = keyof typeof featureBadges;
export const featureBadgeKeys = Object.keys(featureBadges) as [FeatureBadgeKey, ...FeatureBadgeKey[]];
export const featureBadgeSchema = z.enum(featureBadgeKeys);

// ============================================
// 9. BUSINESS FUNCTIONS (zakelijke pagina)
// ============================================

export const businessFunctions = {
  marketing:      { name: 'Marketing & Content',       icon: 'megaphone',       color: 'var(--color-warning)',    description: 'AI voor campagnes, content en advertenties.' },
  sales:          { name: 'Sales & CRM',               icon: 'handshake',       color: 'var(--primary-bright)',   description: 'AI voor leadgeneratie, outreach en CRM.' },
  klantenservice: { name: 'Klantenservice',             icon: 'headset',         color: 'var(--color-info)',       description: 'AI-chatbots en support-automatisering.' },
  development:    { name: 'Development',                icon: 'code',            color: 'var(--secondary-bright)', description: 'AI-tools voor developers en engineering teams.' },
  data:           { name: 'Data & Analyse',             icon: 'bar-chart-2',     color: 'var(--tertiary-bright)',  description: 'AI voor data-analyse, BI en inzichten.' },
  operations:     { name: 'Operations & Automatisering', icon: 'settings',       color: 'var(--color-success)',    description: 'Workflow-automatisering en procesoptimalisatie.' },
  hr:             { name: 'HR & Recruitment',           icon: 'users',           color: '#c084fc',                description: 'AI voor werving, onboarding en HR-processen.' },
  finance:        { name: 'Financiën',                  icon: 'calculator',      color: '#fb923c',                description: 'AI voor boekhouding, forecasting en financiële analyse.' },
  legal:          { name: 'Legal & Compliance',          icon: 'scale',           color: '#94a3b8',                description: 'AI voor contractanalyse, compliance en juridisch werk.' },
} as const;

export type BusinessFunctionKey = keyof typeof businessFunctions;
export const businessFunctionKeys = Object.keys(businessFunctions) as [BusinessFunctionKey, ...BusinessFunctionKey[]];
export const businessFunctionSchema = z.enum(businessFunctionKeys);

// ============================================
// 10. BUZZ SCORE HELPERS
// ============================================

export function buzzScoreClass(score: number): 'hot' | 'warm' | 'cool' {
  if (score >= 70) return 'hot';
  if (score >= 40) return 'warm';
  return 'cool';
}

export function buzzScoreLabel(score: number): string {
  if (score >= 70) return 'Hot';
  if (score >= 40) return 'Warm';
  return 'Niche';
}

// ============================================
// 11. CONTENT COLLECTION SCHEMA (for content.config.ts)
// ============================================

/** Zod schema for tool JSON files in src/content/tools/ */
export const toolContentSchema = z.object({
  name: z.string(),
  category: toolCategorySchema,
  websiteUrl: z.string().url(),
  shortDescription: z.string(),
  longDescription: z.string().optional(),
  bestFor: z.string().optional(),
  useCases: z.array(z.string()).optional(),
  strengths: z.array(z.string()).optional(),
  limitations: z.array(z.string()).optional(),
  pricing: z.string().optional(),
  openSource: z.boolean().optional(),
  pricingModel: pricingModelSchema.default('freemium'),
  difficulty: difficultyLevelSchema.default('beginner'),
  tags: z.array(z.string()).default([]),
  /**
   * Extra terms (besides name + slug) that this tool is known by.
   * Used for two things:
   *   1. Relevance filter for social/news/YouTube items (whole-word match)
   *   2. Fallback slug lookup against the newsflux radar stats — so a tool
   *      filed as `fireflies-ai.json` can still pick up stats keyed under
   *      `fireflies`.
   * Examples: DALL-E → ["dalle", "dall e"]; Fireflies.ai → ["fireflies"].
   */
  mentionAliases: z.array(z.string()).default([]),
  businessFunctions: z.array(businessFunctionSchema).default([]),
  draft: z.boolean().default(false),
  // Zakelijke metadata
  deploymentType: deploymentTypeSchema.optional(),
  dataResidency: dataResidencySchema.optional(),
  targetAudience: z.array(targetAudienceSchema).default([]),
  /** @deprecated Use supportsDutchLanguage, hasDutchUI, offersDutchSupport instead */
  nlSupport: z.boolean().default(false),
  integrations: z.array(z.string()).default([]),

  // ── Laag 1: Marktrijpheid ─────────────────────
  yearsActive: z.number().int().min(0).optional(),
  notableCustomers: z.array(z.string()).default([]),
  g2Rating: z.number().min(0).max(5).optional(),
  g2ReviewCount: z.number().int().min(0).optional(),
  fundingStage: fundingStageSchema.optional(),

  // ── Laag 2: Inzetbaarheid ─────────────────────
  timeToFirstValue: timeToFirstValueSchema.optional(),
  setupComplexity: setupComplexitySchema.optional(),
  requiresDeveloper: z.boolean().optional(),
  freeTrialAvailable: z.boolean().optional(),
  pilotFriendly: z.boolean().optional(),

  // ── Laag 3: Governance & risico ───────────────
  gdprReady: z.boolean().optional(),
  euHostingAvailable: z.boolean().optional(),
  dpaAvailable: z.boolean().optional(),
  soc2: z.boolean().optional(),
  sso: z.boolean().optional(),
  auditLogs: z.boolean().optional(),

  // ── Laag 4: UX & adoptie ──────────────────────
  easeOfUseScore: z.number().int().min(1).max(10).optional(),
  learningCurve: learningCurveSchema.optional(),
  documentationQuality: qualityLevelSchema.optional(),
  supportQuality: qualityLevelSchema.optional(),

  // ── Laag 5: Concrete fit ──────────────────────
  primaryJobsToBeDone: z.array(z.string()).default([]),
  companySizeFit: z.array(companySizeFitSchema).default([]),
  bestUseCaseStage: useCaseStageSchema.optional(),
  antiUseCases: z.array(z.string()).default([]),
  replacementFor: z.array(z.string()).default([]),

  // ── Laag 6: Prijsvergelijking ───────────────────
  startingPriceMonthly: z.number().min(0).optional(),
  pricingCurrency: pricingCurrencySchema.default('eur'),
  hasFreePlan: z.boolean().optional(),
  hasDemo: z.boolean().optional(),
  bookDemoRequired: z.boolean().optional(),

  // ── Laag 7: Nederlandse ondersteuning (granulair) ─
  supportsDutchLanguage: z.boolean().default(false),
  hasDutchUI: z.boolean().default(false),
  offersDutchSupport: z.boolean().default(false),

  // ── Laag 8: Concurrenten & positionering ──────
  mainCompetitors: z.array(z.string()).default([]),
  whenToChoose: z.string().optional(),

  // ── Laag 9: Praktische evaluatie ──────────────
  headlineValueProp: z.string().optional(),
  implementationTimeEstimate: z.string().optional(),
  screenshotUrls: z.array(z.string()).default([]),
  demoUrl: z.string().url().optional(),
  exampleOutput: z.string().optional(),
  exampleWorkflow: z.string().optional(),

  // ── Laag 10: Functies (capabilities) ────────────────
  keyFeatures: z.array(z.object({
    title: z.string(),
    description: z.string().optional(),
    group: featureGroupSchema.optional(),
    badge: featureBadgeSchema.optional(),
  })).default([]),

  // ── Redactionele laag ───────────────────────────
  testedByEditor: z.boolean().default(false),
  reviewMethod: reviewMethodSchema.optional(),
  lastReviewedAt: z.string().optional(),
  verdict: z.string().optional(),
  bestAlternative: z.string().optional(),
  whyListed: z.string().optional(),
});
