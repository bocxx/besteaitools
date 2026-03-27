/**
 * Shared UI and content types
 * 
 * These types are intentionally generic so the same Astro base can power
 * multiple landing pages, tool directories, and editorial views.
 */

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
