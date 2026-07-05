#!/usr/bin/env node
/**
 * Generate responsive image variants for news hero images.
 * Creates -400w, -600w, -1024w versions from source images, breedte-gebaseerd
 * met behoud van aspect ratio. Draait tijdens de build voor mobiele PageSpeed.
 *
 * Listing-cards (NewsCard) tonen heroImage klein; de volle 1200px-bron blijft
 * de og:image / artikel-hero (Discover), dus die raken we hier niet.
 */

import sharp from 'sharp';
import { promises as fs } from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const publicImages = path.join(__dirname, '../public/images');

// Beide bronmappen die als hero/large NewsCard kunnen renderen:
// - nieuws: artikel-hero's (1200px)
// - digest: radar-beelden (680px)
const DIRS = ['nieuws', 'digest'];

const WIDTHS = [
  { size: 400, suffix: '-400w' },
  { size: 600, suffix: '-600w' },
  { size: 750, suffix: '-750w' },
  { size: 1024, suffix: '-1024w' }
];

const VARIANT_RE = /-(400w|600w|750w|1024w)\.webp$/;

async function processDir(dir) {
  const absDir = path.join(publicImages, dir);
  let files;
  try {
    files = await fs.readdir(absDir);
  } catch {
    console.log(`ℹ ${dir}/ niet gevonden, overslaan`);
    return;
  }

  const webpFiles = files.filter((f) => f.endsWith('.webp') && !VARIANT_RE.test(f));
  if (webpFiles.length === 0) {
    console.log(`ℹ ${dir}/: geen afbeeldingen om te verwerken`);
    return;
  }

  console.log(`📸 ${dir}/: ${webpFiles.length} afbeeldingen verwerken...`);

  for (const file of webpFiles) {
    const inputPath = path.join(absDir, file);
    const baseName = file.replace('.webp', '');

    for (const { size, suffix } of WIDTHS) {
      const outputFile = `${baseName}${suffix}.webp`;
      const outputPath = path.join(absDir, outputFile);

      // Skip als variant al bestaat en niet ouder is dan de bron
      try {
        const sourceStat = await fs.stat(inputPath);
        const existingStat = await fs.stat(outputPath);
        if (existingStat.mtime >= sourceStat.mtime) {
          continue;
        }
      } catch {
        // Variant bestaat nog niet, aanmaken
      }

      try {
        await sharp(inputPath)
          // Breedte vast, hoogte auto → aspect ratio van de bron blijft behouden.
          // withoutEnlargement: kleinere bron (digest 680px) wordt niet opgeblazen.
          .resize(size, null, { withoutEnlargement: true })
          .webp({ quality: 80 })
          .toFile(outputPath);

        const stat = await fs.stat(outputPath);
        const sizeKb = (stat.size / 1024).toFixed(1);
        console.log(`  ✓ ${dir}/${outputFile} (${sizeKb} KiB)`);
      } catch (err) {
        console.error(`  ✗ Mislukt: ${dir}/${outputFile}:`, err.message);
      }
    }
  }
}

async function generateResponsiveVariants() {
  for (const dir of DIRS) {
    await processDir(dir);
  }
  console.log('✓ Responsive image generation complete');
}

generateResponsiveVariants().catch((err) => {
  console.error('✗ Error generating responsive images:', err);
  process.exit(1);
});
