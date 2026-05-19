/**
 * Jobs-to-be-Done Taxonomy — matching intake Laag 2
 *
 * Controlled vocabulary of concrete jobs users want to get done,
 * grouped into the 10 Laag-2 use-case categories.
 *
 * Source: DEBESTEAITOOLS_MATCHING_PLAN.md §3 (principle 1), §4 Laag-2.
 */

import { z } from 'astro/zod';

/** Top-level use-case buckets (Laag 2 multi-select options) */
export const useCaseBuckets = {
  social_content: { label: 'Social media content maken', icon: 'share-2' },
  customer_mail: { label: 'Klant-/ledenmails beantwoorden', icon: 'mail' },
  writing: { label: 'Teksten schrijven (blogs, nieuwsbrieven, website)', icon: 'pen-tool' },
  images: { label: 'Afbeeldingen of grafisch materiaal', icon: 'image' },
  scheduling: { label: 'Afspraken & agenda', icon: 'calendar' },
  admin_finance: { label: 'Administratie & facturatie', icon: 'calculator' },
  meetings: { label: 'Notulen & vergaderingen', icon: 'users' },
  data_analysis: { label: 'Data analyseren / rapporten', icon: 'bar-chart-2' },
  customer_info: { label: 'Klanten- of lidinformatie opzoeken', icon: 'search' },
  code_web: { label: 'Code / website onderhouden', icon: 'code' },
} as const;

export type UseCaseBucketKey = keyof typeof useCaseBuckets;
export const useCaseBucketKeys = Object.keys(useCaseBuckets) as [UseCaseBucketKey, ...UseCaseBucketKey[]];
export const useCaseBucketSchema = z.enum(useCaseBucketKeys);

/** Granular JTBDs mapped to their parent bucket (~40 total) */
export const jtbds = {
  // Social content
  'social-posts': { label: 'Social media posts genereren', bucket: 'social_content' },
  'social-calendar': { label: 'Content-kalender plannen', bucket: 'social_content' },
  'social-visuals': { label: 'Social visuals maken', bucket: 'social_content' },
  'social-captions': { label: 'Captions en hashtags schrijven', bucket: 'social_content' },

  // Customer mail
  'mail-reply': { label: 'Inkomende mails snel beantwoorden', bucket: 'customer_mail' },
  'mail-templates': { label: 'Standaard-antwoorden opbouwen', bucket: 'customer_mail' },
  'mail-inbox-sort': { label: 'Inbox sorteren / prioriteren', bucket: 'customer_mail' },

  // Writing
  'write-blog': { label: 'Blog- en SEO-artikelen schrijven', bucket: 'writing' },
  'write-newsletter': { label: 'Nieuwsbrieven opstellen', bucket: 'writing' },
  'write-website-copy': { label: 'Website-teksten verbeteren', bucket: 'writing' },
  'write-proposal': { label: 'Offertes en voorstellen schrijven', bucket: 'writing' },
  'write-translate': { label: 'Vertalen (NL ↔ EN/DE)', bucket: 'writing' },
  'write-proofread': { label: 'Teksten redigeren / corrigeren', bucket: 'writing' },

  // Images
  'image-generate': { label: 'Afbeeldingen genereren', bucket: 'images' },
  'image-edit': { label: 'Bestaande afbeeldingen bewerken', bucket: 'images' },
  'image-poster': { label: 'Posters en flyers maken', bucket: 'images' },
  'image-brand': { label: 'Huisstijl-consistente visuals', bucket: 'images' },

  // Scheduling
  'schedule-meetings': { label: 'Afspraken inplannen', bucket: 'scheduling' },
  'schedule-reminders': { label: 'Reminders / opvolging', bucket: 'scheduling' },
  'schedule-booking': { label: 'Online boekingen ontvangen', bucket: 'scheduling' },

  // Admin & finance
  'admin-invoicing': { label: 'Facturen opstellen', bucket: 'admin_finance' },
  'admin-bookkeeping': { label: 'Boekhouding bijhouden', bucket: 'admin_finance' },
  'admin-receipts': { label: 'Bonnetjes scannen / verwerken', bucket: 'admin_finance' },
  'admin-expenses': { label: 'Declaraties verwerken', bucket: 'admin_finance' },

  // Meetings
  'meet-transcribe': { label: 'Vergaderingen transcriberen', bucket: 'meetings' },
  'meet-summarize': { label: 'Notulen samenvatten', bucket: 'meetings' },
  'meet-actions': { label: 'Actiepunten extraheren', bucket: 'meetings' },

  // Data
  'data-report': { label: 'Rapporten / dashboards', bucket: 'data_analysis' },
  'data-clean': { label: 'Data opschonen / structureren', bucket: 'data_analysis' },
  'data-analyze': { label: 'Analyses uitvoeren op eigen data', bucket: 'data_analysis' },
  'data-research': { label: 'Desk research / marktanalyse', bucket: 'data_analysis' },

  // Customer info
  'crm-lookup': { label: 'Klant-/leden-info snel vinden', bucket: 'customer_info' },
  'crm-enrich': { label: 'Klantdata verrijken', bucket: 'customer_info' },
  'crm-segment': { label: 'Ledenlijsten segmenteren', bucket: 'customer_info' },

  // Code & web
  'code-autocomplete': { label: 'Code autocompletion', bucket: 'code_web' },
  'code-review': { label: 'Code review', bucket: 'code_web' },
  'web-maintain': { label: 'Website onderhouden / updaten', bucket: 'code_web' },
  'web-content': { label: 'Website-content beheren (CMS)', bucket: 'code_web' },
} as const;

export type JtbdKey = keyof typeof jtbds;
export const jtbdKeys = Object.keys(jtbds) as [JtbdKey, ...JtbdKey[]];
export const jtbdSchema = z.enum(jtbdKeys);

/** Vereniging-specific tijdslurpers (extra Laag-1-vraag) */
export const verenigingTimeSinks = {
  ledenadmin: { label: 'Ledenadministratie' },
  nieuwsbrief: { label: 'Nieuwsbrief' },
  social: { label: 'Social media' },
  notulen: { label: 'Notulen vergaderingen' },
  drukwerk: { label: 'Posters & drukwerk' },
  evenementen: { label: 'Evenementen organiseren' },
  website: { label: 'Website onderhouden' },
} as const;

export type VerenigingTimeSinkKey = keyof typeof verenigingTimeSinks;
export const verenigingTimeSinkKeys = Object.keys(verenigingTimeSinks) as [VerenigingTimeSinkKey, ...VerenigingTimeSinkKey[]];
export const verenigingTimeSinkSchema = z.enum(verenigingTimeSinkKeys);
