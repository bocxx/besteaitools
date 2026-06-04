# Data pipeline

Geverifieerd tegen `package.json`, `scripts/`, `src/data/reports/`, `src/lib/tools-engine.ts` (mei 2026).

## Bronnen → site

```
newsflux (extern Python)            debesteaitools.nl.ai
─────────────────────────           ─────────────────────────────
Scant 8+ bronnen                    src/data/reports/
(Twitter, Reddit, GitHub,    ───→     ai_tools_radar.json   (1.1 MB)
 HN, ArXiv, Product Hunt …)            launch_radar.json     (155 KB)
                                       launchradar.json      (105 KB, oud)
                                       enrichment_diff.json  (396 KB)
                                       ph_launch_stats.json  (31 KB)
                                       tool_feature_news.json (108 KB)
                                       tutorial_candidates.json (39 KB)
                                                │
                                                ▼
                                     scripts/sync-tools-content.ts
                                                │
                                                ▼
                                     src/content/tools/<slug>.json (drafts)
                                     + enrichment_diff.json updates
                                                │
                                                ▼
                                     tools-engine.ts (build-time merge)
                                                │
                                                ▼
                                            Astro build → dist/
```

## Data-bestanden in `src/data/reports/`

Geverifieerd, alle door newsflux beheerd (niet handmatig editen):

| Bestand | Grootte | Doel |
|---|---|---|
| `ai_tools_radar.json` | 1.1 MB | Hoofdbestand: stats per tool (buzz, velocity, mentions, fase, sources, GitHub stars) |
| `launch_radar.json` | 155 KB | Recente launches voor `/launch-radar` |
| `launchradar.json` | 105 KB | **Oude versie** (april 2026) — kandidaat voor verwijdering |
| `enrichment_diff.json` | 396 KB | Voorgestelde verrijkingen voor bestaande tools |
| `ph_launch_stats.json` | 31 KB | Product Hunt launch-stats |
| `tool_feature_news.json` | 108 KB | Tool-update nieuws-feed |
| `tutorial_candidates.json` | 39 KB | Tutorial-kandidaten |

⚠️ **`launchradar.json` (zonder underscore) lijkt een verouderde tweeling van `launch_radar.json`** — uit april terwijl rest uit mei is. Onderzoek of die nog gebruikt wordt; zo niet, opruimen.

## Build-time merge

[src/lib/tools-engine.ts](../src/lib/tools-engine.ts) doet:

1. Laad alle `tools` collection entries (110 JSONs) → `ToolContent`
2. Laad `ai_tools_radar.json` → `ToolStats` per slug
3. Normaliseer slugs (newsflux gebruikt soms spaties, content gebruikt kebab-case)
4. Merge tot `Tool` DTO
5. Filter via `stats-relevance.ts` (skipt low-buzz tools onder threshold)

**Twee lagen, nooit door elkaar:**
- `ToolContent` (redactioneel) — name, category, verdict, jobsTBD, etc. Beheerd via Keystatic of bewuste edits. Nooit overschreven door ETL.
- `ToolStats` (dynamisch) — buzz score, velocity, mentions, fase, bronnen, GitHub stars. Wordt elke newsflux-run ververst.

## Sync commando's

Uit `package.json`:

| Commando | Wat het doet |
|---|---|
| `npm run sync-tools` | Draait `tsx scripts/sync-tools-content.ts` — leest `ai_tools_radar.json`, maakt nieuwe tool-JSONs als drafts, genereert/update `enrichment_diff.json` |
| `npm run fetch-ph-stats` | Draait `tsx scripts/fetch-ph-stats.ts` — refresh Product Hunt stats |
| `npm run generate-og` | Genereert OG-images via Satori naar `public/og/` (draait pre-build) |

## Slug-normalisatie

- Bestandsnamen in `src/content/tools/`: **kebab-case** (`adobe-firefly.json`, `claude-code.json`)
- newsflux geeft soms slugs met **spaties** (`"Adobe Firefly"`)
- `tools-engine.ts` normaliseert beide richtingen voor de merge
- URLs altijd kebab-case: `/ai-tools/adobe-firefly`

## Apply-diffs flow

`scripts/apply-diffs.ts` bestaat — gebruikt vermoedelijk om voorgestelde enrichments uit `enrichment_diff.json` toe te passen op tool-content. Lees het script voor de exacte flow voor je het draait.

## Externe afhankelijkheden

- **newsflux** — Python pipeline in `~/Projects/DEPLOYED/newsflux/` (apart project). Genereert de `*.json` reports en pusht ze hierheen.
- **Product Hunt** — via `fetch-ph-stats.ts`
- **GitHub API** — voor stars/repo-data (in newsflux of separaat enrichment)
