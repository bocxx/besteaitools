---
title: "Mistral OCR 4.1: zo haal je tekst en tabellen uit je documenten"
description: "Mistral OCR 4.1 zet PDF's en scans om in schone markdown met tabellen en betrouwbaarheidsscores. Zo verwerk je in een paar stappen je eerste document."
publishedAt: 2026-09-24
updatedAt: 2026-09-24
author: "Redactie"
category: "gids"
tags:
  - "mistral"
  - "ocr"
  - "document-processing"
  - "tabellen-extractie"
  - "api"
  - "automatisering"
toolSlug: "mistral"
featured: false
draft: false
readingTime: 5
heroImage: "/images/articles/diorama-mistral-ocr-documenten-verwerken.webp"
heroImageAlt: "Miniatuur diorama-illustratie bij artikel 'Mistral OCR 4.1: zo haal je tekst en tabellen uit je documenten'"
heroScene: "A small scanned paper document sliding into a miniature brass funnel machine on a workbench, with neat stacked index cards and a tiny table grid coming out the other side"
keyTakeaways:
  - "Mistral OCR 4.1 (model-ID mistral-ocr-4-1) is sinds 16 juli 2026 algemeen beschikbaar en kost $4 per 1.000 pagina's standaard, $5 per 1.000 voor geannoteerde pagina's."
  - "De /v1/ocr-endpoint accepteert een document-URL, een geüploade file of een image-URL en geeft per pagina schone markdown terug, inclusief tabellen."
  - "Nieuw in 4.1: bounding boxes op paragraafniveau, structurele bloklabels en betrouwbaarheidsscores per woord, pagina of blok."
  - "Voor grote volumes is er een aparte /v1/batch-endpoint, handig als je honderden documenten tegelijk wilt verwerken zonder losse aanroepen."
faq:
  - q: "Wat is Mistral OCR 4.1 precies?"
    a: "Mistral OCR 4.1 is de Document AI-service van Mistral die PDF's, scans en afbeeldingen omzet in gestructureerde, machine-leesbare tekst. Sinds 16 juli 2026 algemeen beschikbaar (Premier-tier) onder model-ID mistral-ocr-4-1, met als belangrijkste vernieuwing extractie op paragraafniveau met bounding boxes en betrouwbaarheidsscores."
  - q: "Wat kost Mistral OCR 4.1?"
    a: "Standaard OCR kost $4 per 1.000 verwerkte pagina's. Wil je ook geannoteerde output (gestructureerde data-extractie volgens een eigen schema), dan betaal je $5 per 1.000 pagina's. Er is een speeltuin om eerst gratis te testen voordat je via de API gaat verwerken."
  - q: "Kan ik ook tabellen uit een PDF halen met Mistral OCR?"
    a: "Ja. De service herkent tabelstructuren en geeft die terug als markdown- of HTML-tabellen, afhankelijk van de table_format-parameter die je meegeeft. Dat scheelt handmatig overtypen bij bijvoorbeeld facturen, jaarverslagen of formulieren met tabelvelden."
  - q: "Hoe verwerk ik heel veel documenten tegelijk?"
    a: "Voor grote volumes is er een losse /v1/batch-endpoint, specifiek gebouwd om OCR op schaal te draaien zonder dat je honderden losse API-aanroepen hoeft te doen en te wachten op elk antwoord apart."
  - q: "Werkt Mistral OCR ook met gescande documenten in plaats van digitale PDF's?"
    a: "Ja, de service is gebouwd om zowel digitale PDF's als scans en foto's van documenten te verwerken. Voor gescande documenten met matige kwaliteit is het wel verstandig om de confidence_scores_granularity-parameter te gebruiken, zodat je per woord of blok kunt zien waar de herkenning minder zeker is."
sources:
  - label: "Mistral AI Docs — OCR 4.1 modeloverzicht"
    url: "https://docs.mistral.ai/models/ocr-4-1"
  - label: "Mistral AI Docs — OCR endpoint referentie"
    url: "https://docs.mistral.ai/api/endpoint/ocr"
---

Een PDF met tabellen overtypen in een spreadsheet is het soort werk waar niemand op zit te wachten. Mistral OCR 4.1, sinds 16 juli 2026 algemeen beschikbaar, doet dat voor je: het model zet documenten, scans en foto's om in schone, gestructureerde tekst — inclusief tabellen en betrouwbaarheidsscores per stukje herkende tekst ([Bron: Mistral AI Docs](https://docs.mistral.ai/models/ocr-4-1)).

> **💡 Beginner-tip:** OCR staat voor optical character recognition — tekst herkennen in een afbeelding of scan. Het verschil met een simpele OCR-tool is dat Mistral OCR de structuur van het document snapt: het weet dat een blok tekst een tabel is, een kop, of een alinea, in plaats van alleen losse letters te herkennen.

## Wat er nieuw is in versie 4.1

De belangrijkste toevoeging ten opzichte van eerdere versies is extractie op paragraafniveau: het model geeft nu bounding boxes (de exacte locatie van een tekstblok op de pagina), structurele bloklabels en betrouwbaarheidsscores terug — per woord, per pagina of per blok, afhankelijk van wat je nodig hebt ([Bron: Mistral AI Docs](https://docs.mistral.ai/models/ocr-4-1)). Dat laatste is vooral handig als je de output automatisch verder verwerkt: je kunt dan programmatisch filteren op stukken tekst waar het model minder zeker over was, en die apart laten controleren.

## In drie stappen: van document naar bruikbare tekst

1. **Kies je invoer.** De `/v1/ocr`-endpoint accepteert drie soorten input: een direct geüploade file, een document-URL (voor een PDF die al online staat) of een image-URL. Voor een snelle test volstaat een publieke PDF-link.

2. **Stuur de aanvraag.** Een minimale aanroep ziet er zo uit:

   ```json
   POST /v1/ocr
   {
     "model": "mistral-ocr-4-1",
     "document": {
       "type": "document_url",
       "document_url": "https://voorbeeld.nl/factuur.pdf"
     },
     "table_format": "markdown"
   }
   ```

   Je krijgt per pagina een object terug met de herkende markdown, eventuele afbeeldingen en de paginadimensies. Wil je ook weten hóe zeker het model was, voeg dan `confidence_scores_granularity` toe met de waarde `"word"`, `"page"` of `"block"`.

3. **Verwerk de output.** De markdown per pagina kun je direct gebruiken als input voor een ander AI-model, opslaan als doorzoekbare tekst, of — bij tabellen — rechtstreeks parsen naar een spreadsheet. Met `table_format: "html"` krijg je tabellen als HTML in plaats van markdown, handig als je ze in een webpagina wilt tonen. Wil je de omgezette tabellen meteen laten analyseren in plaats van los inlezen, dan is [ChatGPT, Julius of Excel-AI](/nieuws/ai-data-analyse-chatgpt-julius-excel) de logische vervolgstap.

   > **⚡ Gevorderden:** wil je gestructureerde data volgens je eigen schema extraheren — bijvoorbeeld altijd "factuurnummer", "datum" en "totaalbedrag" uit elke factuur — gebruik dan `document_annotation_format` met een JSON-schema en een `document_annotation_prompt` die aangeeft wat je precies wilt. Dat kost wel het hogere tarief van $5 per 1.000 pagina's in plaats van $4.

## Grote volumes: de batch-endpoint

Moet je honderden of duizenden documenten verwerken, dan is losse aanroepen sturen omslachtig en traag. Mistral biedt daarvoor een aparte `/v1/batch`-endpoint, specifiek gebouwd om OCR op schaal te draaien zonder dat je op elk antwoord apart hoeft te wachten ([Bron: Mistral AI Docs](https://docs.mistral.ai/api/endpoint/ocr)). Praktisch is dit het verschil tussen een script dat 500 facturen 's nachts in één keer wegwerkt, en 500 losse aanroepen die je handmatig moet orkestreren.

## Waar je op moet letten

De documentatie noemt geen concrete verwerkingssnelheid, dus test zelf even hoe lang een batch van jouw typische documentgrootte duurt voordat je het in een tijdskritisch proces inbouwt. En reken de kosten door: bij $4 per 1.000 pagina's is een facturenstroom van een paar honderd stuks per maand goedkoop, maar bij tienduizenden pagina's per maand tikt dat wel aan — zeker als je de duurdere geannoteerde extractie gebruikt.

Wil je weten hoe het bredere Mistral-ecosysteem zich verhoudt tot andere Europese AI-spelers, inclusief de vraag hoe "soeverein" die AI eigenlijk is? [Daar schreven we eerder over op hetlaatsteainieuws.nl](https://www.hetlaatsteainieuws.nl/nieuws/mistral-3-miljard-samsung-soeverein). Gaat je bron niet over een document maar over een webpagina, dan is [Firecrawl het equivalent voor websites](/nieuws/firecrawl-website-naar-ai-databron).

## Checklist: ben je klaar om te starten met Mistral OCR?

- [ ] API-sleutel bij Mistral geregeld (of eerst getest via de speeltuin)
- [ ] Documenttype gekozen: file-upload, document-URL of image-URL
- [ ] `table_format` ingesteld op markdown of html, afhankelijk van je vervolgstap
- [ ] Bij twijfel over kwaliteit: `confidence_scores_granularity` toegevoegd
- [ ] Voor gestructureerde velden: `document_annotation_format` met eigen JSON-schema overwogen
- [ ] Grote volumes? Overgestapt op `/v1/batch` in plaats van losse aanroepen
- [ ] Kosten doorgerekend op basis van je verwachte paginavolume per maand

