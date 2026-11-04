"use client"

import * as React from "react"
import { CREATOR_FEE, REF } from "@/lib/data"
import { PAD_SPLIT } from "@/lib/launchpad"
import { fmtBtc, fmtCompactUsd, fmtInt } from "@/lib/format"

const VMIN = Math.log10(500)
const VMAX = Math.log10(500_000)
const toVol = (t: number) => Math.round(10 ** (VMIN + (VMAX - VMIN) * t) / 10) * 10
const fromVol = (v: number) => (Math.log10(v) - VMIN) / (VMAX - VMIN)

/** Pad economics per day: coins launched × survivors × volume → where the fees go. */
export function PadEconomy() {
  const [coins, setCoins] = React.useState(200)
  const [survive, setSurvive] = React.useState(3)
  const [t, setT] = React.useState(fromVol(20_000))

  const vol = toVol(t)
  const alive = Math.round((coins * survive) / 100)
  // Survivors trade at the chosen volume; the rest trade 2% of it.
  const padVolume = alive * vol + (coins - alive) * vol * 0.02
  const fees = padVolume * CREATOR_FEE
  const max = Math.max(...PAD_SPLIT.map((s) => s.pct))

  return (
    <div className="grid gap-4 lg:grid-cols-5">
      <div className="reveal rounded-2xl border bg-card p-6 lg:col-span-2">
        <Range label="Coins launched per day" value={fmtInt(coins)} min={1} max={1000} step={1} v={coins} onChange={setCoins} />
        <Range label="Coins that keep trading" value={`${survive}%  ·  ${fmtInt(alive)} coins`} min={0} max={30} step={1} v={survive} onChange={setSurvive} />
        <Range label="Daily volume of a survivor" value={`$${fmtInt(vol)}`} min={0} max={1} step={0.001} v={t} onChange={setT} />
        <p className="mt-5 text-xs leading-relaxed text-muted-foreground">
          Coins that die still trade a little (2% of a survivor&apos;s volume here). The 3% default is closer to what
          launchpads see than any number you&apos;ll find in a pitch deck.
        </p>
      </div>

      <div className="reveal rounded-2xl border bg-ink p-6 lg:col-span-3">
        <div className="flex flex-wrap items-end justify-between gap-4">
          <div>
            <p className="font-mono text-[10.5px] uppercase tracking-[0.16em] text-muted-foreground">Creator fees across the pad, per day</p>
            <p className="mt-1 text-[clamp(2rem,4.5vw,3rem)] font-extrabold tabular-nums tracking-tight">{fmtCompactUsd(fees)}</p>
          </div>
          <p className="font-mono text-xs text-muted-foreground">on {fmtCompactUsd(padVolume)} of daily volume</p>
        </div>
        <ul className="mt-6 space-y-3" aria-live="polite">
          {PAD_SPLIT.map((s, i) => {
            const usd = (fees * s.pct) / 100
            return (
              <li key={s.key}>
                <div className="flex items-baseline justify-between gap-3 text-sm">
                  <span className="font-medium">
                    {s.label} <span className="font-mono text-xs text-muted-foreground">{s.pct}%</span>
                  </span>
                  <span className="font-mono tabular-nums">
                    {fmtCompactUsd(usd)}
                    {s.key === "vault" && <span className="text-muted-foreground"> · ₿ {fmtBtc(usd / REF.btcUsd)}</span>}
                  </span>
                </div>
                <div className="mt-1.5 h-2 overflow-hidden rounded-full bg-white/10">
                  <div
                    className="h-full rounded-full bg-btc transition-[width] duration-500"
                    style={{ width: `${(s.pct / max) * 100}%`, opacity: 1 - i * 0.15 }}
                  />
                </div>
              </li>
            )
          })}
        </ul>
        <p className="mt-5 text-xs text-muted-foreground">
          Vault BTC is split across every coin&apos;s own vault, at a ${fmtInt(REF.btcUsd)} BTC reference. A projection
          for a product that doesn&apos;t exist yet.
        </p>
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
      <label htmlFor={id} className="flex items-baseline justify-between gap-3 text-xs font-medium uppercase tracking-wider text-muted-foreground">
        {label}
        <span className="whitespace-nowrap font-mono text-sm normal-case tracking-normal text-foreground">{value}</span>
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
