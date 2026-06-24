# SEO voor tool-tutorials

DBAT-tutorials concurreren in een specifieke niche: Nederlandstalige zoekopdrachten naar concrete tool-handelingen. "Cursor BugBot instellen", "Claude Cowork gebruiken", "Perplexity Comet alternatief". Dit document geeft de zoekwoord-strategie voor dat soort queries.

## Stap 1: Kies één hoofdzoekwoord vóór je schrijft

Het hoofdzoekwoord is bijna altijd opgebouwd uit twee elementen:

**[Toolnaam] + [werkwoord-of-doel]**

Voorbeelden:
- "Cursor BugBot instellen"
- "Claude skill maken"
- "Perplexity Comet gebruiken"
- "Notion AI prompts"
- "Midjourney v7 stijlen"

Test de query op Google (Nederlandstalig, regio NL). Drie scenario's:

1. **Geen of dunne resultaten in het Nederlands** → goud. Schrijf dit, je ranked binnen weken.
2. **Veel Engelse resultaten, geen Nederlandse** → ook goud. Nederlandstalige lezers zoeken liever in eigen taal als dat kan.
3. **Volle Nederlandstalige SERP met goede content** → kies een nauwere hoek. In plaats van "Cursor gebruiken" → "Cursor BugBot instellen GitHub repo".

## Stap 2: Verzamel 3-4 verwante termen

Aanvullend op het hoofdzoekwoord, kies 3-4 verwante termen die in het artikel langskomen. Drie bronnen:

1. **Google Suggest** — typ je hoofdzoekwoord in en kijk welke suggesties verschijnen.
2. **"People also ask"** — onder de SERP-top staan vaak gerelateerde vragen.
3. **Synoniemen / variaties** — "instellen / configureren / inschakelen", "gebruiken / werken met / aan de slag met".

Voor "Cursor BugBot instellen" zou je bijvoorbeeld pakken:
- "Cursor pull request review"
- "GitHub AI code review"
- "BugBot configureren"
- ".cursorrules instellen"

Deze 3-4 termen verwerk je natuurlijk in de loop van het stuk — niet allemaal in de eerste alinea.

## Stap 3: Slug-engineering

De URL-slug moet:
- **Het hoofdzoekwoord bevatten** (of een sterke variant)
- **Kebab-case** (geen spaties, geen hoofdletters, geen underscores)
- **Maximaal 6 woorden**
- **Geen stopwoorden tenzij ze het zoekwoord vormen** ("voor", "met", "de" → meestal weglaten)
- **Geen jaartal tenzij datum-gebonden**

**Goed:**
- `cursor-bugbot-instellen` (3 woorden, helder)
- `claude-skill-maken-voorbeeld` (4 woorden, longtail)
- `perplexity-comet-onderzoek` (3 woorden, intent-rijk)

**Niet:**
- `hoe-stel-je-cursor-bugbot-in` (7 woorden + stopwoorden)
- `cursor` (te breed — botst met andere artikelen)
- `claude-cowork-tutorial-2026` (jaartal verkort levensduur)

## Stap 4: Title-engineering (max ~95 tekens)

De `<title>`-tag is veruit de belangrijkste on-page SEO-factor. Drie patronen die werken voor tool-tutorials:

**Patroon A — "[Toolnaam] [werkwoord]: [belofte/aantal]"**
> Cursor BugBot instellen: van GitHub-koppeling tot eerste pull request in vijf minuten

**Patroon B — "Zo [werkwoord] je [tool] [doel/scope]"**
> Zo bouw je je eerste Claude-skill voor een wekelijkse rapportage

**Patroon C — "[Toolnaam] [feature]: [wanneer wel/niet]"**
> Perplexity Comet voor onderzoek: wanneer het sneller is dan losse Google-queries

Alle drie hebben gemeenschappelijk: ze beginnen of bevatten het hoofdzoekwoord vroeg, en eindigen op een belofte/scope die de klik triggert.

**Anti-patronen:**
- "Een diepe duik in [tool]" — abstract, geen werkwoord
- "Alles wat je moet weten over [tool]" — clickbait-cliché, ranked slecht
- "De ultieme gids voor [tool]" — alle anderen schrijven die al

## Stap 5: Description-engineering (140-160 tekens)

De `<meta name="description">` is wat Google onder de title toont in de SERP. Het is geen ranking-factor direct, maar wel een CTR-factor — en CTR beïnvloedt rankings.

Drie elementen:
1. **Wat is het artikel** (één feit)
2. **Voor wie / wanneer relevant** (één afbakening)
3. **De belofte** (waarom klikken — vaak een concrete uitkomst)

**Voorbeeld:**
> BugBot scant je pull requests automatisch op bugs. Zo koppel je hem aan je GitHub-repo in vier stappen, plus de regels die je in `.cursorrules` zet.

(155 tekens. Bevat hoofdzoekwoord, scope-afbakening, concrete belofte.)

## Stap 6: H2-placement

Het hoofdzoekwoord komt **letterlijk in minstens één H2** terug. Niet vier keer (overkill), één is genoeg.

**Goed:**
```markdown
## Cursor BugBot instellen — stap voor stap
```

**Niet:**
```markdown
## De stappen
```

(Te generiek, mist het zoekwoord — verspilde H2.)

De andere H2's mogen vrijer geformuleerd zijn — variatie + de verwante termen uit stap 2.

## Stap 7: FAQ als long-tail-magneet

De FAQ is de SEO-sleeper. Elke `q:` zou een echte Google-query moeten zijn — letterlijk wat iemand intypt.

**Goed (echte queries):**
- `q: "Wat is BugBot in Cursor?"`
- `q: "Hoe koppel ik Cursor aan GitHub?"`
- `q: "Werkt BugBot ook op de gratis tier?"`
- `q: "Wat is het verschil tussen BugBot en Copilot?"`

**Niet (afstandelijk geformuleerd):**
- `q: "Hoe verhoudt deze nieuwe feature zich tot bestaande oplossingen?"` (geen mens typt dat)
- `q: "Wat zijn de toepassingsmogelijkheden?"` (te vaag)

Antwoorden: 40-120 woorden. Concreet, in de "jij"-vorm, met (waar relevant) een interne link.

Google's "People also ask" trekt vaak letterlijk uit FAQ-secties met `FAQPage` structured data — dat ranked je vaak voor multi-keyword queries waar je het hoofdartikel niet voor ranked.

## Stap 8: Interne link-anchor-tekst

Anchor-teksten zijn een sterk on-page signaal. Vermijd "klik hier" of "lees meer". Beschrijvend:

**Goed:**
- "Onze [vergelijking tussen Cursor en Windsurf](/nieuws/...)"
- "[Claude Cowork in één dag instellen](/nieuws/claude-instellen-1-dag-6-tools)"

**Niet:**
- "[Lees hier meer](/nieuws/...)"
- "[Klik](/nieuws/...) voor het artikel"

Cross-domain naar hetlaatsteainieuws.nl idem: beschrijvende anchor.

## Stap 9: Hero-image alt-tekst

`heroImage` verwijst naar een webp in `/images/nieuws/<slug>.webp`. Alt-tekst (waar van toepassing — vaak in `heroImageAlt`-veld) bevat een sterk-verkort versie van de title plus het hoofdzoekwoord.

**Goed:** `"Cursor BugBot instellen — pull request review met AI"`

**Niet:** `"afbeelding"`, `"image1"`, `""`.

## Stap 9b — Tabellen & inline-visuals als AEO-hefboom

Tabellen en beeld zijn niet alleen prettig voor de lezer; ze zijn **hoog-signaal voor zoekmachines én AI-antwoordmachines** (ChatGPT, Perplexity, AI Overviews, Claude). Gestructureerde, scanbare blokken winnen vaker een featured snippet en worden vaker letterlijk geciteerd. Bouw daarom in elk artikel waar het kan minstens één scanbaar, structureel element in:

- **Tabel** — gebruik er een zodra je **twee of meer dingen op een as vergelijkt** (prijzen, niveaus, voor/na, opties, kenmerken). Houd cellen kort (max 1-2 zinnen). Een vergelijking in lopende tekst verstoppen is een gemiste AEO-kans.
- **Inline-visual / diagram** — zit er een proces, een classificatie of een vergelijking in het concept (bv. een groen/grijs/rood-indeling of een routing-diagram), maak dan een **eigen inline-SVG in huisstijl** (monochroom, geel #f1cf2a als accent) en plaats die in `public/images/articles/<naam>.svg`, met beschrijvende alt-tekst — die alt is óók citeerbare tekst.
- **Genummerde stappen** voor een how-to of beslisvolgorde — Google en AI-engines pakken die graag als stappen-snippet.

Vuistregel: kun je een alinea omzetten in een tabel, een rij stappen of een diagram zónder informatie te verliezen? Doe het — dat is directe ranking- en citeerbaarheid-winst. Forceer het niet waar platte tekst beter leest.

## Stap 10: SEO-checklist vóór commit

Loop deze door — als één punt rood is, herschrijf voor je commit:

- [ ] Eén hoofdzoekwoord gekozen vóór schrijven
- [ ] 3-4 verwante termen verzameld en natuurlijk verwerkt
- [ ] Hoofdzoekwoord in title (binnen eerste 60 tekens)
- [ ] Hoofdzoekwoord in description (binnen eerste 100 tekens)
- [ ] Hoofdzoekwoord in eerste H2 of in de intro
- [ ] Hoofdzoekwoord in minstens één H2 letterlijk
- [ ] Slug bevat hoofdzoekwoord of sterke variant, max 6 woorden
- [ ] FAQ-vragen zijn echte Google-queries (test op Google Suggest)
- [ ] 1-3 interne DBAT-links met beschrijvende anchor
- [ ] 1 cross-domain link naar hetlaatsteainieuws.nl met beschrijvende anchor
- [ ] Hero-image alt-tekst bevat hoofdzoekwoord

## Wat NIET doen voor SEO

- **Keyword stuffing** — hoofdzoekwoord 10 keer hameren maakt het slechter, niet beter. 3-5 natuurlijke vermeldingen is genoeg.
- **Cloaking / verborgen tekst** — nooit. Schorsing-risico, en lezers vertrouwen ons minder.
- **Backlink-purchasing** — DBAT bouwt autoriteit via inhoud + cross-domain met HLN, niet via aangekochte links.
- **Title-A/B-tests handmatig in markdown** — als je twee titels overweegt, kies er één. Multivariate test gaat via een ander mechanisme dat we niet hebben.

## Een laatste opmerking

SEO is een lange termijn. Een micro-tutorial die deze week 50 lezers haalt, kan over zes maanden 5.000 per maand zijn — mits het hoofdzoekwoord goed gekozen is en de inhoud sterk genoeg om backlinks aan te trekken. Plant elk artikel met dat in gedachten: vandaag is een seed, niet een sprint.
