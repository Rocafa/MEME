import type { Metadata } from "next"
import { DROPS } from "@/lib/data"
import { DropCard } from "@/components/site/drop-card"
import { DropsFilter } from "@/components/site/drops-filter"

export const metadata: Metadata = {
  title: "Next drops — NoKeys",
  description: "Concept coins in the pipeline. None of them is live and none of them is for sale.",
}

export default function DropsPage() {
  return (
    <div className="bg-ink pb-24 pt-32 text-ink-foreground">
      <div className="mx-auto w-full max-w-6xl px-4 sm:px-6">
        <p className="font-mono text-[11px] uppercase tracking-[0.18em] text-btc">Next drops · concepts</p>
        <h1 className="mt-3 max-w-3xl text-[clamp(2.4rem,6vw,4.6rem)] font-extrabold leading-[0.98] tracking-[-0.035em] text-balance">
          One vault is the start. <span className="text-btc">Here&apos;s what comes next.</span>
        </h1>
        <p className="mt-5 max-w-2xl text-base leading-relaxed text-ink-foreground/65 sm:text-lg">
          Ranked by potential: narrative, timing, sustainability, build effort, regulatory risk and how crowded the idea
          is. None of these coins is live, and none of them is for sale.
        </p>
        <DropsFilter>
          {DROPS.map((d) => (
            <div key={d.slug} data-tier={d.tier}>
              <DropCard d={d} />
            </div>
          ))}
        </DropsFilter>
      </div>
    </div>
  )
}
