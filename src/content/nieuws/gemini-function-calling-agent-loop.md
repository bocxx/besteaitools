---
title: "De tool-calling-loop achter elke AI-agent, met gratis Gemini"
heroImage: "/images/articles/diorama-gemini-function-calling-agent-loop.webp"
heroImageAlt: "Miniatuur diorama-illustratie bij artikel 'Zo werkt de tool-calling-loop achter elke AI-agent (met gratis Gemini)'"
heroScene: "A miniature relay track where a small robot passes a labelled baton to a tool station and receives a result card back, running in a loop"
description: "Elke AI-agent draait op één simpele lus: model vraagt een functie aan, jij voert hem uit, het model gaat verder. Zo bouw je die loop na met de gratis Gemini API, zonder framework."
publishedAt: 2026-08-06
updatedAt: 2026-08-06
author: "Redactie"
category: "gids"
tags:
  - "gemini"
  - "function-calling"
  - "ai-agents"
  - "tool-calling"
  - "google-ai-studio"
  - "python"
  - "api"
toolSlug: "gemini"
featured: false
draft: false
readingTime: 5
keyTakeaways:
  - "Een AI-agent is niet magisch: onderaan zit één lus waarin het model een functie aanvraagt, jij hem uitvoert en het resultaat terugstuurt."
  - "Gemini voert de functie zélf niet uit; het geeft alleen naam en argumenten terug, jouw code doet de rest."
  - "Met een gratis API-sleutel uit Google AI Studio kun je function calling meteen uitproberen, zonder creditcard."
  - "Wie deze loop met de hand bouwt, begrijpt daarna precies wat frameworks als CrewAI of LangGraph onder de motorkap doen."
faq:
  - q: "Wat is function calling in de Gemini API?"
    a: "Function calling is de manier waarop een taalmodel toegang krijgt tot de buitenwereld. Je beschrijft aan Gemini welke functies je hebt — een naam, een uitleg en welke argumenten ze verwachten — en stelt je vraag. Als het model besluit dat een functie nodig is, geeft het geen tekst terug maar een gestructureerd object met de functienaam en de ingevulde argumenten. Belangrijk: Gemini voert die functie niet uit. Dat doet jouw code. Daarna geef je het resultaat terug aan het model, dat er een leesbaar antwoord van maakt."
  - q: "Heb ik een betaald account nodig om dit te proberen?"
    a: "Nee. Als je een API-sleutel aanmaakt in Google AI Studio, krijg je automatisch toegang tot de gratis laag van de Gemini API. Je betaalt niets en hoeft geen creditcard op te geven; de beperking zit in lagere snelheidslimieten dan bij de betaalde laag. Voor leren, testen en kleine projecten is dat ruim voldoende."
  - q: "Waarom zou ik de loop zelf bouwen als frameworks dit al doen?"
    a: "Omdat je anders blind vertrouwt op een `.invoke()` die je niet begrijpt. Frameworks als CrewAI, LangGraph en AutoGen verpakken precies deze lus in een paar regels. Handig in productie, maar zodra er iets misgaat — een functie die niet wordt aangeroepen, een oneindige lus — helpt het enorm als je weet wat er onderaan gebeurt. Eén keer met de hand bouwen maakt elk framework daarna leesbaar."
  - q: "Wat is het verschil tussen een chatbot en een agent?"
    a: "Een chatbot antwoordt met tekst en stopt. Een agent kan tussendoor acties uitvoeren: een berekening maken, een API bevragen, een bestand lezen. Dat verschil komt bijna volledig voort uit deze tool-calling-loop. Zodra een model functies mag aanvragen en jij ze uitvoert en teruggeeft, verandert je chatbot in iets dat 'doet' in plaats van alleen 'praat'."
---

"Bouw je eigen AI-agent" klinkt als een middag zwoegen met een zwaar framework. Maar onder elke agent — of die nu op CrewAI, LangGraph of AutoGen draait — zit één verrassend simpele lus. Snap je die lus, dan snap je de hele categorie. Hieronder bouw je hem na met de gratis Gemini API, in gewone Python, zonder framework ertussen.

## De loop in één zin

Een agent doet dit, steeds opnieuw: het model krijgt je vraag én een lijst van functies die het mag gebruiken. Beslist het model dat het een functie nodig heeft, dan geeft het de naam en de argumenten terug. Jouw code voert die functie uit en stuurt het resultaat terug. Het model gebruikt dat resultaat om verder te denken — en vraagt eventueel de volgende functie aan, tot het klaar is en een gewoon antwoord geeft.

Dat is alles. Geen magie, wel een strak ritme van "model vraagt, code doet, model gaat verder".

> **💡 Beginner-tip:** Gemini roept je functie nooit zelf aan. Het zegt alleen "ik zou `weer_opvragen('Amsterdam')` willen". Jij bent degene die de functie draait en het antwoord teruggeeft. Die scheiding is precies wat het veilig maakt: het model raakt nooit rechtstreeks aan jouw systemen.

## In vijf stappen zelf bouwen

1. **Haal een gratis sleutel op.** Ga naar Google AI Studio (aistudio.google.com), log in met een Google-account en maak een API-sleutel aan. Je zit meteen op de gratis laag — geen creditcard nodig. Zet de sleutel in een `.env`-bestand als `GEMINI_API_KEY=...` zodat hij niet in je code belandt.

2. **Schrijf een gewone functie.** Begin klein, bijvoorbeeld een functie die het weer teruggeeft: `def get_weather(stad): ...`. In een echte agent zou dit een API-aanroep zijn; om te leren volstaat een functie die een vast antwoord teruggeeft.

3. **Beschrijf de functie voor het model.** Maak een 'function declaration': de naam (`get_weather`), een korte uitleg ("geeft het huidige weer voor een stad") en welke argumenten hij verwacht (`stad`, een string). Deze beschrijving is hoe Gemini snapt wanneer en hoe het je functie mag aanroepen — hoe scherper de uitleg, hoe beter de keuze.

4. **Stuur vraag én functies naar Gemini.** Doe een gewone `generate_content`-aanroep met daarin je prompt ("Wat voor weer is het in Amsterdam?") en de lijst met function declarations. Kijk naar het antwoord: krijg je gewone tekst, dan was geen functie nodig. Zie je een `functionCall` met een naam en argumenten, dan wil het model dat jij die functie draait.

5. **Voer uit en geef terug.** Roep zelf `get_weather('Amsterdam')` aan, verpak het resultaat en stuur het terug naar Gemini in een vervolgaanroep. Nu heeft het model de echte data en maakt het er een net antwoord van. Zit je in een echte agent, dan herhaal je stap 4 en 5 in een lus tot het model geen functie meer aanvraagt.

> **⚡ Gevorderden:** Wikkel stap 4 en 5 in een `while`-lus met een harde limiet, bijvoorbeeld tien rondes. Zonder plafond kan een model in theorie eindeloos functies blijven aanvragen. Die limiet is het simpelste vangnet tegen een agent die op hol slaat.

## Waarom dit de moeite waard is

Zodra je deze vijf stappen één keer met de hand hebt gedraaid, lezen frameworks anders. Wat CrewAI een "tool" noemt, is jouw function declaration. Wat LangGraph als een "node" tekent, is een ronde door deze lus. Je hoeft het wiel niet elke keer opnieuw uit te vinden — maar je weet nu wél wat er draait als je op start drukt. En dat is het verschil tussen een tool gebruiken en een tool begrijpen.
