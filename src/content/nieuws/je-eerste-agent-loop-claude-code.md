---
title: "Je eerste agent-loop bouwen met Claude Code: stop met prompten in 4 stappen"
description: "Loop engineering is het nieuwe modewoord. Zo bouw je met Claude Code je eerste agent-loop: één doel, één controle, en de agent draait tot het klopt."
publishedAt: 2026-07-07
updatedAt: 2026-07-07
author: "Redactie"
category: "gids"
tags:
  - "claude-code"
  - "loop-engineering"
  - "ai-agents"
  - "hooks"
  - "automatisering"
  - "anthropic"
toolSlug: "claude-code"
featured: false
draft: false
readingTime: 5
heroImage: "/images/articles/diorama-je-eerste-agent-loop-claude-code.webp"
heroImageAlt: "Miniatuur diorama-illustratie bij artikel 'Je eerste agent-loop bouwen met Claude Code: stop met prompten in 4 stappen'"
heroScene: "A tiny terminal window on a desk with a small robot running laps around a green checkmark, a hook-shaped lever and a test-tube rack beside it, warm studio lighting"
keyTakeaways:
  - "Een loop laat je het doel één keer definiëren; de agent draait daarna zelf door tot een meetbare controle groen is."
  - "In Claude Code bouw je de feedback met een PostToolUse-hook die na elke wijziging je tests draait en de uitkomst teruggeeft."
  - "Zonder harde stopregel loopt een loop door en verbrandt hij tokens; leg 'klaar' meetbaar vast in je CLAUDE.md."
  - "Laat een aparte subagent het werk verifiëren: het model dat de code schreef mag zichzelf niet beoordelen."
faq:
  - q: "Wat is een agent-loop in Claude Code?"
    a: "Een agent-loop is een herhalende cyclus waarin je Claude Code één doel geeft, en de agent zelf een plan maakt, bestanden wijzigt, je tests draait, de uitkomst leest en doorgaat tot een controle slaagt. Het verschil met een gewone prompt: een prompt geeft één antwoord, een loop werkt zelfstandig naar een meetbaar resultaat toe. Jij definieert het doel en de stopregel; de loop doet de herhaling."
  - q: "Heb ik een betaald abonnement nodig voor loops in Claude Code?"
    a: "Claude Code werkt met een freemium-model: je kunt beginnen zonder betaald plan. Loops verbruiken wel meer tokens dan losse prompts, omdat de agent dezelfde stappen herhaalt tot de controle groen is. Voor serieus loop-werk is een betaald plan of API-tegoed praktischer. Begin klein met één afgebakende taak en houd je verbruik in de gaten voordat je grotere loops laat draaien."
  - q: "Hoe zorg ik dat een loop niet oneindig doorgaat?"
    a: "Leg 'klaar' meetbaar vast: bijvoorbeeld 'alle tests groen' of 'build start binnen 800 milliseconden'. Zet die definitie in je CLAUDE.md zodat de agent weet wanneer hij mag stoppen. Spreek daarnaast een maximum aantal pogingen af. Zonder harde stopregel blijft een agent proberen en verbrandt hij onnodig tokens aan een probleem dat hij niet kan oplossen."
  - q: "Wat doet een PostToolUse-hook in Claude Code?"
    a: "Een PostToolUse-hook is een shell-commando dat automatisch afvuurt nadat Claude Code een bestand heeft gewijzigd. Je gebruikt hem om je tests of linter te draaien; de output wordt daarna als context teruggegeven aan de agent. Zo ontstaat de feedback-lus: de agent ziet meteen of zijn wijziging slaagde of faalde, en past zijn volgende stap daarop aan, zonder dat jij iets hoeft te typen."
---

# Je eerste agent-loop bouwen met Claude Code

Loop engineering is het nieuwe modewoord onder ontwikkelaars: je typt geen prompts meer, je bouwt een systeem dat de agent zelf aanstuurt. Klinkt abstract, maar met Claude Code zet je vandaag je eerste loop op. Eén doel, één controle, en de agent draait tot het klopt. Hieronder in vier stappen, met wat je per stap op je scherm ziet.

## Wat een loop is, en waarom het geen gewone prompt is

Een gewone prompt vraagt het model om een antwoord. Eén vraag erin, één antwoord eruit. Een loop zet dat model in een systeem dat naar een echte uitkomst toewerkt: de agent voert een actie uit, krijgt feedback uit je project (testresultaten, linter-output, foutmeldingen), gebruikt die feedback om te beslissen wat hij daarna doet, en gaat door tot een doel is bereikt.

Jij definieert dat doel één keer. Claude Code is hier geschikt voor omdat het als agent zelfstandig je codebase leest, een plan maakt, bestanden wijzigt en commando's draait ([Bron: Anthropic](https://code.claude.com/docs/en/hooks-guide)).

> **💡 Beginner-tip:** Nog nooit met Claude Code gewerkt? Begin dan bij [Claude Code skills instellen](/nieuws/claude-code-skills-instellen) voor de basis. Deze tutorial gaat een laag dieper: niet wát Claude Code is, maar hoe je het zichzelf laat aansturen.

## De vier stappen

1. **Definieer het doel én de "klaar"-check.** Open of maak `CLAUDE.md` in je project-root. Schrijf hierin één concreet doel plus een meetbare controle waaraan de agent moet voldoen, bijvoorbeeld "alle tests in `npm test` slagen" of "de dev-server start binnen 800 milliseconden". Een vage instructie geeft een vage loop; een meetbare check geeft de agent een objectief eindpunt.

2. **Geef de agent zijn feedbackbron via een hook.** Voeg in `.claude/settings.json` een `PostToolUse`-hook toe die na elke bestandswijziging je tests of linter draait. De output gaat automatisch terug als context naar de agent. In je terminal zie je na elke wijziging de testuitslag langskomen — dat is de lus die zichzelf sluit. (Nieuw met hooks? [Onze hooks-gids](/nieuws/claude-code-hooks-woordkeuze-aanpassen) begint met een onschuldig weergave-voorbeeld.)

3. **Laat de loop draaien.** Geef het doel één keer als opdracht. Claude Code maakt een plan, wijzigt bestanden, draait via de hook je tests, leest de uitkomst en gaat door tot de check groen is. Jij typt niks meer tussendoor; je kijkt toe hoe rood langzaam groen wordt.

4. **Bouw een verificatie-stap in.** Laat een aparte subagent het resultaat controleren in een eigen context. Claude Code ondersteunt subagents die in een geïsoleerde omgeving je werk nakijken. De reden is simpel: het model dat de code schreef, mag niet zijn eigen beoordelaar zijn, want dan krijg je een controleur met dezelfde blinde vlekken als de maker.

> **⚡ Gevorderden:** Wil je de loop ongemoeid laten draaien, bijvoorbeeld 's nachts of in je CI-pijplijn? Gebruik de headless-modus (`claude -p`). Die draait de agent als één CLI-proces zonder terminalvenster en hergebruikt dezelfde hooks, permissies en instellingen als de interactieve versie ([Bron: Anthropic](https://code.claude.com/docs/en/hooks-guide)). Zo hang je de loop aan een cron-taak of een GitHub Action.

## De valkuil: geen stopregel

De grootste beginnersfout is een loop starten zonder harde grens. Een agent die niet weet wanneer hij klaar is, blijft proberen en verbrandt tokens aan een probleem dat hij niet kan kraken. Leg daarom altijd twee dingen vast: de meetbare "klaar"-definitie uit stap 1, en een maximum aantal pogingen. Merk je dat je loops veel tokens kosten, dan helpt onze gids [Claude Code tokens besparen](/nieuws/caveman-claude-code-tokens-besparen) om het verbruik te temmen.

Wil je de theorie achter dit alles — harness engineering, loop engineering en waar een tool als Hermes Agent in past — dan legt onze zustersite het uit in [Loop engineering, harness engineering en Hermes uitgelegd](https://hetlaatsteainieuws.nl/achtergrond/loop-engineering-harness-hermes-uitleg).

## Waar het naartoe groeit

Eén loop met tests is het startpunt. Zodra dit werkt, kun je meerdere gespecialiseerde agents parallel laten lopen met [Dynamic Workflows in Claude Code](/nieuws/claude-code-dynamic-workflows-gebruiken): eentje schrijft, eentje reviewt, eentje test. Draai je die agents in losse terminals, dan houdt [Solo ze samen met je dev-stack in één venster in de gaten](/nieuws/solo-terminal-agents-een-venster). Wil je hetzelfde patroon zonder API-kosten, dan kan dat ook volledig lokaal — zie [multi-agent AI bouwen met Ollama](/nieuws/ollama-multi-agent-lokaal-bouwen). Liever eerst het kale mechanisme onder de knie krijgen? [Je eerste AI-agent bouwen in Python](/nieuws/eerste-ai-agent-bouwen-python) doet het zonder frameworks, in zo'n zestig regels code. Begin klein. Een werkende loop over één afgebakende taak leert je meer dan een ambitieuze opzet die je niet kunt overzien.

## Checklist: ben je klaar?

- [ ] `CLAUDE.md` bevat één concreet doel plus een meetbare "klaar"-check
- [ ] Een maximum aantal pogingen is afgesproken zodat de loop niet oneindig draait
- [ ] Een `PostToolUse`-hook draait je tests of linter na elke wijziging
- [ ] De testoutput komt zichtbaar terug in de terminal
- [ ] Een aparte subagent verifieert het eindresultaat
- [ ] Je hebt de eerste loop op één kleine taak getest voor je opschaalt
- [ ] Je houdt je tokenverbruik in de gaten

Wil je die loop niet zelf draaien maar laten hosten, dan neemt een beheerde runtime het over: zie [Je eerste AI-agent bouwen met Microsoft Foundry](/nieuws/microsoft-foundry-eerste-ai-agent-bouwen).

## Bronnen

- [Claude Code — Automate actions with hooks](https://code.claude.com/docs/en/hooks-guide) — officiële documentatie over hooks, PostToolUse en subagent-verificatie
- [Addy Osmani — Loop Engineering](https://addyosmani.com/blog/loop-engineering/) — het essay dat het begrip loop engineering breed op de kaart zette
- [Mitchell Hashimoto — My AI Adoption Journey](https://mitchellh.com/writing/my-ai-adoption-journey) — de oorsprong van "harness engineering", de laag onder de loop
