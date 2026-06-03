/**
 * Central site configuration
 * 
 * Single source of truth for site identity, navigation, and metadata.
 * Update here once to change across the entire site.
 */

export const siteConfig = {
  // ============================================
  // SITE IDENTITY
  // ============================================
  name: "debesteaitools.nl",
  tagline: "De beste AI-tools op een rij",
  description: "Ontdek en vergelijk 80+ AI-tools op buzz, groei en mentions — objectief gerankt. Van ChatGPT tot Midjourney, altijd up-to-date.",
  url: "https://debesteaitools.nl",
  
  // ============================================
  // BRANDING
  // ============================================
  logo: {
    text: "debesteaitools.nl",
  },
  
  // ============================================
  // NAVIGATION
  // ============================================
  navigation: {
    // Top nav: redactionele "Nieuws" + automation-feed "Radar" zijn nu
    // twee duidelijke hubs. /digest/ is samengevoegd onder /nieuws/;
    // /launch-radar/ en /weekradar/ onder /radar/ (beide redirecten).
    main: [
      { label: "Modellen", href: "/modellen" },
      { label: "Radar", href: "/radar/?view=launches" },
      { label: "Nieuws", href: "/nieuws" },
      { label: "Leren", href: "/leren" },
      { label: "Vergelijk", href: "/vergelijk" },
    ],
    footer: {
      platform: [
        { label: "AI Tools", href: "/ai-tools" },
        { label: "Over deze site", href: "/over" },
      ],
      juridisch: [
        { label: "Privacy", href: "/privacy" },
        { label: "Voorwaarden", href: "/voorwaarden" },
      ],
    },
  },
  
  // ============================================
  // SOCIAL LINKS
  // ============================================
  social: {
    github: {
      url: "https://github.com/bocxx",
      label: "GitHub",
    },
    x: {
      url: "https://x.com/AInieuwsNL",
      label: "X / Twitter",
      handle: "@AInieuwsNL",
    },
    linkedin: {
      url: "https://www.linkedin.com/groups/17801035/",
      label: "LinkedIn",
    },
  },
  
  // ============================================
  // AUTHORS
  // ============================================
  authors: {
    redactie: {
      name: "nuchter.ai Redactie",
      handle: "@nuchterai",
      bio: "Nuchter over AI — trends, tools en routes.",
    },
  },
  
  // ============================================
  // FOOTER CONTENT
  // ============================================
  footer: {
    madeBy: {
      name: "bocxx.io",
      url: "https://bocxx.io",
    },
    disclaimer: "Nuchter over AI — geen hype, wel duidelijke keuzes.",
  },
  
  // ============================================
  // LOCALE & I18N
  // ============================================
  defaultLocale: "nl",
  supportedLocales: ["nl"],
  
  // ============================================
  // FEATURES
  // ============================================
  features: {
    newsletter: false,
    search: false,
    comments: false,
    analytics: false,
  },
} as const;

// ============================================
// TYPE EXPORTS
// ============================================
export type SiteConfig = typeof siteConfig;
export type NavItem = typeof siteConfig.navigation.main[number];
export type FooterNavSection = keyof typeof siteConfig.navigation.footer;
export type SocialPlatform = keyof typeof siteConfig.social;
export type AuthorKey = keyof typeof siteConfig.authors;
