---
title: "Wat is LangChain? Het framework om AI-apps te bouwen, uitgelegd"
heroImageAlt: "Miniatuur diorama-illustratie bij artikel 'Wat is LangChain? Het framework om AI-apps te bouwen, uitgelegd'"
description: "LangChain koppelt taalmodellen aan je eigen data, tools en geheugen. Sinds versie 1.0 draait het op LangGraph. Zo begrijp je waar het voor dient."
publishedAt: 2026-07-31
updatedAt: 2026-07-31
author: "Redactie"
category: "gids"
tags:
  - "langchain"
  - "langgraph"
  - "ai-agents"
  - "llm"
  - "framework"
  - "developer"
toolSlug: "langchain"
featured: false
draft: false
readingTime: 4
heroImage: "/images/articles/diorama-wat-is-langchain.webp"
keyTakeaways:
  - "LangChain is een programmeerframework om apps te bouwen bovenop taalmodellen: het koppelt een model aan je eigen data, externe tools en geheugen."
  - "Sinds versie 1.0 (oktober 2025) draaien LangChain-agents op LangGraph, dat de eerdere kritiek op de 'black box' grotendeels wegneemt."
  - "Het framework bestaat voor zowel Python als JavaScript en is een van de meest gebruikte manieren om AI-toepassingen te bouwen."
  - "LangChain is developer-gereedschap: je hebt programmeerkennis nodig. Voor kant-en-klaar gebruik zonder code is het niet bedoeld."
faq:
  - q: "Waar gebruik je LangChain voor?"
    a: "Voor het bouwen van applicaties die een taalmodel slim inzetten. Denk aan een chatbot die jouw bedrijfsdocumenten doorzoekt voordat hij antwoordt, een agent die zelfstandig meerdere stappen uitvoert, of een assistent die onthoudt wat je eerder vroeg. LangChain levert de bouwstenen om een model te koppelen aan externe data, tools en geheugen, zodat je die logica niet telkens zelf hoeft te schrijven."
  - q: "Wat veranderde er in LangChain versie 1.0?"
    a: "Versie 1.0 verscheen op 22 oktober 2025 en is de eerste stabiele release, voor Python en JavaScript tegelijk. De grootste wijziging: LangChain-agents draaien nu op LangGraph als onderliggende motor. Daarnaast kwam er een vereenvoudigde kern en een nieuwe create_agent-functie. De verandering pakt de oude kritiek aan dat het framework een ondoorzichtige 'black box' was — je kunt nu op het hoge niveau blijven of afdalen naar LangGraph voor volledige controle."
  - q: "Heb ik programmeerkennis nodig voor LangChain?"
    a: "Ja. LangChain is een framework voor ontwikkelaars, geen kant-en-klare app. Je werkt ermee in Python of JavaScript en verbindt zelf de onderdelen. Zoek je iets waarmee je zonder code AI-workflows in elkaar zet, dan passen tools als n8n of Make beter. LangChain is juist bedoeld voor wie de logica onder de motorkap zelf wil bepalen."
---

Zodra je meer wilt dan een los antwoord uit een chatbot — een AI die jouw documenten doorzoekt, meerdere stappen zelfstandig uitvoert of onthoudt wat je eerder vroeg — kom je bij een framework als LangChain uit. Het is een van de meest gebruikte manieren om apps te bouwen bovenop taalmodellen. Deze gids legt uit waar het voor dient en wat er sinds versie 1.0 veranderde.

## Waar LangChain het verschil maakt

Een taalmodel op zichzelf is een tekstmachine: je stuurt woorden erin, er komen woorden uit. Wil je dat model laten samenwerken met je eigen data, met externe tools of met een geheugen van eerdere gesprekken, dan moet je daar omheen bouwen. Dat is precies wat LangChain doet. Het levert de bouwstenen om een model te koppelen aan bijvoorbeeld een documentendatabase, een zoekfunctie of een rekentool — en om die stappen aan elkaar te rijgen.

Het bekendste voorbeeld is een chatbot die eerst jouw handleidingen of contracten doorzoekt en pas daarna antwoordt. Dat patroon — een model dat externe kennis raadpleegt voordat het reageert — bouw je met LangChain zonder alle koppelingen zelf uit te programmeren.

> **💡 Beginner-tip:** LangChain is geen app die je opent, maar gereedschap dat je in je eigen code gebruikt. Je hebt dus programmeerkennis nodig — Python of JavaScript. Wil je AI-workflows zónder code bouwen, kijk dan naar tools als n8n of Make.

## Wat versie 1.0 veranderde

Lang gold LangChain als handig maar ondoorzichtig: het nam veel beslissingen voor je, en als er iets misging was lastig te zien wát. Die kritiek pakte het team aan met versie 1.0, uitgebracht op 22 oktober 2025 voor Python en JavaScript tegelijk. De belangrijkste verandering: LangChain-agents draaien nu op LangGraph, een onderliggende motor die je stap voor stap kunt volgen en sturen.

Praktisch betekent dat: je kunt op het hoge, eenvoudige niveau van LangChain blijven werken, of afdalen naar LangGraph als je volledige controle over de stappen wilt. Er kwam ook een vereenvoudigde kern en een nieuwe `create_agent`-functie om sneller een werkende agent op te zetten.

> **Let op — broncheck:** je vindt online nog volop tutorials die "LangChain 0.3" als actueel presenteren. Dat klopt niet meer; 1.0 is sinds eind 2025 de stabiele versie. Controleer bij een tutorial altijd tegen welke versie die geschreven is, want de opzet van agents is met 1.0 flink veranderd.

## Voor wie is het — en voor wie niet

LangChain is developer-gereedschap. Bouw je zelf AI-toepassingen in code en wil je niet elke koppeling opnieuw uitvinden, dan bespaart het je veel werk en is de community groot. Zoek je daarentegen een manier om zonder programmeren AI-taken te automatiseren, dan is dit niet het juiste startpunt — dan passen no-code-tools beter.

Wil je eerst begrijpen wélke modellen je met een framework als LangChain kunt aansturen en waarom open modellen daarbij zo'n rol spelen, lees dan onze duiding over de [open-weights-discussie](https://hetlaatsteainieuws.nl/nieuws/open-weights-brief-tech-industrie-europa) op Het Laatste AI Nieuws.

Kort samengevat: LangChain is de lijm tussen een taalmodel en de rest van je applicatie. Sinds 1.0 is die lijm een stuk transparanter geworden — en dat maakt het framework toegankelijker voor wie serieus AI-apps wil bouwen.
