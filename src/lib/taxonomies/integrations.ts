/**
 * Integrations Taxonomy — controlled vocabulary
 *
 * Replaces the free-text `integrations` array in tool JSONs for matching.
 * Existing free-text `integrations` stays for display; this adds a
 * controlled `controlledIntegrations` field for filter logic.
 *
 * Source: DEBESTEAITOOLS_MATCHING_PLAN.md §5a, §4 Laag-4.
 */

import { z } from 'astro/zod';

export const integrations = {
  // Dutch accounting / ERP
  exact: { label: 'Exact Online', category: 'accounting_nl' },
  afas: { label: 'AFAS', category: 'accounting_nl' },
  twinfield: { label: 'Twinfield', category: 'accounting_nl' },
  moneybird: { label: 'Moneybird', category: 'accounting_nl' },
  snelstart: { label: 'SnelStart', category: 'accounting_nl' },
  visma: { label: 'Visma', category: 'accounting_nl' },
  yuki: { label: 'Yuki', category: 'accounting_nl' },

  // Office suites
  microsoft_365: { label: 'Microsoft 365', category: 'office' },
  google_workspace: { label: 'Google Workspace', category: 'office' },
  outlook: { label: 'Outlook', category: 'office' },
  gmail: { label: 'Gmail', category: 'office' },
  teams: { label: 'Microsoft Teams', category: 'office' },

  // Collaboration
  slack: { label: 'Slack', category: 'collab' },
  notion: { label: 'Notion', category: 'collab' },
  confluence: { label: 'Confluence', category: 'collab' },
  sharepoint: { label: 'SharePoint', category: 'collab' },
  dropbox: { label: 'Dropbox', category: 'collab' },
  onedrive: { label: 'OneDrive', category: 'collab' },
  google_drive: { label: 'Google Drive', category: 'collab' },
  box: { label: 'Box', category: 'collab' },

  // CRM / sales
  hubspot: { label: 'HubSpot', category: 'crm' },
  salesforce: { label: 'Salesforce', category: 'crm' },
  pipedrive: { label: 'Pipedrive', category: 'crm' },
  teamleader: { label: 'Teamleader', category: 'crm' },

  // Marketing / email
  mailchimp: { label: 'Mailchimp', category: 'marketing' },
  convertkit: { label: 'ConvertKit / Kit', category: 'marketing' },
  mailerlite: { label: 'MailerLite', category: 'marketing' },
  laposta: { label: 'Laposta', category: 'marketing' },
  spotler: { label: 'Spotler', category: 'marketing' },
  klaviyo: { label: 'Klaviyo', category: 'marketing' },

  // Automation
  zapier: { label: 'Zapier', category: 'automation' },
  make: { label: 'Make (Integromat)', category: 'automation' },
  n8n: { label: 'n8n', category: 'automation' },

  // Calendar & scheduling
  google_calendar: { label: 'Google Calendar', category: 'scheduling' },
  outlook_calendar: { label: 'Outlook Calendar', category: 'scheduling' },
  calendly: { label: 'Calendly', category: 'scheduling' },

  // Social
  linkedin: { label: 'LinkedIn', category: 'social' },
  meta_business: { label: 'Meta Business (FB/IG)', category: 'social' },
  buffer: { label: 'Buffer', category: 'social' },
  hootsuite: { label: 'Hootsuite', category: 'social' },

  // Dev
  github: { label: 'GitHub', category: 'dev' },
  gitlab: { label: 'GitLab', category: 'dev' },
  vscode: { label: 'VS Code', category: 'dev' },
  jetbrains: { label: 'JetBrains IDE\'s', category: 'dev' },

  // Membership / vereniging
  conscribo: { label: 'Conscribo', category: 'membership_nl' },
  e_captain: { label: 'e-Captain', category: 'membership_nl' },
  sportlink: { label: 'Sportlink', category: 'membership_nl' },
  allunited: { label: 'AllUnited', category: 'membership_nl' },

  // Video / meetings
  zoom: { label: 'Zoom', category: 'video' },
  google_meet: { label: 'Google Meet', category: 'video' },

  // Support / ticketing
  zendesk: { label: 'Zendesk', category: 'support' },
  intercom: { label: 'Intercom', category: 'support' },
  freshdesk: { label: 'Freshdesk', category: 'support' },

  // Generic API
  rest_api: { label: 'REST API', category: 'api' },
  webhook: { label: 'Webhooks', category: 'api' },
} as const;

export type IntegrationKey = keyof typeof integrations;
export const integrationKeys = Object.keys(integrations) as [IntegrationKey, ...IntegrationKey[]];
export const integrationSchema = z.enum(integrationKeys);

export const integrationCategories = {
  accounting_nl: { label: 'NL boekhouding / ERP' },
  office: { label: 'Office suites' },
  collab: { label: 'Samenwerking' },
  crm: { label: 'CRM / Sales' },
  marketing: { label: 'Marketing / E-mail' },
  automation: { label: 'Automatisering' },
  scheduling: { label: 'Agenda & planning' },
  social: { label: 'Social media' },
  dev: { label: 'Development' },
  membership_nl: { label: 'NL ledenadmin' },
  video: { label: 'Video-bellen' },
  support: { label: 'Support / ticketing' },
  api: { label: 'Generieke API' },
} as const;

export type IntegrationCategoryKey = keyof typeof integrationCategories;

/**
 * Map a free-text integration string to a controlled key, if possible.
 * Used by migration scripts; returns undefined for unrecognised strings.
 */
export function normaliseIntegration(raw: string): IntegrationKey | undefined {
  const s = raw.trim().toLowerCase();
  const map: Record<string, IntegrationKey> = {
    'exact': 'exact', 'exact online': 'exact',
    'afas': 'afas',
    'twinfield': 'twinfield',
    'moneybird': 'moneybird',
    'snelstart': 'snelstart',
    'visma': 'visma',
    'yuki': 'yuki',
    'microsoft 365': 'microsoft_365', 'm365': 'microsoft_365', 'office 365': 'microsoft_365',
    'google workspace': 'google_workspace', 'gsuite': 'google_workspace', 'g suite': 'google_workspace',
    'outlook': 'outlook',
    'gmail': 'gmail',
    'microsoft teams': 'teams', 'teams': 'teams', 'ms teams': 'teams',
    'slack': 'slack',
    'notion': 'notion',
    'confluence': 'confluence',
    'sharepoint': 'sharepoint',
    'dropbox': 'dropbox',
    'onedrive': 'onedrive',
    'google drive': 'google_drive', 'gdrive': 'google_drive',
    'box': 'box',
    'hubspot': 'hubspot',
    'salesforce': 'salesforce',
    'pipedrive': 'pipedrive',
    'teamleader': 'teamleader',
    'mailchimp': 'mailchimp',
    'convertkit': 'convertkit', 'kit': 'convertkit',
    'mailerlite': 'mailerlite',
    'laposta': 'laposta',
    'spotler': 'spotler',
    'klaviyo': 'klaviyo',
    'zapier': 'zapier',
    'make': 'make', 'integromat': 'make', 'make.com': 'make',
    'n8n': 'n8n',
    'google calendar': 'google_calendar',
    'outlook calendar': 'outlook_calendar',
    'calendly': 'calendly',
    'linkedin': 'linkedin',
    'meta business': 'meta_business', 'facebook': 'meta_business', 'instagram': 'meta_business',
    'buffer': 'buffer',
    'hootsuite': 'hootsuite',
    'github': 'github',
    'gitlab': 'gitlab',
    'vs code': 'vscode', 'vscode': 'vscode', 'visual studio code': 'vscode',
    'jetbrains': 'jetbrains',
    'conscribo': 'conscribo',
    'e-captain': 'e_captain', 'ecaptain': 'e_captain',
    'sportlink': 'sportlink',
    'allunited': 'allunited',
    'zoom': 'zoom',
    'google meet': 'google_meet', 'meet': 'google_meet',
    'zendesk': 'zendesk',
    'intercom': 'intercom',
    'freshdesk': 'freshdesk',
    'rest api': 'rest_api', 'api': 'rest_api',
    'webhook': 'webhook', 'webhooks': 'webhook',
  };
  return map[s];
}
