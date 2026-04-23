/**
 * Matching Engine — Hard Filters
 *
 * Binary gates: a tool either passes or is rejected. No partial credit.
 * Used to shrink the dataset before scoring runs.
 *
 * Source: DEBESTEAITOOLS_MATCHING_PLAN.md §6c.
 */

import type { Tool } from '../../types/tools-domain';
import type { DutchOutputQuality } from '../taxonomies';
import { budgetBuckets } from '../taxonomies';
import type { UserProfile, RejectedResult } from './types';

// Ordered best → worst
const dutchQualityRank: Record<DutchOutputQuality, number> = {
  native: 4, good: 3, basic: 2, poor: 1,
};

/** Check a single tool against all hard filters. Returns reasons if rejected. */
export function filterTool(tool: Tool, profile: UserProfile): string[] {
  const reasons: string[] = [];

  // ── Segment match ──
  // Tool must list the user's segment as suitable. Empty matchSegments
  // means "no explicit segment info" → don't reject on this basis.
  if (tool.matchSegments.length > 0 && !tool.matchSegments.includes(profile.segment)) {
    reasons.push(`niet geschikt voor segment "${profile.segment}"`);
  }

  // ── Team size ──
  if (profile.teamSize != null && tool.idealTeamSize) {
    const { min, max } = tool.idealTeamSize;
    if (profile.teamSize < min || profile.teamSize > max) {
      reasons.push(`teamgrootte ${profile.teamSize} valt buiten ${min}-${max}`);
    }
  }

  // ── Budget ──
  if (profile.budget) {
    const maxEur = budgetBuckets[profile.budget].maxEur;
    const startingPrice = tool.startingPriceMonthly;

    if (profile.budget === 'free') {
      // Free bucket: need hasFreePlan explicitly, OR startingPriceMonthly === 0,
      // OR a free-ish pricingModel (free/freemium) as a sensible fallback.
      const hasFreeModel = tool.pricingModel === 'free' || tool.pricingModel === 'freemium';
      const freeTierOk = tool.hasFreePlan || startingPrice === 0 || hasFreeModel;
      if (!freeTierOk) {
        reasons.push('geen gratis plan beschikbaar');
      }
    } else if (startingPrice != null && startingPrice > maxEur) {
      reasons.push(`instapprijs €${startingPrice}/mnd overschrijdt budget €${maxEur}`);
    }
  }

  // ── EU hosting ──
  if (profile.requireEuHosting && !tool.euHostingAvailable) {
    reasons.push('geen EU-hosting beschikbaar');
  }

  // ── Dutch output quality ──
  if (profile.minDutchOutputQuality) {
    const minRank = dutchQualityRank[profile.minDutchOutputQuality];
    const toolQuality = tool.outputLanguageQualityNl;
    if (toolQuality == null) {
      // No data → treat as failing the filter ONLY if user wants native;
      // otherwise give benefit of doubt (supportsDutchLanguage bool).
      if (profile.minDutchOutputQuality === 'native' && !tool.supportsDutchLanguage) {
        reasons.push('Nederlandstalige output niet bevestigd');
      }
    } else if (dutchQualityRank[toolQuality] < minRank) {
      reasons.push(`Nederlandse output-kwaliteit "${toolQuality}" onder minimum`);
    }
  }

  // ── Required integrations ──
  if (profile.requiredIntegrations && profile.requiredIntegrations.length > 0) {
    const toolInts = new Set(tool.controlledIntegrations);
    const missing = profile.requiredIntegrations.filter((i) => !toolInts.has(i));
    if (missing.length > 0) {
      reasons.push(`ontbrekende integraties: ${missing.join(', ')}`);
    }
  }

  // ── Training data opt-out ──
  if (profile.disallowTraining) {
    const usage = tool.dataUsedForTraining;
    // 'yes' is a hard fail; 'opt-out'/'opt-in' pass (user can configure);
    // undefined = unknown → pass (rank lower via scoring).
    if (usage === 'yes') {
      reasons.push('trainingsdata-gebruik niet uit te zetten');
    }
  }

  // ── SSO / audit logs ──
  if (profile.requireSso && !tool.sso) {
    reasons.push('geen SSO');
  }
  if (profile.requireAuditLogs && !tool.auditLogs) {
    reasons.push('geen audit logs');
  }

  return reasons;
}

/** Split dataset into passing candidates and rejected tools with reasons. */
export function applyFilters(
  tools: Tool[],
  profile: UserProfile,
): { candidates: Tool[]; rejected: RejectedResult[] } {
  const candidates: Tool[] = [];
  const rejected: RejectedResult[] = [];

  for (const tool of tools) {
    const reasons = filterTool(tool, profile);
    if (reasons.length === 0) {
      candidates.push(tool);
    } else {
      rejected.push({ slug: tool.slug, reasons });
    }
  }

  return { candidates, rejected };
}
