# Cross-domain link naar hetlaatsteainieuws.nl

Elk DBAT-tutorial bevat **één** verplichte cross-domain link naar `hetlaatsteainieuws.nl` — een Nederlandstalige AI-nieuws-zustersite met bredere categorieën en een meer journalistieke stem. Het doel: gedeeld autoriteits-signaal, lezers die op het ene domein landen kunnen de bredere context op het andere vinden.

## URL-patroon

Volledige URL met categorie-prefix (let op: dit verschilt van DBAT zelf):

```
https://hetlaatsteainieuws.nl/<category>/<slug>
```

**Belangrijk verschil met interne DBAT-links:**
- DBAT-intern: `/nieuws/<slug>` (geen categorie-prefix)
- HLN-extern: `/<category>/<slug>` (mét categorie-prefix)

Voorbeelden:
- `https://hetlaatsteainieuws.nl/ai-tutorials/claude-voor-beginners-eerste-gesprek`
- `https://hetlaatsteainieuws.nl/ai-tools/chatgpt-claude-gemini-copilot-welke-past-bij-jou`
- `https://hetlaatsteainieuws.nl/ai-deep-dives/ai-agents-2026-wat-zijn-ze`

## De zeven HLN-categorieën

Voor reference (volgorde + gebruik):

| Category | Wanneer link je hierheen vanuit DBAT? |
|----------|---------------------------------------|
| `ai-nieuws` | Marktontwikkelingen, productlanceringen op meta-niveau |
| `ai-tutorials` | Beginnersgidsen ("Claude voor beginners", "Prompten voor beginners") — vaak het meest relevant als prerequisite-link |
| `ai-tools` | Tool-vergelijkingen, "beste X van 2026", keuzehulpen |
| `ai-deep-dives` | Technische / conceptuele diepgang (RAG, agents, architectuur) |
| `ai-innovatie` | Wat-is-AI-conceptueel, mythes, lange lijnen |
| `ai-ethiek` | Deepfakes, bias, verantwoorde AI, deepfake-detectie |
| `ai-beleid` | EU AI Act, GDPR, overheidsbeleid |

## Beschikbare HLN-artikelen (snapshot mei 2026)

Veel van deze zijn geschikt als cross-link uit een DBAT-tutorial. Per categorie de meest gelinkte:

### `ai-tutorials` — beginners + prerequisites
- `/ai-tutorials/claude-voor-beginners-eerste-gesprek` — Claude basisgids (ideaal als prerequisite voor Claude-tutorials)
- `/ai-tutorials/chatgpt-voor-beginners-eerste-gesprek` — ChatGPT basisgids
- `/ai-tutorials/prompten-voor-beginners-betere-ai-vragen` — algemene prompt-skills
- `/ai-tutorials/ai-agents-praktijk-5-taken-automatiseren` — agents-praktijk
- `/ai-tutorials/ai-voor-je-sollicitatie-cv-motivatiebrief-linkedin` — AI voor jobsearch

### `ai-tools` — vergelijkingen en keuzehulpen
- `/ai-tools/chatgpt-claude-gemini-copilot-welke-past-bij-jou` — hoofdvergelijking (perfect als context-link uit elke tool-tutorial)
- `/ai-tools/beste-ai-coding-assistants-2026` — coding-tools overzicht
- `/ai-tools/microsoft-copilot-for-health-wat-is-het` — Copilot in specifieke vertical

### `ai-deep-dives` — technische diepgang
- `/ai-deep-dives/ai-agents-2026-wat-zijn-ze` — wat zijn agents eigenlijk
- `/ai-deep-dives/hoe-werkt-rag-uitgelegd` — RAG conceptueel
- `/ai-deep-dives/ai-inferentie-in-2026-van-tokens-tot-watts` — inference-economie
- `/ai-deep-dives/lokale-llm-draaien-mac` — local LLMs
- `/ai-deep-dives/cybersecurity-skills-voor-ai-agents` — security context
- `/ai-deep-dives/openai-pentagon-deep-dive` — OpenAI defense

### `ai-nieuws` — marktbewegingen
- `/ai-nieuws/openai-kondigt-gpt-5-aan`
- `/ai-nieuws/anthropic-claude-4-europa`
- `/ai-nieuws/deepseek-v4-pro-prijsverlaging-75-procent`
- `/ai-nieuws/notion-ai-update-2026`
- `/ai-nieuws/claude-code-desktop-grote-update`
- `/ai-nieuws/ai-voor-mkb-2026-5-kansen`
- `/ai-nieuws/ai-draait-op-miljarden-subsidie-en-botst-met-stroomnet`

### `ai-innovatie`
- `/ai-innovatie/kunstmatige-intelligentie-wat-is-het-nu-echt-met-mythes`
- `/ai-innovatie/staat-van-open-source-ai-2026`
- `/ai-innovatie/wat-is-een-npu-en-waarom-in-elke-ai-laptop`

### `ai-ethiek`
- `/ai-ethiek/ai-hallucinaties-herkennen`
- `/ai-ethiek/deepfakes-2026-nep-video-herkennen`
- `/ai-ethiek/ai-ethiek-hoe-houden-we-ai-menselijk`

### `ai-beleid`
- `/ai-beleid/eu-ai-act`
- `/ai-beleid/eu-ai-act-toezichthouders-nederland-mkb`
- `/ai-beleid/gpt-nl-ai-fabriek-eu-ai-act-nederland`

## Hoe kies je welk HLN-artikel?

Drie vragen:

1. **Wat is de prerequisite voor mijn DBAT-tutorial?** Als je gids ervan uitgaat dat de lezer weet wat Claude is — link naar `claude-voor-beginners-eerste-gesprek`. Als je uitgaat van prompt-basis — `prompten-voor-beginners-betere-ai-vragen`.

2. **Wat is de bredere context die lezers nuttig vinden?** Een Cursor-tutorial → link naar `beste-ai-coding-assistants-2026` voor wie nog kiest. Een Claude-feature → link naar de hoofdvergelijking `chatgpt-claude-gemini-copilot-welke-past-bij-jou`.

3. **Wat is de "wat is dit"-laag?** Een agents-tutorial → link naar `ai-agents-2026-wat-zijn-ze` voor wie de term niet kent. Een lokaal-LLM-tutorial → `lokale-llm-draaien-mac`.

## Waar in het artikel plaats je de cross-link?

Twee logische plekken:

**Optie A — In een Beginner-tip blockquote (sterkst voor prerequisite-links):**

```markdown
> **💡 Beginner-tip:** Nog nooit met Claude gewerkt? Begin dan eerst bij onze [vergelijking tussen Claude en ChatGPT](https://hetlaatsteainieuws.nl/ai-tools/chatgpt-claude-gemini-copilot-welke-past-bij-jou) om te zien of Claude bij jou past.
```

**Optie B — In een context-paragraaf (sterkst voor "bredere achtergrond"-links):**

```markdown
Voor de bredere context over hoe agents zich onderling verhouden, geeft onze deep-dive [AI-agents in 2026: wat zijn ze en wat kun je er echt mee?](https://hetlaatsteainieuws.nl/ai-deep-dives/ai-agents-2026-wat-zijn-ze) een werkbare landkaart.
```

**Optie C — Aan het einde, als vervolgactie:**

```markdown
Wie deze tutorial heeft afgerond en het breder wil benutten, vindt in onze gids [AI-agents in de praktijk: vijf taken automatiseren](https://hetlaatsteainieuws.nl/ai-tutorials/ai-agents-praktijk-5-taken-automatiseren) een logische volgende stap.
```

## URL-format — checklist

Voor elke cross-link, check:

- [ ] Absolute URL `https://hetlaatsteainieuws.nl/...` (geen `//` of relatieve paden)
- [ ] Categorie-prefix klopt (`/ai-tutorials/`, niet `/tutorials/`)
- [ ] Geen trailing slash op de URL (dus `/<slug>`, niet `/<slug>/`)
- [ ] Anchor-tekst is beschrijvend (niet "lees meer", niet "klik hier")
- [ ] Slug bestaat — verifieer bij twijfel:
  ```bash
  ls ~/Projects/DEPLOYED/hetlaatsteainieuws-v2/src/content/nieuws/<slug>.md
  ```

## Wederkerigheid — overweeg een omgekeerde link

DBAT linkt naar HLN; soms is het waardevol dat HLN ook naar het DBAT-stuk linkt. Daarvoor gebruik je `hln-nieuws-article` skill — die heeft een eigen cross-domain-reference voor links de andere kant op. Bij hoog-traffic-DBAT-stukken (zoals `claude-instellen-1-dag-6-tools`) is wederkerige verwijzing aan te bevelen; bij dagelijkse kleine tutorials niet automatisch.

## Wat NIET doen

- **Meer dan één cross-link per DBAT-artikel** — verdunt het signaal. Eén goed gekozen link werkt sterker dan drie.
- **Linken naar HLN-artikelen die nog niet bestaan** — verifieer altijd dat de slug aanwezig is.
- **Cross-link in de Bronnen-sectie zetten** — die is voor primaire externe bronnen (vendors, persberichten), niet voor zusterssites.
- **Linken naar een HLN-artikel dat draft/unpublished is** — check `draft: false` in de frontmatter van het HLN-bestand vóór gebruik.

## Een laatste opmerking

De cross-link is geen formaliteit. Lezers die op DBAT landen voor een tool-tutorial, hebben vaak een bredere context-vraag die thuishoort op HLN. Eén goed gekozen verwijzing is daarvoor genoeg — meer voelt als ranking-bait.
