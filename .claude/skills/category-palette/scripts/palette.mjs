#!/usr/bin/env node
// Shared colour palette per site category, built from design-probe output (styles.json + overview.md per site).
//   node palette.mjs <researchDir> [type|awwwards]  -> <researchDir>/palettes/<grouping>/{README.md, <category>.md, <category>.svg}
//   node palette.mjs --selftest
// No dependencies (Node 18+).
import { readFileSync, readdirSync, existsSync, writeFileSync, mkdirSync } from 'node:fs';
import { join } from 'node:path';
import assert from 'node:assert';

const NEUTRAL_JOIN = 0.05; // OKLab distance under which two backgrounds or text colours count as the same colour
const ACCENT_JOIN = 0.08; // accents merge more loosely, so close reds count as one red
const ACCENT_CHROMA = 0.06; // OKLab chroma above which a colour is an accent rather than a tinted neutral
const ACCENT_LIGHT = 0.25; // below this lightness a saturated colour reads as a tinted black, not an accent
const TEXT_MIN = 4.5, SECOND_MIN = 3, SECOND_MAX = 7, ACCENT_MIN = 3; // WCAG contrast: body text, muted text band, large text and UI parts

// ---- colour maths: every colour is a hex string
const rgba = h => { const n = [1, 3, 5, 7].map(i => parseInt(h.slice(i, i + 2) || 'ff', 16)); return [n[0], n[1], n[2], n[3] / 255]; };
const toHex = rgb => '#' + rgb.map(v => Math.round(v).toString(16).padStart(2, '0')).join('');
const over = (fg, bg) => { const [r, g, b, a] = rgba(fg), [R, G, B] = rgba(bg); return toHex([r * a + R * (1 - a), g * a + G * (1 - a), b * a + B * (1 - a)]); };
const lin = v => (v /= 255) <= 0.04045 ? v / 12.92 : ((v + 0.055) / 1.055) ** 2.4;
const luminance = h => { const [r, g, b] = rgba(h); return 0.2126 * lin(r) + 0.7152 * lin(g) + 0.0722 * lin(b); };
const contrast = (a, b) => { const [x, y] = [luminance(a), luminance(b)].sort((p, q) => q - p); return (x + 0.05) / (y + 0.05); };
const labCache = new Map();
const oklab = h => { // OKLab with the toe-corrected lightness (Lr), so near-blacks are not spread far apart
  if (labCache.has(h)) return labCache.get(h);
  const [r, g, b] = rgba(h), [R, G, B] = [r, g, b].map(lin);
  const l = Math.cbrt(0.4122214708 * R + 0.5363325363 * G + 0.0514459929 * B), m = Math.cbrt(0.2119034982 * R + 0.6806995451 * G + 0.1073969566 * B), s = Math.cbrt(0.0883024619 * R + 0.2817188376 * G + 0.6299787005 * B);
  const L = 0.2104542553 * l + 0.793617785 * m - 0.0040720468 * s, k1 = 0.206, k2 = 0.03, k3 = (1 + k1) / (1 + k2);
  const v = [(k3 * L - k1 + Math.sqrt((k3 * L - k1) ** 2 + 4 * k2 * k3 * L)) / 2, 1.9779984951 * l - 2.428592205 * m + 0.4505937099 * s, 0.0259040371 * l + 0.7827717662 * m - 0.808675766 * s];
  labCache.set(h, v); return v;
};
const dist = (a, b) => { const p = oklab(a), q = oklab(b); return Math.hypot(p[0] - q[0], p[1] - q[1], p[2] - q[2]); };
const chroma = h => Math.hypot(oklab(h)[1], oklab(h)[2]);
const isAccent = h => chroma(h) >= ACCENT_CHROMA && oklab(h)[0] >= ACCENT_LIGHT;
const ink = h => contrast(h, '#000000') >= contrast(h, '#ffffff') ? '#000000' : '#ffffff';

// ---- per site: which colour plays which role. Translucent colours are mixed onto the site's main background first.
function roles(d) {
  const p = d.palette, ground = over(p.backgrounds[0]?.value || '#ffffff', '#ffffff');
  const flat = list => list.map(c => ({ hex: over(c.value, ground), share: c.share }));
  return {
    ground,
    surfaces: [...new Set(flat(p.backgrounds.slice(1)).filter(c => c.share >= 0.05 && dist(c.hex, ground) >= NEUTRAL_JOIN).map(c => c.hex))],
    text: [...new Set(flat(p.text).filter(c => c.share >= 0.05).map(c => c.hex))],
    accents: [...new Set(flat([...p.backgrounds, ...p.text, ...p.borders]).filter(c => c.share >= 0.01 && isAccent(c.hex) && dist(c.hex, ground) >= ACCENT_JOIN).map(c => c.hex))],
  };
}

function loadSites(dir) {
  return readdirSync(dir).filter(f => existsSync(join(dir, f, 'styles.json')) && existsSync(join(dir, f, 'overview.md'))).map(f => {
    const d = JSON.parse(readFileSync(join(dir, f, 'styles.json'), 'utf8')), md = readFileSync(join(dir, f, 'overview.md'), 'utf8');
    const type = md.match(/^- Type: (.+)$/m)?.[1].trim();
    return { f, d, title: d.listing?.title || d.page.title || f, type: type?.includes('_TODO') ? null : type, failed: /## Character\n\nFailed capture/.test(md), partial: d.page.height <= d.page.viewport[1] * 1.2, ...roles(d) };
  });
}

// merge look-alike colours; a cluster is named by its most used exact colour and counts sites, not uses
function cluster(entries, join) {
  const freq = new Map();
  for (const e of entries) freq.set(e.hex, (freq.get(e.hex) || 0) + 1);
  const groups = [];
  for (const e of [...entries].sort((a, b) => freq.get(b.hex) - freq.get(a.hex) || a.hex.localeCompare(b.hex))) {
    const g = groups.find(g => dist(g.hex, e.hex) < join);
    g ? g.entries.push(e) : groups.push({ hex: e.hex, entries: [e] });
  }
  return groups.map(g => ({ hex: g.hex, members: [...new Set(g.entries.map(e => e.hex))], sites: [...new Set(g.entries.map(e => e.site))] }))
    .sort((a, b) => b.sites.length - a.sites.length || luminance(a.hex) - luminance(b.hex));
}

function build(sites) {
  const pool = role => sites.flatMap(s => [].concat(s[role]).map(hex => ({ hex, site: s })));
  const grounds = cluster(pool('ground'), NEUTRAL_JOIN), surfaces = cluster(pool('surfaces'), NEUTRAL_JOIN);
  const text = cluster(pool('text'), NEUTRAL_JOIN), accents = cluster(pool('accents'), ACCENT_JOIN);
  const together = (...gs) => sites.filter(s => gs.every(g => g.sites.includes(s)));
  // mix and match: for each common ground, the best-supported text, secondary text and accents that pass contrast
  const combos = [];
  for (const g of grounds.slice(0, 4)) {
    const rank = list => [...list].sort((a, b) => together(g, b).length - together(g, a).length || b.sites.length - a.sites.length);
    // main text: strong (above the muted band) when any is available, otherwise the best that still passes AA
    const main = rank(text.filter(t => contrast(t.hex, g.hex) >= SECOND_MAX))[0] || rank(text.filter(t => contrast(t.hex, g.hex) >= TEXT_MIN))[0];
    if (!main) continue;
    // secondary = a visibly muted tone: readable, but clearly softer than the main text
    const second = rank(text.filter(t => t !== main && contrast(t.hex, g.hex) >= SECOND_MIN && contrast(t.hex, g.hex) < Math.min(SECOND_MAX, contrast(main.hex, g.hex))))[0];
    const acc = rank(accents.filter(a => contrast(a.hex, g.hex) >= ACCENT_MIN && dist(a.hex, main.hex) >= ACCENT_JOIN)).slice(0, 2);
    for (const accent of [null, ...acc]) combos.push({ ground: g, text: main, second, accent, seen: together(g, main, ...(accent ? [accent] : [])) });
  }
  return { sites, grounds, surfaces, text, accents, combos };
}

// ---- output
const esc = s => String(s).replace(/[&<>"]/g, c => `&#${c.charCodeAt(0)};`);
const slug = s => s.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');
const link = s => `[${s.title.replace(/[[\]|]/g, '')}](../../${s.f}/overview.md)`;
const some = (list, n = 4) => list.slice(0, n).map(link).join(', ') + (list.length > n ? ` and ${list.length - n} more` : '');
const code = h => `\`${h}\``;
const ratio = (a, b) => contrast(a, b).toFixed(1);

function render(cat, p, failed, file) {
  const n = p.sites.length, partial = p.sites.filter(s => s.partial).length, g1 = p.grounds[0]?.hex, g2 = p.grounds[1]?.hex;
  const table = (head, rows) => rows.length ? `| ${head.join(' | ')} |\n| ${head.map(() => '---').join(' | ')} |\n${rows.map(r => `| ${r.join(' | ')} |`).join('\n')}\n` : '_None in this category._\n';
  const merged = c => c.members.filter(m => m !== c.hex).slice(0, 4).map(code).join(', ') || '—';
  const source = c => c.seen.length ? `seen on ${some(c.seen, 2)}` : `remix: ground from ${link(c.ground.sites[0])}, text from ${link(c.text.sites[0])}${c.accent ? `, accent from ${link(c.accent.sites[0])}` : ''}`;
  return `# ${cat} palette

${n} site${n === 1 ? '' : 's'}${n < 3 ? ' (too few to call a pattern: read these as examples)' : ''}. ${partial} of them were captured as one screen only, so their colours come from the first screen.${failed.length ? ` Left out as failed captures: ${failed.map(link).join(', ')}.` : ''}

Colours that look alike are merged and named by the most used shade; the counts are sites, not uses. Translucent colours are mixed onto each site's main background first.

![${cat} palette](${file}.svg)

## Main backgrounds

${table(['Colour', 'Sites', 'Merged shades', 'Seen on'], p.grounds.slice(0, 8).map(c => [code(c.hex), `${c.sites.length} of ${n}`, merged(c), some(c.sites)]))}
## Second backgrounds

Section and panel colours that differ from the site's main background.

${table(['Colour', 'Sites', 'Merged shades', 'Seen on'], p.surfaces.slice(0, 8).map(c => [code(c.hex), `${c.sites.length} of ${n}`, merged(c), some(c.sites)]))}
## Text colours

${table(['Colour', 'Sites', ...(g1 ? [`Contrast on ${code(g1)}`] : []), ...(g2 ? [`Contrast on ${code(g2)}`] : []), 'Seen on'], p.text.slice(0, 8).map(c => [code(c.hex), `${c.sites.length} of ${n}`, ...(g1 ? [ratio(c.hex, g1)] : []), ...(g2 ? [ratio(c.hex, g2)] : []), some(c.sites)]))}
## Accent colours

Any colour with real saturation (OKLab chroma ${ACCENT_CHROMA} or more) that is not near-black, wherever the site uses it.

${table(['Colour', 'Sites', 'Merged shades', 'Seen on'], p.accents.slice(0, 8).map(c => [code(c.hex), `${c.sites.length} of ${n}`, merged(c), some(c.sites)]))}
## Mix and match

For each of the most common backgrounds: a main text colour at ${SECOND_MAX}:1 or more where one exists (never below ${TEXT_MIN}:1, WCAG AA body text), a muted secondary text between ${SECOND_MIN}:1 and ${SECOND_MAX}:1, and up to two accents at ${ACCENT_MIN}:1 or more (large text and UI parts). Colours that appear together on the same site are picked first; a remix borrows colours from different sites in this category.

${table(['#', 'Background', 'Text', 'Secondary', 'Accent', 'Contrast text / secondary / accent', 'Source'], p.combos.map((c, i) => [i + 1, code(c.ground.hex), code(c.text.hex), c.second ? code(c.second.hex) : '—', c.accent ? code(c.accent.hex) : '—', [c.text, c.second, c.accent].map(x => x ? ratio(x.hex, c.ground.hex) : '—').join(' / '), source(c)]))}`;
}

function svg(cat, p) {
  const W = 960, rows = [];
  let y = 56;
  const chips = (title, list) => {
    rows.push(`<text x="24" y="${y}" font-size="15" font-weight="600" fill="#111">${esc(title)}</text>`); y += 12;
    if (!list.length) { rows.push(`<text x="24" y="${y + 20}" font-size="13" fill="#666">None</text>`); y += 44; return; }
    list.slice(0, 8).forEach((c, i) => {
      const x = 24 + i * 114;
      rows.push(`<rect x="${x}" y="${y}" width="104" height="64" rx="6" fill="${c.hex}" stroke="#00000022"/><text x="${x + 8}" y="${y + 26}" font-size="13" fill="${ink(c.hex)}">${c.hex}</text><text x="${x + 8}" y="${y + 46}" font-size="12" fill="${ink(c.hex)}" opacity=".75">${c.sites.length} site${c.sites.length === 1 ? '' : 's'}</text>`);
    });
    y += 92;
  };
  chips('Main backgrounds', p.grounds); chips('Text colours', p.text); chips('Accent colours', p.accents);
  rows.push(`<text x="24" y="${y}" font-size="15" font-weight="600" fill="#111">Mix and match</text>`); y += 12;
  p.combos.forEach((c, i) => {
    const x = 24 + (i % 4) * 232, top = y + Math.floor(i / 4) * 150;
    rows.push(`<rect x="${x}" y="${top}" width="220" height="110" rx="8" fill="${c.ground.hex}" stroke="#00000022"/><text x="${x + 14}" y="${top + 52}" font-size="38" font-weight="600" fill="${c.text.hex}">Aa</text><text x="${x + 84}" y="${top + 38}" font-size="13" fill="${c.text.hex}">Main text</text>${c.second ? `<text x="${x + 84}" y="${top + 58}" font-size="13" fill="${c.second.hex}">Secondary</text>` : ''}${c.accent ? `<rect x="${x + 14}" y="${top + 78}" width="72" height="12" rx="6" fill="${c.accent.hex}"/>` : ''}<text x="${x}" y="${top + 130}" font-size="12" fill="#444">${i + 1}. ${[c.ground, c.text, c.accent].filter(Boolean).map(z => z.hex).join(' · ')}${c.seen.length ? '' : ' (remix)'}</text>`);
  });
  y += Math.ceil(p.combos.length / 4) * 150 + 8;
  return `<svg xmlns="http://www.w3.org/2000/svg" width="${W}" height="${y}" viewBox="0 0 ${W} ${y}" font-family="Helvetica, Arial, sans-serif"><rect width="100%" height="100%" fill="#fff"/><text x="24" y="32" font-size="20" font-weight="700" fill="#111">${esc(cat)} palette · ${p.sites.length} site${p.sites.length === 1 ? '' : 's'}</text>${rows.join('')}</svg>\n`;
}

function run(dir, by) {
  const all = loadSites(dir), sites = all.filter(s => !s.failed), failed = all.filter(s => s.failed);
  const catsOf = s => by === 'type' ? [s.type].filter(Boolean) : s.d.listing?.categories || [];
  const cats = new Map();
  for (const s of sites) for (const c of catsOf(s)) cats.set(c, [...(cats.get(c) || []), s]);
  const out = join(dir, 'palettes', by), summary = [];
  mkdirSync(out, { recursive: true });
  for (const [cat, list] of [['All sites', sites], ...[...cats].sort((a, b) => b[1].length - a[1].length || a[0].localeCompare(b[0]))]) {
    const p = build(list), file = slug(cat);
    writeFileSync(join(out, file + '.md'), render(cat, p, cat === 'All sites' ? failed : failed.filter(s => catsOf(s).includes(cat)), file));
    writeFileSync(join(out, file + '.svg'), svg(cat, p));
    summary.push(`| [${cat}](${file}.md) | ${list.length} | ${[p.grounds, p.text, p.accents].map(l => l[0] ? `\`${l[0].hex}\` (${l[0].sites.length})` : '—').join(' | ')} | ${p.combos.filter(c => c.seen.length).length} of ${p.combos.length} |`);
  }
  const untyped = by === 'type' ? sites.filter(s => !s.type) : [];
  writeFileSync(join(out, 'README.md'), `# Shared palettes by ${by === 'type' ? 'site type' : 'awwwards category'}

Built from ${sites.length} measured sites with \`palette.mjs ${dir} ${by}\`.${failed.length ? ` ${failed.length} failed capture${failed.length === 1 ? ' is' : 's are'} left out.` : ''}${untyped.length ? ` ${untyped.length} site${untyped.length === 1 ? ' has' : 's have'} no Type yet and appear only under All sites.` : ''}${by === 'awwwards' ? ' A site can sit in several awwwards categories.' : ''}

| Category | Sites | Top background (sites) | Top text (sites) | Top accent (sites) | Mixes seen on a real site |
| --- | --- | --- | --- | --- | --- |
${summary.join('\n')}
`);
  console.log(`${out}: ${summary.length} palettes from ${sites.length} sites (${failed.length} failed left out)`);
}

function selftest() {
  assert.equal(contrast('#000000', '#ffffff').toFixed(1), '21.0');
  assert.equal(over('#ffffff80', '#000000'), '#808080');
  assert.ok(dist('#000000', '#020202') < NEUTRAL_JOIN && dist('#ffffff', '#fafafa') < NEUTRAL_JOIN && dist('#000000', '#ffffff') > 0.9);
  assert.ok(isAccent('#ff0000') && isAccent('#0755bb') && !isAccent('#f6f4e9') && !isAccent('#777777') && !isAccent('#00031f'));
  const site = (f, ground, text, accents = []) => ({ f, title: f, ground, surfaces: [], text, accents });
  const p = build([site('a', '#000000', ['#ffffff'], ['#ff0000']), site('b', '#020202', ['#fafafa', '#777777']), site('c', '#ffffff', ['#111111'], ['#0000ff'])]);
  assert.equal(p.grounds[0].hex, '#000000');
  assert.equal(p.grounds[0].sites.length, 2); // #020202 counts as black
  assert.ok(p.combos.every(c => contrast(c.text.hex, c.ground.hex) >= TEXT_MIN && (!c.accent || contrast(c.accent.hex, c.ground.hex) >= ACCENT_MIN)));
  assert.ok(p.combos.some(c => c.accent?.hex === '#ff0000' && c.seen.map(s => s.f).join() === 'a')); // black, white and red were seen together on a
  assert.ok(p.combos.some(c => c.second?.hex === '#777777'));
  // a grey used on more sites must not displace black as the main text on white
  const q = build([site('w1', '#ffffff', ['#666666']), site('w2', '#ffffff', ['#666666']), site('w3', '#ffffff', ['#000000', '#666666'])]);
  assert.equal(q.combos[0].text.hex, '#000000');
  assert.equal(q.combos[0].second.hex, '#666666');
  const md = render('Test & co', p, [], 'test');
  assert.ok(md.includes('## Mix and match') && md.includes('remix') && svg('Test & co', p).includes('Test &#38; co'));
  console.log('selftest ok');
}

const [a, b = 'type'] = process.argv.slice(2);
if (a === '--selftest') selftest();
else if (a && existsSync(a) && ['type', 'awwwards'].includes(b)) run(a, b);
else { console.error('usage: palette.mjs <researchDir> [type|awwwards] | --selftest'); process.exit(2); }
