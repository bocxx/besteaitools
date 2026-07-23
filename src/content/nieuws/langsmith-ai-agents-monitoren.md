---
title: "AI-agents traceren en monitoren met LangSmith: zo zie je wat je agent écht doet"
description: "Met LangSmith zie je elke stap van je LangChain-agent: modelcalls, tool-gebruik en latency. Twee omgevingsvariabelen en je tracet mee — gratis tot 5.000 traces per maand."
publishedAt: 2026-07-23
updatedAt: 2026-07-23
author: "Redactie"
category: "gids"
tags:
  - "langsmith"
  - "langchain"
  - "ai-agents"
  - "observability"
  - "ollama"
  - "debugging"
toolSlug: "langchain"
featured: false
draft: false
readingTime: 4
heroImage: "/images/articles/diorama-langsmith-ai-agents-monitoren.webp"
heroImageAlt: "Miniatuur diorama-illustratie bij artikel 'AI-agents traceren en monitoren met LangSmith: zo zie je wat je agent écht doet'"
heroScene: "A tiny robot inspects a glowing tree of connected nodes on a workshop wall, holding a small magnifying glass to one branch"
keyTakeaways:
  - "LangSmith legt elke stap van je agent vast: prompts, modelcalls, tool-aanroepen en latency — zonder extra code in je agent."
  - "Tracing aanzetten kost twee omgevingsvariabelen: LANGSMITH_TRACING=true en je LANGSMITH_API_KEY (LangChain-docs, juli 2026)."
  - "Het gratis Developer-plan biedt 1 seat en 5.000 traces per maand met 14 dagen retentie — genoeg voor lokale experimenten."
  - "Combineer met een lokaal model via Ollama en alleen de observability-laag staat in de cloud; je modelcalls blijven gratis."
  - "Met tracing_context en LANGSMITH_PROJECT bepaal je zelf wát je tracet en in welk project het belandt."
faq:
  - q: "Wat is LangSmith en waarvoor gebruik je het?"
    a: "LangSmith is het observability-platform van LangChain voor LLM-applicaties. Het legt traces vast: een complete opname van elke agent-run, van de eerste gebruikersinvoer tot het eindantwoord, inclusief alle tool-aanroepen, modelinteracties en tussenstappen. Je gebruikt het om te debuggen waarom een agent een verkeerde afslag nam, om latency en tokengebruik te volgen en om gedrag in productie te monitoren. Het werkt via een web-UI op smith.langchain.com."
  - q: "Hoe zet je LangSmith-tracing aan voor een LangChain-agent?"
    a: "Agents die je bouwt met create_agent in LangChain ondersteunen tracing automatisch. Je zet twee omgevingsvariabelen: LANGSMITH_TRACING=true en LANGSMITH_API_KEY met je sleutel van smith.langchain.com. Daarna draai je je agent-code zoals altijd — er is geen extra code nodig, elke run wordt vanzelf gelogd naar het project 'default'. Met de variabele LANGSMITH_PROJECT kies je een eigen projectnaam."
  - q: "Is LangSmith gratis te gebruiken?"
    a: "Ja, er is een gratis Developer-plan met 1 seat en 5.000 base traces per maand, met 14 dagen dataretentie (stand juli 2026). Zonder creditcard blijft je organisatie op die 5.000 traces gecapt; daarboven kost het $2,50 per 1.000 extra traces. Voor lokale experimenten en kleine agents is het gratis plan ruim voldoende. Let op: prijzen en limieten wijzigen geregeld — check de actuele pricing-pagina van LangChain."
  - q: "Kun je LangSmith gebruiken met een lokaal model via Ollama?"
    a: "Ja, en dat is juist een sterke combinatie. Je agent draait dan volledig lokaal — bijvoorbeeld met een Qwen-model via Ollama — terwijl alleen de tracing-data naar LangSmith gaat. Je betaalt zo niets voor modelcalls en houdt toch volledig zicht op wat je agent doet. Alleen de observability-laag staat in de cloud; wil je ook die lokaal, dan zijn er open-source alternatieven zoals Langfuse."
---

Je agent geeft een raar antwoord en je hebt geen idee waarom: was het de prompt, een tool die faalde, of het model zelf? Precies dat gat vult LangSmith, het observability-platform van LangChain. Een verse freeCodeCamp-tutorial (22 juli) liet zien hoe je er een lokale agent mee doorlicht; dit is de aanpak in vier stappen, geverifieerd tegen de LangChain-documentatie.

## Stap 1: maak een gratis LangSmith-account

Meld je aan op [smith.langchain.com](https://smith.langchain.com) en maak een API-sleutel aan via de instellingen. Het gratis Developer-plan geeft je 1 seat en 5.000 base traces per maand met 14 dagen retentie — zonder creditcard blijft dat ook meteen het plafond ([Bron: LangSmith-pricing via Inference.net](https://inference.net/content/langsmith-pricing/), stand juli 2026). Voor het uitproberen van een lokale agent kom je daar ruim mee toe.

## Stap 2: zet tracing aan met twee variabelen

Hier zit de verrassing: er is géén extra code nodig. LangChain-agents die je bouwt met `create_agent` ondersteunen tracing automatisch. Twee omgevingsvariabelen volstaan:

```bash
export LANGSMITH_TRACING=true
export LANGSMITH_API_KEY=<jouw-sleutel>
```

Draai daarna je agent zoals altijd; elke run belandt als trace in het project `default` op smith.langchain.com ([Bron: LangChain-docs](https://docs.langchain.com/oss/python/langchain/observability)). In zo'n trace zie je de complete keten: de gebruikersvraag, elke modelcall met prompt en antwoord, elke tool-aanroep met argumenten en resultaat, en de latency per stap.

> **💡 Beginner-tip:** je hoeft geen betaald model te gebruiken om dit te leren. Draai je agent lokaal met een klein model via Ollama (de freeCodeCamp-tutorial gebruikt Qwen) en alleen de tracing-laag staat in de cloud — je experimenteert dan zonder API-kosten.

## Stap 3: organiseer je traces in projecten

Alles in `default` dumpen wordt snel onoverzichtelijk. Zet `LANGSMITH_PROJECT=mijn-agent` als omgevingsvariabele, of kies per run een project met de `tracing_context`-manager:

```python
import langsmith as ls

with ls.tracing_context(project_name="email-agent-test", enabled=True):
    agent.invoke({"messages": [{"role": "user", "content": "Stuur een testmail"}]})
```

Datzelfde blok accepteert ook `tags` en `metadata` (bijvoorbeeld een user-id of omgeving), zodat je traces in de web-UI kunt filteren op wat jou interesseert. Handig zodra meerdere versies van je agent naast elkaar draaien.

## Stap 4: lees een trace als een verhaal

Open een trace en loop de boom van boven naar beneden door: klopt de system-prompt die het model kreeg? Koos de agent de juiste tool, met de juiste argumenten? Waar zit de meeste latency? De meeste agent-bugs blijken geen modelproblemen maar aansturing: een tool-beschrijving die het model op het verkeerde been zet, of een tussenresultaat dat niet in de vervolgprompt belandt. Dat zie je alleen met een trace — en het is dezelfde discipline die we eerder aanraadden in [AI-agents evalueren met een LLM-judge](/nieuws/ai-agents-evalueren-llm-judge) en [betere prompts voor AI-agents](/nieuws/betere-prompts-ai-agents-make). Waarom dit zicht geen luxe is, laat Gartners voorspelling zien dat veel bedrijven hun agents zonder goede governance weer terugschroeven — lees het bij [hetlaatsteainieuws.nl](https://hetlaatsteainieuws.nl/nieuws/ai-agent-governance-gartner-40-procent).

> **⚡ Gevorderden:** wil je selectief tracen in productie (bijvoorbeeld alleen 1 op de N runs, of alleen bepaalde endpoints), gebruik dan `ls.tracing_context(enabled=True)` rond specifieke aanroepen in plaats van de globale variabele. Zo houd je je trace-budget onder controle.

## Checklist: ben je klaar?

- [ ] Gratis account aangemaakt op smith.langchain.com
- [ ] API-sleutel gegenereerd en veilig opgeslagen
- [ ] `LANGSMITH_TRACING=true` en `LANGSMITH_API_KEY` gezet
- [ ] Agent één keer gedraaid en de trace teruggevonden in de web-UI
- [ ] Eigen projectnaam ingesteld via `LANGSMITH_PROJECT` of `tracing_context`
- [ ] Tags/metadata toegevoegd zodat je runs kunt filteren
- [ ] Eén echte bug opgespoord door een trace stap voor stap door te lezen

## Bronnen

- [LangSmith Observability — officiële LangChain-documentatie](https://docs.langchain.com/oss/python/langchain/observability)
- [LangSmith-platform](https://www.langchain.com/langsmith/observability) — LangChain
- [How to Trace and Monitor AI Agents with LangSmith](https://www.freecodecamp.org/news/how-to-trace-and-monitor-ai-agents-with-langsmith/) — freeCodeCamp, 22 juli 2026 (aanleiding)
- [LangSmith Pricing Explained (2026)](https://inference.net/content/langsmith-pricing/) — Inference.net, geraadpleegd juli 2026
