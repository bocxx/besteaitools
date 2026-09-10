---
title: "OpenClaw installeren en aan Telegram koppelen: in vijf minuten draaiend"
heroImageAlt: "Miniatuur diorama-illustratie bij artikel 'OpenClaw installeren en aan Telegram koppelen: in vijf minuten draaiend'"
description: "Eén installatiecommando, een gateway op poort 18789 en een Telegram-bot. Zo zet je OpenClaw op, plus de pairing-stap die bepaalt wie er met je agent mag praten."
publishedAt: 2026-09-10
updatedAt: 2026-09-10
author: "Redactie"
category: "gids"
tags:
  - "openclaw"
  - "self-hosted"
  - "telegram"
  - "ai-agents"
  - "personal-agent"
  - "gateway"
toolSlug: "openclaw"
featured: false
draft: false
readingTime: 4
heroImage: "/images/articles/diorama-openclaw-installeren-telegram-koppelen.webp"
keyTakeaways:
  - "Installeren gaat met één regel: curl -fsSL https://openclaw.ai/install.sh | bash op macOS en Linux."
  - "OpenClaw vereist Node.js 22.22.3+, 24.15+ of 25.9+; Node 26 is de aanbevolen runtime."
  - "De Gateway luistert op poort 18789; controleer dat met openclaw gateway status voor je verder gaat."
  - "Zet dmPolicy op pairing, anders kan iedereen die je bot vindt hem aansturen."
  - "Pairing-codes zijn 8 tekens en verlopen na een uur; maximaal 3 openstaande verzoeken per kanaalaccount."
faq:
  - q: "Wat is OpenClaw precies?"
    a: "OpenClaw is een open-source personal agent die je op je eigen machine draait. De kern is een lokale Gateway die sessies, tools en events beheert, met daarnaast een router die ruim twintig chatkanalen ondersteunt: WhatsApp, Telegram, Signal, Slack, Discord, iMessage, Teams en meer. Je stuurt je agent dus aan vanuit een app die je toch al open hebt. Microsoft bouwde zijn Scout-assistent op hetzelfde framework."
  - q: "Welke Node-versie heb ik nodig voor OpenClaw?"
    a: "Node.js 22.22.3 of hoger, 24.15 of hoger, of 25.9 of hoger. Node 26 is de aanbevolen runtime. Check je versie met node --version voordat je begint; een te oude Node is veruit de meest voorkomende reden dat de installatie halverwege stukloopt. Bun tot en met 1.3.x kan de CLI en de Gateway niet draaien omdat de node:sqlite-API ontbreekt."
  - q: "Waarom is Telegram het makkelijkste kanaal om mee te beginnen?"
    a: "Omdat je er alleen een bot-token voor nodig hebt. WhatsApp vraagt een QR-koppeling met je account, Signal en iMessage vragen extra setup op je apparaat. Voor Telegram maak je een bot via BotFather, plak je het token in de configuratie en kun je meteen chatten. Werkt dat, dan weet je dat je Gateway en je model-provider goed staan en kun je daarna zwaardere kanalen toevoegen."
  - q: "Hoe voorkom ik dat vreemden met mijn agent praten?"
    a: "Zet de DM-policy van het kanaal op pairing. Een onbekende afzender krijgt dan een code van acht tekens en zijn bericht wordt niet verwerkt tot jij goedkeurt, via Settings → Channels → DM access requests in de Control UI of met openclaw pairing approve telegram CODE. Codes verlopen na een uur en er staan er maximaal drie tegelijk open per kanaalaccount."
  - q: "Wat doe ik als de installatie niet lukt?"
    a: "Draai openclaw triage. Dat voert read-only health checks uit en schrijft een geschoonde diagnose die je kunt doorgeven aan een coding agent op je machine, of gewoon zelf kunt lezen. Wil je alleen de bevindingen, gebruik dan openclaw doctor. Secrets, tokens en ruwe logs blijven buiten de diagnose en er gaat niets van je machine af tot je daar zelf voor kiest."
---

OpenClaw stond deze week weer bovenaan de doorbraak-radar, en dat komt door Microsoft: Scout draait op ditzelfde framework. Wil je de open-source versie zelf proberen, dan ben je met één installatiecommando en een Telegram-bot binnen vijf minuten aan het chatten. Hieronder de vijf stappen, plus de instelling die de meeste mensen overslaan.

## Wat je nodig hebt

Twee dingen. Node.js in versie 22.22.3+, 24.15+ of 25.9+, waarbij Node 26 de aanbevolen runtime is. En een API-sleutel van een model-provider: Anthropic, OpenAI, Google of een andere ([Bron: OpenClaw Docs](https://docs.openclaw.ai/start/getting-started)).

Check je Node-versie eerst met `node --version`. Een te oude Node is veruit de meest voorkomende reden dat de installatie halverwege afbreekt.

> **💡 Beginner-tip:** OpenClaw draait op jouw machine, dus je hebt geen server nodig om te beginnen. Je laptop volstaat om het uit te proberen. Wil je hem echt altijd bereikbaar hebben, dan verhuis je later naar een VPS of thuisserver.

## De vijf stappen

1. **Installeer OpenClaw.** Op macOS en Linux: `curl -fsSL https://openclaw.ai/install.sh | bash`. Op Windows via PowerShell: `iwr -useb https://openclaw.ai/install.ps1 | iex`. Het script detecteert je OS, installeert Node als dat nodig is en start daarna de onboarding-wizard.
2. **Doorloop de onboarding.** Je kiest een model-provider, plakt je API-sleutel en configureert de Gateway. De kernstappen duren een paar minuten. Optionele stappen kun je overslaan en later oppakken met `openclaw configure`.
3. **Controleer de Gateway.** Draai `openclaw gateway status`. Je zou de Gateway moeten zien luisteren op poort 18789. Staat daar niets, ga dan niet verder met kanalen koppelen: het probleem zit hier.
4. **Open het dashboard.** `openclaw dashboard` opent de Control UI in je browser. Typ een bericht in de chat daar. Krijg je antwoord, dan staan je Gateway en je provider goed.
5. **Koppel Telegram.** Dit is het snelste kanaal, want je hebt er alleen een bot-token voor nodig. Daarna chat je met je agent vanaf je telefoon.

## De stap die je niet moet overslaan

Een agent die via een chat-app bereikbaar is, is ook bereikbaar voor mensen die jij niet kent. OpenClaw heeft daar pairing voor: zet de DM-policy van het kanaal op `pairing` en een onbekende afzender krijgt een code van acht tekens terwijl zijn bericht níet wordt verwerkt ([Bron: OpenClaw Docs](https://docs.openclaw.ai/channels/pairing)).

Goedkeuren doe je op twee manieren. In de Control UI via **Settings → Channels → DM access requests**, waar de verzoeken van alle kanalen samenkomen. Of vanaf de opdrachtregel:

```bash
openclaw pairing list telegram
openclaw pairing approve telegram <CODE>
```

Codes verlopen na een uur en er kunnen maximaal drie verzoeken tegelijk openstaan per kanaalaccount. Handig detail: keur je via de CLI de eerste afzender goed terwijl er nog geen command owner bestaat, dan wordt die afzender automatisch de eigenaar voor bevoorrechte commando's. Latere goedkeuringen geven alleen DM-toegang.

> **⚡ Gevorderden:** DM-toegang en groepstoegang zijn twee losse dingen. Een goedgekeurde pairing-code geeft iemand géén recht om je bot in een groep aan te sturen; dat loopt via `groupAllowFrom` en de per-groep-instellingen van het kanaal. Wil je één set vertrouwde afzenders hergebruiken over kanalen én over DM- en groepslijsten, gebruik dan een top-level `accessGroups`-blok en verwijs ernaar met `accessGroup:<naam>`.

## Werkt het niet?

Draai `openclaw triage`. Dat voert read-only health checks uit en zet de uitkomst om in een diagnose die je kunt doorgeven aan een coding agent op je machine, of zelf kunt lezen. Wil je alleen de bevindingen zonder overdracht, gebruik dan `openclaw doctor`. Secrets, tokens en ruwe logboeken blijven buiten die diagnose.

Twee dingen om te weten voor je gaat sleutelen. Bun tot en met 1.3.x kan de CLI en de Gateway niet draaien, omdat de vereiste `node:sqlite`-API ontbreekt; Node blijft de ondersteunde runtime. En je pairing-status staat in de SQLite-database op `~/.openclaw/state/openclaw.sqlite`, wat betekent dat je dat bestand als gevoelig moet behandelen: die rijen bepalen wie er bij je assistent kan.

## Checklist: ben je klaar?

- [ ] `node --version` geeft 22.22.3+, 24.15+ of 25.9+
- [ ] `openclaw gateway status` toont poort 18789
- [ ] `openclaw dashboard` opent en de chat geeft antwoord
- [ ] Je Telegram-bot reageert vanaf je telefoon
- [ ] De DM-policy van het kanaal staat op `pairing`, niet op `open`
- [ ] Je weet welk account de command owner is
- [ ] Je API-kosten lopen bij je eigen provider, niet bij OpenClaw

Meer over dit soort agent-runtimes lees je in onze gids over [Kimi Claw als cloud-agent opzetten](/nieuws/kimi-claw-cloud-agent-opzetten), en de volledige beoordeling staat op de [OpenClaw-toolpagina](/tools/openclaw). Wil je eerst weten waaróm een always-on agent met toegang tot je machine om aandacht vraagt, lees dan [Grok CLI uploadde je hele home directory naar xAI](https://hetlaatsteainieuws.nl/nieuws/grok-cli-uploadt-home-directory) op hetlaatsteainieuws.nl.

## Bronnen

- [OpenClaw Docs — Getting started](https://docs.openclaw.ai/start/getting-started) — installatie, Node-eisen, gateway-poort en dashboard
- [OpenClaw Docs — Pairing](https://docs.openclaw.ai/channels/pairing) — DM-policy, pairing-codes, access groups en state-opslag
- [OpenClaw Docs — Install](https://docs.openclaw.ai/install) — alternatieve installatiemethodes en runtime-ondersteuning
