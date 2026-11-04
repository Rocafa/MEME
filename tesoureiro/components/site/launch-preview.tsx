"use client"

import * as React from "react"
import { Check, Loader2, Rocket } from "lucide-react"
import { PAD_SPLIT, PAD_STEPS } from "@/lib/launchpad"
import { cn } from "@/lib/utils"

const SWATCHES = ["#f7931a", "#ff3b3b", "#4ade80", "#60a5fa", "#b26bff", "#f1ede4"]

/** Launch preview: builds a coin card in the browser and animates the launch steps. Sends nothing. */
export function LaunchPreview() {
  const [name, setName] = React.useState("Night Shift")
  const [ticker, setTicker] = React.useState("SHIFT")
  const [color, setColor] = React.useState(SWATCHES[0])
  const [step, setStep] = React.useState(-1)
  const timers = React.useRef<number[]>([])

  React.useEffect(() => () => timers.current.forEach(clearTimeout), [])

  const launch = () => {
    timers.current.forEach(clearTimeout)
    const fast = window.matchMedia("(prefers-reduced-motion: reduce)").matches
    setStep(0)
    timers.current = PAD_STEPS.map((_, i) => window.setTimeout(() => setStep(i + 1), fast ? 0 : (i + 1) * 650))
  }

  const t = ticker.replace(/[^a-z0-9]/gi, "").toUpperCase().slice(0, 10) || "TICKER"
  const done = step >= PAD_STEPS.length

  return (
    <div className="grid gap-4 lg:grid-cols-5">
      <form
        className="reveal rounded-2xl border bg-card p-6 lg:col-span-2"
        onSubmit={(e) => {
          e.preventDefault()
          launch()
        }}
      >
        <label className="block">
          <span className="text-xs font-medium uppercase tracking-wider text-muted-foreground">Name</span>
          <input
            value={name}
            maxLength={32}
            onChange={(e) => {
              setName(e.target.value)
              setStep(-1)
            }}
            className="mt-2 h-11 w-full rounded-xl border bg-background px-3 text-base outline-none focus-visible:border-btc"
          />
        </label>
        <label className="mt-4 block">
          <span className="text-xs font-medium uppercase tracking-wider text-muted-foreground">Ticker</span>
          <div className="mt-2 flex h-11 items-center rounded-xl border bg-background px-3 focus-within:border-btc">
            <span className="font-mono text-muted-foreground">$</span>
            <input
              value={ticker}
              maxLength={10}
              onChange={(e) => {
                setTicker(e.target.value)
                setStep(-1)
              }}
              className="w-full bg-transparent pl-1 font-mono text-base uppercase outline-none"
            />
          </div>
        </label>
        <fieldset className="mt-4">
          <legend className="text-xs font-medium uppercase tracking-wider text-muted-foreground">Color</legend>
          <div className="mt-2 flex gap-2">
            {SWATCHES.map((c) => (
              <button
                key={c}
                type="button"
                aria-label={`Color ${c}`}
                aria-pressed={color === c}
                onClick={() => setColor(c)}
                className="grid size-11 place-items-center rounded-full border transition-transform hover:scale-110 aria-pressed:border-foreground"
              >
                <span className="size-7 rounded-full" style={{ background: c }} />
              </button>
            ))}
          </div>
        </fieldset>
        <button
          type="submit"
          className="mt-6 inline-flex h-12 w-full items-center justify-center gap-2 rounded-full bg-btc text-sm font-semibold text-ink transition-transform hover:scale-[1.01] active:scale-[0.99]"
        >
          <Rocket className="size-4" /> Simulate the launch
        </button>
        <p className="mt-3 text-xs text-muted-foreground">Preview only. Nothing is signed or sent.</p>
      </form>

      <div className="flex min-w-0 flex-col gap-4 lg:col-span-3">
        <div
          className="reveal relative overflow-hidden rounded-2xl border p-6"
          style={{ background: `radial-gradient(120% 120% at 100% 0%, ${color}33, transparent 60%), var(--card)` }}
        >
          <div className="flex items-start justify-between gap-4">
            <div className="min-w-0">
              <p className="font-mono text-[10.5px] uppercase tracking-[0.16em] text-muted-foreground">
                {done ? "Launched (simulated)" : "Draft"}
              </p>
              <p className="mt-2 truncate text-3xl font-extrabold tracking-tight" style={{ color }}>
                ${t}
              </p>
              <p className="truncate text-sm text-muted-foreground">{name || "Unnamed coin"}</p>
            </div>
            <span
              className="grid size-14 shrink-0 place-items-center rounded-2xl font-mono text-lg font-bold text-ink"
              style={{ background: color }}
              aria-hidden
            >
              {t.slice(0, 2)}
            </span>
          </div>
          <div className="mt-6 grid grid-cols-3 gap-3 text-sm">
            <div>
              <p className="text-xs text-muted-foreground">Own vault</p>
              <p className="font-mono font-semibold">₿ 0.0000</p>
            </div>
            <div>
              <p className="text-xs text-muted-foreground">To its vault</p>
              <p className="font-mono font-semibold">{PAD_SPLIT[0].pct}%</p>
            </div>
            <div>
              <p className="text-xs text-muted-foreground">Signers</p>
              <p className="font-mono font-semibold">2 of 3</p>
            </div>
          </div>
          <div className="mt-5 flex h-2 overflow-hidden rounded-full bg-muted">
            {PAD_SPLIT.map((s, i) => (
              <span key={s.key} title={`${s.label} ${s.pct}%`} style={{ width: `${s.pct}%`, background: color, opacity: 1 - i * 0.18 }} />
            ))}
          </div>
        </div>

        <ol className="reveal grid gap-2 rounded-2xl border bg-card p-4 sm:grid-cols-2" aria-live="polite">
          {PAD_STEPS.map((s, i) => {
            const state = step > i ? "done" : step === i ? "doing" : "todo"
            return (
              <li key={s.t} className={cn("flex gap-3 rounded-xl p-3 transition-colors", state === "done" && "bg-btc/10")}>
                <span
                  className={cn(
                    "grid size-7 shrink-0 place-items-center rounded-full border font-mono text-xs",
                    state === "done" && "border-btc bg-btc text-ink",
                  )}
                >
                  {state === "done" ? <Check className="size-3.5" /> : state === "doing" ? <Loader2 className="size-3.5 animate-spin" /> : i + 1}
                </span>
                <div>
                  <p className="text-sm font-semibold">{s.t}</p>
                  <p className="text-xs leading-relaxed text-muted-foreground">{s.d}</p>
                </div>
              </li>
            )
          })}
        </ol>
      </div>
    </div>
  )
}
