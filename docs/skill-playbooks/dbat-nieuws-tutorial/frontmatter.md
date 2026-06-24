# Frontmatter schema

De DBAT nieuws-collection wordt gevalideerd door `src/content.config.ts` met een Zod-schema dat verwijst naar `src/lib/nieuws-schema.ts`. Dit document is de canonical reference voor wat de skill moet produceren.

## Het volledige schema (uit `src/content.config.ts`)

```ts
z.object({
  title: z.string(),
  description: z.string(),
  publishedAt: z.coerce.date(),
  updatedAt: z.coerce.date().optional(),
  author: z.string().default('Redactie'),
  category: nieuwsCategorySchema.default('nieuws'),  // enum, zie hieronder
  tags: z.array(z.string()).default([]),
  toolSlug: z.string().optional(),                    // optioneel in schema, verplicht in skill
  featured: z.boolean().default(false),
  draft: z.boolean().default(false),
  heroImage: z.string().optional(),
  readingTime: z.number().optional(),
  keyTakeaways: z.array(z.string()).optional(),
  faq: z.array(z.object({
    q: z.string(),
    a: z.string(),
  })).optional(),
})
```

## De category-enum (uit `src/lib/nieuws-schema.ts`)

```ts
nieuwsCategorySchema = z.enum([
  'lancering',    // Nieuwe tool die net uitkwam
  'update',       // Feature/pricing-update voor bestaande tool
  'analyse',      // Diepere analyse
  'vergelijking', // Tool-vergelijkingen
  'gids',         // How-to-gidsen (DEFAULT voor deze skill)
  'nieuws',       // Algemeen AI-nieuws
])
```

## Template voor micro-tutorial-artikel

```yaml
---
title: "Cursor BugBot instellen: van GitHub-koppeling tot eerste pull request"
description: "BugBot scant je pull requests automatisch op bugs. Zo koppel je hem aan je GitHub-repo in vier stappen, plus de regels die je in .cursorrules zet."
publishedAt: 2026-05-28
updatedAt: 2026-05-28
author: "Redactie"
category: "gids"
tags:
  - "cursor"
  - "bugbot"
  - "code-review"
  - "github"
  - "ai-editors"
toolSlug: "cursor"
featured: false
draft: false
readingTime: 4
heroImage: "/images/nieuws/cursor-bugbot-instellen.webp"
keyTakeaways:
  - "BugBot is een AI-code-reviewer in Cursor 1.0 die pull requests automatisch scant op bugs en suggesties als comments achterlaat."
  - "De setup is drie klikken in Cursor → Settings → Integrations, plus een GitHub-OAuth-flow van ongeveer 30 seconden."
  - "Je tunet BugBots gedrag met een `.cursorrules`-bestand in je project-root — dezelfde syntax als de andere Cursor-rules."
  - "BugBot werkt op Cursor Pro ($20/mnd) en hoger; op de gratis tier zit het niet."
  - "Eerste reactie op een PR komt typisch binnen 30-60 seconden — duurt het langer, is het bijna altijd een rate-limit of een ontbrekende GitHub-permissie."
faq:
  - q: "Wat is BugBot in Cursor?"
    a: "BugBot is een AI-code-reviewer die werd geïntroduceerd in Cursor 1.0 (april 2026). Hij koppelt aan je GitHub-repo, scant elke pull request op logicafouten, potentiële crashes en veelgemaakte fouten, en laat suggesties achter als comments. Je hoeft hem alleen eenmalig te koppelen — daarna draait hij op de achtergrond voor elke nieuwe PR."
  - q: "Hoe koppel ik Cursor aan GitHub?"
    a: "In de Cursor desktop-app open je Settings → Integrations → GitHub en klik je op Connect. Je wordt naar github.com gestuurd om de OAuth-flow af te ronden. Geef toestemming voor de specifieke repositories waar BugBot mag scannen — alles toestaan kan, maar per-repo is veiliger als je ook private of klantcode hebt."
  - q: "Werkt BugBot ook op de gratis tier van Cursor?"
    a: "Nee. BugBot zit op Cursor Pro en hoger. De gratis tier ($0/mnd) heeft alleen beperkte AI-verzoeken zonder de agentic-features waar BugBot op draait. Pro kost momenteel $20 per maand."
  - q: "Wat is het verschil tussen BugBot en GitHub Copilot's PR-reviewer?"
    a: "Copilot's PR-reviewer geeft inline-suggesties tijdens het schrijven van code; BugBot reviewt de complete PR pas wanneer je hem opent voor merge. Beide kunnen naast elkaar lopen — Copilot vangt typfouten tijdens schrijven, BugBot focust op logica en cross-file-effecten."
---
```

## Veld-voor-veld instructies

### `title` (verplicht, max ~95 tekens)

- Bevat de toolnaam vroeg
- Bevat het hoofd-werkwoord (instellen, gebruiken, koppelen, etc.)
- Eindigt op een belofte of scope ("in vier stappen", "zonder programmeerkennis")
- Geen jaartal tenzij datum-gebonden

Zie `seo.md` stap 4 voor patronen.

### `description` (verplicht, 140-160 tekens)

- Drie elementen: wat is het, voor wie, de belofte
- Eindigt op een haak of concrete uitkomst
- Bevat het hoofdzoekwoord (binnen eerste 100 tekens)

### `publishedAt` (verplicht, `YYYY-MM-DD`)

- Datum van vandaag bij eerste publicatie
- Schrijf als plain `YYYY-MM-DD` zonder quotes voor maximale compatibiliteit
- `z.coerce.date()` accepteert ook quoted strings, maar consistent format is beter

### `updatedAt` (optioneel, `YYYY-MM-DD`)

- Op dag 0: gelijk aan `publishedAt`
- Update later bij significante revisies (niet bij typo-fixes)

### `author` (default `"Redactie"`)

- 99% van de gevallen: `"Redactie"`
- Externe auteurs alleen bij expliciete byline-overeenkomst

### `category` (default `"nieuws"`, in deze skill `"gids"`)

- Default voor deze skill: `"gids"` (~80% van de gevallen)
- `"update"` voor recent gelanceerde features
- `"lancering"` voor allereerste artikel over een tool
- `"analyse"`, `"vergelijking"`, `"nieuws"` zelden voor micro-tutorials

### `tags` (verplicht, 4-7 items)

- Kebab-case (lowercase, hyphens, geen spaties)
- Eén tag is altijd de toolnaam (`"cursor"`, `"claude"`)
- 2-3 tags zijn feature/onderwerp (`"bugbot"`, `"code-review"`, `"github"`)
- 1-2 tags zijn breder (`"ai-editors"`, `"productiviteit"`)
- Max 7 — meer wordt rommelig in filtering

### `toolSlug` (verplicht in skill, optioneel in schema)

- **Exacte slug** van het bestand in `src/content/tools/<slug>.json` zonder `.json`
- Bestand moet bestaan vóór commit — check met `test -f src/content/tools/<slug>.json`
- Eén toolSlug per artikel (de hoofd-tool)
- Bij vergelijking-artikelen mag toolSlug van de "main" tool zijn, met de andere genoemd in tekst

### `featured` (default `false`)

- `true` alleen voor uitschieters waarvan je verwacht dat ze maandenlang traffic trekken
- Default voor dagelijkse tutorials: `false`
- Te veel featured: featured-strip op de site verliest betekenis

### `draft` (default `false`)

- Op publicatie: altijd `false`
- `true` alleen tijdens werk-in-uitvoering — moet voor commit op `false`

### `readingTime` (optioneel, integer)

- Voor micro-tutorials: 3-5
- Formule: woorden ÷ 200, naar boven afgerond
- 600 woorden → 3 min; 800 woorden → 4 min; 950 woorden → 5 min

### `heroImage` (optioneel maar aangeraden)

- Pad: `/images/nieuws/<slug>.webp`
- Bestand hoeft niet meteen te bestaan — DBAT genereert dynamisch een OG-image als fallback
- Bij echte hero-image: lever apart aan, of laat de OG-generator hem maken via build

### `keyTakeaways` (verplicht voor deze skill, 4-5 items)

- 4-5 bullets (geen 3, geen 6+)
- Elk 80-180 tekens
- Elk is een **feit** of **actie**, niet een algemene observatie
- Eerste twee zijn de belangrijkste — die zie je vaak alleen in previews

**Goed:**
> "BugBot werkt op Cursor Pro ($20/mnd) en hoger; op de gratis tier zit het niet."

**Niet:**
> "BugBot is een interessante feature voor moderne ontwikkelaars."

### `faq` (verplicht voor deze skill, 3-5 paren)

- 3-5 q/a-paren
- `q`: echte Google-query (zie `seo.md` stap 7)
- `a`: 40-120 woorden, direct, met praktische instructie
- Antwoorden in "jij"-vorm
- Eerste vraag is meestal de definitie-vraag ("Wat is X?")

### evergreen-velden (optioneel — alleen voor tijdloze gidsen)

Een `gids` die een blijvende vraag beantwoordt ("hoe gebruik je tool X") kun je als evergreen markeren, zodat de bederfelijke laag (prijzen, tiers, versies) apart onderhouden wordt. Géén `lancering`/`update`-stukken markeren — die zijn datum-gebonden. Volledige aanpak: `references/evergreen.md`. Het schema is niet `.strict()`, dus deze velden breken de build niet (Astro stript ze; de discipline en een latere detector lezen de ruwe frontmatter).

```yaml
evergreen: true            # alleen bij een tijdloze gids
volatility: high           # high | medium | low → review-cadans (30 | 90 | 180 dagen); tool-prijzen = high
factsCheckedAt: 2026-06-13  # wanneer de "Stand van zaken"-box voor het laatst is geverifieerd (date, niet quoten)
watch:                     # entiteiten die een review triggeren — meestal de tool zelf
  - "cursor-pricing"
```

## Wat NOOIT in de frontmatter of in het artikel mag staan

### Git-conflict-markers
```
<<<<<<< HEAD
=======
>>>>>>> branch
```
Build breekt onmiddellijk. Scan met:
```bash
grep -rn '^<<<<<<< \|^=======$\|^>>>>>>> ' src/content/nieuws/
```

### Werkproces-headers en placeholders
- `# 🎯 PULSE ENGINE`, `# 🔍 SEO: STRUCTURED DATA` — uit prompt-templates, hoort niet in productie
- `TODO`, `FIXME`, `XXX`, `lorem ipsum`, `placeholder`

### Onjuiste category-waardes
Buiten de enum (`lancering`, `update`, `analyse`, `vergelijking`, `gids`, `nieuws`) → Zod-fout → build-breuk.

### Verzonnen toolSlug
Als `src/content/tools/<slug>.json` niet bestaat, rendert de toolcard broken. Check vóór commit.

### Quoted YAML-datums
`publishedAt: "2026-05-28"` werkt, maar `publishedAt: 2026-05-28` is canoniek en parseert sneller. Consistent één stijl.

## YAML quoting — MUST READ vóór je frontmatter schrijft

De meest voorkomende build-breker is geen typo in een veldnaam maar een onbeschermde **dubbele punt** in een string-waarde. YAML interpreteert `key: value` als een mapping, dus zodra een bullet een `: ` (dubbele punt + spatie) bevat zonder quotes, parseert YAML het als een nested object — en Zod faalt met `InvalidContentEntryDataError: Expected type "string", received "object"`.

**Quote ALTIJD een string-waarde als hij één van deze patronen bevat:**

| Patroon | Voorbeeld dat breekt | Fix |
|---|---|---|
| `: ` (dubbele punt + spatie) | `- BugBot is exclusief: alleen Pro tier` | `"BugBot is exclusief: alleen Pro tier"` |
| `#` start van een woord | `- De #1 reden is...` | `"De #1 reden is..."` |
| Begint met `@`, `\`` , `\|`, `>`, `!`, `&`, `*`, `?`, `%`, `{`, `[` | `- @cursor noemde dit` | `"@cursor noemde dit"` |
| YAML reserved: `yes`, `no`, `true`, `false`, `null` | `- No, dat klopt niet` | `"No, dat klopt niet"` |

**Veilige defaults voor DBAT-frontmatter:**
- `title`, `description`, `heroImage` — **altijd** in dubbele quotes.
- `keyTakeaways[*]` en `faq[*].q` / `faq[*].a` — **altijd** in dubbele quotes, óók als de zin "veilig" lijkt. De kosten zijn nul, de voorkomen build-fouten zijn reëel.
- `category`, `toolSlug`, `tags[*]` — mogen zonder quotes (enkele kebab-case woorden).
- `publishedAt`, `updatedAt`, `readingTime`, `featured`, `draft` — nooit quoten (Zod coerced/typed).

## Snelle YAML-validatie

**Stap 1 — syntax-check:**

```bash
python3 -c "import yaml,sys; yaml.safe_load(open('src/content/nieuws/<slug>.md').read().split('---')[1])"
```

Geen output = OK. Foutmelding = fix voor commit.

**Stap 2 — array-string type-check** (vangt de onbeschermde-dubbele-punt fout in keyTakeaways/tags/faq):

```bash
python3 -c "
import yaml, sys
data = yaml.safe_load(open(sys.argv[1]).read().split('---')[1])
for f in ['keyTakeaways','tags']:
    for i, v in enumerate(data.get(f) or []):
        assert isinstance(v, str), f'{f}[{i}] is {type(v).__name__} — quote de string'
for i, v in enumerate(data.get('faq') or []):
    assert isinstance(v, dict) and isinstance(v.get('q'),str) and isinstance(v.get('a'),str), f'faq[{i}] kapot'
print('types OK')
" src/content/nieuws/<slug>.md
```

Slaagt deze check, dan slagen Zod's array-validators ook. Faalt hij, dan zou `astro build` falen met `Expected "string", received "object"` — fix de quoting voordat je verder gaat.

## Voorbeeldframontmatter per categorie

**`gids` (default):**

```yaml
category: "gids"
toolSlug: "claude"
tags: ["claude", "skills", "automatisering", "productiviteit", "mkb"]
```

**`update`:**

```yaml
category: "update"
toolSlug: "cursor"
tags: ["cursor", "bugbot", "release-notes", "code-review", "ai-editors"]
```

**`lancering`:**

```yaml
category: "lancering"
toolSlug: "zero-xyz"
featured: true   # vaak true voor launches
tags: ["zero-xyz", "agent-tools", "x402", "lancering", "ai-agents"]
```
