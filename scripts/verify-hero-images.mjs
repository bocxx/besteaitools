#!/usr/bin/env node
// Controleert dat elke `heroImage` in src/content/nieuws/ naar een bestand wijst
// dat daadwerkelijk in public/ staat.
//
// Waarom dit bestaat (10 sep 2026). Het Zod-schema accepteert `heroImage` als
// string en kijkt niet of het pad bestaat. De diorama-generator schrijft
// `diorama-<slug>.webp`, maar in drafts stond het pad geregeld anders: zonder
// het `diorama-`-voorvoegsel, of juist mét het bestandsnaam-voorvoegsel van de
// draft (`diorama-dbat-<slug>.webp`). Het gevolg is een gebroken afbeelding op
// een pagina die verder prima valideert.
//
// Toen deze check voor het eerst draaide stonden er op deze site vier artikelen
// live met een hero die niet bestond. hetlaatsteainieuws.nl en aiplatformmkb.nl
// hebben dezelfde controle in `npm run content:verify`; die twee waren schoon,
// dus dit was een gat dat alleen hier open stond — deze repo had geen
// content-validatie. `verify:diorama` is een zelftest van de parser en zegt
// niets over bestaande bestanden.
//
// Alleen bestáán wordt afgedwongen, niet de naamvorm: het archief kent een
// oudere, geldige conventie (/images/nieuws/…) die gewoon werkt. Een afwijkende
// naamvorm geeft hooguit een waarschuwing. Artikelen zonder `heroImage` worden
// overgeslagen — dat is toegestaan.
//
// Gebruik: node scripts/verify-hero-images.mjs   (of npm run hero:verify)
import { readFileSync, readdirSync, statSync, existsSync } from 'node:fs';
import { join, relative, dirname, basename } from 'node:path';
import { fileURLToPath } from 'node:url';
import yaml from 'js-yaml';

const ROOT = join(dirname(fileURLToPath(import.meta.url)), '..');
const DIR = join(ROOT, 'src/content/nieuws');
const PUBLIC = join(ROOT, 'public');

function walk(d) {
  const out = [];
  for (const name of readdirSync(d)) {
    const p = join(d, name);
    if (statSync(p).isDirectory()) out.push(...walk(p));
    else if ((name.endsWith('.md') || name.endsWith('.mdx')) && !name.endsWith('.social.md')) out.push(p);
  }
  return out;
}

const files = walk(DIR);
const kapot = [];
let metHero = 0;
let zonderHero = 0;

for (const file of files) {
  const rel = relative(ROOT, file);
  const raw = readFileSync(file, 'utf8');
  const m = raw.match(/^---\r?\n([\s\S]*?)\r?\n---/);
  if (!m) continue;

  let data;
  try {
    data = yaml.load(m[1]);
  } catch {
    continue; // YAML-fouten zijn niet de taak van deze check
  }

  const hero = data?.heroImage;
  if (typeof hero !== 'string' || hero.trim() === '') {
    zonderHero++;
    continue;
  }
  metHero++;

  if (!existsSync(join(PUBLIC, hero.replace(/^\//, '')))) {
    kapot.push({ rel, hero });
    continue;
  }

  const slug = basename(rel).replace(/\.mdx?$/, '');
  const conventie = `/images/articles/diorama-${slug}.webp`;
  if (hero !== conventie) {
    console.log(`  ⚠ ${rel}: heroImage wijkt af van de conventie (${conventie})`);
  }
}

console.log(`Gecontroleerd: ${files.length} artikelen · ${metHero} met heroImage · ${zonderHero} zonder`);

if (kapot.length) {
  console.log(`\n❌ ${kapot.length} artikel(en) met een heroImage die niet bestaat:\n`);
  for (const { rel, hero } of kapot) {
    console.log(`  ${rel}`);
    console.log(`    - ${hero}`);
  }
  console.log(
    '\nGenereer het beeld met `npm run images:one -- <slug>`, of corrigeer het pad.\n' +
    'De generator schrijft /images/articles/diorama-<slug>.webp'
  );
  process.exit(1);
}

console.log('\n✅ Elke heroImage wijst naar een bestaand bestand.');
