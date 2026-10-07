---
title: "Claude Code geheugen: CLAUDE.md en auto-memory instellen"
description: "Claude Code begint elke sessie blanco. Met CLAUDE.md en auto-memory onthoudt het toch je project en voorkeuren. Zo stel je beide in en controleer je ze."
publishedAt: 2026-10-07
updatedAt: 2026-10-07
author: "Redactie"
category: "gids"
tags:
  - "claude-code"
  - "claude"
  - "claude-md"
  - "auto-memory"
  - "ai-coding"
  - "developer-tools"
toolSlug: "claude-code"
featured: false
draft: false
readingTime: 5
heroImage: "/images/articles/diorama-claude-code-geheugen-onthouden.webp"
heroImageAlt: "Miniatuur diorama-illustratie bij artikel 'Claude Code geheugen: CLAUDE.md en auto-memory instellen'"
heroScene: "A small chrome robot filing index cards into a wooden card-catalog drawer beside an open laptop on a desk"
evergreen: true
volatility: medium
factsCheckedAt: 2026-10-07
watch:
  - "claude-code-memory"
  - "claude-code-versie"
keyTakeaways:
  - "Claude Code start elke sessie met een leeg contextvenster; CLAUDE.md (door jou geschreven) en auto-memory (door Claude bijgehouden) dragen kennis over."
  - "CLAUDE.md is voor vaste regels: bouwcommando's, conventies en 'doe altijd X'. Houd elk bestand onder de 200 regels."
  - "Auto-memory bewaart je voorkeuren, correcties en projectafspraken, en slaat over wat Claude zelf uit de code kan afleiden."
  - "Met /context zie je welke geheugenbestanden echt geladen zijn; met /memory open je ze en zet je auto-memory aan of uit."
  - "Moet iets gegarandeerd gebeuren, gebruik dan een hook: CLAUDE.md is context, geen afgedwongen configuratie."
faq:
  - q: "Onthoudt Claude Code dingen tussen sessies?"
    a: "Niet uit zichzelf: elke sessie begint met een leeg contextvenster. Twee mechanismen dragen kennis over. CLAUDE.md is een bestand dat jij schrijft met vaste instructies, en dat aan het begin van elke sessie wordt ingeladen. Auto-memory is een map met notities die Claude zelf bijhoudt over je voorkeuren, correcties en lopende afspraken. Samen zorgen ze dat je niet elke keer hetzelfde hoeft uit te leggen."
  - q: "Wat is het verschil tussen CLAUDE.md en auto-memory?"
    a: "CLAUDE.md schrijf jij, auto-memory schrijft Claude. In CLAUDE.md zet je regels die altijd gelden: bouwcommando's, codeerstandaarden, architectuurkeuzes. Auto-memory bevat wat Claude onderweg leert over jou en het project, zoals correcties en voorkeuren. Dingen die al in de code of in je CLAUDE.md staan, slaat auto-memory over. Gebruik CLAUDE.md om gedrag te sturen en laat auto-memory de rest oppikken."
  - q: "Hoe zet ik auto-memory uit in Claude Code?"
    a: "Open /memory in een sessie en gebruik de schakelaar voor auto-memory; die zet autoMemoryEnabled in ~/.claude/settings.json. Voor één project zet je \"autoMemoryEnabled\": false in de projectinstellingen. Via de omgevingsvariabele CLAUDE_CODE_DISABLE_AUTO_MEMORY=1 kan het ook. In lokale sessies staat auto-memory standaard aan."
  - q: "Waar zet ik een CLAUDE.md-bestand neer?"
    a: "Dat hangt af van het bereik. In de projectmap (./CLAUDE.md of ./.claude/CLAUDE.md) deel je het via git met je team. In ~/.claude/CLAUDE.md geldt het voor al je projecten. CLAUDE.local.md in de projectmap is voor je eigen, niet-gedeelde voorkeuren; zet dat bestand in .gitignore. Claude laadt ze allemaal achter elkaar, van breed naar specifiek."
  - q: "Waarom volgt Claude Code mijn CLAUDE.md niet?"
    a: "Controleer eerst met /context of het bestand onder Memory files staat; staat het er niet, dan ziet Claude het niet. Daarna: CLAUDE.md is context, geen harde regel. Vage of tegenstrijdige instructies volgt Claude minder goed. Maak ze concreet, houd het bestand kort, en gebruik voor iets dat altijd moet gebeuren een hook."
sources:
  - label: "Claude Code Docs — How Claude remembers your project"
    url: "https://code.claude.com/docs/en/memory"
  - label: "Claude Code Docs — Hooks guide"
    url: "https://code.claude.com/docs/en/hooks-guide"
---

Wie met [Claude Code](/ai-tools/claude-code) werkt, kent het: je legt in de ene sessie uit hoe je project in elkaar zit, en de volgende keer begint Claude weer blanco. Dat is geen bug, elke sessie start met een leeg contextvenster. Er zijn wel twee manieren om kennis over te dragen, en samen maken ze van een vergeetachtige assistent er een die je project kent.

## Twee soorten geheugen

Claude Code heeft twee geheugensystemen die allebei aan het begin van elke sessie worden ingeladen ([Bron: Claude Code Docs](https://code.claude.com/docs/en/memory)).

Het eerste is **CLAUDE.md**: een markdown-bestand dat jíj schrijft, met vaste instructies. Het tweede is **auto-memory**: notities die Claude zélf bijhoudt op basis van je correcties en voorkeuren. Daar hoef je niets voor te doen.

De vuistregel: CLAUDE.md stuurt gedrag, auto-memory pikt op wat Claude gaandeweg over jou en het project leert.

## Stap 1: schrijf een CLAUDE.md

Zet in CLAUDE.md wat Claude in elke sessie moet weten: bouw- en testcommando's, codeerconventies, de projectindeling en "doe altijd X"-regels. Is iets een procedure van meerdere stappen of geldt het maar voor een deel van de code, dan hoort het in een skill of een regelbestand in `.claude/rules/` ([Bron: Claude Code Docs](https://code.claude.com/docs/en/memory#write-effective-instructions)). Hoe skills werken, lees je in [Claude Code skills instellen](/nieuws/claude-code-skills-instellen).

Waar je het bestand neerzet, bepaalt wie het ziet:

- `./CLAUDE.md` of `./.claude/CLAUDE.md` in je projectmap: gedeeld met je team via git.
- `~/.claude/CLAUDE.md`: jouw voorkeuren voor al je projecten.
- `./CLAUDE.local.md`: jouw persoonlijke projectnotities; zet dit bestand in `.gitignore`.

Claude overschrijft die bestanden niet met elkaar, maar plakt ze achter elkaar, van breed naar specifiek. Je projectinstructies komen dus na je persoonlijke, en `CLAUDE.local.md` wordt als laatste gelezen ([Bron: Claude Code Docs](https://code.claude.com/docs/en/memory#how-claude-md-files-load)).

> **💡 Beginner-tip:** Je hoeft niet bij nul te beginnen. Draai `/init` in je project: Claude bekijkt je codebase en zet een start-CLAUDE.md klaar met bouwcommando's, testinstructies en conventies. Bestaat er al een, dan stelt `/init` verbeteringen voor in plaats van te overschrijven.

## Stap 2: laat auto-memory zijn werk doen

Auto-memory staat in lokale sessies standaard aan. Claude bewaart vier soorten notities: over jou (rol, voorkeuren), feedback (correcties die je geeft), het project (lopende afspraken en deadlines die niet in de code staan) en verwijzingen (waar informatie buiten het project staat). Wat Claude uit de code kan afleiden of wat al in je CLAUDE.md staat, slaat het over ([Bron: Claude Code Docs](https://code.claude.com/docs/en/memory#auto-memory)).

Zeg je "onthoud dat de API-tests een lokale Redis nodig hebben", dan komt dat in auto-memory. Wil je het in CLAUDE.md, zeg dan "zet dit in CLAUDE.md".

Het geheugen staat per git-repository in `~/.claude/projects/<project>/memory/`, met een `MEMORY.md` als inhoudsopgave. Het blijft op je eigen machine en wordt niet gedeeld met andere computers. Bij elke sessie laadt Claude de eerste 200 regels of 25KB van die index; detailnotities leest het pas als ze nodig zijn ([Bron: Claude Code Docs](https://code.claude.com/docs/en/memory#how-it-works)).

Liever uit? Gebruik de schakelaar in `/memory`, zet `"autoMemoryEnabled": false` in de instellingen van één project, of gebruik `CLAUDE_CODE_DISABLE_AUTO_MEMORY=1`.

## Stap 3: controleer wat er geladen is

Twee commando's, twee taken. `/context` laat onder **Memory files** zien welke CLAUDE.md- en regelbestanden bij de start écht zijn ingeladen. `/memory` toont alle mogelijke geheugenlocaties, opent ze in je editor en geeft toegang tot de auto-memory-map ([Bron: Claude Code Docs](https://code.claude.com/docs/en/memory#view-and-edit-with-%2Fmemory)). Alles is platte markdown die je zelf mag aanpassen of weggooien.

Volgt Claude een instructie niet, begin dan bij `/context`. Staat het bestand er niet bij, dan kan Claude het niet zien.

## Stap 4: houd het kort en concreet

CLAUDE.md is context, geen afgedwongen configuratie ([Bron: Claude Code Docs](https://code.claude.com/docs/en/memory#claude-md-vs-auto-memory)). Daarom:

- **Kort:** mik op minder dan 200 regels per bestand. Langere bestanden kosten context en worden slechter opgevolgd.
- **Concreet:** "gebruik 2 spaties inspringen" werkt beter dan "maak de code netjes".
- **Consistent:** spreken twee instructies elkaar tegen, dan kiest Claude er willekeurig één.

Moet iets gegarandeerd gebeuren, zoals een check vóór elke commit, schrijf het dan als hook: die draait als shell-commando op een vast moment, los van wat Claude besluit ([Bron: Claude Code Docs](https://code.claude.com/docs/en/hooks-guide)). Een praktijkvoorbeeld staat in [Claude Code hooks: woordkeuze aanpassen](/nieuws/claude-code-hooks-woordkeuze-aanpassen).

> **⚡ Gevorderden:** Draai af en toe `/doctor prompt-audit`. Claude zoekt dan in je CLAUDE.md-, CLAUDE.local.md- en AGENTS.md-bestanden naar verouderde of tegenstrijdige instructies en stelt aanpassingen voor; er verandert niets tot jij akkoord geeft. Werkt je repo al met AGENTS.md voor andere agents, dan leest Claude Code dat bestand als er geen CLAUDE.md is ([Bron: Claude Code Docs](https://code.claude.com/docs/en/memory#agents-md)). Hoe Codex daarmee omgaat, lees je in [AGENTS.md instellen voor Codex](/nieuws/codex-agents-md-projectregels).

Gebruik je niet Claude Code maar de Claude-app, dan werkt geheugen anders; zie [Claude's geheugen: wat hij onthoudt en hoe je dat aanpast](/nieuws/claude-geheugen-instellen). En waarom een AI die je project kent vaak meer oplevert dan een nieuwer model, lees je op onze zustersite: [projectgeheugen of nieuw AI-model](https://www.hetlaatsteainieuws.nl/nieuws/projectgeheugen-of-modelupgrade).

## Checklist: ben je klaar?

- [ ] `/init` gedraaid en de start-CLAUDE.md nagelopen
- [ ] Persoonlijke projectnotities in `CLAUDE.local.md`, en dat bestand in `.gitignore`
- [ ] CLAUDE.md onder de 200 regels, met concrete instructies
- [ ] Met `/context` gecontroleerd dat je bestanden geladen worden
- [ ] Auto-memory-map via `/memory` bekeken
- [ ] Harde regels als hook vastgelegd in plaats van als instructie

## Stand van zaken — bijgewerkt 2026-10-07

De uitleg hierboven blijft staan. Wat hieronder staat, verandert met nieuwe versies van Claude Code.

| Onderwerp | Stand |
| --- | --- |
| Auto-memory standaard | Aan in lokale sessies |
| Ingeladen uit MEMORY.md | Eerste 200 regels of 25KB |
| Maximale grootte CLAUDE.md | 4 MiB volledig ingeladen; advies onder 200 regels |
| AGENTS.md direct lezen | Vanaf Claude Code v2.1.277 |
| `/doctor prompt-audit` | Vanaf Claude Code v2.1.283 |

## Bronnen

- [Claude Code Docs — How Claude remembers your project](https://code.claude.com/docs/en/memory): officiële documentatie over CLAUDE.md en auto-memory
- [Claude Code Docs — Hooks guide](https://code.claude.com/docs/en/hooks-guide): hooks voor regels die altijd moeten gelden
