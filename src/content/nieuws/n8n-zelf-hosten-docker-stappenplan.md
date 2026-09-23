---
title: "n8n zelf hosten met Docker: wat het kost, wat het mag en hoe je begint"
description: "n8n draaien op je eigen server kost geen licentie, alleen infrastructuur. Wat de Sustainable Use License wel en niet toestaat, plus de setup in vier stappen."
publishedAt: 2026-09-23
updatedAt: 2026-09-23
author: "Redactie"
category: "gids"
tags:
  - "n8n"
  - "self-hosting"
  - "docker"
  - "automatisering"
  - "workflow-automatisering"
  - "fair-code"
toolSlug: "n8n"
featured: false
draft: false
readingTime: 3
heroImage: "/images/articles/diorama-n8n-zelf-hosten-docker-stappenplan.webp"
heroImageAlt: "Miniatuur diorama-illustratie bij artikel 'n8n zelf hosten met Docker: wat het kost, wat het mag en hoe je begint'"
keyTakeaways:
  - "De Community-editie van n8n is gratis te self-hosten onder de Sustainable Use License 1.0 — onbeperkt workflows, executies en gebruikers."
  - "Die licentie staat intern zakelijk gebruik toe, maar verbiedt n8n inbouwen in een product dat je aan externe klanten verkoopt."
  - "Zonder licentiesleutel start n8n automatisch als Community-editie; een Business- of Enterprise-sleutel schakelt de betaalde functies aan."
  - "2 GB werkgeheugen is het gedocumenteerde minimum; voor productie begint het serieus te werken vanaf 4 tot 8 GB."
  - "Een productieopzet is n8n in Docker naast PostgreSQL, met een reverse proxy ervoor en SSL — SQLite is prima om te proeven, niet om op te draaien."
faq:
  - q: "Is n8n gratis als je het zelf host?"
    a: "Ja. De Community-editie is gratis te self-hosten onder de Sustainable Use License versie 1.0. Je betaalt niets voor de software zelf en krijgt onbeperkt workflows, stappen, executies en gebruikers, plus de integraties en AI-nodes. Je enige kosten zijn infrastructuur: de server, de database en het onderhoud. Dat laatste onderschatten mensen het vaakst — een draaiende n8n is goedkoop, een goed beheerde n8n kost tijd."
  - q: "Wat mag je niet met de Sustainable Use License?"
    a: "De licentie is geen open source in de klassieke zin. Je mag de software gebruiken, aanpassen en doorgeven, maar het gebruik is beperkt tot interne bedrijfsdoeleinden. Wat expliciet niet mag: n8n inbouwen in een product of dienst die je aan externe klanten verkoopt, oftewel n8n als motor onder je eigen commerciële aanbod. Draai je automatiseringen voor je eigen bedrijfsprocessen, dan zit je goed. Wil je klanten een n8n-omgeving verkopen, dan heb je een andere licentie nodig."
  - q: "Hoeveel server heb je nodig voor n8n?"
    a: "2 GB werkgeheugen is het gedocumenteerde minimum en genoeg om te leren. Voor echt gebruik reken je op 4 tot 8 GB, zeker als je workflows met AI-nodes draait of meerdere executies tegelijk hebt lopen. De vuistregel: geheugen is de eerste bottleneck, niet de processor. Loopt n8n vast tijdens een grote workflow, kijk dan eerst naar RAM voordat je aan de instellingen gaat sleutelen."
  - q: "Waarom PostgreSQL in plaats van de standaard database?"
    a: "n8n start standaard met SQLite, wat prima werkt om te verkennen. Voor productie schakel je over naar PostgreSQL, omdat SQLite slecht schaalt bij gelijktijdige executies en je bij een groeiende uitvoeringsgeschiedenis tegen prestatieproblemen aanloopt. Overstappen achteraf kan, maar is gedoe — begin daarom meteen met PostgreSQL als je weet dat het productie wordt."
sources:
  - label: "n8n — LICENSE.md (Sustainable Use License 1.0)"
    url: "https://github.com/n8n-io/n8n/blob/master/LICENSE.md"
  - label: "n8n — Documentatie, zelf hosten met Docker"
    url: "https://docs.n8n.io/deploy/host-n8n/install-options/install-with-docker"
---

Frustratie over executielimieten en betalen per token is de meestgenoemde reden om n8n op je eigen server te zetten. Dat kan, het kost geen licentie, en de setup is minder werk dan je verwacht. Maar er zitten twee dingen aan vast die mensen vaak pas ontdekken als ze al draaien: wat de licentie toestaat, en hoeveel server je echt nodig hebt.

## Wat "fair-code" betekent voor jouw situatie

n8n is geen open source in de klassieke zin. De Community-editie valt onder de Sustainable Use License 1.0. Je mag de software gebruiken, aanpassen en doorgeven — zolang het gebruik intern-zakelijk blijft.

De grens die telt: je mag n8n niet inbouwen in een product dat je aan externe klanten verkoopt. Automatiseer je je eigen offerteproces, je eigen leadopvolging, je eigen rapportages? Prima. Bouw je een dienst waarin klanten n8n-workflows afnemen? Dan heb je een andere licentie nodig.

Binnen die grens krijg je alles: onbeperkt workflows, executies en gebruikers, de volledige integratiebibliotheek en de AI-nodes. Zonder licentiesleutel start n8n automatisch als Community-editie. Voeg je een Business- of Enterprise-sleutel toe, dan schakelen de betaalde functies aan.

## Wat je aan hardware nodig hebt

2 GB werkgeheugen is het gedocumenteerde minimum. Dat is genoeg om te leren en om een paar simpele workflows te draaien.

Voor productie ligt de ondergrens rond 4 GB, en met AI-nodes of meerdere gelijktijdige executies wil je richting 8 GB. Geheugen is bijna altijd de eerste bottleneck, niet de processor. Loopt een workflow vast, kijk dan eerst daarnaar.

## De opzet in vier stappen

**1. Kies je database vooraf.** n8n start standaard met SQLite. Dat werkt om te proeven, maar loopt vast bij gelijktijdige executies en een groeiende uitvoeringsgeschiedenis. Weet je dat dit productie wordt, begin dan meteen met PostgreSQL — achteraf migreren is vervelender dan het vooraf goed zetten.

**2. Draai n8n en PostgreSQL naast elkaar in Docker.** Twee containers in één compose-bestand, met een volume voor de database zodat je data een herstart overleeft. Dit is de standaardopzet waar de documentatie en de meeste handleidingen van uitgaan.

**3. Zet er een reverse proxy voor met SSL.** Zonder proxy staat je n8n op een kale poort en zonder versleuteling. Met een reverse proxy krijg je een net domein, een geldig certificaat en een plek om toegangsregels te zetten. Doe dit vóór je de eerste echte inloggegevens in een workflow zet, niet erna.

**4. Test met webhooks voordat je gaat bouwen.** Webhooks zijn het onderdeel dat het vaakst misgaat bij self-hosting, omdat n8n moet weten onder welke publieke URL hij bereikbaar is. Werkt een testwebhook van buitenaf, dan staat de rest meestal ook goed.

Wil je eerst weten of self-hosting überhaupt bij je past, lees dan onze vergelijking [automatiseren met AI: Make, Zapier of n8n](/nieuws/automatiseren-met-ai-make-zapier-n8n) — de gehoste varianten zijn voor veel mensen de betere keuze. Draait je workflow eenmaal, zorg dan dat hij een storing overleeft: [self-healing workflows bouwen met n8n](/nieuws/n8n-self-healing-workflows) legt de retry- en foutafhandelingslagen uit.

## Waar je op moet letten na de eerste week

De verleiding is om na een geslaagde installatie meteen door te bouwen. Twee dingen die je beter direct regelt.

Zet een back-up van je database in. Je workflows en inloggegevens zitten daarin; een server die omvalt zonder back-up betekent opnieuw beginnen. En ruim je uitvoeringsgeschiedenis op met een bewaartermijn, anders groeit je database ongemerkt door tot hij traag wordt.

De rekensom is uiteindelijk simpel: geen licentiekosten, wel infrastructuurkosten en wel onderhoudstijd. Wie dat laatste niet meerekent, komt bedrogen uit — precies zoals bij elk ander stuk software dat je zelf draait. Meer context over waar automatisering nu heen beweegt lees je op [hetlaatsteainieuws.nl](https://hetlaatsteainieuws.nl/achtergrond/ai-agents-2026-wat-zijn-ze).
