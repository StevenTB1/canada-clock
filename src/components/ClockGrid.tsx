'use client'

import { useEffect, useState } from 'react'
import { EASTERN_ID, ZONES, offsetMinutes, readZone } from '@/lib/zones'

export default function ClockGrid() {
  // Stays null through the server render so the markup matches on hydration.
  const [now, setNow] = useState<Date | null>(null)

  useEffect(() => {
    setNow(new Date())

    let interval: ReturnType<typeof setInterval>
    // Align the first tick to the next whole second so the clocks stay in step.
    const align = setTimeout(() => {
      setNow(new Date())
      interval = setInterval(() => setNow(new Date()), 1000)
    }, 1000 - new Date().getMilliseconds())

    return () => {
      clearTimeout(align)
      clearInterval(interval)
    }
  }, [])

  const easternOffset = now ? offsetMinutes(now, EASTERN_ID) : 0

  return (
    <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
      {ZONES.map((zone) => (
        <article key={zone.id} className="card px-5 py-7 text-center">
          <h2 className="text-muted text-3xl font-semibold tracking-tight">{zone.name}</h2>
          <p className="tabular mt-1.5 text-3xl font-semibold">
            {now ? readZone(now, zone, easternOffset).time : '--:--:--'}
          </p>
        </article>
      ))}
    </div>
  )
}
