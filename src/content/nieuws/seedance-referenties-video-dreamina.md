---
title: "Seedance 2.0 in Dreamina: video maken met referenties"
heroImage: "/images/articles/diorama-seedance-referenties-video-dreamina.webp"
description: "Zo stuur je Seedance 2.0 in Dreamina aan met eigen beelden, clips en audio via @-verwijzingen. Met de limieten en wat versie 2.5 daaraan toevoegt."
publishedAt: 2026-09-30
updatedAt: 2026-09-30
author: "Redactie"
category: "gids"
tags:
  - "seedance"
  - "dreamina"
  - "ai-video"
  - "bytedance"
  - "referentiebeelden"
toolSlug: "seedance"
featured: false
draft: false
readingTime: 4
heroImageAlt: "Miniatuur diorama-illustratie bij artikel 'Seedance 2.0 in Dreamina: video maken met referenties'"
heroScene: "Paper photos, a tiny film reel and a small music box feeding into a brass projector on a miniature film set"
keyTakeaways:
  - "Seedance 2.0 in Dreamina accepteert per project maximaal 12 bestanden: 9 beelden, 3 video's en 3 audioclips, video en audio elk tot 15 seconden."
  - "In je prompt verwijs je naar elk bestand met @Bestandsnaam, zodat het model weet welk beeld waarvoor dient. Uitvoer is 1080p."
  - "Je kunt ook werken met alleen een eerste en laatste frame (single-frame mode) in plaats van meerdere referenties."
  - "Seedance 2.5 rolt sinds de week van 31 juli 2026 uit naar abonnees van 16 jaar en ouder, ook in Europa: tot 30 seconden per clip en tot 50 referentiebestanden."
  - "Versie 2.0 blijft gewoon bestaan naast 2.5; via BytePlus ModelArk is 2.5 sinds 6 augustus 2026 ook via de API bereikbaar."
faq:
  - q: "Hoeveel referentiebestanden mag ik in Seedance 2.0 uploaden?"
    a: "Volgens Dreamina maximaal 12 bestanden per project: 9 beelden, 3 video's en 3 audioclips, waarbij video en audio elk maximaal 15 seconden lang mogen zijn. Houd je referenties dus kort en gericht."
  - q: "Hoe verwijs ik naar een geüploade afbeelding in mijn prompt?"
    a: "Noem het bestand met een @ en de bestandsnaam, bijvoorbeeld '@hoofdpersoon loopt door @straat'. Geef je bestanden daarom voor het uploaden een korte, herkenbare naam — 'IMG_20260930_final2' typt slecht weg in een prompt."
  - q: "Wat is het verschil tussen Seedance 2.0 en 2.5?"
    a: "Versie 2.5 rekt de grenzen op: tot 30 seconden per clip in plaats van kortere fragmenten, en tot 50 referentiebestanden in plaats van 12. De uitrol begon in de week van 31 juli 2026 voor abonnees van 16 jaar en ouder, ook in Europa, en sinds 6 augustus is het model via BytePlus ModelArk ook per API te gebruiken. Versie 2.0 verdwijnt niet: die blijft naast 2.5 bestaan."
  - q: "Wat kost Seedance in Dreamina?"
    a: "Dreamina rekent in credits, en wat een generatie kost verschilt per modelversie, lengte en resolutie. De actuele prijs zie je in de app voordat je genereert; controleer die eerst, zeker als je met de langere clips van 2.5 werkt."
  - q: "Kun je Seedance ook zonder referenties gebruiken?"
    a: "Ja. Je kunt met een tekstprompt beginnen, of met een eerste en laatste frame (single-frame mode) waartussen het model de beweging invult. Referenties zijn optioneel, maar ze zijn de enige manier om dezelfde hoofdpersoon over meerdere clips te houden."
sources:
  - label: "Dreamina — How To Use Seedance 2.0"
    url: "https://dreamina.capcut.com/resource/how-to-use-seedance-2-0"
  - label: "ByteDance Seed — Introducing Seedance 2.5"
    url: "https://seed.bytedance.com/en/blog/one-take-creation-flexible-referencing-introducing-seedance-2-5"
---

Een prompt alleen geeft je zelden dezelfde hoofdpersoon in twee clips. Seedance 2.0 lost dat op door je eigen beelden, video en audio als referentie mee te nemen. Zo werkt dat in Dreamina, het creatieplatform van ByteDance.

## Wat je mag uploaden

Dreamina noemt maximaal 12 bestanden per project: 9 beelden, 3 video's en 3 audioclips, waarbij video en audio elk tot 15 seconden mogen zijn ([Bron: Dreamina](https://dreamina.capcut.com/resource/how-to-use-seedance-2-0)). Uitvoer is 1080p volgens dezelfde pagina.

Er zijn twee manieren van werken: de single-frame mode, waarbij je een eerste en laatste frame aanlevert, en de multiframes mode, waarin je meerdere soorten input combineert ([Bron: Dreamina](https://dreamina.capcut.com/resource/how-to-use-seedance-2-0)).

## Stap voor stap

1. **Kies je referenties.** Neem één beeld voor je hoofdpersoon, één voor de locatie en eventueel een korte clip voor de camerabeweging.
2. **Geef ze een korte naam** vóór het uploaden, bijvoorbeeld `koffiekop` of `straat`.
3. **Upload ze in Dreamina** en schrijf je prompt. Verwijs naar elk bestand met `@Bestandsnaam` ([Bron: Dreamina](https://dreamina.capcut.com/resource/how-to-use-seedance-2-0)). Voorbeeld: "@koffiekop draait langzaam op een tafel in @straat, camera zoomt rustig in".
4. **Genereer** en bekijk het resultaat. Dreamina biedt daarna Regenerate, Generate soundtrack en Interpolate frames aan.
5. **Download** de clip rechtsboven.

> **Beginner-tip:** Begin met één beeld en één zin. Voeg pas referenties toe als de eerste clip klopt; anders weet je niet welk bestand het resultaat veranderde. Wil je juist een pratend gezicht in beeld, dan zit je beter bij [AI-avatarvideo met HeyGen of Synthesia](/nieuws/ai-avatar-video-heygen-synthesia-geen-camera).

## Wat versie 2.5 verandert

Seedance 2.5 is geen vervanger maar een tweede optie naast 2.0. De uitrol begon in de week van 31 juli 2026 en loopt naar abonnees van 16 jaar en ouder, Europa inbegrepen. De twee grenzen die je als eerste merkt: clips mogen tot 30 seconden duren, en je mag tot 50 referentiebestanden meegeven in plaats van de 12 van 2.0. Sinds 6 augustus 2026 is 2.5 ook via de API te gebruiken op BytePlus ModelArk ([Bron: ByteDance Seed](https://seed.bytedance.com/en/blog/one-take-creation-flexible-referencing-introducing-seedance-2-5)).

Praktisch betekent dat: voor een kort shot met drie referenties is 2.0 prima en voorspelbaar. Zodra je een scène van een halve minuut in één keer wilt, of een personage over veel meer beelden consistent wilt houden, is 2.5 de versie die je zoekt.

> **Gevorderden:** Wil je Seedance in een eigen workflow, kijk dan naar de API-route via ModelArk. Wat dat per generatie kost staat niet in de aankondiging; onze [toolpagina voor Seedance](/ai-tools/seedance) houdt de plannen bij, maar controleer altijd de actuele tarieven bij de aanbieder zelf.

## Waar het meestal misgaat

Twee dingen kosten de meeste herkansingen. De eerste: bestandsnamen die je in een prompt niet fatsoenlijk kunt noemen. Een upload die `screenshot-2026-09-30 (3)` heet, verwijs je niet handig aan met `@`, en het model raadt dan verkeerd welk beeld je bedoelde. De tweede: te veel referenties tegelijk. Drie beelden die elk iets anders willen, leveren een clip op die geen van drieën volgt. Voeg er één per keer bij en bekijk wat er verandert.

## Checklist: ben je klaar?

- [ ] Maximaal 9 beelden, 3 video's en 3 audioclips (bij 2.0)
- [ ] Video en audio elk maximaal 15 seconden
- [ ] Elk bestand heeft een korte naam die je in de prompt met @ noemt
- [ ] Eerste test met één referentie gedraaid
- [ ] Je weet of je op 2.0 of 2.5 zit — dat scheelt in lengte en aantal referenties
- [ ] Je hebt rechten op het beeld- en geluidsmateriaal dat je uploadt
- [ ] Actuele credit-prijs in Dreamina gecontroleerd

Wie zelf video maakt met referentiebeelden, snapt meteen waarom herkenning lastiger wordt: lees [hoe je nepvideo in 2026 herkent](https://www.hetlaatsteainieuws.nl/regelgeving/deepfakes-2026-nep-video-herkennen) op hetlaatsteainieuws.nl. Voor de geluidskant van je clip is onze gids over [nasynchroniseren met ElevenLabs](/nieuws/video-nasynchroniseren-elevenlabs-dubbing) het logische vervolg.

## Bronnen

- [Dreamina — How To Use Seedance 2.0](https://dreamina.capcut.com/resource/how-to-use-seedance-2-0) — limieten, modi en de @-verwijzing
- [ByteDance Seed — Introducing Seedance 2.5](https://seed.bytedance.com/en/blog/one-take-creation-flexible-referencing-introducing-seedance-2-5) — wat 2.5 toevoegt en waar het draait
