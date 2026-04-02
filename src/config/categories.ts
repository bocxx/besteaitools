/**
 * Tool category definitions
 * 
 * These categories are used across cards, filters, and future landing pages.
 * Colors intentionally remain aligned with the current design system.
 */

export const CATEGORIES = {
  chatbots: {
    name: "Chatbots",
    slug: "chatbots",
    color: "#ff6b6b",
    icon: "message-square",
    description: "Algemene AI-assistenten voor tekst, vragen en werk."
  },
  coding: {
    name: "Coding",
    slug: "coding",
    color: "#4ecdc4",
    icon: "code",
    description: "AI-tools voor developers, agents en code review."
  },
  automation: {
    name: "Automatisering",
    slug: "automation",
    color: "#95e1d3",
    icon: "workflow",
    description: "Automatisering, AI-agents en workflow tools."
  },
  image: {
    name: "Beeld",
    slug: "image",
    color: "#f38181",
    icon: "image",
    description: "AI-beeldgeneratie en visuele bewerking."
  },
  video: {
    name: "Video",
    slug: "video",
    color: "#aa96da",
    icon: "film",
    description: "AI-video, avatars en motion content."
  },
  audio: {
    name: "Audio",
    slug: "audio",
    color: "#fcbad3",
    icon: "mic",
    description: "Transcriptie, spraak en audio-productie."
  },
  search: {
    name: "Zoeken",
    slug: "search",
    color: "#ffffd2",
    icon: "search",
    description: "Zoeken, research en kennisverrijking."
  },
  productivity: {
    name: "Productiviteit",
    slug: "productivity",
    color: "#a8d8ea",
    icon: "sparkles",
    description: "Dagelijkse AI-tools voor kenniswerk en output."
  },
  infrastructure: {
    name: "Infrastructuur",
    slug: "infrastructure",
    color: "#c7ceea",
    icon: "server",
    description: "Modellen, infra, deployment en AI-platforms."
  },
  design: {
    name: "Design",
    slug: "design",
    color: "#f0abfc",
    icon: "palette",
    description: "AI-tools voor grafisch ontwerp en visuele content."
  },
} as const;

export function getCategoryBySlug(slug: string) {
  return Object.values(CATEGORIES).find((category) => category.slug === slug);
}

export function getCategoryColor(slug: string): string {
  const category = getCategoryBySlug(slug);
  return category?.color ?? '#ff6b6b';
}

export function getCategoryName(slug: string): string {
  const category = getCategoryBySlug(slug);
  return category?.name ?? slug;
}

export function getCategoryIcon(slug: string): string {
  const category = getCategoryBySlug(slug);
  return category?.icon ?? 'tag';
}

export function getAllCategories() {
  return Object.values(CATEGORIES);
}

export type CategoryKey = keyof typeof CATEGORIES;
export type Category = typeof CATEGORIES[CategoryKey];
