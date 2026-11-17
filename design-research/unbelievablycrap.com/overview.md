# Liubomyr Ulytskyi - Digital Designer

https://www.unbelievablycrap.com/ · measured at 1440×900 · page height 900px

> Liubomyr Ulytskyi — Digital Designer, award-winning UI/UX Designer, art director, conceptualist.

- Type: Portfolio
- Found on: awwwards · SOTD · [awwwards page](https://www.awwwards.com/sites/unbelievably-crap) · categories: Web & Interactive, Photography, Experimental
- Capture: **partial**: the page is one screen tall, so anything that scrolls inside a canvas or fixed layer was not measured

## Character

**Partial capture:** one 900px screen of a WebGL portfolio styled as a surveillance console; other views load in place. Black ground with dark grey panels (`#393939`) and a pure red (`#ff0000`, `#e8271c`) reserved for alerts and the contact button. A single typeface, PP Supply Sans, almost all at 10px uppercase with −0.04em tracking, used as dense HUD readouts pinned to the corners and a bottom status bar. A dithered, colour-fringed figure stands in the centre as the only image. No rounded corners; fast 0.18s transitions. The density of tiny text is the texture.

## Colour palette

Black/white/grey share: backgrounds 65%, text 98%.

**Backgrounds (by painted area)**

| Colour | Share |
| --- | --- |
| `#000000` | 36% |
| `#393939` | 29% |
| `#e8271c` | 18% |
| `#ff0000` | 18% |

**Text (by characters)**

| Colour | Share |
| --- | --- |
| `#ffffff` | 58% |
| `#393939` | 22% |
| `#ffffff8c` | 14% |
| `#ffffff80` | 2% |
| `#daecf11a` | 1% |
| `#daecf1` | 1% |

**Borders (by count)**

| Colour | Share |
| --- | --- |
| — | — |

## Typography

Loaded fonts: PP Supply Sans 400 normal

| Family | Size | Weight | Line height | Letter spacing | Case | Characters |
| --- | --- | --- | --- | --- | --- | --- |
| PP Supply Sans | 10px | 400 | 0.5 | -0.04em | uppercase | 7447 |
| PP Supply Sans | 10px | 400 | 1.1 | -0.04em | uppercase | 1164 |
| PP Supply Sans | 14px | 400 | 1 | -0.04em | uppercase | 50 |
| PP Supply Sans | 64px | 400 | 0.9 | -0.06em | uppercase | 4 |

## Spacing and shape

- Spacing values (px, most used first): 6 (29), 4 (10), 10 (10), 32 (6), 64 (6), 2 (6), 16 (6), 8 (4), 13 (4), 60 (2), 15 (1)
- Corner radii: none
- Breakpoints: max 720px, max 860px

## Motion and tech

- Transitions: 0.18s ease (5); 0.28s linear (1); 0.3s linear (1); 0.14s linear (1); 0.42s cubic-bezier(0.4, 0, 0.2, 1) (1)
- CSS-animated elements: 72, canvases: 11, videos: 0
- Detected: gsap, three, barba
- CSS variables on :root: 22 (see styles.json)

## Sections

| # | Section | Top / height | Background / text | Layout | Padding | Gutters L/R, T/B | Media |
| --- | --- | --- | --- | --- | --- | --- | --- |
| 1 | div grain (fixed) | 0 / 900px | `#000000` / `#c8c8c8` | block | 0px | — | — |
| 2 | div transition (fixed) | 0 / 900px | `#000000` / `#c8c8c8` | block | 0px | — | — |
| 3 | div aboutRoot | 0 / 900px | `#000000` / `#ffffff` | flex column, gap 4.05px, 124 items (100/100/100/100/100/100/100/100% wide) | 0px | 0/0, 900/-1118px | 5 canvas |
| 4 | div hud.is-on (fixed) | 0 / 900px | `#000000` / `#ffffff8c` | flex column, gap 32px, 2 items (20/15% wide) | 0px | 10/10, 16/-463px | 1 canvas, 4 svg |
| 5 | div ts (fixed) | 450 / 1644px | `#000000` / `#393939` | flex row, gap 10px, 2 items (6/2% wide) | 0px | 409/397, -1/-6px | 12 img, 2 canvas |
| 6 | div b2.is-held (fixed) | 0 / 900px | `#000000` / `#393939` | flex row, gap 64px, 2 items (6/5% wide) | 0px | 0/10, 0/-2020px | 2 canvas, 2 svg |
| 7 | div ftr__sheet (fixed) | 0 / 900px | `#ff0000` / `#c8c8c8` | block | 0px | — | — |

### 1. div grain

- No heading text
- Body type: —
- Labels: —
- Copy: 0 words

### 2. div transition

- No heading text
- Body type: —
- Labels: —
- Copy: 0 words

### 3. div aboutRoot

- Heading (p): “CASE FILE: THE MAN BEHIND THE IMAGE” — PP Supply Sans 10px / 400 / lh 0.5 / ls -0.04em / uppercase, `#ffffff`
- Body type: PP Supply Sans 10px / 400 / lh 0.5 / ls -0.04em / uppercase
- Labels: —
- Copy: 772 words, e.g. “Why a photograph taken by accident could sometimes mean more than one”

### 4. div hud.is-on

- Heading (b): “X” — PP Supply Sans 10px / 400 / lh 0.5 / ls -0.04em / uppercase, `#393939`
- Body type: PP Supply Sans 10px / 400 / lh 0.5 / ls -0.04em / uppercase
- Labels: —
- Copy: 391 words, e.g. “/////////////////////////////////////////////////////////////////////////////////////////…”

### 5. div ts

- Heading (div): “//” — PP Supply Sans 64px / 400 / lh 0.9 / ls -0.06em / uppercase, `#393939`
- Body type: PP Supply Sans 10px / 400 / lh 1.1 / ls -0.04em / uppercase
- Labels: —
- Copy: 162 words, e.g. “mystery of life”

### 6. div b2.is-held

- Heading (p): “DON’T CLICK” — PP Supply Sans 10px / 400 / lh 0.5 / ls -0.04em / uppercase, `#393939`
- Body type: PP Supply Sans 10px / 400 / lh 0.5 / ls -0.04em / uppercase
- Labels: —
- Copy: 86 words, e.g. “Creative Development”

### 7. div ftr__sheet

- No heading text
- Body type: —
- Labels: —
- Copy: 0 words
