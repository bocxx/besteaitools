#!/usr/bin/env python3
"""
translate_radar.py — Vertaalt Engelse summary_nl / keySignals in digest-bestanden naar Nederlands.
Werkt volledig lokaal, geen API-kosten.

Aanpak:
1. Exacte woordenboek-match voor bekende zinnen (hoogste prioriteit)
2. Regex-patronen voor herhalende structuren
3. Resterende Engelse zinnen worden gelogd zodat je ze handmatig kunt afhandelen

Gebruik:
    python3 scripts/translate_radar.py [--dry-run] [--dir src/content/digest]
"""

import argparse
import re
import os
from pathlib import Path

# ---------------------------------------------------------------------------
# 1. Exact woordenboek (Engels → Nederlands)
#    Gesorteerd van lang naar kort zodat langere matches eerder treffen.
# ---------------------------------------------------------------------------
EXACT: dict[str, str] = {
    # keySignals / launches / updates — Claude
    "Anthropic releases Claude Fable 5, a major update to their powerful AI model, with new managed agent capabilities.":
        "Anthropic brengt Claude Fable 5 uit — inclusief nieuwe beheerde agentfunctionaliteit.",
    "Anthropic has released the latest version of their powerful AI model, Claude Fable 5, with new features for developers and researchers.":
        "Anthropic brengt Claude Fable 5 uit met nieuwe functies voor ontwikkelaars en onderzoekers.",
    "Anthropic has released the latest version of their powerful Claude AI model, with significant improvements and new capabilities.":
        "Anthropic brengt een nieuwe versie van Claude uit met aanzienlijke verbeteringen en nieuwe mogelijkheden.",
    "Anthropic has released Claude Fable 5, a major update with new managed agents capabilities.":
        "Anthropic brengt Claude Fable 5 uit met nieuwe beheerde agentfunctionaliteit.",
    "Anthropic introduces Claude Fable 5, the latest version of their powerful AI model, offering enhanced capabilities for developers and researchers.":
        "Anthropic brengt Claude Fable 5 uit — verbeterde mogelijkheden voor ontwikkelaars en onderzoekers.",
    "Anthropic has launched a new AI model called Mythos, which is based on the Claude architecture and offers improved performance.":
        "Anthropic lanceert Mythos, een nieuw AI-model op Claude-architectuur met verbeterde prestaties.",
    "Anthropic has released Claude Fable 5, a major update with new capabilities.":
        "Anthropic brengt Claude Fable 5 uit met nieuwe mogelijkheden.",
    "Claude now supports managed agents, allowing users to easily manage and automate workflows within the platform.":
        "Claude ondersteunt nu beheerde agents, waarmee gebruikers workflows eenvoudig kunnen beheren en automatiseren.",
    "Claude now supports managed agents, allowing users to easily manage and automate workflows.":
        "Claude ondersteunt nu beheerde agents voor eenvoudiger workflow-beheer en -automatisering.",
    "Anthropic has launched a new AI model called Mythos that offers improved performance.":
        "Anthropic lanceert Mythos, een nieuw AI-model met verbeterde prestaties.",

    # LangChain / TurboVec
    "LangChain introduces TurboVec, an open-source tool that can reduce AI memory usage by 16x.":
        "LangChain introduceert TurboVec, een open-source tool die geheugengebruik van AI-apps met factor 16 reduceert.",
    "LangChain has introduced TurboVec, an open-source tool that can reduce the memory usage of AI applications by up to 16 times.":
        "LangChain introduceert TurboVec, een open-source tool die geheugengebruik van AI-applicaties tot 16× kan verkleinen.",
    "LangChain has launched TurboVec, an open-source tool that can drastically reduce memory usage in AI applications.":
        "LangChain lanceert TurboVec, een open-source tool die geheugengebruik van AI-applicaties drastisch kan verlagen.",
    "LangChain has introduced TurboVec, an open-source tool that can reduce the memory usage of AI applications by 16 times.":
        "LangChain introduceert TurboVec, een open-source tool die geheugengebruik van AI-applicaties tot 16× reduceert.",
    "LangChain introduces TurboVec, an open-source tool to drastically reduce memory usage in AI applications.":
        "LangChain introduceert TurboVec, een open-source tool om geheugengebruik van AI-applicaties drastisch te verlagen.",

    # Gemini / Live Translate
    "Gemini upgrades its live speech translation capabilities to support over 70 languages.":
        "Gemini breidt live spraakvertaling uit naar meer dan 70 talen.",
    "Gemini 3.5 adds live speech-to-speech translation in over 70 languages, a significant upgrade for its multimodal capabilities.":
        "Gemini 3.5 voegt live spraak-naar-spraak-vertaling toe in meer dan 70 talen.",
    "Gemini has released version 3.5 of its audio model, which now supports live speech-to-speech translation in over 70 languages.":
        "Gemini 3.5 ondersteunt nu live spraak-naar-spraak-vertaling in meer dan 70 talen.",
    "Gemini 3.5 introduces a new audio model for live speech-to-speech translation in over 70 languages.":
        "Gemini 3.5 introduceert een nieuw audiomodel voor live spraakvertaling in meer dan 70 talen.",
    "Gemini 3.5 includes a new live speech-to-speech translation feature that supports over 70 languages.":
        "Gemini 3.5 bevat een nieuwe live spraakvertaalfunctie voor meer dan 70 talen.",
    "Gemini 3.5 includes a new audio model for live speech-to-speech translation in more than 70 languages.":
        "Gemini 3.5 bevat een nieuw audiomodel voor live spraakvertaling in meer dan 70 talen.",

    # Grok
    "Grok has released version 1.5 of their Imagine tool, which is now the top-ranked image-to-video generation tool on Design Arena.":
        "Grok brengt Imagine 1.5 uit, nu de best gerangschikte image-naar-video-tool op Design Arena.",
    "Grok has released version 1.5 of Imagine, which tops the image-to-video rankings on Design Arena.":
        "Grok brengt Imagine 1.5 uit, topscorer in image-naar-video op Design Arena.",

    # Lathe
    "Lathe is a new open-source tool that allows users to leverage large language models to learn new domains, rather than just skipping past them.":
        "Lathe is een open-source tool waarmee je LLM's inzet om nieuwe kennisdomeinen actief te verkennen in plaats van over te slaan.",
    "Lathe is a new open-source tool that uses large language models to help users learn new domains, rather than just skipping past them.":
        "Lathe is een open-source tool die LLM's inzet om gebruikers nieuwe domeinen écht te laten leren.",

    # Gitdot
    "Gitdot is an open-source, Rust-based alternative to GitHub, aiming to provide a better platform for developers.":
        "Gitdot is een open-source, Rust-gebaseerd alternatief voor GitHub, gericht op betere controle voor ontwikkelaars.",
    "Gitdot is an open-source, Rust-based alternative to GitHub, aiming to provide a better developer experience.":
        "Gitdot is een open-source, Rust-gebaseerd alternatief voor GitHub met een betere ontwikkelaarservaring.",

    # Gravity
    "Gravity is an interactive solar system simulator that allows users to explore the principles of Newtonian and Einsteinian physics.":
        "Gravity is een interactieve zonnestelsel-simulator waarmee je de wetten van Newton en Einstein kunt verkennen.",
    "Gravity is an interactive solar system simulator that lets users explore the physics from Newton to Einstein.":
        "Gravity is een interactieve zonnestelsel-simulator van Newton tot Einstein.",

    # Uruky
    "Uruky, a privacy-focused Kagi alternative, has added new features like image search and URL rewrites.":
        "Uruky, een privacygericht Kagi-alternatief, voegt afbeeldingszoekopdrachten en URL-herschrijving toe.",
    "based Kagi alternative) now has Image Search and URL Rewrites":
        "EU-gebaseerd Kagi-alternatief, nu met afbeeldingszoekopdrachten en URL-herschrijving.",

    # Extend UI
    "Extend UI is an open-source UI kit designed for modern document-based applications, providing a flexible and customizable solution.":
        "Extend UI is een open-source UI-kit voor moderne documentgebaseerde applicaties — flexibel en aanpasbaar.",

    # Gemma
    "Gemma 4 12B is a new unified, encoder-free multimodal AI model that can handle a variety of tasks.":
        "Gemma 4 12B is een nieuw, unified multimodaal AI-model zonder encoder, geschikt voor uiteenlopende taken.",

    # Deep dives — terugkerende titels
    "A step-by-step walkthrough on how to use Gemini 3.1 and Seedance 2.0 to build high-quality websites.":
        "Stap-voor-stap handleiding voor het inzetten van Gemini 3.1 en Seedance 2.0 om kwalitatieve websites te bouwen.",
    "A step-by-step tutorial on how to use Gemini 3.1 and Seedance 2.0 to build cinematic $10k websites.":
        "Stap-voor-stap handleiding: Gemini 3.1 en Seedance 2.0 inzetten om cinematische websites te bouwen.",
    "An in-depth exploration of implementing a ChatGPT-like large language model from scratch in PyTorch.":
        "Diepgaande repository om een ChatGPT-achtig taalmodel volledig vanaf nul te bouwen in PyTorch.",
    "An in-depth exploration of implementing a ChatGPT-like language model from scratch in PyTorch.":
        "Repository om stap voor stap een ChatGPT-achtig taalmodel vanaf nul te bouwen in PyTorch.",
    "A tutorial on using ChatGPT Image 2.0 and Seedance to create an entire anime short film storyboard.":
        "Uitleg over het ontwerpen van een volledig anime-kortfilm-storyboard met ChatGPT Image 2.0 en Seedance.",
    "A walkthrough on using ChatGPT Image 2.0 and Seedance to design an entire anime short film storyboard.":
        "Doorloop: ChatGPT Image 2.0 en Seedance inzetten voor een compleet anime-kortfilm-storyboard.",
    "A deep dive into the top 6 skills of the Claude AI model, based on extensive testing and analysis.":
        "Na 400 uur testen van 100+ skills in Claude Code zijn de 6 beste geselecteerd.",
    "A detailed analysis of testing over 100 skills in Claude Code to identify the 6 best ones, offering practical guidance for Claude users.":
        "Gedetailleerde analyse van 100+ getest Claude Code-skills: de 6 beste met praktisch advies.",
    "A detailed analysis of the top 6 skills of the Claude AI assistant, based on 100+ tests over 400 hours.":
        "Analyse van de top-6 Claude-skills op basis van 100+ tests over 400 uur.",

    # Practical guides
    "A practical guide on using ChatGPT for the Dutch market.":
        "Praktische gids voor het gebruik van ChatGPT, gericht op de Nederlandse markt.",
    "A practical guide on using ChatGPT, tailored for the Dutch market.":
        "Praktische gids voor ChatGPT, afgestemd op de Nederlandse markt.",
    "A practical guide to ChatGPT for the Dutch market.":
        "Praktische gids voor ChatGPT, gericht op de Nederlandse markt.",
    "A practical guide to ChatGPT, a valuable resource for developers and product builders looking to leverage this powerful AI tool.":
        "Praktische gids voor ChatGPT, nuttig voor ontwikkelaars en productbouwers.",
    "A practical guide on using Claude, the AI assistant, for the Dutch market.":
        "Praktische gids voor Claude voor de Nederlandse markt.",
    "A practical guide on using the Claude AI assistant effectively in the Dutch market.":
        "Praktische gids voor effectief gebruik van Claude in de Nederlandse markt.",
    "A practical guide on using the Claude AI assistant effectively, including tips on defining tasks and measuring success.":
        "Praktische gids voor Claude: taken definiëren en succes meten.",
    "A practical guide on using the Claude AI model, focusing on the anatomy of a prompt and how to achieve desired results.":
        "Praktische gids voor Claude: de anatomie van een prompt en hoe je gewenste resultaten bereikt.",
    "A practical guide on using the Claude AI tool, focusing on the Dutch market.":
        "Praktische gids voor Claude, gericht op de Nederlandse markt.",
    "A practical guide on using the Claude AI tool, for the Dutch market.":
        "Praktische gids voor Claude voor de Nederlandse markt.",
    "A practical guide on using You.com for the Dutch market.":
        "Praktische gids voor You.com, gericht op de Nederlandse markt.",
    "A practical guide on using the You.com search engine for the Dutch market.":
        "Praktische gids voor de You.com-zoekmachine, gericht op de Nederlandse markt.",
    "A practical guide on using the You.com search engine, tailored for the Dutch market.":
        "Praktische gids voor You.com, afgestemd op de Nederlandse markt.",
    "A practical guide on using the You.com search engine, with a focus on the Dutch market.":
        "Praktische gids voor de You.com-zoekmachine met focus op de Nederlandse markt.",
    "A practical guide on using You.com, the AI-powered search engine, for the Dutch market.":
        "Praktische gids voor You.com — de AI-zoekmachine — gericht op de Nederlandse markt.",
    "A practical overview of You.com for the Dutch market.":
        "Praktisch overzicht van You.com voor de Nederlandse markt.",
    "A step-by-step guide on how to effectively use the you.com platform, providing a practical walkthrough for users.":
        "Stap-voor-stap gids voor effectief gebruik van het You.com-platform.",
    "A practical guide on leveraging the You.com platform, with a focus on the Dutch market.":
        "Praktische gids voor het You.com-platform, met focus op de Nederlandse markt.",
    "A practical guide to Gemini, the Dutch market-focused AI tool.":
        "Praktische gids voor Gemini, gericht op de Nederlandse markt.",

    # Step-by-step guides — Claude
    "A step-by-step guide on setting up and using the Claude AI assistant, for the Dutch market.":
        "Stap-voor-stap handleiding voor het instellen en gebruiken van Claude, gericht op de Nederlandse markt.",
    "A step-by-step guide on setting up and using the Claude AI assistant, tailored for the Dutch audience.":
        "Stap-voor-stap handleiding voor Claude, afgestemd op het Nederlandse publiek.",
    "A step-by-step guide on setting up and using the Claude AI assistant.":
        "Stap-voor-stap handleiding voor het instellen en gebruiken van Claude.",
    "A step-by-step guide on setting up and using the Claude AI tool, for the Dutch market.":
        "Stap-voor-stap handleiding voor Claude, gericht op de Nederlandse markt.",
    "A step-by-step guide on how to use the Together AI tool, which could be valuable for developers and product builders.":
        "Stap-voor-stap gids voor Together AI — nuttig voor ontwikkelaars en productbouwers.",
    "A step-by-step guide on setting up and using the Claude AI assistant, for the Dutch market.":
        "Stap-voor-stap handleiding voor Claude in de Nederlandse markt.",
    "A guide on setting up and using Claude in 5 steps for the Dutch market.":
        "Gids voor Claude in 5 stappen, gericht op de Nederlandse markt.",
    "A guide on setting up and using Claude, the AI assistant, in just 1 day.":
        "Gids voor het opzetten en gebruiken van Claude in één dag.",
    "A guide on setting up the Claude AI model in just one day, with step-by-step instructions.":
        "Handleiding voor het inrichten van Claude in één dag, met stapsgewijze instructies.",
    "A detailed tutorial on setting up and using the Claude AI platform, a valuable resource for developers and teams.":
        "Uitgebreide handleiding voor het instellen van Claude — nuttig voor ontwikkelaars en teams.",
    "A detailed tutorial on setting up the Claude AI tool, providing a comprehensive guide for new users.":
        "Uitgebreide handleiding voor nieuwe gebruikers van Claude.",
    "A detailed tutorial on leveraging the together ai platform, offering a comprehensive overview for interested users.":
        "Uitgebreide handleiding voor het Together AI-platform — een compleet overzicht.",
    "A detailed tutorial on setting up and using the Claude AI tool, tailored for the Dutch market.":
        "Uitgebreide handleiding voor Claude, afgestemd op de Nederlandse markt.",
    "A detailed guide on setting up and using the Claude AI platform, a valuable resource for developers and teams.":
        "Uitgebreide gids voor het instellen van Claude — nuttig voor ontwikkelaars en teams.",
    "A practical guide on how to effectively use the Claude AI assistant, focusing on prompt engineering for the Dutch market.":
        "Praktische gids voor effectief gebruik van Claude met focus op prompt engineering.",

    # Wuphf / Karpathy
    "A Karpathy introduces Wuphf, a tool that allows agents to maintain a style-consistent LLM wiki using Markdown and Git.":
        "Karpathy introduceert Wuphf: een tool waarmee agents een stijlconsistente LLM-wiki bijhouden in Markdown en Git.",
    "A Karpathy is een tool om LLM-wiki's en -agents te stylen in Markdown en Git.":
        "Karpathy's tool om LLM-wiki's en -agents te stylen in Markdown en Git.",
    "A Karpathy is een tool om LLM-wiki's te stylen in Markdown en Git, relevant voor teams die hun AI-agenten willen documenteren.":
        "Karpathy's tool voor het stylen van LLM-wiki's in Markdown en Git — relevant voor teams die AI-agents documenteren.",
    "A Karpathy has released a tool that allows agents to style their LLM-powered wikis using Markdown and Git.":
        "Karpathy brengt een tool uit waarmee agents hun LLM-wiki's stylen in Markdown en Git.",
    "A Karpathy introduces Wuphf, a tool that allows you to style your LLM-powered wiki using Markdown and Git.":
        "Karpathy introduceert Wuphf: stijl je LLM-wiki in Markdown en Git.",
    "A Karpathy is a tool that allows you to style your LLM-powered agents' wiki content using Markdown and Git.":
        "Karpathy's tool om wiki-content voor LLM-agents te stylen in Markdown en Git.",
    "A Karpathy is a tool that allows you to style your LLM-powered wiki using Markdown and Git, for agent-maintained knowledge bases.":
        "Karpathy's tool voor het stylen van LLM-wiki's in Markdown en Git, voor door agents bijgehouden kennisbanken.",
    "A Karpathy's 'wuphf' tool allows you to style your LLM-powered wiki agents using Markdown and Git.":
        "Karpathy's 'wuphf' stelt je in staat LLM-wiki-agents te stylen in Markdown en Git.",
    "A Karpathy-style LLM wiki that agents can maintain using Markdown and Git.":
        "Een Karpathy-stijl LLM-wiki die agents kunnen onderhouden in Markdown en Git.",
    "A new tool that allows developers to style their LLM-powered wiki agents using Markdown and Git.":
        "Een nieuwe tool waarmee ontwikkelaars LLM-wiki-agents stylen in Markdown en Git.",
    "A project that allows you to style your LLM-powered agents' wiki content using Markdown and Git.":
        "Project waarmee je wiki-content voor LLM-agents stylt in Markdown en Git.",

    # Misc tools
    "A Git-based version control system designed specifically for AI agents, enabling better collaboration and tracking.":
        "Een Git-gebaseerd versiebeheersysteem speciaal voor AI-agents, voor betere samenwerking en tracking.",
    "A programmable terminal multiplexer with a Playwright-style SDK":
        "Een programmeerbare terminal-multiplexer met een Playwright-achtige SDK.",
    "A handwritten Clojure REPL for the reMarkable 2":
        "Een handgeschreven Clojure REPL voor de reMarkable 2.",
    "A new Clojure-like language in Go that boots up in just 7ms, offering a fast and efficient alternative.":
        "Een nieuwe Clojure-achtige taal in Go die in slechts 7ms opstart.",
    "A platform that aims to be the \"TikTok for Scientific Papers\".":
        "Een platform dat de 'TikTok voor wetenschappelijke papers' wil zijn.",
    "A demo that lets you watch a neural network learn to play the classic game Snake.":
        "Demo waarbij je een neuraal netwerk Snake leert spelen in real-time.",
    "A developer is building a web server in assembly to give their life (a lack of) meaning.":
        "Ontwikkelaar bouwt een webserver in assembly — puur voor de zingeving.",
    "A developer has built a home server OS with a focus on ease of use and functionality.":
        "Ontwikkelaar bouwt een home-server-OS met focus op gebruiksgemak en functionaliteit.",
    "A developer has built a home server OS, potentially interesting for those looking to set up their own home infrastructure.":
        "Ontwikkelaar bouwt een home-server-OS — interessant voor wie eigen infrastructuur wil opzetten.",
    "A developer has built an open-source AI agent that topped the TerminalBench on Gemini, showcasing its capabilities.":
        "Ontwikkelaar bouwt een open-source AI-agent die de TerminalBench op Gemini aanvoert.",
    "A developer dedicated 4 years to mastering offline password cracking, showcasing their expertise in this security-focused domain.":
        "Ontwikkelaar besteedde 4 jaar aan het beheersen van offline wachtwoordkraken.",
    "A discussion on the recent developments in the Metaverse space, including Zuckerberg's decision to scale back investments, an important topic for those following the industry.":
        "Discussie over recente ontwikkelingen in de Metaverse, inclusief Zuckerbergs besluit om investeringen terug te schroeven.",
    "A fascinating profile of a young polymath who has achieved remarkable success in chess, game design, and neuroscience, highlighting the potential of AI-powered tools to support diverse talents.":
        "Profiel van een jonge polymath met succes in schaken, gamedesign en neurowetenschappen.",
    "A guide on running the Qwen3.5 AI model locally using the Claude Code platform, a useful resource for Dutch users.":
        "Gids voor het lokaal draaien van Qwen3.5 via Claude Code, nuttig voor Nederlandse gebruikers.",
    "A detailed guide on creating the perfect 'soul.md' file for AI agents, a crucial component for customizing their behavior.":
        "Uitgebreide gids voor het maken van het perfecte 'soul.md'-bestand voor AI-agents.",
    "A detailed guide on creating the perfect .soul.md file for AI agents, a crucial component for customizing agent behavior.":
        "Uitgebreide gids voor het .soul.md-bestand — cruciaal voor het aanpassen van agentgedrag.",

    # Markdown bodies (editorial notes)
    "This week's AI landscape is marked by significant updates and improvements across several prominent tools. Anthropic has bolstered its Claude model with new Fable 5 and Mythos versions, showcasing the rapid evolution of large language models. Meanwhile, LangChain has unveiled TurboVec, an innovative solution to optimize memory usage for AI applications. Gemini has also expanded its live translation capabilities, making it more accessible for global communication needs.":
        "Het AI-landschap staat deze week in het teken van updates bij een aantal prominente tools. Anthropic versterkt Claude met Fable 5 en Mythos, wat de snelle doorontwikkeling van taalmodellen onderstreept. LangChain onthult TurboVec, een open-source aanpak voor geheugenoptimalisatie. Gemini breidt live vertaling uit naar meer dan 70 talen.",

    "This week's AI landscape sees several notable updates and launches across the board. Anthropic is pushing the boundaries of their Claude model, while LangChain tackles a key technical challenge around memory optimization. Gemini also continues to expand its multimodal capabilities with enhanced translation features. These developments demonstrate the steady progress in making AI tools more powerful, efficient, and accessible for developers and users alike.":
        "Het AI-landschap laat deze week uiteenlopende updates en lanceringen zien. Anthropic verlegt de grenzen van Claude, LangChain pakt geheugenoptimalisatie aan en Gemini breidt multimodale vertaalfuncties uit. Samen laten deze ontwikkelingen zien hoe AI-tools steeds krachtiger en toegankelijker worden.",
}

# ---------------------------------------------------------------------------
# 2. Regex-patronen (van specifiek naar algemeen)
#    Elk patroon is (regex, vervanging) — groups worden doorgegeven via \1, \2 etc.
# ---------------------------------------------------------------------------
PATTERNS: list[tuple[str, str]] = [
    # "X has released/introduced/launched Y, a/an [adj] Z that/with ..."
    (r"^(.+?) has released (.+?), the latest version of their (?:powerful )?(?:AI model|Claude AI model)(?:, )?with (.+?)\.$",
     r"\1 brengt \2 uit — de nieuwste versie met \3."),
    (r"^(.+?) has released (.+?), a major update (?:to their powerful AI model )?with (.+?)\.$",
     r"\1 brengt \2 uit — een grote update met \3."),
    (r"^(.+?) has introduced (.+?), an open-source tool that (.+?)\.$",
     r"\1 introduceert \2, een open-source tool die \3."),
    (r"^(.+?) has launched (.+?), an open-source tool that (.+?)\.$",
     r"\1 lanceert \2, een open-source tool die \3."),
    (r"^(.+?) has released (.+?) with (.+?) for (.+?)\.$",
     r"\1 brengt \2 uit met \3 voor \4."),
    (r"^(.+?) now supports (.+?), allowing users to (.+?)\.$",
     r"\1 ondersteunt nu \2, waarmee gebruikers \3."),
    (r"^(.+?) introduces (.+?), an open-source tool (?:that )?(.+?)\.$",
     r"\1 introduceert \2, een open-source tool die \3."),
    (r"^(.+?) introduces (.+?), a new (.+?) that (.+?)\.$",
     r"\1 introduceert \2 — een nieuwe \3 die \4."),

    # "A practical guide on/to X for the Dutch market."
    (r"^A practical guide (?:on|to) (?:using )?(.+?) for the Dutch market\.$",
     r"Praktische gids voor \1, gericht op de Nederlandse markt."),
    (r"^A practical guide (?:on|to) (?:using )?(.+?), (?:tailored|focused) (?:for|on) the Dutch market\.$",
     r"Praktische gids voor \1, afgestemd op de Nederlandse markt."),
    (r"^A practical guide (?:on|to) (?:using )?(.+?), with a focus on the Dutch market\.$",
     r"Praktische gids voor \1 met focus op de Nederlandse markt."),

    # "A step-by-step guide on setting up and using X[, for the Dutch market]."
    (r"^A step-by-step guide on (?:setting up and )?using (.+?) for the Dutch market\.$",
     r"Stap-voor-stap handleiding voor \1, gericht op de Nederlandse markt."),
    (r"^A step-by-step guide on setting up and using (.+?), (?:for|tailored for) the Dutch (?:market|audience)\.$",
     r"Stap-voor-stap handleiding voor het instellen en gebruiken van \1."),
    (r"^A step-by-step guide on setting up and using (.+?)\.$",
     r"Stap-voor-stap handleiding voor het instellen en gebruiken van \1."),

    # "X is a new open-source tool that ..."
    (r"^(.+?) is a new open-source tool that (.+?)\.$",
     r"\1 is een nieuwe open-source tool die \2."),
    (r"^(.+?) is an open-source(?:, (.+?))? tool (?:that|designed to) (.+?)\.$",
     r"\1 is een open-source tool die \3."),
    (r"^(.+?) is a new (.+?) tool that (.+?)\.$",
     r"\1 is een nieuwe \2-tool die \3."),

    # "A deep dive into X."
    (r"^A deep dive into (.+?)\.$",
     r"Diepgaande analyse van \1."),

    # "An in-depth exploration of X."
    (r"^An in-depth exploration of (.+?)\.$",
     r"Diepgaande verkenning van \1."),

    # "A detailed analysis of X."
    (r"^A detailed analysis of (.+?)\.$",
     r"Gedetailleerde analyse van \1."),

    # "A [detailed/comprehensive] tutorial on X."
    (r"^A (?:detailed |comprehensive )?tutorial on (?:how to use |using )?(.+?)\.$",
     r"Uitgebreide handleiding voor \1."),

    # Generic English detection — flag for manual review
]

# ---------------------------------------------------------------------------
# 3. Velden die we verwerken
# ---------------------------------------------------------------------------
FIELDS_TO_TRANSLATE = ["summary_nl"]
YAML_LIST_FIELDS = ["keySignals"]


def translate(text: str) -> tuple[str, bool]:
    """Vertaalt één tekst. Geeft (vertaling, was_translated) terug."""
    stripped = text.strip()
    if not stripped:
        return text, False

    # Al Nederlands? Snel-check op Engelse woorden
    english_markers = (" the ", " is ", " has ", " are ", " was ", " its ",
                       " with ", " for ", " and ", " new ", " now ", " an ",
                       " introduces ", " releases ", " launched ", " guide ")
    lower = stripped.lower()
    is_english = any(m in f" {lower} " for m in english_markers)
    if not is_english:
        return text, False

    # 1. Exact match
    if stripped in EXACT:
        return EXACT[stripped], True

    # 2. Regex patronen
    for pattern, replacement in PATTERNS:
        m = re.match(pattern, stripped, re.IGNORECASE)
        if m:
            result = m.expand(replacement)
            return result, True

    return text, False


def process_file(path: Path, dry_run: bool = False) -> int:
    """Vertaalt één .md bestand. Geeft aantal gewijzigde velden terug."""
    content = path.read_text(encoding="utf-8")
    original = content
    changes = 0
    untranslated = []

    # Vertaal summary_nl: regels
    def replace_summary(m):
        nonlocal changes
        indent = m.group(1)
        val = m.group(2)
        translated, did = translate(val)
        if did:
            changes += 1
            return f"{indent}summary_nl: {translated}"
        else:
            if any(mk in f" {val.lower()} " for mk in (" the ", " is ", " has ", " are ")):
                untranslated.append(val[:80])
            return m.group(0)

    content = re.sub(
        r'^( +)summary_nl: (.+)$',
        replace_summary,
        content,
        flags=re.MULTILINE,
    )

    # Vertaal keySignals lijst-items
    def replace_signal(m):
        nonlocal changes
        indent = m.group(1)
        val = m.group(2)
        translated, did = translate(val)
        if did:
            changes += 1
            return f"{indent}- {translated}"
        else:
            if any(mk in f" {val.lower()} " for mk in (" the ", " releases ", " introduces ", " adds ")):
                untranslated.append(val[:80])
            return m.group(0)

    # Only inside keySignals block (between keySignals: and next top-level key)
    in_signals = False
    lines = content.split('\n')
    new_lines = []
    for line in lines:
        if re.match(r'^keySignals:', line):
            in_signals = True
            new_lines.append(line)
            continue
        if in_signals and re.match(r'^[a-zA-Z]', line):
            in_signals = False
        if in_signals and re.match(r'^- ', line):
            val = line[2:].strip()
            translated, did = translate(val)
            if did:
                changes += 1
                new_lines.append(f"- {translated}")
                continue
            elif any(mk in f" {val.lower()} " for mk in (" the ", " releases ", " introduces ", " adds ")):
                untranslated.append(val[:80])
        new_lines.append(line)
    content = '\n'.join(new_lines)

    # Vertaal markdown body (Engels alinea na ---)
    # Zoek de body-alinea na het tweede ---
    fm_end = content.rfind('\n---\n')
    if fm_end != -1:
        body = content[fm_end + 5:]
        body_stripped = body.strip()
        translated_body, did = translate(body_stripped)
        if did:
            changes += 1
            content = content[:fm_end + 5] + '\n' + translated_body + '\n'

    if untranslated:
        print(f"  ⚠ {path.name}: {len(untranslated)} niet vertaald: {untranslated[0]!r}")

    if changes > 0 and not dry_run:
        path.write_text(content, encoding="utf-8")
        print(f"  ✓ {path.name}: {changes} veld(en) vertaald")
    elif changes > 0 and dry_run:
        print(f"  [dry] {path.name}: {changes} veld(en) zouden worden vertaald")

    return changes


def main():
    parser = argparse.ArgumentParser(description="Vertaal Engelse summary_nl/keySignals in radar-bestanden.")
    parser.add_argument("--dry-run", action="store_true", help="Toon wijzigingen zonder op te slaan")
    parser.add_argument("--dir", default="src/content/digest", help="Map met .md bestanden")
    args = parser.parse_args()

    base = Path(__file__).parent.parent / args.dir
    if not base.exists():
        # Try relative from cwd
        base = Path(args.dir)

    files = sorted(base.glob("ai-tools-radar-*.md"))
    print(f"Verwerken: {len(files)} bestanden in {base}")

    total = 0
    for f in files:
        total += process_file(f, dry_run=args.dry_run)

    print(f"\nKlaar — {total} velden vertaald in {len(files)} bestanden.")


if __name__ == "__main__":
    main()
