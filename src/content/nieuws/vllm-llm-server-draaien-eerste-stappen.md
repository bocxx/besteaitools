---
title: "vLLM in 4 stappen: draai een eigen LLM-server die praat als de OpenAI API"
description: "Ollama loopt vast zodra meerdere gebruikers tegelijk vragen stellen. Met vLLM zet je een GPU-server op die dezelfde API spreekt als OpenAI — in vier stappen."
publishedAt: 2026-08-19
updatedAt: 2026-08-19
author: "Redactie"
category: "gids"
tags:
  - "vllm"
  - "self-hosting"
  - "openai-api"
  - "pagedattention"
  - "gpu"
  - "inference"
toolSlug: "vllm"
featured: false
draft: false
readingTime: 4
heroImage: "/images/articles/diorama-vllm-llm-server-draaien-eerste-stappen.webp"
heroImageAlt: "Miniatuur diorama-illustratie bij artikel 'vLLM in 4 stappen: draai een eigen LLM-server die praat als de OpenAI API'"
heroScene: "A miniature server rack on a desk with tiny glowing cards, several small paper request tickets queueing neatly into one slot"
keyTakeaways:
  - "vLLM is een open-source inference-server (Apache 2.0) die open modellen serveert op je eigen GPU met een OpenAI-compatibele API."
  - "Dankzij PagedAttention en continuous batching blijft de doorvoer overeind zodra meerdere gebruikers tegelijk vragen stellen."
  - "Één commando volstaat om te starten: vllm serve gevolgd door een modelnaam van Hugging Face."
  - "Bestaande code die de OpenAI-client gebruikt, werkt door: je verandert alleen de base_url naar je eigen server."
faq:
  - q: "Wat is het verschil tussen vLLM en Ollama?"
    a: "Ollama is gebouwd voor één gebruiker op één machine: installeren, model pullen, chatten. vLLM is gebouwd voor meerdere gebruikers tegelijk op GPU-hardware. Het verschil zit in de planner: vLLM voegt binnenkomende verzoeken continu samen in één draaiende batch en verdeelt het GPU-geheugen in pagina's, zodat de doorvoer niet instort zodra er tien mensen tegelijk iets vragen. Werk je alleen op je laptop, blijf dan bij Ollama."
  - q: "Heb ik per se een NVIDIA-GPU nodig?"
    a: "Voor een serieuze opstelling wel. vLLM is primair gebouwd rond CUDA-GPU's; de documentatie beschrijft daarnaast installatiepaden voor CPU en TPU, maar de CPU-variant is bedoeld om te testen, niet om productie mee te draaien. Wie geen eigen kaart heeft, huurt er meestal een per uur bij een cloudaanbieder en zet vLLM daar neer."
  - q: "Wat betekent OpenAI-compatibel precies?"
    a: "vLLM serveert endpoints die dezelfde vorm hebben als die van OpenAI, waaronder /v1/chat/completions, /v1/completions en /v1/models. Daardoor werkt vrijwel elke bibliotheek of tool die met de OpenAI API overweg kan ook met jouw server: je zet base_url op je eigen adres en verzint een willekeurige api_key. Dat scheelt herschrijven van je hele codebase."
  - q: "Wat kost het draaien van vLLM?"
    a: "De software zelf is gratis en open source onder Apache 2.0. De echte kostenpost is de GPU: je betaalt voor de kaart of voor de uren die je hem huurt, ongeacht hoeveel tokens je erdoorheen jaagt. Daar zit meteen de rekensom: pas als je genoeg volume hebt om de kaart bezet te houden, wordt zelf draaien goedkoper dan tokens afrekenen bij een aanbieder."
---

Je hebt een open model lokaal draaien en dat werkt prima — tot je collega's het ook gaan gebruiken. Dan zakt het in. Ollama is gebouwd voor één gebruiker; zodra tien mensen tegelijk een vraag stellen, staan negen ervan te wachten. Dat is precies het gat dat [vLLM](/tools/vllm) vult. In deze gids zet je in vier stappen een eigen inference-server op die dezelfde API spreekt als OpenAI.

## Stap 1: controleer of je de hardware hebt

vLLM is gebouwd voor GPU's. Een NVIDIA-kaart met CUDA is het gangbare pad; de [documentatie](https://docs.vllm.ai/en/latest/) beschrijft daarnaast installatiepaden voor CPU en TPU, maar de CPU-variant is er om te testen, niet om productie mee te draaien.

Heb je geen kaart in huis, huur er dan één per uur bij een cloudaanbieder. Reken vooraf even door hoeveel uur je die kaart echt bezet houdt — dat is de rekensom die bepaalt of zelf draaien goedkoper is dan tokens afrekenen.

> **💡 Beginner-tip:** twijfel je of je dit nodig hebt? Voor één persoon op één laptop is [Ollama](/nieuws/ollama-lokale-ai-modellen-draaien) simpeler én voldoende. vLLM verdient zich pas terug bij meerdere gebruikers tegelijk.

## Stap 2: installeer en start de server

Installeren gaat via pip, in een verse virtuele omgeving:

```bash
python -m venv .venv && source .venv/bin/activate
pip install vllm
```

Daarna start je de server met één commando, met een modelnaam van Hugging Face:

```bash
vllm serve Qwen/Qwen3-8B
```

De eerste keer duurt dit even: vLLM haalt de modelgewichten op en reserveert GPU-geheugen. Als het goed is, luistert de server daarna op `http://localhost:8000`.

Twee vlaggen die je in de praktijk het vaakst nodig hebt:

- `--max-model-len` — maximale contextlengte. Verlaag dit als het model niet in je geheugen past.
- `--gpu-memory-utilization` — welk deel van de kaart vLLM mag claimen. Draait er nog iets anders op die GPU, zet dit dan lager.

## Stap 3: praat ermee alsof het OpenAI is

Dit is de reden dat mensen voor vLLM kiezen. De server biedt endpoints in het formaat van de OpenAI API — `/v1/chat/completions`, `/v1/completions` en `/v1/models` — zodat je bestaande code niet hoeft te herschrijven. Je wijst de client naar je eigen adres en verzint een sleutel, want er is niets om te verifiëren:

```python
from openai import OpenAI

client = OpenAI(base_url="http://localhost:8000/v1", api_key="EMPTY")

antwoord = client.chat.completions.create(
    model="Qwen/Qwen3-8B",
    messages=[{"role": "user", "content": "Vat dit contract samen in 3 bullets."}],
)
print(antwoord.choices[0].message.content)
```

Werkt dit, dan werkt vrijwel elke tool die met de OpenAI API overweg kan ook met jouw server. Dat is het hele punt.

## Stap 4: test met meerdere gebruikers tegelijk

Hier komt de winst pas tevoorschijn, en daarom is dit een stap en geen voetnoot. Eén vraag stellen zegt niets — vuur er tien tegelijk af.

Onder water doet vLLM dan twee dingen. **Continuous batching** voegt binnenkomende verzoeken samen in de batch die al draait, in plaats van te wachten tot de vorige groep helemaal klaar is. **PagedAttention** hakt het geheugen voor de zogeheten KV-cache in vaste pagina's, zoals een besturingssysteem met virtueel geheugen doet, waardoor er nauwelijks nog ruimte verloren gaat aan versnippering. Samen zorgen ze dat je doorvoer meestijgt met het aantal gebruikers in plaats van in te storten ([Bron: RunPod](https://www.runpod.io/articles/guides/vllm-pagedattention-continuous-batching)).

Meet dus niet hoe snel één antwoord komt, maar hoeveel tokens per seconde je haalt bij realistische gelijktijdigheid. Dat cijfer bepaalt of je kaart de afdeling aankan.

## Wanneer je dit níet moet doen

vLLM is alleen de serveerlaag. Het levert geen RAG, geen agent-framework en geen gebruikersinterface — dat bouw of koppel je er zelf omheen. Heb je geen DevOps-capaciteit om een server draaiend te houden, dan is een gehoste API bijna altijd verstandiger.

Wil je eerst begrijpen wat open modellen precies zijn en waarom bedrijven ze zelf willen draaien, lees dan onze uitleg over [open-weight modellen lokaal draaien](/nieuws/open-weight-modellen-lokaal-draaien), en op hetlaatsteainieuws.nl de achtergrond bij [lokale LLM's en Ollama](https://hetlaatsteainieuws.nl/achtergrond/wat-is-ollama-lokale-llm-uitleg-2026).
