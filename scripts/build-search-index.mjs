/**
 * Build Search Index — Pagefind NodeJS API
 *
 * Reads all tool JSON files from src/content/tools/ and indexes them
 * for Pagefind full-text search. Writes to public/pagefind/ so Astro
 * copies it to dist/client/ during the static build.
 */

import * as pagefind from 'pagefind';
import { readdir, readFile } from 'node:fs/promises';
import { join, basename } from 'node:path';

const TOOLS_DIR = 'src/content/tools';
const OUTPUT_DIR = 'public/pagefind';

const CATEGORY_LABELS = {
  chatbots:       'Chatbots',
  coding:         'Coding',
  automation:     'Automatisering',
  image:          'Beeld',
  video:          'Video',
  audio:          'Audio',
  search:         'Zoeken',
  productivity:   'Productiviteit',
  infrastructure: 'Infrastructuur',
  design:         'Design',
};

async function buildIndex() {
  console.log('🔍 Building Pagefind search index...');

  const { index } = await pagefind.createIndex({ logLevel: 'warning' });
  if (!index) {
    console.error('❌ Failed to create Pagefind index');
    process.exit(1);
  }

  let totalRecords = 0;

  // --- Index tool profiles ---
  let files;
  try {
    files = await readdir(TOOLS_DIR);
  } catch {
    console.error('❌ Could not read tools directory:', TOOLS_DIR);
    process.exit(1);
  }

  for (const file of files.filter(f => f.endsWith('.json'))) {
    const slug = basename(file, '.json');
    const raw = await readFile(join(TOOLS_DIR, file), 'utf-8');
    let tool;
    try {
      tool = JSON.parse(raw);
    } catch {
      console.warn(`⚠️  Skipping invalid JSON: ${file}`);
      continue;
    }

    if (tool.draft) continue;

    // Build a rich content blob for full-text search
    const contentParts = [
      tool.name,
      tool.shortDescription,
      tool.longDescription,
      tool.bestFor,
      ...(tool.useCases ?? []),
      ...(tool.strengths ?? []),
      ...(tool.limitations ?? []),
      ...(tool.primaryJobsToBeDone ?? []),
      ...(tool.antiUseCases ?? []),
      tool.verdict,
      tool.whyListed,
      ...(tool.tags ?? []),
      ...(tool.integrations ?? []),
    ].filter(Boolean).join(' ');

    const categoryLabel = CATEGORY_LABELS[tool.category] ?? tool.category ?? '';

    await index.addCustomRecord({
      url: `/ai-tools/${slug}`,
      content: contentParts,
      language: 'nl',
      meta: {
        title: tool.name,
        description: tool.shortDescription ?? '',
        category: categoryLabel,
        pricing: tool.pricingModel ?? '',
        verdict: tool.verdict ?? '',
      },
      filters: {
        category: categoryLabel ? [categoryLabel] : [],
        pricing: tool.pricingModel ? [tool.pricingModel] : [],
      },
    });
    totalRecords++;
  }

  // Write index files
  const { errors } = await index.writeFiles({ outputPath: OUTPUT_DIR });

  if (errors?.length) {
    console.error('❌ Pagefind errors:', errors);
    process.exit(1);
  }

  console.log(`✅ Search index built: ${totalRecords} tools → ${OUTPUT_DIR}/`);

  await pagefind.close();
}

buildIndex().catch(err => {
  console.error('❌ build-search-index failed:', err);
  process.exit(1);
});
