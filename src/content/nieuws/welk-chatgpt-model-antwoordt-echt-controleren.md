---
title: "Welk ChatGPT-model antwoordt écht? Zo controleer je het"
description: "Betalende ChatGPT-gebruikers melden sinds juli dat hun antwoord stiekem van een mini-model komt. Vragen aan de chatbot helpt niet. Zo lees je in 2 minuten uit welk model je werkelijk kreeg."
publishedAt: 2026-08-22
updatedAt: 2026-08-22
author: "Redactie"
category: "gids"
tags:
  - "chatgpt"
  - "openai"
  - "gpt-5-6"
  - "model-routing"
  - "abonnement"
  - "troubleshooting"
toolSlug: "chatgpt"
featured: false
draft: false
readingTime: 4
heroScene: "A small chrome robot holds a magnifying glass over a name tag pinned to a much larger, sleepy-looking robot, while a discarded second name tag lies on the workbench beside a receipt"
heroImage: "/images/articles/diorama-welk-chatgpt-model-antwoordt-echt-controleren.webp"
heroImageAlt: "Miniatuur diorama-illustratie bij artikel 'Welk ChatGPT-model antwoordt écht? Zo controleer je het'"
keyTakeaways:
  - "Betalende Plus-, Pro- en Business-gebruikers melden sinds juli dat een gekozen GPT-5.6-model antwoordt via GPT-5.5-mini."
  - "Vraag het niet aan ChatGPT zelf: modellen weten hun eigen naam vaak niet en raden ernaar."
  - "De betrouwbare check zit in het netwerkverkeer van je browser: zoek het veld model_slug in het antwoord."
  - "OpenAI heeft de klachten niet publiek bevestigd. Meld je geval via support met een screenshot van dat veld."
faq:
  - q: "Waarom kan ik ChatGPT niet gewoon vragen welk model het is?"
    a: "Omdat een taalmodel geen betrouwbare kennis heeft over zichzelf. De modelnaam zit niet in de gewichten; wat het model erover zegt komt uit de systeemprompt of uit een gok op basis van trainingsdata. Daarom noemt een model zich soms bij een oudere versienaam, of andersom. In de gemelde routing-gevallen zei het antwoord toevallig wél correct 'The current model is GPT-5.5-mini', maar dat is geluk, geen bewijsmiddel. Kijk naar het netwerkverkeer als je zekerheid wilt."
  - q: "Wat is model_slug en waar vind ik het?"
    a: "model_slug is het veld in het antwoord van de ChatGPT-server waarin staat welk model de tekst heeft gegenereerd, bijvoorbeeld gpt-5-6-pro of gpt-5-5-mini. Je vindt het in het netwerktabblad van de ontwikkelaarstools van je browser (F12 of Ctrl+Shift+I, op Mac Cmd+Option+I). Open het tabblad Network, stel een vraag in ChatGPT, en open het verzoek naar de conversation-endpoint. In het antwoord zoek je op 'model_slug'. Staat daar iets anders dan wat je koos, dan heb je bewijs."
  - q: "Wat doe ik als blijkt dat ik een lager model krijg?"
    a: "Maak eerst een screenshot van het model_slug-veld naast je modelkeuze in de interface. Probeer daarna een andere browser: gebruikers melden dat dezelfde account in Chrome naar GPT-5.5-mini viel terwijl Edge wel op GPT-5.6 bleef. Helpt dat niet, dien dan een supportmelding in via help.openai.com met je screenshot, je plan en de datum. Vraag om een casenummer, zodat je iets in handen hebt als het maanden aansleept."
  - q: "Is dit een officieel bevestigde storing?"
    a: "Nee. Op het moment van schrijven, 22 augustus 2026, gaat het om meldingen van gebruikers op het OpenAI Developer Community-forum en losse berichten op X en Reddit. OpenAI heeft geen publieke verklaring afgegeven en de statuspagina toont geen bijbehorende storing. De meldingen zijn wel talrijk, lopen sinds ongeveer half juli en komen van betalende Plus-, Pro- en Business-gebruikers. Behandel het dus als een reëel signaal om zelf te controleren, niet als vaststaand feit."
---

Sinds ongeveer half juli lopen op het OpenAI-forum meldingen binnen van betalende ChatGPT-gebruikers die zeggen dat ze niet krijgen waarvoor ze betalen. Ze kiezen GPT-5.6 Pro of GPT-5.6 Thinking, en het antwoord blijkt van GPT-5.5-mini te komen.

Een Plus-gebruiker postte op 22 augustus een debugpaneel waarin het staat: request model gpt-5-6-thinking, response routing gpt-5-5-mini. Een Pro-abonnee liet in zijn netwerklog zien dat zijn abonnementsniveau correct doorkwam terwijl het teruggegeven model een mini-variant was. Een Business-gebruiker meldde dat dezelfde account in Chrome naar mini viel en in Edge niet.

OpenAI heeft er niets over gezegd. Dat maakt zelf controleren de enige optie. Het kost twee minuten.

## Stap 1: vraag het niet aan ChatGPT

De verleiding is groot om gewoon "welk model ben jij?" te typen. Doe dat niet als bewijs.

Een taalmodel weet zijn eigen naam niet. Die informatie zit niet in het model zelf, maar hooguit in de systeemprompt die eromheen staat. Ontbreekt die, dan raadt het model op basis van zijn trainingsdata — en die loopt per definitie achter. Modellen noemen zichzelf regelmatig bij een verkeerde versie, in beide richtingen.

> **💡 Beginner-tip:** dit is een van de weinige vragen waarop een chatbot structureel onbetrouwbaar is, terwijl het antwoord juist heel stellig klinkt. Vertrouw hier op wat de server zegt, niet op wat het model zegt.

## Stap 2: lees model_slug uit het netwerkverkeer

Dit is de check die telt.

1. Open ChatGPT in je browser en druk op **F12** (Mac: **Cmd + Option + I**) om de ontwikkelaarstools te openen.
2. Ga naar het tabblad **Network** en laat het openstaan.
3. Kies je model in ChatGPT en stel een vraag.
4. Zoek in de lijst het verzoek naar de conversation-endpoint en open het antwoord.
5. Zoek in de inhoud op **`model_slug`**.

Daar staat de naam van het model dat het antwoord heeft geproduceerd, bijvoorbeeld `gpt-5-6-pro` of `gpt-5-5-mini`. Komt dat niet overeen met wat je in de interface hebt gekozen, dan heb je een concreet, deelbaar bewijs.

## Stap 3: test of het aan je browser ligt

Een van de meldingen wijst op een browserverschil: dezelfde account, dezelfde workspace, hetzelfde gesprek, en toch een andere uitkomst in Chrome dan in Edge.

Dat kost weinig moeite om na te lopen. Open ChatGPT in een tweede browser, stel dezelfde vraag met hetzelfde gekozen model, en herhaal de model_slug-check. Zie je daar wél het juiste model, dan heb je in elk geval een werkende route terwijl je wacht op een oplossing.

## Stap 4: meld het met bewijs

Een supportmelding zonder screenshot verdwijnt in de stapel. Stuur mee:

- Een screenshot van je modelkeuze in de interface
- Een screenshot van het `model_slug`-veld uit het netwerkverkeer
- Je abonnementsvorm en de datum en tijd van het gesprek

Dien het in via help.openai.com en vraag expliciet om een casenummer. Meerdere melders op het forum zitten inmiddels een maand of langer met hetzelfde probleem; een referentienummer is dan het verschil tussen opvolgbaar en zoek.

## Waarom dit los van deze storing de moeite waard is

Modelrouting is geen bug maar een ontwerpkeuze: ChatGPT stuurt verzoeken naar het model dat volgens OpenAI bij de vraag past, ook binnen betaalde plannen. Dat is meestal prettig, want het scheelt wachttijd op eenvoudige vragen.

Het wordt pas een probleem wanneer je expliciet iets zwaarders kiest en toch het lichte model krijgt. Wie regelmatig op ChatGPT leunt voor werk waar kwaliteit telt, doet er goed aan die check af en toe te doen, ook als er niets aan de hand lijkt. Twee minuten per maand is een lage prijs voor de zekerheid dat je abonnement doet wat het belooft.

## Bronnen

- [OpenAI Developer Community — I need to report a model routing issue / silent downgrade](https://community.openai.com/t/i-need-to-report-a-model-routing-issue-silent-downgrade/1391776) (22 augustus 2026)
- [OpenAI Developer Community — 5.6 pro model has been automatically downgraded and routed to the 5.5 mini model since its release](https://community.openai.com/t/5-6-pro-model-has-been-automatically-downgraded-and-routed-to-the-5-5-mini-model-since-its-release/1387941)
- [OpenAI Developer Community — Browser-specific GPT-5.6 routing mismatch: Chrome resolves to GPT-5.5-mini, Edge stays on GPT-5.6](https://community.openai.com/t/browser-specific-gpt-5-6-routing-mismatch-chrome-resolves-to-gpt-5-5-mini-edge-stays-on-gpt-5-6-case-13542447/1391598) (22 augustus 2026)
- [OpenAI Developer Community — ChatGPT is silently downgrading to mini models](https://community.openai.com/t/chatgpt-is-silently-downgrading-to-mini-models/1390114) (16 augustus 2026)
