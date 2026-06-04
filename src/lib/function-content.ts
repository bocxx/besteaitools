/**
 * function-content.ts — redactionele pillar-copy per bedrijfsfunctie.
 *
 * Single source of truth voor de unieke, keyword-rijke teksten op de
 * /ai-tools-voor/[functie]-pillar pages. Bewust los van de schema-config
 * (tools-schema.ts) zodat content los van de datacontract evolueert.
 *
 * Per functie:
 *   intro    — 2 zinnen, mensgerichte intent-copy (matcht zoekintentie).
 *   useCases — concrete taken/zoektermen (worden als lijst getoond).
 *   faqs     — 2-3 vraag/antwoord-paren (zichtbaar + FAQPage structured data).
 */
import type { BusinessFunctionKey } from './tools-schema';

export interface PillarFaq {
  question: string;
  answer: string;
}

export interface PillarContent {
  intro: string;
  useCases: string[];
  faqs: PillarFaq[];
}

export const functionContent: Record<BusinessFunctionKey, PillarContent> = {
  marketing: {
    intro:
      'AI verandert marketing van handwerk naar schaalbaar maatwerk: van copy en campagnebeelden tot SEO, advertenties en personalisatie. De tools hieronder helpen je sneller content maken, beter targeten en je rendement op je marketinguren verhogen.',
    useCases: [
      'Blogartikelen en SEO-content schrijven',
      'Advertentie- en social-copy genereren',
      'Beeld en video voor campagnes maken',
      'E-mailflows en personalisatie automatiseren',
    ],
    faqs: [
      {
        question: 'Wat is de beste AI-tool voor marketing?',
        answer:
          'Dat hangt af van je taak: voor content schrijven kijk je naar tekstgeneratoren, voor beeld naar generatieve image-tools en voor advertenties naar campagne-optimalisatie. Filter de lijst op je use case en let op het prijsmodel en de AVG-status.',
      },
      {
        question: 'Zijn AI-marketingtools geschikt voor het MKB?',
        answer:
          'Ja. Veel tools hebben een freemium- of betaalbaar instapplan en vragen geen technische kennis. Let op de labels "geen developer nodig" en "gratis proberen" om snel iets te vinden dat bij een klein team past.',
      },
    ],
  },
  sales: {
    intro:
      'Van leadgeneratie en outreach tot CRM-verrijking en gespreksanalyse: AI neemt het repetitieve werk uit je salesproces. De tools hieronder helpen je sneller de juiste prospects vinden, persoonlijker opvolgen en je pipeline beter voorspellen.',
    useCases: [
      'Leads vinden en verrijken',
      'Gepersonaliseerde outreach-e-mails opstellen',
      'CRM-data bijwerken en opschonen',
      'Salesgesprekken samenvatten en scoren',
    ],
    faqs: [
      {
        question: 'Welke AI-tool helpt het meest bij leadgeneratie?',
        answer:
          'Tools die databronnen combineren met verrijking en intent-signalen leveren de beste leads. Filter op de functie Sales & CRM en sorteer op buzz om te zien wat er nu het meest gebruikt wordt.',
      },
      {
        question: 'Integreren deze tools met mijn CRM?',
        answer:
          'Veel salestools koppelen met gangbare CRM-systemen. Controleer bij elke tool de vermelde integraties; bij twijfel staat op de detailpagina welke koppelingen ondersteund worden.',
      },
    ],
  },
  klantenservice: {
    intro:
      'AI-chatbots en support-automatisering vangen veelgestelde vragen af, stellen antwoorden voor aan je agents en verkorten je responstijd. De tools hieronder helpen je meer tickets oplossen zonder je team te laten omvallen — ook buiten kantooruren.',
    useCases: [
      'Klantvragen automatisch beantwoorden',
      'Agents antwoordsuggesties geven',
      'Tickets categoriseren en routeren',
      'Kennisbank-antwoorden genereren',
    ],
    faqs: [
      {
        question: 'Kan een AI-chatbot mijn klantenservice vervangen?',
        answer:
          'Voor veelvoorkomende, herhaalbare vragen vaak wel; complexe of gevoelige gevallen blijven mensenwerk. De sterkste opzet is hybride: AI vangt de eenvoudige tickets af en escaleert de rest naar een agent.',
      },
      {
        question: 'Zijn deze tools AVG-proof voor Nederlandse klanten?',
        answer:
          'Gebruik het filter "AVG-klaar" om alleen tools met een gezonde privacy-positie te tonen, en let op het Nederlandstalig-label voor support in het Nederlands.',
      },
    ],
  },
  development: {
    intro:
      'Van code-aanvulling en review tot test-generatie en debugging: AI-tools maken engineeringteams meetbaar sneller. De tools hieronder helpen je sneller bouwen, minder bugs introduceren en meer tijd overhouden voor het echte werk.',
    useCases: [
      'Code schrijven en aanvullen',
      'Pull requests reviewen',
      'Tests en documentatie genereren',
      'Bugs opsporen en uitleggen',
    ],
    faqs: [
      {
        question: 'Wat is de beste AI-tool voor developers?',
        answer:
          'Code-assistenten die in je editor draaien zijn het populairst, maar er zijn ook tools voor review, tests en infrastructuur. Sorteer op buzz of "snelst groeiend" om te zien wat ontwikkelaars nu het meest oppakken.',
      },
      {
        question: 'Kan ik deze tools zelf hosten?',
        answer:
          'Sommige developer-tools zijn self-hosted of open source. Gebruik het deployment-filter "Self-hosted" om alleen tools te tonen die je in eigen omgeving kunt draaien.',
      },
    ],
  },
  data: {
    intro:
      'AI maakt data-analyse toegankelijker: stel vragen in gewone taal, laat dashboards genereren en spot patronen sneller. De tools hieronder helpen je sneller van ruwe data naar inzicht — ook zonder diepe SQL- of BI-kennis.',
    useCases: [
      'Data bevragen in natuurlijke taal',
      'Dashboards en rapportages genereren',
      'Trends en anomalieën opsporen',
      'Datasets opschonen en verrijken',
    ],
    faqs: [
      {
        question: 'Welke AI-tool is het beste voor data-analyse?',
        answer:
          'Dat hangt af van je stack: sommige tools koppelen direct met je warehouse, andere werken op losse bestanden. Filter op Data & Analyse en controleer de vermelde integraties per tool.',
      },
      {
        question: 'Heb ik technische kennis nodig?',
        answer:
          'Lang niet altijd. Veel tools mikken juist op niet-technische gebruikers met natuurlijke-taal-interfaces. Let op het niveau-filter "Beginner" voor de meest toegankelijke opties.',
      },
    ],
  },
  operations: {
    intro:
      'Workflow-automatisering en procesoptimalisatie met AI nemen handmatige, repetitieve stappen uit je operatie. De tools hieronder helpen je processen koppelen, taken automatiseren en fouten verminderen — zonder voor elk koppelvlak een developer nodig te hebben.',
    useCases: [
      'Workflows tussen apps automatiseren',
      'Documenten en formulieren verwerken',
      'Repetitieve taken laten uitvoeren door agents',
      'Processen monitoren en optimaliseren',
    ],
    faqs: [
      {
        question: 'Wat kan ik automatiseren met AI-operationstools?',
        answer:
          'Denk aan data overzetten tussen systemen, documenten verwerken, meldingen versturen en goedkeuringen routeren. Filter op Operations & Automatisering om de relevante tools te zien.',
      },
      {
        question: 'Heb ik een developer nodig om dit op te zetten?',
        answer:
          'Veel automatiseringstools zijn no-code of low-code. Gebruik het filter "geen developer nodig" om alleen tools te tonen die je zonder programmeerkennis kunt inrichten.',
      },
    ],
  },
  hr: {
    intro:
      'Van vacatureteksten en cv-screening tot onboarding en interne kennis: AI versnelt HR- en recruitmentprocessen. De tools hieronder helpen je sneller de juiste mensen vinden en je team beter ondersteunen, met minder administratie.',
    useCases: [
      'Vacatureteksten schrijven',
      "Cv's screenen en matchen",
      'Onboarding-materiaal genereren',
      'HR-vragen van medewerkers beantwoorden',
    ],
    faqs: [
      {
        question: 'Is AI bij werving toegestaan onder de AVG?',
        answer:
          'AI mag ondersteunen, maar geautomatiseerde beslissingen over mensen zijn aan strenge regels gebonden. Houd een mens in de beslislus en gebruik het AVG-filter om tools met een gezonde privacy-positie te tonen.',
      },
      {
        question: 'Welke HR-taken kan ik het beste automatiseren?',
        answer:
          'Repetitief en tekstgericht werk — zoals vacatures opstellen, eerste cv-screening en standaardvragen beantwoorden — levert de meeste tijdwinst zonder het menselijke oordeel te vervangen.',
      },
    ],
  },
  finance: {
    intro:
      'AI ondersteunt boekhouding, forecasting en financiële analyse met minder handwerk en snellere inzichten. De tools hieronder helpen je facturen verwerken, cijfers verklaren en vooruitkijken — met je financiële data als basis.',
    useCases: [
      'Facturen en bonnen verwerken',
      'Forecasts en budgetten opstellen',
      'Financiële rapportages samenvatten',
      'Transacties categoriseren',
    ],
    faqs: [
      {
        question: 'Welke AI-tool is geschikt voor boekhouding?',
        answer:
          'Tools die documenten herkennen en met je boekhoudsoftware koppelen, besparen het meeste tijd. Filter op Financiën en controleer de integraties per tool.',
      },
      {
        question: 'Is mijn financiële data veilig bij deze tools?',
        answer:
          'Let op de privacy- en data-residency-informatie per tool en gebruik het AVG-filter. Voor gevoelige cijfers kun je ook kijken naar self-hosted opties.',
      },
    ],
  },
  legal: {
    intro:
      'Van contractanalyse en compliance-checks tot juridisch onderzoek: AI neemt het leeswerk uit het recht. De tools hieronder helpen je sneller risico’s in documenten vinden en juridische vragen beantwoorden — met een jurist die de eindbeoordeling houdt.',
    useCases: [
      'Contracten analyseren en samenvatten',
      'Compliance-risico’s opsporen',
      'Juridisch onderzoek doen',
      'Standaarddocumenten opstellen',
    ],
    faqs: [
      {
        question: 'Kan ik op een AI-tool vertrouwen voor juridisch advies?',
        answer:
          'AI is sterk in lezen, samenvatten en signaleren, maar geeft geen sluitend juridisch advies. Gebruik de output als eerste analyse en laat een jurist de eindbeoordeling doen.',
      },
      {
        question: 'Hoe zit het met vertrouwelijkheid van mijn documenten?',
        answer:
          'Controleer per tool het privacybeleid en de data-residency, en gebruik het AVG-filter. Voor zeer gevoelige stukken zijn self-hosted opties het overwegen waard.',
      },
    ],
  },
};
