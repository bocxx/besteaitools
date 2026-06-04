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
