#!/usr/bin/env node
/**
 * indexnow.mjs — Ping Bing IndexNow na elke deploy.
 *
 * Identiek aan hetlaatsteainieuws-v2/aiplatformmkb, aangepast voor DBAT-routes.
 *
 * Werking:
 *   1. Lees gewijzigde content-bestanden uit git diff (SINCE_REF env var)
 *   2. Vertaal bestandspaden naar canonieke URLs
 *   3. POST naar api.indexnow.org (bereikt Bing, Yandex en andere deelnemers)
 *
 * Gebruik:
 *   SINCE_REF=HEAD^..HEAD node scripts/indexnow.mjs
 *
 * In GitHub Actions: zet fetch-depth: 2 zodat HEAD^ beschikbaar is.
 */

import { execSync } from 'node:child_process';

const KEY  = '71d1a102e6b67c012e438d8726f2c0a9';
const HOST = 'debesteaitools.nl';
const BASE = `https://${HOST}`;

const SINCE_REF = process.env.SINCE_REF ?? 'HEAD^..HEAD';

// Bestandspaden → URL-paden (DBAT: slug = bestandsnaam, geen categorie-prefix)
function toUrl(filePath) {
  // src/content/nieuws/foo.md → /nieuws/foo  (excl. social/*.social.md)
  const n = filePath.match(/src\/content\/nieuws\/(.+)\.mdx?$/);
  if (n && !n[1].includes('/') && !n[1].endsWith('.social')) return `${BASE}/nieuws/${n[1]}`;
  // src/content/digest/foo.md → /digest/foo
  const d = filePath.match(/src\/content\/digest\/(.+)\.mdx?$/);
  if (d) return `${BASE}/digest/${d[1]}`;
  // src/content/tools/foo.json → /tools/foo
  const t = filePath.match(/src\/content\/tools\/(.+)\.json$/);
  if (t) return `${BASE}/tools/${t[1]}`;
  return null;
}

let diff;
try {
  diff = execSync(`git diff --name-only ${SINCE_REF}`, { encoding: 'utf8' });
} catch {
  console.error('IndexNow: git diff mislukt — sla over.');
  process.exit(0);
}

const urls = [...new Set(
  diff.trim().split('\n')
    .map(toUrl)
    .filter(Boolean)
)];

if (urls.length === 0) {
  console.log('IndexNow: geen content-wijzigingen gevonden, niets te pingen.');
  process.exit(0);
}

console.log(`IndexNow: ${urls.length} URL(s) pingen naar Bing...`);
urls.forEach(u => console.log(' -', u));

const body = JSON.stringify({ host: HOST, key: KEY, keyLocation: `${BASE}/${KEY}.txt`, urlList: urls });

try {
  const res = await fetch('https://api.indexnow.org/indexnow', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json; charset=utf-8' },
    body,
  });
  if (res.ok) {
    console.log(`IndexNow: succes (HTTP ${res.status})`);
  } else {
    console.error(`IndexNow: fout HTTP ${res.status} — ${await res.text()}`);
    process.exit(1);
  }
} catch (err) {
  console.error('IndexNow: netwerk-fout —', err.message);
  process.exit(1);
}
