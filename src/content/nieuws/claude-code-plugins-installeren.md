---
title: "Claude Code-plugins: skills, MCP's en agents in één commando"
heroImageAlt: "Miniatuur diorama-illustratie bij artikel 'Claude Code plugins installeren: skills, MCP's en agents in één commando'"
description: "Met /plugin haal je kant-en-klare skills, agents en MCP-servers binnen in Claude Code. Zo voeg je een marketplace toe en installeer je je eerste plugin."
publishedAt: 2026-08-21
updatedAt: 2026-08-21
author: "Redactie"
category: "gids"
tags:
  - "claude-code"
  - "plugins"
  - "marketplace"
  - "mcp"
  - "skills"
  - "anthropic"
toolSlug: "claude-code"
featured: false
draft: false
readingTime: 4
heroImage: "/images/articles/diorama-claude-code-plugins-installeren.webp"
heroScene: "Miniature toolbox with several small drawers sliding open, tiny tools arranged neatly beside a small laptop"
keyTakeaways:
  - "Eén plugin kan skills, agents, hooks, MCP-servers en language servers tegelijk meebrengen, in plaats van los configureren."
  - "De officiële marketplace claude-plugins-official voegt Claude Code zelf toe bij de eerste interactieve start."
  - "Installeren doe je met /plugin install <naam>@claude-plugins-official en een keuze uit user-, project- of local-scope."
  - "Het detailscherm toont vooraf de context cost en precies welke onderdelen de plugin toevoegt."
  - "Plugins draaien code met jouw rechten. Installeer alleen wat je vertrouwt."
faq:
  - q: "Wat is een plugin in Claude Code?"
    a: "Een plugin is een bundel die Claude Code uitbreidt met skills, agents, hooks, MCP-servers en language servers. In plaats van elk onderdeel apart te configureren, installeer je één pakket dat alles meeneemt. Een plugin als github brengt bijvoorbeeld een vooraf ingestelde MCP-server mee, zodat je Claude aan GitHub koppelt zonder handmatig een server op te zetten."
  - q: "Hoe voeg ik een plugin marketplace toe aan Claude Code?"
    a: "Met /plugin marketplace add gevolgd door de bron. Voor de officiële Anthropic-catalogus is dat /plugin marketplace add anthropics/claude-plugins-official, al voegt Claude Code die meestal zelf al toe bij je eerste interactieve start. Je kunt ook een GitHub-repo in owner/repo-vorm opgeven, een volledige git-URL, een lokaal pad of een URL naar een gehost marketplace.json."
  - q: "Wat is het verschil tussen user-, project- en local-scope?"
    a: "User-scope installeert de plugin voor jou in al je projecten. Project-scope installeert hem voor iedereen die aan deze repository werkt en zet dat vast in .claude/settings.json, zodat je team dezelfde set krijgt. Local-scope installeert alleen voor jou binnen deze ene repository, zonder dat collega's het merken. Kies user voor persoonlijke gemakken, project voor teamafspraken."
  - q: "Werkt een plugin meteen na installatie?"
    a: "Meestal wel. Het installatie-overzicht meldt Plugin is now active als de plugin direct actief is. Staat er Run /reload-plugins to activate, dan draai je dat commando; waarschuwt Claude Code dat de reload de prompt-cache ongeldig maakt, dan herhaal je het als /reload-plugins --force. Verschijnen skills daarna nog steeds niet, verwijder dan de cache met rm -rf ~/.claude/plugins/cache en herstart Claude Code."
  - q: "Hoe verwijder ik een plugin die ik niet meer gebruik?"
    a: "Met /plugin uninstall naam@marketplace-naam, of via het Installed-tabblad in /plugin. Wil je hem tijdelijk uitzetten zonder te verwijderen, gebruik dan /plugin disable. Claude Code helpt je opruimen: plugins die je minstens twee weken en tien sessies niet gebruikte, verschijnen onder een kopje Not used recently, met een Last used-regel in het detailscherm."
---

# Claude Code plugins installeren: skills, MCP's en agents in één commando

Je hebt een handige skill gevonden, een MCP-server die je wilt koppelen en een agent die pull requests nakijkt. Drie losse installaties, drie configuratiebestanden. Met plugins doe je dat in één keer: één commando, één bundel, klaar. Deze gids loopt de vijf stappen langs.

## Stap 1: check of je een marketplace hebt

Een marketplace is een catalogus met plugins. Claude Code voegt de officiële Anthropic-catalogus `claude-plugins-official` zelf toe zodra je hem voor het eerst interactief start. Controleer dat met:

```shell
/plugin marketplace list
```

Staat hij er niet tussen, bijvoorbeeld omdat je netwerk de download blokkeerde, voeg hem dan handmatig toe:

```shell
/plugin marketplace add anthropics/claude-plugins-official
```

Krijg je "unknown command" op `/plugin`? Dan draai je een te oude versie. Werk bij met `npm install -g @anthropic-ai/claude-code@latest` (of `brew upgrade claude-code`) en herstart je terminal ([Bron: Claude Code Docs](https://code.claude.com/docs/en/discover-plugins)).

## Stap 2: kijk rond in de Discover-tab

Draai `/plugin` zonder argumenten. Je krijgt een venster met vier tabbladen waar je met Tab doorheen loopt: **Discover** (bladeren), **Installed** (beheren), **Marketplaces** (catalogi) en **Errors** (laadfouten). De catalogus is ook in je browser te bekijken op [claude.com/plugins](https://claude.com/plugins).

De officiële catalogus bevat onder meer kant-en-klare MCP-koppelingen naar GitHub, GitLab, Linear, Notion, Asana, Figma, Slack, Sentry, Vercel en Supabase. Daarnaast zitten er code-intelligence-plugins in die een language server aanhaken per taal, en workflow-plugins zoals `commit-commands` en `pr-review-toolkit`.

## Stap 3: lees het detailscherm voor je installeert

Selecteer een plugin en je ziet drie dingen die je moet lezen voordat je Enter indrukt:

- **Context cost** — een schatting van hoeveel tokens deze plugin elke beurt aan je contextvenster toevoegt.
- **Last updated** — wanneer de plugin voor het laatst is bijgewerkt.
- **Will install** — de volledige lijst met commands, skills, agents, hooks, MCP- en LSP-servers die erbij komen.

Die eerste is de belangrijkste. Vijf plugins die elk een beetje context kosten, knabbelen samen flink aan de ruimte die je voor je eigen code wilt gebruiken.

> **⚡ Gevorderden:** Bij plugins uit een lokale of eigen marketplace ontbreken Context cost en Last updated vaak, en toont Will install alleen "Components will be discovered at installation". Bouw je zelf een marketplace, vul dan de metadata; het scheelt je gebruikers een blinde installatie.

## Stap 4: installeer met de juiste scope

Installeren kan vanuit het venster, of direct:

```shell
/plugin install commit-commands@claude-code-plugins
```

Je kiest daarna een scope. **User** installeert voor jou in al je projecten. **Project** legt de plugin vast in `.claude/settings.json` zodat je hele team hem krijgt. **Local** houdt het bij jou binnen deze ene repository.

Vuistregel: persoonlijke gemakken op user, teamafspraken op project. Zet je een MCP-koppeling naar het projectmanagementsysteem van je klant op project-scope, dan hoeft niemand anders die meer handmatig in te richten.

## Stap 5: activeer en gebruik

Het installatie-overzicht meldt of de plugin al leeft. Staat er `Run /reload-plugins to activate.`, draai dat dan. Waarschuwt Claude Code dat de reload de prompt-cache ongeldig maakt, herhaal het als `/reload-plugins --force`.

Skills uit een plugin krijgen de pluginnaam als prefix. Na installatie van `commit-commands` roep je de commit-skill aan met:

```shell
/commit-commands:commit
```

Dat stageert je wijzigingen, schrijft een commit-message en maakt de commit. Wil je meer weten over losse skills zonder plugin, lees dan onze [Claude Code skills: wat ze zijn en hoe je je eerste instelt](/nieuws/claude-code-skills-instellen).

## Let op: een plugin draait code met jouw rechten

Anthropic is er in de documentatie expliciet over: plugins en marketplaces zijn zwaar vertrouwde onderdelen die willekeurige code kunnen uitvoeren met jouw gebruikersrechten. Anthropic controleert niet welke MCP-servers of bestanden in een plugin zitten ([Bron: Claude Code Docs](https://code.claude.com/docs/en/discover-plugins)).

De community-marketplace (`/plugin marketplace add anthropics/claude-plugins-community`) heeft geautomatiseerde validatie en veiligheidsscreening doorlopen en pint elke plugin op een specifieke commit-SHA. Dat is beter dan niets, maar het blijft code van derden. Wie wil begrijpen waarom dat bij agents extra zwaar weegt, kan onze duiding op hetlaatsteainieuws.nl erbij pakken: [AI-agents in 2026: wat ze zijn en wat ze echt kunnen](https://hetlaatsteainieuws.nl/achtergrond/ai-agents-2026-wat-zijn-ze).

> **💡 Beginner-tip:** Begin met één plugin uit de officiële catalogus en werk er een week mee. Vijf plugins tegelijk installeren maakt het lastig te zien welke je context opeet en welke je daadwerkelijk gebruikt.

## Checklist: ben je klaar?

- [ ] `/plugin marketplace list` toont minstens één marketplace
- [ ] `/plugin` opent zonder foutmelding (anders: Claude Code bijwerken)
- [ ] Je hebt in het detailscherm de **Context cost** en **Will install** gelezen
- [ ] Je hebt bewust een scope gekozen (user, project of local)
- [ ] De installatie meldde "Plugin is now active" of je draaide `/reload-plugins`
- [ ] De skill werkt via zijn genamespacede vorm, bijvoorbeeld `/commit-commands:commit`
- [ ] Het **Errors**-tabblad is leeg
- [ ] Je vertrouwt de bron van elke geïnstalleerde plugin

## Bronnen

- [Claude Code Docs — Discover and install prebuilt plugins through marketplaces](https://code.claude.com/docs/en/discover-plugins) — officiële documentatie, bron voor alle commando's in deze gids
- [Anthropic — Customize Claude Code with plugins](https://claude.com/blog/claude-code-plugins) — aankondiging en achtergrond bij het pluginsysteem
- [claude.com/plugins](https://claude.com/plugins) — de officiële catalogus in je browser
