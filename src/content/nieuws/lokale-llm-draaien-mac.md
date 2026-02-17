---
title: "Zo draai je een lokale LLM op je Mac in 5 minuten"
description: "Stap-voor-stap handleiding om Llama 3 of Mistral lokaal te draaien met Ollama. Geen cloud, geen kosten, volledige privacy."
publishedAt: 2026-02-13
author: "Sander Visser"
category: "ai-tutorials"
tags:
  - "tutorial"
  - "ollama"
  - "lokaal"
  - "privacy"
  - "mac"
featured: false
draft: false
readingTime: 5
---

## Waarom lokale AI?

Cloud-gebaseerde AI is handig, maar niet altijd ideaal:

- **Privacy**: Je data verlaat nooit je computer
- **Kosten**: Geen API-kosten of abonnementen
- **Snelheid**: Geen netwerklatentie
- **Offline**: Werkt zonder internet

## Wat je nodig hebt

- Mac met Apple Silicon (M1/M2/M3/M4)
- Minimaal 8GB RAM (16GB aanbevolen)
- 10GB vrije schijfruimte

## Stap 1: Installeer Ollama

Open Terminal en voer uit:

```bash
curl -fsSL https://ollama.ai/install.sh | sh
```

Of download de app van [ollama.ai](https://ollama.ai).

## Stap 2: Download een model

Populaire opties:

```bash
# Klein en snel (4GB)
ollama pull llama3:8b

# Groter en slimmer (8GB)
ollama pull llama3:70b

# Beste voor code (6GB)
ollama pull codellama:13b
```

## Stap 3: Start een chat

```bash
ollama run llama3:8b
```

Je kunt nu chatten! Type je vraag en druk Enter.

## Stap 4: Integreer met je apps

Ollama draait een lokale API op `localhost:11434`. Veel apps ondersteunen dit:

- **Raycast**: AI Commands extensie
- **Continue**: VS Code extensie
- **Open WebUI**: Web interface

## Performance tips

1. Sluit zware apps tijdens het draaien
2. Gebruik quantized modellen voor snelheid
3. Apple Silicon's unified memory is je vriend

## Conclusie

Met Ollama heb je binnen minuten een krachtige AI-assistent die volledig lokaal draait. Experimenteer met verschillende modellen om te vinden wat het beste werkt voor jouw use case.
