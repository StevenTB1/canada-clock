# Canada Clock

A single-page Next.js app showing live local time across every Canadian time zone.

## Run it

```bash
pnpm install
pnpm dev
```

Then open http://localhost:3000.

## What's here

| Path | Purpose |
| --- | --- |
| `src/app/page.tsx` | The only page — heading and the grid |
| `src/components/ClockGrid.tsx` | Client component; ticks once a second and renders the cards |
| `src/lib/zones.ts` | Zone list plus the `Intl`-based local-time reader |

Each card is an analog clock face and the local time in `HH:MM:SS`, labelled by region.

Zones covered, west to east: Pacific, Yukon, Mountain, Saskatchewan, Central, Eastern,
Atlantic, and Newfoundland.
