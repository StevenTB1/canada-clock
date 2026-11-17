# Canada Clock

A single-page Next.js app showing live local time across every Canadian time zone.

## Run it

```bash
pnpm install
pnpm dev
```

Then open http://localhost:3000.

## Portfolio designs

Two takes on a student portfolio, modelled on award-winning sites measured in `design-research/`. A pill on each
page switches between the two designs and between nine colour palettes; the palette choice is remembered in the browser.

| Route | Layout | Modelled on |
| --- | --- | --- |
| `/portfolio` | Exposure: full-screen photo that develops into black and white, spotlight follows the mouse | AUGE, Arc, Grounded, Huxley |
| `/portfolio/editorial` | Editorial: type-only index; each row opens on hover to show its photo | Stash, David Spaeth, bleibtgleich |

| Palette | Colours | Taken from |
| --- | --- | --- |
| Mono | white, black | bleibtgleich, David Spaeth |
| Paper | warm off-white, near-black | Mathis Biabiany |
| Concrete | warm grey, black | Grafik |
| Night | near-black, white | Stéfano Girardelli |
| Navy | white, navy | White Desert |
| Brown | off-white, brown | dsgn Interior |
| Burgundy | cream, burgundy | Agrumea Farm |
| Red | red, black | Love and Money |
| Green | green, black | Lajoya |

Both pages read their content from `src/lib/portfolio.ts`: name, experience, projects, skills, the portrait and project
screenshots from steven-chow.com, and stand-in photos from Unsplash. The palettes are a list in
`src/components/StyleBar.tsx`; every text pairing in them has a contrast ratio of 4.5:1 or better.
`design-research/style-family.png` shows the 18 measured sites closest to these two designs.

## What's here

| Path | Purpose |
| --- | --- |
| `src/app/page.tsx` | The only page — heading and the grid |
| `src/components/ClockGrid.tsx` | Client component; ticks once a second and renders the cards |
| `src/lib/zones.ts` | Zone list plus the `Intl`-based local-time reader |

Each card is an analog clock face, the local time in `HH:MM:SS`, the zone abbreviation
(`PST` / `PDT`…), the UTC offset, and the difference from Eastern time.

Zones covered, west to east: Pacific, Yukon, Mountain, Saskatchewan, Central, Eastern,
Atlantic, and Newfoundland.
