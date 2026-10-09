---
title: "Claude Haiku 5.5 in de API: overstappen van Haiku 4.5"
description: "Claude Haiku 5.5 is veel goedkoper dan Haiku 4.5, maar oude API-code geeft meteen foutmeldingen. Zo zet je je aanroep om en kies je het juiste effort-niveau."
publishedAt: 2026-10-09
updatedAt: 2026-10-09
author: "Redactie"
category: "gids"
tags:
  - "claude"
  - "claude-api"
  - "claude-haiku-5-5"
  - "anthropic"
  - "ai-modellen"
  - "ai-kosten"
toolSlug: "claude"
featured: false
draft: false
readingTime: 4
heroImage: "/images/articles/diorama-claude-haiku-5-5-overstappen-api.webp"
heroImageAlt: "Miniatuur diorama-illustratie bij artikel 'Claude Haiku 5.5 in de API: overstappen van Haiku 4.5'"
heroScene: "A tiny workbench where a small paper bird is moved from an old wooden perch onto a sleek new perch"
evergreen: true
volatility: high
factsCheckedAt: 2026-10-09
watch:
  - "claude-haiku-pricing"
  - "claude-haiku-migration"
sources:
  - label: "Anthropic — Claude Haiku 5.5"
    url: "https://www.anthropic.com/claude-haiku-5-5"
  - label: "Claude-docs — Claude Haiku 5.5 overview"
    url: "https://platform.claude.com/docs/en/models/haiku-5-5/overview"
  - label: "Claude-docs — Migreren naar Claude Haiku 5.5"
    url: "https://platform.claude.com/docs/en/models/haiku-5-5/migration-guide"
  - label: "Claude-docs — Effort"
    url: "https://platform.claude.com/docs/en/build-with-claude/effort"
keyTakeaways:
  - "Claude Haiku 5.5 heet in de API claude-haiku-5-5, heeft een contextvenster van 1 miljoen tokens en geeft maximaal 128.000 tokens per antwoord terug."
  - "Tot 100.000 tokens per prompt kost het 0,10 dollar per miljoen invoertokens en 0,50 dollar per miljoen uitvoertokens; daarboven vijf keer zoveel."
  - "De nieuwe tokenizer telt voor dezelfde tekst ongeveer 30% meer tokens dan Haiku 4.5. Anthropic schat de gemiddelde besparing daarom op zo'n 75%, niet 90%."
  - "Oude code breekt: budget_tokens, temperature, top_p, top_k en een vooraf ingevulde assistent-beurt (prefill) geven een 400-fout."
  - "Haiku 5.5 is het eerste Haiku-model met een effort-instelling: low, medium (standaard), high, xhigh of max."
faq:
  - q: "Wat kost Claude Haiku 5.5 per miljoen tokens?"
    a: "Voor prompts tot 100.000 tokens betaal je 0,10 dollar per miljoen invoertokens en 0,50 dollar per miljoen uitvoertokens. Is je prompt langer, dan wordt dat 0,50 en 2,50 dollar. Gecachte invoer lezen kost 0,01 dollar per miljoen tokens. Via de Batch API krijg je 50% korting op invoer en uitvoer."
  - q: "Waarom geeft mijn Haiku 4.5-code een 400-fout op Haiku 5.5?"
    a: "Haiku 5.5 weigert een paar dingen die Haiku 4.5 wel accepteerde: thinking met budget_tokens, afwijkende waarden voor temperature, top_p of top_k, en een vooraf ingevulde assistent-beurt aan het eind van je berichten. Haal die weg, zet thinking op adaptive en stuur de diepgang met de effort-parameter."
  - q: "Welk effort-niveau kies ik bij Claude Haiku 5.5?"
    a: "Begin met medium, de standaard; die geeft exact hetzelfde resultaat als de parameter weglaten. Kies low voor classificeren, labels en korte samenvattingen op groot volume. Gebruik high of hoger alleen als je in een test ziet dat de kwaliteit tekortschiet, want meer denkwerk betekent meer uitvoertokens."
  - q: "Is Claude Haiku 5.5 beter dan Sonnet 5.5?"
    a: "Nee. Anthropic positioneert Haiku 5.5 als het goedkoopste en snelste model voor veel herhaalbaar werk, zoals samenvatten, classificeren en klantvragen. Voor complexe programmeertaken en zware agents raadt Anthropic zelf Sonnet 5.5 of Opus 5.5 aan. Een veelgebruikte opzet is Sonnet of Opus als regisseur met Haiku als goedkope hulpagent."
---

Haiku is het model dat je inzet als je duizenden kleine taken per dag door Claude wilt halen: tickets labelen, documenten samenvatten, klantvragen beantwoorden. Haiku 5.5 maakt dat een stuk goedkoper, maar wie gewoon de modelnaam in zijn code vervangt, krijgt foutmeldingen terug. Hieronder zet je een Haiku 4.5-aanroep in vier stappen om en reken je uit wat je echt bespaart.

## Wat Haiku 5.5 anders maakt

In de API heet het model `claude-haiku-5-5`: een vaste naam zonder datum en zonder aparte alias. Het heeft een contextvenster van 1 miljoen tokens, geeft maximaal 128.000 tokens per antwoord terug en leest tekst en afbeeldingen ([Bron: Claude-docs](https://platform.claude.com/docs/en/models/haiku-5-5/overview)). Je gebruikt het via de Claude API, Amazon Bedrock (`anthropic.claude-haiku-5-5`), Google Cloud en Microsoft Foundry.

Anthropic noemt het zijn goedkoopste en snelste kleine model, bedoeld voor veel herhaalbaar werk: samenvattingen, classificatie, databasevragen en live klantenservice. Voor complexe programmeertaken blijven Sonnet 5.5 en Opus 5.5 de betere keus ([Bron: Anthropic](https://www.anthropic.com/claude-haiku-5-5)). Wil je eerst weten welke Claude-modellen er zijn, lees dan [wat Claude AI is en kan](/nieuws/wat-is-claude-ai).

## De overstap in vier stappen

1. **Vervang de modelnaam.** `claude-haiku-4-5` of `claude-haiku-4-5-20251001` wordt `claude-haiku-5-5`.
2. **Ruil `budget_tokens` in voor effort.** Een `thinking`-blok met `{"type": "enabled", "budget_tokens": N}` geeft een 400-fout. Gebruik `{"type": "adaptive"}` en stuur de diepgang met `output_config.effort` ([Bron: migratiegids](https://platform.claude.com/docs/en/models/haiku-5-5/migration-guide)).
3. **Haal de sampling-parameters weg.** Een afwijkende `temperature` of `top_p`, of welke `top_k` dan ook, geeft een 400-fout. Stuur je bijvoorbeeld `temperature: 0` mee voor voorspelbare labels, haal die regel dan weg en stuur het gedrag met je prompt.
4. **Stop met prefill en verhoog `max_tokens`.** Een vooraf ingevulde assistent-beurt wordt geweigerd, ook zonder thinking: eindig altijd met een gebruikersbeurt. Denktokens tellen mee voor `max_tokens`, en dezelfde tekst kost ongeveer 30% meer tokens dan op Haiku 4.5 ([Bron: migratiegids](https://platform.claude.com/docs/en/models/haiku-5-5/migration-guide)). Een krap ingestelde limiet kapt je antwoord dus eerder af.

Zo ziet een minimale aanroep eruit:

```bash
curl https://api.anthropic.com/v1/messages \
  -H "x-api-key: $ANTHROPIC_API_KEY" \
  -H "anthropic-version: 2023-06-01" \
  -H "content-type: application/json" \
  -d '{
    "model": "claude-haiku-5-5",
    "max_tokens": 4096,
    "thinking": {"type": "adaptive"},
    "output_config": {"effort": "low"},
    "messages": [{"role": "user", "content": "Label dit klantbericht als vraag, klacht of bestelling: ..."}]
  }'
```

> **💡 Beginner-tip:** lees je antwoordblokken uit op hun `type`, niet op hun positie. Haiku 5.5 stuurt standaard een leeg `thinking`-blok mee vóór de tekst. Wie blind het eerste blok pakt, krijgt een lege string terug.

## Het juiste effort-niveau kiezen

Haiku 5.5 is het eerste Haiku-model met een effort-instelling. Je kiest uit `low`, `medium`, `high`, `xhigh` en `max`; `medium` is de standaard en geeft hetzelfde resultaat als de parameter weglaten ([Bron: Claude-docs over effort](https://platform.claude.com/docs/en/build-with-claude/effort)).

Een praktische vuistregel: `low` voor labels, routering en korte samenvattingen, `medium` voor gewone vraag-en-antwoordtaken, en pas hoger als een test laat zien dat de kwaliteit tekortschiet. Meer denkwerk betekent meer uitvoertokens, en uitvoer is vijf keer zo duur als invoer.

## Wat je echt bespaart

Tot 100.000 tokens per prompt betaal je 0,10 dollar per miljoen invoertokens en 0,50 dollar per miljoen uitvoertokens. Haiku 4.5 kostte 1 en 5 dollar. Boven de 100.000 tokens stijgt Haiku 5.5 naar 0,50 en 2,50 dollar. Gecachte invoer lezen kost 0,01 dollar per miljoen tokens ([Bron: Anthropic](https://www.anthropic.com/claude-haiku-5-5)).

Op de prijslijst is dat 90% minder, maar door de nieuwe tokenizer tel je meer tokens voor dezelfde tekst. Anthropic schat de besparing daarom op gemiddeld zo'n 75%. Meet het zelf: tel je prompts opnieuw met het model op `claude-haiku-5-5` in plaats van oude tellingen te hergebruiken.

> **⚡ Gevorderden:** werk niet direct nodig, zoals nachtelijke verwerking van tickets, gaat via de Batch API voor de helft van de prijs. Lange vaste systeemprompts cache je: een cache-write van vijf minuten kost 0,125 dollar per miljoen tokens. Wat caching verder oplevert, lees je in de [kostengids van aiplatformmkb.nl](https://aiplatformmkb.nl/gidsen/ai-kosten-besparen-tokens-chatbots).

Wantrouw aanbieders die Claude nog veel goedkoper beloven; waarom, lees je in [goedkope AI-API's als valstrik](/nieuws/goedkope-ai-api-valstrik). Draai je via Azure, dan helpt [Claude in Microsoft Foundry](/nieuws/claude-microsoft-foundry-azure-beschikbaar) je op weg. Hoe Anthropic eerder Sonnet 5.5 goedkoper per taak maakte, lees je op [hetlaatsteainieuws.nl](https://www.hetlaatsteainieuws.nl/nieuws/claude-sonnet-5-5-prijs-per-taak).

## Checklist: ben je klaar?

- [ ] Je code gebruikt `claude-haiku-5-5` als modelnaam
- [ ] `budget_tokens` is vervangen door `thinking: {"type": "adaptive"}` plus een effort-niveau
- [ ] `temperature`, `top_p` en `top_k` staan niet meer in je aanroep
- [ ] Je berichten eindigen met een gebruikersbeurt, zonder prefill
- [ ] `max_tokens` is ruim genoeg voor denktokens plus 30% meer tekst-tokens
- [ ] Je leest antwoordblokken uit op `type`, niet op positie
- [ ] Je hebt een testset gedraaid op `low` en `medium` en de kosten vergeleken met Haiku 4.5

## Bronnen

- [Anthropic: Claude Haiku 5.5](https://www.anthropic.com/claude-haiku-5-5)
- [Claude-docs: Claude Haiku 5.5 overview](https://platform.claude.com/docs/en/models/haiku-5-5/overview)
- [Claude-docs: migreren naar Claude Haiku 5.5](https://platform.claude.com/docs/en/models/haiku-5-5/migration-guide)
- [Claude-docs: effort](https://platform.claude.com/docs/en/build-with-claude/effort)
