---
title: "Claude Managed Agents instellen: zo bouw je een agent die werkt terwijl jij slaapt"
description: "Anthropic's Managed Agents (public beta) regelt de agent-infrastructuur voor je. Jij definieert taak, tools en grenzen — zo zet je je eerste monitoring-agent op."
publishedAt: 2026-07-02
updatedAt: 2026-07-02
author: "Redactie"
category: "gids"
tags:
  - "claude"
  - "anthropic"
  - "managed-agents"
  - "ai-agents"
  - "automatisering"
  - "productiviteit"
toolSlug: "claude"
featured: false
draft: false
readingTime: 4
heroImage: "/images/articles/diorama-claude-managed-agents-bouwen.webp"
heroImageAlt: "Miniatuur diorama-illustratie bij artikel 'Claude Managed Agents instellen: zo bouw je een agent die werkt terwijl jij slaapt'"
heroScene: "A tiny chrome robot working at a miniature conveyor belt of paper reports under a desk lamp, beside a small wooden bed with a nightcap draped over the bedpost"
keyTakeaways:
  - "Claude Managed Agents (public beta sinds 8 april 2026) regelt sandboxing, sessies, tool-executie en tracing — jij levert de taakomschrijving, tools en grenzen."
  - "Een agent werkt in een agentic loop: context verzamelen, actie uitvoeren, resultaat controleren — net zo lang tot de taak klaar is."
  - "Kosten zijn verbruik-gebaseerd: standaard Claude-tokenprijzen plus $0,08 per sessie-uur actieve runtime (en $10 per 1.000 web-zoekopdrachten)."
  - "Managed Agents is een developer-product op het Claude Platform; wil je zonder code automatiseren, dan zijn de scheduled tasks in Claude Cowork het startpunt."
faq:
  - q: "Wat is het verschil tussen een Claude-chat en een Claude-agent?"
    a: "In een chat geef je een opdracht en wacht je op het antwoord. Een agent voert taken autonoom uit: hij zoekt informatie, gebruikt tools, controleert zijn eigen output en gaat door tot de taak klaar is — ook als jij niet achter je scherm zit. Managed Agents laat zulke sessies uren draaien, met voortgang die bewaard blijft, ook als je verbinding wegvalt."
  - q: "Heb ik programmeerkennis nodig voor Claude Managed Agents?"
    a: "Ja, enige wel: Managed Agents is een API-suite op het Claude Platform, gericht op developers. Met een paar regels code definieer je een agent; de quickstart in de docs helpt je op weg. Wil je terugkerende taken automatiseren zónder code, kijk dan naar de scheduled tasks in Claude Cowork — die draaien op je eigen computer en vragen alleen een prompt."
  - q: "Wat kost een Claude Managed Agent?"
    a: "Je betaalt op verbruik: de standaard Claude-tokenprijzen, plus $0,08 per sessie-uur actieve runtime. Web-zoekopdrachten van de agent kosten $10 per 1.000 zoekacties. Langdurige agents die veel data verwerken kunnen dus flink duurder uitvallen dan een normaal gesprek — begin met een korte testrun en bekijk het verbruik voordat je een agent dagelijks laat draaien."
  - q: "Kan een Managed Agent andere agents aansturen?"
    a: "Ja, maar die multi-agent-coördinatie zit nog in research preview: je moet er apart toegang voor aanvragen. Daarmee kan een hoofdagent subagents opstarten en aansturen om complex werk te parallelliseren."
---

Jess Yan, productlead bij Anthropic, vatte het onlangs zo samen: we gaan van prompts naar agents die 's nachts werken terwijl jij slaapt. In een demo bouwde ze een analytics-agent die dagelijks klantenreviews verzamelt, groepeert op thema en een samenvatting naar een Slack-kanaal stuurt ([Bron: Creator Economy](https://creatoreconomy.so/p/inside-anthropics-bet-on-claude-agents-jess-yan)). Geen servers opzetten, geen orchestratie-code — alleen een taakomschrijving, tools en grenzen.

Dat is wat **Claude Managed Agents** mogelijk maakt. Het zit sinds 8 april 2026 in public beta op het Claude Platform ([Bron: Anthropic](https://claude.com/blog/claude-managed-agents)).

## Wat een agent anders maakt dan een chat

Een gewone Claude-chat werkt in één richting: jij stelt een vraag, Claude antwoordt. Een agent werkt in een **agentic loop**: context verzamelen (documenten, API-data, eerdere outputs), een actie uitvoeren via een tool, het resultaat controleren — en herhalen tot de taak klaar is.

Het verschil in de praktijk: een agent handelt een taak van drie uur af terwijl jij iets anders doet. Denk aan het dagelijks bijhouden van concurrentiewijzigingen, het samenvatten van klantenreviews of het controleren van productprijzen over meerdere sites. Wat een agent precies is en waar de grens met een chatbot ligt, legt [AI-agents in 2026: wat zijn ze en wat kun je er echt mee](https://hetlaatsteainieuws.nl/achtergrond/ai-agents-2026-wat-zijn-ze) rustig uit.

## Managed Agents: infrastructuur van Anthropic, logica van jou

Voor een productieklare agent moest je tot nu toe zelf een server opzetten, een agent-loop schrijven en omgaan met timeouts en state. Managed Agents neemt precies dat over: veilige sandboxing, langdurige sessies, tool-executie, scoped permissies en tracing draaien op Anthropic's infrastructuur ([Bron: Claude Platform Docs](https://platform.claude.com/docs/en/managed-agents/overview)). Jij definieert drie dingen:

- **De taak** — wat de agent doet, hoe vaak, onder welke omstandigheden
- **De tools** — welke bronnen of acties hij mag gebruiken (bestanden, web, code uitvoeren, API's)
- **De grenzen** — wat hij autonoom mag en wanneer hij jou moet vragen

## Je eerste agent in vijf stappen

**Wat je nodig hebt:** een Claude Platform-account met API-toegang. De [quickstart in de docs](https://platform.claude.com/docs/en/managed-agents/quickstart) is het startpunt.

**Stap 1 — Definieer de taak.** Beschrijf in de agent-definitie wat er moet gebeuren, in gewone taal: *"Verzamel elke ochtend alle nieuwe klantreviews van [platform], groepeer op positief/negatief/neutraal en schrijf een samenvatting van maximaal 200 woorden."*

**Stap 2 — Ken tools toe.** Geef de agent alleen de tools die hij nodig heeft — voor dit voorbeeld web-lezen en een Slack-koppeling. Tools die je niet toekent, kan hij niet gebruiken: een bewuste veiligheidsmaatregel.

**Stap 3 — Stel grenzen in.** Begin streng: samenvatting versturen mag, berichten verwijderen of accounts aanpassen niet. Verruimen kan later, als je het gedrag kent.

**Stap 4 — Testrun met tracing.** Start een handmatige run en volg in de tracing welke stappen de agent zet. Gaat hij de verkeerde kant op, scherp dan de taakomschrijving aan.

**Stap 5 — Automatiseer en bewaak de kosten.** Zet de agent op een schema of trigger. Let op het prijsmodel: standaard tokenprijzen plus $0,08 per sessie-uur actieve runtime, en $10 per 1.000 web-zoekopdrachten ([Bron: The New Stack](https://thenewstack.io/with-claude-managed-agents-anthropic-wants-to-run-your-ai-agents-for-you/)).

> **⚡ Gevorderden:** multi-agent-coördinatie — een hoofdagent die subagents opstart en aanstuurt — zit in research preview; toegang vraag je apart aan. Wie dat patroon nu al lokaal wil verkennen, kan terecht bij onze gids over [dynamic workflows in Claude Code](/nieuws/claude-code-dynamic-workflows-gebruiken), die een laag dieper ingaat op orchestratie van subagents.

## Wanneer een agent wél en niet zinvol is

Agents lonen bij taken die **herhaalbaar**, **voorspelbaar** en **tijdrovend** zijn: dagelijkse rapportages, monitoring, dataverzameling. Taken waarbij je tussendoor wilt meesturen of die veel creatief oordeel vragen, zijn minder geschikt voor volledig autonoom draaien.

En niet iedereen hoeft de API in: wil je gewoon een wekelijkse samenvatting of terugkerend klusje automatiseren zonder code, dan is [Claude Cowork](/nieuws/claude-cowork-lancering) met scheduled tasks de laagdrempelige route. Managed Agents is er voor wie agents in productie wil draaien — betrouwbaar, schaalbaar en zonder eigen backend.

## Checklist: ben je klaar?

- [ ] Claude Platform-account met API-toegang geregeld
- [ ] Taakomschrijving in gewone taal geformuleerd (wat, hoe vaak, wanneer)
- [ ] Alleen de noodzakelijke tools toegekend
- [ ] Grenzen ingesteld: wat mag autonoom, wat vraagt bevestiging
- [ ] Handmatige testrun gedraaid en tracing bekeken
- [ ] Kostenverbruik gecheckt vóór je het schema aanzet

## Bronnen

- [Anthropic — Claude Managed Agents: get to production 10x faster](https://claude.com/blog/claude-managed-agents)
- [Claude Platform Docs — Managed Agents overview & quickstart](https://platform.claude.com/docs/en/managed-agents/overview)
- [The New Stack — With Claude Managed Agents, Anthropic wants to run your AI agents for you](https://thenewstack.io/with-claude-managed-agents-anthropic-wants-to-run-your-ai-agents-for-you/)
- [Creator Economy — Inside Anthropic's Bet on Claude Agents (Jess Yan)](https://creatoreconomy.so/p/inside-anthropics-bet-on-claude-agents-jess-yan)
