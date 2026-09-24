---
title: "Leesbare tekst in je AI-beeld: zo prompt je FLUX.2"
description: "Een poster met een kop die klopt, in de juiste merkkleur. FLUX.2 kan het, maar dan moet je anders prompten dan je gewend bent. Zes regels uit de officiële gids."
publishedAt: 2026-09-16
updatedAt: 2026-09-16
author: "Redactie"
category: "gids"
tags:
  - "flux"
  - "flux-2"
  - "black-forest-labs"
  - "beeldgeneratie"
  - "prompting"
  - "typografie"
  - "huisstijl"
toolSlug: "flux"
featured: false
draft: false
readingTime: 4
heroImage: "/images/articles/diorama-flux-2-tekst-in-beeld-prompten.webp"
heroImageAlt: "Miniatuur diorama-illustratie bij artikel 'Leesbare tekst in je AI-beeld: zo prompt je FLUX.2'"
heroScene: "A miniature print shop where a small robot sets metal letters into a poster frame beside three paint pots labelled with colour codes"
keyTakeaways:
  - "FLUX.2 kent geen negatieve prompts. Beschrijf wat je wél wilt zien; 'geen wazige achtergrond' werkt niet, 'scherpe achtergrond' wel."
  - "Zet tekst die letterlijk in het beeld moet komen tussen aanhalingstekens, en beschrijf daarnaast plek, stijl, grootte en kleur."
  - "Merkkleuren geef je als hexcode, altijd gekoppeld aan een specifiek object. Los rondslingerend werkt een hexcode onbetrouwbaar."
  - "Woordvolgorde telt: FLUX.2 let het zwaarst op wat vooraan staat. Onderwerp, actie, stijl, context — in die volgorde."
faq:
  - q: "Waarom komt er onleesbare tekst uit mijn beeldgenerator?"
    a: "Meestal omdat de tekst niet als tekst is aangeleverd. Beeldmodellen behandelen letters als vormen, dus als jij schrijft 'een poster met de tekst open erop' moet het model zelf raden welke letters dat zijn, hoe groot en waar. Black Forest Labs adviseert daarom de exacte tekst tussen aanhalingstekens te zetten en er de plaatsing, het lettertype, de grootte en de kleur bij te beschrijven. Hoe specifieker, hoe kleiner de kans op letterbrij."
  - q: "Hoe krijg ik mijn eigen merkkleur in een AI-beeld?"
    a: "FLUX.2 ondersteunt hexcodes. Je signaleert ze met een woord als 'color' of 'hex' gevolgd door de code, en koppelt de code aan een specifiek onderdeel: 'het logo in kleur #FF5733' werkt, 'gebruik #FF5733 ergens in het beeld' niet. Voor meerdere kleuren tegelijk raadt de documentatie een gestructureerde JSON-prompt aan, waarin je per onderdeel de kleur vastlegt. Gradiënten kunnen ook, door een begin- en eindkleur op te geven."
  - q: "Wat is het verschil tussen FLUX.2 pro, flex en klein?"
    a: "Pro is het productiemodel via de API, waar de officiële promptgids samen met max op is geschreven. Flex geeft je extra knoppen zoals guidance en het aantal stappen. Daarnaast zijn er twee open-weight varianten die je zelf kunt draaien: dev, en klein in een 4B- en een 9B-versie. Let op: klein gebruikt een andere tekstencoder dan pro en heeft daardoor eigen promptvuistregels. De tips in dit artikel komen uit de gids voor pro en max; kijk voor de open modellen op de modelkaart bij Hugging Face."
  - q: "Hoe lang moet een FLUX.2-prompt zijn?"
    a: "Black Forest Labs geeft drie bereiken. Kort (10 tot 30 woorden) voor snelle concepten en het verkennen van een stijl. Middellang (30 tot 80 woorden) is volgens de documentatie meestal het beste voor gewoon werk. Lang (80 woorden en meer) gebruik je voor complexe scènes met veel specificaties. Belangrijker dan de lengte is de volgorde: het model let het zwaarst op wat vooraan staat, dus begin met je hoofdonderwerp."
  - q: "Welke afmetingen kan FLUX.2 aan?"
    a: "Minimaal 64 bij 64 pixels, maximaal 4 megapixels — dus bijvoorbeeld 2048 bij 2048. De afmetingen moeten deelbaar zijn door 16. De documentatie raadt voor de meeste toepassingen tot 2 megapixels aan. Handige standaardformaten zijn 1024 bij 1024 voor social en productfoto's, 1920 bij 1080 voor breedbeeld, en 1080 bij 1920 voor mobiel. Zie de Stand van zaken-box onderaan voor de peildatum."
sources:
  - label: "Prompting Guide — FLUX.2 pro & max, Black Forest Labs"
    url: "https://docs.bfl.ml/guides/prompting_guide_flux2"
  - label: "FLUX.2: Frontier Visual Intelligence — Black Forest Labs"
    url: "https://bfl.ai/blog/flux-2"
  - label: "Release Notes — Black Forest Labs"
    url: "https://docs.bfl.ml/release-notes"
  - label: "black-forest-labs/FLUX.2-klein-4B — Hugging Face"
    url: "https://huggingface.co/black-forest-labs/FLUX.2-klein-4B"
---

Je wilt een poster met een kop die klopt, in de kleur van je huisstijl. Beeldgeneratoren maakten daar jarenlang letterbrij van. FLUX.2 kan het wél, alleen vraagt het om een andere manier van prompten dan je gewend bent uit het Stable Diffusion-tijdperk. Zes regels uit de officiële gids van Black Forest Labs.

> **ℹ️ "Maar er is toch al een FLUX 3?"** Klopt, aangekondigd op 23 juli 2026. Alleen rolt die in fasen uit, en beeld is nog niet aan de beurt: sinds 4 augustus is er FLUX 3 Video, en alle updates daarna gingen over video. Een publiek endpoint voor FLUX 3-beeldgeneratie is er medio september nog steeds niet. Voor het maken van stilstaand beeld is FLUX.2 dus gewoon het actuele model, en de promptgids hieronder is de geldende gids. Komt FLUX 3-beeld uit, dan werken we dit stuk bij.

## 1. Vergeet negatieve prompts

De eerste gewoonte die eruit moet. FLUX.2 ondersteunt geen negatieve prompts ([Bron: Black Forest Labs](https://docs.bfl.ml/guides/prompting_guide_flux2)). "Geen mensen op de achtergrond" doet niets, of erger: het model pikt "mensen" op en zet ze erin.

Draai het om. Wil je geen wazigheid? Schrijf "scherp door het hele beeld". Wil je geen mensen? Beschrijf een lege ruimte.

## 2. Hou je aan de volgorde

De gids geeft één vast raamwerk: **onderwerp + actie + stijl + context**. En daar zit een reden achter — het model let zwaarder op wat vooraan staat. De aanbevolen prioriteitsvolgorde is hoofdonderwerp, kernactie, cruciale stijl, essentiële context, en dan pas de details.

Voor lengte hanteert Black Forest Labs drie bereiken: 10 tot 30 woorden voor snelle concepten, 30 tot 80 woorden voor het meeste werk, en 80 of meer voor complexe scènes.

## 3. Zet je tekst tussen aanhalingstekens

Dit is de kern. De gids noemt vijf dingen die je bij tekst in beeld vastlegt:

- **Aanhalingstekens** — `De tekst 'OPEN' verschijnt in rode neonletters boven de deur`
- **Plaatsing** — waar de tekst staat ten opzichte van de rest
- **Stijl** — "elegante schreefletter", "vette industriële belettering", "handgeschreven"
- **Grootte** — "grote kop", "kleine broodtekst", "middelgrote subkop"
- **Kleur** — bij voorkeur als hexcode

Alles samen levert iets op in deze vorm:

```
Groovy retro poster with the quote "If you love me let me sleep".
Bold 70s typography in deep red and warm pink tones. Cream background
and bold orange doodle around the text. Funky layout with playful shadow.
Style: bold vintage aesthetic, dopamine decor
```

> **💡 Beginner-tip:** Prompt in de taal van wat je maakt. De documentatie merkt op dat FLUX.2 meerdere talen begrijpt en dat prompten in de taal van de gewenste context vaak cultureel geloofwaardiger resultaat geeft. Voor een Nederlandse poster met Nederlandse tekst is dat het proberen waard.

## 4. Koppel hexcodes aan een object

Merkkleuren kunnen, maar niet los. De regel uit de gids is expliciet: koppel een hexcode altijd aan een specifiek onderdeel. "De auto is #FF0000" werkt; "gebruik ergens rood #FF0000" geeft wisselvallige uitkomsten.

Je signaleert een kleurcode met het woord `color` of `hex`, gevolgd door de code:

```
a vintage illustration of an apple in color #0047AB with a
heart-shaped cutout in the middle, on a white background
```

Gradiënten geef je op met begin- en eindkleur. Voor meerdere kleuren over meerdere onderdelen adviseert de gids een gestructureerde JSON-prompt, met per onderdeel een beschrijving en een kleur — precies wat je nodig hebt als een productfoto exact je huisstijl moet volgen.

## 5. Gebruik JSON als het complex wordt

FLUX.2 verwerkt zowel gewone taal als JSON, en volgens de documentatie begrijpt het beide even goed. JSON is handig bij productieworkflows waarin de structuur elke keer hetzelfde moet zijn, bij automatisering, en bij scènes waarin je één element wilt aanpassen zonder de rest te raken. Het basisschema kent velden als `scene`, `subjects`, `style`, `color_palette`, `lighting`, `mood`, `background`, `composition` en `camera`.

Voor snelle verkenning en simpele scènes is gewone taal sneller. Kies op basis van je werkwijze, niet op basis van welke chiquer oogt.

> **⚡ Gevorderden:** De promptgids waar dit artikel op steunt is geschreven voor FLUX.2 [pro] en [max]. Het open-weight [klein] gebruikt een andere tekstencoder en heeft eigen vuistregels voor promptlengte en instellingen — check de modelkaart op Hugging Face voordat je deze tips één-op-één overzet. Zelfde familie, ander gedrag.

## 6. Kies je formaat vooraf

Minimaal 64 bij 64 pixels, maximaal 4 megapixels, en de afmetingen moeten deelbaar zijn door 16. Voor de meeste toepassingen raadt de gids tot 2 megapixels aan. Bruikbare standaarden: 1024 bij 1024 voor social en productfoto's, 1920 bij 1080 voor breedbeeld, 1080 bij 1920 voor mobiel.

## Checklist: ben je klaar?

- [ ] Geen enkele "geen" of "zonder" in je prompt
- [ ] Hoofdonderwerp staat vooraan
- [ ] Letterlijke tekst tussen aanhalingstekens
- [ ] Plaatsing, stijl, grootte en kleur van die tekst beschreven
- [ ] Hexcodes gekoppeld aan een specifiek object
- [ ] Formaat deelbaar door 16 en onder 2 megapixels
- [ ] Bij herhaalbaar werk: JSON in plaats van losse zin

Werk je vaker met beeld in een vaste huisstijl, dan is [Krea Realtime Canvas](/nieuws/krea-realtime-canvas-gebruiken) een goede volgende stap voor het itereren zelf. En wie wil weten hoe de beeldmodellen zich onderling verhouden, vindt de actuele stand op [hetlaatsteainieuws.nl](https://www.hetlaatsteainieuws.nl/).

## Stand van zaken — bijgewerkt 2026-09-16

- FLUX 3 is aangekondigd op 23 juli 2026 en rolt gefaseerd uit: video eerst (sinds 4 augustus), daarna action prediction, beeldgeneratie en open-weight toegang. Voor beeld is er nog geen publiek endpoint; FLUX.2 blijft daarvoor het actuele model.
- FLUX.2 ondersteunt geen negatieve prompts; het promptraamwerk is onderwerp + actie + stijl + context.
- Aanbevolen promptlengte: 10-30 woorden kort, 30-80 middellang, 80+ voor complexe scènes.
- Hexcodes en gradiënten worden ondersteund, mits gekoppeld aan een specifiek object.
- Resolutie: minimaal 64×64, maximaal 4 megapixels, afmetingen deelbaar door 16; tot 2 megapixels aanbevolen.
- Multi-referentie: 8 referentiebeelden bij [pro], 10 bij [flex], circa 6 bij [dev]. Bij [pro] hangt dat aantal samen met de 9MP-limiet op invoer plus uitvoer: 8 bij 1MP output, 7 bij 2MP.
- De officiële promptgids geldt voor [pro] en [max]. De open-weight modellen [dev] en [klein] (4B en 9B) hebben eigen vuistregels.

## Bronnen

- [Prompting Guide — FLUX.2 pro & max, Black Forest Labs](https://docs.bfl.ml/guides/prompting_guide_flux2)
- [FLUX.2: Frontier Visual Intelligence — Black Forest Labs](https://bfl.ai/blog/flux-2)
- [Release Notes — Black Forest Labs](https://docs.bfl.ml/release-notes)
- [black-forest-labs/FLUX.2-klein-4B — Hugging Face](https://huggingface.co/black-forest-labs/FLUX.2-klein-4B)
