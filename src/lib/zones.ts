export type Zone = {
  /** IANA time zone identifier */
  id: string
  /** Short display name for the zone */
  name: string
  /** Provinces / territories that observe this zone */
  regions: string
  /** A representative city, shown as a subtitle */
  city: string
  /** Whether the zone observes daylight saving time */
  observesDst: boolean
}

/** Canada's time zones, ordered west to east. */
export const ZONES: Zone[] = [
  {
    id: 'America/Vancouver',
    name: 'Pacific',
    regions: 'British Columbia (most)',
    city: 'Vancouver',
    observesDst: true,
  },
  {
    id: 'America/Whitehorse',
    name: 'Yukon',
    regions: 'Yukon — no seasonal change',
    city: 'Whitehorse',
    observesDst: false,
  },
  {
    id: 'America/Edmonton',
    name: 'Mountain',
    regions: 'Alberta, NWT, western Nunavut',
    city: 'Edmonton',
    observesDst: true,
  },
  {
    id: 'America/Regina',
    name: 'Saskatchewan',
    regions: 'Saskatchewan — no seasonal change',
    city: 'Regina',
    observesDst: false,
  },
  {
    id: 'America/Winnipeg',
    name: 'Central',
    regions: 'Manitoba, western Ontario, central Nunavut',
    city: 'Winnipeg',
    observesDst: true,
  },
  {
    id: 'America/Toronto',
    name: 'Eastern',
    regions: 'Ontario, Quebec, eastern Nunavut',
    city: 'Toronto',
    observesDst: true,
  },
  {
    id: 'America/Halifax',
    name: 'Atlantic',
    regions: 'Nova Scotia, New Brunswick, PEI, Labrador',
    city: 'Halifax',
    observesDst: true,
  },
  {
    id: 'America/St_Johns',
    name: 'Newfoundland',
    regions: 'Island of Newfoundland',
    city: "St. John's",
    observesDst: true,
  },
]

const partsCache = new Map<string, Intl.DateTimeFormat>()

function formatter(timeZone: string, options: Intl.DateTimeFormatOptions) {
  const key = `${timeZone}|${JSON.stringify(options)}`
  let cached = partsCache.get(key)
  if (!cached) {
    cached = new Intl.DateTimeFormat('en-CA', { timeZone, ...options })
    partsCache.set(key, cached)
  }
  return cached
}

function toParts(date: Date, timeZone: string) {
  const parts = formatter(timeZone, {
    hour12: false,
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
  }).formatToParts(date)

  const map: Record<string, number> = {}
  for (const part of parts) {
    if (part.type !== 'literal') map[part.type] = Number(part.value)
  }
  // `en-CA` renders midnight as hour 24; normalise it back to 0.
  if (map.hour === 24) map.hour = 0
  return map
}

/** Minutes that `timeZone` is offset from UTC at the given instant. */
export function offsetMinutes(date: Date, timeZone: string): number {
  const p = toParts(date, timeZone)
  const asUtc = Date.UTC(p.year, p.month - 1, p.day, p.hour, p.minute, p.second)
  const instant = date.getTime() - date.getMilliseconds()
  return Math.round((asUtc - instant) / 60_000)
}

/** `UTC−05:00` style label for a zone at a given instant. */
export function offsetLabel(date: Date, timeZone: string): string {
  const total = offsetMinutes(date, timeZone)
  const sign = total < 0 ? '−' : '+'
  const abs = Math.abs(total)
  const hours = String(Math.floor(abs / 60)).padStart(2, '0')
  const minutes = String(abs % 60).padStart(2, '0')
  return `UTC${sign}${hours}:${minutes}`
}

/** Zone abbreviation such as `EST` or `NDT`. */
export function abbreviation(date: Date, timeZone: string): string {
  const parts = formatter(timeZone, { timeZoneName: 'short' }).formatToParts(date)
  return parts.find((part) => part.type === 'timeZoneName')?.value ?? ''
}

/** True when the zone is currently ahead of its own winter (standard) offset. */
export function isDaylightSaving(date: Date, timeZone: string): boolean {
  const january = new Date(Date.UTC(date.getUTCFullYear(), 0, 1))
  return offsetMinutes(date, timeZone) > offsetMinutes(january, timeZone)
}

export type ZoneReading = {
  hour: number
  minute: number
  second: number
  /** Fractional hour in 0–24, used for the day/night arc. */
  dayFraction: number
  time: string
  date: string
  offset: string
  abbr: string
  dst: boolean
  /** Difference from the viewer's own zone, e.g. `+3h` or `same as you`. */
  relative: string
}

export function readZone(date: Date, zone: Zone, viewerOffset: number): ZoneReading {
  const p = toParts(date, zone.id)
  const delta = (offsetMinutes(date, zone.id) - viewerOffset) / 60
  const rounded = Math.round(delta * 10) / 10

  return {
    hour: p.hour,
    minute: p.minute,
    second: p.second,
    dayFraction: (p.hour + p.minute / 60) / 24,
    time: `${String(p.hour).padStart(2, '0')}:${String(p.minute).padStart(2, '0')}`,
    date: formatter(zone.id, {
      weekday: 'short',
      month: 'short',
      day: 'numeric',
    }).format(date),
    offset: offsetLabel(date, zone.id),
    abbr: abbreviation(date, zone.id),
    dst: isDaylightSaving(date, zone.id),
    relative:
      rounded === 0
        ? 'same as you'
        : `${rounded > 0 ? '+' : '−'}${Math.abs(rounded)} h from you`,
  }
}
