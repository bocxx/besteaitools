import { promises as fs } from 'node:fs';
import path from 'node:path';
import { isExcludedTool } from '../src/config/excluded-tools';
import {
  translateToNl,
  translateArrayToNl,
  flushCache,
  logTranslationSummary,
} from './lib/translate-nl';

type RadarEnrichment = {
  description_long_nl?: string;
  best_for_nl?: string;
  use_cases?: string[];
  strengths?: string[];
  limitations?: string[];
  pricing_nl?: string;
  open_source?: boolean;
  enriched_at?: string;
  // v2 fields
  difficulty?: 'beginner' | 'intermediate' | 'advanced';
  deploymentType?: 'saas' | 'self-hosted' | 'both';
  dataResidency?: 'eu' | 'us' | 'global' | 'unknown';
  targetAudience?: string[];
  businessFunctions?: string[];
  fundingStage?: string;
  timeToFirstValue?: 'minutes' | 'hours' | 'days' | 'weeks';
  setupComplexity?: 'low' | 'medium' | 'high';
  requiresDeveloper?: boolean;
  freeTrialAvailable?: boolean;
  nlSupport?: boolean;
  learningCurve?: 'low' | 'medium' | 'high';
  documentationQuality?: 'poor' | 'adequate' | 'good' | 'excellent';
  supportQuality?: 'poor' | 'adequate' | 'good' | 'excellent';
  companySizeFit?: string[];
  bestUseCaseStage?: 'experiment' | 'team-rollout' | 'mission-critical';
  integrations?: string[];
  tags?: string[];
  // v3 fields (visitor-focused)
  startingPriceMonthly?: number;
  pricingCurrency?: 'eur' | 'usd';
  hasFreePlan?: boolean;
  hasDemo?: boolean;
  bookDemoRequired?: boolean;
  supportsDutchLanguage?: boolean;
  hasDutchUI?: boolean;
  offersDutchSupport?: boolean;
  mainCompetitors?: string[];
  whenToChoose?: string;
  headlineValueProp?: string;
  implementationTimeEstimate?: string;
  screenshotUrls?: string[];
  demoUrl?: string;
  exampleOutput?: string;
  exampleWorkflow?: string;
  reviewMethod?: 'desk_research' | 'vendor_claims' | 'hands_on' | 'customer_feedback';
  lastReviewedAt?: string;
  // v4 fields
  key_features?: Array<{
    title: string;
    description?: string;
    group?: 'core' | 'input' | 'output' | 'integration' | 'enterprise' | 'beta';
    badge?: 'nieuw' | 'beta' | 'pro';
  }>;
};

type RadarTool = {
  name: string;
  slug: string;
  category: string;
  description_nl?: string;
  url?: string;
  enrichment?: RadarEnrichment | null;
};

type RadarPayload = {
  tools: RadarTool[];
};

type ToolContent = {
  name: string;
  category: string;
  websiteUrl: string;
  shortDescription: string;
  longDescription?: string;
  bestFor?: string;
  useCases?: string[];
  strengths?: string[];
  limitations?: string[];
  pricing?: string;
  openSource?: boolean;
  pricingModel: 'free' | 'freemium' | 'paid' | 'enterprise';
  difficulty: 'beginner' | 'intermediate' | 'advanced';
  tags: string[];
  draft: boolean;
  // v2 fields
  deploymentType?: 'saas' | 'self-hosted' | 'both';
  dataResidency?: 'eu' | 'us' | 'global' | 'unknown';
  targetAudience?: string[];
  businessFunctions?: string[];
  fundingStage?: string;
  timeToFirstValue?: 'minutes' | 'hours' | 'days' | 'weeks';
  setupComplexity?: 'low' | 'medium' | 'high';
  requiresDeveloper?: boolean;
  freeTrialAvailable?: boolean;
  nlSupport?: boolean;
  learningCurve?: 'low' | 'medium' | 'high';
  documentationQuality?: 'poor' | 'adequate' | 'good' | 'excellent';
  supportQuality?: 'poor' | 'adequate' | 'good' | 'excellent';
  companySizeFit?: string[];
  bestUseCaseStage?: 'experiment' | 'team-rollout' | 'mission-critical';
  integrations?: string[];
  // v3 fields (visitor-focused)
  startingPriceMonthly?: number;
  pricingCurrency?: 'eur' | 'usd';
  hasFreePlan?: boolean;
  hasDemo?: boolean;
  bookDemoRequired?: boolean;
  supportsDutchLanguage?: boolean;
  hasDutchUI?: boolean;
  offersDutchSupport?: boolean;
  mainCompetitors?: string[];
  whenToChoose?: string;
  headlineValueProp?: string;
  implementationTimeEstimate?: string;
  screenshotUrls?: string[];
  demoUrl?: string;
  exampleOutput?: string;
  exampleWorkflow?: string;
  reviewMethod?: 'desk_research' | 'vendor_claims' | 'hands_on' | 'customer_feedback';
  lastReviewedAt?: string;
  // v4 fields
  keyFeatures?: Array<{
    title: string;
    description?: string;
    group?: 'core' | 'input' | 'output' | 'integration' | 'enterprise' | 'beta';
    badge?: 'nieuw' | 'beta' | 'pro';
  }>;
};

type EnrichmentDiff = {
  slug: string;
  field: keyof Pick<
    ToolContent,
    | 'longDescription' | 'bestFor' | 'useCases' | 'strengths' | 'limitations' | 'pricing' | 'openSource'
    | 'deploymentType' | 'dataResidency' | 'targetAudience' | 'businessFunctions'
    | 'timeToFirstValue' | 'setupComplexity' | 'learningCurve'
    | 'companySizeFit' | 'bestUseCaseStage'
    | 'startingPriceMonthly' | 'hasFreePlan' | 'hasDemo'
    | 'supportsDutchLanguage' | 'hasDutchUI' | 'offersDutchSupport'
    | 'mainCompetitors' | 'whenToChoose'
    | 'headlineValueProp' | 'implementationTimeEstimate'
    | 'keyFeatures'
  >;
  current: unknown;
  suggested: unknown;
  enriched_at?: string;
};

const ROOT = process.cwd();
const CONTENT_DIR = path.join(ROOT, 'src', 'content', 'tools');
const RADAR_PATH = path.join(ROOT, 'src', 'data', 'reports', 'ai_tools_radar.json');
const DIFF_PATH = path.join(ROOT, 'src', 'data', 'reports', 'enrichment_diff.json');

function mapPricingModel(pricing?: string): ToolContent['pricingModel'] {
  const lower = pricing?.toLowerCase() ?? '';
  if (lower.includes('enterprise')) return 'enterprise';
  if (lower.includes('gratis') || lower === 'free') return 'free';
  if (lower.includes('freemium')) return 'freemium';
  if (lower.includes('betaald') || lower.includes('$') || lower.includes('paid')) return 'paid';
  return 'freemium';
}

/** Map newsflux Dutch category slugs to debesteaitools English category keys */
function mapCategory(newsfluxCategory: string): string {
  const map: Record<string, string> = {
    tekst:          'chatbots',
    beeld:          'image',
    video:          'video',
    coding:         'coding',
    spraak:         'audio',
    muziek:         'audio',
    automatisering: 'automation',
    zoeken:         'search',
    infra:          'infrastructure',
    productiviteit: 'productivity',
    design:         'design',
    // Newer newsflux categories that don't have a site equivalent — map to closest fit
    marketing:      'productivity',
    website:        'design',
    social:         'productivity',
  };
  const mapped = map[newsfluxCategory] ?? newsfluxCategory;
  // Site-valid categories only; anything else falls back to 'productivity' so
  // the build never breaks due to a new upstream category.
  const validSiteCategories = new Set([
    'chatbots','coding','automation','image','video','audio',
    'search','productivity','infrastructure','design',
  ]);
  return validSiteCategories.has(mapped) ? mapped : 'productivity';
}

/** Convert a newsflux slug (may contain spaces) to a filename-safe hyphenated slug */
function toFileSlug(slug: string): string {
  return slug.replace(/\s+/g, '-');
}

async function createDraftTool(tool: RadarTool): Promise<ToolContent> {
  const enrichment = tool.enrichment;
  // Velden zonder _nl-suffix kunnen Engels lekken vanuit de Radar API → vertaal die.
  // Eigennamen-arrays (integrations, mainCompetitors, notableCustomers, tags) en
  // velden mét _nl-suffix worden overgeslagen.
  const useCases = await translateArrayToNl(enrichment?.use_cases);
  const strengths = await translateArrayToNl(enrichment?.strengths);
  const limitations = await translateArrayToNl(enrichment?.limitations);
  const whenToChoose = await translateToNl(enrichment?.whenToChoose);
  const headlineValueProp = await translateToNl(enrichment?.headlineValueProp);
  const implementationTimeEstimate = await translateToNl(enrichment?.implementationTimeEstimate);
  const exampleOutput = await translateToNl(enrichment?.exampleOutput);
  const exampleWorkflow = await translateToNl(enrichment?.exampleWorkflow);
  const keyFeatures = enrichment?.key_features
    ? await Promise.all(
        enrichment.key_features.map(async (f) => ({
          ...f,
          title: await translateToNl(f.title),
          description: f.description ? await translateToNl(f.description) : undefined,
        })),
      )
    : [];

  return {
    name: tool.name,
    category: mapCategory(tool.category),
    websiteUrl: tool.url ?? `https://${toFileSlug(tool.slug)}.com`,
    shortDescription: tool.description_nl ?? `${tool.name} AI-tool`,
    longDescription: enrichment?.description_long_nl,
    bestFor: enrichment?.best_for_nl,
    useCases,
    strengths,
    limitations,
    pricing: enrichment?.pricing_nl,
    openSource: enrichment?.open_source,
    pricingModel: mapPricingModel(enrichment?.pricing_nl),
    difficulty: enrichment?.difficulty ?? 'beginner',
    tags: enrichment?.tags ?? [],
    draft: true,
    // v2 fields from enrichment
    deploymentType: enrichment?.deploymentType,
    dataResidency: enrichment?.dataResidency,
    targetAudience: enrichment?.targetAudience ?? [],
    businessFunctions: enrichment?.businessFunctions ?? [],
    fundingStage: enrichment?.fundingStage,
    timeToFirstValue: enrichment?.timeToFirstValue,
    setupComplexity: enrichment?.setupComplexity,
    requiresDeveloper: enrichment?.requiresDeveloper,
    freeTrialAvailable: enrichment?.freeTrialAvailable,
    nlSupport: enrichment?.nlSupport,
    learningCurve: enrichment?.learningCurve,
    documentationQuality: enrichment?.documentationQuality,
    supportQuality: enrichment?.supportQuality,
    companySizeFit: enrichment?.companySizeFit ?? [],
    bestUseCaseStage: enrichment?.bestUseCaseStage,
    integrations: enrichment?.integrations ?? [],
    // v3 fields from enrichment
    startingPriceMonthly: enrichment?.startingPriceMonthly,
    pricingCurrency: enrichment?.pricingCurrency,
    hasFreePlan: enrichment?.hasFreePlan,
    hasDemo: enrichment?.hasDemo,
    bookDemoRequired: enrichment?.bookDemoRequired,
    supportsDutchLanguage: enrichment?.supportsDutchLanguage,
    hasDutchUI: enrichment?.hasDutchUI,
    offersDutchSupport: enrichment?.offersDutchSupport,
    mainCompetitors: enrichment?.mainCompetitors ?? [],
    whenToChoose,
    headlineValueProp,
    implementationTimeEstimate,
    screenshotUrls: enrichment?.screenshotUrls ?? [],
    demoUrl: enrichment?.demoUrl,
    exampleOutput,
    exampleWorkflow,
    reviewMethod: enrichment?.reviewMethod,
    lastReviewedAt: enrichment?.lastReviewedAt,
    // v4 fields
    keyFeatures,
  };
}

async function readJson<T>(filePath: string): Promise<T> {
  const content = await fs.readFile(filePath, 'utf8');
  return JSON.parse(content) as T;
}

async function exists(filePath: string): Promise<boolean> {
  try {
    await fs.access(filePath);
    return true;
  } catch {
    return false;
  }
}

function pushDiff(
  diffs: EnrichmentDiff[],
  slug: string,
  field: EnrichmentDiff['field'],
  current: unknown,
  suggested: unknown,
  enrichedAt?: string,
) {
  if (suggested == null) return;
  if (Array.isArray(current) && Array.isArray(suggested)) {
    if (JSON.stringify(current) === JSON.stringify(suggested)) return;
  } else if (current === suggested) {
    return;
  }

  diffs.push({
    slug,
    field,
    current,
    suggested,
    enriched_at: enrichedAt,
  });
}

async function main() {
  const radar = await readJson<RadarPayload>(RADAR_PATH);
  const existingFiles = await fs.readdir(CONTENT_DIR);
  const existingBySlug = new Map<string, string>();

  for (const file of existingFiles) {
    if (!file.endsWith('.json')) continue;
    const fullPath = path.join(CONTENT_DIR, file);
    const fileSlug = file.replace(/\.json$/, '');
    existingBySlug.set(fileSlug, fullPath);
  }

  const diffs: EnrichmentDiff[] = [];
  const created: string[] = [];

  for (const tool of radar.tools) {
    const fileSlug = toFileSlug(tool.slug);

    if (isExcludedTool(fileSlug)) {
      continue;
    }

    const existingPath = existingBySlug.get(fileSlug);
    const enrichment = tool.enrichment;

    if (!existingPath) {
      const draft = await createDraftTool(tool);
      const outPath = path.join(CONTENT_DIR, `${fileSlug}.json`);
      await fs.writeFile(outPath, `${JSON.stringify(draft, null, 2)}\n`, 'utf8');
      created.push(fileSlug);
      continue;
    }

    const current = await readJson<ToolContent>(existingPath);
    // Velden zonder _nl-suffix uit enrichment vóór diff vertalen (idempotent: cache hits gratis).
    const useCasesNl = await translateArrayToNl(enrichment?.use_cases);
    const strengthsNl = await translateArrayToNl(enrichment?.strengths);
    const limitationsNl = await translateArrayToNl(enrichment?.limitations);
    const whenToChooseNl = await translateToNl(enrichment?.whenToChoose);
    const headlineValuePropNl = await translateToNl(enrichment?.headlineValueProp);
    const implementationTimeEstimateNl = await translateToNl(enrichment?.implementationTimeEstimate);
    const keyFeaturesNl = enrichment?.key_features
      ? await Promise.all(
          enrichment.key_features.map(async (f) => ({
            ...f,
            title: await translateToNl(f.title),
            description: f.description ? await translateToNl(f.description) : undefined,
          })),
        )
      : [];

    pushDiff(diffs, fileSlug, 'longDescription', current.longDescription, enrichment?.description_long_nl, enrichment?.enriched_at);
    pushDiff(diffs, fileSlug, 'bestFor', current.bestFor, enrichment?.best_for_nl, enrichment?.enriched_at);
    pushDiff(diffs, fileSlug, 'useCases', current.useCases ?? [], useCasesNl, enrichment?.enriched_at);
    pushDiff(diffs, fileSlug, 'strengths', current.strengths ?? [], strengthsNl, enrichment?.enriched_at);
    pushDiff(diffs, fileSlug, 'limitations', current.limitations ?? [], limitationsNl, enrichment?.enriched_at);
    pushDiff(diffs, fileSlug, 'pricing', current.pricing, enrichment?.pricing_nl, enrichment?.enriched_at);
    pushDiff(diffs, fileSlug, 'openSource', current.openSource, enrichment?.open_source, enrichment?.enriched_at);
    // v2 diffs
    pushDiff(diffs, fileSlug, 'deploymentType', current.deploymentType, enrichment?.deploymentType, enrichment?.enriched_at);
    pushDiff(diffs, fileSlug, 'dataResidency', current.dataResidency, enrichment?.dataResidency, enrichment?.enriched_at);
    pushDiff(diffs, fileSlug, 'targetAudience', current.targetAudience ?? [], enrichment?.targetAudience ?? [], enrichment?.enriched_at);
    pushDiff(diffs, fileSlug, 'businessFunctions', current.businessFunctions ?? [], enrichment?.businessFunctions ?? [], enrichment?.enriched_at);
    pushDiff(diffs, fileSlug, 'timeToFirstValue', current.timeToFirstValue, enrichment?.timeToFirstValue, enrichment?.enriched_at);
    pushDiff(diffs, fileSlug, 'setupComplexity', current.setupComplexity, enrichment?.setupComplexity, enrichment?.enriched_at);
    pushDiff(diffs, fileSlug, 'learningCurve', current.learningCurve, enrichment?.learningCurve, enrichment?.enriched_at);
    pushDiff(diffs, fileSlug, 'companySizeFit', current.companySizeFit ?? [], enrichment?.companySizeFit ?? [], enrichment?.enriched_at);
    pushDiff(diffs, fileSlug, 'bestUseCaseStage', current.bestUseCaseStage, enrichment?.bestUseCaseStage, enrichment?.enriched_at);
    // v3 diffs
    pushDiff(diffs, fileSlug, 'startingPriceMonthly', current.startingPriceMonthly, enrichment?.startingPriceMonthly, enrichment?.enriched_at);
    pushDiff(diffs, fileSlug, 'hasFreePlan', current.hasFreePlan, enrichment?.hasFreePlan, enrichment?.enriched_at);
    pushDiff(diffs, fileSlug, 'hasDemo', current.hasDemo, enrichment?.hasDemo, enrichment?.enriched_at);
    pushDiff(diffs, fileSlug, 'supportsDutchLanguage', current.supportsDutchLanguage, enrichment?.supportsDutchLanguage, enrichment?.enriched_at);
    pushDiff(diffs, fileSlug, 'hasDutchUI', current.hasDutchUI, enrichment?.hasDutchUI, enrichment?.enriched_at);
    pushDiff(diffs, fileSlug, 'offersDutchSupport', current.offersDutchSupport, enrichment?.offersDutchSupport, enrichment?.enriched_at);
    pushDiff(diffs, fileSlug, 'mainCompetitors', current.mainCompetitors ?? [], enrichment?.mainCompetitors ?? [], enrichment?.enriched_at);
    pushDiff(diffs, fileSlug, 'whenToChoose', current.whenToChoose, whenToChooseNl, enrichment?.enriched_at);
    pushDiff(diffs, fileSlug, 'headlineValueProp', current.headlineValueProp, headlineValuePropNl, enrichment?.enriched_at);
    pushDiff(diffs, fileSlug, 'implementationTimeEstimate', current.implementationTimeEstimate, implementationTimeEstimateNl, enrichment?.enriched_at);
    // v4 diffs — keyFeatures is always editorial review (TIER 3 in apply-diffs.ts)
    pushDiff(diffs, fileSlug, 'keyFeatures', current.keyFeatures ?? [], keyFeaturesNl, enrichment?.enriched_at);
  }

  await fs.writeFile(DIFF_PATH, `${JSON.stringify(diffs, null, 2)}\n`, 'utf8');
  await flushCache();

  console.log(`Created ${created.length} draft tool file(s).`);
  if (created.length) {
    console.log(`New drafts: ${created.join(', ')}`);
  }
  console.log(`Wrote ${diffs.length} enrichment diff suggestion(s) to ${path.relative(ROOT, DIFF_PATH)}`);
  logTranslationSummary();
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
