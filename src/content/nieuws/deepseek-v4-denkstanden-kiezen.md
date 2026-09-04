---
title: "DeepSeek V4 heeft drie denkstanden — zo kies je de juiste"
description: "Non-think, Think High of Think Max: bij DeepSeek V4 kies je zelf hoeveel het model nadenkt. Wat elke stand kost, oplevert, en wanneer je hem gebruikt."
publishedAt: 2026-09-04
author: "Redactie"
category: "gids"
tags:
  - "deepseek"
  - "deepseek-v4"
  - "reasoning"
  - "open-weight"
  - "vllm"
  - "lokale-ai"
toolSlug: "deepseek"
featured: false
draft: false
readingTime: 4
heroImage: "/images/articles/diorama-deepseek-v4-denkstanden-kiezen.webp"
heroImageAlt: "Miniatuur diorama-illustratie bij tutorial over de denkstanden van DeepSeek V4"
heroScene: "A tiny three-position lever on a workbench, each notch labelled with a differently sized stack of paper, and a small robot deciding which to pull"
keyTakeaways:
  - "DeepSeek V4-Pro en V4-Flash hebben drie denkstanden: Non-think, Think High en Think Max. Je kiest ze per verzoek."
  - "Het verschil is enorm bij moeilijke taken: op LiveCodeBench gaat V4-Pro van 56,8 procent in Non-think naar 93,5 procent in Think Max."
  - "Bij eenvoudige taken levert extra denken bijna niets op — daar betaal je alleen tokens en wachttijd."
  - "Voor Think Max raadt DeepSeek een contextvenster van minimaal 384K tokens aan; lokaal draai je met temperature 1.0 en top_p 1.0."
faq:
  - q: "Wat zijn de drie denkstanden van DeepSeek V4?"
    a: "Non-think geeft snelle, intuïtieve antwoorden zonder zichtbaar redeneerspoor — bedoeld voor routineklusjes en beslissingen met een laag risico. Think High voert bewuste logische analyse uit: langzamer, maar nauwkeuriger, en bedoeld voor complexe problemen en planning. Think Max duwt het redeneren tot het uiterste en is volgens DeepSeek bedoeld om de grens van wat het model kan op te zoeken. Beide modellen uit de V4-serie, Pro en Flash, ondersteunen alle drie."
  - q: "Hoeveel scheelt zo'n denkstand echt?"
    a: "Bij moeilijke taken heel veel. DeepSeek publiceert per stand benchmarkscores voor V4-Pro: op LiveCodeBench 56,8 procent in Non-think, 89,8 in Think High en 93,5 in Think Max. Op Humanity's Last Exam is het verschil nog groter: 7,7 procent zonder denken tegen 37,7 procent in Think Max. Op eenvoudiger kennisvragen is het verschil klein — MMLU-Pro gaat van 82,9 naar 87,5. Daar is de extra rekentijd het meestal niet waard."
  - q: "Welke stand kies ik voor welk werk?"
    a: "Non-think voor samenvatten, herschrijven, classificeren, vertalen en korte vraag-en-antwoord. Think High voor code schrijven en debuggen, wiskunde, planningsvraagstukken en analyses met meerdere stappen. Think Max voor de enkele taak waar je echt op het randje zit: een lastig bewijs, een complexe refactor, een agentische taak die veel stappen moet overzien. Begin bij Think High en ga alleen omhoog als het antwoord tekortschiet."
  - q: "Wat kost het extra?"
    a: "Denkstanden kosten geen ander tarief per token, maar het model genereert er wél veel meer. Een Think Max-antwoord verbruikt makkelijk een veelvoud aan output-tokens ten opzichte van Non-think, plus de bijbehorende wachttijd. Voor de prijs per token kijk je bij je provider — de kosten van de kale weights zijn nul, maar hosting en inferentie zijn dat niet. Zie de peildatum onderaan."
  - q: "Kan ik DeepSeek V4 zelf draaien?"
    a: "Ja. Zowel V4-Pro (1,6 biljoen parameters, 49 miljard actief) als V4-Flash (284 miljard, 13 miljard actief) staat onder MIT-licentie op Hugging Face, inclusief commercieel gebruik. Draaien kan met vLLM of SGLang, en er zijn gekwantiseerde varianten voor llama.cpp, Ollama en LM Studio. Let op: V4-Pro heeft geen Jinja-chattemplate; DeepSeek levert in plaats daarvan een encoding-map met Python-scripts om berichten te coderen."
sources:
  - label: "deepseek-ai/DeepSeek-V4-Pro — modelkaart en benchmarks"
    url: "https://huggingface.co/deepseek-ai/DeepSeek-V4-Pro"
    author: "DeepSeek-AI"
  - label: "DeepSeek-V4: Towards Highly Efficient Million-Token Context Intelligence"
    url: "https://arxiv.org/abs/2606.19348"
    author: "DeepSeek-AI"
  - label: "DeepSeek — officiële site"
    url: "https://www.deepseek.com/"
    author: "DeepSeek"
---

De meeste modellen beslissen zelf hoe lang ze nadenken. DeepSeek V4 legt die knop bij jou neer, en het verschil tussen de standen is groter dan je zou verwachten.

## Drie standen, één model

DeepSeek-V4-Pro en het lichtere V4-Flash ondersteunen allebei drie redeneermodi. Je kiest ze per verzoek, dus je hoeft niet van model te wisselen.

**Non-think** slaat het redeneerspoor over en antwoordt meteen. **Think High** doet bewuste, stapsgewijze analyse: langzamer, maar preciezer. **Think Max** rekt dat op tot het uiterste, met een speciale systeemprompt en een fors langer denkspoor.

## Wat het oplevert

DeepSeek publiceert per stand benchmarkscores voor V4-Pro, en die maken de keuze concreet:

| Taak | Non-think | Think High | Think Max |
|---|---|---|---|
| LiveCodeBench (code) | 56,8 | 89,8 | 93,5 |
| GPQA Diamond (wetenschap) | 72,9 | 89,1 | 90,1 |
| Humanity's Last Exam | 7,7 | 34,5 | 37,7 |
| MMLU-Pro (brede kennis) | 82,9 | 87,1 | 87,5 |

Lees die tabel van onder naar boven. Bij MMLU-Pro — feitenkennis waar het antwoord er min of meer al is — levert denken 4,6 punt op. Bij LiveCodeBench, waar het model iets moet uitwerken en testen, is het verschil 37 punten. En bij Humanity's Last Exam, ontworpen om echt moeilijk te zijn, gaat Non-think simpelweg onderuit: 7,7 procent is bijna niets.

De sprong zit bijna helemaal tussen Non-think en Think High. Van High naar Max wint je meestal een paar punten, tegen aanzienlijk meer tokens en wachttijd.

## Zo kies je

- **Non-think** — samenvatten, herschrijven, classificeren, vertalen, korte vragen. Alles waar het antwoord in één keer op tafel kan.
- **Think High** — je standaardstand voor werk. Code schrijven en debuggen, wiskunde, planning, analyses met meerdere stappen.
- **Think Max** — reserveer hem. Voor de lastige refactor, het bewijs dat niet wil kloppen, de agentische taak die twintig stappen moet overzien.

Praktische volgorde: begin bij Think High. Kom je er niet, zet dan Max aan voor precies dat ene verzoek. Andersom werken — altijd Max en alleen terugschakelen als het te traag wordt — kost je onnodig veel tokens aan taken die het niet nodig hadden.

## Als je hem zelf draait

Beide modellen staan onder MIT-licentie op Hugging Face, dus commercieel gebruik mag en de weights zijn vrij te downloaden. Serveren gaat het makkelijkst met vLLM of SGLang, allebei met een OpenAI-compatibele API:

```bash
pip install vllm
vllm serve "deepseek-ai/DeepSeek-V4-Pro"
```

Drie dingen om te weten voordat je begint:

1. **Sampling.** DeepSeek raadt lokaal `temperature = 1.0` en `top_p = 1.0` aan. Dat is hoger dan je van andere modellen gewend bent; lager zetten maakt het redeneren juist slechter.
2. **Contextvenster bij Think Max.** Reserveer minimaal 384K tokens. Het denkspoor telt mee, en loopt de context vol, dan breekt het antwoord halverwege af.
3. **Geen chattemplate.** V4-Pro komt zonder Jinja-template. In plaats daarvan zit er een `encoding`-map bij met Python-scripts die berichten in OpenAI-formaat omzetten naar de juiste invoerstring — en het antwoord weer uit elkaar halen.

Draai je liever niet zelf, dan is het hosted alternatief er ook, maar houd dan de kanttekening bij DeepSeek in het achterhoofd: voor gevoelige bedrijfsdata weegt de Chinese herkomst van de hosted API mee in je afweging. Via een EU-provider of self-hosting speelt dat niet.

Wil je weten hoe DeepSeek V4 zich verhoudt tot de rest van de open-weight lichting, lees dan [de beste open-weight AI-modellen van deze zomer](/nieuws/open-weight-modellen-lokaal-draaien). Voor de bredere context rond Chinese modellen en exportregels schreef hetlaatsteainieuws.nl over [China's antwoord op de exportban](https://hetlaatsteainieuws.nl/regelgeving/china-glm-5-2-antwoord-anthropic-exportban).

> **Stand van zaken:** benchmarkscores, licentie en aanbevolen instellingen gecontroleerd op 4 september 2026 tegen de modelkaart van DeepSeek op Hugging Face. DeepSeek noemt de V4-serie daar zelf nog een preview-versie, dus reken op bijstellingen. Prijzen per token verschillen per provider en zijn hier bewust niet genoemd.
