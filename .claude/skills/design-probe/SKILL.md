---
name: design-probe
description: Measure the visual design of live websites and write one overview per site with site type, colour palette, type scale, spacing, and per-section layout, plus an index across all sites. Use when asked to study, probe, or catalogue the design of award-winning or reference sites (for example the awwwards black-and-white winners), or to extract a site's palette, fonts, and spacing. Not for building or restyling a site, and not for copying a site's text or assets.
---

# Design probe

Build an inspiration library: one folder per site holding measured facts and a short written read of the design, and one index comparing them. All measuring is done by `scripts/probe.mjs` so every site is measured the same way. It needs Node 22+ and Google Chrome (set `CHROME_PATH` if Chrome is elsewhere) and installs nothing.

## 1. Pick the sites

If the user gave URLs, measure each with `node <skill>/scripts/probe.mjs <url> design-research`. For awwwards winners, save the list first:

```bash
node <skill>/scripts/probe.mjs --winners https://www.awwwards.com/websites/black-and-white/ 100 > design-research/sites.json
```

This keeps the newest sites on that list that carry a Site of the Day, Month, Year, or Honorable Mention badge, with their awwwards categories. Two things to know:

- The black-and-white tag is `/websites/black-and-white/`. `/websites/black-white/` is a name search and returns sites with "black" or "white" in the title.
- Awwwards cannot filter a tag by award in the URL, so the script pages through the list and keeps badged cards. Any other tag or category list URL works the same way, for example `/websites/portfolio/`.

For other galleries, `--links` lists the outside sites a gallery page links to:

```bash
node <skill>/scripts/probe.mjs --links "https://www.siteinspire.com/websites?categories=19" 30 > <scratch>/siteinspire.json
```

It only works where the gallery's cards link straight to the site. Checked in November 2026: SiteInspire, Minimal Gallery (`minimal.gallery/tag/portfolio/`) and Hover States work; Httpster and Godly return nothing, and Bestfolios and Maxibestof return mostly unrelated links. Read each list before using it: drop sponsors and tools (Mobbin shows up on several), and tidy titles such as "Visit X website".

Keep one master list per research folder and grow it:

```bash
node <skill>/scripts/probe.mjs --add design-research/sites.json <scratch>/siteinspire.json
```

`--add` skips sites already in the list and gives new ones the next ranks, so every site keeps its rank, its source gallery and the list it was found on.

## 2. Measure each site

```bash
node <skill>/scripts/probe.mjs --batch design-research/sites.json design-research
```

Sites run one after another, 10–40 seconds each, so run 100 sites in the background (about 45 minutes). After growing the list with `--add`, the same command measures only the new sites. A site that fails is logged and skipped; sites that already have `styles.json` are skipped, so running the same command again resumes. To re-measure a site, delete its `styles.json`. Each site gets `design-research/<host>/`:

| File | Holds |
| --- | --- |
| `styles.json` | Everything measured: palette, type scale, spacing, radii, motion, CSS variables, breakpoints, detected libraries, every section, and under `listing` the rank, source gallery, list URL, award and categories |
| `overview.md` | The readable version, with a Type line and a Character paragraph for you to fill in |
| `screenshot.jpg` | Full page at 1440px wide, half scale, capped at 10000px tall |

It measures the homepage at 1440×900 only. Re-measuring rewrites the numbers but keeps a Type and Character you already wrote.

## 3. Check each result before trusting it

Look at `screenshot.jpg` next to the numbers. For batches, check eight sites at a time:

```bash
node <skill>/scripts/sheet.mjs design-research 1 8 <scratch>/sheet-1.png
```

This puts the first screens of sites ranked 1–8 on one image and prints each site's key numbers. The overview marks a page one screen tall as a partial capture: the site scrolls inside a canvas or fixed layer, so only the first screen was measured. Also say so in the Character paragraph when:

- The screenshot shows a preloader, cookie wall, or bot check (common consent dialogs are removed before measuring; nothing is clicked).
- The top background colour is not what the screenshot shows (a canvas or video paints the page; CSS colours describe only the layer underneath).
- A large blank area shows content that had not rendered.

Do not hand-edit numbers to fix a capture. Say what was missed. When the page did not load at all (an error page, a bot check, a dead domain), start the Character paragraph with `Failed capture:` so the category-palette skill leaves the site out.

## 4. Write the Type and Character

Replace the two `_TODO_` markers in `overview.md`.

**Type**: pick one, by the site's main job. The awwwards categories are chosen by whoever submitted the site, so use them as a hint and decide from the page.

| Type | For |
| --- | --- |
| Portfolio | One person's work |
| Studio / Agency | A team selling creative or technical services, including architecture and design studios |
| Business | A company or service that is not a creative studio: finance, consulting, B2B, health, legal |
| Product / App | Software, SaaS, AI tools, mobile apps |
| Brand / Shop | A physical product brand or online store |
| Event | Festival, conference, exhibition, award show |
| Editorial | Magazine, blog, directory, resource library |
| Campaign | One-off launch or promo microsite for a film, game, album, or product drop |
| Culture | Museum, gallery, school, non-profit, public institution |
| Place | Hotel, restaurant, real estate, venue |
| Experiment | Art piece, game, or interactive toy with no business behind it |

**Character**: three to five sentences from the screenshot and the numbers: the overall feel, the two or three decisions that make the design work (a type pairing, a grid, a spacing rhythm, how the one accent colour is used), and motion in words. Name measured values when you cite them.

## 5. Index and report

```bash
node <skill>/scripts/probe.mjs --index design-research
```

This writes `design-research/README.md`: what the set has in common (types, source galleries, dark versus light grounds, accent use, most common fonts, median body size, libraries) and one row per site. Run it after the Type lines are filled in. Report the counts, the patterns that stand out, the failures, and the partial captures. Leave the output uncommitted unless asked.

## Limits

- Text: the output keeps headings, button and link labels, a word count, and a twelve-word excerpt per section. Do not paste a site's body copy into the overview.
- Motion: CSS transitions and a count of animated elements are measured. WebGL, canvas, and scroll-driven animation are only detected, not described.
- Colour shares are by painted area for backgrounds and by character count for text. Nested boxes with the same background count twice, so treat shares as a ranking.
- Sections are found by splitting the page into its large full-width blocks. Sites built from absolutely positioned layers come out as fewer, larger sections. The layout column reports the largest grid or flex box in a section, which is sometimes a nav row rather than the main columns.
