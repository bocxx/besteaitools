---
title: "Ollama in Claude Desktop: zo gebruik je open modellen in Claude"
description: "Sinds 25 augustus draait Claude Desktop op Ollama. Zo zet je de koppeling aan — en zo zie je of je prompts je computer echt niet verlaten."
publishedAt: 2026-08-26
updatedAt: 2026-08-26
author: "Redactie"
category: "gids"
tags:
  - "ollama"
  - "claude-desktop"
  - "lokale-llm"
  - "open-modellen"
  - "privacy"
  - "third-party-gateway"
toolSlug: "ollama"
featured: false
draft: false
readingTime: 4
heroImage: "/images/articles/diorama-ollama-claude-desktop-open-modellen.webp"
heroImageAlt: "Miniatuur diorama-illustratie bij artikel 'Ollama in Claude Desktop: zo gebruik je open modellen in Claude'"
heroScene: "A miniature desk with two small toggle switches side by side, one wired to a tiny computer tower on the desk and one to a distant paper cloud on a stick, a figurine deciding between them"
keyTakeaways:
  - "Ollama v0.33 zet Claude Desktop met één schakelaar om naar open modellen, via de third-party gateway die Anthropic zelf in de app heeft gebouwd."
  - "Je kiest per modelrol of Claude een model van je eigen machine gebruikt of een cloudmodel van Ollama. Dat onderscheid bepaalt alles."
  - "Ollama's FAQ zegt dat je data niet wordt verstuurd. Bij een cloudmodel klopt dat niet: die draaien op servers die Ollama primair in de VS host."
  - "Lokaal draaien is onbeperkt en gratis. Cloudgebruik zit op Free ($0), Pro ($20/mnd) of Max ($100/mnd, aanmeldingen tijdelijk gepauzeerd)."
  - "Uitschakelen gaat net zo simpel: zet Claude in Ollama uit en je oude instellingen komen terug."
faq:
  - q: "Wat is een third-party gateway in Claude Desktop?"
    a: "Het is een route die Anthropic zelf in Claude Desktop heeft ingebouwd om modellen van andere aanbieders te accepteren. Claude blijft dus de app die je gewend bent — dezelfde interface, dezelfde tools — maar het model dat je antwoord bedenkt komt ergens anders vandaan. Ollama v0.33 configureert die route voor je zodra je de Claude-schakelaar aanzet, zodat je zelf geen instellingen hoeft aan te passen."
  - q: "Blijven mijn prompts echt op mijn eigen computer?"
    a: "Alleen als je een lokaal model kiest. Ollama's FAQ bij de aankondiging antwoordt kortweg nee op de vraag of je data naar Anthropic of Ollama gaat, maar dat dekt niet het hele verhaal. Kies je een cloudmodel van Ollama, dan gaan je prompts naar hun servers — anders kan dat model niet draaien. Ollama hanteert daarbij zero data retention en zegt niets te loggen of te trainen op je invoer, en host primair in de Verenigde Staten met uitwijk naar Europa en Singapore. Bewaren en versturen zijn dus twee verschillende dingen."
  - q: "Wat kost het gebruik van cloudmodellen?"
    a: "Op je eigen hardware draaien is altijd onbeperkt en kost niets. Voor de cloud zijn er drie plannen: Free ($0, één cloudmodel tegelijk, lichte belasting), Pro ($20 per maand of $200 per jaar, drie modellen tegelijk en vijftig keer zoveel gebruik) en Max ($100 per maand, tien modellen tegelijk). Nieuwe Max-abonnementen zijn tijdelijk gepauzeerd omdat Ollama capaciteit bijbouwt. Sessielimieten resetten elke vijf uur, weeklimieten elke zeven dagen."
  - q: "Kan ik terug naar de modellen van Anthropic?"
    a: "Ja, en dat is een van de aantrekkelijkste kanten van deze opzet. Je zet de Claude-schakelaar in Ollama uit en je vorige instellingen komen terug. Je hoeft niets opnieuw te installeren of te configureren. Dat maakt het ook een prima manier om een week uit te proberen of een open model volstaat voor jouw werk, zonder dat je iets onomkeerbaars doet."
  - q: "Welk open model kan ik het beste kiezen?"
    a: "Dat hangt af van waar je het draait. Op je eigen machine wordt je keuze begrensd door je geheugen: een model van rond de 20 miljard parameters is voor de meeste laptops de bovengrens waarbij het nog prettig werkt. In de cloud kun je zwaarder gaan, maar daar telt het gebruiksniveau: Ollama deelt modellen in van niveau 1 (licht, zoals gpt-oss:20b) tot niveau 4 (extra zwaar). Op het gratis plan blijf je met niveau 1 en 2 het langst binnen je quotum."
---

# Ollama in Claude Desktop: zo gebruik je open modellen in Claude

Sinds 25 augustus kun je Claude Desktop laten draaien op modellen die niet van Anthropic zijn. Eén schakelaar in Ollama en de app praat met een open model — lokaal op je eigen machine of in Ollama's cloud. De interface blijft precies hetzelfde.

## Wat er onder de motorkap gebeurt

Anthropic heeft een route in Claude Desktop gebouwd die modellen van andere aanbieders accepteert: de third-party gateway. Die bestond al; Ollama klikt er nu met versie 0.33 op in en regelt de configuratie voor je ([Bron: Ollama](https://ollama.com/blog/claude-desktop)).

Je krijgt dus niet een andere app, maar dezelfde app met een andere motor. Alles wat Claude Desktop kan blijft werken; alleen het model dat je antwoorden bedenkt komt ergens anders vandaan.

## In drie stappen aan

**1. Installeer of update Ollama.** Je hebt versie 0.33 of nieuwer nodig. Draai je al een oudere versie, werk die dan eerst bij.

**2. Open Ollama en kies Claude.** In de instellingen staat een schakelaar voor de Claude-app.

**3. Zet hem aan.** Ollama configureert de gateway zelf. Daarna kies je in Ollama welk model Claude gebruikt.

Uitzetten werkt hetzelfde: schakelaar om, en je oude instellingen zijn terug. Er is niets onomkeerbaars aan, en dat maakt dit een goedkope manier om een week te proberen of een open model jouw werk aankan.

Draait Ollama nog niet op je machine, begin dan bij onze gids over [Ollama installeren](/nieuws/ollama-lokale-ai-modellen-draaien). En nog geen Claude-account? Dat regel je met [een Claude-account aanmaken](/nieuws/claude-account-aanmaken).

## De keuze die er echt toe doet

Hier moet je even opletten, want de aankondiging maakt het simpeler dan het is.

In Ollama kies je per modelrol of Claude een model van je eigen computer pakt of een cloudmodel. Dat lijkt een detail. Het is het hele verhaal.

De FAQ bij de aankondiging stelt de vraag "worden mijn prompts of data naar Anthropic of Ollama gestuurd?" en antwoordt: nee. Twee alinea's eerder staat dat je kunt kiezen uit modellen "zowel lokaal als in Ollama's cloud". Die twee gaan niet samen. Een cloudmodel draait per definitie op de server van de aanbieder, dus je invoer gaat daarheen — anders valt er niets te berekenen.

Wat Ollama bedoelt, staat in de zin erna: ze hánteren zero data retention, loggen niets en trainen niet op je invoer. Dat is een serieuze belofte en het is iets anders dan "wordt niet verstuurd". Op hun prijzenpagina staat er nog een detail bij dat voor Nederlandse gebruikers uitmaakt: Ollama host modellen primair in de Verenigde Staten, met uitwijk naar Europa en Singapore bij drukte ([Bron: Ollama](https://ollama.com/pricing)).

Verwerk je klantgegevens of andere persoonsgegevens, dan is dat het verschil tussen een verwerking binnen je eigen muren en een doorgifte naar een Amerikaanse dienstverlener. Kies in dat geval expliciet een lokaal model — dat kan, en dan klopt "er verlaat niets je computer" wél letterlijk.

## Wat het kost

Op je eigen hardware draaien is onbeperkt en gratis. Je betaalt in stroom en wachttijd, niet per token.

Voor de cloud zijn er drie plannen. Free kost niets, draait één cloudmodel tegelijk en is bedoeld voor licht gebruik. Pro kost 20 dollar per maand (of 200 per jaar), draait er drie tegelijk en geeft vijftig keer zoveel gebruik. Max kost 100 dollar per maand met tien tegelijk, maar nieuwe aanmeldingen zijn tijdelijk gepauzeerd omdat Ollama capaciteit bijbouwt.

Let op hoe het gebruik geteld wordt: niet in een vast aantal tokens, maar naar zwaarte van het model. Ollama deelt ze in van niveau 1 tot 4. Op het gratis plan kom je met lichte modellen een stuk verder dan met zware.

## Wanneer dit iets voor je is

Zinnig als je gevoelige documenten verwerkt en ze je machine niet uit wilt hebben, als je tegen de limieten van je Claude-abonnement aanloopt, of als je gewoon wilt weten hoe ver een open model tegenwoordig komt.

Minder zinnig als je het van Claude's sterkste modellen moet hebben voor lastig redeneerwerk. Een open model van 20 miljard parameters op je laptop is een ander gereedschap dan wat Anthropic in zijn eigen datacentra draait, en dat merk je bij complexe taken.

Wil je eerst begrijpen wat Ollama precies is en wat lokaal draaien inhoudt, dan legt onze zustersite dat uit in [wat is Ollama](https://hetlaatsteainieuws.nl/achtergrond/wat-is-ollama-lokale-llm-uitleg-2026).
