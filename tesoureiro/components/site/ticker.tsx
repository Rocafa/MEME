import { cn } from "@/lib/utils"

/** Infinite marquee. Pauses on hover/focus, static under reduced motion. */
export function Ticker({ items, className }: { items: string[]; className?: string }) {
  const row = (hidden?: boolean) => (
    <ul className="flex shrink-0 items-center" aria-hidden={hidden || undefined}>
      {items.map((t, i) => (
        <li key={i} className="flex items-center gap-3 px-6 font-mono text-[11px] uppercase tracking-[0.14em]">
          <span className="size-1.5 rounded-full bg-btc" />
          {t}
        </li>
      ))}
    </ul>
  )
  return (
    <div className={cn("marquee py-3", className)} role="marquee" aria-label="Vault activity (simulated)">
      <div className="marquee-track">
        {row()}
        {row(true)}
      </div>
    </div>
  )
}
