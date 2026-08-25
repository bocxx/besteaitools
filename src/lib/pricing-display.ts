/**
 * Prijs-weergave afgeleid uit de redactionele `pricing`-string.
 *
 * Waarom niet uit `hasFreePlan` / `startingPriceMonthly`: die zijn per
 * 25 aug 2026 op respectievelijk 1 en 2 van de 246 tools ingevuld, terwijl
 * `pricing` op 245 van de 246 staat én bij elke reviewronde wordt geverifieerd.
 * De string is dus de betrouwbaarste bron; deze helpers leiden er een compacte
 * prijs en een "kun je gratis beginnen"-vlag uit af.
 *
 * Gebruikt door /beste-ai-tools en de gids-pagina's (/gids/[slug]).
 */

interface PrijsBron {
  pricing?: string;
  pricingModel?: string;
  priceTiers?: { name: string; eurPerMonth: number }[];
}

/**
 * Laagste BETAALDE instapprijs, bv. "€9,99" of "$20"; "Gratis" als er geen
 * betaald niveau is. Bewust zonder het woord "vanaf": dat hoort in de
 * kolomkop ("Betaald vanaf"). Een tool met een gratis niveau én een betaald
 * plan toont hier de betaalde prijs — of je gratis kunt beginnen staat in een
 * aparte kolom, zodat "€20" nooit gelezen wordt als "kost altijd €20".
 * Echte tiers gaan vóór de vrije tekst — die zijn exact.
 */
export function kortePrijs(tool: PrijsBron): string {
  const tiers = tool.priceTiers ?? [];
  if (tiers.length > 0) {
    const laagste = Math.min(...tiers.map((t) => t.eurPerMonth));
    return laagste === 0 ? 'Gratis' : `€${String(laagste).replace('.', ',')}`;
  }
  const pricing = tool.pricing;
  if (!pricing) return '—';
  const m = pricing.match(/([€$])\s?(\d+(?:[.,]\d+)?)/);
  if (m) return `${m[1]}${m[2]}`;
  // Geen bedrag gevonden. Alleen "Gratis" tonen als de tool écht geen betaald
  // niveau heeft — anders '—'. Een string als "Gratis account om te proberen;
  // betaalde abonnementen met actuele tarieven" betekent dat er wél betaald
  // wordt, maar dat wij het tarief niet hebben; die mag hier geen "Gratis"
  // opleveren onder een kolom die "Betaald vanaf" heet.
  if (tool.pricingModel === 'free' || /open source/i.test(pricing)) return 'Gratis';
  return '—';
}

/**
 * Kun je zonder betalen aan de slag? "Geen gratis tier" wint van "gratis",
 * zodat een zin als "Geen gratis tier; jaarlijks korting" niet vals positief is.
 */
export function gratisTeProberen(tool: PrijsBron): boolean {
  const t = tool.pricing ?? '';
  if (/geen gratis|no free/i.test(t)) return false;
  if (tool.pricingModel === 'free') return true;
  return /gratis|free tier|free plan/i.test(t);
}
