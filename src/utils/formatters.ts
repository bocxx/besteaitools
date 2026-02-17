/**
 * Formatting utilities
 * 
 * Provides consistent formatting for dates, numbers, text, and other content.
 */

// ============================================
// DATE FORMATTING
// ============================================

/**
 * Format date to locale string
 * @param date - Date to format
 * @param locale - Locale (default: 'en-US')
 * @param options - Intl.DateTimeFormatOptions
 */
export function formatDate(
  date: Date,
  locale: string = 'en-US',
  options?: Intl.DateTimeFormatOptions
): string {
  const defaultOptions: Intl.DateTimeFormatOptions = {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  };
  
  return date.toLocaleDateString(locale, options || defaultOptions);
}

/**
 * Format date to short format (e.g., "Jan 1, 2024")
 */
export function formatDateShort(date: Date, locale: string = 'en-US'): string {
  return formatDate(date, locale, {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  });
}

/**
 * Format date to relative time (e.g., "2 days ago")
 */
export function formatRelativeTime(date: Date, locale: string = 'en-US'): string {
  const now = new Date();
  const diffInSeconds = Math.floor((now.getTime() - date.getTime()) / 1000);
  
  const rtf = new Intl.RelativeTimeFormat(locale, { numeric: 'auto' });
  
  const intervals: Array<[number, Intl.RelativeTimeFormatUnit]> = [
    [31536000, 'year'],
    [2592000, 'month'],
    [604800, 'week'],
    [86400, 'day'],
    [3600, 'hour'],
    [60, 'minute'],
    [1, 'second'],
  ];
  
  for (const [seconds, unit] of intervals) {
    const value = Math.floor(diffInSeconds / seconds);
    if (value >= 1) {
      return rtf.format(-value, unit);
    }
  }
  
  return rtf.format(0, 'second');
}

/**
 * Format date to ISO string (for datetime attributes)
 */
export function formatDateISO(date: Date): string {
  return date.toISOString();
}

/**
 * Format date for Dutch locale
 */
export function formatDateNL(date: Date): string {
  return formatDate(date, 'nl-NL');
}

// ============================================
// NUMBER FORMATTING
// ============================================

/**
 * Format number with thousands separator
 */
export function formatNumber(
  num: number,
  locale: string = 'en-US',
  options?: Intl.NumberFormatOptions
): string {
  return new Intl.NumberFormat(locale, options).format(num);
}

/**
 * Format number to compact notation (e.g., "1.2K", "3.4M")
 */
export function formatNumberCompact(num: number, locale: string = 'en-US'): string {
  return new Intl.NumberFormat(locale, {
    notation: 'compact',
    compactDisplay: 'short',
  }).format(num);
}

/**
 * Format reading time in minutes
 */
export function formatReadingTime(minutes: number, locale: string = 'en'): string {
  if (locale === 'nl') {
    return `${minutes} min lezen`;
  }
  return `${minutes} min read`;
}

/**
 * Calculate reading time from word count
 * Assumes average reading speed of 200 words per minute
 */
export function calculateReadingTime(wordCount: number): number {
  return Math.ceil(wordCount / 200);
}

// ============================================
// TEXT FORMATTING
// ============================================

/**
 * Truncate text to specified length with ellipsis
 */
export function truncate(text: string, maxLength: number, ellipsis: string = '...'): string {
  if (text.length <= maxLength) {
    return text;
  }
  return text.slice(0, maxLength - ellipsis.length).trim() + ellipsis;
}

/**
 * Truncate text by word boundary
 */
export function truncateWords(text: string, maxWords: number, ellipsis: string = '...'): string {
  const words = text.split(/\s+/);
  if (words.length <= maxWords) {
    return text;
  }
  return words.slice(0, maxWords).join(' ') + ellipsis;
}

/**
 * Convert text to slug (URL-friendly)
 */
export function slugify(text: string): string {
  return text
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '') // Remove diacritics
    .replace(/[^a-z0-9\s-]/g, '') // Remove special characters
    .replace(/\s+/g, '-') // Replace spaces with hyphens
    .replace(/-+/g, '-') // Remove consecutive hyphens
    .trim();
}

/**
 * Capitalize first letter of each word
 */
export function titleCase(text: string): string {
  return text
    .toLowerCase()
    .split(' ')
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');
}

/**
 * Extract excerpt from markdown content
 */
export function extractExcerpt(content: string, maxLength: number = 160): string {
  // Remove markdown syntax
  const plainText = content
    .replace(/#{1,6}\s/g, '') // Remove headers
    .replace(/\*\*(.*?)\*\*/g, '$1') // Remove bold
    .replace(/\*(.*?)\*/g, '$1') // Remove italic
    .replace(/\[(.*?)\]\(.*?\)/g, '$1') // Remove links
    .replace(/`(.*?)`/g, '$1') // Remove code
    .replace(/\n+/g, ' ') // Replace newlines with spaces
    .trim();
  
  return truncate(plainText, maxLength);
}

/**
 * Count words in text
 */
export function countWords(text: string): number {
  return text.trim().split(/\s+/).filter(word => word.length > 0).length;
}

// ============================================
// URL & PATH FORMATTING
// ============================================

/**
 * Ensure URL has protocol
 */
export function ensureProtocol(url: string): string {
  if (!/^https?:\/\//i.test(url)) {
    return `https://${url}`;
  }
  return url;
}

/**
 * Get domain from URL
 */
export function getDomain(url: string): string {
  try {
    const urlObj = new URL(ensureProtocol(url));
    return urlObj.hostname.replace(/^www\./, '');
  } catch {
    return url;
  }
}

/**
 * Format social handle (ensure @ prefix)
 */
export function formatHandle(handle: string): string {
  return handle.startsWith('@') ? handle : `@${handle}`;
}

/**
 * Remove @ prefix from handle
 */
export function cleanHandle(handle: string): string {
  return handle.replace(/^@/, '');
}

// ============================================
// COLOR FORMATTING
// ============================================

/**
 * Convert hex color to RGB
 */
export function hexToRgb(hex: string): { r: number; g: number; b: number } | null {
  const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
  return result
    ? {
        r: parseInt(result[1], 16),
        g: parseInt(result[2], 16),
        b: parseInt(result[3], 16),
      }
    : null;
}

/**
 * Lighten or darken a hex color
 */
export function adjustBrightness(hex: string, percent: number): string {
  const rgb = hexToRgb(hex);
  if (!rgb) return hex;
  
  const adjust = (value: number) => {
    const adjusted = value + (value * percent) / 100;
    return Math.max(0, Math.min(255, Math.round(adjusted)));
  };
  
  const r = adjust(rgb.r).toString(16).padStart(2, '0');
  const g = adjust(rgb.g).toString(16).padStart(2, '0');
  const b = adjust(rgb.b).toString(16).padStart(2, '0');
  
  return `#${r}${g}${b}`;
}
