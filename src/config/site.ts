/**
 * Central site configuration
 * 
 * This file contains all site-wide settings, metadata, and navigation structure.
 * Update here once to change across the entire site.
 */

export const siteConfig = {
  // ============================================
  // SITE IDENTITY
  // ============================================
  name: "ClawsHub",
  tagline: "Your AI Assistant",
  description: "Personal AI that lives in your chat apps. Built by the community, for the community.",
  url: "https://clawd.bot",
  
  // ============================================
  // BRANDING
  // ============================================
  logo: {
    image: "/logo.png",
    text: "ClawsHub",
  },
  
  // ============================================
  // NAVIGATION
  // ============================================
  navigation: {
    main: [
      { label: "Blog", href: "/blog" },
      { label: "Showcase", href: "/showcase" },
      { label: "Shoutouts", href: "/shoutouts" },
      { label: "Integrations", href: "/integrations" },
    ],
    footer: {
      explore: [
        { label: "Blog", href: "/blog" },
        { label: "Showcase", href: "/showcase" },
        { label: "Shoutouts", href: "/shoutouts" },
        { label: "Integrations", href: "/integrations" },
      ],
      resources: [
        { label: "GitHub", href: "https://github.com/openclaw/openclaw", external: true },
        { label: "Community", href: "https://github.com/openclaw/openclaw#community", external: true },
        { label: "Soul", href: "https://soul.md", external: true },
      ],
      connect: [
        { label: "Molty 🦞", href: "https://molty.me", external: true },
        { label: "Peter Steinberger", href: "https://steipete.me", external: true },
      ],
    },
  },
  
  // ============================================
  // SOCIAL LINKS
  // ============================================
  social: {
    github: {
      url: "https://github.com/openclaw/openclaw",
      label: "GitHub",
    },
  },
  
  // ============================================
  // AUTHORS
  // ============================================
  authors: {
    molty: {
      name: "Molty",
      handle: "@molty",
      url: "https://molty.me",
      bio: "A space lobster AI with a soul",
    },
    steipete: {
      name: "Peter Steinberger",
      handle: "@steipete",
      url: "https://steipete.me",
      bio: "Creator of OpenClaw",
    },
    redactie: {
      name: "Redactie",
      handle: "@clawshub",
      bio: "ClawsHub editorial team",
    },
  },
  
  // ============================================
  // FOOTER CONTENT
  // ============================================
  footer: {
    credits: {
      builtBy: "Molty",
      builtByUrl: "https://molty.me",
      builtByDescription: "a space lobster AI with a",
      soulUrl: "https://soul.md",
      creatorName: "Peter Steinberger",
      creatorUrl: "https://steipete.me",
      communityUrl: "https://github.com/openclaw/openclaw#community",
    },
    disclaimer: "Formerly known as Clawdbot and Moltbot. Independent project, not affiliated with Anthropic.",
  },
  
  // ============================================
  // LOCALE & I18N
  // ============================================
  defaultLocale: "en",
  supportedLocales: ["en", "nl"],
  
  // ============================================
  // FEATURES
  // ============================================
  features: {
    newsletter: true,
    search: false, // Future feature
    comments: false, // Future feature
    analytics: false, // Future feature
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
