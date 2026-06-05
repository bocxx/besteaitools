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
    h1: 'Notuleren met AI: de beste tools',
    kicker: 'Notuleren',
    metaTitle: 'Notuleren met AI — de beste AI-notulisten ({year}) | debesteaitools.nl',
    metaDescription:
      'AI-notulisten nemen je vergadering op, transcriberen en vatten samen met actiepunten. Vergelijk de beste tools voor notuleren met AI — wat ze kunnen en wat ze kosten.',
    intro: [
      'Een AI-notulist luistert mee in je (online) vergadering, zet het gesprek om in tekst en levert een samenvatting met besluiten en actiepunten. Schelt je het handmatige uitwerken.',
      'Hieronder de notuleer-tools uit onze directory. Let op of een tool Nederlands goed aankan en hoe ’ie omgaat met je data — die info staat bij elke tool.',
    ],
    categories: ['meeting-notes'],
    freeNote:
      'Sommige AI-notulisten bieden een gratis startplan met een beperkt aantal minuten of meetings per maand.',
    faqs: [
      {
        q: 'Wat is de beste tool om te notuleren met AI?',
        a: 'Dat hangt af van je vergaderplatform (Teams, Zoom, Meet), of je Nederlandse transcriptie nodig hebt en je eisen rond databeveiliging. Vergelijk de tools hieronder op die punten.',
      },
      {
        q: 'Kan AI in het Nederlands notuleren?',
        a: 'Ja, meerdere tools ondersteunen Nederlandse transcriptie en samenvatting. Filter op de homepage op “Nederlandstalig” om die snel te vinden.',
      },
      {
        q: 'Is notuleren met AI veilig en AVG-proof?',
        a: 'Dat verschilt per aanbieder. Let op waar je opnames worden verwerkt en opgeslagen; bij elke tool geven we de data-/AVG-status aan waar bekend.',
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
];

export const taskPageMap: Record<string, TaskPage> = Object.fromEntries(
  taskPages.map((t) => [t.slug, t]),
);
