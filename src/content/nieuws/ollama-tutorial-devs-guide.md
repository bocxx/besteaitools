---
title: "Ollama: draai AI gratis op je eigen machine (developers guide)"
heroImageAlt: "Miniatuur diorama-illustratie bij artikel 'Ollama: draai AI gratis op je eigen machine (developers guide)'"
heroImage: "/images/articles/diorama-ollama-tutorial-devs-guide.webp"
description: "Lokale AI zonder API-kosten of internet-afhankelijkheid. OpenAI-compatible API, 100+ modellen, scheduling via cron. Voor developers die privacy willen."
publishedAt: 2026-07-14
category: "gids"
tags: ["ollama", "local-ai", "llm", "python", "api", "cron-jobs", "privacy-first", "gratis-tools"]
doelgroep: ["developer"]
niveau: "gevorderd"
artikeltype: "tutorial"
toolSlug: "ollama"
keyTakeaways:
  - "Ollama draait modellen lokaal — nul API-kosten, geen internet nodig, volledige privacy."
  - "OpenAI-compatible API op localhost:11434 — plug-and-play in je Python/Node/Go scripts."
  - "Schedule taken 24/7 via cron jobs: dagelijkse samenvatting, wekelijkse backup-scan, real-time monitoring."
  - "Model-keuze hangt af van je hardware: 4GB VRAM = Mistral/Phi, 8GB = Llama 7B, 40GB+ = Llama 70B."
sources:
  - title: "How to Build and Secure a Personal AI Agent with OpenClaw"
    url: "https://www.freecodecamp.org/news/how-to-build-and-secure-a-personal-ai-agent-with-openclaw/"
    label: "freeCodeCamp — Personal AI agents"
  - title: "How to Build Your Own Local AI Agent with Tool Calling and Memory"
    url: "https://www.freecodecamp.org/news/how-to-build-your-own-local-ai-agent-with-tool-calling-and-memory/"
    label: "freeCodeCamp — Local agents"
  - title: "How to Build and Deploy a Multi-Agent AI System with Python and Docker"
    url: "https://www.freecodecamp.org/news/build-and-deploy-multi-agent-ai-with-python-and-docker/"
    label: "freeCodeCamp — Multi-agent systems"
  - title: "Local AI in 2026: Ollama Benchmarks & $0 Inference"
    url: "https://dev.to/pooyagolchian/local-ai-in-2026-running-production-llms-on-your-own-hardware-with-ollama-54d0"
    label: "DEV Community — Benchmarks"
  - title: "The Complete Guide to Ollama: Run Large Language Models Locally"
    url: "https://dev.to/ajitkumar/the-complete-guide-to-ollama-run-large-language-models-locally-2mge"
    label: "DEV Community — Complete guide"
---

## Waarom lokale AI?

Je werkt voor een bedrijf met gevoelige klantdata. Of je bent een freelancer die miljarden ChatGPT-calls niet kan betalen. Of je wilt AI gebruiken op plekken zonder internet — in de trein, het vliegtuig, op locatie. De cloud-API's van OpenAI, Anthropic en Google zijn krachtig, maar ze kosten geld per token. Ollama slaat een nieuwe route in: je downloadt een LLM eenmalig, draait het op je lokale machine, en bespaard voortaan alle API-kosten.

Dit tutorial leert je:
- Ollama installeren en je eerste model runnen
- De OpenAI-compatible API gebruiken in Python
- Dagelijkse taken automaten met cron jobs
- Hardware-keuze (welk model past in jouw RAM?)

## Wat is Ollama?

Ollama is een open-source runtime die grote taalmodellen op je lokale machine draait. Het werkt als een soort Docker voor AI: je geeft één commando, het model downloadt, de runtime start, en je hebt meteen een API op localhost:11434. Geen subscriptie, geen usage limits, geen per-token-facturering. Volledig gratis, MIT-licentie.

Ondersteunde modellen (juli 2026):
- **Mistral 7B** — zeer snel, goed voor codegeneratie (4GB VRAM)
- **Llama 2 / Llama 3** — sterke general-purpose modellen (7B tot 70B varianten)
- **Qwen 2.5** — multilingual, goed voor Nederlands
- **DeepSeek** — nieuwe opkomers in quality/speed trade-off
- **Phi 3** — micro-modellen voor edge devices
- **Vision models** — Llava, Moondream (afbeeldingen analyseren)

Over 100 modellen beschikbaar; check [ollama.ai](https://ollama.ai) voor de volledige lijst.

## Stap 1: Ollama installeren

### macOS
```bash
# Download & install via Homebrew
brew install ollama

# Of direct DMG-installer: https://ollama.ai/download
```

### Linux (Ubuntu/Debian)
```bash
curl -fsSL https://ollama.ai/install.sh | sh
```

### Windows
Download de `.exe` van [ollama.ai/download](https://ollama.ai/download) — installeert als Windows service.

### Controleer installatie
```bash
ollama --version
# Output: ollama version 0.1.47 (of nieuwer)
```

## Stap 2: Je eerste model runnen

Kies een model op basis van je hardware:

| Model | VRAM | Speed | Best for |
|-------|------|-------|----------|
| Mistral 7B | 4GB | Snel | Code, snelle replies |
| Phi 3 | 2GB | Zeer snel | Embedded / edge |
| Llama 2 13B | 8GB | Goed | Balanced |
| Qwen 2.5 14B | 8GB | Goed | Nederlandse content |
| Llama 3 70B | 40GB+ | Langzaam | Beste kwaliteit |

**Regel:** ± 0.6-0.7 GB VRAM per miljard parameters + overhead. Dus:
- 4B model ≈ 2.5GB
- 7B model ≈ 4-5GB
- 13B model ≈ 8-10GB

### Run je model

```bash
# Start Mistral 7B interactief
ollama run mistral

# Of Qwen 2.5 voor Nederlands
ollama run qwen2.5

# Of Llama 3 voor high-quality
ollama run llama2
```

Je ziet:
```
>>> Send a message (/? for help)
```

Type een vraag en druk Enter. Het model genereert lokaal (geen internet-call). Eerste response duurt 5-20 seconden (afhankelijk van je CPU/GPU).

### Interactief testen

```bash
>>> Schrijf een Python-functie die alle getallen van 1 tot n telt.

[Model genereert code...]

>>> Wat is de hoofdstad van Japan?
Tokyo

>>> /bye
```

Typ `/bye` om af te sluiten. Het model blijft op de achtergrond draaien.

## Stap 3: REST API gebruiken (Python / Node)

Ollama serveert een OpenAI-compatible API op `http://localhost:11434`. Dit maakt integratie in scripts triviaal.

### Ollama daemon starten (achtergrond)

```bash
# macOS / Linux
ollama serve

# Windows
# Start de Ollama-app; deze draait de daemon automatisch.
```

De API draait nu op `:11434`.

### Python: eenvoudige chat-API

```python
import requests
import json

def chat_with_ollama(message, model="mistral"):
    """
    Lokale chat via Ollama REST API.
    """
    url = "http://localhost:11434/api/chat"
    
    payload = {
        "model": model,
        "messages": [
            {"role": "user", "content": message}
        ],
        "stream": False  # Wachten op volledige response
    }
    
    response = requests.post(url, json=payload)
    data = response.json()
    
    return data["message"]["content"]

# Gebruik
reply = chat_with_ollama("Wat zijn de top 3 voordelen van lokale AI?")
print(reply)
```

### OpenAI Python library (drop-in replacement)

Omdat Ollama OpenAI-compatible is, kun je direct `openai-python` gebruiken:

```python
from openai import OpenAI

client = OpenAI(
    base_url="http://localhost:11434/v1",
    api_key="ollama"  # Dummy key; Ollama checkt het niet
)

response = client.chat.completions.create(
    model="mistral",
    messages=[
        {"role": "user", "content": "Leg uit hoe quantum computing werkt"}
    ],
    temperature=0.7
)

print(response.choices[0].message.content)
```

### Node.js / JavaScript

```javascript
const fetch = require('node-fetch');

async function chatWithOllama(message, model = 'mistral') {
    const response = await fetch('http://localhost:11434/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
            model,
            messages: [{ role: 'user', content: message }],
            stream: false
        })
    });
    
    const data = await response.json();
    return data.message.content;
}

// Gebruik
chatWithOllama('Hoeveel maanden zijn er in een jaar?').then(console.log);
```

## Stap 4: Dagelijkse taken automaten (Cron + Ollama)

Het echte kracht van lokale AI: 24/7 automation zonder API-kosten.

### Use-case: dagelijkse samenvatting van een lokale logfile

```python
#!/usr/bin/env python3
# ~/projects/daily_log_summary.py

import json
import subprocess
from datetime import datetime

def run_ollama(prompt, model="mistral"):
    """Run Ollama model via subprocess."""
    result = subprocess.run(
        ["ollama", "run", model, prompt],
        capture_output=True,
        text=True,
        timeout=120
    )
    return result.stdout.strip()

def summarize_logs():
    """Lees vandaag's logs, genereer samenvatting."""
    
    # Lees logs
    with open("/var/log/myapp.log", "r") as f:
        logs = f.read()[-2000:]  # Laatste 2000 chars
    
    # Stuur naar Ollama
    prompt = f"""Maak een korte samenvatting (3-5 regels) van deze logs, 
focus op fouten en waarschuwingen:

{logs}"""
    
    summary = run_ollama(prompt, model="mistral")
    
    # Sla op
    timestamp = datetime.now().isoformat()
    with open("/home/user/log_summaries.jsonl", "a") as f:
        f.write(json.dumps({
            "date": timestamp,
            "summary": summary
        }) + "\n")
    
    print(f"Samenvatting opgeslagen: {summary[:80]}...")

if __name__ == "__main__":
    summarize_logs()
```

### Cron job instellen

```bash
# Edit crontab
crontab -e

# Voeg toe:
0 8 * * * /usr/bin/python3 /home/user/daily_log_summary.py

# Uitleggen: elke dag om 8 uur (0 8) script runnen
```

Resultaat: dagelijks, zonder handwerk, krijg je een AI-samenvatting van je logs.

### Use-case 2: wekelijkse "monitoring assistant"

```python
#!/usr/bin/env python3
# Wekelijks: vergelijk CPU/mem-stats met vorige week

import requests
import psutil
from datetime import datetime

def monitor_system():
    """
    Lees system stats, vraag Ollama wat te doen.
    """
    cpu_percent = psutil.cpu_percent(interval=1)
    memory = psutil.virtual_memory()
    
    prompt = f"""
Dit is de system-status van deze week:
- CPU gemiddeld: {cpu_percent}%
- RAM in gebruik: {memory.percent}%
- Beschikbaar: {memory.available / (1024**3):.1f}GB

Wat moet ik checken of optimaliseren? Geef 2-3 acties.
"""
    
    # Via REST API
    url = "http://localhost:11434/api/generate"
    response = requests.post(url, json={
        "model": "mistral",
        "prompt": prompt,
        "stream": False
    })
    
    advice = response.json()["response"]
    
    print("Wekelijks monitoring advies:")
    print(advice)
    
    # Log to Telegram / Email / Slack
    # send_telegram(advice)

if __name__ == "__main__":
    monitor_system()
```

```bash
# Cron: elke maandag 9 uur
0 9 * * 1 /usr/bin/python3 /home/user/monitor_system.py
```

## Stap 5: Image-analyse (Vision models)

Ollama voegt sinds januari 2026 native image-support toe. Met [Llava](https://ollama.ai/library/llava) kun je screenshots, foto's en documenten analyseren — allemaal lokaal.

```python
import base64
from openai import OpenAI

client = OpenAI(
    base_url="http://localhost:11434/v1",
    api_key="ollama"
)

# Lees afbeelding
with open("/path/to/image.jpg", "rb") as f:
    image_b64 = base64.b64encode(f.read()).decode()

# Analyseer
response = client.chat.completions.create(
    model="llava",
    messages=[{
        "role": "user",
        "content": "Wat zie je op deze screenshot? Fokus op tekstdelen.",
        "image_url": {
            "url": f"data:image/jpeg;base64,{image_b64}"
        }
    }]
)

print(response.choices[0].message.content)
```

### Llava installeren

```bash
ollama pull llava
ollama run llava
```

## Stap 6: Performance & troubleshooting

### Model niet snel genoeg?

**Oorzaken & fixes:**
1. **CPU-only run** → NVIDIA GPU toevoegen (`ollama run --gpu` / CUDA installeren)
2. **Model te groot** → Kleinere versie proberen (Mistral 7B i.p.v. Llama 70B)
3. **VRAM vol** → Ander model uit-cachen: `ollama rm llama2` en `ollama pull mistral`

### Out-of-Memory (OOM)?

```bash
# Controleer beschikbare VRAM
nvidia-smi  # (GPU)
free -h     # (RAM)

# Quantization-hint in URL (Ollama kiest automatisch):
ollama run mistral:7b-q4_0  # Q4 = meer compressie, sneller
ollama run mistral:7b-q2_0  # Q2 = nog sneller, lagere quality
```

### API niet bereikbaar?

```bash
# Controleer of daemon draait
ps aux | grep ollama

# Herstart
ollama serve

# Test API
curl http://localhost:11434/api/generate -d '{
  "model": "mistral",
  "prompt": "hello",
  "stream": false
}'
```

## Productiehints

### 1. Achtergrond-daemon (systemd)

```bash
# /etc/systemd/system/ollama.service
[Unit]
Description=Ollama
After=network.target

[Service]
Type=simple
User=ollama
ExecStart=/usr/local/bin/ollama serve
Restart=always

[Install]
WantedBy=multi-user.target
```

```bash
sudo systemctl enable ollama
sudo systemctl start ollama
systemctl status ollama
```

### 2. Reverse proxy (Nginx)

Gooi Ollama achter Nginx om extra beveiliging/logging toe te voegen:

```nginx
server {
    listen 80;
    server_name ai.mycompany.local;
    
    location / {
        proxy_pass http://localhost:11434;
        proxy_buffering off;
        proxy_request_buffering off;
    }
}
```

### 3. Model-caching

Models blijven in RAM nadat je ze draait (sneller bij hergebruik). Controleer geheugengebruik:

```bash
ollama ps
# NAME    ID      SIZE    PROCESSOR
# mistral abc...  3.8GB   GPU
```

Verwijder ongebruikte models:

```bash
ollama rm mistral
ollama rm llama2
```

### 4. Meerdere workers (load balancing)

Voor productie-setups: draai Ollama op meerdere machines / containers. Use case: voorkomen dat één zwaar request alles blokkeert.

## Volgende stappen

- **RAG (Retrieval Augmented Generation):** combineer Ollama met LangChain + vector DB (Chroma, Pinecone) voor documentzoeken
- **Multi-agent systemen:** bouw samenwerkende AI-assistenten die elkaar roepen — onze gids [multi-agent AI lokaal bouwen met Ollama](/nieuws/ollama-multi-agent-lokaal-bouwen) zet de basis op in vier stappen
- **Cloudflare Workers:** publiceer je Ollama-API via Cloudflare voor remote access (zónder het internet in)
- **Fine-tuning:** train Ollama-modellen op je eigen data (advanced)

## Samenvatting

Ollama geeft je volledige controle: geen facturering per token, geen data naar de cloud, volledige privacy, 24/7 offline beschikbaar. Het kost je alleen eenmalig een model te downloaden en — afhankelijk van je model-keuze — wat hardware. Voor developers die lokale AI willen, is dit de standaard geworden in 2026.

Begin vandaag: `ollama run mistral` en je bent in 30 seconden klaar.
