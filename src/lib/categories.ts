import { CATEGORIES } from '../config/categories';

export type CategorySlug = keyof typeof CATEGORIES;
export type Category = (typeof CATEGORIES)[CategorySlug];

export const categories: Record<CategorySlug, Category> = CATEGORIES;

export const getAllCategories = (): Category[] => Object.values(categories);

export const getCategory = (slug: string): Category | undefined =>
  categories[slug as CategorySlug];

export const getCategoryName = (slug: string): string =>
  categories[slug as CategorySlug]?.name ?? slug;

export const getCategoryColor = (slug: string): string =>
  categories[slug as CategorySlug]?.color ?? '#ff6b6b';
