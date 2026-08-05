---
title: AI Tools Radar – Kimi · Claude · Open (Avond 5 augustus)
description: 'AI Tools Radar 5 augustus: 114 launches, 206 feature-updates, 18 deep-dive-kandidaten op debesteaitools.nl.'
date: '2026-08-05'
timeSlot: tools-digest
featured: []
tags:
- AI Tools Radar
- AI Tools
- Kimi
- Claude
author: debesteaitools.nl Redactie
totalAnalyzed: 338
itemsSelected: 16
categoriesCount: 3
topics:
- Kimi
- Claude
launchesCount: 6
updatesCount: 6
deepDivesCount: 4
keySignals:
- Kimi K3 brengt modelgewichten uit als 2,8T MoE met native visuele mogelijkheden voor zelfhosting.
- Claude Managed Agents gaat naar public beta met multiagent-orkestratie en zelfbeheerde sandboxes.
- 'Lokale inferentie wint terrein: Gemma 4 26B draait in 2 GB RAM op M-series Macs.'
launches:
- name: Open
  summary_nl: Open is een source engine die Gemma 4 26B draait in 2 GB RAM op elke M-series Mac.
  url: https://github.com/drumih/turbo-fieldfare
  source_type: hn
  source_label: Hacker News (902 punten, 339 reacties)
  confidence: hoog
  favicon: https://www.google.com/s2/favicons?domain=github.com&sz=64
- name: I was tired of opening 2 tabs for every HN link, so I made a userscript
  summary_nl: Een userscript dat voorkomt dat je voor elke Hacker News-link twee tabbladen moet openen.
  url: https://github.com/twalichiewicz/HNewhere
  source_type: hn
  source_label: Hacker News (426 punten, 123 reacties)
  confidence: hoog
  favicon: https://www.google.com/s2/favicons?domain=github.com&sz=64
- name: CheapFoodMap
  summary_nl: CheapFoodMap toont een kaart met goede maaltijden onder de 10 dollar.
  url: https://cheapfoodmap.com/
  source_type: hn
  source_label: Hacker News (281 punten, 250 reacties)
  confidence: hoog
  favicon: https://www.google.com/s2/favicons?domain=cheapfoodmap.com&sz=64
- name: I got tired of watching Claude Code work in a plain terminal so I built it 3D c…
  summary_nl: Een 3D cozy game-simulatie die Claude Code-agents visueel weergeeft in plaats van in een terminal.
  url: https://www.reddit.com/r/ClaudeAI/comments/1va26us/i_got_tired_of_watching_claude_code_work_in_a/
  source_type: reddit
  source_label: Reddit r/ClaudeAI (333 upvotes)
  confidence: medium
  favicon: https://www.google.com/s2/favicons?domain=www.reddit.com&sz=64
- name: Maple
  summary_nl: Maple is een ternary 20B MoE-model dat op 120 tokens per seconde draait op een iPhone.
  url: https://deepgrove.ai/maple-preview
  source_type: hn
  source_label: Hacker News (158 punten, 49 reacties)
  confidence: hoog
  favicon: https://www.google.com/s2/favicons?domain=deepgrove.ai&sz=64
- name: Gander, an Android file viewer that asks for no permissions at all
  summary_nl: Gander is een Android-bestandsviewer die geen enkele toestemming vraagt.
  url: https://github.com/mokshablr/gander
  source_type: hn
  source_label: Hacker News (207 punten, 75 reacties)
  confidence: hoog
  favicon: https://www.google.com/s2/favicons?domain=github.com&sz=64
updates:
- tool_name: Kimi
  tool_slug: kimi
  feature_title: Kimi K3 weights release
  summary_nl: Kimi publiceert de gewichten en technisch rapport van K3, een 2,8T MoE-model met native visuele mogelijkheden voor zelfhosting.
  impact: hoog
  url: https://twitter.com/Kimi_Moonshot/status/2081760186235289764
  source_type: x
  source_label: X
  confidence: hoog
  platforms:
  - hackernews
  - twitter
  key: kimi::Kimi K3 weights release
- tool_name: Kimi
  tool_slug: kimi
  feature_title: Kimi K3 open weights
  summary_nl: Kimi maakt het K3-model vrij beschikbaar zodat ontwikkelaars het zelf kunnen hosten en uitbreiden.
  impact: hoog
  url: https://twitter.com/Kimi_Moonshot/status/2081760186235289764
  source_type: x
  source_label: X
  confidence: hoog
  platforms:
  - hackernews
  - twitter
  key: kimi::Kimi K3 open weights
- tool_name: Claude
  tool_slug: claude
  feature_title: Managed Agents Public Beta
  summary_nl: Claude Managed Agents is nu in public beta met beveiligde sandboxing, ingebouwde tools en API-sessies.
  impact: hoog
  url: https://twitter.com/thsottiaux/status/2082317452755751098
  source_type: x
  source_label: X
  confidence: laag
  platforms:
  - twitter
  key: claude::Managed Agents Public Beta
- tool_name: Claude
  tool_slug: claude
  feature_title: Multiagent Orchestration
  summary_nl: Claude Managed Agents kan taken nu opsplitsen en delegeren aan gespecialiseerde subagents voor parallel werken.
  impact: hoog
  url: https://twitter.com/SpaceX/status/2084737174709403899
  source_type: x
  source_label: X
  confidence: laag
  platforms:
  - twitter
  key: claude::Multiagent Orchestration
- tool_name: Claude
  tool_slug: claude
  feature_title: Self-Hosted Sandboxes
  summary_nl: Claude Managed Agents ondersteunt nu zelfbeheerde sandboxes voor meer controle over de uitvoeringsomgeving.
  impact: hoog
  url: https://twitter.com/GavinSBaker/status/2082166566280642676
  source_type: x
  source_label: X
  confidence: laag
  platforms:
  - twitter
  key: claude::Self-Hosted Sandboxes
- tool_name: Claude
  tool_slug: claude
  feature_title: Expanded Skills Limit
  summary_nl: Het limiet voor skills per sessie is verhoogd naar 500 voor complexere taak-instructies.
  impact: hoog
  url: https://twitter.com/AnthropicAI/status/2082153297670992134
  source_type: x
  source_label: X
  confidence: laag
  platforms:
  - twitter
  key: claude::Expanded Skills Limit
deepDives:
- title: Setting up your spare Mac for Claude Code to control, a step-by-step guide
  summary_nl: Een stapsgewijze handleiding om een reservemac in te richten voor Claude Code, nuttig voor teams die geïsoleerde testomgevingen willen.
  url: https://ykdojo.github.io/claude-controls-mac/
  tool: claude
  trend_phase: tracked
  score: 18.15
- title: How to stop Claude from saying load-bearing
  summary_nl: Toont hoe je Claude afleert om herhalende termen te gebruiken, relevant voor wie consistente output nodig heeft.
  url: https://jola.dev/posts/how-to-stop-claude-from-saying-load-bearing
  tool: claude
  trend_phase: tracked
  score: 17.65
- title: Confused by all the AI hype? These people make it easy to understand and they teach you how to actually build your own…
  summary_nl: Overzicht van makers die AI-concepten uitleggen en praktische bouwkennis delen, handig voor ontwikkelaars die willen leren.
  url: https://twitter.com/ai_explorer25/status/2064709079327744393
  tool: langchain
  trend_phase: tracked
  score: 17.4
- title: Claude is helping me build a news globe that pings real world events as they happen
  summary_nl: Een concreet voorbeeld van Claude als bouwpartner voor een real-time nieuwsvisualisatie, toont mogelijkheden voor creatieve projecten.
  url: https://www.reddit.com/r/ClaudeAI/comments/1ucfstl/claude_is_helping_me_build_a_news_globe_that/
  tool: claude
  trend_phase: tracked
  score: 17.02
slotLabel: Avond
---

De focus verschuift naar controle en toegankelijkheid. Kimi opent zijn K3-model volledig, terwijl Claude zijn Managed Agents uitbreidt met delegatie en self-hosted sandboxes voor organisaties die meer grip willen. Tegelijk maken projecten als Open en Maple grote modellen lokaal draaibaar op consumentenhardware. De deep-dives laten zien dat ontwikkelaars vooral worstelen met praktische implementatie: van Mac-setup voor Claude Code tot het aftrainen van irritante taalgewoontes.

---

*Transparantie: het maken van deze editie kostte ±€0,03 aan AI-modelgebruik (7-daags gemiddelde per editie; de redactionele AI-samenvatting meegeteld).*
