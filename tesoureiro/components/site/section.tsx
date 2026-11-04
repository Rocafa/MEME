import { cn } from "@/lib/utils"

export function Section({
  id,
  index,
  eyebrow,
  title,
  lead,
  children,
  className,
}: {
  id?: string
  index?: string
  eyebrow: string
  title: React.ReactNode
  lead?: React.ReactNode
  children: React.ReactNode
  className?: string
}) {
  return (
    <section id={id} className={cn("scroll-mt-24 px-4 py-[clamp(3.5rem,8vw,6.5rem)] sm:px-6", className)}>
      <div className="mx-auto w-full max-w-6xl">
        <div className="reveal mb-10 max-w-2xl">
          <p className="font-mono text-[11px] uppercase tracking-[0.18em] text-btc-ink">
            {index ? <span className="mr-2 text-muted-foreground">{index}</span> : null}
            {eyebrow}
          </p>
          <h2 className="mt-3 text-[clamp(1.9rem,4vw,3rem)] font-extrabold leading-[1.02] tracking-[-0.03em] text-balance">
            {title}
          </h2>
          {lead ? <p className="mt-4 text-base leading-relaxed text-muted-foreground sm:text-lg">{lead}</p> : null}
        </div>
        {children}
      </div>
    </section>
  )
}

/** Small "SIM" tag for any simulated number. */
export function Sim({ className }: { className?: string }) {
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-full border border-btc/40 px-1.5 py-px font-mono text-[9.5px] font-semibold uppercase tracking-[0.14em] text-btc-ink",
        className,
      )}
      title="Simulated until launch"
    >
      Sim
    </span>
  )
}
