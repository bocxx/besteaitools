---
title: "Je eerste MCP-server koppelen aan Claude Desktop in 4 stappen"
description: "MCP is de standaard waarmee AI-tools bij je bestanden komen. Zo koppel je in een kwartier de filesystem-server aan Claude Desktop, met goedkeuring per actie."
publishedAt: 2026-09-23
updatedAt: 2026-09-23
author: "Redactie"
category: "gids"
tags:
  - "mcp"
  - "model-context-protocol"
  - "claude-desktop"
  - "anthropic"
  - "tool-integratie"
  - "agents"
  - "workflow"
toolSlug: "mcp"
featured: false
draft: false
readingTime: 5
heroScene: "A small chrome robot plugs a single labelled cable from a workbench into a miniature filing cabinet, while a tiny padlock and a stamped approval slip lie beside the socket, warm focused lamp light"
heroImage: "/images/articles/diorama-mcp-server-koppelen-claude-desktop.webp"
heroImageAlt: "Miniatuur diorama-illustratie bij artikel 'Je eerste MCP-server koppelen aan Claude Desktop in 4 stappen'"
keyTakeaways:
  - "MCP is een open standaard: één server werkt in elke client die het protocol ondersteunt, van Claude tot Cursor en VS Code."
  - "Voor de eerste koppeling heb je alleen Claude Desktop en Node.js nodig — de server zelf haalt npx automatisch op."
  - "Je bepaalt zelf welke mappen toegankelijk zijn. De server draait met jouw gebruikersrechten, dus kies de mappen bewust."
  - "Elke actie vraagt om je goedkeuring voordat hij wordt uitgevoerd. Lees die verzoeken, ze zijn je enige rem."
faq:
  - q: "Wat is MCP en waarom zou ik het gebruiken?"
    a: "Het Model Context Protocol is een open standaard om AI-modellen te koppelen aan externe tools, bestanden en API's. Het is in november 2024 door Anthropic gelanceerd en in december 2025 ondergebracht bij de Agentic AI Foundation onder de Linux Foundation. Het nut zit in de standaardisatie: een MCP-server die je één keer opzet, werkt daarna in elke client die het protocol ondersteunt — Claude, ChatGPT, Cursor, VS Code, Gemini en tientallen andere. Je hoeft dus geen aparte koppeling per AI-tool te bouwen."
  - q: "Waar staat het configuratiebestand van Claude Desktop?"
    a: "Op macOS in `~/Library/Application Support/Claude/claude_desktop_config.json`, op Windows in `%APPDATA%\\Claude\\claude_desktop_config.json`. Je hoeft dat pad niet zelf op te zoeken: open Claude Desktop, klik in de menubalk op Claude, kies Settings, ga naar het tabblad Developer en klik op Edit Config. Bestaat het bestand nog niet, dan maakt Claude het op dat moment aan. Let op dat dit de instellingen van de desktop-app zijn, niet die van je Claude-account in het venster zelf."
  - q: "Waarom ziet Claude mijn MCP-server niet na het opslaan?"
    a: "In bijna alle gevallen is de app niet volledig herstart, of staat er een fout in de JSON. Sluit Claude Desktop helemaal af en start opnieuw op. Controleer daarna of alle mappaden in je configuratie absoluut zijn en niet relatief. Werkt het nog niet, draai de serveropdracht dan handmatig in je terminal om de foutmelding te zien. Op macOS staan de logbestanden in `~/Library/Logs/Claude`; `mcp.log` bevat de algemene verbindingsfouten en `mcp-server-NAAM.log` de output van die ene server."
  - q: "Hoe veilig is het om Claude toegang tot mijn bestanden te geven?"
    a: "De filesystem-server draait met jouw gebruikersrechten, dus hij kan alles wat jij handmatig ook kunt in de mappen die je opgeeft. Twee dingen begrenzen dat. Ten eerste geef je in de configuratie expliciet op welke mappen toegankelijk zijn; alles daarbuiten blijft onzichtbaar. Ten tweede vraagt Claude per bewerking om je goedkeuring voordat hij iets uitvoert. Begin daarom met één onschuldige map, bijvoorbeeld Downloads, en breid pas uit als je ziet welke verzoeken langskomen."
  - q: "Kan ik MCP ook zonder JSON-bestand installeren?"
    a: "Ja, voor een deel. Anthropic biedt Desktop Extensions: MCP-servers die je met één klik installeert via Settings, Extensions, Browse extensions. Dat scheelt handmatig configureren en het regelen van afhankelijkheden. Niet elke server zit in die directory, en voor servers die je zelf schrijft of die specifieke mappaden nodig hebben, kom je alsnog bij `claude_desktop_config.json` uit. Voor cloudtools bestaat daarnaast de route via remote MCP en custom connectors."
---

MCP is de reden dat je AI-assistent tegenwoordig bij je bestanden, je agenda of je CMS kan. Het is een open standaard, dus wat je één keer koppelt werkt in meerdere tools. Deze gids doet de eenvoudigste variant: de officiële filesystem-server aan Claude Desktop hangen, zodat Claude in aangewezen mappen kan lezen, schrijven en opruimen, met jouw goedkeuring per handeling.

## Wat MCP is, kort

Het Model Context Protocol werd in november 2024 door Anthropic gelanceerd en is sinds december 2025 ondergebracht bij de Agentic AI Foundation onder de Linux Foundation, mede opgericht door Anthropic, OpenAI en Block. Dat verklaart waarom het inmiddels niet meer alleen in Claude werkt: dezelfde server draait ook in Cursor, VS Code en andere clients die het protocol ondersteunen.

Een MCP-server is gewoon een programma dat op je computer draait en een aantal gereedschappen aanbiedt. De filesystem-server uit deze gids levert er vier soorten: bestanden en mapstructuren lezen, nieuwe bestanden en mappen maken, bestanden verplaatsen en hernoemen, en zoeken op naam of inhoud ([Bron: Model Context Protocol](https://modelcontextprotocol.io/docs/2026-07-28/develop/connect-local-servers)).

## Stap 1 — Controleer je twee vereisten

Je hebt Claude Desktop nodig (macOS of Windows) en Node.js. Heb je Claude Desktop al, controleer dan via het Claude-menu of je de nieuwste versie draait met **Check for Updates…**

Node.js check je in een terminal of opdrachtprompt:

```bash
node --version
```

Krijg je geen versienummer, installeer dan de LTS-versie via nodejs.org. Die is stabieler dan de nieuwste release en is wat de MCP-documentatie aanraadt.

## Stap 2 — Open het configuratiebestand

Klik in de menubalk van je systeem op **Claude** (niet op de instellingen ín het Claude-venster) en kies **Settings…**. Ga naar het tabblad **Developer** in de zijbalk en klik op **Edit Config**.

Dat opent `claude_desktop_config.json`, of maakt hem aan als hij nog niet bestaat. Op macOS staat hij in `~/Library/Application Support/Claude/`, op Windows in `%APPDATA%\Claude\`.

## Stap 3 — Zet de server in de configuratie

Vervang de inhoud van het bestand door dit blok, en zet op de plek van `username` je eigen gebruikersnaam:

```json
{
  "mcpServers": {
    "filesystem": {
      "command": "npx",
      "args": [
        "-y",
        "@modelcontextprotocol/server-filesystem",
        "/Users/username/Desktop",
        "/Users/username/Downloads"
      ]
    }
  }
}
```

Op Windows gebruik je Windows-paden met dubbele backslashes, bijvoorbeeld `C:\\Users\\username\\Downloads`.

De regels betekenen dit: `filesystem` is de naam die je straks in Claude terugziet, `npx` start de server, `-y` bevestigt de installatie van het pakket automatisch, en alles daarna is een map die de server mag benaderen. Die laatste lijst is je belangrijkste veiligheidsknop.

> **💡 Beginner-tip:** begin met één map die je niet erg vindt om kwijt te raken — Downloads is een goede eerste keuze. Je kunt later gewoon paden toevoegen. De server draait met jouw gebruikersrechten en kan in die mappen alles wat jij ook handmatig kunt, dus je Documenten-map er meteen bij zetten is een grotere stap dan hij lijkt.

## Stap 4 — Herstart en controleer

Sluit Claude Desktop volledig af (niet alleen het venster) en start opnieuw op. Klik daarna linksonder in het invoerveld op de indicator **Add files, connectors, and more**, ga naar **Connectors** en kies **Manage connectors**. Staat `filesystem` in de lijst met zijn beschikbare gereedschappen, dan werkt de koppeling.

Test hem met een onschuldige opdracht: *"welke bestanden staan er in mijn Downloads-map?"* Claude vraagt eerst toestemming voordat hij iets doet. Lees dat verzoek daadwerkelijk — het is de enige plek waar je een verkeerd begrepen instructie nog tegenhoudt.

> **⚡ Gevorderden:** ziet Claude de server niet, controleer dan drie dingen in deze volgorde: is de app écht helemaal afgesloten, is de JSON geldig, en zijn alle paden absoluut in plaats van relatief. Blijft het hangen, draai dan `npx -y @modelcontextprotocol/server-filesystem /Users/username/Downloads` handmatig in je terminal; de foutmelding die je daar krijgt is meestal het hele antwoord. De logs staan op macOS in `~/Library/Logs/Claude`, met `mcp.log` voor verbindingsfouten.

## Wat je hierna kunt doen

Deze koppeling is het patroon voor alle andere. Wil je liever klikken dan JSON bewerken, kijk dan in Claude Desktop bij **Settings → Extensions → Browse extensions**: daar staan MCP-servers die je met één klik installeert. Voor cloud-diensten loopt het via remote MCP, zoals we lieten zien bij [Claude aan je WordPress-site koppelen](/nieuws/claude-wordpress-verbinden-mcp) en bij [Canva koppelen aan Gemini Spark](/nieuws/gemini-spark-canva-mcp-koppelen).

Schrijf je zelf een server, houd dan de spec-wijzigingen in de gaten. Die staan beschreven in onze update over [de stateless MCP-spec](/nieuws/mcp-stateless-spec-voorbereiden).

## Checklist: ben je klaar?

- [ ] Claude Desktop geïnstalleerd en bijgewerkt via Check for Updates…
- [ ] `node --version` geeft een versienummer terug
- [ ] `claude_desktop_config.json` geopend via Settings → Developer → Edit Config
- [ ] `mcpServers`-blok geplakt met je eigen gebruikersnaam in de paden
- [ ] Alleen mappen opgegeven waarvan je de toegang bewust accepteert
- [ ] Claude Desktop volledig afgesloten en opnieuw gestart
- [ ] `filesystem` zichtbaar onder Manage connectors
- [ ] Testopdracht gedaan en het goedkeuringsvenster gezien

Voor je een tweede of derde server aan dit lijstje toevoegt: loop [deze vijf checks](/nieuws/mcp-server-installeren-checks) langs, want het register waar servers in staan controleert alleen eigenaarschap, geen code. Wat je hier bouwt is de bouwsteen onder wat men AI-agents noemt: een model dat niet alleen praat maar ook handelt. Op onze zustersite staat daar een breder stuk over, inclusief de risico's: [AI-agents in 2026 — wat zijn ze en wat kun je er echt mee](https://www.hetlaatsteainieuws.nl/achtergrond/ai-agents-2026-wat-zijn-ze).

## Bronnen

- [Model Context Protocol — Connect to local MCP servers (spec 2026-07-28)](https://modelcontextprotocol.io/docs/2026-07-28/develop/connect-local-servers)
- [Anthropic — Introducing the Model Context Protocol](https://www.anthropic.com/news/model-context-protocol)
- [Anthropic — Claude Desktop Extensions: one-click MCP server installation](https://www.anthropic.com/engineering/desktop-extensions)
