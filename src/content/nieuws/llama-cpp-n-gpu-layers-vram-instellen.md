---
title: "llama.cpp -ngl instellen: zo verdeel je een model over je VRAM"
description: "Met -ngl bepaal je hoeveel lagen van een model llama.cpp op je GPU zet. Zo kies je tussen auto, all of een getal, en wanneer --fit en --n-cpu-moe helpen."
publishedAt: 2026-10-07
updatedAt: 2026-10-07
author: "Redactie"
category: "gids"
tags:
  - "llama-cpp"
  - "lokale-llm"
  - "gpu"
  - "vram"
  - "gguf"
  - "lm-studio"
  - "open-source"
toolSlug: "lm-studio"
featured: false
draft: false
readingTime: 6
heroImage: "/images/articles/diorama-llama-cpp-n-gpu-layers-vram-instellen.webp"
heroImageAlt: "Miniatuur diorama-illustratie bij artikel 'llama.cpp -ngl instellen: zo verdeel je een model over je VRAM'"
heroScene: "A stack of thin wooden trays being slid one by one from a cardboard box onto a small green circuit board"
evergreen: true
volatility: medium
factsCheckedAt: 2026-10-07
watch:
  - "llama-cpp-flags"
  - "llama-cpp-fit"
keyTakeaways:
  - "-ngl (--n-gpu-layers) bepaalt hoeveel lagen van het model in je VRAM staan. Meer lagen op de GPU betekent sneller genereren, zolang alles past."
  - "De standaard is tegenwoordig 'auto': llama.cpp schat zelf hoeveel past. Met -ngl all forceer je alle lagen naar de GPU, met -ngl 0 draait alles op de CPU."
  - "Let op: -ngl -1 betekent in de huidige llama.cpp 'auto', niet 'alles'. Oude handleidingen die -1 of 999 gebruiken, bedoelen iets anders."
  - "--fit staat standaard aan en past alleen instellingen aan die jij niet zelf zet, zoals contextgrootte en het aantal GPU-lagen."
  - "Bij MoE-modellen die niet passen, zet je met --n-cpu-moe de expert-gewichten van de eerste N lagen in het RAM en houd je de rest op de GPU."
faq:
  - q: "Wat doet -ngl in llama.cpp?"
    a: "-ngl, voluit --n-gpu-layers, is het maximale aantal lagen van het model dat llama.cpp in het geheugen van je videokaart (VRAM) zet. Lagen op de GPU rekenen veel sneller dan lagen die op de CPU blijven. Je kunt een getal opgeven, 'auto' (llama.cpp kiest zelf) of 'all' (alles naar de GPU). Zonder GPU-build negeert llama.cpp de optie en waarschuwt het daarover."
  - q: "Is -ngl -1 hetzelfde als alle lagen op de GPU?"
    a: "Niet meer. In de huidige broncode van llama.cpp staat -1 voor 'auto' en -2 voor 'all'. Wil je zeker weten dat alles op de GPU gaat, schrijf dan -ngl all. Een groot getal zoals 99 of 999 werkt in de praktijk ook, omdat llama.cpp nooit meer lagen offloadt dan het model heeft. Zie de Stand van zaken onderaan voor de actuele waarden."
  - q: "Hoeveel VRAM heb ik nodig voor een 8B-model?"
    a: "Reken met de bestandsgrootte van de GGUF plus de KV-cache plus een marge. Llama 3.1 8B in Q4_K_M is ongeveer 4,9 GB. Bij 8.192 tokens context komt daar ongeveer 1 GB KV-cache bij in f16. Op een 8 GB-kaart past dat, met wat ruimte voor de rest van je systeem. Lange contexten vreten snel meer."
  - q: "Mijn model past net niet. Wat verlaag ik eerst?"
    a: "Laat eerst --fit zijn werk doen: haal je eigen -ngl en -c weg en kijk wat llama.cpp kiest. Wil je zelf sturen, verklein dan eerst de context met -c, want dat kost geen kwaliteit. Pas daarna verlaag je -ngl in stappen van een paar lagen. Een lagere kwantisatie is de laatste stap, omdat je daar wel kwaliteit voor inlevert."
  - q: "Hoe stel ik GPU-offload in bij LM Studio of Ollama?"
    a: "In LM Studio heet het GPU offload. Via de command line laad je een model met lms load en de vlag --gpu, met een waarde tussen 0 en 1, off of max. Ollama kiest de verdeling standaard zelf. Via de API-optie num_gpu kun je het aantal GPU-lagen overschrijven."
sources:
  - label: "llama.cpp — tools/server README (llama-server parameters)"
    url: "https://github.com/ggml-org/llama.cpp/blob/master/tools/server/README.md"
  - label: "llama.cpp — tools/cli README (llama-cli parameters)"
    url: "https://github.com/ggml-org/llama.cpp/blob/master/tools/cli/README.md"
  - label: "llama.cpp — common/arg.cpp (parsing van -ngl en --fit)"
    url: "https://github.com/ggml-org/llama.cpp/blob/master/common/arg.cpp"
  - label: "llama.cpp — tools/fit-params README"
    url: "https://github.com/ggml-org/llama.cpp/blob/master/tools/fit-params/README.md"
  - label: "llama.cpp — docs/build.md"
    url: "https://github.com/ggml-org/llama.cpp/blob/master/docs/build.md"
  - label: "Hugging Face — Meta-Llama-3.1-8B-Instruct-GGUF"
    url: "https://huggingface.co/bartowski/Meta-Llama-3.1-8B-Instruct-GGUF"
  - label: "LM Studio Docs — lms load"
    url: "https://lmstudio.ai/docs/cli/load"
---

Een taalmodel bestaat uit een stapel lagen. llama.cpp kan die lagen verdelen over je videokaart en je gewone processor, en de vlag `-ngl` (voluit `--n-gpu-layers`) bepaalt hoeveel er naar de GPU gaan. Dat ene getal maakt het verschil tussen een model dat vlot antwoordt en een model waar je koffie bij kunt zetten. Volgens de documentatie is het "max. number of layers to store in VRAM, either an exact number, 'auto', or 'all'" ([Bron: llama.cpp server README](https://github.com/ggml-org/llama.cpp/blob/master/tools/server/README.md)).

Dezelfde vlag werkt in `llama-cli` (chatten in de terminal) en `llama-server` (lokale API met web-interface) ([Bron: llama.cpp cli README](https://github.com/ggml-org/llama.cpp/blob/master/tools/cli/README.md)).

## Stap 1: weet wat de drie soorten waarden doen

Je kunt `-ngl` op drie manieren invullen:

- `-ngl auto`: llama.cpp schat zelf hoeveel lagen passen. Dit is de standaard.
- `-ngl all`: alle lagen gaan naar de GPU. Snelst, als het past.
- `-ngl 20` (of een ander getal): precies zoveel lagen op de GPU, de rest op de CPU. `-ngl 0` betekent geen GPU.

Een valkuil voor wie oudere handleidingen leest: in de huidige broncode is `-1` de interne waarde voor `auto` en `-2` die voor `all` ([Bron: llama.cpp arg.cpp](https://github.com/ggml-org/llama.cpp/blob/master/common/arg.cpp)). Wie dus `-ngl -1` intypt in de verwachting dat alles naar de GPU gaat, krijgt de automatische keuze. Het oude trucje met `-ngl 99` of `-ngl 999` werkt nog wel, want llama.cpp offloadt nooit meer lagen dan het model heeft. Maar `all` zegt wat je bedoelt.

Heeft je build geen GPU-ondersteuning, dan negeert llama.cpp de vlag en meldt het dat in een waarschuwing ([Bron: llama.cpp arg.cpp](https://github.com/ggml-org/llama.cpp/blob/master/common/arg.cpp)). Een CUDA-build maak je met `cmake -B build -DGGML_CUDA=ON` ([Bron: llama.cpp build-docs](https://github.com/ggml-org/llama.cpp/blob/master/docs/build.md)).

> **💡 Beginner-tip:** Liever geen terminal? LM Studio zet dezelfde keuze in de interface onder GPU offload, en de command-line-tool `lms load` heeft er een `--gpu`-vlag voor met waarden van 0 tot 1, `off` of `max` ([Bron: LM Studio Docs](https://lmstudio.ai/docs/cli/load)). Hoe je daar een model kiest, lees je in onze gids [Llama lokaal draaien met LM Studio](/nieuws/llama-lokaal-draaien-lm-studio).

## Stap 2: reken grof uit wat er in je VRAM moet

Drie dingen nemen GPU-geheugen in: de modelgewichten, de KV-cache (het werkgeheugen voor je context) en wat buffers. De gewichten zijn ongeveer zo groot als het GGUF-bestand. Llama 3.1 8B Instruct in Q4_K_M is 4,92 GB ([Bron: Hugging Face](https://huggingface.co/bartowski/Meta-Llama-3.1-8B-Instruct-GGUF)).

De KV-cache groeit met de context. Voor Llama 3.1 8B (32 lagen, 8 key-value-heads van 128 dimensies) ([Bron: Hugging Face config](https://huggingface.co/unsloth/Llama-3.1-8B-Instruct/blob/main/config.json)) kost elk token in f16 2 × 32 × 8 × 128 × 2 bytes, oftewel 128 KB. Bij 8.192 tokens is dat 1 GB, bij 32.768 tokens 4 GB. Een 8 GB-kaart draagt dit model dus prima met korte context, maar met een lange context wordt het krap.

Een belangrijke default: `-c` staat op 0, wat betekent dat llama.cpp de contextlengte uit het model overneemt ([Bron: llama.cpp server README](https://github.com/ggml-org/llama.cpp/blob/master/tools/server/README.md)). Bij moderne modellen kan dat zomaar 128.000 tokens zijn. Zonder hulp past dan bijna niets meer.

## Stap 3: laat --fit het eerste werk doen

Die hulp heet `--fit`. De optie staat standaard aan en "adjust[s] unset arguments to fit in device memory" ([Bron: llama.cpp server README](https://github.com/ggml-org/llama.cpp/blob/master/tools/server/README.md)). In de praktijk verkleint llama.cpp dan eerst de context (niet lager dan `--fit-ctx`, standaard 4096) en verdeelt het daarna de lagen, met per GPU een marge van standaard 1024 MiB vrij geheugen (`--fit-target`).

Het woord *unset* is belangrijk. Zet je zelf `-ngl 40` of `-c 32768`, dan blijft `--fit` daar vanaf. Begin daarom zonder eigen waarden:

```bash
llama-server -m model-Q4_K_M.gguf
```

Wil je zien wat llama.cpp kiest, dan print de hulptool `llama-fit-params` de gevonden argumenten, zoals `-c 4096 -ngl 48`, die je daarna vastzet in je eigen startcommando ([Bron: llama.cpp fit-params README](https://github.com/ggml-org/llama.cpp/blob/master/tools/fit-params/README.md)). In de laadlog zie je bovendien een regel als `offloaded 33/33 layers to GPU` ([Bron: llama.cpp llama-model.cpp](https://github.com/ggml-org/llama.cpp/blob/master/src/llama-model.cpp)).

## Stap 4: zelf sturen als je het beter weet

Soms wil je meer context dan `--fit` kiest, en neem je daarvoor graag een tragere start op de koop toe. Zet dan de context vast en laat lagen vallen:

```bash
llama-server -m model-Q4_K_M.gguf -c 16384 -ngl 28
```

Loopt het vast op `out of memory`, verlaag `-ngl` dan in stappen van een paar lagen. Daarna pas grijp je naar een kleinere kwantisatie, want daar lever je kwaliteit voor in en bij context en lagen niet.

> **⚡ Gevorderden:** Bij Mixture-of-Experts-modellen is `-ngl` niet je beste knop. Met `--n-cpu-moe N` blijven de expert-gewichten van de eerste N lagen in het RAM, terwijl attention en de rest op de GPU blijven; `--cpu-moe` doet dat voor alle lagen ([Bron: llama.cpp server README](https://github.com/ggml-org/llama.cpp/blob/master/tools/server/README.md)). Voor fijnere controle wijs je met `-ot` (`--override-tensor`) tensors per naampatroon toe, bijvoorbeeld `blk\.30\.ffn_(up|down|gate)_exps=CPU`. Meerdere GPU's verdeel je met `-ts 3,1` en `-sm layer` (de standaard).

## Hoe zit het met Ollama?

Ollama regelt de GPU-verdeling standaard zelf. De API heeft een optie `num_gpu` waarmee je het aantal lagen overschrijft, en de broncode zet die standaard op -1 voor "dynamisch bepalen" ([Bron: Ollama api/types.go](https://github.com/ollama/ollama/blob/main/api/types.go)). Hoe je Ollama installeert, staat in [Ollama installeren: een AI-model lokaal draaien](/nieuws/ollama-lokale-ai-modellen-draaien); de API en scripting behandelen we in [onze developers guide voor Ollama](/nieuws/ollama-tutorial-devs-guide). Twijfel je welk model je überhaupt wilt draaien, kijk dan bij [open-weight modellen lokaal draaien](/nieuws/open-weight-modellen-lokaal-draaien) en download het [veilig van Hugging Face](/nieuws/huggingface-modellen-veilig-downloaden). Voor de bredere uitleg over waarom lokale modellen interessant zijn, lees je [Wat is Ollama? op hetlaatsteainieuws.nl](https://www.hetlaatsteainieuws.nl/achtergrond/wat-is-ollama-lokale-llm-uitleg-2026).

## Stand van zaken — bijgewerkt 2026-10-07

De uitleg hierboven blijft staan. De waarden hieronder veranderen met nieuwe llama.cpp-builds; controleer ze met `llama-server --help`.

| Onderwerp | Stand |
| --- | --- |
| Standaard `-ngl` | `auto` |
| Toegestane waarden `-ngl` | getal, `auto`, `all` |
| Interne waarde `-1` / `-2` | `auto` / `all` |
| `--fit` standaard | aan |
| `--fit-target` standaard | 1024 MiB per GPU |
| `--fit-ctx` standaard | 4096 tokens |
| Standaard `-c` | 0 (overgenomen uit het model) |
| MoE-opties | `--cpu-moe`, `--n-cpu-moe N`, `-ot` |
| Programma's | `llama-cli`, `llama-server`, `llama-fit-params` |
| Voorbeeld GGUF-grootte | Llama 3.1 8B Instruct Q4_K_M: 4,92 GB |

## Bronnen

- [llama.cpp — tools/server README](https://github.com/ggml-org/llama.cpp/blob/master/tools/server/README.md)
- [llama.cpp — tools/cli README](https://github.com/ggml-org/llama.cpp/blob/master/tools/cli/README.md)
- [llama.cpp — common/arg.cpp](https://github.com/ggml-org/llama.cpp/blob/master/common/arg.cpp)
- [llama.cpp — tools/fit-params README](https://github.com/ggml-org/llama.cpp/blob/master/tools/fit-params/README.md)
- [llama.cpp — docs/build.md](https://github.com/ggml-org/llama.cpp/blob/master/docs/build.md)
- [Hugging Face — Meta-Llama-3.1-8B-Instruct-GGUF](https://huggingface.co/bartowski/Meta-Llama-3.1-8B-Instruct-GGUF)
- [LM Studio Docs — lms load](https://lmstudio.ai/docs/cli/load)
- [Ollama — api/types.go](https://github.com/ollama/ollama/blob/main/api/types.go)
