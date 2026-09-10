---
title: "AGENTS.md instellen: zo onthoudt Codex de regels van je project"
heroImageAlt: "Miniatuur diorama-illustratie bij artikel 'AGENTS.md instellen: zo onthoudt Codex de regels van je project'"
description: "Codex leest AGENTS.md voor elke opdracht. Zo leg je werkafspraken één keer vast — globaal, per repo en per map — en controleer je wat geladen is."
publishedAt: 2026-09-10
updatedAt: 2026-09-10
author: "Redactie"
category: "gids"
tags:
  - "openai-codex"
  - "agents-md"
  - "codex-cli"
  - "projectinstructies"
  - "coding-agent"
  - "openai"
toolSlug: "openai-codex"
featured: false
draft: false
readingTime: 4
heroImage: "/images/articles/diorama-codex-agents-md-projectregels.webp"
heroScene: "Miniature filing cabinet with three stacked drawers open, each holding a small folded note, beside a tiny terminal screen"
keyTakeaways:
  - "Codex bouwt bij elke start een instructieketen op: eerst je globale bestand, dan de repo-root, dan elke map ertussen."
  - "Per map neemt Codex hooguit één bestand mee, en AGENTS.override.md wint altijd van AGENTS.md."
  - "Bestanden dichter bij je werkmap staan later in de prompt en overrulen daarmee de bredere regels."
  - "De gecombineerde instructies stoppen bij 32 KiB; daarboven wordt afgekapt tenzij je project_doc_max_bytes verhoogt."
  - "Er is geen cache: twijfel je of je wijziging is opgepikt, herstart Codex in de juiste map."
faq:
  - q: "Waar zet ik mijn AGENTS.md neer?"
    a: "Op twee plekken, met verschillende doelen. Voorkeuren die voor al je projecten gelden zet je in ~/.codex/AGENTS.md — dat is je Codex-home, tenzij je de omgevingsvariabele CODEX_HOME hebt aangepast. Regels die alleen over één project gaan, zet je in een AGENTS.md in de root van die repository. Codex leest ze allebei en combineert ze, waarbij de projectregels later in de prompt komen en dus voorrang krijgen bij tegenstrijdigheden."
  - q: "Wat is het verschil tussen AGENTS.md en AGENTS.override.md?"
    a: "In elke map kijkt Codex eerst of er een AGENTS.override.md staat. Vindt hij die, dan negeert hij de gewone AGENTS.md in diezelfde map volledig — er gaat hooguit één bestand per map mee. De override is bedoeld voor situaties waarin je tijdelijk andere regels wilt zonder het originele bestand weg te gooien: je zet de override neer, en zodra je hem verwijdert gelden de oude afspraken weer. Dat werkt zowel in je Codex-home als in projectmappen."
  - q: "In welke volgorde leest Codex de bestanden?"
    a: "Eerst je globale bestand in de Codex-home. Daarna begint Codex bij de projectroot, meestal de Git-root, en loopt naar beneden tot je huidige werkmap. In elke map onderweg pakt hij AGENTS.override.md, anders AGENTS.md, anders een naam uit je fallback-lijst. Al die bestanden worden achter elkaar geplakt met lege regels ertussen. Omdat wat later staat zwaarder weegt, overrulen de bestanden dicht bij je werkmap de bredere regels erboven."
  - q: "Codex negeert mijn instructies. Wat nu?"
    a: "Loop drie dingen langs. Staat er ergens hoger in de boom of in je Codex-home een AGENTS.override.md die het gewone bestand verdringt? Is je bestand leeg — lege bestanden slaat Codex over. En zit je boven de limiet van 32 KiB voor de gecombineerde instructies, waardoor de rest is afgekapt? Dat laatste los je op met project_doc_max_bytes in je config, of door de tekst over geneste mappen te verdelen. Zie je nog steeds oude instructies, herstart Codex dan in de juiste map."
  - q: "Kan ik een andere bestandsnaam gebruiken?"
    a: "Ja. Gebruikt je team al een TEAM_GUIDE.md, zet die naam dan in project_doc_fallback_filenames in ~/.codex/config.toml. Codex controleert per map dan achtereenvolgens AGENTS.override.md, AGENTS.md en daarna de namen uit jouw lijst. Namen die niet in die lijst staan worden genegeerd voor instructie-ontdekking, hoe logisch ze ook lijken. Herstart Codex na het wijzigen van de configuratie, anders draait hij nog op de oude instellingen."
---

# AGENTS.md instellen: zo onthoudt Codex de regels van je project

Je legt Codex voor de derde keer uit dat je in dit project pnpm gebruikt en dat de tests met `make test` draaien. Dat hoeft niet. Codex leest voor elke opdracht een instructiebestand in, en als je dat goed neerzet, weet de agent die afspraken vanaf dan uit zichzelf. Vijf stappen, een kwartier werk.

## Stap 1: zet je persoonlijke voorkeuren globaal

Begin met de dingen die in élk project gelden. Die horen in je Codex-home:

```bash
mkdir -p ~/.codex
```

Maak daar `AGENTS.md` aan met je vaste werkafspraken:

```md
## Werkafspraken

- Draai `npm test` na elke wijziging in JavaScript-bestanden.
- Gebruik `pnpm` bij het installeren van dependencies.
- Vraag om bevestiging voor je een nieuwe productie-dependency toevoegt.
```

Houd het kort en dwingend. Dit bestand gaat mee bij elke opdracht in elke repository, dus alles wat hier staat kost je tokens en aandacht van het model.

## Stap 2: leg projectregels vast in de repo-root

Regels die alleen over dit project gaan, zet je in een `AGENTS.md` in de root van de repository — meestal je Git-root. Codex vindt hem vanzelf.

```md
## Verwachtingen in deze repository

- Draai `npm run lint` voordat je een pull request opent.
- Documenteer publieke utilities in `docs/` als je gedrag wijzigt.
```

Dit bestand commit je mee. Iedereen die met Codex aan deze repo werkt, krijgt dezelfde uitgangspunten, en nieuwe teamleden hoeven de ongeschreven regels niet te raden.

## Stap 3: maak uitzonderingen per map

Werkt één onderdeel anders dan de rest — een betaaldienst met eigen testcommando's, een map met gegenereerde code — dan zet je daar een `AGENTS.override.md` neer:

```md
## Regels voor de payments-service

- Gebruik `make test-payments` in plaats van `npm test`.
- Roteer nooit API-keys zonder het securitykanaal te informeren.
```

Twee dingen om te snappen. Codex neemt per map hooguit één bestand mee, en een `AGENTS.override.md` verdringt de gewone `AGENTS.md` in diezelfde map volledig. En omdat Codex de bestanden van boven naar beneden achter elkaar plakt, staat het bestand dat het dichtst bij je werkmap ligt als laatste in de prompt — dat is precies waarom het de bredere regels overruled ([Bron: OpenAI](https://developers.openai.com/codex/guides/agents-md)).

Zet uitzonderingen dus zo dicht mogelijk bij het werk waar ze over gaan.

## Stap 4: controleer wat er daadwerkelijk geladen is

Vertrouw niet op de bestandsstructuur, vraag het gewoon:

```bash
codex --ask-for-approval never "Summarize the current instructions."
```

Codex hoort dan de punten uit je instructiebestanden terug te geven voordat hij aan werk begint. Wil je een geneste override controleren, start dan vanuit die map:

```bash
codex --cd services/payments --ask-for-approval never "List the instruction sources you loaded."
```

Verwacht drie bronnen in deze volgorde: het globale bestand, de repo-root, en daarna de override. Wijkt dat af, dan weet je meteen waar je moet kijken.

## Stap 5: ken de twee limieten

De gecombineerde instructies stoppen bij 32 KiB. Zit je daarboven, dan kapt Codex af, en dat merk je niet als een foutmelding maar als een agent die het laatste deel van je regels lijkt te negeren. Verhoog dan `project_doc_max_bytes` in `~/.codex/config.toml`, of verdeel de tekst over geneste mappen.

De tweede: gebruikt je team al een andere bestandsnaam, zet die dan in de fallback-lijst.

```toml
# ~/.codex/config.toml
project_doc_fallback_filenames = ["TEAM_GUIDE.md", ".agents.md"]
project_doc_max_bytes = 65536
```

Namen die niet in die lijst staan, worden voor instructie-ontdekking genegeerd. Herstart Codex na een configuratiewijziging.

## Als het niet werkt

Er is geen cache om te legen — Codex bouwt de instructieketen bij elke run opnieuw op, en in de TUI bij elke sessiestart. Ziet het er toch verouderd uit, herstart dan in de juiste map. Laadt er niets, controleer dan of je wel in de bedoelde repository zit en of je bestanden inhoud hebben; lege bestanden slaat Codex over. Krijg je regels te zien die je niet herkent, zoek dan naar een `AGENTS.override.md` hoger in de boom of in je Codex-home.

Deze aanpak werkt trouwens niet alleen voor Codex: het bestandsformaat is een open afspraak die meerdere coding-agents inmiddels lezen. Werk je met meerdere tools naast elkaar, dan is dat prettig — al bespaart één bestand je niet de moeite om zelf te blijven volgen wat de agent doet. Waarom dat laatste ertoe doet, staat in [dit stuk over vaardigheidsverlies door AI](https://hetlaatsteainieuws.nl/achtergrond/vaardigheidsverlies-ai-wat-onderzoek-echt-zegt) op Het Laatste AI Nieuws.

Werk je ook met Claude Code, dan is [plugins installeren](/nieuws/claude-code-plugins-installeren) de vergelijkbare stap daar. En wil je meerdere terminal-agents naast elkaar draaien, kijk dan naar [Solo](/nieuws/solo-terminal-agents-een-venster).
