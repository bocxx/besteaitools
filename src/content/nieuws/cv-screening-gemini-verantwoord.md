---
title: "CV's screenen met Gemini: verantwoord gebruik en de grenzen"
description: "Gemini helpt je een stapel cv's sneller te lezen. Zo zet je het in als leesassistent, kies je de juiste omgeving en laat je het selecteren aan een mens over."
publishedAt: 2026-10-07
updatedAt: 2026-10-07
author: "Redactie"
category: "gids"
tags:
  - "gemini"
  - "cv-screening"
  - "werving-en-selectie"
  - "eu-ai-act"
  - "avg"
  - "verantwoorde-ai"
toolSlug: "gemini"
featured: false
draft: false
readingTime: 6
heroImage: "/images/articles/diorama-cv-screening-gemini-verantwoord.webp"
heroImageAlt: "Miniatuur diorama-illustratie bij artikel 'CV's screenen met Gemini: verantwoord gebruik en de grenzen'"
heroScene: "A tidy wooden desk with a stack of paper CVs, a magnifying glass and a brass desk bell"
evergreen: true
volatility: medium
factsCheckedAt: 2026-10-07
watch:
  - "eu-ai-act-hoog-risico"
  - "gemini-privacy"
  - "gemini-modellen"
keyTakeaways:
  - "Gemini is bruikbaar als leesassistent voor cv's: samenvatten, structureren en naast de vacature leggen. Wie doorgaat, beslis jij."
  - "Plak geen echte cv's in de consumentenversie van de Gemini-app: daar kunnen chats bij ingeschakelde activiteit worden gelezen en gebruikt voor training."
  - "In Gemini voor Google Workspace gelden prompts als klantdata onder Googles verwerkersvoorwaarden en worden ze niet voor training of menselijke review gebruikt."
  - "AI die sollicitaties analyseert, filtert of kandidaten beoordeelt valt in de AI Act onder hoog risico; die eisen gelden vanaf 2 december 2027."
  - "De AVG geldt nu al: geen volledig geautomatiseerde afwijzingen, sollicitanten informeren en bij profilering vooraf een DPIA overwegen."
faq:
  - q: "Mag ik cv's van sollicitanten in Gemini zetten?"
    a: "Alleen in een omgeving waar je afspraken over de gegevens hebt. Een cv staat vol persoonsgegevens, dus de AVG geldt. In de gratis consumentenversie van de Gemini-app kan Google chats bij ingeschakelde activiteit laten beoordelen en gebruiken om modellen te verbeteren. Gebruik daarom een zakelijk Google Workspace-account met Gemini, of de betaalde API. Vertel sollicitanten vooraf dat je AI inzet en waarvoor."
  - q: "Mag Gemini sollicitanten afwijzen of rangschikken?"
    a: "Laat dat niet aan Gemini over. Onder de AVG heeft iemand het recht niet te worden onderworpen aan een besluit dat uitsluitend geautomatiseerd tot stand komt en hem aanmerkelijk treft; de AVG noemt werving zonder menselijke tussenkomst daarbij als voorbeeld. Daarnaast valt AI die sollicitaties filtert of kandidaten beoordeelt onder de hoog-risico-categorie van de AI Act. Een mens moet het besluit echt nemen, niet alleen aftekenen."
  - q: "Wanneer gelden de AI Act-regels voor AI in werving?"
    a: "De hoog-risico-verplichtingen voor wervings-AI uit bijlage III gelden vanaf 2 december 2027. De oorspronkelijke datum was 2 augustus 2026, maar die is verschoven door de Digital Omnibus on AI, Verordening (EU) 2026/1744. De transparantieplicht en de AI-geletterdheidsplicht zijn niet uitgesteld. Voor de actuele data: zie de box 'Stand van zaken' onderaan."
  - q: "Welk Gemini-model gebruik ik voor het lezen van cv's?"
    a: "Voor samenvatten en structureren volstaat een snel Flash-model; een zwaarder Pro-model is zelden nodig. Belangrijker dan het model is de omgeving: een zakelijk account of betaalde API, zodat de gegevens onder verwerkersvoorwaarden vallen. Welke modellen er op dit moment beschikbaar zijn, staat in de box 'Stand van zaken' onderaan."
sources:
  - label: "Verordening (EU) 2024/1689 — AI Act, bijlage III"
    url: "https://artificialintelligenceact.eu/annex/3/"
  - label: "Verordening (EU) 2026/1744 — Digital Omnibus on AI (EUR-Lex)"
    url: "https://eur-lex.europa.eu/eli/reg/2026/1744/oj/eng"
  - label: "White & Case — EU AI Omnibus enters into force"
    url: "https://www.whitecase.com/insight-alert/eu-ai-omnibus-enters-force-amending-ai-act"
  - label: "Google — Gemini Apps Privacy Hub"
    url: "https://support.google.com/gemini/answer/13594961?hl=en"
  - label: "Google — Generative AI in Google Workspace Privacy Hub"
    url: "https://support.google.com/a/answer/15706919?hl=en"
  - label: "Google — Gemini API Additional Terms of Service"
    url: "https://ai.google.dev/gemini-api/terms"
  - label: "Autoriteit Persoonsgegevens — lijst DPIA-verplichte verwerkingen (Staatscourant 2019, 64418)"
    url: "https://zoek.officielebekendmakingen.nl/stcrt-2019-64418.html"
---

Een vacature levert al snel tientallen cv's op, en die allemaal grondig lezen kost een middag. [Gemini](/ai-tools/gemini) kan dat voorwerk verlichten: documenten samenvatten, de kern eruit halen en naast je vacaturetekst leggen. De truc is om het als leesassistent in te zetten, niet als rechter. Hieronder staat hoe je dat opzet, in welke omgeving, en waar de wet een grens trekt.

## Wat Gemini wél goed kan

Gemini leest en ordent tekst snel, ook uit PDF's. Voor een sollicitatieronde betekent dat:

- **Samenvatten:** een cv in vijf regels, zodat je ziet waar iemand vandaan komt.
- **Structureren:** opleiding, werkervaring en vaardigheden uit een rommelig cv in een vast format zetten.
- **Vergelijken met de vacature:** welke gevraagde vaardigheden zie je terug, en welke ontbreken?
- **Vragen voorbereiden:** drie gerichte gespreksvragen op basis van het cv.

Dat is voorbereidend werk. Jij leest sneller en consistenter, en de afweging blijft bij jou.

> **💡 Beginner-tip:** Nog nooit met Gemini gewerkt? Begin bij [Gemini gebruiken in 5 stappen](/nieuws/gemini-gebruiken-5-stappen) en kom daarna terug.

## Eerst de omgeving, dan de prompt

Waar je de cv's in plakt, is belangrijker dan welk model je kiest. Google hanteert per product andere dataregels.

In de consumentenversie van de Gemini-app gebruikt Google je activiteit, zolang de instelling *Activiteit bewaren* aanstaat, om diensten te verbeteren, inclusief het trainen van generatieve AI-modellen. Een deel van de chats wordt door menselijke reviewers gelezen. Google raadt zelf af om vertrouwelijke gegevens in te voeren ([Bron: Gemini Apps Privacy Hub](https://support.google.com/gemini/answer/13594961?hl=en)). Andermans sollicitatie hoort daar dus niet in.

In Gemini voor Google Workspace ligt het anders. Prompts gelden daar als klantdata onder Googles verwerkersvoorwaarden (de Cloud Data Processing Addendum), worden niet voor modeltraining gebruikt en niet door mensen beoordeeld ([Bron: Google Workspace Privacy Hub](https://support.google.com/a/answer/15706919?hl=en)). Werk je met de Gemini API, dan gebruikt Google bij betaald gebruik je prompts niet om producten te verbeteren ([Bron: Gemini API Terms](https://ai.google.dev/gemini-api/terms)).

Een zakelijke omgeving lost niet alles op. Je blijft verwerkingsverantwoordelijke, en sollicitanten horen vooraf te weten dat je AI gebruikt en waarvoor.

## Zo zet je het op in vijf stappen

1. **Kies een zakelijke omgeving.** Een Workspace-account met Gemini, of de betaalde API. Geen privé-account.
2. **Geef context.** Plak eerst de vacaturetekst en schrijf erbij waar je op let: "minimaal drie jaar ervaring met projectplanning, goede schriftelijke vaardigheden".
3. **Eén cv tegelijk.** Vraag om een samenvatting plus een lijstje "sluit aan op" en "zie ik niet terug". Haal vooraf gegevens weg die je niet nodig hebt, zoals foto, geboortedatum en adres.
4. **Vraag door in plaats van in te vullen.** Mist er iets, vraag dan gericht: "staat er iets over leidinggeven?" Laat Gemini niets aanvullen wat niet in het cv staat.
5. **Leg je eigen keuze vast.** Noteer per kandidaat waarom je wel of niet uitnodigt. Dat helpt als een sollicitant later vraagt hoe het besluit tot stand kwam.

> **⚡ Gevorderden:** Vraag om observaties ("deze ervaring sluit aan op eis 3"), niet om een vonnis ("score 7/10"). Een score die je overneemt, maakt van een leesassistent een beoordelaar, en daarmee verschuif je juridisch van categorie.

## Waar de grens ligt

**De AVG geldt nu al.** Iemand heeft het recht niet te worden onderworpen aan een besluit dat uitsluitend op geautomatiseerde verwerking berust en hem aanmerkelijk treft. De AVG noemt het online verwerken van sollicitaties zonder menselijke tussenkomst daarbij als voorbeeld ([Bron: AVG, overweging 71](https://eur-lex.europa.eu/eli/reg/2016/679/oj)). Volgens de Autoriteit Persoonsgegevens moet die menselijke tussenkomst betekenisvol zijn: de beoordelaar moet kunnen inschatten of de uitkomst klopt en begrijpen hoe die tot stand kwam ([Bron: AP-advies artikel 22 AVG](https://www.eerstekamer.nl/overig/20241025/advies_artikel_22_avg_en/document)). Een mens die alleen aftekent wat Gemini voorstelt, telt niet.

Ga je kandidaten systematisch laten beoordelen, dan kan een DPIA verplicht zijn. De AP-lijst noemt profilering, zoals het geautomatiseerd beoordelen van beroepsprestaties of betrouwbaarheid ([Bron: Staatscourant 2019, 64418](https://zoek.officielebekendmakingen.nl/stcrt-2019-64418.html)). Twijfel je, vraag dan je privacyadviseur of functionaris gegevensbescherming.

**Selecteren is hoog risico.** Bijlage III van de AI Act noemt AI die bedoeld is voor het analyseren en filteren van sollicitaties en het beoordelen van kandidaten als hoog-risico-toepassing ([Bron: AI Act, bijlage III](https://artificialintelligenceact.eu/annex/3/)). Een systeem dat natuurlijke personen profileert, valt altijd in die categorie ([Bron: AI Act, artikel 6](https://artificialintelligenceact.eu/article/6/)). Let op een minder bekend punt: wie een algemeen AI-systeem zoals Gemini zelf voor een hoog-risico-doel inzet, kan daarmee als aanbieder worden aangemerkt, met het zwaardere pakket verplichtingen dat daarbij hoort ([Bron: AI Act, artikel 25](https://artificialintelligenceact.eu/article/25/)). Of jouw gebruik daaronder valt, hangt af van hoe je het precies inzet. Bij twijfel is juridisch advies geen overbodige luxe.

De hoog-risico-eisen voor wervings-AI gelden vanaf 2 december 2027. Ze zijn verschoven door Verordening (EU) 2026/1744, die op 27 juli 2026 in werking trad ([Bron: White & Case](https://www.whitecase.com/insight-alert/eu-ai-omnibus-enters-force-amending-ai-act)). Wat er nu al geldt voor werkgevers, zet AI Platform MKB op een rij in [AI Act en HR: wat nu al geldt voor je werving](https://www.aiplatformmkb.nl/regelgeving/ai-act-hr-werving-deadlines). Hoe het er van de andere kant van de tafel uitziet, lees je bij hetlaatsteainieuws.nl: [Afgewezen door AI: mag een algoritme je sollicitatie weigeren?](https://www.hetlaatsteainieuws.nl/regelgeving/afgewezen-door-ai-sollicitatie-rechten)

## Kort samengevat

Gemini is een goede leesassistent voor een stapel cv's: samenvatten, structureren, spiegelen aan je vacature. Gebruik een zakelijke omgeving, wees open naar sollicitanten, en laat rangschikken en afwijzen aan een mens. Sollicitanten die zelf met AI hun cv op je vacature afstemmen, bestaan trouwens ook, zie [ChatGPT je cv laten afstemmen op een vacature](/nieuws/chatgpt-cv-afstemmen-op-vacature). Een reden te meer om naar de inhoud te kijken en niet naar trefwoorden.

## Stand van zaken — bijgewerkt 2026-10-07

De uitleg hierboven blijft staan. Wat hieronder staat, verandert met nieuwe regels en modellen.

| Onderwerp | Stand |
| --- | --- |
| AI Act, hoog-risico bijlage III (o.a. werving) | Geldt vanaf 2 december 2027 (was 2 augustus 2026) ([Bron: EUR-Lex](https://eur-lex.europa.eu/eli/reg/2026/1744/oj/eng)) |
| AI Act, transparantieplicht artikel 50 | Geldt sinds 2 augustus 2026, niet uitgesteld |
| AI Act, AI-geletterdheid artikel 4 | Geldt sinds 2 februari 2025; per 27 juli 2026 verzacht tot "maatregelen ter ondersteuning" |
| Indelingsrichtsnoeren hoog-risico | Concept van de Europese Commissie sinds 19 mei 2026; definitieve versie nog niet gepubliceerd ([Bron: Europese Commissie](https://digital-strategy.ec.europa.eu/en/library/draft-commission-guidelines-classification-high-risk-ai-systems)) |
| Gemini-modellen (API) | Nieuwste stabiele Flash: Gemini 3.8 Flash; Flash-Lite: Gemini 3.5 Flash-Lite; Gemini 3.1 Pro is nog preview ([Bron: Gemini API models](https://ai.google.dev/gemini-api/docs/models)). Zie ook [Gemini 3.8 Flash in de API](/nieuws/gemini-3-8-flash-overstappen-api) |
| Gemini API in de EER | Voor gebruikers in de EER, Zwitserland en het VK gelden de dataregels van betaald gebruik ook voor Google AI Studio en het gratis API-quotum |

## Bronnen

- [AI Act, bijlage III](https://artificialintelligenceact.eu/annex/3/): de hoog-risico-domeinen, waaronder werving en selectie
- [Verordening (EU) 2026/1744 op EUR-Lex](https://eur-lex.europa.eu/eli/reg/2026/1744/oj/eng): de Digital Omnibus on AI met de nieuwe data
- [Google Workspace Privacy Hub](https://support.google.com/a/answer/15706919?hl=en): dataverwerking van Gemini in Workspace
- [Gemini Apps Privacy Hub](https://support.google.com/gemini/answer/13594961?hl=en): dataverwerking in de consumentenversie
- [Gemini API Additional Terms](https://ai.google.dev/gemini-api/terms): betaald versus onbetaald gebruik, en de EER-regel
