/**
 * AI Tools Domain Model
 *
 * Two-layer architecture:
 * - ToolContent: editorial data (managed via CMS / JSON, never overwritten by ETL)
 * - ToolStats:   dynamic data (overwritten every newsflux run)
 *
 * The merge of both produces a full Tool DTO for rendering.
 */

// ============================================
// ENUMS
// ============================================

/** Lifecycle phase of a trend or tool (from newsflux classify_phase) */
export type TrendPhase =
  | 'weak_signal'
  | 'emerging'
  | 'accelerating'
  | 'peaking'
  | 'sustained'
  | 'declining'
  | 'faded';

/** Trend direction (from newsflux determine_trend_direction) */
export type TrendDirection = 'rising' | 'stable' | 'declining';

/** Source types tracked by newsflux SmartSourceScanner */
export type SourceType =
  | 'twitter'
  | 'reddit'
  | 'articles'
  | 'linkedin'
  | 'github'
  | 'hackernews'
  | 'arxiv'
  | 'bluesky';

/** Tool lifecycle status (from status_classifier.py) */
export type ToolStatus =
  | 'active'
  | 'discontinued'
  | 'acquired'
  | 'open_sourced'
  | 'relaunched'
  | 'funding';

/** Tool categories — matches both newsflux ai_tool_taxonomy.py and our categories.ts */
export type ToolCategory =
  | 'chatbots'
  | 'coding'
  | 'automation'
  | 'image'
  | 'video'
  | 'audio'
  | 'search'
  | 'productivity'
  | 'infrastructure'
  | 'design';

/** Business functions for the /zakelijk niche page */
export type BusinessFunctionKey =
  | 'marketing'
  | 'sales'
  | 'klantenservice'
  | 'development'
  | 'data'
  | 'operations'
  | 'hr'
  | 'finance'
  | 'legal';

/** Pricing model */
export type PricingModel = 'free' | 'freemium' | 'paid' | 'enterprise';

/** Difficulty level for end users */
export type DifficultyLevel = 'beginner' | 'intermediate' | 'advanced';

/** Deployment type */
export type DeploymentType = 'saas' | 'self-hosted' | 'both';

/** Data residency */
export type DataResidency = 'eu' | 'us' | 'global' | 'unknown';

/** Target audience */
export type TargetAudience = 'mkb' | 'enterprise' | 'solo' | 'freelancer';

/** Funding stage (market proof) */
export type FundingStage = 'bootstrapped' | 'seed' | 'series-a' | 'series-b' | 'series-c' | 'growth' | 'public';

/** Time to first value */
export type TimeToFirstValue = 'minutes' | 'hours' | 'days' | 'weeks';

/** Setup complexity */
export type SetupComplexity = 'low' | 'medium' | 'high';

/** Learning curve */
export type LearningCurve = 'low' | 'medium' | 'high';

/** Quality level (documentation, support) */
export type QualityLevel = 'poor' | 'adequate' | 'good' | 'excellent';

/** Company size fit */
export type CompanySizeFit = 'solo' | 'small' | 'medium' | 'large' | 'enterprise';

/** Use case deployment stage */
export type UseCaseStage = 'experiment' | 'team-rollout' | 'mission-critical';

/** Review method (editorial credibility) */
export type ReviewMethod = 'desk_research' | 'vendor_claims' | 'hands_on' | 'customer_feedback';

/** Pricing currency */
export type PricingCurrency = 'eur' | 'usd';

// ============================================
// CONTENT LAYER (editorial — never overwritten by ETL)
// ============================================

/** Tool content managed editorially (JSON files in src/content/tools/) */
export interface ToolContent {
  /** Display name */
  name: string;
  /** Primary category */
  category: ToolCategory;
  /** Official website */
  websiteUrl: string;
  /** One-liner in Dutch (from taxonomy) */
  shortDescription: string;
  /** Extended description (from LLM enrichment, editorially approved) */
  longDescription?: string;
  /** Who benefits most (from enrichment) */
  bestFor?: string;
  /** Concrete use cases */
  useCases?: string[];
  /** Strengths */
  strengths?: string[];
  /** Limitations */
  limitations?: string[];
  /** Pricing info in Dutch */
  pricing?: string;
  /** Is open source */
  openSource?: boolean;
  /** Pricing model classification */
  pricingModel: PricingModel;
  /** Difficulty for end users */
  difficulty: DifficultyLevel;
  /** Tags for filtering */
  tags: string[];
  /** Business functions for /zakelijk page */
  businessFunctions: BusinessFunctionKey[];
  /** Draft flag */
  draft: boolean;
  // Zakelijke metadata
  /** Deployment type: SaaS, self-hosted, or both */
  deploymentType?: DeploymentType;
  /** Where data is stored/processed */
  dataResidency?: DataResidency;
  /** Target audience segments */
  targetAudience: TargetAudience[];
  /** @deprecated Use supportsDutchLanguage, hasDutchUI, offersDutchSupport instead */
  nlSupport: boolean;
  /** Known integrations (Microsoft 365, Slack, HubSpot, etc.) */
  integrations: string[];

  // ── Laag 1: Marktrijpheid ─────────────────────
  /** How many years the tool has been active on the market */
  yearsActive?: number;
  /** Well-known customers using this tool */
  notableCustomers: string[];
  /** G2 rating (0-5) */
  g2Rating?: number;
  /** Number of G2 reviews */
  g2ReviewCount?: number;
  /** Funding stage of the company */
  fundingStage?: FundingStage;

  // ── Laag 2: Inzetbaarheid ─────────────────────
  /** How quickly users get first value */
  timeToFirstValue?: TimeToFirstValue;
  /** Complexity of initial setup */
  setupComplexity?: SetupComplexity;
  /** Whether a developer is needed for setup/usage */
  requiresDeveloper?: boolean;
  /** Whether a free trial is available */
  freeTrialAvailable?: boolean;
  /** Whether the tool supports pilot programs */
  pilotFriendly?: boolean;

  // ── Laag 3: Governance & risico ───────────────
  /** GDPR compliant */
  gdprReady?: boolean;
  /** EU hosting option available */
  euHostingAvailable?: boolean;
  /** Data Processing Agreement available */
  dpaAvailable?: boolean;
  /** SOC 2 certified */
  soc2?: boolean;
  /** Single Sign-On support */
  sso?: boolean;
  /** Audit logging available */
  auditLogs?: boolean;

  // ── Laag 4: UX & adoptie ──────────────────────
  /** Editorial ease-of-use score (1-10) */
  easeOfUseScore?: number;
  /** Learning curve for new users */
  learningCurve?: LearningCurve;
  /** Quality of documentation */
  documentationQuality?: QualityLevel;
  /** Quality of customer support */
  supportQuality?: QualityLevel;

  // ── Laag 5: Concrete fit ──────────────────────
  /** Primary jobs this tool helps accomplish */
  primaryJobsToBeDone: string[];
  /** Which company sizes this tool fits */
  companySizeFit: CompanySizeFit[];
  /** Best stage for deploying this tool */
  bestUseCaseStage?: UseCaseStage;
  /** When NOT to use this tool */
  antiUseCases: string[];
  /** Tools this can replace */
  replacementFor: string[];

  // ── Laag 6: Prijsvergelijking ───────────────────
  /** Lowest monthly price in numeric form for filtering/comparison */
  startingPriceMonthly?: number;
  /** Currency for startingPriceMonthly */
  pricingCurrency: PricingCurrency;
  /** Whether there is a completely free plan (distinct from freemium) */
  hasFreePlan?: boolean;
  /** Whether a product demo is available */
  hasDemo?: boolean;
  /** Whether booking a demo is required to try the tool */
  bookDemoRequired?: boolean;

  // ── Laag 7: Nederlandse ondersteuning (granulair) ─
  /** Tool produces Dutch-language output */
  supportsDutchLanguage: boolean;
  /** Interface is available in Dutch */
  hasDutchUI: boolean;
  /** Customer support available in Dutch */
  offersDutchSupport: boolean;

  // ── Laag 8: Concurrenten & positionering ──────
  /** Slugs of competing/alternative tools */
  mainCompetitors: string[];
  /** When to choose this tool over alternatives */
  whenToChoose?: string;

  // ── Laag 9: Praktische evaluatie ──────────────
  /** One ultra-clear value proposition sentence for the top of the page */
  headlineValueProp?: string;
  /** Human-readable implementation time estimate, e.g. "1–2 weken" */
  implementationTimeEstimate?: string;
  /** URLs to product screenshots */
  screenshotUrls: string[];
  /** URL to demo or trial page */
  demoUrl?: string;
  /** Description of example output the tool produces */
  exampleOutput?: string;
  /** Description of an example workflow using the tool */
  exampleWorkflow?: string;

  // ── Redactionele laag ─────────────────────────
  /** Whether an editor has personally tested this tool */
  testedByEditor: boolean;
  /** How was this tool reviewed */
  reviewMethod?: ReviewMethod;
  /** ISO date of last editorial review */
  lastReviewedAt?: string;
  /** Short editorial verdict in Dutch */
  verdict?: string;
  /** Slug of the best alternative tool */
  bestAlternative?: string;
  /** Why this tool is listed despite many alternatives */
  whyListed?: string;
}

// ============================================
// STATS LAYER (dynamic — overwritten every newsflux run)
// ============================================

/** Daily history point for sparklines */
export interface HistoryPoint {
  date: string;
  mentions: number;
}

/** A source article reference */
export interface SourceArticle {
  title: string;
  url: string;
  source: string;
  /** Short snippet / lead paragraph */
  snippet?: string;
  /** Language hint: 'nl' | 'en' */
  lang?: 'nl' | 'en';
  /** Dutch title (generated by enrichment LLM, optional) */
  title_nl?: string;
  /** Dutch one-line summary (generated by enrichment LLM, optional) */
  summary_nl?: string;
}

/** A YouTube video referencing this tool */
export interface YoutubeVideo {
  title: string;
  url: string;
  channel: string;
}

/** A social post mentioning this tool (Bluesky, Reddit, or Twitter) */
export interface SocialPost {
  text: string;
  author_handle: string;
  author_name: string;
  likes: number;
  reposts: number;
  url: string;
  /** Source platform for icon rendering */
  platform?: 'bluesky' | 'reddit' | 'twitter';
}

/** Risk signal detected from news/social data */
export interface RiskFlag {
  /** Risk category identifier */
  category: 'security' | 'privacy' | 'autonomy' | 'china_data' | 'accuracy' | 'cost' | 'legal';
  /** Dutch label for the risk */
  label_nl: string;
  /** Number of source texts mentioning this risk */
  hits: number;
  /** Matched risk keywords (max 3) */
  matched: string[];
}

/** GitHub trending repo linked to a tool */
export interface GitHubRepo {
  repo: string;
  stars_today: number;
  description: string;
}

/** Stats for a single tool (from ai_tools_radar.json) */
export interface ToolStats {
  slug: string;
  buzz_score: number;
  trend_direction: TrendDirection;
  mentions: number;
  velocity: number;
  source_count: number;
  sources: SourceType[];
  phase: TrendPhase;
  days_active: number;
  history: HistoryPoint[];
  github_stars: number;
  github_repos: number;
  github_top_repos: GitHubRepo[];
  reddit_posts: number;
  product_hunt_mentions: number;
  newsletter_mentions: number;
  source_articles: SourceArticle[];
  youtube_videos: YoutubeVideo[];
  social_posts: SocialPost[];

  /** Risk signals detected from articles/reddit/social data */
  risk_flags?: RiskFlag[];

  // --- v3: already computed in newsflux, not yet exported ---

  /** 2nd derivative of velocity — early signal for accelerating tools */
  acceleration?: number;
  /** 0.0–1.0 ratio of expert (HN/ArXiv) vs total mentions */
  expert_ratio?: number;
  /** Historical peak mention count */
  peak_mentions?: number;
  /** ISO date of first mention (for "Nieuw" badge accuracy) */
  first_seen?: string;
  /** ISO date of most recent mention (for staleness detection) */
  last_seen?: string;
  /** Related search terms from trendsnapshots */
  related_terms?: string[];
  /** Per-source mention breakdown (e.g. { twitter: 120, reddit: 45 }) */
  source_breakdown?: Record<string, number>;

  // --- v3: new data sources (future pipelines) ---

  /** Weekly npm download count (from npm_pypi_fetcher.py) */
  npm_downloads?: number;
  /** Weekly PyPI download count (from npm_pypi_fetcher.py) */
  pypi_downloads?: number;

  // --- v3: status classification (from status_classifier.py) ---

  /** Lifecycle status beyond phase — discontinued, acquired, etc. */
  status?: ToolStatus;
  /** Confidence of the status classification (0.0–1.0) */
  status_confidence?: number;
  /** ISO date when status change was detected */
  status_changed_at?: string;
}

/** Top-level radar JSON shape (from newsflux generate_ai_tools_radar.py) */
export interface ToolsRadarData {
  generated_at: string;
  window_days: number;
  total_tools_tracked: number;
  categories: Record<string, { name: string; icon: string; color: string; description_nl: string; count: number }>;
  tools: (ToolStats & {
    name: string;
    category: string;
    description_nl: string;
    url: string;
    enrichment: ToolEnrichment | null;
  })[];
  sections: {
    meest_besproken: string[];
    stijgers: string[];
    nieuw: string[];
    github_hot: string[];
    product_hunt_hot: string[];
    /** v3: expert-curated top picks (high expert_ratio + buzz) */
    expert_picks?: string[];
  };
  github_trending_repos: GitHubTrendingRepo[];
  product_hunt_discoveries: ProductHuntDiscovery[];
  /** v3: recent tool status events (from status_classifier.py) */
  status_events?: ToolStatusEvent[];
}

/** A detected tool status change event */
export interface ToolStatusEvent {
  tool_slug: string;
  event_type: ToolStatus;
  detected_date: string;
  confidence: number;
  severity: 'low' | 'medium' | 'high';
  source_count: number;
  confirmed?: boolean;
  evidence?: { title: string; url?: string }[];
}

/** Enrichment data cached per tool (from enrich_tools_radar.py) */
export interface ToolEnrichment {
  description_long_nl: string;
  best_for_nl: string;
  use_cases: string[];
  strengths: string[];
  limitations: string[];
  pricing_nl: string;
  open_source: boolean;
  enriched_at: string;
  slug: string;
  model: string;
  /** Dutch how-to / getting-started tip (optional, from enrichment) */
  quick_start_nl?: string;
}

/** GitHub trending repo (standalone, not linked to a specific tool) */
export interface GitHubTrendingRepo {
  repo: string;
  description: string;
  language: string;
  stars_period: number;
  total_stars: number;
  terms: string[];
}

/** Product Hunt discovery */
export interface ProductHuntDiscovery {
  name: string;
  url: string;
  date: string;
}

/** Product Hunt post stats (from PH GraphQL API, fetched at build time) */
export interface ProductHuntStats {
  /** Upvote count */
  votesCount: number;
  /** Number of comments */
  commentsCount: number;
  /** Aggregate review rating (0-5) */
  reviewsRating: number;
  /** Number of reviews */
  reviewsCount: number;
  /** Thumbnail/logo URL from PH */
  thumbnailUrl?: string;
  /** PH post URL (e.g. /posts/rudel) */
  phPostUrl: string;
  /** Daily rank on PH (1 = Product of the Day) */
  dailyRank?: number;
}

export interface LaunchRadarSection {
  key: 'product_hunt' | 'github' | 'hackernews' | 'twitter' | 'bluesky';
  label: string;
  count: number;
  launches: LaunchItem[];
}

export interface LaunchRadarViewData {
  generatedAt: string;
  windowDays: number;
  totalLaunches: number;
  bySource: Record<string, number>;
  featured: LaunchItem[];
  sections: LaunchRadarSection[];
  latest: LaunchItem[];
}

// ============================================
// MERGED DTO (content + stats combined for rendering)
// ============================================

// ============================================
// COMPUTED SCORES (calculated at merge time)
// ============================================

/** Computed scores derived from editorial + stats data */
export interface ComputedScores {
  /** Market proof: reviews + years + customers + funding (0-100) */
  provenScore: number;
  /** How quickly a team can start using it (0-100) */
  timeToValueScore: number;
  /** Security & compliance readiness (0-100) */
  governanceScore: number;
  /** Overall business readiness (0-100) */
  businessReadinessScore: number;
}

// ============================================
// MERGED DTO (content + stats combined for rendering)
// ============================================

/** Full tool object for rendering — merge of ToolContent + ToolStats */
export interface Tool extends ToolContent {
  /** URL-safe slug derived from filename (hyphens, no spaces) */
  slug: string;
  /** Stats from newsflux (undefined if no stats available yet) */
  stats?: ToolStats;
  /** Computed scores (undefined if insufficient data) */
  scores?: ComputedScores;
}
