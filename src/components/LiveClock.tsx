'use client'

import { useEffect, useState } from 'react'
import { person } from '@/lib/portfolio'
import { readZone } from '@/lib/zones'

const zone = { id: person.timeZone, name: person.city }

// Local time where the person is, ticking once a second.
export default function LiveClock({ className = '' }: { className?: string }) {
  // Stays null through the server render so the markup matches on hydration.
  const [time, setTime] = useState<string | null>(null)

  useEffect(() => {
    const tick = () => {
      const r = readZone(new Date(), zone, 0)
      setTime(`${r.time} ${r.abbr}`)
    }
    tick()
    const id = setInterval(tick, 1000)
    return () => clearInterval(id)
  }, [])

  return <span className={className}>{time ?? '--:--:-- ---'}</span>
}
