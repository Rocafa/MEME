"use client"

import { Check, Copy } from "lucide-react"
import { TOKEN } from "@/lib/data"
import { AddressText, CopyToast, useCopy } from "@/components/site/copy-address"
import { cn } from "@/lib/utils"

/** The contract, with the first and last 4 characters highlighted for eye-checking. */
export function ContractLine({ tone = "dark", className }: { tone?: "dark" | "light"; className?: string }) {
  const a = TOKEN.contract
  const { copied, failed, copy } = useCopy(a)

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
            <AddressText address={a} tone={tone} />
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
      <CopyToast copied={copied} failed={failed} tail={a?.slice(-4)} />
    </div>
  )
}
