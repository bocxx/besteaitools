---
title: "Een AI-agent die je data nooit verlaat: zo doe je het met Ollama"
heroImageAlt: "Miniatuur diorama-illustratie bij tutorial over een lokale AI-agent met Ollama"
description: "Wil je AI inzetten op gevoelige gegevens zonder ze naar de cloud te sturen? Met Ollama draai je een model volledig op je eigen machine. Zo koppel je er een agent aan vast."
publishedAt: 2026-07-29
updatedAt: 2026-07-29
author: "Redactie"
category: "gids"
tags:
  - "ollama"
  - "lokale-ai"
  - "ai-agent"
  - "privacy"
  - "on-premise"
  - "llama"
toolSlug: "ollama"
featured: false
draft: false
readingTime: 5
heroImage: "/images/articles/diorama-ollama-ai-agent-lokaal-offline-privacy.webp"
keyTakeaways:
  - "Ollama draait open modellen zoals Llama en Phi lokaal op je eigen computer of server, zonder dat er data naar een externe aanbieder gaat."
  - "De ingebouwde API is OpenAI-compatibel op http://localhost:11434/v1, dus bestaande agent-code werkt door één regel — de basis-URL — aan te passen."
  - "Voor een agent heb je een model nodig dat 'tool calling' ondersteunt, zoals llama3.1; het model geeft dan gestructureerde acties terug die jouw code uitvoert."
  - "De winst is privacy en geen tokenkosten; de prijs is dat je zelf voor voldoende reken- en geheugencapaciteit zorgt."
faq:
  - q: "Waarom een AI-agent lokaal draaien in plaats van in de cloud?"
    a: "Vanwege privacy en kosten. Werk je met klantdossiers, medische gegevens of andere gevoelige informatie, dan wil je die vaak niet naar een externe AI-dienst sturen. Met Ollama blijft alles op je eigen machine of server, binnen je eigen netwerk. Daar komt bij dat je geen tokens per aanvraag betaalt: de rekenkracht is de enige kostenpost. Het nadeel is dat je zelf voor voldoende hardware moet zorgen, en dat de grootste modellen lokaal niet haalbaar zijn."
  - q: "Wat betekent 'OpenAI-compatibel' bij Ollama?"
    a: "Het betekent dat Ollama dezelfde soort verzoeken accepteert als de bekende OpenAI-API. Code of tools die je al hebt geschreven voor bijvoorbeeld ChatGPT laten zich naar Ollama wijzen door alleen de basis-URL te veranderen in http://localhost:11434/v1. Je hebt formeel een API-sleutel nodig, maar Ollama controleert die niet — je vult gewoon iets in. Zo hoef je je bestaande opzet niet om te bouwen."
  - q: "Welke modellen kan ik gebruiken voor tool calling?"
    a: "Tool calling — waarbij het model niet alleen tekst teruggeeft maar ook aangeeft welke functie het wil aanroepen — werkt met modellen die daarvoor getraind zijn. In Ollama zijn dat er meerdere, waaronder llama3.1, Qwen en Mistral. Voor een agent is dit essentieel: het model bepaalt de actie, jouw code voert hem uit en geeft het resultaat terug. Controleer bij het kiezen van een model of tool calling wordt vermeld op de modelpagina."
  - q: "Heb ik een zware computer nodig?"
    a: "Voor de kleinere modellen niet per se; die draaien op een moderne laptop met voldoende werkgeheugen. Naarmate het model groter wordt, stijgt de eis aan geheugen en bij voorkeur een aparte grafische kaart. Een praktische aanpak: begin met een klein model om je opzet werkend te krijgen, en schaal pas op naar een groter model als je merkt dat de kwaliteit tekortschiet."
---

Wil je AI inzetten op gegevens die je liever niet de deur uit stuurt — klantdossiers, interne documenten, gevoelige aanvragen — dan is een cloud-dienst niet altijd de juiste keuze. Met [Ollama](/tools/ollama) draai je een taalmodel volledig op je eigen computer of server. De data blijft binnen je netwerk, en je betaalt geen tokens per aanvraag. In deze korte gids zie je hoe je er een simpele agent op laat draaien.

## Wat Ollama doet

Ollama is een programma dat open modellen zoals Llama en Phi lokaal draait en ze beschikbaar maakt via een API. Na installatie haal je een model binnen met één commando:

```bash
ollama pull llama3.1
```

Vanaf dat moment draait er op je machine een API op `http://localhost:11434`. Het handige: die API spreekt dezelfde taal als de bekende OpenAI-API. Bestaande code die je voor een cloud-model schreef, wijs je naar Ollama door alleen de basis-URL te veranderen.

## Je bestaande agent-code hergebruiken

Gebruik je Python met de OpenAI-bibliotheek, dan is de aanpassing minimaal:

```python
from openai import OpenAI

client = OpenAI(
    base_url="http://localhost:11434/v1",
    api_key="ollama"  # verplicht veld, maar wordt niet gecontroleerd
)

antwoord = client.chat.completions.create(
    model="llama3.1",
    messages=[{"role": "user", "content": "Vat deze aanvraag samen in één zin."}]
)
print(antwoord.choices[0].message.content)
```

Meer verandert er niet. Wat naar de cloud ging, gaat nu naar je eigen machine.

## Van model naar agent

Een agent doet meer dan tekst teruggeven: hij kiest een actie en voert die uit. Daarvoor heb je een model nodig dat *tool calling* ondersteunt, zoals `llama3.1`. Je beschrijft in je verzoek welke functies het model mag aanroepen — bijvoorbeeld "zoek klantnummer op" of "zet in categorie X". Het model geeft dan gestructureerd terug welke functie het wil gebruiken en met welke waarden. Jouw code voert die functie uit en stuurt het resultaat terug. Zo bouw je stap voor stap een agent die, bijvoorbeeld, een binnenkomende tekstaanvraag leest, classificeert en doorzet — allemaal zonder dat er een byte naar buiten gaat.

## Wat het kost en waar de grens ligt

De winst is duidelijk: privacy en geen gebruikskosten. De prijs betaal je in hardware. Kleine modellen draaien op een goede laptop; grotere vragen om flink werkgeheugen en liefst een aparte grafische kaart. Begin daarom klein, krijg je opzet werkend, en schaal het model pas op als de kwaliteit erom vraagt. Voor gevoelige, afgebakende taken — een aanvraag triëren, een document samenvatten, gegevens ordenen — is een lokaal model vaak ruim voldoende, en houd je de regie volledig in eigen huis. Loop je tegen de grenzen van je hardware aan maar wil je toch niet naar een Amerikaanse aanbieder, dan is [Qwen 3.7-Max via je bestaande Anthropic-SDK](/nieuws/qwen-anthropic-sdk-koppelen) een goedkope tussenstap.
