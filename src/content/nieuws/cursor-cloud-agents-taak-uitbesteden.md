---
title: "Cursor Cloud Agents: een taak wegzetten en je laptop dichtklappen"
description: "Een Cloud Agent draait je taak in een eigen cloud-VM en opent zelf een pull request. Zo start je er een, en zo beoordeel je het resultaat zonder de branch uit te checken."
publishedAt: 2026-08-30
updatedAt: 2026-08-30
author: "Redactie"
category: "gids"
tags:
  - "cursor"
  - "cloud-agents"
  - "background-agents"
  - "pull-request"
  - "ai-coding"
  - "code-review"
toolSlug: "cursor"
featured: false
draft: false
readingTime: 4
heroImageAlt: "Miniatuur diorama-illustratie bij artikel 'Cursor Cloud Agents: een taak wegzetten en je laptop dichtklappen'"
heroScene: "A tiny closed laptop on a desk, with a small glass dome beside it in which a miniature workbench continues working on its own"
keyTakeaways:
  - "Een Cloud Agent draait op een eigen, van je laptop geïsoleerde VM met je repo, dependencies en secrets."
  - "Je start hem vanuit de desktop-app, Cursor Web, iOS of door @Cursor in Slack te noemen."
  - "De agent test zijn eigen werk en hangt screenshots, video's en logs aan de pull request."
  - "Cloud Agents zitten in het Start-plan en hoger; ze verbruiken eerst het inbegrepen gebruik van je abonnement, daarna on-demand."
faq:
  - q: "Wat is het verschil met de agent in mijn editor?"
    a: "De agent in je editor werkt op jouw machine en in jouw sessie: je kijkt mee, je keurt stappen goed, en als je de laptop dichtklapt stopt het. Een Cloud Agent draait op een eigen virtuele machine in de cloud en werkt minuten tot uren zelfstandig door aan één opdracht. Cloud Agents heetten eerder Background Agents; als je die term nog in oudere documentatie tegenkomt gaat het over hetzelfde."
  - q: "Krijgt zo'n agent toegang tot mijn secrets?"
    a: "Ja, en dat is bewust: de VM krijgt je repository, dependencies, secrets en netwerktoegang, anders kan hij niets bouwen of testen. Die VM is wel afgeschermd van je lokale machine — commando's van de agent raken jouw omgeving niet. Wie dat niet wil uitbesteden, kan Cloud Agents ook op eigen infrastructuur draaien; Cursor documenteert dat apart."
  - q: "Hoe weet ik of het werk deugt zonder de branch uit te checken?"
    a: "Terwijl de agent werkt, test hij zijn wijzigingen en hangt hij video's, screenshots en logs aan de pull request. Dat is genoeg voor een eerste oordeel. Wil je verder kijken, dan kun je de remote desktop van de agent overnemen om de software die hij bouwde zelf te gebruiken en handmatig aan te passen."
  - q: "Wat kost dit?"
    a: "Cloud Agents zitten volgens de Cursor-documentatie in het Start-plan, en Pro, Pro Plus en Ultra geven ruimere gebruikslimieten. Ze verbruiken eerst het inbegrepen API-gebruik van je abonnement en gaan daarna over op on-demand-gebruik — er is dus geen aparte meter naast je abonnement, maar wél een moment waarop je erdoorheen zakt en gaat bijbetalen. Cursor noemt zelf 60 tot 100 dollar per maand aan totaalgebruik voor wie er dagelijks mee werkt. Check de actuele tarieven op de prijzenpagina voordat je er een nachtelijke taak op zet."
  - q: "Waarvoor is dit geschikt en waarvoor niet?"
    a: "Geschikt: goed afgebakende klussen met een duidelijk eindpunt en een testsuite die vertelt of het klopt. Een bug met een reproductie, een testreeks uitbreiden, een dependency-upgrade doortrekken. Minder geschikt: werk waarbij de eisen tijdens het maken duidelijk worden, of een verandering die door je hele architectuur snijdt. Daar wil je meekijken, niet achteraf beoordelen."
---

De agent in je editor is prettig tot het moment dat je iets anders wilt doen. Je zit vast aan het scherm, keurt stap na stap goed, en de klus die veertig minuten kost, kost jou ook veertig minuten aandacht.

Cloud Agents draaien de rollen om. Je beschrijft de taak, de agent verhuist naar een eigen machine in de cloud, en jij krijgt later een pull request terug. Sinds de naamswijziging heten ze zo; in oudere documentatie kom je nog Background Agents tegen.

## Hoe je er een start

Je hoeft er de desktop-app niet voor open te hebben. Cursor laat je een Cloud Agent starten vanuit Cursor Desktop, Cursor Web, Cursor voor iOS, en vanuit Slack door `@Cursor` te noemen in een thread. Dat laatste is verrassend praktisch: de context van het gesprek waarin de bug besproken wordt, gaat mee de opdracht in.

De agent krijgt een eigen virtuele machine met een volledige ontwikkelomgeving: je repository, je dependencies, je secrets en netwerktoegang. Die VM is afgeschermd van je laptop, dus wat de agent daar uitvoert raakt jouw omgeving niet.

Daarna plant hij de taak, bewerkt code, draait commando's, test zijn werk, en opent aan het eind zelf een pull request.

## De opdracht is het echte werk

Hier zit het verschil tussen een bruikbare PR en een uur verspilde rekentijd. Een agent die uren zelfstandig doorwerkt kan niet halverwege even vragen wat je bedoelde.

Geef daarom mee wat "klaar" betekent. Niet "verbeter de foutafhandeling in de betaalmodule", maar: welke functie, welk gedrag je verwacht bij welke fout, en welke test dat moet aantonen. Als er een reproductie van de bug is, hoort die in de opdracht. Als er een bestand is dat níét aangeraakt mag worden, zeg dat.

De vuistregel die goed werkt: kun je het niet zo opschrijven dat een nieuwe collega het zonder tussenvragen zou kunnen doen, dan is het nog geen Cloud Agent-taak.

## Beoordelen zonder uitchecken

Het punt waarop dit soort werk meestal alsnog jouw tijd opeet, is de review. Een PR van vijftien bestanden uitchecken en lokaal draaien om te zien of het klopt, is bijna het werk zelf.

Cursor lost dat op door de agent bewijs te laten aanleveren. Terwijl hij werkt, test hij zijn wijzigingen en hangt hij video's, screenshots en logs aan de pull request. Voor een eerste oordeel — draait het, doet het wat het moet doen — is dat vaak genoeg.

Twijfel je alsnog, dan kun je de remote desktop van de agent overnemen: je gebruikt dan de software die hij net gebouwd heeft, in de omgeving waar hij hem bouwde, en je kunt er zelf in bewerken.

## Wat je moet weten voordat je er één op de nacht zet

Cloud Agents zitten in het Start-plan en hoger, en verbruiken volgens de documentatie eerst het inbegrepen API-gebruik van je abonnement voordat ze overgaan op on-demand. Dat klinkt geruststellender dan het is: een agent die de hele nacht doorploetert op een slecht afgebakende opdracht, eet je inbegrepen budget op en tikt daarna door. Cursor noemt zelf 60 tot 100 dollar per maand aan totaalgebruik voor wie er dagelijks mee werkt, en 200 dollar of meer voor wie meerdere agents en automations parallel laat lopen ([Bron: Cursor Docs](https://cursor.com/docs/models-and-pricing)). Kijk de actuele tarieven na voordat je dit routine maakt.

Wil je de code helemaal niet buiten de deur hebben, dan is er een uitweg: Cursor ondersteunt het draaien van Cloud Agents op je eigen infrastructuur. Dat is de route voor teams die om compliance-redenen geen repository op een externe VM mogen zetten.

## Waar het wel en niet in past

Cloud Agents zijn op hun best bij klussen met een scherpe rand: een gereproduceerde bug, een dependency-upgrade doortrekken, testdekking uitbreiden, een refactor waarvan de tests vertellen of het gelukt is.

Ze zijn slecht in werk waarbij de eisen ontstaan tijdens het maken. Een nieuw scherm ontwerpen, een architectuurkeuze uitwerken, iets waarbij je halverwege van gedachten verandert — daar wil je aan tafel zitten, niet een PR beoordelen die de verkeerde kant op ging.

Begin daarom met één taak die je zelf al kunt oplossen maar niet leuk vindt. Dan weet je bij de review meteen of het antwoord deugt.
