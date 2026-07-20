---
title: "Je eerste AI-agent bouwen in Python: een weer-assistent in 4 stappen"
heroImageAlt: "Miniatuur diorama-illustratie bij artikel 'Je eerste AI-agent bouwen in Python: een weer-assistent in 4 stappen'"
description: "Bouw in een half uur je eerste echte AI-agent in Python: een assistent die zelf een weer-API aanroept via de OpenAI Responses API. Zonder frameworks."
publishedAt: 2026-07-20
updatedAt: 2026-07-20
author: "Redactie"
category: "gids"
tags:
  - "chatgpt"
  - "openai-api"
  - "ai-agents"
  - "python"
  - "function-calling"
toolSlug: "chatgpt"
featured: false
draft: false
readingTime: 4
heroImage: "/images/articles/diorama-eerste-ai-agent-bouwen-python.webp"
heroScene: "A tiny robot assistant holding a miniature umbrella, checking a small weather station connected by cables to a laptop"
keyTakeaways:
  - "Een AI-agent is een programma dat zelf beslist wanneer het een tool aanroept — hier bouw je er een die live weerdata ophaalt."
  - "Je hebt genoeg aan Python 3.10+, de openai-library en een OpenAI API-key; de weerdata komt gratis en zonder key van Open-Meteo."
  - "OpenAI raadt voor nieuwe projecten de Responses API aan; function calling is daarin de kern van elke agent-loop."
  - "De hele agent past in zo'n 60 regels code: tool definiëren, model laten kiezen, functie uitvoeren, resultaat terugsturen."
faq:
  - q: "Wat is het verschil tussen een chatbot en een AI-agent?"
    a: "Een chatbot reageert alleen op je bericht met tekst. Een AI-agent kan daarnaast zelf acties uitvoeren: hij beslist of hij een tool nodig heeft (zoals een weer-API of een database), roept die aan, en gebruikt het resultaat in zijn antwoord. Dat besluit-en-handel-patroon heet de agent-loop, en dat is precies wat je in deze gids bouwt."
  - q: "Heb ik LangChain nodig om een AI-agent te bouwen?"
    a: "Nee. Voor een eerste agent heb je genoeg aan de officiële openai-library; function calling zit daar ingebouwd. Frameworks zoals LangChain worden pas nuttig als je meerdere tools, geheugen of complexere ketens wilt combineren. Beginnen zonder framework leert je bovendien wat er onder de motorkap gebeurt."
  - q: "Wat kost het bouwen van een AI-agent met de OpenAI API?"
    a: "Je betaalt per token aan OpenAI; een klein model (mini-variant) is voor dit soort agents ruim voldoende en kost fracties van centen per vraag. De weerdata van Open-Meteo is gratis en vereist geen API-key voor niet-commercieel gebruik. Reken voor het hele experiment op hooguit een paar cent. Actuele tokenprijzen staan op platform.openai.com."
  - q: "Welke OpenAI API gebruik ik voor agents: Chat Completions of Responses?"
    a: "OpenAI raadt voor nieuwe projecten de Responses API aan. Die behandelt de agent-loop (model roept tool aan, krijgt resultaat, beslist de volgende stap) als eersteklas concept, waar je dat bij Chat Completions zelf aan elkaar moest knopen. Chat Completions blijft ondersteund, maar geldt inmiddels als de oude route."
---

AI-agents klinken als iets voor grote teams, maar het kernidee past in één Python-bestand: een model dat zelf beslist wanneer het een tool aanroept. In deze gids bouw je een weer-assistent die vragen als "moet ik morgen een paraplu mee naar Utrecht?" beantwoordt met échte, live weerdata. Geen frameworks, alleen de officiële OpenAI-library.

## Stap 1: wat heb je nodig?

Drie dingen: Python 3.10 of nieuwer, een [OpenAI API-key](https://platform.openai.com) en de officiële library (`pip install openai`). Voor het weer gebruiken we [Open-Meteo](https://open-meteo.com): gratis en zonder API-key voor niet-commercieel gebruik, dus je hoeft je maar op één plek te registreren.

Zet je API-key als omgevingsvariabele (`export OPENAI_API_KEY=...`), dan pikt de library hem automatisch op.

> **💡 Beginner-tip:** je betaalt bij OpenAI per gebruik, maar een klein model (mini-variant) kost voor dit soort experimenten fracties van centen per vraag. Stel gerust een bestedingslimiet in via je OpenAI-dashboard, dan kan er niets misgaan.

## Stap 2: definieer je tool

Een agent kan alleen tools gebruiken die jij beschrijft. Je vertelt het model in JSON wát de functie doet en welke parameters ze heeft; het model beslist zelf wanneer het haar aanroept. OpenAI raadt voor nieuwe projecten de Responses API aan, waarin dit function calling-patroon centraal staat ([Bron: OpenAI](https://platform.openai.com/docs/guides/migrate-to-responses)).

```python
from openai import OpenAI
import requests, json

client = OpenAI()
MODEL = "gpt-5-mini"  # check platform.openai.com/docs/models voor actuele modelnamen

tools = [{
    "type": "function",
    "name": "get_weather",
    "description": "Haal het actuele weer op voor een plaats (temperatuur, neerslag, wind).",
    "parameters": {
        "type": "object",
        "properties": {
            "latitude": {"type": "number"},
            "longitude": {"type": "number"},
        },
        "required": ["latitude", "longitude"],
    },
}]

def get_weather(latitude, longitude):
    r = requests.get(
        "https://api.open-meteo.com/v1/forecast",
        params={"latitude": latitude, "longitude": longitude,
                "current": "temperature_2m,precipitation,wind_speed_10m"},
    )
    return r.json()["current"]
```

Het model kent de coördinaten van vrijwel elke plaats, dus die hoef je niet zelf op te zoeken.

## Stap 3: bouw de agent-loop

Dit is het hart van elke agent: vraag stellen, kijken of het model een tool wil gebruiken, de functie uitvoeren, en het resultaat teruggeven zodat het model een definitief antwoord kan formuleren.

```python
def ask(question):
    input_items = [{"role": "user", "content": question}]
    response = client.responses.create(model=MODEL, input=input_items, tools=tools)

    for item in response.output:
        if item.type == "function_call" and item.name == "get_weather":
            args = json.loads(item.arguments)
            result = get_weather(**args)
            input_items += [item, {
                "type": "function_call_output",
                "call_id": item.call_id,
                "output": json.dumps(result),
            }]
            response = client.responses.create(model=MODEL, input=input_items, tools=tools)

    return response.output_text

print(ask("Heb ik vanmiddag een paraplu nodig in Utrecht?"))
```

Stel je een vraag zonder weer-component ("wat is de hoofdstad van Frankrijk?"), dan slaat het model de tool gewoon over. Dát onderscheid — zelf beslissen of een actie nodig is — maakt dit een agent.

> **⚡ Gevorderden:** in productie wil je de loop generiek maken (een `while` die doorgaat zolang er function calls terugkomen), meerdere tools registreren in een dispatch-dict, en time-outs plus foutafhandeling om de weer-call heen zetten. De structuur hierboven blijft hetzelfde.

## Stap 4: breid uit — of stap over op een framework

Vervang de weer-API door je eigen data (agenda, voorraad, database) en je hebt een assistent op maat. Pas als je meerdere tools, geheugen of complexe ketens combineert, wordt een framework zoals LangChain interessant; hoe je agents daarmee vervolgens test, lees je in onze gids over [AI-agents evalueren met een LLM-as-a-judge](/nieuws/ai-agents-evalueren-llm-judge). Wat er ondertussen in de bredere agent-wereld gebeurt, volgt hetlaatsteainieuws.nl dagelijks in het [AI-nieuwsoverzicht](https://hetlaatsteainieuws.nl/radar).

## Checklist: ben je klaar?

- [ ] Python 3.10+ geïnstalleerd en `pip install openai requests` gedraaid
- [ ] OpenAI API-key aangemaakt en als omgevingsvariabele gezet
- [ ] Bestedingslimiet ingesteld in het OpenAI-dashboard
- [ ] Tool-definitie (JSON-schema) en Python-functie geschreven
- [ ] Agent-loop getest met een weer-vraag én een niet-weer-vraag
- [ ] Doorgedacht welke eigen data je als volgende tool aansluit

## Bronnen

- [OpenAI — Migrate to the Responses API](https://platform.openai.com/docs/guides/migrate-to-responses)
- [Open-Meteo — gratis weer-API](https://open-meteo.com)
- [The Practical Developer — Building Your First AI Agent with Python](https://dev.to/oviawe_nosa_78bf57cb51e41/building-your-first-ai-agent-with-python-a-beginners-guide-fe9)
