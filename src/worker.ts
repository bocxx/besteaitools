/**
 * Eigen Worker-entry: past de regels uit public/_redirects zélf toe, vóór Astro.
 *
 * WAAROM (gemeten 18 sep 2026): met run_worker_first = true gaat elke request
 * eerst door de Astro-handler. Die valt voor URL's zonder route terug op
 * env.ASSETS.fetch(), en in dat pad werden de _redirects-regels nooit als
 * redirect aan de bezoeker teruggegeven:
 *   - interne regels (bv. /contact → /over 301) kwamen terug als 200 mét de
 *     inhoud van het doel → dubbele content i.p.v. een redirect;
 *   - externe regels (bv. de DBAT → aiplatformmkb.nl-consolidatie) gaven 404.
 * Hier handelen we de tabel af met een echte 301/302/307/308, en pas daarna
 * gaat de request naar Astro zoals voorheen.
 *
 * public/_redirects blijft de enige bron van waarheid; dit bestand leest hem
 * bij de build in (Vite ?raw). Status 200 (rewrite) laten we bewust aan de
 * asset-laag over.
 */
import { handle } from '@astrojs/cloudflare/handler';
import redirectsRaw from '../public/_redirects?raw';

type Rule = { from: string; to: string; status: number; splat: boolean };

const REDIRECT_STATUSES = new Set([301, 302, 303, 307, 308]);

function parseRedirects(raw: string): { exact: Map<string, Rule>; splats: Rule[] } {
  const exact = new Map<string, Rule>();
  const splats: Rule[] = [];
  for (const line of raw.split(/\r?\n/)) {
    const trimmed = line.trim();
    if (!trimmed || trimmed.startsWith('#')) continue;
    const [from, to, statusRaw] = trimmed.split(/\s+/);
    if (!from || !to) continue;
    const status = statusRaw ? Number(statusRaw) : 302;
    if (!REDIRECT_STATUSES.has(status)) continue;
    if (from.endsWith('/*')) {
      splats.push({ from: from.slice(0, -1), to, status, splat: true });
    } else if (!exact.has(from)) {
      // Eerste regel wint, net als bij Cloudflare zelf.
      exact.set(from, { from, to, status, splat: false });
    }
  }
  return { exact, splats };
}

let table: ReturnType<typeof parseRedirects>;
try {
  table = parseRedirects(redirectsRaw);
} catch {
  // Een kapot _redirects-bestand mag de site nooit platleggen.
  table = { exact: new Map(), splats: [] };
}

function findRedirect(url: URL): Response | null {
  const { pathname, search } = url;
  let target: string | null = null;
  let status = 301;

  const hit = table.exact.get(pathname);
  if (hit) {
    target = hit.to;
    status = hit.status;
  } else {
    for (const rule of table.splats) {
      if (pathname.startsWith(rule.from)) {
        target = rule.to.replace(':splat', pathname.slice(rule.from.length));
        status = rule.status;
        break;
      }
    }
  }
  if (!target) return null;

  const location = new URL(target, url.origin);
  if (!location.search && search) location.search = search;
  // Geen redirect naar exact dezelfde URL (voorkomt een lus).
  if (location.href === url.href) return null;
  return new Response(null, { status, headers: { Location: location.href } });
}

export default {
  // Types los gehouden: dit project genereert geen `Env` via `wrangler types`.
  async fetch(request: Request, env: any, ctx: any): Promise<Response> {
    if (request.method === 'GET' || request.method === 'HEAD') {
      const redirect = findRedirect(new URL(request.url));
      if (redirect) return redirect;
    }
    return handle(request, env, ctx);
  },
};
