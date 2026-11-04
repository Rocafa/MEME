"use client"

import * as React from "react"

const TIERS = ["All", "S", "A"] as const

/** Filters its children by their data-tier attribute, without re-rendering the cards. */
export function DropsFilter({ children }: { children: React.ReactNode }) {
  const [tier, setTier] = React.useState<(typeof TIERS)[number]>("All")
  const grid = React.useRef<HTMLDivElement>(null)

  React.useEffect(() => {
    grid.current?.querySelectorAll<HTMLElement>("[data-tier]").forEach((el) => {
      el.hidden = tier !== "All" && el.dataset.tier !== tier
    })
  }, [tier])

  return (
    <>
      <div role="radiogroup" aria-label="Filter by tier" className="mt-10 flex gap-2">
        {TIERS.map((t) => (
          <button
            key={t}
            type="button"
            role="radio"
            aria-checked={tier === t}
            onClick={() => setTier(t)}
            className="h-10 rounded-full border border-white/15 px-4 text-sm transition-colors hover:bg-white/10 aria-checked:border-btc aria-checked:bg-btc aria-checked:text-ink"
          >
            {t === "All" ? "All tiers" : `Tier ${t}`}
          </button>
        ))}
      </div>
      <div ref={grid} className="mt-6 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
        {children}
      </div>
    </>
  )
}
