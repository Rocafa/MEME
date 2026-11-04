"use client"

import * as React from "react"
import { cn } from "@/lib/utils"

/** Table of contents with scroll-spy. Sticky sidebar on desktop, collapsible on mobile. */
export function DocsToc({ items }: { items: { id: string; label: string }[] }) {
  const [active, setActive] = React.useState(items[0]?.id)

  React.useEffect(() => {
    const els = items.map((i) => document.getElementById(i.id)).filter((e): e is HTMLElement => !!e)
    const io = new IntersectionObserver(
      (entries) => {
        const top = entries.filter((e) => e.isIntersecting).sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top)[0]
        if (top) setActive(top.target.id)
      },
      { rootMargin: "-96px 0px -65% 0px" },
    )
    els.forEach((e) => io.observe(e))
    return () => io.disconnect()
  }, [items])

  const list = () => (
    <ol className="space-y-0.5">
      {items.map((i, n) => (
        <li key={i.id}>
          <a
            href={`#${i.id}`}
            aria-current={active === i.id ? "location" : undefined}
            className={cn(
              "flex min-h-9 items-center gap-3 rounded-lg px-3 text-sm text-muted-foreground transition-colors hover:bg-muted hover:text-foreground",
              active === i.id && "bg-muted font-semibold text-foreground",
            )}
          >
            <span className={cn("font-mono text-[10.5px]", active === i.id && "text-btc-ink")}>{String(n + 1).padStart(2, "0")}</span>
            {i.label}
          </a>
        </li>
      ))}
    </ol>
  )

  return (
    <>
      <nav aria-label="On this page" className="sticky top-24 hidden max-h-[calc(100svh-7rem)] overflow-y-auto lg:block">
        <p className="mb-3 px-3 font-mono text-[10.5px] uppercase tracking-[0.16em] text-muted-foreground">On this page</p>
        {list()}
      </nav>
      <MobileToc>{list()}</MobileToc>
    </>
  )
}

function MobileToc({ children }: { children: React.ReactNode }) {
  return (
    <details className="group rounded-2xl border bg-card lg:hidden">
      <summary className="flex min-h-12 cursor-pointer list-none items-center justify-between px-4 text-sm font-semibold [&::-webkit-details-marker]:hidden">
        On this page
        <span className="font-mono text-muted-foreground transition-transform group-open:rotate-45">+</span>
      </summary>
      <div
        className="border-t p-2"
        onClick={(e) => {
          if ((e.target as HTMLElement).closest("a")) e.currentTarget.closest("details")?.removeAttribute("open")
        }}
      >
        {children}
      </div>
    </details>
  )
}
