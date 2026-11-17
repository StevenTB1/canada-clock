# Portfolio — Evren / Galekto

https://galekto.com/ · measured at 1440×900 · page height 900px

> Evren (Galekto) — Brand identity, visual design and digital art. Explore projects, artworks and more.

- Type: Portfolio
- Found on: awwwards · HM · [awwwards page](https://www.awwwards.com/sites/galekto) · categories: Art & Illustration, Web & Interactive, Portfolio, Experimental
- Capture: **partial**: the page is one screen tall, so anything that scrolls inside a canvas or fixed layer was not measured

## Character

Partial capture: one screen styled as a CRT boot terminal. Near-black with amber text (`#ffb000` at several opacities, `#ffe566`, `#ffd060`), like an old monochrome monitor. VT323, a pixel font, at 20–34px with a 1.55 line height and a widely tracked title; Barlow Condensed 900 at 216px further in. A 16px rounded screen edge and six canvases.

## Colour palette

Black/white/grey share: backgrounds 83%, text 12%.

**Backgrounds (by painted area)**

| Colour | Share |
| --- | --- |
| `#000000` | 15% |
| `#fbfbfb` | 14% |
| `#060606` | 14% |
| `#050505` | 14% |
| `#050302f7` | 14% |
| `#030201` | 13% |
| `#ffff00` | 2% |
| `#ff0000` | 2% |
| `#ff00ff` | 2% |
| `#0000ff` | 2% |
| `#00ff00` | 2% |
| `#00ffff` | 1% |

**Text (by characters)**

| Colour | Share |
| --- | --- |
| `#ffb000` | 48% |
| `#ffb00047` | 12% |
| `#ffe566` | 10% |
| `#ffd060` | 8% |
| `#ffb000a6` | 5% |
| `#ffffff` | 4% |
| `#2d2d2db8` | 4% |
| `#facc15` | 4% |
| `#111111` | 3% |
| `#ffc840` | 2% |

**Borders (by count)**

| Colour | Share |
| --- | --- |
| `#2d2d2d38` | 50% |
| `#ffffff` | 50% |

## Typography

Loaded fonts: Barlow Condensed 900 normal, Bebas Neue 400 normal, Space Grotesk 400 normal, Space Grotesk 600 normal, Space Grotesk 700 normal, VT323 400 normal

| Family | Size | Weight | Line height | Letter spacing | Case | Characters |
| --- | --- | --- | --- | --- | --- | --- |
| VT323 | 26px | 400 | 1.55 | 0em | none | 436 |
| VT323 | 24px | 400 | 1.55 | 0em | none | 88 |
| VT323 | 34px | 400 | 1.55 | 0.03em | none | 38 |
| VT323 | 20px | 400 | 1.2 | 0.06em | none | 35 |
| VT323 | 24px | 400 | normal | 0.12em | uppercase | 26 |
| Space Grotesk | 10.56px | 800 | normal | 0.14em | uppercase | 23 |
| VT323 | 62px | 400 | 1.1 | 0.24em | none | 23 |
| VT323 | 57.6px | 400 | 1.05 | 0.08em | uppercase | 18 |
| VT323 | 29px | 400 | 1.55 | 0.02em | none | 18 |
| Space Grotesk | 12px | 700 | normal | 0.08em | uppercase | 15 |
| Space Grotesk | 24px | 600 | normal | 0.16em | none | 9 |
| Space Grotesk | 24px | 600 | normal | 0.1em | none | 9 |
| Space Grotesk | 10.88px | 800 | normal | 0.16em | uppercase | 5 |
| Barlow Condensed | 216px | 900 | 0.82 | 0em | none | 5 |

## Spacing and shape

- Spacing values (px, most used first): 2 (12), 8 (4), 24 (4), 28 (3), 22 (2), 10 (2), 20 (2), 40 (2), 16 (2), 63 (2), 72 (2), 29 (1), 4 (1), 1 (1), 43 (1)
- Corner radii: 16px (1), 2px (1), 28.8px (1), 50% (1)
- Breakpoints: max 768px, max 480px, max 600px, max 400px

## Motion and tech

- Transitions: 0.35s cubic-bezier(0.22, 1, 0.36, 1) (5); 0.25s ease (4); 0.6s cubic-bezier(0.22, 1, 0.36, 1) (2); 0.5s cubic-bezier(0.22, 1, 0.36, 1) (2); 0.8s cubic-bezier(0.22, 1, 0.36, 1) (2); 0.45s ease (1)
- CSS-animated elements: 5, canvases: 6, videos: 0
- Detected: nothing recognised
- CSS variables on :root: 17 (see styles.json)

## Sections

| # | Section | Top / height | Background / text | Layout | Padding | Gutters L/R, T/B | Media |
| --- | --- | --- | --- | --- | --- | --- | --- |
| 1 | div preloader (fixed) | 0 / 900px | `#060606` / `#ffb000` | flex column, gap 0px, 5 items (89/89/89/89/89% wide) | 0px | 80/80, 71/195px | 2 canvas |
| 2 | div bg-layer (fixed) | 0 / 900px | `#fbfbfb` / `#2d2d2d` | block | 0px | — | 2 canvas |
| 3 | div cursor (fixed) | 0 / 900px | `#fbfbfb` / `#2d2d2d` | block | 0px | — | — |
| 4 | div page-tv-overlay (fixed) | 0 / 900px | `#fbfbfb` / `#2d2d2d` | block | 0px | — | 1 canvas |
| 5 | div page-crt-bevel (fixed) | 0 / 900px | `#fbfbfb` / `#2d2d2d` | block | 0px | — | — |
| 6 | div page-tv-frame (fixed) | 0 / 900px | `#050302f7` / `#2d2d2d` | block | 0px | — | — |
| 7 | svg page-tv-stroke (fixed) | 0 / 900px | `#fbfbfb` / `#2d2d2d` | block | 0px | — | — |

### 1. div preloader

- Heading (div): “G A L E K T O D R O M E” — VT323 62px / 400 / lh 1.1 / ls 0.24em, `#ffd060`
- Body type: VT323 26px / 400 / lh 1.55 / ls 0em
- Labels: —
- Copy: 72 words, e.g. “════════════════════════════════════════════════”

### 2. div bg-layer

- No heading text
- Body type: —
- Labels: —
- Copy: 0 words

### 3. div cursor

- No heading text
- Body type: —
- Labels: —
- Copy: 0 words

### 4. div page-tv-overlay

- No heading text
- Body type: —
- Labels: —
- Copy: 0 words

### 5. div page-crt-bevel

- No heading text
- Body type: —
- Labels: —
- Copy: 0 words

### 6. div page-tv-frame

- No heading text
- Body type: —
- Labels: —
- Copy: 0 words

### 7. svg page-tv-stroke

- No heading text
- Body type: —
- Labels: —
- Copy: 0 words
