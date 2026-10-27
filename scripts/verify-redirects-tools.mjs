#!/usr/bin/env node
/**
 * verify-redirects-tools.mjs — controleert de 301's van de 163 DBAT-toolpagina's
 * en de toplijsten naar aiplatformmkb.nl (besluit 27 okt 2026).
 *
 * Bron: data/redirects-tools-163.json. Leest public/_redirects op dezelfde
 * manier als src/worker.ts (exacte regels, eerste regel wint) en controleert:
 *   1. elk pad (met en zonder slash, plus de oude spellingen) geeft 301 naar
 *      precies het doel uit de lijst;
 *   2. geen keten: het doel is geen pad dat op DBAT zelf weer redirect, en
 *      wijst naar www.aiplatformmkb.nl;
 *   3. met --live: de AIPMKB-doelpagina's geven direct 200 (geen redirect) en
 *      elk anker staat als id in de live /reviews/. Pas zinvol als AIPMKB live
 *      staat. --aipmkb-html <pad> doet stap 3 tegen een lokaal gebouwde
 *      reviews/index.html.
 *
 * Exit 1 bij een fout.
 */
import { readFileSync } from 'node:fs';

const LIVE = process.argv.includes('--live');
const htmlArg = process.argv.indexOf('--aipmkb-html');
const LOCAL_HTML = htmlArg > -1 ? process.argv[htmlArg + 1] : null;

const map = JSON.parse(readFileSync(new URL('../data/redirects-tools-163.json', import.meta.url), 'utf-8'));
const raw = readFileSync(new URL('../public/_redirects', import.meta.url), 'utf-8');

const exact = new Map();
for (const line of raw.split(/\r?\n/)) {
  const t = line.trim();
  if (!t || t.startsWith('#')) continue;
  const [from, to, st] = t.split(/\s+/);
  if (!from || !to || from.endsWith('/*')) continue;
  if (!exact.has(from)) exact.set(from, { to, status: st ? Number(st) : 302 });
}

const fouten = [];
const verwacht = [];
for (const t of map.tools) {
  for (const p of [t.dbat, t.alias].filter(Boolean)) verwacht.push([p, t.doelUrl], [`${p}/`, t.doelUrl]);
}
for (const a of map.extraAliassen ?? []) verwacht.push([a.pad, a.doelUrl], [`${a.pad}/`, a.doelUrl]);
for (const t of map.toplijsten ?? []) verwacht.push([t.dbat, t.doel], [`${t.dbat}/`, t.doel]);
for (const t of map.top10Categorieen ?? []) {
  if (exact.has(t.dbat)) verwacht.push([t.dbat, t.doel], [`${t.dbat}/`, t.doel]);
}

for (const [pad, doel] of verwacht) {
  const r = exact.get(pad);
  if (!r) { fouten.push(`${pad}: geen regel in public/_redirects`); continue; }
  if (r.status !== 301) fouten.push(`${pad}: status ${r.status}, verwacht 301`);
  if (r.to !== doel) fouten.push(`${pad}: wijst naar ${r.to}, verwacht ${doel}`);
  const u = new URL(r.to, 'https://debesteaitools.nl');
  if (u.host !== 'www.aiplatformmkb.nl') fouten.push(`${pad}: doel ${r.to} staat niet op www.aiplatformmkb.nl`);
}

if (LIVE || LOCAL_HTML) {
  const ankers = map.tools.map((t) => t.anker);
  let html = '';
  if (LOCAL_HTML) html = readFileSync(LOCAL_HTML, 'utf-8');
  else {
    const res = await fetch(map.doel, { redirect: 'manual' });
    if (res.status !== 200) fouten.push(`${map.doel} gaf ${res.status}, verwacht direct 200`);
    html = await res.text();
  }
  const ids = new Set([...html.matchAll(/\sid="([^"]+)"/g)].map((m) => m[1]));
  for (const a of ankers) if (!ids.has(a)) fouten.push(`anker #${a} ontbreekt op /reviews/`);
  if (LIVE) {
    const doelen = new Set([...(map.toplijsten ?? []).map((t) => t.doel), ...(map.top10Categorieen ?? []).map((t) => t.doel)]);
    for (const d of doelen) {
      const res = await fetch(d, { redirect: 'manual' });
      if (res.status !== 200) fouten.push(`${d} gaf ${res.status}, verwacht direct 200`);
    }
  }
}

if (fouten.length) {
  console.error(`verify-redirects-tools: ${fouten.length} fout(en)`);
  for (const f of fouten.slice(0, 60)) console.error(`  - ${f}`);
  process.exit(1);
}
console.log(`verify-redirects-tools: ${verwacht.length} redirectregels kloppen (${map.tools.length} toolpagina's${LIVE ? ', live gecontroleerd' : LOCAL_HTML ? ', ankers tegen lokale build' : ''}).`);
