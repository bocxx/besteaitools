---
title: "Je Lovable-project exporteren naar GitHub: zo houd je je code"
description: "Lovable bouwt je app, maar je wilt je code zelf bezitten. Zo exporteer je in een paar minuten naar GitHub — met de sync-valkuil die veel mensen pas te laat zien."
publishedAt: 2026-06-22
updatedAt: 2026-06-22
author: "Redactie"
category: "gids"
tags:
  - "lovable"
  - "github"
  - "exporteren"
  - "vibe-coding"
  - "code-ownership"
toolSlug: "lovable"
featured: false
draft: false
readingTime: 4
heroImage: "/images/articles/diorama-lovable-project-exporteren-github.webp"
heroImageAlt: "Miniatuur diorama-illustratie bij artikel 'Je Lovable-project exporteren naar GitHub: zo houd je je code'"
heroScene: "A tiny conveyor belt carrying a glowing miniature house from a glass dome into an open wooden crate stamped with a cat-shaped lock"
keyTakeaways:
  - "Lovable exporteert via de native GitHub-integratie: het maakt een repository aan en houdt die automatisch in sync."
  - "Je export bevat je volledige React-app: Tailwind CSS, Supabase-config, routing en de complete mappenstructuur."
  - "Volgens Lovable's voorwaarden heb je volledige eigendom van de geëxporteerde code — commercieel gebruiken, aanpassen en overal hosten mag."
  - "Valkuil: Lovable behandelt zijn eigen editor als bron-van-waarheid; verplaats je de repo terwijl sync aanstaat, dan breek je die sync mogelijk permanent."
  - "Wijzigingen lopen twee kanten op: edits in Lovable verschijnen in GitHub, en pushes naar de actieve branch komen terug in Lovable."
faq:
  - q: "Kan ik mijn Lovable-project naar GitHub exporteren?"
    a: "Ja. De snelste en schoonste route is de native GitHub-integratie. Open je project, klik op het GitHub-icoon in de bovenbalk (of ga via Settings naar Integrations/GitHub), en Lovable maakt een repository voor je aan en houdt die automatisch in sync. Je hoeft de sync niet handmatig te triggeren: elke geslaagde wijziging in Lovable wordt naar je gekoppelde repo gepusht."
  - q: "Wat krijg ik precies mee bij een Lovable-export?"
    a: "Je krijgt je volledige applicatie: React-componenten, Tailwind CSS-styling, je Supabase-configuratie, de routing en de complete mappenstructuur. Het is dus geen kale code-dump maar een werkend project dat je elders kunt deployen. Daarmee ben je niet langer afhankelijk van Lovable's hosting of roadmap voor features die je vandaag nodig hebt."
  - q: "Ben ik eigenaar van de code die Lovable genereert?"
    a: "Volgens Lovable's terms of service heb je volledige eigendom van de naar GitHub geëxporteerde code. Je mag die commercieel gebruiken, aanpassen en overal hosten. Dat is precies waarom de export-route waardevol is: je gebruikt Lovable voor de snelheid van het bouwen, maar zit niet vast aan het platform voor het bezit van je product."
  - q: "Wat is de grootste valkuil bij het exporteren van Lovable naar GitHub?"
    a: "Lovable werkt andersom dan veel tools: het behandelt zijn eigen interne editor als de bron-van-waarheid en pusht code naar buiten bij sync. Verplaats je die repository — bijvoorbeeld van je persoonlijke account naar een organisatie — terwijl de Lovable-sync nog actief is, dan breek je die sync waarschijnlijk permanent. Ontkoppel of plan zo'n verhuizing dus bewust, niet terloops."
---

Je hebt iets tastbaars gebouwd met Lovable, misschien al gedemood aan je eerste gebruikers. En dan loop je tegen een grens aan: je wacht op een feature uit de roadmap, of je wilt hosting-flexibiliteit die het platform niet biedt. Het goede nieuws is dat je niet opnieuw hoeft te beginnen. Lovable exporteert schone, production-ready code die je zelf bezit en overal kunt deployen. Zo doe je dat — en zo vermijd je de sync-val die veel mensen pas te laat ontdekken.

## Stap 1 — Open de GitHub-integratie

De snelste en schoonste route is niet een handmatige download maar de native GitHub-integratie. Open het project dat je wilt exporteren. Zoek in de bovenbalk van de editor naar het GitHub-icoon, of open het Settings-paneel en ga naar Integrations of GitHub ([Bron: Lovable Docs](https://docs.lovable.dev/integrations/github)).

## Stap 2 — Laat Lovable de repository aanmaken

Bij het koppelen maakt Lovable een repository voor je aan en houdt die automatisch in sync. Je hoeft niets handmatig te pushen: elke keer dat je in Lovable een wijziging maakt en die succesvol opslaat, wordt de bijgewerkte code naar je gekoppelde GitHub-repo gepusht.

> **💡 Beginner-tip:** Een "repository" (repo) is simpelweg de map waarin GitHub je code en de hele wijzigingsgeschiedenis bewaart. Je hebt een gratis GitHub-account nodig; daarna doet Lovable het koppelen voor je.

## Stap 3 — Controleer wat je hebt meegekregen

Je export is geen kale code-dump. Je krijgt je React-componenten, Tailwind CSS, je Supabase-configuratie, de routing én je volledige mappenstructuur ([Bron: Encited](https://encited.com/blog/lovable-export-to-github)). Met andere woorden: een werkend project dat je in een eigen omgeving kunt openen, draaien en deployen. Volgens Lovable's voorwaarden heb je volledige eigendom van die code — commercieel gebruiken, aanpassen en overal hosten mag ([Bron: Rapid Dev](https://www.rapidevelopers.com/blog/can-i-export-lovable-step-by-step-guide-to-getting-your-code-out)).

## Stap 4 — Begrijp de twee-richtingen-sync (en de valkuil)

De koppeling werkt beide kanten op: edits in Lovable verschijnen in GitHub, en pushes naar de actieve GitHub-branch komen terug in Lovable. Handig — maar hier zit ook de adder. Lovable behandelt zijn eigen editor als de bron-van-waarheid en pusht code naar buiten. Verplaats je de repository terwijl die sync nog aanstaat, bijvoorbeeld van je persoonlijke account naar een organisatie, dan breek je die sync waarschijnlijk permanent.

> **⚡ Gevorderden:** Wil je echt los van Lovable verder en de repo verhuizen naar een team-organisatie? Ontkoppel dan eerst bewust de Lovable-sync, of plan de migratie als een eenrichtings-knip. Behandel het moment waarop je "weggaat" als een expliciete beslissing, niet als een terloopse GitHub-actie.

## Wanneer is exporteren het juiste moment?

Exporteer zodra je tegen de grenzen van het platform aanloopt: een ontbrekende feature, hosting-eisen voor je prijsmodel, of de wens om met een eigen AI-coding-agent door te bouwen. Wil je vanaf daar verder sleutelen aan je geëxporteerde React-app, dan is [Cursor](/nieuws/cursor-code-refactoren) een logische volgende stap. Voor de bredere context over hoe vibe-coding-platforms zich verhouden tot zelf code bezitten, lees je de duiding op [hetlaatsteainieuws.nl](https://hetlaatsteainieuws.nl/).

## Checklist: ben je klaar?

- [ ] Je hebt een GitHub-account
- [ ] Je hebt de GitHub-integratie in Lovable geopend
- [ ] Lovable heeft de repository aangemaakt en sync staat aan
- [ ] Je hebt gecontroleerd dat React, Tailwind, Supabase-config en routing zijn meegekomen
- [ ] Je weet dat de sync twee kanten op werkt
- [ ] Je weet dat een repo-verhuizing tijdens actieve sync die sync kan breken

## Bronnen

- [Lovable Documentation — Connect to GitHub](https://docs.lovable.dev/integrations/github)
- [Encited — How to Export Your Lovable Project to GitHub (2026)](https://encited.com/blog/lovable-export-to-github)
- [Rapid Dev — Can I Export Lovable? Step-by-Step Guide](https://www.rapidevelopers.com/blog/can-i-export-lovable-step-by-step-guide-to-getting-your-code-out)
