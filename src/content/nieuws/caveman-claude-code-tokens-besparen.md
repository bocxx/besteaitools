---
title: "Caveman: de gratis Claude Code-skill die tot 65% tokens bespaart"
description: "De Caveman-skill snoeit tot 65% in de output van Claude Code door filler te schrappen. Wat het doet, wat het bespaart, en wanneer je het beter uitzet."
publishedAt: 2026-07-04
updatedAt: 2026-07-04
author: "Redactie"
category: "gids"
toolSlug: "claude-code"
tags:
  - "claude-code"
  - "caveman"
  - "tokens-besparen"
  - "prompt-engineering"
  - "ai-skills"
  - "developer-tools"
featured: false
draft: false
readingTime: 5
heroImage: "/images/articles/diorama-caveman-claude-code-tokens-besparen.webp"
heroImageAlt: "Miniatuur diorama-illustratie bij artikel 'Caveman: de gratis Claude Code-skill die tot 65% tokens bespaart'"
heroScene: "A tiny stone tablet with a chisel next to a fat paper scroll being trimmed short by miniature scissors on a workbench"
keyTakeaways:
  - "Caveman is een gratis, open-source skill die Claude Code (en 30+ andere agents) korter laat antwoorden door filler, beleefdheden en omhaal te schrappen."
  - "De maker meet gemiddeld 65% minder output-tokens over tien prompts (spreiding 22–87%) — code, commando's en foutmeldingen blijven byte-voor-byte intact."
  - "Er is geen telemetrie, geen account en geen backend: de skill is puur een prompt met lokale scripts, dus na installatie geen netwerkcalls."
  - "Handig bij lange sessies waarin je tokens wilt sparen; minder geschikt als je juist uitleg en context wilt, want de 'oertaal' leest karig."
faq:
  - q: "Wat doet de Caveman-skill precies?"
    a: "Caveman is een instructie-laag voor je AI-coding-agent. Hij vertelt het model om lidwoorden, opvulzinnen, beleefdheden en hedging weg te laten en in korte fragmenten te antwoorden — 'caveman-speak'. Wat het uitdrukkelijk níet aanraakt: code, commando's, foutmeldingen en symbolen blijven exact behouden. Het idee is dat je in een codeersessie zelden de omhaal nodig hebt, maar wél de technische inhoud. Minder woorden betekent minder output-tokens, en dus lagere kosten en snellere antwoorden."
  - q: "Hoeveel tokens bespaar ik echt?"
    a: "De maker rapporteert een gemiddelde outputreductie van 65% over tien testprompts, met een spreiding van 22% tot 87%, gemeten tegen de standaard uitgebreide antwoorden. Hoeveel jij bespaart hangt af van je gebruik: bij taken waar het model normaal veel uitlegt, valt de meeste winst te halen. Bij korte, technische antwoorden die toch al beknopt waren, is het verschil kleiner. Reken dus niet blind op 65% — zie het als een bovengrens die je bij verbose taken benadert."
  - q: "Is Caveman veilig om te installeren?"
    a: "De skill heeft naar eigen zeggen geen telemetrie, geen analytics, geen accounts en geen backend. Na installatie zijn er geen netwerkcalls: de skill is een prompt en de hooks zijn lokale scripts. Zoals altijd bij open-source tooling geldt: bekijk de repository voordat je iets installeert, en let op dat je de officiële repo van JuliusBrussee gebruikt en niet een naamgelijke kopie. Met ruim 80.000 sterren op GitHub is het een van de populairste agent-skills, maar populariteit vervangt je eigen check niet."
  - q: "Wanneer kun je Caveman beter uitzetten?"
    a: "Precies wanneer je de uitleg wél wilt. Leer je een nieuwe library, debug je iets waar je de redenering van het model bij nodig hebt, of schrijf je documentatie? Dan werkt de karige oertaal tegen je. Caveman schittert in productieve sessies waarin je weet wat je doet en vooral snel en goedkoop resultaat wilt. Het mooie is dat je het per sessie aan- en uitzet, dus je kunt het gericht inzetten voor de repetitieve klussen."
---

Er gaat een simpele grap rond in de wereld van AI-coding: *"why use many token when few token do trick"*. Dat is niet zomaar een meme — het is de kernregel van **Caveman**, een gratis skill voor Claude Code die jouw AI-assistent laat praten als een holbewoner. En dat blijkt verrassend nuttig voor je tokenrekening.

## Wat Caveman doet

Caveman is een instructie-laag die je aan Claude Code (en volgens de maker 30+ andere agents zoals Cursor, Cline en Copilot) toevoegt. De boodschap aan het model: schrap lidwoorden, opvulzinnen, beleefdheden en hedging, en antwoord in korte fragmenten. Wat onaangeroerd blijft: code, commando's, foutmeldingen en symbolen blijven byte-voor-byte exact ([Bron: GitHub — JuliusBrussee/caveman](https://github.com/JuliusBrussee/caveman)).

Het idee erachter is scherp. In een codeersessie heb je zelden de omhaal nodig — "Great question! Let me help you with that. Here's a clear explanation..." — maar wél de technische substantie. Caveman gooit het eerste weg en houdt het tweede. Wil je een agent juist scherper aansturen in plaats van korter laten antwoorden? Zie [betere prompts voor AI-agents schrijven](/nieuws/betere-prompts-ai-agents-make).

> **De meetlat:** de maker rapporteert een gemiddelde outputreductie van 65% over tien prompts, met een spreiding van 22% tot 87%, gemeten tegen de standaard uitgebreide antwoorden.

## Wat het je oplevert

Minder output-tokens betekent twee dingen: lagere kosten (je betaalt per token) en snellere antwoorden (minder tekst om te genereren). Bij lange sessies of repetitieve klussen tikt dat aan. Reken alleen niet blind op die 65% — dat is de winst bij verbose taken. Bij antwoorden die toch al kort waren, is het verschil klein.

Een prettige eigenschap voor wie op privacy let: Caveman heeft naar eigen zeggen geen telemetrie, geen account en geen backend. Na installatie zijn er geen netwerkcalls; de skill is een prompt met lokale scripts. Met ruim 80.000 sterren op GitHub is het een van de populairste agent-skills van dit moment — gebouwd door een Nederlandse ontwikkelaar bovendien, zoals we laten zien in ons portret van [de Nederlandse en Belgische bouwers achter trending AI](/nieuws/nederlandse-belgische-bouwers-trending-ai).

Installeren gaat zoals bij elke andere skill; werk je nog niet met skills, lees dan eerst onze uitleg over [Claude Code-skills instellen](/nieuws/claude-code-skills-instellen). Wie z'n Claude-sessies verder wil opschalen, vindt in [meerdere parallelle agents in Claude Code desktop](/nieuws/claude-code-desktop-parallelle-sessies) een logische volgende stap.

## Wanneer je het beter uitzet

De keerzijde van beknoptheid is dat uitleg verdwijnt. Leer je een nieuwe library, debug je iets waar je de redenering van het model bij wilt zien, of schrijf je documentatie? Dan werkt de oertaal tegen je. Zet Caveman gericht in voor de productieve klussen waarin je weet wat je doet, en schakel het uit zodra je de context nodig hebt. Je kunt het per sessie aan- en uitzetten. Juist bij [een agent-loop die zichzelf herhaalt](/nieuws/je-eerste-agent-loop-claude-code) tikt dat verbruik snel aan, dus daar loont beknoptheid het meest.

Wil je breder begrijpen waarom die tokens zoveel geld kosten — en hoe aanbieders daar stilletjes aan draaien? Lees dan onze duiding over [de AI-prijzenoorlog en wat het voor jou betekent](https://hetlaatsteainieuws.nl/nieuws/deepseek-v4-pro-prijsverlaging-75-procent) op hetlaatsteainieuws.nl.

Caveman is geen serieus product met een roadmap — het is een grap die per ongeluk werkt. In dezelfde categorie nuttige gekkigheid: [met een MessageDisplay-hook vervang je Claude's stopwoordjes](/nieuws/claude-code-hooks-woordkeuze-aanpassen) als "load-bearing" je te veel wordt. En juist daarom is het het proberen waard: gratis, lokaal, en zo weer weg als het niet bevalt. En die bespaarde tokens kun je meteen nuttig verstoken: in [deze workflow bouwt Claude Code samen met Higgsfield een geanimeerde website](/nieuws/claude-code-higgsfield-geanimeerde-website).
