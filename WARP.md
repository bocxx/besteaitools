# AGENTS.md

This file provides guidance to AI coding agents (Warp/Oz, Cursor, Claude, etc.) when working in this repository.

## Project Overview

**nuchter.ai** is a Dutch-language AI tools radar built with Astro. It tracks 48+ AI tools with live stats (buzz score, velocity, mentions, phase) sourced from the newsflux pipeline. The site is designed as a reusable foundation for AI tool directories.

- **Live site**: https://nuchter.ai
- **Language**: Dutch (NL) — all UI labels, descriptions, and copy are in Dutch
- **Branch convention**: feature work on `feat/*` branches

## Commands

```bash
npm run dev          # Astro dev server on :4321
npm run build        # Production build → dist/
npm run preview      # Preview production build
npm run sync-tools   # Sync tools from newsflux radar JSON → content files + enrichment diff
```

## Architecture

### Key directories

```
src/
  pages/
    index.astro              # Landing page
    ai-tools.astro           # AI Tools Radar overview (filters, cards, grid)
    ai-tools/[slug].astro    # Tool detail pages (prerendered)
    rss.xml.ts               # RSS feed
  components/
    atoms/                   # Badge, PhaseBadge, ScoreMeter
    molecules/               # ToolCard, ToolSection, Card
    layout/                  # Grid, GridContainer, GridItem
    SiteHeader.astro
    SiteFooter.astro
  lib/
    tools-schema.ts          # Single source of truth: Zod schemas, category/phase/direction maps
    tools-engine.ts          # Data layer: loads content + stats, merges, queries, sections
  types/
    tools-domain.ts          # TypeScript interfaces: ToolContent, ToolStats, Tool, etc.
  config/
    site.ts                  # Site identity, navigation, social links
    categories.ts            # Legacy categories (tools-schema.ts is the canonical source)
  content/
    tools/*.json             # Editorial tool data (managed via Keystatic CMS)
  data/
    reports/
      ai_tools_radar.json    # Stats from newsflux pipeline (buzz, velocity, phase, etc.)
      enrichment_diff.json   # Suggested enrichment updates (from sync-tools)
  styles/
    00-tokens.css            # Design tokens (Ember theme)
    main.css                 # CSS entry point, layer ordering
scripts/
  sync-tools-content.ts      # ETL: newsflux radar → tool JSON files + enrichment diffs
keystatic.config.ts           # Keystatic CMS config for /keystatic admin UI
```

### Data flow

1. **newsflux** pipeline generates `ai_tools_radar.json` with stats per tool
2. `npm run sync-tools` creates new tool JSON files (as drafts) and generates enrichment diffs
3. `tools-engine.ts` merges editorial content (JSON) with stats at build time
4. Pages use `getAllTools()`, `getSectionedTools()`, etc. to query merged data

### Slug convention (IMPORTANT)

- **Slugs are derived from filenames** — no `slug` field in tool JSON files
- Filenames use **hyphens** as word separators: `adobe-firefly.json`, `claude-code.json`
- newsflux stats may use **spaces** in slugs — `tools-engine.ts` normalizes both directions
- URLs are SEO-friendly: `/ai-tools/adobe-firefly`
- When creating new tool files, always use hyphenated filenames

### Keystatic CMS

- Admin UI at `/keystatic` (dev mode only)
- Uses `fields.slug()` for tool names — the slug becomes the filename
- Do NOT add a `slug` field to tool JSON files — Keystatic will reject it
- Schema in `keystatic.config.ts` must stay aligned with `toolContentSchema` in `tools-schema.ts`

## Design System

**Theme: Ember** — minimalist dark palette with warm accents.

- Tokens in `src/styles/00-tokens.css` (oklch colors, fluid typography, spacing scale)
- Fonts: Space Grotesk (display), Inter (body), JetBrains Mono (mono)
- Glassmorphism via `--bg-glass` + `backdrop-filter: blur(12px)`
- CSS layers: `tokens → animations → reset → base → components → specialized → atmospherics → utilities`

**Do NOT change the color palette or design tokens** unless explicitly requested.

### Component patterns

- `Badge` atom: variants `primary`, `secondary`, `category`, `outline` with optional color
- `ToolCard` molecule: shows category badge, phase tags (Hype/Blijver), Top badge, trend arrow, buzz score, and phase badge. Accepts `isTopTool` prop for "meest besproken" highlight. Colored left border accent: warm for hype, green for blijvers.
- `ToolSection` molecule: titled section with icon slot, subtitle, count, and card grid

## Tools-schema.ts (Single Source of Truth)

All category names, phase labels, direction labels, buzz thresholds, and the Zod content schema live here. Both Astro content validation and Keystatic reference this as their schema source.

Categories: Chatbots, Coding, Automatisering, Beeld, Video, Audio, Zoeken, Productiviteit, Infrastructuur

## Validation

- No test framework — validate via `npm run build`
- TypeScript strict mode — `npx astro check` for type validation
- Build must complete without errors before merging

## External Dependencies

- **newsflux**: External Python pipeline that generates radar stats (not in this repo)
- **@keystatic/core + @keystatic/astro**: CMS admin panel (causes large chunk warning — safe to ignore)
- **@lucide/astro**: Icon library
- **Astro v6** with React integration (for Keystatic only)
