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
| `src/app/page.tsx` | The only page — header, grid, footer |
| `src/components/ClockGrid.tsx` | Client component; ticks once a second and renders the zone cards |
| `src/lib/zones.ts` | Zone list plus `Intl`-based offset, DST and formatting helpers |

Each card shows local time, the date, UTC offset, zone abbreviation (`PST`/`PDT`…), whether
daylight saving is currently in effect, and the difference from your own zone. The card
matching your browser's time zone is highlighted.

Zones covered, west to east: Pacific, Yukon (no DST), Mountain, Saskatchewan (no DST),
Central, Eastern, Atlantic, and Newfoundland (UTC−03:30).
