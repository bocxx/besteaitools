---
title: "Zelf een tekst-samenvatter bouwen met Hugging Face (in 5 stappen)"
heroImageAlt: "Miniatuur diorama-illustratie bij artikel 'Zelf een tekst-samenvatter bouwen met Hugging Face (in 5 stappen)'"
heroImage: "/images/articles/diorama-dbat-tekst-samenvatter-bouwen-hugging-face.webp"
description: "Een lange tekst in seconden terugbrengen tot de kern, met een gratis open model dat lokaal op je eigen machine draait. Zo zet je in Python een samenvatter op met Hugging Face."
publishedAt: 2026-07-30
author: "Redactie"
category: "gids"
tags:
  - "huggingface"
  - "transformers"
  - "tekst-samenvatten"
  - "bart"
  - "python"
  - "open-source-ai"
toolSlug: "huggingface"
draft: false
readingTime: 5
keyTakeaways:
  - "Met de transformers-bibliotheek van Hugging Face bouw je in een paar regels Python een werkende tekst-samenvatter."
  - "Het model facebook/bart-large-cnn is gratis, open en draait lokaal, dus je stuurt geen data naar een externe dienst."
  - "Met max_length en min_length stuur je de lengte van de samenvatting; do_sample=False geeft een voorspelbaar resultaat."
  - "BART verwerkt ongeveer 1.024 tokens per keer, dus lange documenten knip je eerst in stukken op."
faq:
  - q: "Heb ik een betaald account nodig voor Hugging Face-samenvatten?"
    a: "Nee. De transformers-bibliotheek en het model facebook/bart-large-cnn zijn gratis en open. Je installeert ze eenmalig en draait ze op je eigen computer. Je hebt geen API-sleutel of abonnement nodig. Wel handig: een machine met wat geheugen, want het model wordt bij de eerste keer gedownload (enkele honderden MB's)."
  - q: "Blijft mijn tekst privé als ik dit lokaal draai?"
    a: "Ja. Omdat het model op je eigen machine draait, verlaat de tekst je computer niet. Dat is een belangrijk verschil met een online chatbot, waar je invoer naar de server van de aanbieder gaat. Voor gevoelige of vertrouwelijke documenten is lokaal samenvatten daarom een veiliger keuze."
  - q: "Waarom wordt mijn lange document niet volledig samengevat?"
    a: "BART-modellen verwerken ongeveer 1.024 tokens (grofweg 700 tot 800 woorden) per keer; alles daarboven wordt afgekapt. Voor langere teksten knip je het document eerst in stukken, vat je elk stuk apart samen en voeg je de samenvattingen daarna eventueel nog eens samen."
  - q: "Welk model kies ik: bart-large-cnn of distilbart?"
    a: "facebook/bart-large-cnn geeft de beste kwaliteit maar is zwaarder. sshleifer/distilbart-cnn-12-6 is een uitgeklede, snellere variant die op lichtere hardware prettiger draait, met iets minder verfijnde samenvattingen. Begin met bart-large-cnn en stap over op distilbart als snelheid of geheugen een probleem wordt."
sources:
  - label: "facebook/bart-large-cnn — modelkaart, Hugging Face"
    url: "https://huggingface.co/facebook/bart-large-cnn"
    author: "Hugging Face"
  - label: "Summarization — Hugging Face Transformers documentatie"
    url: "https://huggingface.co/docs/transformers/tasks/summarization"
    author: "Hugging Face"
---

Je hebt een rapport van vijf pagina's dat voor de lunch tot een alinea moet krimpen. Je kunt gaan lezen en strepen, of je laat een model het zware werk doen. Met [Hugging Face](/tools/huggingface) bouw je in een paar regels Python een tekst-samenvatter die gratis is, open, en volledig op je eigen machine draait. Geen abonnement, geen API-sleutel, en je tekst verlaat je computer niet.

Hieronder zet je er in vijf stappen een op.

## Stap 1 — Installeer de bibliotheek

De kern is de `transformers`-bibliotheek. Die heeft een reken-backend nodig; `torch` (PyTorch) is de meest gebruikte. Installeer beide in één keer:

```bash
pip install transformers torch
```

## Stap 2 — Laad het samenvat-model

Hugging Face werkt met *pipelines*: kant-en-klare wrappers om een taak. Voor samenvatten kies je de taak `"summarization"` en een model dat daarop is getraind. De standaardkeuze is `facebook/bart-large-cnn`, een BART-model dat is fijngetraind op een grote verzameling nieuwsartikelen met hun samenvattingen.

```python
from transformers import pipeline

samenvatter = pipeline("summarization", model="facebook/bart-large-cnn")
```

De eerste keer downloadt Hugging Face het model automatisch. Daarna staat het lokaal en gaat het sneller.

## Stap 3 — Vat een tekst samen

Geef je tekst mee en stuur de lengte met twee parameters: `max_length` en `min_length` (in tokens). `do_sample=False` zorgt voor een voorspelbaar, herhaalbaar resultaat in plaats van een creatieve variatie.

```python
tekst = """Plak hier je lange tekst..."""

resultaat = samenvatter(tekst, max_length=130, min_length=30, do_sample=False)
print(resultaat[0]["summary_text"])
```

Je krijgt een `summary_text` terug met de ingedikte versie. Speel met `max_length` om de samenvatting korter of langer te maken.

## Stap 4 — Lees uit een bestand

In de praktijk zit je tekst meestal in een bestand. Lees het in en voer het door dezelfde pipeline:

```python
with open("artikel.txt", "r", encoding="utf-8") as f:
    tekst = f.read()

resultaat = samenvatter(tekst, max_length=150, min_length=40, do_sample=False)
print(resultaat[0]["summary_text"])
```

## Stap 5 — Houd rekening met de grenzen

Twee dingen om te weten. Ten eerste verwerkt BART ongeveer 1.024 tokens per keer, grofweg 700 tot 800 woorden. Langere teksten worden afgekapt. De oplossing is het document in stukken knippen, elk stuk apart samenvatten en de deel-samenvattingen eventueel nog eens door de samenvatter halen.

Ten tweede kun je het model wisselen als snelheid telt. Wil je iets lichters, vervang dan de modelnaam door `sshleifer/distilbart-cnn-12-6`: een compactere variant die vlotter draait op bescheiden hardware, met een klein kwaliteitsverlies.

```python
samenvatter = pipeline("summarization", model="sshleifer/distilbart-cnn-12-6")
```

## Voor wie is dit handig

Deze aanpak past bij iedereen die regelmatig lange teksten moet indikken en dat liever lokaal en privé doet dan via een online chatbot: onderzoekers, redacteuren, of ontwikkelaars die samenvatten in een eigen script of app willen inbouwen. Wie zonder code wil samenvatten en niet met gevoelige data werkt, is met een gewone chat-assistent sneller klaar. Maar zodra privacy, herhaalbaarheid of automatisering meespelen, geeft een eigen Hugging Face-pipeline je de controle die een online dienst niet biedt.
