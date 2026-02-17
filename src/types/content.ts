/**
 * Content type definitions and validation schemas
 * 
 * This file provides type-safe interfaces for all content types
 * and runtime validation using Zod.
 */

import { z } from 'astro:content';
import type { CollectionEntry } from 'astro:content';

// ============================================
// SHOWCASE TYPES
// ============================================

/**
 * Showcase item schema
 * Represents user-submitted examples of what they've built with OpenClaw
 */
export const showcaseItemSchema = z.object({
  id: z.string(),
  author: z.string(),
  quote: z.string(),
  category: z.string(), // References categories.ts
  likes: z.number().int().nonnegative(),
  images: z.array(z.string().url()).optional(),
  url: z.string().url().optional(),
});

export type ShowcaseItem = z.infer<typeof showcaseItemSchema>;

// ============================================
// TESTIMONIAL TYPES
// ============================================

/**
 * Testimonial schema
 * User praise and feedback about OpenClaw
 */
export const testimonialSchema = z.object({
  id: z.string().optional(),
  quote: z.string(),
  author: z.string(),
  handle: z.string().optional(),
  url: z.string().url(),
  likes: z.number().int().nonnegative().optional(),
  avatar: z.string().url().optional(),
  featured: z.boolean().default(false),
});

export type Testimonial = z.infer<typeof testimonialSchema>;

// ============================================
// CONTENT COLLECTION TYPES
// ============================================

/**
 * Article type from content collection
 */
export type Article = CollectionEntry<'articles'>;
export type ArticleData = Article['data'];

/**
 * Blog post type from content collection
 */
export type BlogPost = CollectionEntry<'blog'>;
export type BlogPostData = BlogPost['data'];

/**
 * Nieuws (Dutch news) type from content collection
 */
export type NieuwsItem = CollectionEntry<'nieuws'>;
export type NieuwsItemData = NieuwsItem['data'];

// ============================================
// COMMON CONTENT TYPES
// ============================================

/**
 * Author information
 */
export interface Author {
  name: string;
  handle: string;
  avatar?: string;
  bio?: string;
  url?: string;
}

/**
 * Category information
 */
export interface CategoryInfo {
  name: string;
  slug: string;
  color: string;
  icon: string;
  description: string;
}

/**
 * Card props for reusable card components
 */
export interface CardProps {
  title: string;
  description: string;
  href: string;
  category?: string;
  publishedAt?: Date;
  author?: string;
  readingTime?: number;
  featured?: boolean;
  image?: string;
}

// ============================================
// SORTING & FILTERING TYPES
// ============================================

/**
 * Content sort options
 */
export type SortBy = 'date' | 'likes' | 'engagement' | 'title' | 'category';
export type SortOrder = 'asc' | 'desc';

export interface SortOptions {
  by: SortBy;
  order: SortOrder;
}

/**
 * Content filter options
 */
export interface FilterOptions {
  category?: string;
  tags?: string[];
  featured?: boolean;
  dateRange?: {
    start: Date;
    end: Date;
  };
}

// ============================================
// GRID LAYOUT TYPES
// ============================================

/**
 * Grid span types for layout control
 */
export type ColSpan = 1 | 2 | 3 | 4 | 'full';
export type RowSpan = 1 | 2 | 3;

export interface GridItemProps {
  colSpan?: ColSpan;
  rowSpan?: RowSpan;
  className?: string;
}

// ============================================
// PAGE METADATA TYPES
// ============================================

/**
 * SEO metadata
 */
export interface SEOMetadata {
  title: string;
  description: string;
  image?: string;
  canonical?: string;
  noindex?: boolean;
  keywords?: string[];
}

/**
 * Social metadata (OG, Twitter)
 */
export interface SocialMetadata {
  ogImage?: string;
  ogTitle?: string;
  ogDescription?: string;
  twitterCard?: 'summary' | 'summary_large_image';
  twitterCreator?: string;
}

// ============================================
// NAVIGATION TYPES
// ============================================

/**
 * Navigation link
 */
export interface NavLink {
  label: string;
  href: string;
  external?: boolean;
  icon?: string;
}

/**
 * Breadcrumb item
 */
export interface BreadcrumbItem {
  label: string;
  href: string;
}

// ============================================
// PAGINATION TYPES
// ============================================

/**
 * Pagination state
 */
export interface Pagination {
  page: number;
  pageSize: number;
  total: number;
  totalPages: number;
  hasNext: boolean;
  hasPrev: boolean;
}

// ============================================
// VALIDATION RESULT TYPES
// ============================================

/**
 * Validation result wrapper
 */
export interface ValidationResult<T> {
  success: boolean;
  data?: T;
  errors?: Array<{
    path: string;
    message: string;
  }>;
}
