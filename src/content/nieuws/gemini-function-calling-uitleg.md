---
title: "Function calling in Gemini: zo laat je de AI zelf jouw functies aanroepen"
description: "Met function calling laat je Gemini niet alleen praten, maar ook echt iets ophalen of doen — een bestelstatus, een berekening, een API. Zo werkt de lus in vier stappen, met een concreet voorbeeld."
publishedAt: 2026-07-25
updatedAt: 2026-07-25
author: "Redactie"
category: "gids"
tags:
  - "gemini"
  - "function-calling"
  - "ai-agents"
  - "tools"
  - "api"
  - "google"
toolSlug: "gemini"
featured: false
draft: false
readingTime: 5
heroImage: "/images/articles/diorama-gemini-function-calling-uitleg.webp"
heroImageAlt: "Miniatuur diorama-illustratie bij artikel 'Function calling in Gemini'"
heroScene: "A miniature paper-craft diorama of a small robot handing a labeled request card through a window to a set of tiny machine levers, which hand a result card back, warm studio lighting, muted tones"
keyTakeaways:
  - "Function calling laat Gemini bepalen wélke functie nodig is en met welke waarden — maar jouw code voert de functie zélf uit."
  - "De lus heeft vier stappen: functie beschrijven, Gemini geeft een gestructureerd verzoek terug, jij voert uit, je stuurt het resultaat terug."
  - "Gemini verzint geen data: het levert een net JSON-blokje met naam en parameters, zodat je grip houdt op wat er gebeurt."
  - "Je kunt ingebouwde tools (zoals zoeken) combineren met je eigen functies in één gesprek."
faq:
  - q: "Doet Gemini de functie dan zelf?"
    a: "Nee, en dat is een belangrijk misverstand. Gemini kiest alleen welke functie past bij de vraag en met welke parameters, en geeft dat als gestructureerd JSON terug — bijvoorbeeld {\"name\": \"get_order_status\", \"args\": {\"order_id\": \"123\"}}. Het uitvoeren gebeurt in jouw eigen code of systeem. Daarna stuur je het resultaat terug naar Gemini, dat er een leesbaar antwoord van maakt. Zo houd jij de controle over wat er echt gebeurt, en kan het model geen acties buiten jouw functies om starten."
  - q: "Waarvoor gebruik je function calling in de praktijk?"
    a: "Voor alles waarbij het model actuele of externe informatie nodig heeft, of een actie moet aanzwengelen. Denk aan een chatinterface die een live bezorgstatus uit je database haalt, een assistent die een wisselkoers opvraagt, of een bot die een afspraak in een agenda zet. Zonder function calling zou het model moeten gokken op basis van zijn trainingsdata; mét function calling werkt het met echte, actuele gegevens."
  - q: "Heb ik hiervoor een betaald Gemini-abonnement nodig?"
    a: "Function calling zit in de Gemini API voor ontwikkelaars, waar een gratis niveau met limieten beschikbaar is om mee te testen; voor grotere volumes en productiegebruik betaal je per gebruik. De precieze limieten en prijzen wisselen, dus check de actuele voorwaarden bij Google AI for Developers voordat je iets op volume laat draaien."
  - q: "Kan Gemini meerdere tools in één gesprek gebruiken?"
    a: "Ja. Gemini kan ingebouwde tools — zoals zoeken op het web — combineren met je eigen functies binnen één interactie. Zo kan het model zich eerst met actuele webinformatie oriënteren en daarna jouw specifieke bedrijfslogica aanroepen. Bij de nieuwere Gemini-modellen kun je de argumenten van een functie-aanroep bovendien al binnenkrijgen terwijl ze gegenereerd worden (streaming), wat de reactietijd verkort."
---

Een taalmodel dat alleen praat, komt snel tegen zijn grenzen aan. Vraag je Gemini naar de status van jouw bestelling, dan kan het daar in zijn eentje niets zinnigs over zeggen — die informatie zit in jouw systeem, niet in de trainingsdata. Function calling overbrugt dat gat. Het laat [Gemini](https://ai.google.dev/gemini-api/docs/function-calling) bepalen dat er een functie nodig is en met welke gegevens, waarna jouw eigen code die functie uitvoert.

> **💡 Beginner-tip:** "Function calling" klinkt technisch, maar het idee is een keurige taakverdeling. Gemini is de receptionist die de vraag begrijpt en het juiste formulier invult; jouw programma is de collega achter het loket die de klus daadwerkelijk uitvoert. Het model doet dus niets buiten jou om.

## De lus in vier stappen

Function calling — ook wel *tool use* genoemd — werkt als een kort heen-en-weer tussen het model en jouw code.

**1. Beschrijf de functie.** Je vertelt Gemini welke functies er zijn: hun naam, wat ze doen en welke parameters ze verwachten. Je registreert die beschrijving als een tool.

**2. Gemini kiest en vult in.** Krijgt het model een vraag waarvoor een functie nodig is, dan geeft het een gestructureerd JSON-blokje terug met de functienaam en de ingevulde parameters, bijvoorbeeld `{"name": "get_order_status", "args": {"order_id": "123"}}`. Elk verzoek krijgt een eigen id.

**3. Jij voert uit.** Jouw applicatie draait de functie echt — de database bevragen, een API aanroepen, een berekening doen. Gemini heeft hier geen toegang toe; dit is volledig jouw terrein.

**4. Resultaat terug.** Je stuurt de uitkomst, met datzelfde id, terug naar Gemini. Het model verwerkt het antwoord tot leesbare tekst, of besluit dat er nog een functie nodig is en de lus opnieuw begint.

> **⚡ Gevorderden:** Je kunt ingebouwde tools en eigen functies mengen in één interactie. Zo laat je het model zich eerst oriënteren met een webzoekopdracht en daarna jouw specifieke bedrijfslogica aanroepen. Bij de nieuwere Gemini-modellen kun je de argumenten van een functie-aanroep bovendien streamen terwijl ze worden gegenereerd. De actuele werkwijze staat in de [Gemini-documentatie over function calling](https://ai.google.dev/gemini-api/docs/function-calling).

## Waarom dit veiliger voelt dan het klinkt

De eerste zorg bij mensen is vaak: laat ik het model dan zomaar dingen doen? Nee. Gemini beslist alleen wélke van jóuw functies wordt aangeroepen en met welke waarden. De uitvoering — en dus de macht om echt iets te veranderen — houd je zelf in handen. Wil je dat het model geen bestellingen kan annuleren, dan geef je die functie simpelweg niet mee.

Precies daarom is function calling de bouwsteen onder de meeste AI-agents: het geeft een model handen zonder dat je de controle uit handen geeft. Wil je het idee eerst in een no-code omgeving zien, dan kun je een vergelijkbaar principe uitproberen met [AI-agents in Make](/nieuws/betere-prompts-ai-agents-make), waar je functies aan een agent koppelt zonder te programmeren.
