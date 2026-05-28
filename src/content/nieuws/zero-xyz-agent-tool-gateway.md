---
title: "zero.xyz geeft je AI-agent toegang tot 8.000 tools — zonder API-keys"
heroImageAlt: "Miniatuur diorama-illustratie bij artikel 'zero.xyz geeft je AI-agent toegang tot 8.000 tools — zonder API-keys'"
description: "Een nieuwe gateway op Product Hunt verbindt Claude Code, Codex en Gemini met circa 8.000 tools via de x402-standaard. Wat het kan, wanneer je het inzet."
publishedAt: 2026-05-28
updatedAt: 2026-05-28
author: "Redactie"
category: "lancering"
tags:
  - "zero-xyz"
  - "agent-tools"
  - "x402"
  - "mcp"
  - "agent-payments"
  - "claude-code"
  - "ai-agents"
toolSlug: "zero-xyz"
featured: true
readingTime: 5
heroImage: "/images/articles/diorama-zero-xyz-agent-tool-gateway.webp"
keyTakeaways:
  - "zero.xyz lanceerde op Product Hunt als gateway tussen AI-agents en circa 8.000 tools — zonder dat je per tool API-keys hoeft te configureren."
  - "De gateway werkt met Claude Code, Codex, Gemini, OpenClaw, Hermes en de meeste andere CLI-agents en routeert calls via de x402-standaard (HTTP 402 payments van Coinbase/Cloudflare) of bestaande MCP-servers."
  - "Tools krijgen een score per taak op basis van agent-reviews — als jouw agent een PDF-extractor zoekt, ziet hij eerst de best-presterende variant voor dat type werk."
  - "Pricing: 5 euro startkrediet gratis, daarna pay-per-use via x402 — geen abonnement, je betaalt alleen wat je agent daadwerkelijk verbruikt."
  - "Voor MKB-teams die met Claude Code of een vergelijkbare CLI werken is dit het eerste echte alternatief voor 'manual MCP server toevoegen per use case'."
faq:
  - q: "Is zero.xyz hetzelfde als een MCP-server?"
    a: "Niet helemaal. MCP (Model Context Protocol) is een open standaard voor hoe agents praten met tools — zero.xyz is een gateway die zowel MCP-servers als x402-aangeboden tools centraal beschikbaar maakt. Voor de agent voelt het als één integratie, maar onder de motorkap worden meerdere protocollen ondersteund. Vergelijk het met OpenRouter voor LLM's: één endpoint, veel onderliggende providers."
  - q: "Wat is x402 eigenlijk?"
    a: "x402 is een open standaard voor agent-betalingen, gebaseerd op de oude HTTP 402-statuscode 'Payment Required'. Coinbase en Cloudflare publiceerden in 2025 de specificatie. Een tool kan via x402 zeggen 'dit kost 0.001 USDC per call' en de agent betaalt automatisch via de bijgekoppelde wallet. Het is de basis van wat nu de 'agentic web' wordt genoemd — services die zijn ontworpen om door agents gebruikt te worden, niet door mensen."
  - q: "Mag mijn agent zomaar betalingen doen via x402?"
    a: "Technisch ja — zero.xyz handelt het af binnen je 5 euro startkrediet en daarboven binnen wat je wallet toestaat. Verstandig is om limieten in te stellen: een dag-budget per agent, een maximum per call, en logging zodat je achteraf kunt zien welke tools je tokens consumeerden. Voor production-agents zou je dit niet zonder rate-limits inzetten — net als bij elke andere agent-uitgave."
  - q: "Werkt dit ook in Nederland?"
    a: "Ja, geen geografische restrictie. De agent draait waar jij draait, en zero.xyz routeert vanaf de cloud. Aandachtspunt: voor compliance onder de EU AI Act blijft jouw organisatie verantwoordelijk voor wat de agent doet, ook als de tool zelf in de VS draait. Praktisch: log welke tools je agents via zero.xyz gebruiken; dat is je audit-trail."
  - q: "Hoe verhoudt dit zich tot OpenRouter en Composio?"
    a: "OpenRouter routeert LLM-calls, niet tools — andere laag. Composio biedt vooraf-gebouwde MCP-integraties met SaaS-tools (Salesforce, Notion, etc.) op basis van OAuth en API-keys die jij beheert. zero.xyz vult dat aan met het 'agentic web' van x402-tools, vaak nieuwere of niche-services die je niet snel zelf zou configureren. Veel teams gaan straks beide gebruiken: Composio voor de 20 grote SaaS-systemen, zero.xyz voor de long-tail."
---

## Wat zero.xyz precies oplost

Iedereen die met Claude Code of een vergelijkbare CLI-agent werkt loopt tegen hetzelfde aan: zodra je agent iets buiten z'n directe toolset moet doen — een specifieke API aanroepen, een geocoding-service gebruiken, een document converteren — komen er configuratie-bestanden, API-keys, en MCP-servers die je per use-case moet onderhouden.

[zero.xyz](https://www.producthunt.com/products/zero-xyz) is een gateway die deze configuratie-laag wegabstraheert. Eén CLI-installatie, en je agent heeft direct toegang tot circa 8.000 tools — gerangschikt per taak op basis van hoe agents (niet mensen) ze beoordelen. Het project staat op Product Hunt sinds eind mei 2026 en is binnen één dag de top-25 launches van die week binnen geschoten.

## De architectuur in één alinea

zero.xyz is geen alternatief voor MCP, maar bouwt erbovenop. De gateway accepteert agent-requests, kijkt of er een MCP-server of een x402-aangeboden tool beschikbaar is die de gevraagde taak kan vervullen, en routeert de call door. Betaalt zelf via je gekoppelde wallet of het startkrediet, en geeft de output terug aan de agent. Vanuit het perspectief van de agent voelt het als één tool — onder water is het potentieel honderden microservices.

> Dit patroon — één gateway die meerdere onderliggende protocollen verstopt — is hetzelfde wat OpenRouter doet voor LLM-providers en wat Composio doet voor enterprise-SaaS. Het verschil: zero.xyz focust expliciet op de "agentic web", de groei van x402-tools die zijn gebouwd om door agents te worden gebruikt, niet door mensen via een browser.

## Wanneer dit nuttig is

**Wel:**
- Je werkt al met [Claude Code, Codex of een vergelijkbare CLI-agent](/nieuws/claude-instellen-1-dag-6-tools) en wil de capabilities uitbreiden zonder MCP-servers individueel op te zetten.
- Je experimenteert met agent-workflows en wilt niet voor elke API een aparte sleutel beheren.
- Je bouwt aan een proof-of-concept waarvoor je 5-10 verschillende externe services nodig hebt en wilt snel iteratie kunnen doen.
- Je hebt een team van developers die agents inzetten voor diverse use-cases en je wilt centrale logging/billing.

**Niet:**
- Je hebt 1-2 vaste integraties met specifieke SaaS-tools (Notion, Salesforce, etc.). Daarvoor is Composio of een eigen MCP-server vaak directer.
- Je werkt aan productie-systemen met strikte compliance-eisen. zero.xyz is jong; voor enterprise wil je waarschijnlijk in een controleerbaar netwerk blijven.
- Je hebt geen budget voor variabele kosten. De 5 euro startkrediet is genoeg voor experimenten, maar serieus gebruik gaat geld kosten.
- Je wantrouwt agent-payments principieel. x402 is open en transparant, maar de hele "agent betaalt zelf"-cyclus is nieuw genoeg dat sommige teams er eerst regels voor willen zien.

## Aan de slag in 3 minuten

```bash
# Installeren via npm
npm install -g @zero-xyz/cli

# Inloggen, koppelt je 5 euro startkrediet
zero login

# Voor Claude Code: registreren als tool-provider
claude mcp add zero-xyz "npx @zero-xyz/cli mcp"

# Test in Claude Code:
# "Vind een gratis PDF-naar-markdown converter en zet onderstaande PDF om"
```

Vanaf dat moment zoekt Claude bij elke tool-vraag eerst in z'n eigen tools, en als hij geen match vindt, vraagt hij zero.xyz om alternatieven. Per oproep zie je in de logs welke tool werd gekozen en wat het kostte.

> Praktisch advies: zet vanaf dag één een dag-budget per agent (`zero limits --max-day 1.00`). Een agent die te enthousiast tools probeert kan binnen een uur je startkrediet opmaken. Dat is geen ramp — het is 5 euro — maar het is een goede gewoonte voor wanneer je serieuzer met agent-payments gaat werken.

## Onze inschatting

Voor wie z'n agent-stack tactisch wil opzetten — bijvoorbeeld zoals beschreven in onze gids om [Claude Cowork in één dag in te richten](/nieuws/claude-instellen-1-dag-6-tools) — biedt zero.xyz precies de laag die tot nu toe in de praktijk ontbrak: een tool-discovery-layer die niet vraagt om handmatige integratie per service.

Het is geen vervanging van Composio voor SaaS-integraties, en geen vervanging van eigen MCP-servers voor business-kritische tools. Maar voor de long-tail aan handige hulpmiddelen — converters, fetchers, scrapers, lookup-services — vermindert het de friction tussen "agent heeft idee" en "agent voert het uit" tot praktisch nul.

Twee dingen om in de gaten te houden de komende maanden: de tool-coverage (is 8.000 echt nuttig of zit er veel ruis bij?) en de stabiliteit van het x402-ecosysteem. Beide zijn jong, beide kunnen snel veranderen. Maar het richting-signaal — agent-payments + tool-gateways als nieuwe laag in de stack — past in waar de [bredere agent-trend van 2026](/nieuws/cursor-1-0-lancering) heen gaat. Voor de context over wát die agents in de praktijk al doen voor Nederlandse organisaties, geeft onze zustersite een goed overzicht in [AI-agents 2026: wat zijn ze eigenlijk?](https://hetlaatsteainieuws.nl/ai-deep-dives/ai-agents-2026-wat-zijn-ze) — handig om bij je team te delen voordat je zero.xyz inzet.

## Bronnen
- [Product Hunt — zero.xyz](https://www.producthunt.com/products/zero-xyz) — launch-page met votes en discussion.
- [x402 Specification](https://x402agentic.ai/docs/) — officiële documentatie van de HTTP 402-betalingsstandaard.
- [Coinbase Developer Platform — x402](https://www.coinbase.com/developer-platform/discover/launches/x402) — Coinbase's introductie van x402.
- [Anthropic — Model Context Protocol](https://modelcontextprotocol.io/) — onderliggende protocol-standaard die zero.xyz ook serveert.
- [Composio — MCP integrations](https://composio.dev/) — de bekende SaaS-MCP-aanbieder ter vergelijking.
