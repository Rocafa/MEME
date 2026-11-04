"use client"

import * as React from "react"
import { CheckCircle2, CircleDashed, XCircle } from "lucide-react"
import type { DiaryKind } from "@/lib/data"
import { cn } from "@/lib/utils"

const KIND: Record<DiaryKind, { label: string; icon: typeof CheckCircle2; cls: string }> = {
  executed: { label: "Executed", icon: CheckCircle2, cls: "text-emerald-700" },
  proposed: { label: "Proposed", icon: CircleDashed, cls: "text-muted-foreground" },
  refused: { label: "Refused by the Guardian", icon: XCircle, cls: "text-red-700" },
}

const FILTERS: { key: "all" | DiaryKind; label: string }[] = [
  { key: "all", label: "All" },
  { key: "executed", label: "Executed" },
  { key: "refused", label: "Refused" },
  { key: "proposed", label: "Pending" },
]

export function Diary({ items }: { items: { time: string; kind: DiaryKind; text: string }[] }) {
  const [filter, setFilter] = React.useState<"all" | DiaryKind>("all")
  const shown = filter === "all" ? items : items.filter((d) => d.kind === filter)

  return (
    <div className="mt-4">
      <div role="radiogroup" aria-label="Filter the diary" className="flex flex-wrap gap-1.5">
        {FILTERS.map((f) => (
          <button
            key={f.key}
            type="button"
            role="radio"
            aria-checked={filter === f.key}
            onClick={() => setFilter(f.key)}
            className="h-8 rounded-full border px-3 text-xs font-medium transition-colors hover:bg-muted aria-checked:border-ink aria-checked:bg-ink aria-checked:text-ink-foreground"
          >
            {f.label}
            <span className="ml-1.5 opacity-60">
              {f.key === "all" ? items.length : items.filter((d) => d.kind === f.key).length}
            </span>
          </button>
        ))}
      </div>
      <ul className="mt-4 space-y-3" aria-live="polite">
        {shown.map((d) => {
          const k = KIND[d.kind]
          const Icon = k.icon
          return (
            <li key={d.time + d.text} className="enter rounded-xl bg-muted/60 p-4">
              <div className="flex items-center gap-2 text-xs">
                <Icon className={cn("size-3.5", k.cls)} />
                <span className={cn("font-medium", k.cls)}>{k.label}</span>
                <span className="ml-auto font-mono text-muted-foreground">{d.time}</span>
              </div>
              <p className="mt-1.5 text-sm leading-relaxed">{d.text}</p>
            </li>
          )
        })}
      </ul>
    </div>
  )
}
