/**
 * scripts/generate-cheatsheet.ts
 *
 * Cheatsheet pipeline for debesteaitools.nl — renders branded portrait-poster
 * PNGs (house "Deep Space Nebula" style) from a data file, using the same
 * satori + resvg stack as generate-og-images.ts.
 *
 * Four layouts:
 *   - tool-grid    Categorised lists of tools (e.g. "AI Productivity Tools").
 *                  Groups can be hand-written or auto-filled from the radar.
 *   - laws         Numbered tips/laws in phased sections, optional poor/strong
 *                  example rows (e.g. "20 Laws of Claude Prompts").
 *   - steps        A numbered vertical how-to / stappenplan.
 *   - comparison   A side-by-side table (functie × tool). Rows can be
 *                  hand-written or auto-filled from the radar by slug.
 *
 * Usage:
 *   npm run generate-cheatsheet                  # render every file in src/data/cheatsheets/
 *   npm run generate-cheatsheet -- <file.json>   # render one file
 *   npm run generate-cheatsheet -- <file.json> --out public/cheatsheets
 *
 * Output: public/cheatsheets/<slug>.png  (slug = data.slug or filename)
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
import {
  C,
  ACCENTS,
  catLabel,
  trunc,
  alpha,
  TREND_GLYPH,
} from './lib/cheatsheet-theme.js';

// ── Paths ───────────────────────────────────────────────────────────────────
const ROOT = resolve(process.cwd());
const DATA_DIR = join(ROOT, 'src/data/cheatsheets');
const RADAR_PATH = join(ROOT, 'src/data/reports/ai_tools_radar.json');
const DEFAULT_OUT = join(ROOT, 'public/cheatsheets');
const FONT_INTER_REG = join(ROOT, 'src/assets/fonts/inter-regular.ttf');
const FONT_INTER_SB = join(ROOT, 'src/assets/fonts/inter-semibold.ttf');
const FONT_INTER_BOLD = join(ROOT, 'src/assets/fonts/inter-bold.ttf');
const FONT_SG = join(ROOT, 'src/assets/fonts/space-grotesk-bold.ttf');

const DEFAULT_WIDTH = 1200;

// ── Types ───────────────────────────────────────────────────────────────────
interface BaseSheet {
  slug?: string;
  title: string;
  subtitle?: string;
  eyebrow?: string; // badge top-right, defaults to "Cheatsheet"
  accent?: string; // hex; defaults to brand coral
  footnote?: string;
  width?: number;
  columns?: number; // tool-grid only
}

interface ToolGridSheet extends BaseSheet {
  type: 'tool-grid';
  groups?: { title: string; accent?: string; items: string[] }[];
  autofill?: {
    source: 'radar';
    categories?: string[]; // radar category keys; omit = all with content
    perCategory?: number; // default 7
    minBuzz?: number;
  };
}

interface LawsSheet extends BaseSheet {
  type: 'laws';
  sections: {
    title: string;
    accent?: string;
    cards: {
      n?: number | string;
      title: string;
      body?: string;
      poor?: string;
      strong?: string;
    }[];
  }[];
}

interface StepsSheet extends BaseSheet {
  type: 'steps';
  steps: { n?: number | string; title: string; body?: string }[];
}

interface ComparisonSheet extends BaseSheet {
  type: 'comparison';
  columns?: never;
  headers?: string[]; // ["Functie", "Tool A", ...]
  rows?: string[][];
  autofill?: {
    source: 'radar';
    slugs: string[];
    metrics?: string[]; // subset of: category, buzz, trend, mentions, sources
  };
}

type Sheet = ToolGridSheet | LawsSheet | StepsSheet | ComparisonSheet;

// ── Radar helpers ─────────────────────────────────────────────────────────────
type RadarTool = {
  slug: string;
  name: string;
  category: string;
  buzz_score?: number;
  trend_direction?: string;
  mentions?: number;
  source_count?: number;
};
let _radar: RadarTool[] | null = null;
function radar(): RadarTool[] {
  if (_radar) return _radar;
  if (!existsSync(RADAR_PATH)) {
    console.warn('⚠️  No radar file at', RADAR_PATH, '— autofill disabled.');
    _radar = [];
    return _radar;
  }
  const raw = JSON.parse(readFileSync(RADAR_PATH, 'utf-8'));
  _radar = (raw.tools ?? []) as RadarTool[];
  return _radar;
}

function autofillGroups(cfg: NonNullable<ToolGridSheet['autofill']>) {
  const per = cfg.perCategory ?? 7;
  const minBuzz = cfg.minBuzz ?? 0;
  const tools = radar().filter((t) => (t.buzz_score ?? 0) >= minBuzz);
  const byCat = new Map<string, RadarTool[]>();
  for (const t of tools) {
    if (!byCat.has(t.category)) byCat.set(t.category, []);
    byCat.get(t.category)!.push(t);
  }
  let cats = cfg.categories ?? [...byCat.keys()];
  return cats
    .filter((c) => byCat.has(c))
    .map((c) => ({
      title: catLabel(c),
      items: byCat
        .get(c)!
        .sort((a, b) => (b.buzz_score ?? 0) - (a.buzz_score ?? 0))
        .slice(0, per)
        .map((t) => t.name),
    }))
    .filter((g) => g.items.length > 0);
}

function autofillComparison(cfg: NonNullable<ComparisonSheet['autofill']>) {
  const metrics = cfg.metrics ?? ['category', 'buzz', 'trend', 'mentions'];
  const bySlug = new Map(radar().map((t) => [t.slug, t]));
  const picked = cfg.slugs
    .map((s) => bySlug.get(s))
    .filter((t): t is RadarTool => !!t);
  const headers = ['', ...picked.map((t) => t.name)];
  const label: Record<string, string> = {
    category: 'Categorie',
    buzz: 'Buzz-score',
    trend: 'Trend',
    mentions: 'Mentions',
    sources: 'Bronnen',
  };
  const cell = (t: RadarTool, m: string): string => {
    switch (m) {
      case 'category':
        return catLabel(t.category);
      case 'buzz':
        return t.buzz_score != null ? String(Math.round(t.buzz_score)) : '—';
      case 'trend':
        return `${TREND_GLYPH[t.trend_direction ?? ''] ?? ''} ${t.trend_direction ?? '—'}`.trim();
      case 'mentions':
        return t.mentions != null ? t.mentions.toLocaleString('nl-NL') : '—';
      case 'sources':
        return t.source_count != null ? String(t.source_count) : '—';
      default:
        return '—';
    }
  };
  const rows = metrics.map((m) => [label[m] ?? m, ...picked.map((t) => cell(t, m))]);
  return { headers, rows };
}

// ── Shared chrome (header + frame) ────────────────────────────────────────────
const today = new Date().toLocaleDateString('nl-NL', {
  day: 'numeric',
  month: 'long',
  year: 'numeric',
});

function header(sheet: Sheet, accent: string) {
  return h(
    'div',
    { style: { display: 'flex', flexDirection: 'column' } },
    // brand + eyebrow
    h(
      'div',
      {
        style: {
          display: 'flex',
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'center',
          marginBottom: '26px',
        },
      },
      h(
        'div',
        {
          style: {
            color: C.primary,
            fontSize: '20px',
            fontWeight: 600,
            letterSpacing: '0.02em',
            fontFamily: 'Inter',
          },
        },
        'debesteaitools.nl',
      ),
      h(
        'div',
        {
          style: {
            display: 'flex',
            alignItems: 'center',
            backgroundColor: alpha(accent, 16),
            border: `1.5px solid ${alpha(accent, 50)}`,
            borderRadius: '999px',
            padding: '8px 22px',
            color: accent,
            fontSize: '15px',
            fontWeight: 700,
            letterSpacing: '0.08em',
            textTransform: 'uppercase',
            fontFamily: 'Inter',
          },
        },
        sheet.eyebrow ?? 'Cheatsheet',
      ),
    ),
    // title
    h(
      'div',
      {
        style: {
          color: C.textPrimary,
          fontSize: sheet.title.length > 34 ? '60px' : '76px',
          fontWeight: 700,
          letterSpacing: '-0.03em',
          lineHeight: 1.04,
          fontFamily: 'Space Grotesk',
        },
      },
      sheet.title,
    ),
    // subtitle
    ...(sheet.subtitle
      ? [
          h(
            'div',
            {
              style: {
                color: C.textSecondary,
                fontSize: '26px',
                fontWeight: 400,
                lineHeight: 1.4,
                marginTop: '18px',
                maxWidth: '980px',
                fontFamily: 'Inter',
              },
            },
            sheet.subtitle,
          ),
        ]
      : []),
    // accent rule
    h('div', {
      style: {
        height: '4px',
        width: '120px',
        borderRadius: '999px',
        marginTop: '30px',
        background: `linear-gradient(to right, ${C.primary}, ${accent})`,
      },
    }),
  );
}

function footer(sheet: Sheet) {
  return h(
    'div',
    { style: { display: 'flex', flexDirection: 'column', marginTop: '52px' } },
    h('div', {
      style: { height: '1px', backgroundColor: C.border, marginBottom: '20px' },
    }),
    h(
      'div',
      {
        style: {
          display: 'flex',
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'center',
        },
      },
      h(
        'div',
        { style: { color: C.textMuted, fontSize: '17px', fontFamily: 'Inter' } },
        sheet.footnote ?? 'AI Tools Radar · Nederland',
      ),
      h(
        'div',
        { style: { color: C.textMuted, fontSize: '17px', fontFamily: 'Inter' } },
        today,
      ),
    ),
  );
}

function frame(sheet: Sheet, accent: string, body: ReturnType<typeof h>) {
  const width = sheet.width ?? DEFAULT_WIDTH;
  const fill = {
    position: 'absolute' as const,
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  };
  return h(
    'div',
    {
      style: {
        width: `${width}px`,
        display: 'flex',
        flexDirection: 'column',
        backgroundColor: C.bg,
        fontFamily: 'Inter',
        position: 'relative',
      },
    },
    // Layered "Ocean-style" background (ported from hetlaatsteainieuws.nl):
    // deep base + two drifting colour-washes + a faint blueprint grid.
    // 1 — primary colour-wash, top-left
    h('div', {
      style: {
        ...fill,
        background: `radial-gradient(ellipse at 16% 8%, ${alpha(C.primary, 22)} 0%, transparent 56%)`,
      },
    }),
    // 2 — accent colour-wash, bottom-right
    h('div', {
      style: {
        ...fill,
        background: `radial-gradient(ellipse at 88% 96%, ${alpha(accent, 18)} 0%, transparent 52%)`,
      },
    }),
    // 3 — faint blueprint grid overlay
    h('div', {
      style: {
        ...fill,
        backgroundImage: `linear-gradient(${C.grid} 1px, transparent 1px), linear-gradient(90deg, ${C.grid} 1px, transparent 1px)`,
        backgroundSize: '56px 56px',
      },
    }),
    // left accent bar
    h('div', {
      style: {
        position: 'absolute',
        top: 0,
        left: 0,
        width: '10px',
        bottom: 0,
        background: `linear-gradient(to bottom, ${C.primary}, ${accent})`,
      },
    }),
    // content column
    h(
      'div',
      {
        style: {
          display: 'flex',
          flexDirection: 'column',
          padding: '72px 80px 60px 96px',
          width: `${width}px`,
        },
      },
      header(sheet, accent),
      h('div', { style: { display: 'flex', flexDirection: 'column', marginTop: '52px' } }, body),
      footer(sheet),
    ),
  );
}

// ── Layout: tool-grid ─────────────────────────────────────────────────────────
function renderToolGrid(sheet: ToolGridSheet) {
  let groups =
    sheet.groups && sheet.groups.length
      ? sheet.groups
      : sheet.autofill
        ? autofillGroups(sheet.autofill)
        : [];
  if (!groups.length) throw new Error(`tool-grid "${sheet.slug}" has no groups`);

  const nCols = sheet.columns ?? (groups.length >= 9 ? 4 : groups.length >= 5 ? 3 : 2);

  // Balance groups into columns by estimated height (header + items).
  const cols: { title: string; accent?: string; items: string[] }[][] = Array.from(
    { length: nCols },
    () => [],
  );
  const colH = new Array(nCols).fill(0);
  const cost = (g: { items: string[] }) => g.items.length + 2.2;
  for (const g of groups) {
    const idx = colH.indexOf(Math.min(...colH));
    cols[idx].push(g);
    colH[idx] += cost(g);
  }

  const gap = 40;
  const colWidth = Math.floor(
    ((sheet.width ?? DEFAULT_WIDTH) - 96 - 80 - gap * (nCols - 1)) / nCols,
  );

  return h(
    'div',
    { style: { display: 'flex', flexDirection: 'row', gap: `${gap}px` } },
    ...cols.map((col, ci) =>
      h(
        'div',
        {
          key: ci,
          style: {
            display: 'flex',
            flexDirection: 'column',
            width: `${colWidth}px`,
            gap: '30px',
          },
        },
        ...col.map((g, gi) => {
          const accent = g.accent ?? ACCENTS[(ci * 3 + gi) % ACCENTS.length];
          return h(
            'div',
            { key: gi, style: { display: 'flex', flexDirection: 'column' } },
            // category header
            h(
              'div',
              {
                style: {
                  display: 'flex',
                  flexDirection: 'row',
                  alignItems: 'center',
                  marginBottom: '14px',
                },
              },
              h('div', {
                style: {
                  width: '12px',
                  height: '12px',
                  borderRadius: '3px',
                  backgroundColor: accent,
                  marginRight: '12px',
                },
              }),
              h(
                'div',
                {
                  style: {
                    color: C.textPrimary,
                    fontSize: '23px',
                    fontWeight: 700,
                    letterSpacing: '-0.01em',
                    fontFamily: 'Space Grotesk',
                  },
                },
                g.title,
              ),
            ),
            // items
            ...g.items.map((it, ii) =>
              h(
                'div',
                {
                  key: ii,
                  style: {
                    display: 'flex',
                    flexDirection: 'row',
                    alignItems: 'center',
                    marginBottom: '9px',
                  },
                },
                h('div', {
                  style: {
                    width: '5px',
                    height: '5px',
                    borderRadius: '50%',
                    backgroundColor: alpha(accent, 70),
                    marginRight: '12px',
                    marginLeft: '2px',
                  },
                }),
                h(
                  'div',
                  {
                    style: {
                      color: C.textSecondary,
                      fontSize: '19px',
                      fontWeight: 400,
                      fontFamily: 'Inter',
                    },
                  },
                  it,
                ),
              ),
            ),
          );
        }),
      ),
    ),
  );
}

// ── Layout: laws ──────────────────────────────────────────────────────────────
function renderLaws(sheet: LawsSheet) {
  const width = sheet.width ?? DEFAULT_WIDTH;
  const inner = width - 96 - 80;
  const gap = 28;
  const cardW = Math.floor((inner - gap * 2) / 3); // 3 cards per row

  return h(
    'div',
    { style: { display: 'flex', flexDirection: 'column', gap: '44px' } },
    ...sheet.sections.map((sec, si) => {
      const accent = sec.accent ?? ACCENTS[si % ACCENTS.length];
      return h(
        'div',
        { key: si, style: { display: 'flex', flexDirection: 'column' } },
        // section header band
        h(
          'div',
          {
            style: {
              display: 'flex',
              alignItems: 'center',
              alignSelf: 'flex-start',
              backgroundColor: alpha(accent, 14),
              borderLeft: `4px solid ${accent}`,
              borderRadius: '0 8px 8px 0',
              padding: '10px 20px',
              marginBottom: '24px',
              color: C.textPrimary,
              fontSize: '22px',
              fontWeight: 700,
              letterSpacing: '0.01em',
              fontFamily: 'Space Grotesk',
            },
          },
          sec.title,
        ),
        // cards row(s)
        h(
          'div',
          { style: { display: 'flex', flexDirection: 'row', flexWrap: 'wrap', gap: `${gap}px` } },
          ...sec.cards.map((card, ci) =>
            h(
              'div',
              {
                key: ci,
                style: {
                  display: 'flex',
                  flexDirection: 'column',
                  width: `${cardW}px`,
                  backgroundColor: C.bgPanel,
                  border: `1px solid ${C.border}`,
                  borderRadius: '16px',
                  padding: '22px 22px 20px',
                },
              },
              // number + title
              h(
                'div',
                { style: { display: 'flex', flexDirection: 'row', alignItems: 'center', marginBottom: '12px' } },
                ...(card.n != null
                  ? [
                      h(
                        'div',
                        {
                          style: {
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            width: '34px',
                            height: '34px',
                            borderRadius: '9px',
                            backgroundColor: accent,
                            color: C.bgInk,
                            fontSize: '18px',
                            fontWeight: 700,
                            marginRight: '12px',
                            fontFamily: 'Space Grotesk',
                          },
                        },
                        String(card.n),
                      ),
                    ]
                  : []),
                h(
                  'div',
                  {
                    style: {
                      color: C.textPrimary,
                      fontSize: '20px',
                      fontWeight: 700,
                      lineHeight: 1.15,
                      flex: 1,
                      fontFamily: 'Space Grotesk',
                    },
                  },
                  card.title,
                ),
              ),
              ...(card.body
                ? [
                    h(
                      'div',
                      {
                        style: {
                          color: C.textSecondary,
                          fontSize: '16px',
                          lineHeight: 1.45,
                          fontFamily: 'Inter',
                        },
                      },
                      card.body,
                    ),
                  ]
                : []),
              ...(card.poor ? [exampleRow(false, card.poor)] : []),
              ...(card.strong ? [exampleRow(true, card.strong)] : []),
            ),
          ),
        ),
      );
    }),
  );
}

function exampleRow(good: boolean, text: string) {
  const col = good ? C.success : C.error;
  return h(
    'div',
    {
      style: {
        display: 'flex',
        flexDirection: 'column',
        marginTop: '14px',
        backgroundColor: alpha(col, 10),
        border: `1px solid ${alpha(col, 28)}`,
        borderRadius: '10px',
        padding: '10px 12px',
      },
    },
    h(
      'div',
      { style: { display: 'flex', flexDirection: 'row', alignItems: 'center', marginBottom: '5px' } },
      h(
        'div',
        { style: { color: col, fontSize: '14px', fontWeight: 700, marginRight: '7px', fontFamily: 'Inter' } },
        good ? '✓' : '✕',
      ),
      h(
        'div',
        { style: { color: col, fontSize: '12px', fontWeight: 700, letterSpacing: '0.06em', textTransform: 'uppercase', fontFamily: 'Inter' } },
        good ? 'Sterk' : 'Zwak',
      ),
    ),
    h(
      'div',
      { style: { color: C.textSecondary, fontSize: '14px', lineHeight: 1.4, fontFamily: 'Inter' } },
      text,
    ),
  );
}

// ── Layout: steps ─────────────────────────────────────────────────────────────
function renderSteps(sheet: StepsSheet) {
  return h(
    'div',
    { style: { display: 'flex', flexDirection: 'column', gap: '22px' } },
    ...sheet.steps.map((step, i) => {
      const accent = ACCENTS[i % ACCENTS.length];
      return h(
        'div',
        {
          key: i,
          style: {
            display: 'flex',
            flexDirection: 'row',
            alignItems: 'flex-start',
            backgroundColor: C.bgPanel,
            border: `1px solid ${C.border}`,
            borderRadius: '16px',
            padding: '24px 28px',
          },
        },
        h(
          'div',
          {
            style: {
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              width: '56px',
              height: '56px',
              borderRadius: '14px',
              background: `linear-gradient(135deg, ${accent}, ${alpha(accent, 60)})`,
              color: C.bgInk,
              fontSize: '28px',
              fontWeight: 700,
              marginRight: '24px',
              fontFamily: 'Space Grotesk',
            },
          },
          String(step.n ?? i + 1),
        ),
        h(
          'div',
          { style: { display: 'flex', flexDirection: 'column', flex: 1, paddingTop: '2px' } },
          h(
            'div',
            {
              style: {
                color: C.textPrimary,
                fontSize: '26px',
                fontWeight: 700,
                lineHeight: 1.15,
                marginBottom: step.body ? '8px' : '0',
                fontFamily: 'Space Grotesk',
              },
            },
            step.title,
          ),
          ...(step.body
            ? [
                h(
                  'div',
                  { style: { color: C.textSecondary, fontSize: '19px', lineHeight: 1.45, fontFamily: 'Inter' } },
                  step.body,
                ),
              ]
            : []),
        ),
      );
    }),
  );
}

// ── Layout: comparison ────────────────────────────────────────────────────────
function renderComparison(sheet: ComparisonSheet) {
  let headers = sheet.headers;
  let rows = sheet.rows;
  if ((!headers || !rows) && sheet.autofill) {
    const af = autofillComparison(sheet.autofill);
    headers = headers ?? af.headers;
    rows = rows ?? af.rows;
  }
  if (!headers || !rows) throw new Error(`comparison "${sheet.slug}" needs headers+rows`);

  const nCol = headers.length;
  const labelFlex = 1.3;
  const colFlex = (i: number) => (i === 0 ? labelFlex : 1);
  const cellPad = '16px 22px';

  const headerRow = h(
    'div',
    {
      style: {
        display: 'flex',
        flexDirection: 'row',
        backgroundColor: alpha(C.primary, 16),
        borderRadius: '12px 12px 0 0',
        borderBottom: `2px solid ${alpha(C.primary, 50)}`,
      },
    },
    ...headers.map((hd, i) =>
      h(
        'div',
        {
          key: i,
          style: {
            display: 'flex',
            flex: colFlex(i),
            padding: cellPad,
            color: i === 0 ? C.textMuted : C.textPrimary,
            fontSize: '21px',
            fontWeight: 700,
            justifyContent: i === 0 ? 'flex-start' : 'center',
            fontFamily: 'Space Grotesk',
          },
        },
        hd,
      ),
    ),
  );

  const dataRows = rows.map((row, ri) =>
    h(
      'div',
      {
        key: ri,
        style: {
          display: 'flex',
          flexDirection: 'row',
          backgroundColor: ri % 2 === 0 ? C.bgSurface : C.bgPanelAlt,
          borderBottom: `1px solid ${C.border}`,
        },
      },
      ...row.slice(0, nCol).map((cell, ci) =>
        h(
          'div',
          {
            key: ci,
            style: {
              display: 'flex',
              flex: colFlex(ci),
              padding: cellPad,
              color: ci === 0 ? C.textPrimary : C.textSecondary,
              fontSize: '19px',
              fontWeight: ci === 0 ? 600 : 400,
              justifyContent: ci === 0 ? 'flex-start' : 'center',
              textAlign: ci === 0 ? 'left' : 'center',
              fontFamily: 'Inter',
            },
          },
          cell,
        ),
      ),
    ),
  );

  return h(
    'div',
    {
      style: {
        display: 'flex',
        flexDirection: 'column',
        borderRadius: '12px',
        overflow: 'hidden',
        border: `1px solid ${C.border}`,
      },
    },
    headerRow,
    ...dataRows,
  );
}

// ── Dispatch ──────────────────────────────────────────────────────────────────
function buildSheet(sheet: Sheet) {
  const accent = sheet.accent ?? C.primary;
  let body: ReturnType<typeof h>;
  switch (sheet.type) {
    case 'tool-grid':
      body = renderToolGrid(sheet);
      break;
    case 'laws':
      body = renderLaws(sheet);
      break;
    case 'steps':
      body = renderSteps(sheet);
      break;
    case 'comparison':
      body = renderComparison(sheet);
      break;
    default:
      throw new Error(`Unknown cheatsheet type: ${(sheet as any).type}`);
  }
  return frame(sheet, accent, body);
}

// ── Main ──────────────────────────────────────────────────────────────────────
async function main() {
  const args = process.argv.slice(2);
  let outDir = DEFAULT_OUT;
  const outIdx = args.indexOf('--out');
  if (outIdx !== -1) {
    outDir = resolve(args[outIdx + 1]);
    args.splice(outIdx, 2);
  }
  const fileArgs = args.filter((a) => !a.startsWith('--'));

  const fonts: Font[] = [
    { name: 'Inter', data: loadFont(FONT_INTER_REG), style: 'normal', weight: 400 },
    { name: 'Inter', data: loadFont(FONT_INTER_SB), style: 'normal', weight: 600 },
    { name: 'Inter', data: loadFont(FONT_INTER_BOLD), style: 'normal', weight: 700 },
    { name: 'Space Grotesk', data: loadFont(FONT_SG), style: 'normal', weight: 700 },
  ];

  const files = fileArgs.length
    ? fileArgs.map((f) => (f.endsWith('.json') ? resolve(f) : join(DATA_DIR, `${f}.json`)))
    : existsSync(DATA_DIR)
      ? readdirSync(DATA_DIR)
          .filter((f) => f.endsWith('.json') && !f.startsWith('_'))
          .map((f) => join(DATA_DIR, f))
      : [];

  if (!files.length) {
    console.error('No cheatsheet data files found in', DATA_DIR);
    process.exit(1);
  }

  mkdirSync(outDir, { recursive: true });
  let n = 0;
  for (const file of files) {
    const sheet = JSON.parse(readFileSync(file, 'utf-8')) as Sheet;
    const slug = sheet.slug ?? basename(file, '.json');
    const width = sheet.width ?? DEFAULT_WIDTH;
    try {
      const svg = await satori(buildSheet(sheet), { width, fonts });
      const png = new Resvg(svg, { fitTo: { mode: 'width', value: width } })
        .render()
        .asPng();
      writeFileSync(join(outDir, `${slug}.png`), png);
      console.log(`✅  ${slug}.png  (${sheet.type})`);
      n++;
    } catch (err) {
      console.error(`❌  ${slug}:`, (err as Error).message);
    }
  }
  console.log(`\nDone — ${n}/${files.length} cheatsheets → ${outDir}`);
}

function loadFont(path: string): ArrayBuffer {
  const buf = readFileSync(path);
  return buf.buffer.slice(buf.byteOffset, buf.byteOffset + buf.byteLength) as ArrayBuffer;
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
