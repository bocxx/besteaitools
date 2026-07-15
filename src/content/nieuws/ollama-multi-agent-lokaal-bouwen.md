---
title: "Multi-agent AI lokaal bouwen met Ollama: je eerste agent-team zonder API-kosten"
description: "Met Ollama en een open Qwen-model draai je een multi-agent-systeem volledig op je eigen machine. Zo zet je 'm op in vijf stappen, zonder cloudkosten."
publishedAt: 2026-07-15
updatedAt: 2026-07-15
author: "Redactie"
category: "gids"
tags:
  - "ollama"
  - "multi-agent"
  - "langgraph"
  - "qwen"
  - "lokale-llm"
  - "python"
toolSlug: "ollama"
featured: false
draft: false
readingTime: 4
heroScene: "Three tiny robot figurines at a miniature workbench passing a scroll of paper between them, beside a small llama figurine"
keyTakeaways:
  - "Met Ollama draai je open modellen zoals Qwen3 volledig lokaal — je multi-agent-experimenten kosten dan geen API-tegoed."
  - "Een multi-agent-systeem is in de kern verrassend weinig code: meerdere prompts met eigen rollen die elkaars output doorgeven."
  - "LangGraph voegt structuur toe met nodes, edges en gedeelde state — handig zodra je workflow vertakt of moet kunnen herstarten."
  - "Start met qwen3:8b (~6 GB VRAM); voor betrouwbaar tool-gebruik door agents zijn grotere varianten zoals qwen3:14b de veiligere keuze."
faq:
  - q: "Kan ik een multi-agent AI-systeem gratis lokaal draaien?"
    a: "Ja. Met Ollama draai je open modellen zoals Qwen3 op je eigen computer, zonder API-kosten. Je betaalt alleen met hardware: het 8B-model wil ongeveer 6 GB VRAM of een Mac met 16 GB unified memory. De agent-logica zelf is gewone Python en kost niets."
  - q: "Heb ik LangGraph nodig voor een multi-agent-systeem?"
    a: "Nee, niet per se. De freeCodeCamp-tutorial van 14 juli 2026 bouwt bewust eerst een versie in kale Python om te laten zien hoe weinig code een multi-agent-systeem eigenlijk is. LangGraph wordt pas waardevol als je workflow vertakt, agents elkaars werk moeten controleren, of je state wilt bewaren tussen stappen."
  - q: "Welk Ollama-model is geschikt voor AI-agents?"
    a: "Qwen3 is een goed startpunt: open gewichten (Apache 2.0), sterke instructie-opvolging en beschikbaar in maten van 0.6B tot 235B parameters. Begin met qwen3:8b op bescheiden hardware. Voor agents die tools moeten aanroepen zijn grotere varianten (14B en op) merkbaar betrouwbaarder in het volgen van tool-schema's."
  - q: "Wat is het verschil tussen één AI-agent en een multi-agent-systeem?"
    a: "Eén agent krijgt één rol en één opdracht. In een multi-agent-systeem verdeel je het werk over gespecialiseerde agents — bijvoorbeeld een onderzoeker, een schrijver en een redacteur — die elkaars output doorgeven. Dat levert vaak betere resultaten dan één model dat alles tegelijk moet doen, omdat elke prompt scherper kan zijn."
  - q: "Hoeveel geheugen heb ik nodig om Qwen3 lokaal te draaien?"
    a: "Als vuistregel: qwen3:8b draait op een GPU met 8 GB VRAM of een Mac met 16 GB unified memory, qwen3:14b wil 16 GB VRAM, en qwen3:32b of de 30b-a3b MoE-variant vraagt 24 GB. Te weinig geheugen betekent dat Ollama naar CPU terugvalt — het werkt dan nog, maar merkbaar trager."
---

Een team van AI-agents dat samen een taak oplost, klinkt als iets waarvoor je een cloudabonnement en een creditcard nodig hebt. Dat hoeft niet: freeCodeCamp publiceerde op 14 juli 2026 een tutorial die een multi-agent-systeem twee keer bouwt — eerst in kale Python, daarna in LangGraph — en alles draait lokaal via [Ollama](https://ollama.com) met een Qwen-model, dus zonder API-kosten ([Bron: freeCodeCamp](https://www.freecodecamp.org/news/how-to-build-your-first-multi-agent-ai-system-in-python-and-langgraph/)). In deze gids zet je diezelfde basis op.

## Stap 1: installeer Ollama en haal een model binnen

Download Ollama voor macOS, Windows of Linux vanaf [ollama.com](https://ollama.com). Daarna haal je in de terminal een model binnen:

```bash
ollama pull qwen3:8b
ollama run qwen3:8b
```

Qwen3 is een familie open modellen (Apache 2.0-licentie, vrij commercieel te gebruiken) van 0.6B tot 235B parameters ([Bron: Ollama](https://ollama.com/library/qwen3)). De 8B-variant is het gangbare startpunt: die draait op een GPU met zo'n 6 GB VRAM of een Mac met 16 GB geheugen. Ollama serveert het model daarna lokaal op `localhost:11434` — daar praten je agents straks mee.

> **💡 Beginner-tip:** je hoeft niets van GPU's te weten om dit te proberen. Werkt `ollama run qwen3:8b` en krijg je antwoord in de terminal? Dan is je machine snel genoeg om verder te gaan.

## Stap 2: begrijp hoe weinig een multi-agent-systeem eigenlijk is

De kern van de freeCodeCamp-aanpak: een "agent" is een prompt met een rol plus een functie die het model aanroept. Een multi-agent-systeem is een handvol van die functies die elkaars output doorgeven. Een onderzoeker-agent verzamelt punten, een schrijver-agent maakt er tekst van, een redacteur-agent controleert het resultaat. In kale Python is dat een for-loop en drie prompts — geen framework nodig.

Die eerste versie bouwen loont, ook als je daarna een framework pakt: je ziet precies welke problemen een framework wél en niet voor je oplost.

## Stap 3: voeg LangGraph toe voor structuur

Zodra je workflow vertakt ("bij twijfel terug naar de onderzoeker") of state moet bewaren, wordt kale Python onoverzichtelijk. Dan is [LangGraph](https://docs.langchain.com/oss/python/integrations/providers/ollama) de logische volgende stap:

```bash
pip install langchain-ollama langgraph
```

In LangGraph beschrijf je je agents als *nodes* (Python-functies), de overgangen als *edges*, en deelt alles één *state*-object. Je lokale model koppel je met twee regels:

```python
from langchain_ollama import ChatOllama
llm = ChatOllama(model="qwen3:8b")
```

Dezelfde graph werkt later ook met een cloudmodel — je wisselt alleen de LLM-regel om.

> **⚡ Gevorderden:** wil je dat agents zelfstandig tools aanroepen (via `llm.bind_tools`), test dat dan eerst los. Kleinere lokale modellen volgen tool-schema's wisselvallig; vanaf qwen3:14b wordt dat merkbaar betrouwbaarder.

## Stap 4: laat het team draaien en kijk mee

Start je graph met een opdracht en log elke tussenstap naar de terminal. Juist lokaal is dat gratis kijkgenot: je ziet per agent wat er in en uit gaat, zonder dat elke iteratie geld kost. Itereer op de rolprompts — daar zit bij multi-agent-systemen vrijwel altijd de grootste winst, niet in de graph-structuur.

Wil je eerst dieper in Ollama zelf duiken, pak dan onze gids [Ollama voor developers](/nieuws/ollama-tutorial-devs-guide) erbij, of lees [hoe je open-weight-modellen lokaal draait](/nieuws/open-weight-modellen-lokaal-draaien). Wat AI-agents nu wel en niet kunnen, legt hetlaatsteainieuws.nl uit in [AI-agents in 2026: wat zijn ze en wat kun je er echt mee?](https://hetlaatsteainieuws.nl/achtergrond/ai-agents-2026-wat-zijn-ze)

## Checklist: ben je klaar?

- [ ] Ollama geïnstalleerd en `ollama run qwen3:8b` geeft antwoord
- [ ] Eerste multi-agent-versie in kale Python gebouwd (2-3 rollen)
- [ ] `pip install langchain-ollama langgraph` gedraaid
- [ ] Dezelfde workflow als LangGraph-graph met nodes, edges en gedeelde state
- [ ] Tussenstappen gelogd zodat je per agent ziet wat er gebeurt
- [ ] Rolprompts minstens één keer aangescherpt op basis van de output

## Bronnen

- [freeCodeCamp — How to Build Your First Multi-Agent AI System in Python and LangGraph (14 juli 2026)](https://www.freecodecamp.org/news/how-to-build-your-first-multi-agent-ai-system-in-python-and-langgraph/)
- [Ollama — Qwen3 model library](https://ollama.com/library/qwen3)
- [LangChain docs — Ollama-integraties](https://docs.langchain.com/oss/python/integrations/providers/ollama)
