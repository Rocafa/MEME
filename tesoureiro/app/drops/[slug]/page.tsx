import type { Metadata } from "next"
import { Suspense } from "react"
import Link from "next/link"
import { notFound } from "next/navigation"
import { ArrowLeft, ArrowRight, TriangleAlert } from "lucide-react"
import { DROPS } from "@/lib/data"
import { sans, mono } from "@/lib/fonts"
import { Hero } from "@/components/site/hero"
import { Section } from "@/components/site/section"
import { MilestoneMeter } from "@/components/site/milestone-meter"

/** Drops that have grown into their own site. */
const FULL_SITES: Record<string, string> = { heist: "/heist", launchpad: "/launchpad" }

export function generateStaticParams() {
  return DROPS.map((d) => ({ slug: d.slug }))
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params
  const d = DROPS.find((x) => x.slug === slug)
  return d ? { title: `${d.ticker} — concept · NoKeys`, description: d.tagline } : {}
}

export default function DropPage({ params }: { params: Promise<{ slug: string }> }) {
  return (
    <Suspense fallback={<div className="min-h-svh bg-ink" aria-busy="true" />}>
      <DropContent params={params} />
    </Suspense>
  )
}

async function DropContent({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const i = DROPS.findIndex((x) => x.slug === slug)
  if (i === -1) notFound()
  const d = DROPS[i]
  const prev = DROPS[(i - 1 + DROPS.length) % DROPS.length]
  const next = DROPS[(i + 1) % DROPS.length]

  return (
    <>
      <Hero
        wordmark={d.wordmark}
        eyebrow={`${d.status} · not live · not for sale`}
        title={d.ticker}
        sub={d.tagline}
        primary={
          FULL_SITES[d.slug] ? { href: FULL_SITES[d.slug], label: "Open the full site" } : { href: "#concept", label: "Read the concept" }
        }
        secondary={{ href: "/drops", label: "All drops" }}
        left={[
          { label: "Tier", value: d.tier },
          { label: "Score", value: d.score.toFixed(2) },
        ]}
        right={d.split.slice(0, 3).map((s) => ({ label: s.label, value: `${s.pct}%` }))}
        palette={d.palette}
        fontFamily={sans.style.fontFamily}
        monoFamily={mono.style.fontFamily}
        hint="Move through it. Click to send a shockwave."
        showContract={false}
      />

      <div
        className="flex items-center justify-center gap-2 px-4 py-3 text-center font-mono text-[11px] uppercase tracking-[0.14em]"
        style={{ background: d.accent, color: d.palette.background }}
      >
        <TriangleAlert className="size-3.5 shrink-0" /> Concept only. No token, no contract, nothing to buy.
      </div>

      <Section id="concept" index="01" eyebrow="The idea" title={d.tagline} lead={d.pitch}>
        <ol className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
          {d.how.map((s, n) => (
            <li key={s.title} className="reveal rounded-2xl border bg-card p-6">
              <span className="font-mono text-xs text-muted-foreground">
                0{n + 1}
              </span>
              <h3 className="mt-4 text-lg font-bold tracking-tight">{s.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{s.text}</p>
            </li>
          ))}
        </ol>
      </Section>

      <Section index="02" eyebrow="Where every fee goes" title="The split." className="bg-paper">
        <div className="grid gap-4 lg:grid-cols-5">
          <div className="reveal rounded-2xl border bg-card p-6 lg:col-span-3">
            <div className="flex h-4 overflow-hidden rounded-full">
              {d.split.map((s, n) => (
                <div key={s.label} style={{ width: `${s.pct}%`, background: d.accent, opacity: 1 - n * 0.2 }} />
              ))}
            </div>
            <ul className="mt-6 divide-y">
              {d.split.map((s, n) => (
                <li key={s.label} className="flex items-center gap-3 py-3">
                  <span className="size-3 rounded-full" style={{ background: d.accent, opacity: 1 - n * 0.2 }} />
                  <span className="text-sm font-medium">{s.label}</span>
                  <span className="ml-auto font-mono text-sm tabular-nums">{s.pct}%</span>
                </li>
              ))}
            </ul>
          </div>
          <div className="reveal rounded-2xl border bg-card p-6 lg:col-span-2">
            <p className="text-sm font-bold">Why now</p>
            <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{d.whyNow}</p>
            <p className="mt-6 text-sm font-bold">What it would be built with</p>
            <ul className="mt-3 flex flex-wrap gap-2">
              {d.stack.map((s) => (
                <li key={s} className="rounded-full border px-3 py-1 font-mono text-xs">
                  {s}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </Section>

      {d.milestones && (
        <Section index="03" eyebrow="Milestones" title="Hover the stars.">
          <MilestoneMeter items={d.milestones} accent={d.accent} />
        </Section>
      )}

      <Section index={d.milestones ? "04" : "03"} eyebrow="Read first" title="How this one could go wrong." className="bg-paper">
        <ul className="grid gap-3 sm:grid-cols-3">
          {d.risks.map((r, n) => (
            <li key={r} className="reveal rounded-2xl border bg-card p-6">
              <span className="font-mono text-xs text-muted-foreground">0{n + 1}</span>
              <p className="mt-3 text-sm leading-relaxed">{r}</p>
            </li>
          ))}
        </ul>

        <nav aria-label="More drops" className="mt-12 grid gap-3 sm:grid-cols-2">
          <Link href={`/drops/${prev.slug}`} className="group rounded-2xl border bg-card p-5 transition-colors hover:border-ink">
            <span className="flex items-center gap-1 text-xs text-muted-foreground">
              <ArrowLeft className="size-3.5 transition-transform group-hover:-translate-x-0.5" /> Previous
            </span>
            <span className="mt-1 block text-lg font-bold">{prev.ticker}</span>
          </Link>
          <Link href={`/drops/${next.slug}`} className="group rounded-2xl border bg-card p-5 text-right transition-colors hover:border-ink">
            <span className="flex items-center justify-end gap-1 text-xs text-muted-foreground">
              Next <ArrowRight className="size-3.5 transition-transform group-hover:translate-x-0.5" />
            </span>
            <span className="mt-1 block text-lg font-bold">{next.ticker}</span>
          </Link>
        </nav>
      </Section>
    </>
  )
}
