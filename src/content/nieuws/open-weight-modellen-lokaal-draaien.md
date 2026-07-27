---
title: "De beste open-weight AI-modellen van deze zomer: wat je lokaal draait en wanneer"
description: "GLM-5.2, DeepSeek V4, Gemma 4, Mistral Small 4 — de open-weight lichting van juni 2026 is sterk. Welk model kies je voor welke taak, en hoe draai je ze via Ollama?"
publishedAt: 2026-07-02
updatedAt: 2026-07-02
author: "Redactie"
category: "gids"
tags:
  - "open-weight"
  - "lokale-ai"
  - "ollama"
  - "glm"
  - "deepseek"
  - "gemma"
  - "privacy"
toolSlug: "ollama"
featured: false
draft: false
readingTime: 5
heroImage: "/images/articles/diorama-open-weight-modellen-lokaal-draaien.webp"
heroImageAlt: "Miniatuur diorama-illustratie bij artikel 'De beste open-weight AI-modellen van deze zomer: wat je lokaal draait en wanneer'"
heroScene: "A miniature wooden workbench with rows of small brass weights in open display cases, a tiny home computer tower beside them glowing softly"
keyTakeaways:
  - "Open-weight modellen draai je lokaal: je data blijft op je eigen machine en je betaalt geen token-kosten per vraag."
  - "GLM-5.2 (MIT-licentie, weights sinds 16 juni) is de nieuwe nummer 1 open-weight op de Artificial Analysis Intelligence Index, vóór MiniMax-M3 en DeepSeek V4 Pro."
  - "Voor gewone hardware zijn Gemma 4 26B A4B (MoE: 4 miljard actieve parameters, 256K context) en Mistral Small 4 de meest praktische keuze."
  - "Via Ollama installeer je elk van deze modellen met één commando en draai je ze via een lokale API of directe chat."
faq:
  - q: "Wat is een open-weight AI-model?"
    a: "Een open-weight model is een AI-model waarvan de gewichten — de geleerde parameters — publiek beschikbaar zijn. Je kunt het downloaden en lokaal draaien, zonder dat je data naar een externe server stuurt. Het verschilt van volledig open source: de trainingscode en -data worden vaak niet vrijgegeven, de gewichten zelf wel."
  - q: "Kan ik een open-weight model op mijn eigen laptop draaien?"
    a: "Dat hangt af van model en hardware. Kleine en MoE-modellen (zoals Gemma 4 12B of 26B A4B) draaien op een moderne laptop met 16-32 GB RAM. Giganten zoals GLM-5.2 (~750 miljard parameters) hebben een server of GPU-cluster nodig. Via Ollama test je eenvoudig wat op jouw machine past."
  - q: "Zijn open-weight modellen net zo goed als Claude of GPT-5?"
    a: "Op specifieke taken komen de beste open-weight modellen dicht in de buurt — GLM-5.2 scoort 51 op de Artificial Analysis Intelligence Index en won zelfs een security-benchmark van Claude Code. Maar voor de meest complexe redeneertaken en lange context met veel detail hebben propriëtaire frontier-modellen doorgaans nog een voorsprong."
---

Anthropic-CEO Dario Amodei haalde eind juni een discussie open die op r/LocalLLaMA scherp werd ontleed: open-weight is volgens hem geen echte open source, want je kunt niet "in het model kijken". Los van die semantiek is één ding onmiskenbaar: de open-weight modellen zelf worden razendsnel beter — en juni 2026 leverde een uitzonderlijk sterke lichting op.

Dit is wat er staat, wat het verschil maakt en hoe je ze lokaal draait. Haal je een model van Hugging Face binnen, loop dan eerst onze [5 veiligheidschecks voor Hugging Face-modellen](/nieuws/huggingface-modellen-veilig-downloaden) langs — een model laden kan namelijk code op je systeem uitvoeren. En omdat niet elk trending project die aandacht waard blijft: onze analyse van [het AI-tool-kerkhof](/nieuws/ai-tool-kerkhof-github-trending) laat zien hoe je de blijvers van de eendagsvliegen onderscheidt. Dat open-source-AI ook uit eigen streek komt, zie je in ons portret van [de Nederlandse en Belgische bouwers achter trending AI](/nieuws/nederlandse-belgische-bouwers-trending-ai).

## Wat open-weight je geeft wat propriëtair niet geeft

Een model als Claude of GPT-5 draait op de servers van Anthropic of OpenAI: je data gaat naar hun systemen en je betaalt per token. Open-weight modellen werken anders. De gewichten — het "brein" van het model — download je zelf en draai je op eigen hardware. Je data verlaat je machine niet, je betaalt geen token-kosten, en finetunen op eigen data kan.

> **💡 Beginner-tip:** je hoeft geen programmeur te zijn om een lokaal model te draaien. [Ollama](/tools/ollama) (gratis, open source) regelt de installatie en start modellen met één commando. Denk eraan als een lokale ChatGPT die je zelf beheert.

## De lichting van deze zomer

**GLM-5.2** (Z.ai) is de nieuwe koploper. Sinds de release van de gewichten op 16 juni staat het bovenaan de Artificial Analysis Intelligence Index voor open-weight modellen met een score van 51 — vóór MiniMax-M3 (44), DeepSeek V4 Pro (44) en Kimi K2.6 (43) ([Bron: Artificial Analysis](https://artificialanalysis.ai/articles/glm-5-2-is-the-new-leading-open-weights-model-on-the-artificial-analysis-intelligence-index)). Het is een MoE-model van ruwweg 750 miljard parameters (±40 miljard actief per token), MIT-gelicentieerd, met een contextvenster van 1 miljoen tokens. De keerzijde: lokaal draaien vraagt serieuze hardware; voor de meeste mensen is dit een API-model.

**MiniMax M3** (juni 2026) combineert een 1-miljoen-token contextvenster met native multimodaliteit — handig voor grote documentensets of beeld-plus-tekst-analyse.

**DeepSeek V4** (april 2026) biedt eveneens 1 miljoen tokens context onder MIT-licentie. De Pro-variant is enorm op papier, maar activeert per berekening maar een fractie van zijn parameters — efficiënter dan de grootte doet vermoeden.

**Voor gewone hardware** zijn twee opties het meest praktisch:

- **Gemma 4 26B A4B** (Google) is een MoE-model dat per token maar 4 miljard parameters activeert — snel op consumentenhardware, met een 256K-token contextvenster ([Bron: Google AI for Developers](https://ai.google.dev/gemma/docs/core)). Prima voor dagelijks tekstwerk. De kleinere 12B is er voor wie minder RAM heeft.
- **Mistral Small 4** — compact, vlot, sterk in instructievolging. De voorkeurskeuze voor productie-achtige setups zonder GPU-overhead.

## Lokaal draaien via Ollama

Installeer Ollama via `ollama.com` — stap voor stap in onze [Ollama-installatiegids](/nieuws/ollama-lokale-ai-modellen-draaien) — open een terminal en typ:

```bash
ollama run gemma4
```

Ollama downloadt het model automatisch en start een lokale chat. Je kunt ook de lokale API aanroepen op `localhost:11434` — compatibel met de OpenAI API-structuur, waardoor tools die met ChatGPT werken direct kunnen overschakelen naar je lokale model.

Draait je eerste model, dan is de volgende trede een heel agent-team op je eigen machine: [multi-agent AI lokaal bouwen met Ollama](/nieuws/ollama-multi-agent-lokaal-bouwen). Met `ollama list` zie je welke modellen je hebt; `ollama rm <naam>` verwijdert ze. Downloadgroottes lopen van ~2 GB (kleine modellen) tot honderden GB's voor de grootste varianten — check [ollama.com/library](https://ollama.com/library) voor de exacte grootte en beschikbare varianten per model.

> **⚡ Gevorderden:** liever een grafische interface dan de terminal? [LM Studio](/tools/lm-studio) doet hetzelfde werk met een GUI, inclusief GGUF-checkpoints voor de Gemma 4-familie. Voor wie wil begrijpen wat er onder de motorkap gebeurt: de uitleg [hoe een taalmodel van binnen werkt](https://hetlaatsteainieuws.nl/achtergrond/hoe-werkt-een-taalmodel-llm-uitleg-pytorch) op hetlaatsteainieuws.nl legt de basis.

## Wanneer open-weight, wanneer propriëtair?

Open-weight loont bij **privacy-gevoelige data** (documenten die je niet wilt uploaden), **kostenbeheer** (veel queries die via een API duur worden) en **offline gebruik**. Wil je zo'n lokaal model vragen laten beantwoorden over je eigen documenten, dan koppel je het via RAG — bijvoorbeeld [met LlamaIndex](/nieuws/llamaindex-rag-eigen-documenten). Propriëtaire modellen zoals Claude blijven sterker bij complexe meerstaps-redenering en taken waar je de allerbeste kwaliteit nodig hebt zonder tijd om te testen en finetunen.

De slimme aanpak: lokale modellen voor routinetaken, propriëtaire modellen voor het werk waar dat laatste beetje kwaliteit telt. Wil je scherper kiezen tussen al die modellen, dan helpt het te snappen welke architectuur eronder zit — ons mentale model van [CNN's, RNN's en transformers](/nieuws/cnn-rnn-transformers-huggingface-uitleg) geeft je dat kader.

## Checklist: ben je klaar?

- [ ] Ollama geïnstalleerd via ollama.com
- [ ] Eerste model gedownload (`ollama run gemma4`)
- [ ] Getest of je hardware het model vlot draait (anders: kleinere variant)
- [ ] Lokale API geprobeerd op `localhost:11434` als je tools wilt koppelen
- [ ] Bepaald welke taken lokaal blijven en welke naar een cloud-model gaan

## Bronnen

- [Artificial Analysis — GLM-5.2 is the new leading open weights model](https://artificialanalysis.ai/articles/glm-5-2-is-the-new-leading-open-weights-model-on-the-artificial-analysis-intelligence-index)
- [Google AI for Developers — Gemma 4 model overview](https://ai.google.dev/gemma/docs/core)
- [OpenRouter — The Open Weight Models that Matter: June 2026](https://openrouter.ai/blog/insights/the-open-weight-models-that-matter-june-2026/)
- [Ollama — modellen-bibliotheek](https://ollama.com/library)
