---
title: "RAG of fine-tunen: zo kies je voor je eigen bedrijfsdata"
description: "Wil je dat een AI-model jouw bedrijfskennis gebruikt? Kies tussen RAG, fine-tunen of alles in de prompt. Vijf vragen bepalen welke aanpak bij je past."
publishedAt: 2026-10-07
updatedAt: 2026-10-07
author: "Redactie"
category: "gids"
tags:
  - "rag"
  - "fine-tuning"
  - "together-ai"
  - "llm"
  - "bedrijfsdata"
  - "mkb"
toolSlug: "together-ai"
featured: false
draft: false
readingTime: 6
heroImage: "/images/articles/diorama-rag-of-fine-tunen-bedrijven.webp"
heroImageAlt: "Miniatuur diorama-illustratie bij artikel 'RAG of fine-tunen: zo kies je voor je eigen bedrijfsdata'"
heroScene: "A wooden crossroads signpost on a small desk, one path leading to a filing cabinet, the other to a workbench with tools"
evergreen: true
volatility: medium
factsCheckedAt: 2026-10-07
watch:
  - "openai-fine-tuning"
  - "together-ai-pricing"
  - "embedding-pricing"
keyTakeaways:
  - "RAG geeft een model per vraag de juiste documenten mee; fine-tunen past het model zelf aan. Voor feitenkennis die verandert is RAG bijna altijd de betere keus."
  - "Fine-tunen loont vooral voor vorm: een vaste toon, een strak uitvoerformaat, of een klein goedkoop model dat één taak heel goed doet."
  - "Past je hele kennisbank in het contextvenster (bij Claude: onder ongeveer 200.000 tokens), dan heb je soms geen RAG nodig en volstaat alles in de prompt."
  - "De twee zijn te combineren: technieken als RAFT trainen een model specifiek om beter met opgehaalde documenten om te gaan."
  - "OpenAI bouwt zijn self-serve fine-tuning af; wie wil fine-tunen, komt steeds vaker uit bij open-weight modellen via platforms als Together AI."
faq:
  - q: "Wat is het verschil tussen RAG en fine-tunen?"
    a: "Bij fine-tunen train je een bestaand taalmodel verder op jouw voorbeelden, waardoor de gewichten van het model veranderen. Bij RAG blijft het model ongewijzigd: een zoekstap haalt per vraag de relevante passages uit jouw documenten en geeft die mee in de prompt. Fine-tunen verandert dus hoe een model antwoordt, RAG verandert wat het op dat moment weet."
  - q: "Is fine-tunen goedkoper dan RAG?"
    a: "De trainingsrun zelf is bij kleine open modellen vaak goedkoper dan je denkt, zie de Stand van zaken onderaan. De echte kosten zitten in het samenstellen van goede trainingsdata, opnieuw trainen bij elke kenniswijziging en het hosten van je eigen modelversie. RAG kost vooral wat aan embeddings en opslag, en een update is niet meer dan een document opnieuw indexeren."
  - q: "Kan ik ChatGPT of Claude fine-tunen op mijn bedrijfsdocumenten?"
    a: "Voor kennis uit documenten is dat zelden de juiste route. OpenAI bouwt zijn self-serve fine-tuning bovendien af: nieuwe organisaties kunnen er niet meer mee starten. Wil je dat ChatGPT of Claude uit je eigen bestanden antwoordt, dan gebruik je RAG, bijvoorbeeld via de ingebouwde bestandsfuncties of een eigen pijplijn met LlamaIndex."
  - q: "Wanneer heb ik helemaal geen RAG nodig?"
    a: "Als je kennisbank klein is. Past alles ruim in het contextvenster van je model, dan kun je de documenten gewoon integraal meegeven, eventueel met prompt caching om kosten te drukken. Anthropic noemt een grens van ongeveer 200.000 tokens, grofweg een paar honderd pagina's tekst. Daarboven, of als je documenten vaak wijzigen, wordt RAG interessant."
sources:
  - label: "Lewis et al. — Retrieval-Augmented Generation for Knowledge-Intensive NLP Tasks (NeurIPS 2020)"
    url: "https://arxiv.org/abs/2005.11401"
  - label: "Ovadia et al. — Fine-Tuning or Retrieval? Comparing Knowledge Injection in LLMs"
    url: "https://arxiv.org/abs/2312.05934"
  - label: "Anthropic — Introducing Contextual Retrieval"
    url: "https://www.anthropic.com/news/contextual-retrieval"
  - label: "OpenAI — Model optimization (fine-tuning)"
    url: "https://developers.openai.com/api/docs/guides/model-optimization"
  - label: "OpenAI — Deprecations"
    url: "https://developers.openai.com/api/docs/deprecations"
  - label: "Together AI — Fine-tuning overview"
    url: "https://docs.together.ai/docs/fine-tuning-overview"
  - label: "Together AI — Pricing"
    url: "https://www.together.ai/pricing"
  - label: "Zhang et al. — RAFT: Adapting Language Model to Domain Specific RAG"
    url: "https://arxiv.org/abs/2403.10131"
---

Je hebt honderden interne documenten: handleidingen, prijslijsten, procedures, contractsjablonen. En je wilt een AI-assistent die daar antwoord uit geeft. De eerste reflex is vaak: "dan trainen we het model toch op onze data?" Dat heet fine-tunen, en voor dit soort vragen is het meestal de verkeerde keuze. Deze gids legt uit waarom, wanneer fine-tunen wél klopt, en hoe je in vijf vragen beslist.

Wat RAG precies is en hoe je het bouwt, lees je elders op deze site: in [RAG zonder te bouwen met ChatGPT](/nieuws/rag-chatgpt-eigen-bedrijfsdata) voor de snelle route, en in [een RAG-chatbot met LlamaIndex](/nieuws/llamaindex-rag-eigen-documenten) voor de technische. Hier gaat het alleen om de keuze.

## Twee manieren om een model iets te leren

**Fine-tunen** betekent dat je een bestaand taalmodel verder traint op jouw voorbeelden. De gewichten van het model veranderen. Bij Together AI gebeurt dat standaard met LoRA, waarbij een kleine set adaptergewichten bovenop het bevroren basismodel wordt getraind ([Bron: Together AI](https://docs.together.ai/docs/fine-tuning-overview)).

**RAG** (retrieval-augmented generation) laat het model ongewijzigd. Een zoekstap haalt per vraag de relevante passages uit jouw documenten en stopt die in de prompt. Het idee komt uit een onderzoek van Lewis en collega's uit 2020 ([Bron: arXiv](https://arxiv.org/abs/2005.11401)).

Het verschil in één zin: fine-tunen verandert hoe een model antwoordt, RAG verandert wat het op dat moment weet.

## Waarom RAG meestal wint voor kennis

Het sterkste argument komt uit onderzoek. Een veelgeciteerde studie vergeleek beide methodes voor het toevoegen van kennis aan een model. Conclusie: ongesuperviseerd fine-tunen leverde bescheiden winst op, terwijl RAG het consequent beter deed, zowel bij kennis die het model al kende als bij volledig nieuwe kennis ([Bron: Ovadia et al.](https://arxiv.org/abs/2312.05934)).

Daarnaast spelen drie praktische punten:

1. **Actualiteit.** Verandert je prijslijst, dan indexeer je bij RAG één document opnieuw. Een gefinetuned model moet je opnieuw trainen.
2. **Controleerbaarheid.** RAG kan laten zien uit welke passage een antwoord komt. Bij fine-tunen zit de kennis verspreid in de gewichten en is niet na te gaan waarom het model iets zegt.
3. **Toegang.** Met RAG kun je per gebruiker bepalen welke documenten meedoen. Een gefinetuned model "weet" alles wat erin is getraind, voor iedereen.

> **💡 Beginner-tip:** Wil je eerst het principe goed snappen voordat je kiest? De uitleg [Wat is RAG? Retrieval-Augmented Generation in gewone taal](https://www.hetlaatsteainieuws.nl/achtergrond/wat-is-rag-uitleg-2026) doet dat zonder code.

## Wanneer fine-tunen wél de juiste keus is

Fine-tunen is niet nutteloos, het lost alleen een ander probleem op. OpenAI noemt als voordelen dat je meer voorbeelden kwijt kunt dan in één prompt past, dat je met kortere prompts tokenkosten bespaart, en dat je een kleiner, goedkoper model één taak heel goed kunt laten doen ([Bron: OpenAI](https://developers.openai.com/api/docs/guides/model-optimization)). Dezelfde gids noemt ook consistente opmaak van antwoorden als toepassing.

Vertaald naar de praktijk: fine-tunen past bij vaste vorm. Denk aan een supportmodel dat altijd in jouw huisstijl schrijft, een classificatie die tickets in exact twaalf categorieën sorteert, of een klein open model dat een vast JSON-formaat uitspuugt tegen een fractie van de kosten van een groot model.

## De vergeten derde optie: alles in de prompt

Voor kleine kennisbanken heb je soms helemaal geen RAG nodig. Anthropic schrijft dat je een kennisbank kleiner dan ongeveer 200.000 tokens gewoon integraal in de prompt kunt zetten, en dat prompt caching dat sneller en goedkoper maakt ([Bron: Anthropic](https://www.anthropic.com/news/contextual-retrieval)). Dat zijn grofweg een paar honderd pagina's tekst. Een handboek van veertig pagina's hoeft dus geen vectordatabase.

## Combineren kan ook

De keuze is niet altijd of-of. Bij RAFT train je een model specifiek om irrelevante opgehaalde documenten te negeren en de ondersteunende passage te citeren ([Bron: arXiv](https://arxiv.org/abs/2403.10131)). Dat is vooral interessant als je een eigen open model draait en je RAG-antwoorden in een smal vakgebied nog niet scherp genoeg zijn.

> **⚡ Gevorderden:** Voordat je aan fine-tunen begint om RAG te verbeteren, kijk eerst naar de zoekstap. Anthropic mat dat het combineren van contextuele embeddings met BM25 (trefwoordzoeken) het aantal mislukte zoekacties met 49 procent verlaagde, en met reranking erbij met 67 procent ([Bron: Anthropic](https://www.anthropic.com/news/contextual-retrieval)). Betere retrieval is bijna altijd goedkoper dan een model hertrainen.

## Beslis in vijf vragen

| Vraag | Ja | Nee |
| --- | --- | --- |
| Gaat het om feiten uit je documenten? | RAG of alles-in-prompt | Lees door |
| Veranderen die documenten vaker dan per kwartaal? | RAG | Beide mogelijk |
| Moet je kunnen aanwijzen waar een antwoord vandaan komt? | RAG | Beide mogelijk |
| Past alles in het contextvenster van je model? | Alles in de prompt | RAG |
| Gaat het om toon, formaat of één smalle taak op grote schaal? | Fine-tunen overwegen | RAG of prompt |

Herken je je vooral in de bovenste vier rijen, dan is RAG je startpunt. Alleen als de onderste rij de kern is, wordt fine-tunen interessant.

## Wat het echt kost

De trainingsrun zelf valt bij kleine open modellen vaak mee. De verborgen kosten zitten elders: honderden tot duizenden goede voorbeelden samenstellen, opnieuw trainen bij elke wijziging en je eigen modelversie hosten. Bij Together AI wordt een dedicated endpoint per minuut afgerekend, zolang het draait ([Bron: Together AI](https://docs.together.ai/docs/fine-tuning/pricing)). RAG kost vooral embeddings en opslag, en die zijn goedkoop: zie de tabel hieronder.

Wil je open modellen fine-tunen, dan is [Together AI](/ai-tools/together-ai) een toegankelijke plek; onze gids [Together AI gebruiken](/nieuws/together-ai-open-source-assistent) helpt je op weg. Welke open modellen er zijn, staat in [ons overzicht van open-weight modellen](/nieuws/open-weight-modellen-lokaal-draaien). Voor een volledig Python-voorbeeld van een RAG-pijplijn met reranking kun je terecht bij [RAG zelf bouwen op AI Platform MKB](https://www.aiplatformmkb.nl/achtergrond/hoe-werkt-rag-uitgelegd).

## Stand van zaken — bijgewerkt 2026-10-07

Alles hierboven blijft staan, ongeacht welk model er draait. De cijfers en versies hieronder zijn de bederfelijke laag.

| Onderwerp | Stand |
| --- | --- |
| OpenAI self-serve fine-tuning | Wordt afgebouwd. Sinds 7 mei 2026 niet beschikbaar voor organisaties die nooit fine-tuneden; op 6 januari 2027 stoppen nieuwe trainingsjobs voor bestaande klanten. Inferentie blijft tot het basismodel verdwijnt ([Bron: OpenAI](https://developers.openai.com/api/docs/deprecations)) |
| OpenAI fine-tune-methodes | SFT en DPO op gpt-4.1 (mini/nano), RFT op o4-mini ([Bron: OpenAI](https://developers.openai.com/api/docs/guides/model-optimization)) |
| Together AI fine-tuning | LoRA (standaard) en volledige fine-tuning, met SFT of DPO ([Bron: Together AI](https://docs.together.ai/docs/fine-tuning-overview)) |
| Together AI prijs | Vanaf $0,34 per miljoen trainingstokens (SFT, Llama 3.1 8B), minimaal $4 per job ([Bron: Together AI](https://www.together.ai/pricing)) |
| Embeddings voor RAG | OpenAI text-embedding-3-small: $0,02 per miljoen tokens ([Bron: OpenAI](https://developers.openai.com/api/docs/models/text-embedding-3-small)) |
| Alles-in-prompt-grens | Ongeveer 200.000 tokens volgens Anthropic ([Bron: Anthropic](https://www.anthropic.com/news/contextual-retrieval)) |
