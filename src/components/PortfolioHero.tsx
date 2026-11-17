'use client'

import Image from 'next/image'
import Link from 'next/link'
import type { CSSProperties, PointerEvent } from 'react'
import LiveClock from '@/components/LiveClock'
import { person, photos } from '@/lib/portfolio'

// "Exposure" hero for /portfolio: the photo develops from overexposed white into black and white, the name rises
// letter by letter, grid rules draw in, film grain runs on top, and a soft spotlight follows the mouse.
// The motion lives in globals.css (.hero-*); every piece stops under prefers-reduced-motion.

const label = 'font-mono text-[11px] uppercase tracking-[0.14em]'
const city = person.city.split(',')[0]
const vars = (v: Record<string, string | number>) => v as CSSProperties

function Letters({ text, from }: { text: string; from: number }) {
  return (
    <span className="block overflow-hidden pb-[0.04em]">
      {[...text].map((ch, i) => (
        <span key={i} className="hero-letter inline-block" style={vars({ '--i': from + i })}>
          {ch}
        </span>
      ))}
    </span>
  )
}

export default function PortfolioHero() {
  // Only a real mouse steers the spotlight; touch screens get a slow drift from CSS instead.
  const steer = (e: PointerEvent<HTMLElement>) => {
    if (e.pointerType !== 'mouse') return
    const box = e.currentTarget.getBoundingClientRect()
    e.currentTarget.style.setProperty('--spot-x', `${((e.clientX - box.left) / box.width) * 100}%`)
    e.currentTarget.style.setProperty('--spot-y', `${((e.clientY - box.top) / box.height) * 100}%`)
  }

  return (
    <header onPointerMove={steer} className="hero relative isolate flex min-h-svh flex-col overflow-hidden bg-[var(--dark)] text-[var(--light)]">
      <div className="absolute inset-0 -z-30">
        <Image src={photos.hero.src} alt={photos.hero.alt} fill priority sizes="100vw" className="hero-develop object-cover" />
      </div>
      <div className="hero-spot absolute inset-0 -z-20" aria-hidden="true" />
      <div className="absolute inset-0 -z-10" aria-hidden="true">
        {[1, 2, 3, 4, 5].map((i) => (
          <span key={i} className="hero-rule absolute inset-y-0 w-px bg-[var(--light)]/12" style={vars({ left: `${(i / 6) * 100}%`, '--i': i })} />
        ))}
        <div className="hero-grain absolute" />
      </div>

      {/* Viewfinder corners */}
      <div className="hero-in pointer-events-none absolute inset-4 sm:inset-6" style={vars({ '--d': '1.4s' })} aria-hidden="true">
        <span className="absolute top-0 left-0 size-4 border-t border-l border-[var(--light)]/60" />
        <span className="absolute top-0 right-0 size-4 border-t border-r border-[var(--light)]/60" />
        <span className="absolute bottom-0 left-0 size-4 border-b border-l border-[var(--light)]/60" />
        <span className="absolute right-0 bottom-0 size-4 border-r border-b border-[var(--light)]/60" />
      </div>

      <nav className={`${label} hero-in flex items-center justify-between px-8 pt-9 sm:px-12`} style={vars({ '--d': '1.2s' })} aria-label="Portfolio">
        <Link href="/" className="hover:underline">← Canada Clock</Link>
        <ul className="flex gap-6">
          <li><a href="#work" className="hover:underline">Work</a></li>
          <li><a href="#about" className="hover:underline">About</a></li>
          <li><a href="#contact" className="hover:underline">Contact</a></li>
        </ul>
      </nav>

      <div className={`${label} hero-in mt-6 flex justify-between px-8 text-[var(--light)]/70 sm:px-12`} style={vars({ '--d': '1.5s' })}>
        <span>Index — {new Date().getFullYear()}</span>
        <span>{city} <LiveClock className="tabular" /></span>
      </div>

      <div className="mt-auto px-8 pb-20 sm:px-12 sm:pb-10">
        {/* Difference blend: the name stays white on dark and turns dark where the spotlight brightens the photo. */}
        <h1 aria-label={`${person.first} ${person.last}`} className="text-[clamp(4rem,15vw,14rem)] leading-[0.82] font-semibold tracking-[-0.05em] text-white uppercase [mix-blend-mode:var(--name-blend,difference)]">
          <span aria-hidden="true">
            <Letters text={person.first} from={0} />
            <span className="block sm:pl-[16.667%]">
              <Letters text={person.last} from={person.first.length} />
            </span>
          </span>
        </h1>

        <div className="relative mt-10 grid gap-6 pt-6 sm:grid-cols-[1fr_2fr_1fr]">
          <span className="hero-rule-x absolute inset-x-0 top-0 h-px bg-[var(--light)]/30" aria-hidden="true" />
          <p className={`${label} hero-in text-[var(--light)]/70`} style={vars({ '--d': '1.9s' })}>
            {person.role}
            <br />
            {person.coords}
          </p>
          <p className="hero-in max-w-md text-lg leading-snug" style={vars({ '--d': '2s' })}>
            {person.intro}
          </p>
          <div className={`${label} hero-in flex items-start justify-between gap-6 text-[var(--light)]/70 sm:flex-col sm:items-end`} style={vars({ '--d': '2.1s' })}>
            <span className="flex items-center gap-2">
              <span className="size-1.5 rounded-full bg-[var(--light)] motion-safe:animate-pulse" aria-hidden="true" />
              {person.status}
            </span>
            <a href="#work" className="flex items-center gap-3 hover:text-[var(--light)]">
              Scroll
              <span className="relative block h-8 w-px overflow-hidden bg-[var(--light)]/25" aria-hidden="true">
                <span className="hero-scroll-dot absolute inset-x-0 top-0 h-1/2 bg-[var(--light)]" />
              </span>
            </a>
          </div>
        </div>
      </div>
    </header>
  )
}
