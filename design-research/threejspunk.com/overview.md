# Threejs-Punk Drive | Cyberpunk driving game in WebGPU & Three.js by Anderson Mancini and Sunag

https://www.threejspunk.com/ · measured at 1440×900 · page height 900px

> A free-to-play cyberpunk driving game in the browser: race a neon city at night in the rain, drift for points, nitro, traffic and a synthwave radio. Real-time WebGPU, Three.js and TSL by Anderson Mancini and Sunag.

- Type: Experiment
- Found on: awwwards · HM · [awwwards page](https://www.awwwards.com/sites/night-drive-racing-game) · categories: Games & Entertainment
- Capture: **partial**: the page is one screen tall, so anything that scrolls inside a canvas or fixed layer was not measured

## Character

Partial capture: the page was still on its "Compiling shaders" loader, so only the game's HUD layer was measured. A WebGPU driving game on near-black (`#0a0a0a`, `#1b1b1b`) with HUD text in Orbitron at 8.5–12px, uppercase, tracked 0.12–0.26em. Cyan (`#22d3ee`) and yellow (`#fcee0a`) are the cyberpunk accents. Little to learn about page layout; useful as a HUD type reference.

## Colour palette

Black/white/grey share: backgrounds 100%, text 53%.

**Backgrounds (by painted area)**

| Colour | Share |
| --- | --- |
| `#1b1b1b` | 48% |
| `#0a0a0a` | 48% |
| `#0705136b` | 2% |

**Text (by characters)**

| Colour | Share |
| --- | --- |
| `#ffffffc7` | 30% |
| `#22d3eef2` | 11% |
| `#e3e8ff99` | 10% |
| `#000000` | 9% |
| `#e6fbff` | 9% |
| `#e7e9ed8c` | 7% |
| `#fcee0a` | 5% |
| `#ffffff4d` | 4% |
| `#e2e8ff` | 3% |
| `#22d3ee` | 3% |
| `#140a10` | 3% |
| `#26d0ff` | 2% |

**Borders (by count)**

| Colour | Share |
| --- | --- |
| `#21d3ed73` | 44% |
| `#ffffff24` | 11% |
| `#23d3ef8c` | 7% |
| `#26d0ff8c` | 7% |
| `#a956f84d` | 4% |
| `#fcee0a99` | 4% |
| `#ff2d9b66` | 4% |
| `#4ade80` | 4% |
| `#ff2b5659` | 4% |
| `#c185fd73` | 4% |
| `#22d3ed80` | 4% |
| `#25cfff66` | 4% |

## Typography

Loaded fonts: Orbitron 400 900 normal, Phosphor 400 normal

| Family | Size | Weight | Line height | Letter spacing | Case | Characters |
| --- | --- | --- | --- | --- | --- | --- |
| Orbitron | 10px | 400 | normal | 0.12em | uppercase | 84 |
| Orbitron | 9px | 400 | normal | 0.133em | uppercase | 28 |
| Orbitron | 8.5px | 600 | normal | 0.259em | none | 24 |
| Orbitron | 9.5px | 700 | normal | 0.2em | none | 22 |
| Orbitron | 11.52px | 400 | normal | 0.38em | uppercase | 17 |
| Orbitron | 11px | 700 | normal | 0em | none | 9 |
| Orbitron | 8px | 400 | normal | 0.16em | none | 9 |
| Orbitron | 12px | 700 | normal | 0.2em | none | 8 |
| Orbitron | 10px | 700 | normal | 0.22em | none | 8 |
| Orbitron | 11px | 700 | normal | 0.18em | none | 7 |
| Orbitron | 10px | 400 | normal | 0.2em | none | 4 |
| Orbitron | 7px | 400 | normal | 0.3em | none | 4 |
| Orbitron | 9.5px | 700 | normal | 0.16em | none | 4 |
| Orbitron | 9.5px | 900 | normal | 0.2em | none | 4 |

## Spacing and shape

- Spacing values (px, most used first): 5 (34), 7 (29), 1 (24), 10 (11), 8 (11), 2 (10), 18 (9), 12 (9), 16 (8), 22 (5), 9 (5), 4 (2), 3 (2), 34 (2), 6 (2), 11 (2)
- Corner radii: 50% (5)
- Breakpoints: max 720px, max 640px, max 480px, max 768px, max 900px, min 641px, max 1000px, max 760px, max 1100px, min 768px

## Motion and tech

- Transitions: 0.25s ease (4); 0.08s linear (3); 0.2s ease (3); 0.35s ease (3); 0.22s ease (2); 0.1s linear (2)
- CSS-animated elements: 1, canvases: 4, videos: 0
- Detected: three
- CSS variables on :root: 12 (see styles.json)

## Sections

| # | Section | Top / height | Background / text | Layout | Padding | Gutters L/R, T/B | Media |
| --- | --- | --- | --- | --- | --- | --- | --- |
| 1 | div app-loader (fixed) | 0 / 900px | `#0a0a0a` / `#e7e9ed8c` | flex column, gap 21.6px, 2 items (11/15% wide) | 0px | 612/612, 410/443px | 1 svg |
| 2 | canvas (absolute) | 0 / 900px | `#1b1b1b` / `#000000` | block | 0px | — | — |
| 3 | div drive-hint (fixed) | 824 / 60px | `#0705136b` / `#ffffffc7` | flex row, gap 8px 18px, 12 items (10/6/7/7/6/6/5/6% wide) | 10px 18px | 373/373, 11/11px | — |
| 4 | div mp-tags (fixed) | 0 / 900px | `#1b1b1b` / `#000000` | block | 0px | — | — |

### 1. div app-loader

- Heading (p): “100” — Orbitron 48px / 500 / lh 1 / ls -0.04em, `#e8eaed`
- Body type: Orbitron 11.52px / 400 / lh normal / ls 0.38em / uppercase
- Labels: —
- Copy: 3 words, e.g. “COMPILING SHADERS”

### 2. canvas

- No heading text
- Body type: —
- Labels: —
- Copy: 0 words

### 3. div drive-hint

- Heading (span): “W S ACCEL / BRAKE” — Orbitron 10px / 400 / lh normal / ls 0.12em / uppercase, `#ffffffc7`
- Body type: Orbitron 10px / 400 / lh normal / ls 0.12em / uppercase
- Labels: —
- Copy: 31 words, e.g. “Accel / brake”

### 4. div mp-tags

- No heading text
- Body type: —
- Labels: —
- Copy: 0 words
