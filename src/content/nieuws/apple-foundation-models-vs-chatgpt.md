---
title: "Gratis AI op je iPhone: Apple Foundation Models vs ChatGPT"
description: "Apple's Foundation Models draaien gratis en offline op je iPhone. Wanneer is dat genoeg, en wanneer pak je toch ChatGPT? Een praktische keuzehulp."
publishedAt: 2026-06-22
updatedAt: 2026-06-22
author: "Redactie"
category: "gids"
tags:
  - "chatgpt"
  - "apple-foundation-models"
  - "on-device-ai"
  - "ios-26"
  - "privacy"
  - "offline-ai"
toolSlug: "chatgpt"
featured: false
draft: false
readingTime: 4
heroImage: "/images/articles/diorama-apple-foundation-models-vs-chatgpt.webp"
heroImageAlt: "Miniatuur diorama-illustratie bij artikel 'Gratis AI op je iPhone: Apple Foundation Models vs ChatGPT'"
heroScene: "A miniature smartphone on a workbench with a tiny brain chip inside, beside a small cloud-shaped server connected by a thin cable"
keyTakeaways:
  - "Apple's Foundation Models is een on-device AI-model dat gratis en offline op je iPhone draait — je data blijft op het toestel."
  - "Het model is klein (zo'n 3 miljard parameters) en werkt op iPhone 15 Pro en nieuwer, M-serie iPads en Macs."
  - "Voor samenvatten, herschrijven en korte taken is on-device prima; voor zwaar redeneren of actuele kennis pak je een cloud-model als ChatGPT."
  - "De keuze gaat om privacy en kosten versus kracht: lokaal is gratis en privé, de cloud is sterker maar stuurt je data weg."
faq:
  - q: "Is Apple's Foundation Models framework gratis te gebruiken?"
    a: "Ja. Het model draait lokaal op je Apple-toestel en kost geen API-geld per gebruik, omdat er geen cloud-server aan te pas komt. Ontwikkelaars kunnen het via een Swift-API in hun app inbouwen zonder per-verzoek-kosten. Je betaalt dus niet per vraag, zoals bij een cloud-model wel het geval is. De prijs zit indirect in het toestel: je hebt wel een recente iPhone of Mac nodig."
  - q: "Wanneer kies je ChatGPT in plaats van het on-device model van Apple?"
    a: "Kies een cloud-model als ChatGPT wanneer je taak zwaarder is dan het kleine on-device model aankan: complex redeneren, lange documenten analyseren, code schrijven of actuele informatie ophalen. Apple's model van zo'n 3 miljard parameters is gemaakt voor snelle, afgebakende taken op het toestel. Voor diepgang en breedte zijn de grote cloud-modellen voorlopig sterker."
  - q: "Blijft mijn data privé bij on-device AI?"
    a: "Bij Apple's Foundation Models wel: alle invoer en uitvoer blijven op je toestel, want het model draait lokaal en werkt zelfs offline. Er gaat geen tekst naar een externe server. Bij een cloud-model zoals ChatGPT stuur je je vraag wél naar de servers van de aanbieder, dus daar speelt het privacy-vraagstuk wél. Voor gevoelige gegevens is on-device daarom de veiligere keuze."
---

Sinds iOS 26 zit er een AI-model ín je iPhone dat gratis en offline werkt. Geen abonnement, geen data die naar een server reist. Klinkt goed — maar betekent dat het einde van ChatGPT op je telefoon? Niet helemaal. We leggen uit wat Apple's Foundation Models wél en níét kunnen, en wanneer je beter naar de cloud grijpt.

## Wat is Apple Foundation Models precies?

Het is het on-device AI-model dat achter Apple Intelligence zit, sinds iOS 26 toegankelijk voor apps via een Swift-API ([Bron: Apple Developer](https://developer.apple.com/documentation/FoundationModels)). "On-device" is het sleutelwoord: het model draait op je toestel zelf, niet in een datacenter. Daardoor werkt het offline en blijft alles wat je erin stopt op je iPhone. Onder de motorkap is het net als ChatGPT een transformer-model — wat dat betekent lees je in onze uitleg over [CNN's, RNN's en transformers](/nieuws/cnn-rnn-transformers-huggingface-uitleg).

De prijs van die privacy is omvang. Het gaat om een model van zo'n 3 miljard parameters dat lokaal draait op Apple Silicon: iPhone 15 Pro en nieuwer, M-serie iPads en alle M-serie Macs ([Bron: Stora](https://stora.sh/blog/2026-04-21-apple-foundation-models-framework-ios-26-integration-guide)). Klein en snel, maar geen alleskunner. Wil je lokaal méér kracht dan zo'n 3B-model, dan kun je op een Mac of pc zelf grotere modellen draaien — zie onze gids over [open-weight modellen lokaal draaien](/nieuws/open-weight-modellen-lokaal-draaien).

## Waar het lokale model in uitblinkt

Voor afgebakende taken op je toestel is dit model precies genoeg: een mail samenvatten, een tekst herschrijven, een lijstje uit een notitie halen, een korte vraag beantwoorden. Het werkt direct, zonder wachttijd op een server, en zonder dat je gegevens je toestel verlaten.

> **💡 Beginner-tip:** Je hoeft hier zelf niets voor te installeren. Apps die de functie inbouwen, gebruiken het model gewoon op de achtergrond. Merk je dat een app sneller en zonder internet samenvat of herschrijft? Dan draait dat waarschijnlijk lokaal op je toestel.

## Wanneer je toch ChatGPT (of een ander cloud-model) wilt

Zodra een taak zwaarder wordt, loopt het kleine model tegen zijn grenzen aan. Complex redeneren over een lang document, programmeercode schrijven, of een vraag die actuele kennis vereist — daarvoor zijn de grote cloud-modellen als ChatGPT voorlopig sterker. Die draaien op forse servers en zijn getraind op veel meer parameters.

De afweging is dus eigenlijk simpel:

- **Lokaal (Apple Foundation Models):** gratis, privé, offline, snel — maar beperkt in kracht.
- **Cloud (ChatGPT):** krachtig, breed inzetbaar, actueel — maar je stuurt je vraag naar een externe server en betaalt vaak voor de betere modellen.

Voor gevoelige gegevens kies je het lokale model. Voor diepgang en moeilijke vragen pak je de cloud. In de praktijk gebruik je ze naast elkaar, afhankelijk van wat een taak vraagt.

Wil je weten wat je wettelijk moet regelen als je klantgegevens door een AI laat verwerken? Lees op hetlaatsteainieuws.nl onze duiding over [AVG en AI-tools voor zzp'ers](https://hetlaatsteainieuws.nl/ai-nieuws/ai-kloon-van-jezelf-voor-klanten).

## Checklist: welke kies je?

- [ ] Is je taak kort en afgebakend (samenvatten, herschrijven)? → on-device kan prima
- [ ] Werk je met gevoelige gegevens? → on-device, want je data blijft op het toestel
- [ ] Zit je zonder internet? → on-device werkt offline
- [ ] Moet er zwaar geredeneerd worden of is actuele kennis nodig? → cloud-model als ChatGPT
- [ ] Heb je een iPhone 15 Pro of nieuwer / M-serie Mac? → anders is het on-device model niet beschikbaar

## Bronnen

- [Foundation Models — Apple Developer Documentation](https://developer.apple.com/documentation/FoundationModels)
- [Meet the Foundation Models framework — WWDC25 (Apple)](https://developer.apple.com/videos/play/wwdc2025/286/)
- [A Developer's Guide to Apple's Foundation Models Framework in iOS 26 — HackerNoon (aanleiding)](https://hackernoon.com/a-developers-guide-to-apples-foundation-models-framework-in-ios-26)
