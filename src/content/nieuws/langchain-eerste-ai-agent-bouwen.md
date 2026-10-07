---
title: "LangChain-agent bouwen: je eerste agent in Python in 4 stappen"
description: "Bouw met LangChain en create_agent je eerste AI-agent in Python: één eigen tool, een model naar keuze en geheugen per gesprek. Code getoetst aan de docs."
publishedAt: 2026-10-07
updatedAt: 2026-10-07
author: "Redactie"
category: "gids"
tags:
  - "langchain"
  - "ai-agents"
  - "python"
  - "create-agent"
  - "ai-bouwen"
toolSlug: "langchain"
featured: false
draft: false
readingTime: 6
heroImage: "/images/articles/diorama-langchain-eerste-ai-agent-bouwen.webp"
heroImageAlt: "Miniatuur diorama-illustratie bij artikel 'LangChain-agent bouwen: je eerste agent in Python in 4 stappen'"
heroScene: "A tiny brass robot at a wooden workbench fitting a small calculator into a toolbox beside a laptop"
evergreen: true
volatility: high
factsCheckedAt: 2026-10-07
watch:
  - "langchain-versie"
  - "langchain-create-agent"
  - "langsmith-pricing"
keyTakeaways:
  - "Een LangChain-agent is een taalmodel dat in een lus tools aanroept tot de taak klaar is; create_agent uit langchain.agents bouwt die lus voor je."
  - "Een tool is een gewone Python-functie met de @tool-decorator: de functienaam wordt de toolnaam, de docstring de beschrijving en de type hints het invoerschema."
  - "Het model kies je met één string zoals \"openai:gpt-5.5\"; het voorvoegsel bepaalt de provider en het bijbehorende pakket installeer je via een extra zoals langchain[openai]."
  - "Geheugen per gesprek krijg je met een checkpointer (InMemorySaver) plus een thread_id; voor productie gebruik je een database-checkpointer zoals Postgres."
  - "LangChain zelf is gratis en open source (MIT); je betaalt alleen voor de model-API en eventueel voor LangSmith-monitoring boven de gratis laag."
faq:
  - q: "Hoe bouw je een AI-agent met LangChain?"
    a: "Installeer LangChain met het pakket van je modelprovider, bijvoorbeeld pip install -U \"langchain[openai]\", en zet je API-sleutel als omgevingsvariabele. Schrijf daarna een Python-functie met de @tool-decorator en geef die samen met een modelnaam en een systeemprompt aan create_agent. Met agent.invoke stuur je een bericht; de agent beslist zelf of hij je tool aanroept. Het hele voorbeeld in deze gids is zo'n twintig regels code."
  - q: "Wat is create_agent in LangChain?"
    a: "create_agent is de standaardfunctie in LangChain om een agent te maken. Je geeft een model, een lijst tools en een systeemprompt mee, en krijgt een agent terug die het model in een lus laat werken: het model kiest een tool, LangChain voert die uit, het resultaat gaat terug naar het model, tot er een eindantwoord is. Onder de motorkap draait die lus op LangGraph, waardoor geheugen en middleware er direct op aansluiten."
  - q: "Wat is het verschil tussen een agent met LangChain en een agent zonder framework?"
    a: "Zonder framework schrijf je de lus zelf: model aanroepen, tool-calls uitlezen, functies uitvoeren, resultaten terugsturen. Dat is leerzaam en prima voor één tool en één provider. LangChain neemt die lus over en geeft je er geheugen, middleware, tracing en een vaste manier om van model te wisselen bij. Wil je het mechanisme eerst zelf snappen, begin dan met onze gids over een agent in Python zonder framework."
  - q: "Kan ik een LangChain-agent ook met Claude of een lokaal model draaien?"
    a: "Ja. Je verandert alleen de modelstring en installeert het passende pakket. Voor Claude gebruik je bijvoorbeeld \"anthropic:claude-sonnet-4-6\" met langchain[anthropic], voor een lokaal model via Ollama installeer je langchain-ollama. De rest van je code, inclusief de tools en het geheugen, blijft gelijk. Welke modelnamen op dit moment gangbaar zijn, staat in de Stand van zaken onderaan."
sources:
  - label: "LangChain Docs — Quickstart"
    url: "https://docs.langchain.com/oss/python/langchain/quickstart"
  - label: "LangChain Docs — Agents"
    url: "https://docs.langchain.com/oss/python/langchain/agents"
  - label: "LangChain Docs — Tools"
    url: "https://docs.langchain.com/oss/python/langchain/tools"
  - label: "LangChain Docs — Short-term memory"
    url: "https://docs.langchain.com/oss/python/langchain/short-term-memory"
  - label: "LangChain Docs — Models"
    url: "https://docs.langchain.com/oss/python/langchain/models"
  - label: "PyPI — langchain"
    url: "https://pypi.org/project/langchain/"
  - label: "LangChain — Pricing"
    url: "https://www.langchain.com/pricing"
---

Een agent is in de kern een taalmodel dat in een lus gereedschap aanroept tot de taak af is. LangChain omschrijft het letterlijk zo: "a model calling tools in a loop until a given task is complete" ([Bron: LangChain Docs](https://docs.langchain.com/oss/python/langchain/agents)). In deze gids bouw je zo'n agent in vier stappen: installeren, één eigen tool schrijven, in de agent kijken wat er gebeurt, en geheugen toevoegen. Als voorbeeld een assistent die btw uitrekent, klein genoeg om in één bestand te passen.

Nog niet bekend met het framework zelf? Lees dan eerst [Wat is LangChain?](/nieuws/wat-is-langchain). Wil je liever zien hoe zo'n lus er zonder framework uitziet, dan bouw je in [je eerste AI-agent in Python](/nieuws/eerste-ai-agent-bouwen-python) dezelfde soort agent met alleen de OpenAI-API. Die gids laat het mechanisme zien; deze laat zien wat LangChain je uit handen neemt.

## Stap 1: installeer LangChain en je modelpakket

LangChain zelf bevat geen koppeling met een specifieke modelprovider. Die zit in aparte pakketten, die je meeneemt als extra ([Bron: LangChain Docs — Models](https://docs.langchain.com/oss/python/langchain/models)). Voor OpenAI ziet dat er zo uit:

```bash
python3 -m venv .venv
source .venv/bin/activate
pip install -U "langchain[openai]"
export OPENAI_API_KEY="jouw-api-sleutel"
```

Op Windows activeer je de omgeving met `.venv\Scripts\activate`. Werk je met `uv`, dan is `uv add "langchain[openai]"` het equivalent ([Bron: LangChain Docs — Install](https://docs.langchain.com/oss/python/langchain/install)).

> **💡 Beginner-tip:** zet je API-sleutel nooit in de code zelf. Een omgevingsvariabele of een `.env`-bestand dat buiten git blijft is genoeg om te voorkomen dat hij per ongeluk op GitHub belandt.

## Stap 2: schrijf een tool en maak de agent

Een tool is een gewone Python-functie met de `@tool`-decorator. Drie dingen doen ertoe: de functienaam wordt de naam van de tool, de docstring wordt de beschrijving waarmee het model bepaalt wanneer het de tool inzet, en de type hints zijn verplicht omdat ze het invoerschema vormen ([Bron: LangChain Docs — Tools](https://docs.langchain.com/oss/python/langchain/tools)). Een vage docstring levert dus een agent op die zijn eigen gereedschap niet herkent.

Zet dit in `agent.py`:

```python
from langchain.agents import create_agent
from langchain.tools import tool


@tool
def bereken_btw(bedrag_excl: float, tarief: float = 21.0) -> str:
    """Bereken de btw en het totaalbedrag voor een bedrag exclusief btw.
    Het tarief is een percentage, bijvoorbeeld 21 of 9."""
    btw = round(bedrag_excl * tarief / 100, 2)
    return f"Btw: {btw:.2f} euro, totaal inclusief btw: {bedrag_excl + btw:.2f} euro"


agent = create_agent(
    model="openai:gpt-5.5",
    tools=[bereken_btw],
    system_prompt="Je bent een assistent voor ondernemers. Antwoord kort en in het Nederlands.",
)

result = agent.invoke(
    {"messages": [{"role": "user", "content": "Wat is de btw op een factuur van 1250 euro exclusief, hoog tarief?"}]}
)
print(result["messages"][-1].text)
```

De modelstring volgt het patroon `provider:model`; het deel voor de dubbele punt kiest de provider ([Bron: LangChain Docs — Agents](https://docs.langchain.com/oss/python/langchain/agents)). Draai `python agent.py` en je krijgt een antwoord met 262,50 euro btw en 1512,50 euro totaal. Dat getal komt uit jouw functie, niet uit het rekenwerk van het model.

## Stap 3: kijk wat de agent eigenlijk deed

`result["messages"]` bevat het hele gesprek, niet alleen het antwoord. Vervang de laatste regel door:

```python
for message in result["messages"]:
    message.pretty_print()
```

Je ziet nu vier berichten: jouw vraag, een AI-bericht met een tool-call naar `bereken_btw` met de argumenten die het model koos, het tool-bericht met de uitkomst van je functie, en het eindantwoord. Dat is de lus uit de inleiding, zichtbaar gemaakt. Klopt een antwoord niet, dan zie je hier meteen of het model de verkeerde tool koos, verkeerde argumenten meegaf of de uitkomst verkeerd samenvatte.

Voor meer dan een handvol runs is printen onhandig. Met twee omgevingsvariabelen stuur je elke run naar LangSmith, waar je dezelfde stappen met tijden en tokengebruik terugziet; hoe dat werkt staat in [AI-agents traceren met LangSmith](/nieuws/langsmith-ai-agents-monitoren).

## Stap 4: geef de agent een geheugen

Standaard vergeet de agent alles na elke `invoke`. Geheugen per gesprek krijg je met een checkpointer plus een `thread_id` die aangeeft bij welk gesprek een bericht hoort ([Bron: LangChain Docs — Short-term memory](https://docs.langchain.com/oss/python/langchain/short-term-memory)). Je bouwt verder in hetzelfde bestand; de tool uit stap 2 blijft staan. Tegelijk is dit een goed moment om het model als object te configureren in plaats van als string:

```python
from langchain.chat_models import init_chat_model
from langgraph.checkpoint.memory import InMemorySaver

model = init_chat_model("openai:gpt-5.5", timeout=60, max_retries=3)

agent = create_agent(
    model=model,
    tools=[bereken_btw],
    system_prompt="Je bent een assistent voor ondernemers. Antwoord kort en in het Nederlands.",
    checkpointer=InMemorySaver(),
)

config = {"configurable": {"thread_id": "klant-42"}}
agent.invoke({"messages": [{"role": "user", "content": "Btw op 1250 euro, hoog tarief?"}]}, config)
vervolg = agent.invoke({"messages": [{"role": "user", "content": "En hetzelfde bedrag tegen 9 procent?"}]}, config)
print(vervolg["messages"][-1].text)
```

Omdat beide aanroepen dezelfde `thread_id` delen, weet de agent bij de tweede vraag over welk bedrag het gaat. Een andere `thread_id` is een nieuw, leeg gesprek.

> **⚡ Gevorderden:** `InMemorySaver` houdt alles in het werkgeheugen en is weg zodra je script stopt. De docs adviseren voor productie een checkpointer met een database erachter, bijvoorbeeld `langgraph-checkpoint-postgres` met `PostgresSaver` ([Bron: LangChain Docs — Short-term memory](https://docs.langchain.com/oss/python/langchain/short-term-memory)). Let ook op bij `init_chat_model`: parameters die een model niet ondersteunt laat de koppeling soms stil vallen. In onze test bleef `temperature` bij `gpt-5.5` leeg, terwijl hij bij oudere modellen wel werd gezet.

## Wat je hierna bouwt

Met deze twintig regels heb je het skelet dat elke grotere LangChain-agent ook heeft. Daarna komen de uitbreidingen: een goedkeurknop voordat de agent iets onomkeerbaars doet ([HumanInTheLoopMiddleware](/nieuws/langchain-human-in-the-loop-middleware)), bepalen welke informatie de agent per stap ziet ([context engineering](/nieuws/context-engineering-langchain-agents)), en een testbank die controleert of hij na elke wijziging nog werkt ([agents evalueren met een LLM-judge](/nieuws/ai-agents-evalueren-llm-judge)). Wil je geen data naar een cloudmodel sturen, dan wissel je de modelstring voor een lokaal model via Ollama (met het pakket `langchain-ollama`). Waarom dat voor privacy uitmaakt, lees je in onze gids over [een AI-agent met Ollama](/nieuws/ollama-ai-agent-lokaal-offline-privacy).

Wanneer een agent in de praktijk de moeite waard is en wanneer een gewone chatbot volstaat, lees je in [AI-agents: wat zijn ze en wat kun je er echt mee?](https://www.hetlaatsteainieuws.nl/achtergrond/ai-agents-2026-wat-zijn-ze) op Het Laatste AI Nieuws. Het framework zelf vind je in onze toolpagina over [LangChain](/ai-tools/langchain).

## Stand van zaken — bijgewerkt 2026-10-07

De stappen hierboven blijven gelden zolang `create_agent` de standaard is. Versies, modelnamen en prijzen hieronder veranderen sneller; die ververs je hier.

| Onderwerp | Stand |
| --- | --- |
| Huidige versie `langchain` | 1.4.3, 28 september 2026 ([Bron: PyPI](https://pypi.org/project/langchain/)) |
| Python-versie | 3.10 of nieuwer volgens PyPI; de quickstart gebruikt 3.11 ([Bron: LangChain Docs — Quickstart](https://docs.langchain.com/oss/python/langchain/quickstart)) |
| Licentie | MIT voor LangChain ([Bron: PyPI](https://pypi.org/project/langchain/)) en LangGraph ([Bron: GitHub](https://github.com/langchain-ai/langgraph)) |
| Modelstrings in de docs | `openai:gpt-5.5`, `claude-sonnet-4-6` ([Bron: LangChain Docs — Quickstart](https://docs.langchain.com/oss/python/langchain/quickstart)) |
| LangSmith Developer | 0 dollar, 1 seat, tot 5.000 base traces per maand ([Bron: LangChain Pricing](https://www.langchain.com/pricing)) |
| LangSmith Plus | 39 dollar per seat per maand, tot 10.000 base traces per maand ([Bron: LangChain Pricing](https://www.langchain.com/pricing)) |
| Bewaartermijn base traces | 14 dagen ([Bron: LangChain Pricing](https://www.langchain.com/pricing)) |
| Gratis cursus | Introduction to LangChain (Python) in LangChain Academy ([Bron: LangChain Academy](https://academy.langchain.com/)) |

## Bronnen

- [LangChain Docs — Quickstart](https://docs.langchain.com/oss/python/langchain/quickstart): officiële eerste agent, installatie en API-sleutels
- [LangChain Docs — Tools](https://docs.langchain.com/oss/python/langchain/tools): hoe `@tool` naam, beschrijving en schema afleidt
- [LangChain Docs — Short-term memory](https://docs.langchain.com/oss/python/langchain/short-term-memory): checkpointers en `thread_id`
- [LangChain Pricing](https://www.langchain.com/pricing): actuele LangSmith-tiers
