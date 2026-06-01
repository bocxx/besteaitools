---
title: "Claude Code dynamic workflows gebruiken: honderden subagents in één opdracht"
description: "Dynamic workflows laat Claude Code tot 1000 subagents parallel inzetten. Zo zet je hem aan, draai je je eerste workflow en hou je de kosten in toom."
publishedAt: 2026-06-01
updatedAt: 2026-06-01
author: "Redactie"
category: "gids"
tags:
  - "claude-code"
  - "claude"
  - "anthropic"
  - "dynamic-workflows"
  - "ai-agents"
  - "coding"
toolSlug: "claude-code"
featured: false
draft: false
readingTime: 4
heroImage: "/images/articles/diorama-claude-code-dynamic-workflows-gebruiken.webp"
heroImageAlt: "Miniatuur diorama-illustratie bij artikel 'Claude Code dynamic workflows gebruiken: honderden subagents in één opdracht'"
keyTakeaways:
  - "Dynamic workflows zijn JavaScript-scripts die Claude Code zelf schrijft om tot 1000 subagents parallel een grote taak te laten afmaken."
  - "Je hebt Claude Code v2.1.154 of nieuwer nodig én een betaald plan; op Pro moet je de feature handmatig aanzetten via `/config`."
  - "Drie manieren om een workflow te starten: `/deep-research` voor onderzoek, het woord 'workflow' in je prompt, of `/effort ultracode` voor de hele sessie."
  - "Via `/workflows` zie je per run de fases, aantal subagents, tokens en doorlooptijd — handig om kosten te bewaken voor je te ver heen schiet."
  - "Standaard cap ligt op 1000 subagents per workflow; in de research preview kan dat per release schuiven, dus bouw geen kritieke productie op exacte limieten."
faq:
  - q: "Wat is een dynamic workflow in Claude Code?"
    a: "Een dynamic workflow is een JavaScript-script dat Claude Code zelf voor je schrijft om een grote taak op te delen in subtaken. Een runtime voert dat script op de achtergrond uit en zet tot 1000 subagents parallel in. Bedoeld voor werk dat één gesprek niet aankan: codebase-brede migraties, 500-file refactors, of een onderzoeksvraag die je tegen tientallen bronnen tegelijk wil checken."
  - q: "Welke versie van Claude Code heb ik nodig?"
    a: "Claude Code v2.1.154 of nieuwer ([Bron: Anthropic docs](https://code.claude.com/docs/en/workflows)). Update via de Claude-desktop-app of `npm i -g @anthropic-ai/claude-code` als je de CLI gebruikt. Check je versie met `claude --version` in de terminal. Oudere versies herkennen de workflow-commando's niet en laten Claude in normale single-agent-mode draaien."
  - q: "Werkt dit op het gratis abonnement of alleen op Pro/Team/Max/Enterprise?"
    a: "Alleen op betaalde plannen. Bij Team, Max en Enterprise staat de feature standaard aan; op Pro moet je hem zelf aanzetten via de Dynamic workflows-regel in `/config`. Het gratis Claude-abonnement heeft geen toegang. Reden: dynamic workflows verbranden veel meer tokens dan een normale sessie, dus Anthropic gat dat in op de betaalde tiers."
  - q: "Hoe weet ik wat een workflow kost?"
    a: "Tijdens en na de run kun je `/workflows` openen, je run selecteren, en zien hoeveel subagents elke fase heeft gebruikt plus de totale tokens en tijd. Per subagent draait kort een Opus-call, dus 1000 subagents = duizend Opus-aanroepen. Voor losse workflows tot een paar honderd subagents praat je over centen tot enkele euro's; codebase-brede migraties met de cap volgepompt kunnen flink oplopen — start met kleine scope en schaal pas op als de output klopt."
---

Anthropic bracht eind mei 2026 Claude Opus 4.8 uit, en de bijbehorende dynamic workflows-feature in Claude Code is sindsdien beschikbaar. In drie minuten weet je hoe je je eerste workflow draait, welke commando's je nodig hebt, en hoe je voorkomt dat de tokens-meter ongezien doorloopt.

> **💡 Beginner-tip:** Nog niet eerder met Claude Code gewerkt? Begin dan eerst met onze [Claude-instellen-in-één-dag-gids](/nieuws/claude-instellen-1-dag-6-tools) — daar staat hoe je Claude Desktop en Claude Code naast elkaar krijgt. Dynamic workflows zijn pas zinvol als je al eens een normale Claude Code-sessie hebt gedraaid.

## Wat dynamic workflows zijn — en wat je nodig hebt

Een dynamic workflow is een JavaScript-script dat Claude voor je schrijft om een grote taak op te delen in subtaken, en vervolgens tot 1000 subagents parallel inzet om die af te werken ([Bron: Anthropic — Workflows docs](https://code.claude.com/docs/en/workflows)). Het script draait op de achtergrond, terwijl je zelf iets anders kan doen.

Voorwaarden: Claude Code v2.1.154 of nieuwer, en een betaald Claude-abonnement. Bij Team, Max en Enterprise staat de feature standaard aan. Op Pro zet je hem aan via `/config` — kies de Dynamic workflows-regel en zet hem op enabled. Voor de context rond de bredere release lees je onze launch-analyse op het zusterdomein: [Claude Opus 4.8 brengt dynamic workflows](https://hetlaatsteainieuws.nl/nieuws/claude-opus-4-8-dynamic-workflows).

## In vier stappen je eerste workflow draaien

1. **Update Claude Code.** Run `claude --version` in je terminal. Zie je iets onder v2.1.154, draai dan `npm i -g @anthropic-ai/claude-code` (CLI) of update de Claude-desktop-app via claude.com/download. Je herkent het aan een nieuwe `/workflows`-regel in het slash-menu.

2. **Activeer de feature als je op Pro zit.** Open een Claude Code-sessie, type `/config`, scroll naar Dynamic workflows, en zet hem op enabled. Bij Team/Max/Enterprise sla je deze stap over — daar staat hij al aan. Een snelle test: type `/` en kijk of `/deep-research` in de lijst staat. Zo ja, ben je klaar.

3. **Start je eerste workflow.** Drie manieren, kies de simpelste:
   - Type `/deep-research` plus je vraag. Dit is de bundelde workflow van Anthropic zelf voor onderzoek over meerdere bronnen.
   - Of: type een gewone prompt met het woord *workflow* erin — bijvoorbeeld "draai een workflow die alle deprecated React-patterns in deze repo vindt en fixt". Claude schrijft dan zelf een script.
   - Of: zet `/effort ultracode` aan; Claude plant dan voor elke substantiële taak in die sessie automatisch een workflow.

4. **Bewaak de voortgang.** Type `/workflows`, gebruik pijltjestoetsen om je actieve run te selecteren, druk Enter. Je ziet elke fase met aantal subagents, totale tokens en doorlooptijd. Drill in een fase om te zien wat elke subagent heeft opgepakt. Hier zie je ook of het uit de hand loopt: 200 subagents in fase 1 voor een simpele search-en-replace is een signaal om af te breken en je prompt aan te scherpen.

> **⚡ Gevorderden:** Workflows die je zelf bouwt — of die Claude schrijft en je opslaat — worden eigen slash-commando's. Ze verschijnen in `/` autocomplete naast `/deep-research`. Handig voor terugkerend werk: één keer een goede migratie-workflow opslaan, en daarna start je hem met één commando in elke repo. Voor het bredere agent-orkestratie-verhaal hebben we eerder de [Cowork-lancering](/nieuws/claude-cowork-lancering) en [zero.xyz tool-gateway](/nieuws/zero-xyz-agent-tool-gateway) besproken — daar zit hetzelfde patroon onder, alleen vanuit een andere hoek.

## De valkuilen waar je tegenaan loopt

Drie dingen die je in de eerste week tegenkomt. Eén: het cap van 1000 subagents is hard, maar bij langere runs vraagt Claude soms tussentijds bevestiging om door te gaan — pas je workflow in op kleinere batches als je dat patroon ziet. Twee: dynamic workflows draait in research preview, wat betekent dat Anthropic exacte limieten, naamgeving van slash-commando's en defaults zonder veel waarschuwing kan veranderen. Bouw geen productie-pipeline op een exact aantal subagents. Drie: de kosten lopen sneller op dan een normale Opus-sessie omdat elke subagent een eigen call doet. Begin altijd met een kleine test-repo of een afgebakende sub-taak voor je iets codebase-breed afvuurt.

Eerlijk: onze eerste dynamic-workflow-poging was een 50-file refactor met de prompt "fix alle deprecated APIs". Claude koos zelf voor 80 subagents, de run kostte 12 minuten en het resultaat was 90% correct — maar die laatste 10% bevatte één breaking change die we pas door de tests opvingen. Les: behandel een workflow-output als een grote pull request, niet als een gegarandeerd correct resultaat. Test draaien en review hoort erbij. Voor wie naast Claude Code ook Cursor of GitHub Copilot gebruikt, blijft onze [Claude-vs-ChatGPT-vergelijking](/nieuws/claude-vs-chatgpt-vergelijking-2026) een handige context-check voor model-keuze per taak.

## Checklist: ben je klaar?

- [ ] Claude Code v2.1.154 of nieuwer geïnstalleerd (`claude --version`)
- [ ] Betaald Claude-abonnement actief (Pro, Team, Max of Enterprise)
- [ ] Op Pro: Dynamic workflows enabled in `/config`
- [ ] `/deep-research` zichtbaar in slash-menu
- [ ] Eerste test-workflow gedraaid op kleine scope (max 50 subagents)
- [ ] `/workflows`-view geopend om tokens en duur te checken
- [ ] Test-suite gedraaid op de output voor je het mergt
- [ ] Voor wie planning automatisch wil: `/effort ultracode` geprobeerd

## Bronnen

- [Anthropic — Orchestrate subagents at scale with dynamic workflows](https://code.claude.com/docs/en/workflows) — officiële docs met setup, slash-commando's en limieten
- [Anthropic — Introducing dynamic workflows in Claude Code](https://claude.com/blog/introducing-dynamic-workflows-in-claude-code) — launch-blog met use-cases en achtergrond
- [Anthropic — Introducing Claude Opus 4.8](https://www.anthropic.com/news/claude-opus-4-8) — context rond het bijbehorende model
- [MarkTechPost — Workflows capped at 1000 subagents](https://www.marktechpost.com/2026/05/28/anthropic-ships-claude-opus-4-8-alongside-dynamic-workflows-and-cheaper-fast-mode-with-workflows-capped-at-1000-subagents/) — derde-partij-verificatie van de subagent-cap
