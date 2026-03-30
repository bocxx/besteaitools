# debesteaitools.nl

**De beste AI-tools op een rij** — een Nederlandstalige AI-tools radar die 48+ tools trackt met live statistieken.

## Wat doet dit project?

debesteaitools.nl is een open AI-tools directory voor de Nederlandse markt. De site rankt AI-tools op basis van **buzz score**, **velocity** (groeisnelheid), **mentions** en **fase** (opkomend → piek → blijver). Alle data komt uit de [newsflux](https://github.com/) pipeline die continu nieuwsbronnen, Reddit, GitHub, Hacker News, ArXiv en meer scant.

### Kernfuncties

- **AI Tools Radar** — overzichtspagina met filters op categorie, fase en prijsmodel
- **Tool-detailpagina's** — per tool: beschrijving, scores, trend-sparkline, bronartikelen, GitHub-repos
- **Weekradar** — wekelijkse highlights: tool van de week, stijgers, dalers, nieuwkomers
- **Vergelijkingen** — automatisch gegenereerde "X vs Y" vergelijkingspagina's voor top tools
- **RSS-feed** — voor abonnees die updates willen volgen
- **Keystatic CMS** — admin UI op `/keystatic` voor redactioneel beheer van tool-content

### Hoe werkt het?

```
newsflux pipeline          sync-tools            Astro build
─────────────────         ─────────────         ─────────────
Scant 8+ bronnen  ──→  ai_tools_radar.json  ──→  Merged Tool
(Twitter, Reddit,       (buzz, velocity,        (content + stats)
 GitHub, HN, etc.)       phase, sources)              │
                              │                       ▼
                              ▼                  Statische site
                     sync-tools-content.ts       op Cloudflare
                     (maakt draft JSONs +
                      enrichment diffs)
```

1. **newsflux** genereert `ai_tools_radar.json` met stats per tool
2. `npm run sync-tools` maakt nieuwe tool JSON-bestanden (als drafts) en genereert enrichment diffs
3. `tools-engine.ts` mergt redactionele content (JSON) met stats at build time
4. Pagina's gebruiken `getAllTools()`, `getSectionedTools()`, etc. om merged data op te vragen

## Tech stack

- **Framework**: [Astro](https://astro.build/) v6 (SSG + Cloudflare adapter)
- **Taal**: TypeScript
- **CMS**: [Keystatic](https://keystatic.com/) (lokale JSON bestanden)
- **Hosting**: Cloudflare Pages
- **Styling**: Custom CSS met design tokens (Ember thema), geen CSS framework
- **Iconen**: Lucide
- **Validatie**: Zod schemas (`tools-schema.ts`)
- **Data pipeline**: newsflux (extern Python project)

## Projectstructuur

```
src/
  pages/
    index.astro              # Landing page
    ai-tools.astro           # AI Tools Radar overzicht
    ai-tools/[slug].astro    # Tool-detailpagina's
    weekradar.astro          # Wekelijkse highlights
    rss.xml.ts               # RSS feed
  components/
    atoms/                   # Badge, PhaseBadge, ScoreMeter
    molecules/               # ToolCard, ToolSection, Card
    layout/                  # Grid, GridContainer, GridItem
  lib/
    tools-schema.ts          # Single source of truth: categorieën, fases, Zod schemas
    tools-engine.ts          # Data layer: laadt content + stats, mergt, queries
  types/
    tools-domain.ts          # TypeScript interfaces
  config/
    site.ts                  # Site-identiteit, navigatie, social links
  content/
    tools/*.json             # Redactionele tool-data (via Keystatic CMS)
  data/
    reports/
      ai_tools_radar.json    # Stats van newsflux pipeline
      enrichment_diff.json   # Voorgestelde verrijkingen
  styles/
    00-tokens.css            # Design tokens (Ember thema)
    main.css                 # CSS entry point
scripts/
  sync-tools-content.ts      # ETL: newsflux radar → tool JSONs
```

## Categorieën

Huidige categorieën (gedefinieerd in `tools-schema.ts`):

- **Chatbots** — Algemene AI-assistenten (ChatGPT, Claude, Gemini)
- **Coding** — AI voor developers (Cursor, Copilot, Cline)
- **Automatisering** — Workflow-tools en AI-agents (n8n, CrewAI, Dify)
- **Beeld** — AI-beeldgeneratie (Midjourney, DALL-E, Flux)
- **Video** — AI-video (Sora, Runway, Kling)
- **Audio** — Transcriptie en spraak (Whisper, ElevenLabs)
- **Zoeken** — AI-zoekmachines (Perplexity)
- **Productiviteit** — Dagelijkse AI-tools voor kenniswerk
- **Infrastructuur** — Modellen en platforms (Hugging Face, Ollama, Groq)

## Datamodel

Twee lagen die at build time worden samengevoegd:

- **ToolContent** (redactioneel) — naam, categorie, beschrijving, use cases, prijzen. Beheerd via Keystatic, nooit overschreven door ETL.
- **ToolStats** (dynamisch) — buzz score, velocity, mentions, fase, bronnen, GitHub stars. Wordt elke newsflux-run ververst.

De merge levert een `Tool` DTO op dat pagina's en componenten gebruiken.

## Commando's

```bash
npm run dev          # Dev server op :4321
npm run build        # Productie-build → dist/
npm run preview      # Preview productie-build
npm run sync-tools   # Sync tools van newsflux radar → content + enrichment diffs
```

## Slug-conventie

- Slugs komen van bestandsnamen — geen `slug` veld in JSON
- Bestandsnamen gebruiken **koppeltekens**: `adobe-firefly.json`, `claude-code.json`
- newsflux stats kunnen **spaties** in slugs hebben — `tools-engine.ts` normaliseert beide richtingen
- URLs: `/ai-tools/adobe-firefly`

## Design systeem

**Thema: Ember** — minimalistisch donker palet met warme accenten.

- Kleuren in oklch, fluid typography, spacing scale
- Fonts: Space Grotesk (display), Inter (body), JetBrains Mono (mono)
- Glassmorphism via `backdrop-filter: blur(12px)`
- CSS layers: `tokens → animations → reset → base → components → specialized → atmospherics → utilities`
