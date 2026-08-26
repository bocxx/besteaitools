/**
 * scripts/generate-social.mjs
 *
 * Genereert deelbare social-infographics per artikel, in de Ember-huisstijl:
 * donkere achtergrond (#100e0c), Space Grotesk Bold display, Inter body,
 * amber accent (#d49126), subtiele 1px-borders.
 *
 * Inhoud uit frontmatter (title, category, readingTime, description,
 * keyTakeaways). Eerste twee takeaways op de brede formaten.
 *
 * Output: social-infographics/<slug>-<formaat>.png in vijf formaten:
 *   - 1x1          (1080×1080) — LinkedIn / vierkant
 *   - 4x5          (1080×1350) — Instagram / feed
 *   - 9x16         (1080×1920) — Stories / Reels-cover
 *   - card-x       (1200×675)  — X/Twitter Card (16:9)
 *   - card-linkedin (1200×627)  — LinkedIn banner (1.91:1)
 *
 * Vereist: satori + @resvg/resvg-js (in devDependencies).
 *
 * Gebruik:
 *   node scripts/generate-social.mjs <slug>
 *   node scripts/generate-social.mjs <slug-a> <slug-b>
 *   node scripts/generate-social.mjs --all
 */

import satori from 'satori';
import { Resvg } from '@resvg/resvg-js';
import { readFileSync, writeFileSync, mkdirSync, readdirSync, existsSync } from 'node:fs';
import { resolve, join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = process.env.SOCIAL_ROOT || resolve(__dirname, '..');
const CONTENT_DIR = join(ROOT, 'src/content/nieuws');
const FONTS_DIR = join(ROOT, 'src/assets/fonts');
const OUT_DIR = join(ROOT, 'social-infographics');

// ── Ember-huisstijl-tokens ───────────────────────────────────────────────────
const C = {
  bg: '#100e0c',
  panel: 'rgba(255,255,255,0.04)',
  accent: '#d49126',
  tp: '#f4f3f9',   // text-primary
  ts: '#a8a6bc',   // text-secondary
  tm: '#706d80',   // text-muted
  border: 'rgba(255,255,255,0.09)',
};

const loadFont = (f) => readFileSync(join(FONTS_DIR, f));
const FONTS = [
  { name: 'Inter',         data: loadFont('inter-regular.ttf'),     weight: 400, style: 'normal' },
  { name: 'Inter',         data: loadFont('inter-semibold.ttf'),     weight: 600, style: 'normal' },
  { name: 'Inter',         data: loadFont('inter-bold.ttf'),         weight: 700, style: 'normal' },
  { name: 'Space Grotesk', data: loadFont('space-grotesk-bold.ttf'), weight: 700, style: 'normal' },
];

// ── Minimale createElement ──────────────────────────────────────────────────
const h = (type, props, ...children) => ({
  type,
  props: { ...props, children: children.length <= 1 ? children[0] : children },
});

// ── Frontmatter-parser ───────────────────────────────────────────────────────
function parseFrontmatter(raw) {
  const m = raw.match(/^---\n([\s\S]*?)\n---/);
  if (!m) throw new Error('Geen frontmatter gevonden');
  const block = m[1];
  const scalar = (key) => {
    const r = block.match(new RegExp(`^${key}:\\s*"?(.*?)"?\\s*$`, 'm'));
    return r ? r[1].replace(/\\"/g, '"') : '';
  };
  const ktStart = block.search(/^keyTakeaways:/m);
  let takeaways = [];
  if (ktStart !== -1) {
    const after = block.slice(ktStart).split('\n').slice(1);
    for (const line of after) {
      if (/^\S/.test(line)) break;
      const li = line.match(/^\s*-\s*"?(.*?)"?\s*$/);
      if (li && li[1]) takeaways.push(li[1].replace(/\\"/g, '"'));
    }
  }
  return {
    title: scalar('title'),
    category: scalar('category'),
    description: scalar('description'),
    readingTime: scalar('readingTime'),
    takeaways,
  };
}

// ── Tekst-helpers ────────────────────────────────────────────────────────────
function condense(s, max) {
  if (s.length <= max) return s;
  const cut = s.slice(0, max);
  const brk = Math.max(cut.lastIndexOf('; '), cut.lastIndexOf(': '), cut.lastIndexOf(' — '));
  if (brk > max * 0.5) return s.slice(0, brk).trim() + '…';
  const sp = cut.lastIndexOf(' ');
  return s.slice(0, sp > 0 ? sp : max).trim().replace(/[,;:]$/, '') + '…';
}

function headSize(title, base) {
  const L = title.length;
  let f = base;
  if (L > 72) f = base * 0.66;
  else if (L > 58) f = base * 0.76;
  else if (L > 46) f = base * 0.86;
  else if (L > 34) f = base * 0.94;
  return Math.round(f);
}

const catLabel = (cat) => (cat || 'AI TOOLS').toUpperCase();

// ── UI-bouwstenen ────────────────────────────────────────────────────────────
const text = (content, style) => h('div', { style: { display: 'flex', ...style } }, content);

function logoLockup(size) {
  const part = (t, color) => h('div', {
    style: { display: 'flex', color, fontSize: `${size}px`, fontWeight: 700,
             fontFamily: '"Space Grotesk"', letterSpacing: '-0.02em' },
  }, t);
  return h('div', {
    style: { display: 'flex', flexDirection: 'row', alignItems: 'baseline', gap: `${size * 0.3}px` },
  }, part('de beste', C.tp), part('/', C.accent), part('ai tools', C.tp));
}

function takeawayCard(idx, body, fs) {
  return h('div', {
    style: {
      display: 'flex', flexDirection: 'column', flexBasis: '0', flexGrow: 1, minWidth: 0,
      border: `1px solid ${C.border}`, borderRadius: '14px',
      backgroundColor: C.panel, padding: `${fs.pad}px`,
      justifyContent: 'flex-start',
    },
  },
    text(String(idx + 1).padStart(2, '0'), {
      color: C.tm, fontSize: `${fs.num}px`, fontWeight: 700, fontFamily: '"Inter"',
      letterSpacing: '0.02em', marginBottom: `${fs.num * 0.32}px`,
    }),
    text(body, {
      color: C.ts, fontSize: `${fs.body}px`, fontWeight: 400, fontFamily: '"Inter"',
      lineHeight: 1.34,
    }),
  );
}

function cardsBlock(takeaways, fmt) {
  const fs = fmt.card;
  const items = takeaways.slice(0, fmt.layout === 'grid' ? 4 : 5)
    .map((t) => condense(t, fmt.layout === 'grid' ? 96 : 124));
  if (fmt.layout === 'grid') {
    const row = (a, b) => h('div', {
      style: { display: 'flex', flexDirection: 'row', flexGrow: 1, gap: `${fmt.gap}px` },
    }, takeawayCard(a, items[a], fs), takeawayCard(b, items[b], fs));
    return h('div', {
      style: { display: 'flex', flexDirection: 'column', flexGrow: 1, gap: `${fmt.gap}px`, marginTop: `${fmt.gap * 1.3}px` },
    }, row(0, 1), row(2, 3));
  }
  return h('div', {
    style: { display: 'flex', flexDirection: 'column', flexGrow: 1, gap: `${fmt.gap}px`, marginTop: `${fmt.gap * 1.3}px` },
  }, ...items.map((b, i) => takeawayCard(i, b, fs)));
}

// ── Breed (16:9 / 1.91:1) layout ────────────────────────────────────────────
function buildWideCard(data, fmt) {
  const { W, H, P } = fmt;
  const hs = headSize(data.title, fmt.head);
  const inner = W - 2 * P;
  const colGap = Math.round(inner * 0.04);
  const leftW = Math.round(inner * 0.52);
  const rightW = inner - leftW - 1 - Math.round(inner * 0.04);

  return h('div', {
    style: {
      width: `${W}px`, height: `${H}px`, display: 'flex', flexDirection: 'column',
      backgroundColor: C.bg, padding: `${P}px`, fontFamily: '"Inter"', position: 'relative',
    },
  },
    h('div', {
      style: {
        position: 'absolute', top: `${-W * 0.15}px`, right: `${-W * 0.10}px`,
        width: `${W * 0.55}px`, height: `${W * 0.55}px`, borderRadius: '50%',
        backgroundImage: `radial-gradient(circle, ${C.accent}12 0%, ${C.accent}00 70%)`,
      },
    }),
    // left accent bar (Ember-stijl)
    h('div', {
      style: {
        position: 'absolute', top: '0', left: '0', width: '5px', height: `${H}px`,
        backgroundImage: `linear-gradient(to bottom, ${C.accent}, ${C.accent}44)`,
      },
    }),
    h('div', {
      style: { display: 'flex', flexDirection: 'row', flexGrow: 1, gap: `${colGap}px` },
    },
      h('div', {
        style: { display: 'flex', flexDirection: 'column', width: `${leftW}px`, justifyContent: 'center' },
      },
        text(`${catLabel(data.category)}${data.readingTime ? ` · ${data.readingTime} MIN` : ''}`, {
          color: C.tm, fontSize: `${fmt.eyebrow}px`, fontWeight: 600, fontFamily: '"Inter"',
          letterSpacing: '0.18em', marginBottom: `${fmt.eyebrow * 0.8}px`,
        }),
        text(data.title, {
          color: C.tp, fontSize: `${hs}px`, fontWeight: 700, fontFamily: '"Space Grotesk"',
          lineHeight: 1.15, letterSpacing: '-0.025em',
        }),
        h('div', { style: { display: 'flex', width: '40px', height: '3px', backgroundColor: C.accent, borderRadius: '2px', marginTop: `${fmt.eyebrow}px`, marginBottom: `${fmt.eyebrow * 0.8}px` } }),
        data.description
          ? text(condense(data.description, 80), {
              color: C.tm, fontSize: `${fmt.sub}px`, fontWeight: 400, fontFamily: '"Inter"',
              lineHeight: 1.38,
            })
          : null,
      ),
      h('div', { style: { display: 'flex', width: '1px', backgroundColor: C.border, alignSelf: 'stretch' } }),
      h('div', {
        style: { display: 'flex', flexDirection: 'column', width: `${rightW}px`, gap: `${fmt.gap}px`, justifyContent: 'center' },
      },
        ...data.takeaways.slice(0, 2).map((t, i) => takeawayCard(i, condense(t, 155), fmt.card)),
      ),
    ),
    h('div', { style: { display: 'flex', flexDirection: 'column', marginTop: `${fmt.gap}px` } },
      h('div', { style: { display: 'flex', height: '1px', backgroundColor: C.border } }),
      h('div', {
        style: { display: 'flex', flexDirection: 'row', alignItems: 'baseline', justifyContent: 'space-between', marginTop: `${fmt.cta * 0.7}px` },
      },
        h('div', {
          style: { display: 'flex', flexDirection: 'row', alignItems: 'baseline', gap: `${fmt.cta * 0.5}px` },
        },
          logoLockup(fmt.logo),
          text('Lees het volledige artikel →', {
            color: C.tp, fontSize: `${fmt.cta}px`, fontWeight: 600, fontFamily: '"Inter"',
          }),
        ),
        text('debesteaitools.nl', {
          color: C.tm, fontSize: `${fmt.logo * 0.62}px`, fontWeight: 400, fontFamily: '"Inter"',
        }),
      ),
    ),
  );
}

// ── Hoofd-layout ─────────────────────────────────────────────────────────────
function buildCard(data, fmt) {
  const { W, H, P } = fmt;
  const hs = headSize(data.title, fmt.head);

  return h('div', {
    style: {
      width: `${W}px`, height: `${H}px`, display: 'flex', flexDirection: 'column',
      backgroundColor: C.bg, padding: `${P}px`, fontFamily: '"Inter"', position: 'relative',
    },
  },
    // subtiele glow rechtsboven
    h('div', {
      style: {
        position: 'absolute', top: `${-W * 0.18}px`, right: `${-W * 0.12}px`,
        width: `${W * 0.7}px`, height: `${W * 0.7}px`, borderRadius: '50%',
        backgroundImage: `radial-gradient(circle, ${C.accent}14 0%, ${C.accent}00 70%)`,
      },
    }),
    // left accent bar (Ember-stijl)
    h('div', {
      style: {
        position: 'absolute', top: '0', left: '0', width: '5px', height: `${H}px`,
        backgroundImage: `linear-gradient(to bottom, ${C.accent}, ${C.accent}44)`,
      },
    }),
    // ── Header ──
    h('div', { style: { display: 'flex', flexDirection: 'column' } },
      text(`${catLabel(data.category)}${data.readingTime ? ` · ${data.readingTime} MIN` : ''}`, {
        color: C.tm, fontSize: `${fmt.eyebrow}px`, fontWeight: 600, fontFamily: '"Inter"',
        letterSpacing: '0.18em', marginBottom: `${fmt.eyebrow * 0.9}px`,
      }),
      text(data.title, {
        color: C.tp, fontSize: `${hs}px`, fontWeight: 700, fontFamily: '"Space Grotesk"',
        lineHeight: 1.18, letterSpacing: '-0.025em',
      }),
      h('div', { style: { display: 'flex', width: '46px', height: '4px', backgroundColor: C.accent, borderRadius: '2px', marginTop: `${fmt.eyebrow * 1.1}px` } }),
      data.description
        ? text(condense(data.description, 96), {
            color: C.tm, fontSize: `${fmt.sub}px`, fontWeight: 400, fontFamily: '"Inter"',
            lineHeight: 1.4, marginTop: `${fmt.eyebrow * 1.0}px`,
          })
        : null,
    ),
    // ── Kaarten ──
    cardsBlock(data.takeaways, fmt),
    // ── Footer ──
    h('div', { style: { display: 'flex', flexDirection: 'column', marginTop: `${fmt.gap * 1.2}px` } },
      h('div', { style: { display: 'flex', height: '1px', backgroundColor: C.border } }),
      text('Lees het volledige artikel →', {
        color: C.tp, fontSize: `${fmt.cta}px`, fontWeight: 600, fontFamily: '"Inter"',
        marginTop: `${fmt.cta * 0.9}px`, marginBottom: `${fmt.cta * 0.9}px`,
      }),
      h('div', {
        style: { display: 'flex', flexDirection: 'row', alignItems: 'baseline', justifyContent: 'space-between' },
      },
        logoLockup(fmt.logo),
        text('debesteaitools.nl', {
          color: C.tm, fontSize: `${fmt.logo * 0.62}px`, fontWeight: 400, fontFamily: '"Inter"',
        }),
      ),
    ),
  );
}

// ── Formaten ──────────────────────────────────────────────────────────────────
const FORMATS = {
  '1x1':          { W: 1080, H: 1080, P: 60, layout: 'grid', eyebrow: 19, head: 50, sub: 22, gap: 20, cta: 24, logo: 30, card: { pad: 30, num: 38, body: 21 } },
  '4x5':          { W: 1080, H: 1350, P: 66, layout: 'grid', eyebrow: 21, head: 56, sub: 24, gap: 24, cta: 26, logo: 34, card: { pad: 34, num: 44, body: 22 } },
  '9x16':         { W: 1080, H: 1920, P: 72, layout: 'col',  eyebrow: 23, head: 64, sub: 27, gap: 22, cta: 30, logo: 38, card: { pad: 38, num: 48, body: 26 } },
  'card-x':       { W: 1200, H: 675,  P: 54, layout: 'wide', eyebrow: 16, head: 46, sub: 20, gap: 18, cta: 20, logo: 26, card: { pad: 22, num: 30, body: 17 } },
  'card-linkedin': { W: 1200, H: 627,  P: 52, layout: 'wide', eyebrow: 15, head: 43, sub: 19, gap: 16, cta: 19, logo: 24, card: { pad: 20, num: 28, body: 16 } },
};

async function renderSlug(slug) {
  const file = join(CONTENT_DIR, `${slug}.md`);
  if (!existsSync(file)) { console.warn(`⚠  overslaan — niet gevonden: ${slug}.md`); return; }
  const data = parseFrontmatter(readFileSync(file, 'utf8'));
  if (!data.takeaways.length) { console.warn(`⚠  overslaan — geen keyTakeaways: ${slug}`); return; }
  mkdirSync(OUT_DIR, { recursive: true });
  for (const [name, fmt] of Object.entries(FORMATS)) {
    const card = fmt.layout === 'wide' ? buildWideCard(data, fmt) : buildCard(data, fmt);
    const svg = await satori(card, { width: fmt.W, height: fmt.H, fonts: FONTS });
    const png = new Resvg(svg, { fitTo: { mode: 'width', value: fmt.W * 2 } }).render().asPng();
    writeFileSync(join(OUT_DIR, `${slug}-${name}.png`), png);
  }
  console.log(`✅  ${slug} → 5 formaten in social-infographics/`);
}

// ── CLI ───────────────────────────────────────────────────────────────────────
function slugFromArg(a) {
  a = a.trim().replace(/[?#].*$/, '').replace(/\/+$/, '');
  if (a.includes('/')) a = a.split('/').pop();
  return a.replace(/\.md$/, '');
}

const args = process.argv.slice(2);
let slugs = args.filter((x) => !x.startsWith('--')).map(slugFromArg);
if (args.includes('--all')) {
  slugs = readdirSync(CONTENT_DIR).filter((f) => f.endsWith('.md')).map((f) => f.replace(/\.md$/, ''));
}
if (!slugs.length) {
  console.error('Gebruik: node scripts/generate-social.mjs <slug-of-URL> [ … ]  |  --all');
  process.exit(1);
}
for (const s of slugs) await renderSlug(s);
