# Kelvin — three nights of music, filmed in heat

https://kelvin.8b.com/ · measured at 1440×900 · page height 17000px

> Kelvin is a three-night music festival filmed through thermal cameras and projected back into a former power station in Rotterdam. 23–25 July 2027.

- Type: Event
- Found on: awwwards · HM · [awwwards page](https://www.awwwards.com/sites/kelvin-music-festival-2027) · categories: Music & Sound, Events, Fashion
- Capture: full page

## Character

Full capture. Not strictly black and white: a cream ground (`#f1ede4`) alternates with a near-black violet (`#110d19`), and thermal-camera gradients (yellow, pink, blue) carry the identity in the giant KELVIN wordmark and the three night cards. Type is a wide light serif (Kalnia, 50–86px) for headlines against Hubot Sans at 17px with a relaxed 1.55 line height for body, plus 12px uppercase labels tracked at 0.12em. Layout is a loose editorial grid with a lot of empty space and overlapping, slightly rotated cards for the lineup. Stat rows use thin rules instead of boxes. GSAP with Lenis smooth scroll.

## Colour palette

Black/white/grey share: backgrounds 94%, text 100%.

**Backgrounds (by painted area)**

| Colour | Share |
| --- | --- |
| `#f1ede4` | 67% |
| `#110d19` | 27% |
| `#2d18a8` | 6% |

**Text (by characters)**

| Colour | Share |
| --- | --- |
| `#110d19` | 32% |
| `#bcb6c6` | 31% |
| `#5b5664` | 27% |
| `#f1ede4` | 10% |

**Borders (by count)**

| Colour | Share |
| --- | --- |
| `#110d19` | 62% |
| `#f1ede4` | 21% |
| `#f2ede473` | 10% |
| `#f0ede366` | 7% |

## Typography

Loaded fonts: Hubot Sans 300 800 normal, Kalnia 200 normal, Kelvin Narrow normal normal

| Family | Size | Weight | Line height | Letter spacing | Case | Characters |
| --- | --- | --- | --- | --- | --- | --- |
| Hubot Sans | 17px | 400 | 1.55 | 0em | none | 2019 |
| Hubot Sans | 20.88px | 450 | 1.42 | -0.005em | none | 1045 |
| Hubot Sans | 12px | 650 | 1.3 | 0.12em | uppercase | 871 |
| Hubot Sans | 17px | 550 | 1.55 | 0em | none | 163 |
| Hubot Sans | 20.8px | 600 | 1.55 | 0em | none | 140 |
| Hubot Sans | 17px | 600 | 1.55 | 0em | none | 118 |
| Kalnia | 61.92px | 200 | 1.02 | -0.02em | none | 94 |
| Hubot Sans | 27.36px | 800 | 0.92 | 0.005em | uppercase | 54 |
| Kalnia | 86.4px | 200 | 1.02 | -0.02em | none | 52 |
| Hubot Sans | 34.56px | 800 | 0.92 | 0.005em | uppercase | 49 |
| Hubot Sans | 14px | 400 | 1.55 | 0em | none | 44 |
| Hubot Sans | 13px | 700 | 1 | 0.09em | uppercase | 43 |
| Hubot Sans | 32px | 600 | 1.55 | 0em | none | 40 |
| Kalnia | 50.4px | 200 | 1.02 | -0.02em | none | 39 |

## Spacing and shape

- Spacing values (px, most used first): 18 (41), 16 (39), 13 (32), 9 (30), 19 (28), 11 (26), 43 (24), 22 (20), 10 (18), 24 (16), 2 (16), 21 (13), 12 (12), 5 (12), 14 (11), 158 (11)
- Corner radii: 50% (1)
- Breakpoints: max 699px, max 899px, max 499px

## Motion and tech

- Transitions: 0.4s cubic-bezier(0.2, 0.7, 0.2, 1) (18); 0.3s ease (6); 0.45s cubic-bezier(0.2, 0.7, 0.2, 1) (1)
- CSS-animated elements: 8, canvases: 0, videos: 0
- Detected: gsap, lenis
- CSS variables on :root: 17 (see styles.json)

## Sections

| # | Section | Top / height | Background / text | Layout | Padding | Gutters L/R, T/B | Media |
| --- | --- | --- | --- | --- | --- | --- | --- |
| 1 | header nav (fixed) | 0 / 64px | `#f1ede4` / `#110d19` | flex row, gap 24px, 3 items (17/18/7% wide) | 0px 43.2px | 43/66, 19/20px | — |
| 2 | section hero | 0 / 900px | `#f1ede4` / `#110d19` | grid 1 cols, gap normal, 6 items (76/100/27/50/17/23% wide) | 0px | 43/43, 116/0px | 2 img, 1 svg |
| 3 | section mirage | 900 / 1272px | `#110d19` / `#bcb6c6` | grid 12 cols, gap 40px 24px, 3 items (78/38/94% wide) | 0px 43.2px 158.4px | 43/44, 0/158px | — |
| 4 | div lineup__stage | 2172 / 900px | `#f1ede4` / `#110d19` | grid 2 cols, gap 32px, 2 items (33/59% wide) | 88px 43.2px 32px | 43/414, 88/48px | 12 img |
| 5 | div lineup__more | 4602 / 137px | `#f1ede4` / `#110d19` | grid 2 cols, gap 32px, 2 items (33/51% wide) | 48px 43.2px 0px | 43/161, 48/0px | — |
| 6 | section nights | 4898 / 1491px | `#f1ede4` / `#110d19` | grid 3 cols, gap normal, 3 items (31/35/31% wide) | 158.4px 43.2px | 43/43, 159/194px | 6 img |
| 7 | div archive__stage | 6389 / 900px | `#110d19` / `#bcb6c6` | flex row, gap 57.6px, 7 items (47/31/38/35/41/30/48% wide) | 96px 0px 45px | 43/133, 96/660px | 14 img |
| 8 | section voices | 11629 / 1323px | `#f1ede4` / `#110d19` | grid 2 cols, gap 32px 48px, 2 items (65/17% wide) | 158.4px 43.2px 0px | 43/43, 158/566px | 2 img, 1 svg |
| 9 | section tickets | 12952 / 1068px | `#110d19` / `#bcb6c6` | grid 3 cols, gap 20px, 3 items (30/30/30% wide) | 0px 43.2px 158.4px | 63/63, 81/158px | 1 svg |
| 10 | section faq | 14020 / 738px | `#f1ede4` / `#5b5664` | grid 2 cols, gap 40px 86.4px, 2 items (35/53% wide) | 158.4px 43.2px | 43/43, 158/84px | — |
| 11 | section visit | 14758 / 1165px | `#110d19` / `#bcb6c6` | grid 2 cols, gap 48px 72px, 2 items (41/48% wide) | 158.4px 43.2px | 61/43, 158/176px | 2 img |
| 12 | footer footer | 15923 / 1076px | `#f1ede4` / `#5b5664` | flex row, gap 33.8406px normal, 6 items (17/14/14/17/13/18% wide) | 158.4px 43.2px 0px | 43/43, 159/0px | — |

### 1. header nav

- Heading (span): “KELVIN” — Hubot Sans 25.6px / 800 / lh 0.92 / ls 0.005em / uppercase, `#110d19`
- Body type: Hubot Sans 15px / 600 / lh 1.55 / ls 0em
- Labels: KELVIN SOUND IN HEAT · 2027 · Lineup · Nights · Archive · Visit · PASSES
- Copy: 11 words, e.g. “Sound in heat · 2027”

### 2. section hero

- Heading (h1): “Kelvin K E L V I N” — Hubot Sans 34px / 700 / lh 1.55 / ls 0em, `#110d19`
- Body type: Hubot Sans 20.88px / 450 / lh 1.42 / ls -0.005em
- Labels: GET PASSES · See the lineup
- Copy: 40 words, e.g. “Three nights of music, filmed through thermal cameras and projected back into”

### 3. section mirage

- Heading (h2): “Every set is filmed in heat. The room paints itself.” — Kalnia 86.4px / 200 / lh 1.02 / ls -0.02em, `#f1ede4`
- Body type: Hubot Sans 20.88px / 450 / lh 1.42 / ls -0.005em
- Labels: —
- Copy: 78 words, e.g. “Six thermal cameras hang from the gantry of an old turbine hall.”

### 4. div lineup__stage

- Heading (h2): “Six in the frame, forty‑one in the hall” — Kalnia 50.4px / 200 / lh 1.02 / ls -0.02em, `#110d19`
- Body type: Hubot Sans 17px / 400 / lh 1.55 / ls 0em
- Labels: —
- Copy: 74 words, e.g. “The cameras follow the people who make the room warm. This summer”

### 5. div lineup__more

- Heading (h3): “ALSO IN THE HALL” — Hubot Sans 12px / 650 / lh 1.3 / ls 0.12em / uppercase, `#5b5664`
- Body type: Hubot Sans 20.88px / 450 / lh 1.42 / ls -0.005em
- Labels: —
- Copy: 34 words, e.g. “Bruma, Field Hum, Hollow Coast, Tamsin Rhee, Kaito Mori, Night Swim, Saskia”

### 6. section nights

- Heading (h2): “Three nights, three wavelengths” — Kalnia 60.48px / 200 / lh 1.02 / ls -0.02em, `#110d19`
- Heading (h3): “INFRARED” — Hubot Sans 112px / 300 / lh 0.82 / ls -0.01em / uppercase, `#110d19`
- Heading (h3): “VISIBLE” — Hubot Sans 112px / 300 / lh 0.82 / ls -0.01em / uppercase, `#110d19`
- Heading (h3): “ULTRAVIOLET” — Hubot Sans 84.97px / 300 / lh 0.82 / ls -0.01em / uppercase, `#f1ede4`
- Body type: Hubot Sans 17px / 400 / lh 1.55 / ls 0em
- Labels: —
- Copy: 134 words, e.g. “Each night is tuned to a part of the spectrum the cameras”

### 7. div archive__stage

- Heading (h2): “Last July, seen in heat” — Kalnia 51.84px / 200 / lh 1.02 / ls -0.02em, `#f1ede4`
- Body type: Hubot Sans 12px / 650 / lh 1.3 / ls 0.12em / uppercase
- Labels: —
- Copy: 73 words, e.g. “What the six cameras kept from 2026. Every frame on the wall”

### 8. section voices

- Heading (p): ““The first festival where the crowd is the light show. You watch a room warm up…” — Kalnia 61.92px / 200 / lh 1.02 / ls -0.02em, `#110d19`
- Body type: Hubot Sans 20.88px / 450 / lh 1.42 / ls -0.005em
- Labels: —
- Copy: 72 words, e.g. ““The Sunday cool-down was the best two hours of music I heard”

### 9. section tickets

- Heading (h2): “Pick your temperature” — Kalnia 74.88px / 200 / lh 1.02 / ls -0.02em, `#f1ede4`
- Heading (h3): “FRIDAY PASS” — Hubot Sans 34.56px / 800 / lh 0.92 / ls 0.005em / uppercase, `#f1ede4`
- Heading (h3): “SATURDAY PASS” — Hubot Sans 34.56px / 800 / lh 0.92 / ls 0.005em / uppercase, `#f1ede4`
- Heading (h3): “WEEKEND PASS” — Hubot Sans 34.56px / 800 / lh 0.92 / ls 0.005em / uppercase, `#f1ede4`
- Body type: Hubot Sans 17px / 400 / lh 1.55 / ls 0em
- Labels: CHOOSE · hello@kelvin-festival.com
- Copy: 105 words, e.g. “Students pay half on Sunday. Companions of disabled guests go free on”

### 10. section faq

- Heading (h2): “Before you come” — Kalnia 57.6px / 200 / lh 1.02 / ls -0.02em, `#110d19`
- Body type: Hubot Sans 17px / 400 / lh 1.55 / ls 0em
- Labels: hello@kelvin-festival.com
- Copy: 192 words, e.g. “Only in heat. The six cameras record temperature, not light, so faces”

### 11. section visit

- Heading (h2): “CENTRALE NOORD” — Hubot Sans 120.57px / 300 / lh 0.82 / ls -0.01em / uppercase, `#f1ede4`
- Body type: Hubot Sans 17px / 400 / lh 1.55 / ls 0em
- Labels: hello@kelvin-festival.com · +31 10 555 0193 · SUBSCRIBE
- Copy: 106 words, e.g. “Kraanweg 14, 3089 KN Rotterdam. A former power station on the south”

### 12. footer footer

- Heading (span): “K” — Hubot Sans 564.01px / 300 / lh 1 / ls 0em / uppercase, `null`
- Body type: Hubot Sans 17px / 600 / lh 1.55 / ls 0em
- Labels: Lineup · Three nights · Passes · Questions · Instagram · YouTube · Press · Accessibility · Privacy and filming
- Copy: 31 words, e.g. “© 2027 Kelvin Festival Foundation, Rotterdam”
