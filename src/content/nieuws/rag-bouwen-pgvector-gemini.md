---
title: "RAG bouwen met pgvector en Gemini: Postgres als vectordatabase"
description: "Met pgvector wordt je eigen PostgreSQL de vectoropslag voor RAG. Zo koppel je Gemini-embeddings en een Gemini-model tot een werkend zoek- en antwoordsysteem."
publishedAt: 2026-10-07
updatedAt: 2026-10-07
author: "Redactie"
category: "gids"
tags:
  - "gemini"
  - "pgvector"
  - "rag"
  - "postgresql"
  - "embeddings"
  - "python"
toolSlug: "gemini"
featured: false
draft: false
readingTime: 6
heroImage: "/images/articles/diorama-rag-bouwen-pgvector-gemini.webp"
heroImageAlt: "Miniatuur diorama-illustratie bij artikel 'RAG bouwen met pgvector en Gemini: Postgres als vectordatabase'"
heroScene: "An open wooden filing cabinet whose drawers hold glowing glass marbles sorted into neat rows, a brass magnifier resting on top"
evergreen: true
volatility: medium
factsCheckedAt: 2026-10-07
watch:
  - "gemini-embedding-models"
  - "gemini-models"
  - "pgvector-versie"
keyTakeaways:
  - "pgvector voegt een vector-kolomtype en similarity search toe aan PostgreSQL, zodat je voor RAG geen aparte vectordatabase hoeft te draaien."
  - "Vraag bij Gemini-embeddings 768 of 1536 dimensies op: een gewone vector-kolom in pgvector kun je indexeren tot 2.000 dimensies, en de standaard is 3.072."
  - "Embed documenten en vragen in een vast, verschillend formaat (title/text voor documenten, task/query voor vragen); dat is hoe Google het nieuwste embedding-model voor retrieval laat werken."
  - "Een HNSW-index kun je aanmaken op een lege tabel, omdat er geen trainingsstap is; dat maakt hem handig in migraties."
  - "Wissel je van embedding-model, dan moet alles opnieuw geëmbed worden: de vectorruimtes van verschillende Gemini-embeddingmodellen zijn niet uitwisselbaar."
faq:
  - q: "Wat is pgvector?"
    a: "pgvector is een open-source extensie voor PostgreSQL. Je krijgt er een kolomtype vector bij, operators om afstanden tussen vectoren te berekenen en twee indextypes (HNSW en IVFFlat) om snel de dichtstbijzijnde vectoren te vinden. Daarmee doet je gewone Postgres-database dienst als vectoropslag voor RAG, naast je bestaande tabellen, backups en rechten."
  - q: "Welk Gemini-model gebruik ik voor embeddings?"
    a: "Voor nieuwe projecten het nieuwste embedding-model uit de Gemini API; welk dat nu is, staat in de tabel Stand van zaken onderaan. Vraag via output_dimensionality 768 of 1536 dimensies op, zodat je kolom indexeerbaar blijft in pgvector. Oudere modellen zoals text-embedding-004 zijn uitgefaseerd; gebruik je die nog, dan moet je je hele collectie opnieuw embedden."
  - q: "Wat is het verschil tussen HNSW en IVFFlat in pgvector?"
    a: "HNSW bouwt een gelaagde graaf en geeft volgens de pgvector-documentatie een betere verhouding tussen snelheid en nauwkeurigheid, ten koste van een langzamere indexbouw en meer geheugen. IVFFlat bouwt sneller, maar heeft een trainingsstap en dus al data nodig voordat je de index aanmaakt. Voor de meeste RAG-projecten is HNSW de logische eerste keus."
  - q: "Kan ik pgvector gebruiken bij een managed PostgreSQL-dienst?"
    a: "Meestal wel. pgvector houdt zelf een lijst bij van hostingpartijen die de extensie aanbieden, en bij veel diensten zet je hem aan met CREATE EXTENSION vector. Controleer wel welke pgvector-versie je provider draait, want iteratieve index-scans voor gefilterde zoekopdrachten zitten pas in versie 0.8.0 en later."
  - q: "Heb ik een aparte vectordatabase nodig voor RAG?"
    a: "Niet als je al Postgres gebruikt en je collectie overzichtelijk is. pgvector houdt je data, metadata en vectoren in één database, met één backupstrategie. Een gespecialiseerde vectordatabase wordt interessant bij heel grote collecties, als je geen Postgres zelf wilt beheren, of als je zoekfuncties nodig hebt die pgvector niet biedt."
sources:
  - label: "Gemini API — Embeddings"
    url: "https://ai.google.dev/gemini-api/docs/embeddings"
  - label: "Gemini API — Deprecations"
    url: "https://ai.google.dev/gemini-api/docs/deprecations"
  - label: "Gemini API — Pricing"
    url: "https://ai.google.dev/gemini-api/docs/pricing"
  - label: "pgvector — README"
    url: "https://github.com/pgvector/pgvector"
  - label: "pgvector — Changelog"
    url: "https://github.com/pgvector/pgvector/blob/master/CHANGELOG.md"
  - label: "pgvector-python — Psycopg 3"
    url: "https://github.com/pgvector/pgvector-python"
---

Wie een RAG-systeem bouwt, krijgt al snel het advies om er een vectordatabase bij te nemen. Draait je applicatie al op PostgreSQL, dan is dat vaak een extra dienst te veel. Met de extensie pgvector slaat Postgres zelf de embeddings op en zoekt het op betekenis. [Gemini](/ai-tools/gemini) levert in deze gids zowel de embeddings als het uiteindelijke antwoord.

Het idee van RAG (retrieval-augmented generation) is eenvoudig: het taalmodel antwoordt niet uit zijn geheugen, maar krijgt eerst de relevante stukken uit jouw eigen documenten mee. Wil je het concept eerst rustig uitgelegd zien, lees dan [wat RAG is in gewone taal](https://www.hetlaatsteainieuws.nl/achtergrond/wat-is-rag-uitleg-2026). En wil je helemaal niets bouwen, dan laat onze gids over [RAG zonder te bouwen met ChatGPT](/nieuws/rag-chatgpt-eigen-bedrijfsdata) zien hoe ver je met kant-en-klare functies komt.

## Wat pgvector toevoegt aan Postgres

pgvector geeft je een kolomtype `vector`, afstandsoperators en twee indextypes. Voor RAG gebruik je meestal cosine distance, de operator `<=>`; daarnaast zijn er `<->` (Euclidische afstand), `<#>` (negatief inner product) en `<+>` (L1) ([Bron: pgvector](https://github.com/pgvector/pgvector)).

De belangrijkste keuze is de index. HNSW bouwt een gelaagde graaf, zoekt sneller bij dezelfde nauwkeurigheid dan IVFFlat en kan worden aangemaakt voordat er data in de tabel staat, omdat er geen trainingsstap is. Daar staat een langzamere indexbouw en meer geheugengebruik tegenover ([Bron: pgvector](https://github.com/pgvector/pgvector)).

Eén harde grens bepaalt je ontwerp: een gewone `vector`-kolom kun je indexeren tot 2.000 dimensies, `halfvec` tot 4.000 ([Bron: pgvector](https://github.com/pgvector/pgvector)). Gemini-embeddings komen standaard met 3.072 dimensies, maar je kunt 128 tot 3.072 opvragen; Google raadt 768, 1536 of 3072 aan ([Bron: Gemini API-docs](https://ai.google.dev/gemini-api/docs/embeddings)). Kies dus 768 of 1536 en je zit nergens mee.

> **💡 Beginner-tip:** een embedding is een lange rij getallen die de betekenis van een tekst vastlegt. Teksten over hetzelfde onderwerp krijgen rijen die dicht bij elkaar liggen. "Wat kost het abonnement?" vindt zo ook een alinea over "tarieven", terwijl er geen woord overeenkomt.

## De RAG-loop in vier stappen

Installeer eerst de Python-pakketten: `pip install google-genai "psycopg[binary]" pgvector numpy`. Zet je API-sleutel in de omgevingsvariabele `GEMINI_API_KEY`; de client pakt die automatisch op.

### Stap 1: extensie, tabel en index

```sql
CREATE EXTENSION IF NOT EXISTS vector;

CREATE TABLE documents (
    id        bigserial PRIMARY KEY,
    title     text,
    content   text NOT NULL,
    embedding vector(768)
);

CREATE INDEX ON documents USING hnsw (embedding vector_cosine_ops);
```

Op een eigen server installeer je pgvector eerst als pakket, bijvoorbeeld `postgresql-18-pgvector` uit de PostgreSQL-APT-repository; bij veel hostingpartijen zit de extensie er al in ([Bron: pgvector](https://github.com/pgvector/pgvector)).

### Stap 2: een embedfunctie

```python
import numpy as np
import psycopg
from pgvector.psycopg import register_vector
from google import genai
from google.genai import types

client = genai.Client()  # leest GEMINI_API_KEY

def embed(text: str) -> np.ndarray:
    result = client.models.embed_content(
        model="gemini-embedding-2",
        contents=text,
        config=types.EmbedContentConfig(output_dimensionality=768),
    )
    return np.array(result.embeddings[0].values)

conn = psycopg.connect("postgresql://localhost/rag", autocommit=True)
register_vector(conn)
```

`register_vector` zorgt dat psycopg numpy-arrays als pgvector-waarden doorgeeft ([Bron: pgvector-python](https://github.com/pgvector/pgvector-python)). Bij `gemini-embedding-2` normaliseert Google ingekorte vectoren van 768 of 1536 dimensies automatisch; bij het oudere `gemini-embedding-001` moet je dat zelf doen ([Bron: Gemini API-docs](https://ai.google.dev/gemini-api/docs/embeddings)).

### Stap 3: documenten opslaan

```python
def store(content: str, title: str | None = None):
    doc = f"title: {title or 'none'} | text: {content}"
    conn.execute(
        "INSERT INTO documents (title, content, embedding) VALUES (%s, %s, %s)",
        (title, content, embed(doc)),
    )
```

Let op het voorvoegsel. `gemini-embedding-2` kent geen `task_type`-parameter meer; in plaats daarvan zet je de taak in de tekst zelf. Documenten krijgen het formaat `title: {titel} | text: {inhoud}` (zonder titel: `title: none`), vragen het formaat `task: question answering | query: {vraag}`. Google benadrukt dat je die formaten consequent moet gebruiken ([Bron: Gemini API-docs](https://ai.google.dev/gemini-api/docs/embeddings)). Splits lange documenten vooraf in stukken van een paar alinea's; één embedding per heel handboek vindt weinig terug.

### Stap 4: zoeken en antwoorden

```python
def ask(question: str) -> str:
    q_vec = embed(f"task: question answering | query: {question}")
    rows = conn.execute(
        "SELECT content FROM documents ORDER BY embedding <=> %s LIMIT 5",
        (q_vec,),
    ).fetchall()
    context = "\n\n".join(r[0] for r in rows)

    response = client.models.generate_content(
        model="gemini-3.8-flash",
        contents=(
            "Beantwoord de vraag alleen met de context hieronder. "
            "Staat het antwoord er niet in, zeg dat dan.\n\n"
            f"Context:\n{context}\n\nVraag: {question}"
        ),
    )
    return response.text
```

De modelnaam voor het antwoord is de enige regel die je regelmatig zult aanpassen. Hoe je naar een nieuwer Flash-model overstapt en welke instellingen dan veranderen, staat in onze gids over [overstappen naar Gemini 3.8 Flash](/nieuws/gemini-3-8-flash-overstappen-api). Wil je dat het model zelf beslist wanneer het zoekt, maak van `ask` dan een tool in [de tool-calling-loop met Gemini](/nieuws/gemini-function-calling-agent-loop).

> **⚡ Gevorderden:** filter je op metadata (`WHERE afdeling = 'hr'`), dan past pgvector het filter pas toe ná de indexscan. Met de standaard `hnsw.ef_search` van 40 en een filter dat 10 procent van de rijen overlaat, houd je gemiddeld maar vier resultaten over. Zet `SET hnsw.iterative_scan = strict_order;` om de index verder te laten doorzoeken; dat werkt vanaf pgvector 0.8.0. Bouw je een grote index, verhoog dan tijdelijk `maintenance_work_mem`, zonder je server leeg te trekken ([Bron: pgvector](https://github.com/pgvector/pgvector)).

## Waar het misgaat

De meeste problemen zitten niet in pgvector maar in de embeddings. Wissel je van embedding-model, dan zijn oude en nieuwe vectoren niet vergelijkbaar: Google schrijft letterlijk dat je bij een upgrade naar `gemini-embedding-2` al je bestaande data opnieuw moet embedden ([Bron: Gemini API-docs](https://ai.google.dev/gemini-api/docs/embeddings)). Leg daarom bij elke rij vast met welk model hij is gemaakt. Dat bespaart je later een avond puzzelen over waarom de zoekresultaten ineens nergens op slaan.

Komt het juiste fragment wel terug maar op plek zeven, dan helpt een extra rerank-stap; zie onze gids over [Cohere Rerank in je RAG](/nieuws/cohere-rerank-rag-betere-antwoorden). Liever een framework dat het knippen, embedden en zoeken voor je regelt? Dan is [LlamaIndex](/nieuws/llamaindex-rag-eigen-documenten) een logische volgende stap.

Een aparte vectordatabase wordt pas interessant als je collectie zo groot wordt dat Postgres er merkbaar onder lijdt, als je geen Postgres zelf wilt beheren, of als je zoekfuncties nodig hebt die pgvector niet heeft. Tot die tijd geldt: je hebt al een database, je hebt al backups. Zet `CREATE EXTENSION vector;` in je volgende migratie.

## Stand van zaken — bijgewerkt 2026-10-07

Alles hierboven blijft staan, ongeacht welk model er draait. De cijfers en versies hieronder zijn de bederfelijke laag.

| Onderwerp | Stand |
| --- | --- |
| Nieuwste Gemini-embeddingmodel | `gemini-embedding-2` (sinds 22 april 2026), tekst plus beeld, audio, video en pdf, max. 8.192 invoertokens ([Bron: Gemini API-docs](https://ai.google.dev/gemini-api/docs/embeddings)) |
| Ouder embeddingmodel | `gemini-embedding-001`, alleen tekst, met `task_type`; uitfasering gepland op 14 mei 2028 ([Bron: Gemini deprecations](https://ai.google.dev/gemini-api/docs/deprecations)) |
| Uitgefaseerd | `text-embedding-004` (sinds 14 januari 2026), `embedding-001` |
| Dimensies | standaard 3.072, instelbaar 128 tot 3.072; aanbevolen 768, 1536 of 3072 |
| Prijs embeddings | `gemini-embedding-2`: 0,20 dollar per miljoen teksttokens, 0,10 dollar via Batch; gratis tier beschikbaar ([Bron: Gemini API-prijzen](https://ai.google.dev/gemini-api/docs/pricing)) |
| Model voor het antwoord | `gemini-3.8-flash`: 0,75/3,75 dollar per miljoen in/uit tot eind 2026, 1,50/7,50 vanaf 2027; goedkoper alternatief `gemini-3.5-flash-lite` (0,30/2,50) ([Bron: Gemini API-prijzen](https://ai.google.dev/gemini-api/docs/pricing)) |
| pgvector | versie 0.8.7 (1 oktober 2026); iteratieve index-scans sinds 0.8.0 ([Bron: pgvector changelog](https://github.com/pgvector/pgvector/blob/master/CHANGELOG.md)) |
| Indexlimiet | `vector` tot 2.000 dimensies, `halfvec` tot 4.000 |

Op de gratis tier van de Gemini API mag Google je invoer gebruiken om zijn producten te verbeteren; voor klant- of bedrijfsdata hoort je toepassing op de betaalde tier ([Bron: Gemini API-prijzen](https://ai.google.dev/gemini-api/docs/pricing)).
