"use client"

import * as React from "react"
import { fmtBtc } from "@/lib/format"
import { cn } from "@/lib/utils"

const RANGES = [
  { key: "7D", days: 7 },
  { key: "30D", days: 30 },
  { key: "90D", days: 90 },
] as const

/** Vault balance chart with range tabs and a hover/keyboard readout. */
export function VaultChart({ data }: { data: number[] }) {
  const [range, setRange] = React.useState<(typeof RANGES)[number]["key"]>("30D")
  const days = RANGES.find((r) => r.key === range)!.days
  const slice = data.slice(-days)
  const [hover, setHover] = React.useState<number | null>(null)
  const svg = React.useRef<SVGSVGElement>(null)

  const W = 600
  const H = 200
  const lo = Math.min(...slice) * 0.96
  const hi = Math.max(...slice) * 1.02
  const x = (i: number) => (i / Math.max(1, slice.length - 1)) * W
  const y = (v: number) => H - ((v - lo) / (hi - lo || 1)) * H
  const line = slice.map((v, i) => `${i ? "L" : "M"}${x(i).toFixed(1)} ${y(v).toFixed(1)}`).join(" ")
  const idx = hover ?? slice.length - 1
  const value = slice[idx]
  const change = slice[slice.length - 1] - slice[0]

  const onMove = (e: React.PointerEvent) => {
    const r = svg.current?.getBoundingClientRect()
    if (!r) return
    const t = Math.min(1, Math.max(0, (e.clientX - r.left) / r.width))
    setHover(Math.round(t * (slice.length - 1)))
  }
  const onKey = (e: React.KeyboardEvent) => {
    if (e.key !== "ArrowLeft" && e.key !== "ArrowRight") return
    e.preventDefault()
    const cur = hover ?? slice.length - 1
    setHover(Math.min(slice.length - 1, Math.max(0, cur + (e.key === "ArrowRight" ? 1 : -1))))
  }

  return (
    <div>
      <div className="flex flex-wrap items-end justify-between gap-4">
        <div aria-live="polite">
          <p className="font-mono text-[10.5px] uppercase tracking-[0.14em] text-ink-foreground/55">
            {hover === null || idx === slice.length - 1 ? "Today" : `${slice.length - 1 - idx} day${slice.length - 1 - idx === 1 ? "" : "s"} ago`}
          </p>
          <p className="mt-1 text-[clamp(2rem,4vw,2.8rem)] font-extrabold tabular-nums tracking-tight">
            ₿ {fmtBtc(value)}
          </p>
          <p className="text-xs text-emerald-400">
            +{fmtBtc(change)} BTC in {range}
          </p>
        </div>
        <div role="tablist" aria-label="Chart range" className="flex rounded-full border border-white/10 p-1">
          {RANGES.map((r) => (
            <button
              key={r.key}
              type="button"
              role="tab"
              aria-selected={range === r.key}
              onClick={() => {
                setRange(r.key)
                setHover(null)
              }}
              className="h-9 min-w-11 rounded-full px-3 font-mono text-xs text-ink-foreground/70 transition-colors aria-selected:bg-btc aria-selected:text-ink"
            >
              {r.key}
            </button>
          ))}
        </div>
      </div>

      <svg
        ref={svg}
        viewBox={`0 0 ${W} ${H}`}
        preserveAspectRatio="none"
        tabIndex={0}
        role="img"
        aria-label={`Vault balance over ${range}. Use left and right arrows to read values.`}
        onPointerMove={onMove}
        onPointerLeave={() => setHover(null)}
        onKeyDown={onKey}
        onBlur={() => setHover(null)}
        className="mt-5 block h-48 w-full cursor-crosshair touch-none rounded-lg outline-offset-4"
      >
        <defs>
          <linearGradient id="vault-fill" x1="0" x2="0" y1="0" y2="1">
            <stop offset="0%" stopColor="var(--btc)" stopOpacity="0.3" />
            <stop offset="100%" stopColor="var(--btc)" stopOpacity="0" />
          </linearGradient>
        </defs>
        {[0.25, 0.5, 0.75].map((t) => (
          <line key={t} x1="0" x2={W} y1={H * t} y2={H * t} stroke="rgba(255,255,255,.08)" strokeDasharray="3 6" vectorEffect="non-scaling-stroke" />
        ))}
        <path d={`${line} L ${W} ${H} L 0 ${H} Z`} fill="url(#vault-fill)" />
        <path d={line} fill="none" stroke="var(--btc)" strokeWidth="2.5" vectorEffect="non-scaling-stroke" strokeLinejoin="round" />
        <line x1={x(idx)} x2={x(idx)} y1="0" y2={H} stroke="rgba(255,255,255,.25)" vectorEffect="non-scaling-stroke" className={cn(hover === null && "opacity-0")} />
        <circle cx={x(idx)} cy={y(value)} r="5" fill="var(--btc)" stroke="#0b0b0c" strokeWidth="2" vectorEffect="non-scaling-stroke" />
      </svg>
      <div className="mt-2 flex justify-between font-mono text-[11px] text-ink-foreground/45">
        <span>{range} ago</span>
        <span>today</span>
      </div>
    </div>
  )
}
