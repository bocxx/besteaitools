/**
 * Auteursregister debesteaitools.nl (sinds 18 sep 2026).
 *
 * Waarom: tot nu toe verscheen alles onder "Redactie". Google weegt een echte,
 * identificeerbare auteur met aantoonbare expertise zwaar (E-E-A-T), en dat
 * gewicht ontbrak op een site die het vertrouwen van Google al kwijt was.
 * Zelfde persoon als op aiplatformmkb.nl; `sameAs` koppelt beide profielen.
 *
 * Artikelen met author "Redactie" (de standaard van de schrijf-skill en de
 * pipeline) worden via resolveAuthor() aan Cirsten gekoppeld; zo hoeft
 * bestaande frontmatter niet aangepast te worden.
 */

export interface Author {
  slug: string;
  name: string;
  jobTitle: string;
  bio: string;
  specialties: string[];
  /** Pad in public/ (vierkant). */
  image?: string;
  sameAs: string[];
  /** Frontmatter-namen die naar deze auteur verwijzen. */
  matchNames: string[];
}

export const authors: Record<string, Author> = {
  'cirsten-kot': {
    slug: 'cirsten-kot',
    name: 'Cirsten Kot',
    jobTitle: 'Oprichter & hoofdredacteur, debesteaitools.nl',
    bio: `Cirsten test en vergelijkt AI-tools voor debesteaitools.nl en bouwt het platform zelf — met Astro, Cloudflare Workers en Claude in de loop. Ze werkt al twee jaar aan de overgang van klassieke software naar AI-native workflows: van Claude Code en lokale LLM's tot tooling rond de EU AI Act. Daarnaast is ze oprichter en hoofdredacteur van aiplatformmkb.nl.

Uitgangspunt: een AI-tool is pas nuttig als je weet wanneer je hem wél en níét moet gebruiken. Daarom staan hier eerlijke oordelen, echte beperkingen en alternatieven — geen gesponsorde posities.`,
    specialties: [
      'AI-tools & vergelijkingen',
      'Claude, ChatGPT, Gemini, Copilot',
      "Lokale LLM's & RAG",
      'AI-agents & automatisering',
      'EU AI Act',
    ],
    image: '/images/authors/cirsten-kot.webp',
    sameAs: [
      'https://www.linkedin.com/in/cirstenkot/',
      'https://x.com/cirstenkot',
      'https://www.aiplatformmkb.nl/auteurs/cirsten-kot',
    ],
    matchNames: [
      'Cirsten Kot',
      'Cirsten',
      'Redactie',
      'redactie',
      'debesteaitools.nl Redactie',
    ],
  },
};

const DEFAULT_AUTHOR = authors['cirsten-kot'];

/** Frontmatter-naam (of niets) → auteur. Onbekende namen vallen terug op de hoofdredacteur. */
export function resolveAuthor(name?: string | null): Author {
  if (!name) return DEFAULT_AUTHOR;
  const n = name.trim().toLowerCase();
  return (
    Object.values(authors).find((a) => a.matchNames.some((m) => m.toLowerCase() === n)) ??
    DEFAULT_AUTHOR
  );
}

export const authorUrl = (a: Author) => `/auteurs/${a.slug}`;

/** schema.org Person, voor gebruik als `author` in JSON-LD. */
export function personJsonLd(a: Author, origin: string) {
  const url = `${origin}${authorUrl(a)}`;
  return {
    '@type': 'Person',
    '@id': `${url}#person`,
    name: a.name,
    url,
    jobTitle: a.jobTitle,
    ...(a.image ? { image: `${origin}${a.image}` } : {}),
    sameAs: a.sameAs,
    knowsAbout: a.specialties,
  };
}
