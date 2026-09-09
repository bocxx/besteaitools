---
title: "Welke Claude-skills installeer je écht? Twee bronnen en een dokter"
heroImageAlt: "Miniatuur diorama-illustratie bij artikel 'Welke Claude-skills installeer je écht? Twee bronnen en een dokter'"
description: "Uit 55 aanbevelingen in vijf lijstjes blijven er twee bronnen over die je kunt vertrouwen. Zo installeer je ze, en zo meet je of je skills iets doen."
publishedAt: 2026-09-09
updatedAt: 2026-09-09
author: "Redactie"
category: "gids"
tags:
  - "claude-code"
  - "claude-skills"
  - "superpowers"
  - "skill-doctor"
  - "anthropic"
  - "marketplace"
toolSlug: "claude-code"
featured: true
draft: false
readingTime: 5
heroImage: "/images/articles/diorama-welke-claude-skills-installeren.webp"
heroScene: "A tiny doctor's stethoscope resting on an open folder of index cards, with two neatly stacked card boxes beside it and a pile of loose cards swept aside"
keyTakeaways:
  - "Van 55 aanbevelingen uit vijf lijstjes blijven er twee bronnen over die breed bevestigd zijn: anthropics/skills en obra/superpowers."
  - "Superpowers installeer je via de officiële marketplace met /plugin install superpowers@claude-plugins-official — niet via de drie andere commando's die rondgaan."
  - "De documentskills van Anthropic (pdf, docx, xlsx, pptx) zijn source-available, niet open source. De rest van die repo is Apache 2.0."
  - "Met /skill-doctor van Warp laat je je eigen skills beoordelen op basis van je échte gesprekken, en krijg je concrete tekstvoorstellen terug."
  - "Beoordeel een skill op wie hem schreef en wat de scripts doen, niet op hoe vaak hij in een lijstje staat."
faq:
  - q: "Welke Claude-skills zijn de moeite waard?"
    a: "Twee bronnen zijn breed bevestigd en controleerbaar. Ten eerste anthropics/skills, de officiële repo van Anthropic, met de documentskills voor pdf, docx, xlsx en pptx plus een reeks voorbeelden. Ten tweede obra/superpowers, een pakket van veertien skills rond een complete werkwijze voor softwareontwikkeling: brainstormen, plannen schrijven, test-driven development, code review en het afronden van een branch. Alles daarbuiten komt in ons vergelijk uit één lijstje, of van de partij die het lijstje schreef."
  - q: "Hoe installeer ik superpowers in Claude Code?"
    a: "Met één commando uit de officiële marketplace: /plugin install superpowers@claude-plugins-official. Er circuleren drie verschillende commando's voor dit pakket, met drie verschillende marketplace-namen. Het commando hierboven staat in de repo zelf en is de route die Anthropic aanhoudt. Na installatie herstart je Claude Code; de skills activeren daarna vanzelf zodra een taak erom vraagt."
  - q: "Wat doet /skill-doctor?"
    a: "Skill-doctor is een gratis, open source skill van Warp die je bestaande skills beoordeelt. Hij verzamelt je eerdere gesprekken met Claude Code, Codex of Warp, laat subagents die scoren op efficiëntie, codekwaliteit en dekking, en stelt op basis daarvan concrete wijzigingen aan je SKILL.md-bestanden voor. Je krijgt een cijfer per onderdeel en kant-en-klare tekstvoorstellen, geen algemeen advies."
  - q: "Zijn de documentskills van Anthropic open source?"
    a: "Deels. Veel skills in anthropics/skills staan onder Apache 2.0, maar de vier documentskills (docx, pdf, pptx en xlsx) zijn source-available en niet open source. Anthropic deelt ze omdat het dezelfde skills zijn die de documentfuncties van Claude aandrijven, als voorbeeld van complexere skills in productie. Je mag ze lezen en gebruiken via de marketplace; het is geen vrije licentie."
  - q: "Hoe weet ik of een skill veilig is?"
    a: "Kijk naar drie dingen voordat je installeert. Wie is de eigenaar van de repo, en kun je die aanwijzen? Zitten er scripts bij, en zo ja, wat doen ze — let vooral op verbindingen naar buiten die niet in de beschrijving staan. En hoe ziet de geschiedenis eruit: een repo met vier commits en veel sterren is iets anders dan een repo met honderden commits. Een skill draait met jouw rechten, dus dat is de moeite van drie minuten kijken waard."
---

# Welke Claude-skills installeer je écht? Twee bronnen en een dokter

Zoek op "beste Claude skills" en je vindt lijstjes met tientallen aanbevelingen. Wij legden er vijf naast elkaar en telden op: samen ongeveer 55 skills, waarvan ruim zeventig procent maar in één lijstje voorkomt of van de schrijver zelf komt.

Wat blijft er over? Twee bronnen. Plus een gereedschap om te meten of je skills überhaupt iets doen.

## 1. De officiële skills van Anthropic

`anthropics/skills` is de repo van Anthropic zelf. Registreer hem als marketplace:

```shell
/plugin marketplace add anthropics/skills
```

Daarna installeer je één van de twee bundels rechtstreeks:

```shell
/plugin install document-skills@anthropic-agent-skills
/plugin install example-skills@anthropic-agent-skills
```

`document-skills` bevat pdf, docx, xlsx en pptx — dezelfde skills die de documentfuncties van Claude aandrijven. Gebruiken doe je ze door ze te noemen: *"gebruik de pdf-skill om de formuliervelden uit dit bestand te halen"*.

Twee dingen om te weten. Die vier documentskills zijn **source-available, niet open source**; de rest van de repo staat onder Apache 2.0. En Anthropic zet er zelf bij dat de skills bedoeld zijn voor demonstratie en educatie — test ze in je eigen omgeving voor je erop leunt ([Bron: anthropics/skills](https://github.com/anthropics/skills)).

## 2. Superpowers: veertien skills als één werkwijze

`obra/superpowers` van Jesse Vincent is het enige pakket dat in drie van de vijf lijstjes terugkomt. Het is geen losse verzameling maar een methode: brainstormen vóór er code komt, een plan schrijven, dat plan door subagents laten uitvoeren, test-driven werken, code review, en de branch netjes afronden.

Er circuleren **drie verschillende installatiecommando's** voor dit pakket, met drie verschillende marketplace-namen. Dit is degene die in de repo zelf staat:

```shell
/plugin install superpowers@claude-plugins-official
```

De veertien skills erin: `brainstorming` · `writing-plans` · `executing-plans` · `subagent-driven-development` · `dispatching-parallel-agents` · `test-driven-development` · `systematic-debugging` · `verification-before-completion` · `requesting-code-review` · `receiving-code-review` · `using-git-worktrees` · `finishing-a-development-branch` · `writing-skills` · `using-superpowers`.

Ze triggeren vanzelf; je hoeft niets aan te roepen. Wil je het pakket eerst in één sessie proberen, begin dan met een opdracht waar het over nadenken loont ("ik wil X bouwen") en kijk of Claude eerst gaat vragen in plaats van meteen typen.

> Let op de telemetrie: de optionele visuele begeleiding bij `brainstorming` laadt een logo van de site van de makers, inclusief het versienummer. Geen projectgegevens, maar het is verkeer. Uitzetten kan met de omgevingsvariabele `SUPERPOWERS_DISABLE_TELEMETRY`, en de skill respecteert ook Claude Code's eigen `DISABLE_TELEMETRY` ([Bron: obra/superpowers](https://github.com/obra/superpowers)).

## 3. Skill-doctor: laat je eigen skills nakijken

Dit is de aanvulling die in geen van de vijf lijstjes stond, en waarschijnlijk de nuttigste. `skill-doctor` komt uit `warpdotdev/common-skills` en is gratis en open source (MIT).

Wat hij doet: hij verzamelt je eerdere gesprekken met Claude Code, Codex of Warp, laat subagents die scoren op **efficiëntie, codekwaliteit en skill-dekking**, en stelt daarna concrete wijzigingen voor aan je `SKILL.md`-bestanden ([Bron: Warp](https://www.warp.dev/skill-doctor)). Je krijgt geen algemeen advies maar een cijfer per onderdeel plus tekstvoorstellen die je kunt overnemen.

Installeren gaat via de skills-CLI:

```shell
npx skills@latest add warpdotdev/common-skills --skill skill-doctor --agent claude-code --global
```

De hele set van zeventien bekijken kan met `--list` in plaats van `--skill`. Daar zitten er meer tussen die de moeite waard zijn: `create-pr`, `review-pr`, `diagnose-ci-failures` en `resolve-merge-conflicts`.

Dat dit bestaat, zegt iets over de fase waarin skills zitten. De vraag is niet meer welke je installeert, maar of de skills die je hebt daadwerkelijk werken.

## Zelf beoordelen: drie minuten

Kom je een skill tegen die hierboven niet staat, loop dan dit af voordat je installeert:

1. **Wie is de eigenaar?** Kun je de persoon of het bedrijf aanwijzen? Wij vonden twee populaire skills waarbij artikelen twee verschillende eigenaren noemden voor dezelfde skill — dan weet je dus niet wiens code je binnenhaalt.
2. **Zitten er scripts bij?** Veel skills zijn puur tekst, en dan is er weinig aan de hand. Brengt hij code mee, lees die dan, en let op verbindingen naar buiten die niet in de beschrijving staan.
3. **Hoe ziet de geschiedenis eruit?** Een repo met acht commits en een badge "50+ verified skills" is iets anders dan een repo met zeshonderd commits. Sterren zeggen minder dan je denkt: dezelfde repo werd in de lijstjes met 40.900 én met 282.600 sterren opgevoerd.

Een skill draait met jouw rechten, op jouw machine, met toegang tot jouw bestanden. Die drie minuten zijn goed besteed.

## Waar je verder kijkt

Nog geen skills ingesteld? Begin bij [Claude Code skills: wat ze zijn en hoe je je eerste instelt](/nieuws/claude-code-skills-instellen). Wil je er zelf één schrijven uit werk dat je al doet, dan helpt [deze gids](/nieuws/claude-skill-schrijven-uit-bestaand-werk).

Voor het bredere plaatje van hoe die lijstjes tot stand komen, lees [Beste Claude skills: waarom vijf lijstjes elkaar tegenspreken](https://hetlaatsteainieuws.nl/achtergrond/beste-claude-skills-lijstjes-vergeleken) op hetlaatsteainieuws.nl. Rol je dit uit over een team, dan staan de afspraken die je vooraf maakt in [AI-skills in je team](https://www.aiplatformmkb.nl/gidsen/ai-skills-team-invoeren-veilig) op aiplatformmkb.nl.
