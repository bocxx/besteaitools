---
title: "Seedance-prompts schrijven: de briefing in zes onderdelen"
description: "Een goede Seedance-prompt volgt een vaste volgorde: onderwerp, actie, setting, stijl, camera en geluid. Zo schrijf je hem, met tijdstempels en geluidstekens."
publishedAt: 2026-10-07
updatedAt: 2026-10-07
author: "Redactie"
category: "gids"
tags:
  - "seedance"
  - "bytedance"
  - "ai-video"
  - "prompt-engineering"
  - "tekst-naar-video"
toolSlug: "seedance"
featured: false
draft: false
readingTime: 5
heroImage: "/images/articles/diorama-seedance-prompts-schrijven.webp"
heroImageAlt: "Miniatuur diorama-illustratie bij artikel 'Seedance-prompts schrijven: de briefing in zes onderdelen'"
heroScene: "A tiny film camera on a wooden dolly track facing six small blank wooden blocks lined up on a miniature film set"
evergreen: true
volatility: medium
factsCheckedAt: 2026-10-07
watch:
  - "seedance-versie"
  - "seedance-pricing"
  - "dreamina-seedance"
keyTakeaways:
  - "ByteDance adviseert een vaste volgorde: onderwerp, actie, setting, visuele stijl, camera en geluid. Onderdelen die het beeld niet veranderen laat je weg."
  - "Begin met één samenvattende zin en beschrijf daarna het verloop per tijdvak, bijvoorbeeld 0-3 s, 3-7 s, 7-15 s, zonder gaten in de tijdlijn."
  - "Geluid geef je apart aan: () voor muziek, <> voor geluidseffecten, {} voor dialoog en 【】 voor ondertiteling. Zet de taal vóór de dialoog."
  - "Nederlands staat niet in de lijst van talen die Seedance native ondersteunt. Schrijf je prompt daarom in het Engels."
  - "Test eerst goedkoop: in de API maak je met Draft mode een 480p-proefclip, in Dreamina gebruik je de gratis dagelijkse credits."
faq:
  - q: "Hoe schrijf ik een goede Seedance-prompt?"
    a: "Houd de volgorde aan die ByteDance zelf adviseert: onderwerp, actie of gebeurtenis, setting en omgeving, visuele stijl, camerabeweging of shotwissels, en geluid. Begin met één zin die de hele clip samenvat en beschrijf daarna per tijdvak wat er gebeurt. Laat onderdelen weg die het beeld niet veranderen, en gebruik waar mogelijk positieve beschrijvingen in plaats van verboden."
  - q: "Kan ik een Seedance-prompt in het Nederlands schrijven?"
    a: "Dat kun je proberen, maar Nederlands staat niet in de lijst van talen die Seedance native ondersteunt voor prompts en gesproken audio. Die lijst noemt onder meer Engels, Spaans, Portugees en Japans. Schrijf je prompt daarom in het Engels. Wil je Nederlandse tekst in beeld of gesproken Nederlands, test dat dan eerst met een korte proefclip."
  - q: "Werken tijdstempels in Seedance?"
    a: "Ja, in Seedance 2.5 wel. Je verdeelt de clip in hele seconden, bijvoorbeeld 0-3 s, 3-7 s en 7-15 s, en beschrijft per blok wat er gebeurt. Laat geen gaten in de tijdlijn en prop niet te veel in één blok, anders krijg je abrupte cuts of slaat het model delen over. Versie 2.0 reageert niet op tijdstempels, alleen op shotnummers zoals Shot 1 en Shot 2."
  - q: "Hoe lang mag een Seedance-video zijn?"
    a: "Dat verschilt per versie en per platform, dus kijk in de tabel Stand van zaken onderaan dit artikel. Voor je prompt maakt het wel uit: hoe langer de clip, hoe belangrijker een tijdlijn per blok wordt, omdat het model bij een kale zin de rest zelf invult."
sources:
  - label: "BytePlus ModelArk — Dreamina Seedance 2.5 prompt guide"
    url: "https://docs.byteplus.com/en/docs/ModelArk/seedance-2-5-prompt-guide"
  - label: "BytePlus ModelArk — Dreamina Seedance 2.5 tutorial"
    url: "https://docs.byteplus.com/en/docs/ModelArk/seedance-2-5"
  - label: "ByteDance Seed — Introducing Seedance 2.5"
    url: "https://seed.bytedance.com/en/blog/one-take-creation-flexible-referencing-introducing-seedance-2-5"
  - label: "CapCut Newsroom — Dreamina Seedance 2.5 en Dola Seedream 5.0 Pro"
    url: "https://www.capcut.com/newsroom/giving-creators-more-control-with-dreamina-seedance-2-5-and-dola-seedream-5-0-pro"
  - label: "Dreamina — Seedance 2.5"
    url: "https://dreamina.capcut.com/seedance/seedance-2-5"
---

"Maak een video van een productlancering" levert bij een videomodel een willekeurige clip op. Seedance, het videomodel van ByteDance dat je via Dreamina, CapCut of de BytePlus-API gebruikt, vult alles zelf in wat jij openlaat. Hoe meer je het als een briefing aan een cameraploeg schrijft, hoe minder je hoeft te herkansen. ByteDance publiceert daar zelf een vaste opzet voor, en die volgen we hier.

## De vaste volgorde

De promptregel in de documentatie is kort: zet de onderdelen in de volgorde onderwerp, actie of gebeurtenis, setting en omgeving, visuele stijl, camerabeweging of shotwissels, en geluid. Onderdelen die niets toevoegen, mag je weglaten ([Bron: BytePlus ModelArk](https://docs.byteplus.com/en/docs/ModelArk/seedance-2-5)).

1. **Onderwerp:** "a frosted glass perfume bottle", niet "a product".
2. **Actie:** wat verandert er tijdens de clip?
3. **Setting:** waar, en welk licht?
4. **Visuele stijl:** palet, materiaal, sfeer.
5. **Camera:** shotgrootte, beweging, hoek.
6. **Geluid:** muziek, effecten, dialoog, of juist niets.

Een voorbeeld in die volgorde: *"A frosted glass perfume bottle on a pale stone plinth. Condensation slowly forms on the glass. A sunlit studio with soft shadows. Clean editorial look, muted neutral palette. Slow push-in, then a gentle orbit around the bottle. (soft ambient piano) <light water droplets>, no subtitles."*

Dat de prompt in het Engels staat, is een bewuste keuze. Seedance ondersteunt prompts en gesproken audio native in elf talen, waaronder Engels, Spaans en Portugees, maar Nederlands staat er niet tussen ([Bron: BytePlus ModelArk](https://docs.byteplus.com/en/docs/ModelArk/seedance-2-5)).

## Eerst één zin, dan de tijdlijn

De promptgids van ByteDance raadt een opbouw in drie lagen aan. Bovenaan staat één samenvattende zin met onderwerp, locatie, gebeurtenis, genre en camera. Daaronder beschrijf je het verloop per shot of per tijdvak. Onderaan zet je wat de hele clip door gelijk moet blijven, zoals camerahoek, omgeving of sfeer ([Bron: BytePlus prompt guide](https://docs.byteplus.com/en/docs/ModelArk/seedance-2-5-prompt-guide)).

Voor de tijdlijn werk je in hele seconden: "0-3 seconds... 3-7 seconds... 7-15 seconds". Laat geen gaten vallen zoals "0-3s... 5-6s". Staat er te weinig in een blok, dan gaat het model improviseren. Prop je er te veel in, dan krijg je extra cuts of vallen stukken weg. Snelle herhalingen ("schud drie keer per seconde je hoofd") stuur je niet met tijdstempels ([Bron: BytePlus prompt guide](https://docs.byteplus.com/en/docs/ModelArk/seedance-2-5-prompt-guide)). Werk je nog met versie 2.0, gebruik dan "Shot 1, Shot 2": die versie reageert volgens dezelfde gids niet op tijdstempels.

Bij camerawerk mag je gewoon vaktaal gebruiken: close-up, push in, orbit, dolly zoom, FPV. Een zeldzamere term schrijf je uit, met de term plus een korte beschrijving van wat er in beeld gebeurt ([Bron: BytePlus prompt guide](https://docs.byteplus.com/en/docs/ModelArk/seedance-2-5-prompt-guide)). Liever een kant-en-klare camerabeweging kiezen dan beschrijven? Dan is [Higgsfield Motion Control met camera-presets](/nieuws/higgsfield-camera-presets-motion-control-gebruiken) een alternatief.

## Geluid apart markeren

Omdat Seedance beeld en geluid in één keer maakt, hoort het geluid in dezelfde prompt ([Bron: ByteDance Seed](https://seed.bytedance.com/en/blog/one-take-creation-flexible-referencing-introducing-seedance-2-5)). De documentatie geeft daarvoor vaste tekens: `()` voor muziek, `<>` voor geluidseffecten, `{}` voor dialoog en `【】` voor ondertiteling. Bij dialoog in een andere taal dan Chinees zet je de taal ervoor, bijvoorbeeld *English: {Don't come over here.}* ([Bron: BytePlus ModelArk](https://docs.byteplus.com/en/docs/ModelArk/seedance-2-5)).

Schrijf zo veel mogelijk positief: beschrijf wat je wél wilt. Voor ondertiteling en audio werken verboden wel, zoals "no subtitles" of "no BGM; only ambient and action sounds" ([Bron: BytePlus prompt guide](https://docs.byteplus.com/en/docs/ModelArk/seedance-2-5-prompt-guide)).

> **Beginner-tip:** Begin met één zin plus de camera, en voeg pas daarna geluid en tijdlijn toe. Dan zie je per stap wat er verandert. Twijfel je nog welk videomodel bij je past, kijk dan ook naar onze gids voor [MiniMax H3 op Hailuo](/nieuws/hailuo-minimax-h3-gebruiken).

## Referenties: benoem wat elk bestand doet

Met referentiebeelden verandert je prompt van beschrijving naar regie. De regel: noem elk bestand op uploadvolgorde (Image 1, Video 1, Audio 1) en zeg waarvoor het dient, bijvoorbeeld "the knight in Image 1" of "refer to Image 1 for lighting". Schrijf geen namen in het beeld zelf, en beschrijf niet opnieuw wat de referentie al laat zien ([Bron: BytePlus prompt guide](https://docs.byteplus.com/en/docs/ModelArk/seedance-2-5-prompt-guide)). Hoe je bestanden uploadt en met @ aanroept in Dreamina, staat in onze gids [Seedance in Dreamina: video maken met referenties](/nieuws/seedance-referenties-video-dreamina).

Eén grens: via de API kun je geen referentiebeelden of -video's met echte gezichten direct uploaden ([Bron: BytePlus ModelArk](https://docs.byteplus.com/en/docs/ModelArk/seedance-2-5)). Dreamina-video's krijgen daarnaast een onzichtbaar watermerk, C2PA-gegevens en een zichtbaar AI-label ([Bron: CapCut Newsroom](https://www.capcut.com/newsroom/giving-creators-more-control-with-dreamina-seedance-2-5-and-dola-seedream-5-0-pro)). Waarom dat ertoe doet, lees je in [hoe je een nepvideo herkent](https://www.hetlaatsteainieuws.nl/regelgeving/deepfakes-2026-nep-video-herkennen) op hetlaatsteainieuws.nl.

## Testen zonder je budget op te branden

Beoordeel een proefclip eerst op de briefing: klopt het onderwerp, de actie, de camera, het geluid? Pas daarna kijk je naar details. Dwaalt het onderwerp af, verander dan de prompt, niet de nabewerking. In Dreamina test je met de gratis dagelijkse credits ([Bron: Dreamina](https://dreamina.capcut.com/seedance/seedance-2-5)).

> **Gevorderden:** In de API zet je `draft=true` voor een 480p-proefversie. Bevalt die, dan maak je met het task-ID de definitieve versie, binnen zeven dagen ([Bron: BytePlus ModelArk](https://docs.byteplus.com/en/docs/ModelArk/seedance-2-5)). ByteDance biedt ook een prompt-skill aan die je met `/sd25-pe` in een AI-chat aanroept om een prompt te laten herschrijven ([Bron: BytePlus prompt guide](https://docs.byteplus.com/en/docs/ModelArk/seedance-2-5-prompt-guide)).

## Stand van zaken — bijgewerkt 2026-10-07

De opbouw hierboven blijft staan, ook als er een nieuwe Seedance-versie komt. De cijfers hieronder zijn de bederfelijke laag.

| Onderwerp | Stand |
| --- | --- |
| Actuele versie | Seedance 2.5, gelanceerd 31 juli 2026; 2.0 blijft beschikbaar ([Bron: ByteDance Seed](https://seed.bytedance.com/en/blog/one-take-creation-flexible-referencing-introducing-seedance-2-5)) |
| Cliplengte per generatie | 4 tot 30 seconden in de API, meerdere keren te verlengen ([Bron: BytePlus ModelArk](https://docs.byteplus.com/en/docs/ModelArk/seedance-2-5)); Dreamina noemt daarnaast een bèta-modus tot 180 seconden ([Bron: Dreamina](https://dreamina.capcut.com/seedance/seedance-2-5)) |
| Resolutie (API) | 480p, 720p (standaard) of 1080p; Dreamina adverteert 4K |
| Referenties | Max. 50: 30 beelden, 10 video's, 10 audioclips; video en audio elk samen max. 30 seconden |
| Talen (native) | 11, waaronder Engels; geen Nederlands |
| Beschikbaarheid NL/EU | Dreamina Seedance 2.5 voor abonnees van 16 jaar en ouder, Europa inbegrepen ([Bron: CapCut Newsroom](https://www.capcut.com/newsroom/giving-creators-more-control-with-dreamina-seedance-2-5-and-dola-seedream-5-0-pro)) |
| Kosten | Dreamina: gratis dagelijkse credits, daarna betaald; API: resourcepakket of BytePlus-saldo boven 30 dollar vereist. Actuele tarieven op onze [Seedance-toolpagina](/ai-tools/seedance) en bij de aanbieder |

## Bronnen

- [BytePlus ModelArk — Dreamina Seedance 2.5 prompt guide](https://docs.byteplus.com/en/docs/ModelArk/seedance-2-5-prompt-guide): opbouw, tijdstempels, referenties en negatieve sturing
- [BytePlus ModelArk — Dreamina Seedance 2.5 tutorial](https://docs.byteplus.com/en/docs/ModelArk/seedance-2-5): promptformule, geluidstekens, limieten, talen en Draft mode
- [ByteDance Seed — Introducing Seedance 2.5](https://seed.bytedance.com/en/blog/one-take-creation-flexible-referencing-introducing-seedance-2-5): lancering en mogelijkheden
- [CapCut Newsroom — Dreamina Seedance 2.5](https://www.capcut.com/newsroom/giving-creators-more-control-with-dreamina-seedance-2-5-and-dola-seedream-5-0-pro): beschikbaarheid en watermerken
- [Dreamina — Seedance 2.5](https://dreamina.capcut.com/seedance/seedance-2-5): gratis credits en lange-videomodus
