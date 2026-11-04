import { ArrowUpRight } from "lucide-react"
import type { Drop } from "@/lib/data"
import { TiltCard } from "@/components/site/tilt-card"

export function DropCard({ d }: { d: Drop }) {
  return (
    <TiltCard
      href={`/drops/${d.slug}`}
      accent={d.accent}
      className="reveal border border-white/10 p-6"
    >
      <span className="block" style={{ background: "transparent" }}>
        <span className="flex items-center justify-between font-mono text-[10.5px] uppercase tracking-[0.16em]">
          <span style={{ color: d.accent }}>
            Tier {d.tier} · {d.score.toFixed(2)}
          </span>
          <span className="text-ink-foreground/50">{d.status}</span>
        </span>
        <span className="mt-8 block text-3xl font-extrabold tracking-tight text-ink-foreground">{d.ticker}</span>
        <span className="mt-2 block text-sm leading-relaxed text-ink-foreground/70">{d.tagline}</span>
        <span className="mt-6 flex h-1.5 overflow-hidden rounded-full bg-white/10">
          {d.split.map((s, i) => (
            <span
              key={s.label}
              style={{ width: `${s.pct}%`, background: d.accent, opacity: 1 - i * 0.22 }}
              title={`${s.label} ${s.pct}%`}
            />
          ))}
        </span>
        <span className="mt-6 inline-flex items-center gap-1 text-sm font-medium" style={{ color: d.accent }}>
          Read the concept
          <ArrowUpRight className="size-4 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
        </span>
      </span>
    </TiltCard>
  )
}
