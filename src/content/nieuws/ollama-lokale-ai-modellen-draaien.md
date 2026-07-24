---
title: "Ollama installeren: een AI-model lokaal draaien op je eigen computer"
heroImageAlt: "Miniatuur diorama-illustratie bij artikel 'Ollama installeren: een AI-model lokaal draaien op je eigen computer'"
description: "Met Ollama draai je een AI-taalmodel gratis op je eigen machine, zonder cloud. Zo installeer je het op Mac, Windows of Linux en praat je binnen tien minuten met je eerste model."
publishedAt: 2026-07-24
updatedAt: 2026-07-24
author: "Redactie"
category: "gids"
tags:
  - "ollama"
  - "lokale-llm"
  - "open-weight"
  - "privacy"
  - "self-hosting"
toolSlug: "ollama"
featured: false
draft: false
readingTime: 5
heroImage: "/images/articles/diorama-ollama-lokale-ai-modellen-draaien.webp"
heroScene: "A miniature paper-craft diorama of a friendly llama sitting beside a small glowing laptop on a wooden desk, representing a local AI model running offline, muted tones, soft studio light"
keyTakeaways:
  - "Ollama is gratis en open source en draait AI-taalmodellen volledig lokaal op je eigen computer, zonder dat je data naar een externe server gaat."
  - "Installeren duurt op alle drie de systemen enkele minuten: Homebrew op Mac, een installer op Windows en één install-script op Linux."
  - "Met `ollama run <model>` haal je een model op en start je meteen een gesprek; de eerste download is het grootste geduldswerk."
  - "Je RAM bepaalt welk model past: op 8 GB draai je een klein 3B-model, vanaf 16 GB een 7- tot 8B-model comfortabel."
faq:
  - q: "Wat is Ollama?"
    a: "Ollama is een gratis, open source programma waarmee je grote taalmodellen (LLM's) lokaal op je eigen computer draait, zonder cloud. Je downloadt een model één keer, en daarna praat je ermee zonder internet en zonder per gesprek te betalen. Het werkt op macOS, Windows en Linux en biedt zowel een commandoregel als een lokale API op poort 11434, zodat je eigen apps erop kunnen aansluiten."
  - q: "Welk model kan mijn computer aan?"
    a: "Dat hangt vooral af van je werkgeheugen (RAM). Met 8 GB begin je verstandig met een klein model rond de 3 miljard parameters, bijvoorbeeld `llama3.2`. Heb je 16 GB of meer, dan draai je comfortabel een 7- tot 8B-model zoals `qwen3`. Een aparte GPU helpt flink: Ollama gebruikt Apple Metal automatisch op de Mac, en op een NVIDIA-kaart heb je driver 525 of nieuwer nodig."
  - q: "Is Ollama echt gratis en privé?"
    a: "Ja. Ollama zelf is gratis en open source, en de modellen die je downloadt draaien op je eigen hardware. Je invoer verlaat je computer niet — dat is precies waarom mensen het gebruiken voor gevoelige documenten of werk waar cloud-AI niet mag. Je betaalt alleen in schijfruimte en stroom, niet per gebruik."
  - q: "Hoe verwijder ik een model dat te veel ruimte inneemt?"
    a: "Modellen kunnen al snel enkele gigabytes kosten. Bekijk wat je hebt staan met `ollama list`, en verwijder er een met `ollama rm <modelnaam>`. Zo houd je alleen de modellen die je echt gebruikt, en krijg je je schijfruimte meteen terug."
---

# Ollama installeren: een AI-model lokaal draaien op je eigen computer

Wil je een AI-taalmodel gebruiken zonder dat je tekst naar een cloudserver van een groot bedrijf gaat? Met Ollama draai je een model gratis op je eigen machine — Mac, Windows of Linux. Hieronder loop je de installatie af en praat je binnen tien minuten met je eerste model, zonder programmeerkennis.

> **💡 Beginner-tip:** Een "lokaal model" betekent dat de AI volledig op jouw computer draait. Geen account, geen abonnement, geen data die het internet op gaat. De prijs die je betaalt is schijfruimte en wat rekenkracht van je eigen machine.

## Wat Ollama is en voor wie

Ollama is een gratis, open source programma dat grote taalmodellen (LLM's) lokaal draait. Het is bedoeld voor iedereen die AI wil gebruiken zonder cloud: ontwikkelaars die offline willen bouwen, professionals die met gevoelige documenten werken, of nieuwsgierige gebruikers die geen maandbedrag willen betalen. De enige echte voorwaarde is voldoende werkgeheugen — daarover zo meer.

## De stappen: installeren en je eerste model

1. **Installeer Ollama voor jouw systeem.** Op de Mac gaat dat met Homebrew: `brew install ollama` (of download de app via [ollama.com/download](https://ollama.com/download)). Op Linux draai je één script: `curl -fsSL https://ollama.com/install.sh | sh`. Op Windows download je de officiële installer van ollama.com en klik je hem door. Je herkent een geslaagde installatie doordat het `ollama`-commando in je terminal reageert.
2. **Controleer dat Ollama draait.** Typ `ollama list` in je terminal. Een lege lijst is prima — het betekent dat Ollama werkt maar nog geen modellen heeft. Start eventueel de achtergronddienst met `ollama serve`.
3. **Haal je eerste model op en start een gesprek.** Draai `ollama run llama3.2`. Ollama downloadt het model (dit is de enige stap die even duurt — reken op een paar minuten, afhankelijk van je internet) en zet je daarna direct in een chat. Typ een vraag en je krijgt lokaal antwoord. Stoppen doe je met `/bye`.

> **⚡ Gevorderden:** Zodra Ollama draait, staat er een lokale API klaar op `http://localhost:11434`. Daarmee koppel je je eigen scripts, een chat-frontend of een editor aan je lokale model — dezelfde aanpak die veel zelfbouw-AI-projecten gebruiken in plaats van een betaalde cloud-API.

## Kies een model dat bij je hardware past

De grootste beginnersfout is meteen het zwaarste model pakken. Je RAM is de bottleneck:

| Werkgeheugen | Verstandige start |
|---|---|
| 8 GB | Klein 3B-model, bv. `llama3.2` |
| 16 GB | 7- tot 8B-model, bv. `qwen3` |
| 32 GB+ | Grotere modellen, ruimte voor meerdere naast elkaar |

Een aparte GPU versnelt alles fors. Op de Mac benut Ollama de Apple-chip automatisch; op een NVIDIA-kaart heb je driver 525 of nieuwer nodig. Welke modellen er zijn, en hoe zwaar ze wegen, vind je in de modellenbibliotheek op ollama.com.

## Let op je schijfruimte

Modellen zijn geen kleine bestanden — een enkel model kost al snel enkele gigabytes, en voor je het weet staan er vijf. Houd overzicht met `ollama list` en ruim op met `ollama rm <modelnaam>`. Wil je dieper de wereld van vrij te draaien modellen in, lees dan onze uitleg over [open-weight modellen lokaal draaien](/nieuws/open-weight-modellen-lokaal-draaien) en hoe je [modellen veilig downloadt](/nieuws/huggingface-modellen-veilig-downloaden). Voor de bredere context waaróm lokale, open modellen er juist nu toe doen, is er duiding in het [AI-nieuws op hetlaatsteainieuws.nl](https://hetlaatsteainieuws.nl/nieuws).

## Checklist: draait je lokale model?

- [ ] Ollama geïnstalleerd en het `ollama`-commando reageert
- [ ] `ollama list` geeft output (leeg of met modellen)
- [ ] Een eerste model opgehaald met `ollama run <model>`
- [ ] Gesprek gestart en lokaal antwoord gekregen
- [ ] Model passend bij je RAM gekozen (niet te zwaar)
- [ ] Weet hoe je met `ollama rm` ruimte terugwint

## Bronnen

- [Ollama — Download](https://ollama.com/download) — officiële installers en commando's per besturingssysteem
- [Ollama — Model library](https://ollama.com/library) — overzicht van beschikbare modellen en hun grootte
- [Ollama — GitHub](https://github.com/ollama/ollama) — open source project, documentatie en API-referentie
