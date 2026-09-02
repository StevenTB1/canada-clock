'use client'

import { useEffect, useState } from 'react'
import { ZONES, readZone, type ZoneReading } from '@/lib/zones'

function ClockFace({ hour, minute, second }: { hour: number; minute: number; second: number }) {
  const hourAngle = ((hour % 12) + minute / 60) * 30
  const minuteAngle = (minute + second / 60) * 6
  const secondAngle = second * 6

  return (
    <svg viewBox="0 0 100 100" className="h-32 w-32" aria-hidden="true">
      <circle
        cx="50"
        cy="50"
        r="46"
        fill="rgba(232,238,247,0.035)"
        stroke="rgba(232,238,247,0.14)"
        strokeWidth="1"
      />
      {Array.from({ length: 12 }, (_, i) => (
        <line
          key={i}
          x1="50"
          y1="8"
          x2="50"
          y2={i % 3 === 0 ? 16 : 12}
          stroke="rgba(232,238,247,0.4)"
          strokeWidth={i % 3 === 0 ? 2.4 : 1}
          strokeLinecap="round"
          transform={`rotate(${i * 30} 50 50)`}
        />
      ))}
      <line
        x1="50"
        y1="54"
        x2="50"
        y2="30"
        stroke="#e8eef7"
        strokeWidth="4"
        strokeLinecap="round"
        transform={`rotate(${hourAngle} 50 50)`}
      />
      <line
        x1="50"
        y1="56"
        x2="50"
        y2="19"
        stroke="#e8eef7"
        strokeWidth="2.6"
        strokeLinecap="round"
        transform={`rotate(${minuteAngle} 50 50)`}
      />
      <line
        x1="50"
        y1="60"
        x2="50"
        y2="16"
        stroke="#e4383f"
        strokeWidth="1.2"
        strokeLinecap="round"
        transform={`rotate(${secondAngle} 50 50)`}
      />
      <circle cx="50" cy="50" r="2.6" fill="#e4383f" />
    </svg>
  )
}

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

  return (
    <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
      {ZONES.map((zone) => {
        const reading: ZoneReading | null = now ? readZone(now, zone) : null

        return (
          <article key={zone.id} className="card flex flex-col items-center gap-5 px-5 py-7">
            <ClockFace
              hour={reading?.hour ?? 0}
              minute={reading?.minute ?? 0}
              second={reading?.second ?? 0}
            />
            <div className="text-center">
              <h2 className="text-muted text-xs font-medium tracking-[0.18em] uppercase">
                {zone.name}
              </h2>
              <p className="tabular mt-1.5 text-3xl font-semibold">
                {reading?.time ?? '--:--:--'}
              </p>
            </div>
          </article>
        )
      })}
    </div>
  )
}
