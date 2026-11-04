"use client"

import * as React from "react"
import { ExternalLink, Flame, Lock, Repeat, Wallet } from "lucide-react"
import type { TxKind } from "@/lib/data"

const ICON: Record<TxKind, typeof Repeat> = {
  "Fee claim": Wallet,
  "Swap SOL → cbBTC": Repeat,
  Burn: Flame,
  "Multisig signature": Lock,
}

const FILTERS: ("All" | TxKind)[] = ["All", "Swap SOL → cbBTC", "Burn", "Fee claim", "Multisig signature"]

export function ActivityTable({ rows }: { rows: { kind: TxKind; amount: string; time: string; sig: string }[] }) {
  const [f, setF] = React.useState<(typeof FILTERS)[number]>("All")
  const shown = f === "All" ? rows : rows.filter((r) => r.kind === f)

  return (
    <div>
      <div role="radiogroup" aria-label="Filter activity" className="flex flex-wrap gap-1.5 px-5">
        {FILTERS.map((k) => (
          <button
            key={k}
            type="button"
            role="radio"
            aria-checked={f === k}
            onClick={() => setF(k)}
            className="h-8 rounded-full border px-3 text-xs font-medium transition-colors hover:bg-muted aria-checked:border-ink aria-checked:bg-ink aria-checked:text-ink-foreground"
          >
            {k === "Swap SOL → cbBTC" ? "Swaps" : k === "Multisig signature" ? "Signatures" : k === "Fee claim" ? "Fee claims" : k === "Burn" ? "Burns" : "All"}
          </button>
        ))}
      </div>
      <div className="mt-3 overflow-x-auto">
        <table className="w-full min-w-[520px] text-sm">
          <thead>
            <tr className="border-b text-left text-xs uppercase tracking-wider text-muted-foreground">
              <th className="px-5 py-3 font-medium">Type</th>
              <th className="px-5 py-3 text-right font-medium">Amount</th>
              <th className="px-5 py-3 font-medium">When</th>
              <th className="px-5 py-3 text-right font-medium">Transaction</th>
            </tr>
          </thead>
          <tbody aria-live="polite">
            {shown.map((r) => {
              const Icon = ICON[r.kind]
              return (
                <tr key={r.sig} className="enter border-b last:border-0 transition-colors hover:bg-muted/50">
                  <td className="px-5 py-3">
                    <span className="flex items-center gap-2">
                      <Icon className="size-4 text-muted-foreground" />
                      {r.kind}
                    </span>
                  </td>
                  <td className="px-5 py-3 text-right font-mono tabular-nums">{r.amount}</td>
                  <td className="px-5 py-3 text-muted-foreground">{r.time}</td>
                  <td className="px-5 py-3 text-right">
                    <span className="inline-flex items-center gap-1 font-mono text-xs text-muted-foreground" title="Sample. The real Solscan link appears at launch.">
                      {r.sig}
                      <ExternalLink className="size-3 opacity-40" />
                    </span>
                  </td>
                </tr>
              )
            })}
          </tbody>
        </table>
      </div>
    </div>
  )
}
