---
title: "Cohere Rerank toevoegen aan je RAG: betere antwoorden, lagere tokenkosten"
heroImage: "/images/articles/diorama-cohere-rerank-rag-betere-antwoorden.webp"
description: "Je RAG haalt de juiste passage wel op, maar op plek acht. Met een rerank-stap zet je hem bovenaan — en stuur je minder tekst naar je taalmodel."
publishedAt: 2026-08-20
updatedAt: 2026-08-20
author: "Redactie"
category: "gids"
tags:
  - "cohere"
  - "rerank"
  - "rag"
  - "embeddings"
  - "semantisch-zoeken"
  - "tokenkosten"
toolSlug: "cohere"
featured: false
draft: false
readingTime: 5
heroImageAlt: "Miniatuur diorama-illustratie bij artikel 'Cohere Rerank toevoegen aan je RAG: betere antwoorden, lagere tokenkosten'"
heroScene: "A tiny sorting table where small paper cards are being reshuffled into a new order, the top three cards standing upright and lit"
keyTakeaways:
  - "Een rerank-stap herordent de passages die je zoekmachine ophaalde, vlak voordat ze naar je taalmodel gaan."
  - "Cohere rekent per search af: één query met maximaal honderd documenten telt als één search."
  - "Rerank 4 Fast kost ongeveer 2 dollar per duizend searches, Rerank 4 Pro ongeveer 2,50 dollar."
  - "Minder passages doorsturen verlaagt je inputtokens bij de generatiestap, wat de rerank-kosten vaak terugverdient."
faq:
  - q: "Wat doet een reranker dat mijn vector-zoekopdracht niet doet?"
    a: "Een vectorzoekopdracht vergelijkt de embedding van je vraag met de embeddings van je passages, en die zijn los van elkaar berekend. Dat is snel, maar grof. Een reranker kijkt naar de vraag en de passage samen en beoordeelt hoe goed die passage die specifieke vraag beantwoordt. Dat is duurder per stuk, dus je gebruikt het op een korte lijst: haal er vijftig op met vectorzoeken, laat de reranker daar de beste vijf uit kiezen."
  - q: "Wat kost Cohere Rerank precies?"
    a: "Cohere rekent per search. Eén search is één query met maximaal honderd documenten. Rerank 4 Fast staat op ongeveer 2 dollar per duizend searches, Rerank 4 Pro op ongeveer 2,50 dollar. Let op de kleine letters: documenten langer dan 500 tokens worden automatisch in stukken geknipt en elk stuk telt mee voor die honderd. Lange documenten kunnen één aanroep dus over meerdere gefactureerde searches uitsmeren."
  - q: "Verdient dit zichzelf terug?"
    a: "Vaak wel, via de andere kant van je pijplijn. Elke passage die je in de prompt van je taalmodel stopt, betaal je als inputtoken. Stuur je na reranking vijf goede passages door in plaats van twintig middelmatige, dan zakken je inputkosten bij de generatiestap fors. Reken het één keer door met je eigen volumes en gemiddelde passagelengte."
  - q: "Kan dit met mijn data binnen Europa?"
    a: "Cohere biedt EU-hosting, een verwerkersovereenkomst en een self-hosted optie voor wie volledige datasoevereiniteit nodig heeft. Dat laatste loopt via een enterprise-contract, niet via de gewone API. Voor een AVG-gevoelige toepassing is dat het gesprek dat je vóór de implementatie voert, niet erna."
  - q: "Zijn er open alternatieven?"
    a: "Ja. Er zijn open-source cross-encoders die je zelf kunt draaien, en Cohere's eigen Command A+ staat sinds mei 2026 als open weights onder Apache 2.0. Zelf draaien betekent wel dat je de hardware en het beheer erbij krijgt. Voor lage volumes is de API vrijwel altijd goedkoper dan een kaart die staat te wachten."
---

Je RAG-systeem vindt de juiste passage wel. Alleen staat hij op plek acht, en je stuurt alleen de top vijf door. Het antwoord dat je gebruiker krijgt is daardoor net verkeerd, terwijl de informatie gewoon in je documenten stond.

Dat is het probleem waar een reranker voor bestaat. In deze gids zet je er in drie stappen een van [Cohere](/tools/cohere) tussen.

## Stap 1: begrijp waar de stap zit

Een gewone RAG-pijplijn doet dit: vraag omzetten naar een embedding, de meest gelijkende passages ophalen uit je vectordatabase, die passages in de prompt plakken, taalmodel laat antwoorden.

De zwakke plek zit in stap twee. Vectorzoeken vergelijkt embeddings die los van elkaar zijn berekend. Dat is snel genoeg om over miljoenen passages te lopen, maar het meet gelijkenis, niet of een passage jouw vraag echt beantwoordt.

Een reranker doet dat wel. Die krijgt de vraag en de passage tegelijk te zien en beoordeelt de combinatie. Veel preciezer, en veel te duur om over je hele database te draaien. Vandaar de volgorde: haal er ruim op met vectorzoeken, laat de reranker de korte lijst herordenen.

> **💡 Beginner-tip:** zie het als solliciteren. Vectorzoeken is de eerste selectie op cv's: snel, op trefwoorden en globale gelijkenis. De reranker is het gesprek: langzamer, maar hij ziet wie er echt past. Je nodigt vijftig mensen niet uit voor een gesprek, en je selecteert ook niet op cv alleen.

## Stap 2: haal ruimer op dan je nodig hebt

Dit is de aanpassing in je bestaande code. Waar je nu de top vijf ophaalt uit je vectordatabase, haal je er straks bijvoorbeeld vijftig op.

Dat voelt verkeerd, maar het is het hele punt: de reranker kan alleen goede passages naar boven halen als ze in de lijst zitten. Haal je er vijf op, dan herordent hij vijf middelmatige.

Houd wel de facturering in de gaten. Eén search bij Cohere is één query met maximaal honderd documenten, en documenten langer dan 500 tokens worden automatisch in stukken geknipt waarbij elk stuk apart meetelt. Werk je met lange documenten, knip ze dan zelf al in passages van redelijke lengte, dan houd je zowel je kosten als je resultaten voorspelbaar.

## Stap 3: zet de rerank-aanroep ertussen

Installeer de client en zet je API-sleutel in je omgeving:

```bash
pip install cohere
export COHERE_API_KEY="jouw-sleutel"
```

Daarna komt de aanroep tussen je zoekopdracht en je prompt:

```python
import cohere

co = cohere.ClientV2()

# passages = de ~50 resultaten uit je vectordatabase
resultaat = co.rerank(
    model="<modelnaam-uit-de-cohere-docs>",  # Rerank 4 Fast of Rerank 4 Pro
    query=vraag,
    documents=passages,
    top_n=5,
)

beste = [passages[r.index] for r in resultaat.results]
```

⚠️ **Kopieer de exacte modelnaam uit de documentatie van Cohere.** De naamgeving verschuift per versie, en een verouderde string levert een foutmelding op die er onschuldig uitziet.

Wat je nu doorstuurt naar je taalmodel is `beste`, vijf passages die op de vraag zijn beoordeeld in plaats van op gelijkenis.

## Wat het oplevert

Twee dingen tegelijk, en het tweede wordt vaak vergeten.

Je antwoorden worden nauwkeuriger, omdat de relevante passage nu wél in de prompt zit. Dat is de reden dat je het doet.

En je kosten aan de generatiekant dalen. Elke passage in je prompt is een inputtoken die je betaalt. Ga je van twintig passages naar vijf, dan scheelt dat direct. Rerank 4 Fast kost ongeveer 2 dollar per duizend searches, Rerank 4 Pro ongeveer 2,50. Reken één keer uit wat twintig passages per vraag je kosten bij je huidige model, en de vergelijking is snel gemaakt.

Zit je in een AVG-gevoelige toepassing, regel dan vooraf waar de data staat. Cohere biedt EU-hosting, een verwerkersovereenkomst en een self-hosted variant via een enterprise-contract. Dat is een gesprek dat je vóór de implementatie voert.
