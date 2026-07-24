---
title: "Claude Cowork voor Excel: een complete spreadsheet in vijf stappen"
heroImageAlt: "Miniatuur diorama-illustratie bij artikel 'Claude Cowork voor Excel: een complete spreadsheet in vijf stappen'"
description: "Met Claude Cowork bouw je in onder een uur een werkende Excel met meerdere tabs, formules en een dashboard. Dit is de prompt-template en workflow die wij wekelijks gebruiken — bijgewerkt voor Opus 4.8 (juni 2026)."
publishedAt: 2026-06-02
updatedAt: 2026-06-02
author: "Redactie"
category: "gids"
tags:
  - "claude"
  - "claude-cowork"
  - "excel-met-ai"
  - "spreadsheets"
  - "google-sheets"
  - "ai-workflow"
  - "opus-4-8"
toolSlug: "claude-cowork"
featured: false
draft: false
readingTime: 5
keyTakeaways:
  - "Claude Cowork bouwt sinds begin 2026 complete Excel-bestanden met meerdere tabs en werkende formules in één run — mits je een betaald Claude-account hebt (Pro, Max, Team of Enterprise)."
  - "De prompt-truc die werkt: laat Claude eerst tien aannames opsommen voordat het bouwt, zodat je vroeg corrigeert in plaats van later repareert."
  - "Met Google Drive als connector zet Cowork het resultaat direct in Google Sheets — geen handmatige upload meer."
  - "Voor edits in een bestaand .xlsx is de officiële Claude-add-in voor Microsoft 365 (sinds januari 2026 GA op alle betaalde plannen) sneller dan Cowork opnieuw starten."
  - "Het verschil tussen 'demo' en 'productie': named ranges en geen hardcoded aannames in formules. Eis dat expliciet in je prompt en je model leest later als gewone taal."
faq:
  - q: "Heb ik een betaald Claude-account nodig voor Cowork?"
    a: "Ja. Cowork is alleen beschikbaar op Pro (20 dollar per maand), Max (100 dollar), Team en Enterprise. Een gratis account ziet de Cowork-tab niet. Installeer Claude Desktop via claude.com/download — Windows kreeg Cowork-ondersteuning op 10 februari 2026. De setup van [Claude in één dag instellen](/nieuws/claude-instellen-1-dag-6-tools) loopt de eerste configuratie voor je langs."
  - q: "Welk model moet ik in Cowork selecteren voor spreadsheets?"
    a: "Sinds 28 mei 2026 is Claude Opus 4.8 de logische default — vier keer minder vaak laat hij stilletjes een formule-fout passeren dan Opus 4.7. Zet Adaptive Thinking aan voor complexe modellen met veel onderlinge afhankelijkheden tussen tabs. Sonnet 4.6 werkt ook, maar voor financiële modellen waar één foute aanname 200 cellen vergiftigt kies je Opus."
  - q: "Wat doe ik als Cowork tijdens het bouwen vastloopt?"
    a: "Geef een kort signaal: 'ga verder waar je was' of 'commit wat je hebt, ik zie de rest later'. Cowork heeft een autonome modus die meestal doorpakt, maar bij heel grote bestanden is het verstandig om elke twee tabs een tussencheck te vragen. Voor wie de Opus 4.8-hedging maximaal wil inzetten: onze [drie prompts voor de 'ik weet het niet'-modus](/nieuws/claude-opus-4-8-ik-weet-het-niet-prompts) is direct toepasbaar op spreadsheet-aannames."
  - q: "Kan ik dit ook direct binnen Excel doen in plaats van via Cowork?"
    a: "Ja. Anthropic biedt sinds januari 2026 een officiële Claude-add-in voor Excel en PowerPoint, generally available voor alle betaalde Claude-plannen. De add-in is sterker voor edits, pivot-tabel-aanpassingen en finance-specifieke formatting binnen een bestaand bestand. Cowork blijft sterker voor 'bouw vanaf nul' omdat het meerdere tabs in één run aanlegt en je via connectoren direct kunt exporteren naar Drive of OneDrive."
  - q: "Werkt deze workflow ook op een Mac met M1/M2/M3?"
    a: "Ja. Claude Desktop draait native op zowel Intel- als Apple-silicon-Macs. Voor de Cowork-shell-sandbox heb je geen Rosetta nodig; de container draait Linux ARM64. Op Windows-laptops is Cowork sinds februari 2026 algemeen beschikbaar — Linux-ondersteuning staat nog niet op de roadmap."
heroImage: "/images/nieuws/claude-cowork-excel-bouwen.webp"
---

Spreadsheets bouwen met AI was tot eind 2025 vooral teleurstellend — vage formules, kapotte tabs, één keer "wow" en daarna terug naar Excel. Vanaf het tweede kwartaal van 2026 is dat veranderd. Met [Claude Cowork](/nieuws/claude-cowork-lancering) bouw je in onder een uur een werkende .xlsx met zes tabs, dashboards en scenario-toggles. Dit is precies hoe — inclusief de prompt-truc die het verschil maakt tussen "wat staat hier nou" en "dit kan zo naar de board". Wil je geen spreadsheet maar een complete webapp bouwen zonder code? Dan is Lovable de no-code route — en als je later je eigen code wilt bezitten, lees [je Lovable-project exporteren naar GitHub](/nieuws/lovable-project-exporteren-github).

> **💡 Beginner-tip:** Test dit eerst met iets onbelangrijks — een budget voor een feestje, een boekenlijst — voordat je je financiële model erop loslaat. Je leert in een halfuur hoe Cowork reageert, en die les is veel meer waard dan de uren herwerk die je anders riskeert.

## Stap 1: Zet Claude Cowork op

Download de Claude Desktop-app via [claude.com/download](https://claude.com/download). Cowork zit alleen op betaalde plannen — Pro kost 20 dollar per maand, voldoende voor weken aan experimenten. Open de app, klik op de **Cowork**-tab bovenaan (tussen Chat en Code), en koppel een lokale map waarin Claude bestanden mag maken. Selecteer **Claude Opus 4.8** als model en zet Adaptive Thinking aan ([Bron: Anthropic Support](https://support.claude.com/en/articles/13345190-get-started-with-claude-cowork)).

Wie nooit eerder met Cowork werkte, leest eerst onze [zes-tools-setup voor Claude in één dag](/nieuws/claude-instellen-1-dag-6-tools). De brain-file en een vaste startprompt schelen later veel mis-aannames in je modellen. Twijfel je of Cowork op jouw systeem draait? Zie [op welke systemen Cowork werkt (Windows, macOS, Linux)](/nieuws/claude-cowork-windows-linux-draaien).

## Stap 2: Koppel Google Drive (of OneDrive) als connector

Klik op de **+**-knop in Cowork, kies "Connectors", en koppel Google Drive of OneDrive. Dit is geen luxe — zo kan Claude na het bouwen het bestand direct als Google Sheets in jouw Drive plaatsen, of als .xlsx in OneDrive, zonder handmatige upload. Voor SharePoint-huishoudens werkt OneDrive Business het soepelst; voor zzp'ers en kleine MKB is Google Drive het laagdrempeligst.

## Stap 3: Schrijf de prompt mét aannames-check

Dit is de doorbraak in de workflow. In plaats van Cowork direct te laten bouwen, laat je het eerst de aannames opsommen. Een werkbare template:

```
Maak een Excel-spreadsheet: [doel].

### Tabs:
- "Aannames": alle inputs gegroepeerd, gelabelde cellen
- "[Tab 2]": [wat erin staat]
- "Dashboard": KPI-tiles + grafieken

### Formatting:
EUR-valuta (geen decimalen), bevroren kopregels, named ranges
zodat formules in begrijpelijke taal lezen.

Voor je begint: lijst de tien belangrijkste aannames die je gaat
maken (cijfers, conversies, marges), zodat ik ze kan controleren.
```

Claude antwoordt met een lijst van aannames. Op dát moment heb je de kans om "deal-size van €15k naar €25k" te zeggen, vóórdat die fout 200 formules diep in het bestand zit. Vijf minuten check vooraf bespaart een uur retrofitten achteraf.

> **⚡ Gevorderden:** Vraag expliciet om named ranges en "geen aanname hardcoded in een formule". Cowork respecteert dat — formules lezen daarna als `=Funnel_Conv_DiscoveryCall * Avg_Deal_Sprint` in plaats van `=B14*C7`. Voor wie een model later met klanten of een board doorneemt, is dit verschil tussen "vertrouwd" en "wat staat hier nou".

## Stap 4: Bouw, controleer, open in Sheets

Geef het signaal: "Aannames akkoord, bouw nu". Cowork werkt vijf tot tien minuten door — meerdere tabs aanmaken, formules schrijven, conditional formatting toepassen, een dashboard met grafieken bouwen. Voor de meeste bedrijfsmodellen levert het in één keer een bruikbaar resultaat.

Vraag daarna: "Upload dit als Google Sheets naar mijn Drive in de map [X]". Open het bestand direct in Google Sheets via Drive — formules en formatting blijven werken.

Wie deze workflow uitgebreider wil zien (inclusief de vergelijking met Copilot, Gemini en Shortcut.ai), kan ons [complete spreadsheet-playbook op hetlaatsteainieuws.nl](https://hetlaatsteainieuws.nl/tools/claude-cowork-spreadsheets-playbook) erbij pakken — daar staan de extra benchmarks en alternatieven.

## Stap 5: Edits doen in de Claude-add-in voor Excel

Voor vervolgaanpassingen — "maak het Bull-scenario optimistischer", "voeg een grafiek toe over headcount per kwartaal" — is het sneller om binnen Excel zelf te werken via de officiële Claude-add-in. Sinds januari 2026 is die generally available voor alle betaalde Claude-plannen ([Bron: Anthropic — Use Claude for Excel](https://support.claude.com/en/articles/12650343-use-claude-for-excel)).

Wat de add-in goed kan: tabs samenvatten, pivot-tabellen direct aanpassen, cellen bewerken op natuurlijke vraag, conditional formatting toevoegen, finance-specifieke formatting. Wat het niet doet: vanaf nul opbouwen — dat blijft Cowork's domein. Voor Microsoft 365-huishoudens met meer dan 50 medewerkers is dit het beste startpunt; voor zzp'ers en mini-teams blijft Cowork de simpelste route.

## Wanneer Cowork voor spreadsheets de moeite waard is

**Wel doen als:**

- Je elke week soortgelijke modellen bouwt (forecast, budget, sales-funnel, klant-tracker)
- Je het modelwerk niet wilt uitbesteden maar wel de routine kwijt wilt
- Je een board, klant of investeerder een schoon model moet laten zien zonder dagen kwijt te zijn
- Je vergader-output ook wilt automatiseren — zoals onze gids [Granola voor MKB: vergader-notulen in vijf minuten](/nieuws/granola-notuleren-mkb-5-minuten) laat zien voor het "wat is besproken"-deel

**Niet (nog) nodig als:**

- Je één keer per kwartaal een eenmalige analyse doet — dan kost de setup meer dan hij oplevert
- Je werkt met gevoelige financiële data zonder Enterprise-contract waarin data-governance goed geregeld is
- Je geen geduld hebt om de aannames-check goed te doen — dan worden de fouten alleen sneller geproduceerd, niet minder

## Checklist: ben je klaar?

- [ ] Claude Desktop geïnstalleerd, betaald plan actief (Pro, Max, Team of Enterprise)
- [ ] Lokale map gekoppeld in de Cowork-tab
- [ ] Opus 4.8 geselecteerd met Adaptive Thinking aan
- [ ] Google Drive of OneDrive als connector toegevoegd
- [ ] Prompt-template paraat met "tien aannames vooraf"-zin
- [ ] Claude-add-in voor Excel geïnstalleerd voor edits in bestaande .xlsx
- [ ] Eerste testspreadsheet gedraaid op iets onbelangrijks

Werk je dit af, dan heb je in een uur een complete cyclus draaien die voor consultancy-werk, board-prognoses of MKB-budgetten direct inzetbaar is.

## Bronnen

- [Anthropic Support — Get started with Claude Cowork](https://support.claude.com/en/articles/13345190-get-started-with-claude-cowork) — officiële documentatie inclusief beschikbaarheid en setup.
- [Anthropic Support — Use Claude for Excel](https://support.claude.com/en/articles/12650343-use-claude-for-excel) — officiële guide voor de Excel-add-in (GA op alle betaalde plannen sinds januari 2026).
- [Anthropic — Introducing Claude Opus 4.8](https://www.anthropic.com/news/claude-opus-4-8) — release-notes en benchmarks, inclusief de 4x lagere kans op ongemerkte fouten relevant voor formules.
- [Microsoft Marketplace — Claude by Anthropic for Excel](https://marketplace.microsoft.com/en-us/product/saas/wa200009404) — productpagina van de Microsoft-marketplace-listing voor enterprise-deployment.
