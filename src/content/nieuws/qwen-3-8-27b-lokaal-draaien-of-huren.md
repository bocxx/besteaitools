---
title: "Qwen 3.8 27B draaien: zelf hosten of huren?"
description: "Alibaba's nieuwe open-weight model past op één GPU en mag commercieel. Zo bepaal je of je het lokaal draait of via een endpoint huurt, en wat het kost."
publishedAt: 2026-08-24
updatedAt: 2026-08-24
author: "Redactie"
category: "gids"
tags:
  - "qwen"
  - "qwen-3-8-27b"
  - "alibaba"
  - "open-weights"
  - "lokale-llm"
  - "vllm"
  - "openrouter"
toolSlug: "qwen"
featured: false
draft: false
readingTime: 4
heroScene: "A small robot weighing two objects on a brass balance scale, a heavy graphics card on one side and a tiny rented key on the other, warm workshop light"
heroImage: "/images/articles/diorama-qwen-3-8-27b-lokaal-draaien-of-huren.webp"
heroImageAlt: "Miniatuur diorama-illustratie bij artikel 'Qwen 3.8 27B draaien: zelf hosten of huren?'"
keyTakeaways:
  - "Qwen3.8-27B verscheen op 14 augustus 2026 onder Apache 2.0: commercieel gebruik mag, zonder afdracht of toestemming vooraf."
  - "Het model neemt tekst, afbeeldingen en video als invoer en heeft een venster van 262.144 tokens."
  - "Een officiële gehoste dienst van Alibaba bestaat nog niet. Wie vandaag een endpoint wil, komt uit bij OpenRouter."
  - "De FP8-variant halveert het geheugengebruik ruwweg en presteert volgens Alibaba nagenoeg identiek."
faq:
  - q: "Wat is het verschil tussen Qwen3.8-27B en Qwen3.8-Max?"
    a: "Max is het vlaggenschip: een mixture-of-experts-model van 2,4 biljoen parameters met ongeveer 95 miljard actieve parameters, uitgebracht op 3 augustus 2026, met open weights vanaf 12 augustus onder een eigen Alibaba-licentie en zonder beeldinvoer. De 27B is de kleine broer: ongeveer een honderdste van de omvang, wél multimodaal, en onder Apache 2.0. Voor de meeste teams is de 27B het model dat je daadwerkelijk kunt draaien; Max is het model dat je huurt."
  - q: "Welke hardware heb ik nodig?"
    a: "Alibaba mikt op één high-end consumenten- of workstation-GPU. In BF16 is 27,78 miljard parameters — inclusief de vision-encoder — te zwaar voor de meeste enkele kaarten; de FP8-variant Qwen3.8-27B-FP8 gebruikt fijnmazige FP8-kwantisatie met blokgrootte 128 en halveert het geheugenbeslag ruwweg, met volgens Alibaba nagenoeg gelijke kwaliteit. Reken op een kaart in de 24-tot-48GB-klasse voor FP8, plus ruimte voor het contextvenster. Serveerrecepten zijn gepubliceerd voor vLLM en SGLang."
  - q: "Wat kost een gehost endpoint?"
    a: "OpenRouter rekent 0,45 dollar per miljoen ingaande tokens en 3,20 dollar per miljoen uitgaande tokens, met het volledige venster van 262.144 tokens. Een eigen gehoste dienst van Alibaba bestaat nog niet: de modelkaart belooft Qwen Cloud, maar die pagina gaf op 17 augustus 2026 nog een 404. Kom je ergens een officiële Alibaba-API-prijs voor dit specifieke model tegen, dan is die niet gepubliceerd door Alibaba zelf."
  - q: "Mag ik dit model commercieel gebruiken?"
    a: "Ja. Qwen3.8-27B en Qwen3.8-27B-FP8 staan onder Apache 2.0, en dat is bevestigd in het licentiebestand zelf, niet alleen in de front matter van de modelkaart. Commercieel gebruik is toegestaan zonder omzetafdracht. Dat is ruimer dan Qwen3.8-Max, dat onder een eigen licentie van Alibaba is uitgebracht — check dus altijd per checkpoint en niet per modelfamilie."
  - q: "Klopt het dat het contextvenster een miljoen tokens is?"
    a: "Native is het 262.144 tokens. Alibaba documenteert uitbreiding tot 1.000.000 tokens via YaRN, met in de eigen modelkaart de waarschuwing dat de gangbare open-source frameworks YaRN statisch implementeren en daardoor nauwkeurigheid kunnen verliezen op kortere invoer. Zet die uitbreiding dus niet standaard aan; schakel hem in voor de taken die hem echt nodig hebben."
---

Alibaba gaf op 14 augustus 2026 Qwen3.8-27B vrij. Het interessante zit niet in de benchmarkscores maar in de licentie: Apache 2.0, bevestigd in het licentiebestand zelf. Commercieel gebruik mag, zonder afdracht. Dat maakt de vraag "zelf draaien of huren" voor het eerst een echte afweging bij een model van dit kaliber.

## Wat je krijgt

Een dens model van 27 miljard parameters — geen mixture-of-experts, dus bij elke vraag draait het hele model. Het is een native vision language model: tekst, afbeeldingen en video gaan erin, tekst komt eruit. Het contextvenster is 262.144 tokens.

Twee checkpoints staan op Hugging Face en ModelScope:

| Checkpoint | Formaat | Wanneer kiezen |
|---|---|---|
| `Qwen/Qwen3.8-27B` | BF16 | Je hebt geheugen over en wilt geen enkele kwantisatie-twijfel |
| `Qwen/Qwen3.8-27B-FP8` | FP8, blokgrootte 128 | Standaardkeuze: ruwweg halve geheugenlast, volgens Alibaba nagenoeg gelijke kwaliteit |

Serveerrecepten zijn gepubliceerd voor vLLM en SGLang. Voor een eerste kennismaking zonder infrastructuur is [Ollama](/tools/ollama) of [LM Studio](/tools/lm-studio) de kortste route, mits daar een geschikte quant beschikbaar is.

## De afweging in drie vragen

**1. Gaat er gevoelige data in?** Dit is de enige vraag die op zichzelf de doorslag kan geven. Draai je het model op eigen hardware, dan verlaat de invoer je netwerk niet. Bij elk gehost endpoint — ook OpenRouter — geldt het verhaal van elke cloudleverancier: kijk waar het draait en wat er met je invoer gebeurt.

**2. Hoeveel tokens verwerk je per maand?** OpenRouter rekent 0,45 dollar per miljoen ingaande en 3,20 dollar per miljoen uitgaande tokens. Onder de paar honderd miljoen tokens per maand haal je een GPU-investering er zelden uit. Daarboven kantelt het, zeker bij taken met veel invoer en weinig uitvoer — en dat is precies het profiel van documentverwerking en OCR.

**3. Moet het altijd aan staan?** Een lokaal model dat 's nachts stilstaat kost evenveel als een lokaal model dat draait. Een endpoint kost niets als je niets vraagt. Bij bursty gebruik wint huren bijna altijd.

## Beginnen zonder iets te installeren

De snelste test kost je een half uur en geen hardware: zet het model via OpenRouter achter je bestaande code, gooi er twintig representatieve taken doorheen en vergelijk de uitkomsten met wat je nu gebruikt. Pas als het model die test doorstaat, is de hostingvraag relevant.

Wat je daarbij meet is niet de benchmarkscore maar jouw taak. Alibaba's eigen cijfers zetten Qwen3.8-27B op 61,7 procent voor SWE-bench Pro tegen 53,4 procent voor Claude Opus 4.6 Max, maar dat zijn Alibaba's metingen op een door Alibaba gecorrigeerde testset. Twee van de benchmarks in de tabel zijn in huis gemaakt en niet openbaar. Bruikbaar als richting, niet als bewijs.

## Waar het misgaat

- **YaRN standaard aanzetten.** De uitbreiding naar een miljoen tokens is statisch geïmplementeerd in de gangbare frameworks en kan de nauwkeurigheid op korte invoer verlagen. Zet hem aan per taak, niet per server.
- **De licentie van Max verwarren met die van 27B.** Max heeft een eigen Alibaba-licentie, 27B heeft Apache 2.0. Check per checkpoint.
- **Rekenen op een officiële API-prijs.** Die is er nog niet. Wie er een noemt, citeert iets dat Alibaba niet heeft gepubliceerd.
- **BF16 kiezen zonder reden.** De FP8-variant is voor bijna iedereen de praktische keuze.

Wil je eerst het bredere plaatje — waarom er in twee weken tijd twee gratis modellen van deze klasse verschenen — dan staat de duiding op [Het Laatste AI Nieuws](https://hetlaatsteainieuws.nl/nieuws/qwen-3-8-27b-gratis-model-eigen-computer).
