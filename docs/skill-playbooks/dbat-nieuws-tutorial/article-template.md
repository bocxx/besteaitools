# Article template — micro-tutorial-formaat

Dit is het basisformaat voor 80% van alle DBAT-tutorials. 600-900 woorden, 3-5 minuten leestijd. Vanaf hier wijk je alleen af als de redactionele waarde dat vereist en de gebruiker erom vraagt.

## Skeletstructuur

```markdown
---
[frontmatter — zie references/frontmatter.md]
---

[INTRO — 40-70 woorden]
Eén alinea. Wat krijg je in dit artikel? Waarom nu (welk signaal triggerde het)?
Een lichte belofte: "binnen 5 minuten weet je..." of "drie klikken, klaar".

> **💡 Beginner-tip:** [Optioneel hier, of later in het stuk]

## [H2-1 — context of "wat is dit"]

Korte uitleg: wat is de tool/feature, voor wie is dit relevant, wat is de
voorwaarde (abonnement, OS, account). 60-120 woorden.

## [H2-2 — de stappen]

[Genummerde lijst van 3-5 stappen. Elk stap is concreet, met:]

1. **Wat je doet** — actie in werkwoord-vorm
2. **Waar je het doet** — pad, menu, URL
3. **Wat je verwacht te zien** — feedback voor de lezer

> **⚡ Gevorderden:** [Eén technische trade-off die beginners mogen overslaan]

## [H2-3 — optionele variatie of valkuil]

Een veelvoorkomende fout, een alternatief, of een uitbreiding.
"Werkt het niet? Negen van de tien keer..."

## [H2-4 — optionele tweede valkuil of pricing-realiteit]

Soms nuttig: pricing-context, alternatieven uit de directory, of wat dit
NIET doet zodat verwachtingen kloppen.

## Checklist: ben je klaar?

- [ ] Punt 1 — exact het eerste wat moet kloppen
- [ ] Punt 2 — ...
- [ ] Punt 3 — ...
- [ ] Punt 4 — ...
- [ ] Punt 5 — ...
(5-10 punten max — niet de stappen herhalen, maar afvinkbare staat)

## Bronnen

- [Vendor docs / release notes](URL) — primaire bron voor de feature-claim
- [Officiële pricing-pagina](URL) — voor cijfers
- [Optioneel: derde bron — eigen test, externe review](URL)
- [Optioneel: vierde bron]

(2-4 items. Primair vendor; secundair pers / vergelijking. Niet de hele
internet-bibliografie — alleen wat je echt nodig had.)
```

## Sectie-voor-sectie uitleg

### Intro (40-70 woorden)

Drie dingen moeten erin:

1. **Wat is dit artikel** — niet "in dit artikel leer je", maar concreet: "Cursor 1.0 brengt BugBot — zo koppel je hem in drie klikken aan je repo."
2. **Waarom nu** — link naar het signaal (lancering deze week, nieuwe feature, prijswijziging).
3. **Bescheiden belofte** — "binnen vijf minuten", "geen technische voorkennis nodig", "drie klikken". Niet overdrijven; lezers herkennen het meteen.

**Goed:**
> Cursor lanceerde deze week BugBot — een AI-reviewer die je pull requests automatisch scant op bugs voor ze gemerged worden. De setup is drie klikken in GitHub plus één regel in `.cursorrules`. Hieronder loop je het in vijf minuten af, met wat je per stap op je scherm zou moeten zien.

**Niet:**
> In dit uitgebreide artikel bespreken we de revolutionaire nieuwe feature van Cursor die het landschap van code review fundamenteel verandert. We bekijken alle aspecten en geven onze visie op...

(Holle bijzin, "revolutionair", "landschap" — drie AI-tells in twee zinnen.)

### H2-1: context (60-120 woorden)

Niet de Wikipedia-pagina van de tool. Wel: wat doet dit specifieke ding, voor wie is het, wat is de voorwaarde. Eén alinea genoeg. Verwijs eventueel naar een eerder DBAT-artikel over dezelfde tool als achtergrond (interne link).

### H2-2: de stappen (genummerd, 3-5 stappen)

Dit is het hart van een tutorial. Elke stap heeft drie elementen:

- **Wat je doet** (werkwoord eerst): "Open instellingen", "Plak deze regel", "Klik op Verbinden".
- **Waar** (concreet pad): "Settings → Integrations → GitHub", "in `.cursorrules` in je project-root", "rechtsboven, het tandwiel-icoon".
- **Wat je zou moeten zien** (feedback): "Er verschijnt een groen vinkje", "BugBot reageert binnen 30 seconden op je volgende PR".

Een stap zonder "wat je verwacht te zien" laat de lezer in de lucht hangen. Een stap zonder concreet pad laat ze googelen. Beide kosten dwell time.

**Voorbeeld goed:**

> 3. **Voeg `.cursorrules` toe aan je project-root.** Maak een tekstbestand met die exacte naam (geen extensie verder) en plak hierin de regels die BugBot moet volgen — bijvoorbeeld "geen console.log in merge-ready code" of "vermijd nested ternaries". Sla op. Bij je volgende PR ziet BugBot dit bestand en past de regels toe — je herkent het aan de comment-tag `[via .cursorrules]` in z'n suggestie.

### H2-3 + H2-4: valkuilen / variatie / pricing-realiteit

Optioneel, maar vaak het verschil tussen een dunne tutorial en een nuttige. Drie soorten paragrafen die hier passen:

- **De veelvoorkomende fout** — "Werkt het niet? Negen van de tien keer staat de connector op alleen-lezen terwijl je schrijfrechten nodig hebt."
- **De pricing-realiteit** — "BugBot werkt op Cursor Pro ($20/mnd). Op de gratis tier zit het niet."
- **Het alternatief** — "Geen Cursor? Vergelijkbare functionaliteit zit in [Aider](/nieuws/...) en je kunt het ook bouwen via GitHub Actions + Claude API."

### Checklist (5-10 afvinkbare punten)

Niet de stappen-lijst herhalen. Wel: afvinkbare staat-checks die de lezer kan langslopen om te weten of de setup compleet is.

**Goed:**
- [ ] Cursor Pro-abonnement actief
- [ ] GitHub-account gekoppeld aan Cursor (Settings → Integrations → GitHub)
- [ ] Repository geselecteerd in BugBot-dashboard
- [ ] `.cursorrules` aanwezig in project-root
- [ ] Eerste test-PR geopend en BugBot heeft erop gereageerd
- [ ] Reactie-tijd onder 60 seconden (anders: rate-limiting check)

**Niet:**
- [ ] Stap 1 gedaan
- [ ] Stap 2 gedaan
- [ ] Stap 3 gedaan

### Bronnen (2-4 items)

Primaire bronnen eerst (vendor-docs, release notes, pricing-pagina), daarna secundaire (pers, vergelijkende reviews). Geen lijst van alle dingen die je tijdens schrijven hebt aangeklikt.

Format:

```markdown
## Bronnen

- [Anthropic — Cowork productpagina](https://claude.com/product/cowork) — officiële beschrijving van features en plannen
- [Anthropic — Get started with Claude Cowork](https://support.claude.com/en/articles/13345190-...) — setup-handleiding van Anthropic zelf
- [Cursor 1.0 release notes](https://changelog.cursor.com/...) — exacte feature-lijst en versie-datum
```

(Optionele beschrijving achter em-dash is welkom maar niet verplicht.)

## Voorbeeld-openers per categorie

**`gids` (default):**
> Cursor lanceerde deze week BugBot — een AI-reviewer die je pull requests automatisch scant. De setup is drie klikken in GitHub plus één regel in `.cursorrules`. Hieronder loop je het in vijf minuten af.

**`update` (recent gelanceerde feature):**
> Anthropic rolde gisteren live artifacts uit naar alle Cowork-gebruikers. Dashboards die zichzelf actualiseren bij elke opening — geen handmatige refresh meer. Zo activeer je het, en in welke situaties het echt waarde toevoegt.

**`lancering` (nieuwe tool):**
> Op Product Hunt verscheen zero.xyz: een gateway tussen AI-agents en ongeveer 8.000 tools — zonder per tool een API-key te configureren. We installeerden het in vijf minuten en testten of de belofte klopt.

## Wat NIET in het artikel hoort

- **HTML-widgets** (timeline-figures, vergelijkingstabellen met inline CSS) — alleen op expliciet verzoek voor longform-uitzonderingen. Default is platte markdown.
- **Meer dan twee blockquotes** — overdaad verlaagt de impact.
- **Lange citaten** — een vendor-tweet of release-quote mag, maar inline en in eigen alinea, niet als blokcitaat van 100 woorden.
- **Affiliate-links of UTM-parameters in vendor-links** — alleen schone URLs.
- **Disclaimer-paragrafen** — "deze tutorial is gebaseerd op de versie van vandaag" — overbodig en holt het stuk uit.

## Een laatste check: lees het terug als lezer

Voor je het bestand opslaat en in de pre-commit checks gaat, lees je het stuk één keer terug alsof je het nooit eerder zag. Twee vragen:

1. **Begrijp ik wat ik moet doen?** Drie stappen, één pad, één resultaat. Nee? Te vaag — concretiseer.
2. **Zou ik dit in 3 minuten kunnen volgen?** Te lang? Snij de helft uit H2-3 en H2-4. Te kort? Voeg pricing of valkuil toe.

Als de antwoorden niet beide ja zijn, is de tutorial niet af. Een dunne tutorial is erger dan geen tutorial.
