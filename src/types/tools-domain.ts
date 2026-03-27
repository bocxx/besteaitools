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
  | 'infrastructure';

/** Pricing model */
export type PricingModel = 'free' | 'freemium' | 'paid' | 'enterprise';

/** Difficulty level for end users */
export type DifficultyLevel = 'beginner' | 'intermediate' | 'advanced';

// ============================================
// CONTENT LAYER (editorial — never overwritten by ETL)
// ============================================

/** Tool content managed editorially (JSON files in src/content/tools/) */
export interface ToolContent {
  /** URL-safe identifier — must match newsflux slug */
  slug: string;
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
  /** Draft flag */
  draft: boolean;
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
  };
  github_trending_repos: GitHubTrendingRepo[];
  product_hunt_discoveries: ProductHuntDiscovery[];
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

// ============================================
// MERGED DTO (content + stats combined for rendering)
// ============================================

/** Full tool object for rendering — merge of ToolContent + ToolStats */
export interface Tool extends ToolContent {
  /** Stats from newsflux (undefined if no stats available yet) */
  stats?: ToolStats;
}
