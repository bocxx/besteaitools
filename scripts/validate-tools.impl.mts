// validate-tools.impl.mts — de eigenlijke validatie (gedraaid via tsx).
// Zie scripts/validate-tools.mjs voor gebruik.

import fs from 'node:fs';
import path from 'node:path';
import { toolContentSchema } from '../src/lib/tools-schema.ts';

const toolsDir = path.join(process.cwd(), 'src/content/tools');
const files = fs
  .readdirSync(toolsDir, { recursive: true, withFileTypes: true })
  .filter((e) => e.isFile() && e.name.endsWith('.json'))
  .map((e) => path.join(e.parentPath ?? (e as any).path, e.name))
  // Astro's glob-loader (fast-glob) slaat dot-directories over — doe dat hier ook,
  // anders vlagt de check bestanden (bv. een .obsidian-map) die de build nooit ziet.
  .filter((f) => !path.relative(toolsDir, f).split(path.sep).some((seg) => seg.startsWith('.')));

let failures = 0;
let checked = 0;

for (const file of files) {
  const rel = path.relative(process.cwd(), file);
  let data: unknown;
  try {
    data = JSON.parse(fs.readFileSync(file, 'utf8'));
  } catch (err) {
    failures++;
    console.error(`❌ ${rel}: geen geldige JSON — ${(err as Error).message}`);
    continue;
  }
  checked++;
  const result = toolContentSchema.safeParse(data);
  if (!result.success) {
    failures++;
    console.error(`❌ ${rel}`);
    for (const issue of result.error.issues) {
      const veld = issue.path.join('.') || '(root)';
      // Toon ook de ontvangen waarde — dat maakt de fix direct duidelijk.
      let ontvangen = '';
      try {
        const val = issue.path.reduce<any>((o, k) => (o == null ? o : o[k]), data);
        if (val !== undefined) ontvangen = ` (ontvangen: ${JSON.stringify(val)})`;
      } catch { /* leeg laten */ }
      console.error(`   • ${veld}: ${issue.message}${ontvangen}`);
    }
  }
}

console.log(`\n${checked} tool-JSONs gecheckt, ${failures} met schema-fouten.`);
if (failures > 0) {
  console.error('\nFix de waarden hierboven (bron van waarheid: src/lib/tools-schema.ts + src/lib/taxonomies/).');
  process.exit(1);
}
console.log('✅ Alle tool-JSONs valide tegen het schema.');
