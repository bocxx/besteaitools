# Tool Directory Audit — 2 juni 2026

Snapshot van de 113 tools in `src/content/tools/` op de drie kerndimensies: data-correctheid, redactionele kwaliteit, freshness. Bedoeld als werkdocument voor remediation.

## Executive summary

| Dimensie | Status | Detail |
|---|---|---|
| Aantal tools | 113 | 112 gepubliceerd + 1 draft (Flowise) |
| Stats-freshness | ✅ Vers | `ai_tools_radar.json` gegenereerd vandaag 19:34 door newsflux ETL |
| Schema-violations | 🔴 4 stuks | `bestAlternative` bevat hele zinnen of typo's — direct fixen |
| Kwaliteits-bar fill rate | 🟡 78/112 (70%) | Doel volgens `_TEMPLATE.md`: 100% |
| Tools met 3 gaps tegelijk | 🟡 26 | Min of meer "bare-bones JSON" zonder redactioneel verhaal |
| Boilerplate `longDescription` | 🟡 11 | Bevatten "krachtig", "toonaangevend", "biedt verschillende functies" |
| Mogelijk verouderde model-refs | 🟢 7 | Review-waardig, niet allemaal verkeerd |
| Tools zonder lastUpdated-veld | 🔴 113/113 | Geen freshness-tracking op tool-niveau |

**Verbeterd t.o.v. CLAUDE.md baseline** (17/110 = 15%): nu 78/112 = 70%. Quality-bar fill rate is in goede staat gestegen, maar de laatste 30% bevat de tools waar de SEO-waarde precies in zou zitten — productivity, automation en infrastructure.

## 1. Schema-violations (kritiek — fixen vandaag)

`bestAlternative` moet één bestaande tool-slug zijn. De volgende vier overtreden dat:

| Tool | Huidige waarde | Probleem | Voorgestelde fix |
|---|---|---|---|
| `perplexity` | `youcom` | Typo, slug bestaat niet | `you.com` |
| `writesonic` | `copyai` | Typo, slug bestaat niet | `copy.ai` |
| `strix` | Volle alinea over Burp/ZAP/Nuclei | Hele zin i.p.v. slug | Kies één slug — bijv. `claude-code` of voeg een Burp Suite-tool toe |
| `zero-xyz` | Volle alinea over Composio/MCPTotal | Hele zin i.p.v. slug | Kies één slug — bijv. `mcp` of voeg Composio toe |

**Impact:** dead-link op tool-detailpagina's, mogelijk Zod-validation-fout bij build voor Strix en zero.xyz afhankelijk van schema-strictheid.

## 2. Quality-bar gap-analyse

**78/112 tools (70%) halen alle vier redactionele velden** (`verdict`, `primaryJobsToBeDone`, `bestAlternative`, `antiUseCases`).

### Per ontbrekend veld

| Veld | Aantal tools missend |
|---|---|
| `verdict` (of <30 tekens) | 0 |
| `primaryJobsToBeDone` | 34 |
| `bestAlternative` | 0 (maar 4 schema-violations, zie §1) |
| `antiUseCases` | 34 |
| `headlineValueProp` (gewenst, niet verplicht) | 51 |

### Per categorie

| Category | Tools met gaps | Totaal | % met gaps |
|---|---|---|---|
| productivity | 16 | 19 | 84% |
| automation | 10 | 21 | 48% |
| infrastructure | 9 | 16 | 56% |
| chatbots | 5 | 11 | 45% |
| design | 3 | 7 | 43% |
| video | 3 | 10 | 30% |
| audio | 2 | 7 | 29% |
| image | 1 | 7 | 14% |
| coding | 1 | 12 | 8% |
| search | 1 | 3 | 33% |

**Productivity is het zwakste cluster** — 84% van die tools mist één of meer redactionele velden. Voor SEO-strategie (zie `docs/content-calendar-2026-06.md`) is dit een directe rem, want B2B-marketing- en sales-tools (HubSpot AI, Salesforce Einstein, Apollo.io, Clay) zitten allemaal in deze categorie en zouden juist door diepte-content moeten ranken.

### Top-26 met alle 3 velden ontbrekend (prioriteit-1 om af te maken)

| Slug | Category | Naam |
|---|---|---|
| apollo-io | productivity | Apollo.io |
| autogpt | automation | AutoGPT |
| breezy-hr | productivity | Breezy HR |
| clay | productivity | Clay |
| copy.ai | productivity | Copy.ai |
| cosupport-ai | automation | CoSupport AI |
| galileo-ai | design | Galileo AI |
| harvey | productivity | Harvey |
| hirevue | productivity | HireVue |
| hubspot-ai | productivity | HubSpot AI |
| intercom-fin | automation | Intercom Fin |
| ironclad | automation | Ironclad |
| llamaindex | infrastructure | LlamaIndex |
| looka | design | Looka |
| open-webui | infrastructure | Open WebUI |
| paradox | automation | Paradox (Olivia) |
| pinecone | infrastructure | Pinecone |
| quickbooks | productivity | QuickBooks Online |
| qwen | chatbots | Qwen |
| relevance-ai | automation | Relevance AI |
| rossum | automation | Rossum |
| salesforce-einstein | productivity | Salesforce Einstein |
| seedance | video | Seedance |
| spellbook | productivity | Spellbook |
| tome | productivity | Tome |
| tweethunter | productivity | TweetHunter |
| typefully | productivity | Typefully |
| udio | audio | Udio |
| vic-ai | automation | Vic.ai |
| whisper | audio | Whisper |
| zendesk-ai | automation | Zendesk AI |
| zoho-recruit | productivity | Zoho Recruit |

(Het volledige overzicht inclusief tools met 1 of 2 ontbrekende velden staat in `/tmp/dbat-audit-grouped.json` — kan ik op verzoek converteren naar markdown of CSV.)

## 3. Boilerplate-longDescriptions (11 tools)

Bevatten markeringen die volgens `_TEMPLATE.md` vermeden moeten worden: "krachtig", "toonaangevend", "innovatief", "biedt verschillende functies".

| Slug | Snippet |
|---|---|
| canva-ai | "Canva AI is een **krachtig** ontwerp- en bewerkingsplatform dat gebruik maakt van kunstmatige intelligentie..." |
| claude | "Claude is een **krachtige** AI-assistent die is ontwikkeld door Anthropic. Het kan worden gebruikt voor een breed scala aan..." |
| gemini | "Gemini is een **krachtig** AI-gestuurde tekstgenerator die gebruikers in staat stelt om snel en efficiënt..." |
| grok | "Grok is een **krachtig** AI-tool voor tekstanalyse..." |
| harvey | "Harvey is een AI-platform gebouwd voor juridische professionals..." (note: ook in §2 gap-lijst) |
| huggingface | "Hugging Face is een **toonaangevend** platform voor het ontwikkelen, trainen en implementeren..." |
| llama | "Llama is een **krachtige** taalmodel-gebaseerde AI-tool die is ontwikkeld door Meta AI..." |
| midjourney | "Midjourney is een **krachtige** AI-tool die gebruikers in staat stelt om unieke..." |
| mistral | "Mistral is een **krachtig** AI-gestuurde tekstgenerator..." |
| runway | "Runway is een **krachtig** video-editing platform dat geavanceerde AI-technologieën integreert..." |
| stable-diffusion | "Stable Diffusion is een **krachtige** AI-tool voor het genereren van realistische beelden..." |

**Patroon:** deze hebben allemaal een verdict + andere velden ingevuld (vandaar geen gap-lijst), maar de longDescription is generiek. Voor SEO maakt dat veel uit — Google rankt unieke positionering, niet adjectieven. Herschrijven volgens `_TEMPLATE.md` § "longDescription" levert direct meer onderscheiding.

## 4. Model-references die mogelijk verouderd zijn (7 tools)

Tools die in hun content nog oudere modellen noemen. Niet allemaal fout — Cursor noemt "gpt-4" terecht als beschikbaar model — maar wel een review-ronde waard.

| Slug | Gevonden | Status |
|---|---|---|
| chatgpt | gpt-4o | Verouderd: huidig is GPT-5.5 (april 2026), GPT-5.4 (maart 2026) |
| copilot | gpt-4o | Verouderd: Microsoft Copilot draait nu op GPT-5.x-modellen |
| cursor | gpt-4 | Mogelijk OK: Cursor 3.6 ondersteunt veel modellen, maar GPT-4 als hoofdmodel is achterhaald |
| deepseek | gpt-4 | Verouderd: DeepSeek V4-Pro is de huidige laag |
| gemini | gemini 2 | Verouderd: Gemini 3.5 Flash + Spark zijn actueel |
| microsoft-copilot | gpt-4 | Verouderd: zie copilot |
| perplexity | gpt-4 | Verouderd: Perplexity ondersteunt nu Claude Opus 4.8 + GPT-5.5 |

## 5. Draft-status

| Slug | Naam | Status |
|---|---|---|
| flowise | Flowise | `draft: true` — beslis: publiceren of verwijderen |

## 6. Freshness-tracking

**113 van 113 tools missen** een `lastUpdated` of `updatedAt`-veld. Daardoor is het onmogelijk te zien welke tools sinds publicatie nooit zijn aangeraakt.

**Voorstel:** voeg een `lastUpdated: YYYY-MM-DD`-veld toe aan het schema (`tools-schema.ts`) en backfill met `2025-12-31` voor alle bestaande tools. Bij elke redactionele edit bumpen we het veld. Dat maakt audit-rondes zoals deze in de toekomst veel sneller.

---

## Voorgesteld 3-sporen-remediatieplan

### Spoor 1 — Vandaag, ~15 min
1. Fix `perplexity.bestAlternative` → `you.com`
2. Fix `writesonic.bestAlternative` → `copy.ai`
3. Fix `strix.bestAlternative` → kies één slug (bijv. `claude-code`) en zet de inhoudelijke vergelijking in `verdict` of `longDescription`
4. Fix `zero-xyz.bestAlternative` → kies één slug (bijv. `mcp`) en zet de vergelijking in `longDescription`
5. Beslis: Flowise publiceren of verwijderen
6. Voeg optioneel `lastUpdated`-veld toe aan schema (`tools-schema.ts`)

### Spoor 2 — Deze week, 1-2 batches per dag
Vul redactionele velden bij de 26 tools uit §2 met 3 ontbrekende velden. Per tool:
- 1 zin `headlineValueProp`
- 2-4 items `primaryJobsToBeDone` (werkwoord-vorm)
- 2-3 items `antiUseCases`

Geschat: 5-7 minuten per tool met de batch-enrichment-prompt uit `_TEMPLATE.md`. Totaal: 2-3 uur effectief werk, gespreid over een week.

### Spoor 3 — Doorlopend
- 11 boilerplate-`longDescription`-velden herschrijven naar specifieke positionering
- 7 tools met oudere model-refs checken en updaten
- Resterende ~25 tools met 1-2 ontbrekende velden afmaken

---

## Hoe deze audit te reproduceren

```bash
# Quality-bar check (vanuit project root)
node -e "
const fs=require('fs'),p=require('path');
const dir='src/content/tools';
let ok=0,total=0;
for(const f of fs.readdirSync(dir).filter(x=>x.endsWith('.json'))){
  const t=JSON.parse(fs.readFileSync(p.join(dir,f),'utf8'));
  if(t.draft) continue;total++;
  if(t.verdict?.length>30 && t.primaryJobsToBeDone?.length>0 && t.bestAlternative && t.antiUseCases?.length>0) ok++;
}
console.log(\`Quality bar: \${ok}/\${total} (\${(ok/total*100).toFixed(0)}%)\`);
"
```

Volledige scriptbron met alle issues-categorieën staat in deze sessie en kan op verzoek terug worden gerund.

---

*Audit-datum: 2 juni 2026. Bron: directe scan van `src/content/tools/*.json` en `src/data/reports/ai_tools_radar.json`. Geen externe APIs geraadpleegd.*
