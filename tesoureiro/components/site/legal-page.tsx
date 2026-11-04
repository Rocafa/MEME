export type LegalSection = { title: string; body: React.ReactNode }

/** Shared layout for the terms and privacy drafts. */
export function LegalPage({
  title,
  updated,
  intro,
  sections,
}: {
  title: string
  updated: string
  intro: React.ReactNode
  sections: LegalSection[]
}) {
  return (
    <article className="px-4 pb-20 pt-28 sm:px-6">
      <div className="mx-auto max-w-3xl">
        <p className="rounded-xl border border-btc/40 bg-btc/10 px-4 py-3 text-sm leading-relaxed">
          <strong>Draft, pending legal review.</strong> This text has not been reviewed by a lawyer yet and will be replaced
          before launch. Nothing is live and nothing is for sale.
        </p>
        <p className="mt-10 font-mono text-[11px] uppercase tracking-[0.18em] text-btc-ink">Last updated {updated}</p>
        <h1 className="mt-3 text-[clamp(2rem,5vw,3.2rem)] font-extrabold leading-[1.02] tracking-[-0.03em]">{title}</h1>
        <div className="mt-5 text-base leading-relaxed text-muted-foreground">{intro}</div>
        <ol className="mt-12 space-y-10">
          {sections.map((s, i) => (
            <li key={s.title}>
              <h2 className="text-lg font-bold tracking-tight">
                <span className="mr-2 font-mono text-sm text-muted-foreground">{String(i + 1).padStart(2, "0")}</span>
                {s.title}
              </h2>
              <div className="mt-3 space-y-3 text-[15px] leading-relaxed text-muted-foreground [&_a]:underline [&_strong]:text-foreground">
                {s.body}
              </div>
            </li>
          ))}
        </ol>
      </div>
    </article>
  )
}
