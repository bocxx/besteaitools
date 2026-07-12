---
title: "Hoe bouw je geheugen in AI-agents met Make"
description: "Elke API-call verget jouw AI-agent alles. Leer een memory-laag inbouwen in Make zodat agents zich klanten, context en vorige interacties herinneren — praktische stappen met Scenarios en data stores."
slug: "make-ai-agent-memory-bouwen"
date: 2026-07-12
timeSlot: middag
category: gids
toolSlug: make
niveau: gevorderd
doelgroep:
  - developer
artikeltype: tutorial
tags:
  - make
  - ai-automation
  - agents
  - memory-architecture
  - workflows
  - no-code
keyTakeaways:
  - "AI-agents zijn standaard stateless: elke API-call wist alles wat daarvóór gebeurde."
  - "Geheugen bestaat uit twee lagen: working memory (context window) en persistent storage (database)."
  - "Make's data stores (of Airtable/Supabase) vormen de persistent laag."
  - "Het lookup-classify-write patroon is de industrie-standaard voor agent memory in Make."
---

## Je agent vergeet alles — hoe fix je dat?

Je hebt zojuist een AI-agent gebouwd in Make die klanten helpt. Het werkt perfect. Totdat de tweede vraag van dezelfde klant binnenkomt — en de agent doet alsof hij die persoon nooit heeft ontmoet.

Dit is geen bug. Het is architectuur: elke API-call naar Claude, ChatGPT of Gemini is **stateless**. De LLM ontvangt jouw input, geeft een antwoord, en vergeet alles wat zojuist is gebeurd. Geen geheugen. Geen staat. Niets.

Voor een agent die alleen korte vragen beantwoordt is dat prima. Maar zodra je wilt dat je agent:
- klanten herkent en hun voorkeuren onthouden
- eerder gestelde vragen niet opnieuw te beantwoorden
- problemen in meerdere stappen volgen
- feedback opstapelen in één kennisbank

…dan moet je **geheugen zelf inbouwen**. En dat is veel eenvoudiger dan je denkt.

## Het probleem: stateless APIs

Hier is wat er gebeurt als je nu een agent build zonder memory:

1. Klant schrijft: "Ik heb een vraag over mijn abonnement"
2. Make stuurt dit naar de AI-API
3. AI antwoordt (zonder enig historisch inzicht)
4. Klant vraagt vervolgens: "En het factureren?"
5. Make stuurt opnieuw naar de API
6. **AI vergeet punt 1 en 2 volledig** — het begin van het gesprek staat niet meer in de context

Elk keer verzendt Make het bericht als een compleet nieuw gesprek, omdat de LLM-API inherent stateless werkt. Het model onthoudt alleen wat jij expliciet in de prompt zet.

## Memory bestaat uit twee lagen

Computers hebben RAM (snel, klein, vergeetachtig) en een harde schijf (traag, groot, blijvend). AI-agents volgen hetzelfde model:

**Working memory** = het context window (RAM)
- Wat je agent *nu* denkt
- Vorige berichten in dit gesprek, huige taak, intermediate resultaten
- Snel en direct beschikbaar
- MAAR: weg zodra de API-call klaar is

**Persistent memory** = database/data store (harde schijf)
- Wie is deze klant? Wat hebben we eerder besproken?
- Wat moet de agent over deze sector weten?
- Blijft zitten tussen gesprekken
- Moet je expliciet ophalen en in de context window zetten

In Make bouw je dit zo: voordat je het bericht naar je AI-module stuurt, lees je eerst de relevante informatie uit een database. Die voe je in de prompt in. Daarna, na de AI-response, sla je de update terug op.

## Memory-strategieën in Make

**Korte termijn (conversation history)**
Hou de laatste 5-10 berichten in het context window. Dit helpt bij multi-turn gesprekken (als de context window groot genoeg is). Werkt, maar wordt snel duur — grote context windows kosten meer tokens.

**Lange termijn (database-backed)**
Sla klantinfo, interactiehistorie en kennisbank op in een database. Haal voor élke agent-interactie de relevante bits op. Dit is goedkoper (je betaalt alleen voor relevante context) en schaalbaar.

**Hybrid**
Korte termijn: houdt een paar recente berichten in de context. Lange termijn: database voor alles ouder dan ~10 minuten. Dit geeft je het beste van beide: responsief EN kostenefficiënt.

## Stap-voor-stap: het lookup-classify-write patroon

Dit is dé industrie-standaard voor agent memory, en Make maakt het eenvoudig.

### Stap 1: Read (ophalen)

Zodra de agent een inputveld ontvangt (bijvoorbeeld een bericht van een klant), start je scenario met een data store lookup:

```
Trigger: "Bericht ontvangen"
  ↓
Data Store → Search Records
  Zoek naar: klant_id = {{input.customer_id}}
  Voeg terug: vorige_vragen, voorkeur_taal, account_status
```

Make retourneert een bundel met alle opgeslagen info over deze klant.

### Stap 2: Classify (analyseren)

Pass nu zowel het inkomende bericht áls de opgehaalde history naar je AI-module:

```
AI Module (Chat)
  System prompt: "Je bent een supportagent. 
  Dit is wat je over deze klant weet: {{datastore.klant_info}}"
  
  User message: "{{input.bericht}}"
```

De AI ziet nu niet alleen de huige vraag, maar ook alle context die je hebt opgeslagen. Het kan intentie classificeren met veel meer inzicht.

### Stap 3: Write (opslaan)

Na de AI-response, update je de database:

```
Data Store → Update Record
  ID: {{input.customer_id}}
  Update fields:
    - vorige_vragen: {{input.bericht}}
    - laatste_contact: {{now}}
    - account_notes: {{ai_output.summary}}
```

Nu herinnert je system zich dit gesprek voor de *volgende* call.

## Praktijkvoorbeeld: een chatbot die klanten herkent

Je hebt een Make-scenario dat vragen van klanten ontvangt via email of Slack.

**Zonder memory:**
- Klant 1: "Hoe reset ik mijn wachtwoord?"
- Agent: "Ga naar instellingen → Wachtwoord → Reset"
- Klant 2 (dezelfde persoon, andere dag): "Werkt het reset-linkje niet"
- Agent: "Ga naar instellingen → Wachtwoord → Reset" (agent weet niks van vraag 1)

**Met memory:**
- Klant 1: "Hoe reset ik mijn wachtwoord?"
- Agent haalt op: {vorige_vragen: [], first_time: true}
- Agent: "Ga naar instellingen → Wachtwoord → Reset"
- Opslaan: {vorige_vragen: ["reset_wachtwoord"], first_time: false}
- Klant 2: "Werkt het reset-linkje niet"
- Agent haalt op: {vorige_vragen: ["reset_wachtwoord"], first_time: false}
- Agent: "Ik zie dat je gisteren al een reset hebt geprobeerd. Laten we proberen…" (veel relevanter)

## Wat te gebruiken voor opslag: Make Data Stores vs. alternatieven

Make heeft ingebouwde **Data Stores**, maar veel makers gebruiken liever:

- **Airtable** — meer mogelijkheden, betere filtering, zichtbaar
- **Supabase** — PostgreSQL + real-time API, schaalbaar
- **Google Sheets** — gratis en snel voor kleine volumes
- **Make Data Stores** — eenvoudig, ingebouwd, voldoende voor meeste use cases

Voor beginners: start met **Make Data Stores**. Ze zijn ingebouwd, gratis tot groot volume, en genoeg om het patroon te leren. Upgrade naar Airtable of Supabase als je meer flexibiliteit nodig hebt.

## Praktische tips

**1. Privacy — pas op met wat je opslaat**
Je slaat mogelijk gevoelige info op (zoekopdrachten, voorkeuren, contacten). Zorg dat je GDPR-compliant bent. Wis oude records als ze niet langer nodig zijn.

**2. Kosten — context window optimalisatie**
Een groot context window kost meer tokens. Sla niet *alles* op en injecteer niet *alles* terug. Leer de AI om relevant informatie te filteren:

```
"Kies uit de historische data hieronder wat relevant is 
voor deze nieuwe vraag en focus daarop:"
```

**3. Latentie — data store lookups zijn traag**
Een extra database-read voegt ~200-500ms toe aan je scenario. Voor real-time support: acceptabel. Voor hoge volume: kijk naar caching (bv. in lokale variabelen).

**4. Testen**
Debug je data store queries eerst handmatig. Zorg dat je lookup altijd iets teruggeeft (noteer wat te doen als record niet bestaat). Test met echte klantdata.

## Volgende stap

Begin klein: bouw een scenario dat één klant-datatype opslaat (bijv. vorige vraag, email, account-type). Zorg dat je lookup-classify-write patroon werkt. Schakel dan uit naar meer gelaagde memory (voorkeur_taal, vervolgstap, sentiment van vorige interactie).

Agents die klanten onthouden voelen veel beter dan amnestische bots — en je Make-scenario's worden ineens véél krachtiger.

## Bronnen & verdieping

- [Make: Agent Workflow Memory Guide (2026)](https://www.make.com/en/blog/agent-workflow-memory)
- [Why Context Windows Aren't Memory (Machine Learning Mastery)](https://machinelearningmastery.com/context-windows-are-not-memory-what-ai-agent-developers-need-to-understand/)
- [Make.com Help: Data Stores](https://help.make.com/make-ai-agents-the-next-step-in-automation)
- [Redis: AI Agent Memory Architecture](https://redis.io/blog/ai-agent-memory-stateful-systems/)
