---
title: "Hugging Face Spaces: zo host je gratis een AI-demo"
description: "Een AI-demo delen zonder eigen server kan op Hugging Face Spaces, maar niet alles is nog gratis. Zo kies je tussen Static, ZeroGPU en PRO."
publishedAt: 2026-10-06
updatedAt: 2026-10-06
author: "Redactie"
category: "gids"
tags:
  - "hugging-face"
  - "spaces"
  - "ai-demo-hosten"
  - "zerogpu"
  - "gratis-ai-tools"
toolSlug: "huggingface"
featured: false
draft: false
readingTime: 4
heroImage: "/images/articles/diorama-huggingface-spaces-gratis-demo-hosten.webp"
heroImageAlt: "Miniatuur diorama-illustratie bij artikel 'Hugging Face Spaces: zo host je gratis een AI-demo'"
heroScene: "A small glass display case on a workbench holding a miniature stage with a spotlight, a tiny GPU chip glowing faintly beside it"
keyTakeaways:
  - "Je kiest bij een nieuwe Space uit Gradio, Docker of Static HTML. Streamlit is geen eigen SDK meer: dat loopt via Docker met de Streamlit-template."
  - "Static Spaces zijn voor iedereen gratis. Een nieuwe Gradio- of Docker-Space vraagt een betaald plan (PRO, $9 per maand), ook op de gratis CPU Basic-hardware."
  - "ZeroGPU is de gratis uitzondering voor Gradio-Spaces. Een gratis account mag er maximaal twee maken en krijgt 5 minuten GPU-quotum per dag; PRO krijgt 40 minuten."
  - "Gevoelige gegevens zoals API-keys horen in 'Secrets', niet in 'Variables': dat laatste veld is publiek zichtbaar."
faq:
  - q: "Is Hugging Face Spaces echt helemaal gratis?"
    a: "Nee. Static Spaces zijn voor iedereen gratis. Voor een nieuwe Gradio- of Docker-Space heb je een betaald plan nodig, ook als die op de gratis CPU Basic-hardware draait. De uitzondering is ZeroGPU: met een gratis account mag je tot twee Gradio-Spaces op ZeroGPU hosten, met 5 minuten GPU-quotum per dag per gebruiker. Voor meer kies je PRO ($9 per maand) of betaalde hardware."
  - q: "Kan ik Streamlit nog gebruiken op Hugging Face Spaces?"
    a: "Ja, maar niet meer als eigen SDK. Hugging Face heeft de ingebouwde Streamlit-optie uitgefaseerd. Je kiest de Docker SDK en daarbinnen de Streamlit-template. Voor een simpele model-demo is Gradio meestal sneller; Streamlit past beter bij een dashboard met meerdere views."
  - q: "Hoe voorkom ik dat mijn API-key zichtbaar is in mijn Hugging Face Space?"
    a: "Gebruik het 'Secrets'-veld in de Space-instellingen, niet 'Variables'. Secrets zijn na het instellen verborgen voor iedereen inclusief jezelf, terwijl Variables openbaar zichtbaar blijven in de Space-configuratie. Lees de key in je code uit met een environment-variable, nooit hardcoded."
  - q: "Waarom gaat mijn gratis Hugging Face Space in slaapstand?"
    a: "Op gratis hardware stopt een Space na een periode zonder gebruik, om resources te sparen. De eerste bezoeker daarna wacht een korte opstarttijd. Wil je dat je Space altijd draait, dan raadt Hugging Face betaalde hardware aan."
sources:
  - label: "Spaces Overview"
    url: "https://huggingface.co/docs/hub/en/spaces-overview"
    author: "Hugging Face"
  - label: "Spaces ZeroGPU: Dynamic GPU Allocation for Spaces"
    url: "https://huggingface.co/docs/hub/en/spaces-zerogpu"
    author: "Hugging Face"
  - label: "Streamlit Spaces"
    url: "https://huggingface.co/docs/hub/en/spaces-sdks-streamlit"
    author: "Hugging Face"
  - label: "Using GPU Spaces"
    url: "https://huggingface.co/docs/hub/en/spaces-gpus"
    author: "Hugging Face"
---

Wil je een AI-model laten uitproberen door anderen zonder zelf een server te beheren? Hugging Face Spaces doet dat, en voor een deel nog gratis. Je pusht code naar een git-repository en Spaces bouwt en host de demo automatisch. Wel zijn de regels aangescherpt: niet elke soort Space kun je nog zonder betaald plan maken.

## Kies eerst je SDK

Bij het aanmaken van een Space kies je uit drie SDK's. **Static HTML** is voor een simpele pagina zonder eigen rekenkracht. **Gradio** is de snelste route naar een werkende AI-demo: upload een input, toon een output, in een paar regels Python. **Docker** geeft volledige controle via een eigen image, handig als je afhankelijkheden hebt die Gradio niet dekt ([Bron: Hugging Face](https://huggingface.co/docs/hub/en/spaces-overview)). Wil je Streamlit voor een dashboard met meerdere views? Dat was vroeger een eigen keuze, maar Hugging Face heeft die optie uitgefaseerd: je kiest nu Docker en daarbinnen de Streamlit-template ([Bron: Hugging Face](https://huggingface.co/docs/hub/en/spaces-sdks-streamlit)). Twijfel je, begin met Gradio.

## Wat je gratis krijgt

De standaard "CPU Basic"-hardware (2 vCPU, 16 GB RAM en 50 GB niet-persistente schijfruimte) kost niets per uur. Maar voor een nieuwe Space die rekenkracht gebruikt, dus Gradio of Docker, heb je een betaald plan nodig: PRO voor een persoonlijk account, Team of Enterprise voor een organisatie ([Bron: Hugging Face](https://huggingface.co/docs/hub/en/spaces-gpus)). PRO kost $9 per maand ([Bron: Hugging Face](https://huggingface.co/pricing)). Static Spaces blijven voor iedereen gratis. Voor een Gradio-Space met een model dat een GPU nodig heeft, is er **ZeroGPU**: een GPU wordt alleen toegewezen zolang een verzoek draait. Een gratis persoonlijk account mag maximaal twee ZeroGPU-Spaces maken (mits je e-mail is geverifieerd en je account minstens 30 dagen oud is), en elke gratis gebruiker krijgt 5 minuten GPU-quotum per dag. Met PRO is dat 40 minuten en mag je tien ZeroGPU-Spaces maken ([Bron: Hugging Face](https://huggingface.co/docs/hub/en/spaces-zerogpu)). ZeroGPU werkt alleen met Gradio. Betaalde hardware, van een T4 small voor $0,40 per uur tot een A100 large voor $2,50 per uur, is er voor wie meer rekenkracht of permanente uptime nodig heeft ([Bron: Hugging Face](https://huggingface.co/docs/hub/en/spaces-overview)).

> **💡 Beginner-tip:** kan je demo volledig in de browser draaien, bijvoorbeeld met Transformers.js, kies dan een Static Space: die is altijd gratis. Heb je een GPU nodig, houd dan elke aanvraag op ZeroGPU klein (één afbeelding of één korte tekst per klik), zodat bezoekers met hun 5 dagelijkse GPU-minuten een heel eind komen.

## Secrets en Variables: niet verwisselen

Elke Space heeft twee soorten omgevingsvariabelen: **Variables** zijn openbaar zichtbaar in de Space-instellingen — geschikt voor een modelnaam of een configuratie-optie, niet voor iets gevoeligs. **Secrets** zijn verborgen na het instellen, ook voor jezelf, en zijn de juiste plek voor API-keys of tokens ([Bron: Hugging Face](https://huggingface.co/docs/hub/en/spaces-overview)). Lees ze in je code uit met `os.getenv('JOUW_SLEUTELNAAM')` — nooit rechtstreeks in de broncode. Ben je van plan een eigen fijnmazig token te gebruiken in plaats van je hoofdaccount-token, dan is dat een goede plek om dat token te beperken tot alleen de rechten die de Space nodig heeft.

> **⚡ Gevorderden:** een Space die in slaapstand gaat, kost je niets extra, maar de eerste bezoeker na een stille periode wacht op een "cold start". Voor een demo die je aan een klant of publiek laat zien, open de Space zelf een paar minuten vantevoren zodat hij al warm draait.

## Checklist: ben je klaar?

- Je weet welke SDK past bij je demo: Static HTML, Gradio of Docker (ook voor Streamlit).
- Je weet of je demo als gratis Static Space kan, of dat je ZeroGPU of een betaald plan nodig hebt.
- Je weet of je model ZeroGPU nodig heeft, en of twee Spaces en 5 minuten GPU per dag genoeg zijn.
- Elke API-key of token staat in Secrets, nooit in Variables of in je code.
- Je houdt rekening met een korte cold-start na inactiviteit, zeker bij een live demo.
- Je weet wanneer betaalde hardware nodig is: permanente uptime of meer rekenkracht dan ZeroGPU biedt.

Voor meer over hoe het bredere open-source AI-landschap rond Hugging Face zich in 2026 ontwikkelt, zie het [overzicht van open-source AI op hetlaatsteainieuws.nl](https://www.hetlaatsteainieuws.nl///achtergrond/staat-van-open-source-ai-2026). Wil je eerst de basis van het platform zelf onder de knie krijgen, lees dan [Hugging Face voor beginners](/nieuws/hugging-face-voor-beginners) en, voor wie met tokens werkt, [fijnmazige tokens veilig instellen](/nieuws/huggingface-fijnmazige-token-veilig-instellen). Wil je meteen een eigen Space bouwen als oefening, dan is [een tekstsamenvatter bouwen met Hugging Face](/nieuws/dbat-tekst-samenvatter-bouwen-hugging-face) een goed vervolgproject.

## Bronnen

- [Spaces Overview](https://huggingface.co/docs/hub/en/spaces-overview) — Hugging Face
- [Spaces ZeroGPU: Dynamic GPU Allocation for Spaces](https://huggingface.co/docs/hub/en/spaces-zerogpu) — Hugging Face
- [Streamlit Spaces](https://huggingface.co/docs/hub/en/spaces-sdks-streamlit) — Hugging Face
- [Using GPU Spaces](https://huggingface.co/docs/hub/en/spaces-gpus) — Hugging Face

