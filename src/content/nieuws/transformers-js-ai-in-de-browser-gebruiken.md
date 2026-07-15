---
title: "Transformers.js gebruiken: AI direct in de browser zonder server"
description: "Met Transformers.js van Hugging Face draai je ML-modellen client-side in je browser — geen backend, geen API-kosten, geen data die het apparaat verlaat. Zo doe je dat."
publishedAt: 2026-06-12
updatedAt: 2026-06-12
author: "Redactie"
category: "gids"
tags:
  - "transformers-js"
  - "huggingface"
  - "client-side-ai"
  - "webgpu"
  - "javascript"
  - "browser-ml"
  - "privacy"
toolSlug: "huggingface"
featured: false
draft: false
readingTime: 4
heroImage: "/images/nieuws/transformers-js-ai-in-de-browser-gebruiken.webp"
keyTakeaways:
  - "Transformers.js van Hugging Face laat je ML-modellen draaien in de browser via ONNX Runtime — geen server, geen API-sleutel nodig."
  - "Ondersteunde taken zijn onder meer sentiment-analyse, vertaling, spraakherkenning, beeldclassificatie en named entity recognition."
  - "Modellen worden de eerste keer gedownload en daarna gecached — na de eerste laadtijd draait alles volledig offline."
  - "WebGPU versnelt de inferentie op moderne hardware; WASM is de automatische fallback op oudere apparaten."
  - "Privacy by default: gevoelige data verlaat de browser architectureel niet — dat is een andere garantie dan een verwerkingsovereenkomst."
faq:
  - q: "Wat is Transformers.js en wat kan het?"
    a: "Transformers.js is een JavaScript-library van Hugging Face waarmee je voorgetrainde ML-modellen direct in de browser of in Node.js draait — zonder server. De API lijkt op de Python-library. Ondersteunde taken: tekstclassificatie, vertaling, samenvatting, spraakherkenning, beeldclassificatie en meer. Modellen draaien via ONNX Runtime met WebGPU- of WASM-backend."
  - q: "Heb ik een Hugging Face API-sleutel nodig voor Transformers.js?"
    a: "Nee. Voor Transformers.js heb je geen API-sleutel nodig. De modellen worden direct van de Hugging Face CDN gedownload en gecached in je browser. Eerste download duurt afhankelijk van modelgrootte 5-30 seconden; daarna draait alles lokaal zonder netwerkverzoek."
  - q: "Welke browsers ondersteunen Transformers.js met WebGPU?"
    a: "Chrome en Edge ondersteunen WebGPU volledig. Firefox heeft WebGPU standaard op Windows (versie 141+) en op macOS Tahoe 26. Safari in macOS en iOS 26. Transformers.js valt automatisch terug op WebAssembly als WebGPU niet beschikbaar is, dus het werkt ook op oudere browsers — alleen langzamer."
  - q: "Hoe groot zijn de modellen die Transformers.js gebruikt?"
    a: "Compact: de meeste standaard-pipeline-modellen voor sentimentanalyse of vertaling zijn 50-300 MB. Whisper-klein voor spraakherkenning is circa 150 MB. Voor een productie-webapp kies je bewust voor compacte varianten. Hugging Face biedt veel modellen ook in int8- of fp16-gekwantiseerde versies aan, die sneller laden en minder geheugen gebruiken."
  - q: "Is Transformers.js geschikt voor productie?"
    a: "Voor specifieke taken — sentiment, classificatie, vertaling, spraakherkenning — werkt het in productie op moderne hardware. Houd rekening met de eerste downloadtijd en bied een laadstatus aan. Voor complexe multi-step taken of gebruik op brede doelgroepen met variabele hardware blijft een cloud-API robuuster."
sources:
  - label: "Transformers.js documentatie — Hugging Face"
    url: "https://huggingface.co/docs/transformers.js/index"
  - label: "ONNX Runtime Web — Microsoft Open Source Blog"
    url: "https://opensource.microsoft.com/blog/2024/02/29/onnx-runtime-web-unleashes-generative-ai-in-the-browser-using-webgpu/"
  - label: "WebGPU browser-ondersteuning — web.dev"
    url: "https://web.dev/blog/webgpu-supported-major-browsers"
---

Machine learning in een webapplicatie inbouwen betekende lang: kies een API, beheer een sleutel, schrijf een backend-route en zorg dat je gebruikersdata naar een externe server gaat. Transformers.js snijdt al die stappen weg. Het model draait in de tab van je gebruiker — op hun GPU, met hun hardware, zonder dat er één byte de browser verlaat.

## Wat je nodig hebt

Eén npm-pakket, een modern framework of vanilla JavaScript, en een browser die WebGPU of WebAssembly ondersteunt. Dat is het.

```bash
npm install @xenova/transformers
```

Geen API-sleutel, geen `.env`-bestand, geen backend. Het pakket laadt modellen rechtstreeks van de Hugging Face CDN en cachet ze in je browser.

## Stap 1: een pipeline initialiseren

Transformers.js werkt via _pipelines_ — vooraf gebundelde combinaties van model + tokenizer + post-processing die een specifieke taak uitvoeren. Je geeft een taak op, en de library kiest het best passende standaard-model:

```javascript
import { pipeline } from '@xenova/transformers';

// Eerste keer: model wordt gedownload en gecached (~50-150 MB)
const classifier = await pipeline('sentiment-analysis');
const result = await classifier('Dit product werkt erg goed.');
// → [{ label: 'POSITIVE', score: 0.998 }]
```

De tweede keer dat je de pagina laadt, start inferentie direct — geen download, geen wachten.

> **💡 Beginner-tip:** De eerste `await pipeline(...)` call kan 10-30 seconden duren terwijl het model laadt. Laat in je UI een laadstatus zien ("Model laden…") zodat gebruikers weten wat er gebeurt. Na die eerste keer is alles gecached en duurt het een fractie van een seconde.

## Stap 2: kies de juiste taak voor jouw use case

Transformers.js ondersteunt een brede set taken. De meest gebruikte voor webapplicaties:

| Taak | Pipeline-naam | Typisch modelformaat |
|------|--------------|---------------------|
| Sentimentanalyse | `sentiment-analysis` | ~50 MB |
| Vertaling | `translation` | ~300 MB |
| Spraakherkenning | `automatic-speech-recognition` | ~150 MB (Whisper-klein) |
| Samenvatting | `summarization` | ~250 MB |
| Beeldclassificatie | `image-classification` | ~90 MB |
| Named entity recognition | `token-classification` | ~65 MB |

Voor spraakherkenning geef je een audio-blob door; voor beeldclassificatie een URL of canvas-element:

```javascript
const transcriber = await pipeline('automatic-speech-recognition', 'Xenova/whisper-tiny');
const result = await transcriber(audioBlob);
// → { text: "Dit is een testzin." }
```

## Stap 3: WebGPU inschakelen voor betere prestaties

Standaard gebruikt Transformers.js WebAssembly. Voor gebruikers met een moderne GPU schakel je WebGPU in als execution provider — dat geeft tot tien keer hogere throughput op grotere modellen:

```javascript
import { pipeline, env } from '@xenova/transformers';

// Kies WebGPU als voorkeur, val terug op WASM
env.backends.onnx.wasm.proxy = false;

const classifier = await pipeline('sentiment-analysis', null, {
  device: 'webgpu', // of 'wasm' voor maximale compatibiliteit
});
```

Transformers.js detecteert automatisch of WebGPU beschikbaar is en valt terug op WASM als dat niet zo is. Je gebruikers op oudere hardware merken er niets van.

> **⚡ Gevorderden:** Je kunt ook specifieke model-varianten kiezen om te optimaliseren voor grootte of snelheid. `'Xenova/distilbert-base-uncased-finetuned-sst-2-english'` is kleiner en sneller dan het standaard sentiment-model. Zoek op de [Hugging Face Transformers.js model hub](https://huggingface.co/models?library=transformers.js) op de filter `library:transformers.js` om te zien welke modellen direct beschikbaar zijn zonder conversie.

## Stap 4: privacy als architectuurkeuze

Als het model client-side draait, verlaat de data de browser niet. Dat is meer dan een privacyclaim in een cookiebanner — het is een technische eigenschap van de architectuur. Medische tekst, juridische documenten, vertrouwelijke notities: met Transformers.js in de browser heb je een garantie die geen cloud-API kan geven. Heb je zwaardere modellen nodig met dezelfde privacygarantie, dan is lokaal draaien de volgende trede — zie onze gids over [open-weight modellen lokaal draaien](/nieuws/open-weight-modellen-lokaal-draaien).

Voor de bredere context over waarom en wanneer browser-inferentie het juiste architectuurpatroon is — inclusief de beperkingen qua modelgrootte — lees de analyse op Het Laatste AI Nieuws: [AI in de browser zonder server](https://hetlaatsteainieuws.nl/ai-innovatie/ai-in-de-browser-zonder-server). ([Bron: Hugging Face](https://huggingface.co/docs/transformers.js/index)) En vraag je je af wat "transformer" in de naam eigenlijk betekent? Ons mentale model van [CNN's, RNN's en transformers](/nieuws/cnn-rnn-transformers-huggingface-uitleg) legt het zonder wiskunde uit.

## Checklist: ben je klaar?

- [ ] `npm install @xenova/transformers` gedaan
- [ ] Pipeline-taak gekozen op basis van use case (zie tabel)
- [ ] Laadstatus in de UI toegevoegd voor de eerste model-download
- [ ] Getest op de browsers van je doelgroep (Chrome/Edge voor WebGPU, Firefox/Safari recent)
- [ ] Model-variant gekozen die past bij de hardware van je gebruikers
- [ ] Besloten of WebGPU of WASM de beste keuze is voor jouw doelgroep
- [ ] Privacy-voordeel gecommuniceerd als dat relevant is voor je use case

## Bronnen

- [Transformers.js documentatie — Hugging Face](https://huggingface.co/docs/transformers.js/index)
- [ONNX Runtime Web unleashes generative AI in the browser — Microsoft](https://opensource.microsoft.com/blog/2024/02/29/onnx-runtime-web-unleashes-generative-ai-in-the-browser-using-webgpu/)
- [WebGPU is now supported in major browsers — web.dev](https://web.dev/blog/webgpu-supported-major-browsers)
