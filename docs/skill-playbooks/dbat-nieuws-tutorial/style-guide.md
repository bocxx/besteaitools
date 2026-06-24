# Style guide — de DBAT-stem

debesteaitools.nl is een Nederlandstalige praktische tool-directory. De stem is kalmer dan tech-blogs, warmer dan een Wikipedia-artikel, en altijd "jij" tegen de lezer. We zijn curator, niet verkoper — en zeker geen marketing-afdeling.

## Aanspreekvorm

**"Jij", nooit "u" of "wij".** "Jij koppelt", "jij ziet", "jij merkt". Voor het collectief: "onze test", "onze ervaring", "onze redactie" — maar nooit "wij vinden" of "in onze opinie". Curator-vorm, niet predikant.

**Geen vragen aan de lezer in het lijf.** "Heb je wel eens..." aan het begin van een alinea voelt als marketing-bait. Beter: stel het feit, en de lezer herkent zichzelf vanzelf.

## Toon: kalm, concreet, een klein beetje wrang waar het past

Drie testjes voor elke alinea:

1. **Zou een MKB'er die net begint dit kunnen lezen zonder z'n schouders op te trekken?** Te abstract, te veel jargon — herschrijf.
2. **Zou een ervaren gebruiker dit niet als kleuter behandelen voelen?** Te veel uitleg van bekende termen — schrap.
3. **Klinkt het alsof een mens dit zou zeggen tegen een collega?** Te plechtig, te onpersoonlijk — eenvoudiger.

Een licht wrange droogheid mag. "Acht uur is veel, in een week waarin je toch al achterloopt." Dat soort regels werken. Wat niet werkt: cynisme, dollende grappen, hype.

## Concreet boven abstract — altijd

**Niet:** "Een uitgebreid scala aan functionaliteiten waarmee je je productiviteit kunt verhogen."
**Wel:** "Cursor heeft vier dingen die je elders niet zo gebundeld vindt: agentic mode, BugBot, background agents en het memories-systeem."

**Niet:** "Geavanceerde integratiemogelijkheden."
**Wel:** "Verbinden met Gmail, Drive en Notion zit in de instellingen. HubSpot vereist een betaald plan."

**Niet:** "Optimaliseer je workflow."
**Wel:** "Bespaar twee klikken per mail die je niet hoeft te kopiëren naar Claude."

Vermijd modewoorden: *naadloos, krachtig, intuïtief, revolutionair, game-changer, baanbrekend*. Als de tool echt iets verandert, beschrijf je *wat* het verandert, niet dát het revolutionair is.

## Anti-AI-tells

DBAT publiceert dagelijks. Lezers herkennen AI-uitvloeiing binnen drie zinnen. Vermijd deze patronen actief:

- **Em-dashes als ritmebreuker** — soms goed, vier per alinea is een tell. Vervang door komma's of haakjes.
- **Holle bijzinnen** — "het benadrukt het belang van", "het weerspiegelt de blijvende relevantie", "het onderstreept de noodzaak" — knip ze of vervang door een werkwoord met betekenis.
- **Verticale lijsten met vetgedrukte mini-koppen** waar gewone alinea's beter werken. Een lijst van drie punten waar elk punt een paragraaf nodig heeft, is geen lijst — dat zijn drie alinea's.
- **"Het is niet X, het is Y"-patroon** — heel sterk in AI-output. Eén keer per artikel is genoeg, niet één keer per sectie.
- **"In dit artikel bespreken we..."** — schrap die hele zin. Begin gewoon.
- **"Laten we eens kijken naar..."** — idem.
- **Slot-zinnen die niets toevoegen** — "AI is een krachtige technologie die ons leven zal veranderen". Knip.

Onze gids `ai-tekst-herkennen-menselijker-schrijven` beschrijft het patroon uitgebreider. Voor DBAT-tutorials betekent het: schrijf als een collega die je iets uitlegt aan de lunch, niet als een vendor-blog die SEO scoort.

## Variatie in zinslengte

Korte zin. Korte zin. Korte zin. — wordt staccato.

Lange zinnen met meerdere bijzinnen die op elkaar volgen en op elkaar volgen en op elkaar volgen worden moeras.

Mix. Een gemiddelde alinea heeft één lange zin van 25-35 woorden, twee middellange (12-20), en eindigt soms met iets kort.

## Mini-anekdotes / "tussen-ons"-momenten

Eén of twee per artikel mag, niet als verplichting. Concreet voorbeeld werkt:

> Eerlijk: de eerste keer dat we Cursor's agentic mode aanzetten, dachten we dat het overkill was voor één bestand wijzigen. Pas bij de derde refactor over tien files werd duidelijk wat we eerder misten.

Dit doet drie dingen: het positioneert "onze ervaring" zonder pochen, het normaliseert het leerproces voor de lezer, en het lacht een beetje om de eigen aanvankelijke scepsis. Werkt prima zo lang het niet elke alinea een persoonlijk verhaal wordt.

## Blockquote-gebruik

Twee formats, minimaal één per artikel, maximaal twee:

**Beginner-tip:**
```markdown
> **💡 Beginner-tip:** [Geruststelling of context-link voor wie net begint. Vaak een verwijzing naar een prerequisite-artikel.]
```

**Gevorderden:**
```markdown
> **⚡ Gevorderden:** [Technische trade-off, sandbox-detail, of randgeval dat beginners mogen overslaan zonder iets te missen.]
```

Plaats ze gespreid — niet twee onder elkaar, niet allebei aan het einde. Een goeie verdeling: tip ergens in de tweede H2, gevorderden ergens in de vierde.

## Bronvermelding

**Feitelijke claims** sluiten af met `([Bron: Naam](URL))`. Eén bron per claim.

```markdown
De prijs is sinds februari 2026 verhoogd van $20 naar $25 per maand ([Bron: Cursor changelog](https://changelog.cursor.com/...)).
```

**Recommendations en doorverwijzingen** zijn gewone links zonder bron-wrapper:

```markdown
Onze [vergelijking tussen Claude en ChatGPT](/nieuws/claude-vs-chatgpt-vergelijking-2026) is een logisch beginpunt.
```

Verzin geen bronnen. Als je geen bron hebt voor een claim, zwak hem af ("lijkt erop", "gebruikersrapporten suggereren") of laat hem weg.

## Typografie en formatting

- **Markdown puur** — geen HTML behalve in expliciete longform-uitzonderingen op verzoek.
- **Inline code** voor command-line, paden, bestandsnamen, knoppen: `` `Settings → Integrations` ``, `` `.cursorrules` ``, `` `npm run deploy` ``.
- **Codeblokken** met taal-prefix voor scripts: ` ```bash `, ` ```python `, ` ```yaml `.
- **Geen emoji's** in lopende tekst — wel toegestaan in blockquote-prefixes (💡, ⚡) en zo nu en dan voor visuele markering binnen een stap, maar spaarzaam.
- **Nederlandse getallen**: geen Amerikaans komma-format. "€20 per maand" of "20 dollar per maand", niet "$20.00".

## Wat je vermijdt in toon

- **Overdreven enthousiast** — "wow", "geweldig", "verbluffend". Spaar superlatieven voor het einde, of laat ze weg.
- **Cynisch tegen vendors** — kritisch mag, ironisch ook, maar geen flame-pieces. We zijn directory, niet activist.
- **Predicerend** — "AI gaat alles veranderen", "binnen vijf jaar". Wij beschrijven wat is, niet wat zou kunnen.
- **Conclusie-paragrafen die niks zeggen** — "Cursor 1.0 is een belangrijke stap voorwaarts in de evolutie van AI-tools". Schrap of vervang door een concrete aanbeveling: "Voor wie al $20/mnd aan Copilot betaalt, is wisselen alleen logisch als BugBot het breekpunt is."

## Een vuistregel die alles samenvat

Schrijf alsof je een collega in de pauze iets uitlegt. Concreet, kort, eerlijk over wat je niet weet, één klein dropje droge humor waar het past. Geen pitch, geen waarschuwing, geen evangelisatie.

Als een alinea voelt alsof hij ook in een persbericht had kunnen staan: herschrijf.
