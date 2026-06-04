/**
 * Excluded Tools — central blocklist
 *
 * Tools listed here are ignored by both sync-tools-content.ts (won't
 * create draft files) and tools-engine.ts (won't render even if a
 * content file exists). This is the canonical place for permanent
 * editorial removals.
 */

export const excludedTools = new Set<string>([
  'sora',
]);

/** Check whether a slug should be excluded from sync and rendering */
export function isExcludedTool(slug: string): boolean {
  return excludedTools.has(slug.trim().toLowerCase());
}
