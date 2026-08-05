---
title: "CrewAI voor beginners: bouw je eerste multi-agent-crew in vijf stappen"
heroImageAlt: "Miniatuur diorama-illustratie bij artikel 'CrewAI voor beginners: bouw je eerste multi-agent-crew in vijf stappen'"
heroImage: "/images/articles/diorama-crewai-eerste-crew-bouwen.webp"
description: "CrewAI laat meerdere AI-agents samenwerken aan één taak. Zo installeer je het en draai je je eerste onderzoek-crew, zonder framework-ervaring vooraf."
publishedAt: 2026-08-03
updatedAt: 2026-08-03
author: "Redactie"
category: "gids"
tags:
  - "crewai"
  - "ai-agents"
  - "multi-agent"
  - "python"
  - "agent-orchestratie"
  - "automatisering"
toolSlug: "crewai"
featured: false
draft: false
readingTime: 4
keyTakeaways:
  - "CrewAI is een Python-framework waarin meerdere AI-agents, elk met een eigen rol en doel, samen een taak afmaken."
  - "Je installeert het met één pip-commando en genereert een kant-en-klare projectstructuur met `crewai create crew`."
  - "Elke agent krijgt een rol, een doel en een taak; de crew draait ze in volgorde en geeft de output van de een door aan de ander."
  - "Voor de standaardopzet heb je een LLM-sleutel nodig (bijvoorbeeld een OpenAI-key) en Python 3.10 tot 3.12."
faq:
  - q: "Wat is CrewAI precies?"
    a: "CrewAI is een open-source Python-framework voor multi-agent-systemen. Je definieert meerdere agents die elk een rol, een doel en een achtergrond hebben, en laat ze samenwerken aan een grotere taak. Het is geschreven als een zelfstandig framework, niet als een laag bovenop LangChain, en het is uitgegroeid tot een van de populairste manieren om agent-teams te bouwen in Python."
  - q: "Heb ik programmeerervaring nodig voor CrewAI?"
    a: "Enige Python-basis helpt. Je werkt in code en YAML-bestanden, en je moet een virtuele omgeving en een API-sleutel kunnen instellen. De projectgenerator (`crewai create crew`) neemt veel structuurwerk uit handen, maar dit is een developer-tool: wie nog nooit een terminal heeft geopend, begint beter eerst met een kant-en-klare agent-app."
  - q: "Wat kost CrewAI?"
    a: "Het framework zelf is gratis en open source. De kosten zitten in het taalmodel dat je eronder hangt: draai je op een betaalde API zoals OpenAI, dan betaal je per verwerkt token. Wil je gratis draaien, dan kun je een lokaal model via Ollama koppelen. Daarnaast biedt CrewAI een aparte betaalde cloud-omgeving voor teams die crews in productie willen zetten."
  - q: "Wat is het verschil tussen CrewAI en één grote prompt in ChatGPT?"
    a: "Bij één grote prompt doet één model alles tegelijk, en het resultaat wordt vaak rommelig zodra de taak meerdere stappen heeft. CrewAI splitst het werk op in rollen: een onderzoeker verzamelt, een schrijver vat samen, een controleur checkt. Elke agent heeft een afgebakende taak, en de output is daardoor gestructureerder en beter herhaalbaar."
---

Een grote taak in één prompt proppen levert bijna altijd een rommelig antwoord op: half onderzoek, half mening, geen structuur. CrewAI pakt dat anders aan. Je verdeelt het werk over meerdere AI-agents die elk één rol spelen en elkaars output doorgeven. Hieronder installeer je het framework en draai je binnen een kwartier je eerste crew, met wat je per stap op je scherm zou moeten zien.

## Wat is een crew, en voor wie is dit?

Een "crew" in CrewAI is een team van agents dat samen aan één opdracht werkt. Elke agent krijgt drie dingen mee: een rol ("senior onderzoeker"), een doel ("verzamel de laatste feiten over X") en een korte achtergrond die de toon stuurt. Daarnaast definieer je taken en koppel je die aan agents. De crew draait de taken in volgorde en geeft tussenresultaten door.

Dit is een tool voor wie in Python werkt en workflows wil automatiseren die uit meerdere stappen bestaan: een onderzoek-samenvatting, een content-pijplijn, een terugkerend rapport. Je hebt Python 3.10 tot en met 3.12 nodig en een sleutel voor een taalmodel.

> **💡 Beginner-tip:** Zie een agent niet als een slim wezen, maar als één duidelijk afgebakende opdracht aan het model. Hoe scherper je de rol en het doel beschrijft, hoe voorspelbaarder de output.

## In vijf stappen naar je eerste crew

1. **Installeer het framework.** Open een terminal in een schone map en draai `pip install crewai crewai-tools`. Dat haalt de kern binnen plus de officiële toolbibliotheek. Tip: doe dit in een virtuele omgeving (`python -m venv venv`) zodat je systeem schoon blijft.

2. **Genereer een project.** Draai `crewai create crew mijn_eerste_crew`. Je krijgt een nette structuur met aparte YAML-bestanden voor je agents en taken, een centraal crew-bestand en een ingevulde `pyproject.toml`. Je ziet een nieuwe map verschijnen met die bestanden erin — dat is je startpunt.

3. **Zet je API-sleutel klaar.** Open het `.env`-bestand in de projectmap en vul de sleutel van je taalmodel in, bijvoorbeeld `OPENAI_API_KEY=...`. Zonder sleutel weigert de crew te starten. Wil je gratis draaien, koppel dan een lokaal model via Ollama in plaats van een betaalde API.

4. **Beschrijf je agents en taken.** Open `agents.yaml` en geef elke agent een rol, een doel en een achtergrond in gewone taal. In `tasks.yaml` beschrijf je wat er precies moet gebeuren en welke agent dat doet. Houd het klein: begin met twee agents (een onderzoeker en een schrijver) en één taak elk.

5. **Draai de crew.** Terug in de terminal draai je `crewai run`. Je ziet in de output live voorbijkomen welke agent aan de beurt is en wat die produceert. Aan het eind krijg je het samengevoegde resultaat — bij een onderzoek-crew is dat bijvoorbeeld een kant-en-klare samenvatting.

> **⚡ Gevorderden:** De volgorde waarin taken draaien bepaal je met het proces-type. `sequential` is het makkelijkst te volgen; `hierarchical` laat een manager-agent het werk verdelen, maar dat kost meer tokens en is lastiger te debuggen. Begin sequentieel.

## Werkt het niet? Kijk hier eerst

Negen van de tien startproblemen komen door twee dingen. Ten eerste de Python-versie: CrewAI draait op 3.10 tot en met 3.12, niet op 3.13. Draai `python --version` en maak zo nodig een nieuwe omgeving met een passende versie. Ten tweede de API-sleutel: een lege of verlopen sleutel geeft een authenticatiefout bij de eerste stap, niet bij de installatie. Controleer dat de sleutel in `.env` staat en dat je terminal die omgeving heeft geladen.

## De kostenkant: gratis framework, betaald model

Het framework zelf kost niets, maar elke agent-stap is een aanroep naar een taalmodel. Draai je een crew met vier agents op een betaalde API, dan tikt dat per run aan — zeker als je tijdens het bouwen vaak test. Houd je rekening in de gaten of schakel voor het experimenteren over op een lokaal model via Ollama. Voor teams die crews echt in productie willen draaien is er een aparte betaalde cloud-omgeving, maar die heb je om te leren niet nodig.

Wil je eerst begrijpen wat AI-agents überhaupt zijn voordat je gaat bouwen, lees dan de uitleg op onze zustersite: [AI-agents in 2026: wat zijn ze en wat kun je ermee](https://hetlaatsteainieuws.nl/achtergrond/ai-agents-2026-wat-zijn-ze).

## Checklist: ben je klaar om te draaien?

- [ ] Python 3.10, 3.11 of 3.12 actief (`python --version`)
- [ ] Virtuele omgeving aangemaakt en geactiveerd
- [ ] `crewai` en `crewai-tools` geïnstalleerd
- [ ] Project gegenereerd met `crewai create crew`
- [ ] API-sleutel ingevuld in `.env` (of lokaal model gekoppeld)
- [ ] Minstens één agent en één taak beschreven in de YAML-bestanden
- [ ] `crewai run` geeft output zonder authenticatiefout

## Bronnen

- [CrewAI — Build your First Crew (officiële blog)](https://blog.crewai.com/getting-started-with-crewai-build-your-first-crew/) — installatie- en projectstappen van de makers zelf
- [DigitalOcean — CrewAI: A Practical Guide to Role-Based Agent Orchestration](https://www.digitalocean.com/community/tutorials/crewai-crash-course-role-based-agent-orchestration) — uitleg van de rol/doel/taak-structuur
