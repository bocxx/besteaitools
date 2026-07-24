---
title: "Claude Cowork op Windows en Linux draaien: waar het werkt en wat je nodig hebt"
heroImageAlt: "Miniatuur diorama-illustratie bij artikel 'Claude Cowork op Windows en Linux draaien: waar het werkt en wat je nodig hebt'"
description: "Draait Claude Cowork op jouw machine? Zo zit het met Windows, macOS en Linux (beta) — plus de virtualisatie-eisen die de meeste mensen verrassen."
publishedAt: 2026-07-24
updatedAt: 2026-07-24
author: "Redactie"
category: "gids"
tags:
  - "claude-cowork"
  - "claude-desktop"
  - "windows"
  - "linux"
  - "anthropic"
toolSlug: "claude-cowork"
featured: false
draft: false
readingTime: 5
heroImage: "/images/articles/diorama-claude-cowork-windows-linux-draaien.webp"
heroScene: "A miniature paper-craft diorama of a tiny desktop computer running an AI assistant, with a small Linux penguin and a Windows-style app window beside it on a wooden desk, muted tones, soft studio light"
keyTakeaways:
  - "Claude Cowork draait via de Claude Desktop-app op macOS, Windows en Linux (beta) — niet op de gratis tier, wel op Pro, Max, Team en Enterprise."
  - "Cowork draait je taken in een geïsoleerde virtuele machine op je eigen computer, dus je hebt hardware-virtualisatie nodig (Hyper-V op Windows, KVM op Linux)."
  - "Op Linux voeg je jezelf toe aan de KVM-groep en installeer je QEMU; reken op circa 25 GB vrije schijfruimte en minimaal 8 GB RAM."
  - "De officiële systeemeisen zijn Windows 10+, macOS 11+ en Ubuntu 22.04 LTS+/Debian 12+ op x64 of arm64."
faq:
  - q: "Op welke besturingssystemen werkt Claude Cowork?"
    a: "Cowork draait binnen de Claude Desktop-app, en die is beschikbaar op macOS, Windows en Linux (beta). Cowork zelf zit op de betaalde plannen: Pro, Max, Team en Enterprise. Op de gratis tier vind je alleen de gewone chat, geen Cowork. Sinds juli 2026 kun je Cowork-taken ook via het web en de mobiele apps opvolgen, maar het zware werk draait in de desktop-app op je eigen machine."
  - q: "Waarom werkt Cowork niet op Windows Home zonder extra stappen?"
    a: "Cowork voert je taken uit in een virtuele machine op je computer, en die leunt op de virtualisatie-laag van je systeem. Op Windows is dat Hyper-V, dat standaard meekomt met Pro, Enterprise en Education, maar niet met de Home-editie. Zit je op Home, dan is virtualisatie de eerste plek om te controleren als Cowork niet wil starten. Raadpleeg de officiële 'Get started with Cowork'-pagina voor de exacte Windows-eisen van jouw versie."
  - q: "Wat heb ik nodig om Cowork op Linux te draaien?"
    a: "Drie dingen. Ten eerste hardware-virtualisatie (KVM) — meestal aan, soms uitgeschakeld in je BIOS/UEFI. Ten tweede permissie: voeg jezelf toe aan de KVM-groep met `sudo usermod -aG kvm $USER` en log daarna opnieuw in. Ten derde QEMU en bijbehorende pakketten; installeer je Claude via apt, dan komen die automatisch mee. Reken op ongeveer 25 GB vrije schijfruimte en minstens 8 GB RAM."
  - q: "Is mijn data veilig als Cowork op mijn computer draait?"
    a: "Cowork draait code in een geïsoleerde virtuele machine op je eigen computer. Het lezen en schrijven van bestanden blijft beperkt tot de mappen die je zelf koppelt, en netwerktoegang volgt je egress-instellingen. Je geeft dus per taak aan waar Cowork bij mag — het krijgt geen vrije toegang tot je hele schijf."
---

# Claude Cowork op Windows en Linux draaien: waar het werkt en wat je nodig hebt

Je nam een Pro- of Max-abonnement op basis van een Cowork-demo: een desktop-assistent die rustig een map spreadsheets doorwerkt terwijl jij iets anders doet. Dan open je de app op je Windows-laptop of je Ubuntu-machine en zoek je de knop. Dit artikel beantwoordt de vraag eronder: waar draait Cowork precies, en wat doe je als jouw machine niet meteen meewerkt?

> **💡 Beginner-tip:** Cowork is geen losse download. Het zit ín de Claude Desktop-app. Je installeert dus eerst Claude Desktop, logt in met een betaald account, en vindt Cowork daarbinnen.

## Waar Cowork draait

Claude Cowork werkt via de Claude Desktop-app, en die is er voor macOS, Windows en Linux (beta) ([Bron: Anthropic Support](https://support.claude.com/en/articles/10065433-install-claude-desktop)). Cowork zelf zit op de betaalde plannen — Pro, Max, Team en Enterprise. Op de gratis tier krijg je alleen de chat.

De reden dat je systeem ertoe doet: Cowork voert taken uit in een geïsoleerde virtuele machine op je eigen computer. Dat is precies waarom het bij je lokale bestanden kan, maar het betekent ook dat je machine virtualisatie moet ondersteunen. Zonder die laag start Cowork niet.

## De officiële systeemeisen

Voor de Claude Desktop-app gelden deze minimale versies:

| Besturingssysteem | Eis |
|---|---|
| macOS | macOS 11 (Big Sur) of hoger |
| Windows | Windows 10 of hoger |
| Linux | Ubuntu 22.04 LTS+ of Debian 12 (bookworm)+, op x64 of arm64 |

Op Windows leunt de virtuele machine op Hyper-V. Dat komt mee met de Pro-, Enterprise- en Education-editie, maar niet met Windows Home. Zit je op Home en wil Cowork niet starten, dan is virtualisatie het eerste dat je controleert.

## Cowork op Linux: de drie stappen

Linux vraagt iets meer handwerk. Installeer Claude Desktop bij voorkeur via de apt-repository, zodat updates gewoon met je systeem meekomen:

1. **Voeg de repo toe en installeer.** Open een terminal en draai de drie apt-commando's van de [officiële installatiepagina](https://support.claude.com/en/articles/10065433-install-claude-desktop). Deze `apt install` trekt QEMU en de virtualisatie-pakketten automatisch mee — dat scheelt je losse installaties.
2. **Zet virtualisatie aan en geef jezelf toegang.** Cowork heeft KVM nodig. Voeg jezelf toe aan de KVM-groep met `sudo usermod -aG kvm $USER`, en log daarna één keer uit en weer in. Zegt Cowork dat virtualisatie niet beschikbaar is? Dan staat KVM uit in je BIOS of UEFI — aanzetten en herstarten.
3. **Zorg voor ruimte.** De werk-image vraagt ongeveer 25 GB vrije schijfruimte en minstens 8 GB RAM. Tijdens een taak gebruikt de werkomgeving zelf zo'n 4 GB.

> **⚡ Gevorderden:** Installeerde je de `.deb` los in plaats van via apt? Dan mis je de automatische pakketten. Op x64 haal je ze binnen met `sudo apt install qemu-system-x86 ovmf virtiofsd`. Let ook op de Linux-beperkingen: computer use en dictaat zijn er (nog) niet, en de globale sneltoets werkt op X11 out-of-the-box maar leunt op Wayland op de GlobalShortcuts-portal van je desktop.

## Werkt het niet? Waar je begint

Negen van de tien keer zit het in de virtualisatie-laag, niet in Cowork zelf. Op Windows Home: geen Hyper-V. Op Linux: KVM uit in de firmware, of je bent nog niet opnieuw ingelogd na de `usermod`-stap. En op elk systeem: te weinig vrije schijfruimte voor de werk-image. Loop die drie langs voor je aan iets ingewikkelders denkt.

Wil je eerst weten wat je überhaupt met zo'n desktop-agent kunt, lees dan het bredere [AI-nieuws over agent-tools](https://hetlaatsteainieuws.nl/nieuws) op hetlaatsteainieuws.nl.

## Checklist: ben je klaar voor Cowork?

- [ ] Betaald Claude-plan actief (Pro, Max, Team of Enterprise)
- [ ] Claude Desktop geïnstalleerd op een ondersteund OS (macOS 11+ / Windows 10+ / Ubuntu 22.04+ of Debian 12+)
- [ ] Windows: Hyper-V beschikbaar (Pro/Enterprise/Education, niet Home)
- [ ] Linux: bij de KVM-groep gevoegd én opnieuw ingelogd
- [ ] Minstens 8 GB RAM en circa 25 GB vrije schijfruimte
- [ ] Cowork zichtbaar en startklaar in de Claude Desktop-app

## Bronnen

- [Anthropic Support — Install Claude Desktop](https://support.claude.com/en/articles/10065433-install-claude-desktop) — officiële beschikbaarheid, systeemeisen en de Linux-setup voor Cowork
- [Anthropic Support — Get started with Cowork](https://support.claude.com/en/articles/13345190-get-started-with-cowork) — wat Cowork doet en de exacte plan-vereisten
- [Anthropic Support — Use Claude Cowork on web, desktop, and mobile](https://support.claude.com/en/articles/15520349-use-claude-cowork-on-web-desktop-and-mobile) — hoe web en mobiel zich verhouden tot de desktop-app
