# Evergreen-modus + freshness-onderhoud

Een evergreen-artikel is een stuk waarvan de waarde niet verjaart: het trekt maanden tot jaren na publicatie nog lezers en AI-citaties, omdat zowel het onderwerp als de invalshoek niet aan een nieuwsmoment hangen. Dit is het tegenovergestelde van de radars en de meeste `ai-nieuws`-items. Gebruik deze modus bij pillars, "wat is X"-uitleg, how-to's en naslag.

> Lees dit bestand voor je een evergreen-pillar schrijft of een bestaand stuk tot evergreen herstructureert. Voor gewone nieuws-items geldt de standaard-template.

---

## De zes kenmerken van een evergreen

1. **Een onderwerp dat niet afloopt** — het beantwoordt een stabiele, terugkerende vraag (de "zoekt iemand hier over 18 maanden nog op?"-test).
2. **Vraag-gedreven, niet event-gedreven** — vertrekt vanuit een blijvende lezersbehoefte, niet vanuit "er gebeurde deze week iets".
3. **Concept boven instantie** — legt het onderliggende mechanisme uit (het waarom en hoe), niet alleen het nieuwste voorbeeld.
4. **Zelfstandig en volledig** — een nieuwkomer krijgt over twee jaar de volle waarde zonder voorkennis van recent nieuws.
5. **Diepte op pillar-niveau** — grondig genoeg om hét antwoord te zijn.
6. **Onderhoudbaar van ontwerp** — niet "één keer schrijven en klaar", maar "de moeite waard om te onderhouden". Dit kenmerk wordt het vaakst gemist.

### De evergreen-test (vóór je begint)

1. Bestaat de vraag los van enig nieuwsmoment?
2. Begrijpt iemand het zonder recent nieuws te kennen?
3. Wat in dit stuk is over een jaar nog waar — en wat niet?
4. Kan ik het bederfelijke deel isoleren zodat updaten triviaal is?

Kun je geen blijvende vraag aanwijzen → het hoort in `ai-nieuws`, niet als pillar.

---

## Verplicht: de kern/bederf-split

Evergreen betekent niet dat alle feiten tijdloos zijn — het betekent dat je de duurzame kern scheidt van de bederfelijke laag, zodat updaten triviaal blijft.

- **Duurzame kern** (concepten, mechanismen, principes, kaders): tijdloos geschreven, link-arm, met alléén absolute datums. Geen versienummers, prijzen of "nieuwste" in de uitleg-zinnen.
- **Bederfelijke laag** (versienummers, prijzen, "krachtigste model", actuele aantallen): verplicht in één sectie aan het eind:

```markdown
## Stand van zaken — bijgewerkt YYYY-MM-DD

Alles hierboven blijft staan, ongeacht welk model er draait. De cijfers en versies
hieronder zijn de bederfelijke laag — die ververs je hier, zonder de uitleg eromheen
aan te raken.

| Onderwerp | Stand |
| --- | --- |
| ... | ... |
```

FAQ-antwoorden die naar prijzen/versies verwijzen, verwijzen naar deze box ("zie *Stand van zaken*") in plaats van zelf cijfers te noemen — anders verplaats je het bederf gewoon naar de FAQ. Het wekelijkse onderhoud raakt voortaan alléén deze box.

---

## De digest-DNA-detector

Je sterkste evergreens groeien níét uit een digest. Wie een evergreen recyclet uit digest-materiaal, erft de schrijfgewoontes die content laten verjaren. Scan elk concept dat je als evergreen wilt publiceren op deze zes vingerafdrukken:

1. **Recency als haak** — de intro verwijst naar wannéér iets gebeurde i.p.v. naar wat de lezer wil weten.
2. **Nieuwste instantie staat in voor het concept** — opent met "het nieuwe model X" i.p.v. het tijdloze principe.
3. **Relatieve tijd** — "deze week", "begin dit jaar", "onlangs", "de nieuwste".
4. **Nieuwscyclus als structuur** — secties mappen op gebeurtenissen i.p.v. op deelvragen van het onderwerp.
5. **Bron-van-de-week-dichtheid** — elke claim hangt aan één recente bron, verweven door de kernzin.
6. **Samengesteld, niet gecomponeerd** — de bindende logica is "gebeurde dezelfde week" i.p.v. "hoort bij elkaar om een vraag te beantwoorden".

**Beslisregel:** één marker in de lead → herschrijven. Markers verspreid door de body → het is eigenlijk nieuws; publiceer als `ai-nieuws`, niet als evergreen. `scripts/evergreen-check.py` detecteert markers 2, 3 en deels 5 mechanisch (zie hieronder); markers 1, 4 en 6 beoordeel je met de hand.

---

## De frontmatter-velden

Markeer een evergreen-stuk met deze velden (optioneel, alleen voor evergreens):

```yaml
evergreen: true            # markeert het stuk voor freshness-onderhoud
volatility: medium         # high | medium | low → review-cadans (30 | 90 | 180 dagen)
factsCheckedAt: YYYY-MM-DD  # wanneer de bederfelijke laag voor het laatst is geverifieerd
reviewEvery: 90            # optioneel: override van de cadans in dagen
watch:                     # entiteiten waarvan een wijziging een review triggert
  - "cursor-pricing"        # bv. de tool waar de gids aan hangt
  - "cursor-features"
```

Zie ook `references/frontmatter.md` voor de plaatsing in het volledige schema.

---

## Het wekelijkse freshness-onderhoud

Principe: **geplande detector, handmatige fixer.** De automatisering levert een triage-lijst; de fact-check + edit + commit blijft mens-in-de-lus (de commit-grens van de skill blijft staan).

**Twee bronnen van vlaggen:**

1. **Cadans + lekkage** — `scripts/evergreen-check.py` scant alle `evergreen: true`-stukken: is `vandaag − factsCheckedAt` groter dan de cadans (uit `volatility`/`reviewEvery`)? En staan er bederfelijke markers (versies, prijzen, tijd-woorden) búíten de "Stand van zaken"-box? Puur mechanisch, geen API-kosten.
2. **Event-gedreven via de digest** — tag digest-items met dezelfde entiteiten als in `watch:`. Verschijnt er een digest-item met entiteit `anthropic-pricing`, dan worden alle evergreens die daarop `watch`-en dezelfde dag gevlagd. Hergebruikt je bestaande bronnen-scan i.p.v. een tweede crawler te bouwen.

**De flow:**

1. Wekelijks (cron/launchd/Action/n8n) → `evergreen-check.py` draait → triage-rapport.
2. Rapport landt waar je het ziet (GitHub-issue, e-mail via Resend, of Telegram).
3. Per gevlagd stuk: open met Claude Code, draai de fact-check-ronde (zie `references/fact-check.md`) op alleen de bederfelijke laag, werk de box bij, zet `factsCheckedAt` op vandaag.
4. Review + commit met toestemming.

De triage flagt ruim — false positives (een bewuste retorische "deze maand" in de lead) dismiss je met de hand. Dat is exact waarom het triage is en geen auto-edit.
