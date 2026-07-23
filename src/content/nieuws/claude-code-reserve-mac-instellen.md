---
title: "Claude Code een reserve-Mac laten besturen: zo zet je het op"
description: "Een oude Mac als veilige, altijd-aan machine voor Claude Code — bedienbaar vanaf je telefoon of via SSH. De opzet uit de veelbesproken gids, in vijf stappen."
publishedAt: 2026-07-23
updatedAt: 2026-07-23
author: "Redactie"
category: "gids"
tags:
  - "claude-code"
  - "claude"
  - "computer-use"
  - "mac"
  - "agents"
  - "remote-control"
toolSlug: "claude-code"
featured: false
draft: false
readingTime: 4
heroImage: "/images/articles/diorama-claude-code-reserve-mac-instellen.webp"
heroImageAlt: "Miniatuur diorama-illustratie bij artikel 'Claude Code een reserve-Mac laten besturen: zo zet je het op'"
heroScene: "A small robot at a tiny desk reaches toward a second miniature laptop across the table, a glowing phone propped beside it"
keyTakeaways:
  - "Een reserve-Mac met een vers, Apple ID-loos account geeft Claude Code volledige controle zonder risico voor je hoofdmachine."
  - "De opzet komt uit een 16-stappengids van ontwikkelaar ykdojo die op Hacker News honderden upvotes haalde (juli 2026)."
  - "Computer use over SSH vereist een tmux-omweg: macOS koppelt scherm- en invoerrechten aan de GUI-sessie, niet aan SSH."
  - "Via Remote Control in de Claude-app bedien je de sessies vanaf je telefoon; Tailscale maakt dat ook buitenshuis mogelijk."
  - "Computer use in Claude Code vereist volgens de gids een Claude Pro- of Max-abonnement."
faq:
  - q: "Waarom zou je Claude Code op een aparte Mac draaien?"
    a: "Claude Code met ruime permissies (zoals de vlag --dangerously-skip-permissions) brengt risico's mee op je hoofdmachine: de agent kan bestanden wijzigen en netwerkverkeer loopt via jouw computer. Een reserve-Mac met een vers account zonder Apple ID en zonder persoonlijke data heeft niets te verliezen. De agent krijgt daar volledige vrijheid, terwijl jouw eigen bestanden, wachtwoorden en accounts buiten bereik blijven."
  - q: "Wat heb je nodig om Claude Code een Mac te laten besturen?"
    a: "Een reserve-Mac (de doelmachine), je gewone Mac op hetzelfde wifi-netwerk, en volgens de gids een Claude Pro- of Max-abonnement voor computer use. Op de doelmachine maak je een vers admin-account aan, zet je SSH aan en installeer je Claude Code via het officiële installatiescript van claude.ai. Voor scherm- en muisbesturing is daarnaast tmux nodig plus eenmalige rechten (Schermopname en Toegankelijkheid) die je handmatig in Systeeminstellingen toekent."
  - q: "Kun je Claude Code vanaf je telefoon bedienen?"
    a: "Ja. Claude Code heeft een Remote Control-functie: met het commando claude remote-control start je een server op de machine, waarna je vanuit de Claude-app op je telefoon nieuwe sessies kunt starten of bestaande kunt overnemen. Binnen een lopende sessie werkt ook /remote-control (kort: /rc). Buiten je eigen netwerk werkt dit via Anthropic; voor SSH en schermdeling van afstand gebruikt de gids Tailscale."
  - q: "Is een virtuele machine of container niet veiliger dan een aparte Mac?"
    a: "Een container is een goed alternatief en de gids-auteur bouwde er zelf een omgeving voor. Maar een container draait nog steeds op je hoofdmachine (netwerkverkeer loopt via jou) en kan geen Mac-only apps draaien of aansturen via computer use. Een fysieke reserve-Mac geeft volledige app-toegang én volledige scheiding. Kies wat bij je risico-inschatting past."
---

Een oude MacBook in de kast en zin om Claude Code écht los te laten? Ontwikkelaar ykdojo publiceerde een 16-stappengids die een reserve-Mac ombouwt tot altijd-aan machine die Claude Code volledig bestuurt — inclusief muis, toetsenbord en schermopnames. De gids stond op 18 juli hoog op Hacker News. Dit is de kern, in vijf stappen.

## Stap 1: begin met een lege, geïsoleerde Mac

Het veiligheidsmodel van de hele opzet is simpel: geef de agent een machine die niets te verliezen heeft. Wis de reserve-Mac (Systeeminstellingen → Algemeen → Zet alle inhoud en instellingen terug) en maak een nieuw lokaal account aan — bewust **zonder Apple ID**. Zo kan Claude Code nergens bij wat van jou is, ook niet als het met de ruimste permissies draait. Het account heeft wel admin-rechten nodig, anders weigert `sudo` straks dienst ([Bron: claude-controls-mac-gids](https://ykdojo.github.io/claude-controls-mac/)).

> **💡 Beginner-tip:** dit klinkt drastischer dan het is. Je offert geen Mac op — je geeft er een tweede leven als AI-werkpaard. Alles blijft omkeerbaar: opnieuw wissen en de machine is weer gewoon van jou.

## Stap 2: SSH en wachtwoordloze toegang

Zet op de doelmachine Remote Login aan (`sudo systemsetup -setremotelogin on`) en stel wachtwoordloze `sudo` in via een regel in `/etc/sudoers.d/`. Vanaf je hoofdmachine kopieer je je SSH-sleutel met `ssh-copy-id`, zodat je zonder wachtwoord kunt inloggen. De gids raadt aan de machine via de hostname (`<naam>.local`) te benaderen in plaats van het IP-adres, dat na een herstart kan wijzigen. Zet ten slotte de slaapstand uit met `pmset`, anders valt je altijd-aan machine na tien minuten van het netwerk.

## Stap 3: installeer Claude Code en log in

Claude Code installeer je op afstand met het officiële script: `curl -fsSL https://claude.ai/install.sh | bash`. Log daarna via SSH in en start `claude` — de login loopt via een browser-flow die je op je hoofdmachine kunt afronden. De gids adviseert ook de GitHub CLI, met een apart GitHub-account voor de agent, zodat experimenten je eigen repo-historie niet vervuilen.

## Stap 4: computer use via de tmux-omweg

Hier zit de slimste vondst van de gids. Computer use — Claude die zijn eigen scherm ziet en muis en toetsenbord bestuurt — werkt niet zomaar over SSH: macOS koppelt Schermopname- en Toegankelijkheidsrechten aan de grafische login-sessie, en een SSH-proces komt daar niet bij. De oplossing is een LaunchAgent die een tmux-server *binnen* de GUI-sessie draaiend houdt; elke Claude-sessie die daar landt, erft die rechten. De rechten ken je toe aan het tmux-programma (niet aan Claude) en dat kan alleen handmatig, aan de machine zelf — macOS blokkeert synthetische klikken op die schermen. Computer use vereist volgens de gids een Claude Pro- of Max-abonnement ([Bron: claude-controls-mac-gids](https://ykdojo.github.io/claude-controls-mac/)).

> **⚡ Gevorderden:** de meegeleverde `ic`-wrapper start elke sessie met `--dangerously-skip-permissions`. Op deze wegwerp-machine is dat het punt van de hele opzet, maar neem die vlag niet mee naar je hoofdmachine.

## Stap 5: bedien het vanaf je telefoon (of vanaf de bank)

Met `claude remote-control` start je een server waarmee je vanuit de Claude-app op je telefoon sessies start en overneemt; binnen een lopende sessie werkt `/rc`. Wil je er ook buitenshuis bij, dan legt Tailscale versleutelde WireGuard-tunnels tussen je apparaten, zonder iets open te zetten naar het publieke internet. Optioneel vult de [Claude in Chrome-extensie](https://chromewebstore.google.com/detail/claude/fcoeoabgfenejglbffodgkkbkcdhcgfn) het gat dat computer use bewust laat liggen: echte browserbesturing, met je ingelogde Chrome-profiel.

Wie Claude Code nog moet leren kennen, begint beter bij onze [complete installatiegids](/nieuws/claude-instellen-1-dag-6-tools) of bij [Claude Code-skills instellen](/nieuws/claude-code-skills-instellen). En draai je straks meerdere sessies naast elkaar op die reserve-Mac, dan is [parallelle sessies in Claude Code desktop](/nieuws/claude-code-desktop-parallelle-sessies) de logische volgende stap. Wat er in de bredere Claude Code-desktopupdate zit, lees je bij [hetlaatsteainieuws.nl](https://hetlaatsteainieuws.nl/nieuws/claude-code-desktop-grote-update).

## Checklist: ben je klaar?

- [ ] Reserve-Mac gewist en vers lokaal account zonder Apple ID aangemaakt
- [ ] Account heeft admin-rechten; wachtwoordloze `sudo` ingesteld en gevalideerd
- [ ] SSH aan en sleutel gekopieerd — inloggen lukt zonder wachtwoord
- [ ] Slaapstand uit via `pmset`, machine blijft bereikbaar op het netwerk
- [ ] Claude Code geïnstalleerd en ingelogd op je Anthropic-account
- [ ] tmux-LaunchAgent draait; Schermopname en Toegankelijkheid handmatig toegekend aan tmux
- [ ] tmux-server herstart na het toekennen van de rechten (anders pakt de grant niet)
- [ ] Remote Control getest vanaf je telefoon
- [ ] Optioneel: Tailscale op beide machines voor toegang van buitenaf

## Bronnen

- [claude-controls-mac — de volledige 16-stappengids](https://ykdojo.github.io/claude-controls-mac/) — ykdojo
- [GitHub-repo van de gids](https://github.com/ykdojo/claude-controls-mac) — ykdojo
- [Hacker News-discussie](https://news.ycombinator.com/item?id=48959392) — context en kanttekeningen uit de community
