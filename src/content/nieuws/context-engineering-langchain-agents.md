---
title: "Context engineering: geef je LangChain-agent alleen wat nodig is"
description: "Een prompt schrijf je één keer; context stuur je bij elke stap. Zo bepaal je met LangChain wélke informatie je agent ziet — en waarom dat betrouwbaardere antwoorden geeft dan een langere prompt."
publishedAt: 2026-07-25
updatedAt: 2026-07-25
author: "Redactie"
category: "gids"
tags:
  - "langchain"
  - "context-engineering"
  - "ai-agents"
  - "prompt-engineering"
  - "rag"
  - "geheugen"
toolSlug: "langchain"
featured: false
draft: false
readingTime: 5
heroImage: "/images/articles/diorama-context-engineering-langchain-agents.webp"
heroImageAlt: "Miniatuur diorama-illustratie bij artikel 'Context engineering met een LangChain-agent'"
heroScene: "A miniature paper-craft diorama of a small robot at a desk with a funnel above it, only a few labeled cards dropping through the narrow opening while a big pile of papers is held back, warm studio lighting"
keyTakeaways:
  - "Context engineering gaat over wélke informatie in het venster van het model belandt — niet over één slimme prompt, maar over elke stap van je agent."
  - "LangChain vat het in vier bewegingen: schrijven, selecteren, comprimeren en isoleren van context."
  - "In LangChain geef je losse informatie mee via een context-schema, zodat je tools er precies bij kunnen zonder alles in de prompt te proppen."
  - "Meer context is niet beter: een voller venster maakt een agent trager, duurder en vaker afgeleid."
faq:
  - q: "Wat is het verschil tussen prompt engineering en context engineering?"
    a: "Prompt engineering gaat over hoe je je instructie formuleert: rol, doel, toon, grenzen. Context engineering gaat een laag dieper: welke informatie krijgt het model überhaupt te zien op het moment dat het een taak uitvoert? Denk aan opgehaalde documenten, eerdere stappen, geheugen en toolbeschrijvingen. Bij een agent die zelfstandig meerdere stappen zet, is dat tweede vaak belangrijker dan de perfecte openingsprompt, omdat de context bij elke stap verandert."
  - q: "Heb ik LangChain nodig om aan context engineering te doen?"
    a: "Nee, het principe geldt voor elk AI-systeem: je kunt ook in een gewone chatinterface bewust kiezen wat je wel en niet meegeeft. LangChain maakt het alleen expliciet en herhaalbaar. Het framework is gebouwd rond het idee dat je stuurt welke context een model krijgt, met vaste patronen om informatie op te halen, mee te geven aan tools en op te ruimen. Voor losse taken is dat overkill; voor een agent die vaak dezelfde stappen doorloopt, scheelt het veel handwerk."
  - q: "Waarom zou ik context wegfilteren in plaats van alles meegeven?"
    a: "Omdat een model niet oneindig veel tegelijk goed kan verwerken. Hoe voller het contextvenster, hoe groter de kans dat het model belangrijke details mist, afgeleid raakt door irrelevante tekst, of trager en duurder wordt. Alles erin gooien voelt veilig, maar levert vaak slechtere antwoorden op. Bewust selecteren wat relevant is voor déze stap, geeft betrouwbaarder werk."
  - q: "Is context engineering gratis met LangChain?"
    a: "LangChain zelf is een open-source framework dat je gratis kunt gebruiken. Wat geld kost, is het taalmodel dat je eronder hangt: elke keer dat je context naar een model stuurt, betaal je voor de tokens. Juist daarom loont context engineering ook financieel — een korter, gerichter contextvenster is niet alleen scherper, maar ook goedkoper per taak."
---

Veel mensen die hun AI-agent willen verbeteren, gaan sleutelen aan de prompt: nóg een instructie erbij, nóg een voorbeeld. Maar bij een agent die zelfstandig meerdere stappen zet, ligt de winst vaak ergens anders. Niet in hóe je iets vraagt, maar in wélke informatie het model op dat moment ziet. Dat heet context engineering, en het is volgens [LangChain](https://www.langchain.com) uitgegroeid tot een van de belangrijkste vaardigheden voor wie betrouwbare agents bouwt.

> **💡 Beginner-tip:** Een taalmodel heeft een "werkgeheugen" van beperkte grootte, het contextvenster. Alles wat je erin stopt — je vraag, opgehaalde documenten, eerdere antwoorden — vult dat geheugen. Context engineering is simpelweg: bewust kiezen wat je erin legt en wat je weglaat.

## Prompt is één keer, context is elke stap

Een systeemprompt schrijf je vooraf; die blijft staan. Maar terwijl een agent werkt, verandert zijn context continu. Hij haalt een document op, zet een stap, krijgt een tussenresultaat terug, en gebruikt dat weer voor de volgende beslissing. Als bij elke stap de verkeerde of te veel informatie meekomt, stapelen de foutjes zich op.

Wil je eerst de prompt-kant op orde? Lees dan [betere prompts voor AI-agents](/nieuws/betere-prompts-ai-agents-make). Deze gids gaat over de laag daarna: het sturen van de context zelf.

## Vier bewegingen volgens LangChain

LangChain vat context engineering samen in vier bewegingen. Ze zijn nuttig als checklist, ook als je geen regel code schrijft.

**Schrijven.** Leg vast wat de agent moet weten: heldere instructies, en een plek waar tussenresultaten en geheugen bewaard worden. Zo hoeft niet alles telkens opnieuw door het model.

**Selecteren.** Kies per stap alleen de informatie die er nú toe doet. Bij een vraag over één klant hoeft niet je hele klantenbestand mee — alleen dat ene dossier. Dit is de kern van technieken als retrieval (gericht ophalen wat relevant is).

**Comprimeren.** Vat lange stukken samen voordat ze het venster in gaan. Een samenvatting van tien eerdere stappen kost minder ruimte dan de stappen zelf, en houdt de agent scherp.

**Isoleren.** Houd taken die niets met elkaar te maken hebben uit elkaars context. Meng je ze, dan raakt het model afgeleid door informatie die niet bij de huidige taak hoort.

> **⚡ Gevorderden:** In LangChain geef je zulke losse informatie mee via een context-schema: je definieert welke waarden een agent-run meekrijgt (`context=…`) en laat je tools er via de runtime precies bij. Zo blijft de prompt kort en komt de wisselende data er gestructureerd naast te staan, in plaats van alles in één grote instructie te proppen. De actuele patronen staan in de [LangChain-documentatie over context engineering](https://docs.langchain.com/oss/python/langchain/context-engineering).

## Meer is niet beter

De grootste denkfout is dat een voller contextvenster een slimmere agent oplevert. Het tegendeel klopt vaak: hoe meer je meegeeft, hoe groter de kans dat het model het belangrijke detail mist of afdwaalt. En elk token dat je meestuurt, kost geld en tijd. Bewust weglaten is daarmee geen bezuiniging op kwaliteit, maar juist de weg ernaartoe.

Begin klein. Kijk bij een agent die de mist ingaat niet meteen naar de prompt, maar naar wat hij op dat moment aan informatie zag. Negen van de tien keer zit daar de oorzaak — en de oplossing. Wil je een agent helemaal lokaal en zonder API-kosten uitproberen, dan kun je dit oefenen met [modellen die je zelf op je machine draait via Ollama](/nieuws/ollama-lokale-ai-modellen-draaien).
