---
title: "Headroom: tot 95% minder tokens sturen naar je LLM — zonder antwoordkwaliteit in te leveren"
description: "Headroom comprimeert tool-outputs, logs, RAG-chunks en bestanden vóór ze de LLM bereiken. 60-95% tokenbesparing, zelfde antwoorden. Open source, draait lokaal."
publishedAt: 2026-06-10
updatedAt: 2026-06-10
author: "Redactie"
category: "gids"
toolSlug: "headroom"
tags:
  - "headroom"
  - "token-compressie"
  - "llm-kosten"
  - "context-venster"
  - "rag"
  - "mcp-server"
  - "open-source"
draft: false
readingTime: 4
heroImage: "/images/nieuws/retro-headroom-token-compressie-llm.webp"
heroImageAlt: "Retro VR-headset stijl illustratie bij artikel 'Headroom: tot 95% minder tokens sturen naar je LLM'"
keyTakeaways:
  - "Headroom is een open-source Python-library die context comprimeert vóór het de LLM bereikt — 60-95% minder tokens."
  - "Drie integratiemodi: library (Python-functie), proxy (zero-code), MCP server (voor Claude Code / Cursor)."
  - "Draait volledig lokaal — jouw data verlaat de machine niet."
  - "De tool gebruikt SmartCrusher voor JSON, CodeCompressor voor code en een HuggingFace-model voor proza."
  - "Meest nuttig bij coding agents, RAG-pipelines en langlopende agentic workflows met hoog tokenverbruik."
faq:
  - q: "Wat comprimeert Headroom precies?"
    a: "Tool-outputs, logs, RAG-chunks, bestanden, code-zoekresultaten en gespreksgeschiedenis. Alles wat normaal ongecomprimeerd in het context-venster belandt."
  - q: "Hoe installeer ik Headroom?"
    a: "Via pip: `pip install 'headroom-ai[all]'` voor de volledige versie. Deelinstallaties zijn mogelijk voor proxy, MCP of ML-only."
  - q: "Werkt Headroom met Claude Code en Cursor?"
    a: "Ja. Je kunt Headroom als MCP server installeren via `headroom mcp install`, of als proxy opstarten op poort 8787 en je tool daarnaar laten wijzen."
  - q: "Hoe groot is de kwaliteitsimpact van de compressie?"
    a: "Headroom claimt antwoordkwaliteit te behouden via reversibele compressie: originelen worden lokaal opgeslagen, de LLM kan ze opvragen als dat nodig is. Onafhankelijke benchmarks variëren — verwacht 60-80% token-reductie bij praktijkgebruik."
  - q: "Is Headroom gratis?"
    a: "Ja, volledig open source op GitHub (chopratejas/headroom) onder MIT-licentie. Geen API-kosten, geen cloud-vereiste."
---

Als je AI-agents gebruikt om code te schrijven, codebases door te zoeken of RAG-systemen te draaien, kent het probleem je al: het context-venster loopt vol, de kosten klimmen, en je stuurt gigantische lappen tekst naar de LLM die je maar voor 10% echt nodig hebt.

**Headroom** pakt dat probleem aan vóór het de LLM bereikt. De open-source tool comprimeert alles wat normaal in het context-venster belandt — tool-outputs, logs, bestanden, RAG-chunks — en claimt daarmee 60 tot 95% minder tokens te verbruiken, met behoud van antwoordkwaliteit. Draai je zelf open modellen die je van Hugging Face haalt? Doe dat veilig met onze [5 checks voordat je een model draait](/nieuws/huggingface-modellen-veilig-downloaden).

Met 9.000+ GitHub-sterren in de eerste weken is het duidelijk dat dit pijn raakt die veel developers kennen.

## Wat Headroom doet

De kernbelofte is eenvoudig: **comprimeer eerst, stuur dan pas naar het model**.

Stel je hebt een coding agent die een grote repository doorzoekt. Normaal krijgt de LLM hele bestanden, uitgebreide log-outputs en complete RAG-resultaten te zien. Headroom pakt die inputs, gooit er compressie-algoritmes op en stuurt een verkorte maar semantisch equivalente versie.

Wat comprimeert het?

- **Tool-outputs** — de resultaten van function calls en agent-acties
- **Logs** — uitgebreide logbestanden die anders volledig in context belanden
- **RAG-chunks** — retrieval-resultaten met redundante metadata verwijderd
- **Bestanden** — code, configuraties, documentatie
- **Gespreksgeschiedenis** — oudere beurt-rondes die minder relevant zijn

> **💡 Beginner-tip:** Een "context-venster" is hoeveel tekst een AI-model tegelijk kan lezen en verwerken. Hoe groter je context, hoe meer je betaalt per aanvraag. Headroom verkleint wat er instaat — en daarmee de rekening.

## Drie manieren om het te integreren

Headroom biedt drie integratiepaden, afhankelijk van hoeveel code je wil aanraken:

**1. Library (meest controle)**

```python
from headroom import compress

compressed = compress(long_tool_output)
# Stuur compressed naar je LLM in plaats van het origineel
```

Installeer met:
```bash
pip install "headroom-ai[all]"
```

**2. Proxy (zero-code)**

Start Headroom als een transparante tussenlaag die al het verkeer comprimeert:

```bash
headroom proxy --port 8787
```

Verander daarna de base-URL van je AI-client naar `localhost:8787`. Geen codewijzigingen nodig.

**3. MCP server (voor Claude Code / Cursor)**

```bash
headroom mcp install
```

Headroom registreert zichzelf als een MCP-tool die je agent automatisch beschikbaar heeft. Compressie wordt onderdeel van de tool-aanroepen.

> **⚡ Gevorderden:** Headroom gebruikt drie aparte compressie-engines: SmartCrusher (JSON), CodeCompressor (AST-bewuste code-compressie) en Kompress-base (een HuggingFace-model getraind op agentic traces voor proza). Je kunt per compressor instellen hoe agressief de compressie is — handig voor contexten waar volledigheid kritiek is.

## Lokaal, reversibel, transparant

Twee eigenschappen die relevant zijn als je dit in een zakelijke context inzet:

**Lokaal-first.** Headroom draait volledig op jouw machine. Er gaan geen data naar een derde service voor compressie. De compressie-logica draait lokaal. Dezelfde filosofie kun je doortrekken naar het model zelf: in onze gids over [open-weight modellen lokaal draaien](/nieuws/open-weight-modellen-lokaal-draaien) lees je welke modellen daarvoor in aanmerking komen.

**Reversibel.** Headroom slaat originelen op in een lokale cache (CCR — Content-Compressed Retrieval). Als de LLM iets meer detail nodig heeft, kan die het origineel opvragen. Compressie is dus geen verlies-compressie waarbij je data kwijtraakt.

## Wat je kunt verwachten

De 60-95% claim van het project zelf is het meest optimistisch bij sterk gestructureerde data (JSON-logs, repetitieve RAG-outputs). Bij proza en complexe code is de reductie kleiner — verwacht 60-80% bij praktijkgebruik.

Een onafhankelijke benchmark ([Miya-Gadget](https://miyagadget.page/en/blog/2026/06/03/headroom-ai-context-compression-benchmark-en/)) mat RAG-compressie op 73% reductie bij gelijk gehouden antwoordkwaliteit. Voor coding-agent logs lag de reductie rond de 85%.

Als je Uber's situatie kent (AI-budgetten die in vier maanden leeg lopen door coding agent token-gebruik), is een tool die 60-85% van dat verbruik wegsnijdt een serieus antwoord.

## Aandachtspunten

- **Kwaliteitsimpact**: compressie kan bij complexe redeneerketens nuance wegnemen. Test op je eigen use case.
- **Actief project**: het project is snel gegroeid (9k+ sterren) maar relatief jong. Check of releases stabiel zijn voor productiegebruik.

## Samenvatting

Headroom is een open-source context-compressielaag voor LLM-applicaties die 60-95% minder tokens naar het model stuurt. Drie integratiemodi (library, proxy, MCP), volledig lokaal, reversibel. Meest relevant als je coding agents, RAG-pipelines of langlopende agentic workflows draait die dure context genereren.

## Bronnen

- [GitHub: chopratejas/headroom](https://github.com/chopratejas/headroom)
- [PyPI: headroom-ai](https://pypi.org/project/headroom-ai/)
- [Headroom Complete Guide 2026 — Dashen Tech](https://dashen-tech.com/en/dev-tools/headroom-llm-token-compression/)
- [Benchmark: Headroom in praktijk — Miya-Gadget](https://miyagadget.page/en/blog/2026/06/03/headroom-ai-context-compression-benchmark-en/)
- [Headroom: Cut LLM Token Usage by 95% — DEV Community](https://dev.to/arshtechpro/headroom-cut-your-llm-token-usage-by-up-to-95-without-changing-your-answers-5g06)
