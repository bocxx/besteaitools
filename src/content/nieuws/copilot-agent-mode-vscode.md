---
title: "GitHub Copilot agent mode: je eerste taak in VS Code"
description: "Agent mode is het hart van GitHub Copilot, niet alleen autocomplete. Zo schakel je hem in VS Code in, geef je hem een taak, en snap je wat dat aan credits kost."
publishedAt: 2026-09-25
updatedAt: 2026-09-25
author: "Redactie"
category: "gids"
tags:
  - "github-copilot"
  - "copilot"
  - "agent-mode"
  - "vscode"
  - "ai-coderen"
  - "ai-editors"
toolSlug: "copilot"
featured: false
draft: false
readingTime: 4
heroImage: "/images/articles/diorama-copilot-agent-mode-vscode.webp"
heroImageAlt: "Miniatuur diorama-illustratie bij artikel 'GitHub Copilot agent mode: je eerste taak in VS Code'"
heroScene: "A small robotic arm on a miniature workbench autonomously assembling wooden blocks into a tower, a tiny stack of coin-like tokens next to it, a human hand resting nearby without touching"
keyTakeaways:
  - "Agent mode laat Copilot zelfstandig bestanden aanpassen, commando's uitvoeren en MCP-tools aanroepen — niet alleen suggesties tijdens het typen geven."
  - "Je start agent mode in VS Code via de Agents window of Chat view; typ je taak in gewone taal en de agent stelt een plan met bestandswijzigingen voor."
  - "Sinds 1 juni 2026 werkt elk betaald Copilot-plan met usage-based billing: tokens worden omgezet in AI Credits (1 credit = $0,01), met een vaste maandelijkse bundel plus een flex-aanvulling."
  - "Copilot Pro ($10/maand) krijgt 1.500 credits per maand (1.000 basis + 500 flex); Pro+ ($39) en Max ($100) krijgen aanzienlijk meer, aflopend naar de zwaarte van het abonnement."
faq:
  - q: "Wat is het verschil tussen GitHub Copilot chat en agent mode?"
    a: "Chat geeft je antwoord en suggesties die je zelf moet kopiëren of toepassen. Agent mode gaat een stap verder: de agent past bestanden direct aan, kan terminalcommando's uitvoeren (met een `!` ervoor) en kan externe tools aanroepen via MCP-servers. Jij keurt de voorgestelde wijzigingen goed via een diff-weergave voordat ze definitief zijn."
  - q: "Hoe schakel ik agent mode in in VS Code?"
    a: "Open de Agents window of de Chat view in VS Code (via het chat-icoon in de zijbalk of Ctrl+Alt+I / Cmd+Alt+I). Typ je taak in het invoerveld en verstuur hem. De agent analyseert je codebase, stelt een plan voor en voert dat stap voor stap uit, met tussentijdse diffs die je kunt controleren."
  - q: "Wat kost GitHub Copilot en hoe werkt usage-based billing?"
    a: "Persoonlijke plannen zijn Free (2.000 completions/maand, geen agent mode), Pro ($10/maand), Pro+ ($39/maand) en Max ($100/maand). Sinds juni 2026 verbruikt elke chat- of agent-interactie AI Credits op basis van input-, output- en cached tokens (1 credit = $0,01). Elk plan heeft een vaste maandelijkse bundel plus een flex-aanvulling; ongebruikte credits vervallen aan het einde van de maand."
  - q: "Kan agent mode ook mijn eigen tools of databases aanroepen?"
    a: "Ja, via MCP (Model Context Protocol). Je verbindt een MCP-server in VS Code's instellingen, en de agent kan die server vervolgens als extra tool gebruiken tijdens een taak — bijvoorbeeld om in een database te zoeken of een externe API aan te roepen. Controleer een nieuwe server altijd eerst op herkomst en rechten voor je hem koppelt."
  - q: "Waarom raakt agent mode sneller door mijn credits dan gewone chat?"
    a: "Een agent-taak bestaat vaak uit meerdere stappen — codebase doorzoeken, een plan opstellen, bestanden aanpassen, resultaten controleren — en elke stap verstuurt opnieuw tokens naar het model. Eén taak in agent mode kan daardoor het token-verbruik van meerdere losse chatvragen optellen. 'Auto model selection' geeft betalende gebruikers 10% korting en kan het verbruik iets beperken."
---

GitHub Copilot begon als autocomplete in je editor, maar het zwaartepunt ligt inmiddels bij agent mode: Copilot die zelfstandig bestanden aanpast, commando's uitvoert en tools aanroept in plaats van alleen suggesties te typen. Sinds juni 2026 werkt elk betaald plan ook met usage-based billing in credits. Dit is hoe je agent mode in VS Code aanzet en je eerste taak geeft, in vijf minuten.

## Wat agent mode anders maakt dan gewone chat

Copilot chat beantwoordt vragen en geeft codevoorstellen die jij zelf kopieert of toepast. Agent mode gaat verder: je geeft een taak in gewone taal, en de agent doorzoekt je codebase, past bestanden direct aan, kan terminalcommando's uitvoeren (met een `!` vooraf) en kan externe tools aanroepen via een gekoppelde MCP-server ([Bron: GitHub Docs — Copilot in VS Code](https://code.visualstudio.com/docs/copilot/chat/copilot-chat)). Je blijft in controle: elke bestandswijziging verschijnt eerst als diff, die je bekijkt voor je hem accepteert. Voor een breder beeld van wat AI-agents in 2026 kunnen en waar de risico's zitten: [ons overzicht op hetlaatsteainieuws.nl](https://hetlaatsteainieuws.nl/achtergrond/ai-agents-2026-wat-zijn-ze).

## Je eerste agent-taak, stap voor stap

1. **Open de Agents window of Chat view.** In VS Code klik je op het chat-icoon in de zijbalk, of gebruik je de sneltoets (Ctrl+Alt+I op Windows/Linux, Cmd+Alt+I op macOS). Zorg dat je bent ingelogd met een GitHub-account dat een Copilot-plan heeft.
2. **Typ je taak in gewone taal.** Bijvoorbeeld: "voeg een unit test toe voor de functie `parseInvoice` en dek de foutafhandeling." Concreter dan "verbeter deze code" werkt beter — de agent heeft een duidelijk eindpunt nodig om te weten wanneer hij klaar is.
3. **Bekijk het voorgestelde plan en de diffs.** De agent laat zien welke bestanden hij wil aanpassen en waarom. Open een gewijzigd bestand om de diff te zien voor je hem accepteert.
4. **Gebruik `!` voor terminalcommando's als dat nodig is.** Wil je dat de agent bijvoorbeeld de testsuite draait om zijn eigen wijziging te checken, typ dan een commando met `!` ervoor in de Chat view of Agents window.
5. **Rond af en controleer het resultaat.** Accepteer de wijzigingen die kloppen, wijs af wat niet klopt, en vraag zo nodig om een correctie in dezelfde sessie.

> **💡 Beginner-tip:** begin met een kleine, afgebakende taak — één functie, één test, één bugfix. Een taak als "refactor de hele backend" geeft de agent te veel ruimte om te improviseren en kost onnodig veel credits.

## De pricing-realiteit: wat een taak je kost

Elk betaald plan werkt sinds 1 juni 2026 met AI Credits: 1 credit staat gelijk aan $0,01, en elke interactie verbruikt credits op basis van input-tokens, output-tokens en cached tokens. Copilot Pro ($10/maand) krijgt 1.000 basiscredits plus 500 flex-credits, Pro+ ($39/maand) 3.900 plus 3.100, en Max ($100/maand) 10.000 plus 10.000 ([Bron: GitHub Docs — Usage-based billing](https://docs.github.com/copilot/concepts/billing/usage-based-billing-for-individuals)). Ongebruikte credits vervallen aan het einde van de maand; ze stapelen niet op. De gratis tier heeft alleen beperkte code-completions, zonder agent mode.

> **⚡ Gevorderden:** een agent-taak met meerdere stappen — zoeken, plannen, aanpassen, testen — verstuurt bij elke stap opnieuw tokens naar het model. Dat verbruikt merkbaar meer credits dan losse chatvragen. "Auto model selection" geeft betalende gebruikers 10% korting op het verbruik en is de moeite waard om aan te laten staan, tenzij je bewust een specifiek model nodig hebt.

## Checklist: ben je klaar?

- [ ] Copilot Pro, Pro+ of Max actief (agent mode zit niet op de gratis tier)
- [ ] Agents window of Chat view geopend in VS Code
- [ ] Eerste taak geformuleerd als concreet, afgebakend verzoek
- [ ] Diff van elke voorgestelde wijziging bekeken voor je hem accepteert
- [ ] Credit-verbruik gecontroleerd in je GitHub-instellingen na de eerste sessie
- [ ] MCP-servers die de agent mag gebruiken vooraf gecontroleerd op herkomst

Werkt je agent met een MCP-server om externe tools aan te roepen? [Check eerst deze vijf punten](/nieuws/mcp-server-installeren-checks) voor je een nieuwe server toegang geeft — het register dat MCP-servers lijst controleert namelijk geen code, alleen eigenaarschap.

## Bronnen

- [GitHub Docs — Copilot in VS Code (chat-interfaces en agent mode)](https://code.visualstudio.com/docs/copilot/chat/copilot-chat) — officiële uitleg van de chat-interfaces en agent-mogelijkheden
- [GitHub Docs — Usage-based billing for individuals](https://docs.github.com/copilot/concepts/billing/usage-based-billing-for-individuals) — exacte credit-bedragen per plan
- [The GitHub Blog — GitHub Copilot is moving to usage-based billing](https://github.blog/news-insights/company-news/github-copilot-is-moving-to-usage-based-billing/) — aankondiging en achtergrond van de overstap
