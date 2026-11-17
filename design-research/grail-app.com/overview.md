# Grail: Real-world quests, every day

https://grail-app.com/ · measured at 1440×900 · page height 11729px

> Grail pulls you out of autopilot with one real-world quest a day. Grow four stats: Strength, Intellect, Charisma, Wisdom. When you graduate, your subscription cancels itself.

- Type: Product / App
- Found on: awwwards · SOTD · [awwwards page](https://www.awwwards.com/sites/grail) · categories: Games & Entertainment, Mobile & Apps, Promotional
- Capture: full page

## Character

Full capture, but most sections are pinned 3D scenes, so the screenshot shows long black gaps where canvases animate on scroll. Black ground (90%) alternating with tilted off-white panels (`#f6f6f6`) that slide in like sheets of paper. The type pairing does the work: PP Pangaia, a light high-contrast serif, set uppercase at 81–145px with a 0.88 line height, against 16px Switzer for everything else. Colour is held to a single muted plum (`#623562`) and a pink pill button; the playful colour lives in the floating quest cards. Pill radii (99px) and one easing curve, 0.3s cubic-bezier(0.22, 1, 0.36, 1), are used everywhere. Smooth scrolling via Lenis with Three.js scenes.

## Colour palette

Black/white/grey share: backgrounds 100%, text 89%.

**Backgrounds (by painted area)**

| Colour | Share |
| --- | --- |
| `#000000` | 90% |
| `#f6f6f6` | 10% |

**Text (by characters)**

| Colour | Share |
| --- | --- |
| `#000000` | 21% |
| `#00000099` | 16% |
| `#b8b8b8` | 12% |
| `#0000009e` | 11% |
| `#ffffff80` | 11% |
| `#623562` | 11% |
| `#ffffff` | 10% |
| `#eeeeee` | 3% |
| `#ffffffb8` | 2% |
| `#ffffff8c` | 2% |

**Borders (by count)**

| Colour | Share |
| --- | --- |
| `#ffffff24` | 100% |

## Typography

Loaded fonts: Switzer 100 900 normal, PP Pangaia 300 normal

| Family | Size | Weight | Line height | Letter spacing | Case | Characters |
| --- | --- | --- | --- | --- | --- | --- |
| Switzer | 16px | 400 | 1.24 | 0em | none | 1095 |
| -apple-system | 14px | 500 | 1.31 | 0em | none | 680 |
| -apple-system | 16px | 400 | 1.24 | 0em | none | 438 |
| Switzer | 18px | 700 | 1.12 | 0em | none | 283 |
| -apple-system | 14px | 400 | 1.31 | 0em | none | 240 |
| -apple-system | 14px | 500 | normal | 0em | none | 189 |
| PP Pangaia | 92.16px | 300 | 0.88 | -0.01em | uppercase | 136 |
| -apple-system | 18px | 700 | 1.12 | 0em | none | 96 |
| Switzer | 15px | 400 | 1.35 | 0em | none | 86 |
| -apple-system | 13px | 400 | normal | 0em | none | 85 |
| PP Pangaia | 89.28px | 300 | 0.88 | -0.01em | uppercase | 47 |
| PP Pangaia | 92px | 300 | 0.88 | -0.01em | uppercase | 36 |
| PP Pangaia | 81px | 300 | 0.88 | -0.01em | uppercase | 29 |
| PP Pangaia | 86.4px | 300 | 0.86 | -0.01em | uppercase | 29 |

## Spacing and shape

- Spacing values (px, most used first): 12 (23), 2 (14), 17 (13), 4 (12), 15 (12), 8 (9), 1 (8), 5 (7), 6 (7), 24 (6), 32 (6), 40 (5), 3 (5), 22 (4), 71 (4), 26 (3)
- Corner radii: 99px (6), 999px (5), 50% (3), 24px (2), 20px (1), 2px (1)
- Breakpoints: max 768px, min 769px, max 720px, max 1279px, max 1000px, max 560px

## Motion and tech

- Transitions: 0.3s cubic-bezier(0.22, 1, 0.36, 1) (54); 0.2s ease (6); 0.55s ease (5); 0.6s cubic-bezier(0.22, 1, 0.36, 1) (5); 0.35s ease (3); 0.15s ease (1)
- CSS-animated elements: 85, canvases: 8, videos: 0
- Detected: lenis, three
- CSS variables on :root: 48 (see styles.json)

## Sections

| # | Section | Top / height | Background / text | Layout | Padding | Gutters L/R, T/B | Media |
| --- | --- | --- | --- | --- | --- | --- | --- |
| 1 | div _scene_bwga5_154 (fixed) | 130 / 770px | `#000000` / `#ffffff` | block | 0px | — | 1 canvas |
| 2 | header _hero_bwga5_173 | 0 / 900px | `#000000` / `#ffffffb8` | grid 3 cols, gap 24px, 3 items (9/30/9% wide) | 0px | 40/40, 30/634px | 1 img |
| 3 | section _section2_bwga5_184 | 900 / 900px | `#000000` / `#b8b8b8` | flex row, gap normal, 2 items (96/100% wide) | 0px | 32/0, 25/181px | — |
| 4 | section _section3_bwga5_265 | 1800 / 900px | `#000000` / `#ffffff` | block | 0px | — | — |
| 5 | section _section4_bwga5_281 | 2700 / 900px | `#000000` / `#ffffff` | block | 0px | — | — |
| 6 | div _acceptOverlay_bwga5_66._desktopOnly_bwga5_1087 (fixed) | 0 / 900px | `#000000` / `#623562` | flex row, gap 115.2px, 2 items (30/36% wide) | 0px | 40/40, 77/83px | — |
| 7 | section _section5_bwga5_683 | 3636 / 1243px | `#f6f6f6` / `#00000099` | grid 3 cols, gap normal 5%, 3 items (20/13/20% wide) | 0px | 191/82, 24/134px | 10 img |
| 8 | div _peelInner_bwga5_833 (sticky) | 4014 / 900px | `#000000` / `#0000009e` | flex row, gap 12px, 2 items (10/5% wide) | 0px | 32/32, 25/115px | 1 img, 1 canvas, 1 svg |
| 9 | div _totemWrap_bwga5_859 | 6219 / 1530px | `#000000` / `#ffffff` | flex row, gap 32px, 2 items (30/23% wide) | 0px | 32/32, 25/670px | 1 canvas |
| 10 | div _statsPin_bwga5_916 (sticky) | 8244 / 900px | `#000000` / `#ffffff80` | flex row, gap 12px, 2 items (5/5% wide) | 0px | 32/32, 25/384px | 2 canvas |
| 11 | div _guildsWrap_bwga5_926 | 9540 / 1252px | `#000000` / `#000000` | flex column, gap 31.68px, 2 items (52/30% wide) | 0px | 210/81, 24/250px | 10 img |
| 12 | div _footWrap_bwga5_584._footerOpen_bwga5_608 | 9929 / 1800px | `#000000` / `#b8b8b8` | flex column, gap normal, 7 items (100/96/9/17/23/96/100% wide) | 0px | 32/32, 33/926px | 1 img, 1 canvas |

### 1. div _scene_bwga5_154

- No heading text
- Body type: —
- Labels: —
- Copy: 0 words

### 2. header _hero_bwga5_173

- Heading (h1): “RECLAIMYOURLIFE” — PP Pangaia 145.22px / 300 / lh 0.88 / ls -0.01em / uppercase, `#ffffff`
- Body type: Switzer 15px / 400 / lh 1.35 / ls 0em
- Labels: Join Waitlist
- Copy: 35 words, e.g. “One real-world quest a day. Four stats that go up when you”

### 3. section _section2_bwga5_184

- Heading (div): “EVERYONE'S OUT” — PP Pangaia 92.16px / 300 / lh 0.88 / ls -0.01em / uppercase, `#ffffff`
- Body type: Switzer 16px / 400 / lh 1.24 / ls 0em
- Labels: —
- Copy: 69 words, e.g. “Same week, over and over, until you can't tell them apart. You”

### 4. section _section3_bwga5_265

- No heading text
- Body type: —
- Labels: —
- Copy: 0 words

### 5. section _section4_bwga5_281

- No heading text
- Body type: —
- Labels: —
- Copy: 0 words

### 6. div _acceptOverlay_bwga5_66._desktopOnly_bwga5_1087

- Heading (h2): “QUEST ACCEPTED. CLOCK’S RUNNING.” — PP Pangaia 81px / 300 / lh 0.88 / ls -0.01em / uppercase, `#623562`
- Body type: Switzer 16px / 400 / lh 1.24 / ls 0em
- Labels: —
- Copy: 78 words, e.g. “Not 24, since a day is too easy to lose to work”

### 7. section _section5_bwga5_683

- Heading (h2): “IT STARTS AS ONE QUEST. IT RARELY STAYS THAT WAY.” — PP Pangaia 89.28px / 300 / lh 0.88 / ls -0.01em / uppercase, `#000000`
- Body type: Switzer 16px / 400 / lh 1.24 / ls 0em
- Labels: —
- Copy: 163 words, e.g. “You went out to do one small thing. Six hours later you’re”

### 8. div _peelInner_bwga5_833

- Heading (h2): “WHAT WAS THAT LIKE?” — PP Pangaia 25.2px / 300 / lh 0.98 / ls -0.01em / uppercase, `#ffffff`
- Body type: -apple-system 16px / 400 / lh 1.24 / ls 0em
- Labels: —
- Copy: 106 words, e.g. “The quest fades by tomorrow. What you felt right after doing it”

### 9. div _totemWrap_bwga5_859

- Heading (h2): “THEKNIGHT” — PP Pangaia 208px / 300 / lh 0.88 / ls -0.005em / uppercase, `#ffffff`
- Heading (h3): “SIXTOTEMS. ONE'SYOURS.” — PP Pangaia 72px / 300 / lh 0.88 / ls -0.005em / uppercase, `#ffffff`
- Body type: -apple-system 14px / 500 / lh 1.31 / ls 0em
- Labels: Duck · Cat · Bear · Rat · Frog · Penguin
- Copy: 61 words, e.g. “You pick one when you start. It levels up as you do,”

### 10. div _statsPin_bwga5_916

- Heading (h2): “EVERY QUEST LANDS SOMEWHERE.” — PP Pangaia 92px / 300 / lh 0.88 / ls -0.01em / uppercase, `#ffffff`
- Body type: -apple-system 14px / 400 / lh 1.31 / ls 0em
- Labels: —
- Copy: 58 words, e.g. “Point at the part of yourself you want to build, and the”

### 11. div _guildsWrap_bwga5_926

- Heading (h2): “PICK YOUR GUILDS. THEY DEFINE YOUR QUESTS” — PP Pangaia 92.16px / 300 / lh 0.88 / ls -0.01em / uppercase, `#000000`
- Body type: -apple-system 14px / 500 / lh 1.31 / ls 0em
- Labels: —
- Copy: 148 words, e.g. “Getting strong. Getting out more. Slowing down. Making stuff. Join the ones”

### 12. div _footWrap_bwga5_584._footerOpen_bwga5_608

- Heading (span): “Y” — PP Pangaia 92px / 300 / lh 0.88 / ls -0.01em / uppercase, `#ffffff66`
- Body type: -apple-system 14px / 500 / lh normal / ls 0em
- Labels: Made by Denormalized · Privacy · grail@denormalized.co · Terms
- Copy: 107 words, e.g. “building”
