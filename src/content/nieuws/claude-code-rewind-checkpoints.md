---
title: "Claude Code /rewind: zo draai je een verkeerde sessie terug"
heroImageAlt: "Miniatuur diorama-illustratie bij artikel 'Claude Code /rewind: zo draai je een verkeerde sessie terug'"
description: "Twee keer Esc en je bent terug bij het punt waar het nog goed ging. Wat /rewind wel en niet terugdraait, en de vijf keuzes in het menu."
publishedAt: 2026-09-10
updatedAt: 2026-09-10
author: "Redactie"
category: "gids"
tags:
  - "claude-code"
  - "rewind"
  - "checkpoints"
  - "anthropic"
  - "terminal"
  - "context-window"
toolSlug: "claude-code"
featured: false
draft: false
readingTime: 4
heroImage: "/images/articles/diorama-claude-code-rewind-checkpoints.webp"
heroScene: "A tiny film editing bench with a strip of frames running backwards through a rewinding reel, one frame lifted out with tweezers"
keyTakeaways:
  - "Claude Code maakt automatisch een checkpoint bij elke prompt die je stuurt, en bewaart de laatste 100 daarvan per sessie."
  - "Je opent het menu met /rewind of met twee keer Esc, maar alleen als het invoerveld leeg is — anders wist Esc-Esc je tekst."
  - "Je kiest los of je de code terugdraait, het gesprek, of allebei. Dat onderscheid is het nut van de functie."
  - "Wat Claude via Bash deed, wordt niet teruggedraaid. Ook edits van subagents niet, op één uitzondering na. Git blijft je vangnet."
  - "De twee samenvat-opties comprimeren een deel van het gesprek en geven contextruimte terug zonder je bestanden aan te raken."
faq:
  - q: "Hoe open ik het rewind-menu in Claude Code?"
    a: "Typ /rewind, of druk twee keer op Esc terwijl het invoerveld leeg is. Staat er nog tekst in het veld, dan wist de dubbele Esc die tekst in plaats van het menu te openen. Die tekst is niet weg: hij komt in je invoergeschiedenis, dus met de pijl omhoog haal je hem terug nadat je klaar bent in het menu."
  - q: "Draait /rewind ook bestanden terug die via Bash zijn gewijzigd?"
    a: "Nee. Checkpointing volgt alleen wijzigingen die Claude via zijn eigen bewerkingsgereedschap maakt. Draait Claude een shell-commando zoals rm, mv of cp, of schrijft het met een sed-opdracht in een bestand, dan valt die wijziging buiten het checkpoint en kun je hem niet via rewind terugdraaien. Daarvoor gebruik je git."
  - q: "Hoe lang blijven checkpoints bewaard?"
    a: "Claude Code bewaart bestandsmomentopnames voor de honderd meest recente checkpoints binnen een sessie. Omdat checkpoints samen met het gesprek worden opgeslagen, werkt /rewind ook nog nadat je een sessie hervat hebt. Sessies en hun checkpoints worden na 30 dagen opgeruimd; die periode pas je aan met de instelling cleanupPeriodDays."
  - q: "Wat is het verschil tussen rewind en samenvatten?"
    a: "Rewind zet je terug in de tijd: code, gesprek of allebei gaan naar de gekozen staat. Samenvatten laat je waar je bent en comprimeert een deel van het gesprek tot een samenvatting, waardoor er ruimte vrijkomt in het contextvenster. Je bestanden blijven daarbij ongemoeid en de oorspronkelijke berichten blijven in het transcript staan, dus Claude kan de details nog opzoeken."
  - q: "Vervangt checkpointing git?"
    a: "Nee, en de documentatie zegt dat zelf. Checkpoints zijn bedoeld voor snel herstel binnen één sessie. Ze volgen geen wijzigingen via shell-commando's, herstellen normaal gesproken geen edits van subagents, slaan symlinks en hard links over, en verdwijnen na 30 dagen. Voor permanente historie, branches en samenwerking blijf je git gebruiken. In de praktijk werkt de combinatie het beste: commit voordat je een grote opdracht geeft, gebruik rewind voor de kleine misstappen daarbinnen."
---

# Claude Code /rewind: zo draai je een verkeerde sessie terug

Je geeft Claude een opdracht, het gaat vier bestanden langs, en pas bij de vijfde zie je dat de aanname in je eerste zin al fout was. Alles wat daarna gebeurde bouwt op die fout voort. Handmatig terugdraaien kost meer tijd dan de opdracht zelf.

Daar is `/rewind` voor. Claude Code houdt automatisch bij wat het aan je bestanden verandert en zet bij elke prompt die je stuurt een herstelpunt. Deze gids loopt de vier dingen langs die je moet weten.

## 1. Openen: /rewind of twee keer Esc

Twee manieren, één valkuil. Je typt `/rewind`, of je drukt twee keer op `Esc`. Dat tweede werkt alleen als het invoerveld **leeg** is. Staat er tekst in, dan wist de dubbele Esc die tekst en blijft het menu dicht.

Niet erg: die tekst gaat naar je invoergeschiedenis, dus met pijl-omhoog haal je hem terug ([Bron: Claude Code Docs](https://code.claude.com/docs/en/checkpointing)).

Krijg je "unknown command"? Dan draai je een oude versie. Bijwerken doe je met `npm install -g @anthropic-ai/claude-code@latest` of `brew upgrade claude-code`.

## 2. Het menu: vijf keuzes, niet één

Je krijgt een lijst met elke prompt die je deze sessie stuurde. Kies het punt waar het nog goed ging, en dan pas kies je wát er terug moet:

- **Restore code and conversation** — code én gesprek terug naar dat punt.
- **Restore conversation** — alleen het gesprek terug, je huidige bestanden blijven staan.
- **Restore code** — alleen de bestanden terug, het gesprek blijft compleet.
- **Summarize from here** — comprimeer het gesprek vanaf dit punt tot een samenvatting.
- **Summarize up to here** — comprimeer alles vóór dit punt, latere berichten blijven intact.

Die splitsing is het hele punt van de functie. Kwam de fout uit een verkeerde aanname een paar beurten terug, dan wil je het gesprek terug — anders werkt Claude gewoon door op dezelfde verkeerde premisse. Was de aanname goed maar de uitvoering slecht, dan is alleen de code terugdraaien genoeg.

De twee code-opties verschijnen alleen als er na dat punt daadwerkelijk bestandswijzigingen zijn vastgelegd. Zo niet, dan houd je het gespreksherstel, de samenvat-opties en **Never mind** over.

Kies je gespreksherstel of "Summarize from here", dan komt je oorspronkelijke prompt terug in het invoerveld. Handig: je herformuleert hem en stuurt hem opnieuw.

## 3. Samenvatten als contextredding

De twee samenvat-opties zijn geen terugdraai-functie maar een gerichte `/compact`. Een lange debugsessie vreet contextruimte; met "Summarize from here" comprimeer je dat deel en houd je je oorspronkelijke instructies bovenaan intact.

Je bestanden blijven ongemoeid, en de oorspronkelijke berichten blijven in het transcript staan, dus Claude kan de details nog opzoeken. Wil je sturen waar de samenvatting op let: markeer de optie met de pijltjes en typ instructies op de regel **add context (optional)** voordat je Enter drukt. Kies je hem met het cijfertoetsje, dan vat Claude direct samen zonder instructies.

## 4. Wat het níet terugdraait

Dit is het deel dat je moet onthouden voordat je erop gaat vertrouwen.

- **Bash-wijzigingen.** Draaide Claude `rm`, `mv` of `cp`, dan valt dat buiten het checkpoint. Alleen bewerkingen via Claude's eigen bestandsgereedschap worden gevolgd.
- **Edits van subagents.** Die worden normaal niet hersteld. Eén uitzondering: een skill met `context: fork` die op de voorgrond draait, bewerkt je werkmap tijdens je eigen beurt en gaat dus wel mee. Werk je met [dynamic workflows en honderden subagents](/nieuws/claude-code-dynamic-workflows-gebruiken), reken dan dus niet op rewind.
- **Symlinks en hard links.** Die slaat Claude Code over, met de melding `Restored the code, but skipped N files`. Dotfiles die je beheerder in je project symlinkt en bestanden die pnpm hard-linkt vallen hieronder.
- **Wijzigingen van buitenaf.** Bewerkingen die je zelf buiten Claude Code maakte, of een parallelle sessie, worden meestal niet vastgelegd.

De documentatie is er eerlijk over: checkpointing vervangt versiebeheer niet. De praktische regel is simpel — commit voordat je een grote opdracht uitzet, gebruik `/rewind` voor de misstappen dáárbinnen.

> Extra: heb je `/clear` gedraaid in dezelfde Claude Code-sessie? Dan staat bovenaan het rewind-menu een regel `/resume <session-id> (previous session)` waarmee je terugspringt naar het gesprek van vóór die clear. Dat werkt vanaf Claude Code v2.1.191; op oudere versies gebruik je `/resume` en kies je de vorige sessie uit de lijst.

## De reflex die je wilt aanleren

Zie je Claude de verkeerde kant op gaan, laat het dan niet uitpraten. Esc-Esc, kies het punt vlak voor de afslag, en herformuleer. Dat is sneller dan repareren — en het scheelt tokens, omdat je het foute spoor niet in je context houdt. Meer manieren om je verbruik te drukken staan in [Caveman: de gratis Claude Code-skill die tot 65% tokens bespaart](/nieuws/caveman-claude-code-tokens-besparen).

Dat je zulke misstappen überhaupt moet zien, is niet vanzelfsprekend: uit onderzoek dat [hetlaatsteainieuws.nl](https://hetlaatsteainieuws.nl/nieuws/ai-agent-sabotage-onderzoek-94-procent) besprak, merkte 94% van de ontwikkelaars een saboterende AI-agent niet op. Een herstelknop helpt alleen als je 'm op tijd indrukt.
