# Mondrian — Interactive Journey Through Piet Mondrian's Art

https://www.mondriantribute.com/ · measured at 1440×900 · page height 900px

> Explore Piet Mondrian's artistic evolution in an interactive WebGL experience — from early landscapes to neoplastic abstraction and the rhythm of New York.

- Type: Experiment
- Found on: awwwards · HM · [awwwards page](https://www.awwwards.com/sites/a-tribute-to-piet-mondrian) · categories: Art & Illustration
- Capture: **partial**: the page is one screen tall, so anything that scrolls inside a canvas or fixed layer was not measured

## Character

Partial capture: one screen, on its intro. Cream (`#f6f3ee`) and near-black (`#0a0908`) halves, with a stone text colour (`#d8d1c8`) and Mondrian red (`#c1121f`) for the title. ZT Neue Ralewe sets the name broken into stacked italic syllables at up to 180px; General Sans at 15–18px uses a very open 2.0 line height. Scrolling takes the paintings apart in Three.js.

## Colour palette

Black/white/grey share: backgrounds 100%, text 96%.

**Backgrounds (by painted area)**

| Colour | Share |
| --- | --- |
| `#f6f3ee` | 50% |
| `#0a0908` | 50% |

**Text (by characters)**

| Colour | Share |
| --- | --- |
| `#d8d1c8` | 93% |
| `#c1121f` | 4% |
| `#0a0908` | 3% |

**Borders (by count)**

| Colour | Share |
| --- | --- |
| `#0a0908` | 100% |

## Typography

Loaded fonts: ZT Neue Ralewe 400 normal, GeneralSans 500 normal, GeneralSans 400 normal

| Family | Size | Weight | Line height | Letter spacing | Case | Characters |
| --- | --- | --- | --- | --- | --- | --- |
| ZT Neue Ralewe | 27px | 500 | 2 | 0em | none | 577 |
| GeneralSans | 18px | 500 | 2 | 0em | none | 24 |
| GeneralSans | 15px | 500 | 1 | 0em | uppercase | 19 |
| ZT Neue Ralewe | 12px | 500 | 1 | 0.05em | uppercase | 13 |
| ZT Neue Ralewe | 80px | 500 | 1 | 0em | none | 12 |
| ZT Neue Ralewe | 180px | 500 | 1.2 | 0em | none | 12 |
| GeneralSans | 14px | 500 | 1 | 0.05em | uppercase | 8 |
| ZT Neue Ralewe | 16px | 400 | 1 | 0em | none | 8 |

## Spacing and shape

- Spacing values (px, most used first): 20 (4), 1 (4), 6 (4), 15 (4), 10 (3), 60 (2), 30 (1)
- Corner radii: 100% (2)
- Breakpoints: max 979px, max 1279px, min 1280px

## Motion and tech

- Transitions: 0.3s ease (4); 0.8s ease-out (3); 0.6s ease-in-out (2)
- CSS-animated elements: 0, canvases: 3, videos: 0
- Detected: lenis, three, next
- CSS variables on :root: 73 (see styles.json)

## Sections

| # | Section | Top / height | Background / text | Layout | Padding | Gutters L/R, T/B | Media |
| --- | --- | --- | --- | --- | --- | --- | --- |
| 1 | section Loader-module__HxmtFG__intro.flex (fixed) | 0 / 900px | `#f6f3ee` / `#c1121f` | flex row, gap normal, 2 items (17/21% wide) | 0px | 525/525, 271/232px | 2 img, 1 svg |
| 2 | div basis-8/12.Home-module__kroEBW__col__center | 15 / 870px | `#0a0908` / `#d8d1c8` | block | 0px | 368/17, 223/223px | — |
| 3 | div Home-module__kroEBW__scroll__container (absolute) | 781 / 79px | `#0a0908` / `#d8d1c8` | block | 0px | 0/0, 10/54px | 1 svg |
| 4 | div cursor-module__2w3xva__cursor__container (fixed) | 0 / 900px | `#f6f3ee` / `#0a0908` | block | 0px | — | — |
| 5 | div canvas-container (fixed) | 0 / 900px | `#f6f3ee` / `#0a0908` | block | 0px | — | 1 canvas |
| 6 | div canvas-menu (fixed) | 0 / 900px | `#f6f3ee` / `#0a0908` | block | 0px | — | 1 canvas |
| 7 | div canvas-intro (fixed) | 0 / 900px | `#f6f3ee` / `#0a0908` | block | 0px | — | 1 canvas |

### 1. section Loader-module__HxmtFG__intro.flex

- Heading (h1): “PIET MON DRI AN” — ZT Neue Ralewe 80px / 500 / lh 1 / ls 0em, `#c1121f`
- Body type: ZT Neue Ralewe 80px / 500 / lh 1 / ls 0em
- Labels: —
- Copy: 14 words, e.g. “Enter”

### 2. div basis-8/12.Home-module__kroEBW__col__center

- Heading (span): “Mondrian spent his entire” — ZT Neue Ralewe 27px / 500 / lh 2 / ls 0em, `#d8d1c8`
- Body type: ZT Neue Ralewe 27px / 500 / lh 2 / ls 0em
- Labels: —
- Copy: 112 words, e.g. “life searching for balance and perfection.”

### 3. div Home-module__kroEBW__scroll__container

- Heading (p): “SCROLL TO DECOMPOSE” — GeneralSans 15px / 500 / lh 1 / ls 0em / uppercase, `#d8d1c8`
- Body type: GeneralSans 15px / 500 / lh 1 / ls 0em / uppercase
- Labels: —
- Copy: 3 words, e.g. “Scroll to decompose”

### 4. div cursor-module__2w3xva__cursor__container

- No heading text
- Body type: —
- Labels: —
- Copy: 0 words

### 5. div canvas-container

- No heading text
- Body type: —
- Labels: —
- Copy: 0 words

### 6. div canvas-menu

- No heading text
- Body type: —
- Labels: —
- Copy: 0 words

### 7. div canvas-intro

- No heading text
- Body type: —
- Labels: —
- Copy: 0 words
