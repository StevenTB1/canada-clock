'use client'

import Link from 'next/link'
import { useEffect, useState, type CSSProperties, type ReactNode } from 'react'

// Wraps a portfolio page and lets you switch between the designs, between light and dark, and between palettes.
// The page reads its colours from the CSS variables set here: --paper and --ink for the page, --dark and --light
// for bands that are always dark (the Exposure hero and its About band), --muted and --muted-dark for secondary
// text, --accent.

const DESIGNS = [
  ['/portfolio', 'Exposure'],
  ['/portfolio/editorial', 'Editorial'],
  ['/portfolio/rule', 'Rule'],
  ['/portfolio/wordmark', 'Wordmark'],
]

// Every palette comes from a site in design-research that sits close to these designs (named in `from`),
// and every text pairing in it is 4.5:1 or better. Dark mode puts the page on `dark` with `light` text, so a
// palette needs no second set of colours. `blend: 'normal'` turns off the Exposure name's difference blend,
// which only stays neutral over a black or grey hero; over navy or brown it would tint the name.
const PALETTES = [
  { name: 'Mono', from: 'bleibtgleich, David Spaeth', paper: '#ffffff', ink: '#000000', muted: '#666666', dark: '#000000', light: '#ffffff', mutedDark: '#8c8c8c', accent: '#ff0000' },
  { name: 'Paper', from: 'Mathis Biabiany', paper: '#f3f1ea', ink: '#141414', muted: '#5e5c57', dark: '#141414', light: '#f3f1ea', mutedDark: '#96948e', accent: '#ff0000' },
  { name: 'Concrete', from: 'Grafik', paper: '#dad9d5', ink: '#000000', muted: '#4f4f4d', dark: '#000000', light: '#dad9d5', mutedDark: '#8f8e8a', accent: '#ff0000' },
  { name: 'Navy', from: 'White Desert', paper: '#ffffff', ink: '#1f2a44', muted: '#5b6478', dark: '#1f2a44', light: '#ffffff', mutedDark: '#aab2c5', accent: '#ff0000', blend: 'normal' },
  { name: 'Brown', from: 'dsgn Interior', paper: '#f6f5f4', ink: '#594037', muted: '#7a6258', dark: '#594037', light: '#f6f5f4', mutedDark: '#cdbfb8', accent: '#594037', blend: 'normal' },
  { name: 'Burgundy', from: 'Agrumea Farm', paper: '#fdf3eb', ink: '#762530', muted: '#762530', dark: '#762530', light: '#fdf3eb', mutedDark: '#e6c3bd', accent: '#762530', blend: 'normal' },
  { name: 'Red', from: 'Love and Money', paper: '#e72604', ink: '#000000', muted: '#000000', dark: '#000000', light: '#e72604', mutedDark: '#e72604', accent: '#000000' },
  { name: 'Green', from: 'Lajoya', paper: '#00ef84', ink: '#000000', muted: '#000000', dark: '#000000', light: '#00ef84', mutedDark: '#00ef84', accent: '#000000' },
]
const PALETTE_KEY = 'portfolio-palette'
const DARK_KEY = 'portfolio-dark'

export default function StyleBar({ current, className = '', children }: { current: string; className?: string; children: ReactNode }) {
  const [chosen, setChosen] = useState(0)
  const [dark, setDark] = useState(false)

  // Storage can be blocked (private windows); the page works the same without it.
  useEffect(() => {
    try {
      const saved = PALETTES.findIndex((p) => p.name === localStorage.getItem(PALETTE_KEY))
      if (saved > 0) setChosen(saved)
      setDark(localStorage.getItem(DARK_KEY) === '1')
    } catch {}
  }, [])
  const save = (key: string, value: string) => {
    try {
      localStorage.setItem(key, value)
    } catch {}
  }

  const p = PALETTES[chosen]
  const [paper, ink, muted] = dark ? [p.dark, p.light, p.mutedDark] : [p.paper, p.ink, p.muted]
  // An accent that equals the dark colour would vanish on the dark page.
  const accent = dark && p.accent === p.dark ? p.light : p.accent
  const vars = { '--paper': paper, '--ink': ink, '--muted': muted, '--dark': p.dark, '--light': p.light, '--muted-dark': p.mutedDark, '--accent': accent, '--name-blend': p.blend ?? 'difference' } as CSSProperties
  const round = 'size-6 shrink-0 rounded-full border'

  return (
    <div style={vars} className={`bg-[var(--paper)] text-[var(--ink)] ${className}`}>
      {/* w-max keeps the pill on one row until it reaches the screen edges; then the second group wraps under the first. */}
      <nav
        aria-label="Design, light or dark, and palette"
        className="fixed bottom-4 left-1/2 z-50 flex w-max max-w-[calc(100vw-1rem)] -translate-x-1/2 flex-wrap items-center justify-center gap-1 rounded-[1.25rem] border border-white/20 bg-black/85 p-1 font-mono text-[11px] tracking-[0.12em] whitespace-nowrap text-white uppercase backdrop-blur sm:top-4 sm:bottom-auto"
      >
        <div className="flex items-center gap-1">
          {DESIGNS.map(([href, name]) => (
            <Link key={href} href={href} aria-current={href === current ? 'page' : undefined} className={`rounded-full px-2.5 py-1.5 ${href === current ? 'bg-white text-black' : 'hover:bg-white/15'}`}>
              {name}
            </Link>
          ))}
        </div>
        <div className="flex items-center gap-1">
          <span className="mx-1 hidden h-4 w-px shrink-0 bg-white/25 sm:block" aria-hidden="true" />
          <button
            onClick={() => {
              setDark(!dark)
              save(DARK_KEY, dark ? '0' : '1')
            }}
            aria-label="Dark mode"
            aria-pressed={dark}
            title={dark ? 'Switch to light' : 'Switch to dark'}
            className={`${round} text-sm leading-none tracking-normal ${dark ? 'border-white' : 'border-transparent hover:border-white/50'}`}
          >
            ◐
          </button>
          {PALETTES.map((q, n) => (
            <button
              key={q.name}
              onClick={() => {
                setChosen(n)
                save(PALETTE_KEY, q.name)
              }}
              aria-label={`${q.name} palette, after ${q.from}`}
              aria-pressed={n === chosen}
              title={`${q.name} — after ${q.from}`}
              className={`${round} p-0.5 ${n === chosen ? 'border-white' : 'border-transparent hover:border-white/50'}`}
            >
              <span className="block size-full rounded-full" style={{ background: `linear-gradient(135deg, ${q.paper} 50%, ${q.ink} 50%)` }} />
            </button>
          ))}
        </div>
      </nav>
      {children}
    </div>
  )
}
