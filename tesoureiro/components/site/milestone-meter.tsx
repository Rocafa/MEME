"use client"

import * as React from "react"
import { Star } from "lucide-react"

/** Five-star "wanted level". Hover or focus a star to read what it unlocks. */
export function MilestoneMeter({ items, accent }: { items: { label: string; reward: string }[]; accent: string }) {
  const [active, setActive] = React.useState(0)
  const cur = items[active]

  return (
    <div className="reveal grid gap-6 rounded-2xl bg-ink p-6 text-ink-foreground sm:p-8 lg:grid-cols-2 lg:items-center">
      <div role="radiogroup" aria-label="Milestones" className="flex gap-2 sm:gap-3">
        {items.map((m, i) => (
          <button
            key={m.label}
            type="button"
            role="radio"
            aria-checked={i === active}
            aria-label={`${m.label}: ${m.reward}`}
            onMouseEnter={() => setActive(i)}
            onFocus={() => setActive(i)}
            onClick={() => setActive(i)}
            className="grid size-14 place-items-center rounded-2xl border border-white/10 transition-transform hover:scale-110 sm:size-16"
          >
            <Star
              className="size-7 transition-colors sm:size-8"
              style={{ color: i <= active ? accent : "rgba(255,255,255,.25)", fill: i <= active ? accent : "transparent" }}
            />
          </button>
        ))}
      </div>
      <div aria-live="polite">
        <p className="font-mono text-xs uppercase tracking-[0.16em]" style={{ color: accent }}>
          {cur.label}
        </p>
        <p className="mt-2 text-2xl font-bold tracking-tight">{cur.reward}</p>
      </div>
    </div>
  )
}
