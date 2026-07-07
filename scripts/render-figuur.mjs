/**
 * scripts/render-figuur.mjs
 *
 * Rasteriseert een datafiguur-SVG naar PNG mét de echte merk-fonts
 * (Space Grotesk + Inter), op 2x — zelfde aanpak als generate-og-images.ts.
 * Reden: een losse SVG kan in <img>/og-context geen webfonts laden en
 * LinkedIn accepteert alleen PNG.
 *
 * Gebruik:
 *   node scripts/render-figuur.mjs <pad-naar.svg> [nog-een.svg …]
 *   → schrijft <zelfde-pad>.png naast elke SVG
 */

import { Resvg } from '@resvg/resvg-js';
import { readFileSync, writeFileSync } from 'node:fs';
import { resolve, join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const FONTS_DIR = join(resolve(__dirname, '..'), 'src/assets/fonts');

const args = process.argv.slice(2);
if (!args.length) {
  console.error('Gebruik: node scripts/render-figuur.mjs <pad.svg> [ … ]');
  process.exit(1);
}

for (const svgPath of args) {
  const svg = readFileSync(svgPath, 'utf8');
  const width = Number((svg.match(/viewBox="0 0 (\d+)/) || [])[1] || 1200);
  const png = new Resvg(svg, {
    fitTo: { mode: 'width', value: width * 2 },
    font: {
      fontFiles: [
        join(FONTS_DIR, 'space-grotesk-bold.ttf'),
        join(FONTS_DIR, 'inter-regular.ttf'),
        join(FONTS_DIR, 'inter-semibold.ttf'),
        join(FONTS_DIR, 'inter-bold.ttf'),
      ],
      loadSystemFonts: true, // fallback voor pijlen/tekens buiten de merk-fonts
      defaultFontFamily: 'Inter',
    },
  }).render().asPng();
  const outPath = svgPath.replace(/\.svg$/, '.png');
  writeFileSync(outPath, png);
  console.log(`✅  ${outPath}`);
}
