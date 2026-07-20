---
title: "AI-agents evalueren met LangChain: bouw een LLM-as-a-judge-testbank in 4 stappen"
heroImageAlt: "Miniatuur diorama-illustratie bij artikel 'AI-agents evalueren met LangChain: bouw een LLM-as-a-judge-testbank in 4 stappen'"
description: "Werkt je AI-agent nog na elke aanpassing? Bouw met LangChain, Ollama en Qwen een lokale evaluatie-harness die dat automatisch checkt — zonder API-kosten."
publishedAt: 2026-07-20
updatedAt: 2026-07-20
author: "Redactie"
category: "gids"
tags:
  - "langchain"
  - "ollama"
  - "qwen"
  - "ai-agents"
  - "llm-as-a-judge"
  - "evaluatie"
toolSlug: "langchain"
featured: false
draft: false
readingTime: 4
heroImage: "/images/articles/diorama-ai-agents-evalueren-llm-judge.webp"
heroScene: "A miniature courtroom where a tiny robot judge with a gavel reviews another small robot presenting its homework"
keyTakeaways:
  - "Een evaluatie-harness draait je agent langs vaste testcases en geeft een herhaalbaar slaag/faal-overzicht, zodat je regressies direct ziet."
  - "Combineer regelgebaseerde checks (goedkoop, hard) met een LLM-as-a-judge (flexibel, beoordeelt kwaliteit) voor het beste van twee werelden."
  - "Met LangChain v1, Ollama en een lokaal Qwen-model draait alles op je eigen machine, zonder API-kosten."
  - "De judge beoordeelt de agent als black box: je hoeft niets aan je agent zelf te veranderen om hem testbaar te maken."
faq:
  - q: "Wat is LLM-as-a-judge precies?"
    a: "LLM-as-a-judge betekent dat je een taalmodel inzet om de output van een ander taalmodel (of agent) te beoordelen. Je geeft de judge de vraag, het antwoord van de agent en beoordelingscriteria, en vraagt om een oordeel zoals pass/fail of een score. Dat vangt kwaliteitsaspecten die regelgebaseerde checks missen, zoals toon, volledigheid en feitelijke aannemelijkheid."
  - q: "Waarom zou ik mijn AI-agent lokaal evalueren met Ollama?"
    a: "Een evaluatie-run draait je testset bij elke aanpassing opnieuw, en dat tikt bij een betaalde API snel aan. Met Ollama draai je een open model zoals Qwen lokaal, dus onbeperkt en gratis. Voor een judge die pass/fail-oordelen velt is een compact lokaal model in de praktijk voldoende; je kunt twijfelgevallen later altijd nog langs een groter model halen."
  - q: "Is een LLM-as-a-judge betrouwbaar genoeg om op te vertrouwen?"
    a: "Deels. Een judge-model heeft eigen biases: het beoordeelt bijvoorbeeld lange antwoorden vaak milder. Daarom combineer je hem met regelgebaseerde checks voor alles wat hard te toetsen is (bevat het antwoord dit getal, roept de agent de juiste tool aan). De judge doet alleen wat regels niet kunnen. Steekproefsgewijs zelf meelezen blijft verstandig."
  - q: "Heb ik LangChain nodig voor een evaluatie-harness?"
    a: "Nee, het patroon (testcases → agent draaien → checks → rapport) is framework-onafhankelijk. LangChain v1 is hier praktisch omdat create_agent tool-calling regelt en de harness de agent als black box aanroept. Bouw je je agent met de kale OpenAI API, dan werkt exact dezelfde harness-opzet."
---

Je agent werkt vandaag. Maar werkt hij nog na je volgende prompt-aanpassing, model-update of nieuwe tool? Wie dat op gevoel beoordeelt, ziet regressies pas als gebruikers klagen. In deze gids bouw je een evaluatie-harness: een script dat je agent langs vaste testcases draait en een helder slaag/faal-overzicht print. Lokaal, met LangChain, Ollama en Qwen, dus zonder API-kosten.

## Stap 1: zet de lokale basis klaar

Installeer [Ollama](https://ollama.com) en haal een Qwen-model binnen (`ollama pull qwen3`). Installeer daarna LangChain v1 met de Ollama-koppeling: `pip install "langchain>=1.0.0" langchain-ollama`. Het model speelt straks twee rollen: het drijft de agent aan én treedt op als judge ([Bron: freeCodeCamp](https://www.freecodecamp.org/news/how-to-evaluate-ai-agents-with-an-llm-as-a-judge-harness-in-python)).

> **💡 Beginner-tip:** nog nooit een agent gebouwd? Begin dan eerst met onze gids [je eerste AI-agent bouwen in Python](/nieuws/eerste-ai-agent-bouwen-python) en kom daarna terug — een harness heeft pas zin als er iets te testen valt.

## Stap 2: definieer testcases als data

De kern van de harness is een lijst testcases, los van je code. Per case: de input-vraag, wat er hard in het antwoord moet staan, en welke tool de agent hoort te gebruiken.

```python
TEST_CASES = [
    {
        "vraag": "Hoeveel woorden telt de zin 'AI verandert alles'?",
        "moet_bevatten": ["3"],
        "verwachte_tool": "word_count",
    },
    {
        "vraag": "Hoe laat is het nu?",
        "moet_bevatten": [],
        "verwachte_tool": "current_time",
    },
]
```

Begin klein: vijf tot tien cases die je belangrijkste gedrag afdekken, inclusief één vraag waarbij de agent juist géén tool hoort te gebruiken.

## Stap 3: combineer harde checks met een judge

Per testcase draait de harness twee soorten controles. Eerst de regelgebaseerde: staat elk verplicht element in het antwoord, en is de juiste tool aangeroepen? Die zijn goedkoop en onbetwistbaar. Daarna de LLM-as-a-judge: je geeft het judge-model de vraag, het agent-antwoord en criteria, en vraagt om een JSON-oordeel.

```python
JUDGE_PROMPT = """Beoordeel of dit antwoord de vraag correct en volledig beantwoordt.
Vraag: {vraag}
Antwoord: {antwoord}
Geef alleen JSON terug: {{"verdict": "pass" of "fail", "reden": "..."}}"""
```

De harness behandelt je agent als gesloten systeem: hij stopt er een vraag in en beoordeelt wat eruit komt. Je hoeft dus niets aan je agent te veranderen om hem testbaar te maken ([Bron: freeCodeCamp](https://www.freecodecamp.org/news/how-to-evaluate-ai-agents-with-an-llm-as-a-judge-harness-in-python)).

> **⚡ Gevorderden:** judge-modellen hebben meetbare biases — ze belonen bijvoorbeeld langere antwoorden. Verklein dat effect door per criterium een aparte, binaire vraag te stellen ("bevat het antwoord een concreet getal: ja/nee") in plaats van één holistisch oordeel, en door de judge-temperatuur op 0 te zetten voor reproduceerbaarheid.

## Stap 4: draai de harness bij elke wijziging

Laat het script eindigen in een samenvatting: aantal cases, geslaagd, gefaald, en per gefaalde case de reden van de judge. Draai hem na elke prompt-wijziging, model-swap of nieuwe tool. Zo zie je in seconden of een "kleine verbetering" ergens anders iets sloopt — precies het soort borging waar in de agent-wereld steeds meer nadruk op ligt, zoals ook blijkt uit het bredere nieuws over AI-agents op [hetlaatsteainieuws.nl](https://hetlaatsteainieuws.nl/radar).

## Checklist: ben je klaar?

- [ ] Ollama geïnstalleerd en een Qwen-model lokaal gepulled
- [ ] LangChain v1 + langchain-ollama geïnstalleerd
- [ ] 5-10 testcases gedefinieerd als data, los van je code
- [ ] Regelgebaseerde checks voor harde eisen (inhoud + tool-keuze)
- [ ] Judge-prompt met JSON-output en temperatuur 0
- [ ] Harness draait automatisch na elke agent-wijziging

## Bronnen

- [freeCodeCamp — How to Evaluate AI Agents with an LLM-as-a-Judge Harness in Python](https://www.freecodecamp.org/news/how-to-evaluate-ai-agents-with-an-llm-as-a-judge-harness-in-python)
- [LangChain — Agents-documentatie](https://docs.langchain.com/oss/python/langchain/agents)
- [Ollama](https://ollama.com)
