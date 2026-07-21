---
title: "Betere prompts voor AI-agents: zo stuur je een agent in Make aan"
heroImageAlt: "Miniatuur diorama-illustratie bij artikel 'Betere prompts voor AI-agents: zo stuur je een agent in Make aan'"
description: "Een AI-agent is zo goed als de instructie die je 'm geeft. Zo schrijf je een heldere systeemprompt voor een agent — met Make AI Agents als concreet voorbeeld dat je zonder code kunt opzetten."
publishedAt: 2026-07-03
updatedAt: 2026-07-03
author: "Redactie"
category: "gids"
tags:
  - "make"
  - "ai-agents"
  - "prompt-engineering"
  - "systeemprompt"
  - "automatisering"
  - "no-code"
toolSlug: "make"
featured: false
draft: false
readingTime: 5
heroImage: "/images/articles/diorama-betere-prompts-ai-agents-make.webp"
heroScene: "A miniature control desk with a small robot figure holding a clear instruction card, tiny labeled levers and a branching track leading to different app icons, warm studio lighting"
keyTakeaways:
  - "Een AI-agent handelt zelfstandig; de systeemprompt is jouw belangrijkste stuurmiddel om hem voorspelbaar te houden."
  - "Make AI Agents draaien in de visuele Scenario Builder, werken met een globale systeemprompt en zijn beschikbaar op alle betaalde plannen."
  - "Goede prompts zijn specifiek: geef rol, doel, grenzen en het gewenste formaat — vaag levert onbetrouwbaar werk op."
  - "Gebruik 'Additional System Instructions' om gedrag bij te sturen zonder de hoofdprompt te herschrijven, en test stap voor stap."
faq:
  - q: "Wat is het verschil tussen een gewone prompt en een systeemprompt?"
    a: "Een gewone prompt is een losse vraag die je op dat moment stelt. Een systeemprompt is de vaste instructie die bovenaan staat en het gedrag van de agent voor élke taak bepaalt: wie hij is, wat zijn doel is en welke regels hij volgt. Bij een AI-agent die zelfstandig acties uitvoert, is die systeemprompt het belangrijkste stuur. Krijg je 'm helder, dan wordt de agent voorspelbaar."
  - q: "Heeft Make AI Agents een gratis versie?"
    a: "Make AI Agents zijn beschikbaar op alle betaalde plannen van Make; ze zitten niet in het gratis instapplan. Wil je eerst oefenen met prompts zonder kosten, dan kun je de formuleringen los testen in een gewone chatinterface van een AI-model voordat je ze in Make zet. Zo verfijn je de instructie zonder meteen een agent te laten draaien."
  - q: "Welk taalmodel gebruikt een Make-agent?"
    a: "Je kiest zelf het model dat bij je taak past; Make ondersteunt onder meer OpenAI-compatibele modellen. Voor eenvoudige, gestructureerde taken kun je een lichter model kiezen, voor complexer redeneerwerk een zwaarder model. Houd er rekening mee dat een krachtiger model doorgaans meer kost per taak. Test welk model de beste verhouding tussen kwaliteit en prijs geeft."
  - q: "Hoe voorkom ik dat een AI-agent onvoorspelbaar wordt?"
    a: "Geef strakke grenzen in de systeemprompt: benoem expliciet wat de agent niet mag doen en wat hij moet terugvragen bij twijfel. Gebruik Make's reasoning-paneel om stap voor stap te zien welke keuzes de agent maakt en welke gereedschappen hij aanroept. Bouw klein op: begin met één taak, controleer het gedrag, en breid pas uit als de agent betrouwbaar doet wat je bedoelt."
---

Een chatbot wacht op jouw volgende vraag. Een AI-agent niet: die krijgt een doel en gaat zelfstandig aan de slag, roept onderweg gereedschappen aan en neemt beslissingen zonder dat jij bij elke stap meekijkt. Dat maakt agents krachtig, en tegelijk risicovoller. Want alles wat je vooraf niet duidelijk hebt gemaakt, vult de agent zelf in. De kwaliteit van je instructie bepaalt daarmee de kwaliteit van het werk.

In deze gids kijken we hoe je een agent scherp aanstuurt, met [Make](https://www.make.com/en/ai-agents) AI Agents als concreet voorbeeld. Make is een no-code automatiseringsplatform, dus je kunt meelezen en meebouwen zonder te programmeren.

## Waar Make AI Agents draaien

Make heeft agents ingebouwd in de visuele Scenario Builder, de omgeving waarin je automatiseringen als een stroomschema bouwt. Elke agent heeft een globale systeemprompt voor consistentie, met ruimte om per scenario bij te sturen. Handig detail: er is een reasoning-paneel dat stap voor stap toont welke keuzes de agent maakt en welke gereedschappen hij aanroept. Zo zie je waar het misgaat als een agent iets onverwachts doet. De functie zit op alle betaalde plannen.

> **💡 Beginner-tip:** Je hoeft geen prompt-expert te zijn om te beginnen. Denk aan de systeemprompt als een functieomschrijving voor een nieuwe collega: wie ben je, wat is je doel, en wat mag je beslist niet doen. Wie dat op papier helder krijgt, heeft het moeilijkste deel al gehad.

## Vier bouwstenen van een goede systeemprompt

Een sterke instructie is bijna nooit één zin. Vier onderdelen maken het verschil.

**Rol.** Vertel de agent wie hij is en vanuit welk perspectief hij werkt. "Je bent een klantenservice-assistent voor een webshop" stuurt gedrag beter dan een neutrale opdracht zonder context.

**Doel.** Benoem het concrete resultaat. Niet "help met e-mails", maar "beantwoord binnenkomende vragen over bezorgstatus en verwijs andere vragen door naar een mens".

**Grenzen.** Dit wordt het vaakst vergeten en is juist cruciaal bij een zelfstandige agent. Zeg expliciet wat de agent níet mag doen en wat hij moet terugvragen bij twijfel. Grenzen houden een agent voorspelbaar.

**Formaat.** Geef aan hoe de output eruit moet zien: kort of uitgebreid, met welke velden, in welke toon. Een agent die het formaat kent, levert bruikbaar werk in plaats van iets wat je nog moet ombouwen.

## Bijsturen zonder alles te herschrijven

Merk je dat een agent net naast het doel zit, dan hoef je de hoofdprompt niet meteen om te gooien. Make heeft een functie voor aanvullende systeeminstructies waarmee je het gedrag bijstelt zonder de kern aan te raken. Voeg bijvoorbeeld één regel toe die een terugkerende fout corrigeert, en test opnieuw. Zo bouw je de instructie laag voor laag op in plaats van elke keer van voren af aan.

> **⚡ Gevorderden:** Kies het model bewust. Make laat je zelf het taalmodel kiezen, onder meer OpenAI-compatibele modellen. Een lichter model is goedkoper en vaak snel genoeg voor gestructureerde taken; bewaar de zwaardere modellen voor werk waar echt geredeneerd moet worden. Meet de kosten per taak voor je een agent op volume laat draaien.

## Klein beginnen, dan uitbreiden

De grootste fout is een agent meteen te veel taken tegelijk geven. Begin met één afgebakende taak, controleer met het reasoning-paneel of het gedrag klopt, en breid pas uit als je 'm vertrouwt. Een agent die één ding betrouwbaar doet, is meer waard dan een agent die tien dingen half doet. Groei je uit meerdere losse agents, dan is de volgende stap ze te laten samenwerken — dat kan zelfs gratis op je eigen machine, zie [multi-agent AI lokaal bouwen met Ollama](/nieuws/ollama-multi-agent-lokaal-bouwen).

Werk je liever in code dan in een no-code canvas? Dan is [Je eerste AI-agent bouwen met Microsoft Foundry](/nieuws/microsoft-foundry-eerste-ai-agent-bouwen) de programmeur-variant van dit verhaal, met SDK's voor Python, C# en TypeScript.

Wil je eerst het bredere plaatje snappen van wat AI-agents wél en niet zelfstandig aankunnen, en waar jouw controle nodig blijft? Onze duiding op hetlaatsteainieuws.nl over [hoe AI het werk splitst in uitvoeren en meedenken](https://hetlaatsteainieuws.nl/nieuws/ai-freelance-werk-uitvoerder-adviseur) helpt je die grens scherp te krijgen.

## Bronnen

- [Make AI Agents — productpagina](https://www.make.com/en/ai-agents) — Make
- [Make AI Agents — Help Center](https://help.make.com/make-ai-agents) — Make
- [Introducing Make AI Agents: The next step in automation](https://www.make.com/en/blog/make-ai-agents) — Make
