---
title: "Video nasynchroniseren naar het Nederlands met ElevenLabs, in 4 stappen"
heroImageAlt: "Miniatuur diorama-illustratie bij artikel 'Video nasynchroniseren naar het Nederlands met ElevenLabs, in 4 stappen'"
heroImage: "/images/articles/diorama-video-nasynchroniseren-elevenlabs-dubbing.webp"
description: "ElevenLabs dubt je video naar 90+ talen met behoud van de originele stem. Zo werkt het, wat het kost, en waarom je met v2 alleen audio terugkrijgt."
publishedAt: 2026-09-10
updatedAt: 2026-09-10
author: "Redactie"
category: "gids"
tags:
  - "elevenlabs"
  - "dubbing"
  - "video-vertalen"
  - "nasynchroniseren"
  - "voice-cloning"
  - "ondertiteling"
toolSlug: "elevenlabs"
featured: false
draft: false
readingTime: 4
keyTakeaways:
  - "ElevenLabs Dubbing vertaalt video of audio naar 90+ talen, waaronder Nederlands, met behoud van de originele stem en achtergrondgeluid."
  - "Het standaardmodel Dubbing v2 werkt volledig automatisch en levert één audiobestand op, niet een kant-en-klare video."
  - "Wil je de vertaling handmatig corrigeren, dan kies je onder Advanced het legacy v1-model met Dubbing Studio — dat draait in maintenance mode."
  - "Dubbing kost per minuut bronmateriaal per taal; op het gratis plan krijgt elk resultaat een watermerk dat je niet kunt verwijderen."
faq:
  - q: "Ondersteunt ElevenLabs Dubbing Nederlands?"
    a: "Ja. Dubbing v2 ondersteunt meer dan negentig talen en accenten, en Nederlands zit daarbij. Je kunt zowel naar het Nederlands dubben als vanuit het Nederlands naar een andere taal. De kwaliteit hangt sterk af van je bronopname: helder ingesproken materiaal zonder veel overlappende sprekers levert het beste resultaat. Test altijd eerst een fragment van een minuut voordat je een volledige video door de molen haalt."
  - q: "Blijft mijn eigen stem behouden in de vertaling?"
    a: "Dat is precies het uitgangspunt van Dubbing. Het systeem kloont de stem uit de bronopname en gebruikt die voor de vertaalde tekst, zodat de spreker herkenbaar blijft. Ook het achtergrondgeluid blijft staan, dus muziek en omgevingsgeluid hoeven niet opnieuw gemixt te worden. Wat je niet krijgt is lipsynchronisatie: ElevenLabs biedt dat niet aan binnen Dubbing."
  - q: "Waarom kan ik mijn dub niet bewerken?"
    a: "Omdat je waarschijnlijk het standaardmodel gebruikt. Dubs die met Dubbing v2 zijn gemaakt, zijn volledig automatisch en hebben geen bewerkoptie. De bewerkbare versie heet Dubbing Studio en draait op het oudere v1-model. Je activeert die door bij het aanmaken onder Advanced te kiezen voor het legacy v1-model en daarna 'Create Dubbing project' aan te vinken. Een bestaande automatische dub kun je niet achteraf omzetten."
  - q: "Wat kost het om een video te dubben?"
    a: "Dubbing wordt per minuut bronmateriaal berekend, per taal die je toevoegt. Het exacte tarief hangt af van het model dat je gebruikt en staat op de prijspagina van ElevenLabs. In de app zie je vóór de start de totale kosten en moet je die bevestigen. Dubbing zit op alle plannen, ook het gratis plan, maar gratis dubs krijgen een watermerk dat niet te verwijderen is."
  - q: "Hoe lang mag mijn video zijn?"
    a: "Via de website geldt voor Dubbing v2 een limiet van 2 GB en 180 minuten, en je moet onder beide grenzen blijven. Ga je via de API, dan is de limiet 3 GB per bronbestand. Je kunt uploaden vanaf je eigen schijf of een URL plakken van bijvoorbeeld YouTube of TikTok. Ondersteunde formaten zijn onder meer MP4, MOV, MKV, WAV, MP3 en M4A."
---

Een Engelstalige uitlegvideo die je ook aan Nederlandse klanten wilt tonen: opnieuw opnemen kost een middag, ondertitels lezen niet lekker weg. ElevenLabs Dubbing vertaalt de audio naar meer dan negentig talen en houdt daarbij de stem van de spreker aan. Hieronder draai je je eerste dub, met de twee valkuilen die de meeste mensen pas ná het afrekenen ontdekken.

## Wat Dubbing wel en niet doet

Dubbing neemt je video of audio, transcribeert de spraak, vertaalt die en genereert de vertaalde tekst terug in een gekloonde versie van de originele stem. Het achtergrondgeluid blijft staan, dus muziek en omgevingsgeluid hoef je niet opnieuw te mixen.

Wat er níet gebeurt: de lippen bewegen niet mee. ElevenLabs biedt geen lipsynchronisatie binnen Dubbing aan ([Bron: ElevenLabs docs](https://elevenlabs.io/docs/eleven-creative/products/dubbing/dubbing-studio)). Voor een pratend hoofd in beeld valt dat op. Voor een screencast, een voice-over of een interview waarbij de spreker niet permanent in close-up zit, merk je er nauwelijks iets van.

> **💡 Beginner-tip:** Begin met materiaal waar één persoon duidelijk spreekt. Meerdere mensen die door elkaar praten leveren rommelige sprekerherkenning op, en dat corrigeren kan alleen in de bewerkbare variant verderop in dit artikel.

## In vier stappen naar je eerste dub

1. **Open Dubbing.** Ga naar [elevenlabs.io/app/dubbing](https://elevenlabs.io/app/dubbing) en upload je bestand, of plak een URL van YouTube, TikTok of elders. Via de website geldt een limiet van 2 GB en 180 minuten; je moet onder beide blijven.

2. **Kies je talen.** In de selector 'Choose languages' geef je aan waar je naartoe wilt dubben. Let op: je betaalt per geselecteerde taal, per minuut bronmateriaal. Kies er dus niet vijf tegelijk om te kijken wat het mooiste klinkt.

3. **Bevestig de kosten.** De app toont de totaalprijs vóór de dub begint. Dat is het moment om te controleren of je de juiste bron en de juiste talen hebt staan.

4. **Download het resultaat.** Na verwerking staat de dub in je projectlijst. Draai je op het gratis plan, dan zit er een watermerk in dat je niet kunt weghalen; betaalde abonnementen leveren schoon materiaal.

## De valkuil: v2 geeft je audio, geen video

Hier lopen de meeste mensen tegenaan. Het standaardmodel Dubbing v2 levert één audiobestand op. Wil je een kant-en-klare MP4 met de vertaalde spraak eronder, dan moet je die audio zelf terug onder je video zetten in je montageprogramma, of je gebruikt de oudere route.

Die oudere route is **Dubbing Studio**, gebaseerd op het legacy v1-model. Daar krijg je wél MP4-export, plus SRT-ondertitels, losse audiotracks per spreker en AAF-timelinedata. Belangrijker nog: je kunt er de transcriptie en de vertaling handmatig aanpassen, clips splitsen en per fragment de audio opnieuw laten genereren.

Je activeert het bij het aanmaken van de dub: klap **Advanced** open, kies **Use legacy v1 Dubbing model** en vink **Create Dubbing project** aan. Doe je dat niet, dan krijg je een automatische dub zonder bewerkknop, en omzetten achteraf kan niet.

> **⚡ Gevorderden:** Regeneraties in Dubbing Studio zijn standaard *Fixed Generations*: de cliplengte blijft gelijk, ongeacht hoeveel tekst erin staat. Nederlands is gemiddeld langer dan Engels, dus vertaalde zinnen gaan daardoor merkbaar sneller klinken. Rechtsklik op een segment en kies *Dynamic Generation* om de clip mee te laten groeien met de tekst — maar controleer daarna de sync, want een uitlopende clip kan de volgende overlopen.

Eén kanttekening bij die route: ElevenLabs meldt in de documentatie dat Dubbing Studio in maintenance mode staat en alleen nog kritieke bugfixes krijgt. Er komt geen nieuwe functionaliteit bij. Bouw er dus geen productieproces omheen dat over twee jaar nog moet draaien.

## Wanneer dit de moeite waard is

Nasynchroniseren met AI werkt goed voor uitlegvideo's, productdemo's, cursusmateriaal en podcastafleveringen. Het werkt minder goed voor drama, humor en alles waar timing en gezichtsuitdrukking het werk doen.

Wil je eerst weten hoe stemklonen technisch in elkaar zit voordat je je eigen stem uploadt, lees dan onze gids over [AI-voiceover maken met ElevenLabs](/nieuws/ai-voiceover-stemklonen-elevenlabs-murf). En over de juridische kant van stemgebruik — wie eigenaar is van een gekloonde stem — schreven we op onze zustersite [Het Laatste AI Nieuws](https://hetlaatsteainieuws.nl/nieuws/stem-eigendom-wet-nederland-denemarken).

Test altijd één minuut voordat je een uur inlevert. Dat kost je een paar cent en bespaart je de ontdekking dat de gekloonde stem in het Nederlands net even anders klinkt dan je had gehoopt.
