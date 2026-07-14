---
title: "Automatische SEO-audit met Make: bouw je eigen checker"
heroImageAlt: "Miniatuur diorama-illustratie bij artikel 'Automatische SEO-audit met Make: bouw je eigen checker'"
heroImage: "/images/articles/diorama-make-seo-audit-automatiseren.webp"
description: "Maak een no-code workflow die je site doorloopt op SEO-signalen en rapportages automatisch genereert. Met Make + Google Sheets."
publishedAt: 2026-07-14
category: "gids"
tags:
  - "make"
  - "seo-automation"
  - "no-code"
  - "workflow-automation"
  - "google-sheets"
  - "api-integration"
doelgroep:
  - "developer"
niveau: "gevorderd"
artikeltype: "tutorial"
toolSlug: "make"
keyTakeaways:
  - "Make automatiseert je SEO-checklist zonder code: GSC-data, technische signalen, rapportages in één workflow."
  - "Integreer Google Search Console, PageSpeed, en robots.txt-scans in een workflow die je om de week draait."
  - "Verzamel alle resultaten automatisch in Google Sheets en deel rapportages via Slack of e-mail."
  - "Bouwt sneller dan custom scripts; pas je workflow in seconden aan als je audit-criteria veranderen."
sources:
  - url: "https://www.make.com/"
    label: "Make — Workflow Automation Platform"
  - url: "https://support.google.com/webmasters/answer/9128669"
    label: "Google Search Console API Docs"
  - url: "https://developers.google.com/speed/pagespeed/insights"
    label: "Google PageSpeed Insights API"
---

## Waarom Make voor SEO-audits?

SEO audits zijn repetitief werk: dezelfde checks elke week, dezelfde handmatige verzameling van data uit Google Search Console, dezelfde sheets bijwerken, dezelfde rapportages sturen. Perfecte voedsel voor automatisering.

**Make** (vroeger Integromat) laat je dit doen zonder een lijn code te schrijven:

- **Integraties:** GSC (Google Search Console), Google Sheets, PageSpeed Insights, HTTP requests naar robots.txt
- **Triggers:** één keer per week om 09:00, of handmatig op knopdruk
- **Logic:** snel, voorwaarden, loops over pagina's
- **Output:** Sheets-tabel, Slack-notificatie, e-mailrapport

Deze tutorial bouwt je eerste "SEO-audit-as-a-workflow" — volledig no-code.

## Wat je nodig hebt

- **Make-account:** gratis (tot 1.000 operations/maand; audit-workflows passen makkelijk in die marge)
- **Google Search Console:** connectie via OAuth (Make vraagt toestemming)
- **Google Sheets:** één sheet voor audit-resultaten
- **Website:** minimaal 1 pagina (de workflow werkt beter hoe meer data je in GSC hebt)

⚠️ **Voorbereiding:** zet je site in Google Search Console als je dat nog niet gedaan hebt. De GSC-API geeft alleen data als GSC al minstens ~3 dagen crawl-data bevat. Een brand-new site duurt een week.

## Stap 1: maak een Google Sheet voor je audit-results

Open Google Sheets en maak een nieuwe sheet aan. Kolomkoppen die we gaan vullen:

```
| Datum | Pagina (URL) | Impressies (GSC) | Klikken (GSC) | CTR | Titel-lengte | Meta-beschrijving | Headings-check | Robots.txt OK? | PageSpeed Score | Status |
|---|---|---|---|---|---|---|---|---|---|---|
```

Je hoeft niet alles in te vullen — Make vult dit automatisch in. Maar zet de structuur neer zodat je later weet wat je verwacht.

**Sheet-link kopiëren** (je hebt deze in Make nodig):
1. Deel je sheet (Edit rechts boven → deel de link)
2. Kopieer de sheet-ID uit de URL (`…/spreadsheets/d/<SHEET_ID>/edit…`)

## Stap 2: verbind Make met Google Search Console

1. **Maak een Make-scenario aan** (de term voor "workflow"):
   - Log in op [make.com](https://www.make.com/)
   - Klik **Create a new scenario** → kies een lege workflow
   - Geef het een naam: "SEO Audit Weekly"

2. **Voeg GSC-module toe** (de trigger):
   - Klik het witte + teken → zoek naar "Google Search Console"
   - Selecteer de module en klik **Connect** (OAuth-pop-up)
   - Grant Make toestemming tot je GSC-properties
   - Kies je property (domein)

3. **Configureer de GSC-query:**
   - **Mode:** Query (niet Site-Overview)
   - **Metric:** Klik "Impressions" (je kunt ook "Clicks" toevoegen)
   - **Dimensions:** Add URL (elke pagina apart)
   - **Date range:** Last 7 days
   - **Filter:** Pages with impressions > 0 (anders ruis)

Make geeft je nu een bundle met `url`, `impressions`, `clicks`, `ctr` — perfect.

## Stap 3: filter pagina's en verzamel extra signalen

Nu gaat Make één rij per pagina verwerken. **Voeg logica toe** voor aanvullende checks:

1. **HTTP request naar robots.txt:**
   - Voeg een **HTTP module** toe
   - Zet `GET` naar `https://yoursite.com/robots.txt`
   - Parse het response-body op "Disallow" — indexeerbare pagina's OK, indexed-only? Flag het

2. **PageSpeed Insights-score per URL:**
   - Voeg **HTTP module** toe (Google PageSpeed API)
   - `GET https://www.googleapis.com/pagespeedonline/v5/runPagespeed?url=[URL]&key=[YOUR_API_KEY]`
   - Extract `lighthouseResult.categories.performance.score` (0-100)
   - Vlag score < 50 (slow pages)

3. **Titel- en meta-beschrijving-controle:**
   - Voeg een **HTML Parser module** toe
   - Haal de pagina (`GET [URL]`) op
   - Parse `<title>` (moet 30-60 tekens zijn)
   - Parse `<meta name="description">` (moet 120-160 tekens zijn)
   - Vlag mismatches

Dit lijkt ingewikkelder dan het is — Make's visual interface helpt je alles koppelen.

## Stap 4: verzamel resultaten in Google Sheets

Voeg aan het einde van je scenario een **Google Sheets-module** toe:

1. **Selecteer "Add a row"**
2. **Connect je Sheets-account** (OAuth)
3. **Kies de sheet** en tab die je eerder maakte
4. **Map de waarden:**
   - Datum → `NOW()` (Make-functie)
   - Pagina (URL) → `[url van GSC]`
   - Impressies → `[impressions van GSC]`
   - Klikken → `[clicks van GSC]`
   - CTR → `[ctr van GSC]` (of `clicks / impressies * 100`)
   - Titel-lengte → `[title-length van de parser]`
   - Meta-beschrijving → `[description-length]`
   - Headings-check → `[is_h1_found]` (true/false)
   - Robots.txt OK? → `[robots_txt_ok]`
   - PageSpeed Score → `[pagespeed_score]`
   - Status → `IF([pagespeed_score] < 50, "Slow", "OK")` (enz.)

**Pro-tip:** Zet een **Filter** vóór de Sheets-stap: voeg alleen rijen toe voor pagina's met ≥5 impressies (ruis weggooien).

## Stap 5: plannen en rapportages

Sla je scenario op en klik **Schedule**:

- **Trigger:** "Every week on Monday at 09:00"
- **Timezone:** Europe/Amsterdam

**Extra: push rapportages naar Slack/e-mail**

Voeg aan het einde **Slack** of **Email** modules toe:

- **Slack:** stuur een message naar je kanaal: "✅ SEO Audit gereed. Check: [link naar je Sheets]"
- **Email:** verstuur de Sheets als bijlage (of embed een summary)

## Waar je voorzichtig mee bent

1. **API-quota's:** Google Search Console API is beperkt (gratis tot ~10k verzoeken/dag), PageSpeed Insights tot ~25k/dag. Een audit per week op één domein geeft geen problemen. 100 domeinen? Zet het op maandelijks.

2. **GSC-vertraging:** GSC-data is ~1-2 dagen oud. Je audit-data is dus niet realtime — acceptabel voor wekelijkse rapportages.

3. **Authorization-refresh:** Make handelt token-refresh automatisch af, maar zorg dat je GCP-project (als je PageSpeed API-key gebruikt) niet expires. Zet een herinnering in je kalender (jaarlijks vernieuwen).

4. **Kostprijs:** tot 1.000 operations/maand gratis (een weekly audit = ~50 operations). Daarna betaal je naar gelang gebruik (schalen is goedkoop).

## Volgende stap: uitbreiden

Nu je basis loopt, wat kun je toevoegen?

- **Backlink-monitor:** integreer een API (bijv. Semrush, Ahrefs) om nieuwe links te detecteren
- **Rank-tracker:** Ahrefs- of Moz-integratie voor keyword-rankings per week
- **Competitor-watch:** dezelfde audit op 2-3 concurrent-domeinen draaien
- **Alerts:** Slack-notificatie als je PageSpeed-score opeens ▼ duikt

Make's marketplace heeft 1.000+ integraties — je kunt je audit-workflow groeien in elke richting zonder ooit code te hoeven schrijven.

## Snelle troubleshooting

**"Make zegt: Unauthorized on Google Search Console"**
- Zorg dat je GSC-account eigenaar van het domein is (niet alleen read-only)
- Disconnect en reconnect je Google-account in Make

**"Geen pagina's in de GSC-query"**
- Je site moet ≥3-7 dagen in GSC zitten met crawl-data
- Controleer dat je filter niet té streng is (≥1 impressie, niet ≥100)

**"Sheets-module werkt niet"**
- Zorg dat de sheet en tab exact dezelfde kolomnamen hebben als je Make-mapping
- Probeer een test-rij handmatig in te voegen

## Afsluiting

Met Make build je SEO-audit-workflows die zich herhalen zodat jij je focus-uren aan strategie en verbetering kunt wijden, niet aan data-verzameling. Geen serverwerk, geen maintenance — je workflow draait gewoon.

Stap over van "audit per kwartaal wanneer je eraan denkt" naar "wekelijkse, automatische rapportages" — en watch je SEO-voortgang vanzelf oplichten.
