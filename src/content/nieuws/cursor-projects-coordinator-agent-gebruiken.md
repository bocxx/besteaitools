---
title: "Cursor Projects: grote klussen uitbesteden aan een coordinator"
heroImage: "/images/articles/diorama-cursor-projects-coordinator-agent-gebruiken.webp"
description: "Cursor Projects laat een coordinator-agent een grote klus plannen en aan cloud-agents delegeren. Zo start je een Project en wat je vooraf moet weten."
publishedAt: 2026-09-30
updatedAt: 2026-09-30
author: "Redactie"
category: "gids"
tags:
  - "cursor"
  - "cursor-projects"
  - "coordinator-agent"
  - "cloud-agents"
  - "ai-coding"
toolSlug: "cursor"
featured: false
draft: false
readingTime: 4
heroImageAlt: "Miniatuur diorama-illustratie bij artikel 'Cursor Projects: grote klussen uitbesteden aan een coordinator'"
heroScene: "A clockwork hub on a workbench dispatching small wooden carts along rails to several miniature workshop benches"
keyTakeaways:
  - "Een Project is bedoeld voor grote klussen zoals een feature, migratie of complete app; je praat met één coordinator-agent via chat."
  - "De coordinator schrijft zelf geen code: hij plant, delegeert aan agents die de code schrijven en brengt het werk terug om te controleren."
  - "Elk Project houdt bestanden bij die meesynchroniseren naar alle cloud- en lokale machines van zijn agents, zodat de context met het Project meegroeit."
  - "Met subscriptions reageert een Project zelf op Slack-berichten, pull requests, CI-runs of een schema; een Listening-label laat zien waarop het luistert."
  - "Projects zijn niet beschikbaar op Enterprise-plannen en niet met Privacy Mode (Legacy), en vereisen Cloud Agents met GitHub-toegang."
faq:
  - q: "Wat is een Cursor Project precies?"
    a: "Een Project is een werkruimte voor substantieel werk: een feature, een migratie of een hele applicatie. Je chat met één coordinator-agent, die het werk plant en uitzet bij andere agents. Het draait op de Cloud Agents-infrastructuur en zit in de Agents Window. Cursor kondigde het op 10 september 2026 aan als beta."
  - q: "Wat is het verschil tussen een Project en een Cloud Agent?"
    a: "Een Cloud Agent voert één taak uit op een eigen VM. Een Project zet daar een coordinator boven die meerdere agents parallel aanstuurt en context bewaart over weken of maanden. Voor een afgebakende bugfix is een losse Cloud Agent genoeg; een Project loont bij werk dat je zelf in stukken zou hakken."
  - q: "Kan ik Cursor Projects gebruiken op een Teams- of Enterprise-plan?"
    a: "Volgens de Cursor-documentatie rolt Projects uit naar alle gebruikers, maar is het niet beschikbaar op Enterprise-plannen en niet met Privacy Mode (Legacy). Over Teams staat niets specifieks in de documentatie; controleer dat in je eigen beheeromgeving."
  - q: "Wat kost een Cursor Project?"
    a: "De documentatie noemt geen aparte prijs of limiet voor Projects. Omdat Projects op Cloud Agents draaien, is de veilige aanname dat het gebruik meetelt in je abonnement of daarbuiten wordt bijgerekend. Zet daarom eerst een kleine klus neer en bekijk je verbruik."
  - q: "Wat zijn subscriptions in Cursor Projects?"
    a: "Met subscriptions laat je een Project reageren op gebeurtenissen: berichten in een Slack-kanaal, activiteit op pull requests, CI-runs of een vast schema. Boven het chatveld verschijnt dan een Listening-label; daarop klikken toont alle actieve abonnementen en laat je ze weer verwijderen."
sources:
  - label: "Cursor Changelog — Projects"
    url: "https://cursor.com/changelog/projects"
  - label: "Cursor Docs — Projects"
    url: "https://cursor.com/docs/agent/projects"
---

Een losse agent is prima voor een bugfix, maar een migratie over tientallen modules zet je niet in één opdracht weg. Cursor Projects probeert dat gat te dichten: je beschrijft het grote werk aan één coordinator, en die verdeelt het.

## Wat een Project doet

Een Project is bedoeld voor "substantieel werk" zoals een feature, migratie of complete applicatie, en je praat ermee via chat met een coordinator-agent ([Bron: Cursor Docs](https://cursor.com/docs/agent/projects)). De coordinator schrijft zelf geen code. Volgens de documentatie maakt en beheert hij agents namens jou, draait hij er zoveel parallel als het werk vraagt, en brengt hij het afgeronde werk naar jou terug om te controleren ([Bron: Cursor Docs](https://cursor.com/docs/agent/projects)).

Het draait op de Cloud Agents-infrastructuur, dus het werk gaat door als je laptop dicht is ([Bron: Cursor Changelog](https://cursor.com/changelog/projects)). Meer over die onderlaag lees je in onze gids over [Cursor Cloud Agents](/nieuws/cursor-cloud-agents-taak-uitbesteden).

## Zo start je er een

1. **Open de Agents Window** en klik in de zijbalk op **Projects**, dan op **New Project** ([Bron: Cursor Docs](https://cursor.com/docs/agent/projects)).
2. **Geef het een icoon en een naam.** Laat je de naam leeg, dan heet het "New Project".
3. **Kies onder Workspace je repository** — de Cloud Agents hebben GitHub-toegang nodig — en onder Model het model van de coordinator.
4. **Klik Create Project.** Het Project opent als een chat; daarin beschrijf je wat er klaar moet zijn.

> **Beginner-tip:** Schrijf je eerste opdracht als een overdracht aan een nieuwe collega: doel, wat niet geraakt mag worden en hoe je "klaar" herkent (bijvoorbeeld "alle tests in `payments/` groen"). De coordinator kan niet even bellen. Wie nog nooit met een AI-editor werkte, begint beter bij onze [instap-gids voor Cursor en Copilot](/nieuws/coderen-met-ai-cursor-copilot-beginners).

## Gedeelde context en subscriptions

Elk Project houdt een set bestanden bij die meesynchroniseert naar elke cloud- en lokale machine die zijn agents gebruiken. Onderzoek, artefacten, kennis over de codebase en jouw werkvoorkeuren stapelen zich daar op, zodat de coordinator naarmate het Project groeit beter wordt ([Bron: Cursor Docs](https://cursor.com/docs/agent/projects)).

Met subscriptions kan een Project ook zelf in beweging komen: een Slack-kanaal volgen, pull requests in de gaten houden, op CI-runs reageren of op een schema draaien. Boven het chatveld verschijnt dan een **Listening**-label; daarop klikken laat zien waarop het Project luistert en laat je abonnementen weer weghalen ([Bron: Cursor Docs](https://cursor.com/docs/agent/projects)).

> **Gevorderden:** Zet een subscription pas aan nadat je een keer handmatig hebt gezien hoe de coordinator met jouw repo omgaat. Een Project dat bij elke PR-event agents opstart kan snel rekentijd verbruiken, en de documentatie noemt geen aparte limiet.

## Wat je vooraf moet weten

Het staat als beta aangekondigd en rolt uit naar alle gebruikers ([Bron: Cursor Changelog](https://cursor.com/changelog/projects)). Het is níét beschikbaar op Enterprise-plannen en niet met Privacy Mode (Legacy), omdat Cloud Agents je code tijdens het uitvoeren in de cloud bewaren ([Bron: Cursor Docs](https://cursor.com/docs/agent/projects)). Over prijs of gebruikslimieten voor Projects zegt de documentatie niets. Begin klein en bekijk je verbruik.

## Checklist: ben je klaar?

- [ ] Je repository staat op GitHub en Cloud Agents hebben toegang
- [ ] Je plan valt niet onder Enterprise en je gebruikt geen Privacy Mode (Legacy)
- [ ] Je hebt de opdracht opgeschreven met doel, grenzen en een testbaar eindpunt
- [ ] Je hebt een eerste, kleine klus gekozen om het gedrag te leren kennen
- [ ] Subscriptions staan bewust uit, of beperkt tot één kanaal
- [ ] Je weet wie de output beoordeelt voordat er iets gemerged wordt
- [ ] Je hebt na de eerste run je verbruik bekeken

Nieuwsgierig naar de zakelijke kant van Cursor? Lees [waarom SpaceX 60 miljard voor Cursor betaalt](https://www.hetlaatsteainieuws.nl///nieuws/spacex-koopt-cursor-60-miljard) op hetlaatsteainieuws.nl.

## Bronnen

- [Cursor Changelog — Projects](https://cursor.com/changelog/projects) — aankondiging van 10 september 2026, beta-status
- [Cursor Docs — Projects](https://cursor.com/docs/agent/projects) — stappen, gedeelde context, subscriptions en beperkingen
