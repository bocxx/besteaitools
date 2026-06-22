---
title: "Firecrawl: zo zet je een website om in bruikbare input voor je AI"
description: "Firecrawl verandert elke webpagina in schone markdown die een AI-model meteen begrijpt. Zo scrape je in een paar regels een site en voer je die als context aan je AI-tool."
publishedAt: 2026-06-19
updatedAt: 2026-06-19
author: "Redactie"
category: "gids"
tags:
  - "firecrawl"
  - "web-scraping"
  - "markdown"
  - "rag"
  - "context-engineering"
  - "cursor"
  - "api"
toolSlug: "cursor"
featured: false
draft: false
readingTime: 5
heroImageAlt: "Miniatuur diorama-illustratie bij artikel 'Firecrawl: zo zet je een website om in bruikbare input voor je AI'"
heroScene: "A tiny conveyor belt: a messy miniature webpage with banners and ads goes in one end, passes through a small funnel machine, and clean stacked markdown cards come out the other side toward a little robot."
keyTakeaways:
  - "Firecrawl is een API die een URL omzet in schone markdown: navigatie, advertenties en scripts eruit, alleen de inhoud die een AI-model nodig heeft."
  - "Eén /scrape-call levert markdown of JSON; /crawl loopt een hele site af. Elke scrape draait in een echte browser, dus JavaScript-sites komen compleet terug."
  - "Je voert de markdown rechtstreeks als context aan een AI-model, of koppelt Firecrawl via de officiële MCP-server aan tools als Cursor en Claude."
  - "Er is een gratis tier om mee te testen; voor serieus gebruik gelden betaalde plannen op basis van credits."
faq:
  - q: "Wat doet Firecrawl precies?"
    a: "Firecrawl is een API die het web doorzoekbaar en scrape-baar maakt voor AI. Je geeft een URL, en Firecrawl haalt de pagina op, strijkt de rommel eruit — navigatie, advertenties, scripts — en geeft schone markdown of gestructureerde JSON terug. Die output is geoptimaliseerd voor het contextvenster van een taalmodel, zodat je niet eerst een ruwe HTML-berg hoeft op te schonen voordat een AI er iets mee kan."
  - q: "Wat is het verschil tussen scrape en crawl in Firecrawl?"
    a: "Met /scrape haal je één pagina op en krijg je die als markdown, HTML of JSON terug. Met /crawl geef je één start-URL, waarna Firecrawl de links volgt en de hele site of een sectie afloopt — met controle over diepte, het maximale aantal pagina's en padfilters. Kort gezegd: scrape is voor één pagina, crawl voor een complete site."
  - q: "Werkt Firecrawl ook op sites die met JavaScript laden?"
    a: "Ja. Elke scrape draait in een echte Chromium-browser, dus sites gebouwd met React, Vue of Next.js komen compleet terug in plaats van als lege HTML-romp. Dat is het grote verschil met een simpele HTTP-request, die bij moderne webapps vaak alleen een leeg geraamte ophaalt."
  - q: "Hoe koppel ik Firecrawl aan mijn AI-tool?"
    a: "Twee routes. Direct via de API of de SDK's (Python en Node) roep je scrape of crawl aan en plak je de markdown in je prompt of vector-database. Eenvoudiger nog is de officiële Firecrawl MCP-server: die koppelt Firecrawl rechtstreeks aan AI-tools als Cursor, Claude en VS Code, zodat je agent het web kan opvragen zonder dat jij zelf code schrijft."
  - q: "Is Firecrawl gratis?"
    a: "Er is een gratis tier waarmee je kunt prototypen en kort testen, met een beperkt aantal credits per maand en lage rate limits. Voor structureel of grootschalig gebruik schakel je over naar een betaald plan; die rekenen op basis van credits, waarbij zwaardere bewerkingen zoals AI-extractie meer credits kosten dan een gewone scrape. Reken dus even door wat jouw workload realistisch verbruikt."
---

Een AI-model is zo goed als de context die je het geeft. Wil je een chatbot je eigen handleiding laten kennen, of een agent de laatste productprijzen van een leverancier, dan moet die informatie eerst schoon en leesbaar op tafel komen. Daar zit het probleem: webpagina's zitten vol navigatie, banners en scripts, en moderne sites laden hun inhoud pas met JavaScript. [Firecrawl](https://www.firecrawl.dev/) lost dat op door elke URL om te zetten in schone markdown die een taalmodel meteen begrijpt ([Bron: Firecrawl Docs — Introduction](https://docs.firecrawl.dev/introduction)).

> **💡 Beginner-tip:** "Context" is simpelweg de informatie die je een AI-model meegeeft naast je vraag, zodat het antwoord over jóuw situatie gaat in plaats van algemeen blijft. Firecrawl is de schoonmaakstap daarvóór: het maakt een rommelige webpagina behapbaar genoeg om als context te dienen. Je hoeft zelf geen scraper te bouwen of HTML te ontleden.

## Wat Firecrawl van een pagina maakt

De kern is één API met drie hoofdfuncties: **search** (het web doorzoeken), **scrape** (één pagina ophalen) en **interact** (op een opgehaalde pagina doorklikken of formulieren invullen). Voor het voeden van een AI-model is scrape het werkpaard. Firecrawl strijkt nav, advertenties en scripts weg en geeft standaard schone markdown terug, geoptimaliseerd voor het contextvenster van een model ([Bron: Firecrawl Docs](https://docs.firecrawl.dev/introduction)). Omdat elke scrape in een echte Chromium-browser draait, komen JavaScript-zware sites — React, Vue, Next.js — compleet terug in plaats van als leeg geraamte.

Naast markdown kun je ook gestructureerde JSON opvragen, of een hele site aflopen met **/crawl**: je geeft één start-URL, Firecrawl ontdekt de pagina's en scrapet ze stuk voor stuk, met controle over diepte, het maximale aantal pagina's en padfilters ([Bron: Firecrawl Docs — Crawl](https://www.firecrawl.dev/blog/mastering-the-crawl-endpoint-in-firecrawl)).

## In drie stappen: van URL naar AI-input

1. **Haal je API-sleutel op.** Maak een account op firecrawl.dev en kopieer je sleutel (die begint met `fc-`). Wil je eerst voelen hoe het werkt zonder code, gebruik dan de playground in de browser ([Bron: Firecrawl Docs](https://docs.firecrawl.dev/introduction)).

2. **Scrape de pagina.** Met de Node-SDK is dat een paar regels:

   ```js
   import { Firecrawl } from 'firecrawl';

   const firecrawl = new Firecrawl({ apiKey: 'fc-JOUW-SLEUTEL' });

   const doc = await firecrawl.scrape('https://voorbeeld.nl/handleiding', {
     formats: ['markdown'],
   });

   console.log(doc.markdown); // schone markdown, klaar voor je model
   ```

   Liever de terminal? Dan volstaat `firecrawl https://voorbeeld.nl/handleiding` via de CLI, die meteen markdown teruggeeft.

3. **Voer de markdown als context aan je AI.** Plak de output in je prompt voor een eenmalige vraag, of zet hem in een vector-database als je er vaker doorheen wilt zoeken (een RAG-opzet). De uitvoer is bewust compact: Firecrawl claimt zo'n schone markdown te leveren dat je model fors minder input-tokens verbruikt dan bij ruwe HTML ([Bron: Firecrawl — Scrape](https://www.firecrawl.dev/scrape)).

   > **⚡ Gevorderden:** voor herhaalbare pipelines gebruik je /crawl met een padfilter (bijvoorbeeld alleen `/docs/`) en stuur je de resultaten via een webhook naar je verwerkingsstap. Zo blijft je kennisbank automatisch in sync met de bron-site.

## De makkelijkste route: via MCP naar je editor

Wil je geen losse scripts beheren, dan is de officiële **Firecrawl MCP-server** de snelste weg. Die koppelt Firecrawl rechtstreeks aan AI-tools als [Cursor](https://debesteaitools.nl/tools/cursor/), Claude en VS Code, zodat je agent het web kan opvragen vanuit je gewone workflow ([Bron: Firecrawl Docs](https://docs.firecrawl.dev/introduction)). In de praktijk vraag je Cursor dan iets als "haal de API-documentatie van deze leverancier op en schrijf een client", en de agent gebruikt Firecrawl onder de motorkap om de juiste pagina's binnen te halen. Geen knip-en-plak-werk meer tussen je browser en je editor.

> **💡 Beginner-tip:** MCP (Model Context Protocol) is een standaard waarmee AI-tools veilig met externe diensten praten. Je hoeft het protocol niet te begrijpen om het te gebruiken — je installeert de server één keer en je tool weet daarna dat Firecrawl beschikbaar is.

## Waar je op moet letten

Firecrawl rekent op basis van credits. Er is een gratis tier om mee te prototypen, maar zwaardere bewerkingen — zeker AI-extractie naar JSON — kosten meer credits dan een gewone scrape, dus reken voor een serieuze workload even door wat je realistisch verbruikt ([Bron: Firecrawl pricing-overzicht, eesel AI](https://www.eesel.ai/blog/firecrawl-pricing)). En blijf binnen de regels van de site die je scrapet: respecteer `robots.txt`, rate limits en auteursrecht. Het web als databron is krachtig, maar het blijft andermans content.

Wil je weten welke AI-tool het beste bij je past om die context vervolgens te verwerken? Op hetlaatsteainieuws.nl staat de achtergrond [AI-agents in 2026: wat zijn ze en wat kun je er echt mee?](https://hetlaatsteainieuws.nl/ai-deep-dives/ai-agents-2026-wat-zijn-ze), die uitlegt hoe agents externe bronnen inzetten.

## Checklist: klaar om het web te voeren aan je AI?

- [ ] Account en API-sleutel (`fc-…`) opgehaald op firecrawl.dev
- [ ] Eerste pagina gescraped met `formats: ['markdown']`
- [ ] Output gecontroleerd: alleen inhoud, geen nav of advertenties
- [ ] Hele site nodig? /crawl met diepte- en padfilter ingesteld
- [ ] Markdown in je prompt geplakt óf in een vector-database gezet
- [ ] Of: MCP-server gekoppeld aan Cursor/Claude voor hands-off gebruik
- [ ] Creditverbruik ingeschat en `robots.txt`/rate limits gerespecteerd
