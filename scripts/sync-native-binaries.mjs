/**
 * scripts/sync-native-binaries.mjs — draait als `postinstall`.
 *
 * Waarom: deze repo wordt gedeeld tussen macOS (jouw Mac) en Linux (Claude's
 * sandbox). Native pakketten (rollup, resvg, sharp, esbuild, pagefind) zetten
 * alleen de binary van het háár platform in node_modules; elke npm-install op
 * het ene platform sloopt zo de binaries van het andere → eindeloos
 * "npm install" over en weer (plus npm-bug npm/cli#4828).
 *
 * Oplossing: na elke install plaatsen we de ontbrekende binaries van het
 * ándere platform erbij (--force --no-save). Beide platforms kunnen dan
 * dezelfde node_modules gebruiken. Kost ~50 MB, scheelt eindeloze reinstalls.
 *
 * Best-effort: faalt nooit hard (exit 0). Recursie-guard via env, omdat de
 * geneste `npm install` anders opnieuw postinstall zou triggeren.
 */
import { readFileSync, existsSync } from 'node:fs';
import { execSync } from 'node:child_process';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

if (process.env.SKIP_NATIVE_SYNC) process.exit(0);

const ROOT = join(dirname(fileURLToPath(import.meta.url)), '..');
const nm = (p) => join(ROOT, 'node_modules', p);

const versionOf = (pkg) => {
  try { return JSON.parse(readFileSync(nm(`${pkg}/package.json`), 'utf8')).version; }
  catch { return null; }
};
const sharpRange = (name) => {
  try {
    const s = JSON.parse(readFileSync(nm('sharp/package.json'), 'utf8'));
    return s.optionalDependencies?.[name] ?? null;
  } catch { return null; }
};

// arm64-only: beide machines (Apple Silicon + Linux/arm64). Breidt uit met
// x64-varianten als er ooit een Intel-machine bijkomt.
const targets = [];
const addPair = (metaPkg, names) => {
  const v = versionOf(metaPkg);
  if (!v) return;
  for (const name of names) targets.push({ name, version: v });
};

addPair('rollup', ['@rollup/rollup-darwin-arm64', '@rollup/rollup-linux-arm64-gnu']);
addPair('workerd', ['@cloudflare/workerd-darwin-arm64', '@cloudflare/workerd-linux-arm64']);
addPair('@resvg/resvg-js', ['@resvg/resvg-js-darwin-arm64', '@resvg/resvg-js-linux-arm64-gnu']);
addPair('esbuild', ['@esbuild/darwin-arm64', '@esbuild/linux-arm64']);
addPair('pagefind', ['@pagefind/darwin-arm64', '@pagefind/linux-arm64']);
for (const name of [
  '@img/sharp-darwin-arm64',
  '@img/sharp-linux-arm64',
  '@img/sharp-libvips-darwin-arm64',
  '@img/sharp-libvips-linux-arm64',
]) {
  const range = sharpRange(name);
  if (range) targets.push({ name, version: range });
}

const missing = targets.filter((t) => !existsSync(nm(t.name)));
if (missing.length === 0) {
  console.log('✓ cross-platform binaries compleet (mac + linux)');
  process.exit(0);
}

const specs = missing.map((t) => `${t.name}@${t.version}`).join(' ');
console.log(`→ cross-platform binaries bijplaatsen: ${missing.map((t) => t.name).join(', ')}`);
try {
  execSync(
    `npm install ${specs} --force --no-save --no-audit --no-fund --loglevel=error`,
    { stdio: 'inherit', cwd: ROOT, env: { ...process.env, SKIP_NATIVE_SYNC: '1' } },
  );
  console.log('✓ klaar — node_modules werkt nu op macOS én Linux');
} catch (e) {
  console.warn(`⚠ niet alle binaries geplaatst (geen blokkade): ${e.message}`);
}
process.exit(0);
