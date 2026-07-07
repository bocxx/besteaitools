/**
 * scripts/upload-social.mjs
 *
 * Upload gegenereerde social-infographics naar Cloudflare R2, zodat ze
 * beschikbaar zijn op https://videos.hetlaatsteainieuws.nl/social/<slug>-<formaat>.png
 * en direct in Buffer als afbeelding kunnen worden gebruikt.
 *
 * Gebruik:
 *   node scripts/upload-social.mjs <slug>               # één artikel, alle formaten
 *   node scripts/upload-social.mjs <slug-a> <slug-b>    # meerdere artikelen
 *   node scripts/upload-social.mjs --all                # alles in social-infographics/
 *   node scripts/upload-social.mjs <slug> --fmt 4x5     # alleen één formaat
 *
 * Via npm:
 *   npm run social:upload <slug>
 *   npm run social:upload -- --all
 *
 * Vereist in .env:
 *   R2_ACCOUNT_ID, R2_ACCESS_KEY_ID, R2_SECRET_ACCESS_KEY,
 *   R2_BUCKET_NAME, R2_PUBLIC_URL
 *
 * De sociale-infographics moeten al gegenereerd zijn via:
 *   npm run social <slug>
 */

import { AwsClient } from 'aws4fetch';
import { readFileSync, existsSync, readdirSync } from 'node:fs';
import { resolve, join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT      = resolve(__dirname, '..');
const OUT_DIR   = join(ROOT, 'social-infographics');

// ── .env laden (als waarden nog niet als env-var bestaan) ──────────────────
const envPath = join(ROOT, '.env');
if (existsSync(envPath)) {
  for (const line of readFileSync(envPath, 'utf8').split('\n')) {
    const m = line.match(/^\s*([A-Z0-9_]+)\s*=\s*(.*)\s*$/);
    if (m) {
      const val = m[2].replace(/^["']|["']$/g, '');
      if (!(m[1] in process.env)) process.env[m[1]] = val;
    }
  }
}

// ── Env-check ──────────────────────────────────────────────────────────────
const REQUIRED = ['R2_ACCOUNT_ID', 'R2_ACCESS_KEY_ID', 'R2_SECRET_ACCESS_KEY', 'R2_BUCKET_NAME', 'R2_PUBLIC_URL'];
const missing  = REQUIRED.filter((k) => !process.env[k]);
if (missing.length) {
  console.error(`❌  Ontbrekende .env-variabelen: ${missing.join(', ')}`);
  process.exit(1);
}

// ── Args parsen ────────────────────────────────────────────────────────────
const args    = process.argv.slice(2);
const allFlag = args.includes('--all');
const fmtArg  = args.find((a) => a.startsWith('--fmt='))?.split('=')[1]
             ?? (args[args.indexOf('--fmt') + 1] !== undefined && !args[args.indexOf('--fmt') + 1].startsWith('--')
                  ? args[args.indexOf('--fmt') + 1]
                  : null);
const formats = fmtArg ? [fmtArg] : ['1x1', '4x5', '9x16', 'card-x', 'card-linkedin'];
const slugArgs = args.filter((a) => !a.startsWith('--') && a !== fmtArg);

// ── Slugs bepalen ──────────────────────────────────────────────────────────
let slugs = [];

if (allFlag) {
  // Alle unieke slugs in social-infographics/ op basis van de png-namen
  const files = readdirSync(OUT_DIR).filter((f) => f.endsWith('.png'));
  const seen  = new Set();
  for (const f of files) {
    const slug = f.replace(/-(?:1x1|4x5|9x16|card-x|card-linkedin)\.png$/, '');
    if (!seen.has(slug)) { seen.add(slug); slugs.push(slug); }
  }
  if (!slugs.length) {
    console.error('❌  Geen PNG\'s gevonden in social-infographics/. Draai eerst: npm run social:all');
    process.exit(1);
  }
  console.log(`📦  --all: ${slugs.length} artikel(en) gevonden.\n`);
} else if (slugArgs.length) {
  // Slug kan ook een volledige URL zijn (net als bij de andere scripts)
  slugs = slugArgs.map((s) => {
    try { return new URL(s).pathname.split('/').filter(Boolean).pop(); } catch { return s; }
  });
} else {
  console.error('Gebruik: npm run social:upload <slug>  |  npm run social:upload -- --all');
  process.exit(1);
}

// ── R2-client ──────────────────────────────────────────────────────────────
const aws      = new AwsClient({
  accessKeyId:     process.env.R2_ACCESS_KEY_ID,
  secretAccessKey: process.env.R2_SECRET_ACCESS_KEY,
  service: 's3',
  region:  'auto',
});
const endpoint = `https://${process.env.R2_ACCOUNT_ID}.r2.cloudflarestorage.com`;
const BASE_URL = process.env.R2_PUBLIC_URL.replace(/\/$/, '');

// ── Uploaden ───────────────────────────────────────────────────────────────
let ok = 0, skipped = 0, failed = 0;

for (const slug of slugs) {
  for (const fmt of formats) {
    const file = join(OUT_DIR, `${slug}-${fmt}.png`);
    const key  = `social/${slug}-${fmt}.png`;
    const url  = `${BASE_URL}/${key}`;

    if (!existsSync(file)) {
      console.warn(`⏭  Overgeslagen (bestand ontbreekt): ${file}`);
      console.warn(`   Genereer eerst met: npm run social ${slug}`);
      skipped++;
      continue;
    }

    const body = readFileSync(file);
    const res  = await aws.fetch(
      `${endpoint}/${process.env.R2_BUCKET_NAME}/${key}`,
      { method: 'PUT', body, headers: { 'Content-Type': 'image/png' } }
    );

    if (res.ok) {
      console.log(`✅  ${url}`);
      ok++;
    } else {
      const msg = await res.text();
      console.error(`❌  ${res.status} — ${key}: ${msg}`);
      failed++;
    }
  }
}

// ── Samenvatting ───────────────────────────────────────────────────────────
console.log(`
─────────────────────────────────────────────────
  ✅  geüpload  : ${ok}
  ⏭  overgeslagen: ${skipped}
  ❌  mislukt   : ${failed}
─────────────────────────────────────────────────`);

if (ok > 0) {
  console.log(`\nKlaar. Gebruik de URLs hierboven in Buffer als afbeelding.\n`);
}
process.exit(failed ? 1 : 0);
