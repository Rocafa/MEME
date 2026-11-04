"use client"

import * as React from "react"
import { Check, Copy } from "lucide-react"
import { TOKEN } from "@/lib/data"
import { cn } from "@/lib/utils"

/** The contract, with the first and last 4 characters highlighted for eye-checking. */
export function ContractLine({ tone = "dark", className }: { tone?: "dark" | "light"; className?: string }) {
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

  const dark = tone === "dark"
  return (
    <div className={cn("flex flex-wrap items-center justify-center gap-2 font-mono text-xs", className)}>
      <span className={dark ? "text-ink-foreground/50" : "text-muted-foreground"}>Contract</span>
      {a ? (
        <button
          type="button"
          onClick={copy}
          className={cn(
            "inline-flex items-center gap-2 rounded-full border px-3 py-1.5",
            dark ? "border-white/15 bg-white/5 text-ink-foreground" : "bg-card",
          )}
          aria-label="Copy contract address"
        >
          <span>
            <b className="text-btc">{a.slice(0, 4)}</b>
            {a.slice(4, -4)}
            <b className="text-btc">{a.slice(-4)}</b>
          </span>
          {copied ? <Check className="size-3.5" /> : <Copy className="size-3.5" />}
        </button>
      ) : (
        <span
          className={cn(
            "rounded-full border border-dashed px-3 py-1.5",
            dark ? "border-white/20 text-ink-foreground/80" : "text-muted-foreground",
          )}
        >
          Published here at launch. Any address before that is fake.
        </span>
      )}
      <span aria-live="polite" className="sr-only">
        {copied ? `Copied. Check it ends in ${a?.slice(-4)}.` : ""}
      </span>
    </div>
  )
}
