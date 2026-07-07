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
  description: "Ontdek, vergelijk en leer werken met 110+ AI-tools — wat ze doen, hoe je ze gebruikt en wat ze kosten. Vind in seconden de beste tool voor jouw taak.",
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
    // Top nav gefocust op tool-finding. De homepage (/) is de router; de
    // volledige, filterbare catalogus staat op /tools — daar wijst "AI-tools"
    // naartoe. Radar-/buzz-oppervlakken (Ontdek, Modellen, Radar, Makers) zijn
    // uit de navigatie gehaald — die data voedt nu het aparte ainieuwsradar.nl.
    // De pagina's bestaan nog (ongelinkt) en builden door.
    main: [
      { label: "AI-tools", href: "/tools" },
      { label: "Top 10", href: "/top-10" },
      { label: "Gidsen", href: "/gids" },
      { label: "Vergelijk", href: "/vergelijk" },
      { label: "Leren", href: "/leren" },
      { label: "Nieuws", href: "/nieuws" },
    ],
    footer: {
      platform: [
        { label: "AI Tools", href: "/" },
        { label: "Top 10-lijsten", href: "/top-10" },
        { label: "Vergelijk", href: "/vergelijk" },
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
