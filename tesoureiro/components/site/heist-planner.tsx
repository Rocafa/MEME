"use client"

import * as React from "react"
import { Siren, Star } from "lucide-react"
import { CREATOR_FEE, REF } from "@/lib/data"
import { HEIST, STARS } from "@/lib/heist"
import { fmtBtc, fmtCompactUsd, fmtInt } from "@/lib/format"
import { cn } from "@/lib/utils"

const VMIN = Math.log10(2_000)
const VMAX = Math.log10(2_000_000)
const toVol = (t: number) => Math.round(10 ** (VMIN + (VMAX - VMIN) * t) / 100) * 100
const fromVol = (v: number) => (Math.log10(v) - VMIN) / (VMAX - VMIN)

const DECAYS = [
  { key: "flat", label: "Crowd stays", k: 0 },
  { key: "fade", label: "Crowd thins", k: 0.015 },
  { key: "crash", label: "Crowd leaves", k: 0.06 },
] as const

const HORIZON = 365

/** Loot planner: volume and Heist Days in, wanted level over time out. */
export function HeistPlanner() {
  const [t, setT] = React.useState(fromVol(40_000))
  const [heistDays, setHeistDays] = React.useState(1)
  const [decay, setDecay] = React.useState<(typeof DECAYS)[number]["key"]>("fade")
  const [day, setDay] = React.useState(120)

  const vol = toVol(t)
  const k = DECAYS.find((d) => d.key === decay)!.k

  // Daily vault balance for a year. Heist Days are spread evenly through each 30-day month.
  const series = React.useMemo(() => {
    const out: number[] = []
    const every = heistDays ? Math.floor(30 / heistDays) : 0
    let btc = 0
    for (let d = 1; d <= HORIZON; d++) {
      const m = (d - 1) % 30
      const isHeistDay = every > 0 && m % every === 0 && m / every < heistDays
      const share = isHeistDay ? HEIST.heistDayShare : HEIST.vaultShare
      btc += (vol * Math.exp(-k * d) * CREATOR_FEE * share) / REF.btcUsd
      out.push(btc)
    }
    return out
  }, [vol, k, heistDays])

  const now = series[day - 1]
  const stars = STARS.filter((s) => now >= s.btc).length
  const eta = STARS.map((s) => {
    const i = series.findIndex((b) => b >= s.btc)
    return i === -1 ? null : i + 1
  })
  const nextStar = STARS[stars]

  const W = 600
  const H = 160
  const max = Math.max(series[HORIZON - 1], STARS[Math.min(4, stars)].btc) * 1.08
  const y = (b: number) => H - (b / max) * H
  const x = (i: number) => (i / (HORIZON - 1)) * W
  const path = series.map((b, i) => `${i ? "L" : "M"}${x(i).toFixed(1)} ${y(b).toFixed(1)}`).join(" ")

  return (
    <div className="grid gap-4 lg:grid-cols-5">
      <div className="reveal rounded-2xl border bg-card p-6 lg:col-span-2">
        <Range label="Daily trading volume" value={`$${fmtInt(vol)}`} min={0} max={1} step={0.001} v={t} onChange={setT} />
        <Range
          label="Heist Days per month"
          value={heistDays ? `${heistDays} × 100% to vault` : "None"}
          min={0}
          max={4}
          step={1}
          v={heistDays}
          onChange={setHeistDays}
        />
        <fieldset className="mt-5">
          <legend className="text-xs font-medium uppercase tracking-wider text-muted-foreground">What the crowd does</legend>
          <div className="mt-2 grid grid-cols-3 gap-2">
            {DECAYS.map((d) => (
              <button
                key={d.key}
                type="button"
                aria-pressed={decay === d.key}
                onClick={() => setDecay(d.key)}
                className="min-h-11 rounded-xl border px-2 text-xs font-medium transition-colors hover:bg-muted aria-pressed:border-btc aria-pressed:bg-btc aria-pressed:text-ink"
              >
                {d.label}
              </button>
            ))}
          </div>
        </fieldset>
        <p className="mt-5 text-xs leading-relaxed text-muted-foreground">
          0.30% creator fee × {Math.round(HEIST.vaultShare * 100)}% to the vault (100% on Heist Days), at a $
          {fmtInt(REF.btcUsd)} BTC reference. A
          projection for a coin that doesn&apos;t exist yet, not a promise.
        </p>
      </div>

      <div className="reveal rounded-2xl border bg-ink p-6 lg:col-span-3">
        <div className="flex flex-wrap items-start justify-between gap-4">
          <div aria-live="polite">
            <p className="font-mono text-[10.5px] uppercase tracking-[0.16em] text-muted-foreground">Day {day} · wanted level</p>
            <div className="mt-2 flex gap-1.5" aria-label={`${stars} of 5 stars`}>
              {STARS.map((s, i) => (
                <Star
                  key={s.btc}
                  className={cn("size-8 transition-all duration-300 sm:size-9", i < stars && "scale-110")}
                  style={{ color: i < stars ? "var(--btc)" : "rgb(255 255 255 / .18)", fill: i < stars ? "var(--btc)" : "transparent" }}
                />
              ))}
            </div>
            <p className="mt-2 text-lg font-bold">{stars ? STARS[stars - 1].title : "Nobody's looking yet"}</p>
          </div>
          <div className="sm:text-right">
            <p className="font-mono text-[10.5px] uppercase tracking-[0.16em] text-muted-foreground">In the vault</p>
            <p className="mt-1 text-[clamp(1.8rem,4vw,2.6rem)] font-extrabold tabular-nums tracking-tight">₿ {fmtBtc(now)}</p>
            <p className="font-mono text-xs text-muted-foreground">≈ {fmtCompactUsd(now * REF.btcUsd)}</p>
          </div>
        </div>

        <svg viewBox={`0 0 ${W} ${H}`} preserveAspectRatio="none" className="mt-5 block h-40 w-full" aria-hidden>
          {STARS.filter((s) => s.btc <= max).map((s) => (
            <line key={s.btc} x1="0" x2={W} y1={y(s.btc)} y2={y(s.btc)} stroke="rgb(255 255 255 / .1)" strokeDasharray="4 6" vectorEffect="non-scaling-stroke" />
          ))}
          <path d={`${path} L ${W} ${H} L 0 ${H} Z`} fill="var(--btc)" opacity="0.12" />
          <path d={path} fill="none" stroke="var(--btc)" strokeWidth="2.5" vectorEffect="non-scaling-stroke" />
          <line x1={x(day - 1)} x2={x(day - 1)} y1="0" y2={H} stroke="rgb(255 255 255 / .35)" vectorEffect="non-scaling-stroke" />
          <circle cx={x(day - 1)} cy={y(now)} r="5" fill="var(--btc)" stroke="#05060d" strokeWidth="2" vectorEffect="non-scaling-stroke" />
        </svg>
        <label className="mt-3 block">
          <span className="sr-only">Scrub to day</span>
          <input
            type="range"
            min={1}
            max={HORIZON}
            value={day}
            onChange={(e) => setDay(Number(e.target.value))}
            className="w-full accent-[var(--btc)]"
            aria-valuetext={`Day ${day}`}
          />
        </label>
        <div className="flex justify-between font-mono text-[11px] text-muted-foreground">
          <span>Launch</span>
          <span>Drag to scrub the year</span>
          <span>Day {HORIZON}</span>
        </div>

        <ol className="mt-5 grid gap-2 sm:grid-cols-5">
          {STARS.map((s, i) => (
            <li
              key={s.btc}
              className={cn(
                "rounded-xl border p-3 transition-colors",
                i < stars ? "border-btc/60 bg-btc/10" : "border-white/10",
              )}
            >
              <p className="font-mono text-[10px] text-muted-foreground">
                {"★".repeat(i + 1)} · ₿ {fmtBtc(s.btc)}
              </p>
              <p className="mt-1 text-sm font-semibold">{eta[i] ? `Day ${eta[i]}` : "Not this year"}</p>
            </li>
          ))}
        </ol>
        {nextStar && (
          <p className="mt-4 flex items-start gap-2 text-sm text-muted-foreground">
            <Siren className="mt-0.5 size-4 shrink-0 text-btc" />
            Next: <b className="text-foreground">{nextStar.title}</b> — {nextStar.beat}
          </p>
        )}
      </div>
    </div>
  )
}

function Range({
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
        <span className="font-mono text-sm normal-case tracking-normal text-foreground">{value}</span>
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
