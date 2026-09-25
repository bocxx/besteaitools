---
title: "Een MCP-server installeren: 5 checks voor je op 'toestaan' klikt"
description: "MCP telt inmiddels duizenden servers in het officiële register — maar dat checkt geen code. Dit controleer je zelf voor je een nieuwe server toegang geeft."
publishedAt: 2026-09-25
updatedAt: 2026-09-25
author: "Redactie"
category: "gids"
tags:
  - "mcp"
  - "model-context-protocol"
  - "ai-veiligheid"
  - "ai-agents"
  - "claude"
  - "tool-integratie"
toolSlug: "mcp"
featured: false
draft: false
readingTime: 4
heroImage: "/images/articles/diorama-mcp-server-installeren-checks.webp"
heroImageAlt: "Miniatuur diorama-illustratie bij artikel 'Een MCP-server installeren: 5 checks voor je op 'toestaan' klikt'"
heroScene: "A small brass customs stamp hovering over a row of miniature wooden crates on a conveyor belt, one crate open showing tangled wires inside, a magnifying glass leaning against the belt"
keyTakeaways:
  - "Het officiële MCP-register (registry.modelcontextprotocol.io) telt duizenden servers, gebouwd op bijdragen van onder meer Anthropic, GitHub, Microsoft en PulseMCP."
  - "Het register verifieert alleen wie een server publiceert (via GitHub- of domeinverificatie) — het scant de servercode zelf niet op malware of lekken."
  - "Echte codescans, als ze gebeuren, komen van de onderliggende pakketregisters (npm, PyPI, Docker Hub) of van de marketplace waaruit je installeert, niet van het MCP-register zelf."
  - "Een lokale MCP-server draait met dezelfde rechten als jouw AI-client: een kwaadaardig opstartcommando kan bij je bestanden of SSH-keys zonder dat je het meteen ziet."
faq:
  - q: "Is een MCP-server in het officiële register automatisch veilig?"
    a: "Nee. Het register controleert alleen of de publicist echt de eigenaar is van de GitHub-account of het domein waaronder de server verschijnt (namespace-verificatie). Het scant de servercode zelf niet op kwaadaardig gedrag — dat is aan de onderliggende pakketregisters (npm, PyPI, Docker Hub) of aan de marketplace die de server aanbiedt."
  - q: "Waar vind ik het officiële MCP-register?"
    a: "Op registry.modelcontextprotocol.io. Het is vooral bedoeld als bron voor marketplaces en AI-clients zelf, niet als plek waar je als eindgebruiker rechtstreeks doorheen bladert — in de praktijk zie je servers meestal via een client als Claude, VS Code of Cursor, die de registry-data op de achtergrond gebruiken."
  - q: "Wat is het grootste risico van een lokale MCP-server?"
    a: "Een lokale server draait als een gewoon programma op je eigen machine, met dezelfde rechten als de AI-client die hem aanroept. Een kwaadaardig of slecht geschreven opstartcommando kan bestanden lezen, verwijderen of naar een server elders sturen — inclusief gevoelige mappen als je SSH-keys, als je dat niet vooraf beperkt."
  - q: "Hoe zie ik precies welk commando een MCP-server bij het opstarten uitvoert?"
    a: "In de configuratie van je AI-client (bijvoorbeeld het MCP-serverblok in Claude Desktop of VS Code) staat het volledige opstartcommando met alle argumenten. Lees dat commando letterlijk voor je het opslaat: een `npx pakket-naam` is meestal onschuldig, maar `curl` gevolgd door een pipe naar een shell, of een verwijzing naar je home-directory, is een waarschuwingssignaal."
  - q: "Wat doe je als je een verkeerde MCP-server hebt geïnstalleerd?"
    a: "Verwijder het serverblok direct uit de configuratie van je client en herstart de client. Controleer daarna of er bestanden zijn aangepast of nieuwe processen draaien die je niet herkent, en wijzig wachtwoorden of keys die de server had kunnen zien. Bij twijfel: meld het serverpakket bij de package-registry (npm, PyPI) waar het op stond."
---

MCP — het Model Context Protocol — is deze maand formeel overgedragen aan de Agentic AI Foundation onder de Linux Foundation, met Anthropic, OpenAI en Block als medeoprichters. De protocol-SDK's passeerden begin 2026 de grens van 97 miljoen maandelijkse downloads, en het officiële register telt inmiddels duizenden servers ([Bron: MCP Blog](https://blog.modelcontextprotocol.io/posts/2025-12-09-mcp-joins-agentic-ai-foundation/)). Dat is goed nieuws voor keuze, maar niet elke server in dat register is even veilig. Dit zijn de vijf checks die vijf minuten kosten, voordat je een nieuwe server toegang geeft tot je bestanden of tools.

## Wat het register wél en niet checkt

Het officiële register (`registry.modelcontextprotocol.io`) is de centrale metadata-bron achter het MCP-ecosysteem, gebouwd met bijdragen van onder meer Anthropic, GitHub, Microsoft en PulseMCP. Elke server publiceert er een naam, een locatie (meestal een npm-pakket) en een opstartcommando — de eisen aan die metadata liggen sinds de [stateless spec-revisie van juli](/nieuws/mcp-stateless-spec-voorbereiden) overigens ook strakker vast. Wat het register vooral controleert, is eigenaarschap: een naam als `io.github.jouwnaam/servertje` kun je alleen claimen als je die GitHub-account ook echt bezit ([Bron: MCP Registry-documentatie](https://modelcontextprotocol.io/registry/about)). Het scant de servercode zelf niet op kwaadaardig gedrag — die taak ligt bij de onderliggende pakketregisters (npm, PyPI, Docker Hub) en bij de marketplace of client waar je de server vandaan installeert.

> **💡 Beginner-tip:** je installeert een MCP-server meestal niet rechtstreeks vanaf de website van het register. Claude, VS Code, Cursor en andere clients tonen servers via hun eigen marktplaats-achtige overzicht, dat de registry-data op de achtergrond gebruikt. Heb je nog nooit een server gekoppeld, begin dan met [de stap-voor-stapgids voor Claude Desktop](/nieuws/mcp-server-koppelen-claude-desktop) — deze checks doe je daarna, vóór je op "toestaan" klikt.

## De vijf checks, stap voor stap

1. **Check de namespace, niet alleen de naam.** Een server met naam `io.github.anthropics/iets` claimt te horen bij de GitHub-organisatie `anthropics`. Klik door naar die organisatie op GitHub en kijk of het account echt bestaat en actief is — een naam die knap lijkt maar naar een leeg of maand-oud account leidt, is een rood signaal.
2. **Lees het opstartcommando letterlijk.** In de MCP-configuratie van je client staat het volledige commando met argumenten, meestal iets als `npx -y @org/pakket`. Lees het helemaal: een reeks die `curl` combineert met een pipe naar een shell, of die verwijst naar je home-directory of `.ssh`-map, installeer je niet.
3. **Geef alleen toegang tot wat nodig is.** Vraagt een server om bestandstoegang, wijs dan één specifieke map aan in plaats van je hele schijf. De meeste clients laten dit per server instellen.
4. **Kies stdio boven een open netwerkpoort waar mogelijk.** Een lokale server die via `stdio` draait, is alleen bereikbaar voor je eigen client. Een server die op een HTTP-poort luistert, kan in theorie door ander lokaal draaiend software worden aangesproken — vraag om een toegangstoken als de optie er is.
5. **Kijk naar onderhoud, niet alleen naar sterren.** Een server met veel GitHub-sterren maar geen update in een jaar loopt achter op de huidige spec. Recente commits en een reagerende maintainer wegen zwaarder dan een indrukwekkend sterretjes-getal.

> **⚡ Gevorderden:** het register zelf noemt dit expliciet — spamdetectie en naamsverificatie zijn ingebouwd, maar "security scanning" wordt bewust gedelegeerd aan de bredere ecosysteem-laag. Bouw je zelf een MCP-client of -proxy, dan is dat de plek waar je eigen sandboxing en scope-beperking horen te zitten, niet in het register.

## Als het toch misgaat

Zie je na installatie bestanden die je niet herkent, een proces dat blijft draaien nadat je de client hebt afgesloten, of onverwacht netwerkverkeer? Verwijder het serverblok direct uit de configuratie en herstart de client. Controleer daarna of gevoelige bestanden (SSH-keys, `.env`-bestanden) zijn aangeraakt, en wissel wachtwoorden of tokens die de server had kunnen zien. Was de server een npm- of PyPI-pakket, meld het probleem bij die package-registry — dat is precies het kanaal dat volgens het register zelf verantwoordelijk is voor codescans.

## Checklist: ben je klaar?

- [ ] Namespace van de server gecontroleerd op GitHub of domein
- [ ] Volledige opstartcommando gelezen, geen `curl | sh` of verwijzingen naar gevoelige mappen
- [ ] Bestandstoegang beperkt tot één specifieke map, niet de hele schijf
- [ ] `stdio` gekozen boven een open HTTP-poort, waar dat een optie was
- [ ] Laatste commit-datum en onderhoudsstatus van de server bekeken
- [ ] Serverblok en toegang bekend hoe je die weer verwijdert, mocht dat nodig zijn

Wil je weten wat er kan gebeuren als een AI-agent zonder duidelijke grenzen los mag: [dit incident met een AI-agent van OpenAI](https://www.hetlaatsteainieuws.nl/regelgeving/openai-agent-hackt-medicare-australie) op een Australische overheidsportal laat zien waarom "het mag technisch" en "het zou moeten mogen" niet hetzelfde zijn.

## Bronnen

- [MCP Blog — MCP joins the Agentic AI Foundation](https://blog.modelcontextprotocol.io/posts/2025-12-09-mcp-joins-agentic-ai-foundation/) — governance-overdracht, downloadcijfers en oprichters
- [Model Context Protocol — The MCP Registry (about)](https://modelcontextprotocol.io/registry/about) — wat het register wel en niet controleert
- [Model Context Protocol — Security Best Practices, sectie Local MCP Server Compromise](https://modelcontextprotocol.io/docs/2026-07-28/tutorials/security/security_best_practices) — risico's en mitigaties bij lokale servers

