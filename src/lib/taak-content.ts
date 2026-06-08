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
};

export const taakKeys = Object.keys(taakContent);
