---
title: "Offline spraakassistent bouwen met Gemma en Ollama"
description: "Een spraakassistent die volledig op je eigen computer draait: Whisper luistert, Gemma denkt via Ollama en Piper praat Nederlands terug. Zo bouw je hem."
publishedAt: 2026-10-07
updatedAt: 2026-10-07
author: "Redactie"
category: "gids"
tags:
  - "gemma"
  - "ollama"
  - "spraakassistent"
  - "whisper"
  - "piper"
  - "lokale-ai"
  - "privacy"
toolSlug: "ollama"
featured: false
draft: false
readingTime: 5
heroImage: "/images/articles/diorama-gemma-offline-spraakassistent-lokaal.webp"
heroImageAlt: "Miniatuur diorama-illustratie bij artikel 'Offline spraakassistent bouwen met Gemma en Ollama'"
heroScene: "A tiny brass microphone and a small wooden speaker connected by copper wires to a closed laptop on a desk"
evergreen: true
volatility: medium
factsCheckedAt: 2026-10-07
watch:
  - "gemma-models"
  - "ollama-library"
  - "piper-voices"
keyTakeaways:
  - "Een offline spraakassistent bestaat uit drie lokale onderdelen: spraakherkenning (faster-whisper of whisper.cpp), een taalmodel (Gemma via Ollama) en spraaksynthese (Piper)."
  - "Gemma draai je met één commando in Ollama; het 12B-model is volgens Google gemaakt voor machines met ongeveer 16 GB geheugen."
  - "In Ollama neemt Gemma alleen tekst en beeld aan, dus je zet de spraak eerst om naar tekst met Whisper voordat je hem aan het model geeft."
  - "Piper heeft Nederlandse stemmen voor Nederland (zoals pim en ronnie) en Vlaanderen (nathalie en rdh), dus je assistent praat gewoon Nederlands terug."
  - "Na de eenmalige downloads werkt de hele keten zonder internet: je opnames, vragen en antwoorden blijven op je eigen machine."
faq:
  - q: "Kan ik een spraakassistent volledig offline draaien?"
    a: "Ja. Je hebt drie onderdelen nodig die alle drie lokaal draaien: faster-whisper of whisper.cpp om je stem naar tekst om te zetten, een taalmodel als Gemma via Ollama om te antwoorden, en Piper om dat antwoord uit te spreken. Alleen voor het downloaden van de modellen en stemmen heb je eenmalig internet nodig. Daarna kun je de wifi uitzetten en blijft alles werken."
  - q: "Welke hardware heb ik nodig voor Gemma als spraakassistent?"
    a: "Google mikt met Gemma 4 12B op machines met ongeveer 16 GB werkgeheugen of videogeheugen, zoals een recente MacBook met Apple Silicon of een pc met een losse GPU. Heb je minder geheugen, kies dan een kleinere Gemma-variant in Ollama. Spraakherkenning en Piper zijn licht en draaien ook op een gewone processor. De actuele modelgroottes staan in de Stand van zaken onderaan."
  - q: "Kan Gemma niet zelf naar audio luisteren?"
    a: "Het model kan het wel: Google bouwde audio-invoer in, en volgens Hugging Face doet het spraakherkenning op fragmenten tot 30 seconden. Maar in de Ollama-library staat bij elke Gemma-tag alleen tekst en beeld als invoer. Wie via Ollama werkt, laat de spraak dus eerst door Whisper omzetten. Rechtstreeks audio voeren kan via bijvoorbeeld Hugging Face Transformers, maar dat vraagt meer programmeerwerk."
  - q: "Welke Nederlandse stem kies ik in Piper?"
    a: "Piper heeft voor nl_NL onder meer de stemmen alex, mls, pim en ronnie, en voor nl_BE nathalie en rdh. Download er een met python3 -m piper.download_voices, bijvoorbeeld nl_NL-pim-medium, en luister een paar zinnen. Smaak verschilt; de demo op de Piper-site laat je stemmen vooraf beluisteren."
sources:
  - label: "Google — Introducing Gemma 4 12B"
    url: "https://blog.google/innovation-and-ai/technology/developers-tools/introducing-gemma-4-12b/"
  - label: "Google AI for Developers — Gemma releases"
    url: "https://ai.google.dev/gemma/docs/releases"
  - label: "Hugging Face — google/gemma-4-12B"
    url: "https://huggingface.co/google/gemma-4-12B"
  - label: "Ollama library — gemma4"
    url: "https://ollama.com/library/gemma4"
  - label: "Ollama — download"
    url: "https://ollama.com/download"
  - label: "GitHub — ollama/ollama-python"
    url: "https://github.com/ollama/ollama-python"
  - label: "GitHub — SYSTRAN/faster-whisper"
    url: "https://github.com/SYSTRAN/faster-whisper"
  - label: "GitHub — ggml-org/whisper.cpp"
    url: "https://github.com/ggml-org/whisper.cpp"
  - label: "GitHub — OHF-Voice/piper1-gpl"
    url: "https://github.com/OHF-Voice/piper1-gpl"
  - label: "Hugging Face — rhasspy/piper-voices"
    url: "https://huggingface.co/rhasspy/piper-voices/tree/main/nl"
---

Een spraakassistent die je mails laat samenvatten of een tekst laat herschrijven, zonder dat er één opname je computer verlaat: dat bouw je tegenwoordig met drie gratis onderdelen. Whisper zet je stem om naar tekst, Gemma bedenkt het antwoord via Ollama en Piper spreekt het uit. Geen cloud, geen abonnement, en na de downloads ook geen internet.

## Hoe de keten werkt

De opbouw is altijd hetzelfde: **microfoon → spraakherkenning → taalmodel → spraaksynthese → luidspreker**. Elk onderdeel kun je later vervangen door een beter exemplaar zonder de rest om te gooien. Dat maakt dit een opstelling die je jaren kunt blijven gebruiken.

Gemma is de familie open modellen van Google. Het 12B-model is volgens Google klein genoeg om lokaal te draaien met ongeveer 16 GB geheugen, en valt onder de Apache 2.0-licentie, dus ook commercieel gebruik mag ([Bron: Google](https://blog.google/innovation-and-ai/technology/developers-tools/introducing-gemma-4-12b/)). Google bouwde zelfs audio-invoer in het model zelf ([Bron: Hugging Face](https://huggingface.co/google/gemma-4-12B)). Toch gebruik je hier een losse spraakherkenner, want in de Ollama-library staat bij elke Gemma-variant alleen tekst en beeld als invoer ([Bron: Ollama](https://ollama.com/library/gemma4)).

> **💡 Beginner-tip:** STT staat voor *speech-to-text* (spraak naar tekst), TTS voor *text-to-speech* (tekst naar spraak). Samen zijn ze de oren en de mond van je assistent; Gemma is het brein ertussen. Nog nooit een lokaal model gedraaid? Begin dan met onze gids [Ollama installeren](/nieuws/ollama-lokale-ai-modellen-draaien).

## Stap 1: installeer Ollama en haal Gemma binnen

[Ollama](/ai-tools/ollama) is er voor macOS, Windows en Linux. Op Mac en Linux installeer je het met `curl -fsSL https://ollama.com/install.sh | sh`, op Windows met de installer of via PowerShell ([Bron: Ollama](https://ollama.com/download)). Daarna typ je in een terminal:

```bash
ollama run gemma4:12b
```

Ollama downloadt het model eenmalig en opent een chat. Werkt dat, dan staat het brein van je assistent. Sluit af met `/bye`; het model blijft beschikbaar voor andere programma's. Heb je minder dan 16 GB geheugen, kies dan een kleinere variant uit de tabel onderaan.

## Stap 2: spraakherkenning met faster-whisper

Voor het luisterwerk gebruik je **faster-whisper**, een snellere herbouw van OpenAI's Whisper die ook op een gewone processor draait ([Bron: faster-whisper](https://github.com/SYSTRAN/faster-whisper)). Whisper verstaat Nederlands; je geeft dat met `language="nl"` mee zodat hij niet hoeft te raden.

```bash
pip install faster-whisper ollama sounddevice piper-tts
```

Dit installeert in één keer ook de Python-bibliotheek van Ollama ([Bron: ollama-python](https://github.com/ollama/ollama-python)), `sounddevice` voor de microfoon en Piper voor de stem. Liever C++ dan Python? Dan is [whisper.cpp](https://github.com/ggml-org/whisper.cpp) het alternatief. Dat project heeft een `whisper-stream`-voorbeeld dat je microfoon continu uitschrijft ([Bron: whisper.cpp](https://github.com/ggml-org/whisper.cpp)). Meer over Whisper zelf lees je op de [Whisper-toolpagina](/ai-tools/whisper).

## Stap 3: een Nederlandse stem met Piper

Piper is een lichte, lokale spraaksynthesizer, tegenwoordig onderhouden door de Open Home Foundation onder een GPL-3.0-licentie ([Bron: Piper](https://github.com/OHF-Voice/piper1-gpl)). Er zijn Nederlandse stemmen voor Nederland en voor Vlaanderen ([Bron: Piper voices](https://huggingface.co/rhasspy/piper-voices/tree/main/nl)). Download er een in de map waar je script komt te staan en test hem:

```bash
python3 -m piper.download_voices nl_NL-pim-medium
python3 -m piper -m nl_NL-pim-medium -- 'Hallo, ik draai helemaal offline.'
```

Direct afspelen vraagt `ffplay` (onderdeel van FFmpeg) op je systeem ([Bron: Piper CLI](https://github.com/OHF-Voice/piper1-gpl/blob/main/docs/CLI.md)). Hoor je niets, installeer dan eerst FFmpeg.

## Stap 4: knoop het aan elkaar

Dit script neemt vijf seconden op, laat Whisper uitschrijven, stuurt de tekst naar Gemma en laat Piper het antwoord uitspreken. Het onthoudt het gesprek, dus je kunt doorvragen.

```python
import subprocess
import sounddevice as sd
from faster_whisper import WhisperModel
from ollama import chat

stt = WhisperModel("small", device="cpu", compute_type="int8")
gesprek = [{"role": "system", "content": "Je bent een behulpzame assistent. Antwoord kort en in het Nederlands."}]

while True:
    input("Druk op Enter en praat vijf seconden...")
    audio = sd.rec(5 * 16000, samplerate=16000, channels=1, dtype="float32")
    sd.wait()
    segmenten, _ = stt.transcribe(audio.flatten(), language="nl")
    vraag = " ".join(s.text for s in segmenten).strip()
    print("Jij:", vraag)
    gesprek.append({"role": "user", "content": vraag})
    antwoord = chat(model="gemma4:12b", messages=gesprek).message.content
    gesprek.append({"role": "assistant", "content": antwoord})
    print("Gemma:", antwoord)
    subprocess.run(["python3", "-m", "piper", "-m", "nl_NL-pim-medium", "--", antwoord])
```

De `WhisperModel`-aanroep met `device="cpu"` en `compute_type="int8"` komt rechtstreeks uit de faster-whisper-documentatie; met een NVIDIA-kaart zet je `device="cuda"` ([Bron: faster-whisper](https://github.com/SYSTRAN/faster-whisper)). Het eerste gebruik downloadt het Whisper-model, daarna kan de wifi uit.

> **⚡ Gevorderden:** Piper laadt zijn stem bij elke aanroep opnieuw, wat merkbare vertraging geeft. De Piper-docs raden voor herhaald gebruik de ingebouwde webserver aan ([Bron: Piper CLI](https://github.com/OHF-Voice/piper1-gpl/blob/main/docs/CLI.md)). Wil je Gemma de audio rechtstreeks laten horen, dan kan dat via Hugging Face Transformers, tot 30 seconden per fragment ([Bron: Hugging Face](https://huggingface.co/google/gemma-4-12B)).

## Wat je realistisch mag verwachten

Hoe snel het voelt, hangt vooral af van je geheugen en je GPU. Op een laptop krijg je eerder een kort denkmoment dan een vlot gesprek; korte vragen, samenvattingen en herschrijfwerk gaan prima. Een groter Whisper-model verstaat je beter maar rekent langer, dus begin met `small` en schuif op als je merkt dat hij woorden mist.

De winst zit in controle: geen maandbedrag, geen limieten en gevoelige gegevens die thuis blijven. Wil je een stap verder, kijk dan naar [een AI-agent die je data nooit verlaat](/nieuws/ollama-ai-agent-lokaal-offline-privacy). Zoek je juist stemklonen of dubben, dan is [VoiceStudio](/nieuws/voicestudio-installeren-lokaal-alternatief) de lokale route, en [Transformers.js](/nieuws/transformers-js-ai-in-de-browser-gebruiken) laat spraakherkenning zelfs in de browser draaien. Wat Gemma 12B als model kan en waarom het voor je privacy uitmaakt, lees je bij [Het Laatste AI Nieuws](https://www.hetlaatsteainieuws.nl/nieuws/gemma-4-12b-ai-op-je-laptop). Welke andere open modellen lokaal goed draaien, staat in ons [overzicht van open-weight modellen](/nieuws/open-weight-modellen-lokaal-draaien).

## Stand van zaken — bijgewerkt 2026-10-07

Alles hierboven blijft staan, ongeacht welk model er draait. De cijfers en versies hieronder zijn de bederfelijke laag.

| Onderwerp | Stand |
| --- | --- |
| Nieuwste Gemma-taalmodel | Gemma 4 12B (3 juni 2026); geen opvolger, alleen EmbeddingGemma 2 (6 oktober 2026) ([Bron: Google](https://ai.google.dev/gemma/docs/releases)) |
| Gemma-varianten in Ollama | `gemma4:e2b`, `e4b`, `12b`, `26b`, `31b`; `12b` is 7,7 tot 8,0 GB met 256K context ([Bron: Ollama](https://ollama.com/library/gemma4)) |
| Invoer in Ollama | Tekst en beeld, geen audio ([Bron: Ollama](https://ollama.com/library/gemma4)) |
| Geheugenrichtlijn Gemma 4 12B | Ongeveer 16 GB VRAM of unified memory ([Bron: Google](https://blog.google/innovation-and-ai/technology/developers-tools/introducing-gemma-4-12b/)) |
| Licentie Gemma 4 | Apache 2.0 |
| faster-whisper-modellen | Onder meer `small`, `turbo`, `large-v3`, `distil-large-v3` |
| Piper | `pip install piper-tts`, GPL-3.0, repo OHF-Voice/piper1-gpl |
| Nederlandse Piper-stemmen | nl_NL: alex, mls, pim, ronnie; nl_BE: nathalie, rdh ([Bron: Piper voices](https://huggingface.co/rhasspy/piper-voices/tree/main/nl)) |
