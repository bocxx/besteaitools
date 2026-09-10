---
title: "HumanInTheLoopMiddleware: een goedkeurknop voor je LangChain-agent"
heroImageAlt: "Miniatuur diorama-illustratie bij artikel 'HumanInTheLoopMiddleware: een goedkeurknop voor je LangChain-agent'"
description: "Je agent wil een mail versturen of een DELETE draaien. Met één middleware pauzeert LangChain daarvoor en wacht op jouw akkoord. Zo stel je het in."
publishedAt: 2026-09-10
updatedAt: 2026-09-10
author: "Redactie"
category: "gids"
tags:
  - "langchain"
  - "human-in-the-loop"
  - "middleware"
  - "ai-agents"
  - "langgraph"
  - "create-agent"
toolSlug: "langchain"
featured: false
draft: false
readingTime: 5
heroImage: "/images/articles/diorama-langchain-human-in-the-loop-middleware.webp"
heroScene: "A miniature conveyor belt halted mid-run by a small red gate, with a tiny stamp pad and three labelled stamps waiting beside it"
keyTakeaways:
  - "HumanInTheLoopMiddleware pauzeert je agent voordat een risicovolle tool draait, en wacht op een menselijk besluit."
  - "Je configureert per tool: True voor alle beslissingen, False voor automatisch doorlaten, of een lijst met toegestane keuzes."
  - "Er zijn vier besluittypes: approve, edit, reject en respond. Gebruik respond alleen voor ask-user-tools, nooit om iets te weigeren."
  - "Een checkpointer en een thread_id zijn verplicht: zonder opgeslagen state kan de agent niet pauzeren en later verdergaan."
  - "Met een when-predicaat pauzeer je alleen bij bepaalde argumenten, bijvoorbeeld SQL die geen SELECT is. Dat vereist langchain 1.3.3 of nieuwer."
faq:
  - q: "Wat doet HumanInTheLoopMiddleware in LangChain?"
    a: "Het is een ingebouwde middleware die elke tool-aanroep toetst aan een beleid dat jij instelt. Matcht een aanroep, dan onderbreekt de middleware de uitvoering met een interrupt en wordt de graph-state opgeslagen via de persistentielaag van LangGraph. Een mens beslist vervolgens wat er gebeurt, waarna de agent verdergaat vanaf precies dat punt. De middleware hangt aan de after_model-hook: hij draait nadat het model een antwoord geeft, maar vóórdat de tools daadwerkelijk worden uitgevoerd."
  - q: "Welke beslissingen kan een mens nemen bij een interrupt?"
    a: "Vier. Met approve draait de tool met de oorspronkelijke argumenten. Met edit pas je de argumenten aan voor uitvoering. Met reject sla je de aanroep over en krijgt de agent feedback terug over waarom. Met respond geef je een bericht dat direct als tool-resultaat terugkomt, zonder dat de tool draait — bedoeld voor ask-user-achtige tools. Welke opties beschikbaar zijn per tool bepaal je zelf met allowed_decisions."
  - q: "Waarom heb ik een checkpointer nodig?"
    a: "Omdat pauzeren betekent dat de agent moet kunnen stoppen en later precies daar verdergaan. Die tussenstand wordt bewaard via de persistentielaag van LangGraph, en daar heb je een checkpointer voor nodig plus een thread_id in je config. Voor prototypes volstaat InMemorySaver. In productie gebruik je iets duurzaams als AsyncPostgresSaver of MongoDBSaver, anders is de tussenstand weg zodra je proces herstart."
  - q: "Wat is het verschil tussen reject en respond?"
    a: "Reject betekent: deze actie mag niet doorgaan. De tool draait niet en de agent krijgt feedback waarom, zodat hij kan besluiten iets anders te proberen of te stoppen. Respond betekent: ik ben de tool. Je bericht komt terug als een geslaagd tool-resultaat. Gebruik respond dus nooit om een actie met bijwerkingen te weigeren — het model leest dat als bevestiging dat de tool succesvol is uitgevoerd."
  - q: "Kan ik alleen pauzeren bij gevaarlijke argumenten?"
    a: "Ja, met het when-predicaat in de InterruptOnConfig van een tool. Dat predicaat krijgt een ToolCallRequest en geeft True terug om te onderbreken of False om automatisch goed te keuren. Zo laat je een SELECT-query gewoon lopen en pauzeer je alleen bij een DELETE of UPDATE, of pauzeer je alleen bij schrijfacties buiten je werkmap. Aanroepen die op False uitkomen belanden nooit in de interrupt-batch, dus je reviewer ziet alleen wat een besluit nodig heeft. Deze optie vereist langchain 1.3.3 of hoger."
---

# HumanInTheLoopMiddleware: een goedkeurknop voor je LangChain-agent

Een agent die zelfstandig mailtjes verstuurt of SQL uitvoert, is precies zo nuttig als hij eng is. Je wilt hem laten werken, maar niet blind. LangChain heeft daar een kant-en-klaar antwoord voor: `HumanInTheLoopMiddleware` pauzeert de agent vlak voordat een risicovolle tool draait en wacht op jouw besluit.

Nog niet bekend met het framework? Begin dan bij [Wat is LangChain?](/nieuws/wat-is-langchain).

Vier stappen, en je hebt een goedkeurknop.

## Stap 1: hang de middleware aan je agent

Middleware geef je mee aan `create_agent`. Je bepaalt per tool wat er moet gebeuren:

```python
from langchain.agents import create_agent
from langchain.agents.middleware import HumanInTheLoopMiddleware
from langgraph.checkpoint.memory import InMemorySaver

agent = create_agent(
    model="gpt-5.5",
    tools=[write_file, execute_sql, read_data],
    middleware=[
        HumanInTheLoopMiddleware(
            interrupt_on={
                "write_file": True,
                "execute_sql": {"allowed_decisions": ["approve", "reject"]},
                "read_data": False,
            },
            description_prefix="Tool execution pending approval",
        ),
    ],
    checkpointer=InMemorySaver(),
)
```

Drie configuratievormen: `True` staat alle besluittypes toe, `False` laat de tool zonder tussenkomst draaien, en een dictionary met `allowed_decisions` beperkt de keuzes. Bij `execute_sql` hierboven mag je goedkeuren of weigeren, maar niet de query aanpassen ([Bron: LangChain Docs](https://docs.langchain.com/oss/python/langchain/human-in-the-loop)).

De middleware matcht op de **naam** van de tool. Een functie met de `@tool`-decorator ontleent die naam aan de functienaam, dus `def send_email(...)` levert de sleutel `"send_email"` op.

## Stap 2: regel de checkpointer en de thread_id

Dit vergeten mensen, en dan werkt het niet. Pauzeren betekent dat de agent moet stoppen en later precies daar verdergaan — dus moet de tussenstand ergens staan. Zonder checkpointer geen interrupt.

`InMemorySaver` is prima om te proberen. In productie neem je iets duurzaams als `AsyncPostgresSaver` of `MongoDBSaver`, anders verdampt elke openstaande goedkeuring bij een herstart.

Bij het aanroepen geef je een `thread_id` mee, zodat de pauze aan een gesprek hangt:

```python
config = {"configurable": {"thread_id": "some_id"}}

result = agent.invoke(
    {"messages": [{"role": "user", "content": "Verwijder oude records uit de database"}]},
    config=config,
    version="v2",
)

print(result.interrupts)
```

Je krijgt een `GraphOutput` terug met een `interrupts`-attribuut, waarin de acties staan die om een besluit vragen — inclusief de tool-naam, de argumenten en welke besluiten zijn toegestaan.

## Stap 3: kies je besluit

Vier smaken, en het verschil tussen de laatste twee is belangrijker dan het lijkt:

| Besluit | Wat er gebeurt | Wanneer |
|---|---|---|
| `approve` | Tool draait met de originele argumenten | De actie klopt |
| `edit` | Jij past de argumenten aan, dán draait hij | Verkeerde ontvanger, te ruime query |
| `reject` | Tool draait niet, agent krijgt feedback | De actie mag niet |
| `respond` | Jouw bericht komt terug als tool-resultaat | Alleen bij ask-user-tools |

Hervatten doe je met een `Command`:

```python
from langgraph.types import Command

agent.invoke(
    Command(resume={"decisions": [{"type": "approve"}]}),
    config=config,
    version="v2",
)
```

Staan er meerdere acties in de wacht, dan geef je één besluit per actie, **in dezelfde volgorde** als ze in het interrupt-verzoek staan.

Twee dingen om te onthouden. Bij `reject` kun je een `message` meegeven die uitlegt waarom, en of de agent iets anders moet proberen — laat je die weg, dan krijgt het model een standaardbericht dat het niet opnieuw moet proberen. En gebruik `respond` nooit om een actie met bijwerkingen te weigeren: dat bericht komt binnen als een geslaagd resultaat, en dan denkt je model dat de mail verstuurd is.

Nog een subtiliteit bij `edit`: pas argumenten terughoudend aan. Grote wijzigingen kunnen het model doen besluiten zijn hele aanpak te herzien, met dubbele tool-aanroepen of onverwachte stappen tot gevolg.

## Stap 4: pauzeer alleen wanneer het spannend wordt

Standaard onderbreekt elke aanroep in `interrupt_on`. Dat wordt vermoeiend als 90% van je queries onschuldige SELECT's zijn. Met een `when`-predicaat toets je op de argumenten:

```python
from langchain.agents.middleware import HumanInTheLoopMiddleware, ToolCallRequest

def is_write_query(request: ToolCallRequest) -> bool:
    query = request.tool_call["args"].get("query", "")
    return not query.lstrip().upper().startswith("SELECT")

HumanInTheLoopMiddleware(
    interrupt_on={
        "execute_sql": {
            "allowed_decisions": ["approve", "reject"],
            "when": is_write_query,
        },
    },
)
```

Geeft het predicaat `False` terug, dan draait de aanroep gewoon door en belandt hij nooit in de interrupt-batch. Je reviewer ziet dus alleen wat er echt toe doet. Deze optie vereist `langchain>=1.3.3`.

## Waarom dit meer is dan een veiligheidsmaatregel

Een goedkeurknop wordt vaak gezien als rem. In de praktijk is het vooral wat je nodig hebt om een agent überhaupt in productie te durven zetten: je zet het aan voor de drie tools die iets onomkeerbaars doen, en de rest draait vrij. Het scheelt ook tokens: een agent die pas na twintig stappen wordt teruggefloten, heeft die twintig stappen wel betaald. Wat je verder aan je agent kunt meegeven zonder hem te overladen, staat in [Context engineering: geef je LangChain-agent alleen wat nodig is](/nieuws/context-engineering-langchain-agents).

Waar de discussie over zelfstandig opererende agents nu staat, lees je in de achtergrond [AI-agents in 2026: wat zijn ze en wat kun je er echt mee?](https://hetlaatsteainieuws.nl/achtergrond/ai-agents-2026-wat-zijn-ze) op hetlaatsteainieuws.nl.
