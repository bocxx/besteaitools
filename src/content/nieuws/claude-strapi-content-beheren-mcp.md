---
title: "Strapi-content beheren met Claude: zo koppel je de Strapi MCP-server"
description: "Strapi heeft een ingebouwde MCP-server. Koppel hem aan Claude en je maakt, wijzigt en publiceert content gewoon via de chat, zonder kopiëren en plakken."
publishedAt: 2026-10-26
updatedAt: 2026-10-26
author: "Redactie"
category: "gids"
tags:
  - "claude"
  - "strapi"
  - "mcp"
  - "headless-cms"
  - "content-beheer"
  - "model-context-protocol"
toolSlug: "claude"
featured: false
draft: false
readingTime: 4
heroImage: "/images/articles/diorama-claude-strapi-content-beheren-mcp.webp"
heroImageAlt: "Miniatuur diorama-illustratie bij artikel 'Strapi-content beheren met Claude: zo koppel je de Strapi MCP-server'"
heroScene: "A miniature filing cabinet with open drawers of paper cards, a small robot arm sorting cards into blank wooden trays beside a glowing cable"
keyTakeaways:
  - "Strapi heeft sinds versie 5.47.0 een ingebouwde MCP-server op /mcp; je zet hem aan met mcp: { enabled: true } in config/server.js."
  - "Per contenttype krijgt Claude tools als list, get, create, update, publish en unpublish, zodat je content via gewone opdrachten beheert."
  - "Je logt in met een Admin token; Claude ziet alleen de tools, velden en talen die dat token mag gebruiken."
  - "Begin met een alleen-lezen-token en geef elke AI-client een eigen token met de minste rechten die de klus vraagt."
  - "Uploaden van mediabestanden kan niet via MCP; je kunt bestaande media wel opvragen en ernaar verwijzen."
faq:
  - q: "Hoe koppel ik Strapi aan Claude Desktop?"
    a: "Zet in config/server.js van je Strapi-project mcp: { enabled: true } en herstart Strapi. Maak in het adminpaneel een Admin token aan. Voeg daarna in claude_desktop_config.json een server 'strapi-mcp' toe die via npx en mcp-remote naar http://localhost:1337/mcp wijst, met je token als Bearer-header. Herstart Claude Desktop en de Strapi-tools verschijnen."
  - q: "Welke Strapi-versie heb ik nodig voor de MCP-server?"
    a: "De ingebouwde MCP-server vraagt Strapi 5.47.0 of nieuwer. Hij kwam als bèta in 5.47.0 en werd algemeen beschikbaar in 5.49.0. Voor de Media Library-tools heb je 5.54.0 of nieuwer nodig. Draai je Strapi 4, dan moet je eerst upgraden of een community-server gebruiken."
  - q: "Kost de Strapi MCP-server geld?"
    a: "Nee, de MCP-server zit gratis in Strapi, ook op het Free-plan en ook in productie. Alleen het vastleggen van MCP-acties in de audit logs is een Enterprise-functie. Wat je wel betaalt, is je Claude-abonnement of API-gebruik."
  - q: "Is het veilig om Claude mijn Strapi-content te laten publiceren?"
    a: "Dat hangt af van het token. Claude kan nooit meer dan het Admin token toestaat. Geef het token in het begin alleen leesrechten, test op een lokale of staging-omgeving en voeg pas schrijf- of publicatierechten toe als je weet hoe Claude met je contenttypes omgaat. Trek je een token in, dan werkt dat meteen bij het volgende verzoek."
sources:
  - label: "MCP server — Strapi Docs"
    url: "https://docs.strapi.io/cms/features/strapi-mcp-server"
  - label: "Strapi MCP is now Generally Available — Strapi blog"
    url: "https://strapi.io/blog/how-to-connect-strapi-mcp-server-to-cursor-ide"
  - label: "Admin tokens — Strapi Docs"
    url: "https://docs.strapi.io/cms/features/admin-tokens"
---

Je hebt een website of app op Strapi en je schrijft je teksten al met Claude? Dan kopieer je waarschijnlijk elk stuk met de hand het adminpaneel in. Dat hoeft niet meer. Strapi heeft een ingebouwde MCP-server, waarmee Claude rechtstreeks entries kan aanmaken, bijwerken en publiceren. Zo zet je de koppeling in vier stappen op, en zo houd je hem veilig.

## Stap 1: zet de MCP-server aan in Strapi

De MCP-server zit in Strapi zelf, vanaf versie 5.47.0. Hij kwam als bèta in die versie en is sinds 5.49.0 algemeen beschikbaar ([Bron: Strapi blog](https://strapi.io/blog/how-to-connect-strapi-mcp-server-to-cursor-ide)). Je hoeft geen plugin te installeren. Voeg in `config/server.js` een `mcp`-object toe met `enabled: true` en herstart Strapi. De server luistert daarna op `/mcp`, lokaal dus op `http://localhost:1337/mcp` ([Bron: Strapi Docs](https://docs.strapi.io/cms/features/strapi-mcp-server)).

De functie is gratis, ook op het Free-plan en in productie. Alleen het vastleggen van MCP-acties in de audit logs vraagt een Enterprise-plan.

## Stap 2: maak een Admin token met beperkte rechten

Claude logt in met een Admin token. Een Content API-token werkt niet: daarmee krijg je een 401-fout op `/mcp` ([Bron: Strapi blog](https://strapi.io/blog/how-to-connect-strapi-mcp-server-to-cursor-ide)). Je maakt het token aan via Settings → Administration Panel → Admin Tokens. Kopieer het meteen, want Strapi laat het maar één keer zien.

Het token bepaalt wat Claude kan. Tools, velden en talen waar het token geen rechten op heeft, ziet Claude niet eens ([Bron: Strapi Docs](https://docs.strapi.io/cms/features/strapi-mcp-server)).

> **💡 Beginner-tip:** Begin met een token dat alleen mag lezen. Laat Claude eerst een paar keer entries opvragen en samenvatten. Pas als je ziet dat dat goed gaat, maak je een tweede token met schrijfrechten.

## Stap 3: koppel Claude Desktop of Claude Code

**Claude Desktop.** Open `claude_desktop_config.json` (via Settings → Desktop app → Developer → Edit config). Voeg onder `mcpServers` een server `strapi-mcp` toe die met `npx` en `mcp-remote` naar je `/mcp`-adres wijst, met je token in de header `Authorization: Bearer <token>`. Herstart Claude Desktop. Nog nooit een MCP-server gekoppeld? [Je eerste MCP-server koppelen aan Claude Desktop](/nieuws/mcp-server-koppelen-claude-desktop) loopt de basis stap voor stap door.

**Claude Code.** Daar is het één commando:

```bash
claude mcp add strapi-mcp --transport http http://localhost:1337/mcp -H "Authorization: Bearer JOUW_ADMIN_TOKEN"
```

Werk je in Cursor, dan zet je dezelfde gegevens in `.cursor/mcp.json` met `"type": "streamable-http"`.

## Stap 4: geef gewone opdrachten

Strapi maakt per contenttype tools aan. Een collectietype `article` levert onder meer `list_article`, `get_article`, `create_article`, `update_article`, `publish_article` en `unpublish_article` op ([Bron: Strapi Docs](https://docs.strapi.io/cms/features/strapi-mcp-server)). De publicatietools verschijnen alleen als Draft & Publish aanstaat. Je hoeft die namen niet te kennen. Typ gewoon:

- "Toon de vijf nieuwste artikelen en welke nog in concept staan."
- "Maak een concept-artikel met deze tekst, in het Nederlands en het Engels."
- "Publiceer het artikel over de zomeractie."

> **⚡ Gevorderden:** Gebruik aparte tokens per taak, bijvoorbeeld één voor vertalen (alleen schrijven in de Engelse locale) en één voor publiceren. Omdat de server stateless is, werkt een rechtenwijziging of een ingetrokken token meteen bij het volgende verzoek. Met de Media Library-tools (vanaf 5.54.0) kun je ook bestaande afbeeldingen opzoeken en verplaatsen. Verwijderen gebeurt daar standaard eerst als proefrun (`dryRun: true`).

## Waar je tegenaan loopt

De koppeling heeft grenzen. Bestanden uploaden via MCP kan niet; je kunt alleen naar bestaande media verwijzen. Geneste relaties haal je niet in één keer op, en de inhoud van dynamic zones beschrijft Strapi niet in het schema ([Bron: Strapi Docs](https://docs.strapi.io/cms/features/strapi-mcp-server)). Voor teksten, vertalingen en publicatiewerk werkt het goed. Voor complexe pagina's met veel blokken blijft het adminpaneel handiger. Een andere MCP-koppeling installeren? Loop dan eerst [deze vijf checks](/nieuws/mcp-server-installeren-checks) na. Gebruik je WordPress in plaats van Strapi, dan lees je in [Claude aan je WordPress-site koppelen](/nieuws/claude-wordpress-verbinden-mcp) hoe dat werkt.

Benieuwd hoe groot het aanbod aan koppelingen voor Claude inmiddels is? Op hetlaatsteainieuws.nl lees je wat de [Claude Marketplace met 2.000 plug-ins](https://www.hetlaatsteainieuws.nl/nieuws/claude-marketplace-2000-plugins-connectors) voor jou betekent.

## Checklist: ben je klaar?

- [ ] Strapi draait op versie 5.47.0 of nieuwer
- [ ] `mcp: { enabled: true }` staat in `config/server.js` en Strapi is herstart
- [ ] Je hebt een Admin token gemaakt (geen Content API-token) en veilig bewaard
- [ ] Het eerste token heeft alleen leesrechten
- [ ] Claude Desktop of Claude Code toont de Strapi-tools
- [ ] Je hebt eerst getest op een lokale of staging-omgeving
- [ ] Draft & Publish staat aan als je Claude wilt laten publiceren

## Bronnen

- [MCP server](https://docs.strapi.io/cms/features/strapi-mcp-server) — Strapi Docs
- [Strapi MCP is now Generally Available](https://strapi.io/blog/how-to-connect-strapi-mcp-server-to-cursor-ide) — Strapi blog, 3 september 2026
- [Admin tokens](https://docs.strapi.io/cms/features/admin-tokens) — Strapi Docs
