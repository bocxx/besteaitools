---
title: "Graphify: maak van je codebase een kennisgraaf in Claude Code"
description: "Graphify zet code, docs en PDF's om in een kennisgraaf voor Claude Code, Cursor en Codex. Zo installeer je het en stel je je eerste vragen."
publishedAt: 2026-10-20
updatedAt: 2026-10-20
author: "Redactie"
category: "gids"
toolSlug: "claude-code"
tags:
  - "graphify"
  - "claude-code"
  - "kennisgraaf"
  - "ai-skills"
  - "codebase-analyse"
  - "developer-tools"
featured: false
draft: false
readingTime: 5
heroImage: "/images/articles/diorama-graphify-codebase-kennisgraaf-claude-code.webp"
heroImageAlt: "Miniatuur diorama-illustratie bij artikel 'Graphify: maak van je codebase een kennisgraaf in Claude Code'"
heroScene: "A wooden pegboard where colored threads link tiny stacked code blocks into a glowing web beside a brass magnifying glass"
evergreen: false
volatility: high
factsCheckedAt: 2026-10-20
sources:
  - label: "GitHub — Graphify-Labs/graphify"
    url: "https://github.com/Graphify-Labs/graphify"
  - label: "ClaudeLog — Graphify"
    url: "https://claudelog.com/claude-code-mcps/graphify"
keyTakeaways:
  - "Graphify is een gratis open-source skill die je codebase, documentatie, SQL-schema's en PDF's omzet in een kennisgraaf die je AI-codeerassistent kan doorzoeken."
  - "Het werkt in onder meer Claude Code, Cursor, Codex, Gemini CLI en GitHub Copilot CLI. Installeren gaat met twee commando's; je hebt Python 3.10 of hoger nodig."
  - "Code wordt lokaal ontleed met tree-sitter en verlaat je machine niet. Docs, PDF's en afbeeldingen gaan wel naar het model van je AI-assistent."
  - "De maker belooft tot 80% minder tokens, maar de eigen benchmarks meten dat niet. Test het op je eigen project voordat je erop rekent."
faq:
  - q: "Wat is Graphify?"
    a: "Graphify is een open-source tool van Graphify Labs die van een codebase, inclusief documentatie, SQL-schema's, configuratiebestanden en PDF's, een kennisgraaf maakt. Daarin staan onderdelen als functies, tabellen en concepten met hun onderlinge verbanden. Je AI-codeerassistent kan die graaf raadplegen in plaats van steeds opnieuw alle bestanden te lezen. Het project heeft op GitHub ruim 129.000 sterren."
  - q: "Hoe installeer ik Graphify in Claude Code?"
    a: "Installeer eerst het Python-pakket met 'uv tool install graphifyy' (let op: twee keer y) of met pipx. Draai daarna 'graphify install'. Dat herkent je AI-assistent en registreert de /graphify-skill. Wil je de skill alleen voor één project, gebruik dan 'graphify install --project'. Je hebt Python 3.10 of hoger nodig."
  - q: "Stuurt Graphify mijn code naar de cloud?"
    a: "Nee, niet je code. Graphify ontleedt code lokaal met tree-sitter, en volgens de maker verlaat die je machine niet. Er is geen telemetrie. Documenten, PDF's en afbeeldingen gaan wel naar het taalmodel dat je AI-assistent gebruikt, voor de inhoudelijke analyse. Wil je dat niet, zet dan GRAPHIFY_BACKEND=none. Je vragen worden standaard lokaal gelogd in ~/.cache/graphify-queries.log; dat zet je uit met GRAPHIFY_QUERY_LOG_DISABLE=1."
  - q: "Is Graphify gratis?"
    a: "De open-source tool is gratis. Een graaf van alleen code heeft geen API-sleutel nodig. Laat je ook documenten en PDF's analyseren, dan gebruik je het model van je AI-assistent, en dat telt mee in je eigen tegoed. Daarnaast is er Graphify Cloud, een gehoste versie met een gratis proefperiode van 14 dagen; de prijs daarna staat niet op de GitHub-pagina."
---

Je vraagt Claude Code iets over je project en ziet het eerst tientallen bestanden openen voordat er een antwoord komt. Dat kost tijd en tokens. Graphify pakt dat anders aan: het bouwt één keer een kennisgraaf van je hele codebase, inclusief docs en PDF's, en je assistent zoekt daarin ([Bron: GitHub](https://github.com/Graphify-Labs/graphify)). Het project heeft op GitHub ruim 129.000 sterren. In vier stappen draai je het zelf.

## Wat Graphify doet

Graphify ontleedt je code met tree-sitter, een parser die volgens de maker zo'n 40 programmeertalen kent, en zet functies, klassen, tabellen en hun verbanden in een graaf. Elke verbinding krijgt een label: `EXTRACTED` als hij letterlijk in de bron staat, `INFERRED` als Graphify hem zelf heeft afgeleid ([Bron: GitHub](https://github.com/Graphify-Labs/graphify)). Zo zie je welke verbanden hard zijn en welke een gok.

Het werkt als skill in onder meer Claude Code, Cursor, Codex, Gemini CLI, GitHub Copilot CLI en Aider ([Bron: GitHub](https://github.com/Graphify-Labs/graphify)). Nieuw met skills? Lees eerst [wat Claude Code-skills zijn en hoe je ze instelt](/nieuws/claude-code-skills-instellen).

## Stap 1: installeren

Je hebt Python 3.10 of hoger nodig en bij voorkeur `uv`. Het pakket heet `graphifyy`, met twee keer een y; het commando zelf is `graphify` ([Bron: GitHub](https://github.com/Graphify-Labs/graphify)):

```bash
uv tool install graphifyy      # of: pipx install graphifyy
graphify install               # herkent je assistent en registreert de skill
```

Wil je de skill alleen in één project, gebruik dan `graphify install --project`.

> **💡 Beginner-tip:** de dubbele y is geen typfout: zo heet het pakket op PyPI. Na installatie typ je gewoon `graphify`, met één y.

## Stap 2: je eerste graaf bouwen

Open je project in Claude Code en typ ([Bron: GitHub](https://github.com/Graphify-Labs/graphify)):

```
/graphify .
```

In de map `graphify-out/` vind je daarna drie bestanden:

| Bestand | Wat erin staat |
|---|---|
| `graph.html` | Interactieve weergave van de graaf in je browser |
| `GRAPH_REPORT.md` | Kernbegrippen, verrassende verbanden en voorgestelde vragen |
| `graph.json` | De volledige graaf, doorzoekbaar zonder de bronbestanden opnieuw te lezen |

Heb je later bestanden aangepast, dan werk je alleen die bij met `/graphify . --update`. In Codex begin je de commando's met `$graphify` in plaats van `/graphify`.

## Stap 3: vragen stellen

Nu kun je de graaf bevragen ([Bron: GitHub](https://github.com/Graphify-Labs/graphify)):

```
/graphify query "waar wordt de betaalstatus bijgewerkt?"
/graphify path "OrderService" "InvoiceTable"
/graphify explain "retry-logica"
```

Met `path` zie je hoe twee onderdelen met elkaar verbonden zijn, met `explain` krijg je uitleg over één begrip. Begin met de vragen die `GRAPH_REPORT.md` zelf voorstelt: die laten snel zien of de graaf je project goed begrijpt.

## Stap 4: let op privacy en kosten

Code blijft op je eigen machine. Docs, PDF's en afbeeldingen gaan wel naar het model van je AI-assistent voor de inhoudelijke analyse ([Bron: GitHub](https://github.com/Graphify-Labs/graphify)). Draai je Graphify zonder assistent via `graphify extract`, dan kiest het zelf een aanbieder. Volgens de README gaat Kimi daarbij naar servers van Moonshot AI in China. Wil je helemaal geen externe aanroepen, zet dan `GRAPHIFY_BACKEND=none`.

> **⚡ Gevorderden:** je vragen worden standaard lokaal gelogd in `~/.cache/graphify-queries.log`. Werk je aan vertrouwelijke code, zet dan `GRAPHIFY_QUERY_LOG_DISABLE=1` in je shellprofiel ([Bron: GitHub](https://github.com/Graphify-Labs/graphify)).

De maker belooft "80% minder tokens" voor je agent. Die claim staat zonder onderbouwing op de pagina; de gepubliceerde benchmarks gaan over terugvinden en antwoordkwaliteit, niet over tokens ([Bron: GitHub](https://github.com/Graphify-Labs/graphify)). Vergelijk daarom zelf: stel dezelfde vraag met en zonder graaf en kijk in Claude Code naar je verbruik. Zit je dicht tegen je limiet aan, dan helpen ook [onze tips om binnen de weeklimiet te blijven](/nieuws/claude-code-lagere-weekly-limiet-tips). Een verwant idee voor code-reviews is [Code Review Graph via MCP](/nieuws/code-review-graph-mcp-tokens-besparen).

## Checklist: ben je klaar?

- Python 3.10+ en `uv` of `pipx` geïnstalleerd
- `graphifyy` (twee y's) geïnstalleerd en `graphify install` gedraaid
- Eerste graaf gebouwd met `/graphify .`
- `GRAPH_REPORT.md` gelezen en de voorgestelde vragen geprobeerd
- Besloten of docs en PDF's naar je model mogen, anders `GRAPHIFY_BACKEND=none`
- Tokenverbruik met en zonder graaf vergeleken

## Bronnen

- [GitHub — Graphify-Labs/graphify](https://github.com/Graphify-Labs/graphify)
- [ClaudeLog — Graphify](https://claudelog.com/claude-code-mcps/graphify)
