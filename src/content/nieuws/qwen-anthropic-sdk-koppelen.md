---
title: "Qwen 3.7-Max gebruiken met je bestaande Anthropic-SDK: zo zet je het om"
heroImageAlt: "Miniatuur diorama-illustratie bij artikel 'Qwen 3.7-Max gebruiken met je bestaande Anthropic-SDK: zo zet je het om'"
description: "Qwen 3.7-Max spreekt zowel de OpenAI- als de Anthropic-API. Zo laat je code die voor Claude is geschreven op Alibaba's model draaien, zonder herschrijven."
publishedAt: 2026-08-21
updatedAt: 2026-08-21
author: "Redactie"
category: "gids"
tags:
  - "qwen"
  - "alibaba"
  - "anthropic-api"
  - "llm"
  - "api"
  - "kosten"
toolSlug: "qwen"
featured: false
draft: false
readingTime: 4
heroImage: "/images/articles/diorama-qwen-anthropic-sdk-koppelen.webp"
heroScene: "Two miniature plugs of different shapes joined by a small adapter block on a workbench"
keyTakeaways:
  - "Qwen 3.7-Max is compatibel met zowel de OpenAI- als de Anthropic-API-specificatie."
  - "Bestaande Anthropic-client-SDK's werken tegen Alibaba Cloud Model Studio met minimale aanpassingen: base-URL, sleutel en modelnaam."
  - "Op Model Studio kost het model 2,50 dollar per miljoen invoertokens en 7,50 per miljoen uitvoertokens; gecachete invoer 0,25 dollar."
  - "Het contextvenster is 1 miljoen tokens, met een maximale output van 131.072 tokens."
  - "Test altijd eerst je tool-calls: protocol-compatibel betekent niet dat het gedrag identiek is."
faq:
  - q: "Werkt de Anthropic SDK echt met Qwen?"
    a: "Ja. Qwen 3.7-Max is compatibel met zowel de OpenAI-API-specificatie als de Anthropic-API-specificatie, en je kunt Anthropic-client-SDK's met minimale aanpassingen tegen Alibaba Cloud Model Studio gebruiken. In de praktijk wijzig je drie dingen: de base-URL, de API-sleutel en de modelnaam. De rest van je aanroepcode blijft staan. Test wel je tool-calls apart, want protocol-compatibiliteit garandeert geen identiek gedrag."
  - q: "Wat kost Qwen 3.7-Max per miljoen tokens?"
    a: "Rechtstreeks via Alibaba Cloud Model Studio betaal je 2,50 dollar per miljoen invoertokens en 7,50 dollar per miljoen uitvoertokens, met gecachete invoer op 0,25 dollar per miljoen. Via OpenRouter liggen de tarieven lager, rond 1,48 dollar invoer en 4,43 dollar uitvoer per miljoen tokens. Controleer de actuele prijs altijd op de pagina van de aanbieder, want tarieven bij Chinese aanbieders wijzigen regelmatig."
  - q: "Hoe groot is het contextvenster van Qwen 3.7-Max?"
    a: "Qwen 3.7-Max heeft een contextvenster van 1 miljoen tokens en een maximale output van 131.072 tokens. Dat maakt het geschikt voor taken waarbij je hele codebases, lange documentenbundels of complete gespreksgeschiedenissen in één aanroep meestuurt. Houd er wel rekening mee dat je bij die volumes snel aan de invoerkosten zit, ook al is de prijs per token laag."
  - q: "Kan ik Qwen ook zelf hosten in plaats van via de API?"
    a: "De open-weight modellen wel, de topmodellen niet. De Qwen3-lijn staat onder Apache 2.0 en draai je zelf via Ollama, vLLM of Hugging Face. Qwen3.7-Max en Qwen3.7-Plus zijn proprietary en alleen via de Alibaba Cloud-API beschikbaar. Wil je data-soevereiniteit, kies dan een open-weight model; wil je de sterkste prestaties, dan zit je aan de API vast."
  - q: "Is Qwen geschikt voor Nederlandstalige toepassingen?"
    a: "Deels. De Qwen-familie scoort sterk op meertalige benchmarks en Qwen3.5 ondersteunt 201 talen, maar voor taken die maximale Nederlandse nuance vragen zijn westerse modellen zoals Mistral en Claude doorgaans sterker. Voor code, gestructureerde extractie en vertaalwerk is Qwen vaak ruim voldoende. Test op je eigen materiaal voordat je overstapt."
---

# Qwen 3.7-Max gebruiken met je bestaande Anthropic-SDK: zo zet je het om

Je hebt een agent gebouwd op de Anthropic SDK en je wilt weten wat een goedkoper model doet met dezelfde code. Meestal betekent dat herschrijven. Bij Qwen 3.7-Max niet: het model spreekt naast de OpenAI-specificatie ook de Anthropic-API-specificatie. Drie regels aanpassen en je draait.

## Wat "Anthropic-compatibel" hier betekent

Alibaba biedt Qwen 3.7-Max aan via Alibaba Cloud Model Studio met een endpoint dat de Anthropic-API-vorm nabootst. Je bestaande Anthropic-client-SDK praat daar met minimale aanpassingen tegen ([Bron: OpenRouter](https://openrouter.ai/qwen/qwen3.7-max)).

Praktisch verander je drie dingen:

1. De **base-URL** wijst naar het Anthropic-compatibele endpoint van Model Studio in plaats van naar api.anthropic.com.
2. De **API-sleutel** wordt je Model Studio-sleutel.
3. De **modelnaam** wordt `qwen3.7-max` in plaats van een Claude-model.

De exacte base-URL haal je uit de Model Studio-documentatie bij je eigen regio; die verschilt per datacenter, dus neem hem niet over uit een blogpost.

> **⚡ Gevorderden:** Protocol-compatibel is niet gedrag-compatibel. Tool-calling, gestructureerde output en het omgaan met system prompts kunnen subtiel afwijken. Draai je bestaande testsuite volledig voordat je iets in productie zet, en let vooral op de vorm waarin tool-argumenten terugkomen.

## Stap voor stap

**Stap 1 — Maak een Model Studio-account en sleutel.** Je hebt een Alibaba Cloud-account nodig. Genereer daar een API-sleutel en zet hem in je omgevingsvariabelen, niet in je code.

**Stap 2 — Wijs de client naar het nieuwe endpoint.** In vrijwel elke Anthropic-SDK kun je bij het aanmaken van de client een alternatieve base-URL en sleutel meegeven. Dat is het enige constructiepunt dat je aanraakt.

**Stap 3 — Zet de modelnaam om.** Vervang je Claude-modelstring door `qwen3.7-max`. Heb je die string op meerdere plekken staan, trek hem dan eerst naar één constante.

**Stap 4 — Draai een rooktest.** Stuur één simpele prompt en één prompt met een tool-call. De eerste bewijst dat de verbinding staat, de tweede of je agent-logica overeind blijft.

**Stap 5 — Meet je kosten opnieuw.** Reken met de actuele tarieven en je eigen tokenverbruik, niet met een vuistregel uit een vergelijkingsartikel.

## Wat het kost en wat je ervoor krijgt

Rechtstreeks via Alibaba Cloud Model Studio betaal je 2,50 dollar per miljoen invoertokens en 7,50 dollar per miljoen uitvoertokens, met gecachete invoer op 0,25 dollar per miljoen. Via OpenRouter liggen de tarieven lager, rond 1,48 dollar invoer en 4,43 dollar uitvoer ([Bron: OpenRouter](https://openrouter.ai/qwen/qwen3.7-max)).

Daar krijg je een contextvenster van 1 miljoen tokens voor terug, met een maximale output van 131.072 tokens. Dat is ruim genoeg voor hele codebases of documentbundels in één aanroep. Let wel op: bij die volumes tikken de invoerkosten hard aan, ook bij een lage prijs per token. Prompt-caching is dan geen optimalisatie maar noodzaak.

Wil je helemaal geen API-kosten en accepteer je zwakkere prestaties, dan is de open-weight-route een alternatief. De Qwen3-lijn staat onder Apache 2.0 en draait via Ollama of vLLM op je eigen hardware. Onze gids [Een AI-agent draaien die je data nooit verlaat](/nieuws/ollama-ai-agent-lokaal-offline-privacy) loopt die opzet door.

> **💡 Beginner-tip:** Bouw je je eerste koppeling? Begin met OpenRouter in plaats van een Alibaba Cloud-account. Je hoeft dan geen aparte cloudregistratie te doorlopen en kunt met dezelfde sleutel meerdere modellen naast elkaar proberen.

## De afweging die je bewust moet maken

Chinese herkomst is voor veel Nederlandse organisaties een compliance-vraag, niet alleen een technische. Waar je data verwerkt wordt, welke jurisdictie daarop van toepassing is en of je opdrachtgever daarmee akkoord gaat: dat regel je vooraf, niet nadat je model in productie staat. Er speelt bovendien een politieke laag, waarover hetlaatsteainieuws.nl schreef in [Verbod op Chinese open AI-modellen in de VS](https://hetlaatsteainieuws.nl/nieuws/vs-verbod-chinese-open-ai-modellen).

Voor interne experimenten, code-taken en vertaalwerk is dat zelden een blokkade. Voor klantdata in een gereguleerde sector wel. Maak die keuze aan het begin, want een model wisselen kost je bij deze opzet vijf minuten, en een compliance-traject terugdraaien niet.

## Checklist: ben je klaar?

- [ ] Model Studio-account aangemaakt en API-sleutel in je omgevingsvariabelen gezet
- [ ] Base-URL uit de officiële Model Studio-documentatie gehaald, passend bij jouw regio
- [ ] Modelnaam op één plek in je code gedefinieerd
- [ ] Rooktest met een gewone prompt geslaagd
- [ ] Rooktest met een tool-call geslaagd en de argumentvorm gecontroleerd
- [ ] Je volledige testsuite groen op het nieuwe model
- [ ] Kostenraming gemaakt met je eigen tokenverbruik, inclusief caching
- [ ] Compliance-vraag over dataverwerking beantwoord voordat er klantdata doorheen gaat

## Bronnen

- [OpenRouter — Qwen3.7 Max: pricing en specificaties](https://openrouter.ai/qwen/qwen3.7-max) — contextvenster, maximale output en actuele tarieven
- [Qwen — officiële modelblog](https://qwenlm.github.io) — releases, modelvarianten en licenties
- [Alibaba Cloud Model Studio](https://www.alibabacloud.com/product/modelstudio) — endpoints, regio's en API-documentatie
