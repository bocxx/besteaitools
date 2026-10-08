/**
 * Lichtgewicht HTML → Markdown converter voor de Accept: text/markdown
 * content-negotiation in middleware.ts.
 *
 * Geen externe dependencies — geschikt voor Cloudflare Workers edge-runtime.
 * Doel: schone, citeerbare markdown voor AI-agents, niet 100% round-trip.
 *
 * Gedeelde versie (8 okt 2026) voor hetlaatsteainieuws-v2, aiplatformmkb.nl
 * en debesteaitools.nl.ai. Wijzig je hem, kopieer hem dan ongewijzigd naar
 * de andere twee sites.
 *
 * Wat hij doet:
 *  1. Metadata (titel, canonical, beschrijving, auteur, datums) uit de <head>
 *     en de JSON-LD halen en als YAML-frontmatter bovenaan zetten.
 *  2. Alleen de <main> converteren (valt terug op <body>), zodat sitemenu,
 *     footer, zoekvenster en thema-knoppen er nooit in komen.
 *  3. Binnen <main> de ruis weghalen: navigatie, formulieren, knoppen,
 *     deel-knoppen, nieuwsbrief-blokken, de voorleesspeler. Belangrijke
 *     samenvattingen (key-takeaways) blijven staan.
 *  4. Relatieve links en afbeeldingen absoluut maken.
 */

export interface HtmlToMarkdownOptions {
  /** Volledige URL van de opgevraagde pagina; gebruikt voor absolute links. */
  url?: string;
}

/** Tags die we binnen <main> altijd weglaten (inclusief inhoud). */
const DROP_TAGS = ['nav', 'footer', 'form', 'button', 'dialog', 'select', 'textarea', 'template', 'audio', 'video', 'iframe'];

/** <aside>-blokken met deze class blijven staan: dat is echte inhoud. */
const KEEP_ASIDE_CLASS = /\b(key-takeaways|takeaways|tldr|samenvatting|callout|note|update)\b/i;

/** Elementen met deze class zijn interface, geen inhoud. */
const DROP_CLASS = /(^|[\s_-])(share|sharing|share-buttons|ias|subscribe|newsletter|nieuwsbrief|listen|author-card|back-to-top|search-modal|skip-link|breadcrumbs?|toc|related-tools-cta|cookie)($|[\s_-])/i;

export function htmlToMarkdown(html: string, options: HtmlToMarkdownOptions = {}): string {
  const meta = extractMeta(html, options.url);
  const base = meta.url || options.url;

  let md = html;

  // ── 1. Niet-content blokken (niet-genest, regex volstaat) ───────────────
  // Comments eerst: de generieke tag-strip (<[^>]+>) stopt bij de eerste '>'
  // en lekt anders de rest van een comment met een '>' erin.
  md = md.replace(/<!--[\s\S]*?-->/g, '');
  md = md.replace(/<head[\s\S]*?<\/head>/gi, '');
  md = md.replace(/<script[\s\S]*?<\/script>/gi, '');
  md = md.replace(/<style[\s\S]*?<\/style>/gi, '');
  md = md.replace(/<noscript[\s\S]*?<\/noscript>/gi, '');
  md = md.replace(/<svg[\s\S]*?<\/svg>/gi, '');

  // ── 2. Alleen de hoofdinhoud ───────────────────────────────────────────
  const mainStart = md.search(/<main\b/i);
  const mainEnd = md.toLowerCase().lastIndexOf('</main>');
  if (mainStart !== -1 && mainEnd > mainStart) {
    md = md.slice(mainStart, mainEnd + '</main>'.length);
  } else {
    const body = md.match(/<body[^>]*>([\s\S]*)<\/body>/i);
    if (body) md = body[1];
    // Zonder <main>: de site-header en -footer zitten nog in de body.
    md = dropElements(md, (tag, attrs) =>
      (tag === 'header' && /site-header|\bheader\b/i.test(classOf(attrs))) || tag === 'footer');
  }

  // ── 2b. Codeblokken veiligstellen ──────────────────────────────────────
  // Syntax-highlighting (Shiki) zet elke regel in eigen <span>s. Die blokken
  // halen we er vóór alle andere bewerkingen uit, zodat inspringing,
  // regeleinden en tekens als " · " de code niet aantasten.
  const codeBlocks: string[] = [];
  md = md.replace(/<pre\b([^>]*)>([\s\S]*?)<\/pre>/gi, (_, preAttrs, inner) => {
    const codeTag = inner.match(/<code\b[^>]*>/i)?.[0] ?? '';
    const lang = (`${preAttrs} ${codeTag}`.match(/(?:language-|data-language=")([a-z0-9+#-]+)/i)?.[1] ?? '').toLowerCase();
    const body = decodeEntities(strip(inner.replace(/<\/span>\s*\n?\s*<span class="line/gi, '</span>\n<span class="line')))
      .replace(/^\n+|\s+$/g, '');
    codeBlocks.push(`\`\`\`${lang === 'plaintext' ? '' : lang}\n${body}\n\`\`\``);
    return `\n\n\u0000CODE${codeBlocks.length - 1}\u0000\n\n`;
  });

  // ── 3. Ruis binnen de hoofdinhoud (genest-veilig) ──────────────────────
  // Visuele scheidingstekens (aria-hidden "·") eerst omzetten, anders vallen
  // ze weg met de rest van de aria-hidden-elementen en plakken labels aan elkaar.
  md = md.replace(/<span\b[^>]*aria-hidden="true"[^>]*>\s*[·•|\/–—-]\s*<\/span>/gi, ' · ');
  md = dropElements(md, (tag, attrs) => {
    if (DROP_TAGS.includes(tag)) return true;
    const cls = classOf(attrs);
    if (tag === 'aside') return !KEEP_ASIDE_CLASS.test(cls);
    if (/\baria-hidden="true"/i.test(attrs)) return true;
    if (/\shidden(\s|=|$)/i.test(attrs)) return true;
    return cls !== '' && DROP_CLASS.test(cls);
  });
  md = md.replace(/<(input|source|track|embed)\b[^>]*>/gi, '');
  // Naast elkaar staande labels (rubriek, datum, leestijd, bron-domein) los
  // houden: "fd.nl · Het Financieele Dagblad · 3 jun 2026" i.p.v. aan elkaar.
  const INLINE = 'span|time|small|cite|abbr|a|data';
  md = md.replace(new RegExp(`</(${INLINE})>\\s*<(${INLINE})\\b`, 'gi'), '</$1> · <$2');

  // ── 4. Koppen ──────────────────────────────────────────────────────────
  for (let level = 1; level <= 6; level++) {
    const re = new RegExp(`<h${level}[^>]*>([\\s\\S]*?)<\\/h${level}>`, 'gi');
    md = md.replace(re, (_, t) => `\n\n${'#'.repeat(level)} ${oneLine(strip(t))}\n\n`);
  }

  // ── 5. Inline code (codeblokken staan al veilig, zie 2b) ───────────────
  md = md.replace(/<code[^>]*>([\s\S]*?)<\/code>/gi, (_, c) => `\`${decodeEntities(strip(c))}\``);

  // ── 6. Inline opmaak ───────────────────────────────────────────────────
  md = md.replace(/<(strong|b)(\s[^>]*)?>([\s\S]*?)<\/\1>/gi,
    (m, _t, _a, t, offset, all) => wrapInline(t, '**', nextChar(all, offset + m.length)));
  md = md.replace(/<(em|i)(\s[^>]*)?>([\s\S]*?)<\/\1>/gi,
    (m, _t, _a, t, offset, all) => wrapInline(t, '*', nextChar(all, offset + m.length)));

  // ── 7. Afbeeldingen (vóór links, zodat een link om een plaatje werkt) ──
  md = md.replace(/<img\s[^>]*>/gi, (tag) => {
    const src = attr(tag, 'src');
    if (!src || src.startsWith('data:')) return '';
    return `![${attr(tag, 'alt') ?? ''}](${absolute(src, base)})`;
  });

  // ── 8. Links ───────────────────────────────────────────────────────────
  md = md.replace(/<a\s([^>]*)>([\s\S]*?)<\/a>/gi, (_, attrs, inner) => {
    const href = attr(`<a ${attrs}>`, 'href');
    // Een "kaart" is een link om een blok heen (kop, alinea, div): die krijgt
    // een eigen lijstregel, zonder decoratieve plaatjes (logo's, favicons).
    const isCard = /<(div|p|li)\b|(^|\n)#{1,6} /i.test(inner);
    let text = inner;
    if (isCard) text = text.replace(/!\[[^\]]*\]\([^)]*\)/g, ' ');
    text = text.replace(/<\/(div|p|li|figcaption|span|small|time)>/gi, ' ');
    // Koppen binnen een kaart-link platslaan: "[Rubriek · datum · Titel](url)".
    text = oneLine(strip(text).replace(/(^|\n)#{1,6}\s*/g, ' · ')).replace(/^·\s*/, '');
    if (!href || href.startsWith('#') || href.startsWith('javascript:')) return text;
    if (!text) return '';
    const link = `[${text}](${absolute(href, base)})`;
    return isCard ? `\n- ${link}\n` : link;
  });

  // ── 9. Tabellen: echte Markdown-tabel, eerste rij als kop ─────────────
  md = md.replace(/<table\b[^>]*>([\s\S]*?)<\/table>/gi, (_, inner) => {
    const rows = [...inner.matchAll(/<tr\b[^>]*>([\s\S]*?)<\/tr>/gi)].map((r) =>
      [...r[1].matchAll(/<t[hd]\b[^>]*>([\s\S]*?)<\/t[hd]>/gi)].map((c) =>
        oneLine(strip(c[1].replace(/<br\s*\/?>/gi, ' '))).replace(/\|/g, '\\|')));
    const width = Math.max(0, ...rows.map((r) => r.length));
    if (!width) return '';
    const line = (cells: string[]) => `| ${Array.from({ length: width }, (_, i) => cells[i] ?? '').join(' | ')} |`;
    const [head, ...body] = rows;
    return `\n\n${[line(head), line(Array(width).fill('---')), ...body.map(line)].join('\n')}\n\n`;
  });

  // ── 10. Lijsten ────────────────────────────────────────────────────────
  md = md.replace(/<li[^>]*>([\s\S]*?)<\/li>/gi, (_, t) => {
    const item = oneLine(strip(t));
    return item ? `\n- ${item}` : '';
  });
  md = md.replace(/<\/?[ou]l[^>]*>/gi, '\n');
  md = md.replace(/<dt[^>]*>([\s\S]*?)<\/dt>/gi, (_, t) => `\n\n**${oneLine(strip(t))}**\n`);
  md = md.replace(/<dd[^>]*>([\s\S]*?)<\/dd>/gi, (_, t) => `${oneLine(strip(t))}\n`);

  // ── 11. Paragrafen, citaten, regeleinden ───────────────────────────────
  md = md.replace(/<br\s*\/?>/gi, '\n');
  md = md.replace(/<p[^>]*>([\s\S]*?)<\/p>/gi, (_, t) => `\n\n${strip(t).trim()}\n\n`);
  md = md.replace(/<\/(div|section|article|header|figure|figcaption|details|summary)>/gi, '\n');
  md = md.replace(/<blockquote[^>]*>([\s\S]*?)<\/blockquote>/gi, (_, t) =>
    '\n\n' + strip(t).trim().split('\n').filter((l) => l.trim()).map((l) => `> ${l.trim()}`).join('\n>\n') + '\n\n');
  md = md.replace(/<hr\s*\/?>/gi, '\n\n---\n\n');

  // ── 12. Overige tags strippen + entities ───────────────────────────────
  md = md.replace(/<[^>]+>/g, '');
  md = decodeEntities(md);

  // ── 13. Opschonen ──────────────────────────────────────────────────────
  md = md
    .split('\n')
    .map((l) => l.replace(/[ \t]+$/g, '').replace(/^[ \t]+(?![-*>|])/g, ''))
    // Losse lijst-tekens, scheidingstekens en lege tabelrijen weg.
    .map((l) => l
      .replace(/(\S) {2,}(?=\S)/g, '$1 ')
      .replace(/(\s*·\s*){2,}/g, ' · ')
      .replace(/^(\s*(?:- )?)·\s*/, '$1')
      .replace(/\s*·\s*$/, '')
      .replace(/\b(door|by) · /i, '$1 '))
    // Losse lijst-tekens, scheidingstekens en lege tabelrijen weg.
    .filter((l) => !/^\s*(-|\/|·|\|\s*)\s*$/.test(l))
    .join('\n');
  md = md.replace(/\n{3,}/g, '\n\n');
  // Opeenvolgende lijstitems zonder lege regel ertussen.
  md = md.replace(/^(- .*)\n\n(?=- )/gm, '$1\n').replace(/^(- .*)\n\n(?=- )/gm, '$1\n');
  md = md.replace(/\u0000CODE(\d+)\u0000/g, (_, i) => codeBlocks[Number(i)]).trim();

  const front = frontmatter(meta);
  return front ? `${front}\n\n${md}\n` : `${md}\n`;
}

// ── Metadata ────────────────────────────────────────────────────────────

interface PageMeta {
  title?: string;
  url?: string;
  description?: string;
  author?: string;
  published?: string;
  modified?: string;
  language?: string;
}

function extractMeta(html: string, requestUrl?: string): PageMeta {
  const head = html.match(/<head[^>]*>([\s\S]*?)<\/head>/i)?.[1] ?? '';
  const metaTag = (key: string) => {
    const re = new RegExp(`<meta\\s[^>]*(?:property|name)="${key}"[^>]*>`, 'i');
    const tag = head.match(re)?.[0];
    return tag ? decodeEntities(attr(tag, 'content') ?? '') || undefined : undefined;
  };
  const canonicalTag = head.match(/<link\s[^>]*rel="canonical"[^>]*>/i)?.[0];
  const meta: PageMeta = {
    title: metaTag('og:title') ?? (decodeEntities(head.match(/<title[^>]*>([\s\S]*?)<\/title>/i)?.[1]?.trim() ?? '') || undefined),
    url: (canonicalTag && attr(canonicalTag, 'href')) || metaTag('og:url') || requestUrl,
    description: metaTag('description') ?? metaTag('og:description'),
    published: metaTag('article:published_time'),
    modified: metaTag('article:modified_time'),
    language: html.match(/<html[^>]*\slang="([^"]+)"/i)?.[1],
  };

  // JSON-LD: auteur en datums van het artikel.
  const blocks = html.match(/<script[^>]*application\/ld\+json[^>]*>[\s\S]*?<\/script>/gi) ?? [];
  for (const block of blocks) {
    let data: unknown;
    try {
      data = JSON.parse(block.replace(/^<script[^>]*>/i, '').replace(/<\/script>$/i, ''));
    } catch {
      continue;
    }
    const items = Array.isArray(data) ? data : (data as { '@graph'?: unknown[] })['@graph'] ?? [data];
    for (const item of items as Record<string, unknown>[]) {
      const type = String(item?.['@type'] ?? '');
      if (!/Article|BlogPosting|Review|HowTo|TechArticle/.test(type)) continue;
      const authors = ([] as unknown[]).concat(item.author ?? []);
      const names = authors
        .map((a) => (typeof a === 'string' ? a : (a as { name?: string })?.name))
        .filter(Boolean);
      if (names.length && !meta.author) meta.author = names.join(', ');
      if (!meta.published && typeof item.datePublished === 'string') meta.published = item.datePublished;
      if (!meta.modified && typeof item.dateModified === 'string') meta.modified = item.dateModified;
      // De headline is de schone titel, zonder " | sitenaam"-achtervoegsel.
      if (typeof item.headline === 'string' && item.headline.trim()) meta.title = item.headline;
    }
  }
  // " | sitenaam" achter de titel weglaten: de url zegt al welke site het is.
  if (meta.title) meta.title = meta.title.replace(/\s+\|\s+[^|]{2,40}$/, '').trim() || meta.title;
  return meta;
}

function frontmatter(meta: PageMeta): string {
  const rows: [string, string | undefined][] = [
    ['title', meta.title],
    ['url', meta.url],
    ['description', meta.description],
    ['author', meta.author],
    ['published', meta.published],
    ['updated', meta.modified],
    ['language', meta.language],
  ];
  const lines = rows
    .filter(([, v]) => v && v.trim())
    .map(([k, v]) => `${k}: ${JSON.stringify(oneLine(v as string))}`);
  return lines.length ? `---\n${lines.join('\n')}\n---` : '';
}

// ── Helpers ─────────────────────────────────────────────────────────────

/**
 * Verwijdert elementen (inclusief inhoud) waarvoor `shouldDrop` true geeft.
 * Telt de nesting per tagnaam, zodat een <div> in een <div> niet halverwege
 * wordt afgekapt zoals bij een non-greedy regex.
 */
function dropElements(html: string, shouldDrop: (tag: string, attrs: string) => boolean): string {
  const open = /<([a-z][a-z0-9-]*)(\s[^>]*)?>/gi;
  let out = '';
  let cursor = 0;
  let m: RegExpExecArray | null;
  while ((m = open.exec(html))) {
    const tag = m[1].toLowerCase();
    const attrs = m[2] ?? '';
    if (m[0].endsWith('/>') || !shouldDrop(tag, attrs)) continue;
    // Zoek de bijbehorende sluittag, rekening houdend met nesting.
    const scan = new RegExp(`<(/?)${tag}(?=[\\s>/])[^>]*>`, 'gi');
    scan.lastIndex = open.lastIndex;
    let depth = 1;
    let end = -1;
    let s: RegExpExecArray | null;
    while ((s = scan.exec(html))) {
      if (s[1]) depth--;
      else if (!s[0].endsWith('/>')) depth++;
      if (depth === 0) {
        end = scan.lastIndex;
        break;
      }
    }
    if (end === -1) continue; // geen sluittag: laat staan
    out += html.slice(cursor, m.index);
    cursor = end;
    open.lastIndex = end;
  }
  return out + html.slice(cursor);
}

function classOf(attrs: string): string {
  return attrs.match(/\sclass="([^"]*)"/i)?.[1] ?? '';
}

function attr(tag: string, name: string): string | undefined {
  const m = tag.match(new RegExp(`\\s${name}="([^"]*)"`, 'i')) ?? tag.match(new RegExp(`\\s${name}='([^']*)'`, 'i'));
  return m ? m[1] : undefined;
}

function absolute(href: string, base?: string): string {
  const clean = decodeEntities(href);
  if (!base || /^[a-z][a-z0-9+.-]*:/i.test(clean)) return clean;
  try {
    return new URL(clean, base).href;
  } catch {
    return clean;
  }
}

function wrapInline(inner: string, mark: string, next?: string): string {
  const t = strip(inner);
  if (!t.trim()) return t;
  // "**Update**Tekst" → "**Update** Tekst": spaties buiten de markering houden.
  const lead = t.match(/^\s*/)?.[0] ?? '';
  const trail = t.match(/\s*$/)?.[0] ?? '';
  // Alleen een spatie toevoegen als er direct een woord op volgt.
  const gap = trail || (next && /[\p{L}\p{N}]/u.test(next) ? ' ' : '');
  return `${lead}${mark}${t.trim()}${mark}${gap}`;
}

/** Eerste zichtbare teken na `index`, tags overgeslagen. */
function nextChar(all: string, index: number): string | undefined {
  return all.slice(index, index + 400).replace(/^(\s*<[^>]+>)+/, '')[0];
}

function oneLine(s: string): string {
  return s.replace(/\s+/g, ' ').trim();
}

/** Strip alle HTML-tags uit een string (voor inline gebruik). */
function strip(s: string): string {
  return s.replace(/<[^>]+>/g, '');
}

/** Decodeer de meest voorkomende HTML entities. */
function decodeEntities(s: string): string {
  return s
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
    .replace(/&quot;/g, '"')
    .replace(/&#39;|&#x27;|&apos;/g, "'")
    .replace(/&nbsp;/g, ' ')
    .replace(/&mdash;/g, '—')
    .replace(/&ndash;/g, '–')
    .replace(/&hellip;/g, '…')
    .replace(/&euro;/g, '€')
    .replace(/&#x([0-9a-f]+);/gi, (_, n) => String.fromCodePoint(parseInt(n, 16)))
    .replace(/&#(\d+);/g, (_, n) => String.fromCodePoint(Number(n)))
    .replace(/&amp;/g, '&');
}
