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

const formatters = new Map<string, Intl.DateTimeFormat>()

function formatter(timeZone: string) {
  let cached = formatters.get(timeZone)
  if (!cached) {
    cached = new Intl.DateTimeFormat('en-CA', {
      timeZone,
      hour12: false,
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
    })
    formatters.set(timeZone, cached)
  }
  return cached
}

export type ZoneReading = {
  hour: number
  minute: number
  second: number
  /** `HH:MM:SS` in the zone's local time */
  time: string
}

export function readZone(date: Date, zone: Zone): ZoneReading {
  const parts = formatter(zone.id).formatToParts(date)
  const map: Record<string, number> = {}
  for (const part of parts) {
    if (part.type !== 'literal') map[part.type] = Number(part.value)
  }
  // `en-CA` renders midnight as hour 24; normalise it back to 0.
  const hour = map.hour === 24 ? 0 : map.hour

  const pad = (n: number) => String(n).padStart(2, '0')
  return {
    hour,
    minute: map.minute,
    second: map.second,
    time: `${pad(hour)}:${pad(map.minute)}:${pad(map.second)}`,
  }
}
