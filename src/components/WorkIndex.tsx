import Image from 'next/image'
import { work } from '@/lib/portfolio'

// Editorial work index: a row opens on hover or keyboard focus, inverts to black, and shows the photo
// beside its description, photo on the left for odd rows and on the right for even ones. CSS only.
// Touch screens have no hover, so every row is open there.
const label = 'text-[11px] tracking-[0.14em] uppercase'
const ease = 'ease-[cubic-bezier(0.16,1,0.3,1)]'
const open = 'group-hover:grid-rows-[1fr] group-focus-within:grid-rows-[1fr] [@media(hover:none)]:grid-rows-[1fr]'

export default function WorkIndex() {
  return (
    <ol className="border-t border-[var(--ink)]">
      {work.map((w, i) => (
        <li
          key={w.name}
          tabIndex={0}
          className="group border-b border-[var(--ink)] outline-none transition-colors duration-500 hover:bg-[var(--ink)] hover:text-[var(--paper)] focus-within:bg-[var(--ink)] focus-within:text-[var(--paper)]"
        >
          <div className="grid grid-cols-[2.5rem_1fr] items-baseline gap-x-4 py-5 sm:grid-cols-[4rem_1fr_auto] sm:px-3">
            <span className={label}>{String(i + 1).padStart(2, '0')}</span>
            <h3 className={`text-3xl font-semibold tracking-[-0.035em] transition-transform duration-500 ${ease} group-hover:translate-x-3 group-focus-within:translate-x-3 sm:text-5xl`}>
              {w.name}
            </h3>
            <span className={`${label} col-start-2 sm:col-start-3`}>{w.when || w.kind}</span>
          </div>

          {/* 0fr → 1fr animates the height without knowing it */}
          <div className={`grid grid-rows-[0fr] transition-[grid-template-rows] duration-700 ${ease} ${open}`}>
            <div className="overflow-hidden">
              <div className="grid gap-6 pb-6 sm:grid-cols-2 sm:px-3">
                <div className={`relative aspect-[16/9] overflow-hidden ${i % 2 ? 'sm:order-2' : ''}`}>
                  {/* eager: a lazy image inside a closed row would only start loading on the first hover */}
                  <Image src={w.photo.src} alt={w.photo.alt} fill loading="eager" sizes="(min-width: 640px) 50vw, 100vw" className="object-cover grayscale" />
                </div>
                <div className={`flex flex-col justify-end gap-3 ${i % 2 ? 'sm:items-end sm:text-right' : ''}`}>
                  <p className={label}>{w.kind}</p>
                  <p className="max-w-sm text-xl leading-snug">{w.what}</p>
                  <p className={label}>{w.stack.join(' · ')}</p>
                  {w.href && <a href={w.href} className={`${label} underline underline-offset-4`}>Source ↗</a>}
                </div>
              </div>
            </div>
          </div>
        </li>
      ))}
    </ol>
  )
}
