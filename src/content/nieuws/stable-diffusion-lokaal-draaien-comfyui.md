---
title: "Stable Diffusion 3.5 lokaal draaien met ComfyUI: je eerste beeld"
description: "Stable Diffusion 3.5 draait gratis op je eigen computer. Zo installeer je ComfyUI, kies je tussen Medium en Large en maak je binnen een uur je eerste beeld."
publishedAt: 2026-10-09
updatedAt: 2026-10-09
author: "Redactie"
category: "gids"
tags:
  - "stable-diffusion"
  - "comfyui"
  - "sd-3-5"
  - "beeldgeneratie"
  - "lokale-ai"
  - "open-source"
toolSlug: "stable-diffusion"
featured: false
draft: false
readingTime: 5
heroImage: "/images/articles/diorama-stable-diffusion-lokaal-draaien-comfyui.webp"
heroImageAlt: "Miniatuur diorama-illustratie bij artikel 'Stable Diffusion 3.5 lokaal draaien met ComfyUI: je eerste beeld'"
heroScene: "A tiny wooden darkroom on a desk where a small brass machine slowly develops a landscape painting from mist"
evergreen: true
volatility: medium
factsCheckedAt: 2026-10-09
watch:
  - "stability-ai-models"
  - "comfyui-desktop"
keyTakeaways:
  - "Stable Diffusion 3.5 is nog altijd het nieuwste open beeldmodel van Stability AI: er is geen Stable Diffusion 4."
  - "SD 3.5 Medium (2,5 miljard parameters) vraagt volgens Stability AI 9,9 GB videogeheugen, exclusief tekst-encoders, en maakt beelden tussen 0,25 en 2 megapixel."
  - "Comfy Desktop installeer je met één installer op Windows 10 of later, of op een Mac met Apple Silicon en macOS 13 of nieuwer."
  - "Het makkelijkste model is het alles-in-één-bestand sd3.5_medium_incl_clips_t5xxlfp8scaled.safetensors: geen losse tekst-encoders nodig."
  - "Gebruik is gratis, ook commercieel, zolang jij of je organisatie onder 1 miljoen dollar jaaromzet blijft."
faq:
  - q: "Kan ik Stable Diffusion gratis op mijn eigen pc draaien?"
    a: "Ja. De modellen van Stable Diffusion 3.5 vallen onder de Stability AI Community License: gratis voor particulieren en voor organisaties met minder dan 1 miljoen dollar jaaromzet, ook voor commercieel gebruik. Je hebt wel een gratis Hugging Face-account nodig om de voorwaarden te accepteren voordat je het model downloadt. De software om het te draaien, zoals ComfyUI, is ook gratis."
  - q: "Hoeveel videogeheugen heb ik nodig voor Stable Diffusion 3.5?"
    a: "Stability AI noemt voor SD 3.5 Medium 9,9 GB videogeheugen, exclusief de tekst-encoders. Een kaart met 12 GB of meer zit dus comfortabel. Large is met 8,1 miljard parameters ruim drie keer zo groot en vraagt navenant meer. Heb je minder geheugen, dan helpen fp8-varianten van de bestanden; ComfyUI kan ook zonder losse GPU draaien, maar dan duurt elk beeld lang."
  - q: "Wat is het verschil tussen SD 3.5 Medium, Large en Large Turbo?"
    a: "Medium is het kleinste model (2,5 miljard parameters), sneller en zuiniger, maar volgens de ComfyUI-documentatie begrijpt het sommige complexe concepten minder goed. Large (8,1 miljard) levert meer detail en betere prompt-opvolging, maar vraagt zwaardere hardware. Large Turbo is een gedistilleerde versie van Large die al in 4 stappen een beeld maakt, met cfg op 1,2."
  - q: "Werkt Stable Diffusion op een Mac?"
    a: "Ja, op Macs met Apple Silicon. Comfy Desktop ondersteunt macOS 13 (Ventura) of nieuwer op M1 of later, en gebruikt de Metal-versnelling van de chip. Oudere Macs met een Intel-processor worden door de desktop-app niet ondersteund. Hugging Face noemt daarnaast Draw Things en DiffusionBee als lokale Mac-apps voor SD 3.5."
sources:
  - label: "Stability AI — Introducing Stable Diffusion 3.5"
    url: "https://stability.ai/news/introducing-stable-diffusion-3-5"
  - label: "Stability AI — Community License"
    url: "https://stability.ai/license"
  - label: "Hugging Face — stabilityai/stable-diffusion-3.5-medium"
    url: "https://huggingface.co/stabilityai/stable-diffusion-3.5-medium"
  - label: "ComfyUI Examples — SD3 / SD3.5"
    url: "https://comfyanonymous.github.io/ComfyUI_examples/sd3/"
  - label: "ComfyUI Docs — Comfy Desktop voor Windows"
    url: "https://docs.comfy.org/installation/desktop/windows"
  - label: "ComfyUI Docs — Comfy Desktop voor macOS"
    url: "https://docs.comfy.org/installation/desktop/macos"
---

[Stable Diffusion](/ai-tools/stable-diffusion) is de beeldgenerator die je zonder abonnement op je eigen computer draait. Met de desktopversie van ComfyUI en het model SD 3.5 Medium heb je binnen een uur je eerste beeld, zonder dat je prompts of afbeeldingen ergens naartoe gaan. Zo pak je het aan.

## Kies eerst je model

Stable Diffusion 3.5 komt in drie smaken ([Bron: Stability AI](https://stability.ai/news/introducing-stable-diffusion-3-5)):

| Model | Grootte | Geschikt voor |
| --- | --- | --- |
| SD 3.5 Medium | 2,5 miljard parameters | Gewone gaming-pc of Mac met Apple Silicon |
| SD 3.5 Large | 8,1 miljard parameters | Zware GPU, meer detail |
| SD 3.5 Large Turbo | Gedistilleerde Large | Snel: 4 stappen per beeld |

Begin met Medium. Stability AI noemt daarvoor 9,9 GB videogeheugen, exclusief de tekst-encoders, en het model maakt beelden tussen 0,25 en 2 megapixel ([Bron: Stability AI](https://stability.ai/news/introducing-stable-diffusion-3-5)). Volgens de ComfyUI-documentatie is Medium sneller en zuiniger, maar begrijpt het sommige ingewikkelde concepten minder goed dan Large ([Bron: ComfyUI](https://comfyanonymous.github.io/ComfyUI_examples/sd3/)).

> **💡 Beginner-tip:** een *checkpoint* is het bestand met het getrainde model zelf; *tekst-encoders* zijn de hulpmodellen die jouw prompt omzetten naar iets wat het beeldmodel begrijpt. SD 3.5 gebruikt er drie. Met het alles-in-één-bestand uit stap 3 hoef je daar niet over na te denken.

## Stap 1: installeer Comfy Desktop

ComfyUI is gratis software waarin je beeldmodellen als bouwblokjes aan elkaar knoopt. De desktopversie haal je op comfy.org/download. Op Windows heb je Windows 10 of later nodig; een losse NVIDIA- of AMD-kaart wordt aanbevolen maar is niet verplicht ([Bron: ComfyUI Docs](https://docs.comfy.org/installation/desktop/windows)). Op de Mac werkt het vanaf macOS 13 op Apple Silicon (M1 of later) ([Bron: ComfyUI Docs](https://docs.comfy.org/installation/desktop/macos)). Reken op minstens 4,85 GB schijfruimte voor de installatie zelf, plus ruimte voor modellen.

Start de app na installatie. Het welkomstscherm helpt je je eerste installatie aan te maken.

## Stap 2: accepteer de licentie op Hugging Face

De officiële modelpagina van SD 3.5 Medium is openbaar, maar je moet ingelogd de voorwaarden accepteren voordat je de bestanden kunt downloaden ([Bron: Hugging Face](https://huggingface.co/stabilityai/stable-diffusion-3.5-medium)). Een gratis account volstaat.

Die voorwaarden zijn de Stability AI Community License: gratis voor particulieren en voor organisaties onder 1 miljoen dollar jaaromzet, ook als je de beelden commercieel gebruikt. Zit je daarboven, dan heb je een betaalde Enterprise-licentie nodig ([Bron: Stability AI](https://stability.ai/license)).

## Stap 3: download het model en zet het op de goede plek

Voor een eerste test kies je het alles-in-één-bestand `sd3.5_medium_incl_clips_t5xxlfp8scaled.safetensors`, waarin de tekst-encoders al zitten; de link staat op de SD3-voorbeeldpagina van ComfyUI ([Bron: ComfyUI](https://comfyanonymous.github.io/ComfyUI_examples/sd3/)). Net als andere checkpoints hoort het in de map `models/checkpoints`. In Comfy Desktop op Windows staat die gedeelde modelmap onder `%LOCALAPPDATA%\Comfy-Desktop\ComfyUI-Shared` ([Bron: ComfyUI Docs](https://docs.comfy.org/installation/desktop/windows)).

> **⚡ Gevorderden:** wil je de losse bestanden, zet dan `clip_l`, `clip_g` en een t5xxl-encoder in `models/text_encoders`. Kies `t5xxl_fp16` alleen als je meer dan 32 GB werkgeheugen hebt, anders `t5xxl_fp8_e4m3fn_scaled` ([Bron: ComfyUI](https://comfyanonymous.github.io/ComfyUI_examples/sd3/)).

## Stap 4: maak je eerste beeld

Op dezelfde voorbeeldpagina staan afbeeldingen waarin de complete workflow is opgeslagen. Sla er een op en sleep hem in het ComfyUI-venster: alle blokjes verschijnen vanzelf ([Bron: ComfyUI](https://comfyanonymous.github.io/ComfyUI_examples/sd3/)). Kies in het checkpoint-blok je Medium-bestand, typ je prompt in het tekstveld en klik op Run.

Schrijf je prompt als een beschrijving van een foto: onderwerp, omgeving, licht, stijl. Werk je met Large Turbo, zet dan steps op 4 en cfg op 1,2 ([Bron: ComfyUI](https://comfyanonymous.github.io/ComfyUI_examples/sd3/)). Lopen je beelden vast op tekst in het plaatje, dan is [Flux 2 met tekst-in-beeld](/nieuws/flux-2-tekst-in-beeld-prompten) een betere keus.

## Wat je realistisch mag verwachten

Het eerste beeld duurt het langst, omdat het model dan in het geheugen wordt geladen. Daarna gaat het sneller, maar een losse GPU blijft het grote verschil: zonder kaart werkt ComfyUI wel, alleen traag. Welke andere beeld-apps lokaal draaien en of de investering loont, lees je bij [Het Laatste AI Nieuws](https://www.hetlaatsteainieuws.nl/achtergrond/ai-beeldgenerator-lokaal-draaien-pc). Wil je naast beeld ook taalmodellen lokaal draaien, kijk dan in ons [overzicht van open-weight modellen](/nieuws/open-weight-modellen-lokaal-draaien).

## Stand van zaken — bijgewerkt 2026-10-09

| Onderwerp | Stand |
| --- | --- |
| Nieuwste open beeldmodel van Stability AI | Stable Diffusion 3.5 (Large en Large Turbo, Medium vanaf 29 oktober 2024); geen SD 4 ([Bron: Stability AI](https://stability.ai/news/introducing-stable-diffusion-3-5)) |
| Geheugen SD 3.5 Medium | 9,9 GB VRAM, exclusief tekst-encoders |
| Licentie | Community License: gratis onder 1 miljoen dollar jaaromzet ([Bron: Stability AI](https://stability.ai/license)) |
| Comfy Desktop | Windows 10+ (x64 of ARM64); macOS 13+ op Apple Silicon |
| Alternatieve Mac-apps | Draw Things, DiffusionBee ([Bron: Hugging Face](https://huggingface.co/stabilityai/stable-diffusion-3.5-medium)) |
