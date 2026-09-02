export type Zone = {
  /** IANA time zone identifier */
  id: string
  /** Region label shown on the card */
  name: string
}

/** Canada's time zones, ordered west to east. */
export const ZONES: Zone[] = [
  { id: 'America/Vancouver', name: 'Pacific' },
  { id: 'America/Whitehorse', name: 'Yukon' },
  { id: 'America/Edmonton', name: 'Mountain' },
  { id: 'America/Regina', name: 'Saskatchewan' },
  { id: 'America/Winnipeg', name: 'Central' },
  { id: 'America/Toronto', name: 'Eastern' },
  { id: 'America/Halifax', name: 'Atlantic' },
  { id: 'America/St_Johns', name: 'Newfoundland' },
]

/** Every card reports its distance from Eastern time. */
export const EASTERN_ID = 'America/Toronto'

const formatters = new Map<string, Intl.DateTimeFormat>()

function formatter(timeZone: string, options: Intl.DateTimeFormatOptions) {
  const key = `${timeZone}|${JSON.stringify(options)}`
  let cached = formatters.get(key)
  if (!cached) {
    cached = new Intl.DateTimeFormat('en-CA', { timeZone, ...options })
    formatters.set(key, cached)
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

/** CLDR has no short name for these, so `Intl` returns a bare `GMT-7`. */
const ABBR_FALLBACK: Record<string, string> = {
  'America/Whitehorse': 'YT',
}

/** Zone abbreviation such as `EST` or `NDT`. */
export function abbreviation(date: Date, timeZone: string): string {
  const parts = formatter(timeZone, { timeZoneName: 'short' }).formatToParts(date)
  const value = parts.find((part) => part.type === 'timeZoneName')?.value ?? ''
  return /^(GMT|UTC)/.test(value) ? (ABBR_FALLBACK[timeZone] ?? value) : value
}

function offsetLabel(minutes: number): string {
  const sign = minutes < 0 ? '−' : '+'
  const abs = Math.abs(minutes)
  return `UTC${sign}${String(Math.floor(abs / 60)).padStart(2, '0')}:${String(abs % 60).padStart(2, '0')}`
}

function hourDelta(minutes: number): string {
  if (minutes === 0) return '±0 h'
  const hours = Math.abs(minutes) / 60
  // Newfoundland lands on a half hour; everything else is whole.
  return `${minutes < 0 ? '−' : '+'}${Number.isInteger(hours) ? hours : hours.toFixed(1)} h`
}

export type ZoneReading = {
  hour: number
  minute: number
  second: number
  /** `HH:MM:SS` in the zone's local time */
  time: string
  /** Zone abbreviation, e.g. `PST` / `PDT` */
  abbr: string
  /** `UTC−07:00` style offset */
  offset: string
  /** Distance from Eastern time, e.g. `−3 h` */
  fromEastern: string
}

export function readZone(date: Date, zone: Zone, easternOffset: number): ZoneReading {
  const p = toParts(date, zone.id)
  const minutes = offsetMinutes(date, zone.id)
  const pad = (n: number) => String(n).padStart(2, '0')

  return {
    hour: p.hour,
    minute: p.minute,
    second: p.second,
    time: `${pad(p.hour)}:${pad(p.minute)}:${pad(p.second)}`,
    abbr: abbreviation(date, zone.id),
    offset: offsetLabel(minutes),
    fromEastern: hourDelta(minutes - easternOffset),
  }
}
