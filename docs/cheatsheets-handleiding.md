# Cheatsheets — handleiding

Hoe je merkgebonden cheatsheet-posters (PNG) maakt voor debesteaitools.nl, in de
huisstijl ("Deep Space Nebula" — coral, teal, indigo op bijna-zwart, met een
gelaagde achtergrond en blauwdruk-raster).

Er zijn twee manieren:

1. **Met Claude / de skill** — je zegt "maak een cheatsheet over X" en het gaat
   vanzelf. Zie [§7](#7-met-claude-de-skill).
2. **Handmatig, zonder Claude** — je schrijft zelf een klein JSON-bestand en
   draait één commando. Zie [§2](#2-snelstart-3-stappen). Dit is de kern van
   deze handleiding.

> **Kosten:** geen. De render draait 100% lokaal (satori + resvg). Er wordt
> nooit een API aangeroepen.

---

## 1. Waar alles staat

| Onderdeel | Pad |
|---|---|
| Render-engine | `scripts/generate-cheatsheet.ts` |
| Thema/kleuren | `scripts/lib/cheatsheet-theme.ts` |
| Jouw databestanden | `src/data/cheatsheets/<slug>.json` |
| Schema-spiekbrief | `src/data/cheatsheets/_README.md` |
| Output-posters | `public/cheatsheets/<slug>.png` (gitignored, regenereerbaar) |
| npm-commando | `generate-cheatsheet` (in `package.json`) |
| Fonts | `src/assets/fonts/` (Inter + Space Grotesk) |
| Radar-data (autofill) | `src/data/reports/ai_tools_radar.json` |

De **databestanden** zijn de bron van waarheid en gaan mee in git. De PNG's niet
— die maak je elk moment opnieuw met één commando.

---

## 2. Snelstart (3 stappen)

```bash
cd ~/Projects/DEPLOYED/debesteaitools.nl.ai
```

**Stap 1 — maak een databestand.** Kopieer een voorbeeld en pas het aan:

```bash
cp src/data/cheatsheets/prompt-tips.json src/data/cheatsheets/mijn-cheatsheet.json
# open mijn-cheatsheet.json en pas "slug", "title" en de inhoud aan
```

**Stap 2 — render.**

```bash
npm run generate-cheatsheet -- mijn-cheatsheet
```

**Stap 3 — bekijk.** De poster staat in `public/cheatsheets/mijn-cheatsheet.png`.
Klaar. Geen Claude nodig.

> Eerste keer: draai eerst `npm install` als je dat nog niet had gedaan (de
> engine gebruikt `satori`, `@resvg/resvg-js` en `tsx`, die staan al in
> `package.json`).

---

## 3. De commando's

Alle commando's draai je vanuit de repo-root (`~/Projects/DEPLOYED/debesteaitools.nl.ai`).

```bash
# Render ALLE bestanden in src/data/cheatsheets/
npm run generate-cheatsheet

# Render één bestand (zonder .json)
npm run generate-cheatsheet -- prompt-tips

# Render een los bestand buiten de map
npm run generate-cheatsheet -- pad/naar/eigen.json

# Schrijf de PNG naar een andere map (bv. om als OG-image te gebruiken)
npm run generate-cheatsheet -- prompt-tips --out public/og
```

- Bestanden die met `_` beginnen (zoals `_README.md`) worden overgeslagen.
- Output-naam = het `slug`-veld in de JSON, of anders de bestandsnaam.
- De posterhoogte groeit automatisch mee met de inhoud; je hoeft niets te rekenen.

---

## 4. De vier layouts

Elke cheatsheet is één JSON-bestand met een `type`. Hieronder per type de velden
en een werkend voorbeeld. De volledige schema-spiek staat in
`src/data/cheatsheets/_README.md`.

### Gedeelde velden (alle types)

| Veld | Verplicht | Uitleg |
|---|---|---|
| `type` | ✅ | `tool-grid` · `laws` · `steps` · `comparison` |
| `title` | ✅ | Grote kop |
| `slug` | — | Output-bestandsnaam |
| `subtitle` | — | Ondertitel onder de kop |
| `eyebrow` | — | Badge rechtsboven (standaard `Cheatsheet`) |
| `accent` | — | Hex-accentkleur, bv. `"#00c0b0"` (standaard coral `#ff5171`) |
| `footnote` | — | Tekst linksonder |
| `width` | — | Breedte in px (standaard `1200`) |

Merkkleuren die je voor `accent` kunt gebruiken: coral `#ff5171`, teal `#00c0b0`,
indigo `#7290fa`, amber `#f38300`, groen `#3cc998`.

### 4.1 `tool-grid` — categorieën met tool-lijstjes

Voor overzichten zoals "AI-tools per categorie". Handmatig óf automatisch gevuld
uit de radar.

```json
{
  "slug": "ai-tools-per-categorie",
  "type": "tool-grid",
  "title": "AI-tools per categorie",
  "subtitle": "De tools met de meeste buzz nu.",
  "columns": 4,
  "groups": [
    { "title": "Chatbots", "accent": "#ff5171", "items": ["ChatGPT", "Claude", "Gemini"] },
    { "title": "Beeld",    "accent": "#7290fa", "items": ["Midjourney", "Flux", "Ideogram"] }
  ]
}
```

**Automatisch vullen uit de radar** (in plaats van of naast `groups`):

```json
{
  "slug": "ai-tools-per-categorie",
  "type": "tool-grid",
  "title": "AI-tools per categorie",
  "autofill": {
    "source": "radar",
    "categories": ["tekst", "coding", "beeld", "video"],
    "perCategory": 6,
    "minBuzz": 1
  }
}
```

Radar-categoriesleutels: `tekst, infra, coding, automatisering, beeld, video,
zoeken, productiviteit, spraak, website, design, muziek, marketing`. Staat er
zowel `groups` als `autofill`, dan wint `groups`.

### 4.2 `laws` — genummerde tips in fases (met goed/fout-voorbeelden)

Voor tip-posters zoals "regels voor betere prompts". 3 kaarten per rij.

```json
{
  "slug": "prompt-tips",
  "type": "laws",
  "title": "9 regels voor betere AI-prompts",
  "sections": [
    {
      "title": "Fase 1 — Vóór de prompt",
      "accent": "#ff5171",
      "cards": [
        {
          "n": 1,
          "title": "Wees direct",
          "body": "Zeg precies wat je wilt.",
          "poor": "Help me hiermee.",
          "strong": "Schrijf 5 bullets met de kernpunten uit dit rapport."
        }
      ]
    }
  ]
}
```

`n`, `body`, `poor`, `strong` zijn allemaal optioneel. `poor` wordt een rood
"Zwak"-blokje, `strong` een groen "Sterk"-blokje.

### 4.3 `steps` — verticaal stappenplan

```json
{
  "slug": "ai-tool-kiezen",
  "type": "steps",
  "title": "De juiste AI-tool kiezen in 5 stappen",
  "accent": "#00c0b0",
  "steps": [
    { "n": 1, "title": "Begin bij de taak", "body": "Schrijf op welk probleem je wilt oplossen." },
    { "n": 2, "title": "Check de radar", "body": "Kijk welke tools nú stijgen." }
  ]
}
```

### 4.4 `comparison` — vergelijkingstabel

Handmatig óf automatisch uit de radar (op tool-slug).

```json
{
  "slug": "chatbots-vergelijking",
  "type": "comparison",
  "title": "AI-chatbots naast elkaar",
  "headers": ["", "Claude", "ChatGPT", "Gemini"],
  "rows": [
    ["Prijs", "Gratis / Pro", "Gratis / Plus", "Gratis / Advanced"],
    ["Sterk in", "Lange teksten", "Breed", "Google-integratie"]
  ]
}
```

**Automatisch uit de radar:**

```json
{
  "slug": "chatbots-vergelijking",
  "type": "comparison",
  "title": "AI-chatbots naast elkaar",
  "autofill": {
    "source": "radar",
    "slugs": ["claude", "chatgpt", "gemini"],
    "metrics": ["category", "buzz", "trend", "mentions", "sources"]
  }
}
```

Beschikbare `metrics`: `category, buzz, trend, mentions, sources`. Tool-slugs
vind je in `src/data/reports/ai_tools_radar.json` (veld `slug`). `headers`/`rows`
winnen van `autofill`.

---

## 5. Tips voor een mooi resultaat

- **Titellengte:** houd 'm onder ~34 tekens voor de grootste kopgrootte; langer
  schaalt automatisch terug.
- **Aantal items:** een `tool-grid` met 9+ categorieën pakt vanzelf 4 kolommen.
  Forceer met `"columns": 3`.
- **Ander formaat:** `"width": 1080` geeft een vierkanter social-formaat (hoogte
  blijft automatisch).
- **Accent per blok:** geef een `groups`/`sections`-item een eigen `accent` om
  kleuren te variëren.
- **Itereren:** pas de JSON aan en draai het commando opnieuw — de PNG wordt
  overschreven.

---

## 6. Probleemoplossing

| Symptoom | Oorzaak / oplossing |
|---|---|
| `esbuild`/architectuurfout bij `npm run …` | `node_modules` is op een ander OS geïnstalleerd. Draai `rm -rf node_modules && npm install` op deze machine. |
| Lege/zwarte poster of font-fout | Fonts ontbreken. Controleer dat `src/assets/fonts/` de 4 `.ttf`-bestanden bevat (inter-regular/semibold/bold + space-grotesk-bold). |
| `tool-grid … has no groups` | Geen `groups` én geen werkende `autofill`. Vul een van beide; check de categoriesleutels. |
| `comparison … needs headers+rows` | Geen `headers`/`rows` én geen `autofill`. Vul een van beide; check dat de slugs in de radar bestaan. |
| Autofill is leeg | `ai_tools_radar.json` ontbreekt of staat op een ander pad. Dit bestand komt uit de newsflux-pipeline (`npm run sync-tools` haalt 'm op). |
| JSON-fout | Let op komma's en aanhalingstekens. Plak je JSON in een validator als je twijfelt. |

---

## 7. Met Claude (de skill)

Naast handmatig kun je het ook aan Claude/Cowork vragen. De skill heet
**`dbat-cheatsheet`** en triggert op zinnen als:

> "Maak een cheatsheet over [onderwerp]"
> "Cheatsheet voor debesteaitools: vergelijk Claude, ChatGPT en Gemini"
> "Overzichtsplaat van de beste beeld-AI-tools"

Claude bedenkt de inhoud, schrijft het JSON-bestand naar
`src/data/cheatsheets/`, draait het render-commando en laat je de PNG zien.
Onder water gebeurt precies wat in deze handleiding staat — dus je kunt het
altijd zelf overnemen of bijstellen.

De skill installeer/bekijk je via **Instellingen → Capabilities** (de bundel
heet `dbat-cheatsheet.skill`).

---

## 8. Samengevat

```bash
# 1. databestand maken (kopieer een voorbeeld)
cp src/data/cheatsheets/prompt-tips.json src/data/cheatsheets/mijn.json

# 2. inhoud aanpassen in mijn.json  (zie §4 voor de velden)

# 3. renderen
npm run generate-cheatsheet -- mijn

# 4. resultaat: public/cheatsheets/mijn.png
```

Dat is alles. Lokaal, gratis, herhaalbaar.
