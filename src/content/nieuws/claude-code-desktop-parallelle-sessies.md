---
heroImage: "/images/articles/diorama-claude-code-desktop-parallelle-sessies.webp"
title: "Claude Code desktop: zo werk je met meerdere parallelle agents tegelijk"
description: "Anthropic gaf de Claude Code desktop-app een nieuwe sidebar voor meerdere sessies naast elkaar. Zo zet je drie taken parallel op zonder dat ze elkaar in de weg zitten."
publishedAt: 2026-06-19
updatedAt: 2026-06-19
author: "Redactie"
category: "gids"
tags:
  - "claude-code"
  - "anthropic"
  - "parallelle-agents"
  - "desktop-app"
  - "agentic-coding"
  - "git-worktrees"
  - "productiviteit"
toolSlug: "claude-code"
featured: false
draft: false
readingTime: 5
heroImageAlt: "Miniatuur diorama-illustratie bij artikel 'Claude Code desktop: zo werk je met meerdere parallelle agents tegelijk'"
heroScene: "A miniature control room desk with three small glowing screens side by side, a tiny robot orchestrator moving between them, each screen showing a different code task."
keyTakeaways:
  - "De Claude Code desktop-app kreeg op 14 april 2026 een nieuwe sidebar waarmee je meerdere live sessies tegelijk draait — elk een eigen agent op een eigen taak."
  - "Elke sessie in een git-repo krijgt een eigen worktree, dus de agents zitten elkaar niet in de weg tot jij wijzigingen vastlegt."
  - "Terminal, editor, snellere diff-viewer en een preview-paneel zitten nu in de app zelf, in een drag-and-drop lay-out die je zelf indeelt."
  - "Beschikbaar voor Pro, Max, Team en Enterprise; je downloadt of update de app en herstart hem."
faq:
  - q: "Wat is er nieuw in de Claude Code desktop-app?"
    a: "Anthropic bracht op 14 april 2026 een herontwerp uit dat draait om parallel werken. De grootste verandering is een sidebar die al je actieve en recente sessies op één plek toont, zodat je meerdere agents tegelijk kunt laten werken en ertussen kunt schakelen zonder de draad kwijt te raken. Daarnaast verhuisden een geïntegreerde terminal, een ingebouwde bestandseditor, een snellere diff-viewer en een uitgebreid preview-paneel naar de app zelf, allemaal in een drag-and-drop lay-out."
  - q: "Zitten parallelle sessies elkaar niet in de weg?"
    a: "Nee. Elke sessie in een git-repository krijgt zijn eigen geïsoleerde kopie van het project via een git-worktree. Wijzigingen in de ene sessie raken de andere niet tot je ze committet. Daardoor kun je in repo A een refactor draaien terwijl in repo B een bugfix loopt, zonder dat de twee elkaars bestanden overschrijven."
  - q: "Voor wie is de nieuwe desktop-app beschikbaar?"
    a: "De herontworpen app is er voor alle Claude Code-gebruikers op de Pro-, Max-, Team- en Enterprise-plannen, en via de Claude API. Heb je de app al, dan update en herstart je hem; anders download je hem via claude.com/download."
  - q: "Wat is een side chat in Claude Code?"
    a: "Een side chat (sneltoets Cmd+; of Ctrl+;) is een aftakking van je gesprek waarin je iets kunt vragen zonder de hoofdtaak te verstoren. De side chat haalt context uit de hoofddraad, maar voegt zelf niets terug toe — zo voorkom je dat een tussenvraag je agent op een verkeerd spoor zet."
  - q: "Kan ik mijn plugins ook in de desktop-app gebruiken?"
    a: "Ja. De desktop-app heeft nu pariteit met de CLI-plugins. Plugins die je organisatie centraal beheert of die je zelf lokaal hebt geïnstalleerd, werken in de desktop-app precies zoals in je terminal."
---

Het ritme van werken met een coding-agent is het afgelopen jaar veranderd. Je typt allang niet meer één prompt en wacht netjes af. Je start een refactor in de ene repo, een bugfix in de andere, en een ronde tests in een derde — en je springt ertussen zodra er resultaten binnenkomen. De [Claude Code](https://debesteaitools.nl/tools/claude-code/) desktop-app van Anthropic kreeg op 14 april 2026 een herontwerp dat precies daarop is gebouwd: meerdere dingen tegelijk in de lucht, met jou in de regisseursstoel ([Bron: Anthropic — Redesigning Claude Code on desktop](https://claude.com/blog/claude-code-desktop-redesign)).

> **💡 Beginner-tip:** Nog niet bekend met Claude Code zelf? Begin dan met onze gids [Claude Code skills: wat ze zijn en hoe je je eerste instelt](/nieuws/claude-code-skills-instellen) — daarna heeft deze parallelle-werkwijze meteen meer context. Je hoeft geen ervaren developer te zijn om de sidebar te begrijpen; het is in de kern een takenlijst van agents die voor je werken.

## Wat er veranderde

De zichtbaarste vernieuwing is de **sidebar**. Die zet elke actieve en recente sessie op één plek, zodat je werk over meerdere repo's kunt starten en ertussen kunt bewegen terwijl de resultaten binnendruppelen ([Bron: Anthropic](https://claude.com/blog/claude-code-desktop-redesign)). Je filtert op status, project of omgeving, of groepeert de lijst per project om sessies sneller terug te vinden. Sluit of merge je de pull request van een sessie, dan archiveert die zichzelf — de sidebar blijft zo gefocust op wat nog leeft.

Verder zijn een aantal tools de app in getrokken die je anders in je editor zou openen: een geïntegreerde terminal om tests of builds naast je sessie te draaien, een ingebouwde bestandseditor voor snelle correcties, een opnieuw gebouwde diff-viewer die ook bij grote changesets vlot blijft, en een preview-paneel dat HTML en PDF's opent én lokale dev-servers draait. Elk paneel is sleepbaar, dus je legt terminal, preview, diff en chat neer in het raster dat bij jouw manier van werken past.

## In drie stappen parallel werken

1. **Start je eerste sessie en laat hem lopen.** Open de app, kies een repo en geef je opdracht — bijvoorbeeld een refactor van een module. Zodra de agent draait, hoef je niet te wachten. De sessie verschijnt links in de sidebar met de status "actief".

2. **Start een tweede sessie in een andere repo.** Spawn een nieuwe sessie (de volledige lijst sneltoetsen open je met `Cmd + /` of `Ctrl + /`) en zet die aan het werk aan een losstaande taak, zoals een bugfix. Belangrijk: elke sessie in een git-repo krijgt zijn eigen **worktree**, een geïsoleerde kopie van het project. Wijzigingen in de ene sessie raken de andere pas als jij ze committet ([Bron: Anthropic](https://claude.com/blog/claude-code-desktop-redesign)).

   > **⚡ Gevorderden:** worktrees zijn een ingebouwde git-functie waarmee meerdere branches tegelijk op aparte mappen uitgecheckt staan. Claude Code zet ze automatisch op per sessie, dus je hoeft `git worktree add` niet zelf te draaien — maar het verklaart wél waarom je drie agents tegelijk kunt laten schrijven zonder merge-chaos.

3. **Schakel, stuur bij, en review.** Klik in de sidebar tussen sessies om te zien waar elke agent staat. Drift een sessie af, dan corrigeer je hem ter plekke. Moet je iets vragen zonder de hoofdtaak te verstoren? Open een side chat met `Cmd + ;` (of `Ctrl + ;`): die haalt context uit de hoofddraad, maar voegt niets terug toe, zodat je agent niet op een zijspoor belandt. Voor je iets verstuurt, bekijk je de wijzigingen in de diff-viewer.

## Drie weergavemodi en wat ze opleveren

De app heeft drie weergavemodi: **Verbose**, **Normal** en **Summary**. Daarmee stel je in hoeveel je van Claude's tool-calls wilt zien — van volledige transparantie tot alleen de uitkomst. Voor een sessie die je nauw volgt is Verbose handig; voor de drie die op de achtergrond doorlopen, houdt Summary je overzicht schoon. Een nieuwe gebruiks-knop laat bovendien in één oogopslag je contextvenster én je sessieverbruik zien — nuttig als je tegen limieten aanloopt bij veel parallelle taken.

## Voor wie en hoe je begint

Het herontwerp is beschikbaar voor alle Claude Code-gebruikers op Pro, Max, Team en Enterprise, en via de Claude API ([Bron: Anthropic](https://claude.com/blog/claude-code-desktop-redesign)). Download de app via [claude.com/download](https://claude.com/download), of update en herstart als je hem al hebt. Je bestaande plugins werken meteen mee: de desktop-app heeft nu pariteit met de CLI, dus centraal beheerde of lokaal geïnstalleerde plugins draaien hier net als in je terminal. SSH-ondersteuning is uitgebreid naar Mac naast Linux, zodat je sessies ook op een externe machine kunt richten.

Wil je dieper in het bredere Claude Code-platform? Lees dan onze gids over [dynamische workflows in Claude Code](/nieuws/claude-code-dynamic-workflows-gebruiken) voor de grotere klussen. Draai je veel sessies naast elkaar, dan helpt [de Caveman-skill je tot 65% tokens te besparen](/nieuws/caveman-claude-code-tokens-besparen) — handig als je tegen je contextlimiet aanloopt. En voor context over waarom Anthropic zo zwaar investeert in het beschermen van de software-engineering en agentic reasoning capaciteiten die Claude Code onderscheiden: [Claude en de Alibaba-distillatieaanval](/nieuws/anthropic-alibaba-claude-distillatie-aanval) legt de achtergrond van die strijd uit. En voor een rustig overzicht van wat agents in 2026 eigenlijk zijn, geeft de achtergrond [AI-agents in 2026](https://hetlaatsteainieuws.nl/ai-deep-dives/ai-agents-2026-wat-zijn-ze) op hetlaatsteainieuws.nl de context. Wil je een agentic sessie meteen ergens tastbaars aan wagen, probeer dan [de geanimeerde-website-workflow met Claude Code en Higgsfield](/nieuws/claude-code-higgsfield-geanimeerde-website).

## Checklist: klaar om parallel te werken?

- [ ] Desktop-app gedownload of geüpdatet en opnieuw gestart
- [ ] Eerste sessie gestart in repo A en aan het werk
- [ ] Tweede sessie gestart in repo B (eigen worktree, dus geen conflict)
- [ ] Sidebar gegroepeerd per project voor overzicht
- [ ] Weergavemodus afgestemd: Verbose voor de actieve, Summary voor de achtergrond
- [ ] Side chat geprobeerd (`Cmd + ;`) voor een tussenvraag
- [ ] Wijzigingen bekeken in de diff-viewer vóór je commit
