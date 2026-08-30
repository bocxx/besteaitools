---
title: "Browser Use gebruiken: een AI-agent die zelf websites bedient"
description: "Browser Use laat een AI-agent een echte browser besturen zonder dat jij selectors schrijft. In vijf stappen van installatie naar je eerste werkende taak."
publishedAt: 2026-08-30
updatedAt: 2026-08-30
author: "Redactie"
category: "gids"
tags:
  - "browser-use"
  - "browser-automatisering"
  - "ai-agent"
  - "python"
  - "playwright"
  - "web-scraping"
toolSlug: "browser-use"
featured: false
draft: false
readingTime: 4
heroImageAlt: "Miniatuur diorama-illustratie bij tutorial over het gebruik van Browser Use"
heroScene: "A tiny robot arm holding a magnifying glass over a miniature laptop screen showing a web form, with a small notebook of instructions instead of a wiring diagram beside it"
keyTakeaways:
  - "Browser Use is een open-source Python-library (MIT) waarmee een AI-agent een echte browser bedient op basis van een taakomschrijving in gewone taal."
  - "Installeren gaat in twee commando's: uv pip install browser-use, gevolgd door uvx browser-use install voor de meegeleverde Chromium."
  - "Je kiest zelf het model: ChatBrowserUse, ChatGoogle, ChatOpenAI of ChatAnthropic — de agent-code eromheen blijft identiek."
  - "Nieuwe accounts bij Browser Use krijgen 15 dollar aan eenmalige credits voor ChatBrowserUse; met een eigen Gemini- of OpenAI-sleutel kan het ook."
faq:
  - q: "Wat is Browser Use en waarvoor gebruik je het?"
    a: "Browser Use is een open-source Python-library waarmee een AI-agent een echte browser aanstuurt. Je beschrijft in gewone taal wat er moet gebeuren — bijvoorbeeld 'zoek de prijs van dit product op deze drie webshops' — en de agent kijkt naar de pagina en klikt zelf de stappen af. Het verschil met Selenium of Playwright is dat je geen CSS-selectors of XPath-paden vastlegt, waardoor je script blijft werken als de site-layout verandert."
  - q: "Hoe installeer ik Browser Use?"
    a: "Maak eerst een virtuele omgeving met uv aan: pip install uv, daarna uv venv --python 3.12 en source .venv/bin/activate. Installeer vervolgens de library met uv pip install browser-use en haal de meegeleverde browser binnen met uvx browser-use install. Zet daarna je API-sleutel in een .env-bestand in dezelfde map. Vanaf dat punt is een agent-script van tien regels genoeg om je eerste taak te draaien."
  - q: "Welk taalmodel moet ik kiezen voor Browser Use?"
    a: "Browser Use ondersteunt ChatBrowserUse, ChatGoogle, ChatOpenAI, ChatAnthropic en lokale modellen via Ollama. De makers raden hun eigen ChatBrowserUse aan, omdat dat model op browsertaken is afgesteld en volgens hen taken drie tot vijf keer sneller afrondt. Wil je bij een provider blijven die je al gebruikt, dan verander je alleen de importregel en de modelnaam — de rest van je script blijft hetzelfde."
  - q: "Wanneer kun je Browser Use beter niet gebruiken?"
    a: "Bij hoogvolume scraping van één stabiele website. Elke stap van de agent kost tokens en tijd, dus een hard gecodeerd Playwright-script is daar sneller en goedkoper per run. Ook bij taken die elke keer exact identiek moeten verlopen — denk aan compliance-controles — is Browser Use minder geschikt, omdat een taalmodel niet deterministisch is en dezelfde opdracht per run net anders kan uitpakken."
  - q: "Wat kost Browser Use?"
    a: "De library zelf is gratis en staat onder MIT-licentie. Je betaalt alleen voor het taalmodel dat de agent aanstuurt. Nieuwe accounts bij Browser Use krijgen volgens de documentatie 15 dollar aan eenmalige credits om ChatBrowserUse uit te proberen. Wil je in productie draaien zonder zelf browsers en sessies te beheren, dan is er Browser Use Cloud met sandboxes; die is betaald. Zie de Stand van zaken-box onderaan voor de peildatum."
---

Je wilt dat een script inlogt op een portaal, drie formulieren doorloopt en de uitkomst terugkoppelt. In Playwright schrijf je daarvoor selectors die breken zodra de site een knop verplaatst. Browser Use draait dat om: je beschrijft de taak, en de agent zoekt zelf uit welke knop hij moet hebben. Hieronder in vijf stappen van niets naar een draaiende agent.

## Stap 1: omgeving klaarzetten

Browser Use is een Python-library. De documentatie gaat uit van `uv` als pakketbeheerder en Python 3.12:

```bash
pip install uv
uv venv --python 3.12
source .venv/bin/activate     # Windows: .venv\Scripts\activate
```

## Stap 2: library en browser installeren

Twee commando's: de library zelf, en de browser waarmee de agent straks werkt.

```bash
uv pip install browser-use
uvx browser-use install
```

Dat tweede commando haalt de Chromium binnen die Browser Use aanstuurt ([Bron: Browser Use docs](https://docs.browser-use.com/quickstart)). Sla het niet over — zonder browser stopt je eerste run met een foutmelding die niet meteen duidelijk maakt wat er mist.

## Stap 3: een model kiezen en de sleutel opslaan

Browser Use is niet aan één provider gebonden. Je maakt een `.env`-bestand in je projectmap en zet daar de sleutel in van het model dat je wilt gebruiken:

```bash
BROWSER_USE_API_KEY=...     # of GOOGLE_API_KEY / OPENAI_API_KEY / ANTHROPIC_API_KEY
```

De makers raden hun eigen `ChatBrowserUse` aan, dat op browsertaken is afgesteld en volgens hen drie tot vijf keer sneller klaar is. Nieuwe accounts krijgen 15 dollar aan eenmalige credits.

> **💡 Beginner-tip:** Heb je al een Gemini-sleutel liggen? Begin daarmee. Je wisselt later van model door één importregel en één modelnaam te veranderen — de rest van je script blijft letterlijk hetzelfde. Dat maakt uitproberen goedkoop.

## Stap 4: je eerste agent draaien

Dit is de complete eerste taak. Meer is het niet.

```python
from browser_use import Agent, ChatBrowserUse
from dotenv import load_dotenv
import asyncio

load_dotenv()

async def main():
    llm = ChatBrowserUse()
    task = "Find the number 1 post on Show HN"
    agent = Agent(task=task, llm=llm)
    await agent.run()

if __name__ == "__main__":
    asyncio.run(main())
```

Vervang `task` door je eigen opdracht en houd hem concreet: één doel, één eindresultaat. "Zoek op deze pagina de contactgegevens en geef ze terug als lijst" werkt beter dan "verzamel wat informatie".

## Stap 5: naar productie, mét inloggegevens

Zodra een taak achter een login zit, wordt sessiebeheer het echte werk. Browser Use lost dat op met sandboxes: je hangt een decorator boven je functie en de dienst regelt browser, cookies en authenticatie.

```python
from browser_use import Browser, sandbox, ChatBrowserUse
from browser_use.agent.service import Agent

@sandbox(cloud_profile_id='jouw-profile-id')
async def production_task(browser: Browser):
    agent = Agent(task="Jouw taak achter een login", browser=browser, llm=ChatBrowserUse())
    await agent.run()
```

> **⚡ Gevorderden:** Reken vóór je opschaalt even door wat een run kost. Elke stap van de agent is een modelaanroep, dus een taak van twintig klikken is twintig keer betalen. Draait dezelfde taak elke dag op dezelfde stabiele site, dan is een klassiek Playwright-script goedkoper — precies de afweging die we maakten in [Zo test je een signupflow met Claude Code en Playwright](/nieuws/claude-code-signupflow-testen-playwright).

## Checklist: ben je klaar?

- [ ] Virtuele omgeving actief met Python 3.12
- [ ] `uv pip install browser-use` gedraaid
- [ ] `uvx browser-use install` gedraaid (de browser staat er)
- [ ] `.env` in de projectmap met één geldige API-sleutel
- [ ] Eerste script draait en de browser opent zichtbaar
- [ ] Taakomschrijving is één concreet doel, geen vage opdracht
- [ ] Ingeschat wat een run aan tokens kost vóór je hem inplant
- [ ] Voor taken achter een login: sandbox-route bekeken

Wil je eerst begrijpen wat een agent nu eigenlijk is voordat je er een bouwt, dan is [AI-agents in 2026: wat zijn ze precies?](https://hetlaatsteainieuws.nl/achtergrond/ai-agents-2026-wat-zijn-ze) op hetlaatsteainieuws.nl een goede opstap. En wie liever met een eigen loop begint in plaats van een library: [Je eerste agent-loop met Claude Code](/nieuws/je-eerste-agent-loop-claude-code).

## Stand van zaken — bijgewerkt 2026-08-30

- Installatie via `uv pip install browser-use` + `uvx browser-use install`, Python 3.12 in de docs.
- Ondersteunde model-klassen: `ChatBrowserUse`, `ChatGoogle`, `ChatOpenAI`, `ChatAnthropic`, plus lokale modellen.
- Nieuwe accounts: 15 dollar aan eenmalige credits voor ChatBrowserUse.
- Library-licentie: MIT, gratis. Browser Use Cloud (sandboxes, proxies) is betaald.

## Bronnen

- [Browser Use — Human Quickstart (documentatie)](https://docs.browser-use.com/quickstart)
- [browser-use/browser-use op GitHub](https://github.com/browser-use/browser-use)
