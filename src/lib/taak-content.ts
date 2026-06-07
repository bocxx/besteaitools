/**
 * Taak-landingspagina's — content-config
 *
 * Eén entry per taakpagina (/ai-voor/<key>). Gekozen op bewezen NL-zoekvolume
 * (DataForSEO, juni 2026):
 *  - afbeelding-maken:  "ai afbeelding maken gratis" ~2.2k/mnd + cluster ~5k
 *  - presentatie-maken: "presentatie maken met ai" 360 + "ai presentatie maken" 320 + gamma-cluster
 *  - notulen-maken:     "notulen maken met ai" 170 (CPC €6,65 — hoge commerciële waarde)
 *
 * toolSlugs: gecureerde volgorde (beste antwoord eerst), reden per tool.
 * Alle genoemde slugs moeten bestaan in src/content/tools/.
 */

export interface TaakPick {
  slug: string;
  reden: string;
  gratis?: string; // wat kan er gratis — alleen invullen als dat klopt
}

export interface TaakContent {
  key: string;
  /** H1 — exact op het keyword-cluster */
  title: string;
  metaTitle: string;
  metaDescription: string;
  intro: string[];
  picks: TaakPick[];
  gratisNote: string;
  faqs: { question: string; answer: string }[];
}

const year = new Date().getFullYear();

export const taakContent: Record<string, TaakContent> = {
  'afbeelding-maken': {
    key: 'afbeelding-maken',
    title: 'AI-afbeelding maken (ook gratis)',
    metaTitle: `AI-afbeelding maken — de beste tools, ook gratis (${year})`,
    metaDescription: 'Afbeelding maken met AI? Dit zijn de beste AI-afbeelding-generators van dit moment — inclusief wat je écht gratis kunt, zonder account, en wanneer je welke tool kiest.',
    intro: [
      'Een afbeelding maken met AI kan inmiddels in seconden — maar welke generator je kiest bepaalt het resultaat. Voor fotorealisme kies je een ander model dan voor logo\'s met tekst erin, en de gratis mogelijkheden verschillen enorm per tool.',
      'Hieronder onze redactionele selectie, geverifieerd op actuele prijzen en mogelijkheden. Eerst de snelle keuze, daarna alle opties met hun eerlijke voor- en nadelen.',
    ],
    picks: [
      { slug: 'gemini', reden: 'De makkelijkste gratis start: Gemini\'s beeldmodel (bekend als "Nano Banana") maakt en bewerkt afbeeldingen direct in de chat — in het Nederlands.', gratis: 'Gratis met een Google-account' },
      { slug: 'ideogram', reden: 'De beste keuze als er tekst in je beeld moet (posters, social posts, logo\'s) — daar is Ideogram al jaren de specialist.', gratis: 'Gratis credits per week' },
      { slug: 'midjourney', reden: 'Nog steeds de kwaliteitsstandaard voor artistiek en fotorealistisch werk — maar zonder gratis tier.', gratis: undefined },
      { slug: 'krea', reden: 'Realtime genereren en upscalen: je ziet het beeld veranderen terwijl je typt. Sterk voor iteratief ontwerpen.', gratis: 'Gratis dagelijkse credits' },
      { slug: 'leonardo', reden: 'Veelzijdig platform (nu onderdeel van Canva) met sterke stijl-presets voor game-art en productbeelden.', gratis: 'Gratis dagelijkse credits' },
      { slug: 'canva-ai', reden: 'Als het beeld direct in een ontwerp moet (social post, flyer): genereren én opmaken in één tool.', gratis: 'Gratis plan beschikbaar' },
      { slug: 'adobe-firefly', reden: 'De veilige zakelijke keuze: getraind op gelicentieerd materiaal, dus commercieel bruikbaar met de minste risico\'s.', gratis: 'Gratis instapcredits' },
      { slug: 'flux', reden: 'Voor wie zelf wil bouwen: open-weight model van Black Forest Labs, ook lokaal te draaien.', gratis: 'Open-weight variant gratis' },
      { slug: 'stable-diffusion', reden: 'Volledig gratis en lokaal te draaien — maximale controle, maar je hebt een goede GPU en wat technische kennis nodig.', gratis: 'Volledig gratis (lokaal)' },
      { slug: 'chatgpt', reden: 'Prima allrounder als je toch al ChatGPT gebruikt: beeldgeneratie zit in het gratis plan, met limieten.', gratis: 'Beperkt gratis' },
    ],
    gratisNote: 'Echt gratis een AI-afbeelding maken? Gemini, Ideogram, Krea en Leonardo hebben werkende gratis tiers (meestal met dagelijkse of wekelijkse credits). Helemaal zonder account lukt zelden meer — vrijwel alle diensten vragen een login om misbruik te beperken. Volledig gratis én onbeperkt kan alleen lokaal met Stable Diffusion of FLUX op je eigen videokaart.',
    faqs: [
      { question: 'Kan ik gratis een AI-afbeelding maken?', answer: 'Ja. Gemini (Google) is de makkelijkste gratis optie en werkt in het Nederlands. Ideogram, Krea en Leonardo geven gratis credits per dag of week. Voor onbeperkt gratis genereren draai je Stable Diffusion of FLUX lokaal op je eigen computer.' },
      { question: 'Kan ik een AI-afbeelding maken zonder account?', answer: 'Vrijwel niet meer — alle grote generators vragen een (gratis) login om misbruik te voorkomen. Lokaal draaien met Stable Diffusion of FLUX is de enige account-loze route.' },
      { question: 'Welke AI maakt de mooiste afbeeldingen?', answer: 'Voor artistiek en fotorealistisch werk is Midjourney nog steeds de standaard. Moet er tekst in het beeld, kies dan Ideogram. Voor commercieel veilig werk (gelicentieerde trainingsdata) is Adobe Firefly de beste keuze.' },
      { question: 'Mag ik AI-afbeeldingen commercieel gebruiken?', answer: 'Meestal wel op betaalde plannen, maar de voorwaarden verschillen per tool. Adobe Firefly is getraind op gelicentieerd materiaal en geeft de meeste zekerheid. Check altijd de licentievoorwaarden van de tool — en let op merkenrecht in je prompt.' },
    ],
  },

  'presentatie-maken': {
    key: 'presentatie-maken',
    title: 'Presentatie maken met AI',
    metaTitle: `Presentatie maken met AI — de beste tools (${year})`,
    metaDescription: 'Een presentatie maken met AI? Vergelijk Gamma, Canva, Copilot en meer: van tekst naar complete slides in minuten — met eerlijke verdicts en actuele prijzen.',
    intro: [
      'Een presentatie maken met AI scheelt uren: je geeft een onderwerp of plakt een document, en de tool bouwt structuur, tekst én vormgeving. Maar de verschillen zijn groot — van volwaardige deck-builders tot AI-hulpjes in PowerPoint.',
      'Dit is onze geverifieerde selectie, met per tool wanneer je hem wél en niet kiest.',
    ],
    picks: [
      { slug: 'gamma', reden: 'De beste alles-in-één: van prompt of document naar een complete, goed vormgegeven presentatie (of webpagina) in minuten. Dé reden dat miljoenen mensen "gamma ai" zoeken.', gratis: 'Gratis plan met credits' },
      { slug: 'canva-ai', reden: 'Sterk als je toch al in Canva werkt: Magic Design bouwt slides die je daarna volledig visueel kunt bewerken.', gratis: 'Gratis plan beschikbaar' },
      { slug: 'microsoft-copilot', reden: 'De logische keuze binnen een Microsoft-organisatie: Copilot bouwt en herschrijft direct in PowerPoint, met je eigen huisstijl en bedrijfsdata.', gratis: undefined },
      { slug: 'claude-design', reden: 'Voor interactieve presentaties en datavisualisaties: Claude bouwt werkende web-slides die je deelt als link.', gratis: undefined },
      { slug: 'chatgpt', reden: 'Geen deck-builder, maar onverslaanbaar voor het voorwerk: structuur, verhaallijn en speaker notes — die je daarna in Gamma of PowerPoint giet.', gratis: 'Gratis plan' },
    ],
    gratisNote: 'Gratis een presentatie maken met AI kan prima: Gamma\'s gratis plan levert volwaardige decks (met Gamma-watermerk), en Canva\'s gratis plan komt ver voor visuele presentaties. Voor zakelijk gebruik zonder watermerk zit je bij Gamma vanaf zo\'n $10-18 per maand.',
    faqs: [
      { question: 'Wat is de beste AI om een presentatie te maken?', answer: 'Gamma is op dit moment de beste gespecialiseerde tool: van tekst of document naar een complete presentatie in minuten, inclusief vormgeving. Werk je in Microsoft 365, dan is Copilot in PowerPoint de praktischere keuze.' },
      { question: 'Kan ik gratis een presentatie maken met AI?', answer: 'Ja — Gamma heeft een gratis plan (met watermerk en credit-limiet) en Canva\'s gratis plan bevat Magic Design. Voor professioneel gebruik zonder watermerk betaal je bij Gamma vanaf ongeveer $10-18 per maand.' },
      { question: 'Kan AI een PowerPoint-bestand maken?', answer: 'Gamma exporteert naar PowerPoint (.pptx), en Microsoft Copilot werkt direct ín PowerPoint. Ook Claude kan via skills een .pptx-bestand genereren. Let op: na export wil de opmaak nog weleens verschuiven — reken op wat nawerk.' },
    ],
  },

  'notulen-maken': {
    key: 'notulen-maken',
    title: 'Notulen maken met AI',
    metaTitle: `Notulen maken met AI — de beste tools, ook in het Nederlands (${year})`,
    metaDescription: 'Automatisch notulen maken met AI? Vergelijk de beste AI-notulisten — inclusief welke écht goed Nederlands verstaan, wat gratis kan en wat AVG-proof is.',
    intro: [
      'AI-notulisten luisteren mee in Teams, Zoom of Meet en leveren na afloop een samenvatting met actiepunten. Het scheelt per vergadering zo een half uur uitwerktijd — maar voor Nederlandse teams is er één cruciale vraag: verstaat de tool goed Nederlands?',
      'Niet elke populaire notetaker doet dat (Otter bijvoorbeeld niet). Dit is onze selectie, gecheckt op NL-ondersteuning, privacy en actuele prijzen.',
    ],
    picks: [
      { slug: 'notizy', reden: 'De Nederlandse specialist: gebouwd voor NL-gesprekken, facturen in euro\'s en een AVG-vriendelijke opzet. De veilige keuze voor Nederlandse organisaties.', gratis: undefined },
      { slug: 'granola', reden: 'De slimste notetaker voor wie veel vergadert: geen bot in de call (audio wordt lokaal opgenomen), notities combineren jouw aantekeningen met de transcriptie.', gratis: 'Gratis proef-notities' },
      { slug: 'fathom', reden: 'De gulste gratis optie: onbeperkt opnemen, transcriberen en samenvatten in het gratis plan — met Nederlandse transcriptie-ondersteuning.', gratis: 'Onbeperkt gratis plan' },
      { slug: 'fireflies-ai', reden: 'De beste allrounder voor teams: sterke integraties (CRM, Slack, Notion), zoeken door al je meetings heen en ruime taalondersteuning.', gratis: 'Gratis plan met limieten' },
      { slug: 'microsoft-copilot', reden: 'Vergader je in Teams en heeft je organisatie M365 Copilot, dan zijn notulen en actiepunten al inbegrepen — geen extra tool nodig.', gratis: undefined },
      { slug: 'krisp', reden: 'Andere insteek: Krisp werkt app-onafhankelijk op audio-niveau (ruisonderdrukking + transcriptie) en werkt dus ook bij telefonie of exotische vergadertools.', gratis: 'Gratis: 60 min/dag' },
      { slug: 'otter-ai', reden: 'Internationaal populair en goedkoop — maar let op: géén Nederlandse taalondersteuning. Alleen kiezen als je vooral Engelstalig vergadert.', gratis: 'Gratis plan (300 min/mnd)' },
    ],
    gratisNote: 'Gratis notulen maken met AI kan verrassend goed: Fathom biedt onbeperkt gratis opnemen en samenvatten (incl. Nederlands), en Fireflies en Otter hebben gratis instapplannen. Voor Nederlandse organisaties met privacy-eisen is het Nederlandse Notizy de degelijkste betaalde keuze.',
    faqs: [
      { question: 'Welke AI-notulist werkt het beste in het Nederlands?', answer: 'Notizy is als Nederlandse tool gebouwd voor NL-gesprekken. Van de internationale tools ondersteunen Fathom, Fireflies en Granola Nederlands goed. Let op: Otter.ai ondersteunt géén Nederlands — alleen Engels, Spaans, Frans, Duits, Japans en Chinees.' },
      { question: 'Kan ik gratis notulen maken met AI?', answer: 'Ja. Fathom heeft het gulste gratis plan: onbeperkt opnemen, transcriberen en samenvatten. Fireflies en Otter bieden gratis plannen met maandlimieten. Microsoft Teams-gebruikers met een Copilot-licentie hebben het al inbegrepen.' },
      { question: 'Zijn AI-notulisten toegestaan onder de AVG?', answer: 'Dat hangt af van de tool en je instellingen: waar wordt audio verwerkt en opgeslagen, en wordt er getraind op jouw data? Vraag altijd toestemming aan deelnemers, sluit een verwerkersovereenkomst en kies bij voorkeur een tool met EU-verwerking — het Nederlandse Notizy is daarop ingericht.' },
      { question: 'Moet er een bot in mijn vergadering?', answer: 'Niet per se. Granola en Krisp nemen audio lokaal op je eigen computer op — er verschijnt geen "notetaker" als deelnemer in de call. Fireflies en Otter werken juist wél met een bot die aanschuift.' },
    ],
  },
};

export const taakKeys = Object.keys(taakContent);
