# Deployment

Geverifieerd tegen `wrangler.toml`, `astro.config.mjs`, `package.json`, recente git log (mei 2026).

## Stack

- **Framework**: Astro v6 in `output: 'static'` mode
- **Adapter**: `@astrojs/cloudflare` (productie), niet in dev
- **Hosting**: Cloudflare Pages
- **Custom domains**: `debesteaitools.nl`, `www.debesteaitools.nl` (zie [wrangler.toml](../wrangler.toml))
- **Compatibility date**: 2026-03-27 met `nodejs_compat` flag
- **Observability**: enabled (Cloudflare metrics)
- **404**: `404-page` not_found_handling

## Build-stappen

`npm run build` is een 3-stappen pipeline (uit `package.json`):

```
1. npm run generate-og
   → tsx scripts/generate-og-images.ts
   → Genereert OG-images via Satori naar public/og/<slug>.png

2. node scripts/build-search-index.mjs
   → Bouwt Pagefind search-index voor client-side zoeken

3. astro build
   → Static build naar dist/
```

Cloudflare Pages serveert vervolgens `dist/`.

## Branches & deploy-flow

Geverifieerd uit `git log`:

- **`feat/tools-domain`** — huidige werkbranch (mei 2026)
- **`main`** — productie

**Auto-deploy commits** (zichtbaar in log):
- `Auto-deploy: content update` — komt van automatische sync (newsflux output → commit → push)
- `deploy` — handmatige push naar productie

**Cloudflare Pages git-integratie** triggert builds op push. Geen GitHub Actions in deze repo (`.github/` ontbreekt).

## Lokaal draaien

```bash
npm install         # eerste keer
npm run dev         # → http://localhost:4321
                    # Keystatic op http://localhost:4321/keystatic
```

In dev:
- Geen Cloudflare adapter (Astro default dev server)
- Keystatic CMS actief
- Hot module reload via Vite

## Productie-build testen

```bash
npm run build
npm run preview     # serveert dist/ lokaal voor productie-validatie
```

## Sync workflow (newsflux → site)

Uit [docs/data-pipeline.md](data-pipeline.md):

```bash
npm run sync-tools       # leest reports/, maakt drafts, update enrichment
npm run fetch-ph-stats   # refresh Product Hunt stats
```

Drafts moeten daarna redactioneel afgemaakt worden voor publicatie (`draft: false` + 4 quality-bar velden).

## Environment

`.env` (niet in git, geverifieerd aanwezig in root) — vermoedelijk API-keys voor:
- Product Hunt API
- Cloudflare bindings (worden via `wrangler.toml` gemount in productie)

`.dev.vars` ontbreekt op root maar staat wel in oude worktree — als je lokaal Cloudflare bindings wilt simuleren, maak deze aan op basis van `.dev.vars.example` (in worktree).

## Wat NIET committen

Uit `.claudeignore` + `.gitignore`:
- `node_modules/`
- `dist/`
- `.astro/` (Astro cache)
- `.wrangler/` (Cloudflare local state)
- `public/og-images/` (gegenereerd tijdens build)

⚠️ De OG-images in `public/og/` (zonder `-images`) **worden wel gecommit** — dat zijn de pre-rendered Satori output. `git status` toont momenteel ~30 modified `.png` files in `public/og/` van de laatste regeneratie.

## Cleanup-suggesties

Op basis van inspectie:

1. **`launchradar.json` (zonder underscore)** in `src/data/reports/` is uit april terwijl rest mei is. Mogelijk verouderd duplicaat van `launch_radar.json`. Check welke `tools-engine.ts` of pages laden voor verwijdering.
2. **OG-images regeneratie**: 30+ files modified maar niet gecommit. Beslis of dit batch moet worden meegecommit of dat de generator deterministisch genoeg is om in CI te draaien.
3. **`.claude/worktrees/unruffled-payne-7c9ab1/`** — oude worktree (april 23). Kandidaat voor `git worktree remove`.

## Belangrijk voor LLM-werkstroom

- **Test build voor je commit** als je bestanden raakt die merging beïnvloeden (`tools-engine.ts`, `tools-schema.ts`, schemas in `content.config.ts`).
- **Auto-deploy commits niet handmatig editen** — die patroon wordt door externe tooling gegenereerd.
- **Productie-domein in `astro.config.mjs`** is `https://debesteaitools.nl` (voor sitemap/canonical). Niet vergeten te updaten als domein verandert.
