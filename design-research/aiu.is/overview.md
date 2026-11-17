# aiuis

https://aiu.is/ · measured at 1440×900 · page height 900px

> Working notes on designing interfaces for systems that think back.

- Type: Editorial
- Found on: awwwards · HM · [awwwards page](https://www.awwwards.com/sites/ai-uis) · categories: Experimental, Art & Illustration, Technology
- Capture: **partial**: the page is one screen tall, so anything that scrolls inside a canvas or fixed layer was not measured

## Character

Partial capture: one screen. A light grey ground (`#e9e9ea`) with every piece of text in pure blue (`#0000ff`), like a one-colour print job. Alte Haas Grotesk at 16–24px with very tight tracking (−0.06em) sets a book-style table of contents on the left; the right side is an A–Z index grid where some letters are filled in as blue dots. Lots of empty space (spacing values up to 240px), no rounded corners, no motion beyond smooth scrolling.

## Colour palette

Black/white/grey share: backgrounds 100%, text 2%.

**Backgrounds (by painted area)**

| Colour | Share |
| --- | --- |
| `#e9e9ea` | 100% |

**Text (by characters)**

| Colour | Share |
| --- | --- |
| `#0000ff` | 98% |
| `#e9e9ea` | 2% |

**Borders (by count)**

| Colour | Share |
| --- | --- |
| — | — |

## Typography

Loaded fonts: alte-haas 700 normal, garara normal normal

| Family | Size | Weight | Line height | Letter spacing | Case | Characters |
| --- | --- | --- | --- | --- | --- | --- |
| alte-haas | 16px | 400 | 1.5 | -0.06em | none | 166 |
| garara | 11.2px | 10 | 1.5 | -0.086em | none | 28 |
| alte-haas | 17.6px | 400 | 1.5 | -0.055em | none | 26 |
| alte-haas | 12.8px | 400 | 1.5 | -0.075em | none | 25 |
| alte-haas | 24px | 400 | 1.33 | -0.1em | none | 21 |
| alte-haas | 18px | 400 | 1.5 | -0.053em | none | 10 |
| garara | 16px | 10 | 1.5 | 0.05em | none | 6 |
| alte-haas | 16px | 400 | 1 | -0.06em | none | 5 |
| alte-haas | 12.8px | 400 | 1.43 | -0.075em | none | 5 |
| garara | 16px | 400 | 1.5 | 0.05em | none | 3 |

## Spacing and shape

- Spacing values (px, most used first): 4 (6), 27 (4), 16 (4), 12 (3), 32 (2), 240 (2), 80 (2)
- Corner radii: none
- Breakpoints: max 768px, min 40rem, min 48rem, min 64rem, min 80rem, min 96rem

## Motion and tech

- Transitions: none
- CSS-animated elements: 0, canvases: 1, videos: 0
- Detected: lenis
- CSS variables on :root: 80 (see styles.json)

## Sections

| # | Section | Top / height | Background / text | Layout | Padding | Gutters L/R, T/B | Media |
| --- | --- | --- | --- | --- | --- | --- | --- |
| 1 | div app | 0 / 900px | `#e9e9ea` / `#0000ff` | flex column, gap normal, 3 items (7/16/16% wide) | 0px | 32/32, 31/30px | 1 canvas |

### 1. div app

- Heading (span): “Preface” — alte-haas 24px / 400 / lh 1.33 / ls -0.1em, `#0000ff`
- Body type: alte-haas 16px / 400 / lh 1.5 / ls -0.06em
- Labels: Index · Preface · Foreword · Credits and License · Changelog · Foundations · Representing Thinking · Styleguides · Principles · Interactions
- Copy: 74 words, e.g. “Representing Thinking”
