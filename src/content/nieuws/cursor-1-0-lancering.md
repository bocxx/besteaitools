---
title: "Cursor 1.0 officieel gelanceerd: de AI-code-editor is volwassen geworden"
heroImageAlt: "Miniatuur diorama-illustratie bij artikel 'Cursor 1.0 officieel gelanceerd: de AI-code-editor is volwassen geworden'"
description: "Na maanden van bèta lanceert Cursor versie 1.0 met verbeterde agentic mode, achtergrondagenten en een vernieuwd geheugen- en regelsysteem."
publishedAt: 2026-04-17
author: "Redactie"
category: "lancering"
tags:
  - "cursor"
  - "coding"
  - "ai-editors"
  - "lancering"
toolSlug: "cursor"
featured: true
readingTime: 4
keyTakeaways:
  - "Cursor 1.0 brengt stabiele agentic mode: de editor kan zelfstandig taken uitvoeren over meerdere bestanden."
  - "BugBot scant automatisch pull requests op bugs en suggereert fixes direct in GitHub."
  - "Background agents draaien los van je sessie — je kunt meerdere taken parallel laten lopen."
  - "Memories-systeem laat Cursor leren van jouw codebase en eerdere beslissingen."
  - "Business-plan biedt nu SOC 2 Type II compliance en zero-data-retention modus."
faq:
  - q: "Wat is er nieuw in Cursor 1.0 ten opzichte van de bèta?"
    a: "De agentic mode is stabiel verklaard, er is BugBot voor PR-reviews, background agents voor parallel werk, en een verbeterd geheugen- en regelsysteem."
  - q: "Is Cursor 1.0 gratis te gebruiken?"
    a: "Er is een gratis tier met beperkte AI-verzoeken. De Pro-versie kost $20 per maand en geeft onbeperkte snelle verzoeken."
  - q: "Werkt Cursor ook in bestaande projecten?"
    a: "Ja, Cursor is gebouwd op VS Code en opent elk bestaand project direct. Je bestaande extensies blijven werken."
heroImage: "/images/articles/diorama-cursor-1-0-lancering.webp"
---

## Wat is er nieuw in Cursor 1.0?

Cursor, de AI-first code-editor die is gebouwd op VS Code, heeft versie 1.0 uitgebracht. Na meer dan een jaar van snelle iteraties markeert deze release een stabiel fundament voor professioneel gebruik.

De meest opvallende toevoeging is de **agentic mode**: de editor kan nu zelfstandig meerdere stappen uitvoeren, bestanden aanmaken en aanpassen, en terminalopdrachten uitvoeren — zonder dat je elke stap handmatig goedkeurt. In de bèta was dit nog experimenteel; 1.0 maakt het een eerste-klasburger.

Hetzelfde agent-principe zie je nu ook bij Anthropic opduiken — voor niet-developers — in [Claude Cowork](/nieuws/claude-cowork-lancering), waar Claude in een desktop-app bestanden beheert en shell-commando's uitvoert zonder terminal. Cursor blijft voorlopig de scherpere keuze voor wie echt dagelijks codeert; Cowork richt zich juist op kenniswerkers buiten de engineering-stoel. Wie wil zien hoe je Cowork in één werkdag goed inricht, kan onze gids [Claude in één dag instellen](/nieuws/claude-instellen-1-dag-6-tools) erbij pakken.

### BugBot

BugBot koppelt direct aan GitHub. Wanneer je een pull request opent, scant BugBot de diff automatisch op logicafouten, potentiële crashes en veelgemaakte fouten. De suggesties verschijnen als comments in de PR — net als een collega-reviewer, maar dan sneller.

### Background agents

Je kunt nu meerdere taken tegelijk laten lopen. Een background agent refactort een module terwijl jij een nieuwe feature schrijft. Taken lopen voort zelfs als je Cursor sluit.

### Memories en regels

Het memories-systeem slaat beslissingen op die je eerder hebt genomen — welke patroon je prefereert voor API-calls, welke naamgeving je hanteert. Bij vergelijkbare situaties past Cursor die keuzes automatisch toe.

## Is het de moeite waard?

Voor ontwikkelaars die al met AI-assistenten werken is Cursor 1.0 een stevige upgrade. De agentic mode vermindert het aantal klikken voor complexe refactors aanzienlijk. BugBot is handig als je in een team werkt zonder formele code-reviewprocessen.

Het nadeel blijft de prijs: $20/maand voor Pro is niet goedkoop als je ook al betaalt voor GitHub Copilot of Windsurf. Maar als AI-assisted coding centraal staat in je workflow, is Cursor 1.0 momenteel de meest complete optie. Wil je je agent-stack uitbreiden zonder per service een aparte integratie te bouwen? Lees [hoe zero.xyz Claude Code en vergelijkbare CLI-agents toegang geeft tot ~8.000 tools](/nieuws/zero-xyz-agent-tool-gateway). En voor wie security-tests in z'n development-flow wil bouwen: [Strix is een open-source AI-pentester](/nieuws/strix-open-source-ai-pentester) die proofs-of-concept levert voor gevonden kwetsbaarheden.
