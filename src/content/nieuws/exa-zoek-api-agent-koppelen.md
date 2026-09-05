---
title: "Exa instellen: een zoek-API die je agent leesbare webtekst teruggeeft"
heroImage: "/images/articles/diorama-exa-zoek-api-agent-koppelen.webp"
description: "Exa is een zoek-API gebouwd voor AI-agents: semantisch zoeken plus opgeschoonde paginatekst in één antwoord. In vier stappen van API-sleutel naar werkende call."
publishedAt: 2026-09-05
updatedAt: 2026-09-05
author: "Redactie"
category: "gids"
tags:
  - "exa"
  - "zoek-api"
  - "rag"
  - "ai-agent"
  - "python"
  - "semantisch-zoeken"
toolSlug: "exa"
featured: false
draft: false
readingTime: 4
heroImageAlt: "Miniatuur diorama-illustratie bij artikel 'Exa instellen: een zoek-API die je agent leesbare webtekst teruggeeft'"
heroScene: "A tiny librarian robot pulling one highlighted paragraph out of a stack of web pages and handing it through a small hatch to a waiting chatbot"
keyTakeaways:
  - "Exa is een zoek-API voor AI-agents: je krijgt semantisch gevonden resultaten plus opgeschoonde paginatekst in één antwoord, zonder zelf te scrapen."
  - "Gratis beginnen kan: 20 dollar aan credits bij aanmelden plus 10 dollar per maand, zonder dat je een betaalmethode opgeeft."
  - "Met het veld type kies je de afweging tussen snelheid en diepte, van instant (~250 ms) tot deep-reasoning (12-40 seconden)."
  - "Gebruik contents met highlights in plaats van de volledige tekst — dat scheelt fors in tokens die je aan je taalmodel voert."
faq:
  - q: "Wat is Exa en waarin verschilt het van een gewone zoek-API?"
    a: "Exa is een zoekmachine die is gebouwd voor AI in plaats van voor mensen. Twee dingen maken het verschil. Ten eerste zoekt Exa semantisch: je beschrijft wat je zoekt in gewone taal en het systeem matcht op betekenis in plaats van op trefwoorden. Ten tweede levert het niet alleen links, maar in hetzelfde antwoord ook de opgeschoonde tekst van die pagina's — als volledige tekst of als highlights, korte fragmenten met alleen de relevante passages. Dat scheelt je een eigen scraper plus de opschoonstap die daarbij hoort ([Bron: Exa](https://exa.ai/docs/reference/search-api-guide))."
  - q: "Wat kost Exa en kan ik gratis beginnen?"
    a: "Je kunt gratis beginnen. Het Starter-plan geeft 20 dollar aan credits bij aanmelden plus 10 dollar aan credits per maand, en vraagt geen betaalmethode. Daarna geldt pay-as-you-go per verzoek: standaard Search kost 7 dollar per 1.000 verzoeken met paginateksten voor de eerste tien resultaten inbegrepen. Deep Search is 12 dollar per 1.000, deep-reasoning 15 dollar, de Contents-endpoint 1 dollar per 1.000 pagina's per contenttype en de Answer-endpoint 5 dollar per 1.000. Elk resultaat boven de tiende kost 1 dollar extra per 1.000 verzoeken. Zie de Stand van zaken-box onderaan voor de peildatum ([Bron: Exa](https://exa.ai/pricing))."
  - q: "Welk search type moet ik kiezen?"
    a: "Dat hangt af van hoeveel wachttijd je gebruiker accepteert. auto is de standaard en duurt ongeveer een seconde. instant doet er ongeveer 250 milliseconden over en is bedoeld voor realtime toepassingen zoals chat en spraak; fast zit rond de 450 milliseconden met minimaal kwaliteitsverlies. Wil je dat Exa zelf meerdere stappen redeneert en bronnen combineert, dan pak je deep-lite (4 seconden), deep (4 tot 15 seconden) of deep-reasoning (12 tot 40 seconden). Begin met auto en schuif pas op als je merkt dat je antwoorden te dun of te traag zijn."
  - q: "Hoe beperk ik de zoekresultaten tot bepaalde sites?"
    a: "Met include_domains en exclude_domains. Beide accepteren behalve kale domeinen ook padvoorvoegsels zoals exa.ai/blog en subdomein-jokers zoals *.substack.com. Exa raadt aan die filters te gebruiken in plaats van een site:-operator in je zoekopdracht te zetten: het filter hoort in het veld, niet in de query. Handig als je een agent alleen op je eigen documentatie of op een handvol vakbronnen wilt laten zoeken."
  - q: "Kan ik Exa gebruiken zonder te programmeren?"
    a: "Ja. Exa biedt een MCP-server aan, plus een kant-en-klare connector voor Claude en een plugin voor ChatGPT. Daarmee koppel je Exa als zoekhulpmiddel aan je AI-assistent zonder zelf code te schrijven. Die route is prima om het te proberen; ga je Exa in een eigen toepassing gebruiken — bijvoorbeeld in een RAG-pijplijn — dan wil je alsnog de API met de Python- of JavaScript-SDK, omdat je daar controle hebt over search type, contentvorm en filters."
---

Je bouwt een agent die actuele informatie nodig heeft. De klassieke route: een zoek-API aanroepen, de links eruit vissen, elke pagina zelf ophalen, HTML opschonen en dan pas iets aan je taalmodel voeren. Exa slaat die drie middelste stappen over: je krijgt de gevonden pagina's mét bruikbare tekst in één antwoord terug. Hieronder in vier stappen van aanmelden naar een werkende call.

## Stap 1: sleutel ophalen en klaarzetten

Maak een account aan via het [Exa-dashboard](https://dashboard.exa.ai) en haal je sleutel op bij API keys. Het Starter-plan vraagt geen betaalmethode en geeft 20 dollar aan credits bij aanmelden plus 10 dollar per maand.

Zet de sleutel als omgevingsvariabele, niet in je code:

```bash
export EXA_API_KEY="jouw-sleutel"
```

> **💡 Beginner-tip:** een omgevingsvariabele is een waarde die buiten je bestand leeft, zodat je sleutel niet per ongeluk in Git belandt. Zet 'm in je shell-profiel of in een `.env` in je projectmap — en zet die `.env` in je `.gitignore`.

## Stap 2: de SDK installeren

Exa heeft SDK's voor Python en JavaScript. Kies er één:

```bash
pip install exa-py       # Python
npm install exa-js       # JavaScript
```

## Stap 3: je eerste zoekopdracht

Het minimale voorbeeld is drie regels. De client leest `EXA_API_KEY` vanzelf uit je omgeving:

```python
from exa_py import Exa

exa = Exa()

result = exa.search(
    "blog post about artificial intelligence",
    type="auto",
    contents={"highlights": True},
)
```

Twee velden doen hier het werk. `type="auto"` laat Exa zelf de zoekstrategie kiezen, wat ongeveer een seconde duurt. `contents={"highlights": True}` zorgt dat je per resultaat korte fragmenten terugkrijgt in plaats van de hele pagina.

Dat tweede veld is de reden dat je hier tokens bespaart. Een volledige webpagina kost je al gauw duizenden tokens waarvan het meeste navigatie en voettekst is; highlights geven alleen de passages die bij je vraag horen. Exa raadt rond de 4.000 tekens per pagina aan.

Liever eerst zonder SDK proberen? Dan werkt dit ook:

```bash
curl -s -X POST "https://api.exa.ai/search" \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer $EXA_API_KEY" \
  -d '{"query": "blog post about artificial intelligence", "type": "auto", "contents": {"highlights": true}}'
```

## Stap 4: bijsturen op snelheid, bron en vorm

Vanaf hier stel je af op wat je toepassing nodig heeft. Drie knoppen die je het vaakst gebruikt:

**Snelheid versus diepte** — het veld `type`:

| Type | Snelheid | Waarvoor |
|---|---|---|
| `auto` | ~1 seconde | Standaard, als je twijfelt |
| `instant` | ~250 ms | Realtime chat en spraak |
| `fast` | ~450 ms | Snelheid met weinig kwaliteitsverlies |
| `deep-lite` | ~4 seconden | Lichte synthese over meerdere bronnen |
| `deep` | 4-15 seconden | Meerstaps redeneren met gestructureerde output |
| `deep-reasoning` | 12-40 seconden | Zwaardere onderzoeksvragen |

**Bronnen inperken** — `include_domains` en `exclude_domains` accepteren ook padvoorvoegsels en subdomein-jokers:

```python
results = exa.search(
    "latest product announcements",
    include_domains=["exa.ai/blog"],
)
```

**Gestructureerde output** — met `output_schema` geef je een JSON-schema mee en krijg je velden terug in plaats van losse tekst. Dat werkt bij elk search type, maar is vooral nuttig bij `deep` en hoger, waar Exa daadwerkelijk over meerdere bronnen synthetiseert.

Daarnaast kun je zoeken binnen een categorie in plaats van het hele web: `company`, `people`, `publication`, `news`, `personal site` en `financial report`. Weet je vooraf welk soort bron je nodig hebt, dan scheelt dat ruis.

> **⚡ Gevorderden:** reken je kosten door vóór je een agent loslaat. De basisprijs van 7 dollar per 1.000 Search-verzoeken dekt tien resultaten; elk resultaat daarboven kost 1 dollar extra per 1.000 verzoeken, en AI-samenvattingen van pagina's zijn 1 dollar per 1.000 pagina's. Een agent die per gebruikersvraag drie keer zoekt met twintig resultaten is dus niet drie keer maar bijna zes keer zo duur als je ruwe schatting. Dezelfde afweging maakten we bij [AI-agents evalueren met LangChain](/nieuws/ai-agents-evalueren-llm-judge).

## Checklist: ben je klaar?

- [ ] Account aangemaakt en API-sleutel opgehaald bij dashboard.exa.ai
- [ ] `EXA_API_KEY` staat in je omgeving, niet in je code
- [ ] SDK geïnstalleerd (`exa-py` of `exa-js`)
- [ ] Eerste `search`-call geeft resultaten terug
- [ ] `contents={"highlights": True}` staat aan in plaats van volledige tekst
- [ ] `type` bewust gekozen op basis van je wachttijd-budget
- [ ] Domeinfilters ingesteld als je agent maar een handvol bronnen mag raadplegen
- [ ] Kosten per gebruikersvraag doorgerekend vóór je opschaalt

Wil je eerst begrijpen wat zo'n agent nu eigenlijk is voordat je er een zoek-API aan hangt, dan is [AI-agents in 2026: wat zijn ze precies?](https://hetlaatsteainieuws.nl/achtergrond/ai-agents-2026-wat-zijn-ze) op hetlaatsteainieuws.nl een goede opstap. Zoek je liever een kant-en-klare onderzoeksassistent in plaats van een API, kijk dan naar [Research doen met AI: Perplexity en NotebookLM](/nieuws/ai-research-zoeken-perplexity-notebooklm).

## Stand van zaken — bijgewerkt 2026-09-05

- Gratis Starter: 20 dollar credits bij aanmelden plus 10 dollar per maand, geen betaalmethode nodig, 10 zoekopdrachten per seconde.
- Endpoint-prijzen: Search 7 dollar, Deep Search 12 dollar, deep-reasoning 15 dollar en Monitors 15 dollar per 1.000 verzoeken; Answer 5 dollar per 1.000; Contents 1 dollar per 1.000 pagina's per contenttype.
- Resultaten boven de tiende: 1 dollar extra per 1.000 verzoeken. AI-paginasamenvattingen: 1 dollar per 1.000 pagina's.
- Search types: `auto`, `instant`, `fast`, `deep-lite`, `deep`, `deep-reasoning`.
- Zonder code: MCP-server, Claude-connector en ChatGPT-plugin beschikbaar.

## Bronnen

- [Exa — Search API guide (documentatie)](https://exa.ai/docs/reference/search-api-guide)
- [Exa — API pricing](https://exa.ai/pricing)
- [Exa — MCP-server](https://exa.ai/mcp)
