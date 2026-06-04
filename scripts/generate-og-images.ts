/**
 * scripts/generate-og-images.ts
 *
 * Generates static Open Graph images for every tool and writes them to
 * public/og/[slug].png. Run this before `astro build` so the images are
 * picked up as regular static assets:
 *
 *   npm run generate-og   (or automatically via the build script)
 *
 * Design: Ember theme – dark background, amber left accent bar, category
 * badge, tool name (Space Grotesk Bold), description, stats footer row.
 */

import satori, { type Font } from 'satori';
import { Resvg } from '@resvg/resvg-js';
import { createElement as h } from 'react';
import {
  readFileSync,
  writeFileSync,
  mkdirSync,
  readdirSync,
  existsSync,
} from 'node:fs';
import { resolve, join, basename } from 'node:path';

// ── Paths ─────────────────────────────────────────────────────────────────────
const ROOT         = resolve(process.cwd());
const CONTENT_DIR  = join(ROOT, 'src/content/tools');
const RADAR_PATH   = join(ROOT, 'src/data/reports/ai_tools_radar.json');
const FONT_INTER_REG  = join(ROOT, 'src/assets/fonts/inter-regular.ttf');
const FONT_INTER_SB   = join(ROOT, 'src/assets/fonts/inter-semibold.ttf');
const FONT_INTER_BOLD = join(ROOT, 'src/assets/fonts/inter-bold.ttf');
const FONT_SG         = join(ROOT, 'src/assets/fonts/space-grotesk-bold.ttf');
const OUTPUT_DIR   = join(ROOT, 'public/og');

// ── Ember theme (oklch → hex approximations) ──────────────────────────────────
const C = {
  bg:          '#100e0c',
  primary:     '#d49126',
  textPrimary: '#f4f3f9',
  textSec:     '#a8a6bc',
  textMuted:   '#706d80',
  border:      'rgba(255,255,255,0.09)',
} as const;

const CAT_HEX: Record<string, string> = {
  chatbots:       '#d49126',
  coding:         '#c8572a',
  automation:     '#44c490',
  image:          '#e8cc2c',
  video:          '#a87ed4',
  audio:          '#df4d2c',
  search:         '#5ab0d8',
  productivity:   '#b07820',
  infrastructure: '#a84028',
  design:         '#f0abfc',
};

const PRICING_LABEL: Record<string, string> = {
  free:       'Gratis',
  freemium:   'Freemium',
  paid:       'Betaald',
  enterprise: 'Enterprise',
};

const CAT_LABEL: Record<string, string> = {
  chatbots:       'Chatbots',
  coding:         'Coding',
  automation:     'Automatisering',
  image:          'Beeld',
  video:          'Video',
  audio:          'Audio',
  search:         'Zoeken',
  productivity:   'Productiviteit',
  infrastructure: 'Infrastructuur',
  design:         'Design',
};

// ── Helpers ────────────────────────────────────────────────────────────────────
function trunc(str: string, max: number): string {
  return str.length > max ? str.slice(0, max - 1) + '…' : str;
}

function alpha(hex: string, pct: number): string {
  const byte = Math.round((pct / 100) * 255).toString(16).padStart(2, '0');
  return hex + byte;
}

function loadFont(path: string): ArrayBuffer {
  const buf = readFileSync(path);
  return buf.buffer.slice(buf.byteOffset, buf.byteOffset + buf.byteLength) as ArrayBuffer;
}

// ── Build element tree for one tool ───────────────────────────────────────────
function buildElement(tool: {
  name: string;
  shortDescription: string;
  category: string;
  pricingModel: string;
  buzzscore: string | null;
}) {
  const catColor = CAT_HEX[tool.category] ?? C.primary;
  const name     = trunc(tool.name, 42);
  const desc     = trunc(tool.shortDescription, 120);
  const nameFontSize = name.length > 28 ? 54 : name.length > 20 ? 62 : 70;
  const catLabel  = CAT_LABEL[tool.category] ?? tool.category;
  const priceLabel = PRICING_LABEL[tool.pricingModel] ?? tool.pricingModel;

  return h('div', {
    style: {
      width: '1200px', height: '630px',
      display: 'flex', backgroundColor: C.bg,
      fontFamily: '"Inter"', position: 'relative', overflow: 'hidden',
    },
  },
    // Radial glow
    h('div', { style: {
      position: 'absolute', top: '-120px', right: '-120px',
      width: '480px', height: '480px', borderRadius: '50%',
      background: `radial-gradient(circle, ${alpha(catColor, 12)} 0%, transparent 70%)`,
    }}),
    // Left accent bar
    h('div', { style: {
      position: 'absolute', top: '0', left: '0', width: '6px', height: '630px',
      background: `linear-gradient(to bottom, ${C.primary}, ${catColor})`,
    }}),
    // Content column
    h('div', {
      style: {
        display: 'flex', flexDirection: 'column',
        padding: '56px 72px 48px 88px', width: '1200px', height: '630px',
      },
    },
      // Top row: site label + category badge
      h('div', { style: {
        display: 'flex', flexDirection: 'row',
        justifyContent: 'space-between', alignItems: 'center', marginBottom: '36px',
      }},
        h('div', { style: { color: C.primary, fontSize: '17px', fontWeight: '600', letterSpacing: '0.02em', fontFamily: '"Inter"' } },
          'debesteaitools.nl'),
        h('div', { style: {
          display: 'flex', alignItems: 'center',
          backgroundColor: alpha(catColor, 18), border: `1.5px solid ${alpha(catColor, 50)}`,
          borderRadius: '999px', padding: '7px 20px',
          color: catColor, fontSize: '14px', fontWeight: '700',
          letterSpacing: '0.07em', textTransform: 'uppercase', fontFamily: '"Inter"',
        }}, catLabel),
      ),
      // Tool name
      h('div', { style: {
        color: C.textPrimary, fontSize: `${nameFontSize}px`, fontWeight: '700',
        letterSpacing: '-0.02em', lineHeight: '1.1', marginBottom: '18px',
        fontFamily: '"Space Grotesk"',
      }}, name),
      // Description
      h('div', { style: {
        color: C.textSec, fontSize: '22px', fontWeight: '400',
        lineHeight: '1.55', flex: '1', fontFamily: '"Inter"',
      }}, desc),
      // Bottom: divider + stats row
      h('div', { style: { display: 'flex', flexDirection: 'column' }},
        h('div', { style: { height: '1px', backgroundColor: C.border, marginBottom: '20px' }}),
        h('div', { style: {
          display: 'flex', flexDirection: 'row',
          justifyContent: 'space-between', alignItems: 'center',
        }},
          h('div', { style: { color: C.textMuted, fontSize: '15px', fontFamily: '"Inter"' }},
            'AI Tools Radar · Nederland'),
          h('div', { style: { display: 'flex', flexDirection: 'row', alignItems: 'center', gap: '10px' }},
            h('div', { style: {
              color: C.textMuted, fontSize: '14px',
              border: `1px solid ${C.border}`, borderRadius: '999px', padding: '4px 14px', fontFamily: '"Inter"',
            }}, priceLabel),
            ...(tool.buzzscore ? [
              h('div', { style: { display: 'flex', flexDirection: 'row', alignItems: 'center', gap: '6px' }},
                h('div', { style: { color: C.textMuted, fontSize: '14px', fontFamily: '"Inter"' }}, 'Buzz'),
                h('div', { style: {
                  backgroundColor: C.primary, color: C.bg, fontWeight: '700',
                  fontSize: '14px', padding: '4px 13px', borderRadius: '999px', fontFamily: '"Inter"',
                }}, tool.buzzscore),
              ),
            ] : []),
          ),
        ),
      ),
    ),
  );
}

// ── Feature/hub-pagina kaarten ─────────────────────────────────────────────────
// De tool-detailpagina's krijgen elk een eigen kaart (buildElement). De
// feature- en hub-pagina's (modellen, doorbraak, makers, leren, ontdek, …)
// vielen terug op de site-wide /og-image.webp — WebP wordt door LinkedIn niet
// als og:image geaccepteerd. Hier een merkgebonden PNG-kaart per pagina, in
// dezelfde Ember-stijl als de tool-kaarten.
interface FeaturePage {
  key: string;       // → public/og/page-<key>.png  (of 'home' → og-image.png)
  eyebrow: string;
  title: string;
  subtitle: string;
  accent?: string;   // optioneel afwijkend accent (anders C.primary)
}

const FEATURE_PAGES: FeaturePage[] = [
  { key: 'home',      eyebrow: 'AI Tools Radar',  title: 'De beste AI-tools, objectief gerankt', subtitle: 'Welke AI-tools groeien nú? Gevolgd op buzz, groei en mentions — zonder hype.' },
  { key: 'ontdek',    eyebrow: 'Ontdek',          title: 'Ontdek de AI-radar',                   subtitle: 'Tools, modellen, de doorbraak-funnel en de makers erachter — dagelijks bijgewerkt.', accent: '#5ab0d8' },
  { key: 'modellen',  eyebrow: 'Modellen',        title: 'Trending AI-modellen',                 subtitle: 'Welke open modellen zitten nú in de lift — gerangschikt op momentum.', accent: '#a87ed4' },
  { key: 'doorbraak', eyebrow: 'Doorbraak-radar', title: 'Wat staat op punt te breken',          subtitle: 'Tools die dev en onderzoek al oppakt — vóór de pers volgt.', accent: '#df4d2c' },
  { key: 'makers',    eyebrow: 'Makers',          title: 'Wie bouwt de trending AI',             subtitle: 'De mensen & organisaties achter de tools die nu stijgen.', accent: '#44c490' },
  { key: 'leren',     eyebrow: 'Leren',           title: 'Leer AI-tools — de beste bronnen',     subtitle: 'Gecureerde GitHub-repos, hands-on guides en video’s.', accent: '#e8cc2c' },
  { key: 'vergelijk', eyebrow: 'Vergelijk',       title: 'Vergelijk AI-tools',                   subtitle: 'Side-by-side op buzz, groei en functies.', accent: '#5ab0d8' },
  { key: 'functies',  eyebrow: 'Per functie',     title: 'AI-tools per bedrijfsfunctie',         subtitle: 'Van marketing tot legal — de beste tools voor jouw werk.', accent: '#b07820' },
  { key: 'nieuws',    eyebrow: 'Nieuws',          title: 'AI-tools nieuws',                      subtitle: 'Nieuwe features, launches en tool-updates.' },
  { key: 'radar',     eyebrow: 'Radar',           title: 'AI Tools Radar',                       subtitle: 'Launches, wekelijkse rankings en de doorbraak-funnel.' },
];

function buildFeatureCard(page: FeaturePage) {
  const accent = page.accent ?? C.primary;
  const title = trunc(page.title, 48);
  const titleFontSize = title.length > 30 ? 64 : title.length > 22 ? 74 : 84;
  return h('div', {
    style: {
      width: '1200px', height: '630px',
      display: 'flex', backgroundColor: C.bg,
      fontFamily: '"Inter"', position: 'relative', overflow: 'hidden',
    },
  },
    // Radial glow (accent)
    h('div', { style: {
      position: 'absolute', top: '-150px', right: '-120px',
      width: '560px', height: '560px', borderRadius: '50%',
      background: `radial-gradient(circle, ${alpha(accent, 16)} 0%, transparent 70%)`,
    }}),
    // Left accent bar
    h('div', { style: {
      position: 'absolute', top: '0', left: '0', width: '8px', height: '630px',
      background: `linear-gradient(to bottom, ${C.primary}, ${accent})`,
    }}),
    // Content column
    h('div', {
      style: {
        display: 'flex', flexDirection: 'column', justifyContent: 'space-between',
        padding: '64px 80px 56px 96px', width: '1200px', height: '630px',
      },
    },
      // Top row: site label + eyebrow badge
      h('div', { style: {
        display: 'flex', flexDirection: 'row',
        justifyContent: 'space-between', alignItems: 'center',
      }},
        h('div', { style: { color: C.primary, fontSize: '18px', fontWeight: '600', letterSpacing: '0.02em', fontFamily: '"Inter"' } },
          'debesteaitools.nl'),
        h('div', { style: {
          display: 'flex', alignItems: 'center',
          backgroundColor: alpha(accent, 18), border: `1.5px solid ${alpha(accent, 50)}`,
          borderRadius: '999px', padding: '7px 20px',
          color: accent, fontSize: '14px', fontWeight: '700',
          letterSpacing: '0.07em', textTransform: 'uppercase', fontFamily: '"Inter"',
        }}, page.eyebrow),
      ),
      // Title + subtitle
      h('div', { style: { display: 'flex', flexDirection: 'column' }},
        h('div', { style: {
          color: C.textPrimary, fontSize: `${titleFontSize}px`, fontWeight: '700',
          letterSpacing: '-0.03em', lineHeight: '1.05', marginBottom: '24px',
          fontFamily: '"Space Grotesk"',
        }}, title),
        h('div', { style: {
          color: C.textSec, fontSize: '28px', fontWeight: '400',
          lineHeight: '1.45', fontFamily: '"Inter"', maxWidth: '900px',
        }}, page.subtitle),
      ),
      // Footer
      h('div', { style: { display: 'flex', flexDirection: 'column' }},
        h('div', { style: { height: '1px', backgroundColor: C.border, marginBottom: '20px' }}),
        h('div', { style: { color: C.textMuted, fontSize: '17px', fontFamily: '"Inter"' }},
          'AI Tools Radar · Nederland · dagelijks bijgewerkt'),
      ),
    ),
  );
}

// ── Main ───────────────────────────────────────────────────────────────────────
async function main() {
  console.log('🖼  Generating OG images…');

  // Load fonts
  const interReg  = loadFont(FONT_INTER_REG);
  const interSb   = loadFont(FONT_INTER_SB);
  const interBold = loadFont(FONT_INTER_BOLD);
  const sgBold    = loadFont(FONT_SG);
  const fonts: Font[] = [
    { name: 'Inter',         data: interReg,  style: 'normal', weight: 400 },
    { name: 'Inter',         data: interSb,   style: 'normal', weight: 600 },
    { name: 'Inter',         data: interBold, style: 'normal', weight: 700 },
    { name: 'Space Grotesk', data: sgBold,    style: 'normal', weight: 700 },
  ];

  // Load radar stats (slug → buzz_score)
  const buzzMap = new Map<string, number>();
  if (existsSync(RADAR_PATH)) {
    const radar = JSON.parse(readFileSync(RADAR_PATH, 'utf-8'));
    for (const t of (radar.tools ?? [])) {
      buzzMap.set(t.slug, t.buzz_score);
      // newsflux may use space-separated slugs
      buzzMap.set(t.slug.replace(/ /g, '-'), t.buzz_score);
    }
  }

  // Load content tool JSONs
  const files = readdirSync(CONTENT_DIR)
    .filter(f => f.endsWith('.json') && f !== 'AITools');

  mkdirSync(OUTPUT_DIR, { recursive: true });

  let generated = 0;
  for (const file of files) {
    const slug = basename(file, '.json');
    const content = JSON.parse(readFileSync(join(CONTENT_DIR, file), 'utf-8'));

    if (content.draft) continue;

    const buzzRaw = buzzMap.get(slug);
    const buzzscore = buzzRaw != null ? String(Math.round(buzzRaw)) : null;

    const element = buildElement({
      name:             content.name ?? slug,
      shortDescription: content.shortDescription ?? '',
      category:         content.category ?? 'chatbots',
      pricingModel:     content.pricingModel ?? 'freemium',
      buzzscore,
    });

    const svg = await satori(element, { width: 1200, height: 630, fonts });
    const png = new Resvg(svg, { fitTo: { mode: 'width', value: 1200 } })
      .render()
      .asPng();

    writeFileSync(join(OUTPUT_DIR, `${slug}.png`), png);
    generated++;
  }

  console.log(`✅  Generated ${generated} tool OG images → public/og/`);

  // ── Feature/hub-pagina kaarten ────────────────────────────────────────────
  let featureCount = 0;
  for (const page of FEATURE_PAGES) {
    const svg = await satori(buildFeatureCard(page), { width: 1200, height: 630, fonts });
    const png = new Resvg(svg, { fitTo: { mode: 'width', value: 1200 } }).render().asPng();
    if (page.key === 'home') {
      // Site-wide fallback — vervangt de WebP-default (LinkedIn-incompatibel).
      writeFileSync(join(ROOT, 'public/og-image.png'), png);
    } else {
      writeFileSync(join(OUTPUT_DIR, `page-${page.key}.png`), png);
    }
    featureCount++;
  }
  console.log(`✅  Generated ${featureCount} feature OG cards → public/og/page-*.png (+ og-image.png)`);
}

main().catch((err) => { console.error(err); process.exit(1); });
