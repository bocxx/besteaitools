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

// Zie seo-helpers.ts: module-level `new Date()` geeft 1970 onder de
// Cloudflare-adapter. Compile-time constante uit astro.config.mjs.
declare const __BUILD_YEAR__: number;
const year = __BUILD_YEAR__;

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

  'logo-maken': {
    key: 'logo-maken',
    title: 'Logo maken met AI',
    metaTitle: `Logo maken met AI — de beste tools, ook gratis te proberen (${year})`,
    metaDescription: 'Een logo maken met AI? Vergelijk de beste AI-logomakers — van gratis uitproberen tot een compleet merkpakket met huisstijl, lettertypes en kleuren. Met eerlijke verdicts en prijzen.',
    intro: [
      'Een logo laten ontwerpen kost al snel honderden euro\'s; met AI maak je in minuten tientallen varianten en betaal je pas als je iets goeds hebt. Voor zzp\'ers en starters is dat een uitkomst — maar let op de licentie en de bestandsformaten die je krijgt.',
      'Dit is onze geverifieerde selectie, met per tool wanneer je hem wél en niet kiest.',
    ],
    picks: [
      { slug: 'looka', reden: 'De complete keuze: van logo tot een heel merkpakket (visitekaartjes, social templates, huisstijl). Je ontwerpt gratis en betaalt pas bij het downloaden.', gratis: 'Gratis ontwerpen, betalen bij download' },
      { slug: 'brandmark', reden: 'Sterk alternatief met eenmalige betaling in plaats van een abonnement — inclusief bronbestanden en stijlgids op het Designer-pakket.', gratis: 'Gratis verkennen' },
      { slug: 'canva-ai', reden: 'Het handigst als je het logo daarna zelf wilt blijven gebruiken in posts, flyers en presentaties — alles in één tool.', gratis: 'Gratis plan' },
      { slug: 'ideogram', reden: 'De beste keuze als er nette tekst of een woordmerk in moet — Ideogram is de specialist in leesbare letters in beeld.', gratis: 'Gratis credits per week' },
      { slug: 'recraft', reden: 'Voor wie een schaalbaar vector-logo (SVG) wil dat scherp blijft op elk formaat — uniek onder de beeldgenerators.', gratis: 'Gratis credits' },
      { slug: 'adobe-firefly', reden: 'De veilige zakelijke keuze: getraind op gelicentieerd materiaal, dus de minste juridische risico\'s voor commercieel gebruik.', gratis: 'Gratis instapcredits' },
    ],
    gratisNote: 'Echt gratis een logo maken kan: bij Looka en Brandmark ontwerp je gratis en betaal je pas bij het downloaden van de hoge-resolutie bestanden (eenmalig vanaf ~€20-25). Canva\'s gratis plan levert een bruikbaar logo zonder kosten, al krijg je daar geen merkpakket of vectorbestanden bij. Volledig gratis én commercieel veilig met losse bestanden is zeldzaam — reken op een kleine eenmalige uitgave.',
    faqs: [
      { question: 'Kan ik gratis een logo maken met AI?', answer: 'Gedeeltelijk. Bij Looka en Brandmark ontwerp je gratis en betaal je alleen als je het eindbestand downloadt (eenmalig, geen abonnement). Canva\'s gratis plan levert een werkend logo zonder kosten. Voor schaalbare vectorbestanden en een compleet merkpakket betaal je meestal een klein bedrag.' },
      { question: 'Mag ik een AI-logo commercieel en als merk gebruiken?', answer: 'Meestal wel na betaling, maar de voorwaarden verschillen. Let op: een AI-logo is lastiger als merk te registreren omdat het vaak niet als "uniek menselijk ontwerp" geldt, en gelijkende varianten kunnen bij anderen opduiken. Voor een beschermbaar merk is een eenmalige check door een ontwerper of merkenbureau verstandig.' },
      { question: 'Welk bestand heb ik nodig voor mijn logo?', answer: 'Vraag altijd om een vector (SVG of EPS): die blijft scherp op elk formaat, van favicon tot gevelreclame. Recraft levert native vectoren; Looka en Brandmark geven ze op hun betaalde pakketten. PNG met transparante achtergrond is het minimum voor web.' },
    ],
  },

  'cv-maken': {
    key: 'cv-maken',
    title: 'CV maken met AI',
    metaTitle: `CV maken met AI — gratis tools en sollicitatiebrieven (${year})`,
    metaDescription: 'Een CV maken met AI? De beste tools om snel een professioneel CV én sollicitatiebrief te schrijven, afgestemd op de vacature — inclusief wat gratis kan.',
    intro: [
      'Een CV maken met AI scheelt uren en levert vaak een strakker resultaat: je vult je ervaring in en de tool maakt de opmaak, of je laat een chatbot je tekst afstemmen op een specifieke vacature. Dat laatste — matchen op de vacaturetekst — is precies waar AI het verschil maakt.',
      'Dit is onze selectie voor zowel de opmaak als de inhoud, met wat je gratis kunt.',
    ],
    picks: [
      { slug: 'canva-ai', reden: 'De makkelijkste alles-in-één: kies een CV-template, vul in, en laat Magic Write je tekst aanscherpen. Mooie opmaak zonder designkennis.', gratis: 'Gratis plan met CV-templates' },
      { slug: 'chatgpt', reden: 'Onverslaanbaar voor de inhoud: plak de vacature plus je oude CV en laat ChatGPT je ervaring afstemmen op precies die functie — ook je sollicitatiebrief.', gratis: 'Gratis plan' },
      { slug: 'claude', reden: 'Sterk alternatief voor het schrijfwerk, met een natuurlijke, minder "AI-achtige" toon — fijn voor de motivatiebrief.', gratis: 'Gratis basisplan' },
      { slug: 'gemini', reden: 'Handig als je Google Docs gebruikt: Gemini helpt je CV en brief direct in je document opstellen en herschrijven, in het Nederlands.', gratis: 'Gratis met Google-account' },
    ],
    gratisNote: 'Gratis een CV maken met AI kan goed: Canva heeft gratis CV-templates met AI-tekenhulp, en ChatGPT, Claude en Gemini schrijven gratis je CV-tekst en sollicitatiebrief op maat van de vacature. Let op gespecialiseerde "CV-builders" die gratis laten maken maar pas bij downloaden betaling vragen via een moeilijk op te zeggen abonnement — lees de voorwaarden.',
    faqs: [
      { question: 'Wat is de beste AI om een CV te maken?', answer: 'Voor de opmaak is Canva het handigst (gratis templates + AI-tekenhulp). Voor de inhoud — je ervaring afstemmen op een specifieke vacature — gebruik je ChatGPT, Claude of Gemini: plak de vacaturetekst erbij en laat de AI je CV en brief daarop toespitsen.' },
      { question: 'Kan ik gratis een CV maken met AI?', answer: 'Ja. Canva\'s gratis plan bevat CV-templates met AI-hulp, en ChatGPT, Claude en Gemini schrijven gratis je teksten. Pas op met aparte "CV-maker"-sites die gratis laten ontwerpen maar bij het downloaden een betaald abonnement eisen.' },
      { question: 'Herkennen werkgevers een met AI gemaakt CV?', answer: 'Een met AI opgemaakt CV valt niet op — dat is gewoon nette vormgeving. Een volledig door AI geschreven motivatiebrief klinkt soms generiek; gebruik AI voor de basis en de structuur, maar voeg je eigen voorbeelden en toon toe. Controleer altijd op feitelijke fouten die AI kan verzinnen.' },
    ],
  },

  'video-maken': {
    key: 'video-maken',
    title: 'Video maken met AI',
    metaTitle: `Video maken met AI — de beste tools, ook gratis (${year})`,
    metaDescription: 'Een video maken met AI? Van tekst-naar-video en avatars tot social clips: de beste AI-videogenerators vergeleken, met eerlijke verdicts, prijzen en wat gratis kan.',
    intro: [
      'Video maken met AI kan inmiddels op heel verschillende manieren: een hele scène genereren uit een zin, een pratende avatar je script laten uitspreken, of een lange video automatisch knippen tot virale shorts. Welke tool past, hangt dus sterk af van wat je wilt maken.',
      'Dit is onze selectie per gebruiksdoel, met wat je gratis kunt proberen.',
    ],
    picks: [
      { slug: 'runway', reden: 'De referentie voor echte AI-videogeneratie en in-video bewerken — sterk voor creatief en cinematisch werk.', gratis: 'Gratis startcredits' },
      { slug: 'veo', reden: 'Google\'s topmodel voor realistische clips mét geluid; de beste keuze voor kwaliteit als je in het Google-ecosysteem zit.', gratis: undefined },
      { slug: 'heygen', reden: 'De standaard voor pratende avatars: laat een digitale presentator je script uitspreken in 100+ talen — ideaal voor uitleg- en trainingsvideo.', gratis: 'Gratis: 3 video\'s/mnd' },
      { slug: 'syllaby', reden: 'Voor faceless social content: van onderwerp naar een complete short met script, stem en beeld — gebouwd voor wie regelmatig post.', gratis: undefined },
      { slug: 'opus-clip', reden: 'De beste keuze als je al video hébt: knipt lange video\'s automatisch tot ondertitelde shorts met een viraliteits-score.', gratis: 'Gratis credits/mnd' },
      { slug: 'capcut', reden: 'De gratis allrounder voor zelf monteren met AI-hulp: beste auto-ondertitels van de markt, mobiel en desktop.', gratis: 'Gratis plan' },
      { slug: 'invideo', reden: 'Tekst-naar-video met stockbeeld en stemmen — handig voor marketingvideo\'s zonder eigen materiaal.', gratis: 'Gratis (met watermerk)' },
      { slug: 'kling', reden: 'Sterk videomodel met lange clips en goede beweging — een geliefd alternatief voor Runway en Veo.', gratis: 'Gratis dagcredits' },
    ],
    gratisNote: 'Gratis video maken met AI kan zeker: CapCut is gratis voor zelf monteren met AI-hulp, Opus Clip en de meeste generators (Runway, Kling, HeyGen) geven gratis startcredits. Let op watermerken en commerciële rechten op gratis plannen — voor zakelijk gebruik zonder logo betaal je meestal vanaf ~$15-30 per maand.',
    faqs: [
      { question: 'Wat is de beste AI om video mee te maken?', answer: 'Dat hangt af van je doel. Voor gegenereerde scènes: Runway, Veo of Kling. Voor een pratende presentator: HeyGen. Voor social shorts uit een onderwerp: Syllaby. Voor het knippen van bestaande video tot clips: Opus Clip. Voor zelf monteren met AI-hulp: CapCut.' },
      { question: 'Kan ik gratis een AI-video maken?', answer: 'Ja. CapCut is gratis voor montage, en Runway, Kling, HeyGen en Opus Clip hebben gratis startcredits of een gratis tier. Reken op een watermerk of beperkte lengte op gratis plannen; zonder logo en met commerciële rechten betaal je meestal vanaf ~$15-30 per maand.' },
      { question: 'Werkt AI-video in het Nederlands?', answer: 'Voor gesproken video wel: HeyGen en Syllaby ondersteunen Nederlandse stemmen, en CapCut maakt Nederlandse ondertitels. Bij scène-generators (Runway, Veo) typ je je prompt meestal in het Engels voor het beste resultaat, maar de output bevat geen taal tenzij je spraak toevoegt.' },
    ],
  },

  'tekst-schrijven': {
    key: 'tekst-schrijven',
    title: 'Tekst schrijven en herschrijven met AI',
    metaTitle: `Tekst schrijven met AI — e-mails, teksten en vertalen (${year})`,
    metaDescription: 'Teksten, e-mails of berichten schrijven en herschrijven met AI? De beste tools om sneller professioneel te schrijven in het Nederlands — met verdicts, prijzen en wat gratis kan.',
    intro: [
      'Of het nu een lastige e-mail, een productbeschrijving of een nette herschrijving van je eigen tekst is: AI haalt de drempel weg en levert in seconden een eerste versie. Voor Nederlandse gebruikers telt vooral hoe natuurlijk het Nederlands klinkt — niet elke tool is daar even goed in.',
      'Dit is onze selectie voor schrijven, herschrijven en vertalen, met wat je gratis kunt.',
    ],
    picks: [
      { slug: 'chatgpt', reden: 'De allrounder: e-mails, teksten, samenvattingen en herschrijvingen in vloeiend Nederlands. Voor de meeste mensen het beste startpunt.', gratis: 'Gratis plan' },
      { slug: 'claude', reden: 'De beste keuze voor langere, genuanceerde teksten met een natuurlijke toon — klinkt het minst "AI-achtig".', gratis: 'Gratis basisplan' },
      { slug: 'deepl', reden: 'Onverslaanbaar voor vertalen, en met DeepL Write ook voor het verbeteren van je toon en stijl — Europees en privacyvriendelijk.', gratis: 'Gratis plan' },
      { slug: 'grammarly', reden: 'Het sterkst voor correctie en toon in je eigen schrijfomgeving (mail, Word, browser) — al werkt het vooral voor Engels.', gratis: 'Gratis basisversie' },
      { slug: 'quillbot', reden: 'De specialist in parafraseren en samenvatten — handig om je eigen tekst korter, formeler of anders te laten klinken.', gratis: 'Gratis (beperkt aantal woorden)' },
      { slug: 'jasper', reden: 'Voor marketingteams die op schaal en in een vaste merkstem schrijven — meer platform dan losse schrijfhulp.', gratis: undefined },
    ],
    gratisNote: 'Gratis schrijven met AI kan ruim: ChatGPT, Claude, Gemini en DeepL hebben werkende gratis plannen die voor dagelijks schrijfwerk volstaan. QuillBot is gratis met een woordlimiet per keer. Voor onbeperkt gebruik, langere teksten of een vaste merkstem (Jasper) betaal je meestal vanaf ~$10-20 per maand.',
    faqs: [
      { question: 'Welke AI schrijft het beste Nederlands?', answer: 'ChatGPT, Claude en Gemini schrijven alle drie vloeiend Nederlands; Claude klinkt vaak het meest natuurlijk voor langere teksten. Voor vertalen en het verbeteren van je toon is DeepL (met DeepL Write) de sterkste, en als Europese tool ook het meest privacyvriendelijk.' },
      { question: 'Kan ik gratis teksten laten schrijven met AI?', answer: 'Ja. ChatGPT, Claude, Gemini en DeepL hebben gratis plannen die voor de meeste mails en teksten volstaan. QuillBot is gratis met een woordlimiet. Voor onbeperkt gebruik of zakelijke functies betaal je vanaf ongeveer $10-20 per maand.' },
      { question: 'Hoe voorkom ik dat mijn tekst als AI herkend wordt?', answer: 'Gebruik AI voor de eerste versie en structuur, maar voeg je eigen voorbeelden, toon en concrete details toe. Vraag de tool expliciet om "natuurlijk, niet-formeel Nederlands" en vermijd standaard openingszinnen. Lees altijd na op verzonnen feiten — die haalt geen detector eruit, maar je lezer wel.' },
    ],
  },

  'foto-bewerken': {
    key: 'foto-bewerken',
    title: 'Foto bewerken met AI (en achtergrond verwijderen)',
    metaTitle: `Foto bewerken met AI — achtergrond verwijderen en meer, ook gratis (${year})`,
    metaDescription: 'Foto\'s bewerken met AI: achtergrond verwijderen, opschonen, vergroten of productfoto\'s maken. De beste tools vergeleken — met wat écht gratis kan.',
    intro: [
      'De meestgevraagde AI-fotobewerking is simpel: een achtergrond weghalen. Daarnaast wil je foto\'s opschonen, vergroten of er strakke productfoto\'s van maken. Welke tool past, hangt af van of je één snelle uitsnede wilt of een complete bewerkingssuite.',
      'Dit is onze selectie van snelle losse tools tot complete editors, met wat je gratis kunt.',
    ],
    picks: [
      { slug: 'removebg', reden: 'De snelste voor één ding: achtergrond verwijderen in één klik, zonder account. Heeft een Nederlandse interface.', gratis: 'Gratis (lage resolutie)' },
      { slug: 'photoroom', reden: 'De beste keuze voor productfoto\'s: achtergrond weg én een nette nieuwe achtergrond erin, met directe export naar Vinted, Etsy en Shopify.', gratis: 'Gratis: 250 exports/mnd' },
      { slug: 'canva-ai', reden: 'De handigste allrounder: achtergrond verwijderen, Magic Edit en retoucheren, en je foto meteen in een ontwerp gebruiken.', gratis: 'Gratis plan' },
      { slug: 'fotor', reden: 'Complete online foto-editor met AI: retoucheren, vergroten en AI-effecten — in het Nederlands.', gratis: 'Gratis basisversie' },
      { slug: 'adobe-firefly', reden: 'Voor serieuze bewerking met generatieve vulling (objecten weg of bij toveren) en de minste juridische risico\'s.', gratis: 'Gratis instapcredits' },
      { slug: 'krea', reden: 'Sterk voor het vergroten en verscherpen (upscalen) van foto\'s tot hoge resolutie, plus creatieve bewerking.', gratis: 'Gratis dagcredits' },
    ],
    gratisNote: 'Gratis je foto bewerken kan prima: remove.bg haalt gratis je achtergrond weg (op lagere resolutie), Photoroom geeft 250 gratis exports per maand, en Canva en Fotor hebben werkende gratis plannen. Voor hoge resolutie, bulk of geavanceerde generatieve bewerking betaal je meestal vanaf ~€8-10 per maand.',
    faqs: [
      { question: 'Hoe verwijder ik gratis een achtergrond uit een foto?', answer: 'remove.bg doet dit in één klik zonder account (gratis op lagere resolutie). Photoroom geeft 250 gratis exports per maand en zet er meteen een nette achtergrond voor in de plaats. Ook Canva\'s achtergrond-verwijderaar werkt op het gratis plan.' },
      { question: 'Wat is de beste AI om productfoto\'s te maken?', answer: 'Photoroom is gebouwd voor verkopers: het verwijdert de achtergrond, plaatst je product op een professionele achtergrond en exporteert direct naar Vinted, Etsy en Shopify. Voor merkgerichte productshots zijn Flair AI en Adobe Firefly sterke alternatieven.' },
      { question: 'Kan AI een foto scherper of groter maken?', answer: 'Ja, dat heet upscalen. Krea en Fotor vergroten en verscherpen foto\'s met AI tot hoge resolutie — handig voor oude of kleine afbeeldingen. De kwaliteit is goed maar niet magisch: sterk wazige of zeer kleine foto\'s blijven beperkt.' },
    ],
  },

  'social-media-posts': {
    key: 'social-media-posts',
    title: 'Social media posts maken met AI',
    metaTitle: `Social media met AI — posts, beeld en planning (${year})`,
    metaDescription: 'Sneller social media content maken met AI: posts schrijven, beeld genereren en inplannen. De beste tools voor ondernemers en zzp\'ers — met verdicts en prijzen.',
    intro: [
      'Consistent posten kost ondernemers en zzp\'ers het meeste: bedenken, schrijven, beeld maken én inplannen. AI neemt elk van die stappen over — van een hele contentkalender tot losse posts in je eigen toon. De truc is een tool kiezen die past bij waar jij nu de meeste tijd verliest.',
      'Dit is onze selectie voor schrijven, beeld en planning, met wat je gratis kunt.',
    ],
    picks: [
      { slug: 'canva-ai', reden: 'De complete keuze voor ondernemers: posts ontwerpen, beeld genereren én inplannen in één tool, met sjablonen per platform.', gratis: 'Gratis plan' },
      { slug: 'simplified', reden: 'All-in-one voor wie alles op één plek wil: AI-copy, design, video én een social-planner samen.', gratis: 'Gratis (beperkte credits)' },
      { slug: 'copy.ai', reden: 'Sterk voor de tekst: snel posts, captions en varianten genereren in je eigen tone-of-voice.', gratis: 'Gratis startplan' },
      { slug: 'typefully', reden: 'De beste keuze voor X/Twitter, LinkedIn, Threads en Bluesky: schrijven, plannen en analytics zonder ruis.', gratis: 'Gratis (demo)' },
      { slug: 'hypefury', reden: 'Gericht op groei op X en LinkedIn: posts recyclen, automatisch reageren en je beste content opnieuw inzetten.', gratis: undefined },
      { slug: 'adcreative', reden: 'Specifiek voor advertenties: AI-creatives en -copy met een voorspelde performance-score.', gratis: undefined },
    ],
    gratisNote: 'Gratis aan de slag met social content kan: Canva en Copy.ai hebben werkende gratis plannen voor design en tekst, en Typefully heeft een gratis instap. Let op dat "gratis" bij all-in-one tools (Simplified) vaak eenmalige credits zijn die niet maandelijks bijvullen. Voor plannen, teams en onbeperkt gebruik betaal je meestal vanaf ~$15-30 per maand.',
    faqs: [
      { question: 'Wat is de beste AI-tool voor social media?', answer: 'Voor ondernemers die alles op één plek willen (ontwerpen, beeld én inplannen) is Canva het sterkst. Wil je vooral snel tekst en captions: Copy.ai. Voor X/LinkedIn-groei met plannen en recyclen: Typefully of Hypefury. Voor advertenties: AdCreative.' },
      { question: 'Kan ik gratis social media posts maken met AI?', answer: 'Ja. Canva en Copy.ai hebben gratis plannen voor design en tekst, en Typefully een gratis instap. Bij sommige all-in-one tools is "gratis" een eenmalige credit-proef. Voor inplannen over meerdere kanalen en teams betaal je doorgaans vanaf ~$15-30 per maand.' },
      { question: 'Klinken AI-posts niet te generiek?', answer: 'Dat risico bestaat. Geef de tool je eigen toon mee (plak een paar van je beste posts als voorbeeld), wees specifiek over je doelgroep, en pas de output altijd aan met een eigen invalshoek of voorbeeld. AI is sterk voor de eerste versie en variaties, niet als eindredacteur.' },
    ],
  },

  'website-maken': {
    key: 'website-maken',
    title: 'Website maken met AI',
    metaTitle: `Website maken met AI — van tekst naar werkende site (${year})`,
    metaDescription: 'Een website of webshop maken met AI, zonder code? De beste AI-website-builders vergeleken voor zzp\'ers en MKB — met verdicts, prijzen en wat gratis kan.',
    intro: [
      'Een website laten bouwen kost al snel honderden tot duizenden euro\'s; met AI beschrijf je wat je wilt en staat er binnen minuten een werkende eerste versie. Voor zzp\'ers en MKB scheelt dat enorm — maar de tools verschillen sterk: van simpele bedrijfssites tot volledige web-apps en webshops.',
      'Dit is onze selectie per type site, met wat je gratis kunt.',
    ],
    picks: [
      { slug: '10web', reden: 'De beste keuze voor een echte WordPress-site met hosting erbij: AI bouwt de site, jij houdt een open, overdraagbaar systeem zonder lock-in.', gratis: 'Gratis proefperiode' },
      { slug: 'durable', reden: 'Het snelst voor een simpele bedrijfssite: in 30 seconden een complete site met tekst en beeld — ideaal voor zzp\'ers die snel online willen.', gratis: 'Gratis te proberen' },
      { slug: 'framer', reden: 'Voor designgevoelige sites met animatie en een strak resultaat — van prompt naar publiceerbare pagina.', gratis: 'Gratis plan (met subdomein)' },
      { slug: 'dora', reden: 'Voor wie iets opvallends wil: genereert 3D- en geanimeerde websites uit tekst, zonder code.', gratis: 'Gratis AI-generatie' },
      { slug: 'lovable', reden: 'De keuze voor een echte web-app of tool met inlog en database, niet alleen een brochuresite — bouwen via chat.', gratis: 'Gratis (beperkt)' },
      { slug: 'bolt', reden: 'Sterk alternatief voor full-stack web-apps: genereert werkende code die je kunt uitbreiden en hosten.', gratis: 'Gratis tokens' },
    ],
    gratisNote: 'Gratis een website maken met AI kan om te beginnen: de meeste builders (Durable, Framer, Dora, Lovable) laten je gratis bouwen en uitproberen. Je betaalt zodra je een eigen domeinnaam koppelt en advertenties/subdomein wilt weghalen — meestal vanaf ~€10-25 per maand, vaak inclusief hosting. Reken dat mee in je keuze.',
    faqs: [
      { question: 'Wat is de beste AI om een website te maken?', answer: 'Voor een gewone bedrijfssite met hosting: 10Web (WordPress) of Durable (snelst). Voor design en animatie: Framer of Dora. Voor een echte web-app met inlog en database: Lovable of Bolt. Voor een webshop kijk je naar 10Web of een AI-koppeling binnen Shopify.' },
      { question: 'Kan ik gratis een website maken met AI?', answer: 'Je kunt gratis bouwen en uitproberen bij vrijwel alle AI-builders. Voor een eigen domeinnaam, het weghalen van advertenties/subdomein en publiceren betaal je doorgaans vanaf ~€10-25 per maand — bij 10Web en Durable is hosting daarbij inbegrepen.' },
      { question: 'Zit ik vast aan de tool (lock-in)?', answer: 'Dat verschilt sterk. 10Web levert een standaard WordPress-site die je kunt meenemen naar een andere host — geen lock-in. Bij gesloten builders (Durable, Framer, Dora) leeft je site op hun platform en kun je hem niet zomaar exporteren. Weeg mee hoe belangrijk overdraagbaarheid voor je is.' },
    ],
  },

  'klantenservice-chatbot': {
    key: 'klantenservice-chatbot',
    title: 'AI-chatbot voor klantenservice maken',
    metaTitle: `AI-chatbot voor je website of webshop maken (${year})`,
    metaDescription: 'Een AI-chatbot voor klantenservice op je website of webshop? De beste tools om 24/7 vragen in het Nederlands te beantwoorden — met verdicts, prijzen en AVG-aandacht.',
    intro: [
      'Een AI-chatbot beantwoordt klantvragen 24/7 op basis van je eigen content — handleidingen, FAQ, productinfo — en haalt zo de druk van je inbox. Voor webshops en MKB scheelt dat veel herhaalwerk, mits de bot goed Nederlands spreekt en netjes met klantdata omgaat.',
      'Dit is onze selectie van zelf-te-bouwen bots tot complete supportplatforms, met aandacht voor AVG.',
    ],
    picks: [
      { slug: 'chatbase', reden: 'De makkelijkste start: voed je content (site, PDF\'s, FAQ) en zet binnen een uur een chatbot op je website — populair bij kleinere bedrijven.', gratis: 'Gratis te proberen' },
      { slug: 'customgpt', reden: 'De keuze als nauwkeurigheid telt: gebouwd om verzonnen antwoorden te voorkomen en alleen op jouw bronnen te antwoorden.', gratis: undefined },
      { slug: 'intercom-fin', reden: 'Het sterkst voor groeiende supportteams: Fin lost vragen end-to-end op en draait ook standalone op Zendesk of je eigen site.', gratis: undefined },
      { slug: 'zendesk-ai', reden: 'De logische keuze als je al Zendesk gebruikt: AI-laag over je bestaande tickets, met EU-dataopslag mogelijk.', gratis: undefined },
      { slug: 'ada', reden: 'Voor grotere organisaties: enterprise-platform dat klantenservice in veel talen automatiseert met meetbare resolutie.', gratis: undefined },
      { slug: 'cosupport-ai', reden: 'Alternatief supportplatform met chatbot, omnichannel en CRM-integratie voor MKB en groei.', gratis: undefined },
    ],
    gratisNote: 'Veel chatbot-builders laten je gratis bouwen en testen (Chatbase), maar een live bot op je site met voldoende gesprekken zit meestal op een betaald plan — let op verborgen kosten: branding weghalen, extra bots en gesprekslimieten verdubbelen het maandbedrag soms. Enterprise-supportplatforms (Intercom Fin, Ada) werken met prijs op aanvraag of per-oplossing.',
    faqs: [
      { question: 'Welke AI-chatbot is het beste voor mijn website?', answer: 'Voor een snelle, betaalbare start op je eigen site: Chatbase of CustomGPT (je voedt je eigen content). Gebruik je al een supportsysteem, kies dan de AI-laag daarvan: Intercom Fin of Zendesk AI. Voor grote organisaties met veel talen: Ada.' },
      { question: 'Spreekt een AI-chatbot goed Nederlands?', answer: 'De grote platforms (Intercom Fin, Zendesk AI, Ada) en de op-content-gebaseerde bots (Chatbase, CustomGPT) draaien op modellen die vloeiend Nederlands aankunnen. Test altijd met je eigen veelgestelde vragen — de kwaliteit hangt vooral af van hoe goed je je content (FAQ, handleidingen) aanlevert.' },
      { question: 'Mag een AI-chatbot klantgegevens verwerken onder de AVG?', answer: 'Ja, mits goed geregeld: sluit een verwerkersovereenkomst, kies waar mogelijk EU-dataopslag, en check of de tool op jouw gesprekken traint (dat wil je meestal uitzetten). Zendesk, Intercom en Ada bieden EU-hosting en verwerkersovereenkomsten — zie onze EU AI Act-pagina voor de status per tool.' },
    ],
  },

  'studenten': {
    key: 'studenten',
    title: 'AI-tools voor studenten',
    metaTitle: `AI-tools voor studenten — slimmer studeren, samenvatten en bronnen (${year})`,
    metaDescription: 'De beste AI-tools voor studenten: stof samenvatten, begrippen begrijpen, oefenvragen en bronnen — bijna alles gratis. Met eerlijke uitleg over wat wel en niet mag van je opleiding.',
    intro: [
      'Als student wil je sneller door grote stapels stof, lastige begrippen écht snappen en je tijd verdelen tussen colleges, bijbanen en deadlines. AI helpt je daarbij niet door het werk over te nemen, maar door stof te ontsluiten: een dictaat van 60 pagina\'s wordt een overzichtelijke samenvatting, en een vaag tentamenonderwerp wordt een setje oefenvragen.',
      'De winst zit in begrip en planning, niet in kopieerwerk. Gebruik AI als een geduldige bijles-tutor — maar lever altijd je eigen werk in. Hieronder de tools die studenten het meeste opleveren, met steeds een gratis instap.',
    ],
    picks: [
      { slug: 'notebooklm', reden: 'Upload je colleges en pdf\'s en stel er vragen over; antwoorden verwijzen terug naar de exacte passage, dus je studeert binnen je eigen materiaal.', gratis: 'Gratis met Google-account' },
      { slug: 'chatgpt', reden: 'Laat moeilijke begrippen in gewone taal uitleggen, genereer oefenvragen en overhoor jezelf voor tentamens.', gratis: 'Ruime gratis versie' },
      { slug: 'perplexity', reden: 'Snel betrouwbare antwoorden mét klikbare bronnen — ideaal om een onderwerp te verkennen voor je de literatuur in duikt.', gratis: 'Gratis te gebruiken' },
      { slug: 'quillbot', reden: 'Herschrijf en kort je eigen teksten in en parafraseer netjes met bronvermelding voor je verslagen.', gratis: 'Gratis basisversie' },
      { slug: 'deepl', reden: 'Vertaal Engelse of Duitse vakliteratuur naar helder Nederlands — of je paper andersom.', gratis: 'Gratis voor losse teksten' },
      { slug: 'gamma', reden: 'Maak in minuten een verzorgde presentatie voor je werkgroep of eindpitch vanuit een paar bullets.', gratis: 'Gratis met credits' },
      { slug: 'goblin-tools', reden: 'Hakt grote opdrachten op in behapbare stappen — fijn als plannen of beginnen lastig is.', gratis: 'Vrijwel gratis' },
    ],
    gratisNote: 'Vrijwel alles hierboven kun je als student gratis doen. NotebookLM, Perplexity en de gratis ChatGPT dekken samen je belangrijkste taken — stof samenvatten, bevragen en uitleggen. DeepL en QuillBot hebben royale gratis niveaus. Begin klein: pak één tool per taak en stap pas over op betaald als je er echt tegenaan loopt.',
    faqs: [
      { question: 'Mag ik van mijn opleiding AI gebruiken, of is dat fraude?', answer: 'Dat verschilt per opleiding en zelfs per vak. De algemene lijn in 2026: AI als studiehulp (uitleg, samenvatten, oefenvragen, plannen) mag bijna overal, maar AI-tekst inleveren als je eigen werk geldt vrijwel overal als fraude. Veel instellingen verplichten je bovendien te vermelden of en hoe je AI hebt gebruikt. Check de regels van je vak.' },
      { question: 'Pikt een plagiaatscanner het op als ik AI gebruik?', answer: 'Scanners zoals Turnitin hebben een AI-detectiefunctie, maar die is in de praktijk onbetrouwbaar en geeft regelmatig vals alarm — in beide richtingen. De veilige route blijft: gebruik AI om te begrijpen en te oefenen, schrijf je tekst zelf, en wees transparant over je hulpmiddelen.' },
      { question: 'Hoe gebruik ik AI zonder dat ik er dommer van word?', answer: 'Laat AI niet het denkwerk doen maar het uitlegwerk. Vraag om een begrip in jouw woorden uit te leggen, laat je overhoren met oefenvragen, en controleer het antwoord tegen je eigen materiaal (NotebookLM verwijst terug naar de bron). Zo gebruik je AI als bijles, niet als spiekbriefje — en onthoud je de stof beter.' },
    ],
  },

  'onderzoek': {
    key: 'onderzoek',
    title: 'AI-tools voor onderzoek & wetenschap',
    metaTitle: `AI-tools voor onderzoekers — literatuur doorzoeken met bronnen (${year})`,
    metaDescription: 'De beste AI-tools voor wetenschappelijk onderzoek: miljoenen papers doorzoeken, kernbevindingen samenvatten en claims aan citaties koppelen — met eerlijke aandacht voor hallucinatie en bronverificatie.',
    intro: [
      'Als onderzoeker verlies je veel tijd aan de voorkant van een project: honderden abstracts doorworstelen, de stand van zaken in kaart brengen en lange Engelstalige papers ontleden. AI-tools die specifiek op wetenschappelijke literatuur zijn gebouwd halen die berg werk fors omlaag.',
      'De crux is verifieerbaarheid: een generieke chatbot verzint soms net zo overtuigend een niet-bestaande studie als hij een echte citeert. Daarom leun je op tools die hun bron erbij leveren, en sla je de bronverificatie nooit over.',
    ],
    picks: [
      { slug: 'elicit', reden: 'Doorzoekt 125M+ papers en geeft per studie een compacte samenvatting met kernbevindingen — ideaal voor het opzetten van een literatuuroverzicht.', gratis: 'Gratis instap met credits' },
      { slug: 'consensus', reden: 'Stel een onderzoeksvraag en krijg een antwoord dat direct put uit peer-reviewed studies, met de bronnen erbij.', gratis: 'Gratis basisversie' },
      { slug: 'notebooklm', reden: 'Laad je eigen pdf-corpus en stel er vragen over; antwoorden verwijzen terug naar de exacte passage zodat je grip houdt.', gratis: 'Gratis met Google-account' },
      { slug: 'perplexity', reden: 'Brede verkenning van een nieuw onderwerp met klikbare bronnen — goed om de juiste zoektermen en sleutelpublicaties te vinden.', gratis: 'Gratis te gebruiken' },
      { slug: 'claude', reden: 'Sterk in het ontleden en samenvatten van lange, complexe papers en het structureren van je argumentatie of methodesectie.', gratis: 'Gratis versie' },
      { slug: 'deepl', reden: 'Vertaal anderstalige vakliteratuur nauwkeurig zonder dat nuance verloren gaat.', gratis: 'Gratis voor losse teksten' },
    ],
    gratisNote: 'Je komt ver met gratis accounts: Elicit en Consensus bieden allebei een gratis instap die genoeg is om een onderwerp af te tasten en de eerste sleutelpublicaties te vinden. Perplexity en NotebookLM zijn gratis voor brede verkenning en het bevragen van je eigen pdf-collectie. Voor een grote systematische review loont een betaald Elicit-abonnement — test eerst gratis.',
    faqs: [
      { question: 'Kan ik op deze AI-samenvattingen vertrouwen, of hallucineren ze?', answer: 'Ook tools mét bronvermelding kunnen een bevinding net iets anders weergeven dan in het origineel staat. Behandel een AI-samenvatting als aanwijzing, nooit als bewijs: open de geciteerde paper en controleer de claim in de bron voordat je hem overneemt. Elicit, Consensus en NotebookLM verwijzen terug naar de passage, maar de verificatie blijft jouw verantwoordelijkheid.' },
      { question: 'Wat doe ik tegen verzonnen citaties?', answer: 'Een generieke chatbot kan plausibel ogende maar niet-bestaande referenties produceren. Vraag nooit aan een gewone chatbot om je literatuurlijst; gebruik tools die echte papers indexeren (Elicit, Consensus). Verifieer elke referentie in een echte database (DOI, PubMed, je bibliotheekcatalogus) voor hij in je manuscript belandt.' },
      { question: 'Mag dit van mijn instelling en tijdschrift?', answer: 'Veel uitgevers en universiteiten vragen transparantie: vermeld in je methode of acknowledgements welke AI-tools je gebruikte en waarvoor. AI mag je literatuur helpen vinden en samenvatten, maar de wetenschappelijke conclusies en de tekst blijven jouw werk. Check het AI-beleid van je doeltijdschrift en instelling.' },
    ],
  },

  'zzp': {
    key: 'zzp',
    title: 'AI-tools voor zzp\'ers',
    metaTitle: `AI-tools voor zzp'ers — minder administratie, meer factureerbare tijd (${year})`,
    metaDescription: 'De beste AI-tools voor zzp\'ers: boekhouding automatiseren, offertes en klantmails schrijven en je huisstijl maken. Met aandacht voor kosten, AVG en hoeveel tijd het echt scheelt.',
    intro: [
      'Als zzp\'er ben je je eigen boekhouder, marketeer en officemanager tegelijk. Nederlandse ondernemers besteden gemiddeld zo\'n 15 uur per maand aan administratie — elk uur dat je daaraan kwijt bent kun je niet factureren. Daar zit de winst van AI: facturen en bankmutaties automatisch koppelen, je btw voorbereiden, en in minuten een nette offerte of klantmail schrijven.',
      'AI hoeft je accountant niet te vervangen, maar neemt het herhaalwerk uit handen zodat jij je op klanten richt. Hieronder de tools die zzp\'ers in Nederland het snelst tijdwinst opleveren, met aandacht voor kosten en AVG.',
    ],
    picks: [
      { slug: 'moneybird', reden: 'Gebruiksvriendelijk Nederlands boekhoudpakket dat facturen en bankmutaties automatisch koppelt; fijne mobiele app voor onderweg.', gratis: 'Gratis te proberen' },
      { slug: 'jortt', reden: 'Automatiseert je boekhouding met een Boekhoudbot die mutaties boekt en je btw-aangifte en jaarrekening opbouwt — sterk als je zo min mogelijk wilt omkijken.', gratis: 'Gratis startniveau' },
      { slug: 'tellow', reden: 'Boekhouding speciaal op zzp\'ers gericht, met automatische koppeling van facturen en banktransacties.', gratis: 'Gratis instap' },
      { slug: 'chatgpt', reden: 'Schrijf in minuten offertes, klantmails, concept-voorwaarden en social posts in jouw toon.', gratis: 'Ruime gratis versie' },
      { slug: 'canva-ai', reden: 'Maak zelf je logo, visitekaartjes, offerte-sjablonen en social content zonder ontwerper.', gratis: 'Royale gratis versie' },
      { slug: 'gamma', reden: 'Zet een paar bullets om in een verzorgde pitch of klantpresentatie.', gratis: 'Gratis met credits' },
      { slug: 'boekie-ai', reden: 'Nederlandse AI-hulp die je administratie en bonnetjes-verwerking vereenvoudigt.', gratis: 'Gratis te proberen' },
    ],
    gratisNote: 'Voor de communicatiekant betaal je weinig tot niets: de gratis versies van ChatGPT, Canva en Gamma dekken offertes, klantmails, huisstijl en presentaties. De boekhoudpakketten (Moneybird, Jortt, Tellow) zijn betaald maar bieden allemaal een gratis proefperiode — vaak vanaf ~€10-15 per maand, ruim minder dan de uren die je bespaart.',
    faqs: [
      { question: 'Hoeveel tijd levert AI me echt op als zzp\'er?', answer: 'De grootste winst zit in geautomatiseerde boekhouding: bankmutaties en facturen die zichzelf koppelen schelen makkelijk enkele uren per maand. Daarbovenop bespaart een AI-tekstassistent tijd op offertes en klantmails. Geen magie, maar wel het wegnemen van saai herhaalwerk waar je je marge op verliest.' },
      { question: 'Hoe zit het met de AVG als ik klantgegevens in AI stop?', answer: 'Wees voorzichtig met persoonsgegevens van klanten. Zet geen gevoelige of herleidbare klantdata in een gewone chatbot zonder zakelijke voorwaarden, en kies voor je boekhouding Nederlandse pakketten (Moneybird, Jortt, Tellow) die op de Nederlandse regelgeving zijn ingericht. Anonimiseer waar je kunt.' },
      { question: 'Vervangt AI mijn boekhouder?', answer: 'Nee. AI en moderne boekhoudsoftware nemen het invoer- en koppelwerk over en bereiden je btw-aangifte voor, maar voor je inkomstenbelasting, fiscale keuzes en complexe situaties blijft een boekhouder waardevol. Zie AI als de assistent die het routinewerk doet.' },
    ],
  },

  'freelancers': {
    key: 'freelancers',
    title: 'AI-tools voor freelancers',
    metaTitle: `AI-tools voor freelancers — sneller content, beeld en acquisitie (${year})`,
    metaDescription: 'De beste AI-tools voor freelancers: content en beeld sneller maken, jezelf zichtbaar maken en klanten binnenhalen. Met eerlijke kijk op terugverdienen, AVG en onderscheidend blijven.',
    intro: [
      'Als freelancer verkoop je je tijd én je output. Hoe sneller je kwaliteit levert, hoe meer opdrachten je aankunt. Tegelijk gaat veel tijd op aan niet-factureerbare dingen: pitches schrijven, je portfolio en social bijhouden, beeld maken en acquisitie. AI helpt je die niet-declarabele uren in te dikken.',
      'De kunst is AI strategisch inzetten: gebruik het om concepten en eerste versies te versnellen en beeld te maken zonder dure tools, terwijl jij de eindredactie en de menselijke laag verzorgt waar klanten je voor inhuren.',
    ],
    picks: [
      { slug: 'copy.ai', reden: 'Maakt in seconden meerdere varianten van advertentieteksten, productbeschrijvingen en landingspagina-copy — fijn voor marketing-opdrachten.', gratis: 'Gratis instap' },
      { slug: 'jasper', reden: 'Sterke schrijfassistent voor blogs, e-mails en adcopy die zich aanpast aan jouw toon en branche.', gratis: undefined },
      { slug: 'canva-ai', reden: 'Ontwerp client-presentaties, social posts en visuals zonder designtool — snel professioneel beeld leveren.', gratis: 'Royale gratis versie' },
      { slug: 'chatgpt', reden: 'Brainstorm pitches, schrijf voorstellen en klantmails, en versnel je conceptfase.', gratis: 'Ruime gratis versie' },
      { slug: 'typefully', reden: 'Plan en schrijf je posts om jezelf als freelancer zichtbaar te maken en opdrachten aan te trekken.', gratis: 'Gratis basisversie' },
      { slug: 'descript', reden: 'Bewerk video en podcast als een tekstdocument en haal er moeiteloos clips uit voor je portfolio en socials.', gratis: 'Gratis startniveau' },
      { slug: 'midjourney', reden: 'Genereer onderscheidend beeld voor je eigen merk of voor creatieve opdrachten.', gratis: undefined },
    ],
    gratisNote: 'De meeste content- en acquisitietaken kun je gratis starten: ChatGPT, Canva, Copy.ai, Typefully en Gamma hebben allemaal een gratis niveau dat ruim genoeg is om te beginnen en klanten te bedienen. Voor zwaarder werk — veel beeld (Midjourney) of intensieve copy (Jasper) — loont een betaald plan; test eerst de gratis varianten.',
    faqs: [
      { question: 'Verdienen deze tools zich terug voor een freelancer?', answer: 'Reken simpel: bespaart een tool je per week een paar niet-declarabele uren op concepten, beeld of acquisitie, en gebruik je die tijd voor betaald werk, dan verdient een abonnement van enkele tientjes zich snel terug. Begin gratis, meet of het echt tijd oplevert, en upgrade pas als het zich bewijst.' },
      { question: 'Mag ik AI-content aan mijn klanten leveren, en hoe zit het met de AVG?', answer: 'Wees transparant naar je klant over AI-gebruik en lever nooit onbewerkte AI-output: jouw eindredactie en oordeel zijn waar je voor wordt ingehuurd. Zet geen vertrouwelijke klantdata in een gewone chatbot zonder zakelijke voorwaarden, en check bij beeld- en muziektools de gebruiksrechten voor commercieel werk.' },
      { question: 'Hoe blijf ik onderscheidend als iedereen dezelfde AI gebruikt?', answer: 'AI versnelt de basis, maar je waarde zit in je smaak, strategie en stem. Gebruik AI voor het ruwe werk en eerste versies, en stop je eigen expertise in de eindversie. Klanten huren steeds vaker juist freelancers in die AI strategisch op een écht probleem kunnen inzetten — laat dat zien in je pitches en portfolio.' },
    ],
  },
  'docenten': {
    key: 'docenten',
    title: 'AI-tools voor docenten',
    metaTitle: `AI-tools voor docenten — sneller lesgeven, leerlingdata veilig (2026)`,
    metaDescription: 'AI-tools voor docenten: lesvoorbereiding, toetsvragen en differentiatie in minuten. Veel gratis te starten, met eerlijke AVG-uitleg over leerlingdata.',
    intro: [
      'Je avond gaat op aan lessen voorbereiden, toetsen maken en feedback geven aan dertig leerlingen tegelijk. Differentiëren voor het snelle groepje én de leerlingen die extra uitleg nodig hebben kost tijd die je gewoon niet hebt. Voor je het weet zit je op zondagavond nog vragen te typen.',
      'AI neemt het saaie deel over: een eerste opzet van een les, tien varianten van een oefenvraag, of een tekst herschreven op drie niveaus. Maar het blijft een conceptmotor die soms zelfverzekerd onzin verkoopt — jij blijft de vakdocent die controleert, en leerlinggegevens horen er niet zomaar in.',
    ],
    picks: [
      { slug: 'chatgpt', reden: 'De breedste werkpaard voor lesopzetten, oefenvragen op niveau en snelle uitlegteksten — start gratis en is meteen bruikbaar.', gratis: 'Gratis tier met een sterk model; betaald (±€20/mnd) voor meer snelheid en betere modellen.' },
      { slug: 'claude', reden: 'Schrijft langere, genuanceerde teksten en leesopdrachten netjes en houdt structuur goed vast — fijn voor uitgebreide nakijkmodellen.', gratis: 'Gratis te gebruiken met daglimieten; betaald voor meer volume.' },
      { slug: 'notebooklm', reden: 'Upload je eigen lesmethode of bronnen en laat het alleen dáárop antwoorden — veel minder verzinsels dan een open chatbot.', gratis: 'Gratis te gebruiken met een Google-account.' },
      { slug: 'gamma', reden: 'Maakt van een paar bullets een complete lespresentatie of hand-out, zodat je niet meer met opmaak hoeft te stoeien.', gratis: 'Gratis startplan met een creditlimiet; betaald voor onbeperkt en eigen huisstijl.' },
      { slug: 'canva-ai', reden: 'Werkbladen, posters en visueel lesmateriaal maken zonder ontwerpkennis, met AI die beeld en tekst aanvult.', gratis: 'Canva is gratis; veel AI-functies zitten in het betaalde plan (gratis voor onderwijs via Canva for Education).' },
      { slug: 'goblin-tools', reden: 'Hakt grote opdrachten in behapbare stapjes — ideaal om mee te differentiëren voor leerlingen die overzicht missen.', gratis: 'Webversie is gratis; de app kost eenmalig een klein bedrag.' },
      { slug: 'gemini', reden: 'Zit dicht op Google Docs en Slides, dus handig als je school al met Google Workspace werkt.', gratis: 'Gratis tier; uitgebreidere functies in Google Workspace-abonnementen.' },
      { slug: 'quillbot', reden: 'Herschrijft en vereenvoudigt teksten naar een lager leesniveau — snel materiaal toegankelijk maken voor zwakkere lezers.', gratis: 'Gratis met woordlimiet per keer; premium voor langere teksten.' },
    ],
    gratisNote: 'Voor lesvoorbereiding kun je een heel eind komen zonder iets te betalen: ChatGPT, Claude, Gemini, NotebookLM en de webversie van Goblin Tools hebben bruikbare gratis varianten. Je gaat pas betalen als je veel volume draait, snellere of betere modellen wilt, of presentaties zonder watermerk. Canva is voor scholen vaak gratis via Canva for Education — vraag dat na bij je ICT-coördinator voor je een abonnement koopt.',
    faqs: [
      { question: 'Mag ik leerlinggegevens of namen in een AI-tool zetten?', answer: 'Liever niet, en bij gratis chatbots zeker niet. Onder de AVG zijn cijfers, namen, zorgvragen en gedragsobservaties persoonsgegevens van minderjarigen — extra beschermd. In gratis consumentenversies kan je invoer gebruikt worden voor training en je hebt geen verwerkersovereenkomst. Werk daarom met geanonimiseerde voorbeelden ("een leerling die…") of gebruik alleen tools die je school via een licentie met AVG-afspraken heeft afgenomen. Check het altijd met je privacy- of ICT-coördinator.' },
      { question: 'Kan ik AI laten nakijken en op de uitkomst vertrouwen?', answer: 'Voor het maken van een nakijkmodel of het signaleren van veelgemaakte fouten: prima hulp. Voor het daadwerkelijk becijferen: nee, niet blind. AI mist context, kan een goed antwoord fout rekenen en andersom, en je blijft als docent verantwoordelijk voor het cijfer. Gebruik het om sneller te beginnen, niet om de eindbeoordeling uit handen te geven.' },
      { question: 'Hoe voorkom ik dat AI feitelijke fouten in mijn lesmateriaal stopt?', answer: 'Controleer elk feit, elke jaartal en elke som — een chatbot klinkt overtuigend ook als het ernaast zit. Een tool als NotebookLM die alleen uit jouw geüploade bronnen put, hallucineert flink minder dan een open chatbot. Vuistregel: AI levert de eerste versie, jij bent de vakredacteur die hem goedkeurt.' },
    ],
  },
  'juristen': {
    key: 'juristen',
    title: 'AI-tools voor juristen',
    metaTitle: `AI-tools voor juristen — sneller reviewen, zonder hallucinaties (2026)`,
    metaDescription: 'AI-tools voor juristen en advocaten: contractanalyse, documentreview en onderzoek. Eerlijk over hallucinaties, verificatieplicht en vertrouwelijkheid van cliëntdata.',
    intro: [
      'Een datakamer met honderden contracten, een due diligence onder tijdsdruk, of een memo dat gisteren af moest — het leeuwendeel van je tijd gaat op aan lezen, vergelijken en samenvatten. Werk dat noodzakelijk is, maar zelden de reden waarom je rechten ging studeren.',
      'AI versnelt juist dat zware leeswerk: clausules markeren, afwijkingen van je standaard signaleren, een eerste samenvatting leveren. De harde grens is verificatie — een model verzint moeiteloos een jurisprudentieverwijzing die niet bestaat. Algemene chatbots zijn bovendien ongeschikt voor vertrouwelijke cliëntdata. Behandel elke output als concept van een junior die je nakijkt.',
    ],
    picks: [
      { slug: 'harvey', reden: 'Speciaal voor advocatuur gebouwd, met juridische beveiliging en workflows — de serieuze keuze als kantoor, niet een algemene chatbot.' },
      { slug: 'spellbook', reden: 'Werkt direct in Word voor contractreview en -opstellen: markeert risico\'s en stelt clausules voor waar je al schrijft.' },
      { slug: 'ironclad', reden: 'Sterk in contractmanagement op schaal: review, goedkeuringsflows en het bewaken van je eigen standaardvoorwaarden.' },
      { slug: 'claude', reden: 'Goed in lange, genuanceerde documenten samenvatten en redeneren — bruikbaar voor algemeen werk, mits zonder cliëntdata.' },
      { slug: 'notebooklm', reden: 'Antwoordt alleen op basis van de stukken die jij uploadt en verwijst naar de bron — minder verzinsels bij dossieronderzoek.' },
      { slug: 'deepl', reden: 'Beste keuze voor juridisch verantwoorde vertalingen van contracten en correspondentie, met zakelijke privacy-opties.' },
      { slug: 'chatgpt', reden: 'Handig voor algemeen schrijf- en denkwerk en brainstorm, maar uitdrukkelijk niet voor vertrouwelijke dossiers in de gratis versie.' },
    ],
    gratisNote: 'De algemene tools (ChatGPT, Claude, NotebookLM, DeepL) hebben gratis varianten waarmee je het type werk kunt verkennen — maar gebruik die nóóit voor cliëntgegevens. De juridisch gespecialiseerde pakketten (Harvey, Spellbook, Ironclad) hebben geen vrijblijvend gratis plan; dat zijn kantoorlicenties op offertebasis, juist omdat ze verwerkersafspraken, data-isolatie en juridische bronnen leveren die je betaalt. Eerlijk: gratis is hier vooral om te oefenen, niet om productie op te draaien.',
    faqs: [
      { question: 'Mag ik vertrouwelijke cliëntinformatie in een AI-tool plakken?', answer: 'Niet in een algemene consumentenchatbot. Je hebt een geheimhoudingsplicht en de AVG verlangt een verwerkersovereenkomst en grip op waar data heen gaat. Gratis ChatGPT of Claude bieden dat niet en kunnen je invoer gebruiken voor training. Voor cliëntdata gebruik je alleen een zakelijke oplossing met data-isolatie, een verwerkersovereenkomst en bij voorkeur EU-hosting — dat is precies waarvoor Harvey, Spellbook en Ironclad bestaan. Anonimiseer anders volledig.' },
      { question: 'Kan ik op de juridische output vertrouwen, of moet ik alles narekenen?', answer: 'Alles narekenen. AI hallucineert jurisprudentie, wetsartikelen en citaten die overtuigend ogen maar niet bestaan — er zijn advocaten beboet omdat ze verzonnen uitspraken indienden. Behandel elke verwijzing als onbevestigd tot je hem in de officiële bron hebt teruggevonden. AI versnelt het zoeken; het vervangt je verificatie niet.' },
      { question: 'Waarom zou ik geen gewone ChatGPT gebruiken voor mijn juridische werk?', answer: 'Voor neutrale taken — een memo herschrijven, een gedachte structureren, een publieke tekst samenvatten — kan het prima. Het probleem ontstaat zodra het cliëntdata raakt of zodra je op de juridische juistheid leunt. Een algemene chatbot kent jouw rechtsgebied niet, citeert geen geverifieerde bronnen en biedt geen vertrouwelijkheidsgaranties. Gebruik het als slimme assistent voor het omringende werk, niet als juridische bron.' },
    ],
  },
  'recruiters': {
    key: 'recruiters',
    title: 'AI-tools voor recruiters',
    metaTitle: `AI-tools voor recruiters — werving is hoog-risico onder de AI Act (2026)`,
    metaDescription: 'AI-tools voor recruiters: vacatures, screening en kandidaatcommunicatie. Eerlijk over de EU AI Act (werving = hoog-risico), bias en verplichte menselijke controle.',
    intro: [
      'Honderd sollicitaties op één vacature, kandidaten die afhaken omdat het te lang stil blijft, en intussen moet de volgende vacaturetekst ook nog de deur uit. Werving is volumewerk met hoge inzet: elke fout in screening raakt een mens én je werkgeversmerk.',
      'AI helpt met de bulk — vacatures schrijven, kandidaten snel te woord staan, een eerste schifting maken. Maar let op: werving valt onder de EU AI Act als hoog-risico (Annex III). Vanaf 2 augustus 2026 gelden harde eisen rond bias-testen, transparantie en menselijke controle, met boetes tot 15 miljoen euro of 3% van de wereldwijde omzet. AI mag hier ondersteunen, niet beslissen.',
    ],
    picks: [
      { slug: 'paradox', reden: 'Conversational recruiting-assistent (Olivia) die kandidaten 24/7 te woord staat, screent en inplant — sterk bij hoog-volume werving.' },
      { slug: 'breezy-hr', reden: 'Toegankelijk ATS met AI-ondersteuning voor de hele pijplijn, fijn voor mkb dat zonder zwaar systeem wil starten.' },
      { slug: 'zoho-recruit', reden: 'Compleet wervings-ATS met AI-matching, gunstig geprijsd en geschikt voor bureaus én interne recruitment.' },
      { slug: 'hirevue', reden: 'Video-interview- en assessmentplatform; krachtig, maar juist hier moet je de bias- en AI Act-eisen het scherpst bewaken.' },
      { slug: 'chatgpt', reden: 'Snel inclusieve vacatureteksten, outreach-berichten en interviewvragen opstellen — zonder kandidaatdata erin.', gratis: 'Gratis tier ruim voldoende voor schrijfwerk; betaald voor meer volume.' },
      { slug: 'claude', reden: 'Schrijft genuanceerde, warme kandidaatcommunicatie en gestructureerde functieprofielen — sterk in toon en lange teksten.', gratis: 'Gratis te gebruiken met daglimieten.' },
    ],
    gratisNote: 'Voor het schrijfwerk — vacatures, afwijzingsmails, interviewvragen — komt je met de gratis varianten van ChatGPT en Claude een heel eind. De echte wervingsplatformen (Paradox, Breezy HR, Zoho Recruit, HireVue) zijn betaalde abonnementen, meestal per gebruiker of per vacature; sommige bieden een proefperiode. Reken niet op een blijvend gratis ATS: je betaalt voor integratie, opslag van kandidaatdata en — niet onbelangrijk — de compliance-functies die je onder de AI Act nodig hebt.',
    faqs: [
      { question: 'Mag ik AI gebruiken om sollicitanten te screenen onder de EU AI Act?', answer: 'Ja, maar onder strikte voorwaarden. Werving en selectie staan expliciet in Annex III als hoog-risico, en vanaf 2 augustus 2026 gelden de volle verplichtingen: risicobeoordeling, bias-testen, technische documentatie, transparantie naar kandidaten én betekenisvolle menselijke controle. AI mag een voorselectie ondersteunen, maar een mens moet de beslissing nemen en kunnen overrulen. Volledig automatisch afwijzen op basis van een algoritme is een groot risico — boetes lopen op tot 15 miljoen euro of 3% van de wereldwijde omzet.' },
      { question: 'Hoe voorkom ik dat de AI mijn kandidaten discrimineert?', answer: 'Je kunt het niet aanzetten en vertrouwen. AI leert van historische data en reproduceert bestaande vooroordelen — om geslacht, leeftijd, afkomst of een gat in het cv. Test je systeem op bias, laat de leverancier aantonen hoe het getoetst is, kijk nooit alleen naar een score maar naar de onderbouwing, en houd een mens in elke beslissing. Onder de AVG en de AI Act moet je dit bovendien kunnen aantonen en uitleggen aan kandidaten.' },
      { question: 'Wat mag ik kandidaten wel en niet vertellen over AI in mijn proces?', answer: 'Transparantie is verplicht, geen nette-toe. Kandidaten hebben er recht op te weten dat er AI in het selectieproces zit, en bij een geautomatiseerd besluit recht op uitleg en op menselijke tussenkomst (AVG-artikel 22). Zet het duidelijk in je vacature of sollicitatieflow. Verstop het niet — het ondermijnt vertrouwen én is in strijd met de regels.' },
    ],
  },
  'accountants': {
    key: 'accountants',
    title: 'AI-tools voor accountants',
    metaTitle: `AI-tools voor accountants — bonnen automatisch boeken, AVG-proof (2026)`,
    metaDescription: 'AI-tools voor accountants en boekhouders: bonherkenning, boekingen automatiseren en rapporten. Eerlijk over wat NL-pakketten écht autonoom doen en AVG.',
    intro: [
      'Een schoenendoos vol bonnen, bankregels die elke maand opnieuw langs moeten, en aan het eind van het kwartaal de rapportage die toch weer handwerk wordt. Het repetitieve invoerwerk vreet uren die je liever aan advies en controle besteedt.',
      'AI is hier inmiddels volwassen: bonnen en facturen worden automatisch uitgelezen, herkend en als boekingsvoorstel klaargezet. Belangrijke nuance — Nederlandse pakketten dóén dat vooral als voorstel, niet volledig autonoom. Jij blijft de boekingen controleren, want fouten in de cijfers zijn jouw verantwoordelijkheid, en cliëntadministraties vallen onder de AVG.',
    ],
    picks: [
      { slug: 'moneybird', reden: 'Populairst onder NL-ondernemers en accountants: slimme bonherkenning en boekingsvoorstellen, simpel en betaalbaar.', gratis: 'Geen blijvend gratis plan, wel een proefperiode; abonnement vanaf een laag maandbedrag.' },
      { slug: 'rossum', reden: 'Sterkste pure AI-documentverwerking: leest complexe facturen betrouwbaar uit, ideaal bij hoog factuurvolume.' },
      { slug: 'vic-ai', reden: 'Gebouwd om crediteurenadministratie te automatiseren met AI die leert van je boekingen — voor de grotere praktijk.' },
      { slug: 'jortt', reden: 'Volledig Nederlands online boekhoudpakket met automatische bankkoppeling en herkenning, gericht op zzp en mkb.', gratis: 'Beperkt gratis startplan voor zzp; uitgebreidere functies betaald.' },
      { slug: 'informer', reden: 'Nederlands pakket met sterke automatisering en accountantskoppeling, fijn voor samenwerking met je klanten.' },
      { slug: 'tellow', reden: 'Eenvoudig NL-pakket dat bonnetjes uit een foto haalt en boekt — laagdrempelig voor zzp\'ers en hun boekhouder.' },
      { slug: 'xero', reden: 'Internationaal sterk pakket met brede integraties en AI-functies; relevant bij klanten die over de grens werken.' },
      { slug: 'chatgpt', reden: 'Handig voor het toelichten van rapporten, concept-adviesteksten en uitleg aan klanten — nooit met herleidbare cliëntdata.', gratis: 'Gratis tier voldoende voor schrijf- en uitlegwerk.' },
    ],
    gratisNote: 'Echt gratis is in dit segment schaars: de meeste NL-pakketten (Moneybird, InformER, Tellow) werken met een proefperiode en daarna een maandabonnement; Jortt heeft een beperkt gratis startplan voor zzp. De AI-documentverwerkers (Rossum, Vic.ai) zijn zakelijke oplossingen op offertebasis. Je betaalt vooral voor de bankkoppeling, opslag en betrouwbare herkenning. ChatGPT kun je gratis inzetten voor toelichtingen en adviesteksten — maar zonder herleidbare klantgegevens.',
    faqs: [
      { question: 'Boeken deze tools echt volledig zelf, of moet ik nog controleren?', answer: 'Controleren blijft. NL-pakketten als Moneybird, Jortt en Tellow herkennen bonnen en zetten een boekingsvoorstel klaar — vaak heel accuraat — maar het blijft een voorstel dat jij goedkeurt. Echt autonoom boeken zonder controle is risicovol: btw-codes, kostenplaatsen en uitzonderingen gaan mis. Zie de AI als een snelle stagiair die voorsorteert; de eindverantwoordelijkheid voor de juistheid van de cijfers ligt bij jou.' },
      { question: 'Mag ik cliëntadministraties door deze AI-tools laten verwerken (AVG)?', answer: 'Ja, mits je het netjes regelt. Een administratie bevat persoonsgegevens, dus je hebt een verwerkersovereenkomst met de leverancier nodig en je moet weten waar de data staat — bij voorkeur binnen de EU. De gevestigde NL-boekhoudpakketten zijn hierop ingericht en leveren die overeenkomst. Een algemene chatbot als ChatGPT is dat niet: gooi daar dus nooit een complete grootboekexport met namen en bedragen in.' },
      { question: 'Wat levert het me op om hierop over te stappen?', answer: 'De winst zit in het verdwijnen van overtypwerk: bonnen en facturen die zichzelf uitlezen schelen al snel uren per klant per maand, vooral bij volume. Reken wel op een inwerkperiode waarin de herkenning van jouw klanten leert — de eerste weken controleer je meer, daarna minder. De terugverdientijd hangt af van je factuurvolume; bij veel kleine transacties is die kort, bij een paar grote facturen per maand minder dramatisch.' },
    ],
  },
  'sales': {
    key: 'sales',
    title: 'AI-tools voor sales',
    metaTitle: `AI-tools voor sales — gerichte outreach zonder spam (2026)`,
    metaDescription: 'AI-tools voor B2B-sales: prospecting, gepersonaliseerde outreach en CRM-verrijking. Eerlijk over spam-risico, datakwaliteit en AVG bij koude benadering.',
    intro: [
      'Je dag verdwijnt in lijsten bouwen, e-mailadressen opzoeken, het CRM bijwerken en berichten typen die toch generiek aanvoelen. Hoe meer je automatiseert, hoe groter de verleiding om gewoon iedereen te mailen — precies waar het misgaat.',
      'AI maakt prospecting en personalisatie schaalbaar: data verrijken, signalen vinden, berichten op maat schrijven. De eerlijke nuance: schaal zonder kwaliteit is gewoon spam met een sausje. Slechte data en massaberichten verbranden je domeinreputatie én lopen tegen AVG-grenzen aan. Gebruik AI om relevánter te zijn, niet luider.',
    ],
    picks: [
      { slug: 'clay', reden: 'Krachtigste tool voor dataverrijking en research-automatisering: bouwt verrijkte prospectlijsten en personaliseert op echte signalen.', gratis: 'Gratis startplan met beperkte credits; betaald voor volume en integraties.' },
      { slug: 'apollo-io', reden: 'All-in-one prospecting: groot B2B-contactenbestand, sequences en CRM-functies in één — sterke prijs-kwaliteit om te starten.', gratis: 'Gratis plan met maandelijkse credits; betaald voor meer contacten en functies.' },
      { slug: 'hubspot-ai', reden: 'AI ingebouwd in een volwaardig CRM: dealinzichten, e-mailhulp en contentgeneratie waar je sales toch al draait.', gratis: 'HubSpot heeft gratis CRM-tier; AI-functies grotendeels in betaalde plannen.' },
      { slug: 'lindy', reden: 'Bouwt AI-agents die routineklusjes in je salesflow overnemen (opvolging, dataverzameling) zonder code.' },
      { slug: 'relevance-ai', reden: 'Laat je AI-agents en -workflows bouwen voor lead-research en CRM-taken — flexibel als je eigen processen wilt automatiseren.' },
      { slug: 'chatgpt', reden: 'Snel persoonlijke openers, follow-ups en bezwaarafhandeling schrijven — mits je echte context meegeeft, geen generieke prompt.', gratis: 'Gratis tier voldoende voor schrijfwerk.' },
      { slug: 'claude', reden: 'Schrijft natuurlijke, niet-verkoperige berichten en lange gepersonaliseerde sequences met goede toon.', gratis: 'Gratis te gebruiken met daglimieten.' },
    ],
    gratisNote: 'De meeste salestools (Clay, Apollo, HubSpot) hebben een gratis instap met beperkte credits of contacten — genoeg om te testen, te krap voor serieus volume. Daarna betaal je per gebruiker of per verrijkingscredit, en dat loopt op naarmate je opschaalt. ChatGPT en Claude kun je gratis inzetten voor het schrijfwerk. Let op: goedkope of gescrapete contactdata bestaat niet echt gratis — slechte data kost je later in bounces en reputatie.',
    faqs: [
      { question: 'Mag ik koude e-mails sturen naar zakelijke contacten onder de AVG?', answer: 'Naar zakelijke (B2B) e-mailadressen mag koude benadering in Nederland, maar niet vrijblijvend. Een e-mailadres als info@ of een naam@bedrijf is een persoonsgegeven, dus je hebt een gerechtvaardigd belang nodig, je moet relevant zijn voor het werk van de ontvanger, en elke mail moet een duidelijke afmeldoptie hebben. Naar persoonlijke adressen en consumenten gelden strengere regels. Massaal scrapen en ongericht mailen valt daar buiten — en is precies wat je domein de das omdoet.' },
      { question: 'Hoe voorkom ik dat geautomatiseerde outreach als spam wordt gezien?', answer: 'Door kwaliteit boven volume te zetten. Spamfilters en ontvangers prikken zo door AI-bulk met een neppersoonlijk laagje heen. Verrijk op echte signalen (een functiewissel, een vacature, recent nieuws), beperk je volume, verstuur vanaf een goed opgewarmd domein en schrijf alsof het naar één persoon gaat. AI mag je helpen relevanter te worden; gebruik je het om méér ongericht te mailen, dan verbrandt je je afzenderreputatie.' },
      { question: 'Hoe betrouwbaar is de data die deze tools aanleveren?', answer: 'Wisselend, en dat onderschat iedereen. Contact- en bedrijfsdata veroudert snel: mensen wisselen van baan, e-mailpatronen kloppen niet altijd, en AI-verrijking gokt soms. Reken op een foutmarge, verifieer cruciale velden voor je grootschalig verstuurt, en ruim bounces direct op. Slechte data die je toch gebruikt, kost je niet alleen deals maar ook je deliverability — de verborgen prijs van \'gratis\' lijsten.' },
    ],
  },
  'marketeers': {
    key: 'marketeers',
    title: 'AI-tools voor marketeers',
    metaTitle: `AI-tools voor marketeers — content op schaal zonder eenheidsworst (2026)`,
    metaDescription: 'AI-tools voor marketeers: content, ads en SEO sneller maken. Onafhankelijk getest, geen affiliate. Welke gratis kan en waar je menselijke eindredactie écht nodig hebt.',
    intro: [
      'Je moet content leveren voor meer kanalen dan er uren in een dag zitten: blogs, nieuwsbrieven, social, advertenties, landingspagina\'s. De druk om "meer met minder" te doen is precies waar AI binnenkomt — en precies waar het misgaat als je niet oplet.',
      'AI versnelt de eerste 80%: ruwe teksten, varianten, ad-concepten, SEO-onderzoek. Maar de laatste 20% — merkstem, feitencheck, een hoek die niet klinkt als elke andere LinkedIn-post — blijft mensenwerk. Gebruik deze tools als versneller, niet als vervanger van je oordeel.',
    ],
    picks: [
      { slug: 'chatgpt', reden: 'De breedste werkpaard voor briefings, brainstorm, herschrijven en e-mailflows — als je er één kiest om mee te beginnen, is dit het.', gratis: 'Gratis tier met GPT-degelijk model; betaald (~$20/mnd) voor de sterkere modellen en hogere limieten.' },
      { slug: 'jasper', reden: 'Gebouwd rond merkstem en marketing-workflows, met team-features en brand voice die je één keer instelt en overal hergebruikt.' },
      { slug: 'semrush', reden: 'Voor SEO- en concurrentieonderzoek is dit de standaard; de AI-laag helpt bij keyword-clustering en content-briefs, maar de data is de echte waarde.' },
      { slug: 'copy.ai', reden: 'Sterk voor korte, herhalende formats (ad-copy, productteksten, social) waar je tientallen varianten in één keer wilt.', gratis: 'Beperkte gratis tier om te proeven; serieus gebruik vereist een betaald plan.' },
      { slug: 'adcreative', reden: 'Genereert ad-visuals en -varianten op schaal met focus op conversie — handig als je veel creatives moet testen zonder designer.', gratis: 'Gratis proefcredits; daarna abonnement op basis van het aantal gegenereerde creatives.' },
      { slug: 'typetone', reden: 'Nederlandstalige merkstem-tool: leert jouw tone of voice en levert teksten die minder "vertaald uit het Engels" klinken dan generieke schrijvers.', gratis: 'Gratis te proberen; betaald voor volume en team-gebruik.' },
      { slug: 'canva-ai', reden: 'De snelste weg van tekst naar bruikbare social-visuals en simpele video\'s, met merk-templates die je team consistent houden.', gratis: 'Royale gratis versie; Magic-/AI-features en merkkit grotendeels achter Canva Pro.' },
      { slug: 'vidiq', reden: 'Als YouTube of short-form video in je mix zit: titel-, thumbnail- en keyword-suggesties die echt op de algoritmes zijn afgestemd.', gratis: 'Gratis basisversie; AI-suggesties en diepere data in de betaalde tiers.' },
    ],
    gratisNote: 'Voor onderzoek en eerste drafts kom je verrassend ver met gratis tiers (ChatGPT, Canva, vidiQ). Zodra het om volume, merkstem-consistentie en samenwerking in een team gaat, loop je snel tegen limieten aan — dan zijn betaalde plannen (~$15–40/mnd per tool) eerlijk gezegd nodig. Stapel niet vijf abonnementen op tegelijk: begin met één schrijftool plus één SEO-tool en breid pas uit als je een echte bottleneck voelt.',
    faqs: [
      { question: 'Mag ik AI-gegenereerde teksten en ads commercieel gebruiken voor klanten?', answer: 'Bij de meeste tools (ChatGPT, Jasper, Copy.ai) krijg je de commerciële rechten op de output zodra je een betaald plan hebt; lees per tool de voorwaarden, want gratis tiers sluiten commercieel gebruik soms uit of vragen naamsvermelding. Belangrijker: AI-output is niet automatisch auteursrechtelijk beschermd en kan per ongeluk bestaande zinnen of merknamen bevatten. Behandel elke tekst als concept dat een mens eindredigeert en op feiten en plagiaat controleert vóór publicatie.' },
      { question: 'Krijg ik niet dezelfde generieke output als mijn concurrent?', answer: 'Ja, als je generieke prompts gebruikt krijg je generieke teksten — en die herkent iedereen inmiddels. Het verschil zit in jouw input: een ingestelde merkstem (Jasper, Typetone), je eigen voorbeelden, echte cijfers en een concrete hoek. Zie AI als een stagiair die snel typt, niet als de stem van je merk. De eindredactie door een mens is wat je content onderscheidt.' },
      { question: 'Hoe verdien ik een AI-tool-abonnement terug?', answer: 'Reken het simpel: kost een tool €30/mnd en bespaart het je vier uur per week aan ruwe schrijf- en onderzoekstijd, dan is dat ruim terugverdiend zodra je uurtarief boven ~€2 ligt. De valkuil is dat "sneller" verleidt tot "meer" — meer middelmatige content levert zelden meer resultaat op. Meet op output die telt (leads, conversie), niet op aantal geproduceerde stukken.' },
    ],
  },
  'e-commerce': {
    key: 'e-commerce',
    title: 'AI-tools voor e-commerce',
    metaTitle: `AI-tools voor webshops — productfoto's en teksten op schaal (2026)`,
    metaDescription: 'AI-tools voor e-commerce: productfoto\'s bijsnijden, teksten schalen, ads maken en klantenservice automatiseren. Eerlijk over duplicate-content-SEO en AVG bij klantdata.',
    intro: [
      'Een webshop met honderden producten betekent honderden productfoto\'s, beschrijvingen en klantvragen. Handmatig is het niet bij te benen, en uitbesteden is duur. Daar zit de aantrekkingskracht van AI: foto\'s bijwerken, teksten genereren en service automatiseren in een fractie van de tijd.',
      'AI is hier echt sterk voor het repetitieve werk — achtergronden weghalen, batch-bewerken, varianten draaien. Maar twee dingen blijven jouw verantwoordelijkheid: voorkom dat AI-productteksten als duplicate content je SEO schaden, en zorg dat klantdata in chatbots AVG-proof verwerkt wordt.',
    ],
    picks: [
      { slug: 'photoroom', reden: 'De snelste manier om productfoto\'s professioneel te maken: achtergrond weg, schaduw erbij, batch-verwerking en zelfs Shopify-publicatie.', gratis: 'Gratis met 250 exports/mnd, maar mét watermerk; vanaf ~$8/mnd watermerkvrij en met batch-export.' },
      { slug: 'removebg', reden: 'Doet één ding uitstekend — achtergrond verwijderen — en integreert overal; ideaal als je alleen clean cutouts nodig hebt.', gratis: 'Gratis preview in lage resolutie; volle resolutie en bulk via credits/abonnement.' },
      { slug: 'powertext', reden: 'Genereert productbeschrijvingen op schaal in het Nederlands, met velden per product zodat je niet honderd keer dezelfde prompt typt.' },
      { slug: 'canva-ai', reden: 'Voor banners, social-visuals en eenvoudige productvideo\'s met merk-templates — snel zonder designer.', gratis: 'Gratis basis; AI-features en merkkit in Canva Pro.' },
      { slug: 'adcreative', reden: 'Maakt en test advertentie-creatives op schaal, gericht op conversie — handig voor productcatalogi met veel SKU\'s.', gratis: 'Gratis proefcredits; daarna abonnement per volume.' },
      { slug: 'intercom-fin', reden: 'AI-klantenservice die echt productvragen, order- en retourvragen afhandelt en pas escaleert als het moet; betrouwbaarder dan een losse chatbot.', gratis: 'Geen gratis tier; prijs per opgeloste conversatie — reken door of het je supportkosten verlaagt.' },
      { slug: 'simplified', reden: 'All-in-one voor wie tekst, design en social in één tool wil houden zonder vijf abonnementen.', gratis: 'Gratis tier met limieten; betaald voor volume en merk-features.' },
      { slug: 'chatgpt', reden: 'Het flexibele vangnet: bulk-teksten herschrijven, SEO-varianten draaien, e-mails en FAQ\'s opstellen.', gratis: 'Gratis tier; betaald (~$20/mnd) voor sterkere modellen en limieten.' },
    ],
    gratisNote: 'Voor beeld kom je met gratis tiers (remove.bg preview, PhotoRoom met watermerk) een eind, maar voor een webshop wil je watermerkvrije, hoge-resolutie batch-export — dat is betaald, meestal $8–30/mnd. Klantenservice-AI zoals Intercom Fin rekent per opgeloste vraag en heeft geen gratis tier; reken eerst uit hoeveel support-uren je écht bespaart voordat je tekent.',
    faqs: [
      { question: 'Schaadt AI-gegenereerde producttekst mijn Google-ranking?', answer: 'Het risico zit niet in "AI" maar in duplicate en dunne content. Als elke productpagina dezelfde generieke AI-zinnen bevat — of dezelfde als de leverancier en je concurrenten — voegt Google weinig waarde toe en zak je weg. Gebruik AI om een eerste versie te maken, maar voeg per product unieke details, eigen specificaties en echte USP\'s toe. Google\'s eigen richtlijn is helder: het gaat om nuttige, originele content, ongeacht hoe die gemaakt is.' },
      { question: 'Mag ik klantdata door een AI-chatbot laten verwerken onder de AVG?', answer: 'Alleen met een verwerkersovereenkomst en duidelijkheid over waar de data staat. Een klantenservice-AI verwerkt namen, e-mails, ordergegevens en soms gevoelige info — dat is persoonsgegevens onder de AVG. Check of de leverancier een verwerkersovereenkomst (DPA) aanbiedt, of data binnen de EU blijft, en of gesprekken gebruikt worden om hun modellen te trainen (vaak uitschakelbaar voor zakelijke accounts). Zet nooit zomaar je volledige klantenbestand in een tool zonder dit geregeld te hebben.' },
      { question: 'Verdien ik een tool als PhotoRoom of Intercom Fin terug?', answer: 'Bij beeld is het meestal makkelijk: een fotograaf of editor voor honderden productfoto\'s kost al snel honderden euro\'s, terwijl PhotoRoom (~$8–27/mnd) datzelfde werk in uren doet. Bij klantenservice-AID ligt het genuanceerder — Fin rekent per opgeloste vraag, dus reken concreet: hoeveel vragen handelt het zonder mens af, en wat kost een support-uur jou? Als de AI 40% van je tickets sluit, weet je vrij snel of het uit kan.' },
    ],
  },
  'fotografen': {
    key: 'fotografen',
    title: 'AI-tools voor fotografen',
    metaTitle: `AI-tools voor fotografen — retouche en culling zonder je vak weg te geven (2026)`,
    metaDescription: 'AI-tools voor fotografen: achtergrond, retouche, upscaling en culling sneller. Eerlijk over auteursrecht, gegenereerde vs echte fotografie en wat je klant mag verwachten.',
    intro: [
      'Een shoot levert honderden foto\'s op, en daarna begint het echte werk: selecteren, retoucheren, upscalen, achtergronden fixen. Dat is precies het saaie, repetitieve deel waar AI je uren kan schelen — culling, batch-retouche, ruisreductie en achtergrond-cleanup.',
      'Maar bij fotografen ligt de lat hoger, want jouw product ís authenticiteit. AI is prima voor de technische klus achter de schermen. Zodra het beelden gáát genereren of gezichten gáát "verbeteren", raak je aan auteursrecht, klantverwachtingen en de vraag of het nog jouw fotografie is. Wees daar glashelder over — naar jezelf en naar je klant.',
    ],
    picks: [
      { slug: 'photoroom', reden: 'Snelste tool voor achtergrond verwijderen, vervangen en schaduwen — ideaal voor product- en e-commerce-werk in batch.', gratis: 'Gratis met watermerk en 250 exports/mnd; vanaf ~$8/mnd watermerkvrij.' },
      { slug: 'clipdrop', reden: 'Brede toolkit (achtergrond, upscaling, cleanup, relight) van Stability AI — veel losse fotografische taken in één plek.', gratis: 'Gratis tier met limieten; Pro voor hoge resolutie en meer bewerkingen.' },
      { slug: 'krea', reden: 'Sterk voor upscaling en enhancement van bestaande beelden zonder dat het er plastic uitziet — houdt detail beter vast dan veel concurrenten.' },
      { slug: 'adobe-firefly', reden: 'Getraind op gelicentieerd materiaal (Adobe Stock), dus het commercieel veiligste keuze voor generatieve fill en uitbreiden — integreert in Photoshop/Lightroom.', gratis: 'Maandelijkse gratis generatie-credits; daarna via Creative Cloud of los abonnement.' },
      { slug: 'removebg', reden: 'Doet de cutout perfect en snel als je alléén de achtergrond weg wilt; integreert in je bestaande workflow.', gratis: 'Gratis lage-resolutie preview; volle resolutie via credits.' },
      { slug: 'fotor', reden: 'Toegankelijke retouche- en enhancement-suite voor wie geen Photoshop-workflow wil — portretretouche, filters, upscaling.', gratis: 'Gratis basis met watermerk/limieten; Pro voor volledige functies.' },
    ],
    gratisNote: 'Voor occasioneel werk volstaan gratis tiers vaak, maar als professional loop je tegen watermerken, lage resolutie en exportlimieten aan — en dat wil je niet bij klantwerk. Reken op $8–30/mnd per tool. Let bij "gratis" generatieve tools extra op de licentie: gratis output mag soms níét commercieel gebruikt worden. Adobe Firefly is bewust de veiligere keuze omdat het op gelicentieerd materiaal is getraind.',
    faqs: [
      { question: 'Wie heeft het auteursrecht op een foto die ik met AI bewerk of genereer?', answer: 'Bij retouche en culling blijft het jouw auteursrecht — je bewerkt je eigen opname. Bij volledig gegenereerde beelden ligt het anders: puur door AI gemaakte beelden zijn in veel landen (waaronder via EU-rechtspraak) niet of beperkt auteursrechtelijk beschermd, omdat het menselijke scheppende werk ontbreekt. Bovendien zijn sommige generatieve modellen getraind op beelden zonder toestemming van de makers, wat juridisch betwist wordt. Wil je commercieel veilig zitten: gebruik AI voor het bewerken van je eigen opnames, en kies voor generatie een model dat op gelicentieerd materiaal traint (zoals Adobe Firefly).' },
      { question: 'Moet ik mijn klant vertellen dat ik AI heb gebruikt?', answer: 'Voor onzichtbare technische stappen — ruisreductie, culling, kleurcorrectie — verwacht niemand een disclaimer; dat is gewoon je vakmanschap. Maar zodra je elementen genéreert of toevoegt die er niet waren (een vervangen lucht, een weggehaalde voorbijganger, een AI-gegenereerde achtergrond), is transparantie verstandig en bij journalistiek of documentair werk zelfs verplicht. Spreek vooraf af wat de klant verwacht: "echte" fotografie of een bewerkte composiet. Verkeerde verwachtingen zijn de snelste weg naar een ontevreden klant.' },
      { question: 'Vervangt AI-culling en -retouche straks mijn vak?', answer: 'Het saaie deel, niet het waardevolle deel. AI is goed in volume — duizend foto\'s voorsorteren, batch-retoucheren — maar niet in de keuzes die jou inhuren: het moment vangen, lichtgevoel, de relatie met je onderwerp, een consistente stijl. Gebruik AI om de uren achter je scherm te halveren zodat je meer kunt shooten of hogere tarieven kunt rechtvaardigen. De fotografen die het lastig krijgen, zijn juist degenen die alléén op het technische bewerkwerk concurreerden.' },
    ],
  },
  'podcasters': {
    key: 'podcasters',
    title: 'AI-tools voor podcasters',
    metaTitle: `AI-tools voor podcasters — opschonen, transcriberen en editen via tekst (2026)`,
    metaDescription: 'AI-tools voor podcasters: audio opschonen, NL-transcriptie, edit-door-tekst en stemmen. Eerlijk over stemrechten, consent en hoe goed Nederlandse transcriptie écht is.',
    intro: [
      'Een aflevering opnemen is het leuke deel. Daarna komt het werk: "uhms" eruit, stiltes inkorten, audio opschonen, transcriberen voor shownotes en SEO, en knippen — vaak uren per aflevering. Precies dat is waar AI je workflow drastisch versnelt.',
      'Edit-door-tekst en automatische transcriptie zijn inmiddels echt goed, ook in het Nederlands, al blijft NL-kwaliteit net iets onder Engels en heb je correctie nodig bij vakjargon en namen. En zodra het over AI-stemmen gaat, komt er een serieuze laag bij: stemrechten en consent zijn geen formaliteit.',
    ],
    picks: [
      { slug: 'descript', reden: 'Edit-door-tekst is hier de killer-feature: je bewerkt je podcast zoals een Word-document, inclusief filler-word-removal en studio-sound — de grootste tijdwinst van allemaal.', gratis: 'Gratis tier met transcriptie- en exportlimieten; betaald voor langere afleveringen en geen watermerk.' },
      { slug: 'amberscript', reden: 'Nederlands bedrijf gespecialiseerd in NL-transcriptie; sterkste keuze als je transcripts in het Nederlands nodig hebt, met optie voor menselijke nacontrole.', gratis: 'Gratis proefminuten; daarna per uur audio of abonnement.' },
      { slug: 'assemblyai', reden: 'Krachtige transcriptie-API met sprekerherkenning en goede meertalige ondersteuning — voor wie het in een eigen workflow of tool wil bouwen.', gratis: 'Gratis credits om te testen; daarna betaald per uur audio.' },
      { slug: 'elevenlabs', reden: 'Beste AI-stemmen voor intro\'s, correcties en losse zinnen die je niet opnieuw wilt opnemen; voice-cloning van je eigen stem mits je consent bevestigt.', gratis: 'Gratis ~10 min/mnd, mét naamsvermelding en zonder commerciële licentie; vanaf $5/mnd voor cloning en commercieel gebruik.' },
      { slug: 'resemble-ai', reden: 'Stemkloon-tool met expliciete consent-flow en watermerking — gericht op makers die juridisch netjes met hun eigen of ingehuurde stem willen werken.' },
      { slug: 'lovo-ai', reden: 'Grote bibliotheek kant-en-klare stemmen in meerdere talen voor wie snel een voice-over wil zonder een eigen stem te klonen.', gratis: 'Beperkte gratis tier; betaald voor commercieel gebruik en meer stemmen.' },
    ],
    gratisNote: 'Transcriptie en basis-editing kun je gratis proeven (Descript-tier, proefminuten bij Amberscript en AssemblyAI), maar voor volledige afleveringen reken je op betaald — meestal per uur audio of ~$12–24/mnd. Let bij AI-stemmen goed op de licentie: ElevenLabs\' gratis tier vraagt naamsvermelding en staat géén commercieel gebruik toe; voor een podcast die je publiceert of monetiseert heb je minstens het Starter-plan ($5/mnd) nodig.',
    faqs: [
      { question: 'Mag ik een AI-stem of een kloon van mijn eigen stem commercieel in mijn podcast gebruiken?', answer: 'Je eigen stem klonen mag, maar alleen met een betaald plan dat commerciële rechten geeft — ElevenLabs\' gratis tier sluit commercieel gebruik uit en vereist naamsvermelding. Bij het klonen bevestig je expliciet consent (een voice-captcha). Een stem van iemand ánders — een gast, een bekende, een collega — klonen mag alléén met hun nadrukkelijke, liefst schriftelijke toestemming; in steeds meer rechtsgebieden is dit wettelijk geregeld en is een stem zonder consent klonen strafbaar. Bibliotheekstemmen (Lovo, ElevenLabs library) zijn de veilige route als je geen eigen kloon wilt regelen.' },
      { question: 'Hoe goed is automatische transcriptie in het Nederlands?', answer: 'Goed genoeg om 80–90% van het werk te doen, maar niet foutloos. Nederlandse transcriptie loopt iets achter op Engels, vooral bij vaktermen, eigennamen, dialect en door-elkaar-pratende sprekers. Voor shownotes en SEO is dat prima na een correctieronde. Heb je een woordelijk, publicatieklaar transcript nodig (bijvoorbeeld voor toegankelijkheid of een boek), kies dan een tool met menselijke nacontrole zoals Amberscript biedt — reken altijd tijd in om namen en jargon na te lopen.' },
      { question: 'Loont een AI-edit-tool zoals Descript de moeite?', answer: 'Voor de meeste podcasters: ja, snel. Als handmatig editen je 3–4 uur per aflevering kost en edit-door-tekst dat halveert, win je bij wekelijks publiceren al gauw 8+ uur per maand — ruim meer waard dan de ~$12–24/mnd. De winst is het grootst bij interview-podcasts met veel "uhms" en correcties. Bij strak gescripte, korte afleveringen is het verschil kleiner; test eerst de gratis tier op één echte aflevering voordat je een jaarabonnement neemt.' },
    ],
  },
  'coaches': {
    key: 'coaches',
    title: 'AI-tools voor coaches en therapeuten',
    metaTitle: `AI-tools voor coaches — verslagen en marketing, mét privacy voorop (2026)`,
    metaDescription: 'AI-tools voor coaches en therapeuten: sessieverslagen, content en onboarding sneller. Glashelder over privacy: nooit cliëntdata in gewone chatbots, AI is geen therapie.',
    intro: [
      'Als coach of therapeut gaat je tijd vooral naar je cliënten — en je avonden naar verslagen, e-mails, content voor je praktijk en onboarding-materiaal. Dat administratieve deel kan AI flink versnellen, zodat je meer tijd overhoudt voor het werk dat er echt toe doet.',
      'Maar in dit vak is privacy geen bijzaak. Cliëntgegevens — zeker over gezondheid, emoties of relaties — zijn bijzondere persoonsgegevens onder de AVG, met de zwaarste bescherming die er is. De vuistregel is simpel en niet onderhandelbaar: nooit herleidbare cliëntdata in een algemene chatbot, en AI vervangt nooit jouw professionele oordeel of de therapeutische relatie.',
    ],
    picks: [
      { slug: 'claude', reden: 'Sterk en zorgvuldig voor schrijfwerk en gestructureerd denken; gebruik het voor je eigen content en reflectie — nooit met herleidbare cliëntinformatie.', gratis: 'Gratis tier; betaald (~$20/mnd) voor het sterkere model en hogere limieten.' },
      { slug: 'chatgpt', reden: 'Veelzijdig voor blogs, e-mails, oefeningen en werkbladen; in betaalde/zakelijke accounts kun je modeltraining op je input uitschakelen.', gratis: 'Gratis tier; betaald (~$20/mnd) voor sterkere modellen en data-instellingen.' },
      { slug: 'notion-ai', reden: 'Houdt je praktijk georganiseerd — sjablonen voor (geanonimiseerde) verslagen, onboarding-flows en kennisbank, met AI-samenvattingen ingebouwd.', gratis: 'Notion gratis voor persoonlijk gebruik; AI-functies als betaalde add-on.' },
      { slug: 'canva-ai', reden: 'Voor werkbladen, social-posts en een verzorgde uitstraling van je praktijk zonder designer.', gratis: 'Gratis basis; AI-features en merkkit in Canva Pro.' },
      { slug: 'gamma', reden: 'Maakt in minuten nette presentaties en onboarding-decks of een mini-cursus uit een paar bullets — handig voor workshops en groepstrajecten.', gratis: 'Gratis tier met Gamma-branding; betaald om die te verwijderen en meer te exporteren.' },
      { slug: 'fathom', reden: 'Notuleert online (intake)gesprekken automatisch — alléén bruikbaar met expliciete toestemming van je cliënt en een privacy-bewuste instelling; weeg dit per situatie zorgvuldig af.', gratis: 'Gratis tier voor basis-notuleren; betaald voor meer opslag en features.' },
    ],
    gratisNote: 'Voor je praktijk-content en organisatie kom je ver met gratis tiers (Claude, ChatGPT, Notion, Canva). Betaalde plannen (~$10–20/mnd) geven je betere modellen én — belangrijk in dit vak — meer controle over data-instellingen, zoals modeltraining uitschakelen. Investeer dat eerder dan in losse "AI-coaching"-tools: jouw meerwaarde is de mens, niet de software.',
    faqs: [
      { question: 'Mag ik sessieverslagen of cliëntinformatie door AI laten verwerken?', answer: 'Niet zomaar, en nooit in een gewone consumenten-chatbot. Cliëntgegevens over gezondheid en welzijn zijn bijzondere persoonsgegevens onder de AVG met de strengste bescherming. Wil je AI inzetten voor verslagen, dan moet je: herleidbare gegevens anonimiseren (geen namen, geboortedata of herkenbare details), een tool kiezen die een verwerkersovereenkomst (DPA) biedt en je data niet voor training gebruikt, en je cliënt vooraf informeren en toestemming vragen. Bij twijfel: doe het verslag zelf. Een datalek met therapiegegevens is onomkeerbaar voor het vertrouwen én voor je cliënt.' },
      { question: 'Mag ik AI een cliënt laten "coachen" of als therapie-ondersteuning inzetten?', answer: 'Nee — AI is geen behandelaar en mag dat ook niet zijn. Een algemene chatbot kent je cliënt niet, mist klinische context, kan crisissignalen missen en geeft soms zelfvertrouwd onjuist advies. Voor jouw eigen voorbereiding, het bedenken van oefeningen of het structureren van een traject is AI een prima hulpmiddel. Maar het inhoudelijke contact, de diagnose, de interventie en het opvangen van een cliënt in nood blijven mensenwerk — dat is precies waarvoor je bent opgeleid en waarvoor je cliënt jóú kiest.' },
      { question: 'Hoe verdien ik AI-tools terug zonder mijn cliëntrelatie te schaden?', answer: 'De winst zit aan de praktijk-kant, niet in het cliëntcontact. Bespaar je per week een paar uur op content, e-mails, werkbladen en (geanonimiseerde, toegestane) administratie, dan houd je tijd over voor meer cliënten of minder avondwerk — dat verdient een paar tientjes per maand makkelijk terug. Verkoop AI nooit als onderdeel van je behandeling om kosten te drukken; de menselijke aandacht ís je product. Gebruik AI om die aandacht ruimte te geven, niet om haar te vervangen.' },
    ],
  },
};

export const taakKeys = Object.keys(taakContent);
