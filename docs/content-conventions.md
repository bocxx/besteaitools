# Content conventions

Geverifieerd tegen `src/content.config.ts`, `src/content/tools/_TEMPLATE.md`, `src/lib/nieuws-schema.ts`, `src/lib/tools-schema.ts` (mei 2026).

## Slug-regels

Globale regel: **slug = bestandsnaam, geen `slug` veld in frontmatter/JSON**.

| Collection | Bestandspatroon | Slug | Voorbeeld URL |
|---|---|---|---|
| tools | `src/content/tools/<slug>.json` | kebab-case | `/ai-tools/adobe-firefly` |
| nieuws | `src/content/nieuws/<slug>.md` | kebab-case | `/nieuws/claude-vs-chatgpt-vergelijking-2026` |
| digest | `src/content/digest/<slug>.md` | (newsflux-format) | `/digest/<slug>` |

## Tool quality bar

Bron: [src/content/tools/_TEMPLATE.md](../src/content/tools/_TEMPLATE.md).

**Een tool mag pas niet-draft (live) zijn als alle 4 redactionele velden ingevuld zijn:**

| # | Veld | Vraag |
|---|---|---|
| 1 | `verdict` | Wat is óns redactionele oordeel? Wat doet deze tool *uniek* goed of slecht? |
| 2 | `primaryJobsToBeDone` | Welke concrete taak doe je morgen met deze tool? |
| 3 | `bestAlternative` | Wat is de beste vervanger? |
| 4 | `antiUseCases` | Wanneer kies je deze tool *niet*? |

Status volgens template (laatste audit): **17/110 tools** halen alle vier. Doel: 100%.

### Schrijfregels per veld

**`headlineValueProp`** — één korte zin boven H1, claim van bedrijf in gebruikerstaal. Geen marketingtaal.
- ✗ "De toonaangevende AI-klantenservice oplossing"
- ✓ "AI-agent die klantvragen via chat, mail en telefoon beantwoordt"

**`longDescription`** (~80–160 woorden) — wat de tool feitelijk doet. Vermijd boilerplate. Geef positionering en differentiator.

**`verdict`** (~40–80 woorden) — redactioneel oordeel. Eén stelling + één nuance.

**`whyListed`** (~25–60 woorden) — waarom op debesteaitools.nl. Marktpositie of inclusie-reden. Niet gelijk aan `verdict`.

**`primaryJobsToBeDone`** (2–4 items) — concrete taken in werkwoord-vorm.
- ✗ "AI-functionaliteit", "Productiviteit"
- ✓ "Klantvragen automatisch beantwoorden via chat, email en telefoon"

**`antiUseCases`** (2–3 items) — wanneer kies je 'm niet. Geeft eerlijkheids-signaal.

Volledige veldlijst (~33 velden) staat in [src/lib/tools-schema.ts](../src/lib/tools-schema.ts).

## Nieuws categorieën

Uit [src/lib/nieuws-schema.ts](../src/lib/nieuws-schema.ts):

| Slug | Label | Wanneer |
|---|---|---|
| `lancering` | Lancering | Nieuwe tool / product launch |
| `update` | Update | Feature- of pricing-update bestaande tool |
| `analyse` | Analyse | Diepgaande analyse |
| `vergelijking` | Vergelijking | Tool A vs Tool B |
| `gids` | Gids | How-to / handleiding |
| `nieuws` | Nieuws | Algemeen AI-nieuws |

Default: `nieuws`. Elke categorie heeft eigen kleur via CSS-vars.

### Nieuws frontmatter (verplicht)

```yaml
title: "..."
description: "..."
publishedAt: 2026-05-05
```

### Optioneel maar gewenst

```yaml
updatedAt: 2026-05-06
author: "Redactie"
category: lancering
tags: [claude, anthropic]
toolSlug: claude-code      # link naar tool-detailpagina
featured: false
draft: false
heroImage: /images/...
readingTime: 4
keyTakeaways:
  - "..."
faq:
  - q: "..."
    a: "..."
```

## Digest schema (mirror van hetlaatsteainieuws.nl)

Het digest-schema in [src/content.config.ts](../src/content.config.ts) is bewust gespiegeld aan hetlaatsteainieuws.nl zodat helpers gedeeld kunnen worden.

**Verplichte velden:**
```yaml
title: "..."
description: "..."
date: 2026-05-05
```

**Default `timeSlot`:** `'tools-digest'` (anders dan hln, dat heeft ochtend/middag/avond).

**Structured frontmatter arrays** (nieuw schema, optioneel voor backwards-compat):

```yaml
launches:
  - name: "..."
    summary_nl: "..."
    url: "..."
    source_type: "twitter"
    source_label: "..."
    confidence: hoog        # hoog | medium | laag
    favicon: ...

updates:
  - tool_name: "..."
    tool_slug: "..."        # link naar /ai-tools/<slug>
    feature_title: "..."
    summary_nl: "..."
    impact: medium
    url: "..."
    confidence: medium
    platforms: [web, ios]
    key: "..."

deepDives:
  - title: "..."
    summary_nl: "..."
    url: "..."
    tool: "..."             # optioneel
    trend_phase: "..."      # optioneel
    score: 0.82             # optioneel

keySignals:
  - "..."
```

**Counts** (worden door generator gevuld): `launchesCount`, `updatesCount`, `deepDivesCount`, `totalAnalyzed`, `itemsSelected`, `categoriesCount`, `featured[]`.

**Body**: alleen redactionele noot. Cards worden uit de arrays gerenderd, niet uit body. Oude digests zonder arrays vallen terug op markdown body — beide schemas blijven valid.

## Cross-domain links

debesteaitools.nl en hetlaatsteainieuws.nl zijn **bewust gekoppeld**:
- Digest-schema is identiek (`date` + `timeSlot`)
- Artikelen op hetlaatsteainieuws.nl mogen interlinks hebben naar `/ai-tools/<slug>` op debesteaitools.nl bij relevante tools (en vice versa)
- De `hln-nieuws-article` skill heeft cross-domain linkbuilding ingebouwd

Voor je een nieuw artikel publiceert dat een tool noemt: check of die tool bestaat op debesteaitools.nl. Zo ja, link erheen.

## Keystatic CMS

Alleen in dev: `localhost:4321/keystatic`. Beheer:
- Tool-content (`src/content/tools/AITools/`)
- Andere collections via tabs

⚠️ Keystatic schrijft naar lokale bestanden. Wijzigingen committen + pushen voor ze live komen.

## Drafts

- `draft: true` in tool-JSON → niet gerenderd
- `draft: true` in nieuws/digest frontmatter → niet gerenderd
- `sync-tools` maakt nieuwe tools als drafts — moeten handmatig op `false` gezet worden na redactie
