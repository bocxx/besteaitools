---
title: "WhatsApp-klantenservicebot bouwen met n8n: van trigger tot automatisch antwoord"
heroImageAlt: "Miniatuur diorama-illustratie bij artikel 'WhatsApp-klantenservicebot bouwen met n8n: van trigger tot automatisch antwoord'"
description: "Een AI-bot die je WhatsApp Business 24/7 beantwoordt en doorschakelt bij twijfel. Zo zet je hem in n8n op met vier nodes, zonder code."
publishedAt: 2026-07-28
updatedAt: 2026-07-28
author: "Redactie"
category: "gids"
tags:
  - "n8n"
  - "whatsapp"
  - "ai-agent"
  - "klantenservice"
  - "automatisering"
  - "no-code"
toolSlug: "n8n"
featured: false
draft: false
readingTime: 5
heroImage: "/images/articles/diorama-n8n-whatsapp-klantenservicebot-bouwen.webp"
keyTakeaways:
  - "Een WhatsApp-bot in n8n bestaat uit drie schakels: een WhatsApp-trigger die berichten binnenhaalt, een AI Agent-node die nadenkt, en een Send Message-node die antwoordt."
  - "De AI Agent-node kan méér dan tekst: via Tools leest hij een Google Sheet, checkt een agenda of boekt een afspraak — dat maakt het verschil met een simpele auto-reply."
  - "Zet een Memory-node op ongeveer 10 berichten zodat de bot een gesprek volgt zonder in de war te raken; meer geheugen is meestal overbodig en duurder."
  - "Bouw vanaf dag één een ontsnappingsroute in: een Telegram- of e-mailnode die jou pingt zodra de bot het niet weet, zodat een klant nooit vastloopt."
faq:
  - q: "Heb ik een WhatsApp Business-account nodig voor een n8n-bot?"
    a: "Ja. n8n koppelt via de node WhatsApp Business Cloud, en die vereist een WhatsApp Business-account met toegang tot de Cloud API van Meta. Een gewoon WhatsApp-nummer volstaat niet. Je regelt de koppeling eenmalig via Meta's developer-portal en plakt de tokens in de credentials van n8n. Daarna luistert de trigger automatisch naar inkomende berichten op je zakelijke nummer."
  - q: "Welk AI-model kies ik voor een WhatsApp-klantenservicebot?"
    a: "Voor chat-antwoorden zijn de goedkopere, snelle modellen ruim voldoende — denk aan GPT-5 mini of een Claude Haiku-model. Die reageren snel en kosten weinig per bericht, wat telt als je veel gesprekken verwerkt. Zwaardere modellen zet je pas in als de bot ingewikkelde documenten moet uitpluizen. Begin klein en schaal op zodra je merkt dat antwoorden tekortschieten."
  - q: "Kan de bot een menselijke medewerker inschakelen?"
    a: "Ja, en dat is aan te raden. Voeg na de AI Agent een node toe die jou een melding stuurt — bijvoorbeeld via Telegram of e-mail — zodra de bot geen goed antwoord heeft of een klant vraagt om een mens. Zo blijft de klant niet in een lus hangen. Je bepaalt zelf de drempel: bij een klacht, bij een concrete offerte-aanvraag, of gewoon buiten kantooruren."
  - q: "Is n8n gratis voor dit soort automatiseringen?"
    a: "n8n heeft een gratis, zelf-gehoste versie die je op je eigen server of lokaal draait; daar betaal je alleen je eigen hosting. De gehoste n8n Cloud is betaald en rekent per uitvoering. De AI-modellen (OpenAI, Anthropic) reken je apart af per token. Voor een kleine bot blijven die kosten laag, maar houd ze in de gaten zodra het aantal gesprekken groeit."
---

Je WhatsApp Business krijgt om 23:00 een bericht van een potentiële klant. Zie je het pas de volgende ochtend, dan is die klant vaak al bij een concurrent. Een AI-bot in [n8n](/tools/n8n) vangt dat gat op: hij leest binnenkomende berichten, antwoordt zelf en tikt jou op de schouder als het spannend wordt. Hieronder bouw je hem in vier nodes, zonder een regel code.

## Wat je nodig hebt

Drie dingen: een WhatsApp Business-account met toegang tot Meta's Cloud API, een n8n-installatie (zelf-gehost of via n8n Cloud), en een API-sleutel voor je AI-model naar keuze. De koppeling met WhatsApp regel je eenmalig in Meta's developer-portal — dat is het meeste werk. Daarna is de rest slepen en klikken in de n8n-editor.

> **💡 Beginner-tip:** Een "node" in n8n is één blokje in je workflow dat één taak doet. Je verbindt ze met lijntjes van links naar rechts; een bericht loopt dat pad af. Je hoeft niets te programmeren, alleen de blokjes instellen.

## De vier nodes, stap voor stap

1. **Zet de WhatsApp-trigger neer.** Start een nieuwe workflow, klik op het plus-icoon en zoek op "WhatsApp". Kies de node **WhatsApp Business Cloud** en daarbinnen de trigger **On message**. Deze node luistert vanaf nu naar elk bericht op je zakelijke nummer. Je herkent dat hij werkt aan een groen vinkje na een testbericht.

2. **Koppel de AI Agent-node.** Trek een lijn vanuit de trigger naar een nieuwe node en zoek op "AI Agent". Hang daar een chatmodel onder (GPT-5 mini of een Claude Haiku-model volstaan voor klantenservice-chat) en schrijf in het systeem-veld kort wie de bot is: "Je bent de klantenservice van [bedrijf]. Antwoord kort, vriendelijk en in het Nederlands." Dit systeemprompt bepaalt de toon.

3. **Voeg een Memory-node toe.** Zonder geheugen behandelt de bot elk bericht los en vergeet hij wat de klant net zei. Hang een Memory-node onder de AI Agent en zet de limiet op ongeveer 10 berichten. Genoeg om een boeking of vraag af te ronden, zonder de bot te overladen met oude context.

4. **Stuur het antwoord terug.** Klik op het plus-icoon na de AI Agent, zoek opnieuw **WhatsApp Business Cloud** en kies deze keer de actie **Send Message**. Verwijs bij het bericht-veld naar de output van de AI Agent. Sla op, zet de workflow op **Active** en stuur jezelf een testbericht — het antwoord hoort binnen enkele seconden terug te komen.

> **⚡ Gevorderden:** De echte kracht zit in Tools. Hang onder de AI Agent een Google Sheets-, database- of Google Calendar-tool, en de bot kan voorraad checken of zélf een afspraak inplannen in plaats van alleen praten. Begin zonder tools, voeg ze pas toe als de basis staat.

## De ontsnappingsroute die je niet moet vergeten

Een bot die vastloopt op een boze klant is erger dan geen bot. Bouw daarom een doorschakeling in: voeg een node toe die jou pingt — via Telegram of e-mail — zodra de bot het antwoord niet weet of de klant om een mens vraagt. Je bepaalt de drempel zelf. Een klacht, een concrete offerte of simpelweg "buiten kantooruren" zijn goede momenten om over te dragen. Zo houdt de automatisering de druk van de ketel zonder dat klanten het gevoel krijgen tegen een muur te praten.

## Wat het kost

De zelf-gehoste n8n is gratis; je betaalt alleen je eigen hosting. n8n Cloud rekent per uitvoering, en je AI-model reken je apart af per token. Voor een kleine klantenservice-stroom blijven die kosten bescheiden. Groeit het aantal gesprekken, kies dan bewust een goedkoop chatmodel en houd je tokenverbruik in de gaten — daar loopt de rekening het snelst op.

Wil je begrijpen waarom dit soort AI-agents nu overal opduiken en wat dat breder betekent? Lees de duiding op [hetlaatsteainieuws.nl](https://hetlaatsteainieuws.nl/).

## Checklist: staat je bot?

- [ ] WhatsApp Business-account gekoppeld aan Meta's Cloud API
- [ ] WhatsApp Business Cloud-trigger op "On message" en getest
- [ ] AI Agent-node met een chatmodel en een duidelijk systeemprompt
- [ ] Memory-node op ongeveer 10 berichten
- [ ] Send Message-node verwijst naar de AI-output
- [ ] Doorschakeling (Telegram/e-mail) actief voor twijfelgevallen
- [ ] Workflow op "Active" gezet en met een echt testbericht gecontroleerd

## Bronnen

- [n8n — Building your first WhatsApp chatbot (workflow-template)](https://n8n.io/workflows/2465-building-your-first-whatsapp-chatbot/) — officiële n8n-template met de trigger- en send-nodes
- [n8n — Complete business WhatsApp AI-powered RAG chatbot](https://n8n.io/workflows/2845-complete-business-whatsapp-ai-powered-rag-chatbot-using-openai/) — voorbeeld met AI Agent, memory en tools
- [The Practical Developer — Build an AI WhatsApp Customer Service Bot with n8n](https://dev.to/agoraintelligence/build-an-ai-whatsapp-customer-service-bot-with-n8n-no-code-30-minutes-404d) — de tutorial die dit onderwerp aandroeg
