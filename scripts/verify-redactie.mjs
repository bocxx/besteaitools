#!/usr/bin/env node
// verify-redactie.mjs — redactionele poort naast content:verify (16 sep 2026).
//
// Vangt drie fouten die op 16 september 2026 allemaal tegelijk live stonden en
// die geen enkele bestaande check zag, omdat elk artikel op zichzelf klopte:
//
//   1. DUBBELING — twee artikelen over hetzelfde verhaal, los van elkaar
//      gepubliceerd. Die dag: `wanneer-gaat-openai-naar-de-beurs` (14:01) en
//      `openai-beursgang-niet-2026-veiligheid` (21:25), 71% overlap, dezelfde
//      Fortune-bron, geen link naar elkaar. Twee URL's die om dezelfde
//      zoekvraag concurreren — precies wat de titel-CTR-analyse afraadt.
//      ⚠️ De drempel is bewust gekoppeld aan de wederzijdse link: een
//      tool-launch hoort volgens de vaste regel júist twee stukken te hebben
//      (nieuws + tool-review). Die van 16 sep zaten op 56% overlap en linkten
//      naar elkaar — dat is de conventie die werkt, geen fout. Overlap zónder
//      link is het signaal, niet overlap op zich.
//
//   2. BODY-H1 — een `# kop` in de body naast de `title` in de frontmatter.
//      De template rendert de titel al als H1, dus dit geeft twee H1's. Erger:
//      bij vier van de veertien artikelen wéék de body-H1 af van de titel, dus
//      de lezer zag een andere kop dan Google.
//
//   3. GEEN BRONNEN — een artikel zonder één `sources:`-entry. Waarschuwing,
//      geen blokkade: bij een tutorial is het soms terecht.
//      ⚠️ Zelf-kalibrerend: gebruikt de repo het veld structureel niet (DBAT:
//      120 van 129 artikelen zonder bronnen), dan slaat de check zichzelf over.
//      Een waarschuwing die op 93% van de artikelen afgaat, wordt weggelezen —
//      en dan verdwijnt ook de ene die er wél toe doet.
//
// Kale Node, geen astro sync — draait in <1s en werkt dus ook in de sandbox.
//
// STANDAARD RAPPORTEREND (exit 0). Met `--strict` exit 1 bij fouten.
// Reden: bij invoering stonden er 15 (HLN) en 19 (MKB) bevindingen open,
// vrijwel allemaal body-H1's uit het archief. Meteen blokkerend maken breekt
// de eerstvolgende deploy op oude schuld in plaats van op nieuwe fouten.
// Ruim het archief op, zet daarna `--strict` in predeploy.

import { readFileSync, readdirSync, existsSync } from 'node:fs';
import { join, basename } from 'node:path';

const DIR = 'src/content/nieuws';
const OVERLAP_HARD = 0.70;   // altijd fout
const OVERLAP_ZACHT = 0.55;  // fout tenzij de twee naar elkaar linken
const VENSTER_DAGEN = 7;     // alleen artikelen die kort na elkaar verschenen

if (!existsSync(DIR)) {
  console.error(`verify-redactie: ${DIR} niet gevonden — draai dit vanuit de repo-root.`);
  process.exit(1);
}

const splitsFrontmatter = (raw) => {
  const m = raw.match(/^---\r?\n([\s\S]*?)\r?\n---\r?\n([\s\S]*)$/);
  return m ? { fm: m[1], body: m[2] } : { fm: '', body: raw };
};
const veld = (fm, naam) => {
  const m = fm.match(new RegExp(`^${naam}:\\s*["']?(.*?)["']?\\s*$`, 'm'));
  return m ? m[1] : null;
};
// woorden van 5+ letters; korte woorden zijn ruis en tillen elke overlap op
const woorden = (tekst) =>
  new Set((tekst.toLowerCase().match(/[a-zà-ÿ]{5,}/g) || []));

const artikelen = readdirSync(DIR)
  .filter((f) => f.endsWith('.md') && !f.endsWith('.social.md'))
  .map((f) => {
    const raw = readFileSync(join(DIR, f), 'utf8');
    const { fm, body } = splitsFrontmatter(raw);
    return {
      slug: basename(f, '.md'),
      titel: veld(fm, 'title') || '',
      datum: veld(fm, 'publishedAt') || veld(fm, 'date') || '',
      draft: /^draft:\s*true\s*$/m.test(fm),
      bronnen: (fm.match(/^\s{2,}url:/gm) || []).length,
      bodyH1: (body.match(/^#\s+(.+)$/m) || [null, null])[1],
      body,
      set: woorden(body),
    };
  })
  .filter((a) => !a.draft); // drafts zijn niet live, dus geen dubbeling

const fouten = [];
const waarschuwingen = [];

// ── 1. dubbelingen ─────────────────────────────────────────────────────────
const dagen = (a, b) => {
  const da = Date.parse(a), db = Date.parse(b);
  return Number.isNaN(da) || Number.isNaN(db) ? Infinity : Math.abs(da - db) / 864e5;
};
for (let i = 0; i < artikelen.length; i++) {
  for (let j = i + 1; j < artikelen.length; j++) {
    const a = artikelen[i], b = artikelen[j];
    if (dagen(a.datum, b.datum) > VENSTER_DAGEN) continue;
    const klein = Math.min(a.set.size, b.set.size);
    if (klein < 80) continue; // te kort om iets te zeggen
    let gedeeld = 0;
    for (const w of a.set) if (b.set.has(w)) gedeeld++;
    const overlap = gedeeld / klein;
    if (overlap < OVERLAP_ZACHT) continue;
    const linktNaarElkaar =
      a.body.includes(`/${b.slug}`) && b.body.includes(`/${a.slug}`);
    const pct = (overlap * 100).toFixed(0);
    if (overlap >= OVERLAP_HARD) {
      fouten.push(`DUBBELING ${pct}% — ${a.slug} ⇄ ${b.slug}${linktNaarElkaar ? ' (linken wel naar elkaar, maar dit is te veel)' : ''}`);
    } else if (!linktNaarElkaar) {
      fouten.push(`DUBBELING ${pct}% zonder wederzijdse link — ${a.slug} ⇄ ${b.slug}`);
    }
  }
}

// ── 2. body-H1 ─────────────────────────────────────────────────────────────
for (const a of artikelen) {
  if (!a.bodyH1) continue;
  const zelfde = a.bodyH1.trim().toLowerCase() === a.titel.trim().toLowerCase();
  if (zelfde) {
    fouten.push(`BODY-H1 — ${a.slug}: de body begint met "# ${a.bodyH1.slice(0, 60)}" terwijl de template de frontmatter-title al als H1 rendert (dubbele H1)`);
  } else {
    fouten.push(`BODY-H1 WIJKT AF — ${a.slug}\n      frontmatter: ${a.titel}\n      body-H1    : ${a.bodyH1}`);
  }
}

// ── 3. bronnen (zelf-kalibrerend) ──────────────────────────────────────────
const zonderBron = artikelen.filter((a) => a.bronnen === 0);
const bronConventie = zonderBron.length / Math.max(artikelen.length, 1) < 0.5;
if (!bronConventie) {
  console.log(`   (bronnen-check overgeslagen: ${zonderBron.length}/${artikelen.length} artikelen hebben geen sources-veld — deze repo gebruikt het niet structureel)`);
} else {
  for (const a of zonderBron) waarschuwingen.push(`GEEN BRONNEN — ${a.slug}`);
}

// ── rapport ────────────────────────────────────────────────────────────────
console.log(`verify-redactie: ${artikelen.length} gepubliceerde artikelen gecontroleerd`);
if (waarschuwingen.length) {
  console.log(`\n⚠️  ${waarschuwingen.length} waarschuwing(en):`);
  for (const w of waarschuwingen) console.log(`    ${w}`);
}
const strict = process.argv.includes('--strict');
if (fouten.length) {
  console.log(`\n${strict ? '❌' : '⚠️ '} ${fouten.length} bevinding(en):`);
  for (const f of fouten) console.log(`    ${f}`);
  console.log('\nDubbeling? Kies één URL, voeg de inhoud samen en zet een redirect op de ander.');
  console.log('Body-H1? Haal de "# kop" uit de body; de titel staat al in de frontmatter.');
  console.log(strict ? '' : '(rapporterend — draai met --strict om hierop te blokkeren)');
  if (strict) process.exit(1);
  process.exit(0);
}
console.log('\n✅ Geen dubbelingen, geen body-H1\'s.');
