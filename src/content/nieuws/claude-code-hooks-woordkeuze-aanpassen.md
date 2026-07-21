---
title: "Claude Code hooks: zo vervang je irritante stopwoordjes in 4 stappen"
heroImageAlt: "Miniatuur diorama-illustratie bij artikel 'Claude Code hooks: zo vervang je irritante stopwoordjes in 4 stappen'"
description: "Claude Code noemt alles 'load-bearing'? Met een MessageDisplay-hook vervang je stopwoordjes in de output. In 4 stappen werkend, inclusief script."
publishedAt: 2026-07-20
updatedAt: 2026-07-20
author: "Redactie"
category: "gids"
tags:
  - "claude-code"
  - "hooks"
  - "anthropic"
  - "terminal"
  - "workflow"
toolSlug: "claude-code"
featured: false
draft: false
readingTime: 4
heroImage: "/images/articles/diorama-claude-code-hooks-woordkeuze-aanpassen.webp"
heroScene: "A tiny workshop where a figurine swaps word-tiles on a conveyor belt coming out of a miniature terminal screen"
keyTakeaways:
  - "Een viraal gaande blogpost van Johanna Larsson (14 juli) laat zien hoe je Claude Code's stopwoordjes als 'load-bearing' wegfiltert met een MessageDisplay-hook."
  - "De hook is een klein Python-script dat de schermtekst herschrijft via zoek-en-vervang; vier regels replacements volstaan."
  - "MessageDisplay past alleen de weergave aan: het transcript en wat Claude zelf ziet blijven ongewijzigd, dus je workflow breekt niet."
  - "Installatie: script in ~/.claude/hooks/ zetten, uitvoerbaar maken, registreren in ~/.claude/settings.json en een nieuwe sessie starten."
faq:
  - q: "Wat zijn hooks in Claude Code?"
    a: "Hooks zijn scripts die Claude Code automatisch uitvoert op vaste momenten in een sessie, bijvoorbeeld vóór een tool-actie of tijdens het tonen van een antwoord. Je registreert ze in ~/.claude/settings.json onder het hooks-blok. Ze laden bij het opstarten van een sessie, dus na een wijziging start je een nieuwe sessie. De MessageDisplay-hook uit deze gids draait telkens wanneer Claude tekst naar je scherm streamt."
  - q: "Verandert een MessageDisplay-hook wat Claude zelf leest?"
    a: "Nee. MessageDisplay is puur weergave: de hook herschrijft alleen wat op jouw scherm verschijnt via het veld displayContent. Het transcript en de context die Claude ziet houden de originele tekst, en in verbose-modus zie je ook het origineel terug. Je kunt er dus geen antwoorden mee blokkeren of het gedrag van het model mee sturen; daarvoor bestaan andere hook-events."
  - q: "Waarom zegt Claude zo vaak 'load-bearing' of 'you're absolutely right'?"
    a: "Taalmodellen hebben herkenbare lievelingsfrases die door training zijn ingesleten; bij Claude vallen 'load-bearing', 'seam' en het gretige 'you're absolutely right' op. Op de GitHub-tracker van Claude Code klagen gebruikers er al langer over. Een systeeminstructie helpt maar werkt niet waterdicht; een weergave-hook filtert de frases gegarandeerd uit beeld, want die knipt gewoon in de schermtekst."
  - q: "Hoe installeer ik een hook-script in Claude Code?"
    a: "Zet het script in ~/.claude/hooks/, maak het uitvoerbaar met chmod +x, en verwijs ernaar in ~/.claude/settings.json onder hooks met een command-entry. Start daarna een nieuwe sessie; hooks laden bij het opstarten. Werkt het niet, check dan of het pad klopt en of het script zelfstandig draait als je er JSON in pipet."
---

Wie veel met [Claude Code](/tools/claude-code) werkt, kent de tics: alles is ineens "load-bearing", elke tegenwerping opent met "you're absolutely right". Developer Johanna Larsson schreef er op 14 juli een knipoog-tutorial over die prompt viraal ging op Hacker News ([Bron: jola.dev](https://jola.dev/posts/how-to-stop-claude-from-saying-load-bearing)). Haar oplossing is serieus bruikbaar: een weergave-hook die stopwoordjes automatisch vervangt. Zo zet je hem zelf op.

## Wat doet een MessageDisplay-hook?

Claude Code kent hook-events: momenten in een sessie waarop het automatisch jouw script aanroept. Het event `MessageDisplay` vuurt telkens wanneer Claude tekst naar je scherm streamt. Jouw script krijgt dat tekstfragment binnen als JSON, mag het aanpassen, en geeft via het veld `displayContent` de vervangende tekst terug ([Bron: Claude Code-docs](https://code.claude.com/docs/en/hooks)).

Belangrijk om te weten: dit is puur cosmetisch. Het transcript en de context die Claude zelf ziet blijven origineel; alleen jouw weergave verandert. Je kunt er dus niets mee kapotmaken.

> **💡 Beginner-tip:** nooit met hooks gewerkt? Begin met deze — hij kan niets blokkeren of wijzigen aan je bestanden. Onze gids [Claude Code skills instellen](/nieuws/claude-code-skills-instellen) legt de bredere configuratiemap ~/.claude uit.

## Stap 1: maak het vervang-script

Maak het bestand `~/.claude/hooks/wordswap.sh` met deze inhoud (Python, ondanks de .sh-extensie — de shebang regelt het):

```python
#!/usr/bin/env python3
import json, re, sys

replacements = {
    "load-bearing": "essentieel",
    "seam": "koppelvlak",
    "you're absolutely right": "klopt",
    "honest take": "inschatting",
}

data = json.load(sys.stdin)
text = data.get("delta") or ""
for phrase, replacement in replacements.items():
    pattern = r"\b" + re.escape(phrase) + r"\b"
    text = re.sub(pattern, replacement, text, flags=re.IGNORECASE)

print(json.dumps({
    "hookSpecificOutput": {
        "hookEventName": "MessageDisplay",
        "displayContent": text,
    }
}))
```

Larssons origineel vervangt de frases door onzin ("load-bearing" wordt "cooked") — leuk om de irritatie weg te lachen. In het voorbeeld hierboven staan neutrale Nederlandse vervangingen; vul de `replacements`-dictionary met je eigen ergernissen.

## Stap 2: maak het script uitvoerbaar

```bash
chmod +x ~/.claude/hooks/wordswap.sh
```

## Stap 3: registreer de hook in settings.json

Voeg in `~/.claude/settings.json` dit toe aan het `hooks`-blok (of maak dat blok aan):

```json
{
  "hooks": {
    "MessageDisplay": [
      { "hooks": [ { "type": "command", "command": "$HOME/.claude/hooks/wordswap.sh" } ] }
    ]
  }
}
```

`MessageDisplay` ondersteunt geen matchers: de hook draait op elk assistent-bericht met tekst. Berichten zonder tekst (alleen tool-aanroepen) slaan vanzelf over ([Bron: Claude Code-docs](https://code.claude.com/docs/en/hooks)).

## Stap 4: start een nieuwe sessie

Hooks laden bij het opstarten. Sluit je huidige Claude Code-sessie, start een nieuwe, en vraag iets waarin een van je verboden frases zou opduiken. De vervangingen verschijnen direct in beeld.

> **⚡ Gevorderden:** het standaard-timeout voor dit event is 10 seconden. Houd het script dus licht — pure string-vervangingen zijn geen probleem, maar netwerk-calls of zware regexen op elk stream-fragment wel. En let op: `re.IGNORECASE` matcht ook binnen zinnen die je misschien wilt houden; test je patronen even los via een pipe met voorbeeld-JSON.

Dat een grap-tutorial hierover viraal gaat, zegt intussen iets over hoe herkenbaar die AI-stopwoordjes zijn geworden — over dat bredere ongemak met AI-tekst schreef hetlaatsteainieuws.nl eerder in [De hype-curve van juli](https://hetlaatsteainieuws.nl/nieuws/ai-hype-curve-juli-2026). Meer uit Claude Code halen kan daarna met onze gids over [tokens besparen met caveman-prompts](/nieuws/caveman-claude-code-tokens-besparen).

## Checklist: ben je klaar?

- [ ] `wordswap.sh` staat in `~/.claude/hooks/`
- [ ] Script is uitvoerbaar (`chmod +x`)
- [ ] `hooks`-blok met `MessageDisplay` staat in `~/.claude/settings.json`
- [ ] Nieuwe sessie gestart (hooks laden bij startup)
- [ ] Vervangingen getest met een prompt die de frase uitlokt
- [ ] Eigen replacements toegevoegd aan de dictionary

## Bronnen

- [jola.dev — How to stop Claude from saying load-bearing](https://jola.dev/posts/how-to-stop-claude-from-saying-load-bearing) (14 juli 2026)
- [Claude Code documentatie — Hooks reference](https://code.claude.com/docs/en/hooks)
- [Hacker News-discussie](https://news.ycombinator.com/item?id=48905248)
