---
title: "Claude Code skills: wat ze zijn en hoe je je eerste instelt"
description: "Een skill is een mapje met instructies dat Claude Code automatisch oppakt. Zo zet je in vier stappen je eerste skill op, plus waar het bestand hoort te staan."
publishedAt: 2026-06-14
updatedAt: 2026-06-14
author: "Redactie"
category: "gids"
tags:
  - "claude-code"
  - "skills"
  - "skill-md"
  - "automatisering"
  - "anthropic"
  - "productiviteit"
toolSlug: "claude-code"
featured: false
draft: false
readingTime: 4
heroImage: "/images/articles/diorama-claude-code-skills-instellen.webp"
heroImageAlt: "Miniatuur diorama-illustratie bij artikel 'Claude Code skills: wat ze zijn en hoe je je eerste instelt'"
heroScene: "A tiny workshop bench with labeled brass drawers; a small robot slots a new glowing tool-card into one open drawer."
keyTakeaways:
  - "Een skill is een mapje met een SKILL.md-bestand erin: jouw vaste instructie of checklist die Claude Code automatisch oppakt zodra hij past."
  - "Claude Code ondersteunt alleen eigen (custom) skills, filesystem-gebaseerd. Je hoeft niets te uploaden — je maakt gewoon een map aan."
  - "Persoonlijke skills staan in ~/.claude/skills/ en gelden voor al je projecten; project-skills staan in .claude/skills/ en gelden alleen daar."
  - "Je roept een skill direct aan met /skill-naam, of Claude laadt hem zelf als je vraag bij de description past."
  - "In SKILL.md is alleen de description echt belangrijk: die bepaalt wanneer Claude de skill inzet. Houd het bestand kort, onder 500 regels."
faq:
  - q: "Wat is een skill in Claude Code?"
    a: "Een skill is een herbruikbaar setje instructies dat je in een mapje zet met een SKILL.md-bestand erin. In plaats van dezelfde checklist of werkwijze elke keer in de chat te plakken, leg je hem één keer vast. Claude Code laadt de skill dan automatisch wanneer je vraag erbij past, of je roept hem zelf aan met /skill-naam. Het grote voordeel: de inhoud laadt pas als je hem nodig hebt, dus lange referentietekst kost je tot dat moment vrijwel niets."
  - q: "Waar moet ik mijn skill-map plaatsen?"
    a: "Dat hangt af van wie de skill mag gebruiken. Voor een persoonlijke skill die in al je projecten werkt, gebruik je ~/.claude/skills/skill-naam/SKILL.md. Voor een skill die alleen bij één project hoort en die je met je team kunt delen via git, gebruik je .claude/skills/skill-naam/SKILL.md in de projectmap. De mapnaam wordt meteen het commando dat je typt — een map deploy-staging geeft je /deploy-staging."
  - q: "Moet ik kunnen programmeren om een skill te maken?"
    a: "Nee. Een basis-skill is puur tekst: een SKILL.md-bestand met een korte kop en wat instructies in gewoon Nederlands of Engels. Je hebt geen code nodig. Pas als je een skill een script wilt laten draaien (bijvoorbeeld een Python-bestand om data te verwerken), komt programmeerkennis kijken. Voor checklists, schrijfregels of een vaste werkwijze blijft het bij tekst."
  - q: "Wat is het verschil tussen een skill en een CLAUDE.md-bestand?"
    a: "CLAUDE.md is altijd actief: alles erin zit continu in Claudes context en telt dus steeds mee. Een skill laadt pas wanneer hij wordt gebruikt. Daardoor kun je lange, gedetailleerde procedures in een skill kwijt zonder dat ze elke chat belasten. Vuistregel van Anthropic: een feit hoort in CLAUDE.md, een uitgegroeide procedure of checklist verhuis je naar een skill."
  - q: "Kan ik skills delen met mijn team?"
    a: "Ja. Zet de skill in .claude/skills/ in je projectmap en commit die naar git — iedereen die het project uitcheckt heeft hem dan. Voor breder gebruik kun je skills bundelen in een Claude Code-plugin of (in organisaties) centraal uitrollen via managed settings. Let op: project-skills uit een repo van iemand anders kunnen tools vooraf goedkeuren, dus bekijk ze voor je een onbekende repo vertrouwt."
---

Claude Code kreeg er de afgelopen maanden een handige laag bij: **skills**. Kort gezegd is een skill een mapje met instructies dat Claude automatisch oppakt zodra je vraag erbij past. Geen upload, geen account-instelling — je maakt een map aan en klaar. Hieronder zie je in vier stappen hoe je je eerste skill opzet, en waar het bestand precies hoort te staan.

> **💡 Beginner-tip:** Nieuw met Claude Code zelf? Lees dan eerst rustig wat de tool doet en hoe agents werken in onze achtergrond [AI-agents in 2026: wat zijn ze en wat kun je er echt mee?](https://hetlaatsteainieuws.nl/ai-deep-dives/ai-agents-2026-wat-zijn-ze) Daarna heeft deze gids meteen meer context.

## Wat een skill eigenlijk is

Een skill bundelt kennis die Claude Code op het juiste moment toepast: een werkwijze, een checklist, een stijlgids. In plaats van dezelfde instructie elke keer opnieuw in de chat te plakken, leg je hem één keer vast in een bestand dat `SKILL.md` heet ([Bron: Claude Code docs — Skills](https://code.claude.com/docs/en/skills)). Het slimme zit in hoe het laadt: Claude ziet standaard alleen de korte omschrijving van je skill, en pas wanneer je iets vraagt dat erbij past, leest hij de volledige inhoud in. Lange referentietekst kost je dus niets totdat je hem nodig hebt.

Belangrijk om te weten: in Claude Code werk je altijd met je **eigen** skills, opgeslagen op je computer. De kant-en-klare skills die Anthropic levert voor Word, Excel en PowerPoint zijn er wel, maar die draaien via de Claude-app en de API — niet in Claude Code zelf ([Bron: Anthropic — Agent Skills](https://platform.claude.com/docs/en/agents-and-tools/agent-skills/overview)). Voor de terminal geldt: je maakt ze zelf, en dat is eenvoudiger dan het klinkt.

## Je eerste skill in vier stappen

Als voorbeeld maken we een kleine skill die je openstaande wijzigingen samenvat en risico's eruit pikt. Anthropic gebruikt dit zelf als startvoorbeeld ([Bron: Claude Code docs — Skills](https://code.claude.com/docs/en/skills)).

1. **Maak de skill-map aan.** Persoonlijke skills komen in een vaste map in je home-folder. Open je terminal en draai:

   ```bash
   mkdir -p ~/.claude/skills/samenvatting-wijzigingen
   ```

   De mapnaam wordt straks je commando — hier dus `/samenvatting-wijzigingen`.

2. **Schrijf het `SKILL.md`-bestand.** Maak in die map een bestand `SKILL.md` met bovenaan een klein stukje frontmatter tussen `---`-streepjes, en daaronder je instructies. De `description` is het belangrijkste: daaraan herkent Claude wanneer hij de skill moet inzetten.

   ```yaml
   ---
   description: Vat openstaande wijzigingen samen en wijst op risico's. Gebruik dit als de gebruiker vraagt wat er veranderd is of om een review van de diff.
   ---

   ## Instructies

   Vat de wijzigingen samen in twee of drie bullets. Noem daarna risico's
   die je opvalt, zoals ontbrekende foutafhandeling, hardgecodeerde waarden
   of tests die bijgewerkt moeten worden.
   ```

3. **Sla op en open Claude Code.** Start `claude` in een project waar je net iets hebt gewijzigd. Claude Code houdt je skill-mappen in de gaten, dus een nieuwe skill in `~/.claude/skills/` is meteen actief — herstarten hoeft niet ([Bron: Claude Code docs — Skills](https://code.claude.com/docs/en/skills)).

4. **Test het.** Vraag iets dat bij je omschrijving past, bijvoorbeeld "Wat heb ik veranderd?", en Claude laadt de skill vanzelf. Of roep hem direct aan door `/samenvatting-wijzigingen` te typen. Je zou een korte samenvatting plus een lijstje risico's terug moeten krijgen.

> **⚡ Gevorderden:** Je kunt live data in de skill prikken vóór Claude hem leest. Een regel als `` !`git diff HEAD` `` draait dat commando eerst en plakt de uitvoer in de instructie, zodat de samenvatting op je echte werkmap is gebaseerd in plaats van op wat Claude denkt te zien.

## Waar het bestand hoort te staan

De plek van je skill bepaalt wie hem kan gebruiken. Twee niveaus dek je in de praktijk het meest:

- **Persoonlijk** — `~/.claude/skills/<naam>/SKILL.md`. Werkt in al je projecten, alleen voor jou.
- **Project** — `.claude/skills/<naam>/SKILL.md` in de projectmap. Werkt alleen in dat project, en commit je naar git zodat je team hem ook heeft.

Daarnaast bestaan een plugin- en een enterprise-niveau voor bredere distributie ([Bron: Claude Code docs — Skills](https://code.claude.com/docs/en/skills)). Begin persoonlijk, en verhuis een skill naar projectniveau zodra je collega's hem ook nodig hebben.

Gebruik je Claude Code al langer? De oude `.claude/commands/`-bestanden zijn opgegaan in skills. Een bestand `.claude/commands/deploy.md` en een skill `.claude/skills/deploy/SKILL.md` maken allebei `/deploy` en werken hetzelfde. Je bestaande commando's blijven werken; skills voegen er extra's aan toe, zoals een eigen map voor scripts.

## Wanneer maak je er een, en wanneer niet

Een skill loont zodra je merkt dat je dezelfde checklist of meerstaps-werkwijze blijft herhalen in de chat ([Bron: Claude Code docs — Skills](https://code.claude.com/docs/en/skills)). Of als een stuk van je `CLAUDE.md` geen feit meer is maar een procedure: dat verhuis je naar een skill, want skill-inhoud laadt pas bij gebruik, terwijl `CLAUDE.md` altijd meetelt.

Houd het bestand kort — Anthropic adviseert onder de 500 regels. Lange referentiedocumenten zet je in losse bestanden naast `SKILL.md` en verwijs je vanuit de skill, zodat ze alleen laden wanneer Claude ze echt nodig heeft.

Skills zijn één van de bouwstenen waarmee Claude Code de afgelopen tijd is uitgegroeid tot een compleet platform, naast plugins, hooks en de parallelle [Dynamic Workflows](/nieuws/claude-code-dynamic-workflows-gebruiken) voor grotere klussen. Sinds het herontwerp van april 2026 draai je die skills bovendien in een desktop-app met meerdere sessies naast elkaar — zie onze gids over [werken met parallelle agents in de Claude Code desktop-app](/nieuws/claude-code-desktop-parallelle-sessies). Voor terugkerend werk is een eigen skill vaak het simpelste begin. Wil je Claude Code eerst van de grond af leren? Anthropic heeft er een [gratis cursus met certificaat](/nieuws/anthropic-academy-gratis-ai-cursussen) voor.

## Checklist: ben je klaar?

- [ ] Claude Code geïnstalleerd en werkend in je terminal
- [ ] Map aangemaakt onder `~/.claude/skills/<naam>/` (persoonlijk) of `.claude/skills/<naam>/` (project)
- [ ] `SKILL.md` bevat frontmatter met een duidelijke `description` die zegt wát en wanneer
- [ ] Mapnaam is logisch — die wordt je `/commando`
- [ ] Skill getest: via een natuurlijke vraag én via `/skill-naam`
- [ ] Bestand onder de 500 regels; lange referentie staat in losse bestanden
- [ ] Team-skill? Dan in `.claude/skills/` en gecommit naar git

## Bronnen

- [Claude Code docs — Extend Claude with skills](https://code.claude.com/docs/en/skills) — officiële handleiding voor skills in Claude Code, inclusief mappenstructuur en het startvoorbeeld
- [Anthropic — Agent Skills (overview)](https://platform.claude.com/docs/en/agents-and-tools/agent-skills/overview) — wat skills zijn, de drie laad-niveaus en welke surfaces ze ondersteunen
- [Anthropic — Equipping agents for the real world with Agent Skills](https://www.anthropic.com/engineering/equipping-agents-for-the-real-world-with-agent-skills) — achtergrond bij de architectuur en het idee erachter
