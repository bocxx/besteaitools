---
title: "Grok 4.6 en Grok Bot: zo begin je met de augustus-release"
description: "xAI bracht op 11 en 12 augustus 2026 Grok Bot en Grok 4.6 uit. Wat het nieuwe model kost, wat dat 500k-contextvenster oplevert en hoe je Grok Bot in een half uur aan het werk zet."
publishedAt: 2026-08-22
updatedAt: 2026-08-22
author: "Redactie"
category: "gids"
tags:
  - "grok"
  - "xai"
  - "spacexai"
  - "grok-4-6"
  - "grok-bot"
  - "ai-agents"
  - "ai-modellen"
toolSlug: "grok"
featured: false
draft: false
readingTime: 4
heroScene: "A small chrome rocket-shaped robot unpacks a fresh circuit board from a crate on a workbench, while a second, sleepier robot sits at a tiny desk with a to-do list and a coffee mug, warm lamp light"
heroImage: "/images/articles/diorama-grok-4-6-en-grok-bot-aan-de-slag.webp"
heroImageAlt: "Miniatuur diorama-illustratie bij artikel 'Grok 4.6 en Grok Bot: zo begin je met de augustus-release'"
keyTakeaways:
  - "Grok 4.6 staat sinds 12 augustus 2026 in de xAI API: 500k contextvenster, tekst en beeld in, alleen tekst uit."
  - "Prijs onder 200k prompt-tokens: 2 dollar input, 0,50 dollar cached input, 6 dollar output per miljoen tokens."
  - "Boven 200k prompt-tokens verdubbelt de prijs naar 4 / 1 / 12 dollar. Lange context is dus een bewuste keuze."
  - "Grok Bot kwam een dag eerder: AI-collega's op een blijvende cloudcomputer, met berichten, goedkeuringen en routines."
faq:
  - q: "Wat is Grok 4.6 en wat is er nieuw ten opzichte van 4.5?"
    a: "Grok 4.6 is sinds 12 augustus 2026 xAI's frontier-model voor coderen, agentic taken en kenniswerk. Het contextvenster ging naar 500.000 tokens en er is geen limiet op de lengte van de tekstuitvoer. Je voert tekst en afbeeldingen in, je krijgt alleen tekst terug. Nieuw is ook de reasoning effort-stand xhigh, bovenop low, medium en high (de standaard). De prijs per miljoen tokens onder 200k prompt-tokens is 2 dollar input, 0,50 dollar cached input en 6 dollar output."
  - q: "Wat kost Grok 4.6 precies?"
    a: "Twee prijsniveaus, afhankelijk van hoe groot je prompt is. Blijf je onder de 200.000 prompt-tokens, dan betaal je per miljoen tokens 2 dollar voor input, 0,50 dollar voor cached input en 6 dollar voor output. Ga je daarboven, dan verdubbelt alles: 4 dollar input, 1 dollar cached input en 12 dollar output. Dat maakt het 500k-venster geen gratis extraatje — pas als je het echt nodig hebt, betaal je ervoor."
  - q: "Wat is Grok Bot?"
    a: "Grok Bot is sinds 11 augustus 2026 beschikbaar en is xAI's variant op een AI-collega die blijft bestaan tussen gesprekken door. Hij draait op een blijvende cloudcomputer en werkt met berichten, goedkeuringen, connectors en routines. Waar een gewone chat na afloop leeg is, houdt een Grok Bot zijn werkomgeving en context vast, zodat je hem terugkerende taken kunt geven. xAI heeft er aparte documentatie voor: de Grok Bot-overzichtspagina en Get started."
  - q: "Wanneer gebruik je xhigh reasoning effort?"
    a: "Alleen als medium en high tekortschieten. De effort-stand bepaalt hoeveel denkstappen het model mag nemen voordat het antwoordt, en meer denkstappen kosten meer outputtokens. Voor de meeste taken is high (de standaard) prima. Zet xhigh in bij taken waar een fout duur is en het antwoord over veel stappen loopt: een lastige bug uitpluizen, een complex contract nalopen, een meerdelige analyse. Kijk daarna in je kostenoverzicht wat het verschil je opleverde."
---

xAI schoof in twee dagen tijd twee dingen naar buiten: Grok Bot op 11 augustus en Grok 4.6 op 12 augustus. Het eerste is een nieuwe manier om Grok werk te laten doen, het tweede is het model eronder. Deze gids loopt langs wat je moet weten voordat je iets omzet.

## Grok 4.6 in het kort

Grok 4.6 is xAI's frontier-model voor coderen, agentic taken en kenniswerk. De harde specificaties uit de release notes:

- **Contextvenster:** 500.000 tokens
- **Input:** tekst en afbeeldingen; **output:** alleen tekst, zonder lengtelimiet
- **Reasoning effort:** low, medium, high (standaard) en xhigh
- **Prijs onder 200k prompt-tokens:** 2 / 0,50 / 6 dollar per miljoen tokens (input / cached input / output)
- **Prijs boven 200k prompt-tokens:** 4 / 1 / 12 dollar per miljoen tokens

Die tweede prijsregel is het belangrijkste detail voor je maandrekening. Zodra je prompt over de 200.000 tokens gaat, verdubbelt alles. Een codebase of documentarchief er integraal in gooien omdat het kán, is dus een dure gewoonte.

> **💡 Beginner-tip:** een token is ruwweg driekwart woord. 200.000 tokens is grofweg een boek van 300 pagina's. Zit je daaronder — en dat geldt voor bijna al het dagelijkse werk — dan betaal je het lage tarief. Je hoeft er verder niets voor in te stellen; xAI rekent het per verzoek af.

## Grok Bot: de agent-laag erboven

Grok Bot is xAI's antwoord op de vraag waar meer aanbieders nu aan werken: hoe geef je een AI werk dat langer duurt dan één gesprek?

Volgens de documentatie zijn het "durable AI teammates" die draaien op een blijvende cloudcomputer, met berichten, goedkeuringen, connectors en routines. Vertaald: de bot houdt zijn eigen werkomgeving vast, kan verbinding maken met je systemen, voert terugkerende routines uit, en vraagt jou om akkoord voordat hij iets doet wat gevolgen heeft.

Dat goedkeuringsmodel is het onderdeel om op te letten. Een agent die zelfstandig acties uitvoert is precies zo veilig als de plek waar jij de grens legt.

## Aan de slag in vier stappen

1. **Maak een API-key aan** in de xAI-console. Je hebt hem nodig voor zowel de API als de meeste integraties.
2. **Test 4.6 eerst naast je huidige model** op één echte taak uit je werkweek. Niet op een testprompt — die zeggen weinig.
3. **Laat de effort-stand op high staan.** Ga pas naar xhigh als je merkt dat het antwoord structureel tekortschiet, en vergelijk dan de kosten.
4. **Begin bij Grok Bot met één routine.** Bijvoorbeeld een wekelijkse samenvatting uit een bron die je toch al leest. Zet de goedkeuringsstap aan, kijk een week mee, en breid daarna pas uit.

## Waar je op let

De reden om Grok te overwegen is meestal de realtime toegang tot X-data, en dat verandert met 4.6 niet. Wat wél verandert is dat het model nu serieus meedoet op agentic werk en coderen, tegen een prijs die onder die van de meeste concurrenten ligt.

Wat je erbij moet weten: xAI hanteert lossere safety-filters dan OpenAI, Anthropic of Google, en het compliance-aanbod voor bedrijven is dunner. Voor experimenteren en intern werk is dat zelden een blokkade. Voor klantcontact of gevoelige data check je eerst je eigen kaders.

Controleer de prijzen voor je begint. xAI heeft ze het afgelopen jaar meermaals aangepast, en de pagina in de documentatie is leidend boven elk overzicht van derden — ook boven dit artikel.

## Bronnen

- [xAI Release Notes](https://docs.x.ai/developers/release-notes) — Grok 4.6 (12 augustus 2026) en Grok Bot (11 augustus 2026)
- [Grok 4.6 overzicht](https://docs.x.ai/developers/grok-4-6) — specificaties en effort-standen
- [Grok Bot overzicht](https://docs.x.ai/grok-bot/overview) — werking, connectors en routines
- [xAI pricing](https://docs.x.ai/developers/pricing) — actuele tarieven
