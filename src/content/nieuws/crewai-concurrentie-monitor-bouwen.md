---
title: "Concurrentie-monitor bouwen met CrewAI: twee agents, één briefing"
description: "Bouw met CrewAI een concurrentie-monitor: een researcher zoekt en leest bronnen, een analist schrijft de briefing. Met configuratie en de grenzen van scrapen."
publishedAt: 2026-10-07
updatedAt: 2026-10-07
author: "Redactie"
category: "gids"
tags:
  - "crewai"
  - "ai-agents"
  - "multi-agent"
  - "concurrentieanalyse"
  - "web-scraping"
  - "python"
toolSlug: "crewai"
featured: false
draft: false
readingTime: 6
heroImage: "/images/articles/diorama-crewai-concurrentie-monitor-bouwen.webp"
heroImageAlt: "Miniatuur diorama-illustratie bij artikel 'Concurrentie-monitor bouwen met CrewAI: twee agents, één briefing'"
heroScene: "Two tiny robots at a wooden desk, one sorting stacks of miniature shop catalogues, the other filing a folded briefing into a drawer"
evergreen: true
volatility: high
factsCheckedAt: 2026-10-07
watch:
  - "crewai-cli"
  - "crewai-versie"
  - "serper-pricing"
keyTakeaways:
  - "Een concurrentie-monitor in CrewAI bestaat uit twee agents: een researcher met zoek- en scrapetools en een analist die de vondsten tot een briefing van één pagina terugbrengt."
  - "Nieuwe CrewAI-projecten zijn JSON-first: agents staan in agents/*.jsonc, taken en volgorde in crew.jsonc. De oude YAML-opzet krijg je nog met de vlag --classic."
  - "SerperDevTool zoekt via de Serper-API (sleutel in SERPER_API_KEY); ScrapeWebsiteTool leest de inhoud van een opgegeven webpagina."
  - "Met een placeholder als {concurrent} draai je dezelfde crew voor elke concurrent; ontbreekt een waarde, dan vraagt crewai run erom."
  - "Scrape alleen openbare bedrijfsinformatie: respecteer robots.txt en gebruiksvoorwaarden, en verzamel geen persoonsgegevens. De AP noemt scraping van persoonsgegevens door bedrijven vrijwel nooit toegestaan."
faq:
  - q: "Kan ik met CrewAI automatisch mijn concurrenten volgen?"
    a: "Ja. Je bouwt een crew met een researcher-agent die het web doorzoekt en relevante pagina's leest, en een analist-agent die daar een korte briefing van maakt. Die briefing landt als markdown-bestand in de map output/. Het framework is gratis en open source; je betaalt alleen voor het taalmodel en de zoek-API die je koppelt. Controleer de eerste weken wel elke bron in de output met de hand."
  - q: "Mag ik websites van concurrenten scrapen?"
    a: "Openbare bedrijfsinformatie zoals prijzen, productpagina's en persberichten lezen is gangbaar, maar je zit wel aan regels vast. Respecteer robots.txt, lees de gebruiksvoorwaarden van de site (die kunnen hergebruik contractueel beperken) en verzamel geen persoonsgegevens: volgens de Autoriteit Persoonsgegevens is scraping van persoonsgegevens door bedrijven vrijwel nooit toegestaan. Twijfel je bij commercieel gebruik op grote schaal, vraag dan juridisch advies."
  - q: "Waarom ziet mijn CrewAI-project er anders uit dan in oudere tutorials?"
    a: "Nieuwe projecten die je met crewai create crew aanmaakt zijn JSON-first: agents staan in agents/*.jsonc en taken in crew.jsonc. Oudere tutorials gebruiken crew.py met config/agents.yaml en config/tasks.yaml. Die indeling bestaat nog: maak je project dan aan met de vlag --classic. Beide varianten start je met crewai run."
  - q: "Wat kost een CrewAI-concurrentiemonitor?"
    a: "Het framework zelf kost niets. De kosten zitten in het taalmodel dat de agents aandrijft (per verwerkt token) en in de zoek-API. Serper heeft een gratis instap, zie de tabel Stand van zaken onderaan voor de actuele cijfers. Begin met één concurrent en een klein model en kijk na een paar runs wat het je per briefing kost."
sources:
  - label: "CrewAI Docs — Build Your First Crew"
    url: "https://docs.crewai.com/en/guides/crews/first-crew"
  - label: "CrewAI Docs — Installation"
    url: "https://docs.crewai.com/en/installation"
  - label: "CrewAI Docs — Crews (JSONC-configuratie)"
    url: "https://docs.crewai.com/en/concepts/crews"
  - label: "CrewAI Docs — SerperDevTool"
    url: "https://docs.crewai.com/en/tools/search-research/serperdevtool"
  - label: "CrewAI Docs — ScrapeWebsiteTool"
    url: "https://docs.crewai.com/en/tools/web-scraping/scrapewebsitetool"
  - label: "PyPI — crewai"
    url: "https://pypi.org/project/crewai/"
  - label: "IETF — RFC 9309 Robots Exclusion Protocol"
    url: "https://www.rfc-editor.org/rfc/rfc9309.html"
  - label: "Autoriteit Persoonsgegevens — Handreiking scraping door particulieren en private organisaties"
    url: "https://www.autoriteitpersoonsgegevens.nl/system/files?file=2024-05/Handreiking%20scraping%20door%20particulieren%20en%20private%20organisaties.pdf"
  - label: "Hof van Justitie EU — Ryanair/PR Aviation (C-30/14)"
    url: "https://eur-lex.europa.eu/legal-content/NL/TXT/?uri=CELEX:62014CJ0030"
---

Bijhouden wat concurrenten doen is nuttig. Er elke week een middag aan kwijt zijn is dat minder. Met [CrewAI](/ai-tools/crewai) bouw je een monitor die het zoekwerk overneemt: een researcher-agent verzamelt productnieuws, prijzen en vacatures, een analist-agent maakt er een briefing van één pagina van. Deze gids gaat over die toepassing. Installatie en het idee achter een crew staan in [CrewAI voor beginners: je eerste multi-agent-crew](/nieuws/crewai-eerste-crew-bouwen); die stappen herhalen we hier niet.

## Wat je bouwt

Twee agents, twee taken, in vaste volgorde. De **researcher** krijgt twee tools: een zoektool om recente berichten te vinden en een scrapetool om de pagina's van de concurrent zelf te lezen. De **analist** krijgt geen tools, alleen de output van de researcher, en schrijft daar een briefing van met de drie belangrijkste signalen. Dat is het standaardpatroon uit de CrewAI-docs: de tweede taak krijgt de eerste als `context` mee ([Bron: CrewAI Docs](https://docs.crewai.com/en/guides/crews/first-crew)).

Onder de motorkap draait elke agent dezelfde tool-calling-lus die je in [de agent-loop met Gemini](/nieuws/gemini-function-calling-agent-loop) zelf nabouwt; CrewAI regelt die lus en de overdracht voor je. Waarom twee agents en niet één prompt? Zoeken en oordelen zijn verschillende klussen. Een agent die alleen hoeft te verzamelen, met bron-URL erbij, levert controleerbaarder materiaal op dan een agent die tegelijk moet zoeken én conclusies trekken.

## Stap 1 — Project aanmaken

CrewAI installeer je als CLI via `uv`. Nieuwe projecten zijn tegenwoordig JSON-first: agents staan in `agents/*.jsonc`, taken en crew-instellingen in `crew.jsonc` ([Bron: CrewAI Docs](https://docs.crewai.com/en/installation)).

```bash
uv tool install crewai
crewai create crew concurrentie_monitor
cd concurrentie_monitor
```

> **💡 Beginner-tip:** zie je in andere tutorials `crew.py`, `config/agents.yaml` en `config/tasks.yaml`? Dat is de oudere indeling. Die maak je nog aan met `crewai create crew concurrentie_monitor --classic`. Deze gids gebruikt de JSON-opzet die de docs nu aanraden.

## Stap 2 — De twee agents

Vervang `agents/researcher.jsonc` en maak er `agents/analist.jsonc` naast. De bestandsnaam is de naam waarmee je de agent in `crew.jsonc` aanroept. Tools geef je op met hun klassenaam ([Bron: CrewAI Docs](https://docs.crewai.com/en/concepts/crews)).

```jsonc
// agents/researcher.jsonc
{
  "role": "Concurrentie-onderzoeker voor {concurrent}",
  "goal": "Verzamel recente, controleerbare signalen over {concurrent}: productnieuws, prijswijzigingen en vacatures, steeds met bron-URL.",
  "backstory": "Je bent een nauwkeurige marktonderzoeker. Je noemt alleen wat je in een bron hebt gelezen en verzint niets.",
  "llm": "openai/gpt-4o",
  "tools": ["SerperDevTool", "ScrapeWebsiteTool"],
  "settings": { "verbose": true, "allow_delegation": false }
}
```

```jsonc
// agents/analist.jsonc
{
  "role": "Marktanalist",
  "goal": "Maak van de bevindingen over {concurrent} een briefing van één pagina met de drie belangrijkste signalen.",
  "backstory": "Je schrijft bondige briefings voor drukke ondernemers, zonder jargon, en je vermeldt bij elk signaal de bron.",
  "llm": "openai/gpt-4o",
  "settings": { "verbose": true, "allow_delegation": false }
}
```

Het `llm`-veld volgt het patroon `provider/model-id`; vervang het door het model dat je gebruikt ([Bron: CrewAI Docs](https://docs.crewai.com/en/concepts/llms)).

## Stap 3 — De tools

`SerperDevTool` doorzoekt het web via de Serper-API en verwacht je sleutel in de omgevingsvariabele `SERPER_API_KEY` ([Bron: CrewAI Docs](https://docs.crewai.com/en/tools/search-research/serperdevtool)). `ScrapeWebsiteTool` haalt een pagina op en leest de tekst eruit. Zonder vaste URL mag de agent elke site lezen die hij tegenkomt ([Bron: CrewAI Docs](https://docs.crewai.com/en/tools/web-scraping/scrapewebsitetool)).

Zet beide sleutels in `.env`:

```bash
OPENAI_API_KEY=sk-...
SERPER_API_KEY=jouw_serper_sleutel
```

Liever een zoek-API die meteen opgeschoonde paginatekst teruggeeft? Kijk naar [Exa koppelen aan je agent](/nieuws/exa-zoek-api-agent-koppelen). Voor zwaardere scrapeklussen werkt [Firecrawl](/nieuws/firecrawl-website-naar-ai-databron).

## Stap 4 — Taken en volgorde

In `crew.jsonc` leg je de taken vast. Bij `"process": "sequential"` draaien ze in de volgorde van de lijst. Via `context` krijgt de analist de output van de zoektaak mee, en `inputs` geeft standaardwaarden voor je placeholders ([Bron: CrewAI Docs](https://docs.crewai.com/en/concepts/crews)).

```jsonc
// crew.jsonc
{
  "name": "Concurrentie Monitor",
  "agents": ["researcher", "analist"],
  "tasks": [
    {
      "name": "zoektaak",
      "description": "Zoek nieuws, prijswijzigingen en vacatures van {concurrent} uit de afgelopen maand. Lees ook {website}.",
      "expected_output": "Een lijst bevindingen, elk met datum, korte omschrijving en bron-URL.",
      "agent": "researcher"
    },
    {
      "name": "briefing",
      "description": "Analyseer de bevindingen over {concurrent} en kies de drie signalen die er voor ons toe doen.",
      "expected_output": "Een markdown-briefing van maximaal één pagina: drie signalen, per signaal de bron en een advies.",
      "agent": "analist",
      "context": ["zoektaak"],
      "output_file": "output/briefing.md",
      "markdown": true
    }
  ],
  "process": "sequential",
  "verbose": true,
  "inputs": { "concurrent": "Voorbeeld B.V.", "website": "https://www.voorbeeld.nl" }
}
```

Draaien gaat met twee commando's. Haal je een standaardwaarde uit `inputs` weg, dan vraagt `crewai run` er zelf om, zodat je per run een andere concurrent kunt opgeven ([Bron: CrewAI Docs](https://docs.crewai.com/en/guides/crews/first-crew)).

```bash
crewai install
crewai run
```

> **⚡ Gevorderden:** wil je meerdere concurrenten achter elkaar volgen, met vaste stappen eromheen (vergelijken met vorige week, alleen mailen bij verandering)? Dan is een Flow de logische volgende stap. Een Flow houdt de regie en status, de crew doet het werk binnen één stap. Liever een agent-team dat lokaal draait zonder API-kosten: zie [multi-agent bouwen met Ollama](/nieuws/ollama-multi-agent-lokaal-bouwen).

## Waar de grens ligt bij scrapen

Een concurrent volgen is legitiem, maar je agent leest wel andermans site. Drie regels houden je aan de goede kant.

**Respecteer robots.txt.** Het protocol zegt zelf dat het geen vorm van toegangsautorisatie is ([Bron: RFC 9309](https://www.rfc-editor.org/rfc/rfc9309.html)), dus het is geen slot op de deur. Het is wel het duidelijkste signaal van wat een site-eigenaar niet wil. De ScrapeWebsiteTool-docs noemen geen robots.txt-controle, dus dat moet je zelf doen, bijvoorbeeld door alleen pagina's op te nemen die je vooraf hebt gecontroleerd.

**Lees de gebruiksvoorwaarden.** Het Europese Hof oordeelde dat een site-eigenaar hergebruik van zijn gegevens via de voorwaarden contractueel kan beperken, ook als die gegevens geen databankbescherming hebben ([Bron: HvJ EU, C-30/14](https://eur-lex.europa.eu/legal-content/NL/TXT/?uri=CELEX:62014CJ0030)).

**Geen persoonsgegevens.** Volgens de Autoriteit Persoonsgegevens is scraping door bedrijven vrijwel nooit toegestaan zodra er persoonsgegevens in zitten. Gericht nieuws over een organisatie verzamelen kan wel ([Bron: Autoriteit Persoonsgegevens](https://www.autoriteitpersoonsgegevens.nl/system/files?file=2024-05/Handreiking%20scraping%20door%20particulieren%20en%20private%20organisaties.pdf)). Laat de researcher dus prijzen en persberichten lezen, en geen LinkedIn-profielen van medewerkers.

Wie geen Python wil schrijven, kan een vergelijkbare analyse met de [Notion Agent](/nieuws/notion-agent-concurrentieanalyse-opzetten) laten maken. Wil je eerst scherp hebben wat een AI-agent wel en niet zelfstandig doet, lees dan de achtergrond op onze zustersite: [AI-agents in 2026: wat zijn ze en wat kun je er echt mee?](https://www.hetlaatsteainieuws.nl/achtergrond/ai-agents-2026-wat-zijn-ze)

## Checklist

- [ ] Project aangemaakt met `crewai create crew`
- [ ] `researcher.jsonc` en `analist.jsonc` ingevuld, met je eigen model in `llm`
- [ ] `OPENAI_API_KEY` (of je eigen provider) en `SERPER_API_KEY` in `.env`
- [ ] Taken met `context` en `output_file` in `crew.jsonc`
- [ ] robots.txt en voorwaarden van de concurrent-site gecontroleerd
- [ ] Eerste briefing gelezen en elke bron-URL met de hand nagelopen

## Stand van zaken — bijgewerkt 2026-10-07

De opzet hierboven blijft bruikbaar zolang CrewAI agents, taken en crews kent. De versies en cijfers hieronder veranderen vaker; die ververs je hier.

| Onderwerp | Stand |
| --- | --- |
| Laatste versie `crewai` op PyPI | 1.15.24 ([Bron: PyPI](https://pypi.org/project/crewai/)) |
| Ondersteunde Python-versies | 3.10 tot en met 3.13 (`>=3.10, <3.14`) ([Bron: CrewAI Docs](https://docs.crewai.com/en/installation)) |
| Standaard projectindeling | JSON-first (`crew.jsonc` + `agents/*.jsonc`); YAML via `--classic` |
| Licentie framework | MIT, gratis ([Bron: GitHub](https://github.com/crewAIInc/crewAI/blob/main/LICENSE)) |
| Serper gratis instap | 2.500 gratis zoekopdrachten bij aanmelding ([Bron: Serper](https://serper.dev/)) |
