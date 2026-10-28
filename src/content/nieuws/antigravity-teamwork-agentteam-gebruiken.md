---
title: "Antigravity Teamwork gebruiken: zet een team AI-agents op één klus"
description: "Met Teamwork in Google Antigravity verdeelt een team agents een groot programmeerproject en controleert het zichzelf. Zo start je een run, in vijf stappen."
publishedAt: 2026-10-13
updatedAt: 2026-10-13
author: "Redactie"
category: "gids"
tags:
  - "google-antigravity"
  - "gemini"
  - "ai-agents"
  - "multi-agent"
  - "teamwork"
  - "programmeren"
toolSlug: "gemini"
featured: false
draft: false
readingTime: 4
heroImage: "/images/articles/diorama-antigravity-teamwork-agentteam-gebruiken.webp"
heroImageAlt: "Miniatuur diorama-illustratie bij artikel 'Antigravity Teamwork gebruiken: zet een team AI-agents op één klus'"
heroScene: "Several small chrome robots around a wooden workbench, each assembling one part of a brass clockwork machine"
sources:
  - label: "Google Antigravity Docs — Teamwork"
    url: "https://antigravity.google/docs/teamwork"
  - label: "Google Blog — Pairing Google Antigravity with Gemini 3.7 Flash solves multi-agent math and engineering problems"
    url: "https://blog.google/innovation-and-ai/technology/developers-tools/antigravity-teamwork-multi-agent/"
    publishedAt: 2026-08-31
  - label: "Google Antigravity — Pricing"
    url: "https://antigravity.google/pricing"
keyTakeaways:
  - "Teamwork is een preview-functie in Google Antigravity 2.0 en de Antigravity CLI. Je start hem met het commando /teamwork-preview, en alleen met een betaald abonnement."
  - "Eerst voert de hoofdagent een kort interview over doel, eisen, toetsing en wanneer iets klaar is. Daarna werkt een team van agents zelfstandig door."
  - "Aparte agents controleren het werk: een Critic doet code review, een Challenger zoekt randgevallen en een Auditor kijkt of tests echt draaien en niet nep zijn."
  - "Met de integriteitsmodus bepaal je welke shortcuts mogen: development (standaard), demo of benchmark."
  - "Al het werk gebeurt in een eigen projectmap, standaard ~/teamwork_projects, zodat je hoofdrepository schoon blijft."
faq:
  - q: "Wat is Teamwork in Google Antigravity?"
    a: "Teamwork is een functie in Google Antigravity waarmee een team van AI-agents samen aan één groot project werkt. Een coördinerende agent verdeelt het werk in mijlpalen, uitvoerende agents schrijven code en aparte controle-agents keuren elke mijlpaal voordat het team verdergaat. Google gebruikte het met Gemini 3.7 Flash onder meer voor wiskundige bewijzen en een CPU-simulator."
  - q: "Is Antigravity Teamwork gratis?"
    a: "Nee. Volgens de documentatie werkt het commando /teamwork-preview alleen met een betaald abonnement. Antigravity zelf heeft een gratis instap voor individuen; Pro en Ultra lopen via de Google AI-abonnementen en geven hogere limieten en een pool AI-credits."
  - q: "Hoe start ik een agentteam in Antigravity?"
    a: "Open in Antigravity 2.0 een nieuw gesprek of start de Antigravity CLI, en typ /teamwork-preview gevolgd door je doel. De agent stelt dan vragen over doel, eisen, toetsing, acceptatiecriteria en projectmap. Je keurt het voorstel goed, waarna het team zelfstandig begint."
  - q: "Wat is het verschil tussen Teamwork en een gewone Antigravity-agent?"
    a: "Een gewone agent werkt stap voor stap met jou samen. Teamwork verdeelt een groot project over meerdere agents die parallel werken, met ingebouwde controle door aparte review-agents. Het is bedoeld voor klussen die uren kunnen duren, zoals een migratie of een grote refactor."
---

Een groot programmeerproject in één prompt weggeven, en een team AI-agents het zelf laten plannen, bouwen en controleren: dat is het idee achter Teamwork in Google Antigravity. Google liet het eind augustus met Gemini 3.7 Flash los op open wiskundeproblemen en een complete CPU-simulator ([Bron: Google Blog](https://blog.google/innovation-and-ai/technology/developers-tools/antigravity-teamwork-multi-agent/)). Zo start jij je eerste run.

## Wat je nodig hebt

Teamwork werkt in Antigravity 2.0 en in de Antigravity CLI, en alleen met een betaald abonnement ([Bron: Antigravity Docs](https://antigravity.google/docs/teamwork)). Het gratis instapplan heeft basislimieten; Pro en Ultra lopen via de Google AI-abonnementen en geven een flexibele pool AI-credits. Voor organisaties is er een Business-variant via Google Cloud vanaf $30 per gebruiker per maand ([Bron: Antigravity Pricing](https://antigravity.google/pricing)).

> **💡 Beginner-tip:** een [AI-agent](https://www.hetlaatsteainieuws.nl/achtergrond/ai-agents-wat-zijn-ze) is een AI die zelf stappen zet, zoals bestanden lezen, code draaien en tests uitvoeren, in plaats van alleen te antwoorden. Teamwork zet er meerdere naast elkaar.

## Zo start je een agentteam in vijf stappen

1. **Open een nieuw gesprek** in Antigravity 2.0, of start de CLI.
2. **Typ `/teamwork-preview` gevolgd door je doel.** Wees concreet: "Migreer deze Express-app naar Fastify, met tests, TypeScript-types en een benchmark" is het voorbeeld uit de documentatie ([Bron: Antigravity Docs](https://antigravity.google/docs/teamwork)).
3. **Beantwoord het scopinggesprek.** De hoofdagent vraagt naar doel en publiek, je eisen, een objectieve toets per eis (testsuite, benchmark of een beoordelende agent), wanneer het klaar is en in welke map het team werkt. Standaard is dat `~/teamwork_projects/<projectnaam>`.
4. **Kies je integriteitsmodus.** In hetzelfde gesprek sluit je shortcuts uit. `development` is de standaard en snel; `demo` verbiedt het kopiëren van kernlogica uit open source; `benchmark` eist alles zelf geschreven, alleen met de standaardbibliotheek ([Bron: Antigravity Docs](https://antigravity.google/docs/teamwork)).
5. **Lees het prompt-artefact na en keur het goed.** Met één bevestiging start de uitvoering. Daarna werkt het team zonder dat jij per stap hoeft te prompten.

## Wie er in het team zit

Een Sentinel neemt je opdracht in ontvangst en geeft voortgangsupdates. Een Project Orchestrator knipt de klus in mijlpalen en verdeelt het werk, en geeft tussen mijlpalen het stokje door aan een verse opvolger zodat de context schoon blijft. Explorers verkennen de code alleen-lezen, Workers schrijven code en tests ([Bron: Antigravity Docs](https://antigravity.google/docs/teamwork)).

De controle is apart belegd. Een Critic doet code review, een Challenger bestookt het werk met randgevallen en zware invoer, en een Auditor checkt of tests echt geslaagd zijn en niet gemockt of overgeslagen. Aan het eind doet een Success Auditor een volledige end-to-end controle.

> **⚡ Gevorderden:** wil je één afgebakende wijziging, zeg dan expliciet dat het "klein" of "gefocust" moet blijven; Teamwork kiest dan het Iterative coding-pad in plaats van het zware General-pad. Voor bewijzen bestaat een apart Math/Proof-pad ([Bron: Antigravity Docs](https://antigravity.google/docs/teamwork)).

## Meekijken terwijl het team werkt

Je volgt de run via drie artefacten: je opdracht, het projectplan met mijlpalen en een live voortgangsoverzicht. In de app zie je de subagents in een eigen paneel; in de terminal spring je met Alt+J naar een agent die op goedkeuring wacht. Twee Workers bewerken nooit hetzelfde bestand tegelijk, en elke agent heeft een eigen kladmap ([Bron: Antigravity Docs](https://antigravity.google/docs/teamwork)).

Hoe ver dit kan gaan, liet Google zien: het team loste volgens Google zeven open problemen in wiskunde en theoretische informatica op en bouwde een RISC-V-simulator die het xv6-besturingssysteem opstart ([Bron: Google Blog](https://blog.google/innovation-and-ai/technology/developers-tools/antigravity-teamwork-multi-agent/)). Werk je liever met de API van het nieuwere model, lees dan [hoe je overstapt naar Gemini 3.8 Flash](/nieuws/gemini-3-8-flash-overstappen-api). Een vergelijkbare aanpak bij de concurrent: [taken uitbesteden aan Cursor-cloud-agents](/nieuws/cursor-cloud-agents-taak-uitbesteden).

## Checklist: ben je klaar?

- [ ] Betaald Antigravity-abonnement actief
- [ ] Antigravity 2.0 of de CLI geïnstalleerd
- [ ] Doel concreet geformuleerd, met een toets per eis
- [ ] Acceptatiecriteria voor "klaar" bepaald
- [ ] Integriteitsmodus gekozen
- [ ] Prompt-artefact nagelezen vóór je goedkeurt
- [ ] Credits en verbruik in de gaten met `/usage`

## Bronnen

- [Google Antigravity Docs — Teamwork](https://antigravity.google/docs/teamwork): rollen, fases, modi en stappen
- [Google Blog — Antigravity Teamwork met Gemini 3.7 Flash](https://blog.google/innovation-and-ai/technology/developers-tools/antigravity-teamwork-multi-agent/): resultaten en achtergrond
- [Google Antigravity — Pricing](https://antigravity.google/pricing): abonnementen en Business-tarief
