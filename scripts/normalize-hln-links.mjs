#!/usr/bin/env node
// Normaliseer HLN-links in de DBAT-content: één canonieke vorm per URL.
//
// Spiegelt src/lib/migration-redirects.ts uit hetlaatsteainieuws-v2 (exact- +
// prefix-redirects), zodat de link-target hier gelijk is aan waar HLN de bezoeker
// tóch naartoe zou redirecten. Bijkomend: naakt domein → www, en trailing slash
// verwijderen (HLN-sitemap/canonical gebruiken de no-slash-vorm).
//
// Gebruik:
//   node scripts/normalize-hln-links.mjs           # dry-run, print samenvatting
//   node scripts/normalize-hln-links.mjs --apply   # schrijf de wijzigingen
//   node scripts/normalize-hln-links.mjs --verbose # per-URL diff-lijst

import { readdirSync, readFileSync, writeFileSync, statSync } from 'node:fs';
import { join, relative } from 'node:path';

const ROOT = new URL('..', import.meta.url).pathname;
const APPLY = process.argv.includes('--apply');
const VERBOSE = process.argv.includes('--verbose');

// ── Redirect-tabellen — 1:1 kopie uit hetlaatsteainieuws-v2/src/lib/migration-redirects.ts.
//    Bij wijziging dáár, ook hier aanpassen (kopie is bewust: cross-repo import kan niet).
const AIPLATFORM = 'https://www.aiplatformmkb.nl';
const HLN = 'https://www.hetlaatsteainieuws.nl';

const categoryPrefixRedirects = {
  '/ai-nieuws':     '/nieuws',
  '/ai-tutorials':  `${AIPLATFORM}/gidsen`,
  '/ai-tools':      `${AIPLATFORM}/tools`,
  '/tutorials':     `${AIPLATFORM}/gidsen`,
  '/tools':         `${AIPLATFORM}/tools`,
  '/ai-innovatie':  '/achtergrond',
  '/ai-deep-dives': '/achtergrond',
  '/ai-ethiek':     '/regelgeving',
  '/ai-beleid':     '/regelgeving',
  '/digest':        '/radar',
  '/trends':        '/tag/trends',
  '/strategie':     '/tag/strategie',
  '/start':         '/tag/nieuw-met-ai',
};

const exactRedirects = {
  '/nieuws/openai-beursgang-niet-2026-veiligheid': '/nieuws/wanneer-gaat-openai-naar-de-beurs',
  '/redactie':                 '/over',
  '/auteurs':                  '/over',
  '/ai-routekaart':            `${AIPLATFORM}/gidsen`,
  '/ai-woordenboek':           '/begrippen',
  '/ai-toepassingen':          `${AIPLATFORM}/tools`,
  '/ai-tools-technieken':      `${AIPLATFORM}/tools`,
  '/ai-beleid-strategie':      '/regelgeving',
  '/nieuws/claude-skills-uitgelegd-plugins-marketplace': `${AIPLATFORM}/tools/claude-skills-uitgelegd-plugins-marketplace`,
  '/nieuws/n8n-claude-workflow-automatisering-casestudy': `${AIPLATFORM}/gidsen/n8n-claude-workflow-automatisering-casestudy`,
  '/ai-tools/wat-is-een-npu-en-waarom-in-elke-ai-laptop': '/nieuws/wat-is-een-npu-en-waarom-in-elke-ai-laptop',
  '/ai-tutorials/ai-hallucinations-herkennen':            '/regelgeving/ai-hallucinaties-wetenschappelijke-literatuur',
  '/tutorials/goede-prompts-schrijven-voor-ai':    '/achtergrond/goede-prompts-schrijven-voor-ai',
  '/ai-tutorials/goede-prompts-schrijven-voor-ai': '/achtergrond/goede-prompts-schrijven-voor-ai',
  '/nieuwsbrief/aanmelden':    '/nieuwsbrief',
  '/nieuwsbrief/bedankt':      '/nieuwsbrief',
  '/nieuws/claude-geld-verdienen-realistisch': '/nieuws/geld-verdienen-claude-ai-realistisch',
  '/nieuws/gpt-nl-nederlands-taalmodel-uitrol': '/nieuws/gpt-nl-klaar-voor-gebruik-eerste-klanten',
  '/achtergrond/ai-terugblik-juni-2026': '/achtergrond/maandterugblik-juni-2026',
};

function resolveRedirect(pathname) {
  const clean = (pathname.replace(/\/+$/, '') || '/').toLowerCase();
  if (exactRedirects[clean]) return exactRedirects[clean];
  for (const [prefix, target] of Object.entries(categoryPrefixRedirects)) {
    if (clean === prefix) return target;
    if (clean.startsWith(prefix + '/')) {
      return target + clean.slice(prefix.length);
    }
  }
  return null;
}

// Bouw de canonieke URL voor een link naar HLN. Geeft één vorm terug, ongeacht
// invoer: absoluut vs. relatief, www vs. naakt, met/zonder trailing slash.
function canonicalize(originalUrl) {
  let u;
  try { u = new URL(originalUrl); } catch { return null; }
  if (!/(^|\.)hetlaatsteainieuws\.nl$/.test(u.hostname)) return null;

  const redirectTarget = resolveRedirect(u.pathname);
  let targetBase;
  let targetPath;
  if (redirectTarget && /^https?:\/\//.test(redirectTarget)) {
    // Cross-domain (bv. naar aiplatformmkb).
    const t = new URL(redirectTarget);
    targetBase = `${t.protocol}//${t.hostname}`;
    targetPath = t.pathname;
  } else if (redirectTarget) {
    targetBase = HLN;
    targetPath = redirectTarget;
  } else {
    targetBase = HLN;
    targetPath = u.pathname.toLowerCase();
  }
  // Trailing slash strippen behalve op de root — spiegelt HLN-sitemap/canonical.
  if (targetPath !== '/' && targetPath.endsWith('/')) {
    targetPath = targetPath.replace(/\/+$/, '') || '/';
  }
  return targetBase + targetPath + u.search + u.hash;
}

// Walk repo voor tekstbestanden; sla generated content en worktrees over.
const SKIP_DIRS = new Set([
  'node_modules', '.git', 'dist', '.astro', '.wrangler', '.next', '__pycache__',
  '.claude',  // worktrees hebben eigen branches — fix daar bij merge, niet hier
]);
const TEXT_EXT = /\.(md|mdx|astro|ts|tsx|js|mjs|cjs|json|yml|yaml|txt|html)$/i;

// Bestanden die door newsflux/pipelines herbouwd worden — fix aan de bron, niet hier.
const GENERATED_FILES = new Set([
  'scripts/normalize-hln-links.mjs',  // dit script zelf (bevat constanten)
  'src/data/news_tool_index.json',
  'src/data/nl_ai_adoptie.json',
  'src/data/hln_tutorials.json',
  'src/data/makers.json',
  'src/data/rankmyai_movers.json',
  'src/data/tool_breakthrough.json',
  'src/data/trending_models.json',
  'src/data/reports/tool_feature_news.json',
  'src/data/reports/ai_tools_radar.json',
  'src/data/reports/launch_radar.json',
]);

function* walk(dir) {
  for (const name of readdirSync(dir)) {
    if (SKIP_DIRS.has(name)) continue;
    const full = join(dir, name);
    const st = statSync(full);
    if (st.isDirectory()) yield* walk(full);
    else if (st.isFile() && TEXT_EXT.test(name)) {
      if (GENERATED_FILES.has(relative(ROOT, full))) continue;
      yield full;
    }
  }
}

// Match iedere HLN-URL — inclusief markdown-parens en trailing punctuatie.
const HLN_URL_RE = /https?:\/\/(?:www\.)?hetlaatsteainieuws\.nl[^\s"'<>)\]}`]*/g;

const stats = {
  filesScanned: 0,
  filesChanged: 0,
  urlsSeen: 0,
  urlsChanged: 0,
  byPrefix: {},
  changesByFile: [],
};

for (const file of walk(ROOT)) {
  stats.filesScanned++;
  const rel = relative(ROOT, file);
  const original = readFileSync(file, 'utf8');
  if (!HLN_URL_RE.test(original)) continue;
  HLN_URL_RE.lastIndex = 0;

  const perFile = [];
  const updated = original.replace(HLN_URL_RE, (raw) => {
    // Trim trailing markdown-/zin-leestekens die niet bij de URL horen.
    let url = raw;
    let tail = '';
    while (/[.,;:!?)]$/.test(url)) { tail = url.slice(-1) + tail; url = url.slice(0, -1); }
    stats.urlsSeen++;

    const canon = canonicalize(url);
    if (!canon) return raw;
    if (canon === url) return raw;

    stats.urlsChanged++;
    const firstSeg = url.replace(/^https?:\/\/(?:www\.)?hetlaatsteainieuws\.nl/, '').split(/[/?#]/)[1] ?? '';
    const bucket = firstSeg ? `/${firstSeg}/` : '(root)';
    stats.byPrefix[bucket] = (stats.byPrefix[bucket] ?? 0) + 1;
    perFile.push({ from: url, to: canon });
    return canon + tail;
  });

  if (updated !== original) {
    stats.filesChanged++;
    stats.changesByFile.push({ file: rel, count: perFile.length, samples: perFile });
    if (APPLY) writeFileSync(file, updated);
  }
}

// ── Rapport ──────────────────────────────────────────────────────────────────
const mode = APPLY ? 'APPLIED' : 'DRY-RUN';
console.log(`\n[${mode}] scanned ${stats.filesScanned} files, changed ${stats.filesChanged} files`);
console.log(`URLs seen: ${stats.urlsSeen}   URLs changed: ${stats.urlsChanged}\n`);

console.log('Per bron-prefix:');
Object.entries(stats.byPrefix).sort(([, a], [, b]) => b - a).forEach(([p, n]) => {
  console.log(`  ${String(n).padStart(4)}  ${p}`);
});

if (VERBOSE) {
  console.log('\nPer bestand (eerste 3 voorbeelden):');
  for (const f of stats.changesByFile) {
    console.log(`\n  ${f.file}  (${f.count} URLs)`);
    for (const c of f.samples.slice(0, 3)) {
      console.log(`    - ${c.from}`);
      console.log(`      → ${c.to}`);
    }
  }
} else {
  console.log('\nTop-10 bestanden met wijzigingen:');
  stats.changesByFile.sort((a, b) => b.count - a.count).slice(0, 10).forEach((f) => {
    console.log(`  ${String(f.count).padStart(4)}  ${f.file}`);
  });
  console.log('\n(Draai met --verbose voor per-URL diff, --apply om te schrijven.)');
}
