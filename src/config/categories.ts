/**
 * Content category definitions
 * 
 * Define categories with colors, icons, and metadata.
 * Used across showcase, testimonials, and content collections.
 */

export const CATEGORIES = {
  // ============================================
  // SHOWCASE CATEGORIES
  // ============================================
  automation: {
    name: "Automation",
    slug: "automation",
    color: "#ff6b6b",
    icon: "zap",
    description: "Automated workflows and task management",
  },
  productivity: {
    name: "Productivity",
    slug: "productivity",
    color: "#4ecdc4",
    icon: "trending-up",
    description: "Boost your daily productivity",
  },
  developer: {
    name: "Developer",
    slug: "developer",
    color: "#95e1d3",
    icon: "code",
    description: "Dev tools and coding workflows",
  },
  "smart-home": {
    name: "Smart Home",
    slug: "smart-home",
    color: "#f38181",
    icon: "home",
    description: "Home automation and IoT",
  },
  integration: {
    name: "Integration",
    slug: "integration",
    color: "#aa96da",
    icon: "plug",
    description: "Third-party integrations",
  },
  personal: {
    name: "Personal",
    slug: "personal",
    color: "#fcbad3",
    icon: "user",
    description: "Personal use cases",
  },
  family: {
    name: "Family",
    slug: "family",
    color: "#ffffd2",
    icon: "users",
    description: "Family and household management",
  },
  "power-user": {
    name: "Power User",
    slug: "power-user",
    color: "#a8d8ea",
    icon: "cpu",
    description: "Advanced multi-agent setups",
  },
  
  // ============================================
  // CONTENT CATEGORIES (Articles/Blog)
  // ============================================
  news: {
    name: "News",
    slug: "news",
    color: "#ff6b6b",
    icon: "newspaper",
    description: "Breaking AI news and industry updates",
  },
  tutorials: {
    name: "Tutorials",
    slug: "tutorials",
    color: "#4ecdc4",
    icon: "book-open",
    description: "Step-by-step learning content",
  },
  guides: {
    name: "Guides",
    slug: "guides",
    color: "#95e1d3",
    icon: "lightbulb",
    description: "Comprehensive how-to guides",
  },
  reviews: {
    name: "Reviews",
    slug: "reviews",
    color: "#f38181",
    icon: "star",
    description: "Tool and product reviews",
  },
  "case-studies": {
    name: "Case Studies",
    slug: "case-studies",
    color: "#aa96da",
    icon: "file-text",
    description: "Real-world implementations",
  },
  comparisons: {
    name: "Comparisons",
    slug: "comparisons",
    color: "#fcbad3",
    icon: "git-compare",
    description: "Head-to-head comparisons",
  },
  opinion: {
    name: "Opinion",
    slug: "opinion",
    color: "#ffffd2",
    icon: "message-circle",
    description: "Analysis and editorials",
  },
  announcements: {
    name: "Announcements",
    slug: "announcements",
    color: "#a8d8ea",
    icon: "megaphone",
    description: "Product releases and updates",
  },
  "deep-dives": {
    name: "Deep Dives",
    slug: "deep-dives",
    color: "#ff8b94",
    icon: "search",
    description: "Research and technical deep dives",
  },
  interviews: {
    name: "Interviews",
    slug: "interviews",
    color: "#c7ceea",
    icon: "mic",
    description: "Industry interviews",
  },
  
  // ============================================
  // NIEUWS CATEGORIES (Dutch AI News)
  // ============================================
  "ai-nieuws": {
    name: "AI Nieuws",
    slug: "ai-nieuws",
    color: "#ff6b6b",
    icon: "newspaper",
    description: "Laatste AI nieuws",
  },
  "ai-tools": {
    name: "AI Tools",
    slug: "ai-tools",
    color: "#4ecdc4",
    icon: "tool",
    description: "Nieuwe AI tools en platforms",
  },
  "ai-innovatie": {
    name: "AI Innovatie",
    slug: "ai-innovatie",
    color: "#95e1d3",
    icon: "sparkles",
    description: "Innovaties in AI",
  },
  "ai-ethiek": {
    name: "AI Ethiek",
    slug: "ai-ethiek",
    color: "#aa96da",
    icon: "shield",
    description: "Ethiek en verantwoord AI",
  },
  "ai-tutorials": {
    name: "AI Tutorials",
    slug: "ai-tutorials",
    color: "#fcbad3",
    icon: "graduation-cap",
    description: "AI leermaterialen",
  },
  "ai-deep-dives": {
    name: "AI Deep Dives",
    slug: "ai-deep-dives",
    color: "#ff8b94",
    icon: "compass",
    description: "Diepgaande AI analyses",
  },
} as const;

// ============================================
// HELPER FUNCTIONS
// ============================================

/**
 * Get category by slug
 */
export function getCategoryBySlug(slug: string) {
  return Object.values(CATEGORIES).find(cat => cat.slug === slug);
}

/**
 * Get category color
 */
export function getCategoryColor(slug: string): string {
  const category = getCategoryBySlug(slug);
  return category?.color ?? "#ff6b6b"; // Default to primary color
}

/**
 * Get category name
 */
export function getCategoryName(slug: string): string {
  const category = getCategoryBySlug(slug);
  return category?.name ?? slug;
}

/**
 * Get category icon
 */
export function getCategoryIcon(slug: string): string {
  const category = getCategoryBySlug(slug);
  return category?.icon ?? "tag";
}

/**
 * Get all showcase categories
 */
export function getShowcaseCategories() {
  return [
    CATEGORIES.automation,
    CATEGORIES.productivity,
    CATEGORIES.developer,
    CATEGORIES["smart-home"],
    CATEGORIES.integration,
    CATEGORIES.personal,
    CATEGORIES.family,
    CATEGORIES["power-user"],
  ];
}

/**
 * Get all content categories (articles/blog)
 */
export function getContentCategories() {
  return [
    CATEGORIES.news,
    CATEGORIES.tutorials,
    CATEGORIES.guides,
    CATEGORIES.reviews,
    CATEGORIES["case-studies"],
    CATEGORIES.comparisons,
    CATEGORIES.opinion,
    CATEGORIES.announcements,
    CATEGORIES["deep-dives"],
    CATEGORIES.interviews,
  ];
}

/**
 * Get all nieuws categories
 */
export function getNieuwsCategories() {
  return [
    CATEGORIES["ai-nieuws"],
    CATEGORIES["ai-tools"],
    CATEGORIES["ai-innovatie"],
    CATEGORIES["ai-ethiek"],
    CATEGORIES["ai-tutorials"],
    CATEGORIES["ai-deep-dives"],
  ];
}

// ============================================
// TYPE EXPORTS
// ============================================
export type CategoryKey = keyof typeof CATEGORIES;
export type Category = typeof CATEGORIES[CategoryKey];
export type ShowcaseCategory = "automation" | "productivity" | "developer" | "smart-home" | "integration" | "personal" | "family" | "power-user";
export type ContentCategory = "news" | "tutorials" | "guides" | "reviews" | "case-studies" | "comparisons" | "opinion" | "announcements" | "deep-dives" | "interviews";
export type NieuwsCategory = "ai-nieuws" | "ai-tools" | "ai-innovatie" | "ai-ethiek" | "ai-tutorials" | "ai-deep-dives";
