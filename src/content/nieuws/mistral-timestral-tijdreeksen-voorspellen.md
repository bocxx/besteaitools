---
title: "Mistral Timestral: zo maak je je eerste voorspelling met tijdreeksdata"
description: "Mistral bracht Timestral uit, open modellen die verkoop, sensordata of energieverbruik voorspellen zonder GPU. Installeren en je eerste forecast in vier stappen."
publishedAt: 2026-10-20
updatedAt: 2026-10-20
author: "Redactie"
category: "lancering"
tags:
  - "mistral"
  - "timestral"
  - "tijdreeksen"
  - "forecasting"
  - "open-source-modellen"
  - "python"
toolSlug: "mistral"
featured: false
draft: false
readingTime: 4
heroImage: "/images/articles/diorama-mistral-timestral-tijdreeksen-voorspellen.webp"
heroImageAlt: "Miniatuur diorama-illustratie bij artikel 'Mistral Timestral: zo maak je je eerste voorspelling met tijdreeksdata'"
heroScene: "A small wooden loom weaving a long paper strip of wavy lines that continues as a faint glowing thread"
evergreen: false
volatility: high
factsCheckedAt: 2026-10-20
sources:
  - label: "Mistral AI — Timestral"
    url: "https://mistral.ai/news/timestral/"
    publishedAt: 2026-10-15
  - label: "GitHub — mistralai/timestral"
    url: "https://github.com/mistralai/timestral"
  - label: "Mistral Docs — Timestral 1.0"
    url: "https://docs.mistral.ai/models/timestral-1-0"
  - label: "Hugging Face — Timestral-collectie"
    url: "https://huggingface.co/collections/mistralai/timestral"
keyTakeaways:
  - "Timestral is Mistrals eerste familie van tijdreeksmodellen, in vier maten: 5M, 28M, 123M en 209M parameters. De gewichten staan gratis op Hugging Face onder een aangepaste MIT-licentie."
  - "Je voorspelt zonder eigen training (zero-shot) en zonder GPU: het kleinste model doet een dagvoorspelling uit drie weken kwartierdata in 10 ms op een gewone server-CPU."
  - "Het model geeft geen enkel getal maar 21 kwantielen, dus een bandbreedte. Daarmee zie je hoe zeker de voorspelling is."
  - "Installeren gaat met één pip-commando vanaf GitHub; je hebt Python 3.10 of hoger en PyTorch 2.4 of hoger nodig."
  - "Begin met het 28M-model: volgens Mistral sneller dan 209M en op GIFT-Eval en TIME beter dan het vier keer grotere Chronos-2."
faq:
  - q: "Wat is Mistral Timestral?"
    a: "Timestral is een familie van open tijdreeksmodellen van het Franse Mistral AI, uitgebracht op 15 oktober 2026. Een tijdreeksmodel voorspelt hoe een reeks meetwaarden in de tijd verder loopt, zoals verkoop per dag, energieverbruik per kwartier of sensordata van een machine. Timestral doet dat zonder dat je het eerst op je eigen data hoeft te trainen."
  - q: "Is Timestral gratis te gebruiken?"
    a: "De modelgewichten staan gratis op Hugging Face onder een aangepaste MIT-licentie, en de Python-code onder Apache 2.0. Lees de licentie in de modelrepository voordat je het commercieel inzet. Mistral noemt geen prijs voor een API-versie; voor maatwerk en fine-tuning verwijst het naar Mistral Forge."
  - q: "Heb ik een GPU nodig voor Timestral?"
    a: "Nee. Volgens Mistral draait Timestral voor voorspellingen op een gewone CPU. Op een server-CPU met 8 threads duurt een dagvoorspelling uit drie weken kwartierdata 10 milliseconden met het 5M-model en 140 milliseconden met het 209M-model. Een GPU mag wel en versnelt grote batches."
  - q: "Welk Timestral-model moet ik kiezen?"
    a: "Begin met Timestral-28M: dat is volgens Mistral vijf keer sneller dan het grootste model en scoort op de GIFT-Eval- en TIME-benchmarks beter dan het vier keer grotere Chronos-2. Heb je de laatste procent nauwkeurigheid nodig, neem dan 123M: dat zit binnen 0,2% van de 209M-score tegen driekwart van de rekentijd."
---

Voorspellen hoeveel je volgende week verkoopt, wanneer een pomp gaat haperen of hoeveel stroom je kantoor morgen trekt: daar heb je geen chatbot voor nodig maar een tijdreeksmodel. Mistral bracht er op 15 oktober een familie van uit, Timestral, gratis en zonder GPU te draaien ([Bron: Mistral AI](https://mistral.ai/news/timestral/)). In vier stappen heb je je eerste voorspelling.

## Wat Timestral is

Timestral is Mistrals eerste reeks tijdreeksmodellen, in vier maten: 5M, 28M, 123M en 209M parameters. Ze voorspellen meerdere reeksen tegelijk, kunnen rekening houden met bekende toekomstige factoren zoals feestdagen of een productieplanning, en kijken tot 32.768 tijdstappen terug ([Bron: Mistral AI](https://mistral.ai/news/timestral/)). In plaats van één getal krijg je 21 kwantielen: een bandbreedte die laat zien hoe zeker het model is.

Volgens Mistral staat het 209M-model bovenaan op de benchmarks GIFT-Eval, TIME en fev-bench onder vooraf getrainde modellen die zonder extra training werken ([Bron: Mistral AI](https://mistral.ai/news/timestral/)). Dat zijn de eigen cijfers van de maker; de resultaten zijn wel ingestuurd naar de openbare GIFT-Eval- en TIME-ranglijsten.

## Stap 1: installeren

Je hebt Python 3.10 of hoger en PyTorch 2.4 of hoger nodig. Installeer het pakket rechtstreeks vanaf GitHub ([Bron: GitHub](https://github.com/mistralai/timestral)):

```bash
pip install git+https://github.com/mistralai/timestral.git
```

De code valt onder Apache 2.0; de modelgewichten staan apart op Hugging Face onder een aangepaste MIT-licentie ([Bron: GitHub](https://github.com/mistralai/timestral)). Nieuw met modellen van Hugging Face? Lees eerst [hoe je modellen veilig downloadt](/nieuws/huggingface-modellen-veilig-downloaden).

## Stap 2: kies je model

| Model | Grootte (fp32) | Wanneer |
|---|---|---|
| Timestral-5M | 21 MB | Laptop, duizenden reeksen tegelijk |
| Timestral-28M | 111 MB | Goede start: snel en nauwkeurig |
| Timestral-123M | 490 MB | Binnen 0,2% van 209M, sneller |
| Timestral-209M | 837 MB | Maximale nauwkeurigheid |

De groottes komen uit de GitHub-pagina ([Bron: GitHub](https://github.com/mistralai/timestral)); de vergelijking 123M versus 209M en het advies voor 28M uit de aankondiging ([Bron: Mistral AI](https://mistral.ai/news/timestral/)).

> **💡 Beginner-tip:** begin met Timestral-28M. Volgens Mistral is het vijf keer sneller dan het grootste model en verslaat het op GIFT-Eval en TIME het vier keer grotere Chronos-2 van Amazon ([Bron: Mistral AI](https://mistral.ai/news/timestral/)).

## Stap 3: je eerste voorspelling

Zet je data in een NumPy-array. De vorm is `(reeksen, variabelen, tijd)`, of gewoon één lange rij voor één reeks; ontbrekende waarden geef je aan met `NaN` ([Bron: GitHub](https://github.com/mistralai/timestral)). Het voorbeeld uit de README:

```python
import numpy as np
from timestral import TimestralForecaster

forecaster = TimestralForecaster.from_pretrained("mistralai/Timestral-28M")

context = np.random.randn(2, 1, 2000).cumsum(-1)   # vervang door je eigen data
forecast = forecaster.forecast(context, prediction_length=96)
```

Met `prediction_length=96` voorspel je 96 stappen vooruit: bij kwartierdata is dat één dag. Vervang de willekeurige data door bijvoorbeeld je dagomzet uit de kassa of het verbruik uit je slimme meter.

## Stap 4: controleer de voorspelling

Een model dat de benchmark wint, kent jouw zaak nog niet. Houd daarom de laatste paar weken van je data achter, laat Timestral die periode voorspellen en vergelijk met wat er echt gebeurde. Kijk vooral of de werkelijke waarden binnen de bandbreedte van de kwantielen vallen. Wil je het model op je eigen data bijtrainen of on-premises draaien, dan verwijst Mistral naar Mistral Forge ([Bron: Mistral AI](https://mistral.ai/news/timestral/)).

Werk je liever met Mistrals taalmodellen via de API, dan helpt [onze gids voor je eerste Mistral Large 4-aanroep](/nieuws/mistral-large-4-api-eerste-aanroep). En waarom Mistral voor Europese bedrijven een eigen positie heeft, lees je bij [Het Laatste AI Nieuws over de Samsung-deal](https://www.hetlaatsteainieuws.nl/nieuws/mistral-3-miljard-samsung-soeverein).

## Checklist: ben je klaar?

- Python 3.10+ en PyTorch 2.4+ geïnstalleerd
- `timestral` via pip vanaf GitHub geïnstalleerd
- Model gekozen (start met 28M)
- Je data als array met `NaN` voor gaten
- Een stuk historie achtergehouden om de voorspelling te toetsen
- Licentie van de modelgewichten gelezen vóór commercieel gebruik

## Bronnen

- [Mistral AI — Timestral](https://mistral.ai/news/timestral/)
- [GitHub — mistralai/timestral](https://github.com/mistralai/timestral)
- [Mistral Docs — Timestral 1.0](https://docs.mistral.ai/models/timestral-1-0)
- [Hugging Face — Timestral-collectie](https://huggingface.co/collections/mistralai/timestral)
