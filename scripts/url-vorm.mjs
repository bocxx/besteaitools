#!/usr/bin/env node
/**
 * url-vorm.mjs: welke URL-vorm is canoniek, en wat mag een link-script aanraken?
 *
 * Eén bestand voor verify-links en de normalize-scripts. Staat ongewijzigd in
 * hetlaatsteainieuws-v2, aiplatformmkb.nl en debesteaitools.nl.ai: pas je het
 * aan, kopieer het dan naar de andere twee.
 *
 * Waarom (8 nov 2026): de scripts haalden overal de slash weg, maar sinds het
 * prerenderen (5 nov 2026, zie flatten-html.mjs) beslist de canonical per
 * pagina. Artikelen, radar-edities en facetten zijn canoniek zonder slash.
 * Hubs en vaste pagina's (/nieuws/, /radar/methode/, /podcasts/<slug>/,
 * /tools/beste-ai-tools/) staan mét slash; zonder slash geven die een 301.
 * De oude regel liet verify-links dus een goede link afkeuren en liet normalize
 * er een omleiding van maken.
 *
 * Bij twijfel geen oordeel: de scripts laten de link dan staan. Een gemiste
 * omleiding kost weinig, een omgeschreven link die niet meer klopt wel.
 *
 * Controle tegen de live sitemaps: node scripts/url-vorm.mjs --check
 */

// Eerste paddeel van routes waar een pad van precies twee delen zonder slash staat.
const ROUTES_ZONDER_SLASH = new Set([
  'nieuws', 'gidsen', 'tools', 'achtergrond', 'regelgeving', 'achter-de-schermen',
  'radar', 'taak', 'mensen', 'voor', 'tag', 'niveau',
]);

// Vaste pagina's binnen die routes: die staan wél mét slash. Handwerk, dus
// controleer met --check of curl als je er een toevoegt.
const SLASH_PAGINAS = new Set([
  '/achtergrond/cijfers',
  '/nieuws/archief',
  '/radar/ai-in-cijfers',
  '/radar/doorbraak',
  '/radar/hype',
  '/radar/methode',
  '/radar/track-record',
  '/radar/wetenschap',
  '/tools/ai-kosten-berekenen',
  '/tools/beste-ai-tools',
  '/tools/gratis-ai-tools',
]);

/** True als dit pad zeker zonder trailing slash hoort. */
export function moetZonderSlash(siteNaam, pad) {
  const schoon = pad.replace(/\/+$/, '').toLowerCase();
  const delen = schoon.split('/').filter(Boolean);
  // DBAT wordt opgeheven en bouwt niet met flatten-html: daar blijft de oude regel.
  if (siteNaam === 'debesteaitools') return delen.length >= 2;
  return delen.length === 2 && ROUTES_ZONDER_SLASH.has(delen[0]) && !SLASH_PAGINAS.has(schoon);
}

/**
 * Pad in canonieke hoofdletters. Een pagina-pad gaat naar kleine letters, een
 * bestand niet: /.well-known/agent-skills/x/SKILL.md geeft in kleine letters een 404.
 */
export function canoniekeLetters(pad) {
  return /\.[a-z0-9]+$/i.test(pad) ? pad : pad.toLowerCase();
}

/**
 * True als de match geen echte link is maar een sjabloon: `${route}`, `{slug}`,
 * `[slug]` of `.../preview/<token>/<slug>`. De URL-regex stopt bij "<", dus
 * daarvoor kijken we naar de tekst direct na de match.
 */
export function isUrlSjabloon(match, tekstErna = '') {
  return /[{[]/.test(match) || /^<[\w-]+>/.test(tekstErna);
}

// ── --check: de regels hierboven tegen de live sitemaps ──────────────────────
async function check() {
  const sites = [
    ['hetlaatsteainieuws', 'https://www.hetlaatsteainieuws.nl'],
    ['aiplatformmkb', 'https://www.aiplatformmkb.nl'],
  ];
  const locs = async (url) => {
    const res = await fetch(url, { headers: { 'User-Agent': 'url-vorm-check' } });
    if (!res.ok) throw new Error(`${url} gaf ${res.status}`);
    return [...(await res.text()).matchAll(/<loc>([^<]+)<\/loc>/g)].map((m) => m[1]);
  };
  let afwijkingen = 0;
  for (const [naam, basis] of sites) {
    let urls = [];
    for (const kaart of await locs(`${basis}/sitemap-index.xml`)) urls = urls.concat(await locs(kaart));
    const fout = urls.filter((u) => {
      const pad = new URL(u).pathname;
      return pad.endsWith('/') && pad !== '/' && moetZonderSlash(naam, pad);
    });
    console.log(`${naam}: ${urls.length} URL's, ${fout.length} mét slash in een route die zonder slash hoort`);
    for (const u of fout) console.log(`  ${u}`);
    afwijkingen += fout.length;
  }
  if (afwijkingen) {
    console.log('\nVaste pagina? Zet hem in SLASH_PAGINAS. Omleiding in de sitemap? Dan klopt de sitemap niet.');
    process.exit(1);
  }
}

if (process.argv.includes('--check') && import.meta.url === `file://${process.argv[1]}`) {
  await check();
}
