# Don't Look Up — a game about keeping everyone looking down

https://www.dontlookup.app/ · measured at 1440×900 · page height 900px

> You are very rich, very tall, and standing on quite a lot of people. Keep them distracted and they keep paying. Let them look up, and they push you over.

- Type: Experiment
- Found on: awwwards · SOTD · [awwwards page](https://www.awwwards.com/sites/dont-look-up-game) · categories: Games & Entertainment, Web & Interactive, Experimental
- Capture: **partial**: the page is one screen tall, so anything that scrolls inside a canvas or fixed layer was not measured

## Character

First screen only (a game). Off-white (`#f4f3ef`, 95%) with near-black (`#14140f`) line drawings and one red (`#c0342a`). Hand-drawn black lettering for the title between a giant pair of legs, with tiny stick figures scattered around it. Nunito at 10–17px for the interface, pill buttons. Three.js with 65 animated elements.

## Colour palette

Black/white/grey share: backgrounds 99%, text 93%.

**Backgrounds (by painted area)**

| Colour | Share |
| --- | --- |
| `#f4f3ef` | 95% |
| `#fffffff5` | 2% |

**Text (by characters)**

| Colour | Share |
| --- | --- |
| `#14140f` | 90% |
| `#c0342a` | 7% |
| `#000000` | 3% |
| `#f4f3ef` | 1% |

**Borders (by count)**

| Colour | Share |
| --- | --- |
| `#14140f` | 81% |
| `#c0342a` | 15% |
| `#f4f3ef` | 4% |

## Typography

Loaded fonts: Marsipan 400 normal, Nunito 400 800 normal

| Family | Size | Weight | Line height | Letter spacing | Case | Characters |
| --- | --- | --- | --- | --- | --- | --- |
| Nunito | 11px | 600 | 1.4 | 0em | none | 98 |
| Nunito | 12px | 700 | 1.45 | 0em | none | 97 |
| Nunito | 10px | 700 | 1.7 | 0.09em | uppercase | 91 |
| Nunito | 17px | 600 | normal | 0em | none | 68 |
| Nunito | 11px | 600 | 1.5 | 0.01em | none | 33 |
| Marsipan | 12px | 800 | normal | 0.2em | uppercase | 31 |
| Nunito | 10.5px | 700 | 1.25 | 0.02em | none | 27 |
| Nunito | 10.5px | 400 | normal | 0em | none | 20 |
| Nunito | 9px | 800 | normal | 0.2em | uppercase | 19 |
| Marsipan | 11px | 400 | normal | 0.03em | none | 17 |
| Arial | 10px | 800 | normal | 0.01em | none | 16 |
| Nunito | 11px | 800 | normal | 0.09em | uppercase | 13 |
| Marsipan | 7.25px | 800 | normal | 0.22em | uppercase | 13 |
| Marsipan | 13px | 800 | 1.45 | 0.04em | uppercase | 13 |

## Spacing and shape

- Spacing values (px, most used first): 10 (24), 12 (14), 6 (13), 8 (12), 13 (9), 5 (6), 7 (6), 4 (6), 9 (5), 3 (5), 30 (4), 22 (4), 14 (3), 11 (3), 16 (2), 17 (2)
- Corner radii: 50% (8), 12px (6), 24px 30px (4), 3px (3), 15px 18px (3), 11px (2)
- Breakpoints: max 820px, max 1060px, min 821px

## Motion and tech

- Transitions: 0.3s ease (7); 0.14s ease-out (5); 0.26s ease (3); 0.18s ease (3); 0.26s ease-in (2); 0.12s ease-out (2)
- CSS-animated elements: 65, canvases: 1, videos: 0
- Detected: three
- CSS variables on :root: 17 (see styles.json)

## Sections

| # | Section | Top / height | Background / text | Layout | Padding | Gutters L/R, T/B | Media |
| --- | --- | --- | --- | --- | --- | --- | --- |
| 1 | div stage (fixed) | 0 / 900px | `#f4f3ef` / `#14140f` | block | 0px | — | 1 canvas |
| 2 | div bubbles (fixed) | 0 / 900px | `#f4f3ef` / `#c0342a` | block | 0px | 428/227, 333/220px | 7 svg |
| 3 | div intro (fixed) | 0 / 900px | `#f4f3ef` / `#14140f` | flex column, gap 22px, 3 items (30/35/18% wide) | 30px | 471/471, 632/177px | 1 img |
| 4 | div tbars (absolute) | 0 / 900px | `#f4f3ef` / `#14140f` | block | 0px | — | — |
| 5 | div loader (fixed) | 0 / 900px | `#f4f3ef` / `#14140f` | flex column, gap 26px, 2 items (21/6% wide) | 0px | 679/679, 550/334px | 40 img |

### 1. div stage

- No heading text
- Body type: —
- Labels: —
- Copy: 0 words

### 2. div bubbles

- Heading (span): “ah!” — Nunito 16px / 700 / lh 1 / ls 0em, `#c0342a`
- Body type: Nunito 16px / 700 / lh 1 / ls 0em
- Labels: —
- Copy: 5 words, e.g. “hey!”

### 3. div intro

- Heading (div): “You are very rich, very tall, and standing on quite a lot of people.” — Nunito 17px / 600 / lh normal / ls 0em, `#14140f`
- Body type: Nunito 17px / 600 / lh normal / ls 0em
- Labels: START · TUTORIAL
- Copy: 16 words, e.g. “You are very rich, very tall, and standing on quite a lot”

### 4. div tbars

- No heading text
- Body type: —
- Labels: —
- Copy: 0 words

### 5. div loader

- Heading (span): “LOADING” — Nunito 12px / 800 / lh normal / ls 0.14em / uppercase, `#14140f`
- Body type: Nunito 12px / 800 / lh normal / ls 0.14em / uppercase
- Labels: —
- Copy: 1 words, e.g. “loading”
