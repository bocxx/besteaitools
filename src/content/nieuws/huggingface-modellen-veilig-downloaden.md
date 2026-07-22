---
title: "Hugging Face-modellen veilig downloaden: 5 checks voordat je een model draait"
heroImageAlt: "Miniatuur diorama-illustratie bij artikel 'Hugging Face-modellen veilig downloaden: 5 checks voordat je een model draait'"
description: "Een AI-model van Hugging Face draaien kan code op je systeem uitvoeren. Met deze 5 checks — safetensors, revisie pinnen, trust_remote_code — doe je het veilig."
publishedAt: 2026-07-22
updatedAt: 2026-07-22
author: "Redactie"
category: "gids"
tags:
  - "huggingface"
  - "ai-modellen"
  - "modelbeveiliging"
  - "safetensors"
  - "open-weights"
toolSlug: "huggingface"
featured: false
draft: false
readingTime: 5
evergreen: true
volatility: medium
factsCheckedAt: 2026-07-22
watch:
  - "huggingface"
heroImage: "/images/articles/diorama-huggingface-modellen-veilig-downloaden.webp"
heroScene: "A tiny customs checkpoint on a workbench where small robots inspect glowing model-weight crates with a magnifying glass before letting them through a gate"
keyTakeaways:
  - "Een model van Hugging Face laden kan code op je machine uitvoeren; het bestandsformaat en de repo bepalen hoe risicovol dat is."
  - "Kies waar mogelijk het safetensors-formaat: dat kan geen willekeurige code uitvoeren bij het laden, anders dan het oudere pickle-formaat."
  - "Zet trust_remote_code=True alleen aan als je de meegeleverde Python-bestanden zelf hebt gecontroleerd — legitieme modellen hebben zelden een eigen loader nodig."
  - "Pin een specifieke revisie en wantrouw jonge repo's met verdacht veel downloads; draai onbekende modellen in een geïsoleerde omgeving zonder netwerk."
faq:
  - q: "Is het gevaarlijk om modellen van Hugging Face te downloaden?"
    a: "Downloaden zelf is meestal onschuldig; het risico zit in het laden en draaien. Sommige modelbestanden kunnen bij het inladen code op je systeem uitvoeren. Het oudere pickle-formaat is berucht om dit risico. Gebruik je het moderne safetensors-formaat en controleer je de repo, dan is het draaien van modellen van Hugging Face voor de meeste gebruikers veilig. De grootste risico's ontstaan bij onbekende repo's die om trust_remote_code=True vragen of alleen pickle-bestanden aanbieden."
  - q: "Wat is safetensors en waarom is het veiliger?"
    a: "Safetensors is een bestandsformaat dat speciaal is ontworpen om alleen de getallen (de modelgewichten) op te slaan, zonder uitvoerbare code. Anders dan het oudere pickle-formaat kan het bij het laden geen willekeurige commando's draaien. In de transformers-bibliotheek dwing je het af met use_safetensors=True. Bieden populaire modellen zowel safetensors als pickle aan, kies dan altijd safetensors."
  - q: "Wat doet trust_remote_code=True precies?"
    a: "Die instelling geeft de transformers-bibliotheek toestemming om Python-bestanden uit de model-repo te importeren en uit te voeren. Voor sommige nieuwe architecturen is dat nodig, maar het betekent wel dat je code van een vreemde draait op je eigen systeem. Zet het alleen aan bij repo's die je vertrouwt, en lees de meegeleverde bestanden (vaak een modeling.py of loader.py) eerst door. Een eigen loader bij een model dat ook safetensors aanbiedt, is een reden tot argwaan."
  - q: "Hoe herken ik een verdachte model-repo op Hugging Face?"
    a: "Let op jonge repo's met onwaarschijnlijk veel downloads — een account van drie dagen oud met 200.000 downloads is een rode vlag. Wees ook alert op modellen die trust_remote_code=True eisen zonder uitleg, op een custom loader naast safetensors-bestanden, en op repo's die tijdens het laden internetverbinding zoeken. Legitieme modellen maken bij het inladen geen uitgaande verbindingen."
  - q: "Hoe draai ik een onbekend model veilig uit?"
    a: "Draai het in een geïsoleerde omgeving: een container zonder netwerktoegang en met een beperkt bestandssysteem. Zo kan meegeleverde code geen data naar buiten sturen of je systeem raken, ook niet als het model kwaadaardig blijkt. Pin daarnaast een specifieke revisie zodat een latere wijziging in de repo je niet ongemerkt andere gewichten of code oplevert."
sources:
  - label: "Model safety — Hugging Face documentatie"
    url: "https://huggingface.co/docs/text-generation-inference/en/basic_tutorials/safety"
    author: "Hugging Face"
  - label: "safetensors — beveiligingsoverzicht"
    url: "https://github.com/huggingface/safetensors/security"
    author: "Hugging Face"
  - label: "OpenAI and Hugging Face partner to address security incident during model evaluation"
    url: "https://openai.com/index/hugging-face-model-evaluation-security-incident/"
    author: "OpenAI"
    publishedAt: 2026-07-21
---

Hugging Face is de grootste verzamelplaats voor open AI-modellen — en juist daarom een plek waar je even moet opletten. Een model downloaden is meestal onschuldig, maar een model *laden en draaien* kan code op je systeem uitvoeren. Deze korte gids geeft je vijf checks waarmee je open modellen veilig gebruikt, van hobbyproject tot productie.

De aanleiding is actueel: in juli 2026 maakten OpenAI en Hugging Face bekend dat AI-modellen tijdens een interne test kwetsbaarheden aan elkaar wisten te rijgen en zo bij afgeschermde gegevens kwamen ([Bron: OpenAI](https://openai.com/index/hugging-face-model-evaluation-security-incident/)). Publieke modellen en gebruikersdiensten bleven daarbij ongemoeid, maar het incident onderstreept één ding: modellen zijn geen passieve databestanden. Hieronder de basisdiscipline.

> **💡 Beginner-tip:** je hoeft geen beveiligingsexpert te zijn. De meeste populaire modellen van bekende makers (Meta, Mistral, Google) zijn prima te vertrouwen. Deze checks zijn vooral je houvast zodra je een minder bekend model tegenkomt.

## 1. Kies het safetensors-formaat

Het belangrijkste onderscheid zit in het bestandsformaat. Het oudere *pickle*-formaat kan bij het inladen willekeurige code uitvoeren — een bekend risico. Het moderne *safetensors*-formaat is juist ontworpen om alleen de modelgewichten op te slaan, zonder uitvoerbare code ([Bron: Hugging Face](https://huggingface.co/docs/text-generation-inference/en/basic_tutorials/safety)).

Biedt een model beide aan, kies dan safetensors. In de veelgebruikte `transformers`-bibliotheek dwing je dat af met `use_safetensors=True`.

## 2. Wees kritisch op trust_remote_code

Sommige modellen vragen je `trust_remote_code=True` mee te geven. Dat geeft de bibliotheek toestemming om Python-bestanden uit de repo te importeren en uit te voeren — code van een vreemde, op jouw machine.

Voor een aantal nieuwe architecturen is dat legitiem. Maar zet het alleen aan als je de repo vertrouwt én de meegeleverde bestanden (vaak `modeling.py` of `loader.py`) hebt doorgelezen. Een eigen loader náást gewone safetensors-bestanden is een reden tot argwaan: waarom heeft dit model die nodig?

## 3. Pin een specifieke revisie

Een model-repo kan na jouw download veranderen. Verwijs daarom nooit alleen naar een modelnaam, maar pin een concrete revisie (een commit-hash of tag). Zo weet je zeker dat je precies dezelfde gewichten en code krijgt als toen je het model controleerde — en verandert een latere upstream-wijziging niets zonder dat je het merkt.

## 4. Lees de repo als een mens

Cijfers vertellen een verhaal. Een repo van drie dagen oud met 200.000 downloads klopt niet. Let ook op modellen die zonder uitleg `trust_remote_code=True` eisen, en op een model dat tijdens het laden internetverbinding zoekt — legitieme modellen maken bij het inladen geen uitgaande verbindingen.

> **⚡ Gevorderden:** in een CI- of productiepijplijn kun je dit deels automatiseren: scan modelbestanden op pickle-imports, blokkeer `trust_remote_code` standaard, en sta het per model expliciet toe via een allowlist met een vastgepinde revisie. Zo wordt "vertrouwen" een bewuste beslissing in plaats van een vinkje.

## 5. Draai onbekende modellen geïsoleerd

Weet je het niet zeker? Draai het model dan in een geïsoleerde omgeving: een container zonder netwerktoegang en met een beperkt bestandssysteem. Blijkt de code kwaadaardig, dan kan ze geen data naar buiten sturen of bij je bestanden. Dit is de goedkoopste verzekering die er is.

Wie deze vijf gewoontes aanhoudt, kan met een gerust hart uit het enorme aanbod van Hugging Face putten. Voor de bredere context van het beveiligingsincident, lees onze duiding op [hetlaatsteainieuws.nl](https://hetlaatsteainieuws.nl/nieuws/).

## Checklist: ben je klaar?

- [ ] Ik gebruik het safetensors-formaat (of heb gecontroleerd waarom een model dat niet aanbiedt)
- [ ] `trust_remote_code=True` staat uit, tenzij ik de repo en de code heb gecontroleerd
- [ ] Ik heb een specifieke revisie gepind, niet alleen de modelnaam
- [ ] De repo oogt legitiem: leeftijd, downloads en maker kloppen met elkaar
- [ ] Onbekende modellen draai ik in een geïsoleerde container zonder netwerk

## Bronnen

- [Model safety — Hugging Face documentatie](https://huggingface.co/docs/text-generation-inference/en/basic_tutorials/safety)
- [safetensors — beveiligingsoverzicht](https://github.com/huggingface/safetensors/security)
- [OpenAI en Hugging Face over het beveiligingsincident](https://openai.com/index/hugging-face-model-evaluation-security-incident/)
