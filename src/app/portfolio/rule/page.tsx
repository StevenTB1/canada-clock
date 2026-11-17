import type { CSSProperties } from 'react'
import type { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import LiveClock from '@/components/LiveClock'
import PhotoCredits from '@/components/PhotoCredits'
import StyleBar from '@/components/StyleBar'
import { education, person, skills, work } from '@/lib/portfolio'

// Design 3 — Rule. After bleibtgleich.dev: one weight, two sizes (14px and one large size) and a single vertical
// rule a third of the way across that the page hangs off. Notes and pictures sit left of the rule, statements
// sit right of it. Colours come from <StyleBar>: --paper, --ink and --muted.

export const metadata: Metadata = {
  title: `${person.first} ${person.last} — Rule`,
  description: `Portfolio of ${person.first} ${person.last}: one rule, two type sizes.`,
}

const small = 'text-sm leading-snug'
const big = 'text-[clamp(2rem,6.25vw,5.625rem)] leading-[0.88] tracking-[-0.05em]'
// The rule is the left border of the right column: a third across on desktop, a thumbnail's width in on phones.
const row = 'grid grid-cols-[4.5rem_minmax(0,1fr)] gap-x-4 md:grid-cols-[minmax(0,1fr)_minmax(0,2fr)]'
const gap = 'pb-[clamp(3.5rem,8vw,7.5rem)]'
const right = `border-l border-[var(--ink)] pl-4 ${gap}`
const delay = (d: string) => ({ '--d': d }) as CSSProperties
const [mailbox, domain] = person.email.split('@')

export default function Rule() {
  return (
    <StyleBar current="/portfolio/rule" className="font-medium">
      {/* pb-28 on phones keeps the last line clear of the pill, which sits at the bottom there. */}
      <header className="flex min-h-svh flex-col px-5 pt-6 pb-28 sm:px-8 sm:pt-16 sm:pb-[clamp(3.5rem,8vw,7.5rem)]">
        <div className={`${row} flex-1`}>
          <div className={`${small} hero-in flex flex-col justify-between md:pr-4`} style={delay('0.9s')}>
            <Link href="/" aria-label="Back to Canada clock" className="hover:underline">
              ←<span className="hidden md:inline"> Canada clock</span>
            </Link>
            <p className="hidden text-right md:block">Engineer<br />&amp; developer</p>
          </div>
          <div className="relative flex flex-col justify-between gap-16 pl-4">
            {/* Drawn as its own element here so it can grow down the screen on load. */}
            <span className="hero-rule absolute inset-y-0 left-0 w-px bg-[var(--ink)]" style={{ '--i': 0 } as CSSProperties} aria-hidden="true" />
            <div className={`${small} hero-in flex flex-col justify-between gap-x-4 sm:flex-row`} style={delay('0.9s')}>
              <p>Based in {person.city}<br />{person.status}</p>
              <LiveClock className="tabular-nums" />
            </div>
            <h1 className={`${big} hero-in`} style={delay('0.5s')}>{person.first}<br />{person.last}</h1>
          </div>
        </div>
        {/* The rule stops and the statement steps left across it, as on the reference. */}
        <p className={`${big} hero-in md:ml-[16.666%]`} style={delay('0.7s')}>
          {person.role.split(' ').map((word) => <span key={word} className="block">{word}</span>)}
        </p>
      </header>

      <main className="px-5 sm:px-8">
        <section id="work">
          <div className={row}>
            <h2 className={small}>Work</h2>
            <p className={`${small} ${right}`}>Experience &amp; projects ({String(work.length).padStart(2, '0')})</p>
          </div>
          <ol>
            {work.map((w, i) => (
              <li key={w.name} className={`${row} group`}>
                {/* Same gap under the picture as under the text, or tall pictures would stack edge to edge. */}
                <div className={`${gap} md:pr-4`}>
                  <div className="relative aspect-[4/3] overflow-hidden">
                    <Image src={w.photo.src} alt={w.photo.alt} fill sizes="(min-width: 768px) 33vw, 72px" className="object-cover grayscale transition duration-500 group-hover:grayscale-0" />
                  </div>
                </div>
                <div className={right}>
                  <p className={small}>{String(i + 1).padStart(2, '0')} — {w.kind}{w.when && <><br />{w.when}</>}</p>
                  <h3 className={`${big} mt-3`}>{w.name}</h3>
                  {w.href && <a href={w.href} className={`${small} mt-4 inline-block underline underline-offset-4`}>Source ↗</a>}
                </div>
              </li>
            ))}
          </ol>
        </section>

        <section id="about" className={row}>
          <h2 className={small}>About</h2>
          <div className={right}>
            <p className={big}>{person.tagline}</p>
            <div className={`${small} mt-10 grid max-w-3xl gap-x-4 gap-y-8 sm:grid-cols-2`}>
              <p>{person.about}</p>
              <div className="space-y-6">
                <ul className="space-y-3">
                  {education.map((e) => <li key={e.years}>{e.years}<br />{e.what}, {e.place}</li>)}
                </ul>
                <ul className="space-y-1">
                  {skills.map((k) => <li key={k.group}>{k.group}: {k.items.join(', ')}</li>)}
                </ul>
              </div>
            </div>
          </div>
        </section>

        <section id="contact" className={row}>
          <h2 className={small}>Contact</h2>
          <div className={right}>
            <a href={`mailto:${person.email}`} className={`${big} block wrap-anywhere hover:underline max-sm:text-[1.625rem]`}>{mailbox}<wbr />@{domain}</a>
            <p className={`${small} mt-6 flex gap-6`}>
              <a href={person.github} className="hover:underline">GitHub ↗</a>
              <a href={person.linkedin} className="hover:underline">LinkedIn ↗</a>
            </p>
          </div>
        </section>
      </main>

      <footer className="px-5 pb-28 text-[var(--muted)] sm:px-8 sm:pb-8">
        <p className="flex justify-between text-4xl tracking-[-0.05em] lowercase" aria-hidden="true">
          <span>{person.first}</span>
          <span>{person.last}</span>
        </p>
        <p className={`${small} mt-4`}><PhotoCredits /></p>
      </footer>
    </StyleBar>
  )
}
