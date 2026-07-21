---
title: "Claude aan je WordPress-site koppelen: zo werkt de MCP-verbinding"
heroImageAlt: "Miniatuur diorama-illustratie bij artikel 'Claude aan je WordPress-site koppelen: zo werkt de MCP-verbinding'"
description: "Verbind je Claude rechtstreeks met WordPress, dan kan de AI je echte site lezen en bewerken in plaats van blind code te gokken. Zo leg je de verbinding via MCP — in drie routes, van kant-en-klaar tot zelf-gehost."
publishedAt: 2026-07-03
updatedAt: 2026-07-03
author: "Redactie"
category: "gids"
tags:
  - "claude"
  - "wordpress"
  - "mcp"
  - "ai-automatisering"
  - "model-context-protocol"
  - "website-beheer"
toolSlug: "claude"
featured: false
draft: false
readingTime: 6
heroImage: "/images/articles/diorama-claude-wordpress-verbinden-mcp.webp"
heroScene: "A miniature desk with a small robot arm reaching into an open dollhouse-sized website dashboard, tiny cables connecting a chat bubble to a WordPress logo block, warm studio lighting"
keyTakeaways:
  - "Met een MCP-verbinding kan Claude je echte WordPress-site lezen en bewerken, in plaats van code te schrijven zonder je thema en instellingen te zien."
  - "Er zijn drie routes: de officiële WordPress.com-connector, een beheerde dienst zoals InstaWP, of de zelf-gehoste MCP Adapter-plugin."
  - "Authenticatie loopt via Application Passwords; geef Claude nooit meer rechten dan nodig en test eerst op een staging-omgeving."
  - "Handig voor bulkwerk: concepten aanmaken, categorieën opschonen en plugins beheren via gewone opdrachten in de chat."
faq:
  - q: "Wat is MCP en waarom heb ik het nodig voor WordPress?"
    a: "MCP staat voor Model Context Protocol: een standaard waarmee een AI zoals Claude echte gereedschappen kan aanroepen in plaats van alleen tekst te genereren. Zonder MCP beschrijft Claude wat je zou moeten doen; met MCP voert Claude de actie zelf uit op je site — een bericht plaatsen, een categorie hernoemen, een plugin controleren. De verbinding vertaalt jouw opdracht naar de WordPress REST-API."
  - q: "Is het veilig om Claude toegang tot mijn WordPress-site te geven?"
    a: "Het kan veilig, mits je het beperkt inricht. Gebruik Application Passwords in plaats van je hoofdwachtwoord, geef een account de minimale rechten die de taak vereist, en test eerst op een staging- of testsite. Zo voorkom je dat een verkeerd begrepen opdracht meteen je live-site raakt. Trek de toegang in zodra je klaar bent met een klus."
  - q: "Moet ik kunnen programmeren om Claude aan WordPress te koppelen?"
    a: "Voor de officiële WordPress.com-connector of een beheerde dienst zoals InstaWP niet: die regel je met een paar klikken en een toggle. De zelf-gehoste route via de MCP Adapter-plugin vraagt meer technische kennis, omdat je zelf de server, authenticatie en updates beheert. Begin met de kant-en-klare route als je twijfelt."
  - q: "Wat kan Claude doen zodra de verbinding staat?"
    a: "Claude kan berichten en pagina's aanmaken en bewerken, uitgelichte afbeeldingen instellen, categorieën en tags opschonen, en meehelpen met pluginbeheer. Vooral repeterend bulkwerk wordt sneller: je kunt bijvoorbeeld in één opdracht meerdere concepten laten aanmaken met de juiste categorie. De AI werkt daarbij op je echte site, dus met je werkelijke thema en content."
---

Je vraagt Claude om hulp met je WordPress-site, krijgt een stuk code terug, plakt het erin, en de helft van de tijd breekt er iets omdat de AI je thema en instellingen niet kende. Herkenbaar? Dat kan anders. Sinds WordPress het Model Context Protocol (MCP) ondersteunt, kun je Claude rechtstreeks aan je site koppelen. De AI leest dan je echte bestanden, bewerkt je thema en beheert content vanuit hetzelfde chatvenster — op je werkelijke site in plaats van een hypothetische.

## Wat de verbinding precies doet

MCP is een standaard waarmee een AI echte gereedschappen kan aanroepen. Een WordPress MCP-server ontvangt gestructureerde verzoeken van Claude, vertaalt die naar de WordPress REST-API, regelt de authenticatie en stuurt een net antwoord terug. Concreet: Claude kan eerst opvragen welke acties beschikbaar zijn en vervolgens de juiste actie uitvoeren, van een bericht plaatsen tot een taxonomie opschonen.

Dit staat bekend als "tool use" — het vermogen van Claude om je eigen functies en systemen aan te roepen. [13 Claude-features die je team morgen kan gebruiken](/nieuws/claude-13-features-praktisch) gaat onder meer dieper in op tool use en andere mogelijkheden voor teams die Claude verder dan chatten willen inzetten.

> **💡 Beginner-tip:** Je hoeft niet te weten hoe een REST-API werkt om dit te gebruiken. Zie MCP als een stekkerdoos: het zorgt dat Claude en WordPress dezelfde taal spreken. Jij typt gewone opdrachten, de verbinding doet de vertaling.

## Route 1 — de officiële WordPress.com-connector

De eenvoudigste weg loopt via WordPress.com, dat een officiële connector voor Claude heeft uitgebracht. Het is de eerste in zijn soort van een WordPress-host, en de integratie wordt zowel door Anthropic als WordPress.com ondersteund. Je koppelt je site zonder zelf servers of wachtwoorden te configureren. Voor wie op WordPress.com zit, is dit het startpunt.

## Route 2 — een beheerde MCP-dienst

Zit je op een zelf-gehoste (WordPress.org) site en wil je toch geen techniek? Dan is een beheerde dienst zoals InstaWP handig. Die draait de MCP-server voor je: geen Node.js-installatie, geen proxy, geen handmatig aangemaakte Application Password. Eén schakelaar en je bent verbonden. Je betaalt voor het gemak, maar bespaart jezelf het setup-werk.

## Route 3 — de zelf-gehoste MCP Adapter-plugin

Wil je alles in eigen hand? De MCP Adapter is een officiële WordPress-plugin die op je eigen server draait. Jij beheert dan de infrastructuur, de authenticatie en de updates. Deze route geeft de meeste controle en is gratis in gebruik, maar vraagt technische kennis. Kies 'm als je bewust geen externe partij tussen je AI en je site wilt.

## Veilig inrichten — niet overslaan

Bij elke route geldt dezelfde voorzichtigheid. Gebruik Application Passwords voor de authenticatie, nooit je gewone inloggegevens. Geef het gekoppelde account alleen de rechten die de taak echt nodig heeft. En test een nieuwe opzet eerst op een staging-omgeving voordat je 'm op je live-site loslaat. Een AI die een opdracht net verkeerd interpreteert, doet dat anders meteen op je echte content.

> **⚡ Gevorderden:** De kracht zit in bulk. Een opdracht als "maak concepten voor deze twaalf titels, wijs de juiste categorie toe en stel de uitgelichte afbeelding in vanaf deze URL's" is precies het soort repeterend werk waar de verbinding tijd wint. Houd wel een revisie-check aan: laat Claude concepten aanmaken, niet direct publiceren.

## Is dit iets voor jou?

Beheer je één simpele blog die je af en toe bijwerkt, dan is de handmatige route prima en voegt een AI-koppeling weinig toe. Beheer je meerdere sites, veel content of terugkerend onderhoud, dan bespaart een MCP-verbinding met Claude echt tijd — vooral bij taxonomie-opschoonwerk en het in bulk klaarzetten van berichten. Bouw of beheer je zelf zo'n MCP-koppeling, houd dan de nieuwe spec-revisie in de gaten: [MCP wordt stateless: zo bereid je je server voor](/nieuws/mcp-stateless-spec-voorbereiden).

Wil je eerst een gevoel krijgen bij wat een AI wél en niet betrouwbaar met tekst doet voordat je 'm op je site zet? Lees dan onze duiding op hetlaatsteainieuws.nl over [realistisch verdienen en werken met Claude](https://hetlaatsteainieuws.nl/nieuws/geld-verdienen-claude-ai-realistisch). Dat helpt je inschatten waar de AI je werk versnelt en waar jouw controle onmisbaar blijft.

## Bronnen

- [WordPress.com has a Claude Connector](https://wordpress.com/blog/2026/02/05/claude-connector/) — WordPress.com, 2026
- [From Abilities to AI Agents: Introducing the WordPress MCP Adapter](https://developer.wordpress.org/news/2026/02/from-abilities-to-ai-agents-introducing-the-wordpress-mcp-adapter/) — WordPress Developer Blog, 2026
- [Connect Claude to WordPress with MCP](https://instawp.com/connect-claude-with-wordpress/) — InstaWP
