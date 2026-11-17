import type { CSSProperties } from 'react'
import type { Metadata } from 'next'
import PhotoCredits from '@/components/PhotoCredits'
import StyleBar from '@/components/StyleBar'
import WorkIndex from '@/components/WorkIndex'
import { education, person, skills, work } from '@/lib/portfolio'
import s from './editorial.module.css'

// Design 2 — Editorial index. Pure type on white, laid out like a Swiss magazine index.
// Colours come from the palette chosen in <StyleBar> (white, black, grey #666666 and a red dot by default):
// --paper, --ink, --muted and --accent. The accent is only ever a dot, never text.
// Layout references: the index tables of Stash, David Spaeth and Reckon House.

export const metadata: Metadata = {
  title: `${person.first} ${person.last} — Editorial`,
  description: 'Demo personal portfolio: editorial index design.',
}

const label = 'text-[11px] uppercase tracking-[0.14em]'
const delay = (d: string) => ({ '--d': d }) as CSSProperties
const year = new Date().getFullYear()

export default function Editorial() {
  return (
    <StyleBar current="/portfolio/editorial" className="min-h-svh">

      <header className="flex min-h-svh flex-col px-5 pt-5 pb-28 sm:px-8 sm:pt-16 sm:pb-8">
        <div className={`${label} ${s.fade} grid grid-cols-2 gap-4 border-b border-[var(--ink)] pb-3 sm:grid-cols-4`} style={delay('0s')}>
          <span>{person.first} {person.last}</span>
          <span className="hidden sm:block">{person.role}</span>
          <span className="hidden sm:block">{person.city}</span>
          <span className="text-right">Index © {year}</span>
        </div>

        <h1 aria-label={`${person.first} ${person.last}`} className="mt-auto text-[clamp(4.5rem,21vw,22rem)] leading-[0.8] font-bold tracking-[-0.065em] uppercase">
          <span aria-hidden="true">
            <span className={s.wipe} style={delay('0.15s')}>{person.first}</span>
            <span className={`${s.wipe} text-right`} style={delay('0.35s')}>{person.last}</span>
          </span>
        </h1>

        <div className={`${s.fade} mt-8 grid gap-6 border-t border-[var(--ink)] pt-4 sm:grid-cols-4`} style={delay('1s')}>
          <p className={`${label} flex items-center gap-2`}>
            <span className="size-2 rounded-full bg-[var(--accent)] motion-safe:animate-pulse" aria-hidden="true" />
            {person.status}
          </p>
          <p className="text-2xl leading-tight font-medium tracking-tight sm:col-span-2">
            {person.intro}
          </p>
          <ul className={`${label} space-y-1 sm:text-right`}>
            <li><a href="#work" className="hover:underline">Index ↓</a></li>
            <li><a href="#about" className="hover:underline">About ↓</a></li>
            <li><a href="#contact" className="hover:underline">Contact ↓</a></li>
          </ul>
        </div>
      </header>

      <main className="px-5 sm:px-8">
        <section id="work" className="py-20">
          <div className={`${label} mb-4 flex justify-between`}>
            <h2>Experience &amp; projects</h2>
            <span>({String(work.length).padStart(2, '0')})</span>
          </div>
          <WorkIndex />
        </section>

        <section id="about" className="grid gap-8 border-t border-[var(--ink)] py-20 sm:grid-cols-4">
          <h2 className={label}>About</h2>
          <div className="sm:col-span-2">
            <p className="text-3xl leading-tight font-medium tracking-tight sm:text-4xl">
              {person.tagline}
            </p>
            <p className="mt-6 max-w-xl leading-relaxed text-[var(--muted)]">{person.about}</p>
            <dl className="mt-8 space-y-1 text-sm">
              {skills.map((k) => (
                <div key={k.group} className="grid grid-cols-[6rem_1fr] gap-4">
                  <dt className={`${label} pt-0.5 text-[var(--muted)]`}>{k.group}</dt>
                  <dd>{k.items.join(', ')}</dd>
                </div>
              ))}
            </dl>
          </div>
          <ul className="text-sm">
            {education.map((e) => (
              <li key={e.years} className="border-b border-[var(--ink)] py-3 first:border-t">
                <span className={`${label} block text-[var(--muted)]`}>{e.years}</span>
                {e.what}, {e.place}
              </li>
            ))}
          </ul>
        </section>

        <section id="contact" className="border-t border-[var(--ink)] py-20">
          <h2 className={label}>Contact</h2>
          <a href={`mailto:${person.email}`} className="mt-6 block text-[clamp(1.75rem,6.2vw,8.5rem)] leading-none font-bold tracking-[-0.055em] wrap-anywhere hover:underline">
            {person.email}
          </a>
        </section>
      </main>

      <footer className={`${label} flex flex-wrap justify-between gap-4 border-t border-[var(--ink)] px-5 py-6 pb-28 text-[var(--muted)] sm:px-8 sm:pb-6`}>
        <PhotoCredits />
        <span className="flex gap-6">
          <a href={person.github} className="hover:underline">GitHub ↗</a>
          <a href={person.linkedin} className="hover:underline">LinkedIn ↗</a>
        </span>
      </footer>
    </StyleBar>
  )
}
