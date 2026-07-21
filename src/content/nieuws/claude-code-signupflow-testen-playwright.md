---
title: "Signup-flow testen met Claude Code en Playwright — inclusief de e-mailverificatie"
heroImageAlt: "Miniatuur diorama-illustratie bij artikel 'Signup-flow testen met Claude Code en Playwright — inclusief de e-mailverificatie'"
description: "Je aanmeldflow eindigt bij 'check je e-mail' en daar stopt elke test. Zo laat je Claude Code een Playwright-test bouwen die óók de verificatiemail afhandelt."
publishedAt: 2026-07-16
updatedAt: 2026-07-16
author: "Redactie"
category: "gids"
tags:
  - "claude-code"
  - "playwright"
  - "mailpit"
  - "e2e-testen"
  - "e-mailverificatie"
toolSlug: "claude-code"
featured: false
draft: false
readingTime: 4
heroImage: "/images/articles/diorama-claude-code-signupflow-testen-playwright.webp"
heroScene: "A miniature robot arm opening a tiny mailbox next to a laptop showing a signup form, workshop setting"
keyTakeaways:
  - "De e-mailverificatie is de stap waar bijna elke geautomatiseerde signup-test strandt: een mens moet de inbox in om een code of link op te halen."
  - "Met Mailpit vang je de mails van je eigen app lokaal op; via de API op poort 8025 leest je test de verificatielink automatisch uit."
  - "Claude Code schrijft de complete Playwright-test voor je: formulier invullen, mail ophalen, link volgen en het succes-scherm controleren."
  - "Deze aanpak is bedoeld voor je éigen signup-flow; bots loslaten op andermans diensten schendt vrijwel altijd de gebruiksvoorwaarden."
faq:
  - q: "Hoe test je e-mailverificatie automatisch met Playwright?"
    a: "Laat je app tijdens tests mailen naar een lokale testserver zoals Mailpit in plaats van een echte mailprovider. Je Playwright-test vult het aanmeldformulier in, pollt daarna de Mailpit-API (http://localhost:8025/api/v1/messages) tot de verificatiemail binnen is, haalt de link of code uit de berichttekst en opent die in dezelfde browsersessie. Zo draait de hele flow zonder mens."
  - q: "Wat is Mailpit en is het gratis?"
    a: "Mailpit is een gratis, open-source e-mail-testtool: een lokale SMTP-server (poort 1025) met webinterface en REST-API (poort 8025). Alle mail die je app verstuurt blijft lokaal hangen — er vertrekt niets naar echte ontvangers. Het draait als los binary of Docker-container en er is een TypeScript-client (npm-pakket mailpit-api) voor gebruik in tests."
  - q: "Kan Claude Code zelf Playwright-tests schrijven en draaien?"
    a: "Ja. Claude Code werkt in je terminal, leest je projectcode, en kan zowel de testbestanden schrijven als npx playwright test uitvoeren en de uitkomst interpreteren. Faalt de test, dan leest het de foutmelding en past het de test of je app aan. Beschrijf de flow in gewone taal en review de gegenereerde test voor je hem vastlegt."
  - q: "Mag je een registratie-bot ook op diensten van anderen gebruiken?"
    a: "Vrijwel nooit. Automatisch accounts aanmaken bij andermans dienst schendt in de regel de gebruiksvoorwaarden en kan tot blokkades leiden. Deze gids gaat over het testen van je eigen aanmeldflow, in een omgeving die jij beheert, met een mailserver die jij draait. Daar is dit een normale QA-praktijk."
sources:
  - label: "Mailpit — officiële site en documentatie"
    url: "https://mailpit.axllent.org/"
  - label: "Playwright — officiële documentatie (Microsoft)"
    url: "https://playwright.dev/docs/intro"
  - label: "Anthropic — Claude Code documentatie"
    url: "https://code.claude.com/docs/en/overview"
  - label: "The Practical Developer — Email Verification Bots with Playwright"
    url: "https://dev.to/francofuji/email-verification-bots-with-playwright-1dc7"
    publishedAt: 2026-07-16
---

Je bouwt een aanmeldflow, schrijft er netjes een test voor, en dan strandt alles op dezelfde muur: "check je e-mail om je account te bevestigen". Vanaf dat punt zit er een mens in je "geautomatiseerde" test die een inbox opent en een link kopieert. In deze gids laat je [Claude Code](/tools/claude-code) een Playwright-test bouwen die ook die stap zelf afhandelt — voor je eigen app, met een lokale testmailserver.

Eén afbakening vooraf: dit is een QA-recept voor je éigen signup-flow. Bots die accounts aanmaken bij diensten van anderen schenden vrijwel altijd de gebruiksvoorwaarden — dat terrein blijft hier bewust buiten beeld.

## Wat je nodig hebt

Drie ingrediënten: [Playwright](https://playwright.dev/docs/intro), Microsofts open-source framework voor browser-automatisering; Mailpit, een gratis lokale mailserver die alle uitgaande mail van je app opvangt in plaats van 'm te versturen ([Bron: Mailpit](https://mailpit.axllent.org/)); en Claude Code als de assistent die de testcode schrijft en draait. Je eigen app moet z'n mail via SMTP kunnen versturen — vrijwel elk framework kan dat.

## Stap 1 — Start Mailpit als lokale inbox

Mailpit draait als één binary of Docker-container en luistert standaard op poort 1025 (SMTP) en 8025 (webinterface + API). Wijs in de testconfiguratie van je app de SMTP-host naar `localhost:1025`. Elke verificatiemail die je app "verstuurt" verschijnt nu in de Mailpit-webinterface op `http://localhost:8025` — en is via de REST-API op datzelfde adres machineleesbaar ([Bron: Mailpit](https://mailpit.axllent.org/)).

> **💡 Beginner-tip:** er vertrekt in deze opzet géén echte e-mail. Mailpit vangt alles lokaal op, dus je kunt testen met verzonnen adressen als `test-123@example.com` zonder iemand te spammen of een echte inbox nodig te hebben.

## Stap 2 — Laat Claude Code de test schrijven

Open Claude Code in je projectmap en beschrijf de flow in gewone taal, bijvoorbeeld: "Schrijf een Playwright-test die het aanmeldformulier op /signup invult met een uniek e-mailadres, daarna via de Mailpit-API op localhost:8025 wacht op de verificatiemail, de bevestigingslink eruit haalt en opent, en controleert dat de gebruiker op het welkomstscherm belandt."

Claude Code leest je bestaande code (formulier-velden, routes, mailtemplates) en genereert de test daarop toegesneden. Voor het Mailpit-deel kan het de API rechtstreeks aanspreken (`GET /api/v1/messages`, daarna het losse bericht op ID ophalen) of het npm-pakket `mailpit-api` gebruiken, een TypeScript-client voor precies dit doel ([Bron: npm](https://www.npmjs.com/package/mailpit-api)).

## Stap 3 — De verificatiemail uitlezen

De kern van de test is een korte poll-lus: vraag de berichtenlijst op, filter op het gebruikte testadres, en trek de link of zescijferige code uit de berichttekst met een reguliere expressie. Laat de test maximaal zo'n tien seconden wachten voordat hij faalt — komt de mail dan nog niet, dan is dát je testresultaat.

> **⚡ Gevorderden:** genereer per testrun een uniek adres (`test-${Date.now()}@example.com`). Zo kunnen parallelle testruns elkaars mail niet oppakken en hoef je Mailpit tussen runs niet leeg te gooien.

## Stap 4 — Draaien, laten falen, laten fixen

Draai `npx playwright test` — of vraag Claude Code dat te doen. Het sterke van die combinatie: faalt de test, dan leest Claude Code de foutmelding en het trace-bestand, en stelt het zelf een fix voor — een selector die net anders heet, een mailtemplate waarin de link toch nét anders is opgebouwd. Review wat het verandert; zeker bij testcode wil je begrijpen wát er gecontroleerd wordt. Wie meer van dit soort zelfstandig doorwerkende AI-workflows wil begrijpen, leest de uitleg over AI-agents op [hetlaatsteainieuws.nl](https://hetlaatsteainieuws.nl/achtergrond/ai-agents-2026-wat-zijn-ze).

Dit sluit aan op wat we eerder schreven in [Claude Code-skills instellen](/nieuws/claude-code-skills-instellen) — zo'n test-recept leent zich goed voor een herbruikbare skill.

## Checklist: ben je klaar?

- [ ] Mailpit draait lokaal (webinterface bereikbaar op `http://localhost:8025`)
- [ ] Je app mailt in de testomgeving naar `localhost:1025`
- [ ] Playwright is geïnstalleerd (`npm init playwright@latest`)
- [ ] Claude Code heeft de test gegenereerd én jij hebt hem gereviewd
- [ ] De test gebruikt per run een uniek testadres
- [ ] De poll-lus heeft een timeout, zodat een ontbrekende mail de test laat falen
- [ ] De test draait groen met `npx playwright test`
