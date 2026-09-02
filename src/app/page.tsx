import ClockGrid from '@/components/ClockGrid'

export default function Home() {
  return (
    <main className="mx-auto w-full max-w-6xl px-6 py-14 sm:py-20">
      <header>
        <p className="text-maple text-xs font-medium tracking-[0.2em] uppercase">
          <span aria-hidden="true">🍁</span> Canada
        </p>
        <h1 className="mt-3 text-3xl font-semibold tracking-tight sm:text-4xl">
          Every time zone, right now
        </h1>
        <p className="text-muted mt-3 max-w-2xl text-sm leading-relaxed">
          Canada spans six time zones from the Pacific coast to Newfoundland, split here into
          eight regions: Yukon and Saskatchewan hold a fixed offset all year, and Newfoundland
          sits half an hour off the rest. Times update live, west to east.
        </p>
      </header>

      <ClockGrid />

      <footer className="text-muted/60 mt-14 border-t border-white/5 pt-6 text-xs">
        Times come from your device clock, resolved through the IANA time zone database.
      </footer>
    </main>
  )
}
