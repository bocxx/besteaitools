# Link-map — bestaande DBAT-artikelen + inbound-link-strategie

Deze map laat zien welke DBAT-nieuws-artikelen er bestaan, in welke thematische clusters ze vallen, en hoe je het day-0 inbound-link-netwerk vormgeeft voor een nieuw stuk.

> **Onderhoud:** Update dit document wanneer je een nieuw artikel publiceert. Geen automatische sync — als de lijst veroudert, leidt dat tot links naar artikelen die niet bestaan. Snelle check: `ls src/content/nieuws/*.md | xargs -n1 basename | sed 's/.md$//'`.

## Bestaande artikelen (snapshot mei 2026)

Alle artikelen leven onder `/nieuws/<slug>`. **Belangrijk: anders dan hetlaatsteainieuws.nl zit hier GEEN categorie-prefix in de URL.**

| Slug | Categorie | Tool-slug | Cluster |
|------|-----------|-----------|---------|
| `claude-cowork-lancering` | lancering | claude-cowork | Claude / agents |
| `claude-instellen-1-dag-6-tools` | gids | claude-cowork | Claude / setup / longform-voorbeeld |
| `claude-design-opus` | analyse | claude | Claude / design |
| `claude-vs-chatgpt-vergelijking-2026` | vergelijking | claude | Claude / vergelijkingen |
| `ai-tekst-herkennen-menselijker-schrijven` | gids | claude | Claude / schrijven / anti-AI |
| `cursor-1-0-lancering` | lancering | cursor | Coding / AI-editors |
| `strix-open-source-ai-pentester` | lancering | strix | Coding / security |
| `zero-xyz-agent-tool-gateway` | lancering | zero-xyz | Agents / MCP / tools |

## Thematische clusters

### Claude-cluster
- `claude-cowork-lancering` — launch-analyse van Cowork
- `claude-instellen-1-dag-6-tools` — longform setup-gids (12 min — de "Rolls-Royce" van de site)
- `claude-design-opus` — Claude voor visuele taken
- `claude-vs-chatgpt-vergelijking-2026` — hoofd-vergelijking
- `ai-tekst-herkennen-menselijker-schrijven` — anti-AI-writing met Claude-prompt

Een nieuwe Claude-tutorial linkt typisch vanuit 2-3 van deze artikelen.

### Coding / AI-editors-cluster
- `cursor-1-0-lancering`
- `strix-open-source-ai-pentester`
- `zero-xyz-agent-tool-gateway` (raakt agents én coding via Claude Code)

Een nieuwe tutorial over Cursor, Windsurf, Aider, Copilot of vergelijkbare tool linkt vanuit dit cluster.

### Agents / MCP / tool-gateways-cluster
- `zero-xyz-agent-tool-gateway`
- `claude-cowork-lancering` (Cowork is een agent voor kenniswerkers)

### Schrijven / anti-AI-cluster
- `ai-tekst-herkennen-menselijker-schrijven`
- Indirect: `claude-instellen-1-dag-6-tools` (verwijst naar de anti-AI-gids)

## Inbound-link patronen — uitgewerkt

Day-0: 4-6 bestaande artikelen krijgen één natuurlijke contextuele link naar het nieuwe stuk. Hieronder werkpatronen per situatie.

### Patroon 1 — "Voor het bredere plaatje"

Plaats vroeg in een bron-artikel, in een alinea die context geeft.

**Voorbeeld** — als nieuw stuk een Claude-skill-tutorial is:

> In een normale chat praat Claude terug. In Cowork voert Claude uit. Drie soorten gereedschappen maken dat verschil... Wie verder wil dan de basis-Cowork en eigen herhaaltaken wil automatiseren, kan onze gids over [je eerste eigen Claude-skill schrijven](/nieuws/<nieuwe-slug>) erbij pakken.

### Patroon 2 — "Eerder schreven we"

Plaats in een alinea waar het nieuwe stuk thematisch logisch aansluit.

**Voorbeeld** — als nieuw stuk een Cursor-feature-tutorial is, vanuit `cursor-1-0-lancering`:

> Eerder schreven we [hoe je BugBot in je GitHub-repo koppelt](/nieuws/<nieuwe-slug>) — dat is na een week werken nog steeds de feature die we het meest hebben gebruikt.

### Patroon 3 — "Volgende stap"

Plaats aan het eind van een sectie of artikel waar logisch een vervolgactie is.

**Voorbeeld** — als nieuw stuk een geavanceerde Claude-feature is, vanuit `claude-instellen-1-dag-6-tools`:

> Eenmaal alles op zijn plek, is de logische volgende stap [eigen Claude-skills schrijven voor terugkerende taken](/nieuws/<nieuwe-slug>).

### Patroon 4 — "Vergelijkingscontext"

Plaats in een artikel dat een ander product vergelijkt — link uitbreiden met de nieuwe optie.

**Voorbeeld** — als nieuw stuk over een ChatGPT-feature gaat, vanuit `claude-vs-chatgpt-vergelijking-2026`:

> ChatGPT's nieuwe [Custom GPT met externe API-tools](/nieuws/<nieuwe-slug>) brengt iets dat Claude vooralsnog mist — voor wie veel met SaaS-integraties werkt, kan dat de doorslag geven.

## Selectie-criteria per nieuw artikel

Per nieuw stuk:

1. **Twee bronnen uit dezelfde tool-cluster.** Als nieuw stuk over Claude gaat: link vanuit twee Claude-artikelen.
2. **Een bron uit een aangrenzend cluster.** Claude → Coding (via Claude Code raakvlak) of Claude → Agents (via Cowork).
3. **Een bron uit een onverwachte hoek.** Bijvoorbeeld een vergelijkingsartikel of een schrijven-cluster artikel. Dit spreidt de PageRank-flow.
4. **Optioneel: 1-2 extra bronnen** als het natuurlijk past — soms krijg je 5 of 6 zinvolle inbound-links, soms blijft het bij 4.

Minimum: 4. Liever 4 zorgvuldig dan 6 geforceerd.

## Wat NIET in inbound-links

- **Niet meer dan één link per bron-artikel naar hetzelfde nieuwe stuk** — spam-signaal.
- **Niet linken naar een tutorial die nog niet bestaat** — check dat het bestand er staat voor je in andere artikelen erheen verwijst.
- **Niet de bestaande link-tekst overschrijven met je nieuwe link** — voeg een nieuwe zin toe, of een nieuwe paragraaf.
- **Niet linken in de Bronnen-sectie van het bron-artikel** — die is voor primaire externe bronnen, niet voor interne content.
- **Geen rijtjes inbound-links** in één paragraaf — één per natuurlijke context, gespreid over het artikel.

## Wederkerigheid — een korte regel

Als je vanuit artikel A naar een nieuw stuk linkt, check of het nieuwe stuk ook naar A verwijst. Niet verplicht (soms past het echt niet), maar wel default. Wederkerige links versterken het thematische cluster, en lezers volgen ze.

## Voorbeeld — volledige inbound-link-plaatsing

**Nieuw artikel:** `cursor-bugbot-instellen.md` (categorie gids, toolSlug cursor).

**Inbound-links te plaatsen in:**

1. **`cursor-1-0-lancering.md`** — natuurlijke plek in de BugBot-paragraaf:
   > BugBot koppelt direct aan GitHub... In een aparte gids hebben we [BugBot stap voor stap ingesteld](/nieuws/cursor-bugbot-instellen) — de OAuth-flow plus de `.cursorrules` die wij gebruiken.

2. **`claude-vs-chatgpt-vergelijking-2026.md`** — in de code-sectie:
   > Beide modellen debuggen en schrijven code op hoog niveau... Wie naast model-keuze ook AI-PR-review wil, vindt in onze gids [BugBot in Cursor instellen](/nieuws/cursor-bugbot-instellen) een werkende setup.

3. **`zero-xyz-agent-tool-gateway.md`** — in een uitbreidingsparagraaf:
   > Voor wie security-tests in de development-flow wil bouwen [Strix](/nieuws/strix-open-source-ai-pentester). Voor wie automatische code-review wil zonder team-reviewer: [BugBot in Cursor](/nieuws/cursor-bugbot-instellen).

4. **`strix-open-source-ai-pentester.md`** — in een vergelijking-paragraaf:
   > Strix focust op security-tests; voor algemene code-kwaliteit zit hetzelfde patroon in [Cursor's BugBot](/nieuws/cursor-bugbot-instellen).

Dat is vier — alle vier natuurlijk, divers in categorie en thematiek, gespreid over de site.

## Onderhoud van deze map

Deze map is sneller verouderd dan andere references. Drie momenten waarop je hem aanpast:

1. **Bij een nieuw artikel** — voeg de nieuwe slug toe aan de juiste cluster + tabel.
2. **Bij een hernoeming van een slug** — pas alle voorbeelden aan. Een dode link in de link-map zorgt voor nog meer dode links in artikelen.
3. **Bij een nieuw cluster** — als bijvoorbeeld een serie audio-AI-artikelen ontstaat, maak een "Audio / spraak"-cluster en herclassificeer.

Een kort scriptje om de tabel snel te regenereren als hij ver achterloopt:

```bash
cd ~/Projects/DEPLOYED/debesteaitools.nl.ai
for f in src/content/nieuws/*.md; do
  slug=$(basename "$f" .md)
  cat=$(grep -m1 '^category:' "$f" | sed 's/category: *//' | tr -d '"')
  tool=$(grep -m1 '^toolSlug:' "$f" | sed 's/toolSlug: *//' | tr -d '"')
  echo "| \`$slug\` | $cat | $tool | ? |"
done
```

Run het scriptje, plak de output in deze tabel, en update de cluster-kolom handmatig.
