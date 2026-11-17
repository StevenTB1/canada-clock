import type { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import LiveClock from '@/components/LiveClock'
import PhotoCredits from '@/components/PhotoCredits'
import StyleBar from '@/components/StyleBar'
import { education, person, portrait, skills, work } from '@/lib/portfolio'

// Design 4 — Wordmark. After sybiosme.com and montarville.ca: the name is set once, as wide as the screen, on the
// bottom edge of the first screen, and everything else stays small in three columns. Section titles repeat the
// wordmark's size and its accent full stop. Colours come from <StyleBar>: --paper, --ink, --muted and --accent.

export const metadata: Metadata = {
  title: `${person.first} ${person.last} — Wordmark`,
  description: `Portfolio of ${person.first} ${person.last}: a full-width wordmark over three quiet columns.`,
}

const label = 'text-[11px] uppercase tracking-[0.14em]'
const word = 'text-[17vw] leading-[0.8] font-bold tracking-[-0.04em] lowercase'
const section = 'border-t border-[var(--ink)] pt-4 pb-24'
const dot = <span className="text-[var(--accent)]">.</span>

// One line of type exactly as wide as its box. textLength spreads the letters to fit, so the glyphs keep their
// shape. `size` is the font size, in 1000ths of the width, at which the line is already close to full width.
function Fit({ text, size, stop = false }: { text: string; size: number; stop?: boolean }) {
  return (
    <svg viewBox={`0 0 1000 ${size * 0.8}`} className="block w-full overflow-visible" fill="currentColor" aria-hidden="true">
      <text y={size * 0.78} fontSize={size} fontWeight={700} textLength={1000}>
        {text}
        {stop && <tspan fill="var(--accent)">.</tspan>}
      </text>
    </svg>
  )
}

export default function Wordmark() {
  return (
    <StyleBar current="/portfolio/wordmark">
      <header className="flex min-h-svh flex-col px-5 pt-6 pb-28 sm:px-8 sm:pt-16 sm:pb-5">
        <nav className={`${label} hero-in flex justify-between gap-4`} style={{ animationDelay: '0.9s' }}>
          <Link href="/" className="hover:underline">← Canada clock</Link>
          <span className="flex gap-5">
            <a href="#work" className="hover:underline">Work</a>
            <a href="#about" className="hover:underline">About</a>
            <a href="#contact" className="hover:underline">Contact</a>
          </span>
        </nav>

        <div className="hero-in my-auto grid gap-6 py-10 sm:grid-cols-3" style={{ animationDelay: '0.7s' }}>
          <p className={label}>{person.role}<br />{person.school}</p>
          <p className="text-xl leading-snug font-medium tracking-tight sm:text-2xl">{person.intro}</p>
          <p className={`${label} sm:text-right`}>
            <span className="mr-2 inline-block size-2 rounded-full bg-[var(--accent)] motion-safe:animate-pulse" aria-hidden="true" />
            {person.status}<br />
            {person.city} · <LiveClock className="tabular-nums" />
          </p>
        </div>

        {/* The wordmark rises from below the bottom edge; the box clips it until it lands. */}
        <h1 aria-label={`${person.first} ${person.last}`} className="overflow-hidden pt-[2%]">
          <div className="hero-letter" style={{ animationDelay: '0.2s' }}>
            <Fit text={`${person.first} ${person.last}`.toLowerCase()} size={183} stop />
          </div>
        </h1>
      </header>

      <main className="px-5 sm:px-8">
        <section id="work" className={section}>
          <h2 className={word}>work{dot}</h2>
          <ol className="mt-10 grid gap-x-4 gap-y-12 sm:grid-cols-2 lg:grid-cols-3">
            {work.map((w, i) => (
              <li key={w.name} className="group">
                <div className="relative aspect-[4/3] overflow-hidden">
                  <Image src={w.photo.src} alt={w.photo.alt} fill sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw" className="object-cover grayscale transition duration-500 group-hover:grayscale-0" />
                </div>
                <p className={`${label} mt-3 flex justify-between gap-4`}>
                  <span>{String(i + 1).padStart(2, '0')}</span>
                  <span>{w.when}</span>
                </p>
                <h3 className="mt-1 text-2xl font-semibold tracking-tight">{w.name}</h3>
                <p className={`${label} mt-1 text-[var(--muted)]`}>{w.kind}</p>
                {w.href && <a href={w.href} className={`${label} mt-2 inline-block underline underline-offset-4`}>Source ↗</a>}
              </li>
            ))}
          </ol>
        </section>

        <section id="about" className={section}>
          <h2 className={word}>about{dot}</h2>
          <div className="mt-10 grid gap-x-4 gap-y-8 sm:grid-cols-3">
            <div className="relative aspect-[4/5] overflow-hidden">
              <Image src={portrait.src} alt={portrait.alt} fill sizes="(min-width: 640px) 33vw, 100vw" className="object-cover grayscale" />
            </div>
            <div>
              <p className="text-2xl leading-tight font-medium tracking-tight sm:text-3xl">{person.tagline}</p>
              <p className="mt-6 leading-relaxed text-[var(--muted)]">{person.about}</p>
            </div>
            <div className="text-sm">
              <ul>
                {education.map((e) => (
                  <li key={e.years} className="border-b border-[var(--ink)] py-3 first:border-t">
                    <span className={`${label} block text-[var(--muted)]`}>{e.years}</span>
                    {e.what}, {e.place}
                  </li>
                ))}
              </ul>
              <dl className="mt-6 space-y-1">
                {skills.map((k) => (
                  <div key={k.group} className="grid grid-cols-[6rem_1fr] gap-4">
                    <dt className={`${label} pt-0.5 text-[var(--muted)]`}>{k.group}</dt>
                    <dd>{k.items.join(', ')}</dd>
                  </div>
                ))}
              </dl>
            </div>
          </div>
        </section>

        <section id="contact" className="border-t border-[var(--ink)] pt-4 pb-10">
          <h2 className={label}>Contact</h2>
          {/* The address has descenders, which hang below the fitted line's box. */}
          <a href={`mailto:${person.email}`} aria-label={person.email} className="mt-10 block pb-[2%] transition-opacity hover:opacity-60">
            <Fit text={person.email} size={77} />
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
