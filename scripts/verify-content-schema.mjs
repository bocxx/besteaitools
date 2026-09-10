#!/usr/bin/env node
// Valideert de frontmatter van elk artikel in src/content/nieuws/ tegen het
// ECHTE Zod-schema uit src/lib/nieuws-schema.ts — hetzelfde schema dat Astro
// tijdens de build gebruikt (content.config.ts importeert het rechtstreeks).
//
// Waarom dit bestaat (10 sep 2026). hetlaatsteainieuws.nl en aiplatformmkb.nl
// draaien deze controle al sinds 19 aug; deze repo had als enige geen
// content-validatie. Wat dat kostte werd zichtbaar toen de hero-check hier voor
// het eerst liep: vier artikelen stonden live met een `heroImage` die niet
// bestond. Op de twee andere sites ving de poort dat soort fouten al vóór de
// commit — hier bestond die poort niet.
//
// Vier controles, in deze volgorde:
//   1. titelbudget      — blokkeert >72 vanaf de poortdatum, waarschuwt >65
//   2. werk-in-uitvoering — WIP-marker in de body van een publiceerbaar artikel
//   3. hero-bestaan     — `heroImage` moet naar een bestaand bestand wijzen
//   4. Zod-schema       — exact wat Astro tijdens de build zou afkeuren
//
// Gebruik: node --experimental-strip-types scripts/verify-content-schema.mjs
import { readFileSync, readdirSync, statSync, existsSync } from 'node:fs';
import { join, relative, dirname, basename } from 'node:path';
import { fileURLToPath } from 'node:url';
import yaml from 'js-yaml';
import { nieuwsArtikelSchema } from '../src/lib/nieuws-schema.ts';

const ROOT = join(dirname(fileURLToPath(import.meta.url)), '..');
const DIR = join(ROOT, 'src/content/nieuws');
const PUBLIC = join(ROOT, 'public');

function walk(d) {
  const out = [];
  for (const name of readdirSync(d)) {
    const p = join(d, name);
    if (statSync(p).isDirectory()) {
      out.push(...walk(p));
    } else if ((name.endsWith('.md') || name.endsWith('.mdx')) && !name.endsWith('.social.md')) {
      out.push(p);
    }
  }
  return out;
}

function frontmatterOf(text) {
  const m = text.match(/^---\r?\n([\s\S]*?)\r?\n---/);
  return m ? m[1] : null;
}

// Codeblokken en inline code weg, vóór elke tekstscan. Dit is een tutorial-site:
// `TODO` in een codevoorbeeld is normaal en mag niets blokkeren.
function zonderCode(body) {
  return body.replace(/```[\s\S]*?```/g, '').replace(/`[^`\n]*`/g, '');
}

const files = walk(DIR);
let ok = 0;
const failures = [];

for (const file of files) {
  const rel = relative(ROOT, file);
  const raw = readFileSync(file, 'utf8');
  const fm = frontmatterOf(raw);
  if (fm === null) {
    failures.push({ rel, errors: ['geen frontmatter-blok (---...---) gevonden'] });
    continue;
  }

  let data;
  try {
    data = yaml.load(fm);
  } catch (e) {
    failures.push({ rel, errors: [`YAML-parsefout: ${e.message}`] });
    continue;
  }

  const body = raw.slice(raw.indexOf('---', 3) + 3);
  const proza = zonderCode(body);

  // 1. Titelbudget. Gemeten op 10 sep 2026 over 127 artikelen: mediaan 65,
  // p90 79, uitschieter 99 — 33 titels boven de 72. Die zijn niet overhaast
  // herschreven; net als op hetlaatsteainieuws.nl (25 aug 2026) geldt een
  // overgangsregeling: het archief waarschuwt, alles vanaf de poortdatum
  // blokkeert. Zo kan de gewoonte niet terugkomen zonder dat er eerst 33 oude
  // titels op de schop moeten.
  const TITEL_MAX = 72;
  const GATE_VANAF = new Date('2026-09-10');
  const pubDatum = data?.publishedAt ? new Date(data.publishedAt) : null;
  const onderDePoort = pubDatum === null || pubDatum >= GATE_VANAF;
  if (data && typeof data.title === 'string' && data.title.length > TITEL_MAX && onderDePoort) {
    failures.push({
      rel,
      errors: [`title: ${data.title.length} tekens (max ${TITEL_MAX}) — kort in tot ≤65`],
    });
    continue;
  }
  if (data && typeof data.title === 'string' && data.title.length > 65) {
    console.log(`  ⚠ ${rel}: titel ${data.title.length} tekens (richtlijn ≤65)`);
  }

  // 2. Werk-in-uitvoering. Een redactienotitie hoort niet in de lopende tekst:
  // zodra iemand `draft: false` zet reist 'ie mee naar de lezer.
  //
  // ⚠️ De regex is bewust anders dan die op hetlaatsteainieuws.nl. Daar staat
  // TODO/FIXME hoofdletterongevoelig in dezelfde lijst als de Nederlandse
  // frasen. Letterlijk overgenomen blokkeerde dat hier een correct artikel:
  // `solo-terminal-agents-een-venster` gaat over gedeelde **todo's** in Solo's
  // MCP-laag, en `\bTODO\b/i` matcht dat gewone Nederlandse woord. TODO en
  // FIXME zijn code-markers en dus hoofdlettergevoelig; de Nederlandse frasen
  // blijven ongevoelig. Zelfde bugklasse als de woordgrens-regel in
  // newsflux/CLAUDE.md: een korte term in een matchlijst heeft altijd een
  // extra voorwaarde nodig.
  const WIP_NL = /\b(werkversie|concept-versie|voorlopige versie|nog aanvullen|nog invullen)\b/i;
  const WIP_CODE = /\b(TODO|FIXME)\b/;
  const wipInBody = WIP_NL.test(proza) || WIP_CODE.test(proza);
  const publiceerbaar = data && data.draft !== true;

  if (publiceerbaar && wipInBody) {
    failures.push({
      rel,
      errors: [
        'werk-in-uitvoering-marker in de body terwijl draft niet true is — ' +
        'haal de notitie weg, of zet draft: true',
      ],
    });
    continue;
  }
  if (!publiceerbaar && wipInBody) {
    console.log(`  ⚠ ${rel}: werkversie-notitie in de body`);
  }

  // 3. Hero-bestaan. Het schema keurt `heroImage` goed als string en kijkt niet
  // of het pad bestaat. De diorama-generator schrijft `diorama-<slug>.webp`,
  // maar in drafts stond het pad geregeld zonder dat voorvoegsel, of juist mét
  // het bestandsnaam-voorvoegsel van de draft (`diorama-dbat-<slug>.webp`).
  // Beide valideren en leveren een gebroken afbeelding op.
  //
  // Alleen bestáán wordt afgedwongen, niet de naamvorm: 22 artikelen gebruiken
  // een oudere, geldige conventie (/images/nieuws/…) die gewoon werkt. Zonder
  // `heroImage` is toegestaan (12 artikelen).
  if (data && typeof data.heroImage === 'string' && data.heroImage.trim() !== '') {
    if (!existsSync(join(PUBLIC, data.heroImage.replace(/^\//, '')))) {
      failures.push({
        rel,
        errors: [
          `heroImage verwijst naar een bestand dat niet bestaat: ${data.heroImage} — ` +
          'genereer het met `npm run images:one -- <slug>`, of corrigeer het pad ' +
          '(de generator schrijft /images/articles/diorama-<slug>.webp)',
        ],
      });
      continue;
    }
    const slug = basename(rel).replace(/\.mdx?$/, '');
    const conventie = `/images/articles/diorama-${slug}.webp`;
    if (data.heroImage !== conventie) {
      console.log(`  ⚠ ${rel}: heroImage wijkt af van de conventie (${conventie})`);
    }
  }

  // 4. Het schema zelf.
  const result = nieuwsArtikelSchema.safeParse(data);
  if (result.success) {
    ok++;
  } else {
    const errors = result.error.issues.map(
      (issue) => `${issue.path.join('.')}: ${issue.message}`
    );
    failures.push({ rel, errors });
  }
}

console.log(`Gecontroleerd: ${files.length} artikelen`);
console.log(`✅ Geldig: ${ok}`);

if (failures.length) {
  console.log(`\n❌ ${failures.length} artikel(en) met een schema-fout:\n`);
  for (const { rel, errors } of failures) {
    console.log(`  ${rel}`);
    for (const err of errors) console.log(`    - ${err}`);
  }
  console.log('\nDit zijn exact de fouten die Astro tijdens de build (of CI) zou geven.');
  process.exit(1);
}

console.log('\n✅ Alle artikelen valideren tegen het content-schema.');
