"use client"

import * as React from "react"
import Link from "next/link"

/** Mobile-only buy bar that appears once the first screen has scrolled away. */
export function StickyBuy() {
  const [show, setShow] = React.useState(false)

  React.useEffect(() => {
    const onScroll = () => setShow(window.scrollY > window.innerHeight * 0.8)
    onScroll()
    window.addEventListener("scroll", onScroll, { passive: true })
    return () => window.removeEventListener("scroll", onScroll)
  }, [])

  return (
    <div
      className={
        "fixed inset-x-3 bottom-3 z-40 flex items-center gap-3 rounded-full border border-white/10 bg-ink/90 p-1.5 pl-5 text-ink-foreground backdrop-blur-md transition-all duration-300 md:hidden " +
        (show ? "translate-y-0 opacity-100" : "pointer-events-none translate-y-6 opacity-0")
      }
      aria-hidden={!show}
    >
      <span className="text-sm font-semibold">$NOKEYS</span>
      <span className="font-mono text-[10px] uppercase tracking-[0.14em] text-btc">pre-launch</span>
      <Link
        href="/dashboard#buy"
        tabIndex={show ? 0 : -1}
        className="ml-auto inline-flex h-10 items-center rounded-full bg-btc px-4 text-sm font-semibold text-ink"
      >
        How to buy
      </Link>
    </div>
  )
}
