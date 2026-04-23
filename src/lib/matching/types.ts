/**
 * Matching Engine — Core Types
 *
 * Shared types for intake → filter → score → output pipeline.
 * All types intentionally serialisable (JSON-safe) so results can be
 * cached in localStorage, shared via URL-params, or logged to events.
 */

import type { Tool } from '../../types/tools-domain';
import type {
  SegmentKey,
  UseCaseBucketKey,
  DutchOutputQuality,
  ScoringFactor,
} from '../taxonomies';
import type { JtbdKey, VerenigingTypeKey, VerenigingTimeSinkKey } from '../taxonomies/jtbd';
import type { IntegrationKey } from '../taxonomies/integrations';
import type { AiComfortLevelKey, BudgetBucketKey } from '../taxonomies/constraints';

// ============================================
// USER PROFILE (from intake wizard)
// ============================================

export interface UserProfile {
  // ── Laag 1 (required) ──
  segment: SegmentKey;
  /** MKB / overheid / enterprise only; undefined for zzp / vereniging. */
  teamSize?: number;
  /** If segment === 'vereniging'. */
  verenigingType?: VerenigingTypeKey;
  /** If segment === 'vereniging'. */
  verenigingTimeSink?: VerenigingTimeSinkKey;

  // ── Laag 2 (required) ──
  useCaseBuckets: UseCaseBucketKey[];
  /** Optional granular JTBDs; sharpens matching. */
  jtbds?: JtbdKey[];

  // ── Laag 3 (required) ──
  aiComfort: AiComfortLevelKey;

  // ── Laag 4 (optional hard constraints) ──
  requireEuHosting?: boolean;
  /** Minimum acceptable Dutch output quality. */
  minDutchOutputQuality?: DutchOutputQuality;
  requiredIntegrations?: IntegrationKey[];
  /** User data must NOT be used to train models. */
  disallowTraining?: boolean;
  requireSso?: boolean;
  requireAuditLogs?: boolean;

  // ── Laag 5 (optional preferences) ──
  budget?: BudgetBucketKey;
  /** Tools user already uses — excluded from recs as primary candidate,
   *  but boost for complementary tools. */
  currentStack?: IntegrationKey[];
}

// ============================================
// SCORING
// ============================================

/** Per-factor score 0-100 plus weight applied. */
export interface FactorScore {
  raw: number;
  weight: number;
  weighted: number;
}

/** Full breakdown of a tool's score for a user. */
export type ScoreBreakdown = Record<ScoringFactor, FactorScore>;

export interface MatchResult {
  slug: string;
  /** Final weighted score 0-100. */
  score: number;
  breakdown: ScoreBreakdown;
  /** Rank in the candidate set after scoring (1 = best). */
  rank: number;
  /** Terse explanation why this rank (template-based, no LLM). */
  reason?: string;
  /** One-sentence "why not top-3" reason for ranks 4-6. */
  whyNotTop3?: string;
}

export interface RejectedResult {
  slug: string;
  /** Filter rules that eliminated this tool. */
  reasons: string[];
}

// ============================================
// PIPELINE OUTPUT
// ============================================

export interface MatchOutput {
  /** Top 3 tools. Always populated when candidates exist. */
  top3: MatchResult[];
  /** Ranks 4-6 with "waarom niet" reason. */
  alternatives: MatchResult[];
  /** Tools eliminated by hard filters. */
  rejected: RejectedResult[];
  /** 0-1 confidence in the result. */
  confidence: number;
  /** True when confidence below threshold; UI should surface the follow-up
   *  question instead of top3, but top3 stays available for diagnostics. */
  suppressed: boolean;
  /** Set when confidence below threshold — ask one follow-up. */
  followUp?: FollowUpQuestion;
  /** Candidate set size after hard filters. */
  candidateCount: number;
  /** Dataset size before filtering. */
  totalToolCount: number;
}

export interface FollowUpQuestion {
  question: string;
  /** Factor name this question would disambiguate. */
  factor: ScoringFactor;
  optionA: { label: string; implies: Partial<UserProfile> };
  optionB: { label: string; implies: Partial<UserProfile> };
}

// ============================================
// PIPELINE INPUT
// ============================================

export interface MatchInput {
  profile: UserProfile;
  /** Full tool dataset (from getAllTools() or a trimmed client-side copy). */
  tools: Tool[];
}
