"use client"

import * as React from "react"
import Link from "next/link"
import { ArrowUpRight, Wallet } from "lucide-react"
import { TOKEN } from "@/lib/data"
import { WALLETS, buyHref, isLive, walletBrowseHref } from "@/lib/buy"
import { cn } from "@/lib/utils"

/**
 * The one Buy control. Every instance on the site points at the same place,
 * decided in lib/buy.ts, so there is never a second "official" route.
 */
export function BuyButton({
  size = "md",
  className,
  children,
}: {
  size?: "sm" | "md" | "lg"
  className?: string
  children?: React.ReactNode
}) {
  const href = buyHref()
  const live = isLive()
  const external = href.startsWith("http")

  const base =
    "inline-flex items-center justify-center gap-1.5 rounded-full bg-btc font-semibold text-ink transition-transform hover:scale-[1.03] active:scale-[0.98]"
  const sizes = { sm: "h-10 px-4 text-sm", md: "h-11 px-5 text-sm", lg: "h-14 px-7 text-base" }

  const label = children ?? (live ? `Buy ${TOKEN.ticker}` : `How to buy ${TOKEN.ticker}`)

  if (external) {
    return (
      <a href={href} target="_blank" rel="noopener noreferrer" className={cn(base, sizes[size], className)}>
        {label}
        <ArrowUpRight className="size-4" />
      </a>
    )
  }
  return (
    <Link href={href} className={cn(base, sizes[size], className)}>
      {label}
    </Link>
  )
}

/**
 * Reopens the venue inside a wallet's own browser.
 *
 * Most visitors land from a phone, inside the in-app browser of X or Telegram,
 * where no wallet exists. Without this they have to find the wallet app, open
 * its browser and type the address again — the step where the buy is lost.
 * Hidden before launch, when there is no venue to open.
 */
export function WalletOpen({ className }: { className?: string }) {
  const href = buyHref()
  if (!isLive() || !href.startsWith("http")) return null

  return (
    <div className={cn("flex flex-wrap items-center gap-2", className)}>
      <span className="inline-flex items-center gap-1.5 text-xs text-muted-foreground">
        <Wallet className="size-3.5" />
        On your phone
      </span>
      {WALLETS.map((w) => {
        const to = walletBrowseHref(w.id, href)
        if (!to) return null
        return (
          <a
            key={w.id}
            href={to}
            className="inline-flex h-10 items-center rounded-full border px-3.5 text-sm font-medium transition-colors hover:bg-muted"
          >
            {w.label}
          </a>
        )
      })}
    </div>
  )
}
