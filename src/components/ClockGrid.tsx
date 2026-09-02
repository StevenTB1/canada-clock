'use client'

import { useEffect, useMemo, useState } from 'react'
import { ZONES, offsetMinutes, readZone, type Zone, type ZoneReading } from '@/lib/zones'

type Sky = { label: string; glyph: string; edge: string }

function skyFor(hour: number): Sky {
  if (hour < 5) return { label: 'Night', glyph: '☾', edge: 'linear-gradient(90deg,#2b3a72,#5a4a8f)' }
  if (hour < 8) return { label: 'Dawn', glyph: '☀', edge: 'linear-gradient(90deg,#e0765b,#f2b56b)' }
  if (hour < 17) return { label: 'Day', glyph: '☀', edge: 'linear-gradient(90deg,#4fb8f0,#7ee0c4)' }
  if (hour < 20) return { label: 'Dusk', glyph: '☀', edge: 'linear-gradient(90deg,#f2955b,#c2568f)' }
  return { label: 'Night', glyph: '☾', edge: 'linear-gradient(90deg,#2b3a72,#5a4a8f)' }
}

function ZoneCard({
  zone,
  reading,
  isHere,
}: {
  zone: Zone
  reading: ZoneReading | null
  isHere: boolean
}) {
  const sky = skyFor(reading?.hour ?? 12)

  return (
    <article
      className="card p-5"
      data-here={isHere}
      style={{ '--sky': sky.edge } as React.CSSProperties}
    >
      <div className="flex items-start justify-between gap-3">
        <div>
          <h2 className="text-base font-semibold tracking-tight">{zone.name}</h2>
          <p className="text-muted mt-0.5 text-xs">{zone.city}</p>
        </div>
        {isHere && (
          <span className="text-aurora border-aurora/40 bg-aurora/10 rounded-full border px-2 py-0.5 text-[10px] font-medium tracking-wide uppercase">
            You
          </span>
        )}
      </div>

      <div className="mt-4 flex items-baseline gap-1.5">
        <span className="tabular text-4xl font-semibold">{reading?.time ?? '--:--'}</span>
        <span className="tabular text-muted text-lg">
          {reading ? String(reading.second).padStart(2, '0') : '--'}
        </span>
      </div>

      <p className="text-muted mt-1 text-xs">
        {reading?.date ?? '—'}
        <span className="mx-1.5 opacity-40">·</span>
        <span aria-hidden="true">{sky.glyph}</span> {sky.label}
      </p>

      {/* Position of the local day, midnight to midnight. */}
      <div className="relative mt-4 h-px w-full bg-white/10">
        <span
          className="absolute -top-[3px] h-[7px] w-[7px] -translate-x-1/2 rounded-full"
          style={{
            left: `${(reading?.dayFraction ?? 0.5) * 100}%`,
            background: sky.edge,
          }}
        />
      </div>

      <dl className="mt-4 flex flex-wrap items-center gap-x-3 gap-y-1 text-xs">
        <dt className="sr-only">UTC offset</dt>
        <dd className="tabular rounded-md bg-white/5 px-1.5 py-0.5">{reading?.offset ?? 'UTC—'}</dd>
        <dt className="sr-only">Abbreviation</dt>
        <dd className="text-muted">{reading?.abbr ?? ''}</dd>
        {reading?.dst && (
          <dd className="text-amber-300/80" title="Daylight saving time in effect">
            DST
          </dd>
        )}
        {!zone.observesDst && <dd className="text-muted/70">no DST</dd>}
        <dd className="text-muted ml-auto">{reading?.relative ?? ''}</dd>
      </dl>

      <p className="text-muted/70 mt-3 text-[11px] leading-snug">{zone.regions}</p>
    </article>
  )
}

export default function ClockGrid() {
  // Stays null through the server render so the markup matches on hydration.
  const [now, setNow] = useState<Date | null>(null)
  const [viewerZone, setViewerZone] = useState<string | null>(null)

  useEffect(() => {
    setViewerZone(Intl.DateTimeFormat().resolvedOptions().timeZone)
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

  const viewerOffset = useMemo(
    () => (now && viewerZone ? offsetMinutes(now, viewerZone) : 0),
    [now, viewerZone],
  )

  const readings = useMemo(
    () => (now ? ZONES.map((zone) => readZone(now, zone, viewerOffset)) : null),
    [now, viewerOffset],
  )

  const spread = useMemo(() => {
    if (!now) return null
    const offsets = ZONES.map((zone) => offsetMinutes(now, zone.id))
    return (Math.max(...offsets) - Math.min(...offsets)) / 60
  }, [now])

  const utc = now
    ? `${String(now.getUTCHours()).padStart(2, '0')}:${String(now.getUTCMinutes()).padStart(2, '0')}:${String(now.getUTCSeconds()).padStart(2, '0')}`
    : '--:--:--'

  return (
    <>
      <div className="text-muted mt-6 flex flex-wrap items-center gap-x-4 gap-y-1 text-xs">
        <span>
          UTC <span className="tabular text-frost/80">{utc}</span>
        </span>
        <span className="opacity-30">|</span>
        <span>
          Coast to coast:{' '}
          <span className="tabular text-frost/80">{spread === null ? '—' : `${spread} hours`}</span>
        </span>
        <span className="opacity-30">|</span>
        <span>
          Your zone: <span className="text-frost/80">{viewerZone ?? '—'}</span>
        </span>
      </div>

      <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {ZONES.map((zone, i) => (
          <ZoneCard
            key={zone.id}
            zone={zone}
            reading={readings?.[i] ?? null}
            isHere={viewerZone === zone.id}
          />
        ))}
      </div>
    </>
  )
}
