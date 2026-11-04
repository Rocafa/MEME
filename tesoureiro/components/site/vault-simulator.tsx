"use client"

import * as React from "react"
import { CREATOR_FEE, FEE_SPLIT, MILESTONES, REF, VAULT } from "@/lib/data"
import { fmtBtc, fmtCompactUsd, fmtInt } from "@/lib/format"
import { cn } from "@/lib/utils"

// Slider runs on a log scale: $2k to $2M daily volume.
const VMIN = Math.log10(2_000)
const VMAX = Math.log10(2_000_000)
const toVol = (t: number) => Math.round(10 ** (VMIN + (VMAX - VMIN) * t) / 100) * 100
const fromVol = (v: number) => (Math.log10(v) - VMIN) / (VMAX - VMIN)

const DECAYS = [
  { key: "flat", label: "Volume holds", k: 0 },
  { key: "fade", label: "Volume fades", k: 0.015 },
  { key: "crash", label: "Volume dies", k: 0.06 },
] as const

export function VaultSimulator() {
  const [t, setT] = React.useState(fromVol(25_000))
  const [days, setDays] = React.useState(180)
  const [decay, setDecay] = React.useState<(typeof DECAYS)[number]["key"]>("fade")
  const [btcPrice, setBtcPrice] = React.useState(REF.btcUsd)

  const vol = toVol(t)
  const k = DECAYS.find((d) => d.key === decay)!.k
  const share = FEE_SPLIT[0].pct / 100

  // Day-by-day projection with exponential volume decay.
  const series = React.useMemo(() => {
    const out: number[] = []
    let btc = VAULT.btc
    for (let d = 1; d <= days; d++) {
      const v = vol * Math.exp(-k * d)
      btc += (v * CREATOR_FEE * share) / btcPrice
      out.push(btc)
    }
    return out
  }, [vol, k, share, btcPrice, days])

  const final = series[series.length - 1] ?? VAULT.btc
  const eta = MILESTONES.map((m) => {
    if (VAULT.btc >= m.btc) return { ...m, day: 0 }
    const i = series.findIndex((b) => b >= m.btc)
    return { ...m, day: i === -1 ? null : i + 1 }
  })

  const max = Math.max(final, MILESTONES.find((m) => m.btc > final)?.btc ?? final) * 1.05
  const lo = VAULT.btc * 0.85
  const y = (b: number) => H - ((b - lo) / (max - lo)) * H
  const W = 600
  const H = 200
  const path = series
    .map((b, i) => `${i ? "L" : "M"}${((i / Math.max(1, series.length - 1)) * W).toFixed(1)} ${y(b).toFixed(1)}`)
    .join(" ")

  return (
    <div className="grid gap-4 lg:grid-cols-5">
      <div className="reveal rounded-2xl border bg-card p-6 lg:col-span-2">
        <Slider
          label="Daily trading volume"
          value={`$${fmtInt(vol)}`}
          min={0}
          max={1}
          step={0.001}
          v={t}
          onChange={setT}
        />
        <Slider label="Days" value={`${days}`} min={7} max={365} step={1} v={days} onChange={setDays} />
        <Slider
          label="BTC price"
          value={fmtCompactUsd(btcPrice)}
          min={40_000}
          max={250_000}
          step={1_000}
          v={btcPrice}
          onChange={setBtcPrice}
        />

        <fieldset className="mt-5">
          <legend className="text-xs font-medium uppercase tracking-wider text-muted-foreground">What happens to volume</legend>
          <div className="mt-2 grid grid-cols-3 gap-2">
            {DECAYS.map((d) => (
              <button
                key={d.key}
                type="button"
                aria-pressed={decay === d.key}
                onClick={() => setDecay(d.key)}
                className="min-h-11 rounded-xl border px-2 text-xs font-medium transition-colors hover:bg-muted aria-pressed:border-ink aria-pressed:bg-ink aria-pressed:text-ink-foreground"
              >
                {d.label}
              </button>
            ))}
          </div>
        </fieldset>

        <p className="mt-5 text-xs leading-relaxed text-muted-foreground">
          0.30% creator fee × {FEE_SPLIT[0].pct}% to the vault, swapped at the BTC price you set. A projection, not a
          promise: most memecoin volume fades fast.
        </p>
      </div>

      <div className="reveal rounded-2xl bg-ink p-6 text-ink-foreground lg:col-span-3">
        <div className="flex flex-wrap items-end justify-between gap-4">
          <div>
            <p className="font-mono text-[10.5px] uppercase tracking-[0.16em] text-ink-foreground/55">
              Vault after {days} days
            </p>
            <p className="mt-1 text-[clamp(2.2rem,5vw,3.4rem)] font-extrabold tabular-nums tracking-tight">
              ₿ {fmtBtc(final)}
            </p>
          </div>
          <p className="font-mono text-xs text-ink-foreground/55">≈ {fmtCompactUsd(final * btcPrice)} at your BTC price</p>
        </div>

        <svg viewBox={`0 0 ${W} ${H}`} preserveAspectRatio="none" className="mt-5 block h-44 w-full" aria-hidden>
          {MILESTONES.filter((m) => m.btc <= max && m.btc >= lo).map((m) => (
            <g key={m.btc}>
              <line x1="0" x2={W} y1={y(m.btc)} y2={y(m.btc)} stroke="rgba(255,255,255,.12)" strokeDasharray="4 6" vectorEffect="non-scaling-stroke" />
            </g>
          ))}
          <path d={`${path} L ${W} ${H} L 0 ${H} Z`} fill="var(--btc)" opacity="0.14" />
          <path d={path} fill="none" stroke="var(--btc)" strokeWidth="2.5" vectorEffect="non-scaling-stroke" />
        </svg>

        <ol className="mt-5 grid gap-2 sm:grid-cols-5">
          {eta.map((m) => (
            <li
              key={m.btc}
              className={cn(
                "rounded-xl border border-white/10 p-3",
                m.day === 0 && "border-btc/50 bg-btc/10",
                m.day && m.day > 0 && "bg-white/[0.04]",
              )}
            >
              <p className="font-mono text-[10px] text-ink-foreground/55">₿ {fmtBtc(m.btc)}</p>
              <p className="mt-1 text-sm font-semibold">
                {m.day === 0 ? "Reached" : m.day ? `Day ${m.day}` : "Not in range"}
              </p>
            </li>
          ))}
        </ol>
      </div>
    </div>
  )
}

function Slider({
  label,
  value,
  min,
  max,
  step,
  v,
  onChange,
}: {
  label: string
  value: string
  min: number
  max: number
  step: number
  v: number
  onChange: (n: number) => void
}) {
  const id = React.useId()
  return (
    <div className="mt-5 first:mt-0">
      <label htmlFor={id} className="flex items-baseline justify-between text-xs font-medium uppercase tracking-wider text-muted-foreground">
        {label}
        <span className="font-mono text-base normal-case tracking-normal text-foreground">{value}</span>
      </label>
      <input
        id={id}
        type="range"
        min={min}
        max={max}
        step={step}
        value={v}
        onChange={(e) => onChange(Number(e.target.value))}
        className="mt-3 w-full accent-[var(--btc)]"
      />
    </div>
  )
}
