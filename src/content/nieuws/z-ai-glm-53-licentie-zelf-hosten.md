---
title: "GLM-5.3 zelf draaien: welke licentie geldt er?"
description: "GLM-5.3 staat als open weights online, maar niet meer onder MIT. Zo kies je tussen het volledige model en GLM-5.3-Flash, wat de licentie eist en wat het aan hardware kost."
publishedAt: 2026-09-30
updatedAt: 2026-09-30
author: "Redactie"
category: "gids"
tags:
  - "z-ai"
  - "glm-5-3"
  - "open-weights"
  - "licentie"
  - "zelf-hosten"
  - "hugging-face"
toolSlug: "z-ai"
featured: false
draft: false
readingTime: 4
heroImage: "/images/articles/diorama-z-ai-glm-53-licentie-zelf-hosten.webp"
heroImageAlt: "Miniatuur diorama-illustratie bij artikel 'GLM-5.3 zelf draaien: welke licentie geldt er?'"
heroScene: "Two wooden crates on a workshop bench, one open with its lid off, the other closed and sealed with a brass padlock"
keyTakeaways:
  - "GLM-5.3-Flash (321 miljard parameters, 18 miljard actief) staat volgens Hugging Face onder de MIT-licentie en is het makkelijkste model om zelf te hosten."
  - "Het volledige GLM-5.3 (753 miljard parameters) staat sinds 28 augustus 2026 op Hugging Face onder een eigen 'GLM-5.3 License', niet onder MIT."
  - "Volgens The New Stack en Digital Applied moeten bedrijven met meer dan $10 miljard omzet eerst door een beveiligingstoets van Z.ai; kleinere partijen hebben die drempel niet."
  - "Het volledige model vraagt ongeveer 245 GB geheugen in 2-bit en 810 GB in 8-bit, dus voor de meeste teams is Flash of de API de realistische route."
faq:
  - q: "Is GLM-5.3 nog steeds MIT-gelicenseerd?"
    a: "Alleen deels. GLM-5.3-Flash staat volgens de Hugging Face-pagina onder MIT. Het volledige GLM-5.3 heeft een eigen 'GLM-5.3 License'. Eerdere GLM-modellen zoals GLM-5.2 kwamen wel onder MIT uit, dus wat je over 'de GLM-modellen' las, geldt niet meer voor het nieuwste vlaggenschip."
  - q: "Mag ik GLM-5.3 commercieel gebruiken?"
    a: "Volgens The New Stack en Digital Applied wel, tenzij je bedrijf meer dan $10 miljard omzet over twaalf maanden heeft. Dan moet je eerst door Z.ai's beveiligingstoets voordat je het model of afgeleiden commercieel inzet. Digital Applied merkt op dat de criteria van die toets niet zijn gepubliceerd. Lees altijd de licentietekst zelf, want wij konden die niet volledig inzien."
  - q: "Hoeveel geheugen heb ik nodig voor GLM-5.3?"
    a: "Volgens The New Stack ongeveer 245 GB voor een 2-bit-versie en 810 GB voor 8-bit. Dat past niet op een gewone laptop of één GPU. Het kleinere GLM-5.3-Flash heeft 18 miljard actieve parameters en is veel lichter, al moet je nog steeds alle 321 miljard parameters in geheugen houden."
  - q: "Waar download ik GLM-5.3 veilig?"
    a: "Van de officiële organisatie op Hugging Face, zai-org, met de modellen zai-org/GLM-5.3 en zai-org/GLM-5.3-Flash. Controleer dat de naam van de uitgever klopt voordat je downloadt. Onze gids over veilig downloaden legt de checks uit."
  - q: "Wat is het alternatief als ik het niet zelf wil hosten?"
    a: "De Z.ai-API of het GLM Coding Plan. Volgens The New Stack kost GLM-5.3 via de API $1,40 input en $4,40 output per miljoen tokens, en Flash $0,15 en $0,47. Controleer de prijzen op de Z.ai-site voordat je rekent."
sources:
  - label: "Hugging Face — zai-org/GLM-5.3"
    url: "https://huggingface.co/zai-org/GLM-5.3"
  - label: "Hugging Face — zai-org/GLM-5.3-Flash"
    url: "https://huggingface.co/zai-org/GLM-5.3-Flash"
  - label: "The New Stack — Z.ai's GLM-5.3 goes open weight, but its new license aims at big companies"
    url: "https://thenewstack.io/zai-glm-weights-license/"
  - label: "Digital Applied — GLM-5.3's weights are out, the licence is not MIT"
    url: "https://www.digitalapplied.com/blog/glm-5-3-weights-bespoke-license-not-mit"
  - label: "Z.ai Developer Docs — release notes"
    url: "https://docs.z.ai/release-notes/new-released"
---

Z.ai bracht eind augustus twee GLM-5.3-modellen uit, en ze hebben niet dezelfde licentie. Wie 'open source, MIT' onthield van GLM-5.2, moet nu eerst kijken welk model hij wil draaien.

## Stap 1: kies Flash of het volledige model

GLM-5.3-Flash verscheen op 26 augustus ([Bron: Z.ai docs](https://docs.z.ai/release-notes/new-released)). Het heeft 321 miljard parameters waarvan 18 miljard actief, en de Hugging Face-pagina noemt als licentie MIT ([Bron: Hugging Face](https://huggingface.co/zai-org/GLM-5.3-Flash)). Het is ook het eerste GLM-5-model met native beeldbegrip.

Het volledige GLM-5.3 volgde op 28 augustus, na een veiligheidsperiode van twee weken, en telt 753 miljard parameters ([Bron: The New Stack](https://thenewstack.io/zai-glm-weights-license/)). Voor codeertaken claimt Z.ai 50 procent beter dan GLM-5.2 op de eigen Code Bench ([Bron: Z.ai docs](https://docs.z.ai/release-notes/new-released)). Dat is een vendor-cijfer.

> **Beginner-tip:** 'open weights' betekent dat je het model kunt downloaden en zelf draaien. Dat is iets anders dan open source in de strenge zin. Lees eerst [wat je lokaal kunt draaien](/nieuws/open-weight-modellen-lokaal-draaien) als je nog nooit een model hebt geïnstalleerd.

## Stap 2: lees de licentie voor je iets bouwt

Het volledige model draagt op Hugging Face de licentienaam 'glm-5.3', een eigen licentie ([Bron: Hugging Face](https://huggingface.co/zai-org/GLM-5.3)). Volgens The New Stack moeten bedrijven met meer dan $10 miljard omzet in twaalf maanden 'must pass Z.AI's security review' voordat ze de software of afgeleiden commercieel inzetten. Digital Applied merkt op dat die drempel bedoeld is voor aanbieders van Model-as-a-Service, dat end-user-producten met modelfuncties zijn uitgezonderd, en dat er geen gepubliceerde beoordelingscriteria zijn ([Bron: Digital Applied](https://www.digitalapplied.com/blog/glm-5-3-weights-bespoke-license-not-mit)).

Voor een zzp'er, mkb-bedrijf of startup verandert er daarom in de praktijk weinig. Voor een multinational of een cloudaanbieder die het model doorverkoopt wel. De licentietekst zelf konden wij niet volledig inzien; lees hem dus zelf vóór je uitrolt.

## Stap 3: reken je hardware na

Volgens The New Stack heeft het volledige model in een 2-bit-versie ongeveer 245 GB geheugen nodig en in 8-bit ongeveer 810 GB. Dat is serverwerk, niet iets voor je laptop. Flash is lichter in rekenwerk door de 18 miljard actieve parameters, maar je moet nog steeds alle 321 miljard parameters laden.

> **Gevorderden:** beide modellen ondersteunen volgens Hugging Face onder meer vLLM, SGLang, KTransformers, Transformers en Unsloth. Start met Flash op vLLM of SGLang en meet eerst je doorvoer, voor je de investering in het grote model rechtvaardigt.

## Stap 4: download alleen van de officiële bron

De modellen staan onder `zai-org/GLM-5.3` en `zai-org/GLM-5.3-Flash`. Controleer de uitgever voor je iets ophaalt; nagemaakte repo's met dezelfde naam komen voor. Onze [gids over veilig downloaden](/nieuws/huggingface-modellen-veilig-downloaden) loopt de checks langs.

Wil je niet zelf hosten, dan blijft de API. Volgens The New Stack kost het volledige model $1,40 input en $4,40 output per miljoen tokens, Flash $0,15 en $0,47. Hoe je een Coding Plan aan Claude Code koppelt, staat in [onze gids daarover](/nieuws/z-ai-glm-coding-plan-claude-code-koppelen).

## Checklist: ben je klaar?

- Je weet welk model je wilt: Flash (MIT) of volledig (GLM-5.3 License).
- Je hebt de licentietekst zelf gelezen en je omzet getoetst aan de $10-miljarddrempel.
- Je hebt de hardware of huurcapaciteit voor het gekozen model, inclusief de quantisatie.
- Je downloadt van `zai-org` en hebt de uitgever gecontroleerd.
- Je hebt de prijzen op de Z.ai-site nagelopen als je de API gebruikt.

Voor de bredere context, waarom Chinese open modellen zo hard groeien, lees [onze analyse op Het Laatste AI Nieuws](https://www.hetlaatsteainieuws.nl/regelgeving/china-glm-5-2-antwoord-anthropic-exportban).
