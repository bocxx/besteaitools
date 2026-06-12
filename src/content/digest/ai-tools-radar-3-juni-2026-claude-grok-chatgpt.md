---
title: AI Tools Radar – Claude · Grok · ChatGPT (Ochtend 3 juni)
description: 'AI Tools Radar 3 juni: 110 launches, 127 feature-updates, 16 deep-dive-kandidaten op debesteaitools.nl.'
date: '2026-06-03'
timeSlot: tools-digest
featured: []
tags:
- AI Tools Radar
- AI Tools
- Claude
- Grok
- ChatGPT
- Devin
- OpenRouter
author: debesteaitools.nl Redactie
totalAnalyzed: 253
itemsSelected: 16
categoriesCount: 3
topics:
- Claude
- Grok
- ChatGPT
- Devin
- OpenRouter
heroImage: /images/digest/ai-tools-radar-3-juni-2026-claude-grok-chatgpt.webp
launchesCount: 6
updatesCount: 6
deepDivesCount: 4
keySignals:
- Uiteenlopende AI-tool lanceringen — chatbots, inference-engines en workflowtools — wijzen op aanhoudende innovatie.
- Feature-updates richten zich op beveiliging, productiviteit en modelprestaties voor ontwikkelaars en enterprises.
- Deep dives verkennen het bouwen van LLM's van scratch, AI voor creatieve taken en vergelijking van AI-tools.
launches:
- name: Claude
  summary_nl: Anthropic brengt Claude Opus 4.8 uit met updates aan de kernfunctionaliteiten van de populaire AI-chatbot.
  url: https://reddit.com/r/ClaudeAI/comments/1tq99mu/introducing_claude_opus_48/
  source_type: reddit
  source_label: Reddit r/ClaudeAI (2555 upvotes)
  confidence: medium
  favicon: https://www.google.com/s2/favicons?domain=reddit.com&sz=64
- name: Continue? Y/N
  summary_nl: Continue? Y/N is een 60-seconden spel over de uitdagingen van permissie-vermoeidheid bij AI-agents, relevant voor ontwikkelaars.
  url: https://llmgame.scalex.dev
  source_type: hn
  source_label: Hacker News (380 punten, 157 reacties)
  confidence: hoog
  favicon: https://www.google.com/s2/favicons?domain=llmgame.scalex.dev&sz=64
- name: Wix laying off about 20% of its workforce
  summary_nl: Wix ontslaat circa 20% van zijn medewerkers — AI en wisselkoersen worden als factoren genoemd.
  url: https://reddit.com/r/technology/comments/1tq4seb/wix_laying_off_about_20_of_its_workforce_ceo/
  source_type: reddit
  source_label: Reddit r/technology (433 upvotes)
  confidence: medium
  favicon: https://www.google.com/s2/favicons?domain=reddit.com&sz=64
- name: Tiny
  summary_nl: Tiny is een snelle LLM inference-engine in C++ en CUDA voor efficiënte AI-model-deployment.
  url: https://github.com/jmaczan/tiny-vllm
  source_type: hn
  source_label: Hacker News (196 punten, 18 reacties)
  confidence: hoog
  favicon: https://www.google.com/s2/favicons?domain=github.com&sz=64
- name: Maude
  summary_nl: Maude wordt geïntroduceerd als een speelsere variant op Claude — zelfde architectuur, andere toon.
  url: https://reddit.com/r/ClaudeAI/comments/1tvaamz/introducing_maude_like_claude_but_saucier/
  source_type: reddit
  source_label: Reddit r/ClaudeAI (166 upvotes)
  confidence: medium
  favicon: https://www.google.com/s2/favicons?domain=reddit.com&sz=64
- name: dynamic
  summary_nl: Claude Code voegt dynamische workflowfunctionaliteit toe om codering te stroomlijnen.
  url: https://reddit.com/r/ClaudeAI/comments/1tq9ofy/introducing_dynamic_workflows_in_claude_code/
  source_type: reddit
  source_label: Reddit r/ClaudeAI (255 upvotes)
  confidence: medium
  favicon: https://www.google.com/s2/favicons?domain=reddit.com&sz=64
updates:
- tool_name: Claude
  tool_slug: claude
  feature_title: Security Guidance Plugin
  summary_nl: Claude lanceert een plugin die kwetsbaarheden in code detecteert en oplost tijdens het schrijven.
  impact: hoog
  url: https://twitter.com/ClaudeDevs/status/2059385239781384341
  source_type: x
  source_label: X
  confidence: laag
  platforms:
  - twitter
  key: claude::Security Guidance Plugin
- tool_name: Grok
  tool_slug: grok
  feature_title: Grok Build CLI Beta
  summary_nl: Grok lanceert de publieke bèta van Grok Build CLI — een model dat uitblinkt bij agile coding-taken.
  impact: hoog
  url: https://twitter.com/xai/status/2060392249402552457
  source_type: x
  source_label: X
  confidence: laag
  platforms:
  - twitter
  key: grok::Grok Build CLI Beta
- tool_name: Grok
  tool_slug: grok
  feature_title: Composer 2.5 Integration
  summary_nl: Grok integreert Composer 2.5 — een snel en intelligent model voor langlopende taken — in zijn platform.
  impact: hoog
  url: https://twitter.com/xai/status/2061510464325206163
  source_type: x
  source_label: X
  confidence: laag
  platforms:
  - twitter
  key: grok::Composer 2.5 Integration
- tool_name: ChatGPT
  tool_slug: chatgpt
  feature_title: New MAI Models
  summary_nl: OpenAI kondigt zeven nieuwe MAI-modellen aan die gebruikers meer controle geven over hun AI-ervaringen.
  impact: hoog
  url: https://twitter.com/mustafasuleyman/status/2061880164498428188
  source_type: x
  source_label: X
  confidence: laag
  platforms:
  - twitter
  key: chatgpt::New MAI Models
- tool_name: Devin
  tool_slug: devin
  feature_title: Devin AI Software Engineer
  summary_nl: Devin, de eerste AI-software-engineer, is mainstream geworden en ziet sterke groei in adoptie.
  impact: hoog
  url: https://twitter.com/cognition/status/2059660758531940856
  source_type: x
  source_label: X
  confidence: laag
  platforms:
  - twitter
  key: devin::Devin AI Software Engineer
- tool_name: OpenRouter
  tool_slug: openrouter
  feature_title: OpenRouter Expansion
  summary_nl: OpenRouter heeft een Series B-financiering van $113 miljoen opgehaald en ziet een sterke groei in het gebruik.
  impact: hoog
  url: https://twitter.com/OpenRouter/status/2059277623629664758
  source_type: x
  source_label: X
  confidence: laag
  platforms:
  - twitter
  key: openrouter::OpenRouter Expansion
deepDives:
- title: rasbt/LLMs-from-scratch — Implement a ChatGPT-like LLM in PyTorch from scratch, step by step
  summary_nl: Stap-voor-stap handleiding voor het bouwen van een ChatGPT-achtig taalmodel in PyTorch — technische inzichten voor ontwikkelaars.
  url: https://github.com/rasbt/LLMs-from-scratch
  tool: ''
  trend_phase: tracked
  score: 18.57
- title: creating anime with AI is crazy now I used ChatGPT Image 2.0 to design a full anime short film storyboard. Then Seedanc…
  summary_nl: Uitleg over het ontwerpen van een anime-kortfilm-storyboard met ChatGPT Image 2.0 en Seedance.
  url: https://twitter.com/HeyAbhishek/status/2060726191984918810
  tool: chatgpt
  trend_phase: tracked
  score: 18.4
- title: "this guy literally spent 400 hours in Claude Code testing 100+ skills to find the 6 best ones ð\x9F¤¯ Nate put together an…"
  summary_nl: Gedetailleerde analyse van 100+ getest Claude Code-skills: de 6 beste met praktisch advies.
  url: https://twitter.com/DataChaz/status/2051045328036483438
  tool: claude
  trend_phase: tracked
  score: 17.9
- title: Lum1104/Understand-Anything — Graphs that teach > graphs that impress. Turn any code into an interactive knowledge grap…
  summary_nl: Interactieve kennisgraaf-tool die code omzet in visuele leerresources — grafieken die onderwijzen in plaats van imponeren.
  url: https://github.com/Lum1104/Understand-Anything
  tool: claude
  trend_phase: tracked
  score: 17.45
slotLabel: Ochtend
---

De data laat een mix zien van nieuwe AI-tool lanceringen, feature-updates en verdiepende content. De updates benadrukken verbeteringen op het gebied van beveiliging, productiviteit en modelprestaties. De deep dive-onderwerpen bieden technische inzichten voor iedereen die AI in de praktijk wil inzetten.
