"use client"

import * as React from "react"
import { Bot, KeyRound, ShieldCheck, ShieldX, Sparkles } from "lucide-react"
import { check, PRESETS, RULES, type Action, type Proposal, type Verdict } from "@/lib/guardian"
import { cn } from "@/lib/utils"

type Stage = "idle" | "treasurer" | "guardian" | "done"
type Entry = { id: number; label: string; v: Verdict }

const ACTIONS: { key: Action; label: string; unit: string; min: number; max: number; step: number }[] = [
  { key: "swap", label: "Swap fees to cbBTC", unit: "SOL", min: 0.1, max: 3, step: 0.05 },
  { key: "burn", label: "Burn tokens", unit: "% of supply", min: 0.1, max: 4, step: 0.1 },
  { key: "spend", label: "Spend from the vault", unit: "% of vault", min: 1, max: 100, step: 1 },
  { key: "payout", label: "Pay holders", unit: "BTC", min: 0.001, max: 0.05, step: 0.001 },
]

const describe = (p: Proposal) => {
  const a = ACTIONS.find((x) => x.key === p.action)!
  const extra =
    p.action === "swap" ? ` at ${p.slippage}% slippage` : p.action === "burn" ? (p.announced ? ", announced" : ", no notice") : ""
  return `${a.label}: ${p.amount} ${a.unit}${extra}`
}

export function GuardianGame() {
  const [p, setP] = React.useState<Proposal>(PRESETS[0].p)
  const [stage, setStage] = React.useState<Stage>("idle")
  const [verdict, setVerdict] = React.useState<Verdict | null>(null)
  const [log, setLog] = React.useState<Entry[]>([])
  const timers = React.useRef<number[]>([])
  const nextId = React.useRef(1)

  React.useEffect(() => () => timers.current.forEach(clearTimeout), [])

  const reduced = () =>
    typeof window !== "undefined" && window.matchMedia("(prefers-reduced-motion: reduce)").matches

  const submit = (proposal: Proposal, label?: string) => {
    timers.current.forEach(clearTimeout)
    const v = check(proposal)
    const fast = reduced()
    setVerdict(null)
    setStage("treasurer")
    timers.current = [
      window.setTimeout(() => setStage("guardian"), fast ? 0 : 550),
      window.setTimeout(() => {
        setVerdict(v)
        setStage("done")
        setLog((l) => [{ id: nextId.current++, label: label ?? describe(proposal), v }, ...l].slice(0, 6))
      }, fast ? 0 : 1250),
    ]
  }

  const action = ACTIONS.find((a) => a.key === p.action)!
  const refused = log.filter((e) => !e.v.ok).length

  const node = (active: boolean, done: boolean, tone?: "ok" | "no") =>
    cn(
      "relative flex flex-col items-center gap-2 rounded-2xl border p-4 text-center transition-all duration-300",
      active && "scale-[1.03] border-btc bg-btc/10 shadow-[0_0_0_4px_color-mix(in_oklch,var(--btc)_18%,transparent)]",
      done && tone === "ok" && "border-emerald-600/50 bg-emerald-600/10",
      done && tone === "no" && "border-red-600/50 bg-red-600/10",
    )

  return (
    <div className="grid gap-4 lg:grid-cols-5">
      {/* Builder */}
      <div className="reveal rounded-2xl border bg-card p-6 lg:col-span-2">
        <p className="flex items-center gap-2 text-sm font-bold">
          <Sparkles className="size-4 text-btc-ink" /> Write a proposal
        </p>

        <fieldset className="mt-4">
          <legend className="text-xs font-medium uppercase tracking-wider text-muted-foreground">Action</legend>
          <div className="mt-2 grid grid-cols-2 gap-2">
            {ACTIONS.map((a) => (
              <button
                key={a.key}
                type="button"
                aria-pressed={p.action === a.key}
                onClick={() => setP({ action: a.key, amount: a.key === "swap" ? 0.6 : a.min, slippage: 0.5, announced: false })}
                className="min-h-11 rounded-xl border px-3 py-2 text-left text-sm transition-colors hover:bg-muted aria-pressed:border-ink aria-pressed:bg-ink aria-pressed:text-ink-foreground"
              >
                {a.label}
              </button>
            ))}
          </div>
        </fieldset>

        <label className="mt-5 block">
          <span className="flex items-baseline justify-between text-xs font-medium uppercase tracking-wider text-muted-foreground">
            Amount
            <span className="font-mono text-sm normal-case tracking-normal text-foreground">
              {p.amount} {action.unit}
            </span>
          </span>
          <input
            type="range"
            min={action.min}
            max={action.max}
            step={action.step}
            value={p.amount}
            onChange={(e) => setP({ ...p, amount: Number(e.target.value) })}
            className="mt-3 w-full accent-[var(--btc)]"
          />
        </label>

        {p.action === "swap" && (
          <label className="mt-4 block">
            <span className="flex items-baseline justify-between text-xs font-medium uppercase tracking-wider text-muted-foreground">
              Max slippage
              <span className="font-mono text-sm normal-case tracking-normal text-foreground">{p.slippage}%</span>
            </span>
            <input
              type="range"
              min={0.1}
              max={5}
              step={0.1}
              value={p.slippage}
              onChange={(e) => setP({ ...p, slippage: Number(e.target.value) })}
              className="mt-3 w-full accent-[var(--btc)]"
            />
          </label>
        )}

        {p.action === "burn" && (
          <label className="mt-4 flex min-h-11 cursor-pointer items-center gap-3 text-sm">
            <input
              type="checkbox"
              checked={p.announced}
              onChange={(e) => setP({ ...p, announced: e.target.checked })}
              className="size-4 accent-[var(--btc)]"
            />
            Announced 24 hours ahead
          </label>
        )}

        <button
          type="button"
          onClick={() => submit(p)}
          className="mt-6 inline-flex h-12 w-full items-center justify-center gap-2 rounded-full bg-ink text-sm font-semibold text-ink-foreground transition-transform hover:scale-[1.01] active:scale-[0.99]"
        >
          <Bot className="size-4" /> Send to the Guardian
        </button>

        <p className="mt-6 text-xs font-medium uppercase tracking-wider text-muted-foreground">Or try one</p>
        <div className="mt-2 flex flex-wrap gap-2">
          {PRESETS.map((x) => (
            <button
              key={x.label}
              type="button"
              onClick={() => {
                setP(x.p)
                submit(x.p, x.label)
              }}
              className="min-h-10 rounded-full border px-3.5 py-2 text-xs transition-colors hover:border-ink hover:bg-muted"
            >
              {x.label}
            </button>
          ))}
        </div>
      </div>

      {/* Pipeline + verdict */}
      <div className="flex flex-col gap-4 lg:col-span-3">
        <div className="reveal rounded-2xl border bg-card p-6">
          <div className="grid grid-cols-3 items-stretch gap-2 sm:gap-4">
            <div className={node(stage === "treasurer", stage === "guardian" || stage === "done")}>
              <span className="grid size-10 place-items-center rounded-xl bg-ink text-btc">
                <Bot className="size-5" />
              </span>
              <span className="text-sm font-semibold">Treasurer</span>
              <span className="text-[11px] text-muted-foreground">proposes</span>
            </div>
            <div
              className={node(
                stage === "guardian",
                stage === "done",
                verdict ? (verdict.ok ? "ok" : "no") : undefined,
              )}
            >
              <span className="grid size-10 place-items-center rounded-xl bg-ink text-btc">
                {verdict && !verdict.ok ? <ShieldX className="size-5 text-red-400" /> : <ShieldCheck className="size-5" />}
              </span>
              <span className="text-sm font-semibold">Guardian</span>
              <span className="text-[11px] text-muted-foreground">checks rules</span>
            </div>
            <div className={node(false, stage === "done" && !!verdict?.ok, "ok")}>
              <span className="grid size-10 place-items-center rounded-xl bg-ink text-btc">
                <KeyRound className="size-5" />
              </span>
              <span className="text-sm font-semibold">Multisig</span>
              <span className="text-[11px] text-muted-foreground">2 of 3 sign</span>
            </div>
          </div>

          <div className="mt-6 min-h-28 rounded-xl bg-muted/60 p-5" aria-live="polite">
            {stage === "idle" && (
              <p className="text-sm text-muted-foreground">
                Build a proposal on the left, or pick one. Try to get money out of the vault. You won&apos;t.
              </p>
            )}
            {(stage === "treasurer" || stage === "guardian") && (
              <p className="flex items-center gap-2 text-sm text-muted-foreground">
                <span className="size-2 animate-pulse rounded-full bg-btc" />
                {stage === "treasurer" ? "The Treasurer is writing it up…" : "The Guardian is checking the rules…"}
              </p>
            )}
            {stage === "done" && verdict && (
              <div className="enter">
                <p
                  className={cn(
                    "font-mono text-xs font-semibold uppercase tracking-[0.16em]",
                    verdict.ok ? "text-emerald-700" : "text-red-700",
                  )}
                >
                  {verdict.ok ? "Approved" : "Refused"} · rule {verdict.rule}
                </p>
                <p className="mt-2 text-base leading-relaxed">{verdict.reason}</p>
              </div>
            )}
          </div>
        </div>

        <div className="grid gap-4 sm:grid-cols-2">
          <div className="reveal rounded-2xl border bg-card p-6">
            <p className="text-sm font-bold">The rules</p>
            <ol className="mt-3 space-y-3">
              {RULES.map((r) => (
                <li
                  key={r.id}
                  className={cn(
                    "rounded-lg p-2 text-sm transition-colors",
                    verdict?.rule === r.id && (verdict.ok ? "bg-emerald-600/10" : "bg-red-600/10"),
                  )}
                >
                  <span className="mr-2 font-mono text-xs text-btc-ink">{r.id}</span>
                  <span className="font-semibold">{r.title}.</span>{" "}
                  <span className="text-muted-foreground">{r.text}</span>
                </li>
              ))}
            </ol>
          </div>
          <div className="reveal rounded-2xl border bg-card p-6">
            <div className="flex items-baseline justify-between">
              <p className="text-sm font-bold">Your attempts</p>
              <p className="font-mono text-xs text-muted-foreground">
                Guardian {refused} · You 0
              </p>
            </div>
            {log.length === 0 ? (
              <p className="mt-3 text-sm text-muted-foreground">Nothing yet.</p>
            ) : (
              <ul className="mt-3 space-y-2">
                {log.map((e) => (
                  <li key={e.id} className="enter flex items-start gap-2 text-sm">
                    <span
                      className={cn(
                        "mt-0.5 shrink-0 rounded px-1.5 font-mono text-[10px] font-semibold uppercase",
                        e.v.ok ? "bg-emerald-600/15 text-emerald-800" : "bg-red-600/15 text-red-800",
                      )}
                    >
                      {e.v.ok ? "ok" : "no"}
                    </span>
                    <span className="min-w-0 truncate">{e.label}</span>
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
