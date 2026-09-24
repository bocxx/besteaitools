---
title: "Llama lokaal draaien met LM Studio: welke versie past bij jouw pc"
description: "Llama downloaden en offline chatten kan in LM Studio zonder command line. Zo kies je de juiste modelmaat: Llama 4 vraagt heel andere hardware dan Llama 3.1."
publishedAt: 2026-09-23
updatedAt: 2026-09-23
author: "Redactie"
category: "gids"
tags:
  - "llama"
  - "lm-studio"
  - "lokaal-draaien"
  - "open-weight"
  - "privacy"
  - "gguf"
toolSlug: "llama"
featured: false
draft: false
readingTime: 3
heroImage: "/images/articles/diorama-llama-lokaal-draaien-lm-studio.webp"
heroImageAlt: "Miniatuur diorama-illustratie bij artikel 'Llama lokaal draaien met LM Studio: welke versie past bij jouw pc'"
heroScene: "A small toy scale balancing a tiny model box against a stack of memory chips on a wooden workbench"
keyTakeaways:
  - "LM Studio is een gratis app met grafische interface waarmee je Llama offline draait, zonder terminal of command line."
  - "Llama 3.1 8B (Q4, circa 4,92 GB) draait op de meeste laptops met 16 GB RAM; Llama 4 Scout (Q4, 67,5 GB) heeft serverachtige hardware nodig."
  - "Je downloadt en beheert modellen via het Discover-tabblad; laden en chatten gebeurt in het Chat-tabblad."
  - "Alles draait lokaal: je gesprekken verlaten je eigen apparaat niet, in tegenstelling tot een cloud-chatbot."
faq:
  - q: "Is LM Studio gratis?"
    a: "Ja. LM Studio zelf is gratis te downloaden voor Mac, Windows en Linux. De modellen die je erin draait zijn dat meestal ook, omdat Llama onder Meta's eigen licentie gratis te downloaden is. Je betaalt geen abonnement — de enige kosten zijn de opslagruimte en rekenkracht van je eigen apparaat."
  - q: "Welke Llama-versie moet ik kiezen?"
    a: "Voor een gewone laptop of desktop is Llama 3.1 8B de praktische keuze: rond de 4,92 GB in de Q4_K_M-kwantisatie, en te draaien met 16 GB RAM. Llama 4 Scout is krachtiger maar ook fors groter — al gauw 67,5 GB voor dezelfde kwantisatie — en vraagt daarmee een Mac met veel unified memory of een workstation met een zware GPU."
  - q: "Heb ik een grafische kaart nodig?"
    a: "Niet per se. LM Studio kan een model volledig op je processor en RAM draaien, alleen merkbaar trager dan met een GPU. Heb je een Mac met Apple Silicon, dan profiteer je automatisch van de gedeelde (unified) geheugenarchitectuur, wat lokale modellen daar relatief soepel laat lopen."
  - q: "Blijven mijn gesprekken privé?"
    a: "Ja, dat is het hele punt van lokaal draaien: de prompts en antwoorden verlaten je apparaat niet, want er wordt geen verbinding gemaakt met een externe server zodra het model eenmaal gedownload is. Voor gevoelige bedrijfsdata is dat een reëel voordeel ten opzichte van een cloud-chatbot."
  - q: "Wat is het verschil met Ollama?"
    a: "Functioneel vergelijkbaar — beide draaien open modellen lokaal — maar Ollama werkt in de basis via de command line, terwijl LM Studio een volledige grafische interface biedt: zoeken, downloaden en chatten kan allemaal met de muis. Voor wie net begint is dat drempel lager."
sources:
  - label: "LM Studio — documentatie (Download en Discover-model)"
    url: "https://lmstudio.ai/docs/app/basics"
  - label: "Hugging Face — lmstudio-community/Llama-4-Scout-17B-16E-Instruct-GGUF"
    url: "https://huggingface.co/lmstudio-community/Llama-4-Scout-17B-16E-Instruct-GGUF"
  - label: "Hugging Face — lmstudio-community/Meta-Llama-3.1-8B-Instruct-GGUF"
    url: "https://huggingface.co/lmstudio-community/Meta-Llama-3.1-8B-Instruct-GGUF"
---

Llama downloaden en zelf laten draaien klinkt als iets voor developers met een terminal open. Dat hoeft niet. [LM Studio](https://lmstudio.ai) is een gratis app met een gewone grafische interface: zoeken, downloaden, chatten, allemaal met de muis. Het lastigste onderdeel is niet de installatie, maar de vraag welke Llama-versie eigenlijk op jouw pc past — en dat verschil is groter dan je zou denken.

## LM Studio installeren

Ga naar [lmstudio.ai/download](https://lmstudio.ai/download) en haal de installer voor je platform: Mac (Apple Silicon), Windows (x64 of ARM) of Linux ([Bron: LM Studio-documentatie](https://lmstudio.ai/docs/app/basics)). Installeren gaat zoals bij elke andere desktop-app, geen aparte Python-omgeving of dependency-gedoe nodig.

Open je LM Studio voor het eerst, dan land je in een rustige interface met een paar tabbladen aan de zijkant. Daarvan gebruik je er twee: **Discover** om modellen te zoeken en te downloaden, en **Chat** om ze te gebruiken.

> **💡 Beginner-tip:** ken je de term "quantisatie" nog niet? Dat is een manier om een model kleiner te maken door de precisie van de getallen erin te verlagen. Q4 is een goede middenweg tussen bestandsgrootte en kwaliteit — daar kies je bijna altijd voor, tenzij je specifiek reden hebt voor iets anders.

## Welke Llama past op jouw hardware

Dit is de stap waar het vaakst misgaat, omdat "Llama" niet één ding is. In het Discover-tabblad typ je `llama`, en dan verschijnen er meerdere generaties naast elkaar. Het verschil in grootte is enorm.

Llama 3.1 8B is de praktische keuze voor een gewone laptop of desktop: in de Q4_K_M-kwantisatie is dat bestand ongeveer 4,92 GB, en dat draait comfortabel met 16 GB werkgeheugen ([Bron: Hugging Face](https://huggingface.co/lmstudio-community/Meta-Llama-3.1-8B-Instruct-GGUF)). Llama 4 Scout is een andere orde van grootte: dezelfde Q4-kwantisatie weegt daar 67,5 GB, tegenover 57,8 GB in 3-bit en zelfs 113 GB in 8-bit ([Bron: Hugging Face](https://huggingface.co/lmstudio-community/Llama-4-Scout-17B-16E-Instruct-GGUF)). Dat past niet op een gemiddelde laptop — daar heb je een Mac met veel unified memory of een workstation met een forse GPU voor nodig.

> **⚡ Gevorderden:** Llama 4 Scout is een mixture-of-experts-model met 17 miljard actieve parameters op 109 miljard totaal. Dat totaal moet wel ergens in geheugen staan, ook al rekent maar een deel per token mee — vandaar dat het bestand zoveel groter is dan het "actieve" deel doet vermoeden.

Twijfel je, begin dan altijd met de kleinste optie die je vindt. Een 5 GB-download die werkt is nuttiger dan een dag wachten op een download van 67 GB die je Mac vervolgens niet aan het draaien krijgt.

## Downloaden, laden en je eerste gesprek

Klik op het model van je keuze en LM Studio start de download. Is die klaar, dan ga je naar **Chat**, open je de model-loader bovenaan en selecteer je het zojuist gedownloade model. Laden betekent dat LM Studio de modelgewichten in je werkgeheugen zet ([Bron: LM Studio-documentatie](https://lmstudio.ai/docs/app/basics)) — dat duurt bij een groter model merkbaar langer dan bij een klein model.

Zodra het model geladen is, typ je gewoon een vraag in het chatvenster, precies zoals je dat bij ChatGPT of Claude zou doen. Het verschil merk je vooral aan de snelheid: op een MacBook zonder dedicated GPU reageert een 8B-model doorgaans binnen een paar seconden, terwijl een zwaarder model merkbaar meer tijd nodig heeft — en dat is precies waarom de modelkeuze in de vorige stap ertoe deed.

Wil je eerst begrijpen waarom lokaal draaien voor sommige mensen zo belangrijk is, dan is [de uitleg over lokale LLM's op hetlaatsteainieuws.nl](https://www.hetlaatsteainieuws.nl/nieuws/wat-is-ollama-lokale-llm-uitleg-2026) een goed startpunt.

Het andere verschil merk je niet, en dat is het punt: er gaat niets naar een server. Alles wat je hier typt en terugkrijgt, blijft op je eigen apparaat. Voor een snelle vraag maakt dat weinig uit, maar zodra je bedrijfsgegevens of klantinformatie in een prompt zou zetten, is dat een reëel verschil met een cloud-chatbot.
