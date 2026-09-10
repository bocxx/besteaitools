import { z } from 'astro/zod';

export const nieuwsCategorySchema = z.enum([
  'lancering',    // New tool launches
  'update',       // Feature/pricing updates for existing tools
  'analyse',      // In-depth analysis
  'vergelijking', // Tool comparisons
  'gids',         // How-to guides
  'nieuws',       // General AI news
  // 'digest' is geen redactionele categorie maar een synthetic marker
  // voor dag-digest-entries die in /nieuws/ in dezelfde feed mee-getoond
  // worden (zie /nieuws/index.astro). Echte nieuws-frontmatter mag deze
  // waarde niet zetten — gebruik 'nieuws' of een specifieker label.
  'digest',       // Dag-digest (auto-generated)
]);

export type NieuwsCategory = z.infer<typeof nieuwsCategorySchema>;

export const nieuwsCategoryConfig: Record<NieuwsCategory, { label: string; color: string }> = {
  lancering:    { label: 'Lancering',    color: 'var(--primary-bright)' },
  update:       { label: 'Update',       color: 'var(--secondary-bright)' },
  analyse:      { label: 'Analyse',      color: 'var(--color-info)' },
  vergelijking: { label: 'Vergelijking', color: 'var(--color-warning)' },
  gids:         { label: 'Gids',         color: 'var(--color-success)' },
  nieuws:       { label: 'Nieuws',       color: 'var(--tertiary-bright)' },
  digest:       { label: 'Dag-digest',   color: 'var(--color-info)' },
};

// Het artikelschema van de `nieuws`-collectie. Stond tot 10 sep 2026 inline in
// content.config.ts; hier gelicht zodat scripts/verify-content-schema.mjs
// dezelfde definitie kan valideren als de build. Zonder die gedeelde bron zou
// het verify-script een kopie zijn die na de eerste schemawijziging afdrijft.
//
// content.config.ts importeert dit en voegt alleen de loader toe.
export const nieuwsArtikelSchema = z.object({
  title: z.string(),
  description: z.string(),
  publishedAt: z.coerce.date(),
  updatedAt: z.coerce.date().optional(),
  author: z.string().default('Redactie'),
  category: nieuwsCategorySchema.default('nieuws'),
  tags: z.array(z.string()).default([]),
  toolSlug: z.string().optional(),
  featured: z.boolean().default(false),
  draft: z.boolean().default(false),
  heroImage: z.string().optional(),
  readingTime: z.number().optional(),
  keyTakeaways: z.array(z.string()).optional(),
  faq: z.array(z.object({
    q: z.string(),
    a: z.string(),
  })).optional(),
});
