---
title: "Cohere Embed: Nederlandse documenten doorzoeken met Python"
description: "Zoek in je Nederlandse documenten op betekenis in plaats van trefwoorden. Zo zet je tekst om in embeddings met Cohere Embed en vergelijk je ze in Python."
publishedAt: 2026-09-30
updatedAt: 2026-09-30
author: "Redactie"
category: "gids"
tags:
  - "cohere"
  - "embeddings"
  - "semantisch-zoeken"
  - "nederlands"
  - "python"
  - "rag"
toolSlug: "cohere"
featured: false
draft: false
readingTime: 5
heroImage: "/images/articles/diorama-cohere-embed-meertalig-nederlandse-documenten.webp"
heroImageAlt: "Miniatuur diorama-illustratie bij artikel 'Cohere Embed: Nederlandse documenten doorzoeken met Python'"
heroScene: "A miniature archive room where small paper cards are pinned on a wooden map by meaning, similar cards clustered together, a brass magnifier hovering over one cluster"
keyTakeaways:
  - "Een embedding zet een stuk tekst om in een rij getallen, zodat je teksten met dezelfde betekenis kunt vinden, ook als ze andere woorden gebruiken."
  - "Volgens de Cohere-documentatie ondersteunen de meertalige Embed-modellen meer dan 100 talen, waaronder Nederlands. De v5.0-modellen nemen tot 128k tokens per input."
  - "Gebruik input_type search_document voor je documenten en search_query voor de vraag van de gebruiker, en stuur maximaal 96 teksten per aanroep."
  - "Met output_dimension kies je een kleinere vector om opslag te besparen. Test dan wel of je zoekresultaten goed blijven."
faq:
  - q: "Wat is een embedding?"
    a: "Een embedding is een lijst getallen die de betekenis van een tekst weergeeft. Teksten met een vergelijkbare betekenis krijgen vectoren die dicht bij elkaar liggen, ook als ze andere woorden gebruiken. Zo vindt 'mijn factuur is nog niet betaald' de tekst 'openstaande rekening' terug, terwijl een trefwoordzoekopdracht dat mist."
  - q: "Werkt Cohere Embed met Nederlandse tekst?"
    a: "Ja. In de Cohere-documentatie staat dat de meertalige modellen meer dan 100 talen ondersteunen en dat Nederlands (nl) in die lijst staat. Test het altijd op je eigen documenten, want vakjargon en afkortingen scoren niet overal even goed."
  - q: "Waarom zijn er twee input_type-waarden, search_document en search_query?"
    a: "De modellen behandelen een zoekvraag anders dan een document dat je wilt terugvinden. Met search_document embed je de teksten die je doorzoekbaar maakt, met search_query de vraag van de gebruiker. Gebruik je voor beide dezelfde waarde, dan worden de resultaten meestal minder precies."
  - q: "Hoeveel teksten kan ik in één aanroep sturen?"
    a: "Volgens de API-referentie maximaal 96 teksten per aanroep. Heb je er meer, verdeel ze dan over meerdere aanroepen. De parameter truncate bepaalt wat er gebeurt met een tekst die langer is dan de maximale lengte: NONE geeft een foutmelding, START of END knipt de tekst."
  - q: "Wat kost Cohere Embed?"
    a: "Dat staat niet in de documentatie die we raadpleegden en de prijzen wijzigen regelmatig. Kijk op de actuele prijspagina van Cohere en reken met je eigen volume en gemiddelde tekstlengte."
sources:
  - label: "Cohere Docs — Embed models"
    url: "https://docs.cohere.com/docs/cohere-embed"
  - label: "Cohere Docs — Embed API reference"
    url: "https://docs.cohere.com/reference/embed"
---

Een klant zoekt in je kennisbank naar "terugbetaling", maar jouw handleiding heet "Geld terug bij retour". Een gewone zoekfunctie mist dat. Semantisch zoeken vindt het wel, omdat het op betekenis zoekt. In deze gids bouw je de kern daarvan met [Cohere](/ai-tools/cohere) Embed in drie stappen.

## Stap 1: installeer en kies je model

```bash
pip install cohere numpy
export COHERE_API_KEY="jouw-sleutel"
```

In de documentatie staan op het moment van schrijven onder meer `embed-v5.0-pro` (hoogste kwaliteit), `embed-v5.0-fast` (sneller), `embed-v4.0` en de oudere `embed-multilingual-v3.0` ([Bron: Cohere Docs](https://docs.cohere.com/docs/cohere-embed)). De meertalige modellen ondersteunen volgens Cohere meer dan 100 talen, waaronder Nederlands. De v5.0-modellen accepteren tot 128k tokens per input; de v3-modellen 512.

> **💡 Beginner-tip:** begin met `embed-v5.0-fast`. Je kunt later overstappen naar `pro` als je merkt dat de resultaten beter moeten. Embed je documenten opnieuw na een modelwissel, want vectoren van verschillende modellen zijn niet vergelijkbaar.

## Stap 2: embed je documenten

Teksten die je doorzoekbaar wilt maken krijgen `input_type="search_document"`:

```python
import cohere

co = cohere.ClientV2()

documenten = [
    "Geld terug bij retour: binnen 14 dagen krijg je je bedrag teruggestort.",
    "Levering duurt twee tot drie werkdagen binnen Nederland.",
    "Zo wijzig je het e-mailadres van je account.",
]

resp = co.embed(
    inputs=[{"content": [{"type": "text", "text": t} for t in documenten]}],
    model="embed-v5.0-fast",
    input_type="search_document",
    embedding_types=["float"],
)
doc_vectoren = resp.embeddings.float_
```

Let op het maximum: volgens de API-referentie mag je 96 teksten per aanroep sturen ([Bron: Cohere Docs](https://docs.cohere.com/reference/embed)). Heb je er meer, loop dan in blokken van 96.

## Stap 3: embed de vraag en vergelijk

De vraag van de gebruiker embed je met `input_type="search_query"`, en je kiest het document waarvan de vector er het dichtst bij ligt:

```python
import numpy as np

vraag = co.embed(
    inputs=[{"content": [{"type": "text", "text": "hoe krijg ik terugbetaling?"}]}],
    model="embed-v5.0-fast",
    input_type="search_query",
    embedding_types=["float"],
).embeddings.float_[0]

def cosinus(a, b):
    a, b = np.array(a), np.array(b)
    return float(a @ b / (np.linalg.norm(a) * np.linalg.norm(b)))

scores = [cosinus(vraag, d) for d in doc_vectoren]
print(documenten[int(np.argmax(scores))])
```

Het eerste document zou nu het hoogst moeten scoren, ook al komt "terugbetaling" er niet letterlijk in voor. Controleer dat met je eigen teksten voordat je erop vertrouwt.

> **⚡ Gevorderden:** met `output_dimension` kies je een kleinere vector (beschikbaar voor v4 en nieuwer; voor v5.0 zijn 256 tot 2048 mogelijk, standaard 2048). Dat scheelt opslag in je vectordatabase. Meet wel op een testset of de zoekkwaliteit overeind blijft. Wil je de top van je resultaten nog scherper maken, zet er dan [een reranker achter](/nieuws/cohere-rerank-rag-betere-antwoorden).

## Waar je op moet letten

Ga je echte klantgegevens embedden, regel dan eerst je verwerkersovereenkomst met Cohere en kijk naar de EU-hostingopties. Een embedding lijkt anoniem, maar kan herleidbaar zijn naar de brontekst. Houd ook je bron-ID's bij, zodat je bij een gevonden vector weet welke tekst erbij hoort.
