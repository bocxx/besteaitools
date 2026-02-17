import { defineCollection, z } from 'astro:content';

/**
 * Dutch AI News Collection
 * Simplified schema for fast content creation
 */
const nieuws = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string(),
    description: z.string(),
    publishedAt: z.date(),
    updatedAt: z.date().optional(),
    author: z.string().default('Redactie'),
    category: z.enum([
      'ai-nieuws',
      'ai-tools', 
      'ai-innovatie',
      'ai-ethiek',
      'ai-tutorials',
      'ai-deep-dives',
    ]),
    tags: z.array(z.string()).default([]),
    featured: z.boolean().default(false),
    draft: z.boolean().default(false),
    heroImage: z.string().optional(),
    readingTime: z.number().optional(),
  }),
});

const blog = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string(),
    description: z.string(),
    date: z.date(),
    author: z.string(),
    authorHandle: z.string(),
    draft: z.boolean().default(false),
    tags: z.array(z.string()).default([]),
    image: z.string().optional(),
  }),
});

/**
 * Articles Collection
 * Comprehensive content schema optimized for SEO, engagement, and content management
 */
const articles = defineCollection({
  type: 'content',
  schema: z.object({
    // ============================================
    // CORE CONTENT
    // ============================================
    title: z.string().max(60),              // SEO: Keep under 60 chars
    subtitle: z.string().optional(),         // Secondary headline
    description: z.string().max(160),        // SEO: Meta description, under 160 chars
    excerpt: z.string().optional(),          // Custom excerpt for cards/previews
    
    // ============================================
    // DATES & VERSIONING
    // ============================================
    publishedAt: z.date(),                   // Original publish date
    updatedAt: z.date().optional(),          // Last significant update
    expiresAt: z.date().optional(),          // Content expiration (for time-sensitive posts)
    
    // ============================================
    // AUTHOR & ATTRIBUTION
    // ============================================
    author: z.object({
      name: z.string(),
      handle: z.string(),                    // Social handle (e.g., @username)
      avatar: z.string().optional(),         // Author avatar URL
      bio: z.string().optional(),            // Short author bio
      url: z.string().url().optional(),      // Author website/profile
    }),
    contributors: z.array(z.object({         // Co-authors or contributors
      name: z.string(),
      handle: z.string().optional(),
      role: z.string().optional(),           // e.g., "Editor", "Researcher"
    })).default([]),
    
    // ============================================
    // CATEGORIZATION & TAXONOMY
    // ============================================
    category: z.enum([
      'news',           // Breaking AI news and industry updates
      'tutorials',      // Step-by-step learning content
      'guides',         // Comprehensive how-to guides
      'reviews',        // Tool and product reviews
      'case-studies',   // Real-world implementations
      'comparisons',    // Head-to-head comparisons
      'opinion',        // Analysis and editorials
      'announcements',  // Product releases and updates
      'deep-dives',     // Research and technical deep dives
      'interviews',     // Industry interviews
    ]),
    tags: z.array(z.string()).default([]),
    series: z.object({                       // For multi-part content
      name: z.string(),
      part: z.number(),
      total: z.number().optional(),
    }).optional(),
    
    // ============================================
    // MEDIA & VISUALS
    // ============================================
    heroImage: z.object({
      src: z.string(),
      alt: z.string(),                       // Required for accessibility
      caption: z.string().optional(),
      credit: z.string().optional(),         // Photographer/source attribution
    }).optional(),
    thumbnail: z.string().optional(),        // Smaller image for cards
    gallery: z.array(z.object({              // Image gallery
      src: z.string(),
      alt: z.string(),
      caption: z.string().optional(),
    })).default([]),
    video: z.object({                        // Featured video
      url: z.string().url(),
      platform: z.enum(['youtube', 'vimeo', 'native']).default('youtube'),
      duration: z.string().optional(),       // e.g., "12:34"
    }).optional(),
    
    // ============================================
    // CONTENT METRICS & READING
    // ============================================
    readingTime: z.number().optional(),      // Minutes (can be auto-calculated)
    wordCount: z.number().optional(),        // Can be auto-calculated
    difficulty: z.enum(['beginner', 'intermediate', 'advanced']).default('intermediate'),
    
    // ============================================
    // FEATURE FLAGS & DISPLAY
    // ============================================
    featured: z.boolean().default(false),    // Featured on homepage
    pinned: z.boolean().default(false),      // Pinned to top of listings
    spotlight: z.boolean().default(false),   // Extra prominent display
    showToc: z.boolean().default(true),      // Show table of contents
    showAuthor: z.boolean().default(true),   // Show author box
    showRelated: z.boolean().default(true),  // Show related articles
    showComments: z.boolean().default(true), // Enable comments
    
    // ============================================
    // SEO & META
    // ============================================
    seo: z.object({
      metaTitle: z.string().max(60).optional(),      // Override title for SEO
      metaDescription: z.string().max(160).optional(), // Override description
      canonical: z.string().url().optional(),         // Canonical URL if republished
      noindex: z.boolean().default(false),            // Exclude from search
      nofollow: z.boolean().default(false),           // Don't follow links
      keywords: z.array(z.string()).default([]),      // Focus keywords
      focusKeyword: z.string().optional(),            // Primary target keyword
    }).default({}),
    
    // ============================================
    // SOCIAL & SHARING
    // ============================================
    social: z.object({
      ogImage: z.string().optional(),                 // Open Graph image (1200x630)
      ogTitle: z.string().optional(),                 // Override OG title
      ogDescription: z.string().optional(),           // Override OG description
      twitterCard: z.enum(['summary', 'summary_large_image']).default('summary_large_image'),
      twitterCreator: z.string().optional(),          // Tweet author handle
      hideFromFeed: z.boolean().default(false),       // Don't show in RSS/feeds
    }).default({}),
    
    // ============================================
    // SCHEMA.ORG STRUCTURED DATA
    // ============================================
    schema: z.object({
      type: z.enum([
        'Article',
        'NewsArticle', 
        'BlogPosting',
        'TechArticle',
        'HowTo',
        'Review',
        'FAQPage',
      ]).default('Article'),
      speakable: z.boolean().default(false),          // Mark as speakable for voice
      isAccessibleForFree: z.boolean().default(true),
      hasPart: z.array(z.string()).default([]),       // Related content IDs
    }).default({}),
    
    // ============================================
    // ENGAGEMENT & ANALYTICS
    // ============================================
    engagement: z.object({
      priority: z.number().min(1).max(10).default(5), // Content priority score
      trending: z.boolean().default(false),           // Currently trending
      evergreen: z.boolean().default(false),          // Timeless content
      sponsored: z.boolean().default(false),          // Sponsored/paid content
      affiliate: z.boolean().default(false),          // Contains affiliate links
    }).default({}),
    
    // ============================================
    // RELATED & CROSS-LINKING
    // ============================================
    related: z.array(z.string()).default([]),         // Related article slugs
    prerequisites: z.array(z.string()).default([]),   // Required reading
    nextSteps: z.array(z.string()).default([]),       // Suggested next articles
    externalResources: z.array(z.object({
      title: z.string(),
      url: z.string().url(),
      type: z.enum(['docs', 'tool', 'video', 'article', 'repo']).optional(),
    })).default([]),
    
    // ============================================
    // WORKFLOW & STATUS
    // ============================================
    status: z.enum(['draft', 'review', 'scheduled', 'published', 'archived']).default('draft'),
    draft: z.boolean().default(false),                // Quick draft toggle
    
    // ============================================
    // LOCALIZATION
    // ============================================
    locale: z.string().default('en'),                 // Content language
    translations: z.record(z.string()).default({}),   // { 'es': 'slug-es', 'fr': 'slug-fr' }
  }),
});

export const collections = { blog, articles, nieuws };
