"use client"

import * as React from "react"
import { Check, Copy, ShieldCheck } from "lucide-react"
import { TOKEN } from "@/lib/data"

export function ContractCard() {
  const [copied, setCopied] = React.useState(false)
  const address = TOKEN.contract

  const copy = async () => {
    if (!address) return
    try {
      await navigator.clipboard.writeText(address)
      setCopied(true)
      setTimeout(() => setCopied(false), 1600)
    } catch {
      /* área de transferência indisponível */
    }
  }

  return (
    <div className="rounded-xl border bg-card p-4">
      <div className="flex items-center gap-2 text-xs font-medium uppercase tracking-wider text-muted-foreground">
        <ShieldCheck className="size-4 text-btc" />
        Contrato oficial
      </div>
      <div className="mt-3 flex items-center gap-2">
        <code className="min-w-0 flex-1 truncate rounded-lg bg-muted px-3 py-2.5 font-mono text-sm">
          {address ?? "Publicado aqui no dia do lançamento"}
        </code>
        <button
          type="button"
          onClick={copy}
          disabled={!address}
          className="inline-flex size-10 shrink-0 items-center justify-center rounded-lg border bg-background transition-colors hover:bg-muted disabled:opacity-40"
          aria-label="Copiar endereço do contrato"
        >
          {copied ? <Check className="size-4" /> : <Copy className="size-4" />}
        </button>
      </div>
      <p className="mt-3 text-xs leading-relaxed text-muted-foreground">
        Confira sempre os primeiros e os últimos caracteres. Cópias com o mesmo nome e ticker vão aparecer no
        pump.fun: o único endereço verdadeiro é o desta página.
      </p>
    </div>
  )
}
