---
title: "CNN, RNN of transformer? Zo begrijp je de drie AI-architecturen — met Hugging Face als speeltuin"
description: "CNN's zien beelden, RNN's lezen reeksen, transformers wegen context. Dit mentale model helpt je AI-tools kiezen — en op Hugging Face test je het meteen."
publishedAt: 2026-07-15
updatedAt: 2026-07-15
author: "Redactie"
category: "gids"
tags:
  - "huggingface"
  - "transformers"
  - "neurale-netwerken"
  - "deep-learning"
  - "cnn"
  - "rnn"
toolSlug: "huggingface"
featured: false
draft: false
readingTime: 4
heroScene: "Three tiny museum display cases each holding a different miniature machine: a camera lens, a paper tape reel, and a glowing web of threads"
keyTakeaways:
  - "Een CNN herkent patronen in beelden, een RNN verwerkt reeksen stap voor stap, en een transformer weegt alle context tegelijk via attention."
  - "Vrijwel alle bekende AI-tools van nu — ChatGPT, Claude, Gemini — draaien op de transformer-architectuur uit het Google-paper 'Attention Is All You Need' (2017)."
  - "Je hoeft geen model te trainen om dit te snappen: op Hugging Face verken je ruim twee miljoen modellen, gesorteerd op taak en architectuur."
  - "Het architectuur-label op een Hugging Face-modelkaart vertelt je direct waarvoor een model gebouwd is — handig bij het kiezen van een tool of API."
faq:
  - q: "Wat is het verschil tussen een CNN, RNN en transformer?"
    a: "Een CNN (convolutioneel neuraal netwerk) schuift filters over een afbeelding en herkent zo visuele patronen — randen, texturen, objecten. Een RNN (recurrent neuraal netwerk) verwerkt data stap voor stap in volgorde en houdt daarbij een geheugen bij, geschikt voor reeksen zoals tekst of sensordata. Een transformer verwerkt de hele invoer tegelijk en berekent via attention hoe zwaar elk element voor elk ander element meetelt. Die parallelle aanpak schaalde zo goed dat transformers nu de basis vormen van vrijwel alle grote taalmodellen."
  - q: "Waarom gebruiken ChatGPT en Claude de transformer-architectuur?"
    a: "Transformers verwerken tekst parallel in plaats van woord-voor-woord, waardoor ze op enorme datasets getraind kunnen worden. Het attention-mechanisme laat het model bovendien verbanden leggen tussen woorden die ver uit elkaar staan in een tekst. Die combinatie van schaalbaarheid en contextbegrip maakte de architectuur uit het paper 'Attention Is All You Need' (Google, 2017) de standaard voor moderne taalmodellen."
  - q: "Hoeveel modellen staan er op Hugging Face?"
    a: "De Hugging Face Hub telt in 2026 ruim twee miljoen publiek beschikbare modellen. Je filtert er op taak (tekstgeneratie, beeldherkenning, spraak), op architectuur en op licentie. Voor de meeste modellen is er een gratis webdemo of een 'Inference'-knop waarmee je zonder installatie kunt testen wat een model doet."
  - q: "Moet ik deep learning begrijpen om AI-tools te gebruiken?"
    a: "Voor dagelijks gebruik niet. Maar een globaal mentaal model helpt je wél betere keuzes maken: je begrijpt waarom een beeldherkennings-API iets anders is dan een taalmodel, waarom lange documenten context-limieten raken, en wat een leverancier bedoelt met termen als 'transformer-based'. Een paar uur conceptueel lezen bespaart later verkeerde tool-keuzes."
  - q: "Wat is Keras en heb ik het nodig?"
    a: "Keras is een Python-bibliotheek die het bouwen van neurale netwerken sterk vereenvoudigt: in enkele regels definieer je lagen en train je een model. De freeCodeCamp-uitleg gebruikt Keras als laagdrempelige kennismaking. Wil je alleen bestaande modellen gebruiken in plaats van zelf trainen, dan kom je verder met de kant-en-klare modellen en API's op Hugging Face."
---

Pop-quiz van freeCodeCamp, 14 juli 2026: wat is een neuraal netwerk eigenlijk? De site publiceerde een conceptuele uitleg die CNN's, RNN's en transformers terugbrengt tot één bruikbaar mentaal model — zonder dat je code hoeft te schrijven ([Bron: freeCodeCamp](https://www.freecodecamp.org/news/cnns-rnns-and-transformers-explained-a-mental-model-for-key-deep-learning-concepts/)). In deze gids vatten we dat model samen en koppelen we er een praktische stap aan: zelf rondkijken op [Hugging Face](https://huggingface.co/models), de grootste openbare modellenbibliotheek.

## Stap 1: onthoud de drie architecturen als drie zintuigen

Het mentale model uit de freeCodeCamp-uitleg komt hierop neer. Een **CNN** (convolutioneel neuraal netwerk) is het oog: het schuift kleine filters over een afbeelding en stapelt zo patroonherkenning op — van randjes naar vormen naar objecten. Een **RNN** (recurrent neuraal netwerk) is het geheugen: het leest een reeks stap voor stap en neemt bij elke stap iets mee van de vorige, wat past bij tekst, audio en tijdreeksen. Een **transformer** is de leeszaal: hij bekijkt de hele invoer tegelijk en berekent via *attention* welke delen voor elkaar relevant zijn.

> **💡 Beginner-tip:** je hoeft de wiskunde niet te kennen. Wie onthoudt "CNN = beelden, RNN = reeksen met geheugen, transformer = alles tegelijk wegen" begrijpt al meer dan genoeg om modelbeschrijvingen te lezen.

## Stap 2: snap waarom de transformer won

De transformer komt uit het Google-paper *Attention Is All You Need* (2017). De doorbraak zat in schaal: doordat een transformer invoer parallel verwerkt in plaats van stap voor stap zoals een RNN, kon er op veel grotere datasets getraind worden. Vrijwel elk groot taalmodel dat je vandaag gebruikt — ChatGPT, Claude, Gemini, de open Qwen- en Llama-families — is een transformer-variant. Kom je in een productbeschrijving "transformer-based" tegen, dan weet je nu wat er onder de motorkap zit.

## Stap 3: verken de architecturen op Hugging Face

Theorie beklijft pas als je ermee klikt. Op de [Hugging Face-modellenhub](https://huggingface.co/models) staan in 2026 ruim twee miljoen modellen ([Bron: Hugging Face](https://huggingface.co/models)). Filter in de linkerkolom op taak: kies *Image Classification* en je ziet overwegend CNN- en vision-transformer-modellen; kies *Text Generation* en je zit volledig in transformer-land. Open een modelkaart en lees de architectuur-sectie — daar staat precies welk type netwerk het is en waarvoor het getraind werd. Veel modellen hebben een gratis demo-widget, dus testen kan zonder ook maar iets te installeren.

> **⚡ Gevorderden:** wil je toch zelf bouwen, dan is Keras de klassieke instap — de freeCodeCamp-uitleg gebruikt het als voorbeeldbibliotheek. Sinds Keras 3 draait het bovenop meerdere backends (TensorFlow, PyTorch, JAX), dus je zit niet meer aan één ecosysteem vast.

## Stap 4: gebruik het model bij je volgende tool-keuze

Dit conceptuele laagje betaalt zich uit bij praktische keuzes: je begrijpt waarom een tool voor beeldherkenning andere limieten heeft dan een chatbot, en waarom "context window" een transformer-eigenschap is. Draai je liever modellen op eigen hardware, lees dan onze gids over [open-weight-modellen lokaal draaien](/nieuws/open-weight-modellen-lokaal-draaien) of hoe je [transformers.js in de browser gebruikt](/nieuws/transformers-js-ai-in-de-browser-gebruiken). De bredere stand van open-source AI schetst hetlaatsteainieuws.nl in [Staat van open-source AI 2026](https://hetlaatsteainieuws.nl/achtergrond/staat-van-open-source-ai-2026).

## Checklist: ben je klaar?

- [ ] Je kunt in één zin uitleggen wat een CNN, RNN en transformer doet
- [ ] Je weet waarom transformers de standaard werden (parallel + attention)
- [ ] Je hebt op Hugging Face gefilterd op minstens twee verschillende taken
- [ ] Je hebt één modelkaart geopend en de architectuur-sectie gelezen
- [ ] Je hebt één model getest via een demo-widget, zonder installatie
- [ ] Je herkent "transformer-based" in productbeschrijvingen als architectuur-claim

## Bronnen

- [freeCodeCamp — CNNs, RNNs, and Transformers Explained (14 juli 2026)](https://www.freecodecamp.org/news/cnns-rnns-and-transformers-explained-a-mental-model-for-key-deep-learning-concepts/)
- [Hugging Face — Models hub](https://huggingface.co/models)
- [Vaswani et al. — Attention Is All You Need (2017, arXiv)](https://arxiv.org/abs/1706.03762)
