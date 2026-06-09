# Cheatsheets — databestanden

Elk `.json`-bestand in deze map (behalve bestanden die met `_` beginnen) wordt
door `npm run generate-cheatsheet` gerenderd tot een merkgebonden portret-poster
PNG in `public/cheatsheets/<slug>.png`. Stijl = de actieve "Deep Space Nebula"
huisstijl (coral primary, teal/indigo accenten, Inter + Space Grotesk).

```bash
npm run generate-cheatsheet                          # alle bestanden
npm run generate-cheatsheet -- prompt-tips           # één (zonder .json)
npm run generate-cheatsheet -- pad/naar/eigen.json   # los bestand
npm run generate-cheatsheet -- prompt-tips --out public/og   # andere outputmap
```

## Gedeelde velden

| Veld | Verplicht | Uitleg |
|---|---|---|
| `type` | ✅ | `tool-grid` · `laws` · `steps` · `comparison` |
| `title` | ✅ | Grote kop (Space Grotesk) |
| `slug` | — | Bestandsnaam van de output; valt terug op de JSON-bestandsnaam |
| `subtitle` | — | Ondertitel onder de kop |
| `eyebrow` | — | Badge rechtsboven (standaard `Cheatsheet`) |
| `accent` | — | Hex-accent, bv. `"#00c0b0"` (standaard coral `#ff5171`) |
| `footnote` | — | Tekst linksonder (standaard `AI Tools Radar · Nederland`) |
| `width` | — | Posterbreedte in px (standaard `1200`; hoogte groeit automatisch) |
| `hero` | — | Optionele AI-hero-strip bovenaan. Zie hieronder. |

## Hero-strip (optioneel, AI-beeld bovenaan)

De render zelf is **gratis en lokaal** — hij raakt nooit een API. Een hero-strip
is een los gegenereerd beeld dat de engine als bovenband composit als het bestaat.

- **Weglaten** → engine zoekt automatisch `public/cheatsheets/heroes/<slug>.png`
  (of `.jpg`). Bestaat die niet, dan rendert de poster gewoon zonder hero.
- `"hero": { "image": "pad/naar/beeld.png" }` → gebruik dit bestand.
- `"hero": { "height": 360 }` → bandhoogte in px (standaard ~27% van de breedte).
- `"hero": false` → nooit een hero, ook al staat er een bestand.

⚠️ **Alleen PNG/JPEG** — satori kan geen WebP inbedden.

### Het hero-beeld genereren (kost Leonardo-tokens — aparte stap)

Dit is de **enige** stap die geld kost. Hij zit bewust níet in
`generate-cheatsheet`. Draai vanuit de `newsflux`-repo:

```bash
cd ~/Projects/DEPLOYED/newsflux && source venv/bin/activate
python3 src/digest/cheatsheet_hero.py --slug prompt-tips \
    --title "9 regels voor betere AI-prompts" --topic prompting
# → schrijft ~/Projects/DEPLOYED/debesteaitools.nl.ai/public/cheatsheets/heroes/prompt-tips.png
```

Kostenremmen: cachet per slug (bestaat het beeld al → géén API-call, tenzij
`--force`), en een token-balans-drempel (`leonardo_token_min_balance` uit config)
slaat generatie over bij te weinig tegoed. `--dry-run` toont alleen de prompt,
zonder kosten. Daarna `npm run generate-cheatsheet -- <slug>` om de poster mét
hero te renderen.

## 1. `tool-grid` — categorieën met tool-lijstjes

```jsonc
{
  "type": "tool-grid",
  "title": "AI-tools per categorie",
  "columns": 4,                       // optioneel; auto bij weglaten
  "groups": [                          // handmatig …
    { "title": "Chatbots", "accent": "#ff5171", "items": ["ChatGPT", "Claude"] }
  ],
  "autofill": {                        // … of automatisch uit de radar
    "source": "radar",
    "categories": ["tekst", "coding", "beeld"],   // radar-categoriesleutels
    "perCategory": 6,
    "minBuzz": 1
  }
}
```

`groups` en `autofill` mogen samen; `groups` wint. Radar-categoriesleutels:
`tekst, infra, coding, automatisering, beeld, video, zoeken, productiviteit,
spraak, website, design, muziek, marketing`.

## 2. `laws` — genummerde tips in fases (met poor/strong-voorbeelden)

```jsonc
{
  "type": "laws",
  "title": "9 regels voor betere AI-prompts",
  "sections": [
    {
      "title": "Fase 1 — Vóór de prompt",
      "accent": "#ff5171",
      "cards": [
        { "n": 1, "title": "Wees direct", "body": "…",
          "poor": "Help me hiermee.", "strong": "Schrijf 5 bullets …" }
      ]
    }
  ]
}
```

3 kaarten per rij. `n`, `body`, `poor`, `strong` zijn allemaal optioneel.

## 3. `steps` — verticaal stappenplan

```jsonc
{
  "type": "steps",
  "title": "AI-tool kiezen in 5 stappen",
  "steps": [
    { "n": 1, "title": "Begin bij de taak", "body": "…" }
  ]
}
```

## 4. `comparison` — tabel functie × tool

```jsonc
{
  "type": "comparison",
  "title": "AI-chatbots naast elkaar",
  "headers": ["", "Claude", "ChatGPT"],          // handmatig …
  "rows": [["Prijs", "Gratis", "$20/mnd"]],
  "autofill": {                                    // … of automatisch uit de radar
    "source": "radar",
    "slugs": ["claude", "chatgpt", "gemini"],
    "metrics": ["category", "buzz", "trend", "mentions", "sources"]
  }
}
```

Metrics: `category, buzz, trend, mentions, sources`. `headers`/`rows` winnen
van `autofill`.
