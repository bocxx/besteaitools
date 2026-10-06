---
title: "Gemini 3.8 Flash in de API: overstappen van 3.7 in vier stappen"
description: "Gemini 3.8 Flash vraagt andere instellingen dan 3.7 Flash. Zo wissel je de modelnaam, kies je een thinking level en reken je alvast met de prijs van 2027."
publishedAt: 2026-10-03
updatedAt: 2026-10-03
author: "Redactie"
category: "gids"
tags:
  - "gemini"
  - "gemini-api"
  - "gemini-3-8-flash"
  - "google-ai-studio"
  - "ai-modellen"
toolSlug: "gemini"
featured: false
draft: false
readingTime: 4
heroImage: "/images/articles/diorama-gemini-3-8-flash-overstappen-api.webp"
heroImageAlt: "Miniatuur diorama-illustratie bij artikel 'Gemini 3.8 Flash in de API: overstappen van 3.7 in vier stappen'"
heroScene: "A tiny railway switch on a workbench diverting a small toy train from an old track onto a freshly laid one"
keyTakeaways:
  - "Gemini 3.8 Flash heet in de API gemini-3.8-flash, heeft een contextvenster van 1 miljoen tokens en maximaal 64.000 uitvoertokens."
  - "In plaats van thinking_budget gebruik je thinking_level met low, medium (standaard) of high; het niveau minimal werkt bij 3.8 Flash niet."
  - "Google raadt aan temperature, top_p, top_k en candidate_count uit je aanroepen te halen bij de overstap."
  - "De introductieprijs is 0,75 dollar per miljoen invoertokens en 3,75 dollar per miljoen uitvoertokens, tot en met 31 december 2026; daarna het dubbele."
  - "Voor simpele taken op groot volume kan 3.7 Flash goedkoper blijven, omdat 3.8 op zware taken meer redeneerstappen zet."
faq:
  - q: "Wat is de modelnaam van Gemini 3.8 Flash in de API?"
    a: "De model-ID is gemini-3.8-flash. Je gebruikt die in de Gemini API en in Google AI Studio. Het model heeft een contextvenster van 1 miljoen tokens en kan maximaal 64.000 tokens per antwoord teruggeven. Werkt je code nu met de naam van 3.7 Flash, dan is het vervangen van die string de eerste stap, maar niet de enige: ook de thinking-instelling en een paar parameters veranderen."
  - q: "Welk thinking level moet ik kiezen bij Gemini 3.8 Flash?"
    a: "Begin met medium, dat is de standaard. Kies low voor korte, eenvoudige taken op groot volume, zoals classificeren of samenvatten, en high voor meerstapstaken en code. Het niveau minimal, dat je misschien van eerdere Flash-modellen kent, wordt door 3.8 Flash niet ondersteund. Een hoger niveau betekent meer redeneertokens en dus een hogere rekening."
  - q: "Wat kost Gemini 3.8 Flash na 2026?"
    a: "Tot en met 31 december 2026 betaal je 0,75 dollar per miljoen invoertokens en 3,75 dollar per miljoen uitvoertokens. Vanaf 1 januari 2027 wordt dat 1,50 en 7,50 dollar. Via de Batch API krijg je 50 procent korting. Bouw je iets dat volgend jaar nog draait, reken dan nu al met de hogere tarieven."
  - q: "Kan ik Gemini 3.8 Flash gratis proberen?"
    a: "Ja. Op de gratis tier van de Gemini API en in Google AI Studio kun je 3.8 Flash zonder kosten gebruiken, binnen de limieten van die tier. Let op: wat je op de gratis tier invoert, mag Google gebruiken om zijn producten te verbeteren. Op de betaalde tier gebeurt dat niet. Voor klantdata of vertrouwelijke stukken is de betaalde tier dus de veilige keuze."
sources:
  - label: "Google — Introducing Gemini 3.8 Flash and 3.8 Flash Cyber (2 sep. 2026)"
    url: "https://blog.google/innovation-and-ai/models-and-research/gemini-models/3-8-flash-and-3-8-flash-cyber/"
  - label: "Gemini API-docs — What's new in Gemini 3.8 Flash"
    url: "https://ai.google.dev/gemini-api/docs/generate-content/latest-model"
  - label: "Gemini API — Prijzen"
    url: "https://ai.google.dev/gemini-api/docs/pricing"
---

Google zette Gemini 3.8 Flash op 2 september live, en wie de API gebruikt, merkt dat het niet bij een nieuwe modelnaam blijft. De thinking-instelling werkt anders, een paar vertrouwde parameters moeten eruit, en de lage prijs heeft een einddatum. Hieronder zet je je bestaande 3.7 Flash-aanroep in vier stappen om, en weet je daarna of overstappen voor jouw toepassing wel loont.

## Wat er verandert met 3.8 Flash

Gemini 3.8 Flash is het snelle werkpaardmodel van Google, beter dan 3.7 Flash in programmeren, agent-taken en redeneren over meerdere stappen ([Bron: Google](https://blog.google/innovation-and-ai/models-and-research/gemini-models/3-8-flash-and-3-8-flash-cyber/)). In de API heet het `gemini-3.8-flash`, met een contextvenster van 1 miljoen tokens en maximaal 64.000 uitvoertokens ([Bron: Gemini API-docs](https://ai.google.dev/gemini-api/docs/generate-content/latest-model)).

Die winst heeft een prijs in tokens. Op lastige taken zet het model extra redeneerstappen en roept het vaker tools aan. Voor zware klussen is dat precies wat je wilt, voor duizend korte classificaties per uur misschien niet.

Gebruik je Gemini alleen in de app, dan hoef je niets te doen: met Google AI Pro of Ultra draai je al op 3.8 Flash. Deze gids is voor wie via de API of Google AI Studio bouwt.

## De overstap in vier stappen

1. **Vervang de modelnaam.** Zet in je code `model="gemini-3.8-flash"`. In Google AI Studio kies je het in de modelkeuze. Daarna geeft je aanroep gewoon antwoord, maar met de standaardinstellingen.
2. **Ruil `thinking_budget` in voor `thinking_level`.** 3.8 Flash werkt met een vast niveau in plaats van een tokenbudget: `low`, `medium` (standaard) of `high`. Het niveau `minimal` wordt niet ondersteund; staat dat in je code, dan moet het eruit ([Bron: Gemini API-docs](https://ai.google.dev/gemini-api/docs/generate-content/latest-model)).
3. **Haal de sampling-parameters weg.** Google adviseert in de migratie-instructies om `temperature`, `top_p`, `top_k` en `candidate_count` uit je configuratie te verwijderen. Gebruik je een vooraf ingevulde modelbeurt (prefill), haal die ook weg en zorg dat de laatste gebruikersbeurt echte tekst bevat.
4. **Controleer je function calling.** Werk je met tools, zorg dan dat elk `FunctionResponse`-object een `call_id` en een `name` meekrijgt. Ontbreekt er één, dan loop je bij agent-loops tegen fouten aan.

Zo ziet een minimale aanroep in Python eruit:

```python
from google import genai
from google.genai import types

client = genai.Client()

response = client.models.generate_content(
    model="gemini-3.8-flash",
    contents="Vat deze offerte samen in vijf punten.",
    config=types.GenerateContentConfig(
        thinking_config=types.ThinkingConfig(thinking_level="medium"),
    ),
)
print(response.text)
```

> **💡 Beginner-tip:** nog nooit met de Gemini API gewerkt? Begin met onze uitleg over [function calling in Gemini](/nieuws/gemini-function-calling-uitleg) of de basisgids [Gemini gebruiken in vijf stappen](/nieuws/gemini-gebruiken-5-stappen). Stap 4 hierboven valt dan vanzelf op zijn plek.

## Het juiste thinking level kiezen

Begin op `medium` en meet. Een praktische vuistregel: `low` voor classificeren, labels toekennen en korte samenvattingen, `medium` voor gewone vraag-en-antwoordtaken, `high` voor code, meerstaps-agents en documenten waarin het model zelf moet plannen.

Google zegt het zelf ook: voor eenvoudige taken op groot volume kan 3.8 Flash duurder uitvallen dan 3.7 Flash, omdat het meer redeneert. De oplossing is een lager niveau, of gewoon op 3.7 Flash blijven. Dat model blijft ondersteund, er is geen migratiedeadline aangekondigd.

## Reken alvast met de prijs van 2027

De tarieven zijn introductieprijzen. Tot en met 31 december 2026 betaal je 0,75 dollar per miljoen invoertokens en 3,75 dollar per miljoen uitvoertokens. Vanaf 1 januari 2027 is dat 1,50 en 7,50 dollar ([Bron: Gemini API-prijzen](https://ai.google.dev/gemini-api/docs/pricing)). Een verdubbeling met een datum erbij, dus wie nu begroot voor iets dat volgend jaar draait, rekent beter meteen met het hogere bedrag.

> **⚡ Gevorderden:** taken die niet direct antwoord hoeven, zoals nachtelijke verwerking van tickets of documenten, gaan via de Batch API voor de helft van de prijs. Lange vaste systeemprompts kun je cachen: gecachte invoer kost 0,075 dollar per miljoen tokens, een tiende van het gewone tarief, plus opslagkosten per uur.

Op de gratis tier probeer je 3.8 Flash zonder kosten, maar daar mag Google je invoer gebruiken om zijn producten te verbeteren. Voor klantgegevens hoort je toepassing op de betaalde tier.

De bredere achtergrond bij deze release, inclusief de cyberversie die alleen naar overheden gaat, lees je op [hetlaatsteainieuws.nl](https://www.hetlaatsteainieuws.nl/nieuws/gemini-3-8-flash-cyber-overheden). Wie zich afvraagt hoe snel Google nieuwe Flash-modellen uitbrengt: ons eerdere stuk over [Gemini 3.6 Flash](/nieuws/gemini-3-6-flash-nieuwe-flash-modellen) is pas tweeënhalve maand oud.

## Checklist: ben je klaar?

- [ ] Je code gebruikt `gemini-3.8-flash` als modelnaam
- [ ] `thinking_budget` is vervangen door `thinking_level`, en nergens staat nog `minimal`
- [ ] `temperature`, `top_p`, `top_k` en `candidate_count` zijn uit je configuratie gehaald
- [ ] Elke `FunctionResponse` heeft een `call_id` en een `name`
- [ ] Je hebt een testset gedraaid op `low` en `medium` en de tokenkosten vergeleken met 3.7 Flash
- [ ] Je begroting voor 2027 rekent met 1,50 en 7,50 dollar per miljoen tokens
- [ ] Vertrouwelijke data loopt via de betaalde tier

## Bronnen

- [Google: Introducing Gemini 3.8 Flash and 3.8 Flash Cyber](https://blog.google/innovation-and-ai/models-and-research/gemini-models/3-8-flash-and-3-8-flash-cyber/)
- [Gemini API-docs: What's new in Gemini 3.8 Flash](https://ai.google.dev/gemini-api/docs/generate-content/latest-model)
- [Gemini API: prijzen](https://ai.google.dev/gemini-api/docs/pricing)
