# Topic-discovery — drie voorstellen uit de data

Als de gebruiker geen specifiek onderwerp aandraagt, lever je drie voorstellen op basis van drie data-bronnen die newsflux dagelijks ververst en naar DBAT kopieert. Doel: kandidaten die (a) een hoekje bieden dat we nog niet eerder publiceerden, (b) aan een bestaande tool in de directory hangen, en (c) een verifieerbare bron hebben.

## De drie data-bestanden

Alle drie staan onder `~/Projects/DEPLOYED/debesteaitools.nl.ai/src/data/reports/` (geüpdatet via newsflux pipeline, meestal rond 05:30 's ochtends):

| Bestand | Wat het levert | Best voor |
|---------|----------------|-----------|
| `tutorial_candidates.json` | Pre-gescoorde tutorial-hoeken met `suggested_angle_nl` per item | Gids-artikelen (`category: gids`) |
| `tool_feature_news.json` | Recente feature-updates per tool, met `tool_slug`, `feature_title`, `summary_nl`, bron-URL | Update-artikelen (`category: update`) |
| `launch_radar.json` | Nieuwe tools van de afgelopen 7 dagen uit Product Hunt / GitHub / HN | Lancering-artikelen (`category: lancering`) |

## Stappenplan

**Stap 1: Lees de drie bestanden.**

```bash
cat ~/Projects/DEPLOYED/debesteaitools.nl.ai/src/data/reports/tutorial_candidates.json | jq '.for_tools[0:5]'
cat ~/Projects/DEPLOYED/debesteaitools.nl.ai/src/data/reports/tool_feature_news.json | jq '.features[0:5]'
cat ~/Projects/DEPLOYED/debesteaitools.nl.ai/src/data/reports/launch_radar.json | jq '.launches[0:5]'
```

Geen `jq` beschikbaar? Lees via Read-tool en pak de relevante velden er handmatig uit.

**Stap 2: Filter op tool-bestaan.**

Een kandidaat is alleen bruikbaar als de gerelateerde tool als JSON-bestand bestaat in `src/content/tools/`. Lijst beschikbare tools:

```bash
ls ~/Projects/DEPLOYED/debesteaitools.nl.ai/src/content/tools/*.json | xargs -n1 basename | sed 's/.json$//' | sort
```

Verwerp kandidaten waarvan de tool-slug niet in deze lijst voorkomt. (Een artikel toevoegen aan een tool die niet in de directory zit, vereist eerst dat de tool wordt aangemaakt — dat valt buiten deze skill.)

**Stap 3: Filter op recent niet gepubliceerd.**

Check of we niet net iets hebben geschreven over dezelfde tool of feature:

```bash
ls ~/Projects/DEPLOYED/debesteaitools.nl.ai/src/content/nieuws/*.md | xargs -n1 basename | grep -i "<toolnaam>"
grep -l "toolSlug: \"<slug>\"" ~/Projects/DEPLOYED/debesteaitools.nl.ai/src/content/nieuws/*.md
```

Twee gids-artikelen over dezelfde tool binnen een maand: liever niet. Eén gids + één update (na een feature-release) is prima.

**Stap 4: Score de top-5 kandidaten en kies 3.**

Per kandidaat kijk je naar:

- **Versheid van het signaal** — uit `tool_feature_news.json` met `detected_at` van de laatste 3 dagen scoort hoger dan iets van 10 dagen geleden.
- **Concreetheid van de hoek** — `suggested_angle_nl` met een werkwoord en een aantal ("Zo gebruik je X in 5 stappen") is sterker dan een vage trend ("AI verandert marketing").
- **Verifieerbaarheid** — als de bron een vendor-tweet, release-blog of officiële docs is: hoog. Een Reddit-thread alleen: middelmatig. Een TikTok-fragment: laag.
- **Lezerwaarde** — vraag jezelf: "Lost dit binnen 3 minuten een concreet probleem op voor een MKB'er of zzp'er?" Ja → houden. Nee → vervangen.

Kies drie kandidaten die qua tool en hoek voldoende uit elkaar liggen (geen drie keer dezelfde tool, geen drie keer dezelfde feature-categorie).

**Stap 5: Presenteer aan de gebruiker.**

Per voorstel toon je in maximaal 4 regels:

```
1. [Voorgestelde slug] — [tool-naam] · [category]
   Hoek: <één-regel-werkbeschrijving>
   Waarom nu: <signaal-bron + datum>
   Tool-bestand: src/content/tools/<slug>.json ✓
```

Voorbeeld:

```
1. cursor-bugbot-instellen — Cursor · gids
   Hoek: BugBot in Cursor 1.0 koppelen aan je GitHub-repo in 4 stappen.
   Waarom nu: Cursor lanceerde BugBot officieel deze week (tool_feature_news.json, 2026-05-27).
   Tool-bestand: src/content/tools/cursor.json ✓

2. claude-skills-eigen-maken — Claude · gids
   Hoek: Eerste eigen Claude-skill schrijven voor een terugkerende taak (5 stappen).
   Waarom nu: Anthropic publiceerde een open-source skill-library (tool_feature_news.json, 2026-05-26).
   Tool-bestand: src/content/tools/claude.json ✓

3. perplexity-comet-onderzoek — Perplexity Comet · gids
   Hoek: Onderzoeksvraag in 4 deelvragen splitsen met Comet, in plaats van één lange prompt.
   Waarom nu: Perplexity Comet kreeg een Pro-tier voor agentic search (launch_radar.json, 2026-05-26).
   Tool-bestand: src/content/tools/perplexity.json ✓ (of perplexity-comet.json — check eerst)
```

Wacht op de keuze van de gebruiker (1, 2, 3, of "geen — ik heb iets anders"). Pas daarna ga je naar stap 2 van de SKILL.md (tool-validatie).

## Fallback-strategieën

**Geen tutorial_candidates.json beschikbaar?** Soms is de newsflux-pipeline gefaald of nog niet gedraaid. Check `tail -20 ~/Projects/DEPLOYED/newsflux/logs/pipeline_full_morning.log`. Geen data: val terug op `tool_feature_news.json` (meestal stabieler) of vraag de gebruiker om handmatig een onderwerp aan te dragen.

**Drie kandidaten en alle drie zwak?** Zeg het. Geen kunstmatige top-3 als er geen sterke voorstel is. Vraag of de gebruiker een eigen idee heeft, of stel voor om vandaag geen tutorial te publiceren — beter geen artikel dan een dun stuk dat aan de site z'n quality bar trekt.

**Een tutorial die `lancering` zou willen zijn maar de tool bestaat niet in de directory?** Twee opties: (a) maak eerst een tool-JSON aan (handwerk buiten deze skill), (b) schrijf in plaats daarvan een `analyse`-stuk dat de tool noemt zonder `toolSlug` (kan, maar voorkomt toolcard-rendering — minder ideaal). Optie (a) is verkieslijker.

## Wat NIET op de lijst hoort

- **Politieke of opinie-stukken** — DBAT is praktisch en tool-gericht. Spaar opinies voor hetlaatsteainieuws.nl/ai-ethiek.
- **AI-trends zonder concrete tool** — een artikel over "de opkomst van agents" zonder dat een specifieke agent-tool de aanleiding is, hoort thuis op de andere site.
- **Pure productaankondigingen vendor-style** — als de hoek "kijk wat Cursor lanceerde" is zonder dat je een instructie of waardering toevoegt, schrijf je hun marketing voor ze. Voeg altijd een eigen lens toe: voor wie wel/niet, hoe je het instelt, wat het kost in praktijk.
- **Tools waarmee we geen ervaring hebben** — als er geen redactioneel oordeel mogelijk is omdat we de tool nooit zelf gebruikten, wordt het promotional. Liever pakken we tools waar onze verdict-velden in de tool-JSON al iets bevatten.

## Eén ding om vooral wel te doen

Eén tutorial per dag, één tool per tutorial. Niet drie tools in één artikel, niet één tool die je in vier varianten uitwerkt. Het ritme is **één scherp ding per dag**, niet één grote ding per week. Dat is wat de site z'n consistente verschijning geeft.
