# Fact-check playbook

Tools veranderen sneller dan publicaties. Een feature die gisteren in de Free-tier zat, kan vandaag achter Pro zitten. Een model-naam die we vorige maand schreven kan zijn vervangen. Een API-endpoint kan gewijzigd zijn. Voor DBAT-tutorials geldt daarom: **elke feitelijke claim wordt geverifieerd tegen een primaire bron voor commit, geen uitzondering.**

## Hoogrisico-claim-categorieën

Hieronder zes categorieën waarop we historisch vaak fouten zagen. Markeer ze tijdens schrijven mentaal of letterlijk (HTML-comment `<!-- FACT -->`) en loop ze in de fact-check-ronde één voor één na.

### 1. Pricing-claims

Elk getal met een muntteken of het woord "gratis" / "betaald" / "Pro" / "Enterprise".

**Voorbeeld:**
> Cursor Pro kost $20 per maand. ([Bron: Cursor pricing](https://cursor.com/pricing))

**Verificatie:**
- WebSearch: `<tool> pricing site:<tool-domein>`
- Open vendor-pricing-pagina, check huidige prijs
- Let op: kortingen, free trials, regionale prijzen, jaarbetaling-discount

**Veelvoorkomende fout:** US-prijs noteren zonder noteren dat EU-prijs vaak inclusief BTW hoger is. Liever: "$20 per maand (Cursor pricing); in de EU kom je inclusief BTW op ongeveer $24."

### 2. Feature-claims

"X kan Y", "X ondersteunt Z", "X integreert met W".

**Voorbeeld:**
> BugBot scant pull requests automatisch op bugs. ([Bron: Cursor changelog 1.0](URL))

**Verificatie:**
- Vendor-changelog, release-notes of officiële product-pagina
- Liefst datum-stempel ("sinds versie 1.0 van april 2026")
- Test waar mogelijk zelf — als we de feature niet kunnen verifiëren, valt de hoek af

**Veelvoorkomende fout:** een feature beschrijven die in de beta zit alsof hij algemeen beschikbaar is. Vermijd: schrijf "in beta sinds X" of "voor Pro-gebruikers" als de scope beperkt is.

### 3. Model-namen en versies

"Claude 4 Sonnet", "GPT-4o", "Gemini 2.5", "Cursor 1.0".

**Verificatie:**
- Vendor-docs (anthropic.com/news, openai.com/blog, blog.google)
- Anthropic-modellen: check https://docs.anthropic.com/en/docs/about-claude/models
- OpenAI-modellen: check https://platform.openai.com/docs/models

**Veelvoorkomende fout:** verouderde versie-nummers. "Claude 3.5 Sonnet" is verouderd als we het over Claude 4 hebben. Check expliciet welke versie *vandaag* current is.

### 4. Datums en lanceringsmomenten

"Anthropic lanceerde X op Y", "sinds februari 2026", "deze week kwam Z uit".

**Verificatie:**
- Persberichten met datumstempel
- Tweets van vendor-accounts met datum
- Release-pagina's

**Veelvoorkomende fout:** "deze week" wordt over tijd onhoudbaar. Liever: schrijf de datum letterlijk ("op 23 april 2026"), dan blijft het artikel ook over drie weken kloppen.

### 5. Vergelijkingen tussen tools

"Tool X is sneller dan Y", "Z heeft meer integraties dan W".

**Verificatie:**
- Beide vendor-sites checken voor de claim
- Onafhankelijke benchmarks (vaak op MMLU, LMSYS, etc.) — link naar de bron
- Liever afzwakken dan absoluut beweren: "in onze tests scoort X iets beter op [specifieke taak]"

**Veelvoorkomende fout:** absoluut claimen wat in werkelijkheid contextafhankelijk is. "Claude is beter dan ChatGPT" is bijna nooit waar over de hele linie — afbakenen per taak.

### 6. Pricing- en feature-status van EU / NL specifiek

"Beschikbaar in Nederland", "EU-compliant", "GDPR-vriendelijk".

**Verificatie:**
- Vendor's data-residency-pagina
- AVG/GDPR-claims op de privacy-policy
- Voor enterprise features: vaak achter sales-paywall — verifieer via een case study of klant-quote

**Veelvoorkomende fout:** aannemen dat een US-tool zonder meer GDPR-compliant is. Liever schrijven: "Voor GDPR-compliance heeft vendor X een EU-data-residency-optie op het Enterprise-plan; lagere tiers gebruiken US-hosting."

## De fact-check-ronde — werkproces

Na de eerste draft, vóór de pre-commit checks:

**Stap 1: Identificeer alle feit-zinnen.**

Lees terug en markeer elke zin met een concrete claim: datum, getal, naam, vergelijking, status. Een schatting: een micro-tutorial van 800 woorden heeft typisch 8-15 zulke zinnen.

**Stap 2: Verifieer met WebSearch per claim.**

Per claim, één WebSearch tegen de primaire bron:

```
WebSearch: "Cursor BugBot release date 2026 site:cursor.com"
WebSearch: "Anthropic Claude Cowork pricing Pro EU"
WebSearch: "Perplexity Comet Pro tier launch"
```

**Stap 3: Corrigeer of zwak af.**

Per claim, drie uitkomsten:

- **Bevestigd** → zin staat zo, voeg bronvermelding toe `([Bron: Naam](URL))`
- **Verkeerd** → corrigeer naar de juiste waarde
- **Onverifieerbaar** → drie opties:
  - **Schrappen** — als de claim niet essentieel is
  - **Afzwakken** — "lijkt erop", "gebruikersrapporten suggereren", "in onze test"
  - **Markeren als unverified** — alleen als context cruciaal is en je expliciet aangeeft dat de bron beperkt is

**Stap 4: Voeg primaire bronnen toe aan ## Bronnen.**

Niet elke bronvermelding hoeft in de Bronnen-sectie te herhalen, maar de 2-4 belangrijkste primaire bronnen wel.

## Correctie-patronen

Veelvoorkomende correcties met voor/na:

**Te absoluut → afgezwakt:**
- *Voor:* "Cursor is sneller dan elke andere AI-editor."
- *Na:* "In onze tests voelde Cursor sneller dan Windsurf op grote refactors. Voor kleine inline-suggesties zijn ze vergelijkbaar."

**Vage datum → exact:**
- *Voor:* "Onlangs lanceerde Anthropic Cowork."
- *Na:* "Anthropic lanceerde Cowork op 12 januari 2026 als research preview ([Bron: simonwillison.net](URL))."

**Verouderde versie → current:**
- *Voor:* "Claude 3.5 Sonnet is het beste model voor lange teksten."
- *Na:* "Claude 4 Sonnet is sinds februari 2026 het current vlaggenschip voor lange teksten."

**Onverifieerbare claim → afgezwakt:**
- *Voor:* "Cursor heeft inmiddels 500.000 gebruikers."
- *Na:* "Cursor's gebruikersaantal groeit snel — vendor publiceert geen recente cijfers, maar de Series B-funding suggereert significante schaal." (Of: schrap het cijfer als niet essentieel.)

## Context-scope — wat al publiek is maar niet in je draft staat

Naast claim-verificatie ("klopt wat ik schreef?") doe je één korte tweede ronde: **"is er publiek beschikbaar materiaal rond deze tool dat ik niet heb opgenomen, en dat de tutorial sterker had gemaakt?"**

Geleerd uit een terugblik op artikelen van 1 juni 2026: de exacte naam van een Capstone-opdracht ("Kaggriculture"), de harde deadline (30 juni 23:59 PT), en een verlopen Microsoft Copilot-promo (€15,60, eindigde 30 maart) waren allemaal publiek bekend op het moment van schrijven, maar niet meegenomen. Resultaat: tutorials die generiek aanvoelden waar ze concreet hadden kunnen zijn.

**Extra WebSearch-queries die deze scope dekken:**

1. `<tool> changelog <maand> 2026` — vangt parallelle feature-releases die de hoek versterken
2. `<tool> roadmap <maand> 2026` — vangt aangekondigde-maar-niet-uitgekomen features
3. `<tool> promo OR discount <jaar>` — vangt actieve of net-verlopen kortingen
4. **Vendor-pagina één keer letterlijk lezen** op exacte productnamen, deadlines, beperkingen — niet alleen de samenvatting van een nieuws-site

Tweede ronde is meestal 60 seconden investering. Resultaat:
- **Niets nieuws** → niets doen.
- **Concrete naam of deadline** → toevoegen aan tutorial.
- **Verlopen promo of aangekondigde verhoging** → expliciet noemen ("deze actie liep af op X; reken nu op de reguliere prijs").
- **Parallelle launch** → mini-link of side-note opnemen.

## Pre-commit fact-check-checklist

Vóór elk commit-verzoek:

- [ ] Elke pricing-claim heeft een bronvermelding óf is afgezwakt
- [ ] **Prijs-claims expliciet gecheckt op verlopen promo's of aangekondigde verhogingen** (€15,60 vs €28-pattern)
- [ ] Elk getal (gebruikers, prijzen, dagen, percentage) heeft een bron óf is afgezwakt
- [ ] Elke feature-claim is geverifieerd tegen vendor-docs of release notes
- [ ] Elke model-naam is de huidige versie (gecheckt vandaag)
- [ ] Elke datum is exact (geen "vorige week", "onlangs" — daar staat de werkelijke datum)
- [ ] Elke vergelijking tussen tools is afgebakend per taak/use case
- [ ] Elke EU/NL-specifieke claim is geverifieerd
- [ ] Alle inline-bronvermeldingen hebben het format `([Bron: Naam](URL))`
- [ ] 2-4 primaire bronnen staan in `## Bronnen`
- [ ] Geen bron is verzonnen (alle URLs daadwerkelijk getest of via vendor-bron)
- [ ] **Context-scope-ronde gedaan**: vendor-pagina één keer letterlijk gelezen op productnamen, deadlines en exacte voorwaarden; minimaal één open WebSearch buiten je eigen claims

## Wat te doen bij twijfel

**Als je twijfelt of een claim verifieerbaar is**: zwak af. Een afgezwakte claim die klopt is altijd beter dan een sterke claim die misschien niet klopt.

**Als de vendor-bron iets anders zegt dan een populair blogartikel**: vendor wint. Pers maakt fouten, vendor publiceert de waarheid over eigen product.

**Als de vendor-bron iets zegt wat aantoonbaar onwaar is**: dat gebeurt zelden, maar wel — flag het in het artikel ("Vendor claimt X; in onze tests zagen we Y"). Niet stilzwijgend doorgaan.

**Als de fact-check een hele sectie laat sneuvelen**: schrap die sectie. Een artikel met één zwak punt is beter dan een artikel met één onwaarheid.

## Een laatste les

De grootste rep-risico voor een tools-directory is niet trage rankings of dunne content — het is publicaties met fouten in pricing of feature-claims. Lezers vertrouwen ons om de complexe AI-stack te navigeren. Eén pricing-fout die hen $200 kost, kost ons hun vertrouwen permanent. Fact-check is daarom niet optioneel, niet "nice to have", maar de hoofddiscipline van de skill.

Liever vandaag geen artikel dan vandaag een artikel met een verkeerd cijfer.
