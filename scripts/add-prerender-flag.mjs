#!/usr/bin/env node
/**
 * One-shot: add `export const prerender = true` to every page under
 * src/pages/, except /api/* which should stay dynamic.
 *
 * Safe to run repeatedly — skips files that already have the flag.
 */

import { readFileSync, writeFileSync } from 'fs';
import { execSync } from 'child_process';

const files = execSync(
  `find src/pages -type f \\( -name "*.astro" -o -name "*.ts" \\) -not -path "src/pages/api/*"`,
  { encoding: 'utf8' },
).trim().split('\n').filter(Boolean);

const FLAG_LINE = 'export const prerender = true;';
let touched = 0;

for (const path of files) {
  const raw = readFileSync(path, 'utf8');
  if (raw.includes('export const prerender')) continue;

  let next;
  if (path.endsWith('.astro')) {
    // Insert inside the first frontmatter block. All existing pages have one.
    const match = raw.match(/^---\n([\s\S]*?)\n---/);
    if (!match) {
      console.log(`  [skip] ${path} — no frontmatter`);
      continue;
    }
    const frontmatter = match[1];
    const newFrontmatter = `${frontmatter}\n\n${FLAG_LINE}`;
    next = raw.replace(match[0], `---\n${newFrontmatter}\n---`);
  } else {
    // .ts endpoint: add after the import block.
    const lines = raw.split('\n');
    let insertAt = 0;
    for (let i = 0; i < lines.length; i++) {
      if (lines[i].startsWith('import ') || lines[i].match(/^\s*from '/) || lines[i].trim() === '') {
        insertAt = i + 1;
      } else {
        break;
      }
    }
    lines.splice(insertAt, 0, '', FLAG_LINE, '');
    next = lines.join('\n');
  }

  writeFileSync(path, next, 'utf8');
  touched++;
  console.log(`  [write] ${path}`);
}

console.log(`\nAdded prerender flag to ${touched} files (skipped ${files.length - touched}).`);
