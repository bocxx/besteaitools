---
title: "Gemini Canvas: een werkende website bouwen zonder één regel code"
description: "Met Gemini Canvas maak je met één prompt een werkend prototype van een website. Zo bouw je in vier stappen een mini-site, en zo weet je wanneer je doorstapt."
publishedAt: 2026-10-06
updatedAt: 2026-10-06
author: "Redactie"
category: "gids"
tags:
  - "gemini"
  - "gemini-canvas"
  - "website-bouwen"
  - "no-code"
  - "google-ai-studio"
  - "prototype"
toolSlug: "gemini"
featured: false
draft: false
readingTime: 4
heroImage: "/images/articles/diorama-gemini-canvas-website-bouwen.webp"
heroImageAlt: "Miniatuur diorama-illustratie bij artikel 'Gemini Canvas: een werkende website bouwen zonder één regel code'"
heroScene: "A miniature drafting table with paper building blocks assembling themselves into a tiny storefront model, a brass stylus resting beside it"
keyTakeaways:
  - "Canvas is de werkruimte in de Gemini-app waarin je met een prompt een werkend prototype van een webpagina bouwt en meteen in je browser bekijkt."
  - "Canvas is beschikbaar voor alle Gemini-gebruikers; abonnees van Google AI Pro en Ultra werken er met Google's sterkste model."
  - "Canvas levert een prototype, geen gehoste productiesite. Voor een echte app met eigen hosting stap je over naar de Build-modus van Google AI Studio."
  - "Controleer elke tekst, prijs en contactgegeven zelf: AI-builders vullen ontbrekende informatie soms met verzonnen content."
faq:
  - q: "Is Gemini Canvas gratis?"
    a: "Canvas is volgens Google beschikbaar voor alle Gemini-gebruikers, in alle landen en talen waar de Gemini-app werkt. Wie een Google AI Pro- of Ultra-abonnement heeft, gebruikt Canvas met Google's sterkste model. Met een gewoon Google-account kun je dus beginnen."
  - q: "Kan ik met Gemini Canvas een website online zetten?"
    a: "Je kunt je Canvas-project delen via een link, maar Canvas is bedoeld voor prototypes, niet voor een gehoste site met eigen domein. Wil je dat, dan bouw je verder in de Build-modus van Google AI Studio. Die kan je app uitrollen op Google Cloud Run, koppelen aan GitHub of als ZIP-bestand exporteren."
  - q: "Wat is het verschil tussen Gemini Canvas en Google AI Studio?"
    a: "Canvas zit in de Gemini-app en is gericht op snel schetsen: een pagina, een rekenhulp, een interactieve infographic. De Build-modus van Google AI Studio maakt complete webapps met een React-frontend en een Node.js-backend, en regelt uitrol, GitHub-koppeling en het veilig opslaan van API-keys."
  - q: "Moet ik Firebase Studio nog gebruiken om verder te bouwen?"
    a: "Nee. Google stopt met Firebase Studio: sinds 22 juni 2026 kun je er geen nieuwe werkruimtes meer maken en op 22 maart 2027 gaat het platform dicht. Google verwijst ontwikkelaars naar Google AI Studio en Antigravity."
sources:
  - label: "Google — Canvas in Gemini"
    url: "https://gemini.google/overview/canvas/"
  - label: "Google AI for Developers — Build mode in Google AI Studio"
    url: "https://ai.google.dev/gemini-api/docs/aistudio-build-mode"
  - label: "Storyboard18 — Google to shut Firebase Studio in 2027"
    url: "https://www.storyboard18.com/digital/google-to-shut-firebase-studio-in-2027-shifts-focus-to-ai-studio-and-antigravity-92922.htm"
---

Een werkende website bouwen zonder te coderen klonk lang als een verkooppraatje. Met Gemini Canvas is het een kwestie van één goede prompt en een paar verfijningen: je beschrijft wat je wilt en ziet het prototype meteen in je browser draaien. In deze gids bouw je in vier stappen een eenvoudige mini-site, met alleen een Google-account.

## Wat Gemini Canvas is (en wat niet)

Canvas is de werkruimte in de Gemini-app waarin je samen met Gemini schrijft en bouwt. Het is beschikbaar voor alle Gemini-gebruikers; abonnees van Google AI Pro en Ultra werken er met Gemini 3, volgens Google het sterkste model ([Bron: Google](https://gemini.google/overview/canvas/)).

Weet vooraf wat je krijgt: een prototype dat je kunt delen via een link, geen gehoste productiesite met eigen domein en database. Voor een landingspagina die je wilt testen, een rekenhulp of een interactieve infographic is Canvas precies genoeg.

## Stap 1: open Canvas en schrijf je prompt

Ga naar [gemini.google.com](https://gemini.google.com), log in en kies **Canvas** in het invoerveld. Beschrijf je site in één concrete opdracht. Hoe specifieker, hoe bruikbaarder het resultaat:

> "Maak een landingspagina voor een lokaal cateringbedrijf met een kop, drie menupakketten met prijzen, klantreviews en een contactformulier."

Vermijd vage prompts als "maak een mooie website". Noem het doel, de secties en de toon. Canvas genereert vervolgens een pagina die je direct in een voorbeeldvenster ziet.

> **💡 Beginner-tip:** schrijf je prompt eerst even uit in Notities. Door hem te formuleren merk je zelf wat er ontbreekt, zoals welke secties of welke knop de bezoeker moet aanklikken, nog voordat de AI iets bouwt.

## Stap 2: verfijn in kleine stappen

Het eerste resultaat is zelden meteen goed, en dat hoeft ook niet. Geef Gemini daarna korte, gerichte opdrachten: "maak de knop in de kop groen en verander de tekst in 'Vraag een offerte aan'". Werk zo sectie voor sectie. Dat geeft je meer controle dan één grote herschrijfopdracht, en je ziet bij elke stap wat er verandert.

## Stap 3: test alsof je een bezoeker bent

Loop je prototype na als een echte gebruiker. Werkt het contactformulier? Kloppen de prijzen? Leiden de knoppen ergens heen? AI-builders vullen gaten soms met geloofwaardige maar verzonnen content, zoals een telefoonnummer of openingstijden die je nooit hebt opgegeven. Controleer elke feitelijke regel zelf.

## Stap 4: deel, of bouw verder in AI Studio

Tevreden? Deel de link voor feedback. Wil je echt publiceren, met eigen hosting of een backend, stap dan over naar de Build-modus van Google AI Studio. Die maakt complete webapps met een React-frontend en Node.js-backend, en kan je app uitrollen op Google Cloud Run, synchroniseren met GitHub of exporteren als ZIP-bestand ([Bron: Google AI for Developers](https://ai.google.dev/gemini-api/docs/aistudio-build-mode)). Let op: uitrollen op Cloud Run valt onder de gewone Cloud Run-tarieven ([Bron: Google AI for Developers](https://ai.google.dev/gemini-api/docs/aistudio-build-mode)).

> **⚡ Gevorderden:** oudere handleidingen noemen Firebase Studio als volgende stap. Gebruik dat niet meer: sinds 22 juni 2026 kun je er geen nieuwe werkruimtes aanmaken en op 22 maart 2027 sluit Google het platform. Google verwijst naar AI Studio en Antigravity ([Bron: Storyboard18](https://www.storyboard18.com/digital/google-to-shut-firebase-studio-in-2027-shifts-focus-to-ai-studio-and-antigravity-92922.htm)).

Nieuw met Gemini? Begin bij [Gemini gebruiken in 5 stappen](/nieuws/gemini-gebruiken-5-stappen). Bouw je liever in een andere app-builder, lees dan hoe je [een Lovable-project naar GitHub exporteert](/nieuws/lovable-project-exporteren-github). En wil je de basis van bouwen met AI goed onder de knie krijgen: Google zette het materiaal van zijn [vibe coding-cursus online](https://hetlaatsteainieuws.nl/nieuws/google-vibe-coding-cursus-juni-2026), lees je op hetlaatsteainieuws.nl.

## Checklist: ben je klaar?

- Ingelogd op gemini.google.com en Canvas gekozen.
- Eén concrete prompt met doel, secties en toon geschreven.
- Eerste prototype bekeken in het voorbeeldvenster.
- Losse onderdelen in kleine stappen verfijnd.
- Alle teksten, prijzen en contactgegevens zelf gecontroleerd.
- Formulieren en knoppen getest als bezoeker.
- Besloten: delen als prototype, of doorbouwen in de Build-modus van Google AI Studio.

## Bronnen

- [Canvas in Gemini](https://gemini.google/overview/canvas/) — Google
- [Build mode in Google AI Studio](https://ai.google.dev/gemini-api/docs/aistudio-build-mode) — Google AI for Developers
- [Google to shut Firebase Studio in 2027](https://www.storyboard18.com/digital/google-to-shut-firebase-studio-in-2027-shifts-focus-to-ai-studio-and-antigravity-92922.htm) — Storyboard18
