# Architecture

Geverifieerd tegen `astro.config.mjs`, `src/content.config.ts`, `src/config/site.ts`, `package.json` (mei 2026).

## Pagina's

Geverifieerd in `src/pages/`:

| Route | Bron | Doel |
|---|---|---|
| `/` | `index.astro` | Landing — hero + radar widgets |
| `/ai-tools` | `ai-tools.astro` + `ai-tools/[slug].astro` | Tools-radar overzicht + per-tool detailpagina |
| `/digest` | `digest/index.astro` + `digest/[slug].astro` | Dagelijkse tools-digest (28 items live) |
| `/nieuws` | `nieuws/index.astro` + `nieuws/[slug].astro` | Redactionele artikelen (6 live) |
| `/launch-radar` | `launch-radar/index.astro` | Recente launches uit `launch_radar.json` |
| `/weekradar` | `weekradar/` | Wekelijkse highlights |
| `/vergelijk` | `vergelijk/` | Tool-vergelijkingen ("X vs Y") |
| `/over` | `over.astro` | About-pagina |
| `/zakelijk` | `zakelijk.astro` | B2B landing |
| `/rss.xml`, `/nieuws.xml`, `/digest.xml` | `*.xml.ts` | RSS feeds (3 stuks) |
| `/keystatic` | (dev only) | CMS admin |

Navigatie en site-identiteit centraal in [src/config/site.ts](../src/config/site.ts).

## Content collections

Drie collections, gedefinieerd in [src/content.config.ts](../src/content.config.ts):

### `tools` — `src/content/tools/*.json`
- 110 JSON-bestanden + `_TEMPLATE.md` + `AITools/Welkom.md` (Keystatic landing)
- Schema: `toolContentSchema` uit `src/lib/tools-schema.ts` (zeer uitgebreid: ~33 velden)
- Belangrijkste velden: `name`, `category`, `headlineValueProp`, `longDescription`, `verdict`, `primaryJobsToBeDone`, `bestAlternative`, `antiUseCases`, `pricing`, `keyFeatures`, `useCases`, `tags`, `draft`

### `nieuws` — `src/content/nieuws/*.md`
- 6 artikelen
- Schema: title, description, publishedAt, category (enum), tags, toolSlug, featured, draft, heroImage, readingTime, keyTakeaways, faq
- Categorieën uit [src/lib/nieuws-schema.ts](../src/lib/nieuws-schema.ts): `lancering`, `update`, `analyse`, `vergelijking`, `gids`, `nieuws`

### `digest` — `src/content/digest/*.md`
- 28 markdown-bestanden
- Schema spiegelt **hetlaatsteainieuws.nl** zodat helpers gedeeld kunnen worden:
  - `date` (Date), `timeSlot` (default `'tools-digest'`), `slotLabel`, `author`
  - Pipeline-stats: `totalAnalyzed`, `itemsSelected`, `categoriesCount`, `featured[]`
  - **Structured frontmatter arrays**: `launches[]`, `updates[]`, `deepDives[]`, `keySignals[]`
  - Body bevat alleen redactionele noot — de cards worden uit de arrays gerenderd
  - Oude digests zonder arrays vallen terug op markdown body (backwards-compatible)

## Components

```
src/components/
  atoms/      — Badge, PhaseBadge, RiskBadges, ScoreMeter
  molecules/  — Card, ToolCard, ToolSection
  layout/     — Grid, GridContainer, GridItem
  nieuws/     — NewsBentoGrid, NewsCard, RelatedNewsForTool, ToolUpdatesWidget
```

Geen aparte digest-components folder — die zijn inline in de page templates.

## Data layer

Centrale module: [src/lib/tools-engine.ts](../src/lib/tools-engine.ts) (22KB).

Functies (gebruikt door pagina's):
- `getAllTools()` — merged tools (content + stats)
- `getSectionedTools()` — gegroepeerd per categorie
- (zie tools-engine.ts voor de volledige API)

**Merge flow:**
```
src/content/tools/*.json     ─┐
                              ├─→  tools-engine.ts  ─→  Tool DTO  ─→  pagina's
src/data/reports/             ─┘   (build-time merge)
  ai_tools_radar.json
```

Helpers:
- `src/lib/tools-schema.ts` — Zod schemas, categorieën-enum, fase-enum (single source of truth)
- `src/lib/nieuws-schema.ts` — nieuws categorie enum + label/color config
- `src/lib/seo-helpers.ts` — meta tags, structured data
- `src/lib/stats-relevance.ts` — filter buzz/velocity scores op relevantie
- `src/lib/categories.ts` — categorie-config

## Build pipeline

Volgens `package.json:build`:

```
1. npm run generate-og        → Satori-based OG images naar public/og/
2. node scripts/build-search-index.mjs  → Pagefind index
3. astro build                → static output naar dist/
```

Daarna serveert Cloudflare Pages `dist/` als static + functions adapter.

## Adapter / output mode

Uit [astro.config.mjs](../astro.config.mjs):
- `output: 'static'`
- `adapter: cloudflare()` (alleen niet-dev)
- Keystatic alleen in dev (`isDev` check op `process.argv`)
- `markdoc()` actief voor MDX-achtige content
- `sitemap()` met filter (skipt `/og/`)
- `react()` voor interactieve componenten
- `prefetch.defaultStrategy: 'hover'`

## Styling

Custom CSS, geen framework. Ember-thema:
- `src/styles/00-tokens.css` — design tokens (oklch kleuren, fluid typography)
- `src/styles/main.css` — entry point
- CSS layers (volgens README): `tokens → animations → reset → base → components → specialized → atmospherics → utilities`
- Fonts: Space Grotesk (display), Inter (body), JetBrains Mono (mono)
