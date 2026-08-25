/**
 * Task-landingspagina's (/gids/[slug]) — consument-taak-intentie.
 *
 * Mikt op laag-KD, hoog-volume NL task-keywords ("ai afbeeldingen maken",
 * "notuleren met ai", "transcriberen", "ai video maken", "ai tekst schrijven")
 * die de categorie-/functie-structuur niet direct dekt. Elke pagina = unieke
 * redactionele intro + de gefilterde tool-set uit de directory + FAQ.
 *
 * `categories` verwijst naar toolCategories-keys (tools-schema.ts).
 */
import type { ToolCategoryKey } from './tools-schema';

export interface TaskPage {
  slug: string;
  /** Zichtbare H1 + kicker */
  h1: string;
  kicker: string;
  /** Meta */
  metaTitle: string;
  metaDescription: string;
  /** Intro-copy (1-3 alinea's, grounded — geen claims die we niet waarmaken) */
  intro: string[];
  /** Welke tool-categorieën deze taak bedienen */
  categories: ToolCategoryKey[];
  /** Korte "gratis"-notitie (vangt de gratis-modifier) */
  freeNote: string;
  faqs: { q: string; a: string }[];
  /**
   * Optionele vergelijkingstabel bovenaan, gevoed uit de tool-data.
   * Kolommen: prijs, gratis te proberen, Nederlands, EU-hosting — precies de
   * assen waarop NL-zoekers kiezen. Weglaten = geen tabel.
   */
  comparison?: {
    intro?: string;
    /** Tool-slugs, in de volgorde waarin ze in de tabel moeten staan. */
    slugs: string[];
  };
  /**
   * Optionele redactionele secties, gerenderd ná de tool-lijst en vóór de FAQ.
   * Bedoeld om de zoekintenties te beantwoorden die de kale directory-lijst
   * niet dekt ("wat kost het", "is het veilig", "werkt het in het Nederlands").
   */
  sections?: { h2: string; paragraphs: string[] }[];
}

export const taskPages: TaskPage[] = [
  {
    slug: 'ai-afbeeldingen-maken',
    h1: 'AI-afbeeldingen maken: de beste tools',
    kicker: 'Beeld',
    metaTitle: 'AI-afbeeldingen maken — de beste tools ({year}) | debesteaitools.nl',
    metaDescription:
      'De beste AI-tools om afbeeldingen te maken: van prompt naar beeld in seconden. Vergelijk wat ze kunnen, hoe makkelijk ze zijn en wat ze kosten — ook gratis.',
    intro: [
      'Wil je een afbeelding maken met AI? Je typt in gewone taal wat je voor je ziet, en de tool genereert er een beeld bij — handig voor social posts, blogvisuals, moodboards of een snel concept.',
      'Hieronder staan de AI-beeldtools uit onze directory. Bij elke tool zie je wat ’ie doet, hoe makkelijk ’ie in gebruik is en wat ’ie kost, zodat je in seconden de juiste kiest.',
    ],
    categories: ['image'],
    freeNote:
      'Veel beeldtools hebben een gratis of freemium-plan — zet op de homepage het filter “Gratis proberen” aan om alleen die te zien.',
    faqs: [
      {
        q: 'Kun je gratis AI-afbeeldingen maken?',
        a: 'Ja. Verschillende tools hieronder hebben een gratis of freemium-plan waarmee je een beperkt aantal afbeeldingen per maand kunt genereren. Bij elke tool staat het prijsmodel vermeld.',
      },
      {
        q: 'Welke AI is het beste om afbeeldingen te maken?',
        a: 'Dat hangt af van je doel: voor fotorealisme, illustraties of snelle social-visuals zijn andere tools sterk. Vergelijk de tools op stijl, gebruiksgemak en prijs — er is geen één “beste” voor iedereen.',
      },
      {
        q: 'Mag je AI-afbeeldingen commercieel gebruiken?',
        a: 'Dat verschilt per tool en per abonnement. Check altijd de licentievoorwaarden van de tool die je kiest voordat je beelden zakelijk inzet.',
      },
    ],
  },
  {
    slug: 'notuleren-met-ai',
    h1: 'Automatisch notuleren met AI: de beste notuleer-apps',
    kicker: 'Notuleren',
    // Woordkeuze volgt de GSC-data van 22 mei – 22 aug 2026: "automatisch
    // notuleren" (147 impressies), "notuleren met ai" (88), "ai notuleren"
    // (60), "veilig notuleren" (54), "notuleer app" (38), "notuleer software"
    // (30). De pagina stond op positie 74 met 565 impressies en 1 click —
    // de vraag was er, de woorden op de pagina niet.
    metaTitle: 'Automatisch notuleren met AI — de beste notuleer-apps ({year}) | debesteaitools.nl',
    metaDescription:
      'Automatisch notuleren met AI: welke notuleer-app neemt je vergadering op, transcribeert en levert actiepunten? Vergelijk 10 tools op prijs, Nederlands en EU-hosting.',
    intro: [
      'Automatisch notuleren betekent dat een AI-notulist meeluistert in je vergadering — live in de zaal of in Teams, Zoom of Meet — het gesprek omzet in tekst en er een samenvatting met besluiten en actiepunten van maakt. Wat vroeger een uur uitwerken kostte, staat nu binnen enkele minuten klaar.',
      'De verschillen tussen notuleer-apps zitten op drie punten: hoe goed ze Nederlands verstaan, waar je opnames verwerkt worden, en of er een bot zichtbaar meedraait in je call. Hieronder alle notuleersoftware uit onze directory, met per tool die drie punten erbij.',
    ],
    categories: ['meeting-notes'],
    comparison: {
      intro:
        'De snelle vergelijking. "Gratis te proberen" betekent een gratis niveau of proefperiode zonder creditcard; EU-hosting betekent dat wij hebben kunnen vaststellen dat opnames binnen de EU verwerkt worden.',
      slugs: ['fathom', 'granola', 'notizy', 'talkmark', 'fireflies-ai', 'notul-ai', 'tldv', 'otter-ai', 'sembly-ai', 'recapai'],
    },
    freeNote:
      'Veel notuleer-apps hebben een gratis niveau met een beperkt aantal minuten of meetings per maand — genoeg om te testen of de tool jouw vergadering goed verstaat.',
    sections: [
      {
        h2: 'Wat kost automatisch notuleren?',
        paragraphs: [
          'De meeste notuleer-apps zitten tussen de €10 en €25 per gebruiker per maand. Daaronder vind je gratis niveaus met een minuten- of meetinglimiet; daarboven zitten vooral zakelijke pakketten met SSO, gedeelde werkruimtes en langere bewaartermijnen.',
          'Let bij het vergelijken op wát er wordt afgerekend. Sommige tools rekenen per gebruiker, andere per opgenomen minuut. Vergader je twee keer per week een uur, dan is een minutenbundel vaak goedkoper; zit je de hele dag in overleg, dan loont een vast bedrag per gebruiker. Reken het één keer door voor je eigen agenda — het scheelt in de praktijk meer dan de verschillen in de prijslijst suggereren.',
        ],
      },
      {
        h2: 'Veilig notuleren: waar moet je op letten?',
        paragraphs: [
          'Een notuleer-app luistert mee met precies die gesprekken waarin het gevoeligste wordt gezegd: personeelszaken, klantafspraken, cijfers. Voor de AVG maakt het uit waar die opname wordt verwerkt en hoe lang hij blijft staan. Drie dingen om te checken voordat je een tool op een echte vergadering loslaat.',
          'Ten eerste: is er een verwerkersovereenkomst (DPA)? Zonder dat papier mag je er formeel geen persoonsgegevens doorheen halen. Ten tweede: staat de verwerking in de EU? Een Amerikaanse aanbieder kan prima werken, maar dan heb je een extra doorgifte-onderbouwing nodig. Ten derde: hoe lang worden opnames bewaard, en kun je dat zelf instellen of een gesprek achteraf wissen?',
          'In de tabel hierboven zie je per tool of wij EU-hosting hebben kunnen vaststellen. Vergader je over personeelsdossiers of klantgegevens, begin dan bij die kolom — niet bij de prijs.',
        ],
      },
      {
        h2: 'Werkt AI-notuleren goed in het Nederlands?',
        paragraphs: [
          'Beter dan de meeste mensen verwachten, maar niet overal gelijk. Nederlandse transcriptie is inmiddels sterk; de samenvatting is de plek waar je het verschil merkt. Tools die vooral op Engels zijn afgestemd, leveren een correcte maar wat vlakke Nederlandse samenvatting, en missen soms de nuance tussen "we gaan dit doen" en "we kijken ernaar".',
          'Twee dingen blijven lastig, ongeacht de tool: gesprekken waarin mensen door elkaar praten, en vakjargon of eigennamen die niet in het model zitten. Een korte woordenlijst met namen van collega\'s, klanten en projecten — als de tool die optie heeft — verbetert het resultaat meer dan overstappen naar een duurdere app.',
          'Test het met één echte vergadering voordat je een abonnement neemt. Niet met een testgesprek, maar met een overleg zoals je dat normaal voert: mét onderbrekingen, jargon en iemand met een slechte microfoon.',
        ],
      },
      {
        h2: 'Notuleren in Teams, Zoom of Google Meet',
        paragraphs: [
          'De meeste notuleer-apps koppelen aan alle drie, maar op twee verschillende manieren. Bij de ene schuift er een zichtbare bot als deelnemer je vergadering binnen; bij de andere neemt de app lokaal op je eigen apparaat op, zonder dat de anderen iets zien.',
          'Dat verschil is minder technisch dan het lijkt. Een zichtbare bot is transparanter — iedereen ziet dat er wordt opgenomen — maar valt bij klantgesprekken soms verkeerd. Lokaal opnemen is discreter, maar dan ligt de plicht om toestemming te vragen volledig bij jou. In beide gevallen geldt: meld het aan het begin van het gesprek. Dat is niet alleen netjes, het is onder de AVG ook gewoon verplicht.',
        ],
      },
    ],
    faqs: [
      {
        q: 'Wat is de beste app om automatisch te notuleren?',
        a: 'Dat hangt af van drie dingen: je vergaderplatform (Teams, Zoom of Meet), of je Nederlandse samenvattingen nodig hebt, en je eisen rond dataverwerking. Wil je gratis beginnen, dan zijn Fathom en tl;dv de gulste. Moet de verwerking in de EU blijven, kijk dan naar de tools met EU-hosting in de tabel hierboven.',
      },
      {
        q: 'Kan AI in het Nederlands notuleren?',
        a: 'Ja. Van de tien notuleer-apps in onze directory verstaan er negen aantoonbaar Nederlands. De transcriptie is inmiddels sterk; het verschil zit vooral in de kwaliteit van de Nederlandse samenvatting. Bij elke tool staat vermeld hoe wij die beoordelen.',
      },
      {
        q: 'Is automatisch notuleren veilig en AVG-proof?',
        a: 'Dat verschilt sterk per aanbieder en is niet af te leiden uit de bekendheid van de naam. Let op drie dingen: is er een verwerkersovereenkomst, wordt de opname binnen de EU verwerkt, en hoe lang blijft hij bewaard? Bij elke tool geven we aan wat wij hebben kunnen vaststellen.',
      },
      {
        q: 'Moet ik toestemming vragen voordat ik een vergadering opneem?',
        a: 'Ja. Onder de AVG moet je deelnemers vooraf informeren dat er wordt opgenomen en waarvoor de opname wordt gebruikt. Meld het aan het begin van het gesprek — ook als de tool lokaal opneemt en er geen bot zichtbaar is.',
      },
      {
        q: 'Werkt een notuleer-app ook bij een vergadering in de zaal?',
        a: 'Meerdere tools nemen ook via de microfoon van je laptop of telefoon op, dus zonder online vergadering. De kwaliteit hangt dan sterk af van de akoestiek en van hoeveel mensen door elkaar praten. Zet het apparaat midden op tafel en laat mensen om de beurt spreken.',
      },
      {
        q: 'Wat kost automatisch notuleren per maand?',
        a: 'De meeste notuleersoftware zit tussen de €10 en €25 per gebruiker per maand. Er zijn gratis niveaus met een minuten- of meetinglimiet, en zakelijke pakketten die daarboven uitkomen. In de tabel hierboven staat per tool de instapprijs.',
      },
    ],
  },
  {
    slug: 'transcriberen-met-ai',
    h1: 'Transcriberen met AI: audio omzetten naar tekst',
    kicker: 'Audio',
    metaTitle: 'Transcriberen met AI — audio naar tekst ({year}) | debesteaitools.nl',
    metaDescription:
      'Zet audio of video automatisch om naar tekst met AI. Vergelijk de beste transcriptie-tools op talen, nauwkeurigheid en prijs — ook gratis te proberen.',
    intro: [
      'AI-transcriptie zet gesproken audio of video automatisch om naar tekst — voor interviews, podcasts, colleges of vergaderingen. Veel sneller dan zelf uittypen.',
      'Hieronder de audio- en transcriptie-tools uit onze directory, met per tool de ondersteunde talen, het gebruiksgemak en de prijs.',
    ],
    categories: ['audio', 'meeting-notes'],
    freeNote: 'Diverse transcriptie-tools laten je gratis een stuk audio proberen voordat je betaalt.',
    faqs: [
      {
        q: 'Kun je gratis audio transcriberen?',
        a: 'Ja, verschillende tools hieronder hebben een gratis tier of proefperiode waarmee je een beperkte hoeveelheid audio kunt omzetten naar tekst.',
      },
      {
        q: 'Hoe nauwkeurig is AI-transcriptie in het Nederlands?',
        a: 'Voor helder Nederlands is de nauwkeurigheid inmiddels hoog, al blijven jargon, accenten en slechte audio lastig. Een korte controle achteraf is altijd verstandig.',
      },
    ],
  },
  {
    slug: 'ai-video-maken',
    h1: 'AI-video maken: de beste tools',
    kicker: 'Video',
    metaTitle: 'AI-video maken — de beste tools ({year}) | debesteaitools.nl',
    metaDescription:
      'Maak video’s met AI: van tekst of beeld naar bewegende content, avatars en voice-overs. Vergelijk de beste AI-videotools op mogelijkheden en prijs — ook gratis.',
    intro: [
      'Met AI-videotools maak je video’s zonder camera of montagekennis: van een script of afbeelding naar bewegend beeld, inclusief avatars en voice-overs.',
      'Hieronder de videotools uit onze directory. Bij elke tool zie je wat ’ie kan, hoe steil de leercurve is en wat ’ie kost.',
    ],
    categories: ['video'],
    freeNote: 'Veel AI-videotools hebben een gratis plan met watermerk of een beperkt aantal renders per maand.',
    faqs: [
      {
        q: 'Kun je gratis AI-video’s maken?',
        a: 'Ja. Meerdere tools hieronder bieden een gratis of freemium-plan, vaak met een watermerk of een limiet op de lengte of het aantal video’s.',
      },
      {
        q: 'Welke AI-tool is het beste voor video?',
        a: 'Dat hangt af van je doel: avatar-video’s, korte social-clips of tekst-naar-video vragen om verschillende tools. Vergelijk hieronder op mogelijkheden en prijs.',
      },
    ],
  },
  {
    slug: 'ai-tekst-schrijven',
    h1: 'AI-tekst schrijven & herschrijven',
    kicker: 'Schrijven',
    metaTitle: 'AI-tekst schrijven & herschrijven — de beste tools ({year}) | debesteaitools.nl',
    metaDescription:
      'Laat AI teksten schrijven, herschrijven en verbeteren: blogs, e-mails, social posts en meer. Vergelijk de beste AI-schrijftools op kwaliteit, Nederlands en prijs.',
    intro: [
      'AI-schrijftools helpen je sneller teksten maken: een eerste opzet, een herschrijving in een andere toon, of een korte samenvatting. Jij stuurt, de AI levert het ruwe materiaal.',
      'Hieronder de schrijftools uit onze directory, met per tool hoe goed ’ie Nederlands aankan, het gebruiksgemak en de prijs.',
    ],
    categories: ['writing'],
    freeNote: 'De meeste AI-schrijftools hebben een gratis of freemium-plan om mee te starten.',
    faqs: [
      {
        q: 'Wat is de beste AI om teksten te schrijven?',
        a: 'Voor lange content, marketingteksten of e-mails zijn andere tools sterk. Let vooral op de Nederlandse output-kwaliteit en de prijs; vergelijk de tools hieronder.',
      },
      {
        q: 'Kun je gratis tekst laten schrijven met AI?',
        a: 'Ja, veel schrijftools hebben een gratis tier waarmee je een beperkt aantal woorden per maand kunt genereren of herschrijven.',
      },
      {
        q: 'Kan AI mijn tekst herschrijven in een andere toon?',
        a: 'Ja, de meeste schrijftools kunnen bestaande tekst herschrijven — formeler, korter, of in een andere stijl — op basis van je instructie.',
      },
    ],
  },
  // ──────────────────────────────────────────────────────────────
  // NIEUWE GIDSEN (2026)
  // ──────────────────────────────────────────────────────────────
  {
    slug: 'coderen-met-ai',
    h1: 'Coderen met AI: de beste tools voor developers',
    kicker: 'Coding',
    metaTitle: 'Coderen met AI — de beste AI-coding-tools ({year}) | debesteaitools.nl',
    metaDescription:
      'De beste AI-tools om sneller code te schrijven, debuggen en reviewen. Van Cursor tot GitHub Copilot — vergelijk op taal-support, prijs en integraties.',
    intro: [
      'AI-coding-assistenten schrijven code op basis van jouw instructies, vullen regels automatisch aan en leggen complexe stukken code uit. Handig voor zowel beginners als ervaren developers.',
      'Hieronder de coding-tools uit onze directory. Per tool zie je welke talen worden ondersteund, hoe diep de editor-integratie gaat en wat het kost.',
    ],
    categories: ['coding'],
    freeNote:
      'Meerdere coding-tools hebben een gratis tier of proefperiode — zet het filter "Gratis proberen" aan om ze te zien.',
    faqs: [
      {
        q: 'Wat is de beste AI-tool om code te schrijven?',
        a: 'Dat hangt af van je editor, taal en budget. Cursor en GitHub Copilot zijn de meest populaire keuzes; vergelijk ze hieronder op functies en prijs.',
      },
      {
        q: 'Kan AI ook code debuggen en uitleggen?',
        a: 'Ja, de meeste coding-assistenten kunnen bestaande code analyseren, bugs opsporen en in gewone taal uitleggen wat een stuk code doet.',
      },
      {
        q: 'Heb je programmeerervaring nodig om AI-coding-tools te gebruiken?',
        a: 'Niet per se. Sommige tools (zoals Replit) zijn ook voor beginners geschikt. Maar hoe meer je van code afweet, hoe gerichter je de AI kunt aansturen.',
      },
    ],
  },
  {
    slug: 'ai-presentaties-maken',
    h1: 'AI-presentaties maken: de beste tools',
    kicker: 'Presentaties',
    metaTitle: 'AI-presentaties maken — de beste tools ({year}) | debesteaitools.nl',
    metaDescription:
      'Maak in minuten een complete presentatie met AI. Vergelijk Gamma, Beautiful.ai en meer op opmaak, aanpasbaarheid en prijs — ook gratis te proberen.',
    intro: [
      'AI-presentatie-tools zetten een prompt, document of uitgeschreven tekst om in een complete slidedeck — inclusief opmaak, afbeeldingen en structuur. Jij hoeft geen designer te zijn.',
      'Hieronder de presentatie-tools uit onze directory. Per tool zie je hoe goed de output is, hoeveel je zelf kunt aanpassen en wat het kost.',
    ],
    categories: ['presentations'],
    freeNote:
      'De meeste AI-presentatie-tools hebben een gratis plan of proefperiode waarmee je direct een deck kunt maken.',
    faqs: [
      {
        q: 'Welke AI maakt de beste presentaties?',
        a: 'Gamma en Beautiful.ai scoren hoog op stijl en snelheid. Canva AI is sterk als je al in het Canva-ecosysteem zit. Vergelijk ze hieronder op jouw gebruik.',
      },
      {
        q: 'Kun je een AI-presentatie exporteren naar PowerPoint?',
        a: 'Dat verschilt per tool. Gamma biedt een export naar PowerPoint; andere tools exporteren naar PDF of hun eigen formaat. Kijk bij elke tool welke exportopties er zijn.',
      },
      {
        q: 'Hoe goed is de Nederlandse tekst in AI-presentaties?',
        a: 'Dat hangt van de tool en je prompt af. Geef je prompt altijd in het Nederlands, dan is de kans het grootst dat de AI ook de slides in het Nederlands oplevert.',
      },
    ],
  },
  {
    slug: 'documenten-samenvatten-met-ai',
    h1: 'Documenten samenvatten met AI',
    kicker: 'Productiviteit',
    metaTitle: 'Documenten samenvatten met AI — de beste tools ({year}) | debesteaitools.nl',
    metaDescription:
      'Vat PDF\'s, rapporten en lange teksten samen met AI in seconden. Vergelijk de beste tools op documentlengte, taalondersteuning en prijs.',
    intro: [
      'Met AI-samenvattingstools upload je een PDF, rapport of lange tekst, en je krijgt in seconden de kernpunten, conclusies of een Q&A-interface terug. Scheelt uren leeswerk.',
      'Hieronder de tools die goed zijn in documenten verwerken en samenvatten. Let op de documentgrootte die ze aankunnen en hoe ze met jouw data omgaan.',
    ],
    categories: ['chatbots', 'productivity'],
    freeNote:
      'ChatGPT en Claude hebben gratis plannen waarmee je direct documenten kunt uploaden en samenvatten.',
    faqs: [
      {
        q: 'Welke AI kan PDF\'s samenvatten?',
        a: 'ChatGPT, Claude en Google NotebookLM kunnen allemaal PDF\'s verwerken. Google NotebookLM is gratis en uitstekend voor lange documenten en meerdere bestanden tegelijk.',
      },
      {
        q: 'Hoe lang mag een document zijn om samen te vatten?',
        a: 'Dat verschilt per tool en per abonnement. Claude 3.5 aankan tot 200.000 tokens (~150.000 woorden); Google NotebookLM verwerkt complete boeken. Check per tool de limieten.',
      },
      {
        q: 'Zijn mijn documenten veilig als ik ze upload?',
        a: 'Dat verschilt per aanbieder. Lees het privacybeleid van de tool die je kiest. Voor gevoelige bedrijfsdocumenten kies je bij voorkeur een zakelijk plan met een Data Processing Agreement.',
      },
    ],
  },
  {
    slug: 'ai-muziek-maken',
    h1: 'AI-muziek maken: de beste tools',
    kicker: 'Muziek',
    metaTitle: 'AI-muziek maken — de beste tools ({year}) | debesteaitools.nl',
    metaDescription:
      'Genereer originele muziek met AI: van achtergrondmuziek tot complete nummers. Vergelijk Suno, Udio en meer op geluidskwaliteit, stijlen en prijs.',
    intro: [
      'AI-muziektools genereren originele nummers, achtergrondmuziek of jingles op basis van een tekstprompt. Geen muzikale achtergrond of instrumenten nodig.',
      'Hieronder de muziektools uit onze directory. Per tool zie je welke stijlen worden ondersteund, hoe goed de output klinkt en wat de licentievoorwaarden zijn.',
    ],
    categories: ['music'],
    freeNote:
      'Suno en Udio hebben gratis plans met een beperkt aantal nummers per maand — genoeg om te testen.',
    faqs: [
      {
        q: 'Wat is de beste AI om muziek mee te maken?',
        a: 'Suno en Udio zijn de meest gebruikte tools voor volledige nummers. Voor achtergrondmuziek zijn Mubert en ElevenLabs ook populaire keuzes.',
      },
      {
        q: 'Mag je AI-muziek commercieel gebruiken?',
        a: 'Dat verschilt per tool en plan. Suno en Udio bieden commerciële licenties op betaalde plannen. Check altijd de licentievoorwaarden van de tool die je kiest.',
      },
      {
        q: 'Kun je zelf zingen toevoegen aan AI-muziek?',
        a: 'Sommige tools, zoals Suno, kunnen ook AI-vocalen genereren of integreren. Je eigen stem opnemen en vermengen vereist daarna extra audiosoftware.',
      },
    ],
  },
  {
    slug: 'ai-voiceover-maken',
    h1: 'AI-voiceover maken: de beste tools',
    kicker: 'Audio',
    metaTitle: 'AI-voiceover maken — de beste tools ({year}) | debesteaitools.nl',
    metaDescription:
      'Genereer professionele voiceovers met AI: van tekst naar stem in seconden. Vergelijk ElevenLabs, Murf en meer op stemkwaliteit, talen en prijs.',
    intro: [
      'AI-voiceover-tools zetten tekst om in een realistische gesproken stem. Handig voor video\'s, e-learning, podcasts of presentaties — zonder microfoon of studio.',
      'Hieronder de audio-tools die gespecialiseerd zijn in tekst-naar-spraak en stemklonen. Per tool zie je welke talen en stemmen beschikbaar zijn en wat het kost.',
    ],
    categories: ['audio'],
    freeNote:
      'Meerdere tools hebben een gratis tier voor kleine hoeveelheden tekst-naar-spraak.',
    faqs: [
      {
        q: 'Welke AI maakt de meest realistische voiceover?',
        a: 'ElevenLabs staat bekend als de beste voor realisme en emotie. Murf en Play.ht zijn goede alternatieven, zeker voor zakelijk gebruik.',
      },
      {
        q: 'Kan ik mijn eigen stem klonen met AI?',
        a: 'Ja, ElevenLabs en Play.ht bieden stem-klonen aan op betaalde plannen. Je leest een paar minuten tekst in, en de AI bootst jouw stem na.',
      },
      {
        q: 'Welke talen ondersteunt AI-voiceover?',
        a: 'De meeste tools ondersteunen tientallen talen, inclusief Nederlands. ElevenLabs ondersteunt meer dan 30 talen; Murf en Play.ht hebben vergelijkbare dekking.',
      },
    ],
  },
  {
    slug: 'ai-avatar-video-maken',
    h1: 'AI-avatar video maken: video zonder camera',
    kicker: 'Video',
    metaTitle: 'AI-avatar video maken — video zonder camera ({year}) | debesteaitools.nl',
    metaDescription:
      'Maak professionele video\'s met een AI-avatar: geen camera, geen studio. Vergelijk HeyGen, Synthesia en meer op avatarkwaliteit, talen en prijs.',
    intro: [
      'Met AI-avatartools maak je een sprekende video zonder zelf voor de camera te staan. Je geeft tekst of audio, de tool genereert een realistische avatar die het uitspreekt.',
      'Hieronder de video-tools die gespecialiseerd zijn in AI-avatars en talking heads. Per tool zie je de kwaliteit van de avatars, welke talen worden ondersteund en wat het kost.',
    ],
    categories: ['video'],
    freeNote:
      'Sommige tools bieden een gratis proefvideo of een beperkt aantal minuten om de kwaliteit te testen.',
    faqs: [
      {
        q: 'Welke tool maakt de meest realistische AI-avatar videos?',
        a: 'HeyGen en Synthesia zijn marktleiders in kwaliteit en aanpasbaarheid. D-ID is een goed alternatief voor wie op zoek is naar een lagere prijs.',
      },
      {
        q: 'Kan ik mijn eigen gezicht als avatar gebruiken?',
        a: 'Ja, de meeste tools bieden een "custom avatar"-optie waarmee je een avatar van jezelf kunt maken. Dit vereist een korte video-opname van jou als trainingsmateriaal.',
      },
      {
        q: 'In welke talen kan een AI-avatar spreken?',
        a: 'HeyGen en Synthesia ondersteunen tientallen talen, inclusief Nederlands. Ze kunnen ook bestaande video\'s "dubben" in een andere taal met lipsync.',
      },
    ],
  },
  {
    slug: 'automatiseren-met-ai',
    h1: 'Automatiseren met AI: workflows zonder code',
    kicker: 'Automatisering',
    metaTitle: 'Automatiseren met AI — no-code workflows ({year}) | debesteaitools.nl',
    metaDescription:
      'Automatiseer repetitieve taken met AI en no-code tools. Vergelijk Make, Zapier, n8n en meer op integraties, gebruiksgemak en prijs.',
    intro: [
      'AI-automatiseringstools koppelen je apps aan elkaar en laten taken automatisch uitvoeren — zonder dat je zelf code hoeft te schrijven. Denk aan: e-mails verwerken, data overzetten of notificaties sturen.',
      'Hieronder de automatiseringstools uit onze directory. Per tool zie je hoeveel apps ze ondersteunen, hoe makkelijk het instellen is en wat het kost.',
    ],
    categories: ['automation'],
    freeNote:
      'Make en Zapier hebben gratis plans met een beperkt aantal automatiseringen per maand.',
    faqs: [
      {
        q: 'Wat is het verschil tussen Make en Zapier?',
        a: 'Zapier is eenvoudiger en geschikt voor beginners met lineaire workflows. Make is visueler en krachtiger voor complexe, vertakkende automatiseringen. n8n is open source en zelfhostbaar.',
      },
      {
        q: 'Heb je technische kennis nodig om met Make of Zapier te werken?',
        a: 'Nee, beide tools zijn no-code en bedoeld voor niet-developers. Voor complexere logica en data-transformaties helpt wel enige basiskennis.',
      },
      {
        q: 'Hoeveel apps kan ik koppelen met automatiseringstools?',
        a: 'Zapier ondersteunt meer dan 7.000 apps; Make heeft meer dan 1.800 integraties. n8n heeft minder kant-en-klare integraties maar is onbeperkt uitbreidbaar via code.',
      },
    ],
  },
  {
    slug: 'ai-email-schrijven',
    h1: 'E-mails schrijven met AI: de beste tools',
    kicker: 'Schrijven',
    metaTitle: 'E-mails schrijven met AI — de beste tools ({year}) | debesteaitools.nl',
    metaDescription:
      'Schrijf sneller e-mails met AI: van eerste opzet tot complete inbox-management. Vergelijk de beste tools op toon, integraties met Gmail/Outlook en prijs.',
    intro: [
      'AI-tools voor e-mail helpen je sneller te schrijven: ze stellen een eerste opzet voor, herschrijven jouw ruwe notities tot nette tekst, of beantwoorden standaardvragen automatisch.',
      'Hieronder de tools die uitblinken in e-mail schrijven en e-mail-management. Let op hoe goed ze integreert met jouw mailclient (Gmail of Outlook).',
    ],
    categories: ['writing', 'productivity'],
    freeNote:
      'ChatGPT en Gmail AI (Gemini) zijn gratis te gebruiken voor e-mail schrijven.',
    faqs: [
      {
        q: 'Kan AI automatisch e-mails voor mij beantwoorden?',
        a: 'Ja, tools zoals Superhuman, Shortwave en Gmail AI kunnen antwoorden voorstellen of concepten opstellen op basis van de ontvangen e-mail. Je valideert altijd voor je verstuurt.',
      },
      {
        q: 'Werkt AI voor e-mail ook in het Nederlands?',
        a: 'Ja. ChatGPT, Claude en Gemini produceren goede Nederlandse e-mails. Geef in je prompt de gewenste toon mee (formeel, vriendelijk, kort) voor het beste resultaat.',
      },
      {
        q: 'Is AI-e-mail veilig voor zakelijke communicatie?',
        a: 'Dat hangt van de tool af. Gebruik voor gevoelige bedrijfsinformatie tools die een zakelijk plan met dataverwerkingsovereenkomst bieden, zoals Microsoft Copilot in Outlook.',
      },
    ],
  },
  {
    slug: 'ai-research-zoeken',
    h1: 'Research & zoeken met AI: de beste tools',
    kicker: 'Zoeken',
    metaTitle: 'Research & zoeken met AI — de beste tools ({year}) | debesteaitools.nl',
    metaDescription:
      'Zoek en onderzoek sneller met AI: van Perplexity tot Google AI Mode. Vergelijk de beste AI-zoektools op bronvermelding, diepgang en prijs.',
    intro: [
      'AI-zoektools geven je direct een samenvatting van meerdere bronnen, in plaats van een lijst links om zelf door te klikken. Ideaal voor snelle research, marktanalyses of feitenchecks.',
      'Hieronder de zoek- en research-tools uit onze directory. Per tool zie je hoe betrouwbaar de bronvermeldingen zijn, hoe goed ze Nederlands aankunnen en wat het kost.',
    ],
    categories: ['search'],
    freeNote:
      'Perplexity, You.com en Google AI Mode hebben gratis plans waarmee je direct kunt starten.',
    faqs: [
      {
        q: 'Is Perplexity beter dan Google voor research?',
        a: 'Perplexity is sneller voor directe antwoorden met bronnen; Google is breder en heeft een grotere index. Voor diepgaande research combineer je ze het best.',
      },
      {
        q: 'Zijn de antwoorden van AI-zoektools betrouwbaar?',
        a: 'AI-zoektools kunnen fouten maken en bronnen verkeerd interpreteren. Controleer bij belangrijke beslissingen altijd de primaire bronnen die worden aangehaald.',
      },
      {
        q: 'Kan ik AI-zoektools gebruiken voor academisch onderzoek?',
        a: 'Als startpunt ja, maar citeer altijd de originele bronnen, niet de AI-samenvatting. Tools als Elicit en Consensus zijn specifiek gebouwd voor wetenschappelijke research.',
      },
    ],
  },
  {
    slug: 'ai-vertalen',
    h1: 'Vertalen met AI: de beste tools',
    kicker: 'Schrijven',
    metaTitle: 'Vertalen met AI — de beste tools ({year}) | debesteaitools.nl',
    metaDescription:
      'Vertaal teksten snel en nauwkeurig met AI. Vergelijk DeepL, ChatGPT, Google Translate en meer op kwaliteit, tone-of-voice en prijs.',
    intro: [
      'AI-vertaaltools zijn inmiddels fors beter dan de Google Translate van tien jaar geleden: ze begrijpen context, behouden de toon van de tekst en kunnen aanpasbaar zijn per vakgebied.',
      'Hieronder de vertaaltools en AI-assistenten uit onze directory die uitblinken in vertalen. Per tool zie je ondersteunde talen, de kwaliteit van de output en de prijs.',
    ],
    categories: ['writing', 'chatbots'],
    freeNote:
      'DeepL en Google Translate hebben gratis versies; ChatGPT vertaalt ook gratis in de gratis tier.',
    faqs: [
      {
        q: 'Wat is beter: DeepL of ChatGPT voor vertalen?',
        a: 'DeepL is sneller voor directe vertalingen en heeft een betere toon. ChatGPT is flexibeler als je ook instructies wilt meegeven, zoals "vertaal formeel" of "behoud de marketingtoon".',
      },
      {
        q: 'Kan AI ook documenten en PDF\'s vertalen?',
        a: 'Ja. DeepL Pro, ChatGPT en Claude kunnen documenten uploaden en vertalen. DeepL Pro behoudt daarbij de opmaak van het originele document, wat handig is voor Word-bestanden.',
      },
      {
        q: 'Is AI-vertaling nauwkeurig genoeg voor juridische of medische teksten?',
        a: 'AI-vertaling is een goed startpunt, maar laat gevoelige juridische of medische teksten altijd nalopen door een menselijke vertaler of vakspecialist.',
      },
    ],
  },
  {
    slug: 'ai-social-media-content',
    h1: 'AI voor social media content: de beste tools',
    kicker: 'Marketing',
    metaTitle: 'AI voor social media content — de beste tools ({year}) | debesteaitools.nl',
    metaDescription:
      'Maak en plan social media content met AI. Vergelijk de beste tools voor captions, visuals, planning en analytics — ook gratis te proberen.',
    intro: [
      'AI-tools voor social media helpen je sneller content te bedenken, schrijven, visualiseren en plannen. Van Instagram-captions tot LinkedIn-posts en TikTok-scripts.',
      'Hieronder de marketing- en schrijftools uit onze directory die goed zijn voor social media. Per tool zie je welke platforms worden ondersteund, wat de AI-functies zijn en wat het kost.',
    ],
    categories: ['marketing', 'writing'],
    freeNote:
      'Buffer, Hootsuite en ChatGPT hebben gratis plans om mee te beginnen.',
    faqs: [
      {
        q: 'Welke AI-tool is het beste voor social media posts?',
        a: 'Voor het schrijven van tekst is ChatGPT of Jasper een goede keuze. Voor plannen en publiceren combineer je dat met een tool als Buffer of Hootsuite met ingebouwde AI.',
      },
      {
        q: 'Kan AI ook viral content voorspellen?',
        a: 'Nee, geen AI kan viraal succes garanderen. Maar tools als Predis.ai en Jasper kunnen wel analyseren welke typen posts het beste presteren bij een specifiek publiek.',
      },
      {
        q: 'Hoe gebruik ik AI voor social media zonder dat het onpersoonlijk klinkt?',
        a: 'Gebruik AI als eerste opzet en pas het altijd aan in jouw eigen toon. Geef de AI context mee: wie je bent, wat je doel is en hoe jij normaal communiceert.',
      },
    ],
  },
  {
    slug: 'ai-data-analyse',
    h1: 'Data analyseren met AI: de beste tools',
    kicker: 'Productiviteit',
    metaTitle: 'Data analyseren met AI — de beste tools ({year}) | debesteaitools.nl',
    metaDescription:
      'Analyseer data met AI zonder te coderen. Vergelijk ChatGPT Advanced Data Analysis, Julius, Claude en meer op bestandsondersteuning, visualisaties en prijs.',
    intro: [
      'Met AI kun je spreadsheets, CSV\'s en datasets analyseren in gewone taal: je stelt een vraag, de AI schrijft de code, draait de analyse en legt de uitkomst uit. Geen Python-kennis nodig.',
      'Hieronder de tools die uitblinken in data-analyse via AI. Per tool zie je welke bestandsformaten worden ondersteund, hoe goed de visualisaties zijn en wat het kost.',
    ],
    categories: ['productivity', 'chatbots'],
    freeNote:
      'ChatGPT biedt Advanced Data Analysis gratis aan in de gratis tier; Claude kan ook CSV\'s verwerken.',
    faqs: [
      {
        q: 'Kan AI mijn Excel-bestand analyseren?',
        a: 'Ja. ChatGPT, Claude en Julius kunnen Excel- en CSV-bestanden uploaden, formules aanleggen, grafieken maken en patronen ontdekken op basis van je vragen.',
      },
      {
        q: 'Hoe betrouwbaar zijn de uitkomsten van AI-data-analyse?',
        a: 'AI-analyses zijn een goed startpunt maar kunnen fouten bevatten, vooral bij complexe formules of ambigue data. Valideer je uitkomsten altijd aan de hand van je brondata.',
      },
      {
        q: 'Welke AI is het beste voor data-analyse?',
        a: 'Julius is specifiek gebouwd voor data-analyse en sterk in visualisaties. ChatGPT Advanced Data Analysis is veelzijdiger. Claude is goed voor grote datasets en lange documenten.',
      },
    ],
  },
];

export const taskPageMap: Record<string, TaskPage> = Object.fromEntries(
  taskPages.map((t) => [t.slug, t]),
);
