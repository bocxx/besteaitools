# Social captions — DeepSeek V4: de juiste denkstand kiezen

Canonieke URL: https://debesteaitools.nl/nieuws/deepseek-v4-denkstanden-kiezen
Beelden: `social-infographics/deepseek-v4-denkstanden-kiezen-{1x1,4x5,9x16}.png`

---

## X / Twitter (kort)

DeepSeek V4 laat jou kiezen hoeveel het nadenkt.

Op LiveCodeBench: 56,8% zonder denken, 89,8% in Think High, 93,5% in Think Max. Bij feitenvragen scheelt het weinig.

https://debesteaitools.nl/nieuws/deepseek-v4-denkstanden-kiezen?utm_source=x&utm_medium=social

#AI #DeepSeek

---

## X / Twitter (thread)

1/ De meeste modellen beslissen zelf hoe lang ze nadenken. DeepSeek V4 legt die knop bij jou neer: Non-think, Think High en Think Max, per verzoek te kiezen. Zowel V4-Pro als het lichtere V4-Flash ondersteunt alle drie.

2/ Wat het oplevert bij V4-Pro, in de benchmarkscores die DeepSeek zelf publiceert:
LiveCodeBench 56,8 → 89,8 → 93,5
GPQA Diamond 72,9 → 89,1 → 90,1
Humanity's Last Exam 7,7 → 34,5 → 37,7
MMLU-Pro 82,9 → 87,1 → 87,5

3/ Lees die lijst van onder naar boven. Bij MMLU-Pro, waar het antwoord er min of meer al is, levert denken 4,6 punt op. Bij LiveCodeBench, waar het model iets moet uitwerken en testen, is het 37 punten.

4/ En de sprong zit bijna helemaal tussen Non-think en Think High. Van High naar Max win je meestal een paar punten, tegen aanzienlijk meer tokens en wachttijd.

5/ Zo kies je. Non-think: samenvatten, herschrijven, classificeren, vertalen, korte vragen. Think High: je standaardstand voor werk — code schrijven en debuggen, wiskunde, planning, analyses met meerdere stappen.

6/ Think Max reserveer je. De lastige refactor, het bewijs dat niet wil kloppen, de agentische taak die twintig stappen moet overzien. Begin bij Think High en zet Max aan voor precies dat ene verzoek.

7/ Zelf draaien kan: beide modellen staan onder MIT-licentie op Hugging Face, commercieel gebruik inbegrepen. V4-Pro is 1,6 biljoen parameters (49 miljard actief), V4-Flash 284 miljard (13 miljard actief). Serveren met vLLM of SGLang.

8/ Drie dingen om vooraf te weten. Sampling: DeepSeek raadt lokaal temperature 1.0 en top_p 1.0 aan; lager zetten maakt het redeneren juist slechter.

9/ Contextvenster bij Think Max: reserveer minimaal 384K tokens. Het denkspoor telt mee, en loopt de context vol dan breekt het antwoord halverwege af.

10/ Chattemplate: V4-Pro komt zonder Jinja-template. Er zit een encoding-map bij met Python-scripts die berichten in OpenAI-formaat omzetten naar de juiste invoerstring, en het antwoord weer uit elkaar halen.

https://debesteaitools.nl/nieuws/deepseek-v4-denkstanden-kiezen?utm_source=x&utm_medium=social

---

## LinkedIn

De meeste modellen beslissen zelf hoe lang ze nadenken. DeepSeek V4 legt die knop bij de gebruiker neer, en het verschil tussen de standen is groter dan je zou verwachten.

Drie standen, per verzoek te kiezen, beschikbaar op zowel V4-Pro als V4-Flash. Non-think antwoordt meteen. Think High doet bewuste, stapsgewijze analyse. Think Max rekt dat op tot het uiterste, met een eigen systeemprompt en een fors langer denkspoor.

De benchmarkscores die DeepSeek per stand publiceert voor V4-Pro maken de keuze concreet:

- LiveCodeBench: 56,8 → 89,8 → 93,5
- GPQA Diamond: 72,9 → 89,1 → 90,1
- Humanity's Last Exam: 7,7 → 34,5 → 37,7
- MMLU-Pro: 82,9 → 87,1 → 87,5

Twee dingen vallen op. Bij MMLU-Pro, feitenkennis waar het antwoord er min of meer al is, levert denken 4,6 punt op. Bij LiveCodeBench, waar het model iets moet uitwerken en testen, 37 punten. En de sprong zit bijna helemaal tussen Non-think en Think High; van High naar Max win je een paar punten tegen aanzienlijk meer tokens en wachttijd.

Praktische volgorde: begin bij Think High als standaard voor werk. Kom je er niet, zet dan Max aan voor precies dat ene verzoek. Altijd op Max draaien en alleen terugschakelen als het te traag wordt, kost je onnodig veel tokens aan taken die het niet nodig hadden.

Zelf draaien kan. Beide modellen staan onder MIT-licentie op Hugging Face, commercieel gebruik inbegrepen, te serveren met vLLM of SGLang. Let dan op drie dingen: temperature 1.0 en top_p 1.0 (lager zetten verslechtert het redeneren), minimaal 384K context bij Think Max omdat het denkspoor meetelt, en het ontbreken van een Jinja-chattemplate bij V4-Pro — daar zit een encoding-map met Python-scripts voor in de plaats.

Benchmarkscores, licentie en instellingen gecontroleerd op 4 september 2026 tegen de modelkaart op Hugging Face. DeepSeek noemt de V4-serie daar zelf nog een preview, dus reken op bijstellingen.

https://debesteaitools.nl/nieuws/deepseek-v4-denkstanden-kiezen?utm_source=linkedin&utm_medium=social

#AI #DeepSeek #openweight #LLM

---

## Instagram

Bij DeepSeek V4 kies je zelf hoeveel het model nadenkt. Drie standen: Non-think, Think High, Think Max.

Het verschil is enorm waar het ertoe doet. Op LiveCodeBench gaat V4-Pro van 56,8 naar 93,5 procent. Op Humanity's Last Exam van 7,7 naar 37,7.

Bij brede kennisvragen levert al dat denken 4,6 punt op. Daar betaal je vooral tokens en wachttijd.

Vuistregel: Think High als standaard, Max alleen voor die ene taak waar je vastloopt.

Link in bio 👆
https://debesteaitools.nl/nieuws/deepseek-v4-denkstanden-kiezen?utm_source=instagram&utm_medium=social

#AI #DeepSeek #LLM #tools #techniek

---

## Facebook

Hoe lang moet een AI-model nadenken over jouw vraag? Bij DeepSeek V4 beslis jij dat zelf.

Drie standen, per verzoek te kiezen. Bij moeilijke taken maakt de keuze veel uit: op de codebenchmark LiveCodeBench gaat V4-Pro van 56,8 procent zonder denken naar 93,5 procent in de zwaarste stand. Bij brede kennisvragen is het verschil 4,6 punt, en betaal je vooral tokens en wachttijd.

We zetten de scores per stand op een rij, geven per soort werk aan welke stand je pakt, en beschrijven waar je op let als je de modellen zelf draait met vLLM of SGLang.

https://debesteaitools.nl/nieuws/deepseek-v4-denkstanden-kiezen?utm_source=facebook&utm_medium=social

---

## Bluesky

DeepSeek V4 laat je per verzoek kiezen hoeveel het model nadenkt. LiveCodeBench: 56,8% zonder denken, 89,8% Think High, 93,5% Think Max. Op brede kennisvragen scheelt het 4,6 punt.

https://debesteaitools.nl/nieuws/deepseek-v4-denkstanden-kiezen?utm_source=bluesky&utm_medium=social
