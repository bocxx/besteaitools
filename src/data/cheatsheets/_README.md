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
