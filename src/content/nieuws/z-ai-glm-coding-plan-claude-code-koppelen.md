---
title: "GLM Coding Plan koppelen aan Claude Code: twee regels in je settings"
description: "Z.ai laat je Claude Code op GLM-modellen draaien via een eigen Anthropic-endpoint. Zo stel je het in — en dit is wat de overstap naar credits en een weeklimiet betekent."
publishedAt: 2026-08-30
updatedAt: 2026-08-30
author: "Redactie"
category: "gids"
tags:
  - "z-ai"
  - "glm"
  - "claude-code"
  - "coding-agents"
  - "ai-kosten"
  - "open-weights"
toolSlug: "z-ai"
featured: false
draft: false
readingTime: 4
heroImageAlt: "Miniatuur diorama-illustratie bij artikel 'GLM Coding Plan koppelen aan Claude Code: twee regels in je settings'"
heroScene: "A small junction box with two cables being swapped, one plug lifted out and another hovering just above the socket"
keyTakeaways:
  - "Z.ai biedt een Anthropic-compatibel endpoint, zodat Claude Code op GLM-modellen kan draaien."
  - "Instellen kost twee env-regels in ~/.claude/settings.json, of één commando via de coding-helper."
  - "Het GLM Coding Plan start rond 18 dollar per maand en rekent in credits met een weeklimiet."
  - "Het coding-endpoint is een ander pad dan het algemene API-endpoint; ze zijn niet uitwisselbaar."
faq:
  - q: "Hoe stel ik dit in?"
    a: "Twee routes. De snelste is de coding-helper van Z.ai: `npx @z_ai/coding-helper` in je terminal, die de tool installeert, je plan configureert en MCP-servers kan beheren. Handmatig kan ook: open `~/.claude/settings.json` en zet onder `env` de velden `ANTHROPIC_BASE_URL` op `https://api.z.ai/api/anthropic` en `ANTHROPIC_AUTH_TOKEN` op je Z.ai-sleutel. Die sleutel maak je aan in de API Keys-pagina van je Z.ai-account."
  - q: "Waarom werkt dat, een Anthropic-URL bij een Chinese aanbieder?"
    a: "Claude Code praat met een API in een bepaald formaat. Z.ai draait een endpoint dat datzelfde formaat spreekt, dus vanuit Claude Code gezien verandert er niets behalve het adres en de sleutel. Achter dat adres staan GLM-modellen in plaats van Claude-modellen. Dezelfde truc gebruiken meer aanbieders; het is geen omweg maar een ondersteund pad in Z.ai's eigen documentatie."
  - q: "Welk endpoint moet ik hebben?"
    a: "Let hier op, want dit is de meest gemaakte fout. Heb je een Coding Plan, dan moet je het coding-endpoint gebruiken — `/api/coding/paas/v4` — en niet het algemene `/api/paas/v4`. Die twee zijn niet uitwisselbaar: het coding-endpoint is alleen bedoeld voor coding-scenario's. Krijg je authenticatie- of quota-fouten terwijl je sleutel klopt, controleer dan eerst dit."
  - q: "Wat kost het en hoe wordt er afgerekend?"
    a: "De plannen starten rond 18 dollar per maand. Belangrijk: Z.ai is overgestapt op credits met een weeklimiet, in plaats van een simpel maandbudget. Pro en Max bieden respectievelijk zes en veertien keer de gebruiksruimte van Lite. Kom je in een drukke week vroeg aan je limiet, dan zit je de rest van die week krap — plan dus op je piekweek, niet op je gemiddelde."
  - q: "Ben ik mijn Claude-abonnement kwijt als ik dit doe?"
    a: "Nee. Je wijzigt alleen waar Claude Code zijn verzoeken heen stuurt. Zet je de twee env-velden terug of haal je ze weg, dan praat Claude Code weer met Anthropic. Sommigen houden twee profielen aan: het goedkope plan voor bulkwerk en refactors, het dure voor het denkwerk."
  - q: "Wat moet ik weten over de modellen zelf?"
    a: "De GLM-reeks komt van het Chinese Zhipu en staat onder de MIT-licentie, dus je mag ze downloaden en commercieel gebruiken, ook zelf-gehost. Ze zijn nadrukkelijk gebouwd voor agentic werk: een groot doel opdelen en met tools uitvoeren. In coding-benchmarks komen ze in de buurt van Claude; buiten coding en agent-taken zijn ze minder onderscheidend. En als Chinese aanbieder geldt: kijk naar je datastroom voordat je er gevoelige code doorheen stuurt."
---

Claude Code is een prettige coding-agent en een dure gewoonte. Wie er dagelijks in werkt, ziet het verbruik oplopen — vooral bij het soort werk waar je geen frontier-model voor nodig hebt: een refactor doortrekken, tests bijschrijven, een migratie uitvoeren.

Z.ai biedt daar een uitweg voor die weinig mensen kennen: een endpoint dat het Anthropic-formaat spreekt, zodat Claude Code op GLM-modellen kan draaien. Je houdt de tool die je gewend bent en wisselt alleen het model erachter.

## Instellen

De snelste route is de eigen helper van Z.ai:

```bash
npx @z_ai/coding-helper
```

Die installeert de tool, configureert je plan en kan meteen MCP-servers voor je beheren. Je volgt de aanwijzingen op het scherm.

Handmatig kan ook, en het is nauwelijks meer werk. Open `~/.claude/settings.json` en zet onder `env` twee velden:

```json
{
  "env": {
    "ANTHROPIC_BASE_URL": "https://api.z.ai/api/anthropic",
    "ANTHROPIC_AUTH_TOKEN": "je-z-ai-sleutel"
  }
}
```

De sleutel maak je aan op de API Keys-pagina van je Z.ai-account. Meer is het niet: Claude Code stuurt zijn verzoeken vanaf nu naar Z.ai in plaats van naar Anthropic.

## De valkuil die de meeste tijd kost

Z.ai heeft twee endpoints en ze zijn níét uitwisselbaar.

Heb je een Coding Plan, dan hoort je verkeer naar het coding-pad `/api/coding/paas/v4`. Het algemene pad `/api/paas/v4` is voor gewone API-credits en accepteert je Coding Plan niet. Krijg je authenticatie- of quotafouten terwijl je sleutel gewoon klopt, dan is dit vrijwel altijd de oorzaak.

## Wat de nieuwe prijsstructuur betekent

Hier is een verandering die de moeite van het lezen waard is voordat je overstapt. De plannen starten rond 18 dollar per maand, en Z.ai is overgestapt op afrekenen in credits, met een limiet per wéék.

Dat is iets anders dan een maandbudget. Bij een maandbudget kun je een drukke week compenseren met een rustige. Bij een weeklimiet niet: als je op woensdag door je ruimte heen bent, zit je tot maandag krap. Pro en Max geven respectievelijk zes en veertien keer de ruimte van Lite.

Praktisch betekent dat: kies je plan op je drukste week, niet op je gemiddelde. Wie twee dagen per maand echt doorbeukt en de rest van de tijd nauwelijks codeert, zit met Lite waarschijnlijk verkeerd — niet vanwege het maandtotaal, maar vanwege die twee dagen.

## Wanneer dit een goed idee is

Het sterkst is dit voor het volumewerk: refactors, testdekking, migraties, boilerplate, alles waar je precies weet wat er moet gebeuren en het vooral uitgevoerd moet worden. De GLM-modellen zijn nadrukkelijk gebouwd voor agentic werk — een groot doel opdelen in subtaken en die met tools uitvoeren — en in coding-benchmarks komen ze in de buurt van Claude.

Buiten coding en agent-taken zijn ze minder onderscheidend. Voor het denkwerk waarbij je de architectuur nog aan het uitvinden bent, is de goedkopere optie zelden de zuinige.

Twee dingen om vooraf te beslissen. De MIT-licentie op de GLM-modellen is echt permissief: je mag ze downloaden, commercieel gebruiken en zelf hosten, wat een reële uitweg is als je later toch alles binnenshuis wilt. Maar de gemakkelijke route loopt via een Chinese aanbieder, dus kijk waar je code heen gaat voordat je er iets gevoeligs doorheen stuurt.

Je kunt de switch trouwens gewoon uitproberen. Haal de twee env-velden weg en Claude Code praat weer met Anthropic, alsof er niets gebeurd is.
