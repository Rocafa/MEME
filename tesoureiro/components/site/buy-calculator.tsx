"use client"

import * as React from "react"
import { CREATOR_FEE, FEE_SPLIT, REF } from "@/lib/data"
import { fmtInt, fmtNum } from "@/lib/format"

const PRESETS = [0.1, 0.5, 1, 5]

export function BuyCalculator() {
  const [sol, setSol] = React.useState(1)
  const fee = sol * CREATOR_FEE
  const toVault = fee * (FEE_SPLIT[0].pct / 100)
  const toBurn = fee * (FEE_SPLIT[1].pct / 100)
  const sats = Math.round(toVault * REF.solBtc * 1e8)

  return (
    <div className="rounded-xl border bg-card p-5">
      <h3 className="font-semibold">Quanto sua compra leva ao cofre</h3>
      <p className="mt-1 text-sm text-muted-foreground">
        A taxa de criador é 0,30% de cada negociação. Veja para onde vai a parte da sua.
      </p>

      <label htmlFor="sol" className="mt-5 block text-xs font-medium uppercase tracking-wider text-muted-foreground">
        Valor da compra (SOL)
      </label>
      <div className="mt-2 flex flex-wrap items-center gap-2">
        <input
          id="sol"
          type="number"
          min={0}
          step={0.1}
          inputMode="decimal"
          value={Number.isFinite(sol) ? sol : 0}
          onChange={(e) => setSol(Math.max(0, Number(e.target.value) || 0))}
          className="h-10 w-32 rounded-lg border bg-background px-3 font-mono text-sm outline-none focus-visible:ring-3 focus-visible:ring-ring/50"
        />
        {PRESETS.map((p) => (
          <button
            key={p}
            type="button"
            onClick={() => setSol(p)}
            className="h-10 rounded-lg border px-3 font-mono text-sm transition-colors hover:bg-muted aria-pressed:bg-ink aria-pressed:text-ink-foreground"
            aria-pressed={sol === p}
          >
            {fmtNum(p, 1)}
          </button>
        ))}
      </div>

      <dl className="mt-5 grid grid-cols-3 gap-3">
        <div className="rounded-lg bg-muted p-3">
          <dt className="text-[11px] uppercase tracking-wider text-muted-foreground">Taxa total</dt>
          <dd className="mt-1 font-mono text-sm font-medium">{fmtNum(fee, 5)} SOL</dd>
        </div>
        <div className="rounded-lg bg-btc/12 p-3">
          <dt className="text-[11px] uppercase tracking-wider text-muted-foreground">Ao cofre</dt>
          <dd className="mt-1 font-mono text-sm font-medium">≈ {fmtInt(sats)} sats</dd>
        </div>
        <div className="rounded-lg bg-muted p-3">
          <dt className="text-[11px] uppercase tracking-wider text-muted-foreground">À queima</dt>
          <dd className="mt-1 font-mono text-sm font-medium">{fmtNum(toBurn, 5)} SOL</dd>
        </div>
      </dl>
      <p className="mt-3 text-xs text-muted-foreground">
        Estimativa com SOL/BTC de referência ({fmtNum(REF.solBtc, 4)}). Não inclui a taxa do protocolo do pump.fun nem
        slippage.
      </p>
    </div>
  )
}
