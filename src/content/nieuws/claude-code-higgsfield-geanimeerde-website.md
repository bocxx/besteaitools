---
title: "Geanimeerde website bouwen met Claude Code en Higgsfield: zo werkt de workflow"
description: "Een virale post claimt een website van 35.000 dollar voor 12 dollar aan credits. De workflow achter die claim werkt echt — dit zijn de vier stappen."
publishedAt: 2026-07-07
updatedAt: 2026-07-07
author: "Redactie"
category: "gids"
tags:
  - "claude-code"
  - "higgsfield"
  - "gsap"
  - "webdesign"
  - "ai-video"
  - "agentic-coding"
toolSlug: "claude-code"
featured: false
draft: false
readingTime: 4
heroImage: "/images/articles/diorama-claude-code-higgsfield-geanimeerde-website.webp"
heroImageAlt: "Miniatuur diorama-illustratie bij artikel 'Geanimeerde website bouwen met Claude Code en Higgsfield: zo werkt de workflow'"
heroScene: "A tiny robot arm assembling a miniature stage set of glowing storefront panels while a film projector beams moving scenery onto them."
keyTakeaways:
  - "De workflow: Claude Code schrijft de site en de animatiecode, Higgsfield levert de visuals en video-assets — jij regisseert."
  - "De animatie-bibliotheken GSAP en Lenis zijn allebei gratis; het dure handwerk zat vroeger in het aan elkaar knopen, en dat doet Claude Code nu."
  - "Reken op een Claude-abonnement of API-tegoed plus een Higgsfield-plan vanaf zo'n 15 dollar per maand; de '12 dollar'-claim telt alleen de credits."
  - "Eén agentic sessie levert een werkend prototype; voor productie komt er altijd een ronde testen, tweaken en performance-werk bij."
faq:
  - q: "Kan Claude Code echt een complete geanimeerde website bouwen?"
    a: "Een werkend prototype: ja. Claude Code werkt agentic — het plant, schrijft bestanden, draait de build en corrigeert eigen fouten — en kent bibliotheken als GSAP en Lenis goed. Wat je niet moet verwachten: een pixel-perfect eindproduct zonder menselijke review. Reken op een sterke eerste versie die jij daarna richting en smaak geeft."
  - q: "Wat is Higgsfield en wat kost het?"
    a: "Higgsfield is een platform voor AI-beeld- en videogeneratie dat meerdere modellen bundelt achter één abonnement met credits. Betaalde plannen beginnen rond de 15 dollar per maand; losse credit-bundels kosten ongeveer 5 dollar per 100 credits en verlopen na 90 dagen. Voor een website gebruik je het voor hero-video's, sfeerbeelden en korte loops."
  - q: "Zijn GSAP en Lenis gratis te gebruiken?"
    a: "Ja. GSAP, jarenlang deels betaald, is sinds de overname door Webflow volledig gratis, inclusief plugins als ScrollTrigger. Lenis is een open-source smooth-scroll-bibliotheek van darkroom.engineering, licht en zonder dependencies. De combinatie van die twee is de standaard voor de vloeiende scroll-animaties die je op dure studio-sites ziet."
  - q: "Klopt de claim dat dit een website van 35.000 dollar vervangt?"
    a: "Deels. Wat webstudio's duur maakt is niet alleen de code: het is concept, merk, copy, revisierondes en aansprakelijkheid. De techniek — scroll-animaties, video-hero's, custom interacties — kun je met deze workflow inderdaad voor een fractie bouwen. Maar het bedrag in zulke posts is marketing; lees het als 'studio-look voor hobbybudget', niet als één-op-één vervanging."
  - q: "Heb ik programmeerkennis nodig voor deze workflow?"
    a: "Basiskennis helpt enorm. Claude Code schrijft de code, maar jij moet kunnen beoordelen of het resultaat deugt, een dev-server kunnen starten en een foutmelding kunnen terugkoppelen. Wie nog nooit met een terminal werkte, begint beter met een visuele sitebouwer en komt later terug voor deze route."
---
Een post die begin juli rondging op X claimt dat Claude Code plus Higgsfield in één agentic sessie een geanimeerde website van 35.000 dollar bouwt, voor ongeveer 12 dollar aan credits ([Bron: @zeuuss_01](https://twitter.com/zeuuss_01/status/2073529429838696592)). Het bedrag is marketing, de workflow eronder is echt en leerzaam. Dit is hoe je hem zelf draait, en waar de kleine lettertjes zitten.

## Waarom dit nu kan

De vloeiende studio-look — secties die binnenglijden terwijl je scrollt, een video-hero, tekst die per letter verschijnt — draait vrijwel altijd op twee bibliotheken: GSAP voor de animaties en Lenis voor de smooth scroll. GSAP was jarenlang deels betaald, maar is sinds de overname door Webflow volledig gratis, inclusief plugins als ScrollTrigger ([Bron: GSAP](https://gsap.com/)). Lenis is open source van darkroom.engineering ([Bron: GitHub](https://github.com/darkroomengineering/lenis)). Het dure zat nooit in de licenties; het zat in de uren handwerk om alles aan elkaar te knopen. Precies dat werk doet een agentic coding-tool nu. Wat "agentic" precies betekent, legt hetlaatsteainieuws.nl uit in [AI-agents in 2026: wat zijn ze en wat kun je er echt mee?](https://hetlaatsteainieuws.nl/achtergrond/ai-agents-2026-wat-zijn-ze)

## Stap 1 — Brief Claude Code als een opdrachtgever

Start Claude Code in een lege projectmap en schrijf een brief in plaats van een prompt: doel van de site, aantal secties, gewenste sfeer, welke animaties je wil ("hero met video-achtergrond, secties faden in bij scroll, horizontale galerij"). Noem GSAP en Lenis expliciet — dan slaat het model de eigen-houtje-animatiecode over en pakt het meteen de standaard. Laat het eerst een plan tonen voor het gaat bouwen; bijsturen op het plan is goedkoper dan bijsturen op code.

## Stap 2 — Genereer je assets in Higgsfield

Terwijl Claude Code de structuur neerzet, maak je in Higgsfield de beelden: een hero-video van een paar seconden, sfeerbeelden per sectie, eventueel een korte loop als achtergrond. Higgsfield bundelt meerdere beeld- en videomodellen achter één credit-systeem; betaalde plannen beginnen rond de 15 dollar per maand en losse bundels kosten ongeveer 5 dollar per 100 credits, met een houdbaarheid van 90 dagen ([Bron: Higgsfield](https://higgsfield.ai/pricing)). Genereer varianten in één sessie, dan verspil je geen credits aan losse nabestellingen.

> **⚡ Gevorderden:** laat Claude Code de video's door ffmpeg halen (compressie naar webm/mp4, poster-frame extractie) en Lenis aan GSAP's ScrollTrigger koppelen via de ticker. Dat zijn precies de klusjes die handmatig een middag kosten en die het model foutloos uit z'n mouw schudt — mits je er expliciet om vraagt.

## Stap 3 — Laat de agent koppelen en testen

Zet de assets in de projectmap en geef Claude Code de tweede opdracht: assets koppelen, scroll-animaties afwerken, responsive maken, dev-server draaien. Kijk mee en koppel terug wat je ziet ("de galerij hapert op mobiel"). Een agentic sessie is een dialoog; de kwaliteit van het eindresultaat hangt meer af van jouw feedback dan van de eerste generatie.

## Stap 4 — Reken eerlijk

De "12 dollar"-claim telt alleen de verbruikte credits. In werkelijkheid stapel je: een Claude-abonnement of API-tegoed voor Claude Code, een Higgsfield-plan, en je eigen uren voor review en smaak. Nog steeds een fractie van een studio-offerte — maar wie het als gratis presenteert, verkoopt iets. Wie zuinig wil draaien met Claude Code-tokens, pakt onze gids [Caveman Claude Code: tokens besparen](/nieuws/caveman-claude-code-tokens-besparen) erbij, en wie meerdere onderdelen parallel wil bouwen [de parallelle-sessies-workflow](/nieuws/claude-code-desktop-parallelle-sessies).

## Checklist: ben je klaar?

- [ ] Claude Code geïnstalleerd en gekoppeld aan je abonnement of API-key
- [ ] Brief geschreven: doel, secties, sfeer, gewenste animaties
- [ ] GSAP en Lenis expliciet in de opdracht genoemd
- [ ] Higgsfield-account met genoeg credits voor je assets (varianten in één sessie)
- [ ] Video's gecomprimeerd (webm/mp4) en van poster-frames voorzien
- [ ] Site getest op mobiel én desktop, scroll-performance gecheckt
- [ ] Eigen review-ronde gedaan — de agent bouwt, jij beoordeelt

## Bronnen

- [Higgsfield — Pricing](https://higgsfield.ai/pricing)
- [GSAP — nu volledig gratis](https://gsap.com/)
- [Lenis — darkroom.engineering (GitHub)](https://github.com/darkroomengineering/lenis)
- [Oorspronkelijke post @zeuuss_01 (X)](https://twitter.com/zeuuss_01/status/2073529429838696592)
