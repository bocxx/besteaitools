---
title: "Llama of Muse Glimmer: welk open Meta-model download je in 2026?"
heroImage: "/images/articles/diorama-llama-of-muse-glimmer-welk-meta-model-kies-je.webp"
description: "Meta bracht in augustus Muse Glimmer uit, een 30B-model onder Apache 2.0 dat op één GPU draait. Wanneer je dat pakt, en wanneer Llama 4 nog steeds beter past."
publishedAt: 2026-08-20
updatedAt: 2026-08-20
author: "Redactie"
category: "gids"
tags:
  - "llama"
  - "muse-glimmer"
  - "meta"
  - "open-weights"
  - "apache-2-0"
  - "lokaal-draaien"
  - "licenties"
toolSlug: "llama"
featured: false
draft: false
readingTime: 4
heroImageAlt: "Miniatuur diorama-illustratie bij artikel 'Llama of Muse Glimmer: welk open Meta-model download je in 2026?'"
heroScene: "Two miniature model boxes side by side on a workbench, one large and heavy, one small enough to fit on a single tiny graphics card"
keyTakeaways:
  - "Meta bracht op 10 augustus 2026 Muse Glimmer uit: 30B dense, multimodaal, Apache 2.0 en ongated op Hugging Face."
  - "Glimmer past rond 4-bit onder de 20 GB en draait daarmee op één consumenten-GPU of een Mac."
  - "Llama 4 blijft onder de Llama Community License, met beperkingen die vooral EU-bedrijven raken."
  - "Kies op licentie eerst, op hardware daarna: dat scheelt een download van tientallen gigabytes."
faq:
  - q: "Wat is Muse Glimmer precies?"
    a: "Een taalmodel van 30 miljard parameters dat Meta op 10 augustus 2026 uitbracht, gedistilleerd uit het grotere en gesloten Muse Spark. Het is dense (dus geen mixture-of-experts), multimodaal, heeft een contextvenster van 128K en staat ongated op Hugging Face onder de Apache 2.0-licentie. Meta mikt er expliciet op dat het op één consumenten-GPU of op een Mac draait, voor agent-achtige taken op je eigen apparaat."
  - q: "Waarom is die Apache 2.0-licentie belangrijk?"
    a: "Omdat het een echte open-source-licentie is, zonder de extra voorwaarden die Meta bij Llama hanteert. De Llama Community License verplicht tot attributie, vereist een aparte licentie boven 700 miljoen gebruikers en sluit de multimodale Llama 4-varianten uit voor in de EU gevestigde bedrijven. Bij Apache 2.0 spelen die vragen niet. Voor een Nederlands bedrijf dat iets commercieel wil uitrollen, is dat het verschil tussen wel of geen juridische check vooraf."
  - q: "Kan mijn laptop dit aan?"
    a: "Als je rond 4-bit kwantiseert, blijft Muse Glimmer onder de 20 GB. Dat past op één moderne consumenten-GPU met voldoende VRAM, of op een Mac met genoeg unified memory. Llama 4 Scout en Maverick zijn MoE-modellen met 17 miljard actieve parameters maar tot 400 miljard totaal; die vragen aanzienlijk meer geheugen of een serverkaart. Ga je puur op wat er thuis draait, dan wint Glimmer."
  - q: "Is Llama daarmee dood?"
    a: "Nee, maar de rol is veranderd. Meta Superintelligence Labs verlegde in april 2026 de frontier-focus naar het gesloten Muse Spark, waardoor Llama vooral doorgaat als onderhouden open fundament. Er hangt een groot ecosysteem aan: fine-tunes, tooling, providers als Bedrock en Groq. Draai je al op Llama en werkt het, dan is er geen reden tot haast."
  - q: "Komen de gewichten van Muse Spark ook vrij?"
    a: "Meta heeft aangekondigd de gewichten van het gesloten Muse Spark 1.2 open te maken, maar per 13 augustus 2026 waren die nog niet uitgebracht. Bouw je planning dus niet op die belofte. Werk met wat er nu staat en behandel Spark als een mogelijke bonus."
---

Meta heeft sinds 10 augustus twee open modellenlijnen naast elkaar staan, en dat maakt de keuze onnodig verwarrend. [Llama](/tools/llama) is het bekende fundament van de open-source AI-wereld. Muse Glimmer is de nieuwkomer die op je eigen laptop moet draaien. In deze gids kies je in drie stappen welke van de twee je download.

## Stap 1: check eerst de licentie, niet de benchmark

Dit is de stap die de meeste mensen overslaan en waar het het vaakst misgaat.

**Muse Glimmer** staat onder Apache 2.0. Dat is een echte open-source-licentie: gebruiken, aanpassen, commercieel uitrollen, zonder aanvullende voorwaarden van Meta. De gewichten staan bovendien ongated op Hugging Face, dus je hoeft geen formulier in te vullen om ze te mogen ophalen.

**Llama 4** valt onder de Llama Community License. Die is gratis, maar niet OSI-open source. Er geldt een attributieplicht, boven 700 miljoen gebruikers heb je een aparte licentie nodig, en de multimodale varianten zijn onder die licentie uitgesloten voor bedrijven die in de EU gevestigd zijn. Dat laatste raakt je direct als je hier zit en met beeld wilt werken.

> **💡 Beginner-tip:** "open weights" betekent dat je de modelbestanden mag downloaden en zelf draaien. Het betekent niet automatisch dat je ermee mag doen wat je wilt. De licentie ernaast bepaalt dat, en die verschilt per model.

## Stap 2: reken je geheugen uit

Muse Glimmer is een dense model van 30 miljard parameters. Rond 4-bit gekwantiseerd blijft het onder de 20 GB, en dat is precies het punt waarop het op één consumenten-GPU of een Mac met genoeg unified memory past. Het contextvenster is 128K en het model is multimodaal.

Llama 4 werkt anders. Scout en Maverick zijn mixture-of-experts-modellen: 17 miljard actieve parameters, maar tot 400 miljard in totaal. Alleen de actieve experts rekenen mee per token, maar het hele model moet wel ergens staan. In de praktijk betekent dat serverhardware, of een provider die het voor je host.

Vuistregel: wil je het op je eigen machine, begin bij Glimmer. Wil je maximale kwaliteit en huur je toch capaciteit in, dan is Llama 4 via [Ollama](/tools/ollama), [vLLM](/tools/vllm) of een API-aanbieder nog steeds een prima route.

## Stap 3: haal het model binnen

Voor Glimmer staan de gewichten ongated op Hugging Face, dus je kunt ze rechtstreeks ophalen. Wil je het via [Ollama](/tools/ollama) draaien, zoek dan in de modelbibliotheek op de naam en kopieer het tag dat daar staat:

```bash
ollama pull <tag-uit-de-ollama-bibliotheek>
ollama run <tag-uit-de-ollama-bibliotheek>
```

⚠️ **Check de exacte tag bij de bron.** Modelnamen in Ollama en op Hugging Face verschillen vaak net iets van de marketingnaam, en bij een model van twee weken oud verschuift dat nog. Draait het niet vloeiend, pak dan een zwaarder gekwantiseerde variant: elke stap omlaag in kwantisatie scheelt geheugen en kost een beetje kwaliteit.

Voor Llama 4 loopt het meestal via een provider. Dan betaal je per token in plaats van per uur GPU, en hoef je zelf niets te hosten. Voor incidenteel gebruik is dat vrijwel altijd goedkoper dan een kaart kopen.

## En de rest van Meta's plannen?

Meta heeft aangekondigd dat ook de gewichten van het gesloten Muse Spark 1.2 openbaar worden. Per 13 augustus 2026 was dat nog niet gebeurd. Reken er dus niet op in je planning.

Kort samengevat: EU-bedrijf dat iets commercieel uitrolt op eigen hardware, pak Muse Glimmer. Draai je al op Llama met een werkende pijplijn, blijf dan zitten tot je een concrete reden hebt om te wisselen. Weegt meertaligheid zwaar en wil je niet zelf hosten, dan is [Qwen via het Anthropic-compatibele endpoint](/nieuws/qwen-anthropic-sdk-koppelen) het derde spoor.
