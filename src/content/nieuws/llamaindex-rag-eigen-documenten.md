---
title: "Bouw met LlamaIndex een RAG-chatbot over je eigen documenten"
heroImageAlt: "Miniatuur diorama-illustratie bij artikel 'Zo bouw je met LlamaIndex een RAG-chatbot over je eigen documenten'"
description: "LlamaIndex verbindt een taalmodel met je eigen bestanden. In vijf stappen bouw je een RAG-chatbot die antwoordt op basis van jouw documenten, inclusief bronvermelding."
publishedAt: 2026-07-27
updatedAt: 2026-07-27
author: "Redactie"
category: "gids"
tags:
  - "llamaindex"
  - "rag"
  - "python"
  - "eigen-documenten"
  - "llm-framework"
  - "chatbot-bouwen"
toolSlug: "llamaindex"
featured: false
draft: false
readingTime: 5
heroScene: "A small chrome robot with a glowing amber emblem feeds paper documents into a wooden filing cabinet that lights up when a question card is inserted"
heroImage: "/images/articles/diorama-llamaindex-rag-eigen-documenten.webp"
keyTakeaways:
  - "LlamaIndex is een open-source framework (Python en TypeScript) dat een taalmodel verbindt met je eigen documenten, databases en API's — de standaard voor RAG."
  - "De kernbibliotheek is gratis onder de MIT-licentie; je hebt wel een ontwikkelaar en Python-kennis nodig om ermee te bouwen."
  - "Een basis-RAG-chatbot draait in vijf stappen: documenten laden, indexeren, een query-engine maken, vragen stellen en bronnen tonen."
  - "Voor lastige PDF's met tabellen gebruik je LlamaParse; dat heeft een gratis tier van 1.000 credits per maand (1.000 credits kosten 1,25 dollar)."
faq:
  - q: "Wat is LlamaIndex en waarvoor gebruik je het?"
    a: "LlamaIndex is een open-source framework voor RAG: Retrieval-Augmented Generation. Het verbindt een taalmodel met je eigen documenten, databases en API's, zodat het antwoorden geeft op basis van jouw informatie in plaats van alleen zijn algemene training. Je gebruikt het om bijvoorbeeld een chatbot te bouwen die vragen beantwoordt over interne handleidingen, contracten of een kennisbank, met verwijzing naar de bron."
  - q: "Is LlamaIndex gratis?"
    a: "De kernbibliotheek van LlamaIndex is gratis en open source onder de MIT-licentie; je kunt er complete RAG-toepassingen mee bouwen zonder LlamaIndex iets te betalen. Wel betaal je zelf voor het taalmodel dat je aanroept (bijvoorbeeld de API van OpenAI of Anthropic). Het betaalde onderdeel LlamaCloud, met parser LlamaParse, heeft een gratis tier van 1.000 credits per maand en daarboven een creditsysteem."
  - q: "Heb ik programmeerkennis nodig voor LlamaIndex?"
    a: "Ja. LlamaIndex is een framework dat je met code aanstuurt, meestal in Python. Je installeert het via pip en schrijft een script. Wil je zonder code werken met een visuele bouwer, dan passen tools als Flowise of n8n beter. LlamaIndex is bedoeld voor ontwikkelaars die controle willen over hoe documenten worden ingelezen, doorzocht en aan het model gevoerd."
  - q: "Wat is het verschil tussen LlamaIndex en LangChain?"
    a: "Beide zijn frameworks om taalmodellen aan data en tools te koppelen. LlamaIndex is van oorsprong sterk in de data-kant: documenten inlezen, parseren en doorzoekbaar maken voor RAG. LangChain legt van oudsher meer nadruk op het orkestreren van agents en ketens van stappen. In de praktijk overlappen ze en kies je op basis van welk deel van het probleem zwaarder weegt: data-ingest of agent-logica."
---

Een taalmodel kent de wereld tot zijn trainingsdatum, maar niet jouw handleidingen, contracten of kennisbank. [LlamaIndex](/ai-tools/llamaindex) lost dat op: het verbindt een model met je eigen documenten, zodat je er vragen over kunt stellen mét bronvermelding. Dat heet RAG. Deze gids laat in vijf stappen zien hoe een basis-chatbot eruitziet. Je hebt Python-kennis nodig.

## Wat RAG doet, kort

Bij RAG (Retrieval-Augmented Generation) zoekt het systeem eerst de relevante stukken uit jouw documenten op en geeft die als context mee aan het taalmodel. Het model antwoordt dan op basis van die stukken, niet uit zijn geheugen. Zo krijg je actuele, controleerbare antwoorden over informatie die het model nooit heeft gezien. De uitleg in gewone taal staat in onze cross-post [Wat is RAG?](https://hetlaatsteainieuws.nl/achtergrond/wat-is-rag-uitleg-2026) op hetlaatsteainieuws.nl.

## Stap 1: installeren en documenten klaarzetten

Installeer de bibliotheek met `pip install llama-index`. Zet je documenten (PDF's, tekstbestanden, Word) in één map, bijvoorbeeld `data/`. Zorg dat je een API-sleutel hebt voor het taalmodel dat je wilt gebruiken; LlamaIndex roept dat model aan voor het genereren van antwoorden en het maken van embeddings.

## Stap 2: laden en indexeren

Met een paar regels lees je de map in en bouw je een doorzoekbare index:

```python
from llama_index.core import VectorStoreIndex, SimpleDirectoryReader

documents = SimpleDirectoryReader("data").load_data()
index = VectorStoreIndex.from_documents(documents)
```

`SimpleDirectoryReader` leest alle bestanden in de map; `VectorStoreIndex` knipt ze in stukken en zet ze om in vectoren zodat je op betekenis kunt zoeken.

## Stap 3: een query-engine maken en vragen stellen

```python
query_engine = index.as_query_engine()
antwoord = query_engine.query("Wat is de opzegtermijn in het contract?")
print(antwoord)
```

De query-engine zoekt de relevante stukken op en laat het model daarop antwoorden. Je krijgt een antwoord in gewone taal, gebaseerd op jouw documenten.

## Stap 4: toon de bronnen

Het verschil tussen een speeltje en een bruikbaar systeem is de bronvermelding. Vraag de bijbehorende passages op zodat je (of je gebruiker) kan controleren waar het antwoord vandaan komt:

```python
for node in antwoord.source_nodes:
    print(node.node.get_content()[:200], node.score)
```

> **⚡ Gevorderden:** De standaard-instellingen zijn prima om te starten, maar productie vraagt afstelling. Experimenteer met chunk-grootte, een reranker en hybride zoeken (vector plus trefwoord) om de kwaliteit van de opgehaalde stukken op te krikken. Daar wint of verliest een RAG-systeem zijn betrouwbaarheid.

## Stap 5: lastige PDF's? Gebruik LlamaParse

Bevat je bron ingewikkelde tabellen, formulieren of scans, dan haalt de standaard-reader er vaak rommel uit. LlamaParse, het parse-onderdeel van LlamaCloud, zet zulke documenten betrouwbaarder om. Het heeft een gratis tier van 1.000 credits per maand; daarboven kosten 1.000 credits 1,25 dollar, met parseerkosten per pagina afhankelijk van de complexiteit ([Bron: LlamaIndex pricing](https://noizz.io/insights/llamaindex-pricing-guide)).

Wie liever ziet hoe zo'n systeem er in de praktijk uitziet, kan onze stukken [RAG op je eigen bedrijfsdata](/nieuws/rag-chatgpt-eigen-bedrijfsdata) en [een hybride RAG-zoeksysteem met Claude](/nieuws/claude-hybride-rag-zoeksysteem) erbij pakken.

## Checklist: ben je klaar?

- [ ] `llama-index` geïnstalleerd via pip
- [ ] Documenten in één map gezet (`data/`)
- [ ] API-sleutel voor je taalmodel ingesteld
- [ ] Index gebouwd met `VectorStoreIndex`
- [ ] Query-engine getest met een echte vraag
- [ ] Bronvermelding (`source_nodes`) zichtbaar gemaakt
- [ ] Bij lastige PDF's: LlamaParse geprobeerd

## Bronnen

- [LlamaIndex — officiële site](https://www.llamaindex.ai) (framework en documentatie)
- [LlamaIndex Pricing Guide 2026](https://noizz.io/insights/llamaindex-pricing-guide) (LlamaParse-credits en gratis tier)
- [Wat is RAG? — hetlaatsteainieuws.nl](https://hetlaatsteainieuws.nl/achtergrond/wat-is-rag-uitleg-2026) (RAG in gewone taal)
