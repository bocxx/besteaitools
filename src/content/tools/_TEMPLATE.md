# Tool-content kwaliteitsbar

Een tool-detailpagina moet zich onderscheiden van een generieke lijstsite.
Iedere niet-draft tool **moet** vier dingen leveren waar geen LLM-blurb
uitkomt zonder de tool echt te kennen:

| # | Veld | Vraag die het beantwoordt |
|---|------|---------------------------|
| 1 | `verdict` | Wat is óns redactionele oordeel — wat doet deze tool *uniek* goed of slecht? |
| 2 | `primaryJobsToBeDone` | Welke concrete taak doe je morgen met deze tool? |
| 3 | `bestAlternative` | Wat is de beste vervanger? |
| 4 | `antiUseCases` | Wanneer kies je deze tool *niet*? |

Status (laatste audit): **17 / 110 tools** halen alle vier. Doel: 100%.

---

## Field-by-field

### `headlineValueProp` *(string, optioneel maar gewenst)*
Eén korte zin boven de H1 — de "claim" van het bedrijf, vertaald naar
gebruikerstaal. Geen marketingtaal, geen adjectieven.

- ✗ "De toonaangevende AI-klantenservice oplossing"
- ✓ "AI-agent die klantvragen via chat, mail en telefoon beantwoordt"

### `longDescription` *(string, ~80–160 woorden)*
Wat doet de tool feitelijk. Vermijd boilerplate ("biedt verschillende
functies zoals codesuggesten, foutopsporing"). Refereer aan de echte
positionering en differentiator.

- ✗ "v0 is een AI-tool die ontwikkelaars ondersteunt bij het coderen…"
- ✓ "v0 van Vercel zet een prompt om in volledig werkende React/shadcn UI-componenten…"

### `verdict` *(string, ~40–80 woorden)*
Het **redactionele oordeel** — niet wat de tool zelf claimt, maar wat
wij vinden na gebruik en marktobservatie. Eén stelling + één nuance.

Voorbeelden uit de huidige set:
- *Ada*: "Ada is een van de sterkste enterprise AI-klantenservice platforms… De prijs en implementatietijd zijn een drempel voor kleinere bedrijven."
- *Character.AI*: "Uniek als sociaal AI-entertainment platform — nergens anders zoveel community-personages. Meer entertainment dan productiviteit, maar dominant in zijn niche."

### `whyListed` *(string, ~25–60 woorden)*
Waarom staat dit op debesteaitools.nl. Marktpositie, adoptie of
specifieke reden van inclusie. Niet gelijk aan `verdict`.

### `primaryJobsToBeDone` *(string[], 2–4 items)*
Concrete taken in werkwoord-vorm — geen feature-lijst, geen jargon.

- ✗ "AI-functionaliteit", "Automatisering", "Productiviteit"
- ✓ "Klantvragen automatisch beantwoorden via chat, email en telefoon"
- ✓ "React/shadcn UI-componenten genereren uit een prompt"

### `antiUseCases` *(string[], 2–3 items)*
Wanneer kies je deze tool **niet**. Dit is wat de gebruiker vertrouwen geeft
dat het advies eerlijk is.

- ✓ "Kleine bedrijven met beperkt budget"
- ✓ "Teams zonder developer voor de setup"
- ✓ "Workloads die geen US-data verwerking toestaan"

### `bestAlternative` *(slug, verplicht)*
Eén slug van een tool die op debesteaitools.nl staat. Liefst een
serieuze concurrent in dezelfde fase, niet altijd "ChatGPT".

### `mentionAliases` *(string[], optioneel)*
Voor het stats-relevance filter. Vul aan als de tool onder andere
namen wordt genoemd in nieuws/social.

- *DALL-E* → `["dalle", "dall e"]`
- *Stable Diffusion* → `["sd", "stable-diffusion"]`

---

## JSON-skelet voor een nieuwe tool

```json
{
  "name": "Toolnaam",
  "category": "coding",
  "websiteUrl": "https://example.com",
  "shortDescription": "Eén-regel pitch — verschijnt in cards.",
  "headlineValueProp": "Concrete waarde-claim — verschijnt boven H1.",
  "longDescription": "80–160 woorden specifieke beschrijving die de echte positionering benoemt, niet generieke AI-blurb.",
  "verdict": "40–80 woorden redactioneel oordeel met één stelling + één nuance.",
  "whyListed": "25–60 woorden waarom op de site staat — marktpositie of adoptie.",
  "bestFor": "Eén regel — voor wie het meest waardevol.",
  "primaryJobsToBeDone": [
    "Concrete taak 1 in werkwoord-vorm",
    "Concrete taak 2 in werkwoord-vorm"
  ],
  "antiUseCases": [
    "Wanneer NIET kiezen — situatie 1",
    "Wanneer NIET kiezen — situatie 2"
  ],
  "useCases": ["Specifieke scenario 1", "Specifieke scenario 2"],
  "strengths": ["Specifiek sterk punt 1", "Specifiek sterk punt 2"],
  "limitations": ["Concrete beperking 1", "Concrete beperking 2"],
  "bestAlternative": "concurrent-slug",
  "mentionAliases": [],
  "pricing": "Korte concrete prijsinfo, geen 'neem contact op'.",
  "pricingModel": "freemium",
  "difficulty": "intermediate",
  "openSource": false,
  "tags": [],
  "draft": false
}
```

---

## LLM-prompt voor batch-enrichment

Gebruik deze prompt wanneer je via Claude / GPT velden voor bestaande
tools wil aanvullen. Plak de huidige JSON erbij plus 1-2 echte bronnen
(productpagina, recensie). De prompt is bewust streng om generieke
output te voorkomen.

```
Je vult ontbrekende velden aan voor een Nederlandstalige AI-tool directory.

KWALITEITSREGELS:
1. Geen marketingtaal ("toonaangevend", "krachtig", "innovatief")
2. Geen generieke AI-blurb ("biedt verschillende functies zoals…")
3. Iedere uitspraak moet specifiek zijn voor *deze* tool — als je het
   ook over de concurrent kunt zeggen, herschrijf het
4. `verdict` moet één stelling + één nuance bevatten
5. `antiUseCases` zijn echte situaties, geen "voor iedereen die geen
   AI wil"
6. Alle velden in het Nederlands, "jij"-vorm, geen "u"

INPUT:
{huidige tool JSON}
{1-2 echte bronnen: productpagina, review, of nieuwsartikel}

OUTPUT (alleen geldige JSON, alleen velden die nog ontbreken of
duidelijk te generiek zijn):
{
  "headlineValueProp": "...",
  "verdict": "...",
  "primaryJobsToBeDone": [...],
  "antiUseCases": [...],
  "bestAlternative": "..."
}
```

---

## Audit-commando

Te draaien vanuit project root om de fill-rate te checken na een batch:

```bash
node -e "
const fs=require('fs'),p=require('path');
const dir='src/content/tools';
let total=0,ok=0;
for(const f of fs.readdirSync(dir).filter(x=>x.endsWith('.json'))){
  const t=JSON.parse(fs.readFileSync(p.join(dir,f),'utf8'));
  if(t.draft)continue;total++;
  if(t.verdict?.length>30&&t.primaryJobsToBeDone?.length>0&&t.bestAlternative&&t.antiUseCases?.length>0)ok++;
}
console.log(\`Tools meeting quality bar: \${ok}/\${total} (\${(ok/total*100).toFixed(0)}%)\`);
"
```
