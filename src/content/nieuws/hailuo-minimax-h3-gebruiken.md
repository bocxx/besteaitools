---
title: "Hailuo (MiniMax H3) gebruiken: 2K-video's met 12 referenties"
description: "MiniMax H3 op Hailuo levert 2K-video met precisie-editing en tot 12 stuurbare referentiebestanden. Zo gebruik je het voor je eerste project."
publishedAt: 2026-09-23
updatedAt: 2026-09-23
author: "Redactie"
category: "gids"
tags:
  - "hailuo"
  - "minimax"
  - "video-generatie"
  - "ai-video"
  - "text-to-video"
toolSlug: "hailuo"
featured: false
draft: false
readingTime: 5
heroScene: "A film director's clapperboard on a wooden table surrounded by twelve small labeled photo cards and a tiny film reel, warm studio light"
keyTakeaways:
  - "MiniMax H3, het nieuwste model achter Hailuo, genereert video's tot 2K-resolutie en 5-15 seconden, met native stereogeluid."
  - "Je kunt tot 12 referentiebestanden uploaden (9 afbeeldingen, 3 video's, 3 audiobestanden) om personages, beweging, camera en stem te sturen."
  - "Precisie-editing laat je mensen of objecten vervangen, toevoegen of verwijderen terwijl de rest van het beeld stabiel blijft."
  - "MiniMax positioneert de prijs per seconde op 2K als minder dan een derde van vergelijkbare mainstream-modellen."
faq:
  - q: "Wat is het verschil tussen Hailuo en MiniMax H3?"
    a: "Hailuo is de consumenten-app (hailuoai.video) waarmee je de modellen van het Chinese AI-bedrijf MiniMax gebruikt. MiniMax H3 is het nieuwste model daarachter, uitgebracht op 31 juli 2026 als opvolger van Hailuo 01 en 02. Je gebruikt H3 dus via Hailuo, niet als apart product."
  - q: "Hoeveel kost MiniMax H3 gebruiken?"
    a: "MiniMax positioneert de prijs per seconde op 2K-resolutie als minder dan een derde van mainstream-concurrenten, en op 768p als minder dan de helft van wat concurrenten voor 720p vragen ([Bron: MiniMax](https://www.minimax.io/blog/minimax-h3)). Exacte creditprijzen publiceert MiniMax niet los; check de actuele tarieven op hailuoai.video voordat je een groter project plant."
  - q: "Wat kan ik met de referentiebestanden in H3?"
    a: "Tot 9 afbeeldingen, 3 video's en 3 audiobestanden tegelijk, die samen het karakter, de beweging, de camerabeweging en de stem in je nieuwe video sturen. Dat is vooral handig als je een consistent personage of merk over meerdere clips heen wilt laten terugkomen."
  - q: "Werkt precisie-editing ook op bestaand videomateriaal?"
    a: "Ja — je kunt mensen en objecten vervangen, toevoegen of verwijderen, en achtergrond, verlichting of effecten aanpassen, terwijl de rest van de clip stabiel blijft. Dat maakt het bruikbaar voor kleine correcties zonder een hele scène opnieuw te genereren."
  - q: "Is Hailuo geschikt voor een klein team zonder videostudio?"
    a: "Voor korte, visueel overtuigende clips wel: de gratis dagelijkse credits en de goedkopere Fast-variant maken het toegankelijk voor batch-werk. Houd rekening met beperkte regie-controle vergeleken met Runway of Flow, en met de afweging rond een Chinese aanbieder als je gevoelige data verwerkt."
sources:
  - label: "MiniMax — officiële MiniMax H3 aankondiging"
    url: "https://www.minimax.io/blog/minimax-h3"
    publishedAt: 2026-07-31
  - label: "Hailuo — MiniMax H3 toolpagina"
    url: "https://hailuoai.video/tools/minimax-h3"
  - label: "Segmind — MiniMax H3: Release Date, Open Weights, and API Pricing Explained"
    url: "https://blog.segmind.com/minimax-h3-release-date-open-weights-and-api-pricing-explained/"
---

Hailuo, de videogenerator van het Chinese AI-bedrijf MiniMax, draait sinds 31 juli 2026 op een nieuw model: MiniMax H3. Waar eerdere versies vooral opvielen door realistische beweging, voegt H3 twee dingen toe die het verschil maken voor een concreet project: 2K-resolutie en de mogelijkheid om tot 12 referentiebestanden te gebruiken om een clip te sturen ([Bron: MiniMax](https://www.minimax.io/blog/minimax-h3)). Dit is hoe je er vandaag mee aan de slag gaat.

## Wat H3 anders maakt

H3 combineert tekst, afbeeldingen, video en audio als één creatieve context — MiniMax noemt dit "native multimodal understanding". Concreet upload je tot 9 afbeeldingen, 3 video's en 3 audiobestanden tegelijk, en die referenties sturen samen het karakter, de beweging, de camera en de stem in je output ([Bron: MiniMax](https://www.minimax.io/blog/minimax-h3)). Voor wie eerder alleen met een tekstprompt werkte, is dat een flinke stap richting controle.

> **💡 Beginner-tip:** Begin met één duidelijke referentieafbeelding van je hoofdpersonage of product en één korte audioclip voor de stem. Meer referenties toevoegen kan altijd nog, maar te veel sturing in je eerste poging maakt het lastiger te zien wat welk effect had.

Qua output haalt H3 clips tot 2K-resolutie (1440p) van 5 tot 15 seconden bij 24 fps, met native stereogeluid inbegrepen — je hoeft dus geen aparte audiotrack toe te voegen. Beeldverhoudingen zijn flexibel, van 21:9 tot 9:16 ([Bron: MiniMax](https://www.minimax.io/blog/minimax-h3)).

## Zo gebruik je precisie-editing

Naast het genereren van nieuwe clips vanaf nul kun je H3 ook op bestaand beeld loslaten. De precisie-editing-functie laat je specifieke mensen of objecten vervangen, toevoegen of verwijderen, en achtergrond, verlichting of effecten aanpassen — terwijl de rest van de clip stabiel blijft ([Bron: MiniMax](https://www.minimax.io/blog/minimax-h3)). Dat is bruikbaar voor kleine correcties (een verkeerd logo, een storend object op de achtergrond) zonder de hele scène opnieuw te moeten genereren.

Werkwijze in het kort:
1. Open je bestaande clip of upload nieuw bronmateriaal in de Hailuo-app.
2. Kies de precisie-edit-modus en markeer wat je wilt vervangen, toevoegen of verwijderen.
3. Voeg eventueel een referentieafbeelding toe voor het gewenste vervangende element.
4. Genereer en controleer of de rest van het beeld stabiel is gebleven voordat je exporteert.

> **⚡ Gevorderden:** H3 rankt volgens Artificial Analysis in de top-3 van meerdere categorieën: #1 in video-editing met audio, #2 in text-to-video en #3 in image-to-video. Dat plaatst het model serieus naast aanbod van Google en ByteDance, niet alleen naast andere Chinese modellen.

## Wat het kost

MiniMax noemt geen exacte creditprijs, maar positioneert de prijs per seconde op 2K expliciet als minder dan een derde van mainstream-modellen, en op 768p als minder dan de helft van wat concurrenten voor 720p vragen ([Bron: MiniMax](https://www.minimax.io/blog/minimax-h3)). Voor de instapkant van Hailuo geldt verder een freemium-model met gratis dagelijkse credits en een goedkopere Fast-variant voor batch-werk. Check de actuele tarieven altijd op hailuoai.video zelf voordat je een groter project plant — prijzen bij snelgroeiende AI-videotools verschuiven regelmatig.

## Checklist: ben je klaar?

- Je hebt minimaal één referentieafbeelding (en eventueel audio) klaarstaan voor je eerste H3-project.
- Je weet welke beeldverhouding (21:9 tot 9:16) past bij het platform waar de video naartoe gaat.
- Je hebt de actuele prijzen op hailuoai.video gecheckt in plaats van te vertrouwen op oudere schattingen.
- Je hebt getest of precisie-editing werkt voor kleine correcties, voordat je een hele scène opnieuw genereert.
- Je weet dat H3 een Chinese aanbieder is — weeg dat mee bij gevoelig bronmateriaal.

## Bronnen

- [MiniMax — officiële MiniMax H3 aankondiging](https://www.minimax.io/blog/minimax-h3)
- [Hailuo — MiniMax H3 toolpagina](https://hailuoai.video/tools/minimax-h3)
- [Segmind — MiniMax H3: Release Date, Open Weights, and API Pricing Explained](https://blog.segmind.com/minimax-h3-release-date-open-weights-and-api-pricing-explained/)

Meer over hoe MiniMax zich als AI-bedrijf ontwikkelt, lees je in [MiniMax M3: open-weights model, 1M context, 59% SWE-Bench Pro](https://hetlaatsteainieuws.nl/nieuws/minimax-m3-open-weights-frontier-model) op hetlaatsteainieuws.nl.

