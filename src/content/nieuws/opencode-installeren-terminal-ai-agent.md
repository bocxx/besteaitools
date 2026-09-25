---
title: "OpenCode installeren: AI-coding-agent in je terminal"
description: "OpenCode is een open-source AI-agent die in je terminal codeert, met vrije modelkeuze. Zo installeer je hem, koppel je een model, en gebruik je Plan-modus veilig."
publishedAt: 2026-09-25
updatedAt: 2026-09-25
author: "Redactie"
category: "gids"
tags:
  - "opencode"
  - "terminal-agents"
  - "coding-agent"
  - "open-source"
  - "tutorial"
  - "model-agnostisch"
toolSlug: "opencode"
featured: false
draft: false
readingTime: 5
heroImage: "/images/articles/diorama-opencode-installeren-terminal-ai-agent.webp"
heroImageAlt: "Miniatuur diorama-illustratie bij artikel 'OpenCode installeren: gratis AI-coding-agent in je terminal, met elk model'"
heroScene: "A small wooden terminal window prop standing on a workbench with tiny interchangeable key-shaped tokens beside it, each a different color, ready to slot into a socket"
keyTakeaways:
  - "OpenCode is een gratis, open-source AI-coding-agent die in je terminal draait en zelf codeert, bugs fixt en shell-commando's uitvoert — met ruim 195.000 GitHub-sterren onder MIT-licentie."
  - "Je installeert hem met één commando (curl, npm of Homebrew) en koppelt vervolgens je eigen model: Claude, OpenAI, Google, GitHub Copilot of een lokaal model."
  - "Plan-modus (Tab) laat OpenCode eerst zijn aanpak voorstellen zonder iets te wijzigen — de veiligste manier om een onbekende codebase te laten aanraken."
  - "Dezelfde agent-server is te benaderen vanuit de terminal, een desktop-app (beta), IDE-extensies en CI-pipelines, dus je hoeft niet steeds opnieuw te configureren."
faq:
  - q: "Is OpenCode echt gratis, of betaal ik alsnog voor AI-gebruik?"
    a: "OpenCode zelf is gratis en open-source (MIT-licentie) — je betaalt niets voor de tool. Wat je gebruikt, is wél afhankelijk van het model dat je koppelt: met je eigen API-key van Claude, OpenAI of Google betaal je de gangbare kosten van die provider. Koppel je een lokaal model, dan is het geheel kosteloos, maar dan lever je in op kwaliteit ten opzichte van de grote cloud-modellen."
  - q: "Welke AI-modellen kan ik met OpenCode gebruiken?"
    a: "OpenCode is model-agnostisch en ondersteunt tientallen providers: Claude-modellen van Anthropic, GPT- en o-serie van OpenAI, Gemini van Google, modellen via GitHub Copilot- en Groq-accounts, Azure OpenAI, en lokale modellen via Models.dev-integratie. Je koppelt een provider via het `/connect`-commando in de terminal, waarna je op opencode.ai/auth je API-sleutel invoert."
  - q: "Wat doet de Plan-modus in OpenCode precies?"
    a: "Plan-modus schakelt de mogelijkheid om wijzigingen te maken tijdelijk uit. OpenCode leest je codebase en stelt een aanpak voor — welke bestanden het zou aanpassen en hoe — zonder ook maar één regel te schrijven. Pas als jij akkoord gaat, schakel je terug naar de normale modus en voert de agent het plan uit. Activeer het met de Tab-toets."
  - q: "Kan ik OpenCode ook gebruiken zonder de terminal, bijvoorbeeld in mijn IDE?"
    a: "Ja. OpenCode draait op een client-server-architectuur: dezelfde lokale agent-server is te benaderen vanuit de terminal (TUI), een desktop-app die momenteel in beta is, IDE-extensies en CI-pipelines. Je hoeft je modelkoppeling en instellingen dus niet voor elke interface opnieuw te doen."
sources:
  - label: "OpenCode — officiële website en documentatie"
    url: "https://opencode.ai/"
  - label: "GitHub — anomalyco/opencode (broncode, sterren, licentie)"
    url: "https://github.com/anomalyco/opencode"
---

Negen terminaltabs met verschillende AI-coding-agents is voor veel developers inmiddels normaal, en OpenCode is een van de populairste namen daarin: een gratis, open-source agent die in je terminal codeert, met vrije keuze uit welk model je eronder zet. Zo installeer je hem en zet je hem veilig aan de slag.

## Wat OpenCode is, en voor wie

OpenCode is een open-source AI-coding-agent, ontwikkeld door het team achter Anomaly Innovations (voorheen bekend als SST). Hij leest je codebase, schrijft en wijzigt code, draait shell-commando's en navigeert door grote projecten, allemaal vanuit je terminal. Het project telt inmiddels ruim 195.000 sterren op GitHub en staat onder de permissieve MIT-licentie ([Bron: GitHub](https://github.com/anomalyco/opencode)).

Het onderscheidende kenmerk is dat OpenCode model-agnostisch is: waar veel concurrerende tools aan één AI-leverancier vastzitten, koppel je bij OpenCode zelf een model naar keuze — Claude, GPT, Gemini, een model via je Copilot-abonnement of iets lokaals. Dat maakt hem vooral interessant voor developers die al ergens een AI-abonnement hebben en dat willen hergebruiken, in plaats van een nieuwe losse licentie te kopen.

> **💡 Beginner-tip:** heb je nog geen ervaring met terminal-agents zoals Claude Code of Cursor, begin dan niet meteen op je belangrijkste productiecodebase. Probeer OpenCode eerst op een kleine sideproject-repo, zodat je went aan hoe hij voorstellen doet en wijzigingen toepast.

## OpenCode installeren

De snelste manier gaat via één commando in je terminal:

```bash
curl -fsSL https://opencode.ai/install | bash
```

Alternatieven zijn er ook: `npm install -g opencode-ai` als je liever binnen je Node-toolchain blijft, of `brew install anomalyco/tap/opencode` op macOS en Linux met Homebrew. Op Windows raadt het project zelf WSL aan; wie dat niet gebruikt, kan terecht bij Chocolatey, Scoop of Docker ([Bron: OpenCode](https://opencode.ai/)).

## Je eerste model koppelen

Zonder gekoppeld model kan OpenCode niets. Start de agent in een projectmap en voer `/connect` uit. Je kiest dan een provider — de documentatie beveelt de eigen, geteste lijst OpenCode Zen aan, maar elke ondersteunde leverancier werkt net zo goed — en rondt de koppeling af op opencode.ai/auth, waar je je API-sleutel invoert.

Heb je al een Claude-, OpenAI- of Google-abonnement met een eigen API-key, gebruik die dan: je betaalt zo alleen de gangbare kosten van je model-provider, zonder extra abonnement voor OpenCode zelf.

## Plan-modus: voorstellen zonder wijzigen

Het onderdeel dat OpenCode onderscheidt van een agent die gewoon meteen aan de slag gaat, is Plan-modus. Activeer hem met de Tab-toets, en OpenCode schakelt zijn eigen schrijfrechten tijdelijk uit: hij leest je codebase en stelt een aanpak voor — welke bestanden hij zou aanpassen en hoe — zonder dat er iets verandert.

> **⚡ Gevorderden:** combineer Plan-modus met het `/init`-commando bij een onbekende codebase. `/init` laat OpenCode het project analyseren en een AGENTS.md-bestand aanmaken met projectconventies; daarna geeft Plan-modus je zicht op hoe de agent die conventies interpreteert, vóórdat hij ook maar één bestand aanraakt.

Ben je tevreden met het voorstel, schakel dan terug naar de normale modus en laat OpenCode het plan uitvoeren. Bevalt het niet, dan gebruik je `/undo` om wijzigingen ongedaan te maken, of `/redo` om ze terug te zetten.

Andere agents die in de terminal draaien — zoals Anthropics eigen Claude Code, waarover we eerder schreven bij de [grote desktop-update](https://www.hetlaatsteainieuws.nl/nieuws/claude-code-desktop-grote-update) — werken losser gekoppeld aan één model. Het verschil met OpenCode zit 'm precies in die modelvrijheid: dezelfde agent, wisselende motor onder de motorkap.

## Checklist: ben je klaar?

- Terminal open en OpenCode geïnstalleerd via curl, npm of Homebrew
- Een model gekoppeld via `/connect`, met een geldige API-key of lokaal model
- `/init` gedraaid op je project, zodat er een AGENTS.md staat met projectconventies
- Eerste opdracht getest in Plan-modus (Tab), vóórdat je OpenCode losliet op echte wijzigingen
- `/undo` binnen handbereik voor het geval een wijziging niet bevalt
- Gecheckt of je al een API-key hebt via een bestaand Claude-, OpenAI- of Copilot-abonnement, om dubbele kosten te voorkomen

## Bronnen

- [OpenCode — officiële website en documentatie](https://opencode.ai/)
- [GitHub — anomalyco/opencode](https://github.com/anomalyco/opencode)

