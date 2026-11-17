import type { Metadata } from 'next'
import Image from 'next/image'
import PhotoCredits from '@/components/PhotoCredits'
import PortfolioHero from '@/components/PortfolioHero'
import StyleBar from '@/components/StyleBar'
import { education, person, photos, skills, work } from '@/lib/portfolio'

// Design 1 — Exposure. Colours come from the palette chosen in <StyleBar> (black and white by default):
// --paper/--ink for the light sections, --dark/--light for the hero and the About band, --muted for secondary text.
// The content lives in src/lib/portfolio.ts.

export const metadata: Metadata = {
  title: `${person.first} ${person.last} — ${person.role}`,
  description: `Portfolio of ${person.first} ${person.last}, ${person.role} at the ${person.school}.`,
}

const label = 'font-mono text-xs uppercase tracking-[0.12em]'

export default function Portfolio() {
  return (
    // StyleBar sets the palette variables and paints the page, so the clock page's aurora layer never shows through.
    <StyleBar current="/portfolio">
      <PortfolioHero />

      <main>
        <section id="work" className="px-6 py-24 sm:px-10">
          <div className="flex items-baseline justify-between border-b border-[var(--ink)] pb-4">
            <h2 className="text-4xl font-semibold tracking-tight sm:text-6xl">Experience &amp; projects</h2>
            <span className={label}>({String(work.length).padStart(2, '0')})</span>
          </div>
          <ol className="mt-10 grid gap-x-8 gap-y-14 md:grid-cols-2">
            {work.map((w, i) => (
              // The current role leads at full width; the rest pair up.
              <li key={w.name} className={`group ${i === 0 ? 'md:col-span-2' : ''}`}>
                <div className={`relative overflow-hidden bg-[var(--dark)] ${i === 0 ? 'aspect-[4/3] md:aspect-[16/7]' : 'aspect-[4/3]'}`}>
                  <Image src={w.photo.src} alt={w.photo.alt} fill sizes={i === 0 ? '100vw' : '(min-width: 768px) 50vw, 100vw'} className="object-cover grayscale transition duration-700 ease-out group-hover:scale-[1.03]" />
                </div>
                <div className="mt-4 grid grid-cols-[auto_1fr] gap-x-4 border-t border-[var(--ink)] pt-3 sm:grid-cols-[auto_1fr_auto]">
                  <span className={`${label} pt-1`}>{String(i + 1).padStart(2, '0')}</span>
                  <div>
                    <h3 className="text-2xl font-semibold tracking-tight">{w.name}</h3>
                    <p className={`${label} mt-1`}>{w.kind}</p>
                    <p className="mt-2 max-w-xl text-[var(--muted)]">{w.what}</p>
                    <p className={`${label} mt-3 text-[var(--muted)]`}>{w.stack.join(' · ')}</p>
                    {w.href && <a href={w.href} className={`${label} mt-3 inline-block underline underline-offset-4`}>Source ↗</a>}
                  </div>
                  <span className={`${label} col-start-2 pt-1 sm:col-start-3`}>{w.when}</span>
                </div>
              </li>
            ))}
          </ol>
        </section>

        <section id="about" className="bg-[var(--dark)] px-6 py-24 text-[var(--light)] sm:px-10">
          <div className="grid gap-12 lg:grid-cols-2">
            <div className="relative aspect-[4/5] overflow-hidden lg:aspect-auto">
              <Image src={photos.about.src} alt={photos.about.alt} fill sizes="(min-width: 1024px) 50vw, 100vw" className="object-cover contrast-125 grayscale" />
            </div>
            <div className="flex flex-col">
              <h2 className={`${label} text-[var(--muted-dark)]`}>About</h2>
              <p className="mt-6 text-3xl leading-tight font-medium tracking-tight sm:text-4xl">{person.tagline}</p>
              <p className="mt-6 max-w-xl leading-relaxed text-[var(--muted-dark)]">{person.about}</p>

              <h3 className={`${label} mt-14 text-[var(--muted-dark)]`}>Education</h3>
              <ul className="mt-4 border-t border-[var(--light)]/25">
                {education.map((e) => (
                  <li key={e.years} className="grid gap-x-4 border-b border-[var(--light)]/25 py-4 sm:grid-cols-[8rem_1fr_auto]">
                    <span className={`${label} pt-1 text-[var(--muted-dark)]`}>{e.years}</span>
                    <span>{e.what}</span>
                    <span className="text-[var(--muted-dark)]">{e.place}</span>
                  </li>
                ))}
              </ul>

              <h3 className={`${label} mt-14 text-[var(--muted-dark)]`}>Tech stack</h3>
              <dl className="mt-4 space-y-4">
                {skills.map((s) => (
                  <div key={s.group} className="grid gap-2 sm:grid-cols-[8rem_1fr]">
                    <dt className={`${label} pt-2 text-[var(--muted-dark)]`}>{s.group}</dt>
                    <dd className="flex flex-wrap gap-2">
                      {s.items.map((item) => (
                        <span key={item} className={`${label} rounded-full border border-[var(--light)]/40 px-3 py-1.5`}>{item}</span>
                      ))}
                    </dd>
                  </div>
                ))}
              </dl>
            </div>
          </div>
        </section>

        <section id="contact" className="px-6 py-24 sm:px-10">
          <h2 className={label}>Contact</h2>
          <a href={`mailto:${person.email}`} className="mt-6 block text-[clamp(1.75rem,6.5vw,6rem)] leading-none font-semibold tracking-[-0.04em] wrap-anywhere hover:underline">
            {person.email}
          </a>
          <ul className={`${label} mt-10 flex flex-wrap gap-6`}>
            <li><a href={person.github} className="hover:underline">GitHub ↗</a></li>
            <li><a href={person.linkedin} className="hover:underline">LinkedIn ↗</a></li>
          </ul>
        </section>
      </main>

      <footer className="border-t border-[var(--ink)] px-6 py-8 pb-28 text-sm text-[var(--muted)] sm:px-10 sm:pb-8">
        <PhotoCredits />.
      </footer>
    </StyleBar>
  )
}
