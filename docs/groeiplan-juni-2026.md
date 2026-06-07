# Groeiplan debesteaitools.nl — juni 2026

Gebaseerd op concurrentie-onderzoek (TAAFT, Futurepedia, Toolify, FutureTools,
RankmyAI, aitoolhub.nl, wegwijsai.nl), SEO-data (DataForSEO, NL-markt) en
catalogus-gap-analyse. Datum: 6 juni 2026.

## Uitgangspositie

- **Eigen SEO**: ~62 organische bezoekers/mnd, 19 rankende keywords. Vroege fase.
- **NL-concurrentie is ook klein**: aitoolhub.nl (174 tools, dichtstbijzijnde kloon) rankt op ~5 keywords. RankmyAI (HvA) heeft autoriteit maar is een ranking, geen keuzehulp. Niemand combineert curatie + dagelijkse data + NL/EU-context.
- **Internationaal volume-model is stervende**: TAAFT verkoopt posities (PPC-bod), Futurepedia verkoopt "Verified" ($497), Toolify list alles voor $99 zonder review. Zero-click (AI Overviews ~80%) sloopt hun model. Alleen het curatie-model (FutureTools: >75% afwijzing, transparante affiliate) groeit in vertrouwen.
- **Onze structurele voordelen die niemand kan kopiëren**: verdict/antiUseCases/bestAlternative per tool (146/146), dagelijkse newsflux-data (buzz, launches, doorbraak-funnel), Nederlandse taal + EU-perspectief.

## 1. Catalogus-aanvullingen (prioriteit)

### Direct toevoegen (hoogste impact)

| Tool | Waarom | Slug | Categorie |
|---|---|---|---|
| **Gamma** | 14.700 NL-zoekopdrachten/mnd op "gamma ai" + 6.600 op "gamma app"; wij hebben géén presentatietool (Tome is dood) | `gamma` | presentations |
| **DeepL** | Dé vertaaltool van NL; categorie vertalen ontbreekt volledig | `deepl` | writing |
| **GPT-NL** | Soeverein NL-model (TNO/SURF), AVG-conform, Privacy Award; uniek NL-onderwerp, nul internationale concurrentie | `gpt-nl` | chatbots |
| **Fathom** | Beste gratis meeting-notetaker; completeert ons sterke notulen-cluster (CPC €6-15 op "ai notulen"-keywords = commercieel waardevol) | `fathom` | meeting-notes |
| **Manus** | Bekendste consumenten-agent; gat naast OpenClaw/Devin | `manus` | agents |

### Tweede ring (15)

Grammarly, QuillBot (writing) · Opus Clip, CapCut, Synthesia (video) ·
ChatGPT Atlas, Comet, Genspark (agents/browsers) · Kimi, Z.ai/GLM (chatbots) ·
Recraft, Freepik AI (image) · Elicit, Consensus (search/research) ·
tl;dv (meeting-notes) · Beautiful.ai (presentations).

### Categorie-gaten (taken zonder enig antwoord)

1. **Vertalen** — grootste instaptaak voor NL-publiek (DeepL)
2. **Presentaties** — alleen dode/brede tools (Gamma, Beautiful.ai)
3. **Shorts/clipping & mobiel video-editen** (Opus Clip, CapCut)
4. **Academisch onderzoek** (Elicit, Consensus)
5. **AI-browsers** — dé consumenten-agentcategorie van 2026 (Atlas, Comet, Dia)
6. **NL-zakelijk**: boekhouden (Boekie AI/Moneybird), juridisch NL (nu alleen US-tools)

## 2. Wat de concurrentie fout doet — en wij uitbuiten

1. **Ranking te koop** (TAAFT/Futurepedia/Toolify) → maak onze onafhankelijkheid expliciet: pagina "Hoe wij beoordelen" + "posities zijn niet te koop" in de footer en op elke toolpagina.
2. **Niemand zegt wanneer je een tool NIET moet kiezen** → onze antiUseCases zijn uniek; zet ze prominenter (eigen blok bovenaan, in meta-descriptions).
3. **Verouderde data zonder bewijs** → toon per tool een zichtbare "laatst geverifieerd"-datum (we hebben net 146/146 geverifieerd — claim die freshness!) + de live buzz-stats.
4. **Geen taakgerichte keuzehulp in NL** → de bestaande /vind-je-beste-ai-tool uitbouwen tot dé taak-wizard ("notulen maken" → 3 tools met verdict, prijs in €, NL-support). Wegwijsai bewijst de vraag met 6 tools; wij hebben er 146 met jobs-to-be-done-data.
5. **Statisch vs levend** → niemand in NL heeft een dagelijkse digest/launch radar. Uitspelen als merk ("wij zagen tool X weken vóór de pers" — doorbraak-funnel als bewijslijn).

## 3. Drie bedreigingen + verdediging

1. **Zero-click / AI Overviews** (80% klikt niet meer door) → word de bron die de AI citeert (GEO): JSON-LD per tool uitbreiden (SoftwareApplication + Review/claims met datum), llms.txt toevoegen, Q&A-blokken ("Is X geschikt voor...? Nee, want...").
2. **Reddit/community-trust** (92,8% van AI-search-citaties) → onafhankelijkheidspositionering + distributie buiten Google: nieuwsbrief, de bestaande Remotion-video's, LinkedIn.
3. **Directory-spam devalueert het genre** → niet meegroeien in volume; groeien in diepte + databewijslast.

## 4. Kansen-roadmap

### Quick wins (deze maand)
- Top-5 tools toevoegen (Gamma eerst — het 14.7k-gat)
- "Laatst geverifieerd"-datum zichtbaar op toolpagina's (`lastUpdated` veld bestaat al deels)
- "Hoe wij beoordelen"-pagina (onafhankelijkheid, kwaliteitsbar, geen betaalde posities)
- llms.txt + Review-schema in JSON-LD
- Taak-landingspagina's voor de bewezen NL-keywordclusters: "AI afbeelding maken (gratis)" (2.2k+1.3k+1.2k vol/mnd), "presentatie maken met AI" (360+320), "notulen maken met AI" (170, CPC €6,65)

### Middellang (dit kwartaal)
- **EU AI Act-laag per tool** (deadline 2 aug 2026): EU-hosting, AVG/verwerkersovereenkomst, risico-indicatie, training-opt-out. Niemand heeft dit; NL-bedrijven zoeken het nu. Velden bestaan deels al in schema (dataResidency, dataUsedForTraining, aiActRiskClass!) — vooral invullen + UI.
- **"Werkt in het Nederlands"-testdata**: geteste NL-kwaliteit per tool met datum (nlSupport-veld bestaat; maak er een hard filter + badge van)
- Nieuwsbrief op de digest zetten (AI Tools Radar) — NL-equivalent van Ben's Bites ontbreekt
- Taak-wizard uitbouwen (jobs-to-be-done als product)

### Structureel
- GEO-monitoring: word je geciteerd door ChatGPT/Perplexity op "beste AI-notulentool"-vragen (NL)?
- Samenwerking RankmyAI verkennen (zij ranken, wij adviseren) voor autoriteit/backlinks
- Tweede ring tools + NL-zakelijke categorie

## Kernconclusie

Het open gat in de markt: **curatie + dagelijkse data + NL/EU-compliance**.
Internationale spelers kunnen het niet (businessmodel), NL-spelers hebben de
data-laag en redactionele diepte niet. Diepte en bewijsbaarheid winnen het
van volume — en van de 5 quick wins kost geen enkele meer dan een dag.
