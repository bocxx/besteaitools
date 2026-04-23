/**
 * Matching Engine — Public API
 */

export * from './types';
export { run } from './pipeline';
export { applyFilters, filterTool } from './filter';
export { scoreBreakdown, finalScore } from './score';
export { computeConfidence, isLowConfidence, buildFollowUp } from './confidence';
