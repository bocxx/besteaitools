---
title: "Je eerste AI-agent bouwen met Microsoft Foundry: zo begin je in 5 stappen"
description: "Microsoft Foundry Agent Service maakt van een losse LLM-aanroep een agent die redeneert en tools gebruikt. Zo zet je er als .NET- of Python-bouwer je eerste op."
publishedAt: 2026-07-20
updatedAt: 2026-07-20
author: "Redactie"
category: "gids"
tags:
  - "microsoft-foundry"
  - "azure"
  - "ai-agents"
  - "agent-service"
  - "dotnet"
  - "microsoft"
toolSlug: "microsoft-foundry"
featured: false
draft: false
readingTime: 5
heroImage: "/images/articles/diorama-microsoft-foundry-eerste-ai-agent-bouwen.webp"
heroImageAlt: "Miniatuur diorama-illustratie bij artikel 'Je eerste AI-agent bouwen met Microsoft Foundry: zo begin je in 5 stappen'"
heroScene: "A tiny workbench diorama where a small robot arm picks tools from a labelled rack — a magnifier, a wrench, a folder — while a miniature cloud-shaped cabinet hums behind it"
keyTakeaways:
  - "Foundry Agent Service is een beheerde clouddienst die de redeneer-lus, tool-aanroepen en het gespreksgeheugen van je agent afhandelt."
  - "Er zijn officiële SDK's voor Python, C# en TypeScript; voor .NET-bouwers is dit de kortste route naar een werkende agent."
  - "Microsoft rekent geen aparte kosten voor het draaien van Foundry-native agents: je betaalt tokenverbruik plus losse tools en Azure-resources."
  - "Begin met één agent, één tool en een budgetalert — tokenverbruik loopt vooral op bij agents die in een tool-lus blijven hangen."
faq:
  - q: "Wat is Microsoft Foundry Agent Service precies?"
    a: "Foundry Agent Service is de beheerde agent-laag van Microsoft Foundry (tot eind 2025 Azure AI Foundry). In plaats van zelf een loop te bouwen die een taalmodel aanroept, tool-resultaten terugvoert en state bijhoudt, definieer jij alleen het model, de instructies en de tools. De dienst regelt de uitvoering, het gespreksgeheugen en de tracing. Er zijn SDK's voor Python, C# en TypeScript."
  - q: "Wat kost het bouwen van een agent in Microsoft Foundry?"
    a: "Microsoft rekent geen aparte kosten voor het aanmaken of draaien van Foundry-native agents. Je betaalt het tokenverbruik van het model dat je agent gebruikt, plus eventuele losse Foundry Tools, IQ-connecties en Azure-resources zoals opslag of zoekindexen. Modelprijzen verschillen sterk per model, dus check de actuele Azure-prijspagina. Zet in elk geval een budgetalert in je Azure-abonnement voordat je gaat testen."
  - q: "Heb ik een Azure-abonnement nodig voor Foundry Agent Service?"
    a: "Ja. Foundry draait op Azure, dus je hebt een Azure-account nodig en je maakt een Foundry-project aan in de portal. Nieuwe Azure-accounts krijgen doorgaans starttegoed, wat voor de eerste agent-experimenten ruimschoots volstaat. Zonder Azure-account kun je de concepten wel verkennen via de gratis workshops en de lessenreeks AI Agents for Beginners van Microsoft."
  - q: "Wat is het verschil tussen Foundry Agent Service en het Microsoft Agent Framework?"
    a: "Agent Service is de beheerde clouddienst: jouw agent draait bij Microsoft en jij praat ertegen via de SDK. Het Microsoft Agent Framework is een open-source SDK waarmee je agents in je eigen .NET- of Python-code orkestreert, en die Foundry desgewenst als backend gebruikt. Het framework brengt Semantic Kernel en AutoGen samen en zit in public preview. Beginnen doe je het makkelijkst met Agent Service; het framework wordt interessant zodra je meerdere agents wilt laten samenwerken."
---

Een taalmodel aanroepen kan inmiddels iedereen. Het interessante begint zodra dat model zelf tools gebruikt: documenten doorzoeken, code draaien, een API bevragen. Precies dat bouwwerk neemt Microsoft Foundry Agent Service je uit handen. Deze gids zet je in vijf stappen van niets naar een werkende eerste agent.

## Stap 1: maak een Foundry-project aan

Log in op de Azure-portal en maak een Microsoft Foundry-project aan. De dienst heette tot eind 2025 Azure AI Foundry, dus oudere tutorials gebruiken die naam nog. Een project bundelt je modellen, agents en instellingen op één plek. Kies bij het aanmaken een regio dicht bij je gebruikers en deploy vervolgens een model in het project, want zonder gedeployed model heeft je agent straks geen brein ([Bron: Microsoft Learn](https://learn.microsoft.com/en-us/azure/foundry/agents/overview)).

## Stap 2: installeer de SDK

Foundry Agent Service heeft officiële SDK's voor Python, C# en TypeScript ([Bron: Microsoft Azure](https://azure.microsoft.com/en-us/products/ai-foundry/agent-service/)). Voor .NET voeg je de pakketten toe met de dotnet-CLI:

```bash
dotnet add package Azure.AI.Projects
dotnet add package Azure.Identity
```

Authenticatie loopt via `DefaultAzureCredential` uit Azure.Identity: lokaal gebruikt die je Azure CLI-login, in productie een managed identity. Zo houd je API-sleutels uit je code.

> **💡 Beginner-tip:** geen .NET-achtergrond? Dezelfde stappen werken één-op-één in Python. Wil je eerst zien waar je aan begint: Microsoft heeft een gratis workshop "Build your code-first agent" en een twaalfdelige lessenreeks AI Agents for Beginners.

## Stap 3: definieer je agent

Een agent bestaat uit drie dingen: een model, instructies en tools. In code maak je via de projectclient een agent aan met een naam, het gedeployde model en een systeeminstructie ("Je bent een assistent die vragen over onze productdocumentatie beantwoordt"). Tools voeg je toe als capabilities: kant-en-klare opties zoals file search en code interpreter, of je eigen functions.

Begin klein: één tool, één duidelijke taak. Een agent die één ding goed doet, is meer waard dan een alleskunner die halverwege de mist ingaat. Datzelfde principe zie je terug in [Claude Managed Agents instellen](/nieuws/claude-managed-agents-bouwen).

## Stap 4: start een thread en test

Gesprekken met een agent lopen via threads: je maakt een thread aan, voegt een gebruikersbericht toe en start een run. De dienst handelt de hele redeneer-lus af, inclusief tool-aanroepen, en geeft je het eindantwoord terug. Test in de Foundry-portal met de ingebouwde playground voordat je ook maar één regel frontend schrijft. Daar zie je per run precies welke tools de agent aanriep en waarom.

## Stap 5: bewaak kosten en gedrag

Er is geen aparte agent-fee: je betaalt het tokenverbruik van het onderliggende model plus je Azure-resources. Zet dus een budgetalert en bekijk de tracing van je runs. Let vooral op agents die in een tool-lus blijven hangen, want daar loopt tokenverbruik stilletjes op. Wil je eerst snappen wat er in zo'n agent-loop gebeurt vóór je hem laat hosten, dan is [je eerste AI-agent bouwen in Python](/nieuws/eerste-ai-agent-bouwen-python) de kale variant om mee te beginnen.

> **⚡ Gevorderden:** wil je meerdere agents laten samenwerken of zelf de orkestratie in handen houden, kijk dan naar het Microsoft Agent Framework, de open-source opvolger die Semantic Kernel en AutoGen samenbrengt. Dat zit op moment van schrijven in public preview, dus reken op API-wijzigingen ([Bron: Microsoft DevBlogs](https://devblogs.microsoft.com/foundry/agent-service-build2026/)).

## Checklist: ben je klaar?

- [ ] Azure-account aangemaakt en budgetalert ingesteld
- [ ] Foundry-project aangemaakt en een model gedeployed
- [ ] SDK geïnstalleerd (Python, C# of TypeScript)
- [ ] Agent gedefinieerd met één duidelijke taak en maximaal één tool
- [ ] Getest in de playground en de tracing per run bekeken
- [ ] Kosten na de eerste testdag gecontroleerd

Draai je liever met Claude binnen dezelfde Azure-omgeving? Dat kan sinds kort ook: zie [Claude in Microsoft Foundry](/nieuws/claude-microsoft-foundry-azure-beschikbaar). En wie de bredere vraag heeft wat AI-agents in het Nederlandse bedrijfsleven doen, leest verder bij [hetlaatsteainieuws.nl](https://hetlaatsteainieuws.nl/nieuws/ai-agents-2026-wat-zijn-ze).

## Bronnen

- [Microsoft Learn — What is Microsoft Foundry Agent Service?](https://learn.microsoft.com/en-us/azure/foundry/agents/overview)
- [Microsoft Azure — Foundry Agent Service (product- en prijspagina)](https://azure.microsoft.com/en-us/products/ai-foundry/agent-service/)
- [Microsoft DevBlogs — Build and run agents at scale with Microsoft Foundry (Build 2026)](https://devblogs.microsoft.com/foundry/agent-service-build2026/)
