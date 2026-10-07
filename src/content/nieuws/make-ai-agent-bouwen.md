---
title: "Make AI-agent bouwen: je eerste agent in de Scenario Builder"
description: "Zo bouw je zonder code je eerste AI-agent in Make: trigger, agent-module, instructies, tools en kennis, testen via chat en Reasoning, en daarna aanzetten."
publishedAt: 2026-10-07
updatedAt: 2026-10-07
author: "Redactie"
category: "gids"
tags:
  - "make"
  - "ai-agents"
  - "automatisering"
  - "no-code"
  - "mcp"
toolSlug: "make"
featured: false
draft: false
readingTime: 6
heroImage: "/images/articles/diorama-make-ai-agent-bouwen.webp"
heroImageAlt: "Miniatuur diorama-illustratie bij artikel 'Make AI-agent bouwen: je eerste agent in de Scenario Builder'"
heroScene: "A small robot on a workbench connecting colored pipes between tiny app buildings arranged on a large canvas board"
evergreen: true
volatility: high
factsCheckedAt: 2026-10-07
watch:
  - "make-ai-agents"
  - "make-pricing"
keyTakeaways:
  - "Een Make AI-agent is een module (Run an agent) in een gewoon scenario: je bouwt, test en debugt hem op hetzelfde canvas als je andere automatiseringen."
  - "Je configureert vier dingen: een AI-connectie, een model, de Instructions (rol, doel, grenzen) en de Input die de agent per run krijgt."
  - "Tools komen in vier smaken: losse app-modules, complete scenario's, MCP-tools en één niveau sub-agents. Begin met één of twee."
  - "Testen doe je via Chat met de agent; de Reasoning-weergave laat stap voor stap zien welke tool hij koos en waarom."
  - "Op het gratis plan werk je alleen met Make's eigen AI Provider; een eigen OpenAI- of Anthropic-sleutel koppelen kan op betaalde plannen."
faq:
  - q: "Wat is het verschil tussen een Make-scenario en een Make AI-agent?"
    a: "Een scenario volgt altijd exact de route die jij hebt uitgetekend, module voor module. Een agent krijgt een doel, instructies en een set tools, en beslist zelf welke tool hij wanneer inzet. Make raadt een agent aan voor taken met wisselende input en oordeelsvermogen, zoals tickets categoriseren. Voor vaste logica, zoals data synchroniseren of orders verwerken, blijft een gewoon scenario de betere keuze: goedkoper en voorspelbaarder."
  - q: "Kan ik een Make AI-agent gratis gebruiken?"
    a: "Ja, de agent-module zit ook op het gratis plan, maar dan alleen met Make's eigen AI Provider. Een eigen connectie met bijvoorbeeld OpenAI of Anthropic vereist een betaald plan. Elke run verbruikt credits, en bij Make's AI Provider hangt dat af van het aantal tokens. Actuele plannen en bedragen staan in de Stand van zaken onderaan dit artikel."
  - q: "Welke tools kan een Make AI-agent gebruiken?"
    a: "Vier soorten. Losse modules uit Make's app-catalogus, bijvoorbeeld een Gmail- of Google Sheets-actie. Complete scenario's die de agent als één actie aanroept via Call a scenario. Tools van een MCP-server. En een andere agent als sub-agent, waarbij nesten beperkt is tot één niveau. Elke tool krijgt een naam en beschrijving; daarop baseert de agent zijn keuze, dus schrijf die beschrijving concreet."
  - q: "Hoe zie ik waarom mijn Make-agent een bepaalde keuze maakt?"
    a: "Chat met de agent vanuit de builder en bekijk de redenering die Make naast het antwoord toont. Na een echte run open je via History de details van de run en kies je de Reasoning-tab; onder Output vind je bij Metadata ook de uitgevoerde stappen. Kiest de agent de verkeerde tool, dan zit het meestal in vage Instructions of een te algemene toolbeschrijving."
  - q: "Kan een Make AI-agent dingen onthouden tussen runs?"
    a: "Ja, via het veld Conversation ID in de module. Vul je daar een vaste waarde in, bijvoorbeeld een klant-ID, dan bewaart Make de gespreksgeschiedenis per ID. Laat je het leeg, dan begint elke run blanco. Voor langere-termijngeheugen, zoals klantvoorkeuren, kun je data stores combineren met de agent."
sources:
  - label: "Make Help Center — Create your first AI agent"
    url: "https://help.make.com/create-your-first-ai-agent"
  - label: "Make Help Center — Introduction to Make AI Agent (New)"
    url: "https://help.make.com/introduction-to-make-ai-agent-new"
  - label: "Make Help Center — Meet the new Make AI Agents app"
    url: "https://help.make.com/meet-the-new-make-ai-agents-app"
  - label: "Make Help Center — Tools for AI agents"
    url: "https://help.make.com/tools-for-ai-agents"
  - label: "Make — AI Agents"
    url: "https://www.make.com/en/ai-agents"
  - label: "Make — Pricing"
    url: "https://www.make.com/en/pricing"
  - label: "Make — Credits"
    url: "https://www.make.com/en/credits"
---

Een AI-agent in [Make](/ai-tools/make) is geen apart product met eigen schermen, maar een module in een gewoon scenario. Je zet hem op het canvas, geeft hem instructies en gereedschap, en hangt hem achter een trigger zoals elke andere automatisering ([Bron: Make Help Center](https://help.make.com/create-your-first-ai-agent)). Deze gids loopt de route door van leeg scenario tot een agent die zelfstandig draait.

## Agent of gewoon scenario?

Eerst de vraag of je wel een agent nodig hebt. Make maakt zelf een driedeling: een standaard scenario voor vaste logica die altijd hetzelfde oplevert (orders verwerken, data synchroniseren), een AI-app voor voorspelbare AI-taken met vaste in- en output (vertalen, samenvatten), en een agent voor taken met wisselende input waar oordeelsvermogen nodig is, zoals tickets categoriseren of sollicitanten screenen ([Bron: Make Help Center](https://help.make.com/introduction-to-make-ai-agent-new)).

Dat onderscheid scheelt geld en frustratie. Een agent die elke keer opnieuw moet bedenken dat een formulier in een spreadsheet hoort, is een dure omweg voor iets wat [je eerste Make-automatisering](https://www.aiplatformmkb.nl/gidsen/eerste-automatisering-met-make-mkb) ook zonder AI doet. Twijfel je nog tussen Make, Zapier en n8n, lees dan eerst [automatiseren met AI: je eerste workflow](/nieuws/automatiseren-met-ai-make-zapier-n8n).

## Stap 1: scenario en trigger

Bepaal vooraf drie dingen: wat de agent moet doen, welke tools en kennis hij daarvoor nodig heeft, en wat hem start. Klik daarna op `Create scenario`, klik op de grote plus en kies je trigger-app en -module, bijvoorbeeld Google Sheets met `Search Rows` of een module die op wijzigingen let. Via het klokicoon op de module stel je in de `Schedule settings` in hoe vaak het scenario draait ([Bron: Make Help Center](https://help.make.com/create-your-first-ai-agent)).

## Stap 2: de agent toevoegen en configureren

Klik op de plus rechts van je laatste module, zoek **Make AI Agent (New)** en kies **Run an agent**. In de module-instellingen vul je vier dingen in ([Bron: Make Help Center](https://help.make.com/create-your-first-ai-agent)):

- **Connection**: de AI-provider. Op het gratis plan is dat Make's eigen AI Provider; op betaalde plannen kun je ook een eigen OpenAI- of Anthropic-sleutel koppelen.
- **Model**: kies uit de dropdown.
- **Instructions**: de rol, het gedrag, het doel en de stappen van de agent, in gewone taal.
- **Input**: het verzoek of de gemapte data uit je trigger, zoals de tekst van de binnengekomen mail.

De Instructions bepalen het grootste deel van het gedrag. Wees concreet over wat de agent níét mag, bijvoorbeeld "verstuur nooit zelf een mail, maak alleen een concept". Hoe je zo'n instructie opbouwt, staat in [betere prompts voor AI-agents in Make](/nieuws/betere-prompts-ai-agents-make).

Er is ook een veld **Conversation ID**. Vul je daar een vaste waarde in, dan onthoudt de agent eerdere gesprekken met dezelfde ID; leeg betekent elke run blanco ([Bron: Make Help Center](https://help.make.com/create-your-first-ai-agent)). Wil je verder gaan dan gespreksgeschiedenis, lees dan [zo geef je een Make AI-agent geheugen](/nieuws/make-ai-agent-memory-bouwen).

## Stap 3: tools en kennis

Beweeg over de plus van de agent-module en kies **Add tool** of **Add MCP**. Een agent kan vier soorten gereedschap krijgen: een losse module uit een app, een compleet scenario via **Call a scenario**, tools van een MCP-server, en een andere agent als sub-agent, met nesten tot één niveau diep ([Bron: Make Help Center](https://help.make.com/create-your-first-ai-agent)). Een scenario dat data teruggeeft, moet eindigen met **Return outputs**.

> **💡 Beginner-tip:** begin met één of twee tools, niet met tien. Hoe kleiner de gereedschapskist, hoe voorspelbaarder de agent. Geef elke tool een beschrijving die zegt wanneer hij gebruikt moet worden; daarop baseert de agent zijn keuze.

Via dezelfde plus kies je **Knowledge** om bestanden te uploaden, zoals een prijslijst of FAQ. Make noemt JSON, TXT, CSV en PDF als ondersteunde formaten, en het uploaden zelf kost tokens voor de omzetting ([Bron: Make Help Center](https://help.make.com/create-your-first-ai-agent)).

## Stap 4: testen met Chat en Reasoning

Rechtsklik op de module en kies **Chat with Agent**. Stuur een realistisch verzoek, kijk welke tools hij aanroept, pas de instellingen aan en herhaal. De redenering van de agent zie je stap voor stap in het Reasoning-paneel op het canvas ([Bron: Make](https://www.make.com/en/ai-agents)). Wil je een tool tijdelijk uitsluiten, rechtsklik dan op de route en kies **Disable tool**.

Na echte runs open je via **History** de details van een run. Op de **Reasoning**-tab lees je waarom de agent koos wat hij koos; onder **Output** staan bij **Metadata** de uitgevoerde stappen ([Bron: Make Help Center](https://help.make.com/create-your-first-ai-agent)).

Neemt een agent de verkeerde afslag, kijk dan eerst naar je Instructions en toolbeschrijvingen voordat je een ander model probeert: een beschrijving van vier woorden geeft de agent weinig om op te kiezen.

## Stap 5: aanzetten en in de gaten houden

Klopt het gedrag, sla het scenario op en zet het aan; de trigger uit stap 1 bepaalt vanaf dan wanneer de agent draait. Houd de eerste dagen je creditverbruik in de gaten: met Make's AI Provider rekent Make agent-runs af op basis van verbruikte tokens, en meerdere MCP-servers en tools verhogen dat verbruik ([Bron: Make](https://www.make.com/en/credits)).

> **⚡ Gevorderden:** wil je agents die je in code versioniert en test, dan is een code-first framework zoals [CrewAI](/ai-tools/crewai) het logische alternatief. Wil je eerst scherp hebben wat agents wel en niet kunnen, lees dan [AI-agents: wat zijn ze en wat kun je er echt mee?](https://www.hetlaatsteainieuws.nl/achtergrond/ai-agents-2026-wat-zijn-ze) op hetlaatsteainieuws.nl.

Zoek je een platform waarop het mkb zonder code agents bouwt en wil je Make naast alternatieven zien, dan helpt het overzicht [AI-agent maken zonder programmeren](https://www.aiplatformmkb.nl/tools/ai-agent-maken-zonder-programmeren).

## Stand van zaken — bijgewerkt 2026-10-07

Alles hierboven blijft staan zolang Make de agent als scenario-module aanbiedt. De status, plannen en bedragen hieronder zijn de bederfelijke laag.

| Onderwerp | Stand |
| --- | --- |
| Status agent-app | Make AI Agent (New) is open beta; functies en prijzen kunnen veranderen ([Bron: Make Help Center](https://help.make.com/introduction-to-make-ai-agent-new)) |
| Beschikbaarheid | Alle plannen met Make's AI Provider; eigen AI-connectie alleen op betaalde plannen |
| Gratis plan | $0, 1.000 credits per maand ([Bron: Make](https://www.make.com/en/pricing)) |
| Core / Pro / Teams | $12 / $21 / $38 per maand bij maandelijkse betaling voor 10.000 credits; jaarlijks betalen scheelt volgens Make 15% of meer |
| Facturering | Credits vervingen operations per 27 augustus 2025 (1 operation = 1 credit); AI-functies via Make's AI Provider kosten credits op basis van tokens |
| Stap-timeout agent | Standaard 300 seconden, instelbaar onder Advanced settings |

## Checklist: ben je klaar?

- [ ] Bepaald of je echt een agent nodig hebt, of dat een gewoon scenario volstaat
- [ ] Scenario met trigger en schema aangemaakt
- [ ] Run an agent toegevoegd met connectie, model, Instructions en Input
- [ ] Eén of twee tools gekoppeld, elk met een concrete beschrijving
- [ ] Eventuele kennisbestanden geüpload
- [ ] Getest via Chat with Agent en de Reasoning gelezen
- [ ] Scenario opgeslagen en aangezet
- [ ] Creditverbruik na de eerste dagen gecontroleerd
