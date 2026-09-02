import ClockGrid from '@/components/ClockGrid'

export default function Home() {
  return (
    <main className="mx-auto w-full max-w-6xl px-6 py-14 sm:py-20">
      <h1 className="mb-10 text-2xl font-semibold tracking-tight">
        <span aria-hidden="true">🍁</span> Canada — every time zone, right now
      </h1>
      <ClockGrid />
    </main>
  )
}
