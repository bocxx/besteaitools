---
title: "Claude prompt caching: zo betaal je minder voor herhaalde context"
description: "Stuur je bij elke API-call hetzelfde lange systeemprompt mee? Met prompt caching lees je dat uit cache tegen een fractie van de prijs. Zo stel je het in."
publishedAt: 2026-10-06
updatedAt: 2026-10-06
author: "Redactie"
category: "gids"
tags:
  - "claude"
  - "prompt-caching"
  - "claude-api"
  - "api-kosten"
  - "anthropic"
toolSlug: "claude"
featured: false
draft: false
readingTime: 5
heroImage: "/images/articles/diorama-claude-prompt-caching-kosten-besparen.webp"
heroImageAlt: "Miniatuur diorama-illustratie bij artikel 'Claude prompt caching: zo betaal je minder voor herhaalde context'"
heroScene: "A small wooden filing cabinet with one drawer open, brass index cards sliding out onto a conveyor toward a chrome robot reader"
keyTakeaways:
  - "Prompt caching bewaart vaste context, zoals je systeemprompt, documenten of tool-definities, zodat je die niet bij elke API-call volledig opnieuw betaalt."
  - "Een cache-read kost bij de meeste Claude-modellen 0,1x de normale inputprijs. Bij Opus 5.5 is dat 0,05x en bij Fable 5.1 en Mythos 5.1 zelfs 0,025x."
  - "Wegschrijven naar de standaardcache van 5 minuten kost 1,25x de inputprijs; de cache van 1 uur kost 2x."
  - "De makkelijkste route is automatische caching: één cache_control-veld bovenaan je request, en Claude zet het breekpunt zelf op het laatste cachebare blok."
  - "Onder een minimum aantal tokens wordt niets gecached, zonder foutmelding. Bij de nieuwste modellen ligt die grens op 512 tokens."
faq:
  - q: "Wat is prompt caching bij Claude?"
    a: "Prompt caching laat je vaste stukken van je API-request bewaren, zodat Claude ze bij een volgende call uit cache leest in plaats van opnieuw te verwerken. Denk aan een lang systeemprompt, een handleiding of een set voorbeelden die bij elk gesprek meegaat. Dat scheelt kosten en maakt de reactie sneller."
  - q: "Hoeveel goedkoper is prompt caching bij Claude?"
    a: "Een cache-read kost bij de meeste modellen 10% van de normale inputprijs. Bij Claude Opus 5.5 is dat 5% en bij Fable 5.1 en Mythos 5.1 2,5%. Daar staat tegenover dat het eenmalig wegschrijven duurder is: 1,25x de inputprijs voor de cache van 5 minuten en 2x voor de cache van 1 uur."
  - q: "Hoe zet ik prompt caching aan in de Claude API?"
    a: "Het snelst gaat het met automatische caching: je zet cache_control met type ephemeral bovenaan je request. Claude plaatst het breekpunt dan zelf op het laatste cachebare blok en schuift het mee als het gesprek groeit. Wil je zelf bepalen wat gecached wordt, zet cache_control dan op een specifiek content-blok. Je mag maximaal vier van die expliciete breekpunten gebruiken."
  - q: "Hoe lang blijft de Claude-cache geldig?"
    a: "Standaard 5 minuten. Wordt de cache binnen die tijd gelezen, dan wordt hij kosteloos ververst. Voor context die je met langere pauzes hergebruikt, kun je met ttl 1h een cache van een uur kiezen, tegen 2x de inputprijs voor het wegschrijven."
  - q: "Waarom werkt mijn prompt caching niet?"
    a: "De twee meest voorkomende oorzaken: je vaste blok is korter dan het minimum voor je model (bijvoorbeeld 512 tokens bij Opus 5.5, 1.024 bij Sonnet 4.6), of er staat iets wisselends vóór het breekpunt, zoals een tijdstempel. Controleer cache_read_input_tokens in de response: blijft die nul bij de tweede call, dan wordt er niets uit cache gelezen."
sources:
  - label: "Prompt caching"
    url: "https://platform.claude.com/docs/en/build-with-claude/prompt-caching"
    author: "Anthropic"
  - label: "Pricing"
    url: "https://platform.claude.com/docs/en/about-claude/pricing"
    author: "Anthropic"
---

Bouw je een chatbot of agent op de Claude-API, dan stuur je bij elke call vaak hetzelfde mee: een lang systeemprompt, een handleiding, een set voorbeelden. Zonder caching betaal je die context elke keer opnieuw. Met prompt caching leest Claude de vaste stukken uit cache tegen een fractie van de prijs. Hieronder zie je wat het kost en hoe je het in vier stappen aanzet.

## Waarvoor is dit bedoeld?

Prompt caching loont zodra je bij meerdere calls dezelfde grote, ongewijzigde context meestuurt. Denk aan een klantenservicebot met een uitgebreid draaiboek, een agent met veel tool-definities, of een assistent die steeds hetzelfde document raadpleegt. De wisselende vraag van de gebruiker blijft normaal geprijsd. Voor losse, unieke vragen levert het dus niets op.

> **💡 Beginner-tip:** Dit werkt op API-niveau, niet in de gewone Claude-app. Praat je met Claude via code of via een automatiseringstool zoals n8n, dan is dit voor jou. Bouw je bijvoorbeeld een [WhatsApp-klantenservicebot met n8n](/nieuws/n8n-whatsapp-klantenservicebot-bouwen), dan is het draaiboek in je systeemprompt de ideale kandidaat.

## Wat het kost

Wegschrijven naar de cache is iets duurder dan gewone input: 1,25x de inputprijs voor de standaardcache van 5 minuten, en 2x voor de cache van 1 uur. Lezen uit cache is veel goedkoper. Bij de meeste modellen kost een cache-read 0,1x de inputprijs, bij Claude Opus 5.5 0,05x en bij Fable 5.1 en Mythos 5.1 0,025x ([Bron: Anthropic](https://platform.claude.com/docs/en/build-with-claude/prompt-caching)).

Een rekenvoorbeeld met Opus 5.5: gewone input kost $4 per miljoen tokens, wegschrijven naar de 5-minutencache $5 en lezen uit cache $0,20 ([Bron: Anthropic](https://platform.claude.com/docs/en/build-with-claude/prompt-caching)). Stuur je een systeemprompt van 20.000 tokens tien keer mee, dan betaal je zonder caching voor 200.000 inputtokens. Met caching betaal je één keer het wegschrijven en negen keer het goedkope lezen: grofweg $0,14 in plaats van $0,80.

## Zo zet je het aan

1. **Zet de vaste inhoud vooraan.** De cache dekt alles van het begin van je request tot aan het breekpunt. Plaats daarom systeemprompt, tool-definities en documenten bovenaan, en de wisselende gebruikersvraag onderaan.

2. **Kies automatisch of handmatig.** De simpelste route is automatische caching: je zet `cache_control: {"type": "ephemeral"}` bovenaan je request. Claude plaatst het breekpunt dan zelf op het laatste cachebare blok en schuift het mee naarmate het gesprek groeit ([Bron: Anthropic](https://platform.claude.com/docs/en/build-with-claude/prompt-caching)). Wil je meer controle, zet `cache_control` dan op een specifiek content-blok. Daarvan mag je er maximaal vier per request gebruiken, bijvoorbeeld één na je tool-definities en één na een groot document.

3. **Kies de levensduur.** Standaard leeft de cache 5 minuten, en elke keer dat hij binnen die tijd gelezen wordt, wordt hij kosteloos ververst. Hergebruik je context met langere pauzes, voeg dan `"ttl": "1h"` toe ([Bron: Anthropic](https://platform.claude.com/docs/en/build-with-claude/prompt-caching)).

4. **Controleer de response.** In het `usage`-blok staan `cache_creation_input_tokens` (weggeschreven) en `cache_read_input_tokens` (uit cache gelezen). Zie je bij de tweede call cache-reads, dan werkt het.

> **⚡ Gevorderden:** Onder een minimum aantal tokens wordt er stilletjes niets gecached, zonder foutmelding. Bij Opus 5.5, Sonnet 5.5, Fable 5.1 en Mythos 5.1 ligt die grens op 512 tokens, bij Sonnet 4.6 op 1.024 en bij Haiku 4.5 op 4.096 ([Bron: Anthropic](https://platform.claude.com/docs/en/build-with-claude/prompt-caching)). Een kort systeemprompt levert dus niets op.

## De veelgemaakte fout

De cache mist zodra er iets wisselends vóór je breekpunt staat: een tijdstempel, een sessie-ID, de naam van de gebruiker. Eén veranderd teken bovenin je vaste blok en Claude ziet het als nieuwe inhoud, schrijft opnieuw naar cache en je bespaart niets. Houd alles boven het breekpunt letterlijk gelijk tussen calls en zet het variabele onderaan. Wil je ook in Claude Code op tokens letten, lees dan [hoe je met Caveman tokens bespaart](/nieuws/caveman-claude-code-tokens-besparen).

Waarom elke token geld en stroom kost, legt hetlaatsteainieuws.nl uit in [wat er gebeurt als je een AI-model iets vraagt](https://hetlaatsteainieuws.nl/achtergrond/ai-inferentie-in-2026-van-tokens-tot-watts).

## Checklist: benut je de cache?

- [ ] Je stuurt bij meerdere calls dezelfde grote context mee
- [ ] Je vaste blok is groter dan het minimum voor jouw model
- [ ] Alle vaste inhoud staat bovenaan, de variabele vraag onderaan
- [ ] Je gebruikt automatische caching of hooguit vier expliciete breekpunten
- [ ] Niets wisselends (tijd, ID, naam) staat vóór het breekpunt
- [ ] `cache_read_input_tokens` is groter dan nul bij de tweede call
- [ ] Je hebt bewust gekozen tussen 5 minuten en 1 uur

## Bronnen

- [Prompt caching](https://platform.claude.com/docs/en/build-with-claude/prompt-caching) — Anthropic: prijsfactoren, breekpunten, automatische caching en minimum aantal tokens
- [Pricing](https://platform.claude.com/docs/en/about-claude/pricing) — Anthropic: actuele inputprijzen per model
