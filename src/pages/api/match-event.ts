/**
 * /api/match-event — admin usage notifier for the matching wizard
 *
 * The /match wizard runs entirely client-side, so without this endpoint
 * there is no server-side signal that anyone ever used it. The match
 * page fires one fire-and-forget POST here per browser session when a
 * match completes.
 *
 * Behaviour:
 *   - If the `ADMIN_NOTIFY_WEBHOOK` secret is set, a short notification
 *     is delivered to it (ntfy.sh, Discord or Slack incoming webhook).
 *   - If it is not set, the endpoint is a silent no-op (204) — exactly
 *     like the LLM endpoints degrade gracefully without an API key.
 *
 * Privacy: the /match page promises visitors "je antwoorden blijven op
 * je apparaat". So the payload here carries NO profile data — only
 * whether a match happened and the coarse result shape (count + top
 * score). Both numbers are integer-coerced, so nothing user-controlled
 * is ever reflected into the notification text.
 *
 * Set the secret with:  wrangler secret put ADMIN_NOTIFY_WEBHOOK
 */

import type { APIRoute } from 'astro';
import { env } from 'cloudflare:workers';

export const prerender = false;

const SITE = 'https://debesteaitools.nl';

/** Coerce an unknown value to a non-negative integer, or null. */
function toInt(value: unknown): number | null {
  const n = typeof value === 'number' ? value : Number(value);
  return Number.isFinite(n) && n >= 0 ? Math.trunc(n) : null;
}

/**
 * Soft same-origin guard: reject only requests whose Origin/Referer is
 * clearly foreign. Absent headers are allowed (some clients omit them);
 * dev and Cloudflare preview hosts stay allowed.
 */
function looksForeign(request: Request): boolean {
  const source = request.headers.get('origin') || request.headers.get('referer') || '';
  if (!source) return false;
  return !/(?:debesteaitools\.nl|localhost|127\.0\.0\.1|\.workers\.dev)/i.test(source);
}

/** Deliver to ntfy (plain text) or Discord/Slack (JSON) — best-effort. */
async function deliver(webhook: string, message: string): Promise<void> {
  const isNtfy = /(?:^|\/\/|\.)ntfy\./i.test(webhook);
  if (isNtfy) {
    await fetch(webhook, {
      method: 'POST',
      headers: {
        'Content-Type': 'text/plain; charset=utf-8',
        Title: 'Match-tool gebruikt',
        Tags: 'dart',
      },
      body: message,
    });
    return;
  }
  // Discord reads `content`, Slack reads `text` — send both, harmless overlap.
  await fetch(webhook, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ content: message, text: message }),
  });
}

export const POST: APIRoute = async ({ request }) => {
  if (looksForeign(request)) {
    return new Response(null, { status: 403 });
  }

  let body: Record<string, unknown> = {};
  try {
    body = (await request.json()) as Record<string, unknown>;
  } catch {
    /* empty / invalid body is fine — treated as a bare usage ping */
  }

  const webhook = (env as Record<string, string | undefined>)?.ADMIN_NOTIFY_WEBHOOK;
  // Notifier not configured — accept silently so the visitor never sees an error.
  if (!webhook || webhook.length < 12) {
    return new Response(null, { status: 204 });
  }

  const resultCount = toInt(body.resultCount);
  const topScore = toInt(body.topScore);

  const detail = [
    resultCount !== null ? `${resultCount} resultaten` : null,
    topScore !== null ? `top-score ${topScore}` : null,
  ]
    .filter(Boolean)
    .join(', ');
  const message =
    `🎯 ${SITE.replace('https://', '')} — iemand heeft zojuist de match-tool gebruikt` +
    (detail ? ` (${detail}).` : '.');

  try {
    await deliver(webhook, message);
  } catch {
    /* a failed notification must never break the visitor's request */
  }

  return new Response(null, { status: 204 });
};
