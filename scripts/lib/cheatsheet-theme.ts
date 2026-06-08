/**
 * scripts/lib/cheatsheet-theme.ts
 *
 * Shared house-style tokens for the debesteaitools.nl cheatsheet pipeline.
 * Hex values are sRGB conversions of the live oklch tokens in
 * src/styles/00-tokens.css ("Deep Space Nebula" — coral primary, teal
 * secondary, indigo tertiary). Keep in sync if the site theme changes.
 */

export const C = {
  // Backgrounds — near-black with a touch of warmth so it doesn't read as #000
  bg: '#0a0a0c',
  bgSurface: '#121214',
  bgPanel: '#17171a',
  bgPanelAlt: '#1d1d21',

  // Brand
  primary: '#ff5171', // coral
  primaryDeep: '#de1c4e',
  secondary: '#00c0b0', // teal
  tertiary: '#7290fa', // indigo

  // Semantic
  success: '#3cc998',
  warning: '#f38300',
  error: '#fc5855',
  info: '#32b3e6',

  // Text
  textPrimary: '#f1f5fc',
  textSecondary: '#94a6be',
  textMuted: '#798898',
  bgInk: '#0a0a0c',

  border: 'rgba(255,255,255,0.09)',
  borderStrong: 'rgba(255,255,255,0.14)',
  grid: 'rgba(255,255,255,0.045)', // blueprint-grid overlay line colour
} as const;

/** Accent rotation used to colour category blocks / sections / steps. */
export const ACCENTS = [
  C.primary,
  C.secondary,
  C.tertiary,
  C.warning,
  C.success,
  C.info,
  '#f0abfc', // pink
  '#a87ed4', // violet
] as const;

/** Dutch category labels used by the radar autofill. */
export const CAT_LABEL: Record<string, string> = {
  tekst: 'Tekst & chat',
  chatbots: 'Chatbots',
  coding: 'Coding',
  automatisering: 'Automatisering',
  automation: 'Automatisering',
  beeld: 'Beeld',
  image: 'Beeld',
  video: 'Video',
  zoeken: 'Zoeken',
  search: 'Zoeken',
  productiviteit: 'Productiviteit',
  productivity: 'Productiviteit',
  spraak: 'Spraak & audio',
  audio: 'Audio',
  website: 'Website',
  design: 'Design',
  muziek: 'Muziek',
  marketing: 'Marketing',
  infra: 'Infrastructuur',
  infrastructure: 'Infrastructuur',
};

export const TREND_GLYPH: Record<string, string> = {
  rising: '▲',
  hot: '▲',
  up: '▲',
  stable: '▬',
  steady: '▬',
  flat: '▬',
  falling: '▼',
  cooling: '▼',
  declining: '▼',
  down: '▼',
};

export function trunc(str: string, max: number): string {
  if (!str) return '';
  return str.length > max ? str.slice(0, max - 1).trimEnd() + '…' : str;
}

export function alpha(hex: string, pct: number): string {
  // Only works on #rrggbb
  if (!/^#[0-9a-fA-F]{6}$/.test(hex)) return hex;
  const byte = Math.round((pct / 100) * 255)
    .toString(16)
    .padStart(2, '0');
  return hex + byte;
}

export function catLabel(key: string): string {
  return CAT_LABEL[key] ?? key.charAt(0).toUpperCase() + key.slice(1);
}
