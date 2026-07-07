#!/usr/bin/env python3
"""
generate-diorama.py — Diorama hero-image generator voor v2.

Self-contained variant van newsflux/src/generate_article_images.py voor
hetlaatsteainieuws-v2. Genereert hero-images via Leonardo Phoenix 1.0 in
TWEE stijlen, gekozen op artikel-categorie (besluit redactie 10 juni 2026,
zie docs/workflow/HEROSCENE.md):

  - diorama (BRAND_CORE): miniatuur-fotografie in natuurlijke omgevingen —
    voor de trage stukken: ai-deep-dives, ai-innovatie, ai-ethiek, ai-beleid.
  - miniatuur op kleurvlak (FLAT_CORE): dezelfde diorama-taal in een
    kleurvlakken-studio — voor ai-nieuws, ai-tutorials, ai-tools.

Elke stijl heeft een vaste merk-kern plus compositie-assen die
deterministisch per slug roteren. Zo delen hero-images binnen een stijl
dezelfde herkenbare look, maar krijgen ze zichtbaar andere composities.

Werkt op v2 markdown in src/content/nieuws/, output naar
public/images/articles/diorama-<slug>.webp.

Vereist:
    pip install requests Pillow
    export LEONARDO_API_KEY=xxxxxx

Gebruik:
    python scripts/generate-diorama.py --all
    python scripts/generate-diorama.py --slug ai-voor-mkb-2026-5-kansen
    python scripts/generate-diorama.py --all --force
    python scripts/generate-diorama.py --all --dry-run
"""

from __future__ import annotations

import argparse
import hashlib
import json
import os
import re
import shutil
import subprocess
import sys
import time
from pathlib import Path
from typing import Optional

# `requests` wordt lazy geïmporteerd in de API-functies — zo werkt
# --dry-run (en --help) zonder dat de dependency geïnstalleerd is.

# ── Paden ──────────────────────────────────────────────────────────────────

SCRIPT_DIR  = Path(__file__).resolve().parent
ROOT        = SCRIPT_DIR.parent
CONTENT_DIR = ROOT / "src" / "content" / "nieuws"
IMAGES_DIR  = ROOT / "public" / "images" / "articles"
LOG_PATH    = ROOT / "data" / "diorama-generation-log.json"

# ── Leonardo Phoenix 1.0 ────────────────────────────────────────────────────

LEONARDO_BASE  = "https://cloud.leonardo.ai/api/rest/v1"
PHOENIX_MODEL  = "de7d3faf-762f-48e0-b3b7-9d0ac3a3fcf3"
IMAGE_WIDTH    = 1216  # ≥1200px breed: vereist voor Google Discover's grote preview-kaart
IMAGE_HEIGHT   = 752   # multiple of 8; behoudt ~1.62-ratio (was 1024×632)
# OPTIMIZE_WIDTH = native breedte → géén downscale, alleen jpg→webp-compressie.
# (Was 1024: te smal voor Google Discover, dat ≥1200px breed wil voor de grote kaart.)
OPTIMIZE_WIDTH    = 1216
OPTIMIZE_QUALITY  = 82

# ── Style: merk-kern + variabele compositie-assen ──────────────────────────
# De oude DIORAMA_STYLE zette licht (golden hour), palet, camera (top-down)
# én sfeer tegelijk vast → monocultuur: 8/32 images deelden vrijwel dezelfde
# "zwevend eiland"/"straat met vluchtpunt"-compositie. Nu: één vaste merk-kern
# (textuur, palet, lens) + drie assen die deterministisch per slug roteren.

# Vast — identiek bij elke render. Earth-tones + teal/amber blijft het merk-
# anker; variatie komt nadrukkelijk uit licht/camera/schaal, niet uit kleur.
# "no people" is bewust toegevoegd: voorheen stond er alleen "no faces",
# waardoor er telkens een figuurtje opdook.
BRAND_CORE = (
    "miniature diorama photography, tilt-shift lens effect, hand-crafted "
    "miniatures with paper, wood and clay textures, muted earth-tones with "
    "subtle teal and amber accents, shallow depth of field, soft bokeh, "
    "retro analog feel, no text, no words, no letters, no people, "
    "no faces"
)

# As 1 — tijd van dag (licht). Roteert op seed % 4.
# Donker domineert bewust (3 van 4): redactie-voorkeur 10 juni 2026 — de
# nachtelijke/blue-hour-varianten met gloed en bokeh zijn de beelden die
# het merk dragen. "bright midday" is vervangen door een warme bokeh-nacht.
TIME_OPTS = (
    "golden hour warm sunset light",
    "nocturnal scene with warm glowing bokeh lights in the dark background",
    "blue hour twilight cool light",
    "nocturnal neon-lit scene",
)

# As 2 — perspectief (camera). Roteert op (seed // 4) % 3.
POV_OPTS = (
    "top-down 3/4 view",
    "street-level eye view",
    "macro close-up shot",
)

# As 3 — schaal/compositie. Roteert op (seed // 12) % 4.
SCALE_OPTS = (
    "single hero object isolated on neutral surface",
    "intimate room interior cross-section",
    "street scene with vanishing point",
    "panoramic landscape miniature",
)

# As 4 — ondergrond / tafelblad. Roteert op (seed // 48) % 5.
# Geeft 4×3×4×5 = 240 unieke compositie-combinaties (was 48).
SURFACE_OPTS = (
    "on a worn oak workbench",
    "on a cool slate stone slab",
    "on a weathered cork board",
    "on a deep green velvet cloth",
    "on a pale birch plywood surface",
)


def composition_for(seed: int) -> tuple[str, str, str, str]:
    """Deterministische (tijd, perspectief, schaal, ondergrond) voor een per-slug seed."""
    tod     = TIME_OPTS[seed % 4]
    pov     = POV_OPTS[(seed // 4) % 3]
    scale   = SCALE_OPTS[(seed // 12) % 4]
    surface = SURFACE_OPTS[(seed // 48) % 5]
    return tod, pov, scale, surface


# ── Stijl 2: miniatuur op kleurvlak (sinds 10 juni 2026) ────────────────────
# Hybride voor de hoge-frequentie categorieën: dezelfde fotografische
# diorama-taal (materialen, tilt-shift) als BRAND_CORE, maar in een
# kleurvlakken-studio in plaats van een natuurlijke omgeving. Breekt het
# "diorama-behang" in het grid, terwijl nieuwe beelden naadloos naast de
# bestaande hero's passen (zelfde robotjes, zelfde materialen). Gekozen op
# proefbeelden boven flat-illustratie en papercraft.

FLAT_CORE = (
    "miniature diorama photography, tilt-shift lens effect, hand-crafted "
    "miniatures with paper, wood and clay textures, set against a bold flat "
    "colour-block studio backdrop, soft directional shadows, shallow depth "
    "of field, no text, no words, no letters, no people, no faces"
)

# As 1 — kleurveld-combinatie. Roteert op seed % 4.
LAYOUT_OPTS = (
    "saturated teal and warm amber colour fields",
    "deep teal and warm terracotta colour fields",
    "warm amber and soft cream colour fields",
    "muted earth-brown and bright teal colour fields",
)

# As 2 — camera. Roteert op (seed // 4) % 3. Geeft 4×3 = 12 combinaties.
BACKDROP_OPTS = (
    "eye-level straight-on composition",
    "three-quarter angled composition",
    "slightly elevated viewpoint",
)

# Categorie → stijl. Niet gemapte categorieën (en ontbrekende frontmatter)
# vallen terug op diorama — de oorspronkelijke huisstijl.
FLAT_CATEGORIES = {"ai-nieuws", "ai-tutorials", "ai-tools"}


def style_for(category: str) -> str:
    return "flat" if (category or "").strip() in FLAT_CATEGORIES else "diorama"


def flat_composition_for(seed: int) -> tuple[str, str]:
    layout   = LAYOUT_OPTS[seed % 4]
    backdrop = BACKDROP_OPTS[(seed // 4) % 3]
    return layout, backdrop

# ── Frontmatter helpers ────────────────────────────────────────────────────

def parse_field(text: str, field: str) -> Optional[str]:
    # Niet parsen met een character-class die beide quote-soorten uitsluit:
    # dan kapt een titel met een apostrof ("Nvidia's ...") af op die apostrof
    # (bug gefixt 7 jul 2026). Strip alleen echte omsluitende quotes.
    m = re.search(rf'^{field}:[ \t]*(.+)$', text, re.MULTILINE)
    if not m:
        return None
    raw = m.group(1).strip()
    if len(raw) >= 2 and raw[0] == raw[-1] and raw[0] in ('"', "'"):
        raw = raw[1:-1]
    return raw.strip() or None


def set_field(text: str, field: str, value: str) -> str:
    pattern = rf'^{field}:.*$'
    if re.search(pattern, text, re.MULTILINE):
        value = value.replace('\\', '\\\\').replace('"', '\\"')
        return re.sub(pattern, lambda _m: f'{field}: "{value}"', text, flags=re.MULTILINE)
    # Insert na title-regel
    value = value.replace('\\', '\\\\').replace('"', '\\"')
    return re.sub(r"^(title:.+)$", lambda m2: f'{m2.group(1)}\n{field}: "{value}"', text,
                  count=1, flags=re.MULTILINE)


# ── Frontmatter: tags-lijst ────────────────────────────────────────────────

def parse_tags(text: str) -> list:
    """Haalt de YAML-lijst onder `tags:` op (de losse `- "..."`-regels)."""
    m = re.search(r'^tags:\s*\n((?:[ \t]*-[ \t]*.+\n?)+)', text, re.MULTILINE)
    if not m:
        return []
    items = re.findall(r'-[ \t]*["\']?([^"\'\n]+)["\']?', m.group(1))
    return [i.strip() for i in items if i.strip()]


# ── Per-artikel seed ───────────────────────────────────────────────────────
# Eén vaste seed liet álle hero-images op elkaar lijken. Een per-slug seed
# is deterministisch (zelfde artikel → zelfde beeld bij hergeneratie) maar
# uniek per artikel → gevarieerde composities, met dezelfde warme stijl.

def seed_for(slug: str) -> int:
    digest = hashlib.sha256(slug.encode("utf-8")).hexdigest()
    return int(digest, 16) % 2_147_483_647


# ── Prompt builder ─────────────────────────────────────────────────────────
# Tags die geen visueel onderwerp zijn — die horen niet in de beeld-prompt.
NON_VISUAL_TAGS = {
    "advertorial", "sponsored", "gesponsord", "opinie", "analyse",
    "achtergrond", "nieuws", "update", "explainer", "tutorial",
}

# Stopwoorden (NL + EN) — geen visueel onderwerp, dus weg uit de afgeleide
# scene. De titels zijn Nederlands; de generator-prompt verder Engels.
SCENE_STOPWORDS = {
    "de", "het", "een", "en", "of", "maar", "als", "dan", "dat", "die",
    "wat", "wie", "hoe", "waarom", "waar", "wanneer", "welke", "welk",
    "is", "zijn", "was", "wordt", "worden", "heeft", "hebben", "kan",
    "kun", "kunt", "kunnen", "moet", "moeten", "gaat", "gaan", "wil",
    "in", "op", "aan", "uit", "voor", "van", "met", "bij", "om", "naar",
    "over", "tot", "door", "tegen", "zonder", "tussen", "per", "ook",
    "je", "jij", "jouw", "ik", "we", "wij", "ze", "zij", "ons", "onze",
    "er", "hier", "daar", "nu", "al", "nog", "wel", "niet", "geen", "echt",
    "meer", "zo", "te", "even", "veel", "elke", "elk", "deze", "dit",
    "weten", "uitgelegd", "uitleg", "doen", "maken", "krijgen", "zien",
    "the", "a", "an", "and", "or", "to", "for", "with", "what", "how",
    "why", "your", "you", "are", "be", "it",
}


def _content_words(title: str) -> list:
    """Inhoudswoorden uit een titel: stopwoorden eruit, korte ruis eruit.
    Behoudt samenstellingen met cijfers/koppeltekens (gpt-5, eu-ai-act)."""
    words = []
    for w in re.findall(r"[A-Za-z0-9][A-Za-z0-9\-]*", title.lower()):
        if w in SCENE_STOPWORDS:
            continue
        if len(w) < 3 and not any(c.isdigit() for c in w):
            continue
        words.append(w)
    return words


def derive_scene(title: str, tags=None) -> str:
    """Leidt een concrete miniature-scene af als `heroScene` ontbreekt.

    Regelgebaseerd: pak de sterkste inhoudswoorden uit de titel (geen
    stopwoorden) en zet die als fysieke focus van het tafereel neer,
    aangevuld met concrete tag-props. Minder abstract dan de oude
    "symboliseert het onderwerp van dit artikel"-zin, maar nog steeds een
    noodgreep — een redactionele `heroScene` blijft beter (zie docs/workflow/HEROSCENE.md).
    """
    focus = _content_words(title)[:4]
    tag_props = [t for t in (tags or [])
                 if t and t.lower() not in NON_VISUAL_TAGS]

    if focus:
        scene = (
            "a meticulously hand-built miniature tabletop tableau that turns "
            f"the subject of '{' '.join(focus)}' into tangible physical objects"
        )
    else:
        scene = (
            "a meticulously hand-built miniature tabletop tableau "
            f"representing: {title.strip()}"
        )
    if tag_props:
        scene += f", with small symbolic props hinting at {', '.join(tag_props[:5])}"
    return scene


def build_prompt(title: str, tags=None, hero_scene: str = "", seed: int = 0,
                 category: str = "") -> str:
    """Bouwt de Leonardo-prompt: stijl-kern + per-seed compositie-assen
    + een per-artikel scene.

    De stijl volgt de artikel-categorie (style_for): diorama (BRAND_CORE,
    vier assen) voor de trage stukken, flat editorial (FLAT_CORE, twee
    assen) voor nieuws/tutorials/tools. Binnen een stijl roteren de assen
    deterministisch op de slug-seed, zodat artikelen zichtbaar
    verschillende composities krijgen in dezelfde look.

    Scene-voorkeur: een redactioneel `heroScene`-frontmatter-veld — een korte
    visuele scenebeschrijving. Ontbreekt dat, dan wordt de scene afgeleid
    uit de titel + concrete tag-woorden, zodat het beeld op het onderwerp
    aansluit i.p.v. een generieke kamer te tonen.
    """
    if hero_scene.strip():
        scene = hero_scene.strip()
    else:
        scene = derive_scene(title, tags)

    if style_for(category) == "flat":
        layout, backdrop = flat_composition_for(seed)
        return f"{FLAT_CORE}, {layout}, {backdrop}. Scene — {scene}"[:1000]

    tod, pov, scale, surface = composition_for(seed)
    composition = f"{tod}, {pov}, {scale}, {surface}"
    return f"{BRAND_CORE}, {composition}. Scene — {scene}"[:1000]


def build_alt_text(title: str, category: str = "") -> str:
    # Single quotes rond de titel — set_field wrapt de hele waarde in dubbele
    # quotes, dus geneste dubbele quotes zouden invalide YAML opleveren en
    # de Astro-build breken. Bestaande .md-bestanden volgen ook deze conventie.
    # Beide stijlen zijn miniatuur-diorama-fotografie (alleen de omgeving
    # verschilt), dus de alt-tekst is stijl-onafhankelijk.
    return f"Miniatuur diorama-illustratie bij artikel '{title}'"


# ── Leonardo API ────────────────────────────────────────────────────────────

def get_headers() -> dict:
    api_key = os.environ.get("LEONARDO_API_KEY")
    if not api_key:
        raise RuntimeError("LEONARDO_API_KEY niet gezet")
    return {
        "accept": "application/json",
        "content-type": "application/json",
        "authorization": f"Bearer {api_key}",
    }


def start_generation(prompt: str, seed: int) -> Optional[str]:
    import requests
    payload = {
        "prompt": prompt,
        "modelId": PHOENIX_MODEL,
        "width": IMAGE_WIDTH,
        "height": IMAGE_HEIGHT,
        "num_images": 1,
        "seed": seed,
        "public": False,
    }
    resp = requests.post(
        f"{LEONARDO_BASE}/generations",
        headers=get_headers(),
        json=payload,
        timeout=30,
    )
    if not resp.ok:
        print(f"   ❌ Leonardo API {resp.status_code}: {resp.text[:400]}")
        resp.raise_for_status()
    data = resp.json()
    gen_id = data.get("sdGenerationJob", {}).get("generationId")
    if not gen_id:
        print(f"   ❌ Geen generationId: {data}")
    return gen_id


def poll_generation(gen_id: str, max_wait: int = 180) -> Optional[str]:
    import requests
    deadline = time.time() + max_wait
    interval = 4
    while time.time() < deadline:
        time.sleep(interval)
        resp = requests.get(
            f"{LEONARDO_BASE}/generations/{gen_id}",
            headers=get_headers(),
            timeout=20,
        )
        resp.raise_for_status()
        gen = resp.json().get("generations_by_pk", {})
        status = gen.get("status", "")
        if status == "COMPLETE":
            images = gen.get("generated_images", [])
            if images:
                return images[0].get("url")
            print("   ❌ COMPLETE maar geen images")
            return None
        if status == "FAILED":
            print(f"   ❌ Generatie mislukt: {gen}")
            return None
        print(f"   ⏳ {status}…")
        interval = min(interval + 2, 10)
    print(f"   ❌ Timeout na {max_wait}s")
    return None


def download_and_optimize(url: str, dest: Path) -> bool:
    import requests
    tmp = dest.with_suffix(".tmp.jpg")
    try:
        resp = requests.get(url, timeout=60, stream=True)
        resp.raise_for_status()
        dest.parent.mkdir(parents=True, exist_ok=True)
        with open(tmp, "wb") as f:
            for chunk in resp.iter_content(8192):
                f.write(chunk)
    except Exception as e:
        print(f"   ❌ Download mislukt: {e}")
        return False

    # ImageMagick of cwebp voor compressie
    magick = shutil.which("magick") or shutil.which("convert")
    if magick:
        try:
            subprocess.run(
                [magick, str(tmp), "-resize", f"{OPTIMIZE_WIDTH}x",
                 "-quality", str(OPTIMIZE_QUALITY), "-strip", str(dest)],
                check=True, capture_output=True, timeout=30,
            )
            tmp.unlink(missing_ok=True)
            size_kb = dest.stat().st_size / 1024
            print(f"   ✅ {dest.name} ({size_kb:.0f} KB)")
            return True
        except Exception as e:
            print(f"   ⚠️  ImageMagick mislukt ({e}), Pillow fallback")

    try:
        from PIL import Image as PILImage
        img = PILImage.open(tmp)
        w, h = img.size
        if w > OPTIMIZE_WIDTH:
            new_h = int(h * OPTIMIZE_WIDTH / w)
            img = img.resize((OPTIMIZE_WIDTH, new_h), PILImage.LANCZOS)
        img.save(dest, format="WEBP", quality=OPTIMIZE_QUALITY, method=6)
        tmp.unlink(missing_ok=True)
        size_kb = dest.stat().st_size / 1024
        print(f"   ✅ {dest.name} ({size_kb:.0f} KB via Pillow)")
        return True
    except Exception as e:
        print(f"   ⚠️  Pillow mislukt ({e}), bewaar zonder optimalisatie")

    tmp.rename(dest)
    return True


# ── Generation log ─────────────────────────────────────────────────────────

def update_log(title: str, filename: str, web_path: str, alt_text: str,
               seed: int) -> None:
    try:
        if LOG_PATH.exists():
            log = json.loads(LOG_PATH.read_text(encoding="utf-8"))
        else:
            log = {"files": []}
        log.setdefault("files", [])
        log["files"] = [f for f in log["files"] if f.get("filename") != filename]
        log["files"].append({
            "article": title,
            "filename": filename,
            "path": web_path,
            "altText": alt_text,
            "seed": seed,
            "regeneratedAt": time.strftime("%Y-%m-%dT%H:%M:%SZ", time.gmtime()),
        })
        log["totalGenerated"] = len(log["files"])
        LOG_PATH.parent.mkdir(parents=True, exist_ok=True)
        LOG_PATH.write_text(json.dumps(log, indent=2, ensure_ascii=False), encoding="utf-8")
    except Exception as e:
        print(f"   ⚠️  Kon log niet bijwerken: {e}")


# ── Per-artikel verwerking ─────────────────────────────────────────────────

def process_article(md_path: Path, *, dry_run: bool, force: bool) -> str:
    slug = md_path.stem
    text = md_path.read_text(encoding="utf-8")
    title        = parse_field(text, "title") or slug
    hero_scene   = parse_field(text, "heroScene") or ""
    tags         = parse_tags(text)
    current_hero = parse_field(text, "heroImage") or ""
    category     = parse_field(text, "category") or ""
    seed         = seed_for(slug)

    filename  = f"diorama-{slug}.webp"
    web_path  = f"/images/articles/{filename}"
    dest_webp = IMAGES_DIR / filename

    if dest_webp.exists() and current_hero == web_path and not force:
        return "skip"

    prompt = build_prompt(title, tags, hero_scene, seed, category)

    if dry_run:
        print(f"   seed   {seed}")
        print(f"   prompt {prompt}")
        print(f"   [dry-run] zou {filename} genereren voor '{title[:60]}'")
        return "done"

    print(f"   📝 seed {seed} — {prompt[:80]}…")
    gen_id = start_generation(prompt, seed)
    if not gen_id:
        return "error"
    print(f"   🎨 Job {gen_id}")

    image_url = poll_generation(gen_id)
    if not image_url:
        return "error"

    if not download_and_optimize(image_url, dest_webp):
        return "error"

    alt = build_alt_text(title, category)
    new_text = set_field(text, "heroImage", web_path)
    new_text = set_field(new_text, "heroImageAlt", alt)
    md_path.write_text(new_text, encoding="utf-8")
    update_log(title, filename, web_path, alt, seed)

    print(f"   ✏️  heroImage → {web_path}")
    return "done"


# ── Main ───────────────────────────────────────────────────────────────────

def main() -> None:
    parser = argparse.ArgumentParser(description="Diorama hero-image generator (v2)")
    parser.add_argument("--slug", help="Verwerk alleen dit artikel (zoekt in CONTENT_DIR)")
    parser.add_argument("--file", metavar="PATH",
                        help="Verwerk één specifiek .md-bestand (ook buiten CONTENT_DIR)")
    parser.add_argument("--all", action="store_true")
    parser.add_argument("--force", action="store_true",
                        help="Overschrijf bestaande images")
    parser.add_argument("--dry-run", action="store_true",
                        help="Preview, geen API-aanroepen")
    args = parser.parse_args()

    if not args.slug and not args.all and not args.file:
        parser.print_help()
        sys.exit(1)

    if args.file:
        md_paths = [Path(args.file).resolve()]
        if not md_paths[0].exists():
            print(f"❌ Bestand niet gevonden: {md_paths[0]}")
            sys.exit(1)
    elif args.slug:
        if not CONTENT_DIR.exists():
            print(f"❌ Content dir niet gevonden: {CONTENT_DIR}")
            sys.exit(1)
        md_paths = [CONTENT_DIR / f"{args.slug}.md"]
        if not md_paths[0].exists():
            print(f"❌ Artikel niet gevonden: {md_paths[0]}")
            sys.exit(1)
    else:
        if not CONTENT_DIR.exists():
            print(f"❌ Content dir niet gevonden: {CONTENT_DIR}")
            sys.exit(1)
        md_paths = sorted(CONTENT_DIR.glob("*.md"))

    print(f"\n{'='*60}")
    print(f"{'[DRY RUN] ' if args.dry_run else ''}Diorama generatie — {len(md_paths)} artikel(en)")
    print(f"Model: Phoenix 1.0 | {IMAGE_WIDTH}×{IMAGE_HEIGHT} | per-artikel seed")
    print(f"{'='*60}\n")

    stats: dict[str, int] = {"done": 0, "skip": 0, "error": 0}
    for md_path in md_paths:
        print(f"📄 {md_path.name}")
        status = process_article(md_path, dry_run=args.dry_run, force=args.force)
        stats[status] = stats.get(status, 0) + 1
        if status == "skip":
            print("   ✓ Al up-to-date (skip)")
        if status == "done" and not args.dry_run and len(md_paths) > 1:
            time.sleep(2)  # Rate-limit buffer

    print(f"\n{'='*60}")
    print(f"Klaar: {stats['done']} gedaan, {stats['skip']} skipped, {stats['error']} errors")
    print(f"{'='*60}\n")


if __name__ == "__main__":
    main()
