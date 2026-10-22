/**
 * Machine-leesbare datum voor schema.org, `<time datetime>` en de news-sitemap.
 *
 * Frontmatter-datums waren altijd kale dagen (`2026-10-22`). Zod leest die in
 * als UTC-middernacht, en `toISOString()` maakte daar `2026-10-22T00:00:00.000Z`
 * van: voor Google een artikel van 02:00 's nachts, terwijl het in werkelijkheid
 * 's middags verscheen. Voor Top Stories telt een kloppende publicatietijd.
 *
 * Regel: een kale dag blijft een kale dag (`YYYY-MM-DD`, geldig ISO 8601 en
 * eerlijk: we weten het tijdstip niet). Staat er wél een tijd in de frontmatter
 * (`2026-10-22T13:26:00+02:00`), dan geven we het volledige tijdstip door.
 */
export function isoMoment(d: Date): string {
  const kaleDag =
    d.getUTCHours() === 0 &&
    d.getUTCMinutes() === 0 &&
    d.getUTCSeconds() === 0 &&
    d.getUTCMilliseconds() === 0;
  return kaleDag ? d.toISOString().slice(0, 10) : d.toISOString();
}
