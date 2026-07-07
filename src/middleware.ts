/**
 * Astro middleware — canonieke URL-vorm + agent-readiness headers
 *
 * 0. 308-redirect: trailing-slash-varianten → canonieke no-slash-vorm
 * 1. /.well-known/api-catalog — RFC 9727, application/linkset+json
 * 2. Link headers (RFC 8288) op alle HTML-responses
 * 3. Markdown content negotiation (Accept: text/markdown → text/markdown response)
 *
 * LET OP (audit juli 2026): een Cloudflare-edge-cache-regel serveert HTML nu
 * rechtstreeks uit de cache (cf-cache-status: HIT), waardoor deze Worker op
 * gecachte pagina's helemaal niet draait — redirects, Link-headers en
 * markdown-negotiation zijn dan live dood. De cache-regel moet in het
 * Cloudflare-dashboard worden aangepast (Worker laten draaien, of minimaal
 * cache-key laten variëren op Accept) + cache purgen. Dat is geen code-kwestie.
 */
import { defineMiddleware } from 'astro:middleware';

const SITE = 'https://debesteaitools.nl';

// RFC 8288 Link headers — agent discovery
const LINK_HEADERS = [
  '</.well-known/api-catalog>; rel="api-catalog"',
  '</.well-known/mcp/server-card.json>; rel="describedby"; type="application/json"',
  '</llms.txt>; rel="service-doc"',
  '</.well-known/agent-skills/index.json>; rel="https://agentskills.io/rel/skills-index"',
].join(', ');

// API Catalog (RFC 9727) — inline omdat extensieloze static files de verkeerde
// Content-Type krijgen. Door hier te returnen vóór next() omzeilen we de asset-serving.
const API_CATALOG = {
  linkset: [
    {
      anchor: SITE + '/',
      'service-doc': [
        { href: SITE + '/llms.txt', type: 'text/plain' },
      ],
      describedby: [
        { href: SITE + '/.well-known/mcp/server-card.json', type: 'application/json' },
      ],
    },
    {
      anchor: SITE + '/api/subscribe',
      'service-doc': [
        { href: SITE + '/nieuwsbrief', type: 'text/html' },
      ],
    },
  ],
};

// Markdown-samenvatting voor de homepage (markdown negotiation)
const HOMEPAGE_MARKDOWN = `# De Beste AI Tools — debesteaitools.nl

> Onafhankelijke Nederlandstalige gids voor AI-tools. Elke beoordeling is redactioneel en geverifieerd. Posities zijn niet te koop.

## Snel vinden

- [Volledige machine-leesbare toolcatalogus](${SITE}/llms.txt) — alle tools met verdicts, taken en prijzen
- [Doorzoekbaar overzicht](${SITE}/ai-tools) — 500+ tools met filters
- [Taakgerichte keuzehulp](${SITE}/vind-je-beste-ai-tool)
- [Vergelijkingen](${SITE}/vergelijk) — side-by-side op data
- [AI-nieuws & radar](${SITE}/nieuws) — dagelijkse launches en trends

## Agent Discovery

- API Catalog: ${SITE}/.well-known/api-catalog
- MCP Server Card: ${SITE}/.well-known/mcp/server-card.json
- Agent Skills: ${SITE}/.well-known/agent-skills/index.json
- Auth info: ${SITE}/auth.md (geen authenticatie vereist)

## Over de data

Onafhankelijke redactionele oordelen. Geen gesponsorde posities.
Methodologie: ${SITE}/hoe-wij-beoordelen
`;

export const onRequest = defineMiddleware(async (context, next) => {
  const url = new URL(context.request.url);
  const { pathname } = url;
  const accept = context.request.headers.get('accept') ?? '';

  // ── 0. Trailing slash → 308 naar de canonieke no-slash-vorm ─────────────
  // De canonieke vorm is sitewide zónder trailing slash (root uitgezonderd):
  // canonical/og:url in Layout.astro, de sitemap-serialize in astro.config.mjs
  // en alle interne links gebruiken die vorm. Door `run_worker_first = true`
  // doet Cloudflare's eigen asset-redirect dit niet meer, dus zonder deze stap
  // geven béide slash-varianten 200 (duplicate serving, audit juli 2026).
  // 308 (permanent, method-preserving) i.p.v. 301 zodat ook niet-GET veilig is.
  if (pathname !== '/' && pathname.endsWith('/')) {
    const canonicalPath = pathname.replace(/\/+$/, '') || '/';
    return context.redirect(canonicalPath + url.search, 308);
  }

  // ── 1. API Catalog (RFC 9727) ────────────────────────────────────────────
  // Inline serveren met application/linkset+json — static files krijgen
  // geen custom Content-Type via Cloudflare Workers Static Assets.
  if (pathname === '/.well-known/api-catalog') {
    return new Response(JSON.stringify(API_CATALOG, null, 2), {
      status: 200,
      headers: {
        'Content-Type': 'application/linkset+json',
        'Cache-Control': 'public, max-age=3600',
        'Access-Control-Allow-Origin': '*',
        'Link': LINK_HEADERS,
      },
    });
  }

  // ── 2. Markdown content negotiation ─────────────────────────────────────
  if (accept.includes('text/markdown')) {
    const isHtmlRoute =
      !pathname.startsWith('/api/') &&
      !pathname.match(/\.(js|css|png|jpg|webp|svg|ico|xml|txt|json|woff2?)$/);

    if (isHtmlRoute) {
      const markdown = pathname === '/'
        ? HOMEPAGE_MARKDOWN
        : `# debesteaitools.nl\n\nBekijk de volledige pagina op ${SITE}${pathname}\n\nMachine-leesbare catalogus: [${SITE}/llms.txt](${SITE}/llms.txt)\n`;

      return new Response(markdown, {
        status: 200,
        headers: {
          'Content-Type': 'text/markdown; charset=utf-8',
          'Link': LINK_HEADERS,
          'Vary': 'Accept',
        },
      });
    }
  }

  // ── 3. Doorsturen naar Astro / static assets ─────────────────────────────
  const response = await next();

  // Link headers toevoegen aan alle HTML-responses
  const contentType = response.headers.get('content-type') ?? '';
  if (contentType.includes('text/html')) {
    const newHeaders = new Headers(response.headers);
    newHeaders.set('Link', LINK_HEADERS);
    newHeaders.append('Vary', 'Accept');
    return new Response(response.body, {
      status: response.status,
      statusText: response.statusText,
      headers: newHeaders,
    });
  }

  return response;
});
