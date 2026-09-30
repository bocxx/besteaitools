---
title: "Replicate voor beginners: je eerste AI-afbeelding via de API"
heroImage: "/images/articles/diorama-replicate-eerste-afbeelding-api-python.webp"
description: "Met Replicate draai je open-source modellen als FLUX zonder eigen GPU. Zo installeer je de Python-client, zet je je token en genereer je je eerste afbeelding."
publishedAt: 2026-09-30
updatedAt: 2026-09-30
author: "Redactie"
category: "gids"
tags:
  - "replicate"
  - "flux"
  - "api"
  - "python"
  - "afbeeldingen-genereren"
  - "open-source-modellen"
toolSlug: "replicate"
featured: false
draft: false
readingTime: 4
heroImageAlt: "Miniatuur diorama-illustratie bij artikel 'Replicate voor beginners: je eerste AI-afbeelding via de API'"
heroScene: "A tiny mail slot swallowing a typed paper note while a small printed photograph slides out below, cables trailing away"
keyTakeaways:
  - "Replicate laat je open-source modellen als FLUX aanroepen via een API, zonder eigen GPU en zonder het model zelf te installeren."
  - "Je hebt drie dingen nodig: `pip install replicate`, een token van replicate.com/account/api-tokens en de omgevingsvariabele REPLICATE_API_TOKEN."
  - "Je betaalt per gebruik. Het model uit de quickstart, flux-schnell, kost 3 dollar per duizend afbeeldingen — ongeveer 0,003 dollar per stuk."
  - "De zwaardere FLUX-varianten zijn een orde duurder: flux-dev staat op 0,025 en flux-1.1-pro op 0,04 dollar per afbeelding."
  - "Cloudflare kondigde op 17 november 2025 aan Replicate over te nemen; volgens Cloudflare blijven bestaande API's en workflows werken."
faq:
  - q: "Wat is Replicate?"
    a: "Een cloudplatform waarop je open-source AI-modellen voor beeld, spraak, video en tekst via één API aanroept en per gebruik betaalt. Je installeert het model niet zelf: je stuurt een verzoek en krijgt het resultaat terug."
  - q: "Wat kost een afbeelding genereren met Replicate?"
    a: "Dat hangt sterk af van het model. flux-schnell, het snelle model uit de quickstart, staat op 3 dollar per duizend uitvoerafbeeldingen — dus ongeveer 0,003 dollar per stuk. flux-dev kost 0,025 dollar per afbeelding en flux-1.1-pro 0,04 dollar. Andere modellen rekenen per seconde GPU-tijd; op elke modelpagina zie je een schatting voordat je draait."
  - q: "Heb ik een eigen GPU nodig voor Replicate?"
    a: "Nee. Het model draait op de GPU's van Replicate. Jij stuurt een verzoek via de API en krijgt het resultaat terug. Wil je juist lokaal werken, dan is een tool als Ollama een logischer route."
  - q: "Werkt Replicate nog na de overname door Cloudflare?"
    a: "Cloudflare kondigde de overname aan op 17 november 2025 en schrijft dat bestaande API's en workflows zonder onderbreking blijven werken, en dat de modelcatalogus ook naar Workers AI komt. Voor een eerste project verandert er niets; bouw je iets groters, houd dan de Replicate-documentatie in de gaten."
---

Replicate is een platform waarop je open-source AI-modellen draait zonder ze zelf te installeren. Je kiest een model, stuurt een verzoek via de API en krijgt het resultaat terug. Deze mini-gids laat zien hoe je in een paar minuten je eerste afbeelding maakt met FLUX, het beeldmodel dat we eerder uitgebreid [leerden prompten](/nieuws/flux-2-tekst-in-beeld-prompten).

## Wat je nodig hebt

Een Replicate-account, Python en een terminal. Je betaalt per gebruik, dus je hebt ook een betaalmethode nodig. Reken vooraf even door wat je van plan bent: het snelle model uit de quickstart, `flux-schnell`, kost 3 dollar per duizend uitvoerafbeeldingen, en de zwaardere varianten `flux-dev` (0,025 dollar) en `flux-1.1-pro` (0,04 dollar) rekenen per afbeelding ([Bron: Replicate Pricing](https://replicate.com/pricing)). Voor proberen en prompts uittesten is dat verschil van een factor tien het overwegen waard.

## Stap 1: installeer de Python-client

```bash
pip install replicate
```

## Stap 2: maak een API-token

Maak op [replicate.com/account/api-tokens](https://replicate.com/account/api-tokens) een token aan en zet het als omgevingsvariabele, zodat het niet in je code belandt:

```bash
export REPLICATE_API_TOKEN=r8_jouw_token
```

> **Beginner-tip:** Plak je token nooit in een script dat je deelt of in Git zet. De client leest `REPLICATE_API_TOKEN` zelf uit je omgeving, dus je hoeft hem nergens in je code te noemen.

## Stap 3: draai het model

```python
import replicate

output = replicate.run(
    "black-forest-labs/flux-schnell",
    input={"prompt": "an iguana on the beach, pointillism"}
)

with open("output.png", "wb") as f:
    f.write(output[0].read())
```

Dit is het voorbeeld uit de [Python-quickstart van Replicate](https://replicate.com/docs/get-started/python). Het model geeft `FileOutput`-objecten terug; met `.read()` haal je de bytes op en schrijf je ze naar een bestand ([Bron: Replicate Docs](https://replicate.com/docs/get-started/python)).

## Stap 4: test eerst in de browser

Wil je eerst zien wat een model doet? Elke modelpagina heeft een playground in de browser, met een kostenschatting voordat je iets draait. Dat is de goedkoopste manier om prompts uit te proberen voordat je ze in code zet — en het scheelt je de rondgang van foutmeldingen over inputvelden die je nog niet kent.

> **Gevorderden:** Eigen modellen verpak je met het open-source hulpmiddel Cog en draai je op Replicate. Let op dat je bij private modellen ook betaalt voor opstart- en inactieve tijd; alleen bij fast booting fine-tunes reken je uitsluitend de actieve tijd af ([Bron: Replicate Pricing](https://replicate.com/pricing)).

## Wat de Cloudflare-overname betekent

Cloudflare kondigde op 17 november 2025 aan Replicate over te nemen. Volgens [Cloudflare](https://blog.cloudflare.com/replicate-joins-cloudflare/) blijven bestaande API's en workflows zonder onderbreking werken en komt de modelcatalogus ook naar Workers AI. Voor een eerste project verandert er dus niets. Bouw je iets groters, houd dan de Replicate-documentatie in de gaten — de aankondiging is nog geen afgeronde integratie.

Dat je hier per afbeelding of per GPU-seconde afrekent, is geen boekhoudkundig detail: hetlaatsteainieuws.nl legde uit [hoe AI-inferentie in 2026 van tokens naar watts rekent](https://www.hetlaatsteainieuws.nl/achtergrond/ai-inferentie-in-2026-van-tokens-tot-watts), en dat is precies de rekening die je hier ziet.

## Checklist: ben je klaar?

- [ ] Replicate-account met betaalmethode actief
- [ ] `pip install replicate` gelukt in je (virtuele) omgeving
- [ ] `REPLICATE_API_TOKEN` staat in je omgeving, niet in je code
- [ ] Je weet welk FLUX-model je aanroept en wat dat per afbeelding kost
- [ ] Eerste prompt getest in de browser-playground
- [ ] Script draait en schrijft een bestand weg
- [ ] Token staat niet in een repo die je pusht

Wil je dit uitbouwen tot iets dat zelf beslist wanneer het een afbeelding maakt, dan is onze gids over [je eerste AI-agent bouwen in Python](/nieuws/eerste-ai-agent-bouwen-python) de volgende stap.

## Bronnen

- [Replicate — Python quickstart](https://replicate.com/docs/get-started/python) — installatie, token en het codevoorbeeld
- [Replicate — Pricing](https://replicate.com/pricing) — prijs per model en de regels voor private modellen
- [Cloudflare Blog — Replicate is joining Cloudflare](https://blog.cloudflare.com/replicate-joins-cloudflare/) — de overname en wat er voor bestaande gebruikers verandert
