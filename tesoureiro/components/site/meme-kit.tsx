"use client"

import * as React from "react"
import { Check, Copy } from "lucide-react"
import { MEMES, SOCIALS } from "@/lib/data"
import { Mascot } from "@/components/site/mascot"
import { cn } from "@/lib/utils"

function CopyButton({ text }: { text: string }) {
  const [done, setDone] = React.useState(false)
  return (
    <button
      type="button"
      onClick={async () => {
        try {
          await navigator.clipboard.writeText(text)
          setDone(true)
          setTimeout(() => setDone(false), 1600)
        } catch {
          /* clipboard blocked: nothing to do */
        }
      }}
      className="inline-flex h-8 items-center gap-1.5 rounded-full border px-3 text-xs font-medium transition-colors hover:bg-muted"
      aria-label="Copy meme text"
    >
      {done ? <Check className="size-3.5" /> : <Copy className="size-3.5" />}
      {done ? "Copied" : "Copy"}
    </button>
  )
}

export function MemeKit() {
  return (
    <div className="grid gap-3 lg:grid-cols-3">
      {MEMES.map((m) => {
        const text = `${m.top}\n${m.bottom}\n\n$TESOUREIRO`
        return (
          <figure key={m.top} className="reveal flex flex-col overflow-hidden rounded-2xl border bg-card">
            <div
              className={cn(
                "grid grid-cols-[1fr_auto] items-center gap-3 p-5",
                m.mood === "deny" ? "bg-ink text-ink-foreground" : m.mood === "burn" ? "bg-btc/15" : "bg-paper",
              )}
            >
              <p className="text-[15px] font-bold leading-snug">{m.top}</p>
              <Mascot mood={m.mood} className={cn("w-16", m.mood === "deny" ? "text-ink-foreground" : "text-foreground")} />
            </div>
            <figcaption className="flex flex-1 items-end justify-between gap-3 p-5">
              <p className="text-[15px] font-extrabold leading-snug text-btc-ink">{m.bottom}</p>
              <CopyButton text={text} />
            </figcaption>
          </figure>
        )
      })}
    </div>
  )
}

export function Community() {
  return (
    <div className="reveal mt-3 grid gap-4 rounded-2xl border bg-card p-6 sm:grid-cols-[1fr_auto] sm:items-center">
      <div>
        <h3 className="text-lg font-bold tracking-tight">Join the crew</h3>
        <p className="mt-1 max-w-xl text-sm text-muted-foreground">
          The official accounts go live on launch day and get linked right here. Any account claiming to be us before that is fake.
        </p>
      </div>
      <ul className="flex flex-wrap gap-2">
        {SOCIALS.map((s) =>
          s.url ? (
            <li key={s.name}>
              <a
                href={s.url}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex h-11 items-center gap-2 rounded-full bg-ink px-5 text-sm font-semibold text-ink-foreground"
              >
                {s.name} <span className="text-ink-foreground/60">{s.handle}</span>
              </a>
            </li>
          ) : (
            <li key={s.name}>
              <span
                aria-disabled="true"
                className="inline-flex h-11 cursor-not-allowed items-center gap-2 rounded-full border border-dashed px-5 text-sm font-semibold text-muted-foreground"
              >
                {s.name}
                <span className="font-mono text-[10px] uppercase tracking-[0.14em]">Soon</span>
              </span>
            </li>
          ),
        )}
      </ul>
    </div>
  )
}
