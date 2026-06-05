/**
 * Welkomstmail — best-effort verstuurd na een geslaagde inschrijving.
 * Inline-styled HTML zodat het overal rendert. Pas de tekst gerust aan.
 */
import { siteConfig } from '../config/site';

const SITE = siteConfig.url;

export const welcomeEmail = {
  subject: `Welkom bij ${siteConfig.name}`,
  html: () => `<!doctype html>
<html lang="nl"><body style="margin:0;background:#ffffff;">
<div style="font-family:system-ui,-apple-system,'Segoe UI',sans-serif;color:#111;max-width:560px;margin:0 auto;padding:32px 24px;line-height:1.6;">
  <h1 style="font-size:22px;margin:0 0 16px;">Welkom 👋</h1>
  <p style="font-size:15px;color:#333;margin:0 0 16px;">
    Bedankt voor je inschrijving op <strong>${siteConfig.name}</strong>. Je krijgt
    af en toe een mail met de beste AI-tools en hoe je ze inzet — geen spam, je
    schrijft je op elk moment weer uit.
  </p>
  <p style="margin:24px 0;">
    <a href="${SITE}" style="display:inline-block;padding:11px 18px;border:1px solid #111;border-radius:6px;color:#111;text-decoration:none;font-size:13px;letter-spacing:0.04em;text-transform:uppercase;">Vind je beste AI-tool</a>
  </p>
  <hr style="border:none;border-top:1px solid #eee;margin:32px 0 16px;">
  <p style="font-size:12px;color:#999;margin:0;">
    Je ontvangt deze mail omdat je je inschreef op
    <a href="${SITE}" style="color:#999;">${SITE.replace(/^https?:\/\//, '')}</a>.
    We delen je gegevens met niemand.
  </p>
</div>
</body></html>`,
  text: () =>
    `Welkom bij ${siteConfig.name}!\n\nBedankt voor je inschrijving. Je krijgt af en toe een mail met de beste AI-tools en hoe je ze inzet — geen spam, je schrijft je op elk moment weer uit.\n\nVind je beste AI-tool: ${SITE}\n`,
};
