---
title: "Kimi K3 gebruiken: zo werk je met Moonshots grootste open model"
heroImageAlt: "Miniatuur diorama-illustratie bij tutorial over het gebruik van Kimi K3 via de Moonshot-API"
description: "Kimi K3 is met 2,8 biljoen parameters het grootste open model tot nu toe, met een context van 1 miljoen tokens. Zo probeer je het uit — via de chat of via de API."
publishedAt: 2026-07-29
updatedAt: 2026-07-29
author: "Redactie"
category: "gids"
tags:
  - "kimi"
  - "kimi-k3"
  - "moonshot"
  - "open-weights"
  - "llm-api"
  - "context-window"
toolSlug: "kimi"
featured: false
draft: false
readingTime: 5
heroImage: "/images/articles/diorama-kimi-k3-moonshot-api-gebruiken.webp"
keyTakeaways:
  - "Kimi K3 van het Chinese Moonshot AI is een model van 2,8 biljoen parameters met een context van 1 miljoen tokens, uitgebracht in juli 2026 met openbare gewichten."
  - "Uitproberen kan zonder code via de chat op kimi.com; voor eigen toepassingen gebruik je de API met model-ID kimi-k3."
  - "De API is OpenAI-compatibel op https://api.moonshot.ai/v1, dus bestaande code werkt door de basis-URL en het model-ID aan te passen."
  - "De prijs is ongeveer 3 dollar per miljoen input-tokens en 15 dollar per miljoen output-tokens; herhaalde context uit cache is fors goedkoper."
faq:
  - q: "Wat is Kimi K3 en wie maakt het?"
    a: "Kimi K3 is het vlaggenschipmodel van Moonshot AI, een Chinese AI-onderneming. Het is uitgebracht in juli 2026 en heeft 2,8 biljoen parameters, wat het volgens Moonshot tot het grootste open-weights-model ter wereld maakt. Het werkt met tekst en beeld, is gericht op redeneren, code en langlopende taken, en heeft een context van 1 miljoen tokens. De gewichten staan openbaar op Hugging Face, zodat je het model in principe ook zelf kunt hosten."
  - q: "Wat betekent een context van 1 miljoen tokens in de praktijk?"
    a: "De context is de hoeveelheid tekst die het model in één keer kan meenemen. Een miljoen tokens komt grofweg overeen met honderdduizenden woorden — een fors dossier, een heel wetboek of een grote hoeveelheid broncode tegelijk. Voor taken waarbij je veel materiaal in één keer wilt laten verwerken, zoals een lange rapportage samenvatten of door een grote codebasis heen redeneren, is dat het grootste praktische verschil met kleinere modellen."
  - q: "Moet ik iets installeren om Kimi K3 te proberen?"
    a: "Nee. De makkelijkste weg is de chatinterface op kimi.com: aanmelden en typen, net als bij andere AI-chatbots. Wil je het model in je eigen software gebruiken, dan maak je een account op het ontwikkelaarsplatform, genereert een API-sleutel en roept het model aan met model-ID kimi-k3. Zelf hosten met de open gewichten kan ook, maar dat vraagt zware hardware en is niets voor een eerste kennismaking."
  - q: "Wat kost het gebruik via de API?"
    a: "Moonshot rekent ongeveer 3 dollar per miljoen input-tokens en 15 dollar per miljoen output-tokens, en die prijs blijft gelijk over het volledige contextvenster. Stuur je telkens dezelfde grote context mee — een lang systeemprompt of een vast document — dan is de prijs voor die herhaalde tokens uit cache aanzienlijk lager. Voor wie veel met vaste context werkt, scheelt dat flink."
---

Moonshot AI, een Chinese AI-onderneming, bracht in juli 2026 [Kimi K3](/tools/kimi) uit: een model van 2,8 biljoen parameters met een context van 1 miljoen tokens. Daarmee is het volgens Moonshot het grootste open-weights-model tot nu toe, met prestaties die in benchmarks in de buurt komen van de sterkste gesloten modellen. In deze korte gids zie je hoe je het uitprobeert — eerst zonder code, daarna via de API.

## Zonder code: de chat

De snelste manier om een gevoel te krijgen voor het model is de chatinterface op **kimi.com**. Je maakt een account aan en typt je vraag, net als bij andere AI-chatbots. Handig om te testen of het model geschikt is voor jouw soort werk voordat je iets bouwt. Vooral het grote contextvenster is hier interessant: je kunt een lang document plakken en er in één keer vragen over stellen.

## Met code: de API

Wil je Kimi K3 in je eigen toepassing gebruiken, dan werk je via het ontwikkelaarsplatform. De stappen:

1. Maak een account aan op het Kimi-platform en genereer een API-sleutel.
2. Wijs je code naar `https://api.moonshot.ai/v1`.
3. Gebruik model-ID `kimi-k3`.

De API is OpenAI-compatibel. Gebruik je al de OpenAI-bibliotheek, dan is de aanpassing klein:

```python
from openai import OpenAI

client = OpenAI(
    base_url="https://api.moonshot.ai/v1",
    api_key="JOUW_SLEUTEL"
)

antwoord = client.chat.completions.create(
    model="kimi-k3",
    messages=[{"role": "user", "content": "Vat dit rapport samen in vijf punten."}]
)
print(antwoord.choices[0].message.content)
```

Het model ondersteunt naast gewone tekst ook tool calling en gestructureerde uitvoer, wat het geschikt maakt voor agents die acties moeten kiezen in plaats van alleen antwoorden.

## Wat het kost

De prijs ligt rond 3 dollar per miljoen input-tokens en 15 dollar per miljoen output-tokens, gelijk over het hele contextvenster. Stuur je bij elke aanvraag dezelfde grote context mee — een vast systeemprompt of een document dat steeds terugkomt — dan wordt die herhaalde context uit cache flink goedkoper. Werk je veel met vaste context, dan is dat een reden om je aanvragen zo op te bouwen dat het herhaalde deel vooraan staat.

## Wanneer Kimi K3 de moeite waard is

De grote troef is het contextvenster van 1 miljoen tokens: een heel dossier, wetboek of codebasis in één keer verwerken. Voor kortere, alledaagse vragen voegt zo'n groot model weinig toe boven een lichter alternatief, en betaal je vooral voor rekenkracht die je niet gebruikt. Overweeg Kimi K3 dus zodra je taak draait om veel materiaal tegelijk overzien of langlopend redeneren. Voor een eerste kennismaking blijft de chat op kimi.com de laagdrempeligste ingang.
