---
title: "Mistral Large 4 uitproberen: je eerste API-aanroep"
description: "Mistral Large 4 staat sinds 6 oktober als preview in Mistral Studio. Zo maak je een API-sleutel, test je het model in de playground en doe je je eerste aanroep."
publishedAt: 2026-10-08
updatedAt: 2026-10-08
author: "Redactie"
category: "gids"
tags:
  - "mistral"
  - "mistral-large-4"
  - "mistral-studio"
  - "api"
  - "open-weights"
  - "eu-datasoevereiniteit"
toolSlug: "mistral"
featured: false
draft: false
readingTime: 4
heroImage: "/images/articles/diorama-mistral-large-4-api-eerste-aanroep.webp"
heroImageAlt: "Miniatuur diorama-illustratie bij artikel 'Mistral Large 4 uitproberen: je eerste API-aanroep'"
heroScene: "A tiny brass key being inserted into a large wooden engine with many small gears glowing from inside"
keyTakeaways:
  - "Mistral Large 4 verscheen op 6 oktober 2026 als publieke preview en heet in de API mistral-large-4."
  - "Het model heeft volgens Mistral 1,05 biljoen parameters waarvan 52 miljard actief, en een contextvenster van 1 miljoen tokens."
  - "Tijdens de preview toont Mistral een kortingsprijs van 0,68 dollar per miljoen invoertokens en 2,09 dollar voor uitvoer; het normale tarief is het dubbele."
  - "Op het gratis Experiment-plan kan Mistral je API-verzoeken gebruiken om modellen te trainen. Stuur daar geen klant- of persoonsgegevens heen."
  - "De gewichten wil Mistral eind oktober vrijgeven; onder welke licentie is nog niet bekend."
faq:
  - q: "Hoe gebruik ik Mistral Large 4?"
    a: "Op dit moment via de API van Mistral. Je maakt in Mistral Studio (console.mistral.ai) een API-sleutel aan en roept het model aan onder de naam mistral-large-4, of je probeert het eerst in de playground van Studio. In de aankondiging noemt Mistral geen beschikbaarheid in de Vibe-app, dus de API is nu de route."
  - q: "Wat kost Mistral Large 4 per miljoen tokens?"
    a: "De modelpagina van Mistral toont tijdens de preview 0,68 dollar per miljoen invoertokens en 2,09 dollar per miljoen uitvoertokens, met gecachte invoer voor 0,07 dollar. Het normale tarief is 1,36 en 4,18 dollar. Reken voor een begroting met het normale tarief, want een preview-prijs kan na de introductie vervallen."
  - q: "Kan ik Mistral Large 4 gratis proberen?"
    a: "Mistral zegt dat API-toegang standaard aanstaat zonder creditcard, met gebruikslimieten. Het gratis Experiment-plan vraagt wel een geverifieerd telefoonnummer, en verzoeken op dat plan kunnen worden gebruikt om modellen van Mistral te trainen. Toegang tot frontier-modellen noemt Mistral als voordeel van het betaalde Scale-plan; krijg je een foutmelding, controleer dan je plan."
  - q: "Wanneer kan ik Mistral Large 4 downloaden?"
    a: "Mistral schreef bij de lancering op 6 oktober 2026 dat de gewichten eind die maand vrijkomen. Een licentie noemt het bedrijf nog niet. Houd er rekening mee dat een model van ruim een biljoen parameters zware serverhardware vraagt; op een laptop draai je dit niet."
sources:
  - label: "Mistral AI — Mistral Large 4"
    url: "https://mistral.ai/news/mistral-large-4/"
    publishedAt: 2026-10-06
  - label: "Mistral Docs — Mistral Large 4"
    url: "https://docs.mistral.ai/models/mistral-large-4-0"
  - label: "Mistral Docs — Activate Studio and generate an API key"
    url: "https://docs.mistral.ai/getting-started/quickstarts/studio/activate-and-generate-api-key"
  - label: "Mistral Help Center — Experiment plan"
    url: "https://help.mistral.ai/en/articles/455206-how-can-i-try-the-api-for-free-with-the-experiment-plan"
---

Mistral heeft sinds 6 oktober een nieuw vlaggenschip, en je kunt het vandaag al zelf aan het werk zetten. Mistral Large 4 staat als publieke preview in Mistral Studio ([Bron: Mistral](https://mistral.ai/news/mistral-large-4/)). In vier stappen maak je een sleutel, test je het model zonder code en doe je je eerste echte API-aanroep.

## Wat je gaat testen

Large 4 is volgens Mistral een model met 1,05 biljoen parameters, waarvan er per stap 52 miljard actief zijn, met een contextvenster van 1 miljoen tokens. Het ondersteunt function calling, gestructureerde uitvoer, vragen over documenten en batchverwerking ([Bron: Mistral Docs](https://docs.mistral.ai/models/mistral-large-4-0)). Het is in Mistrals eigen Europese datacenters getraind, en de Europese versie wordt door Mistral zelf beheerd "under European law" ([Bron: Mistral](https://mistral.ai/news/mistral-large-4/)).

In de aankondiging staat niets over de Vibe-app. Wil je het nu proberen, dan loopt dat via de API.

## Stap 1: maak een API-sleutel in Mistral Studio

Ga naar [console.mistral.ai](https://console.mistral.ai) en kies in de linkerbalk **API Keys** en daarna **Create new key**. Geef de sleutel een naam en een vervaldatum, kies de toegang tot connectors en bevestig. Kopieer de sleutel meteen naar je wachtwoordmanager: Mistral toont hem maar één keer ([Bron: Mistral Docs](https://docs.mistral.ai/getting-started/quickstarts/studio/activate-and-generate-api-key)).

> **💡 Beginner-tip:** op het gratis Experiment-plan heb je een geverifieerd telefoonnummer nodig, en Mistral mag je verzoeken daar gebruiken om zijn modellen te trainen ([Bron: Mistral Help Center](https://help.mistral.ai/en/articles/455206-how-can-i-try-the-api-for-free-with-the-experiment-plan)). Test dus met verzonnen voorbeelden, niet met klantmails of dossiers. Voor echt werk hoort het betaalde Scale-plan.

## Stap 2: probeer het eerst in de playground

Voordat je code schrijft, open je de [playground in Studio](https://console.mistral.ai/build/playground) en kies je `mistral-large-4`. Leg het dezelfde vraag voor die je nu aan je huidige model stelt, bijvoorbeeld een lang contract samenvatten in vijf punten. Zo zie je in twee minuten of de toon en de lengte van de antwoorden bij je passen.

Krijg je het model niet te zien of een foutmelding, kijk dan naar je plan. Mistral noemt toegang tot frontier-modellen als voordeel van Scale ([Bron: Mistral Help Center](https://help.mistral.ai/en/articles/455206-how-can-i-try-the-api-for-free-with-the-experiment-plan)).

## Stap 3: je eerste aanroep

Zet je sleutel in een omgevingsvariabele en stuur een verzoek naar het chat-endpoint:

```bash
export MISTRAL_API_KEY="jouw-sleutel"
curl https://api.mistral.ai/v1/chat/completions \
  -H "Authorization: Bearer $MISTRAL_API_KEY" \
  -H "Content-Type: application/json" \
  -d '{
    "model": "mistral-large-4",
    "max_tokens": 400,
    "messages": [{"role": "user", "content": "Vat deze offerte samen in vijf punten: ..."}]
  }'
```

Het model is beschikbaar op `/v1/chat/completions` en op `/v1/conversations`, en voor grote hoeveelheden via `/v1/batch` ([Bron: Mistral Docs](https://docs.mistral.ai/models/mistral-large-4-0)). Werkt het in curl, dan werkt het ook in je eigen app of automatisering.

## Stap 4: houd de rekening in de gaten

De modelpagina toont tijdens de preview 0,68 dollar per miljoen invoertokens en 2,09 dollar per miljoen uitvoertokens, met gecachte invoer voor 0,07 dollar. Het normale tarief is het dubbele: 1,36 en 4,18 dollar ([Bron: Mistral Docs](https://docs.mistral.ai/models/mistral-large-4-0)). Uitvoer is drie keer zo duur als invoer, dus de lengte van het antwoord bepaalt je rekening.

> **⚡ Gevorderden:** zet altijd een `max_tokens` op je aanroep en vraag in de prompt expliciet om korte antwoorden. Stuur je steeds dezelfde lange instructie mee, profiteer dan van de cachekorting op herhaalde invoer. En reken je business case door met het volle tarief, niet met de preview-prijs.

De gewichten wil Mistral eind oktober vrijgeven ([Bron: Mistral](https://mistral.ai/news/mistral-large-4/)). Zelf hosten op een laptop zit er bij dit formaat niet in, maar voor organisaties met eigen servers wordt het dan een optie.

## Checklist: ben je klaar?

- [ ] Account in Mistral Studio en een API-sleutel veilig opgeslagen
- [ ] Bewust gekozen tussen Experiment (gratis, kan voor training worden gebruikt) en Scale
- [ ] Large 4 getest in de playground met een eigen, niet-gevoelige taak
- [ ] Eerste curl-aanroep gelukt met `mistral-large-4`
- [ ] `max_tokens` ingesteld om de uitvoerkosten te begrenzen
- [ ] Begroting gemaakt met het normale tarief, niet de preview-korting

Gebruik je liever een kant-en-klare app dan de API, dan is [Mistral Vibe Work Mode](/nieuws/mistral-vibe-work-mode-eerste-taak) de makkelijkere instap, en voor het verwerken van gescande documenten is er [Mistral OCR](/nieuws/mistral-ocr-documenten-verwerken). Hoe Large 4 zich verhoudt tot de Chinese open modellen, lees je op [hetlaatsteainieuws.nl](https://hetlaatsteainieuws.nl/nieuws/mistral-large-4-europees-open-model).

## Bronnen

- [Mistral Large 4 — Mistral AI](https://mistral.ai/news/mistral-large-4/)
- [Mistral Large 4 — Mistral Docs](https://docs.mistral.ai/models/mistral-large-4-0)
- [Activate Studio and generate an API key — Mistral Docs](https://docs.mistral.ai/getting-started/quickstarts/studio/activate-and-generate-api-key)
- [Experiment plan — Mistral Help Center](https://help.mistral.ai/en/articles/455206-how-can-i-try-the-api-for-free-with-the-experiment-plan)
