---
title: "Het AI-tool-kerkhof: 59% van de Q1-hypes is alweer uit de schijnwerpers"
description: "Van de 852 AI-repos die in Q1 GitHub-trending haalden, is 59% al ruim een maand uit beeld. Wat dat wél en niet zegt — en waar je op let vóór je bouwt."
publishedAt: 2026-07-06
updatedAt: 2026-07-06
author: "Redactie"
category: "analyse"
tags:
  - "github"
  - "open-source"
  - "ai-tools"
  - "trends"
  - "tool-keuze"
featured: false
draft: false
readingTime: 4
heroScene: "A miniature theater stage with many tiny dimmed spotlights over small empty pedestals, while three pedestals still glow under bright warm beams"
heroImage: "/images/articles/diorama-ai-tool-kerkhof-github-trending.webp"
heroImageAlt: "Miniatuur diorama-illustratie bij artikel 'Het AI-tool-kerkhof: 59% van de Q1-hypes is alweer uit de schijnwerpers'"
keyTakeaways:
  - "Van de 852 AI-repos die tussen februari en eind maart 2026 GitHub-trending haalden, is 58,7% (500 repos) al minstens 30 dagen niet meer in trending gezien."
  - "De mediaan is hard: wie verdween, was hooguit 2 dagen zichtbaar. 293 van de 500 verdwenen repos haalden nog geen week tussen eerste en laatste trending-notering."
  - "Uit trending verdwijnen betekent niet dood: Microsoft's MarkItDown (163.000 sterren) en wifi-densepose draaien gewoon door met verse releases — trending meet momentum, geen leven."
  - "Bouw je workflow niet op een tool omdat die déze week trending is; kijk naar onderhoud, releases en wie erachter zit."
  - "We werken aan een bestendigheidsscore per tool op basis van deze data, zodat je dit signaal straks per tool-pagina terugziet."
faq:
  - q: "Betekent uit GitHub-trending verdwijnen dat een tool dood is?"
    a: "Nee. Trending meet de groei van vandaag, niet de gezondheid van een project. Een volwassen project met een stabiele gebruikersgroep verdwijnt vanzelf uit trending, ook als het wekelijks releases doet. Microsoft's MarkItDown is het schoolvoorbeeld: sinds begin juni niet meer in trending gezien, maar met 163.000 sterren en een release in mei 2026 springlevend. Verdwijnen uit trending zegt alleen dat de aandachtspiek voorbij is."
  - q: "Hoe herken je of een AI-tool op GitHub bestendig is?"
    a: "Kijk voorbij het sterren-aantal van deze week. Drie signalen zeggen meer: recente commits en releases (wordt er nog onderhouden?), wie erachter zit (een bedrijf of team met belang bij continuïteit, of één anonieme maker?), en of het project na de hype-piek nog issues beantwoordt en pull requests merget. Een repo die maanden na de viral week nog releases doet, is een ander verhaal dan een repo die na twee dagen trending stilvalt."
  - q: "Waar komen de cijfers in deze analyse vandaan?"
    a: "Uit onze eigen database: sinds 10 februari 2026 leggen we dagelijks vast welke AI-gerelateerde repos in GitHub-trending staan. Voor deze analyse namen we alle 852 repos die vóór 1 april voor het eerst opdoken, en telden we hoeveel daarvan op 6 juli minstens 30 dagen niet meer gezien waren: 500, oftewel 58,7%."
  - q: "Is het erg om een tool te gebruiken die uit trending is verdwenen?"
    a: "Helemaal niet — vaak is dat juist prima. De vraag is niet of een tool trending is, maar of hij onderhouden wordt en of jouw workflow ervan afhangt. Voor een experiment maakt het weinig uit. Zodra een tool een vast onderdeel van je werk wordt, wil je tekenen van bestendigheid zien: actieve maintainers, regelmatige releases en een duidelijke partij erachter."
---

Elke week schuiven er nieuwe AI-tools voorbij op GitHub-trending, en elke week voelt het alsof je iets mist als je niet meteen instapt. Onze eigen meetdata zegt: rustig aan. Van de 852 AI-repos die in het eerste kwartaal trending haalden, is 58,7% inmiddels al minstens een maand uit de schijnwerpers verdwenen.

## Wat de cijfers zeggen

Sinds 10 februari 2026 leggen we dagelijks vast welke AI-gerelateerde repos in GitHub-trending verschijnen. Dat levert een cohort op van 852 repos die vóór 1 april voor het eerst opdoken. Peildatum 6 juli: 500 daarvan — 58,7% — zijn al 30 dagen of langer niet meer in trending gezien.

<figure style="margin:2rem 0;">
  <img src="/images/figures/ai-tool-kerkhof-waffle.png" alt="Waffle-diagram van 852 blokjes, één per AI-repo die in Q1 2026 GitHub-trending haalde: 500 gedoofde blokjes (58,7%) zijn minstens 30 dagen niet meer in trending gezien, 352 amberkleurige blokjes staan nog in de schijnwerpers. Callout: de mediane zichtbaarheid van de verdwenen groep was 2 dagen." width="1200" height="675" loading="lazy" style="width:100%;height:auto;border-radius:12px;" />
  <figcaption style="margin-top:0.5rem;font-size:0.85rem;color:var(--text-muted);">Elk blokje is één repo uit het Q1-cohort. Bron: eigen GitHub-trending-metingen, 10 feb – 31 mrt 2026, peildatum 6 juli.</figcaption>
</figure>

Het venster waarin ze schitterden, was kort. De mediaan van de verdwenen groep: 2 dagen tussen de eerste en de laatste keer dat we ze in trending zagen. 293 van de 500 haalden nog geen week. De typische Q1-hype was dus geen langzaam uitdovende ster, maar een flits.

> **💡 Beginner-tip:** GitHub-trending is de dagelijkse etalage van GitHub — de repos die vandaag het hardst groeien in sterren. Het is een prima ontdekkingskanaal, maar geen kwaliteitskeurmerk. Hoe je open-source AI daarna zelf uitprobeert, lees je in onze gids over [open-weight modellen lokaal draaien](/nieuws/open-weight-modellen-lokaal-draaien).

## Eerst eerlijk: wat "verdwenen" hier wél en niet betekent

Trending meet momentum, geen leven. De lijst toont wat vandaag snel groeit; een volwassen project met een stabiele gebruikersgroep zakt er vanzelf uit, hoe gezond het ook is. "Uit de schijnwerpers" is dan ook iets anders dan "dood" — en ons eigen datavenster begint op 10 februari, dus "Q1" is hier feitelijk 10 februari tot en met 31 maart.

Twee voorbeelden uit de verdwenen groep maken het punt. Microsoft's [MarkItDown](https://github.com/microsoft/markitdown), de populaire documenten-naar-Markdown-converter, zagen we op 4 juni voor het laatst in trending — maar het project heeft 163.000 sterren en bracht in mei nog versie 0.1.6 uit. En [wifi-densepose](https://github.com/ruvnet/wifi-densepose), dat in februari twee weken viral ging met bewegingsdetectie via wifi-signalen, deed eind juni gewoon een nieuwe release. Beide springlevend, beide uit beeld.

Daarnaast staan er in die 500 ook echte eendagsvliegen. [MoneyPrinterV2](https://github.com/FujiwaraChoki/MoneyPrinterV2), een automatiseringstool om online geld te verdienen, piekte in maart en is sinds 25 maart niet meer in trending gezien; de repo staat nog online, maar de aandacht is er compleet vanaf. Welke van de twee smaken je te pakken hebt, zie je pas als je verder kijkt dan de trending-positie.

## De blijvers vertellen het andere verhaal

Tegenover de 500 verdwenen repos staan er 352 die na hun Q1-debuut nog wél in trending opduiken. Daar zitten de projecten tussen die van hype naar huishoudnaam groeiden. [OpenClaw](https://github.com/openclaw/openclaw), de zelf-gehoste AI-assistent, staat sinds half februari vrijwel onafgebroken in de lijst en zit inmiddels op zo'n 382.000 sterren. [TradingAgents](https://github.com/TauricResearch/TradingAgents) (multi-agent beursanalyse, 91.000 sterren) debuteerde eind februari en werd deze week nog gezien — met een verse release van 5 juli.

Het mooiste contrast zit in één naamfamilie. MoneyPrinterV2 verdween eind maart; [MoneyPrinterTurbo](https://github.com/harry0703/MoneyPrinterTurbo), een AI-videogenerator van een andere maker, debuteerde in dezelfde februariweken en bleef tot eind juni in trending terugkeren, met 96.000 sterren en een release in juli. Vergelijkbare belofte, zelfde hype-golf, totaal ander verloop.

> **⚡ Gevorderden:** wil je zelf bestendigheid inschatten, kijk dan naar de vorm van de sterren-curve in plaats van het totaal. Eén piekdag gevolgd door stilte is een ander signaal dan wekelijkse terugkeer in trending. Check daarnaast de releases-tab en de issue-respons van de afgelopen maand — dat kost twee minuten en filtert de meeste eendagsvliegen eruit.

## Wat dit betekent voor jouw tool-keuze

De les is niet "negeer trending", maar: bouw je workflow niet op iets *omdat* het deze week trending is. Zes op de tien Q1-hypes waren binnen een paar maanden uit beeld, en de mediaan-hype duurde twee dagen. Wie in de flits-week instapte met een experiment, verloor niets; wie er een vast proces omheen bouwde, zit nu mogelijk met een tool waar niemand meer naar omkijkt.

Kijk daarom naar tekenen van bestendigheid voordat een tool een vast onderdeel van je werk wordt: recente commits en releases, een team of bedrijf erachter met belang bij continuïteit, en aandacht die terugkeert in plaats van één keer piekt. Wie er achter die trending repos zitten, is trouwens dichterbij dan je denkt: we portretteerden [de Nederlandse en Belgische bouwers achter trending AI](/nieuws/nederlandse-belgische-bouwers-trending-ai) uit onze eigen meetdata. Hetzelfde patroon zagen we eerder bij [Lindy, dat zijn gratis plan schrapte](/nieuws/lindy-schrapt-gratis-plan): de tool waarop je leunt, kan sneller veranderen dan je plan. Dat hype en realiteit vaker uit elkaar lopen, laat onze zustersite zien in de [Beloftecheck: wat kwam er terecht van de AI-funding-beloftes van Q1?](https://www.hetlaatsteainieuws.nl/achtergrond/beloftecheck-ai-funding-q1-2026) — zelfde familie, ander speelveld.

We gaan hier zelf ook iets mee doen: op basis van deze meetdata werken we aan een bestendigheidsscore per tool, zodat je dit signaal straks direct op de tool-pagina's terugziet.

## Checklist: voordat je bouwt op een trending tool

- [ ] Je weet of de repo de afgelopen maand nog commits of releases had
- [ ] Je weet wie erachter zit: bedrijf, team of één maker
- [ ] Je hebt de sterren-curve bekeken: piek-en-stilte of terugkerende groei
- [ ] Je gebruikt de tool eerst in een experiment, niet meteen in een vast proces
- [ ] Je hebt een alternatief in gedachten voor als het project stilvalt

## Bronnen

- Eigen dataset: dagelijkse GitHub-trending-metingen (AI-gerelateerde repos) sinds 10 februari 2026, peildatum 6 juli 2026
- [Microsoft — MarkItDown](https://github.com/microsoft/markitdown) — sterren, releases en projectstatus (gecheckt 6 juli 2026)
- [OpenClaw](https://github.com/openclaw/openclaw) en [TradingAgents](https://github.com/TauricResearch/TradingAgents) — sterren en release-historie (gecheckt 6 juli 2026)
- [MoneyPrinterTurbo](https://github.com/harry0703/MoneyPrinterTurbo) en [MoneyPrinterV2](https://github.com/FujiwaraChoki/MoneyPrinterV2) — sterren en projectstatus (gecheckt 6 juli 2026)
