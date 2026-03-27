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
} as const;

export type ToolCategoryKey = keyof typeof toolCategories;
export const toolCategoryKeys = Object.keys(toolCategories) as [ToolCategoryKey, ...ToolCategoryKey[]];
export const toolCategorySchema = z.enum(toolCategoryKeys);

// ============================================
// 2. TREND PHASES
// ============================================

export const trendPhases = {
  weak_signal:  { label: 'Weak Signal',  color: 'var(--text-muted)',       badge: 'outline'  },
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
// 4. PRICING MODELS
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
// 5. DIFFICULTY LEVELS
// ============================================

export const difficultyLevels = {
  beginner:     { label: 'Beginner',     color: 'var(--color-success)' },
  intermediate: { label: 'Gemiddeld',    color: 'var(--color-warning)' },
  advanced:     { label: 'Gevorderd',    color: 'var(--color-error)' },
} as const;

export const difficultyLevelKeys = Object.keys(difficultyLevels) as ['beginner', 'intermediate', 'advanced'];
export const difficultyLevelSchema = z.enum(difficultyLevelKeys);

// ============================================
// 6. BUZZ SCORE HELPERS
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
// 7. CONTENT COLLECTION SCHEMA (for content.config.ts)
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
  draft: z.boolean().default(false),
});
