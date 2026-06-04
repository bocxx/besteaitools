# Social Brand Kit — debesteaitools.nl (DBAT)

> Canonieke kleur/typografie-referentie voor social visuals en gegenereerde beelden.
> Bron: `src/styles/00-tokens.css` (actief thema). Laatst geverifieerd: 2026-06-03.
> **Thema: "Deep Space"** — koelblauwe achtergrond, Vibrant Coral primair, Nebula Teal secundair, Cosmic Indigo accent.

## DBAT — Deep Space (actief)

| Rol | Token (oklch) | Hex | Gebruik in visuals |
|---|---|---|---|
| Achtergrond diep | `oklch(7% 0.012 240)` | `#000102` (poster: `#05080F`) | canvas |
| Surface | `oklch(11% 0.015 240)` | `#0B111B` | secties |
| Panel / elevated | `oklch(14% 0.016 240)` | `#0E141F` | kaarten, number-chips |
| **Primair — Coral** | `oklch(70% 0.22 15)` | `#FF5C5C` | koppen, signaal-mark, CTA-knop |
| Coral mid | `oklch(58% 0.22 15)` | `#DE1C4E` | gradient/diepte |
| **Secundair — Teal** | `oklch(72% 0.14 185)` | `#00C0B0` | toolnamen, accenten, nummers |
| **Tertiair — Indigo** | `oklch(68% 0.16 270)` | `#7290FA` | subtiele glow |
| Tekst primair | — | `#F1F5FC` | bodytekst, witregels |
| Tekst secundair | — | `#94A6BE` | ondertitels |
| Tekst muted | — | `#5C6A84` | footers, fijndruk |

**Fonts:** Display/koppen = **Space Grotesk** (Bold). Body = **Inter** (Regular/SemiBold/Bold).
Bestanden: `src/assets/fonts/space-grotesk-bold.ttf`, `inter-{regular,semibold,bold}.ttf`.

**Logo-mark:** concentrische "signaal"-bogen (kwartcirkel, rechtsboven) + punt-oorsprong, in Coral. Bron: `public/favicon.svg`.

### Accent-recept (wat werkt)
- Kop in Coral, sleutelwoord ("Claude") in Teal voor contrast.
- "verb → **tool**": pijl Coral, toolnaam Teal, verb wit.
- Number-chips: rand + cijfer in Teal op panel.
- Eyebrow/label: Teal, uppercase, letter-spacing.

## HLN — hetlaatsteainieuws.nl (zustermerk, ter referentie)

| Rol | Hex / token |
|---|---|
| Achtergrond | `#010405` |
| Primair (Yellow) | `oklch(88% 0.19 92)` ≈ `#FFD100` |
| Secundair (Teal) | `oklch(75% 0.14 ...)` |
| Tekst primair / sec | `#F1F5FC` / `#BACAD6` |
| Display-font | **Boldonse** |
| Body-font | **Geist** |

> ⚠️ DBAT en HLN delen NIET meer hetzelfde palet of font. DBAT = Coral/Teal + Space Grotesk; HLN = Yellow + Boldonse. Visuals niet door elkaar gebruiken.

## Changelog
- 2026-06-03: thema gemigreerd van "Editorial Yellow & Teal" → **Deep Space (Coral/Teal/Indigo)**. Eerder ook "Ember" (amber/terracotta, gearchiveerd). Gebruik altijd de hex uit deze tabel, niet oudere terracotta/geel-sets.
