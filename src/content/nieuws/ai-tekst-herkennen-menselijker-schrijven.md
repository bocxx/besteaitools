---
title: "Klinkt jouw tekst nog als AI? Vier verraders en de prompt die Claude bijstuurt"
heroImageAlt: "Miniatuur diorama-illustratie bij artikel 'Klinkt jouw tekst nog als AI? Vier verraders en de prompt die Claude bijstuurt'"
description: "Wikipedia publiceerde een lijst van AI-schrijftells, en Ruben Hassids 29-woord-prompt past die toe in Claude. Zo schrijf jij weer als jezelf."
publishedAt: 2026-05-04
updatedAt: 2026-05-04
author: "Redactie"
category: "gids"
tags:
  - "ai-tekst"
  - "anti-ai-writing"
  - "ruben-hassid"
  - "claude"
  - "schrijven"
  - "prompts"
  - "wikipedia"
toolSlug: "claude"
featured: true
readingTime: 7
keyTakeaways:
  - "Wikipedia onderhoudt een artikel 'Signs of AI writing' met de bekendste taalpatronen die LLM-teksten verraden, samengesteld door menselijke editors die dagelijks AI-output spotten."
  - "AI-schrijver Ruben Hassid bouwde daar een werkbare workflow omheen: download het Wikipedia-artikel, upload het als anti-ai-writing-style.md naar Claude, en gebruik één korte prompt om alles eronder af te dwingen."
  - "De vier meest opvallende verraders zijn em-dash-overdaad, promotionele clichés met holle bijzinnen, verticale lijsten met vetgedrukte mini-koppen, en het 'niet X maar Y'-patroon dat overal in AI-teksten opduikt."
  - "Hassids prompt is opvallend kort (29 woorden) en werkt beter dan lange instructie-essays omdat hij Claude een referentiebestand laat lezen in plaats van regels in een prompt-blob te smokkelen."
  - "Volledig AI-vrij schrijven is niet het doel — sommige scenario's vragen juist neutrale, gebalanceerde AI-stem; het doel is bewust kiezen wanneer je menselijk klinkt en wanneer niet."
faq:
  - q: "Hoe herken ik of een tekst door AI is geschreven?"
    a: "Vier patronen springen het meest in het oog: overmatig gebruik van em-dashes waar komma's of haakjes natuurlijker zijn, holle promotionele bijzinnen zoals 'benadrukt het belang van' of 'weerspiegelt de blijvende relevantie', verticale lijsten waarin elk item begint met een vetgedrukt mini-kopje, en het patroon 'het is geen X, het is Y' dat in bijna elke AI-output minstens één keer opduikt. Wikipedia bundelt deze en tientallen andere tells in het artikel 'Signs of AI writing'."
  - q: "Wat is de anti-AI-writing-style.md van Ruben Hassid?"
    a: "Het is een markdown-bestand dat je zelf in twee minuten maakt: kopieer het Wikipedia-artikel 'Signs of AI writing' integraal naar een Google Doc, exporteer als markdown, hernoem naar anti-ai-writing-style.md en upload het aan Claude. Hassid biedt het kant-en-klaar aan op how-to-ai.guide na een gratis Substack-aanmelding, maar de zelfbouw-route werkt identiek."
  - q: "Welke prompt gebruikt Hassid om Claude menselijker te laten schrijven?"
    a: "Zijn 29-woord-prompt luidt vrij vertaald: 'Lees mijn anti-AI-writing-style-bestand eerst. Het bevat alle bekende patronen van AI-schrijven die ik wil vermijden. Pas deze toe als regels op alles wat je voor me schrijft.' De kracht zit in de korte instructie plus het externe referentiebestand, niet in een lange prompt vol regels."
  - q: "Werkt deze aanpak ook in ChatGPT of Gemini?"
    a: "Het idee — een referentiebestand met anti-patronen en een korte instructie-prompt — werkt bij elke assistent die file-uploads ondersteunt. ChatGPT (Custom Instructions of Project files), Gemini (Gems) en Copilot (systeemprompts) kunnen vergelijkbare gedragingen vasthouden. Claude blinkt vooral uit doordat de file-context structureel beschikbaar blijft binnen Cowork of Projects, zonder dat je per sessie opnieuw moet uploaden."
  - q: "Is alle AI-tekst slecht? Wanneer is de standaard-stem juist OK?"
    a: "Voor neutrale samenvattingen, productbeschrijvingen, juridische standaardteksten en SEO-geoptimaliseerde listicles werkt de standaard-stem prima — en valt hij vaak minder op dan in opiniestukken of persoonlijke posts. De vraag is niet of je AI gebruikt, maar of de tekst de toon heeft die jij voor dit specifieke stuk wilt. Bewust kiezen scheelt — soms zet je het anti-AI-bestand uit omdat de neutrale toon nu juist past."
heroImage: "/images/articles/diorama-ai-tekst-herkennen-menselijker-schrijven.webp"
---

Lezers spotten AI-tekst tegenwoordig binnen drie zinnen. Niet omdat ze tools draaien, maar omdat ze de patronen herkennen: dezelfde overdrachtelijke woorden, dezelfde holle bijzinnen, hetzelfde ritme. Wikipedia bundelde de bekendste tells in een artikel 'Signs of AI writing', en AI-schrijver Ruben Hassid bouwde er een prompt-workflow omheen die Claude weer laat klinken zoals jij. Zo werkt het — en zo bouw je hem zelf in een paar minuten.

> **💡 Beginner-tip:** Nog niet zeker of Claude bij je schrijfwerk past? Lees eerst onze [vergelijking tussen Claude en ChatGPT](/nieuws/claude-vs-chatgpt-vergelijking-2026) — Claude scoort beter op lange teksten en nuance, wat dit specifieke trucje extra effectief maakt.

## Waarom AI-tekst plotseling overal opvalt

Tot eind 2024 was de meeste AI-output goed genoeg om door te gaan voor menselijk werk. Dat is het kantelpunt voorbij. Lezers, recruiters, redacteuren en docenten zien het nu vaak meteen — en niet omdat ze cynisch zijn, maar omdat dezelfde frasen overal opduiken.

In september 2025 publiceerde Wikipedia een interne handleiding voor zijn editors: 'Signs of AI writing' ([Bron: Wikipedia](https://en.wikipedia.org/wiki/Wikipedia:Signs_of_AI_writing)). De lijst kwam tot stand omdat WikiProject AI Cleanup, een groep vrijwilligers, sinds 2023 dagelijks AI-gegenereerde edits opspoort en terugdraait. Wat zij zagen, zie jij nu ook in LinkedIn-posts, productpagina's en collega-mails.

Eerlijk: de eerste keer dat we onze eigen concept-mail teruglazen na een week niet bewust opletten, kromp er iets. De em-dashes stonden er als luxaflexen. Elke alinea eindigde op een betekenisloos plechtige bijzin. Het was geen plagiaat — het was erger, het was vlakland.

## De vier verraders die je in één oogopslag herkent

Wikipedia somt tientallen patronen op. Deze vier zie je terug in vrijwel elke onbewerkte AI-tekst, en als je ze leert herkennen vallen ze je voor altijd op.

**1. De em-dash-epidemie.** AI-modellen gebruiken het lange streepje (—) waar mensen meestal een komma of haakje zetten. Wikipedia formuleert het zo: AI-chatbots zetten de em-dash veel vaker in dan menselijke editors, juist op plekken waar mensen liever een komma of haakje gebruiken. Een tekst met vier of vijf em-dashes per alinea is bijna altijd door een LLM gepasseerd.

**2. Promotionele clichés met holle bijzinnen.** Frasen als "benadrukt het belang van", "weerspiegelt de blijvende relevantie", "boeit doelgroepen wereldwijd" of "vormt een hoeksteen van" voegen geen informatie toe. Ze bestaan omdat het model getraind is om plechtig te klinken. Hassid vatte het scherp samen: AI overdrijft graag, terwijl scherp schrijven juist specifiek is en niet groots.

**3. Verticale lijsten met vetgedrukte mini-koppen.** De lijst-met-bold-header-met-dubbelepunt is zo wijdverbreid dat hij een handtekening is geworden. Eén of twee per artikel kan, maar zodra elke sectie zo'n lijst heeft, schreeuwt het stuk dat een model het structureerde. Mensen schrijven vaker doorlopende prosa met hier en daar een gewone bullet.

**4. Het "niet X, maar Y"-patroon.** Constructies als "het gaat niet om snelheid, maar om precisie" of "dit is geen tool, dit is een filosofie" duiken in bijna elke AI-output op. Negatief parallellisme heet het in stijlleer, en mensen gebruiken het ook — alleen niet drie keer per artikel.

> **⚡ Gevorderden:** De Wikipedia-lijst bevat ook subtieler signalen: het overdadig gebruik van *"importantly"*, *"notably"*, *"crucially"* aan het begin van zinnen, het altijd-driedelige ritme van bijvoeglijke naamwoorden ("snel, schaalbaar en betrouwbaar"), en een voorkeur voor *"delve"*, *"underscore"* en *"foster"* boven hun simpelere alternatieven. Wie eenmaal getraind is, ziet het overal. Een nieuwere lijn vermijden van AI-tells is *zelfverzekerde maar onjuiste beweringen* — daar helpt sinds 28 mei 2026 [Claude Opus 4.8's 'ik weet het niet'-modus](/nieuws/claude-opus-4-8-ik-weet-het-niet-prompts), die expliciet hedget op feiten waarover het twijfelt.

## Hassids 29-woord-prompt om Claude te ontkoppelen

Hier wordt het praktisch. Hassid maakte een workflow van drie stappen die in een kwartier werkt en daarna blijft werken.

**Stap 1: download de Wikipedia-bron.** Ga naar [Wikipedia:Signs of AI writing](https://en.wikipedia.org/wiki/Wikipedia:Signs_of_AI_writing), kopieer het hele artikel (Ctrl+A, Ctrl+C) naar een leeg Google Doc, en exporteer dat als markdown via Bestand → Downloaden → Markdown (.md). Hernoem het bestand naar `anti-ai-writing-style.md`.

**Stap 2: upload het bestand naar Claude.** In [Claude Cowork](/nieuws/claude-cowork-lancering) zet je het in je werkmap; in Projects op claude.ai upload je het als projectbestand. Zo blijft de context bij elk gesprek beschikbaar zonder telkens opnieuw te uploaden.

**Stap 3: gebruik de 29-woord-prompt.** Hassids prompt luidt vrij vertaald:

> *"Lees mijn anti-AI-writing-style-bestand eerst. Het bevat alle bekende patronen van AI-schrijven die ik wil vermijden. Pas deze toe als regels op alles wat je voor me schrijft."*

Dat is alles. Geen lange instructie-essay, geen lijst met regels die je elke keer kopieert. Eén verwijzing naar het bestand, één instructie, en Claude doet de rest. Wie de moeite van het downloaden wil overslaan, kan het kant-en-klaar pakken op [how-to-ai.guide](https://how-to-ai.guide) na een gratis Substack-aanmelding.

## Waarom een kort prompt + bestand beter werkt dan een lang prompt

Een veelgemaakte fout: schrijvers proberen alle anti-AI-regels in één enorme prompt-blob te stoppen. *"Vermijd em-dashes, vermijd cliché-bijzinnen, vermijd lijsten met vetgedrukte koppen, vermijd negatief parallellisme, gebruik korte zinnen, gebruik concrete voorbeelden..."* — en dan vergeet je er twee, en de rest verdwijnt in het ruis van het gesprek.

Door Claude naar een extern bestand te laten verwijzen, krijgt het model alle regels in één beweging mee, in een format waarop het getraind is om naar te luisteren. De prompt blijft kort, het bestand wordt zo lang als nodig, en je kunt het zonder gedoe bijwerken. Stel je een marketingmanager voor die elke maandag content uitstuurt — wie het anti-AI-bestand één keer goed zet, hoeft de instructie nooit meer over te typen.

Voor wie Claude breder wil inrichten als vaste schrijfpartner: onze gids [Claude in één dag instellen](/nieuws/claude-instellen-1-dag-6-tools) loopt zes bouwstenen langs waarvan dit anti-AI-bestand er één is. Het past naast je `about-me.md`, je templates en je connectoren in dezelfde Cowork-werkmap.

## Wanneer AI-stem juist OK is

Niet elk stuk vraagt om een sterke menselijke stem. Voor productbeschrijvingen, FAQ-antwoorden, juridische disclaimers en gestructureerde SEO-content is de neutrale toon vaak een feature, geen bug. Lezers verwachten daar geen persoonlijkheid; ze verwachten duidelijke, gebalanceerde informatie.

De vraag is dus niet of je AI gebruikt, maar of het stuk de toon heeft die jij wilt. Bewust kiezen scheelt enorm. Voor je nieuwsbrief, je opiniepost en je klantmail zet je het anti-AI-bestand aan. Voor de bulk-output van productpagina's of changelog-entries laat je het uit en spaart Claude tokens en jou tijd.

> **⚡ Gevorderden:** Hassids 29-woord-prompt werkt het best in combinatie met een `about-me.md` waarin je toon en voorbeelden van je beste schrijfwerk staan. Anti-AI-regels schrappen de slechte gewoonten; je eigen voorbeelden geven Claude een richting om naartoe te schrijven. Zonder dat tweede deel klinkt de output minder als AI, maar nog niet als jou.

## Wanneer dit nuttig is — en wanneer overkill

**Wel doen als:**

- Je regelmatig publieke content schrijft (LinkedIn, blog, nieuwsbrief)
- Je merkt dat lezers je teksten te formeel of te plechtig vinden
- Je collega's of klanten herhaaldelijk feedback geven dat het "AI-achtig" voelt
- Je in 2026 nog dezelfde prompts gebruikt als in 2024

**Niet (nog) nodig als:**

- Je Claude alleen gebruikt voor brainstorms of samenvattingen die niet door anderen gelezen worden
- Je werk vooral gestructureerde output is (data, lijsten, gegenereerde rapporten)
- Je liever achteraf je AI-tekst handmatig redigeert dan vooraf instructies te geven

> **💡 Beginner-tip:** Begin klein. Download het Wikipedia-artikel vandaag, upload het in één Claude-project, en test de prompt op één tekst die je toch al moet schrijven. Vergelijk met je gebruikelijke output. Vrijwel iedereen ziet meteen verschil — en pas dan weet je of de moeite voor jou loont.

## Samenvatting — de 5-minuten-versie

- Wikipedia onderhoudt sinds september 2025 een artikel 'Signs of AI writing' met de bekendste taalpatronen die LLM-teksten verraden — gebaseerd op wat menselijke editors dagelijks tegenkomen in WikiProject AI Cleanup.
- De vier meest opvallende verraders: em-dash-overdaad, promotionele clichés met holle bijzinnen, verticale lijsten met vetgedrukte mini-koppen, en het 'niet X, maar Y'-patroon.
- Ruben Hassids workflow gebruikt het Wikipedia-artikel als referentiebestand: download, upload naar Claude, en gebruik een 29-woord-prompt om alle regels eruit toe te passen.
- Een kort prompt plus extern bestand werkt beter dan een lange instructie omdat Claude het bestand in zijn geheel meeneemt zonder dat regels verdwijnen in prompt-ruis.
- Eerstvolgende stap: kopieer het Wikipedia-artikel naar een Google Doc, exporteer als markdown, upload naar je Claude-project of Cowork-werkmap, en test de prompt op één tekst die je vandaag toch al moet schrijven.

## Bronnen

- [Wikipedia — Signs of AI writing](https://en.wikipedia.org/wiki/Wikipedia:Signs_of_AI_writing) — de complete handleiding van Wikipedia-editors over patronen die AI-tekst verraden
- [TechCrunch — Best guide to spotting AI writing comes from Wikipedia](https://techcrunch.com/2025/11/20/the-best-guide-to-spotting-ai-writing-comes-from-wikipedia/) — onafhankelijke duiding van waarom de Wikipedia-lijst zo waardevol is
- [NPR — Wikipedia editors publish guide to detect AI entries](https://www.npr.org/2025/09/04/nx-s1-5519267/wikipedia-editors-publish-new-guide-to-help-readers-detect-entries-written-by-ai) — context bij de lancering van het artikel in september 2025
- [Ruben Hassid — Anti-AI writing style guide (LinkedIn)](https://www.linkedin.com/posts/ruben-hassid_how-to-finally-stop-writing-like-ai-activity-7432031562076135424-HH9f) — Hassids originele post over de aanpak
- [Ruben Hassid — How to AI](https://how-to-ai.guide) — Hassids verzamelpagina met het kant-en-klare bestand en gerelateerde handleidingen
- [Wikipedia — WikiProject AI Cleanup](https://en.wikipedia.org/wiki/Wikipedia:WikiProject_AI_Cleanup) — de vrijwilligersgroep die sinds 2023 AI-content op Wikipedia opspoort
