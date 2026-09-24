---
title: "VoiceStudio installeren: gratis, lokale ElevenLabs-vervanger"
description: "VoiceStudio kloont stemmen, dubt video's en transcribeert offline op je eigen computer, gratis en open source. Zo installeer en gebruik je het."
publishedAt: 2026-09-23
updatedAt: 2026-09-23
author: "Redactie"
category: "lancering"
tags:
  - "voicestudio"
  - "voice-cloning"
  - "text-to-speech"
  - "lokale-ai"
  - "open-source"
  - "video-dubbing"
toolSlug: "voicestudio"
featured: false
draft: false
readingTime: 5
heroScene: "A wooden recording booth in miniature with a small microphone, sound-dampening foam panels, and a single cable running to a home computer, warm indoor light"
keyTakeaways:
  - "VoiceStudio is een gratis, open-source (AGPL-3.0) alternatief voor ElevenLabs dat volledig lokaal draait, zonder cloud-abonnement."
  - "Het combineert voice cloning, voice design, video-dubbing, dictatie en transcriptie in 646 talen via 16 TTS- en 11 ASR-engines."
  - "Op GitHub staat het inmiddels op bijna 29.500 sterren, met actieve doorontwikkeling (2.540+ commits)."
  - "De tool is nog niet opgenomen in de DBAT-toolgids; deze draft is geschreven vooruitlopend op die toevoeging."
faq:
  - q: "Wat is VoiceStudio precies?"
    a: "Een open-source desktop-applicatie (Tauri-gebaseerd) waarmee je stemmen kloont, stemmen ontwerpt vanaf parameters, video's dubt naar andere talen, dicteert en transcribeert — allemaal lokaal op je eigen computer, zonder dat audio naar een cloud-dienst gaat."
  - q: "Is VoiceStudio echt gratis?"
    a: "De software zelf is gratis en open source onder de AGPL-3.0-licentie. Gedownloade modellen behouden hun eigen licentie (vaak CC-BY-NC of Apache 2.0), dus check bij commercieel gebruik welk model je precies inzet. Je betaalt geen abonnement zoals bij ElevenLabs."
  - q: "Welke hardware heb ik nodig?"
    a: "Minimaal 8GB RAM, 10GB schijfruimte en Windows 10/11 x64, macOS 13.3+ (Apple Silicon) of Linux x86_64. Voor prettig werken raadt de ontwikkelaar 16GB+ RAM, 20GB+ SSD-ruimte en een GPU (NVIDIA CUDA, MPS of ROCm) aan, al werkt het ook op alleen een CPU."
  - q: "Hoe verhoudt VoiceStudio zich tot ElevenLabs?"
    a: "ElevenLabs is de cloud-marktleider met de beste stemkwaliteit en een breed platform (TTS, dubbing, agents), maar werkt op abonnementsbasis en stuurt je audio naar hun servers. VoiceStudio is het lokale, gratis alternatief: minder gepolijst qua stemkwaliteit per engine, maar volledig offline en zonder terugkerende kosten."
  - q: "Kan ik VoiceStudio gebruiken voor video-dubbing?"
    a: "Ja. De workflow transcribeert het origineel, vertaalt de tekst, behoudt de sprekersidentiteit, synthetiseert de nieuwe audio en exporteert het resultaat — in één pijplijn, lokaal."
sources:
  - label: "GitHub — debpalash/VoiceStudio"
    url: "https://github.com/debpalash/VoiceStudio"
  - label: "GitHub — debpalash/VoiceStudio releases"
    url: "https://github.com/debpalash/VoiceStudio/releases"
---

ElevenLabs is de naam die bij AI-stemmen als eerste valt, maar het is een cloud-abonnement met een prijs die oploopt zodra je serieus gaat produceren. VoiceStudio, een project op GitHub dat zichzelf expliciet als "de open-source, volledig lokale ElevenLabs-alternatief" presenteert, doet veel van hetzelfde werk gratis en offline op je eigen computer ([Bron: GitHub](https://github.com/debpalash/VoiceStudio)).

**Let op vooraf:** VoiceStudio staat nog niet in de DBAT-toolgids. Deze tutorial is geschreven vooruitlopend op die toevoeging aan de taxonomie.

## Wat VoiceStudio kan

Onder de motorkap zit een keuze uit 16 TTS-engines (waaronder het standaard OmniVoice-model met 600+ talen, plus CosyVoice 3 en GPT-SoVITS) en 11 ASR-engines voor spraakherkenning (waaronder WhisperX als standaard) ([Bron: GitHub](https://github.com/debpalash/VoiceStudio)). Samen dekken die een cataloog van 646 talen, al verschilt de kwaliteit per gekozen engine.

Concreet kun je met VoiceStudio:

- **Stemmen klonen** — zero-shot vanaf een audiofragment van 3 tot 15 seconden.
- **Stemmen ontwerpen** — vanaf parameters als leeftijd, accent, toonhoogte en stijl, zonder bronopname.
- **Video's dubben** — transcriberen, vertalen, sprekersidentiteit behouden, nieuwe audio synthetiseren en exporteren, in één workflow.
- **Audioboeken maken** — met meerdere stemmen per script, EPUB/PDF-import en export naar `.m4b`.
- **Dicteren** — een systeembrede transcriptiewidget, optioneel met lokale LLM-opschoning van de tekst.

> **💡 Beginner-tip:** Begin met voice cloning op een kort, schoon audiofragment (3-15 seconden, geen achtergrondgeluid) voordat je grotere projecten zoals dubbing probeert. De kwaliteit van je brongeluid bepaalt grotendeels de kwaliteit van de gekloonde stem.

## Installeren en eerste gebruik

1. Download het voorgebouwde pakket voor macOS, Windows of Linux van de [releases-pagina](https://github.com/debpalash/VoiceStudio/releases), of gebruik de Docker-image als je liever met containers werkt (CUDA-, ROCm- en CPU-profielen beschikbaar).
2. Zorg voor minimaal 8GB RAM en 10GB vrije schijfruimte; met een GPU (NVIDIA CUDA, MPS of ROCm) draait alles merkbaar sneller, maar CPU-only werkt ook.
3. Start VoiceStudio: bij de eerste keer opstarten configureert de app automatisch een Python-omgeving en downloadt de standaardmodellen.
4. Kies je eerste taak (voice cloning, TTS, dubbing of transcriptie) en selecteer de engine die bij die taak past — het standaard OmniVoice-model is een prima startpunt.
5. Wil je VoiceStudio vanuit een ander programma aanroepen, dan kan dat via de lokale REST/SSE/WebSocket-API op `localhost:3900`, die OpenAI-compatibel is, of via de ingebouwde MCP-server-ondersteuning.

> **⚡ Gevorderden:** De OpenAI-compatibele lokale API betekent dat je bestaande code die tegen OpenAI's audio-API praat, met een kleine aanpassing van het endpoint tegen je eigen, lokale VoiceStudio-instantie kunt laten praten — handig als je een bestaande pijplijn wilt verplaatsen van cloud naar lokaal.

## Wat je moet weten over de licentie

VoiceStudio zelf staat onder de AGPL-3.0-licentie, met bijna 29.500 sterren en 2.540+ commits op GitHub — een teken van actieve doorontwikkeling, met op het moment van schrijven 65 open issues en 18 openstaande pull requests ([Bron: GitHub](https://github.com/debpalash/VoiceStudio)). De software is dus gratis te gebruiken en aan te passen, maar let op: gedownloade modellen behouden hun eigen, upstream-licentie, en die is niet altijd even ruim (denk aan CC-BY-NC-varianten). Ga je VoiceStudio commercieel inzetten, check dan per gekozen model welke licentie daarop van toepassing is.

## Checklist: ben je klaar?

- Je hardware voldoet aan het minimum (8GB RAM, 10GB schijfruimte) of je gebruikt de Docker-image.
- Je hebt een kort, schoon audiofragment klaar voor je eerste voice-cloning-test.
- Je weet welke TTS- of ASR-engine bij jouw taak past, in plaats van blind de standaardoptie te gebruiken.
- Je hebt gecheckt welke licentie geldt voor het model dat je downloadt, vooral bij commercieel gebruik.
- Je hebt de OpenAI-compatibele lokale API genoteerd als je VoiceStudio in een bestaande workflow wilt integreren.

## Bronnen

- [GitHub — debpalash/VoiceStudio](https://github.com/debpalash/VoiceStudio)
- [GitHub — debpalash/VoiceStudio releases](https://github.com/debpalash/VoiceStudio/releases)

Wil je weten hoe dit soort lokale, open-source AI-tools zich verhouden tot de grote gesloten modellen, lees dan [Open-source AI in 2026: Llama, Mistral, DeepSeek en Kimi](https://hetlaatsteainieuws.nl/achtergrond/staat-van-open-source-ai-2026) op hetlaatsteainieuws.nl.

