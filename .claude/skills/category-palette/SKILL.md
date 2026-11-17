---
name: category-palette
description: Build the shared colour palette of each site category from design-probe research, with mix-and-match colour combinations checked for contrast, written as Markdown with an SVG swatch sheet. Use when asked for the common palette of a site type (portfolio, studio, business and so on) or an awwwards category, to compare colours across sites of one kind, or to pick background, text and accent combinations from researched sites. Needs a design-research folder made by the design-probe skill. Not for measuring sites (use design-probe) and not for applying a palette to code.
---

# Category palette

Turns the per-site colour data in `design-research/` into one palette per category: the backgrounds, text colours and accents that sites of that kind share, and ready-to-use combinations of them. All the work is done by `scripts/palette.mjs` (Node 18+, no dependencies) so every category is built the same way.

## 1. Check the input

Each site folder needs `styles.json` and `overview.md` from the design-probe skill.

- To group by site type, every overview needs a filled-in `- Type:` line. Sites still showing `_TODO_` appear only under All sites, and the README says how many.
- Sites whose Character paragraph starts with `Failed capture` are left out, because their colours describe an error page. Mark any capture like that before running.

## 2. Build the palettes

```bash
node <skill>/scripts/palette.mjs design-research type
node <skill>/scripts/palette.mjs design-research awwwards
```

`type` groups by the Type line (one category per site). `awwwards` groups by the awwwards categories in `styles.json`, where one site can sit in several. Each run writes `design-research/palettes/<grouping>/`:

| File | Holds |
| --- | --- |
| `README.md` | One row per category: site count, top background, text and accent, and how many mixes were seen on a real site |
| `<category>.md` | Main backgrounds, second backgrounds, text colours, accents, and the mix-and-match table, each with the sites they came from |
| `<category>.svg` | The same palette as swatches and sample cards, shown at the top of the Markdown file |

Re-running overwrites these files. They are generated, so do not hand-edit them.

## 3. How the palette is built

- **Roles per site.** The main background is the colour with the most painted area. Second backgrounds are other backgrounds covering at least 5% that look different. Text colours are those used for at least 5% of characters. Accents are any colour with real saturation (OKLab chroma 0.06 or more) used anywhere at 1% or more, except very dark ones, which read as tinted blacks. Translucent colours are mixed onto the site's main background first, so `#ffffff80` on black becomes a mid grey.
- **Shared colours.** Colours that look alike are merged in OKLab, with lightness corrected so near-blacks are compared fairly (distance under 0.05; 0.08 for accents). Each merged colour is named by its most used exact shade, and counts how many sites use it, not how often.
- **Mix and match.** For each of the four most common backgrounds it picks a main text colour at 7:1 contrast or more where one exists, never below 4.5:1 (WCAG AA for body text), a muted secondary text between 3:1 and 7:1, and up to two accents at 3:1 or more. Colours that appear together on the same site are picked first. A combination no single site uses is labelled a remix and names the sites each colour came from.

## 4. Check and report

Open the category file and its SVG. Before recommending a palette:

- Say when a category has fewer than three sites; the file flags it, and the colours are examples, not a pattern.
- Look at the site overviews behind a surprising colour. A canvas or video often paints over the CSS background, and the overview's Character paragraph says so; that colour is then the layer underneath, not what visitors see.
- Prefer combinations seen on a real site; treat remixes as starting points to try.

When asked for one category, report its top background, text and accent with site counts, and two or three combinations with their contrast ratios and sources. Leave generated files uncommitted unless asked.

## Limits

- Contrast is checked against the main background only. Text that sits on photos, video or second backgrounds is not checked.
- Colours come from CSS. Images, video and WebGL are not sampled, so photo-led sites look more neutral than they are.
- One-screen captures contribute only their first screen's colours.
- The merge distances are fixed. Two clearly different shades can merge, and the table's Merged shades column shows what went into each colour.
