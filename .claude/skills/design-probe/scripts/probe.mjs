#!/usr/bin/env node
// Measures a live page's design with headless Chrome. No dependencies (Node 22+ and Chrome).
//   node probe.mjs <url> <outDir>          -> <outDir>/<host>/{styles.json,overview.md,screenshot.jpg}
//   node probe.mjs --winners <listUrl> [n] -> JSON list of the newest n SOTD/HM sites on an awwwards list page
//   node probe.mjs --links <listUrl> [n]   -> JSON list of the first n outside sites linked from any gallery page
//   node probe.mjs --add <sites.json> <more.json> -> append new sites to the master list, renumbering ranks
//   node probe.mjs --selftest
import { spawn } from 'node:child_process';
import { mkdtempSync, mkdirSync, writeFileSync, rmSync, readFileSync, existsSync, readdirSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { join } from 'node:path';
import assert from 'node:assert';

const CHROME = process.env.CHROME_PATH || '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome';
const W = 1440, H = 900;
const sleep = ms => new Promise(r => setTimeout(r, ms));
const timeout = (p, ms, what) => Promise.race([p, sleep(ms).then(() => { throw new Error(`${what} timed out after ${ms / 1000}s`); })]);

// ---- runs inside the page -------------------------------------------------
async function inPage() {
  const sleep = ms => new Promise(r => setTimeout(r, ms));
  const vw = innerWidth, vh = innerHeight;
  const docH = () => Math.max(document.documentElement.scrollHeight, document.body.scrollHeight);
  // drop well-known consent dialogs from the DOM (nothing is clicked, so no consent is given)
  document.querySelectorAll('#CybotCookiebotDialog, #CybotCookiebotDialogBodyUnderlay, #onetrust-consent-sdk, #usercentrics-root, #didomi-host, .cky-consent-container, .cky-overlay, #cookie-law-info-bar, .iubenda-cs-container, #cmpbox, #cmpbox2').forEach(e => e.remove());
  // scroll the whole page once so lazy and scroll-revealed content renders
  for (let y = 0, i = 0; y < docH() - vh && i < 40; y += vh, i++) { scrollTo(0, y); await sleep(250); }
  scrollTo(0, 0); await sleep(800);

  const cv = document.createElement('canvas'); cv.width = cv.height = 1;
  const ctx = cv.getContext('2d', { willReadFrequently: true }), hexCache = new Map();
  const hex = c => { // any CSS colour (rgb, color(), oklch, ...) -> #rrggbb or #rrggbbaa by painting one pixel; null when transparent
    if (!c) return null;
    if (hexCache.has(c)) return hexCache.get(c);
    ctx.clearRect(0, 0, 1, 1); ctx.fillStyle = '#000'; ctx.fillStyle = c; ctx.fillRect(0, 0, 1, 1);
    const [r, g, b, a] = ctx.getImageData(0, 0, 1, 1).data;
    const v = a < 13 ? null : '#' + [r, g, b, ...(a < 255 ? [a] : [])].map(n => n.toString(16).padStart(2, '0')).join('');
    hexCache.set(c, v); return v;
  };
  const tally = () => { const m = new Map(); return { add: (k, n = 1) => { if (k != null) m.set(k, (m.get(k) || 0) + n); }, top: (n = 12) => [...m].sort((a, b) => b[1] - a[1]).slice(0, n) }; };
  const share = t => { const all = t.top(1e4), sum = all.reduce((s, x) => s + x[1], 0) || 1; return all.slice(0, 12).map(([value, n]) => ({ value, share: +(n / sum).toFixed(3) })); };
  const visible = el => { const r = el.getBoundingClientRect(), s = getComputedStyle(el); return r.width > 1 && r.height > 1 && s.display !== 'none' && s.visibility !== 'hidden'; };
  const px = v => Math.round(parseFloat(v) * 100) / 100;
  const family = s => s.fontFamily.split(',')[0].replace(/["']/g, '').trim();
  const type = s => ({ family: family(s), size: px(s.fontSize), weight: s.fontWeight, lineHeight: s.lineHeight === 'normal' ? 'normal' : +(parseFloat(s.lineHeight) / parseFloat(s.fontSize)).toFixed(2), letterSpacing: s.letterSpacing === 'normal' ? 0 : +(parseFloat(s.letterSpacing) / parseFloat(s.fontSize)).toFixed(3), transform: s.textTransform });
  const typeKey = s => JSON.stringify(type(s));
  const bgOf = el => { for (let e = el; e; e = e.parentElement) { const h = hex(getComputedStyle(e).backgroundColor); if (h) return h; } return '#ffffff'; };
  const clip = (t, n) => { t = t.replace(/\s+/g, ' ').trim(); return t.length > n ? t.slice(0, n - 1) + '…' : t; };
  const textNodes = root => { const w = document.createTreeWalker(root, NodeFilter.SHOW_TEXT), out = []; for (let n; (n = w.nextNode()) && out.length < 20000;) { if (n.data.trim() && n.parentElement && !/^(SCRIPT|STYLE|NOSCRIPT)$/.test(n.parentElement.tagName) && visible(n.parentElement)) out.push(n); } return out; };

  // ---- site-wide tokens
  const bg = tally(), fg = tally(), border = tally(), types = tally(), spacing = tally(), radii = tally(), motion = tally();
  let animated = 0;
  for (const el of [...document.querySelectorAll('body, body *')].slice(0, 15000)) {
    if (!visible(el)) continue;
    const s = getComputedStyle(el), r = el.getBoundingClientRect();
    bg.add(hex(s.backgroundColor), Math.min(r.width, vw) * r.height); // painted area, nested boxes count twice
    if (parseFloat(s.borderTopWidth) > 0) border.add(hex(s.borderTopColor));
    for (const p of ['paddingTop', 'paddingBottom', 'paddingLeft', 'paddingRight', 'marginTop', 'marginBottom', 'rowGap', 'columnGap']) { const v = Math.round(parseFloat(s[p])); if (v > 0) spacing.add(v); }
    if (parseFloat(s.borderTopLeftRadius) > 0) radii.add(s.borderTopLeftRadius);
    if (/[1-9]/.test(s.transitionDuration)) motion.add(`${s.transitionDuration.split(',')[0]} ${s.transitionTimingFunction.split(/,(?![^(]*\))/)[0]}`);
    if (s.animationName !== 'none') animated++;
  }
  for (const n of textNodes(document.body)) { const s = getComputedStyle(n.parentElement), len = n.data.trim().length; fg.add(hex(s.color), len); types.add(typeKey(s), len); }

  const vars = {}, breakpoints = tally();
  const walk = rules => { for (const r of rules) {
    if (r.media) for (const m of r.media.mediaText.matchAll(/(min|max)-width:\s*([\d.]+(?:px|em|rem))/g)) breakpoints.add(`${m[1]} ${m[2]}`);
    if (r.selectorText && /(^|,)\s*(:root|html|body)\s*(,|$)/.test(r.selectorText)) for (const p of r.style) if (p.startsWith('--') && Object.keys(vars).length < 80) vars[p] = r.style.getPropertyValue(p).trim().slice(0, 80);
    if (r.cssRules) walk(r.cssRules);
  } };
  for (const sh of document.styleSheets) { try { walk(sh.cssRules); } catch { /* cross-origin sheet: rules unreadable */ } }

  // ---- sections: descend from body, splitting any block taller than two screens
  const blocks = el => [...el.children].filter(c => { if (!visible(c)) return false; const r = c.getBoundingClientRect(); return r.height >= 60 && r.width >= vw * 0.5; });
  const split = (el, depth = 0) => blocks(el).flatMap(c => { const kids = blocks(c); return depth < 8 && kids.length && (c.offsetHeight > vh * 2 || kids.length === 1 && kids[0].offsetHeight > vh * 2 || c.tagName === 'MAIN') ? split(c, depth + 1) : [c]; });
  let els = split(document.body);
  if (!els.length) els = [document.body];
  const sections = els.slice(0, 40).map((el, i) => {
    const s = getComputedStyle(el), r = el.getBoundingClientRect();
    // first grid/flex box with 2+ visible children = the section's column layout
    let layout = null, area = 0;
    for (let q = [[el, 0]]; q.length;) { const [e, d] = q.shift(), es = getComputedStyle(e), kids = [...e.children].filter(visible), a = e.offsetWidth * e.offsetHeight;
      if (/grid|flex/.test(es.display) && kids.length > 1 && a > area) area = a, layout = { display: es.display, direction: es.display.includes('flex') ? es.flexDirection : undefined, columns: es.display.includes('grid') ? es.gridTemplateColumns.split(/\s+(?![^(]*\))/).length : undefined, gap: es.gap, justify: es.justifyContent, align: es.alignItems, children: kids.length, childWidthsPct: kids.slice(0, 8).map(k => Math.round(k.getBoundingClientRect().width / vw * 100)) };
      if (d < 4) q.push(...kids.map(k => [k, d + 1])); }
    const nodes = textNodes(el), st = tally(), col = tally();
    let left = vw, right = 0, top = Infinity, bottom = -Infinity, longest = '';
    for (const n of nodes) { const p = n.parentElement, ps = getComputedStyle(p), pr = p.getBoundingClientRect(), t = n.data.trim();
      st.add(typeKey(ps), t.length); col.add(hex(ps.color), t.length);
      if (pr.left >= 0 && pr.right <= vw) { left = Math.min(left, pr.left); right = Math.max(right, pr.right); top = Math.min(top, pr.top); bottom = Math.max(bottom, pr.bottom); }
      if (t.length > longest.length) longest = t; }
    let heads = [...el.querySelectorAll('h1,h2,h3,h4')].filter(visible).slice(0, 4);
    if (!heads.length && nodes.length) heads = [nodes.map(n => n.parentElement).sort((a, b) => parseFloat(getComputedStyle(b).fontSize) - parseFloat(getComputedStyle(a).fontSize))[0]];
    const words = nodes.reduce((n, t) => n + t.data.trim().split(/\s+/).length, 0);
    const body = st.top(1)[0];
    return {
      i: i + 1, tag: el.tagName.toLowerCase(), name: el.id || el.getAttribute('aria-label') || [...el.classList].slice(0, 2).join('.') || null,
      y: Math.round(r.top + scrollY), height: Math.round(r.height), position: s.position,
      background: bgOf(el), backgroundImage: s.backgroundImage !== 'none', color: col.top(1)[0]?.[0] || hex(s.color),
      padding: s.padding, margin: s.margin, border: parseFloat(s.borderTopWidth) || parseFloat(s.borderBottomWidth) ? `${s.borderTopWidth} ${s.borderTopStyle} ${hex(s.borderTopColor)}` : null,
      content: nodes.length ? { gutterLeft: Math.round(left), gutterRight: Math.round(vw - right), width: Math.round(right - left), gutterTop: Math.round(top - r.top), gutterBottom: Math.round(r.bottom - bottom) } : null,
      layout,
      headings: heads.map(h => ({ tag: h.tagName.toLowerCase(), text: clip(h.innerText || h.textContent, 80), ...type(getComputedStyle(h)), color: hex(getComputedStyle(h).color) })),
      bodyType: body ? JSON.parse(body[0]) : null,
      labels: [...new Set([...el.querySelectorAll('a,button')].filter(visible).map(a => clip(a.innerText || '', 40)).filter(Boolean))].slice(0, 10),
      words, excerpt: clip(longest.split(/\s+/).slice(0, 12).join(' '), 90), // short excerpt only, not the site's copy
      media: Object.fromEntries(['img', 'video', 'canvas', 'svg', 'iframe'].map(t => [t, el.querySelectorAll(t).length]).filter(x => x[1])),
    };
  });

  const mono = list => +list.filter(c => { const [r, g, b] = [1, 3, 5].map(i => parseInt(c.value.slice(i, i + 2), 16)); return Math.max(r, g, b) - Math.min(r, g, b) <= 16; }).reduce((s, c) => s + c.share, 0).toFixed(3);
  const backgrounds = share(bg), text = share(fg);
  const w = window, html = document.documentElement;
  return {
    page: { url: location.href, title: document.title, description: document.querySelector('meta[name=description]')?.content || null, lang: html.lang || null, viewport: [vw, vh], height: docH(), generator: document.querySelector('meta[name=generator]')?.content || null },
    palette: { backgrounds, text, borders: share(border), monochromeShare: { backgrounds: mono(backgrounds), text: mono(text) } },
    typography: { scale: types.top(14).map(([k, chars]) => ({ ...JSON.parse(k), chars })), loadedFonts: [...new Set([...document.fonts].filter(f => f.status === 'loaded').map(f => `${f.family.replace(/["']/g, '')} ${f.weight} ${f.style}`))].slice(0, 30) },
    spacing: spacing.top(16).map(([px, uses]) => ({ px, uses })),
    radii: radii.top(6).map(([value, uses]) => ({ value, uses })),
    motion: { transitions: motion.top(6).map(([value, uses]) => ({ value, uses })), cssAnimatedElements: animated, canvases: document.querySelectorAll('canvas').length, videos: document.querySelectorAll('video').length },
    cssVariables: vars, breakpoints: breakpoints.top(10).map(x => x[0]),
    tech: Object.entries({ gsap: w.gsap, lenis: w.lenis || html.classList.contains('lenis'), three: w.THREE || w.__THREE__, next: w.__NEXT_DATA__ || w.next, nuxt: w.__NUXT__, webflow: html.dataset.wfSite, framer: document.querySelector('[data-framer-hydrate-v2],#__framer-badge-container,meta[name=generator][content*=Framer]'), shopify: w.Shopify, wordpress: document.querySelector('link[href*="wp-content"],meta[name=generator][content*=WordPress]'), barba: w.barba, locomotive: html.classList.contains('has-scroll-init') }).filter(x => x[1]).map(x => x[0]),
    sections,
  };
}

// newest SOTD/HM/SOTM/SOTY sites on an awwwards list page (awards cannot be combined with a tag in the URL)
async function winnersInPage(n) {
  // awwwards' own categories, as chosen by whoever submitted the site
  const CATEGORIES = new Set(['Architecture', 'Art & Illustration', 'Business & Corporate', 'Culture & Education', 'Design Agencies', 'E-Commerce', 'Events', 'Experimental', 'Fashion', 'Film & TV', 'Food & Drink', 'Games & Entertainment', 'Hotel / Restaurant', 'Institutions', 'Luxury', 'Magazine / Newspaper / Blog', 'Mobile & Apps', 'Music & Sound', 'Other', 'Photography', 'Portfolio', 'Promotional', 'Real Estate', 'Social responsibility', 'Sports', 'Startups', 'Technology', 'Web & Interactive']);
  const out = [];
  for (let p = 1; p <= 60 && out.length < n; p++) {
    const d = new DOMParser().parseFromString(await fetch(`${location.pathname}?page=${p}`).then(r => r.text()), 'text/html');
    const cards = d.querySelectorAll('li.js-collectable');
    if (!cards.length) break;
    for (const li of cards) {
      const award = [...li.querySelectorAll('[class*=budget]')].map(b => b.textContent.trim()).filter(t => /^(SOTD|HM|SOTM|SOTY)$/.test(t));
      const url = [...li.querySelectorAll('a[href^="http"]')].map(a => a.href).find(h => !h.includes('awwwards.com'));
      let tags = [];
      try { tags = JSON.parse(li.dataset.collectableModelValue).tags || []; } catch { /* card without model data */ }
      if (award.length && url && out.length < n && !out.some(o => o.url === url)) out.push({ rank: out.length + 1, title: li.querySelector('a[aria-label]')?.getAttribute('aria-label'), award: award.join('+'), url, source: 'awwwards', listing: location.origin + location.pathname, awwwards: 'https://www.awwwards.com' + li.querySelector('a[href^="/sites/"]')?.getAttribute('href'), categories: tags.filter(t => CATEGORIES.has(t)) });
    }
    await new Promise(r => setTimeout(r, 500)); // be gentle with awwwards
  }
  return out;
}

// outside sites linked from a gallery page whose cards link straight to the site (no awards to filter on)
async function linksInPage(n) {
  const sleep = ms => new Promise(r => setTimeout(r, ms));
  for (let i = 0; i < 6; i++) { scrollTo(0, document.documentElement.scrollHeight); await sleep(700); } // let lazy lists load
  // shortcut: last two labels as the site's own domain, wrong for co.uk-style hosts; use a suffix list if that matters
  const base = h => h.replace(/^www\./, '').split('.').slice(-2).join('.');
  const own = base(location.hostname);
  const SKIP = new Set('twitter.com x.com instagram.com facebook.com linkedin.com youtube.com youtu.be vimeo.com dribbble.com behance.net github.com pinterest.com tiktok.com threads.net threads.com bsky.app medium.com substack.com figma.com framer.com webflow.com squarespace.com wix.com apple.com google.com producthunt.com notion.so paypal.com patreon.com gumroad.com are.na t.me discord.gg discord.com spotify.com awwwards.com'.split(' '));
  const seen = new Set(), out = [];
  for (const a of document.querySelectorAll('a[href^="http"]')) {
    let u;
    try { u = new URL(a.href); } catch { continue; }
    const b = base(u.hostname);
    if (b === own || SKIP.has(b) || seen.has(u.hostname)) continue;
    seen.add(u.hostname);
    const title = (a.getAttribute('aria-label') || a.title || a.querySelector('img')?.alt || a.textContent || '').replace(/\s+/g, ' ').trim().slice(0, 80) || u.hostname;
    out.push({ rank: out.length + 1, title, url: u.origin + u.pathname, source: own, listing: location.href, categories: [] }); // query dropped: it is tracking on these links
    if (out.length >= n) break;
  }
  return out;
}

// ---- Chrome over the DevTools protocol -------------------------------------
async function withPage(url, fn) {
  const profile = mkdtempSync(join(tmpdir(), 'design-probe-'));
  const chrome = spawn(CHROME, ['--headless=new', '--remote-debugging-port=0', `--user-data-dir=${profile}`, `--window-size=${W},${H}`, '--hide-scrollbars', '--no-first-run', '--mute-audio', 'about:blank'], { stdio: ['ignore', 'ignore', 'pipe'] });
  try {
    const wsUrl = await timeout(new Promise((res, rej) => { let buf = ''; chrome.stderr.on('data', d => { buf += d; const m = buf.match(/DevTools listening on (ws:\/\/\S+)/); if (m) res(m[1]); }); chrome.on('error', rej); chrome.on('exit', () => rej(new Error('Chrome exited early: ' + buf.slice(0, 300)))); }), 20000, 'Chrome start');
    const ws = new WebSocket(wsUrl);
    await new Promise((res, rej) => { ws.onopen = res; ws.onerror = () => rej(new Error('DevTools socket failed')); });
    let id = 0, loaded = false, sessionId;
    const pending = new Map();
    ws.onmessage = e => { const m = JSON.parse(e.data); if (m.method === 'Page.loadEventFired') loaded = true; const p = pending.get(m.id); if (!p) return; pending.delete(m.id); m.error ? p.rej(new Error(m.error.message)) : p.res(m.result); };
    // every call is time-limited so a hung site cannot stall a batch; finally still kills Chrome
    const send = (method, params = {}, ms = 60000) => timeout(new Promise((res, rej) => { pending.set(++id, { res, rej }); ws.send(JSON.stringify({ id, method, params, sessionId })); }), ms, method);
    const ua = (await send('Browser.getVersion')).userAgent.replace('HeadlessChrome', 'Chrome');
    const { targetId } = await send('Target.createTarget', { url: 'about:blank' });
    ({ sessionId } = await send('Target.attachToTarget', { targetId, flatten: true }));
    await send('Page.enable');
    await send('Emulation.setDeviceMetricsOverride', { width: W, height: H, deviceScaleFactor: 1, mobile: false });
    await send('Emulation.setUserAgentOverride', { userAgent: ua });
    await send('Page.navigate', { url });
    for (let i = 0; i < 60 && !loaded; i++) await sleep(500); // carry on after 30s even if load never fires
    await sleep(4000); // preloaders and intro animations
    const evaluate = async (f, arg) => {
      const r = await send('Runtime.evaluate', { expression: `(${f})(${JSON.stringify(arg ?? null)})`, awaitPromise: true, returnByValue: true }, 150000);
      if (r.exceptionDetails) throw new Error('Page script failed: ' + (r.exceptionDetails.exception?.description || r.exceptionDetails.text));
      return r.result.value;
    };
    return await fn({ evaluate, send });
  } finally { chrome.kill(); await sleep(300); rmSync(profile, { recursive: true, force: true }); }
}

// ---- overview.md -------------------------------------------------------------
function render(d) {
  const pct = n => Math.round(n * 100) + '%';
  const t = x => `${x.family} ${x.size}px / ${x.weight} / lh ${x.lineHeight} / ls ${x.letterSpacing}em${x.transform !== 'none' ? ' / ' + x.transform : ''}`;
  const cell = s => String(s ?? '—').replace(/\|/g, '\\|').replace(/\n/g, ' ');
  const colours = (title, list) => `**${title}**\n\n| Colour | Share |\n| --- | --- |\n${list.filter(c => c.share >= 0.01).map(c => `| \`${c.value}\` | ${pct(c.share)} |`).join('\n') || '| — | — |'}\n`;
  const lay = l => l ? `${l.display}${l.columns ? ` ${l.columns} cols` : ''}${l.direction ? ` ${l.direction}` : ''}, gap ${l.gap}, ${l.children} items (${l.childWidthsPct.join('/')}% wide)` : 'block';
  return `# ${d.page.title || d.page.url}

${d.page.url} · measured at ${d.page.viewport.join('×')} · page height ${d.page.height}px${d.page.description ? `\n\n> ${d.page.description}` : ''}

- Type: _TODO: one type from the skill's list_
${d.listing ? `- Found on: ${d.listing.source}${d.listing.award ? ` · ${d.listing.award}` : ''}${d.listing.awwwards ? ` · [awwwards page](${d.listing.awwwards})` : ` · [list](${d.listing.listing})`}${d.listing.categories?.length ? ` · categories: ${d.listing.categories.join(', ')}` : ''}\n` : ''}- Capture: ${partial(d) ? '**partial**: the page is one screen tall, so anything that scrolls inside a canvas or fixed layer was not measured' : 'full page'}

## Character

_TODO: 3–5 sentences after looking at screenshot.jpg: overall feel, what makes it work, motion in words._

## Colour palette

Black/white/grey share: backgrounds ${pct(d.palette.monochromeShare.backgrounds)}, text ${pct(d.palette.monochromeShare.text)}.

${colours('Backgrounds (by painted area)', d.palette.backgrounds)}
${colours('Text (by characters)', d.palette.text)}
${colours('Borders (by count)', d.palette.borders)}
## Typography

Loaded fonts: ${d.typography.loadedFonts.join(', ') || 'system fonts only'}

| Family | Size | Weight | Line height | Letter spacing | Case | Characters |
| --- | --- | --- | --- | --- | --- | --- |
${d.typography.scale.map(x => `| ${cell(x.family)} | ${x.size}px | ${x.weight} | ${x.lineHeight} | ${x.letterSpacing}em | ${x.transform} | ${x.chars} |`).join('\n')}

## Spacing and shape

- Spacing values (px, most used first): ${d.spacing.map(s => `${s.px} (${s.uses})`).join(', ') || '—'}
- Corner radii: ${d.radii.map(r => `${r.value} (${r.uses})`).join(', ') || 'none'}
- Breakpoints: ${d.breakpoints.join(', ') || 'none readable'}

## Motion and tech

- Transitions: ${d.motion.transitions.map(m => `${m.value} (${m.uses})`).join('; ') || 'none'}
- CSS-animated elements: ${d.motion.cssAnimatedElements}, canvases: ${d.motion.canvases}, videos: ${d.motion.videos}
- Detected: ${d.tech.join(', ') || 'nothing recognised'}${d.page.generator ? ` · generator: ${d.page.generator}` : ''}
- CSS variables on :root: ${Object.keys(d.cssVariables).length} (see styles.json)

## Sections

| # | Section | Top / height | Background / text | Layout | Padding | Gutters L/R, T/B | Media |
| --- | --- | --- | --- | --- | --- | --- | --- |
${d.sections.map(s => `| ${s.i} | ${cell(`${s.tag}${s.name ? ' ' + s.name : ''}`)}${s.position !== 'static' && s.position !== 'relative' ? ` (${s.position})` : ''} | ${s.y} / ${s.height}px | \`${s.background}\` / \`${s.color}\` | ${cell(lay(s.layout))} | ${s.padding} | ${s.content ? `${s.content.gutterLeft}/${s.content.gutterRight}, ${s.content.gutterTop}/${s.content.gutterBottom}px` : '—'} | ${cell(Object.entries(s.media).map(([k, v]) => `${v} ${k}`).join(', ') || '—')} |`).join('\n')}

${d.sections.map(s => `### ${s.i}. ${s.tag}${s.name ? ' ' + s.name : ''}

${s.headings.map(h => `- Heading (${h.tag}): “${h.text}” — ${t(h)}, \`${h.color}\``).join('\n') || '- No heading text'}
- Body type: ${s.bodyType ? t(s.bodyType) : '—'}
- Labels: ${s.labels.join(' · ') || '—'}
- Copy: ${s.words} words${s.excerpt ? `, e.g. “${s.excerpt}”` : ''}
`).join('\n')}`;
}

const partial = d => d.page.height <= d.page.viewport[1] * 1.2;
const folder = url => { const u = new URL(url); return (u.hostname.replace(/^www\./, '') + u.pathname.replace(/\/+$/, '')).replace(/[^\w.-]+/g, '-'); };

async function probe(url, outDir, meta) {
  const dir = join(outDir, folder(url));
  mkdirSync(dir, { recursive: true });
  await withPage(url, async ({ evaluate, send }) => {
    const data = await evaluate(inPage);
    if (meta) data.listing = meta;
    writeFileSync(join(dir, 'styles.json'), JSON.stringify(data, null, 2));
    // re-measuring keeps the Type and Character an agent already wrote
    const f = join(dir, 'overview.md'), old = existsSync(f) ? readFileSync(f, 'utf8') : '';
    const type = old.match(/^- Type: (.+)$/m)?.[1], character = old.match(/## Character\n\n([\s\S]*?)\n\n## Colour/)?.[1];
    let md = render(data);
    if (type && !type.includes('_TODO')) md = md.replace(/^- Type: .+$/m, () => `- Type: ${type}`);
    if (character && !character.includes('_TODO')) md = md.replace(/_TODO: 3–5[^\n]*_/, () => character);
    writeFileSync(f, md);
    // shortcut: full-page shot capped at 10000px and half scale to keep files small; raise both for print-quality captures
    const shot = await send('Page.captureScreenshot', { format: 'jpeg', quality: 70, captureBeyondViewport: true, clip: { x: 0, y: 0, width: W, height: Math.min(data.page.height, 10000), scale: 0.5 } }, 90000);
    writeFileSync(join(dir, 'screenshot.jpg'), Buffer.from(shot.data, 'base64'));
    console.log(`${dir}: ${data.sections.length} sections, ${data.page.height}px tall, ${data.typography.scale.length} type styles${partial(data) ? ', PARTIAL' : ''}`);
  });
}

// one site after another; sites that already have styles.json are skipped, so a rerun resumes
async function batch(listFile, outDir) {
  const sites = JSON.parse(readFileSync(listFile, 'utf8')), failed = [];
  for (const s of sites) {
    if (existsSync(join(outDir, folder(s.url), 'styles.json'))) { console.log(`skip ${s.url} (already measured)`); continue; }
    try { await probe(s.url, outDir, s); } catch (e) { failed.push(s.url); console.error(`FAILED ${s.url}: ${e.message}`); }
  }
  console.log(`done: ${sites.length - failed.length}/${sites.length} measured${failed.length ? `, failed: ${failed.join(' ')}` : ''}`);
}

// the master list only grows: sites already in it are skipped, new ones get the next ranks
function add(listFile, moreFile) {
  const list = existsSync(listFile) ? JSON.parse(readFileSync(listFile, 'utf8')) : [], have = new Set(list.map(s => folder(s.url)));
  const fresh = JSON.parse(readFileSync(moreFile, 'utf8')).filter(s => !have.has(folder(s.url)) && have.add(folder(s.url)));
  for (const s of fresh) list.push({ ...s, rank: list.length + 1 });
  writeFileSync(listFile, JSON.stringify(list, null, 2));
  console.log(`${listFile}: added ${fresh.length}, now ${list.length} sites`);
}

// <dir>/README.md: every site in one table, plus what the set has in common
function index(dir) {
  const lum = h => { const [r, g, b] = [1, 3, 5].map(i => parseInt(h.slice(i, i + 2), 16) / 255); return 0.2126 * r + 0.7152 * g + 0.0722 * b; };
  const sites = readdirSync(dir).filter(f => existsSync(join(dir, f, 'styles.json'))).map(f => {
    const d = JSON.parse(readFileSync(join(dir, f, 'styles.json'), 'utf8')), md = readFileSync(join(dir, f, 'overview.md'), 'utf8');
    const type = md.match(/^- Type: (.+)$/m)?.[1] || '';
    const scale = d.typography.scale, body = scale[0], display = [...scale].sort((x, y) => y.size - x.size)[0];
    const bg = d.palette.backgrounds[0]?.value || '#ffffff', fg = d.palette.text[0]?.value || '#000000';
    return { f, d, type: type.includes('_TODO') ? '—' : type, body, display, bg, fg, ground: lum(bg) < 0.2 ? 'dark' : lum(bg) > 0.8 ? 'light' : 'mid', accent: Math.min(d.palette.monochromeShare.backgrounds, d.palette.monochromeShare.text) < 0.9, rank: d.listing?.rank ?? 1e9 };
  }).sort((x, y) => x.rank - y.rank || x.f.localeCompare(y.f));
  const count = (list, key) => { const m = new Map(); for (const s of list) for (const k of [].concat(key(s)).filter(Boolean)) m.set(k, (m.get(k) || 0) + 1); return [...m].sort((x, y) => y[1] - x[1]); };
  const list = (pairs, n = 99) => pairs.slice(0, n).map(([k, v]) => `${k} (${v})`).join(', ') || '—';
  // one name per typeface: "PP Neue Montreal", "ppNeueMontreal" and "PPNeueMontrealBook" all count as neuemontreal
  const fontKey = f => {
    if (!f) return f;
    let k = f.toLowerCase().replace(/^(pp|abc|tt|fk|gt|kh|zt)(?=[a-z ])/, '').replace(/[\s_\d-]+|webfont|font|variable|vf/g, '');
    for (let o; o !== k;) { o = k; k = k.replace(/(pro|std|lt|regular|roman|book|medium|md|semibold|bold|black|light|thin|normal|standard)$/, ''); }
    return k || f;
  };
  const fontName = new Map();
  const readable = n => (n.includes(' ') ? 0 : 100) + n.length; // label each typeface with its most readable spelling
  for (const s of sites) for (const { family } of s.d.typography.scale) { const k = fontKey(family), cur = fontName.get(k); if (!cur || readable(family) < readable(cur)) fontName.set(k, family); }
  const fonts = key => count(sites, s => fontKey(s[key]?.family)).map(([k, v]) => [fontName.get(k), v]);
  const median = xs => { xs = xs.filter(x => typeof x === 'number').sort((x, y) => x - y); return xs.length ? xs[Math.floor(xs.length / 2)] : '—'; };
  const n = sites.length, pc = k => `${k} of ${n}`;
  const cell = s => String(s ?? '—').replace(/\|/g, '\\|');
  writeFileSync(join(dir, 'README.md'), `# Design research index

${n} sites measured at 1440×900 with the design-probe skill. Each folder has \`overview.md\`, \`styles.json\` and \`screenshot.jpg\`. Regenerate this page with \`probe.mjs --index ${dir}\`.

## What the set has in common

- Types: ${list(count(sites, s => s.type))}
- Found on: ${list(count(sites, s => s.d.listing?.source))}
- Awards: ${list(count(sites, s => s.d.listing?.award))}
- Ground: ${pc(sites.filter(s => s.ground === 'dark').length)} dark, ${pc(sites.filter(s => s.ground === 'light').length)} light, ${pc(sites.filter(s => s.ground === 'mid').length)} mid-tone (by the background with the most painted area)
- Pure \`#000000\` or \`#ffffff\` as the main background: ${pc(sites.filter(s => /^#(000000|ffffff)$/.test(s.bg)).length)}
- At least 10% non-grey colour in backgrounds or text: ${pc(sites.filter(s => s.accent).length)}
- Main backgrounds used by more than one site: ${list(count(sites, s => s.bg).filter(x => x[1] > 1))}
- Display fonts used by more than one site (largest size on the page): ${list(fonts('display').filter(x => x[1] > 1))}
- Body fonts used by more than one site (most characters): ${list(fonts('body').filter(x => x[1] > 1))}
- Typefaces used anywhere on the page, by number of sites: ${list(count(sites, s => [...new Set(s.d.typography.scale.map(t => fontKey(t.family)))]).filter(x => x[1] > 2).map(([k, v]) => [fontName.get(k) || k, v]))}
- Display set in uppercase: ${pc(sites.filter(s => s.display?.transform === 'uppercase').length)}; median display size ${median(sites.map(s => s.display?.size))}px
- Median body size ${median(sites.map(s => s.body?.size))}px, median body line height ${median(sites.map(s => s.body?.lineHeight))}
- Detected libraries: ${list(count(sites, s => s.d.tech))}
- Partial captures (one screen only): ${pc(sites.filter(s => partial(s.d)).length)}

## Sites

| # | Site | Award or source | Type | Main bg / text | Grey share bg / text | Display | Body | Tech | Capture |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
${sites.map((s, i) => `| ${i + 1} | [${cell(s.d.listing?.title || s.d.page.title || s.f)}](${s.f}/overview.md) | ${s.d.listing?.award || s.d.listing?.source || '—'} | ${cell(s.type)} | \`${s.bg}\` / \`${s.fg}\` | ${Math.round(s.d.palette.monochromeShare.backgrounds * 100)}% / ${Math.round(s.d.palette.monochromeShare.text * 100)}% | ${cell(s.display ? `${s.display.family} ${Math.round(s.display.size)}px` : '—')} | ${cell(s.body ? `${s.body.family} ${s.body.size}px / ${s.body.lineHeight}` : '—')} | ${s.d.tech.join(', ') || '—'} | ${partial(s.d) ? 'partial' : 'full'} |`).join('\n')}
`);
  console.log(`${join(dir, 'README.md')}: ${n} sites`);
}

async function selftest() {
  const html = `<body style="margin:0;background:#000;color:#fff;font-family:Georgia">${[1, 2, 3].map(i => `<section style="height:400px;padding:40px;display:grid;grid-template-columns:1fr 1fr;gap:24px"><h2 style="font-size:80px;margin:0">Head ${i}</h2><p>Some body copy here</p></section>`).join('')}<footer style="height:100px;background:#fff;color:#000">Foot <a href="#">Contact</a><i style="color:color(srgb 1 0 0)">r</i><b style="color:oklch(0 0 0 / 0.5)">h</b></footer></body>`;
  const d = await withPage('data:text/html,' + encodeURIComponent(html), ({ evaluate }) => evaluate(inPage));
  assert.equal(d.sections.length, 4);
  assert.equal(d.palette.backgrounds[0].value, '#000000');
  assert.equal(d.palette.text[0].value, '#ffffff');
  assert.equal(d.palette.monochromeShare.backgrounds, 1);
  assert.equal(d.sections[0].headings[0].size, 80);
  assert.equal(d.sections[0].layout.columns, 2);
  assert.equal(d.sections[0].padding, '40px');
  assert.equal(d.sections[0].content.gutterLeft, 40);
  assert.deepEqual(d.sections[3].labels, ['Contact']);
  assert.ok(d.spacing.some(s => s.px === 40) && render(d).includes('## Sections'));
  assert.equal(folder('https://www.a.com/en/'), 'a.com-en');
  const gallery = `<a href="https://one.example/work?ref=x"><img alt="One"></a><a href="https://one.example/about">dup</a><a href="https://twitter.com/x">t</a><a href="https://two.example/">Two</a>`;
  const links = await withPage('data:text/html,' + encodeURIComponent(gallery), ({ evaluate }) => evaluate(linksInPage, 5));
  assert.deepEqual(links.map(l => [l.rank, l.title, l.url]), [[1, 'One', 'https://one.example/work'], [2, 'Two', 'https://two.example/']]);
  assert.equal(partial(d), false);
  assert.ok(d.palette.text.some(c => c.value === '#ff0000') && d.palette.text.some(c => c.value === '#00000080'), JSON.stringify(d.palette.text));
  assert.equal(partial({ page: { height: 900, viewport: [1440, 900] } }), true);
  console.log('selftest ok');
}

const [a, b, c] = process.argv.slice(2);
try {
  if (a === '--selftest') await selftest();
  else if (a === '--winners' && b) console.log(JSON.stringify(await withPage(b, ({ evaluate }) => evaluate(winnersInPage, +c || 10)), null, 2));
  else if (a === '--links' && b) console.log(JSON.stringify(await withPage(b, ({ evaluate }) => evaluate(linksInPage, +c || 30)), null, 2));
  else if (a === '--add' && b && c) add(b, c);
  else if (a === '--batch' && b && c) await batch(b, c);
  else if (a === '--index' && b) index(b);
  else if (a && b && /^https?:/.test(a)) await probe(a, b);
  else { console.error('usage: probe.mjs <url> <outDir> | --winners <awwwards list url> [n] | --links <gallery url> [n] | --add <sites.json> <more.json> | --batch <sites.json> <outDir> | --index <outDir> | --selftest'); process.exit(2); }
  process.exit(0); // the DevTools socket would otherwise keep node alive
} catch (e) { console.error(`FAILED ${a}: ${e.message}`); process.exit(1); }
