---
title: "Claude Cowork: Anthropic's AI-agent voor kenniswerkers is breed beschikbaar"
heroImageAlt: "Miniatuur diorama-illustratie bij artikel 'Claude Cowork: Anthropic's AI-agent voor kenniswerkers is breed beschikbaar'"
description: "Claude Cowork brengt de agent-kracht van Claude Code naar niet-developers. Hoe werkt het, wat doet het concreet, en wanneer is het de moeite waard?"
publishedAt: 2026-04-23
updatedAt: 2026-04-23
author: "Redactie"
category: "lancering"
tags:
  - "claude"
  - "anthropic"
  - "cowork"
  - "ai-agent"
  - "kenniswerkers"
  - "desktop"
  - "productiviteit"
  - "mkb"
toolSlug: "claude-cowork"
featured: true
readingTime: 7
keyTakeaways:
  - "Claude Cowork is Anthropic's desktop-agent voor kenniswerkers: je laat Claude langlopende taken uitvoeren via bestanden, bash-commando's en connectoren in plaats van alleen chatten."
  - "Sinds februari 2026 draait Cowork op macOS én Windows, voor alle betaalde Claude-plannen (Pro, Max, Team, Enterprise)."
  - "Live artifacts — dashboards die automatisch ververen met actuele data uit je apps — zijn de nieuwste update en maken van Cowork een kandidaat voor wekelijkse status-rapportages."
  - "Plugins bundelen skills, connectoren en slash-commando's per rol: marketing, sales, finance, legal, HR, engineering, design en meer."
  - "Voor wie vaak herhaaltaken doet op eigen bestanden of tussen SaaS-tools, is Cowork de eerste Claude-feature die echt buiten het chatvenster werkt — met bijbehorende aandachtspunten rond permissies en vertrouwen."
faq:
  - q: "Wat is Claude Cowork precies?"
    a: "Claude Cowork is een modus binnen de Claude desktop-app waarin Claude zelfstandig langlopende taken uitvoert op je computer. Claude krijgt toegang tot een werkmap, kan bestanden lezen en aanmaken, shell-commando's draaien in een geïsoleerde sandbox, en via connectoren met apps als Gmail, Google Drive en CRM-systemen werken. Het is de agent-kant van Claude voor mensen die niet in de terminal zitten."
  - q: "Heb ik Claude Pro nodig of werkt het ook gratis?"
    a: "Cowork is alleen beschikbaar op betaalde plannen: Claude Pro (ongeveer 20 dollar per maand), Max, Team en Enterprise. De gratis tier heeft geen toegang. De research-preview-periode is voorbij sinds begin 2026 en Cowork is nu algemeen beschikbaar op macOS en Windows."
  - q: "Is Claude Cowork hetzelfde als Claude Code?"
    a: "Nee. Claude Code is een terminal-tool voor developers die wil coderen met Claude. Cowork gebruikt dezelfde agent-architectuur, maar draait binnen de Claude desktop-app zonder terminal en richt zich op kenniswerkers — marketeers, recruiters, consultants, ondernemers. De onderliggende motor is gelijkaardig; de schil is anders."
  - q: "Wat zijn live artifacts?"
    a: "Live artifacts zijn dashboards en trackers die in Cowork aan je apps en bestanden hangen en bij elke opening automatisch ververen. In plaats van elke maandag data exporteren en in Excel zetten, bouw je het dashboard één keer — daarna geeft elke klik de actuele stand. Anthropic rolde deze update uit op 21 april 2026."
  - q: "Mag Claude Cowork ook echt iets kapot maken op mijn computer?"
    a: "De bash-sandbox is filesystem- en netwerk-geïsoleerd, dus scripts kunnen niet buiten de werkmap lezen of schrijven en netwerk loopt via een proxy. De Read-, Edit- en Write-tools vragen voor acties buiten die map expliciet toestemming. Vertrouwen blijft een keuze: geef Cowork toegang tot een map met productie-data alleen als je de stappen zou vertrouwen aan een nieuwe collega."
heroImage: "/images/nieuws/claude-cowork-lancering.webp"
---

Anthropic bracht Cowork op 12 januari 2026 uit als research preview, en inmiddels is het label weg: Claude Cowork draait op macOS én Windows, voor alle betaalde plannen, met connectoren, plugins en sinds deze week live dashboards. Voor Nederlandse kenniswerkers die tot nu toe naar Claude chatten betekent dat iets nieuws — Claude mag nu ook daadwerkelijk iets doen.

## Wat Claude Cowork eigenlijk is

Claude Cowork is een modus binnen de Claude desktop-app waarin Claude zelfstandig meerstapsopdrachten uitvoert op je eigen computer. De motor eronder is dezelfde agent-architectuur die [Claude Code](https://www.anthropic.com/engineering/claude-code-sandboxing) aandrijft — Anthropic's terminal-tool voor developers — maar de schil is anders. Geen command line. Geen git-geneuzel. Je opent Claude, wijst een werkmap aan, en vertelt wat je wilt bereiken. Aan de developer-kant zit dezelfde orkestratie sinds eind mei 2026 in een nieuwe vorm: onze gids [dynamic workflows in Claude Code gebruiken](/nieuws/claude-code-dynamic-workflows-gebruiken) laat zien hoe Claude tot 1000 subagents parallel inzet voor één opdracht.

De eerste release was macOS-only en alleen voor Max-abonnees. Vier dagen later ([op 16 januari 2026](https://simonwillison.net/2026/Jan/12/claude-cowork/)) kwam Pro erbij, in februari kwam Windows, en rond dezelfde tijd verdween het "research preview"-label voor alle betaalde plannen ([Bron: TechRadar](https://www.techradar.com/pro/claude-cowork-is-now-available-for-enterprise-use-adds-analytics-access-controls-and-more)). Dat is een snel tempo voor een feature die Anthropic naar eigen zeggen in minder dan twee weken heeft gebouwd — grotendeels met Claude Code zelf.

> **💡 Beginner-tip:** Nog nooit met Claude gewerkt? Onze [vergelijking tussen Claude en ChatGPT](/nieuws/claude-vs-chatgpt-vergelijking-2026) geeft een goed startpunt voor wie tussen de twee grote assistenten kiest.

## Wat Claude concreet doet in Cowork

In een normale chat praat Claude terug. In Cowork voert Claude uit. Drie soorten gereedschappen maken dat verschil.

**Bestand-tools (Read, Edit, Write).** Claude krijgt toegang tot een door jou gekozen map op je computer. Daarbinnen mag Claude bestanden lezen, aanpassen en aanmaken. Een marketeer kan een map met concept-teksten aanwijzen en zeggen: "lees deze tien briefings en maak er één samenvattingsdocument van". Een recruiter wijst een map met CV's aan en laat Claude ze samenvatten in een shortlist. Wie schrijfwerk in de map zet, kan ook een [anti-ai-writing-style.md](/nieuws/ai-tekst-herkennen-menselijker-schrijven) toevoegen waarin staat welke AI-tells de output moet vermijden.

**Bash-sandbox.** Voor echt werk is bestanden lezen niet genoeg. Cowork draait shell-commando's in een geïsoleerde virtuele machine die alleen bij jouw werkmap kan en alleen via een proxy naar internet kan ([Bron: Claude Code-docs](https://code.claude.com/docs/en/sandboxing)). Daarbinnen mag Claude Python draaien, Node-pakketten installeren, een CSV parsen, of een PDF converteren. Wat er buiten de map gebeurt, blijft buiten bereik.

**Connectoren.** De derde laag tilt Cowork uit je eigen harde schijf: [connectoren](https://claude.com/connectors) verbinden Claude met remote MCP-servers voor apps als Google Drive, Gmail, Notion, DocuSign, CRM-systemen en data-warehouses. Een offerte uit je Drive, een mailthread uit Gmail, een klantrecord uit je CRM — Claude haalt het zelf op, schrijft ermee, en zet het resultaat terug.

> **⚡ Gevorderden:** De sandboxing is bewust conservatief: twee onafhankelijke barrières (filesystem + netwerk) in plaats van één brede allowlist. Dat zorgt dat een prompt-injection-aanval via een geopend document geen shell-toegang tot je thuismap kan nemen. Wel blijft dit je verantwoordelijkheid: een connector met schrijf-rechten op je CRM kan nog steeds records muteren als Claude dat als logische stap ziet.

## Live artifacts — dashboards die meeleven met je data

De opvallendste recente update kwam [op 21 april 2026](https://aiinsider.nl/nieuws/claude-cowork-krijgt-live-artifacts-dashboards-met-actuele-data/): Cowork maakt nu **live artifacts**. Dashboards en trackers die bij elke opening automatisch ververen met data uit je apps en bestanden.

De use case is bijna prozaïsch genoeg om te onderschatten. Stel je een salesmanager voor die elke maandagochtend drie kwartier bezig is: CRM-export, Excel-tabblad, grafiek bijwerken, screenshot, Slack. Met een live artifact bouw je dat dashboard één keer — filters voor regio, stage, dealgrootte — en daarna is elke opening de huidige stand. Dezelfde logica werkt voor HR (hiring-plan versus werkelijk), finance (runway) en marketing (weekly content-pipeline).

Anthropic's officiële aankondiging kwam via de [Claude-account op X](https://x.com/claudeai/status/2046328619249684989); een formeel productannouncement stond op het moment van de eerste geruchten nog niet op de blog. Dat hoort bij het tempo waarin Cowork zich nu ontwikkelt: features verschijnen eerst voor bestaande gebruikers, documentatie volgt.

## Plugins en skills — het roleringsysteem

Het tweede belangrijke stuk: [plugins](https://claude.com/plugins). Een plugin is een file-based bundeltje van skills, connectoren, slash-commando's en sub-agents voor één specifieke rol — sales, finance, legal, marketing, HR, engineering, design, operations, data analysis. In plaats van Claude elke keer opnieuw te briefen over jouw werkwijze installeer je het plugin en de juiste tools zijn er direct.

Anthropic onderhoudt een [open-source repository](https://github.com/anthropics/knowledge-work-plugins) met plugins voor kenniswerkers, en je kunt eigen plugins bouwen door markdown-bestanden in een mapstructuur te plaatsen. Dit is waar Cowork ruimte laat voor maatwerk: het MKB-bureau dat drie vaste klantrapportages heeft bouwt een plugin, een HR-afdeling maakt een onboarding-skill, en die bundels blijven werken ongeacht welk Claude-model eronder draait.

> **💡 Beginner-tip:** Je hoeft niet technisch te zijn om een plugin te gebruiken. Installeren gaat via de interface; schrijven van je eigen plugin is een aparte stap die je kunt uitstellen tot je weet welke herhaaltaken je automatiseert.

## Hoe Cowork zich verhoudt tot Claude Design en Cursor

Cowork staat niet op zichzelf. De afgelopen weken lanceerde Anthropic ook [Claude Design](/nieuws/claude-design-opus) — een ontwerpomgeving bovenop Opus 4.7 — en werkt Cursor parallel aan hun eigen agent-vision in Cursor 3. Buiten Anthropic zit Notion op een vergelijkbare laag: onze [tutorial om een Notion-agent voor concurrentieanalyse op te zetten](/nieuws/notion-agent-concurrentieanalyse-opzetten) laat zien hoe een agent binnen een werkruimte 20 minuten zelfstandig taken oppakt. Voor de context: Claude Code werkt in de terminal voor developers. Cowork werkt in de desktop-app voor iedereen. Claude Design werkt in de browser voor ontwerptaken. Cursor werkt in de editor voor code.

De drie Anthropic-lagen delen hun motor (sinds 28 mei 2026 schakelbaar tussen [Claude Opus 4.8](/nieuws/claude-opus-4-8-ik-weet-het-niet-prompts) en Opus 4.7 voor zwaardere taken, Claude Sonnet voor snelle taken), maar je kiest per use case welk schil het best past. Eerlijk: dat is nog niet voor iedereen duidelijk — en Anthropic's eigen communicatie maakt het onderscheid niet altijd scherp. Een developer die Cowork probeert, mist Claude Code. Een marketeer die Claude Code opent op advies van een collega, raakt verdwaald in de terminal. Begin bij je dagelijkse werkomgeving: als dat een desktop is, is Cowork het juiste startpunt.

## Wanneer Cowork de moeite waard is

Cowork leunt sterk als:

- Je werk terugkerende structuren heeft (wekelijkse rapportages, maandafsluiting, klant-onboarding)
- Je veel schakelt tussen dezelfde drie of vier apps (Gmail, Drive, CRM, Slack)
- Je comfortabel bent met het idee dat een agent jouw bestanden raakt, mits binnen grenzen

Cowork is nog niet de juiste keus als:

- Je vooral korte, losse vragen stelt — dan is de gewone Claude-chat sneller en eenvoudiger
- Je werkt met zwaar gereguleerde data zonder dat je organisatie een Enterprise-contract heeft waarin data-governance goed geregeld is
- Je geen geduld hebt om agents te leren aansturen: Cowork wordt beter als jij scherper wordt in het geven van contexten en constraints

Wil je niet alleen weten *of* je Cowork wilt, maar ook *hoe* je het in één werkdag goed inricht? Onze gids [Claude in één dag instellen](/nieuws/claude-instellen-1-dag-6-tools) loopt de zes bouwstenen langs — van een brain file tot connectoren en herhaalbare prompts.

> **⚡ Gevorderden:** De grens tussen "handig" en "een puinhoop" zit voor de meeste MKB-gebruikers bij één vraag: hoe specifiek beschrijf je het einddoel én de grenzen waarbinnen Claude mag werken? Hoe bonter je instructie, hoe interessanter de output (leuk en onverwacht); hoe strakker je instructie, hoe meer Cowork doet wat je bedoelde.

## Samenvatting — de 5-minuten-versie

- Claude Cowork is sinds begin 2026 Anthropic's agent-modus voor niet-developers: een Claude die daadwerkelijk bestanden aanmaakt, shell-commando's draait en via connectoren met je SaaS-stack werkt.
- Het draait nu op macOS én Windows voor alle betaalde plannen en heeft het research-preview-label afgeworpen.
- De nieuwste laag zijn live artifacts — dashboards die bij elke opening meegroeien met je data, uitgerold op 21 april 2026.
- Grootste valkuil: onderschatten hoeveel verschil er zit tussen "chatten met Claude" en "Claude laten werken" — het tweede vraagt andere discipline in het geven van context en grenzen.
- Eerste stap: kies één wekelijkse herhaaltaak die je nu handmatig doet en probeer of Cowork hem in één sessie kan overnemen, inclusief de koppelingen naar Gmail of Drive die je normaal handmatig doet.
- Wil je Cowork uitbreiden met externe services zonder per tool een MCP-server op te zetten? Zie onze coverage van [zero.xyz — een gateway naar ~8.000 tools voor CLI-agents](/nieuws/zero-xyz-agent-tool-gateway). En voor wie security-testen wil integreren in z'n agent-workflow: [Strix is een open-source AI-pentester](/nieuws/strix-open-source-ai-pentester) die parallel met Claude kan draaien.

## Bronnen

- [Anthropic — Cowork productpagina](https://claude.com/product/cowork) — officiële beschrijving, features, plannen
- [Anthropic — Plugins](https://claude.com/plugins) — overzicht van plugins voor Cowork en Claude Code
- [Anthropic — Connectoren](https://claude.com/connectors) — lijst van remote MCP-verbindingen met derden
- [Claude Help Center — Get started with Cowork](https://support.claude.com/en/articles/13345190-get-started-with-claude-cowork) — setup-handleiding, officiële documentatie
- [Simon Willison — First impressions (12 januari 2026)](https://simonwillison.net/2026/Jan/12/claude-cowork/) — onafhankelijke eerste reactie van een gerespecteerde ontwikkelaar
- [TechRadar — Cowork GA + enterprise controls](https://www.techradar.com/pro/claude-cowork-is-now-available-for-enterprise-use-adds-analytics-access-controls-and-more) — kwaliteitsjournalistiek over de algemene beschikbaarheid
- [AI Insider — Live artifacts update](https://aiinsider.nl/nieuws/claude-cowork-krijgt-live-artifacts-dashboards-met-actuele-data/) — Nederlandstalige dekking van de 21-april-update
