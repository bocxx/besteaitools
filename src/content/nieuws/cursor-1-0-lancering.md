---
title: "Cursor 1.0 officieel gelanceerd: de AI-code-editor is volwassen geworden"
heroImageAlt: "Miniatuur diorama-illustratie bij artikel 'Cursor 1.0 officieel gelanceerd: de AI-code-editor is volwassen geworden'"
description: "Na maanden van bèta lanceert Cursor versie 1.0 met verbeterde agentic mode, achtergrondagenten en een vernieuwd geheugen- en regelsysteem. Inclusief update naar Cursor 3.6 (mei 2026)."
publishedAt: 2026-04-17
updatedAt: 2026-06-02
author: "Redactie"
category: "lancering"
tags:
  - "cursor"
  - "coding"
  - "ai-editors"
  - "lancering"
  - "cursor-3"
toolSlug: "cursor"
featured: true
readingTime: 5
keyTakeaways:
  - "Cursor 1.0 (april 2026) bracht stabiele agentic mode, BugBot, background agents en een memories-systeem."
  - "De editor staat nu — juni 2026 — op versie 3.6 met Cloud Agents, Composer 2.5 en Auto-review als run-modus."
  - "Cloud Agents draaien in geïsoleerde cloud-VM's met terminal-, browser- en desktop-toegang, parallel over meerdere repos."
  - "Cursor is sinds 3.5 ook beschikbaar in Jira — werk-items toewijzen aan Cursor of @-mentions in comments starten een cloud-agent."
  - "Build in Parallel identificeert onafhankelijke planstappen en draait die simultaan via async subagents."
faq:
  - q: "Wat is er nieuw in Cursor 1.0 ten opzichte van de bèta?"
    a: "Bij de 1.0-lancering in april 2026 werd de agentic mode stabiel verklaard, kwam BugBot voor PR-reviews, kwamen background agents voor parallel werk, en kreeg de editor een verbeterd geheugen- en regelsysteem."
  - q: "Op welke versie zit Cursor nu (juni 2026)?"
    a: "Cursor 3.6, uitgebracht op 29 mei 2026. Sinds 3.0 zijn er Cloud Agents (geïsoleerde cloud-VM's), Composer 2.5 (sterk verbeterde agent-intelligentie), Jira-integratie en een Auto-review-modus die Cursor langer laat werken met minder approval-prompts."
  - q: "Is Cursor gratis te gebruiken?"
    a: "Er is een gratis tier met beperkte AI-verzoeken. De Pro-versie kost 20 dollar per maand voor onbeperkte snelle verzoeken; Business- en Enterprise-tiers zitten daarboven en bieden SOC 2 Type II en zero-data-retention."
  - q: "Werkt Cursor ook in bestaande projecten?"
    a: "Ja, Cursor is gebouwd op VS Code en opent elk bestaand project direct. Je bestaande extensies blijven werken. Voor cloud-werk koppel je optioneel een Cursor Cloud Agent aan je repo zodat taken parallel doorlopen zonder dat jouw editor open hoeft te staan."
heroImage: "/images/nieuws/cursor-1-0-lancering.webp"
---

> **🔄 Update 2 juni 2026:** Dit artikel beschrijft de 1.0-lancering van april 2026. Cursor zit inmiddels op **versie 3.6** (uitgebracht 29 mei 2026) met Cloud Agents, Composer 2.5 en Auto-review. De kern uit 1.0 — agentic mode, BugBot, background agents — bleef intact maar werd in de 2.x- en 3.x-cyclus fors opgeschaald. Scroll naar de sectie *"Stand juni 2026: Cursor 3.6"* onderaan voor de actuele situatie.

## Wat is er nieuw in Cursor 1.0?

Cursor, de AI-first code-editor die is gebouwd op VS Code, heeft versie 1.0 uitgebracht. Na meer dan een jaar van snelle iteraties markeert deze release een stabiel fundament voor professioneel gebruik.

De meest opvallende toevoeging is de **agentic mode**: de editor kan nu zelfstandig meerdere stappen uitvoeren, bestanden aanmaken en aanpassen, en terminalopdrachten uitvoeren — zonder dat je elke stap handmatig goedkeurt. In de bèta was dit nog experimenteel; 1.0 maakt het een eerste-klasburger.

Hetzelfde agent-principe zie je nu ook bij Anthropic opduiken — voor niet-developers — in [Claude Cowork](/nieuws/claude-cowork-lancering), waar Claude in een desktop-app bestanden beheert en shell-commando's uitvoert zonder terminal. Aan de coding-kant heeft Claude Code sinds eind mei 2026 zijn eigen sprong gemaakt met [dynamic workflows](/nieuws/claude-code-dynamic-workflows-gebruiken) — tot 1000 subagents parallel voor één opdracht, vergelijkbaar in ambitie met Cursor's background agents maar via een ander orkestratie-model. Cursor blijft voorlopig de scherpere keuze voor wie echt dagelijks in de editor leeft; Cowork richt zich juist op kenniswerkers buiten de engineering-stoel. Wie wil zien hoe je Cowork in één werkdag goed inricht, kan onze gids [Claude in één dag instellen](/nieuws/claude-instellen-1-dag-6-tools) erbij pakken. Voor design-georiënteerde agent-taken bekijk je onze [tutorial om Canva aan Gemini Spark te koppelen via MCP](/nieuws/gemini-spark-canva-mcp-koppelen).

### BugBot

BugBot koppelt direct aan GitHub. Wanneer je een pull request opent, scant BugBot de diff automatisch op logicafouten, potentiële crashes en veelgemaakte fouten. De suggesties verschijnen als comments in de PR — net als een collega-reviewer, maar dan sneller.

### Background agents

Je kunt nu meerdere taken tegelijk laten lopen. Een background agent refactort een module terwijl jij een nieuwe feature schrijft. Taken lopen voort zelfs als je Cursor sluit.

### Memories en regels

Het memories-systeem slaat beslissingen op die je eerder hebt genomen — welke patroon je prefereert voor API-calls, welke naamgeving je hanteert. Bij vergelijkbare situaties past Cursor die keuzes automatisch toe.

## Is het de moeite waard?

Voor ontwikkelaars die al met AI-assistenten werken is Cursor 1.0 een stevige upgrade. De agentic mode vermindert het aantal klikken voor complexe refactors aanzienlijk. BugBot is handig als je in een team werkt zonder formele code-reviewprocessen.

Het nadeel blijft de prijs: $20/maand voor Pro is niet goedkoop als je ook al betaalt voor GitHub Copilot of Windsurf. Maar als AI-assisted coding centraal staat in je workflow, is Cursor 1.0 momenteel de meest complete optie. Wil je je agent-stack uitbreiden zonder per service een aparte integratie te bouwen? Lees [hoe zero.xyz Claude Code en vergelijkbare CLI-agents toegang geeft tot ~8.000 tools](/nieuws/zero-xyz-agent-tool-gateway). En voor wie security-tests in z'n development-flow wil bouwen: [Strix is een open-source AI-pentester](/nieuws/strix-open-source-ai-pentester) die proofs-of-concept levert voor gevonden kwetsbaarheden.

## Stand juni 2026: Cursor 3.6

Sinds dit artikel zes weken geleden verscheen, ging Cursor in razend tempo door. De huidige versie is **3.6**, uitgerold op 29 mei 2026 ([Bron: Cursor changelog](https://cursor.com/changelog)). De grootste sprongen sinds 1.0:

- **Cloud Agents (sinds 3.5, 20 mei 2026).** Agents draaien nu in geïsoleerde cloud-VM's met volledige terminal-, browser- en desktop-toegang. Ze werken parallel over meerdere repo's en zijn ook bereikbaar via Jira: een werk-item toewijzen aan Cursor of @-mentions in comments starten direct een cloud-agent.
- **Composer 2.5.** De codegeneratie-laag is opnieuw getraind voor langlopende taken en complexere instructies. Volgens Cursor's eigen vergelijkingen substantieel sterker dan Composer 2 op multi-step refactors.
- **Auto-review en Build in Parallel.** Auto-review is een run-modus waarin Cursor langer doorwerkt met minder approval-prompts en veiligere executie. Build in Parallel identificeert onafhankelijke planstappen en draait die simultaan via async subagents — vergelijkbaar in ambitie met Anthropic's [dynamic workflows in Claude Code](/nieuws/claude-code-dynamic-workflows-gebruiken) en de [parallelle sessies in de Claude Code desktop-app](/nieuws/claude-code-desktop-parallelle-sessies), maar via een andere orkestratie.
- **Modelkeuze.** Naast GPT-5.5 en Claude Opus 4.8 kun je nu ook eigen modellen of providers koppelen voor wie compliance- of latency-redenen heeft.

De grote lijn: 1.0 maakte agentic werk stabiel, 2.x maakte het parallel, 3.x maakt het cross-tool. Voor wie tussen Cursor, Cowork en Claude Code aan het kiezen is, blijft Cursor de scherpste optie voor mensen die echt dagelijks in een editor leven. Onze [Claude vs ChatGPT-vergelijking](/nieuws/claude-vs-chatgpt-vergelijking-2026) helpt bij de keuze van het achterliggende model. En wil je een onbekend project sneller doorgronden — ook vanuit Cursor — dan zet [Understand-Anything je codebase om in een interactieve kennisgraaf](/nieuws/understand-anything-codebase-kennisgraaf). Externe documentatie voer je aan je agent met [Firecrawl, dat een website omzet in schone markdown voor je AI](/nieuws/firecrawl-website-naar-ai-databron).
