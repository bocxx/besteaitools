---
title: "MCP wordt stateless: zo bereid je je MCP-server voor op de spec van 28 juli"
heroImageAlt: "Miniatuur diorama-illustratie bij artikel 'MCP wordt stateless: zo bereid je je MCP-server voor op de spec van 28 juli'"
description: "De grootste MCP-revisie ooit schrapt sessies en de initialize-handshake. Wat er verandert, wat er breekt en hoe je je server in vier stappen klaarzet."
publishedAt: 2026-07-21
updatedAt: 2026-07-21
author: "Redactie"
category: "update"
tags:
  - "mcp"
  - "model-context-protocol"
  - "mcp-server"
  - "stateless-http"
  - "ai-integraties"
toolSlug: "mcp"
featured: false
draft: false
readingTime: 4
heroImage: "/images/articles/diorama-mcp-stateless-spec-voorbereiden.webp"
keyTakeaways:
  - "Op 28 juli 2026 verschijnt de definitieve MCP-specificatie 2026-07-28: de grootste revisie sinds de lancering, met een stateless kern."
  - "De initialize-handshake en de Mcp-Session-Id-header verdwijnen; elk verzoek is voortaan self-contained en kan op elke serverinstantie landen."
  - "Sticky sessions en gedeelde session-stores zijn niet meer nodig: een gewone round-robin load balancer volstaat."
  - "Roots, sampling en logging zijn deprecated maar blijven minstens een jaar werken; Tasks verhuist naar een aparte extensie."
  - "Server-state regel je voortaan zelf met expliciete handles (zoals een basket_id) die het model als argument teruggeeft."
faq:
  - q: "Wat verandert er in de MCP-specificatie van juli 2026?"
    a: "De specificatie 2026-07-28 maakt het Model Context Protocol stateless. De initialize-handshake en de Mcp-Session-Id-header verdwijnen; protocolversie en client-info reizen voortaan mee in een _meta-veld op elk verzoek. Daarnaast worden extensies formeel (met MCP Apps en Tasks als eerste twee), wordt de OAuth-autorisatie aangescherpt en komt er een officieel deprecation-beleid. Het is een breaking release: bestaande servers moeten migreren."
  - q: "Breekt mijn bestaande MCP-server door de nieuwe spec?"
    a: "Als je server leunt op de protocol-sessie (Mcp-Session-Id) of op de initialize-handshake, dan ja. Ook wie het experimentele Tasks uit 2025-11-25 gebruikt moet migreren naar de nieuwe Tasks-extensie, en de foutcode voor een ontbrekende resource verandert van -32002 naar -32602. De transport-headers Mcp-Method en Mcp-Name zijn voortaan verplicht. Stdio-servers zonder sessielogica merken er het minst van."
  - q: "Hoe bewaar ik state zonder MCP-sessies?"
    a: "Met expliciete handles, zoals HTTP-API's dat al jaren doen. Laat een tool een id teruggeven (bijvoorbeeld een basket_id of browser_id) en laat het model dat id als gewoon argument meesturen bij vervolgcalls. De MCP-maintainers noemen dit patroon krachtiger dan de oude sessie: het model kan handles combineren, erover redeneren en ze doorgeven tussen stappen."
  - q: "Wanneer moet ik mijn MCP-server migreren?"
    a: "De release candidate ligt sinds 21 mei 2026 vast en de definitieve spec verschijnt op 28 juli 2026. Officiële Tier 1-SDK's leveren binnen dat venster ondersteuning. Er is geen harde deadline voor servers: clients blijven oudere protocol-versies doorgaans nog even spreken. Maar hoe eerder je stateless bent, hoe simpeler je infrastructuur — geen sticky sessions, geen gedeelde session-store."
  - q: "Wat betekent stateless MCP voor hosting en schaling?"
    a: "Elk verzoek kan op elke serverinstantie landen, dus horizontaal schalen wordt triviaal: een gewone round-robin load balancer volstaat. Gateways kunnen routeren op de nieuwe Mcp-Method-header zonder de body te inspecteren, en tools/list-antwoorden zijn cachebaar via ttlMs. Serverless platforms (Workers, Lambda) passen hierdoor ineens veel natuurlijker bij MCP."
---

De grootste revisie van het [Model Context Protocol](/tools/mcp) sinds de lancering is aangekondigd: op 28 juli 2026 wordt specificatie `2026-07-28` definitief. De kern: MCP wordt stateless. Sessies en de initialize-handshake verdwijnen, en daarmee ook de infrastructuur-hoofdpijn van sticky sessions. Bouw of beheer jij een MCP-server? Dan wil je deze wijzigingen nu alvast doorlopen — het is een breaking release.

## Wat verandert er precies?

De release candidate ligt sinds 21 mei 2026 vast; de definitieve publicatie volgt op 28 juli ([Bron: MCP-blog](https://blog.modelcontextprotocol.io/posts/2026-07-28-release-candidate/)). De belangrijkste ingrepen:

- **De protocol-sessie verdwijnt.** De `Mcp-Session-Id`-header en de `initialize`/`initialized`-handshake zijn geschrapt. Protocolversie, client-info en capabilities reizen voortaan mee in `_meta` op elk verzoek; een nieuwe `server/discover`-methode vervangt de handshake voor wie capabilities vooraf wil opvragen.
- **Verplichte routing-headers.** Streamable HTTP vereist voortaan `Mcp-Method`- en `Mcp-Name`-headers, zodat load balancers en gateways kunnen routeren zonder de request-body te lezen.
- **Caching wordt formeel.** List- en resource-antwoorden krijgen `ttlMs` en `cacheScope`, naar het model van HTTP Cache-Control.
- **Extensies worden eerste-klas**, met MCP Apps (server-gerenderde UI's) en Tasks (langlopend werk) als eerste twee officiële extensies.
- **Deprecations:** roots, sampling en logging zijn deprecated, maar blijven minstens twaalf maanden werken onder het nieuwe lifecycle-beleid.

## Stap 1: check waar je server state bewaart

Zoek in je codebase naar alles wat aan `Mcp-Session-Id` of de initialize-fase hangt. Bewaar je per sessie context (een winkelwagen, een browsersessie, een lopende analyse), dan is het nieuwe patroon: geef een expliciete handle terug uit een tool (bijvoorbeeld `basket_id`) en laat het model die als gewoon argument meesturen bij vervolgcalls. De protocol-laag beheert je state niet meer; jij wel, zichtbaar voor het model.

## Stap 2: maak elk verzoek self-contained

Controleer dat je server een los binnenkomend verzoek volledig kan afhandelen zonder eerdere requests. Concreet: lees client-info uit `_meta` in plaats van uit een opgeslagen handshake, accepteer dat elk verzoek op een andere instantie kan landen, en verwerk de nieuwe `Mcp-Method`/`Mcp-Name`-headers — je server moet verzoeken weigeren waar header en body niet overeenkomen.

## Stap 3: migreer Tasks en foutcodes

Gebruikte je het experimentele Tasks uit `2025-11-25`? De nieuwe Tasks-extensie werkt anders: de server beslist wanneer een call als taak draait en de client stuurt met `tasks/get`, `tasks/update` en `tasks/cancel`; `tasks/list` bestaat niet meer. Kleiner maar venijnig: de foutcode voor een ontbrekende resource verandert van `-32002` naar de JSON-RPC-standaard `-32602`. Matcht je client op het oude nummer, pas dat aan.

## Stap 4: versimpel je infrastructuur

Dit is de beloning. Een remote MCP-server die eerst sticky sessions en een gedeelde session-store nodig had, draait straks achter een gewone round-robin load balancer. Clients mogen `tools/list` cachen zolang jouw `ttlMs` het toelaat. Draai je op serverless infrastructuur, dan past MCP daar nu zonder kunstgrepen op.

> **⚡ Gevorderden:** de autorisatie is ook aangescherpt richting OAuth 2.0/OIDC-praktijk: clients moeten de `iss`-parameter valideren (RFC 9207) en declareren hun `application_type` bij Dynamic Client Registration. Bouw je een remote server met auth, lees die zes SEP's apart door.

Werk je vooral mét MCP-tools in plaats van eraan? Dan hoef je weinig te doen: clients zoals Claude, Cursor en VS Code volgen via hun SDK-updates. Voor de bredere context over waar agents en tool-integraties heen bewegen is [ons overzicht van AI-agents in 2026 op hetlaatsteainieuws.nl](https://hetlaatsteainieuws.nl/achtergrond/ai-agents-2026-wat-zijn-ze) een goed startpunt. En wie MCP praktisch wil proberen: onze gidsen [Claude aan WordPress koppelen via MCP](/nieuws/claude-wordpress-verbinden-mcp) en [Gemini Spark aan Canva koppelen](/nieuws/gemini-spark-canva-mcp-koppelen) laten zien hoe het er aan de gebruikskant uitziet.

## Checklist: ben je klaar?

- [ ] Geen afhankelijkheid meer van `Mcp-Session-Id` of de initialize-handshake
- [ ] State omgebouwd naar expliciete handles als tool-argumenten
- [ ] Client-info en protocolversie gelezen uit `_meta` per verzoek
- [ ] `Mcp-Method`/`Mcp-Name`-headers verwerkt én gevalideerd tegen de body
- [ ] Experimentele Tasks gemigreerd naar de Tasks-extensie
- [ ] Foutcode `-32002` vervangen door `-32602`
- [ ] Deprecated features (roots, sampling, logging) op de migratielijst gezet
- [ ] SDK-versie in de gaten: Tier 1-SDK's leveren support vóór 28 juli 2026

## Bronnen

- [The 2026-07-28 MCP Specification Release Candidate — Model Context Protocol Blog](https://blog.modelcontextprotocol.io/posts/2026-07-28-release-candidate/) (21 mei 2026)
- [Draft-specificatie + changelog — modelcontextprotocol.io](https://modelcontextprotocol.io/specification/draft)
