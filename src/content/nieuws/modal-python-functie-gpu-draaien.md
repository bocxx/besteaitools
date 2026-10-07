---
title: "Modal gebruiken: Python-functie op een cloud-GPU in 4 stappen"
description: "Met Modal draai je een Python-functie op een cloud-GPU zonder Docker of Kubernetes. Zo installeer je het, kies je een GPU en houd je de rekening per seconde klein."
publishedAt: 2026-10-06
updatedAt: 2026-10-06
author: "Redactie"
category: "gids"
tags:
  - "modal"
  - "serverless-gpu"
  - "python"
  - "ai-infrastructuur"
  - "inference"
toolSlug: "modal"
featured: false
draft: false
readingTime: 4
heroImage: "/images/articles/diorama-modal-python-functie-gpu-draaien.webp"
heroImageAlt: "Miniatuur diorama-illustratie bij artikel 'Modal gebruiken: Python-functie op een cloud-GPU in 4 stappen'"
heroScene: "A tiny paper scroll slides into a brass pneumatic tube leading up to a humming rack of miniature graphics cards"
keyTakeaways:
  - "Modal draait Python-functies in de cloud; met één argument in de decorator, zoals gpu=\"T4\", krijgt je functie een GPU."
  - "Installeren gaat met pip install modal en modal setup. Voor GPU-gebruik moet er wel een betaalmethode in je account staan."
  - "Je betaalt per seconde: een T4 kost 0,000164 dollar per seconde (ruim 0,59 dollar per uur), een H100 0,001097 dollar (bijna 4 dollar per uur)."
  - "Het gratis Starter-plan geeft 30 dollar aan credits per maand; het Team-plan kost 250 dollar per maand plus verbruik, met 100 dollar aan credits."
  - "Wil je dat je code in Europa draait, dan kies je de regio eu; daar geldt een toeslag van 1,15 keer de basisprijs."
faq:
  - q: "Wat kost Modal per uur voor een GPU?"
    a: "Modal rekent per seconde. Omgerekend kost een T4 ruim 0,59 dollar per uur, een L4 ongeveer 0,80 dollar, een A100 met 80 GB ongeveer 2,50 dollar en een H100 bijna 4 dollar. Daar komen CPU en geheugen bij, en een toeslag als je een specifieke regio kiest. Draait er niets, dan betaal je niets."
  - q: "Is Modal gratis te gebruiken?"
    a: "Het Starter-plan kost niets en geeft 30 dollar aan gratis credits per maand. Dat is genoeg om te experimenteren, bijvoorbeeld ruim vijftig uur op een T4. Voor GPU-gebruik moet je wel een betaalmethode toevoegen. Het Team-plan kost 250 dollar per maand plus verbruik, met 100 dollar aan maandelijkse credits."
  - q: "Wat is het verschil tussen modal run en modal deploy?"
    a: "Met modal run voer je je code één keer uit in de cloud; daarna stopt alles. Met modal serve krijg je tijdens het ontwikkelen een tijdelijke publieke URL. Met modal deploy zet je de app blijvend neer, met een vaste URL voor webfuncties, zodat andere software hem kan aanroepen."
  - q: "Kan Modal in Europa draaien?"
    a: "Ja. Met region=[\"eu\"] in de decorator laat je containers in de Europese Economische Ruimte draaien, of smaller met eu-west, eu-north of eu-south. Voor een brede regio betaal je 1,15 keer de basisprijs, voor een smalle regio 1,75 keer."
sources:
  - label: "Modal — Pricing"
    url: "https://modal.com/pricing"
  - label: "Modal docs — Introduction"
    url: "https://modal.com/docs/guide"
  - label: "Modal docs — Region selection"
    url: "https://modal.com/docs/guide/region-selection"
  - label: "Modal docs — Web endpoints"
    url: "https://modal.com/docs/guide/webhooks"
---

Een open model draaien op je laptop werkt tot je een echte GPU nodig hebt. Een eigen server huren is dan vaak overkill. [Modal](/ai-tools/modal) zit daartussen: je schrijft een gewone Python-functie, zet er één regel boven en die functie draait op een cloud-GPU, per seconde afgerekend. In vier stappen heb je je eerste GPU-functie draaien en weet je wat het kost.

## Stap 1: installeren en inloggen

Modal installeer je als Python-pakket, daarna koppel je je account met één commando ([Bron: Modal docs](https://modal.com/docs/guide)):

```bash
pip install modal
modal setup
```

`modal setup` opent je browser om in te loggen en zet een token op je computer. Werkt het commando niet, probeer dan `python -m modal setup`. Wil je straks een GPU gebruiken, voeg dan in je account een betaalmethode toe: zonder krijg je geen GPU, ook niet binnen je gratis credits ([Bron: Modal docs](https://modal.com/docs/guide)).

## Stap 2: je eerste functie met een GPU

Maak een bestand `gpu_test.py`:

```python
import modal

app = modal.App("eerste-gpu")

@app.function(gpu="T4")
def check():
    import subprocess
    return subprocess.run(["nvidia-smi"], capture_output=True, text=True).stdout

@app.local_entrypoint()
def main():
    print(check.remote())
```

Draai het met `modal run gpu_test.py`. Modal bouwt een container, start hem op een T4 en geeft de uitvoer van `nvidia-smi` terug in je terminal. Het argument `gpu=` in de decorator bepaalt welke kaart je krijgt; in de docs staat bijvoorbeeld `gpu="h100"` ([Bron: Modal docs](https://modal.com/docs/guide)).

> **💡 Beginner-tip:** begin altijd op een T4 of L4. Werkt je code daar, schaal dan pas op naar een A100 of H100. Een fout in je script kost op een H100 bijna zeven keer zoveel per seconde.

## Stap 3: de juiste GPU kiezen

Modal rekent per seconde, en alleen zolang je functie draait ([Bron: Modal pricing](https://modal.com/pricing)). Omgerekend naar uurprijzen:

| GPU | Per seconde | Per uur (afgerond) |
|---|---|---|
| T4 | $0,000164 | $0,59 |
| L4 | $0,000222 | $0,80 |
| A100 80 GB | $0,000694 | $2,50 |
| H100 | $0,001097 | $3,95 |

Daar komen CPU en geheugen bij. Het Starter-plan is gratis met 30 dollar aan credits per maand, het Team-plan kost 250 dollar per maand plus verbruik met 100 dollar aan credits ([Bron: Modal pricing](https://modal.com/pricing)). Voor experimenten kom je dus een heel eind met het gratis plan.

Moeten je gegevens in Europa blijven? Zet dan `region=["eu"]` in de decorator. Een brede regio zoals `eu` kost 1,15 keer de basisprijs, een smalle zoals `eu-west` 1,75 keer ([Bron: Modal docs](https://modal.com/docs/guide/region-selection)).

## Stap 4: blijvend neerzetten als API

Wil je dat andere software je functie kan aanroepen, maak er dan een webfunctie van met `@modal.fastapi_endpoint()`. Daarvoor heeft je container FastAPI nodig ([Bron: Modal docs](https://modal.com/docs/guide/webhooks)):

```python
image = modal.Image.debian_slim().pip_install("fastapi[standard]")

@app.function(image=image, gpu="T4")
@modal.fastapi_endpoint()
def f():
    return "Hello world!"
```

Met `modal serve gpu_test.py` krijg je tijdens het ontwikkelen een tijdelijke publieke URL. Met `modal deploy gpu_test.py` zet je de app blijvend neer, met een vaste URL ([Bron: Modal docs](https://modal.com/docs/guide/webhooks)).

> **⚡ Gevorderden:** die URL staat op het open internet. Zet er authenticatie op voordat je er een model achter hangt dat geld kost per aanroep.

Twijfel je of je een model beter lokaal draait of huurt? Lees dan eerst [Qwen 3.8 27B draaien: zelf hosten of huren?](/nieuws/qwen-3-8-27b-lokaal-draaien-of-huren) en ons overzicht van [open-weight modellen die je zelf draait](/nieuws/open-weight-modellen-lokaal-draaien). Waarom open modellen zo hard terrein winnen, staat in de [staat van open-source AI](https://www.hetlaatsteainieuws.nl////////achtergrond/staat-van-open-source-ai-2026) op hetlaatsteainieuws.nl.

## Checklist: ben je klaar?

- [ ] `pip install modal` en `modal setup` zijn gelukt
- [ ] Er staat een betaalmethode in je account (nodig voor GPU's)
- [ ] `modal run` geeft de `nvidia-smi`-uitvoer van een T4 terug
- [ ] Je hebt de GPU gekozen op basis van wat je model echt nodig heeft
- [ ] Je weet of je `region=["eu"]` nodig hebt, en rekent met de toeslag
- [ ] Een gedeployde webfunctie heeft authenticatie

## Bronnen

- [Modal: Pricing](https://modal.com/pricing)
- [Modal docs: Introduction](https://modal.com/docs/guide)
- [Modal docs: Region selection](https://modal.com/docs/guide/region-selection)
- [Modal docs: Web endpoints](https://modal.com/docs/guide/webhooks)
