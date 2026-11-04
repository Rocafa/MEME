"use client"

import * as React from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { Bitcoin, Menu, X } from "lucide-react"
import { cn } from "@/lib/utils"

const LINKS: { href: string; label: string }[] = [
  { href: "/#guardian", label: "Rob the vault" },
  { href: "/dashboard", label: "Dashboard" },
  { href: "/drops", label: "Drops" },
  { href: "/docs", label: "Docs" },
]

/** Extra links for the mobile menu only. On desktop they live in the footer. */
const MORE: { href: string; label: string }[] = [
  { href: "/#simulator", label: "Simulator" },
  { href: "/heist", label: "$HEIST" },
  { href: "/launchpad", label: "Launchpad" },
  { href: "/dashboard#verify", label: "Verify the wallets" },
]

export function Nav() {
  const pathname = usePathname()
  const [open, setOpen] = React.useState(false)

  return (
    <header className="pointer-events-none fixed inset-x-0 top-0 z-50 px-3 pt-3 sm:px-5 sm:pt-4">
      <div className="mx-auto flex max-w-7xl items-center gap-3">
        <Link
          href="/"
          className="pointer-events-auto flex h-11 items-center gap-2 rounded-full border border-white/10 bg-ink/75 pl-1.5 pr-4 text-sm font-semibold tracking-tight text-ink-foreground backdrop-blur-md"
        >
          <span className="grid size-8 place-items-center rounded-full bg-btc text-ink">
            <Bitcoin className="size-4" />
          </span>
          Tesoureiro
        </Link>

        <nav
          aria-label="Main"
          className="pointer-events-auto mx-auto hidden h-11 items-center gap-1 rounded-full border border-white/10 bg-ink/75 px-1.5 text-ink-foreground backdrop-blur-md md:flex"
        >
          {LINKS.map((l) => {
            const active = !l.href.includes("#") && pathname === l.href
            return (
              <Link
                key={l.href}
                href={l.href}
                className={cn(
                  "rounded-full px-3.5 py-1.5 text-sm text-ink-foreground/75 transition-colors hover:bg-white/10 hover:text-ink-foreground",
                  active && "bg-white/12 text-ink-foreground",
                )}
              >
                {l.label}
              </Link>
            )
          })}
        </nav>

        <div className="pointer-events-auto ml-auto flex items-center gap-2 md:ml-0">
          <span className="hidden h-11 items-center rounded-full border border-white/10 bg-ink/75 px-3.5 font-mono text-[10.5px] uppercase tracking-[0.16em] text-btc backdrop-blur-md lg:inline-flex">
            ● Pre-launch
          </span>
          <Link
            href="/dashboard#buy"
            className="inline-flex h-11 items-center rounded-full bg-btc px-4 text-sm font-semibold text-ink transition-transform hover:scale-[1.03] active:scale-[0.98]"
          >
            Buy $TESOUREIRO
          </Link>
          <button
            type="button"
            onClick={() => setOpen((v) => !v)}
            aria-expanded={open}
            aria-controls="mobile-menu"
            aria-label={open ? "Close menu" : "Open menu"}
            className="grid size-11 place-items-center rounded-full border border-white/10 bg-ink/75 text-ink-foreground backdrop-blur-md md:hidden"
          >
            {open ? <X className="size-4" /> : <Menu className="size-4" />}
          </button>
        </div>
      </div>

      {open && (
        <nav
          id="mobile-menu"
          aria-label="Mobile"
          className="pointer-events-auto mx-auto mt-2 grid max-w-7xl gap-1 rounded-2xl border border-white/10 bg-ink/90 p-2 text-ink-foreground backdrop-blur-md md:hidden"
        >
          {[...LINKS, ...MORE].map((l) => (
            <Link key={l.href} href={l.href} onClick={() => setOpen(false)} className="rounded-xl px-4 py-3 text-base hover:bg-white/10">
              {l.label}
            </Link>
          ))}
        </nav>
      )}
    </header>
  )
}
