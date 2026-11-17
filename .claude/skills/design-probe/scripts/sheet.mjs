#!/usr/bin/env node
// Puts the first screen of several measured sites on one image so many captures can be checked at a glance,
// and prints each site's key numbers next to it.
//   node sheet.mjs <researchDir> <fromRank> <toRank> <out.png>
// Sites are picked by their rank in styles.json (sites measured from a plain URL have no rank).
import { readFileSync, readdirSync, existsSync, writeFileSync } from 'node:fs';
import { join, resolve, dirname } from 'node:path';
import { execFileSync } from 'node:child_process';

const CHROME = process.env.CHROME_PATH || '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome';
const [dir, from, to, out] = process.argv.slice(2);
if (!out) { console.error('usage: sheet.mjs <researchDir> <fromRank> <toRank> <out.png>'); process.exit(2); }
const R = resolve(dir);
const sites = readdirSync(R).filter(f => existsSync(join(R, f, 'styles.json')))
  .map(f => ({ f, d: JSON.parse(readFileSync(join(R, f, 'styles.json'), 'utf8')) }))
  .filter(s => s.d.listing?.rank >= +from && s.d.listing.rank <= +to)
  .sort((a, b) => a.d.listing.rank - b.d.listing.rank);

const esc = s => String(s).replace(/[&<>"]/g, c => `&#${c.charCodeAt(0)};`);
const cells = sites.map(s => `<figure><div style="background-image:url('file://${encodeURI(join(R, s.f, 'screenshot.jpg'))}')"></div><figcaption>${s.d.listing.rank}. ${esc(s.d.listing.title)} — ${esc(s.f)}</figcaption></figure>`).join('');
const page = resolve(dirname(resolve(out)), '.sheet.html');
writeFileSync(page, `<html><body style="margin:0;background:#888;font:bold 16px sans-serif;display:grid;grid-template-columns:720px 720px;gap:8px">${cells}<style>figure{margin:0}figure div{width:720px;height:450px;background:#fff top/720px auto no-repeat}figcaption{padding:4px;background:#ff0;color:#000}</style></body></html>`);
execFileSync(CHROME, ['--headless=new', '--allow-file-access-from-files', '--hide-scrollbars', `--screenshot=${resolve(out)}`, `--window-size=1448,${Math.ceil(sites.length / 2) * 486}`, 'file://' + page], { stdio: 'ignore' });

const pct = l => l.filter(x => x.share >= 0.03).map(x => `${x.value} ${Math.round(x.share * 100)}%`).join(', ');
for (const { f, d } of sites) {
  const t = d.typography.scale, disp = [...t].sort((a, b) => b.size - a.size)[0];
  const st = x => `${x.family} ${x.size}/${x.weight}/${x.lineHeight}/${x.letterSpacing}${x.transform !== 'none' ? '/' + x.transform : ''}`;
  console.log(`\n## ${d.listing.rank}. ${d.listing.title} [${f}] ${d.listing.award || d.listing.source} | ${(d.listing.categories || []).join(', ')} | "${d.page.title}" h=${d.page.height} sections=${d.sections.length}`);
  console.log(`bg ${pct(d.palette.backgrounds)} | text ${pct(d.palette.text)} | grey ${Math.round(d.palette.monochromeShare.backgrounds * 100)}/${Math.round(d.palette.monochromeShare.text * 100)}`);
  console.log(`type ${t.slice(0, 4).map(st).join('; ')} | display ${disp ? st(disp) : '—'}`);
  console.log(`space ${d.spacing.slice(0, 7).map(s => s.px).join(',')} | radii ${d.radii.slice(0, 3).map(r => r.value).join(',') || '0'} | transition ${d.motion.transitions[0]?.value || '—'} | animated ${d.motion.cssAnimatedElements} canvas ${d.motion.canvases} video ${d.motion.videos} | ${d.tech.join(',')}`);
  console.log(`headings ${d.sections.flatMap(s => s.headings.map(h => `${h.text.slice(0, 50)} [${Math.round(h.size)}]`)).slice(0, 4).join(' | ')}`);
}
console.log(`\n${resolve(out)}: ${sites.length} sites`);
