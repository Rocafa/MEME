"use client"

import * as React from "react"
import { Check, Copy, ShieldCheck } from "lucide-react"
import { TOKEN } from "@/lib/data"

export function ContractCard() {
  const [copied, setCopied] = React.useState(false)
  const a = TOKEN.contract

  const copy = async () => {
    if (!a) return
    try {
      await navigator.clipboard.writeText(a)
      setCopied(true)
      setTimeout(() => setCopied(false), 1800)
    } catch {
      /* clipboard unavailable */
    }
  }

  return (
    <div className="rounded-2xl border bg-card p-5">
      <div className="flex items-center gap-2 text-xs font-medium uppercase tracking-wider text-muted-foreground">
        <ShieldCheck className="size-4 text-btc-ink" />
        Official contract
      </div>
      <div className="mt-3 flex items-center gap-2">
        <code className="min-w-0 flex-1 truncate rounded-xl bg-muted px-3 py-3 font-mono text-sm">
          {a ? (
            <>
              <b className="text-btc-ink">{a.slice(0, 4)}</b>
              {a.slice(4, -4)}
              <b className="text-btc-ink">{a.slice(-4)}</b>
            </>
          ) : (
            "Published here on launch day"
          )}
        </code>
        <button
          type="button"
          onClick={copy}
          disabled={!a}
          className="inline-flex size-11 shrink-0 items-center justify-center rounded-xl border bg-background transition-colors hover:bg-muted disabled:opacity-40"
          aria-label="Copy contract address"
        >
          {copied ? <Check className="size-4" /> : <Copy className="size-4" />}
        </button>
      </div>
      <p className="mt-3 text-xs leading-relaxed text-muted-foreground">
        Check the first and last four characters every time. Copies with the same name and ticker will show up on
        pump.fun. The only real address is the one on this page.
      </p>
      <span aria-live="polite" className="sr-only">
        {copied ? "Contract copied" : ""}
      </span>
    </div>
  )
}
