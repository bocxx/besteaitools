---
title: "Code Review Graph via MCP: tot 63x minder tokens bij review"
description: "Code Review Graph bouwt een codegraaf van je repo en serveert alleen relevante context aan AI-tools via MCP. Zo installeer je het en bespaar je fors op tokens bij code review."
publishedAt: 2026-09-25
updatedAt: 2026-09-25
author: "Redactie"
category: "gids"
tags:
  - "mcp"
  - "code-review-graph"
  - "tokens-besparen"
  - "code-review"
  - "developer-tools"
toolSlug: "mcp"
featured: false
draft: false
readingTime: 4
heroScene: "A wooden filing cabinet where hundreds of tiny index cards funnel through a brass sieve into a single small envelope on a desk."
keyTakeaways:
  - "Code Review Graph is een gratis, open-source MCP-server (MIT-licentie) die een codegraaf van je repo bouwt met tree-sitter-parsing."
  - "Bij tests over meerdere repositories was de mediane contextreductie ongeveer 63x, met een spreiding van 35x tot 358x."
  - "Installatie is drie commando's: pip install code-review-graph, code-review-graph install en code-review-graph build."
  - "Het configureert zichzelf automatisch voor Claude Code, Cursor, Windsurf, GitHub Copilot en tien andere MCP-platforms."
  - "De impact-analyse haalt gemiddeld 0,69 F1-score tegen handmatig gecontroleerde structuur, dus blijf bij grote wijzigingen zelf meekijken."
faq:
  - q: "Wat is Code Review Graph?"
    a: "Code Review Graph is een open-source MCP-server die met tree-sitter-parsing een structurele kaart van je codebase maakt. In plaats van je hele repo aan een AI-tool te voeren bij een code review, berekent het welke bestanden een wijziging echt raakt ('blast radius') en serveert alleen die context. Het werkt met 40+ programmeertalen."
  - q: "Hoeveel tokens bespaart Code Review Graph?"
    a: "Volgens de benchmarks in de README was de mediane contextreductie circa 63x, met uitschieters tussen 35x en 358x afhankelijk van de repo. Bij Flask bijvoorbeeld werd een corpus van 143.594 tokens teruggebracht tot ongeveer 2.196 tokens per graafquery."
  - q: "Werkt Code Review Graph met Claude Code?"
    a: "Ja. Het commando code-review-graph install detecteert automatisch compatibele platforms, waaronder Claude Code, Cursor, Windsurf, GitHub Copilot, Continue en Zed, en schrijft de bijbehorende MCP-server-configuratie weg. Je hoeft zelf niets handmatig in een configuratiebestand te typen."
  - q: "Is Code Review Graph gratis?"
    a: "Ja, de tool staat onder de MIT-licentie en is volledig gratis te gebruiken. Je betaalt alleen voor de AI-tool of het model dat je eronder draait — Code Review Graph zelf brengt geen kosten in rekening."
---

Code Review Graph is een MCP-server die in korte tijd naar ruim 31.000 GitHub-sterren steeg ([Bron: GitHub](https://github.com/tirth8205/code-review-graph)) door een herkenbaar probleem op te lossen: AI-coding-tools die bij elke reviewvraag je hele repository inlezen. Met een codegraaf op basis van tree-sitter-parsing serveert het alleen de context die er echt toe doet. Hieronder installeer je het in een paar minuten en koppel je het aan Claude Code, Cursor of een van de andere ondersteunde platforms.

## Wat Code Review Graph precies doet

De tool parseert je hele codebase met tree-sitter tot een structurele kennisgraaf — welke functie welke andere functie aanroept, welk bestand van welk ander bestand afhangt. Wijzig je een functie, dan berekent Code Review Graph de "blast radius": de bestanden die die wijziging daadwerkelijk raakt. In plaats van je AI-tool de volledige repo te voeren, krijgt die alleen dat relevante stukje context via het [Model Context Protocol](https://modelcontextprotocol.io), de open standaard waarmee AI-modellen met externe tools praten.

Het resultaat is meetbaar: bij de repositories in de eigen benchmarkset lag de mediane contextreductie rond de 63x, met een spreiding van 35x tot 358x ([Bron: GitHub](https://github.com/tirth8205/code-review-graph)). Bij Flask werd een corpus van 143.594 tokens teruggebracht tot zo'n 2.196 tokens per graafquery. De tool ondersteunt 40+ talen, van Python en JavaScript tot Go, Rust en zelfs Jupyter-notebooks. Wil je eerst breder begrijpen wat AI-agents precies zijn en hoe ze met tools als deze samenwerken? [Hetlaatsteainieuws.nl legt de basis uit](https://www.hetlaatsteainieuws.nl/achtergrond/ai-agents-2026-wat-zijn-ze).

> **💡 Beginner-tip:** "Blast radius" klinkt technisch, maar is simpel: het zijn de bestanden die daadwerkelijk kapot kunnen gaan door jouw wijziging. Geen 200 ongerelateerde bestanden erbij — alleen wat telt.

## In vier stappen installeren

1. **Installeer het pakket.** Draai `pip install code-review-graph` in je terminal, in of buiten een virtuele omgeving — beide werken.
2. **Laat de tool zichzelf configureren.** Draai `code-review-graph install` in de root van je project. Dit commando detecteert automatisch welke AI-platforms je hebt geïnstalleerd — Claude Code, Cursor, Windsurf, GitHub Copilot, Continue, Zed, CodeBuddy Code, Hermes Agent, Gemini CLI en meer — en schrijft de MCP-server-entries weg zodat die platforms de tool meteen kunnen aanspreken.
3. **Bouw de graaf.** Draai `code-review-graph build` om je volledige codebase eenmalig te parsen. Bij een grote monorepo kan dit een paar minuten duren; daarna werkt `code-review-graph update` incrementeel op alleen de gewijzigde bestanden.
4. **Test het in je AI-tool.** Open Claude Code of Cursor in hetzelfde project en vraag om een review van een recente wijziging. Je ziet dat de tool nu gericht relevante bestanden citeert in plaats van willekeurige stukken repo.

> **⚡ Gevorderden:** de impact-analyse haalt gemiddeld 0,69 F1-score tegen handmatig gecontroleerde structurele randen. Dat is goed, niet perfect — bij een risicovolle refactor loont het om `code-review-graph detect-changes --brief` zelf even te doorlopen voordat je de AI-samenvatting blind aanneemt.

## Werkt het niet meteen?

Negen van de tien keer staat het probleem bij een AI-tool die de MCP-server niet oppikt omdat hij al draaide tijdens de installatie — herstart de tool na stap 2. Gebruik je een monorepo met meerdere talen door elkaar, controleer dan of alle relevante mappen zijn meegenomen in `build`; submodules en vendored code worden soms standaard overgeslagen. Voor doorlopend gebruik in een actief project is `code-review-graph watch` handig: het herbouwt de graaf automatisch zodra je bestanden opslaat, zodat de context nooit veroudert.

## Checklist: ben je klaar?

- [ ] Python-omgeving met `pip install code-review-graph` uitgevoerd
- [ ] `code-review-graph install` gedraaid in de project-root
- [ ] Minstens één AI-platform (Claude Code, Cursor, …) gedetecteerd tijdens install
- [ ] `code-review-graph build` succesvol doorlopen zonder foutmeldingen
- [ ] Eerste testreview in je AI-tool gedaan en relevante bestanden herkend
- [ ] `watch` ingeschakeld als je dagelijks in dezelfde repo werkt

## Bronnen

- [code-review-graph op GitHub](https://github.com/tirth8205/code-review-graph) — README met installatie-instructies, ondersteunde platforms en benchmarkcijfers
- [Model Context Protocol — officiële site](https://modelcontextprotocol.io) — uitleg van de MCP-standaard waarop de tool draait
