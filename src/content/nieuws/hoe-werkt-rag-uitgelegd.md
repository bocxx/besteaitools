---
title: "RAG uitgelegd: hoe AI je eigen documenten leert begrijpen"
description: "Een technische deep dive in Retrieval-Augmented Generation: de techniek achter AI die je bedrijfsdata kan doorzoeken."
publishedAt: 2026-02-12
author: "Dr. Anna Smit"
category: "ai-deep-dives"
tags:
  - "rag"
  - "embeddings"
  - "vector-database"
  - "technisch"
featured: false
draft: false
readingTime: 12
---

## Het probleem met standaard LLMs

Large Language Models weten veel, maar niet alles. Ze kennen geen:

- Je interne bedrijfsdocumenten
- Recente informatie na hun training
- Gespecialiseerde domeinkennis

RAG lost dit op door relevante context toe te voegen aan elke query.

## Hoe RAG werkt

### 1. Indexering (vooraf)

Je documenten worden verwerkt in drie stappen:

```
Documenten → Chunks → Embeddings → Vector Database
```

**Chunking**: Grote documenten worden opgesplitst in kleinere stukken (typisch 500-1000 tokens).

**Embeddings**: Elk chunk wordt omgezet naar een numerieke vector die de semantische betekenis vastlegt.

**Opslag**: Vectors worden opgeslagen in een gespecialiseerde database (Pinecone, Weaviate, Chroma).

### 2. Retrieval (bij elke query)

```
Query → Embedding → Similarity Search → Top K Chunks
```

De vraag van de gebruiker wordt ook omgezet naar een embedding. Via cosine similarity worden de meest relevante chunks gevonden.

### 3. Generation (antwoord)

```
Prompt = System Prompt + Retrieved Chunks + User Query
```

De LLM krijgt de relevante context mee en genereert een antwoord gebaseerd op je documenten.

## Code voorbeeld

```python
from langchain.embeddings import OpenAIEmbeddings
from langchain.vectorstores import Chroma
from langchain.chains import RetrievalQA

# Indexeer documenten
embeddings = OpenAIEmbeddings()
vectorstore = Chroma.from_documents(docs, embeddings)

# Query
qa = RetrievalQA.from_chain_type(
    llm=ChatOpenAI(),
    retriever=vectorstore.as_retriever(k=5)
)

answer = qa.run("Wat is ons retourbeleid?")
```

## Best practices

1. **Chunk overlap**: 10-20% overlap voorkomt context verlies
2. **Hybrid search**: Combineer vector + keyword search
3. **Reranking**: Gebruik een tweede model om resultaten te rangschikken
4. **Metadata filtering**: Filter op bron, datum, of afdeling

## Wanneer RAG gebruiken?

✅ Interne kennisbanken  
✅ Klantenservice bots  
✅ Juridische document analyse  
✅ Technische documentatie  

❌ Creatief schrijven  
❌ Algemene conversatie  
❌ Real-time data (gebruik function calling)

## Conclusie

RAG is de brug tussen de algemene kennis van LLMs en je specifieke bedrijfsdata. Met de juiste implementatie krijg je antwoorden die zowel accuraat als relevant zijn.
