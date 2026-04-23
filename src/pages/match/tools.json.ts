/**
 * /match/tools.json — client-side tool dataset for the matching wizard.
 *
 * Emitted as a static JSON file at build time. Returns the full Tool
 * list (minus draft + excluded) with all fields the matching engine
 * reads. Kept untrimmed for V1; optimise in Fase 4 if bundle size hurts.
 */

import type { APIContext } from 'astro';
import { getAllTools } from '../../lib/tools-engine';

export async function GET(_context: APIContext) {
  const tools = await getAllTools();
  // Drop stats.history / stats.source_articles etc. — the matching
  // engine only reads the content layer, not the radar stats.
  const trimmed = tools.map(({ stats, scores, ...rest }) => rest);

  return new Response(JSON.stringify(trimmed), {
    status: 200,
    headers: {
      'Content-Type': 'application/json; charset=utf-8',
      // Short cache — the dataset changes whenever redactioneel data is
      // re-seeded, so don't let stale copies linger too long.
      'Cache-Control': 'public, max-age=300, must-revalidate',
    },
  });
}
