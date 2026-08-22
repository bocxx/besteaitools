---
title: "Claude-skill schrijven uit werk dat je al doet"
description: "Een SKILL.md heeft maar twee verplichte velden. Zo maak je er in een half uur één die werkt, met de regels uit Anthropics eigen documentatie en de valkuilen die het vaakst misgaan."
publishedAt: 2026-08-22
updatedAt: 2026-08-22
author: "Redactie"
category: "gids"
tags:
  - "claude"
  - "claude-skills"
  - "agent-skills"
  - "anthropic"
  - "workflow"
  - "productiviteit"
toolSlug: "claude"
featured: false
draft: false
readingTime: 5
heroScene: "A small chrome robot writes on a single index card at a tidy workbench, while a towering stack of unused manuals sits pushed aside in the shadows, warm focused lamp light on the card"
heroImage: "/images/articles/diorama-claude-skill-schrijven-uit-bestaand-werk.webp"
heroImageAlt: "Miniatuur diorama-illustratie bij artikel 'Claude-skill schrijven uit werk dat je al doet'"
keyTakeaways:
  - "Een SKILL.md heeft maar twee verplichte frontmatter-velden: name (max 64 tekens) en description (max 1.024)."
  - "De description bepaalt of je skill ooit gevonden wordt. Zet er zowel in wát hij doet als wannéér hij nodig is."
  - "Houd de body onder de 500 regels en verwijs maximaal één niveau diep naar extra bestanden."
  - "Bouw eerst drie testscenario's en meet een baseline zonder skill. Anders weet je niet of je iets hebt verbeterd."
faq:
  - q: "Wat is het minimale dat in een SKILL.md moet staan?"
    a: "Twee frontmatter-velden. `name`: maximaal 64 tekens, alleen kleine letters, cijfers en koppeltekens, en de woorden 'anthropic' en 'claude' zijn gereserveerd. `description`: niet leeg, maximaal 1.024 tekens, geen XML-tags. Daaronder de body in markdown. Alle andere bestanden — referenties, scripts — zijn optioneel. Anthropic adviseert een gerund-vorm voor de naam, dus `processing-pdfs` in plaats van `pdf-helper`, en raadt woorden als `helper`, `utils` en `tools` af."
  - q: "Waarom wordt mijn skill niet opgepakt?"
    a: "Bijna altijd door de description. Claude laadt bij het begin van een gesprek alleen de metadata van elke skill — naam en beschrijving, samen zo'n honderd tokens — en beslist daarop of de skill relevant is. Staat er 'Helpt met documenten', dan valt er niets te herkennen. Schrijf in de derde persoon en benoem expliciet de trigger: 'Zet ruwe interviewnotities om in een gestructureerd verslag. Gebruik bij transcripten, gespreksnotities of opnames die tot een verslag moeten worden verwerkt.'"
  - q: "Hoe groot mag een skill worden?"
    a: "Anthropic adviseert de body van SKILL.md onder de 500 regels te houden, met een richtlijn van minder dan 5.000 tokens. Wordt het meer, splits dan naar aparte referentiebestanden. Belangrijk: verwijs maximaal één niveau diep. Bij geneste verwijzingen leest het model bestanden vaak maar gedeeltelijk in, en dan krijg je incomplete informatie zonder dat je het merkt. Referentiebestanden boven de 100 regels krijgen een inhoudsopgave bovenaan."
  - q: "Waar zet ik de skill neer?"
    a: "In Claude Code: `~/.claude/skills/` voor persoonlijke skills, `.claude/skills/` in de projectmap voor projectspecifieke. Op claude.ai upload je een zip via Settings, Features — let op dat dat per gebruiker geldt, er is geen centraal beheer voor een hele organisatie. Via de API gebruik je de `/v1/skills`-endpoints, wat de code-execution-tool vereist en workspace-breed werkt. Skills syncen niet tussen deze drie: wat je naar claude.ai uploadt, is niet beschikbaar via de API."
---

Je legt dezelfde werkwijze voor de derde keer uit in een nieuw gesprek. Dat is het moment waarop een skill zinvol wordt.

Een skill is een mapje met een tekstbestand, `SKILL.md`, waarin staat hoe een terugkerende klus moet worden aangepakt. Claude laadt hem automatisch zodra een taak erom vraagt. Deze gids loopt langs de regels uit Anthropics eigen documentatie en de fouten die daar expliciet worden genoemd.

## De opbouw

```markdown
---
name: verwerken-interviewnotities
description: Zet ruwe interviewnotities om in een gestructureerd verslag met
  citaten en actiepunten. Gebruik bij transcripten, gespreksnotities of opnames
  die tot een verslag moeten worden verwerkt.
---

## Werkwijze

1. Lees de notities door en markeer letterlijke citaten.
2. ...
```

Meer verplichte velden zijn er niet. `name` mag maximaal 64 tekens zijn, alleen kleine letters, cijfers en koppeltekens; de woorden "anthropic" en "claude" zijn gereserveerd. `description` mag tot 1.024 tekens en moet niet leeg zijn.

Anthropic adviseert de gerund-vorm voor namen — `processing-pdfs`, `writing-documentation` — en raadt vage aanduidingen als `helper`, `utils` en `tools` af.

## De description doet het werk

Dit is het onderdeel waar de meeste skills stranden, en het verklaart waarom.

Claude laadt bij aanvang van een gesprek alleen de metadata van alle beschikbare skills: naam en beschrijving, ongeveer honderd tokens per stuk. Pas als hij op basis daarvan besluit dat een skill relevant is, leest hij de body. Anthropic noemt dat progressive disclosure, en het bestaat om je contextvenster te sparen.

Het gevolg: je description is niet een samenvatting achteraf, maar de enige informatie waarop de beslissing valt. "Helpt met documenten" bevat niets om op te herkennen.

Schrijf in de derde persoon, en zet er twee dingen in: wat de skill doet, en wanneer hij nodig is. Die tweede helft wordt het vaakst vergeten.

> **💡 Beginner-tip:** een handige test is om alleen je description voor te leggen aan iemand die je werk niet kent, met de vraag: "bij welke opdracht zou jij dit erbij pakken?" Kan diegene het niet zeggen, dan kan Claude het ook niet.

## Vier regels uit de documentatie

**Onder de 500 regels.** Anthropic formuleert het principe als "het contextvenster is een publiek goed": zet er alleen in wat het model níet al weet. Algemene schrijftips of basale uitleg over een bekend bestandsformaat hoef je niet op te schrijven.

**Maximaal één niveau diep verwijzen.** Wordt het langer, splits dan naar aparte bestanden en verwijs daar vanuit SKILL.md naar. Maar niet vanuit dat bestand weer naar een volgend: bij geneste verwijzingen leest het model bestanden geregeld maar gedeeltelijk in, en dan mist er informatie zonder foutmelding. Referentiebestanden boven de 100 regels krijgen een inhoudsopgave.

**Stem de vrijheidsgraden af op de taak.** Anthropic gebruikt hiervoor een beeld dat blijft hangen: bij een open veld geef je richting, bij een smalle brug met afgronden schrijf je exact voor waar je loopt. Voor een schrijftaak volstaan uitgangspunten en voorbeelden. Voor iets waar één verkeerde stap alles omgooit, schrijf je het script letterlijk uit.

**Geen tijdgebonden informatie.** "Vóór augustus 2025 gold…" veroudert direct. Schrijf de huidige werkwijze op, zonder geschiedenis.

## Testen voordat je iets schrijft

Anthropic draait de volgorde om ten opzichte van wat de meeste mensen doen: bouw eerst je evaluaties, dan pas de documentatie. Minimaal drie scenario's, en meet eerst hoe Claude die aanpakt zónder skill.

Zonder die baseline weet je niet of je iets hebt verbeterd of alleen tekst hebt toegevoegd.

Er is een tweede aanbeveling die in de praktijk het meeste oplevert: ontwikkel met twee Claudes. De ene schrijft en verfijnt de skill, de andere gebruikt hem op echt werk. Kijk waar die tweede struikelt, en breng dat terug naar de eerste. Dat vindt de gaten die je zelf niet ziet, omdat jij de ontbrekende stap allang in je hoofd hebt zitten.

Test ook met de modellen die je daadwerkelijk gebruikt. Wat voor Opus voldoende is, kan voor Haiku te dun blijken.

## Werkt het? Er is een cijfer

SkillsBench, een onderzoek dat in februari 2026 op arXiv verscheen, testte 87 taken over acht domeinen in achttien opstellingen, telkens met en zonder skill. De gemiddelde slagingskans ging van 33,9 naar 50,5 procent — een winst van 16,6 procentpunt, per opstelling variërend van 4,1 tot 25,7.

Twee bevindingen zijn direct bruikbaar. Kleinere modellen mét skill evenaarden grotere modellen zonder. En gefocuste skills van maximaal drie onderdelen versloegen grote, uitputtende bundels.

Dat laatste sluit aan op een waarschuwing in de documentatie zelf: hoe meer skills er gelijktijdig geladen zijn, hoe kleiner de kans dat Claude de juiste kiest. Via de API geldt bovendien een harde grens van twintig skills per verzoek.

## Waar je skill komt te staan

| Omgeving | Locatie | Bereik |
|---|---|---|
| Claude Code | `~/.claude/skills/` | persoonlijk |
| Claude Code | `.claude/skills/` | project |
| claude.ai | zip-upload via Settings > Features | per gebruiker |
| API | `/v1/skills` | workspace-breed |

Twee dingen om te weten. Skills syncen niet tussen deze omgevingen: wat je naar claude.ai uploadt, is niet beschikbaar via de API en omgekeerd. En claude.ai kent geen centraal adminbeheer — wil je iets organisatiebreed uitrollen, dan loopt dat via de API of via Claude Code met plugins.

Skills die via de API draaien, werken in een sandbox zonder netwerktoegang en zonder de mogelijkheid om tijdens het uitvoeren packages te installeren. Heeft je skill een bibliotheek nodig, dan moet die er al zijn.

## Voordat je iets van internet installeert

Beveiligingsbedrijf Snyk scande in februari 2026 bijna vierduizend publieke skills. Bij 36,8 procent zat minstens één beveiligingsdefect, bij 13,4 procent iets kritieks, en er zaten 76 bevestigd kwaadaardige exemplaren tussen. Ruim een op de tien bevatte hardcoded wachtwoorden of sleutels.

OWASP bracht op 17 augustus 2026 een top tien van skill-risico's uit. Het kernprobleem in één zin: een skill is proza, dus code-scanners lopen er straal langs, en hij draait met de rechten van de agent die hem laadt.

Lees een skill dus regel voor regel voordat je hem installeert. Bij je eigen skills is dat geen probleem — die heb je zelf geschreven, en dat is precies het punt.

## Bronnen

- [Anthropic — Agent Skills best practices](https://platform.claude.com/docs/en/agents-and-tools/agent-skills/best-practices)
- [Anthropic — Agent Skills overview](https://platform.claude.com/docs/en/agents-and-tools/agent-skills/overview)
- [SkillsBench — arXiv 2602.12670](https://arxiv.org/abs/2602.12670)
- [Snyk — ToxicSkills (5 februari 2026)](https://snyk.io/blog/toxicskills-malicious-ai-agent-skills-clawhub/)
- [OWASP — Agentic Skills Top 10 (17 augustus 2026)](https://owasp.org/www-project-agentic-skills-top-10/)
