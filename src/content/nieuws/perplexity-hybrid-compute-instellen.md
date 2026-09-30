---
title: "Perplexity Hybrid Compute instellen: lokaal werken op je Mac"
heroImage: "/images/articles/diorama-perplexity-hybrid-compute-instellen.webp"
description: "Hybrid Compute laat Perplexity gevoelige stappen lokaal op je Mac uitvoeren. Zo controleer je of je Mac het aankan, kies je een lokaal model en zet je het aan."
publishedAt: 2026-09-30
updatedAt: 2026-09-30
author: "Redactie"
category: "gids"
tags:
  - "perplexity"
  - "hybrid-compute"
  - "privacy"
  - "lokale-ai"
  - "mac"
  - "personal-computer"
toolSlug: "perplexity-personal-computer"
featured: false
draft: false
readingTime: 5
heroImageAlt: "Miniatuur diorama-illustratie bij artikel 'Perplexity Hybrid Compute instellen: lokaal werken op je Mac'"
heroScene: "A miniature desk split by a glass divider, a cloud-shaped lamp on one side, a padlocked wooden drawer on the other"
keyTakeaways:
  - "Hybrid Compute, gelanceerd op 1 september 2026, verdeelt AI-taken op je Mac tussen de cloud en een lokaal model, zodat gevoelige informatie het apparaat niet verlaat."
  - "Een privacy gate op je Mac beoordeelt elk stukje informatie en kan vier dingen doen: het lokaal houden, gevoelige details maskeren, de actie weigeren of jou om toestemming vragen."
  - "Vereist een Apple silicon Mac met macOS 15 of hoger en minimaal 24 GB unified memory, plus een eenmalige download van een lokaal model."
  - "Je kiest uit drie lokale modellen: Gemma 4 E4B, Qwen3.6 35B-A3B of het eigen model van Perplexity."
  - "Beschikbaar voor Pro-, Max- en Enterprise-abonnees; op de gratis laag zit het niet."
faq:
  - q: "Wat is Perplexity Hybrid Compute precies?"
    a: "Hybrid Compute is een functie in de Perplexity Mac-app die AI-taken verdeelt tussen cloudmodellen en een lokaal model op je Mac. Complexe redenering en webzoekopdrachten lopen via de cloud; stappen waarbij gevoelige bestanden of gegevens nodig zijn, verwerkt het lokale model direct op je apparaat, zonder dat die data wordt geüpload."
  - q: "Welke Mac heb ik nodig voor Hybrid Compute?"
    a: "Een Apple silicon Mac (M-serie) met macOS 15 of hoger, en minimaal 24 GB unified memory. Zonder Apple silicon of met minder geheugen kun je het lokale model niet draaien. 9to5Mac noemt 32 GB als comfortabeler uitgangspunt dan het minimum."
  - q: "Hoe beschermt de privacy gate mijn gegevens?"
    a: "Een classifier die op je apparaat draait, beoordeelt informatie voordat er iets naar de cloud gaat. Hij kan vier dingen doen: de informatie lokaal houden, gevoelige details maskeren en pas in het antwoord terugzetten, de actie weigeren, of jou expliciet om toestemming vragen. Perplexity heeft die classifier open source gemaakt, zodat je zelf kunt nakijken hoe hij beslist."
  - q: "Kost Hybrid Compute extra, en welk abonnement heb ik nodig?"
    a: "De functie zit bij je bestaande abonnement in: beschikbaar voor Pro, Max en Enterprise. Op de gratis laag van Perplexity is Hybrid Compute niet beschikbaar."
  - q: "Welk lokaal model moet ik kiezen?"
    a: "Je kiest uit Gemma 4 E4B, Qwen3.6 35B-A3B of het eigen model van Perplexity. Perplexity publiceert geen geheugeneis per model, alleen de ondergrens van 24 GB voor de functie als geheel. Praktisch: begin met één model, kijk hoe je Mac het houdt bij een echte taak, en wissel pas als je tegen traagheid of geheugendruk aanloopt."
sources:
  - label: "Perplexity — Introducing Hybrid Compute on Mac"
    url: "https://www.perplexity.ai/hub/blog/introducing-hybrid-compute-on-mac"
  - label: "MarkTechPost — Perplexity Releases Hybrid Compute on Mac"
    url: "https://www.marktechpost.com/2026/09/01/perplexity-releases-hybrid-compute-on-mac-cloud-agents-orchestrate-down-to-a-local-model-gated-on-device/"
  - label: "9to5Mac — Perplexity launches privacy-minded hybrid compute AI feature for Mac"
    url: "https://9to5mac.com/2026/09/01/perplexity-launches-privacy-minded-hybrid-compute-ai-feature-for-mac/"
---

Je vraagt Perplexity's Computer-agent om je jaaroverzicht te controleren, maar dat bestand bevat je BSN, je adres en je rekeningnummer. Sinds 1 september 2026 hoef je dat niet meer naar de cloud te sturen: met Hybrid Compute op de Mac-app blijft dat soort verwerking op je eigen apparaat ([Bron: Perplexity](https://www.perplexity.ai/hub/blog/introducing-hybrid-compute-on-mac)).

## Wat Hybrid Compute doet

Hybrid Compute splitst een taak automatisch tussen cloud en lokaal. Complexe redenering en webzoekopdrachten blijven bij de snelle cloudmodellen; zodra een stap gevoelige bestanden of persoonsgegevens raakt, neemt een lokaal model op je Mac het over. Perplexity omschrijft het zelf als: je start een taak in de cloud, en je Mac voert de gevoelige stappen lokaal uit, met toegang tot je eigen bestanden ([Bron: Perplexity](https://www.perplexity.ai/hub/blog/introducing-hybrid-compute-on-mac)).

De kern is een **privacy gate**: een classifier die op je apparaat draait en per stuk informatie bepaalt wat de Mac mag verlaten. Perplexity heeft die classifier open source gemaakt, dus je hoeft het bedrijf niet op z'n woord te geloven — je kunt de code zelf bekijken.

> **Beginner-tip:** zie het als twee collega's. De cloud-collega is snel en kent het hele internet, maar mag je persoonlijke dossiers niet zien. De lokale collega werkt trager maar mag alles inzien, omdat hij nooit het gebouw verlaat.

## Stap 1: check of je Mac geschikt is

Hybrid Compute vraagt een **Apple silicon Mac** (M-serie, geen Intel), **macOS 15** of hoger en minimaal **24 GB unified memory** ([Bron: Perplexity](https://www.perplexity.ai/hub/blog/introducing-hybrid-compute-on-mac)). Heb je minder geheugen of een Intel-Mac, dan kun je het lokale model niet draaien. 9to5Mac noemt 32 GB als het comfortabeler uitgangspunt ([Bron: 9to5Mac](https://9to5mac.com/2026/09/01/perplexity-launches-privacy-minded-hybrid-compute-ai-feature-for-mac/)) — het minimum is een ondergrens, geen aanbeveling.

## Stap 2: installeer de nieuwste Mac-app

Perplexity noemt als eerste stap: download de nieuwste versie van de Perplexity Mac-app ([Bron: Perplexity](https://www.perplexity.ai/hub/blog/introducing-hybrid-compute-on-mac)). Doe dat voordat je in de instellingen gaat zoeken.

## Stap 3: download een lokaal model

Kies in de app een lokaal model en download het met één klik. Je hebt drie opties: **Gemma 4 E4B**, **Qwen3.6 35B-A3B** en **het eigen model van Perplexity**. Per model publiceert Perplexity geen aparte geheugeneis, alleen de 24 GB voor de functie als geheel. Pak er dus één, draai er een echte taak op en kijk hoe je Mac zich houdt voordat je gaat vergelijken.

## Stap 4: schakel de hybride modus in

Open de model-selector, selecteer **hybrid**, en kies vervolgens welk cloudmodel en welk lokaal model je combineert ([Bron: Perplexity](https://www.perplexity.ai/hub/blog/introducing-hybrid-compute-on-mac)). Vanaf dat moment beslist de privacy gate per taak wat lokaal blijft en wat naar de cloud mag.

> **Gevorderden:** de privacy gate kent vier uitkomsten: informatie lokaal houden, gevoelige details maskeren, de actie weigeren, of jou om toestemming vragen ([Bron: Perplexity](https://www.perplexity.ai/hub/blog/introducing-hybrid-compute-on-mac)). Die derde is de interessante: een agent die "nee" kan zeggen tegen zichzelf is zeldzamer dan een agent die maskeert.

## Checklist: ben je klaar?

- [ ] Apple silicon Mac met macOS 15+ en minimaal 24 GB geheugen gecontroleerd
- [ ] Nieuwste Perplexity Mac-app geïnstalleerd
- [ ] Eén lokaal model gedownload en op een echte taak uitgeprobeerd
- [ ] Hybride modus geselecteerd in de model-selector
- [ ] Cloudmodel en lokaal model bewust gekozen
- [ ] Pro-, Max- of Enterprise-abonnement actief (de gratis laag heeft geen toegang)
- [ ] Eerste test gedaan met een bestand dat bewust persoonsgegevens bevat, om de maskering te zien werken

Perplexity bouwt deze privacylaag onder een bredere agent-familie: eerder [hernoemde het bedrijf Spaces naar Projects](/nieuws/perplexity-spaces-heten-nu-projects), en in de browser doet [Comet het tabbladenwerk](/nieuws/comet-tabbladen-vergelijken-onderzoek). Hoe die browsers zich onderling verhouden, zette hetlaatsteainieuws.nl op een rij in [AI-browsers vergeleken](https://www.hetlaatsteainieuws.nl/nieuws/ai-browsers-vergeleken-2026).

Werk je op macOS met bestanden die je liever niet ongefilterd naar een cloud-AI stuurt — een jaaroverzicht, een contract, een dossier van een klant — dan is dit de eerste Perplexity-functie die dat verschil praktisch maakt in plaats van alleen in de voorwaarden.

## Bronnen

- [Perplexity — Introducing Hybrid Compute on Mac](https://www.perplexity.ai/hub/blog/introducing-hybrid-compute-on-mac) — officiële aankondiging, 1 september 2026
- [MarkTechPost — Perplexity Releases Hybrid Compute on Mac](https://www.marktechpost.com/2026/09/01/perplexity-releases-hybrid-compute-on-mac-cloud-agents-orchestrate-down-to-a-local-model-gated-on-device/) — technische duiding
- [9to5Mac — Perplexity launches privacy-minded hybrid compute AI feature for Mac](https://9to5mac.com/2026/09/01/perplexity-launches-privacy-minded-hybrid-compute-ai-feature-for-mac/) — praktische samenvatting en geheugenadvies
