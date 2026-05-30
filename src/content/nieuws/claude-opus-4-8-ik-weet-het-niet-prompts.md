---
title: "Claude Opus 4.8 zegt vaker 'ik weet het niet': zo benut je dat in drie prompts"
description: "Anthropic's nieuwste model is opzettelijk minder zelfverzekerd. Met deze drie prompts haal je er sneller bruikbare, eerlijke antwoorden uit — zonder de hallucinaties die andere modellen sluipen."
publishedAt: 2026-05-29
updatedAt: 2026-05-29
author: "Redactie"
category: "gids"
tags:
  - "claude"
  - "claude-opus"
  - "anthropic"
  - "prompts"
  - "hallucinaties"
  - "betrouwbaarheid"
  - "ai-setup"
toolSlug: "claude"
featured: true
readingTime: 4
heroImage: "/images/articles/diorama-claude-opus-4-8-ik-weet-het-niet-prompts.webp"
heroImageAlt: "Miniatuur diorama-illustratie bij artikel 'Claude Opus 4.8 zegt vaker 'ik weet het niet': zo benut je dat in drie prompts'"
keyTakeaways:
  - "Claude Opus 4.8 is sinds 28 mei 2026 beschikbaar — geprijsd gelijk aan Opus 4.7, maar duidelijk eerlijker over wat het niet weet."
  - "Anthropic claimt dat Opus 4.8 vier keer minder vaak code-fouten ongemerkt laat passeren dan Opus 4.7."
  - "Naast de hedging-update is er Dynamic Workflows (research preview): Claude kan honderden subagents parallel inzetten voor grote taken."
  - "Drie concrete prompts maken Opus 4.8's 'twijfel-modus' bruikbaar voor research, code-review en klantantwoorden."
  - "De Aithos LARA-test van 27 mei 2026 zette Claude Opus 4.7 als enige boven 50% EU-compliance — Opus 4.8 belooft hier nog scherper te zitten."
faq:
  - q: "Wat is er nieuw in Claude Opus 4.8?"
    a: "Drie dingen. Eén: Opus 4.8 geeft vaker toe dat het iets niet weet en is minder geneigd zelfverzekerde maar onjuiste antwoorden te geven. Twee: in code is het vier keer minder vaak dan Opus 4.7 een fout ongemerkt door laten glippen. Drie: er is een nieuwe Dynamic Workflows-modus (research preview) waarin Claude in Claude Code honderden parallelle subagents kan inzetten en de uitkomsten zelf verifieert."
  - q: "Hoe activeer ik de eerlijke-modus van Opus 4.8?"
    a: "Je hoeft niets te activeren — het hedging-gedrag zit standaard in het model. Wel haal je er meer uit als je expliciet vraagt om twijfel en bronnen in je prompt. Een korte instructie als 'flag elk punt waar je niet zeker bent en zeg waarom' werkt direct, ook voor wie van Sonnet 4.6 overstapt."
  - q: "Kost Opus 4.8 meer dan Opus 4.7?"
    a: "Nee, de tokenprijs is gelijk gebleven aan Opus 4.7. Wel komt er voor Pro-gebruikers op claude.ai een schuifje voor de hoeveelheid 'effort' die Claude in een antwoord steekt — meer effort kost meer wachttijd, geen extra geld."
  - q: "Is Opus 4.8 ook beschikbaar in Cowork?"
    a: "Ja. In de Claude-desktopapp zie je Opus 4.8 sinds 28 mei 2026 als modelkeuze in het rechter zijpaneel. De setup van [Claude in één dag instellen](/nieuws/claude-instellen-1-dag-6-tools) verandert niet — je kiest alleen een ander model in de dropdown."
  - q: "Voor welke taken is Opus 4.8 minder geschikt?"
    a: "Voor brainstorms en creatieve generatie waarbij je juist *meer* hypothesen wilt zien, kan de hedging-modus storend voelen. Sonnet 4.6 of Opus 4.7 zijn dan vaak prettiger. Voor klantcontact, juridische teksten, financiële beslissingen en code-review is Opus 4.8 vanaf dag één de logische keuze."
---

Anthropic kondigde op 28 mei 2026 Claude Opus 4.8 aan — slechts 41 dagen na Opus 4.7, en op dezelfde dag dat het bedrijf een [Series H-financiering van 65 miljard dollar](https://www.anthropic.com/news/series-h) ophaalde tegen een waardering van bijna één biljoen. Het opvallendste aan het nieuwe model is geen prestatiesprong — het is een *karakterverandering*. Opus 4.8 zegt vaker "ik weet het niet" en is volgens Anthropic vier keer minder vaak dan zijn voorganger geneigd onopgemerkte code-fouten te laten passeren ([Bron: Anthropic — Introducing Claude Opus 4.8](https://www.anthropic.com/news/claude-opus-4-8)).

Voor wie Claude dagelijks inzet voor research, klantantwoorden of code-review is dat goed nieuws — mits je je prompts erop aanpast. Hieronder drie die we deze week zelf met productie-data hebben getest.

> **💡 Beginner-tip:** Heb je Claude nog niet draaien? Begin met onze gids [Claude in één dag instellen — zes tools die hem laten werken als een collega](/nieuws/claude-instellen-1-dag-6-tools). Opus 4.8 verandert je setup niet; je kiest alleen een ander model in de dropdown.

## Prompt 1: research zonder verzonnen feiten

Hét gebruik waar Opus 4.8's hedging meteen rendement levert. Plak deze prompt boven je vraag:

> *"Beantwoord deze vraag op basis van wat je zeker weet. Markeer elk feit waarover je twijfelt met **[onzeker]** en leg in één zin uit waarom. Verzin geen bronnen, geen jaartallen en geen citaten — als je het niet zeker weet, zeg dat dan."*

Wat je terugkrijgt: een gestructureerd antwoord waarin de stevige feiten los staan van het onzekere. Onzekere claims krijgen letterlijk **[onzeker]** ervoor met een korte motivatie. Voor een Nederlandstalig marketingteam dat AI gebruikt om persberichten te checken, is dit het verschil tussen *"nu kan ik het zelf nalezen"* en *"klakkeloos overnemen omdat het overtuigend klinkt"*.

## Prompt 2: code-review die fouten échte naam geeft

Opus 4.8's code-honesty is meetbaar verbeterd. Een prompt die dat uitnut:

> *"Review deze code voor productiegebruik. Lijst eerst de issues op die je met hoge zekerheid kunt benoemen (met regelnummers). Lijst daarna afzonderlijk de plekken op waar je twijfelt of het echt fout is — leg per twijfel uit wat je nog zou willen weten om zeker te zijn."*

De tweede lijst is waar het verschil zit. Waar Opus 4.7 vaak doorduwde met "verbeter dit" omdat het zelfverzekerd klonk, geeft 4.8 nu vaker terug: *"Twijfel: deze loop kan onbedoeld blocking gedrag vertonen als `process_batch()` synchroon is. Kun je me laten zien hoe die functie geïmplementeerd is?"* Dat is precies wat je van een collega zou willen — vragen voor je code wegslaat.

Voor wie zwaardere code-werk doet en parallelle subagents wil inzetten: Anthropic's [Dynamic Workflows](https://techcrunch.com/2026/05/28/anthropic-releases-opus-4-8-with-new-dynamic-workflow-tool/) (research preview in Claude Code) draait honderden subagents naast elkaar en verifieert hun output voordat het je een antwoord geeft. Combineer dat met onze guide over [zero.xyz als gateway naar circa 8.000 tools](/nieuws/zero-xyz-agent-tool-gateway) en je hebt een serieuze agent-stack. Voor niet-coders die hetzelfde principe van zelfstandige agents willen: [onze Notion-agent-tutorial](/nieuws/notion-agent-concurrentieanalyse-opzetten) laat zien hoe een agent binnen Notion 20 minuten lang research doet zonder dat jij meekijkt.

## Prompt 3: klantantwoord dat geen schijnzekerheid wekt

Voor klantcontact is overschattende AI een aansprakelijkheidsprobleem. Eigenlijk de wet, niet alleen ergerlijk: het [recente Aithos-onderzoek (27 mei 2026) liet zien dat Claude Opus 4.7 als enige boven de 50% EU-compliance kwam](https://www.hetlaatsteainieuws.nl/regelgeving/chatgpt-claude-gemini-overtreden-eu-wet-aithos-lara), terwijl Gemini 3.1 Pro op 10% bleef hangen. Opus 4.8 belooft hier nog scherper te zitten.

Gebruik deze opdracht voor klantmails of chatbot-antwoorden:

> *"Schrijf een antwoord op deze klantvraag in Nederlandse zakelijke toon. Als de vraag een feit, prijs, beschikbaarheid of juridische claim raakt die ik moet verifiëren voor we hem versturen — zet dat onderaan in een blokje 'VERIFICATIE NODIG' met regelnummer-verwijzing naar het antwoord. Schrijf liever 'ik check dit voor je en kom erop terug' dan een zelfverzekerd antwoord waar je niet zeker van bent."*

Resultaat: een werkbare conceptmail, plus een afzonderlijk lijstje met punten die jij of een collega moet bevestigen voor verzending. Dat is geen vertraging — het is precies de menselijke supervisie die de [EU AI Act op 2 augustus 2026 ook formeel verplicht](https://www.hetlaatsteainieuws.nl/regelgeving/eu-ai-act-mei-2026-governance-nederland) voor klantgerichte AI-toepassingen.

> **⚡ Gevorderden:** wie Opus 4.8 voor security- of auditwerk inzet, kan met [Strix als open-source AI-pentester](/nieuws/strix-open-source-ai-pentester) een tweede laag van adversarial testing toevoegen. De combinatie — Opus 4.8 voor het redeneren, Strix voor de proof-of-concept — vangt fouten die elk apart nog te makkelijk doorlaat.

## Wanneer kies je voor Opus 4.8, en wanneer niet?

Opus 4.8 is een logische default voor: research, klantcontact, juridische conceptteksten, code-review en alles waar fouten direct kosten met zich meebrengen. Voor creatief werk — brainstorms, scenarios, jeugdige tekstvarianten — voelt de hedging-modus soms wat remmend. In die taken is Sonnet 4.6 vaak vlotter, of zet Opus 4.7 in via de modelkiezer. Wil je een eerste vergelijking tussen Claude en ChatGPT voor jouw use case? Lees onze [Claude vs ChatGPT-vergelijking 2026](/nieuws/claude-vs-chatgpt-vergelijking-2026).

Voor visueel werk — ontwerp, illustratie, layout-feedback — blijft [Claude Design Opus](/nieuws/claude-design-opus) de gespecialiseerde variant. En als je nog twijfelt of Cowork-modus voor jouw werk verschil maakt: onze [launch-analyse van Claude Cowork](/nieuws/claude-cowork-lancering) zet de keuzes op een rij.

## Samenvatting

- Claude Opus 4.8 is sinds 28 mei 2026 beschikbaar, prijs gelijk aan Opus 4.7, met betere honesty en een 4x lagere kans op onopgemerkte code-fouten.
- Drie concrete prompts maken het verschil zichtbaar: een research-prompt met **[onzeker]**-tags, een code-review-prompt die twijfels apart benoemt, en een klantantwoord-prompt die "VERIFICATIE NODIG"-blokken markeert.
- Dynamic Workflows (research preview) draait honderden parallelle subagents in Claude Code voor zwaardere taken.
- Voor klant- en compliance-werk sluit Opus 4.8 aan op de [Aithos LARA-meting](https://www.hetlaatsteainieuws.nl/regelgeving/chatgpt-claude-gemini-overtreden-eu-wet-aithos-lara) waarin Claude Opus 4.7 als enige boven 50% EU-compliance scoorde.

## Bronnen

- [Anthropic — Introducing Claude Opus 4.8](https://www.anthropic.com/news/claude-opus-4-8) — officiële aankondiging met benchmarks en feature-beschrijving.
- [Anthropic — Series H financieringsronde](https://www.anthropic.com/news/series-h) — context bij de bijna-biljoen-waardering.
- [TechCrunch — Anthropic releases Opus 4.8 with new Dynamic Workflow tool (28 mei 2026)](https://techcrunch.com/2026/05/28/anthropic-releases-opus-4-8-with-new-dynamic-workflow-tool/) — uitleg van de Dynamic Workflows-feature.
- [VentureBeat — Anthropic's Claude Opus 4.8 is here with 3X cheaper fast mode and near-Mythos level alignment](https://venturebeat.com/technology/anthropics-claude-opus-4-8-is-here-with-3x-cheaper-fast-mode-and-near-mythos-level-alignment) — performance- en alignment-context.
- [9to5Mac — Anthropic upgrades Claude with new Opus 4.8 model](https://9to5mac.com/2026/05/28/anthropic-upgrades-claude-with-new-opus-4-8-model-heres-whats-new/) — consumer-perspectief.

<!--
Fact-check log — 2026-05-29
- Release-datum Opus 4.8: 28 mei 2026 (9to5Mac, Axios, Anthropic news)
- Pricing gelijk aan Opus 4.7: VentureBeat bevestigd
- 4x minder code-fouten ongemerkt vs Opus 4.7: 9to5Mac + Anthropic news bevestigd
- Dynamic Workflows research preview in Claude Code, honderden parallelle subagents, verifieert output: TechCrunch bevestigd
- Honesty improvements / "more likely to acknowledge when it lacks sufficient information": 9to5Mac bevestigd
- Series H $65B raise / $965B valuation: AI Radar hetlaatsteainieuws.nl + Tweakers + Anthropic news bevestigd
- Effort-slider op claude.ai: 9to5Mac bevestigd
- Cross-link Aithos LARA: eigen artikel hetlaatsteainieuws.nl/regelgeving/chatgpt-claude-gemini-overtreden-eu-wet-aithos-lara (29 mei 2026)
-->
