---
title: "Prompt caching bij Claude: zo betaal je tot 90% minder voor herhaalde context"
heroImageAlt: "Miniatuur diorama-illustratie bij artikel 'Prompt caching bij Claude: zo betaal je tot 90% minder voor herhaalde context'"
description: "Stuur je bij elke vraag dezelfde lange instructies mee, dan betaal je die telkens opnieuw. Met prompt caching lees je ze uit cache. Zo stel je het in."
publishedAt: 2026-07-28
updatedAt: 2026-07-28
author: "Redactie"
category: "gids"
tags:
  - "claude"
  - "prompt-caching"
  - "api"
  - "kosten"
  - "anthropic"
  - "developer"
toolSlug: "claude"
featured: false
draft: false
readingTime: 5
heroImage: "/images/articles/diorama-claude-prompt-caching-kosten-besparen.webp"
keyTakeaways:
  - "Prompt caching bewaart vaste, herhaalde context — je systeemprompt, documenten of tool-definities — zodat Claude die niet bij elke aanvraag opnieuw hoeft in te lezen."
  - "Een cache-hit kost ongeveer 10% van de normale input-prijs; het wegschrijven van de cache kost eenmalig ongeveer 1,25x de input-prijs bij de standaard cache van vijf minuten."
  - "Je markeert wat gecached moet worden met cache_control type ephemeral op een content-blok; je mag tot vier van die breekpunten zetten per aanvraag."
  - "De standaard levensduur is vijf minuten; er is een optionele cache van één uur voor context die je minder vaak, maar wel herhaald, gebruikt."
faq:
  - q: "Wat is prompt caching bij Claude?"
    a: "Prompt caching laat je vaste stukken van je aanvraag opslaan zodat Claude ze niet elke keer opnieuw verwerkt. Denk aan een lang systeemprompt, een handleiding of een set voorbeelden die bij elk gesprek meegaat. De eerste keer schrijft Claude die inhoud naar een cache; daarna leest hij eruit tegen een fractie van de prijs. Vooral bij chatbots en agents die telkens dezelfde instructies meesturen, scheelt dat flink in tokens en in snelheid."
  - q: "Hoeveel goedkoper is een cache-hit precies?"
    a: "Een cache-lees (een hit) kost ongeveer 10% van de normale input-tokenprijs — dus zo'n 90% korting op dat deel van je invoer. Het wegschrijven naar de standaardcache van vijf minuten kost eenmalig ongeveer 1,25x de input-prijs. De winst zit dus in herhaling: hoe vaker je dezelfde context binnen het cache-venster hergebruikt, hoe sneller die schrijf-opslag zich terugverdient."
  - q: "Hoe zet ik prompt caching aan?"
    a: "Je voegt in je API-aanvraag een markering cache_control met type ephemeral toe aan het content-blok dat je wilt cachen — bijvoorbeeld je systeemprompt of een document. Alles vóór dat breekpunt wordt gecached. Je mag tot vier breekpunten zetten. Er is geen aparte knop of instelling in de interface; het is een veld in de API-call, dus dit is werk voor wie via code of een tool als n8n met de Claude-API praat."
  - q: "Hoe lang blijft de cache geldig?"
    a: "De standaard levensduur is vijf minuten, en die timer schuift op bij elk gebruik. Blijf je binnen vijf minuten dezelfde context hergebruiken, dan blijft de cache warm. Voor context die je met langere tussenpozen herhaalt is er een optionele cache van één uur, tegen een hogere schrijfprijs. Kies vijf minuten voor actieve gesprekken en het uur alleen als je gebruikspatroon daar echt om vraagt."
---

Bouw je een chatbot of agent op de Claude-API, dan stuur je bij elke vraag vaak hetzelfde mee: een lang systeemprompt, een handleiding, een set voorbeelden. Claude leest die context telkens opnieuw in — en je betaalt er telkens opnieuw voor. Prompt caching lost dat op: je bewaart de vaste stukken en leest ze uit cache tegen een fractie van de prijs. Hieronder zie je wat het is, wat het kost en hoe je het aanzet.

## Waarvoor is dit bedoeld?

Prompt caching is nuttig zodra je bij meerdere aanvragen dezelfde grote, ongewijzigde context meestuurt. Een klantenservicebot met een uitgebreid bedrijfsdraaiboek, een agent met veel tool-definities, of een assistent die steeds hetzelfde document raadpleegt. De variabele kant — de eigenlijke vraag van de gebruiker — blijft normaal geprijsd. Het is dus geen trucje voor losse, unieke vragen, maar voor herhaling.

> **💡 Beginner-tip:** Dit werkt op API-niveau, niet in de gewone Claude-chatvenster. Praat je met Claude via code, via de API of via een automatiseringstool, dan is dit voor jou. Gebruik je alleen de website, dan hoef je hier niets in te stellen.

## Wat het kost

De rekensom is eenvoudig. Een cache-lees kost ongeveer 10% van de normale input-prijs — een korting van zo'n 90% op dat deel. Het wegschrijven naar de cache kost eenmalig ongeveer 1,25x de input-prijs bij de standaardcache van vijf minuten. Je betaalt dus iets extra om iets te bewaren, en verdient dat terug zodra je het een paar keer hergebruikt. Bij een druk gesprek is dat na twee of drie beurten al het geval.

## Zo zet je het aan

1. **Kies wat vast is.** Bepaal welk deel van je aanvraag bij elke call identiek blijft: het systeemprompt, een lange handleiding, je tool-definities. Dat is je cache-materiaal.

2. **Zet de vaste inhoud vooraan.** De cache werkt van het begin van je aanvraag tot aan het breekpunt. Plaats daarom alle statische context bovenaan en de wisselende gebruikersvraag onderaan. Staat de vaste inhoud verspreid, dan mist de cache doel.

3. **Plaats het breekpunt.** Voeg aan het laatste vaste content-blok een markering `cache_control` toe met `type: ephemeral`. Alles ervóór wordt gecached. Je mag tot vier van die breekpunten zetten, bijvoorbeeld één na je tool-definities en één na een groot document.

4. **Controleer de cache-tokens in de respons.** Claude geeft in het antwoord terug hoeveel tokens werden weggeschreven en hoeveel uit cache gelezen. Zie je bij de tweede call cache-lezingen verschijnen, dan werkt het. Blijft het bij schrijven, dan zit er iets tussen je vaste inhoud en het breekpunt dat per call verandert.

> **⚡ Gevorderden:** Er geldt een minimum aantal tokens voordat een blok cachebaar is, en de standaardcache van vijf minuten verlengt zichzelf bij elk gebruik. Voor context die je met langere pauzes herhaalt kun je de cache van één uur kiezen, maar reken eerst na of het hogere schrijftarief opweegt tegen je gebruikspatroon.

## De veelgemaakte fout

De cache mist doel zodra er iets wisselends vóór je breekpunt staat — een tijdstempel, een sessie-ID, de naam van de gebruiker. Één veranderend teken bovenin je vaste blok en Claude behandelt het als nieuwe inhoud, schrijft opnieuw naar cache en je bespaart niets. Houd alles boven het breekpunt letterlijk identiek tussen calls, en verplaats al het variabele naar onderen.

Waarom dit soort kostenoptimalisatie er nu toe doet, met AI-rekeningen die bij bedrijven snel oplopen, lees je in de duiding op [hetlaatsteainieuws.nl](https://hetlaatsteainieuws.nl/).

## Checklist: benut je de cache?

- [ ] Je stuurt bij meerdere calls dezelfde grote context mee
- [ ] Alle vaste inhoud staat bovenaan, de variabele vraag onderaan
- [ ] `cache_control` met `type: ephemeral` staat op het laatste vaste blok
- [ ] Niets wisselends (tijd, ID, naam) staat vóór het breekpunt
- [ ] De respons toont cache-lezingen bij de tweede call
- [ ] Je hebt bewust gekozen tussen de cache van vijf minuten en die van één uur

## Bronnen

- [Claude Platform Docs — Pricing](https://platform.claude.com/docs/en/about-claude/pricing) — officiële tarieven voor cache-schrijven en -lezen
- [Anthropic — Prompt caching (API-documentatie)](https://docs.anthropic.com/en/docs/build-with-claude/prompt-caching) — cache_control, breekpunten en TTL-opties
- [The Practical Developer — Deep Dive into Prompt Caching for Claude](https://dev.to/nitheesh_gaddam_e36ec4aa4/a-deep-dive-into-amazon-bedrock-prompt-caching-for-claude-46-28ob) — het artikel dat dit onderwerp aandroeg
