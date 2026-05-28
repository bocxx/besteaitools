/**
 * Derive useCaseBuckets from existing tool fields.
 *
 * Zero of the 110 tool JSONs currently populate `useCaseBuckets`, which
 * collapses jobFit to a neutral 50 for every candidate and lets unrelated
 * tools (e.g. GitHub Copilot) win on marketing-shaped profiles. Until the
 * data is back-filled editorially, derive buckets at load time from
 * `category` + `businessFunctions` + a strict keyword scan over the
 * Dutch free-text fields (jobs, useCases, keyFeatures, tags).
 */

import type { UseCaseBucketKey } from '../taxonomies';

interface DerivableTool {
  category?: string;
  businessFunctions?: readonly string[];
  primaryJobsToBeDone?: readonly string[];
  useCases?: readonly string[];
  keyFeatures?: readonly { title?: string; description?: string }[];
  tags?: readonly string[];
  shortDescription?: string;
  name?: string;
}

// ─── Category → buckets (high precision) ────────────────────────
const CATEGORY_BUCKETS: Record<string, UseCaseBucketKey[]> = {
  coding: ['code_web'],
  infrastructure: ['code_web'],
  design: ['images'],
  image: ['images'],
  audio: ['meetings'],
  search: ['data_analysis', 'customer_info'],
  // chatbots / productivity / automation / video → too generic; rely on
  // businessFunctions + keywords for those.
};

/**
 * Categories where the tool is so specialised that bf-derived buckets
 * become noise (e.g. an image generator tagged `bf=marketing` should NOT
 * claim `writing` just because marketing teams use it). For these, we
 * skip the businessFunctions expansion and only allow the category
 * mapping + strict keyword scan. This is what stops Fireflies (meetings)
 * and DALL-E (images) from inheriting six unrelated buckets.
 */
const NARROW_CATEGORIES = new Set(['coding', 'image', 'audio', 'video', 'design', 'infrastructure']);

/**
 * Buckets that, when matched purely from keyword evidence, indicate the
 * tool has a specific specialty. Once detected, the bucket set is
 * pruned to only specialty-buckets — e.g. Fireflies' "transcribe /
 * vergader" matches imply it's a meetings tool, so the bf=sales/
 * marketing tags don't get to add five unrelated buckets on top.
 */
const SPECIALTY_BUCKETS = new Set<UseCaseBucketKey>(['meetings', 'admin_finance', 'scheduling']);

// ─── Business function → buckets (high precision) ───────────────
const FUNCTION_BUCKETS: Record<string, UseCaseBucketKey[]> = {
  development: ['code_web'],
  marketing: ['social_content', 'writing', 'images'],
  sales: ['customer_mail', 'customer_info', 'writing'],
  klantenservice: ['customer_mail', 'customer_info'],
  data: ['data_analysis'],
  finance: ['admin_finance'],
  hr: ['customer_info', 'writing'],
  legal: ['writing'],
  // operations is too broad to derive anything reliable.
};

// ─── Strict keyword scan (low false-positive risk) ──────────────
// Patterns are matched against lowercased free-text concatenation.
// Order matters only for documentation — we union all hits.
const KEYWORD_PATTERNS: Record<UseCaseBucketKey, RegExp[]> = {
  social_content: [
    /\bsocial(\s|-)?(media|post|content)/,
    /\b(linkedin|instagram|tiktok|twitter|facebook)\b/,
    /\b(tweet|tweets|caption|hashtag)/,
  ],
  customer_mail: [
    /\bemail\s+(beantwoord|reply|template)/,
    /\bmail(s)?\s+(beantwoord|sortere|sorter|prioriteer)/,
    /\binbox(\s+(sortere|sorter|prioriteer|opschoon))?/,
    /\b(klant|leden)mail/,
    /\b(klant|leden)?vragen\s+(automatisch\s+)?beantwoord/,
  ],
  writing: [
    /\bblog(\s|-)?(post|artikel|schrijv)/,
    /\bnieuwsbrief/,
    /\bnewsletter/,
    /\b(tekst|copy|artikel)en?\s+vertal/,
    /\bvertal(ing|en)\s+(van|naar)\s+(tekst|copy|artikel|content)/,
    /\b(copy|tekst|content)(\s|-)?(schrijv|writing)/,
    /\bcopywriting/,
    /\b(artikel|tekst|copy)en?\s+(schrijv|opstell|redigeer|corrigeer|herschrijv)/,
    /\b(copy|tekst)\s+(vertal|herschrijv|redigeer)/,
    /\bproofread/,
    /\b(offerte|voorstel)s?\s+(schrijv|opstell|maken)/,
    /\b(samenvatting|samenvatten)\s+(maken|genereer|van\s+(een\s+)?(document|artikel|tekst|pagina))/,
    /\bdocument(en)?\s+samenvat/,
    /\bseo(\s|-)?artikel/,
    /\bwebsite(\s|-)?(tekst|copy|content)/,
    /\b(content|copy)\s+(genereer|generation|maken|schrijv)/,
  ],
  images: [
    /\bafbeelding(en)?\s+(genereer|maken|bewerken)/,
    /\bimage\s+(generation|edit|creat)/,
    /\b(logo|poster|flyer|banner|mockup|huisstijl|illustrat)/,
    // "visuals"/"graphics" only as standalone plural — avoids matching
    // "Visual Studio" or "graphic interface".
    /\b(visuals|graphics|visuele\s+content|visuele\s+materiaal)\b/,
    /\b(foto|photo)\s+(bewerk|edit|generat)/,
    /\bbackground\s+remov/,
    /\bachtergrond(en)?\s+weg/,
    /\b(inpainting|generative\s+fill)/,
    /\b(presentatie|presentation)s?\s+(maken|opmaak|generat|automatisch)/,
    /\bmarketing(\s|-)?(visual|materiaal|beeld)/,
    /\bbeeld(en)?\s+(genereer|maken|bewerken|uitbreid)/,
    /\bbeeldgenerator/,
    /\bproductvisualisat/,
    /\bconcept\s+art/,
  ],
  scheduling: [
    /\b(afspraak|afspraken)\s+(inplann|plann|maken)/,
    /\b(agenda|kalender|calendar)\s+(plann|beheer|invul)/,
    /\bmeeting(\s|-)?(scheduling|inplann|booking)/,
    /\b(reminder|herinnering)s?\s+(stur|sett)/,
    /\b(online\s+)?(boeking|booking)en?/,
  ],
  admin_finance: [
    /\bfacturat/,
    /\bfactuur|facturen/,
    /\bboekhoud/,
    /\binvoic(e|ing)/,
    /\bexpens(e|en)/,
    /\bbonnetjes?\s+(scan|verwerk)/,
    /\bdeclaratie/,
    /\b(btw|belasting)\s+(aangifte|administratie)/,
    /\b(financ|finance)\s+(rapport|administratie)/,
  ],
  meetings: [
    /\b(vergader|meeting)(\s|-)?(notul|transcrib|samenvat|recap)/,
    /\b(notul|minuten)\s+(maken|genereer|samenvat)/,
    /\b(transcrib|transcript|transcriptie)/,
    /\b(spreker|speaker)s?\s+identificeer/,
    /\bactiepunten\s+(extraheer|halen)/,
  ],
  data_analysis: [
    /\b(dashboard|rapportage|rapport(en)?)\s+(maken|genereer|bouw)/,
    /\b(kpi|metric)s?\s+(track|monitor|rapporteer)/,
    /\b(business\s+intelligence|bi(\s|-)?tool)/,
    /\bdata\s+(analy|opschon|verrijk|cleansing)/,
    /\b(desk\s+research|marktanalyse|onderzoek)\b/,
    /\binzichten?\s+(uit|halen|generen)/,
    /\b(semantisch|semantic)\s+zoek/,
  ],
  customer_info: [
    /\bcrm/,
    /\b(klant|leden|member)(data|informatie|info|profiel)/,
    /\b(klanten|leden)\s+(zoek|opzoek|segment|verrijk)/,
    /\b(contact|prospect|lead)s?\s+(verrijk|enrich|segment)/,
    /\bledenadministratie/,
  ],
  code_web: [
    /\bcode\s+(schrijv|complet|genereer|review|refactor|debug|snippet)/,
    /\bcodebase/,
    /\b(github|gitlab|bitbucket)\b/,
    // "ide" was previously matched inside "geïntegreerd" due to a JS-regex
    // word-boundary quirk around the "ï". Require an alphanumeric boundary
    // on both sides, or full IDE-vendor names.
    /(^|\s)(ide|jetbrains|vscode|neovim)(\s|$|[.,;:-])/,
    /\bvisual\s+studio/,
    /\b(programmeer|developer|software\s+engineer|coding|coder)/,
    /\b(api|sdk)\s+(integrat|bouw|gebruik|endpoint)/,
    /\b(refactor|debug|pull(\s|-)?request|merge\s+request)/,
    /\b(website|webapp|cms|wordpress)\s+(onderhoud|bouw|update|beheer)/,
    /\b(no(\s|-)?code|low(\s|-)?code)\s+(app|tool|builder|platform)/,
    /\bfull(\s|-)?stack/,
    /\bweb(\s|-)?app\s+(prototyp|bouw|maken)/,
  ],
};

/**
 * Derive use-case buckets for a tool from its existing fields.
 * Returns the unioned bucket set from category + businessFunctions +
 * keyword scan. Empty array if no signal was found.
 */
export function deriveUseCaseBuckets(tool: DerivableTool): UseCaseBucketKey[] {
  // ── 1. Keyword scan over combined free-text ──
  // Runs first so we can detect specialty signals before deciding
  // whether to apply the broader bf-expansion.
  const text = [
    tool.name ?? '',
    tool.shortDescription ?? '',
    ...(tool.primaryJobsToBeDone ?? []),
    ...(tool.useCases ?? []),
    ...(tool.tags ?? []),
    ...((tool.keyFeatures ?? []).flatMap((f) => [f.title ?? '', f.description ?? ''])),
  ].join('\n').toLowerCase();

  const keywordHits = new Set<UseCaseBucketKey>();
  if (text.trim().length > 0) {
    for (const [bucket, patterns] of Object.entries(KEYWORD_PATTERNS) as [
      UseCaseBucketKey,
      RegExp[],
    ][]) {
      if (patterns.some((p) => p.test(text))) keywordHits.add(bucket);
    }
  }

  // ── 2. Specialty short-circuit ──
  // If keyword evidence puts the tool in a narrow specialty (meetings,
  // admin_finance, scheduling), trust that signal: the bucket set is
  // just the specialty buckets. Prevents Fireflies (vergaderen + bf=
  // marketing) from claiming five unrelated buckets.
  const specialties = [...keywordHits].filter((b) => SPECIALTY_BUCKETS.has(b));
  if (specialties.length > 0) return specialties;

  // ── 3. Category mapping ──
  const out = new Set<UseCaseBucketKey>(keywordHits);
  if (tool.category && CATEGORY_BUCKETS[tool.category]) {
    for (const b of CATEGORY_BUCKETS[tool.category]) out.add(b);
  }

  // ── 4. Business functions ──
  // Skipped for narrow categories where the business-function tag is
  // incidental rather than core (e.g. a video tool tagged bf=marketing).
  const isNarrow = tool.category != null && NARROW_CATEGORIES.has(tool.category);
  if (!isNarrow) {
    for (const fn of tool.businessFunctions ?? []) {
      const buckets = FUNCTION_BUCKETS[fn];
      if (buckets) for (const b of buckets) out.add(b);
    }
  }

  return [...out];
}
