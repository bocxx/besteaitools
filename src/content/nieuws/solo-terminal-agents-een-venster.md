---
title: "Solo instellen: al je terminal-agents en dev-stack in één venster"
heroImageAlt: "Miniatuur diorama-illustratie bij artikel 'Solo instellen: al je terminal-agents en dev-stack in één venster'"
description: "Negen terminaltabs met Claude Code, Codex en een crashende queue worker? Zo zet je Solo in vijf stappen op als overzichtelijke agent-werkplek."
publishedAt: 2026-07-21
updatedAt: 2026-07-21
author: "Redactie"
category: "gids"
tags:
  - "soloterm"
  - "terminal-agents"
  - "claude-code"
  - "agent-workflow"
  - "mcp"
toolSlug: "soloterm"
featured: false
draft: false
readingTime: 4
evergreen: true
volatility: "medium"
factsCheckedAt: 2026-07-21
watch: "soloterm"
heroImage: "/images/articles/diorama-solo-terminal-agents-een-venster.webp"
keyTakeaways:
  - "Solo is een lichte native app (Tauri) die je CLI-agents, dev-server en shell-sessies in één venster draait en bewaakt."
  - "De app detecteert of een agent werkt of op jou wacht, herstart gecrashte processen automatisch en toont alles in één statusoverzicht."
  - "Via MCP krijgen je agents toegang tot procesbeheer, gedeelde todo's, scratchpads, locks en timers — meerdere agents werken zo botsingsvrij samen."
  - "Een gedeelde solo.yml in je repo geeft je hele team dezelfde stack en agents; de gratis versie dekt 4 projecten en 20 processen."
faq:
  - q: "Wat is Solo van soloterm.com precies?"
    a: "Solo is een native terminal-werkplek voor AI-agents, projectcommando's en shell-sessies, gebouwd door Aaron Francis (faster.dev). Je draait er CLI-agents zoals Claude Code, Codex en Gemini CLI naast je dev-server, queue workers en databases, in één venster. Solo bewaakt alles: het ziet wanneer een agent op je wacht, herstart gecrashte processen en geeft agents via MCP zicht op je stack. Het is bewust geen IDE — je editor blijft je editor."
  - q: "Is Solo gratis te gebruiken?"
    a: "Ja, de gratis versie is volwaardig en verloopt niet: maximaal 4 projecten en 20 processen, met alle features inbegrepen, inclusief de MCP-integratie. Pro kost $99 per jaar en geeft onbeperkte projecten en processen, activatie op 3 apparaten en priority support, met 30 dagen geld-terug-garantie. Voor teams gelden staffelprijzen per seat."
  - q: "Welke AI-agents werken met Solo?"
    a: "Elke agent die in een terminal draait: Claude Code, OpenAI Codex, Gemini CLI, Amp, Aider, Goose, OpenCode en Copilot CLI, ook meerdere tegelijk of meerdere kopieën van dezelfde. Solo heeft geen eigen modellen en raakt je API-keys niet aan — je agents draaien precies zoals je ze lokaal hebt ingesteld, dus zonder risico op provider-bans."
  - q: "Op welke platformen draait Solo?"
    a: "Mac en Windows zijn beschikbaar; Linux komt eraan (peildatum juli 2026). Solo is een Tauri-app die de native webview van je systeem gebruikt, dus de download is klein en het geheugengebruik laag — minder RAM dan een enkele Chrome-tab, aldus de maker."
  - q: "Kunnen meerdere AI-agents samenwerken in Solo?"
    a: "Ja, dat is de kern van de MCP-laag. Agents delen todo's, markdown-scratchpads, een key-value store, timers en locks. Eén agent kan werk opsplitsen, een tweede agent spawnen, die een todo toewijzen en via een lock voorkomen dat ze elkaars bestanden raken. Subagents verschijnen genest onder hun ouder in de zijbalk, en gekoppelde git-worktrees delen dezelfde takenlijst."
---

Claude Code in de ene tab, Codex in de andere, en de queue worker die twintig minuten geleden stilletjes crashte. Wie met meerdere terminal-agents werkt, kent de tab-roulette. [Solo](/tools/soloterm) — van Aaron Francis, bekend van faster.dev — lost precies dat op: één venster waarin je agents én dev-stack draaien, met een statusoverzicht dat vertelt wie er op jou wacht. Zo zet je het op.

## Stap 1: download en installeer Solo

Haal Solo op via [soloterm.com/download](https://soloterm.com/download) — beschikbaar voor Mac en Windows, Linux volgt ([Bron: Solo](https://soloterm.com/)). Het is een kleine Tauri-app, geen Electron-kolos: hij gebruikt de native webview van je systeem en verbruikt volgens de maker minder RAM dan één Chrome-tab. De gratis versie volstaat om te starten: 4 projecten en 20 processen, alle features inbegrepen.

## Stap 2: voeg je project en dev-stack toe

Maak een project aan en definieer je processen: dev-server, queue worker, database. Solo detecteert stacks automatisch voor onder meer Laravel, Node.js, Next.js, Django, Rails en Go. Alles komt in een `solo.yml` te staan; één klik op play start de hele stack, één klik sluit alles netjes af. Crasht een proces, dan herstart Solo het automatisch en krijg jij een melding — geen stille uitval meer.

## Stap 3: zet je agents ernaast

Voeg je CLI-agents toe zoals je elk ander proces toevoegt: Claude Code, Codex, Gemini CLI, Amp, Aider — alles wat in een terminal draait, ook meerdere tegelijk. Solo raakt je API-keys of agent-config niet aan; de agents draaien exact zoals je ze al had ingesteld. De zijbalk toont per agent of hij werkt of op jou wacht, en met één sneltoets spring je naar degene die aandacht vraagt.

> **💡 Beginner-tip:** werk je nog niet met een terminal-agent? Begin dan eerst met onze gids [je eerste agent-loop in Claude Code](/nieuws/je-eerste-agent-loop-claude-code) — daarna snap je meteen waarom één venster voor meerdere agents handig is.

## Stap 4: koppel de MCP-toolbelt

Solo is zelf ook een MCP-server. Eén setup-commando (kant-en-klare snippets staan in Settings) en je agent krijgt gereedschap voor de hele werkplek: processen starten en herlezen (`restart_process`, `get_process_output`), gedeelde todo's, markdown-scratchpads voor plannen en overdracht, plus locks en timers zodat meerdere agents niet door elkaar heen werken. Een agent kan zelfs een tweede agent spawnen en die een todo toewijzen. Wat zulke samenwerkende agents in de praktijk kunnen, schetst [ons overzicht van AI-agents in 2026 op hetlaatsteainieuws.nl](https://hetlaatsteainieuws.nl/achtergrond/ai-agents-2026-wat-zijn-ze).

## Stap 5: deel de setup met je team

Commit de `solo.yml` naar je repo en iedere collega draait dezelfde stack én dezelfde agents — geen verouderde README's meer. Persoonlijke processen kun je lokaal houden, buiten de gedeelde config. Solo's trust-systeem vraagt bevestiging zodra commando's wijzigen (bijvoorbeeld na een `git pull`), zodat er nooit ongezien iets draait. Draai je parallelle sessies in git-worktrees, dan delen die dezelfde todo's en scratchpads; dat combineert mooi met de aanpak uit [parallelle Claude Code-sessies met de desktop-app](/nieuws/claude-code-desktop-parallelle-sessies).

## Stand van zaken — bijgewerkt 2026-07-21

Gratis versie: 4 projecten, 20 processen, alle features, verloopt niet. Pro: $99 per jaar (onbeperkt, 3 apparaten, 30 dagen geld-terug). Teamseats: $99/seat/jaar voor seats 1-3, aflopend tot $69 bij 51+. Platformen: Mac en Windows beschikbaar, Linux aangekondigd. ([Bron: Solo](https://soloterm.com/))

## Checklist: ben je klaar?

- [ ] Solo geïnstalleerd (Mac of Windows)
- [ ] Project aangemaakt met dev-server en workers in `solo.yml`
- [ ] Auto-restart getest door een proces bewust te killen
- [ ] Minstens één CLI-agent toegevoegd en de wacht-status gezien
- [ ] MCP-koppeling gelegd via het setup-snippet in Settings
- [ ] Todo's/scratchpad geprobeerd met twee agents tegelijk
- [ ] `solo.yml` gecommit (en persoonlijke processen lokaal gehouden)

## Bronnen

- [Solo — The workspace for your agents and dev stack](https://soloterm.com/) (geraadpleegd 21 juli 2026)
- [Solo docs](https://soloterm.com/docs)
- [Solo vs Warp — vergelijking door de maker](https://soloterm.com/solo-vs-warp)
