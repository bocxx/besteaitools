/**
 * Nieuwsbrief-inschrijving — Resend Contacts API.
 *
 * On-demand route (prerender = false), draait op de Cloudflare Worker.
 *
 * Env (zet als Worker-secrets / wrangler [vars]):
 *   RESEND_API_KEY          — Bearer token (vereist voor live modus)
 *   RESEND_WELCOME_FROM     — From-adres voor de welkomstmail (optioneel)
 *   RESEND_WELCOME_SUBJECT  — Override welkomst-subject (optioneel)
 *
 * Zonder RESEND_API_KEY draait dit als stub (logt + 200 ok), zodat dev en
 * preview werken zonder credentials.
 */
import type { APIRoute } from 'astro';
import { welcomeEmail } from '../../lib/welcome-email';
import { siteConfig } from '../../config/site';

export const prerender = false;

/** Site-tag op elk contact, zodat je in Resend ziet dat een aanmelding via
 *  debesteaitools.nl binnenkwam (handig als je Resend-account meerdere sites
 *  bedient). bv. "debesteaitools.nl". */
const SITE_TAG = (() => {
  try { return new URL(siteConfig.url).host.replace(/^www\./, ''); }
  catch { return siteConfig.name; }
})();

interface SubPayload {
  email?: string;
  source?: string;
}

interface CfEnv {
  RESEND_API_KEY?: string;
  RESEND_WELCOME_FROM?: string;
  RESEND_WELCOME_SUBJECT?: string;
  /** Optioneel: laat aanmeldingen in een specifieke Resend-audience landen
   *  (bv. een "debesteaitools"-audience), zodat ze per site gescheiden zijn. */
  RESEND_AUDIENCE_ID?: string;
}

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

/** CSRF: weiger requests waarvan Origin/Referer-host niet de onze is. */
function isSameOrigin(request: Request): boolean {
  const url = new URL(request.url);
  const origin = request.headers.get('origin');
  const referer = request.headers.get('referer');
  if (origin) { try { return new URL(origin).host === url.host; } catch { return false; } }
  if (referer) { try { return new URL(referer).host === url.host; } catch { return false; } }
  return false;
}

async function getEnv(): Promise<CfEnv> {
  try {
    const mod = await import('cloudflare:workers');
    return (mod.env ?? {}) as unknown as CfEnv;
  } catch {
    return (typeof process !== 'undefined' ? process.env : {}) as CfEnv;
  }
}

export const POST: APIRoute = async ({ request }) => {
  if (!isSameOrigin(request)) return json({ ok: false, error: 'Cross-origin verzoek geweigerd' }, 403);

  let payload: SubPayload = {};
  try { payload = await request.json(); } catch { return json({ ok: false, error: 'Ongeldige JSON' }, 400); }

  if (!payload.email || !EMAIL_RE.test(payload.email)) {
    return json({ ok: false, error: 'Vul een geldig e-mailadres in.' }, 400);
  }

  const { RESEND_API_KEY, RESEND_WELCOME_FROM, RESEND_WELCOME_SUBJECT, RESEND_AUDIENCE_ID } = await getEnv();

  if (!RESEND_API_KEY) {
    console.log('[subscribe-stub] geen RESEND_API_KEY — API-call overgeslagen', {
      email: payload.email,
      site: SITE_TAG,
      source: payload.source,
    });
    return json({ ok: true, mode: 'stub' });
  }

  // 1. Contact aanmaken. Met een RESEND_AUDIENCE_ID landt het in die audience
  //    (per-site scheiding); zonder valt het terug op het globale contacts-model.
  //    `signup_site` tagt elk contact zodat je in Resend ziet dat het via
  //    debesteaitools.nl binnenkwam.
  const contactsUrl = RESEND_AUDIENCE_ID
    ? `https://api.resend.com/audiences/${RESEND_AUDIENCE_ID}/contacts`
    : 'https://api.resend.com/contacts';
  try {
    const res = await fetch(contactsUrl, {
      method: 'POST',
      headers: { Authorization: `Bearer ${RESEND_API_KEY}`, 'Content-Type': 'application/json' },
      body: JSON.stringify({
        email: payload.email,
        unsubscribed: false,
        properties: {
          signup_site: SITE_TAG,
          signup_source: (payload.source ?? 'direct').slice(0, 120),
        },
      }),
    });
    if (!res.ok) {
      const detail = await res.text().catch(() => '');
      if (res.status === 422 && /already.*(exist|subscrib)/i.test(detail)) {
        return json({ ok: true, mode: 'already-subscribed' });
      }
      console.error('[subscribe] resend error', res.status, detail);
      return json({ ok: false, error: 'De inschrijfservice weigerde het verzoek.' }, 502);
    }
  } catch (err) {
    console.error('[subscribe] fetch mislukt', err);
    return json({ ok: false, error: 'Netwerkfout — probeer het opnieuw.' }, 502);
  }

  // 2. Welkomstmail (best-effort; alleen als er een from-adres is).
  if (RESEND_WELCOME_FROM) {
    try {
      await fetch('https://api.resend.com/emails', {
        method: 'POST',
        headers: { Authorization: `Bearer ${RESEND_API_KEY}`, 'Content-Type': 'application/json' },
        body: JSON.stringify({
          from: RESEND_WELCOME_FROM,
          to: [payload.email],
          subject: RESEND_WELCOME_SUBJECT ?? welcomeEmail.subject,
          html: welcomeEmail.html(),
          text: welcomeEmail.text(),
        }),
      });
    } catch (err) {
      console.warn('[subscribe] welkomstmail mislukt (niet-fataal)', err);
    }
  }

  return json({ ok: true });
};

function json(body: unknown, status = 200): Response {
  return new Response(JSON.stringify(body), { status, headers: { 'Content-Type': 'application/json' } });
}
