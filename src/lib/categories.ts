/**
 * Dutch AI News Categories
 * Simplified category system for the news portal
 */

export type CategorySlug = 
  | 'ai-nieuws'
  | 'ai-tools'
  | 'ai-innovatie'
  | 'ai-ethiek'
  | 'ai-tutorials'
  | 'ai-deep-dives';

export interface Category {
  slug: CategorySlug;
  name: string;
  description: string;
  /** CSS color variable from the Nebula theme - using muted variants */
  color: string;
  /** Lucide icon name */
  icon: string;
}

export const categories: Record<CategorySlug, Category> = {
  'ai-nieuws': {
    slug: 'ai-nieuws',
    name: 'Nieuws',
    description: 'Het laatste AI nieuws en trends uit de industrie',
    color: 'var(--text-secondary)',
    icon: 'newspaper',
  },
  'ai-tools': {
    slug: 'ai-tools',
    name: 'Tools',
    description: 'Reviews en vergelijkingen van praktische AI tools',
    color: 'var(--secondary-mid)',
    icon: 'wrench',
  },
  'ai-innovatie': {
    slug: 'ai-innovatie',
    name: 'Innovatie',
    description: 'Nieuwe ontwikkelingen, startups en doorbraken',
    color: 'var(--tertiary-dark)',
    icon: 'lightbulb',
  },
  'ai-ethiek': {
    slug: 'ai-ethiek',
    name: 'Ethiek',
    description: 'Verantwoord AI gebruik, privacy en maatschappelijke impact',
    color: 'var(--text-secondary)',
    icon: 'scale',
  },
  'ai-tutorials': {
    slug: 'ai-tutorials',
    name: 'Tutorials',
    description: 'Praktische handleidingen en how-to guides',
    color: 'var(--secondary-dark)',
    icon: 'book-open',
  },
  'ai-deep-dives': {
    slug: 'ai-deep-dives',
    name: 'Deep Dives',
    description: 'Diepgaande analyses en technische verkenningen',
    color: 'var(--primary-mid)',
    icon: 'microscope',
  },
};

/** Get all categories as array */
export const getAllCategories = (): Category[] => Object.values(categories);

/** Get category by slug */
export const getCategory = (slug: string): Category | undefined => 
  categories[slug as CategorySlug];

/** Get category name by slug (with fallback) */
export const getCategoryName = (slug: string): string => 
  categories[slug as CategorySlug]?.name ?? slug;

/** Get category color by slug (with fallback) */
export const getCategoryColor = (slug: string): string => 
  categories[slug as CategorySlug]?.color ?? 'var(--text-secondary)';
