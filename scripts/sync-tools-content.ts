import { promises as fs } from 'node:fs';
import path from 'node:path';

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
};

type EnrichmentDiff = {
  slug: string;
  field: keyof Pick<
    ToolContent,
    | 'longDescription' | 'bestFor' | 'useCases' | 'strengths' | 'limitations' | 'pricing' | 'openSource'
    | 'deploymentType' | 'dataResidency' | 'targetAudience' | 'businessFunctions'
    | 'timeToFirstValue' | 'setupComplexity' | 'learningCurve'
    | 'companySizeFit' | 'bestUseCaseStage'
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
  };
  return map[newsfluxCategory] ?? newsfluxCategory;
}

/** Convert a newsflux slug (may contain spaces) to a filename-safe hyphenated slug */
function toFileSlug(slug: string): string {
  return slug.replace(/\s+/g, '-');
}

function createDraftTool(tool: RadarTool): ToolContent {
  const enrichment = tool.enrichment;
  return {
    name: tool.name,
    category: mapCategory(tool.category),
    websiteUrl: tool.url ?? `https://${toFileSlug(tool.slug)}.com`,
    shortDescription: tool.description_nl ?? `${tool.name} AI-tool`,
    longDescription: enrichment?.description_long_nl,
    bestFor: enrichment?.best_for_nl,
    useCases: enrichment?.use_cases ?? [],
    strengths: enrichment?.strengths ?? [],
    limitations: enrichment?.limitations ?? [],
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
    const existingPath = existingBySlug.get(fileSlug);
    const enrichment = tool.enrichment;

    if (!existingPath) {
      const draft = createDraftTool(tool);
      const outPath = path.join(CONTENT_DIR, `${fileSlug}.json`);
      await fs.writeFile(outPath, `${JSON.stringify(draft, null, 2)}\n`, 'utf8');
      created.push(fileSlug);
      continue;
    }

    const current = await readJson<ToolContent>(existingPath);
    pushDiff(diffs, fileSlug, 'longDescription', current.longDescription, enrichment?.description_long_nl, enrichment?.enriched_at);
    pushDiff(diffs, fileSlug, 'bestFor', current.bestFor, enrichment?.best_for_nl, enrichment?.enriched_at);
    pushDiff(diffs, fileSlug, 'useCases', current.useCases ?? [], enrichment?.use_cases ?? [], enrichment?.enriched_at);
    pushDiff(diffs, fileSlug, 'strengths', current.strengths ?? [], enrichment?.strengths ?? [], enrichment?.enriched_at);
    pushDiff(diffs, fileSlug, 'limitations', current.limitations ?? [], enrichment?.limitations ?? [], enrichment?.enriched_at);
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
  }

  await fs.writeFile(DIFF_PATH, `${JSON.stringify(diffs, null, 2)}\n`, 'utf8');

  console.log(`Created ${created.length} draft tool file(s).`);
  if (created.length) {
    console.log(`New drafts: ${created.join(', ')}`);
  }
  console.log(`Wrote ${diffs.length} enrichment diff suggestion(s) to ${path.relative(ROOT, DIFF_PATH)}`);
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
