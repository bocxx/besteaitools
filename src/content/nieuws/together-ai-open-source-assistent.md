---
title: "Together AI gebruiken: een privé AI-assistent met open modellen"
description: "Met Together AI draai je open-source modellen via één API. In vier stappen ga je van account naar een werkende, betaalbare AI-assistent op eigen voorwaarden."
publishedAt: 2026-09-23
updatedAt: 2026-09-23
author: "Redactie"
category: "gids"
tags:
  - "together-ai"
  - "open-source-ai"
  - "llm-api"
  - "ai-assistent"
  - "developers"
  - "mkb"
toolSlug: "together-ai"
featured: false
draft: false
readingTime: 5
heroImage: "/images/articles/diorama-together-ai-open-source-assistent.webp"
heroImageAlt: "Miniatuur diorama-illustratie bij artikel 'Together AI gebruiken: een privé AI-assistent met open modellen'"
heroScene: "A chrome robot pulls glowing model cards from a wall of tiny brass drawers and slots one into a small desktop machine"
evergreen: true
volatility: high
factsCheckedAt: 2026-09-23
watch:
  - "together-ai-pricing"
  - "together-ai-modellen"
keyTakeaways:
  - "Together AI is een AI-cloud die meer dan 200 open-source modellen (Llama, DeepSeek, Qwen) aanbiedt via één betaalbare, OpenAI-compatibele API."
  - "Je rekent per token af — geen abonnement, geen minimum — wat het een goedkoop alternatief maakt voor de gesloten frontier-API's."
  - "Omdat de API OpenAI-compatibel is, koppel je bestaande code of tools meestal met alleen een andere sleutel en URL."
  - "Ideaal voor wie eigen controle wil over model en kosten; je hebt wel basale technische handigheid nodig om de API te gebruiken."
faq:
  - q: "Wat is Together AI en waarvoor gebruik je het?"
    a: "Together AI is een AI-cloud die hosted toegang geeft tot meer dan 200 open-source modellen — van taalmodellen als Llama, DeepSeek en Qwen tot beeld- en spraakmodellen. Je gebruikt het om die modellen via een API in je eigen applicatie, script of tool te draaien, zonder zelf dure GPU's te beheren. Het is populair bij teams die open modellen serieus in productie willen draaien en bij ontwikkelaars die een goedkoper alternatief zoeken voor de gesloten frontier-API's."
  - q: "Hoeveel kost Together AI?"
    a: "Together AI rekent per gebruik af: je betaalt per miljoen verwerkte tokens, zonder abonnement of minimumafname. De prijs verschilt sterk per model — kleinere modellen zijn een paar cent per miljoen tokens, zwaardere modellen kosten meer. Voor de actuele tarieven en het startkrediet bij aanmelding: zie de box 'Stand van zaken' onderaan, want die cijfers wijzigen regelmatig."
  - q: "Heb ik programmeerervaring nodig voor Together AI?"
    a: "Een beetje wel. Together AI is in de kern een API, dus je werkt met een sleutel, een stukje code of een tool die API's kan aanroepen. Je hoeft geen ervaren ontwikkelaar te zijn — de API is OpenAI-compatibel, dus veel voorbeelden en tools werken meteen — maar volledig zonder technische handigheid kom je er niet. Wie liever klikt dan codeert, is beter af met een kant-en-klare chatbot."
  - q: "Waarom open-source modellen in plaats van ChatGPT of Claude?"
    a: "Open modellen geven je meer controle: over de kosten, over welk model je draait, en over waar je data heen gaat. Je zit niet vast aan één leverancier en kunt schakelen als een model verdwijnt of duurder wordt. Het nadeel is dat de beste open modellen vaak nog net iets onder de sterkste gesloten modellen presteren, en dat je het zelf moet inrichten. Het is een afweging tussen controle en gemak."
sources:
  - label: "Together AI — officiele prijspagina"
    url: "https://www.together.ai/pricing"
  - label: "Together AI — officiele website"
    url: "https://www.together.ai"
---

Wil je AI inzetten zonder vast te zitten aan één leverancier — en zonder per gebruiker te betalen voor een abonnement dat je niet helemaal benut? Dan is Together AI het bekijken waard. Het is een AI-cloud die meer dan 200 open-source modellen via één API aanbiedt, waar je per token voor afrekent. In deze gids ga je in vier stappen van een leeg account naar een werkende, betaalbare AI-assistent op je eigen voorwaarden.

## Stap 1 — Account aanmaken en API-sleutel ophalen

Ga naar together.ai en maak een account aan. Nieuwe gebruikers krijgen doorgaans een klein startkrediet om gratis te experimenteren (zie de box onderaan voor het actuele bedrag). Na het inloggen vind je in je dashboard de sectie *API Keys*. Maak daar één sleutel aan en bewaar die veilig — die heb je straks nodig om je code toegang te geven. Behandel de sleutel als een wachtwoord; zet 'm nooit zichtbaar in een openbaar bestand.

## Stap 2 — Kies een model uit de catalogus

Together AI's kracht is de breedte: Llama, DeepSeek, Qwen, Mistral en tientallen andere ([Bron: Together AI](https://www.together.ai)). Begin klein. Een licht model is goedkoop en snel genoeg om mee te leren; een zwaarder model bewaar je voor taken waar kwaliteit echt telt. In het dashboard zie je per model de prijs per miljoen tokens, zodat je vooraf weet wat een keuze ongeveer kost.

> **💡 Beginner-tip:** Twijfel je welk model? Pak voor je eerste test een klein, goedkoop taalmodel. Je leert er precies hetzelfde mee — de API werkt voor elk model gelijk — en je verbrandt geen krediet terwijl je nog aan het uitproberen bent.

## Stap 3 — Je eerste aanroep doen

Hier zit de prettige verrassing: de API van Together AI is OpenAI-compatibel. Gebruikte je al code of een tool die met de OpenAI-API praat, dan hoef je meestal alleen de basis-URL en de sleutel te wijzigen om naar Together te wijzen. Je stuurt een berichtje ("schrijf een korte begroeting") en krijgt het antwoord van het gekozen model terug. Werkte dat? Dan staat je verbinding, en de rest is een kwestie van uitbouwen.

## Stap 4 — Bouw er een simpele assistent omheen

Een "assistent" is in de kern een lus: je stuurt de vraag van de gebruiker plus de eerdere berichten mee, en toont het antwoord. Wil je het zonder veel code, koppel de API dan aan een automatiseringstool. Hoe je zoiets opzet, lees je in onze gids over [automatiseren met AI](/nieuws/automatiseren-met-ai-make-zapier-n8n). Liever via een code-editor met AI-hulp werken? Begin dan bij [coderen met AI voor beginners](/nieuws/coderen-met-ai-cursor-copilot-beginners).

> **⚡ Gevorderden:** Together AI ondersteunt streaming, function calling en JSON-mode, en biedt naast serverless inference ook fine-tuning en dedicated endpoints. Draai je een model serieus in productie, dan houd je met dedicated endpoints de latency stabieler dan op de gedeelde serverless-route.

Het zelf draaien van open modellen past in een bredere beweging om AI minder afhankelijk te maken van één partij en van de cloud. Waarom dat ertoe doet — en hoe ver het al gaat — beschrijft hetlaatsteainieuws.nl in [AI in de browser, zonder server](https://hetlaatsteainieuws.nl/ai-innovatie/ai-in-de-browser-zonder-server).

## Checklist: ben je klaar?

- [ ] Account aangemaakt op together.ai en startkrediet gecontroleerd
- [ ] Eén API-sleutel gegenereerd en veilig opgeslagen (niet in openbare code)
- [ ] Een klein, goedkoop model gekozen voor je eerste test
- [ ] Een eerste geslaagde API-aanroep gedaan (antwoord ontvangen)
- [ ] De prijs per miljoen tokens van je gekozen model bekeken
- [ ] Een verbruikslimiet of waarschuwing ingesteld zodat kosten niet weglopen

## Stand van zaken — bijgewerkt 2026-09-23

- **Prijsmodel:** pay-as-you-go per token, geen abonnement of minimumafname. Serverless inference loopt grofweg van enkele centen tot een paar euro per miljoen tokens, afhankelijk van het model ([Bron: CloudZero](https://www.cloudzero.com/blog/together-ai-pricing/)).
- **Startkrediet:** meerdere bronnen noemen rond $25 gratis krediet bij aanmelding, maar dat bedrag staat niet altijd op de officiële prijspagina — controleer het bij het aanmaken van je account ([Bron: eesel AI](https://www.eesel.ai/blog/together-ai-pricing)).
- **Catalogus:** 200+ open-source modellen (o.a. Llama, DeepSeek, Qwen, Mistral), plus beeld-, video- en spraakmodellen.
- Prijzen, modellen en kredietregelingen wijzigen vaak. Bevestig actuele cijfers altijd op de officiële prijspagina van Together AI.

## Bronnen

- [Together AI Pricing In 2026: Models, Costs, And How To Manage Your Bill — CloudZero](https://www.cloudzero.com/blog/together-ai-pricing/)
- [A complete guide to Together AI pricing in 2026 — eesel AI](https://www.eesel.ai/blog/together-ai-pricing)
- [Together AI — officiële website](https://www.together.ai)
