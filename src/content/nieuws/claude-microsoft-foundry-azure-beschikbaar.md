---
title: "Claude in Microsoft Foundry: nu beschikbaar op Azure zonder apart Anthropic-account"
description: "Claude Opus 4.8 en Haiku 4.5 zijn vanaf 29 juni algemeen beschikbaar in Microsoft Foundry. Gebruik Claude via je bestaande Azure-omgeving — met dezelfde authenticatie, facturering en compliance."
publishedAt: 2026-06-30
updatedAt: 2026-06-30
author: "Redactie"
category: "gids"
tags:
  - "claude"
  - "anthropic"
  - "microsoft"
  - "azure"
  - "enterprise"
  - "foundry"
  - "integratie"
toolSlug: "claude"
featured: false
readingTime: 3
keyTakeaways:
  - "Claude Opus 4.8 en Haiku 4.5 zijn nu algemeen beschikbaar in Microsoft Foundry op Azure — geen apart Anthropic-account nodig."
  - "Je gebruikt bestaande Azure-authenticatie (Entra ID), facturering en governance-instellingen."
  - "Optioneel: verwerk data in een VS-datazone voor teams met strenge data-residentievereisten."
  - "Beschikbaar via de Messages API met prompt caching en extended thinking."
faq:
  - q: "Wat is Microsoft Foundry?"
    a: "Microsoft Foundry is het AI-modelplatform binnen Azure. Je kiest een model — van OpenAI, Anthropic, Meta of anderen — en roept het aan via een uniforme API, met Azure-facturering en -compliance."
  - q: "Welke Claude-modellen zijn beschikbaar?"
    a: "Claude Opus 4.8 (meest capabel, voor complexe taken) en Claude Haiku 4.5 (snel en goedkoop, voor hoge volumes). Beide ondersteunen prompt caching en extended thinking via de Messages API."
  - q: "Heb ik een Anthropic-account nodig?"
    a: "Nee. Je beheert alles via je bestaande Azure-account. De kosten lopen via je Azure-factuur."
---

Anthropic's Claude is vanaf 29 juni 2026 officieel algemeen beschikbaar in **Microsoft Foundry**, het AI-modelplatform van Azure. Gebruik je al Microsoft 365, Azure of Copilot Studio? Dan kun je Claude nu integreren zonder een apart account bij Anthropic aan te maken.

## Wat verandert er concreet?

Tot nu toe moest je voor Claude ofwel via claude.ai, de Anthropic API, Amazon Bedrock of Google Vertex AI werken. Met de integratie in Microsoft Foundry komt er een vierde Azure-native optie bij.

Dat betekent:

- **Één factuur**: Claude-gebruik loopt via je bestaande Azure-abonnement
- **Bestaande authenticatie**: Azure Entra ID werkt direct, geen aparte API-sleutels
- **Governance-instellingen**: dezelfde toegangsbeheer- en auditlogboeken als je andere Azure-diensten
- **Data-residentie**: optionele VS-datazone voor teams met compliancevereisten

## Welke modellen zijn beschikbaar?

In de Messages API zijn twee modellen beschikbaar:

**Claude Opus 4.8** — het krachtigste model in de huidige Claude-generatie. Geschikt voor complexe redeneerwerk, uitgebreide documentanalyse, coding en agentic workflows.

**Claude Haiku 4.5** — snel en kostenefficiënt. Geschikt voor hoge volumes, eenvoudigere classificatietaken of als eerste laag in een multi-model pipeline.

Beide ondersteunen **prompt caching** (tot 90% reductie op herhaalde context) en **extended thinking** (stap-voor-stap redeneren bij complexere vragen).

## Voor wie is dit interessant?

Primair voor organisaties die al stevig in het Microsoft-ecosysteem zitten: grote bedrijven, publieke instellingen en teams die hun AI-gebruik willen centraliseren onder één Azure-contract. De integratie verlaagt de drempel om Claude naast Copilot te evalueren — zonder een apart leverancierscontract.

Developers die al werken met Azure AI Studio of Copilot Studio kunnen Claude nu ook inzetten via de vertrouwde Foundry-workflow.

> **Tip**: Wil je weten of Claude beter past bij jouw use case dan GPT-modellen? Lees onze [Claude vs. ChatGPT vergelijking 2026](/nieuws/claude-vs-chatgpt-vergelijking-2026) voor een praktijkgerichte afweging.

## Aan de slag

Ga naar [Microsoft Foundry in de Azure Portal](https://ai.azure.com) en zoek op "Claude" in de modelcatalogus. Je vindt daar Opus 4.8 en Haiku 4.5. Koppel een deployment aan je project en gebruik de standaard Messages API — [dezelfde structuur als op api.anthropic.com](https://platform.claude.com/docs/en/build-with-claude/claude-in-microsoft-foundry).

Wil je binnen datzelfde Foundry-project niet alleen een model aanroepen maar een echte agent draaien, dan loopt dat via Agent Service: die route beschrijven we stap voor stap in [Je eerste AI-agent bouwen met Microsoft Foundry](/nieuws/microsoft-foundry-eerste-ai-agent-bouwen).

Meer weten over Claude zelf? Zie het [Claude-overzicht op debesteaitools.nl](/tools/claude).
