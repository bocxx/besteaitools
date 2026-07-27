---
title: "Bouw een hybride RAG-zoeksysteem met Claude in 5 stappen"
description: "Combineer betekenis-zoeken en trefwoord-zoeken tot één document-Q&A-app met Claude Sonnet 4.6. Een praktische walkthrough in vijf overzichtelijke stappen."
publishedAt: 2026-06-22
updatedAt: 2026-06-22
author: "Redactie"
category: "gids"
tags:
  - "claude"
  - "rag"
  - "faiss"
  - "bm25"
  - "langgraph"
  - "document-qa"
toolSlug: "claude"
featured: false
draft: false
readingTime: 5
heroImage: "/images/articles/diorama-claude-hybride-rag-zoeksysteem.webp"
heroImageAlt: "Miniatuur diorama-illustratie bij artikel 'Bouw een hybride RAG-zoeksysteem met Claude in 5 stappen'"
heroScene: "Tiny index cards travelling on two parallel conveyor belts merging into a single brass funnel above an answer machine"
keyTakeaways:
  - "Hybride RAG combineert semantisch zoeken (FAISS) met trefwoord-zoeken (BM25), zodat je zowel betekenis als exacte termen vangt."
  - "LangGraph regelt de flow: ophalen, samenvoegen en doorsturen naar Claude voor het uiteindelijke antwoord."
  - "Claude Sonnet 4.6 schrijft het antwoord op basis van de gevonden fragmenten; het API-model heet claude-sonnet-4-6."
  - "Begin met een kleine documentenset en breid pas uit als de antwoorden kloppen — zo houd je je kosten en foutmarge laag."
faq:
  - q: "Wat is hybride RAG en waarom is het beter dan gewoon zoeken?"
    a: "RAG (Retrieval-Augmented Generation) laat een taalmodel antwoorden op basis van jouw eigen documenten. Hybride RAG combineert twee zoekmethodes: semantisch zoeken vangt de bedoeling van een vraag, ook bij andere bewoordingen, terwijl trefwoord-zoeken (BM25) exacte termen, codes en namen oppikt. Samen vinden ze meer relevante fragmenten dan elk apart, wat het uiteindelijke antwoord nauwkeuriger maakt."
  - q: "Welk Claude-model gebruik je voor een document-Q&A-app?"
    a: "Voor de antwoord-stap is Claude Sonnet 4.6 een goede keuze: sterk in redeneren over lange context en relatief betaalbaar. Het API-model heet claude-sonnet-4-6 en kost ongeveer 3 dollar per miljoen invoer-tokens en 15 dollar per miljoen uitvoer-tokens. Voor zwaardere taken kun je later naar een groter model schakelen."
  - q: "Heb je LangGraph nodig of kan het ook zonder?"
    a: "Het kan ook zonder, maar LangGraph maakt de flow overzichtelijk: je definieert losse stappen (ophalen, samenvoegen, antwoorden) als knopen in een graaf. Dat is prettig zodra je logica complexer wordt, bijvoorbeeld als je wilt herproberen of bronnen wilt filteren. Voor een eerste prototype mag je het ook houden bij een simpel script."
---

Wil je een AI die antwoordt op basis van jóuw documenten, en niet op basis van wat hij toevallig geleerd heeft? Dan bouw je een RAG-app — al kun je [de simpelste variant tegenwoordig zonder code opzetten in ChatGPT](/nieuws/rag-chatgpt-eigen-bedrijfsdata) of het juist in code bouwen [met LlamaIndex](/nieuws/llamaindex-rag-eigen-documenten). In deze gids zetten we een hybride variant op: betekenis-zoeken én trefwoord-zoeken gecombineerd, met Claude die het antwoord schrijft. Vijf stappen, één werkende opzet.

## Stap 1 — Knip je documenten in stukken

Een taalmodel werkt niet met hele PDF's, maar met fragmenten — dat volgt direct uit hoe transformers context verwerken (zie onze uitleg over [CNN's, RNN's en transformers](/nieuws/cnn-rnn-transformers-huggingface-uitleg)). Splits je documenten in stukken van bijvoorbeeld 300 tot 500 woorden, met een kleine overlap zodat een zin niet halverwege wordt afgekapt. Bewaar bij elk stuk de bron (bestandsnaam, paginanummer), zodat je later kunt laten zien waar een antwoord vandaan komt.

## Stap 2 — Zet twee zoekmachines naast elkaar

Hier zit de "hybride" in. Je bouwt twee indexen over dezelfde fragmenten:

- **FAISS** voor semantisch zoeken. Je zet elk fragment om in een vector (een embedding) en FAISS vindt razendsnel de fragmenten die qua betekenis het dichtst bij de vraag liggen. Handig als iemand "wat kost het abonnement?" vraagt terwijl je document spreekt over "tarieven".
- **BM25** voor trefwoord-zoeken. Dit is de klassieke methode die exacte woorden, productcodes en eigennamen oppikt — precies waar semantisch zoeken weleens langsheen schiet.

> **⚡ Gevorderden:** Combineer de twee ranglijsten met een eenvoudige score-fusie zoals Reciprocal Rank Fusion. Je hoeft de scores van FAISS en BM25 dan niet op dezelfde schaal te krijgen; je telt alleen de posities op. Dat voorkomt dat één zoekmethode de uitkomst domineert.

## Stap 3 — Voeg de resultaten samen

Beide zoekmachines leveren een lijstje fragmenten. Je voegt ze samen, haalt dubbele eruit en houdt de beste vijf tot acht over. Dit is de context die straks naar Claude gaat. Hou het beknopt: meer fragmenten betekent meer tokens, hogere kosten en niet automatisch een beter antwoord.

## Stap 4 — Laat LangGraph de flow regelen

Met LangGraph giet je de stappen in een overzichtelijke graaf: een knoop die ophaalt, een knoop die samenvoegt en een knoop die het antwoord genereert. Het voordeel is dat je losse stappen kunt aanpassen of opnieuw kunt laten draaien zonder je hele script om te gooien. Begin simpel — drie knopen achter elkaar — en breid pas uit als je het nodig hebt.

## Stap 5 — Laat Claude het antwoord schrijven

De laatste stap: je stuurt de vraag plus de gevonden fragmenten naar Claude met een korte instructie ("beantwoord alleen op basis van de meegeleverde fragmenten, noem de bron, en zeg het als het antwoord er niet in staat"). Gebruik hiervoor Claude Sonnet 4.6 — het API-model heet `claude-sonnet-4-6` en kost ongeveer $3 per miljoen invoer-tokens en $15 per miljoen uitvoer-tokens ([Bron: Anthropic](https://www.anthropic.com/news/claude-sonnet-4-6)). Door de instructie "alleen op basis van de fragmenten" beperk je verzinsels en blijven de antwoorden controleerbaar.

Wil je daarna dieper de privacy- en regelgevingskant in? Lees op hetlaatsteainieuws.nl onze duiding over [klantgegevens en AVG bij AI-tools](https://hetlaatsteainieuws.nl/ai-nieuws/ai-kloon-van-jezelf-voor-klanten).

## Checklist: ben je klaar?

- [ ] Documenten geknipt in fragmenten van 300–500 woorden, mét bronvermelding per stuk
- [ ] FAISS-index gebouwd over de embeddings
- [ ] BM25-index gebouwd over dezelfde fragmenten
- [ ] Resultaten samengevoegd, ontdubbeld en beperkt tot de beste 5–8
- [ ] LangGraph-flow met aparte knopen voor ophalen, samenvoegen en antwoorden
- [ ] Claude (`claude-sonnet-4-6`) krijgt de instructie "alleen op basis van de fragmenten"
- [ ] Getest op een kleine set vragen waarvan je het juiste antwoord kent

## Bronnen

- [Introducing Sonnet 4.6 — Anthropic](https://www.anthropic.com/news/claude-sonnet-4-6)
- [Claude Sonnet 4.6 — Amazon Bedrock model card](https://docs.aws.amazon.com/bedrock/latest/userguide/model-card-anthropic-claude-sonnet-4-6.html)
- [Build a Hybrid RAG System with FAISS, BM25, LangGraph and Claude — Towards AI (aanleiding)](https://pub.towardsai.net/build-a-hybrid-rag-system-with-faiss-bm25-langgraph-and-claude-sonnet-model-39ba3c6755bc)
