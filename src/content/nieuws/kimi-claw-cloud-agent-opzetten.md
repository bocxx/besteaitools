---
title: "Kimi Claw opzetten: een cloud-agent zonder eigen server"
description: "Kimi Claw draait OpenClaw in je browser, zonder VPS of Docker. Zo zet je hem op — en zo voorkom je dat een stilstaande agent je credits opeet."
publishedAt: 2026-08-30
updatedAt: 2026-08-30
author: "Redactie"
category: "gids"
tags:
  - "kimi"
  - "kimi-claw"
  - "openclaw"
  - "ai-agent"
  - "moonshot"
  - "cloud-agent"
toolSlug: "kimi"
featured: false
draft: false
readingTime: 5
heroImageAlt: "Miniatuur diorama-illustratie bij tutorial over het opzetten van Kimi Claw"
heroScene: "A small robot working alone inside a lit miniature office at night while a tiny taximeter on the desk quietly ticks upward beside it"
keyTakeaways:
  - "Kimi Claw is Moonshots cloud-versie van OpenClaw: de agent draait in een sandbox op kimi.com, dus je hebt geen eigen server of Docker nodig."
  - "Een eigen Kimi Claw zit vanaf het Allegretto-abonnement (¥199 per maand); Allegro (¥699) heeft hem ook. Beide ondersteunen tien Claw-groepsgesprekken."
  - "Alle Kimi-functies delen één creditpot, dus een drukke Claw-agent eet ook je Deep Research en Kimi Code op."
  - "Let op de stille kostenpost: een uitgerolde Claw-cloudhost kost dagelijks ongeveer 0,6 procent van je credits, ook als je niets doet."
faq:
  - q: "Wat is Kimi Claw precies?"
    a: "Kimi Claw is de cloudversie van het OpenClaw-agentframework, gebouwd door Moonshot AI en bereikbaar vanuit kimi.com. Waar je OpenClaw normaal zelf op een server of in Docker draait, start Kimi bij elke aanroep een geïsoleerde cloudsandbox die code uitvoert, de browser bedient en tools aanroept. Je agent blijft draaien als je je laptop dichtklapt, en je bereikt hem vanuit elke browser."
  - q: "Welk Kimi-abonnement heb ik nodig voor Kimi Claw?"
    a: "Een eigen Kimi Claw hoort volgens het Kimi Help Center bij het Allegretto-plan van ¥199 per maand en bij Allegro van ¥699 per maand. Beide bevatten een dedicated Kimi Claw met ondersteuning voor tien Kimi Claw-groepsgesprekken. De goedkopere plannen Andante (¥49) en Moderato (¥99) noemen die functie niet in hun opsomming. Prijzen worden in yuan afgerekend; controleer de actuele pagina voor je afsluit."
  - q: "Waarom worden er credits afgeschreven terwijl mijn agent niets doet?"
    a: "Omdat een uitgerolde cloudhost geen gratis wachtstand is. Kimi rekent doorlopend voor de looptijd en het resourcegebruik van de sandbox, ook als er geen taak loopt: ongeveer 0,6 procent van je maandcredits per dag, elke dag afgerekend om 16:00 uur. Over een maand is dat rond de 18 procent van je pot. Gebruik je Claw een tijdje niet, sla dan je memory-, soul- en workspace-bestanden lokaal op en verwijder de cloudhost; daarna stoppen de afschrijvingen."
  - q: "Kan ik mijn bestaande OpenClaw-installatie koppelen aan Kimi?"
    a: "Ja. Moonshot noemt dat BYOC, kort voor Bring Your Own Claw: je verbindt een OpenClaw-omgeving die je lokaal of bij een andere hoster draait met de interface op kimi.com. Je behoudt je eigen configuratie en gebruikt Kimi alleen als bedieningslaag. Handig als je je agent liever op eigen infrastructuur houdt maar wel het gemak van de webinterface wilt."
  - q: "Delen alle Kimi-functies dezelfde credits?"
    a: "Ja, en dat is de belangrijkste valkuil. Website-publicatie, Deep Research, PPT, Kimi Code, Kimi Work, Kimi Claw, K3 en K3 Agent Swarm putten allemaal uit één creditpot, afgerekend op werkelijk tokenverbruik. Raakt die pot leeg door een enthousiaste Claw-agent, dan staan je andere functies ook stil. Kimi Code heeft daarnaast een eigen limiet van vijf uur per week, die alleen voor Kimi Code geldt."
---

OpenClaw zelf draaien betekent normaal een VPS huren, Docker leren en zelf updaten. Kimi Claw haalt die drempel weg: Moonshot draait het framework voor je in de cloud, bereikbaar vanuit een browsertab op kimi.com. Handig — mits je weet hoe de afrekening werkt, want daar zit een addertje dat je pas na een week ziet.

## Stap 1: kijk eerst of je abonnement het toelaat

Kimi Claw zit niet in de gratis laag. Volgens het Kimi Help Center hoort een dedicated Kimi Claw bij het **Allegretto**-plan van ¥199 per maand, en bij **Allegro** van ¥699 per maand; beide met ondersteuning voor tien Kimi Claw-groepsgesprekken. De goedkopere plannen Andante (¥49) en Moderato (¥99) noemen de functie niet ([Bron: Kimi Help Center](https://www.kimi.com/en/help/membership/membership-pricing)).

Check dat dus vóór je een middag inruimt om iets op te zetten dat je plan niet aankan.

## Stap 2: een Claw uitrollen of je eigen koppelen

Je hebt twee routes. De eenvoudige: laat Kimi een verse Claw-instantie uitrollen vanuit de interface op kimi.com. De andere: **BYOC**, Bring Your Own Claw, waarbij je een bestaande OpenClaw-omgeving op je eigen server of laptop koppelt aan de Kimi-interface. Die tweede route houdt je configuratie en je data waar ze nu staan, en gebruikt Kimi alleen als bedieningslaag ([Bron: MarkTechPost, 15 februari 2026](https://www.marktechpost.com/2026/02/15/moonshot-ai-launches-kimi-claw-native-openclaw-on-kimi-com-with-5000-community-skills-and-40gb-cloud-storage-now/)).

> **💡 Beginner-tip:** Weet je niet wat OpenClaw is? Lees dan eerst [OpenClaw: de open-source AI-agent uitgelegd](https://hetlaatsteainieuws.nl/achtergrond/openclaw-open-source-ai-agent) op hetlaatsteainieuws.nl. Kimi Claw is niet een eigen agent-systeem, maar een gemakkelijke manier om dát framework te draaien.

## Stap 3: inrichten via de chat

Je configureert Kimi Claw pratend, niet klikkend. In het gesprek stel je zijn persona in, geef je geheugenregels mee, plan je terugkerende taken en installeer je skills uit ClawHub. Bij de lancering in februari 2026 meldde Moonshot ruim 5.000 gescreende skills en 40GB opslag; controleer die aantallen op de actuele pagina, want ze bewegen.

Wil je meldingen buiten de browser, dan kun je een kanaal koppelen — een Telegram-bot is de meest genoemde route.

## Stap 4: reken door wat je maandelijks kwijt bent

Hier zit de les die de meeste reviews overslaan.

Alle Kimi-functies delen **één creditpot**: website-publicatie, Deep Research, PPT, Kimi Code, Kimi Work, Kimi Claw, K3 en K3 Agent Swarm. Er wordt afgerekend op werkelijk tokenverbruik, dus een druk draaiende agent eet je Deep Research op. Ongebruikte credits vervallen aan het eind van je factuurcyclus.

En dan de stille post: een **uitgerolde Claw-cloudhost kost ongeveer 0,6 procent van je maandcredits per dag**, elke dag afgerekend om 16:00 uur, óók als je geen taak draait. Kimi legt uit waarom: de sandbox is geen gratis wachtstand maar houdt je runtime-omgeving en data in leven ([Bron: Kimi Help Center](https://www.kimi.com/en/help/membership/membership-pricing)). Over een maand is dat ruwweg 18 procent van je pot — voordat je iets hebt gedaan.

> **⚡ Gevorderden:** Gebruik je Claw met tussenpozen, behandel de cloudhost dan als iets wat je opruimt. Sla je memory-, soul- en workspace-bestanden lokaal op, verwijder de host, en rol hem opnieuw uit wanneer je hem nodig hebt. Volgens Kimi stoppen de afschrijvingen na verwijdering volledig. Dat scheelt je bij onregelmatig gebruik makkelijk een vijfde van je credits.

## Stap 5: eerst één taak, dan pas uitbreiden

Begin met één terugkerende taak die je nu handmatig doet en die geen gevoelige gegevens raakt. Een dagelijkse samenvatting van een paar bronnen, of een monitor die je waarschuwt bij een verandering. Meet een week lang wat dat aan credits kost voordat je er skills bij zet.

Twee dingen om nuchter bij te blijven. Je data loopt via een Chinese aanbieder, wat het voor organisaties met persoonsgegevens meestal geen optie maakt. En een agent die 24/7 doorwerkt, doet dat ook als hij een verkeerde aanname heeft — geef hem geen rechten die je niet wilt terugdraaien.

## Checklist: ben je klaar?

- [ ] Abonnement is Allegretto of hoger (of je koppelt via BYOC je eigen OpenClaw)
- [ ] Claw-instantie uitgerold, of eigen OpenClaw gekoppeld
- [ ] Persona, geheugenregels en eventuele meldingskanaal ingesteld
- [ ] Maximaal een handvol skills geïnstalleerd om mee te beginnen
- [ ] Je weet dat álle Kimi-functies dezelfde creditpot delen
- [ ] Je hebt de dagelijkse 0,6 procent sandbox-kost meegerekend
- [ ] Afspraak met jezelf: host verwijderen als je 'm een tijd niet gebruikt
- [ ] Geen persoonsgegevens of bedrijfsgeheimen in de eerste taken

Wil je liever de modelkant op dan de agentkant, dan is [Kimi K3 gebruiken via de Moonshot-API](/nieuws/kimi-k3-moonshot-api-gebruiken) de logische volgende stap. En wie meerdere agents naast elkaar draait, heeft iets aan [Solo: al je terminal-agents in één venster](/nieuws/solo-terminal-agents-een-venster).

## Stand van zaken — bijgewerkt 2026-08-30

- Abonnementen (maandelijks): Andante ¥49, Moderato ¥99, Allegretto ¥199, Allegro ¥699.
- Dedicated Kimi Claw: vanaf Allegretto, inclusief 10 Kimi Claw-groepsgesprekken.
- Sandbox-kosten cloudhost: circa 0,6 procent van de maandcredits per dag, afgerekend om 16:00 uur.
- Gepubliceerde Agent-website: circa 0,08 procent van de credits per dag, stopt bij "Unpublish".
- Kimi Code: aparte limiet van 5 uur per week, los van de creditpot.

## Bronnen

- [Kimi Help Center — Membership Pricing and Plan Overview](https://www.kimi.com/en/help/membership/membership-pricing)
- [Kimi Help Center — Membership Subscription Service Benefits](https://www.kimi.com/en/help/membership/membership-overview)
- [MarkTechPost — Moonshot AI Launches Kimi Claw (15 februari 2026)](https://www.marktechpost.com/2026/02/15/moonshot-ai-launches-kimi-claw-native-openclaw-on-kimi-com-with-5000-community-skills-and-40gb-cloud-storage-now/)
