---
title: "v0 gebruiken: van prompt naar je eerste React-pagina"
heroImage: "/images/articles/diorama-v0-eerste-react-pagina-prompt-gids.webp"
description: "Met v0 van Vercel beschrijf je een pagina in gewone taal en krijg je werkende Next.js-code. Zo begin je, wat het gratis kost en waar je op moet letten."
publishedAt: 2026-09-30
updatedAt: 2026-09-30
author: "Redactie"
category: "gids"
tags:
  - "v0"
  - "vercel"
  - "react"
  - "nextjs"
  - "shadcn-ui"
  - "ai-app-builder"
toolSlug: "v0"
featured: false
draft: false
readingTime: 4
heroImageAlt: "Miniatuur diorama-illustratie bij artikel 'v0 gebruiken: van prompt naar je eerste React-pagina'"
heroScene: "A paper sketch on a drawing table feeding into small wooden interface blocks that snap together into a miniature web page"
keyTakeaways:
  - "v0 is de AI-builder van Vercel: je beschrijft een interface in gewone taal en krijgt een werkende app in Next.js, React, TypeScript, Tailwind CSS en shadcn/ui."
  - "Publiceren gaat via Publish rechtsboven en dan Publish to Production; de code exporteren of in twee richtingen met GitHub synchroniseren kan ook."
  - "Het gratis plan geeft 5 dollar aan maandelijkse credits en maximaal 7 berichten per dag. Die daglimiet bepaalt hoe zorgvuldig je je eerste prompt schrijft."
  - "Plus kost 30 dollar per gebruiker per maand, verlaagd van 90 dollar; Business staat op 100 dollar."
  - "v0 werkt het best binnen de Vercel-, Next.js- en shadcn-stack. Vue, Svelte, native apps en zware backend-logica vragen een andere tool."
faq:
  - q: "Wat is v0 en waarvoor gebruik je het?"
    a: "v0 is de AI-builder van Vercel voor webinterfaces. Je beschrijft wat je wilt zien, en v0 bouwt het met Next.js, React, TypeScript, Tailwind CSS en shadcn/ui. Het is bedoeld voor prototypes, landingspagina's en interface-onderdelen, en sinds dit jaar ook voor complete apps in een sandbox met een echte runtime."
  - q: "Is v0 gratis?"
    a: "Er is een gratis plan met 5 dollar aan maandelijkse credits en een limiet van 7 berichten per dag, inclusief visuele bewerking en GitHub-sync. Betaalde plannen beginnen bij Plus op 30 dollar per gebruiker per maand; Business staat op 100 dollar. Prijzen wijzigen hier vaker dan gemiddeld, dus controleer v0.app/pricing voordat je overstapt."
  - q: "Kan ik de code van v0 buiten Vercel gebruiken?"
    a: "Ja. Je exporteert de gegenereerde code en deployt hem elders, of je koppelt GitHub en synchroniseert in twee richtingen met je eigen repository. Publiceren met Publish to Production is de snelste route, maar geen verplichting."
  - q: "Voor wie is v0 niet geschikt?"
    a: "Voor projecten die niet op React draaien, zoals Vue, Svelte of native apps, en voor zware backend-logica of complexe autorisatie. Daar heb je een coding-agent of een backend-tool naast nodig."
sources:
  - label: "v0 Docs — FAQ"
    url: "https://v0.app/docs/faqs"
  - label: "v0 Pricing"
    url: "https://v0.app/pricing"
  - label: "Vercel — Introducing the new v0"
    url: "https://vercel.com/blog/introducing-the-new-v0"
---

Je hebt een idee voor een pagina, maar geen zin om een uur aan opmaak te besteden. v0 van Vercel neemt dat werk over: je beschrijft wat je wilt, en het levert werkende React-code met een live voorbeeld. In vijf stappen kom je van een lege chat naar een gepubliceerde pagina.

## Stap 1: maak een account en open een chat

Ga naar [v0.app](https://v0.app) en log in. Het gratis plan volstaat om te beginnen: dat geeft 5 dollar aan maandelijkse credits en een limiet van 7 berichten per dag ([Bron: v0 Pricing](https://v0.app/pricing)). Die daglimiet bepaalt hoe je werkt. Zeven berichten zijn snel op als je per wijziging één zinnetje typt, dus schrijf je eerste prompt zorgvuldig.

## Stap 2: schrijf een concrete prompt

v0 bouwt met Next.js, React, TypeScript, Tailwind CSS en shadcn/ui ([Bron: v0 Docs](https://v0.app/docs/faqs)). Vraag daarom niet om "een mooie site", maar beschrijf onderdelen, inhoud en stijl:

```text
Maak een landingspagina voor een fietsenmaker in Utrecht.
Bovenaan een titel en een knop "Plan een afspraak".
Daaronder drie kaarten met diensten en prijzen,
onderaan een contactformulier met naam, e-mail en bericht.
Rustige kleuren, veel witruimte.
```

> **Beginner-tip:** Noem echte teksten en getallen in je prompt. Zonder die details verzint v0 vulling, en die moet je daarna toch vervangen. Werk je liever met een editor dan met een chat, dan is onze gids over [coderen met AI in Cursor of Copilot](/nieuws/coderen-met-ai-cursor-copilot-beginners) een logischer beginpunt.

## Stap 3: verfijn in dezelfde chat

Je hoeft niet opnieuw te beginnen als iets niet klopt. Vraag in dezelfde chat om aanpassingen: "maak de kaarten breder", "zet het formulier boven de diensten". Elke opdracht telt mee voor je limiet, dus bundel wijzigingen in één bericht in plaats van ze los te sturen.

## Stap 4: publiceer of exporteer

Klik rechtsboven in de chat op **Publish** en kies **Publish to Production**. De app komt op Vercel te staan zonder dat je verder iets configureert ([Bron: v0 Docs](https://v0.app/docs/faqs)). Wil je de code zelf beheren, dan exporteer je hem, of je koppelt GitHub en synchroniseert in twee richtingen — handig als je in Cursor of Claude Code verder wilt werken.

## Stap 5: controleer wat je live zet

De code komt van een AI. Klik alle knoppen door, test het formulier en kijk op je telefoon. v0 bouwt het scherm; of dat formulier ook ergens aankomt, moet jij regelen.

> **Gevorderden:** v0 kan bestaande GitHub-repo's importeren en omgevingsvariabelen uit je Vercel-project ophalen, zodat je in een bestaand project werkt in plaats van naast een bestaand project ([Bron: Vercel](https://vercel.com/blog/introducing-the-new-v0)).

## Wat het kost als je verder gaat

Loop je tegen die zeven berichten per dag aan, dan is Plus de volgende stap: 30 dollar per gebruiker per maand, verlaagd van 90 dollar, met Business op 100 dollar ([Bron: v0 Pricing](https://v0.app/pricing)). Dat is een forse verlaging voor een tool die vorig jaar nog als duur gold, maar reken wel met credits: je verbruik hangt aan het aantal en de zwaarte van je opdrachten, niet aan een vast aantal pagina's.

Voor Vue, Svelte of native apps is v0 niet gebouwd. Zware backend-logica of complexe inlog vraagt een coding-agent zoals Cursor — zie onze gids over [Cursor 1.0](/nieuws/cursor-1-0-lancering). Voor een simpele site zonder code zit je beter bij een klassieke sitebouwer.

Vibe coding is inmiddels ook lesmateriaal: Google heeft er [een gratis cursus](https://www.hetlaatsteainieuws.nl///nieuws/google-vibe-coding-cursus-juni-2026) van gemaakt, schreef hetlaatsteainieuws.nl.

## Checklist: ben je klaar?

- [ ] v0-account actief en je weet op welk plan je zit
- [ ] Eerste prompt bevat onderdelen, echte teksten en een stijlrichting
- [ ] Wijzigingen gebundeld per bericht in plaats van los verstuurd
- [ ] Gepubliceerd via Publish → Publish to Production, of code geëxporteerd
- [ ] GitHub-sync aan als je lokaal wilt doorwerken
- [ ] Alle knoppen en formulieren zelf getest, ook op mobiel
- [ ] Formulier-afhandeling (waar gaat de inzending heen?) geregeld

## Bronnen

- [v0 Docs — FAQ](https://v0.app/docs/faqs) — stack, publiceren en GitHub-sync
- [v0 Pricing](https://v0.app/pricing) — credits, daglimiet en plannen
- [Vercel — Introducing the new v0](https://vercel.com/blog/introducing-the-new-v0) — repo-import en omgevingsvariabelen
