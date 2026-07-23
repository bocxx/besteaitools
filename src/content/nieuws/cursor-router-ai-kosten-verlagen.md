---
title: "Cursor Router: automatisch het goedkoopste model per taak, tot 60% lagere kosten"
description: "Cursor Router kiest per verzoek zelf het beste AI-model. Zo werkt de nieuwe model-router, wat hij bespaart, en voor wie hij beschikbaar is."
publishedAt: 2026-07-23
updatedAt: 2026-07-23
author: "Redactie"
category: "update"
tags:
  - "cursor"
  - "cursor-router"
  - "model-routing"
  - "ai-kosten"
  - "ai-coding"
  - "enterprise"
toolSlug: "cursor"
featured: false
draft: false
readingTime: 4
heroImage: "/images/articles/diorama-cursor-router-ai-kosten-verlagen.webp"
heroImageAlt: "Miniatuur diorama-illustratie bij artikel 'Cursor Router: automatisch het goedkoopste model per taak, tot 60% lagere kosten'"
heroScene: "A small robot at a railway switch lever routes tiny glowing request-carts down three tracks toward different model-engines, coins stacked beside the junction"
keyTakeaways:
  - "Cursor Router kiest per verzoek automatisch het best passende AI-model, zodat routinewerk niet meer op dure frontier-prijzen draait."
  - "In A/B-tests over miljoenen verzoeken leverde de router frontier-kwaliteit bij 60% lagere kosten; bij enterprise-early-access was dat 30–50%."
  - "Je kiest zelf de balans via drie standen: Intelligence, Balance en Cost, elk op een ander punt van de kosten-kwaliteit-curve."
  - "Cursor Router is per 22 juli 2026 beschikbaar voor Teams- en Enterprise-abonnementen op desktop, web, iOS, CLI en de SDK."
faq:
  - q: "Wat is Cursor Router?"
    a: "Cursor Router is een model-router die Cursor op 22 juli 2026 lanceerde voor Teams- en Enterprise-abonnementen. In plaats van dat je zelf één AI-model kiest en overal voor gebruikt, classificeert Router elk verzoek vóór er een model draait — op basis van de vraag, de context, de complexiteit en het domein — en stuurt het door naar het model dat daar het best in is. Eenvoudig werk gaat naar goedkope modellen, complexe redeneertaken naar frontier-modellen. Zo betaal je niet voor elke taak de topprijs."
  - q: "Hoeveel bespaart Cursor Router echt?"
    a: "Volgens Cursor leverde de router in online A/B-tests over miljoenen verzoeken frontier-kwaliteit bij 60% lagere kosten. Tijdens de early-access met tientallen enterprises bespaarden klanten ongeveer 30 tot 50 procent, zonder kwaliteitsverlies. Gemeten per commit lag de kostprijs op 6,76 dollar in Intelligence-modus en 4,63 dollar in Balance — tegenover 7,34 dollar voor Opus 4.8 en 12,69 dollar voor Fable 5. De besparing hangt dus af van je modus en werklast."
  - q: "Welke standen heeft Cursor Router?"
    a: "Drie: Intelligence, Balance en Cost. Intelligence mikt op frontier-kwaliteit die de duurste, krachtigste modellen evenaart. Balance geeft sterke kwaliteit tegen lagere kosten — vergelijkbaar met de frontier-modellen die veel mensen dagelijks gebruiken. Cost optimaliseert het tokenverbruik en haalt de hoogst haalbare intelligentie binnen dat budget. Je kiest de stand in de model-picker via Auto; beheerders kunnen per team bepalen welke standen leden mogen gebruiken en welke modellen zijn toegestaan of geblokkeerd."
  - q: "Voor wie is Cursor Router beschikbaar?"
    a: "Cursor Router is per 22 juli 2026 beschikbaar voor klanten op de Teams- en Enterprise-abonnementen, over alle platforms: desktop, web, iOS, de command-line (CLI) en de SDK. Het is dus vooral gericht op teams en grotere organisaties die veel AI-coding-verzoeken draaien en hun kosten willen beheersen. Voor individuele Hobby-gebruikers is de router op dit moment niet aangekondigd."
  - q: "Hoe is Cursor Router getraind?"
    a: "Cursor Router is in de kern een classifier, getraind op meer dan 600.000 live-verzoeken en geëvalueerd in een online A/B-test over miljoenen echte verzoeken, geoptimaliseerd op gebruikerstevredenheid. De router is cache-bewust: de gerapporteerde besparingen zijn inclusief de extra kosten van cache-misses die ontstaan als er tussen modellen wordt gewisseld. Cursor houdt de router bewust makkelijk bij te werken, zodat nieuwe modellen snel in de routing kunnen worden opgenomen."
---
Ongeveer 60 procent van de Cursor-gebruikers kiest één model als vaste dagelijkse motor — en draait daarmee ook het simpelste routinewerk op frontier-prijzen. Precies dat gat vult Cursor Router, de model-router die Cursor op 22 juli 2026 lanceerde ([Bron: Cursor](https://cursor.com/blog/router)). In plaats van dat jij per taak nadenkt over welk model het beste is, doet de router dat per verzoek — en dat scheelt fors in de rekening.

## Hoe Cursor Router werkt

Cursor Router is in de kern een classifier. Vóór er een model draait, kijkt hij naar je verzoek: de vraag, de context, de complexiteit en het domein. Dat combineert hij met wat Cursor weet over het gedrag van elk model. Eenvoudig werk gaat naar de meest prijsefficiënte modellen, UI-aanpassingen naar het model met de beste "smaak", en complexe, langlopende problemen naar frontier-redeneermodellen ([Bron: Cursor](https://cursor.com/blog/router)).

De router is getraind op meer dan 600.000 live-verzoeken en getest in een online A/B-test over miljoenen echte verzoeken, geoptimaliseerd op gebruikerstevredenheid. Belangrijk detail: hij is cache-bewust. De gerapporteerde besparingen zijn inclusief de extra kosten die ontstaan als het wisselen van model een cache-miss veroorzaakt — geen mooiweer-cijfer dus.

> **💡 Beginner-tip:** een model-router is als een wissel op een spoorweg. Elk verzoek is een treintje; de router stuurt het naar het spoor (model) dat voor díe rit het efficiëntst is. Jij hoeft de wissel niet meer met de hand om te zetten.

## Wat het bespaart

De cijfers zijn concreet. In online A/B-tests over miljoenen verzoeken leverde Cursor Router frontier-kwaliteit bij 60% lagere kosten. Tijdens de early-access met tientallen enterprises bespaarden klanten zo'n 30 tot 50 procent, zonder kwaliteitsverlies ([Bron: Cursor](https://cursor.com/blog/router)).

Interessanter dan kosten-per-verzoek is kosten-per-commit, want dat meet echt opgeleverd werk. Daar zag Cursor deze prijzen per commit: 6,76 dollar in Intelligence-modus en 4,63 dollar in Balance — tegenover 7,34 dollar voor Opus 4.8 en 12,69 dollar voor Fable 5. De router houdt de zware taken op de sterkste modellen en haalt het routinewerk weg bij de frontier-prijzen.

> **⚡ Gevorderden:** Cursor koos bewust voor online A/B-tests in plaats van offline evals. Offline benchmarks missen namelijk de cache-miss-kosten van het wisselen tussen modellen — precies waar een router in de praktijk op afgerekend wordt. Een eerlijkere meetmethode voor dit type feature.

## Jij kiest de afweging

Cursor Router heeft drie standen die je langs de kosten-kwaliteit-curve schuiven:

- **Intelligence** — frontier-kwaliteit, gelijk aan de duurste en krachtigste modellen.
- **Balance** — sterke kwaliteit tegen lagere kosten, vergelijkbaar met de modellen die veel mensen dagelijks gebruiken.
- **Cost** — goede kwaliteit met de nadruk op zuinig tokenverbruik.

Je selecteert Auto in de model-picker en kiest daar je stand. Beheerders bepalen per team of groep hoe de router uitrolt: welke standen leden mogen kiezen, wat de standaard is, en welke modellen zijn toegestaan of geblokkeerd. Wie z'n AI-uitgaven wil temmen zonder aan snelheid in te leveren, vindt hier een praktische knop — in dezelfde geest als [hoe je met Claude Code tokens bespaart](/nieuws/caveman-claude-code-tokens-besparen).

## Voor wie en vanaf wanneer

Cursor Router is per 22 juli 2026 beschikbaar voor Teams- en Enterprise-abonnementen, op desktop, web, iOS, de CLI en de SDK. Het is dus vooral iets voor teams en organisaties die veel coding-verzoeken draaien en grip op hun kosten willen. Voor wie Cursor overweegt of vergelijkt: de [tool-pagina van Cursor](/tools/cursor) zet de bredere sterke en zwakke punten op een rij.

## Checklist: is Cursor Router iets voor jou?

- [ ] Je zit op een Teams- of Enterprise-abonnement van Cursor
- [ ] Je team draait genoeg verzoeken dat modelkosten merkbaar oplopen
- [ ] Je kiest nu één vast model voor al je werk (dan valt de meeste winst te halen)
- [ ] Je wilt per team kunnen sturen welke modellen zijn toegestaan
- [ ] Je hebt een voorkeur bepaald: Intelligence, Balance of Cost als standaard

## Bronnen

- [Introducing Cursor Router — officiële aankondiging (22 juli 2026)](https://cursor.com/blog/router)
- [Cursor Router — documentatie](https://cursor.com/docs/cursor-router)
