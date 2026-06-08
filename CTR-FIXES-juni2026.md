# debesteaitools — CTR-fixes (8 juni 2026)

Doel: meer kliks uit pagina's die al ranken (positie 6-15) maar nul kliks
krijgen. Hetzelfde patroon dat we op hetlaatsteainieuws.nl zagen, hier op veel
grotere schaal door de tool- en vergelijk-catalogus.

## Wat is aangepast (template-niveau = alle pagina's tegelijk)

**1. Vergelijk-pagina's gebruikten de zwakkere titel.** `src/pages/vergelijk/[comparison].astro`
hardcodeerde `"X vs Y — Vergelijking 2026 | debesteaitools.nl"` terwijl er al een
betere helper `comparisonMetaTitle` bestond met een klik-hook: `"X vs Y – Welke past
bij jou? (2026)"`. De pagina gebruikt nu de helper (titel én description). Eén fix,
alle vergelijk-pagina's beter.

**2. Tool-titel verspilde ruimte aan filler.** `toolMetaTitle` in `src/lib/seo-helpers.ts`
was `"X Review (2026) – [Categorie] AI Tool | debesteaitools.nl"`. Het stuk
"– [Categorie] AI Tool" voegt voor de zoeker niets toe. Nieuw:
`"X review (2026): prijzen, functies & alternatieven | debesteaitools.nl"` — front-loaded
met de commerciële modifiers die mensen daadwerkelijk intikken bij een tool-naam
("X prijs", "X alternatieven", "X review"). Raakt alle ~164 tool-pagina's.

## Eerlijke kanttekening

Voor hetlaatsteainieuws had ik per-pagina zoekwoord-data; voor debesteaitools gaf de
GSC-connector die niet betrouwbaar terug (hij koos zelf de property). Deze twee fixes
zijn dus gebaseerd op de page-snapshot + algemene zoek-intentie, niet op chirurgische
query-data. Het is een verdedigbare standaard-verbetering om te meten, geen precisie-
ingreep. Verwacht een geleidelijke CTR-stijging, geen explosie.

## Sectie-indexpagina's — TOEGEPAST ✅

Beide stonden op een goede positie met hoge impressies en nul kliks, en leidden met
interne jargon in plaats van zoektermen:

- `/radar/` (335 vert., pos 6,2): titel was "AI Tools Radar — Recent gelanceerd". Nu
  `"Nieuwe AI-tools {jaar}: recent gelanceerd & trending"` (en de rankings-view
  `"AI-tools rankings {jaar}: stijgers, dalers & nieuwkomers"`). Front-loadt "nieuwe AI-tools".
- `/nieuws/` (163 vert., pos 6,3): titel was "Nieuws over AI-tools — Artikelen + dagelijkse
  digests" ("digests" is jargon). Nu `"AI-tools nieuws {jaar}: lanceringen, updates &
  analyses"`. Front-loadt "AI-tools nieuws".

## Wat hierna het meeste oplevert (nog niet gedaan)

- **Tool-pagina's die laag ranken** (`/ai-tools/claude/` pos 48, `/ai-tools/perplexity/`
  pos 33, `/ai-tools/runway/` pos 34): dit is een ranking-probleem, geen CTR-probleem.
  Daar helpt interne links + content, niet de titel.
- **Per-query data:** zodra de GSC-koppeling betrouwbaar op debesteaitools te richten is,
  kan ik dezelfde chirurgische analyse draaien als op HLN.

## Uitrollen

Deze wijzigingen gaan live na een build + deploy van déze repo (debesteaitools.nl.ai),
niet die van hetlaatsteainieuws.
