import type { Metadata } from "next"
import Link from "next/link"
import { ArrowRight, Bot, Car, KeyRound, ScanSearch, Siren, TriangleAlert } from "lucide-react"
import { sans, mono } from "@/lib/fonts"
import { CREW, HEIST, HEIST_FAQ, HEIST_RISKS, HEIST_SPLIT, HEIST_TICKER, STARS } from "@/lib/heist"
import { fmtBtc } from "@/lib/format"
import { Hero } from "@/components/site/hero"
import { Ticker } from "@/components/site/ticker"
import { Section } from "@/components/site/section"
import { HeistPlanner } from "@/components/site/heist-planner"
import { MilestoneMeter } from "@/components/site/milestone-meter"

export const metadata: Metadata = {
  title: "$HEIST — the crew is stealing Bitcoin · concept",
  description:
    "Concept coin: every trade fills a public cbBTC vault and raises a five-star wanted level. An AI plans, a rule engine checks, a multisig signs. Not live.",
}

const CREW_ICON = [Bot, ScanSearch, KeyRound, Car]

const JOB = [
  { n: "01", t: "Every trade pays the crew", d: "Each buy and sell pays a 0.30% creator fee on the launch curve." },
  { n: "02", t: "The loot goes in the safe", d: "70% is swapped to cbBTC and locked in a 2-of-3 multisig. Nothing ever leaves." },
  { n: "03", t: "The wanted level rises", d: "Five Bitcoin milestones, five stars. Each star burns tokens and drops a chapter." },
  { n: "04", t: "Heist Day", d: "Announced 72 hours ahead. For one day, 100% of fees go to the vault." },
]

export default function HeistPage() {
  return (
    <div className="theme-heist">
      <Hero
        wordmark="heist"
        note="Concept · next drop · not live · not for sale"
        title="The crew is stealing Bitcoin."
        sub="Every trade of $HEIST fills a public cbBTC vault and pushes a five-star wanted level. An AI plans, a rule engine checks, two humans sign. Nobody walks out with the loot."
        primary={{ href: "#planner", label: "Plan the heist" }}
        secondary={{ href: "#job", label: "How the job works" }}
        stats={[
          { label: "To the vault", value: "70%" },
          { label: "Heist Day", value: "100%" },
          { label: "Stars", value: "★★★★★" },
          { label: "Status", value: "Concept" },
          { label: "Contract", value: "None yet" },
          { label: "AI keys", value: "0" },
        ]}
        palette={HEIST.palette}
        fontFamily={sans.style.fontFamily}
        monoFamily={mono.style.fontFamily}
        showContract={false}
      />

      <Ticker items={HEIST_TICKER} className="border-y border-white/10 bg-ink text-ink-foreground/80" />

      <div className="flex items-center justify-center gap-2 bg-btc px-4 py-3 text-center font-mono text-[11px] uppercase tracking-[0.14em] text-ink">
        <TriangleAlert className="size-3.5 shrink-0" /> Concept only. No token, no contract, nothing to buy. Any $HEIST trading
        today is not ours.
      </div>

      <Section
        id="job"
        index="01"
        eyebrow="The job"
        title={
          <>
            Four moves. No inside man needed.
          </>
        }
        lead="The whole plan is public before anyone trades. Every move will link to its transaction on Solscan."
      >
        <ol className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
          {JOB.map((s) => (
            <li key={s.n} className="reveal group rounded-2xl border bg-card p-6 transition-colors hover:border-btc/60">
              <span className="font-mono text-xs text-btc-ink">{s.n}</span>
              <h3 className="mt-6 text-lg font-bold tracking-tight">{s.t}</h3>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{s.d}</p>
            </li>
          ))}
        </ol>
      </Section>

      <Section
        id="planner"
        index="02"
        eyebrow="Loot planner"
        title="How long until most wanted?"
        lead="Set the volume and how many Heist Days a month. Drag through the year and watch the stars light up. The honest default is that the crowd thins."
        className="bg-paper"
      >
        <HeistPlanner />
      </Section>

      <Section id="stars" index="03" eyebrow="Wanted level" title="Five stars. Five burns. One story.">
        <MilestoneMeter
          items={STARS.map((s, i) => ({ label: `${"★".repeat(i + 1)} ${fmtBtc(s.btc)} BTC · ${s.title}`, reward: s.beat }))}
          accent="#ff3b3b"
        />
      </Section>

      <Section
        id="crew"
        index="04"
        eyebrow="The crew"
        title={
          <>
            The AI plans the job. It never holds the keys.
          </>
        }
        lead="Same safety model as NoKeys: a proposal, a rule check with no AI in it, and a 2-of-3 multisig."
        className="bg-paper"
      >
        <ul className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
          {CREW.map((c, i) => {
            const Icon = CREW_ICON[i]
            return (
              <li
                key={c.role}
                className="reveal group relative overflow-hidden rounded-2xl border bg-card p-6 transition-transform duration-300 hover:-translate-y-1"
              >
                <span
                  aria-hidden
                  className="absolute -right-6 -top-6 size-24 rounded-full bg-btc/10 transition-transform duration-500 group-hover:scale-150"
                />
                <span className="relative grid size-11 place-items-center rounded-xl bg-ink text-btc">
                  <Icon className="size-5" />
                </span>
                <p className="relative mt-5 font-mono text-[10.5px] uppercase tracking-[0.16em] text-muted-foreground">{c.who}</p>
                <h3 className="relative mt-1 text-lg font-bold">{c.role}</h3>
                <p className="relative mt-2 text-sm leading-relaxed text-muted-foreground">{c.job}</p>
              </li>
            )
          })}
        </ul>
        <Link
          href="/#guardian"
          className="mt-6 inline-flex min-h-11 items-center gap-2 text-sm font-semibold text-btc-ink hover:underline"
        >
          Try to rob the NoKeys vault with the same rules <ArrowRight className="size-4" />
        </Link>
      </Section>

      <Section id="split" index="05" eyebrow="Where every fee goes" title="Two lines. That's the whole split.">
        <div className="reveal rounded-2xl border bg-card p-6">
          <div className="flex h-4 overflow-hidden rounded-full">
            {HEIST_SPLIT.map((s, i) => (
              <div key={s.label} className={i ? "bg-foreground/25" : "bg-btc"} style={{ width: `${s.pct}%` }} />
            ))}
          </div>
          <ul className="mt-6 grid gap-6 sm:grid-cols-2">
            {HEIST_SPLIT.map((s, i) => (
              <li key={s.label} className="flex gap-3">
                <span className={`mt-1.5 size-3 shrink-0 rounded-full ${i ? "bg-foreground/25" : "bg-btc"}`} />
                <div>
                  <p className="flex items-baseline gap-3">
                    <span className="font-semibold">{s.label}</span>
                    <span className="font-mono text-sm">{s.pct}%</span>
                  </p>
                  <p className="mt-1 text-sm text-muted-foreground">{s.note}</p>
                </div>
              </li>
            ))}
          </ul>
          <p className="mt-6 flex items-start gap-2 rounded-xl bg-muted p-3 text-xs leading-relaxed text-muted-foreground">
            <Siren className="mt-0.5 size-3.5 shrink-0 text-btc" />
            Burns at each star are bought from the crew share. The vault never pays out to holders.
          </p>
        </div>
      </Section>

      <Section id="risks" index="06" eyebrow="Read before you buy anything" title="How this job goes wrong." className="bg-paper">
        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
          {HEIST_RISKS.map((r, i) => (
            <article key={r.title} className="reveal rounded-2xl border bg-card p-6">
              <span className="font-mono text-xs text-muted-foreground">0{i + 1}</span>
              <h3 className="mt-3 font-bold">{r.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{r.text}</p>
            </article>
          ))}
        </div>
      </Section>

      <Section id="faq" index="07" eyebrow="Questions" title="What everyone asks the crew.">
        <div className="divide-y rounded-2xl border bg-card">
          {HEIST_FAQ.map((f) => (
            <details key={f.q} className="group p-6 [&_summary::-webkit-details-marker]:hidden">
              <summary className="flex cursor-pointer list-none items-center justify-between gap-4 text-base font-semibold">
                {f.q}
                <span className="grid size-7 shrink-0 place-items-center rounded-full border font-mono text-sm transition-transform group-open:rotate-45">
                  +
                </span>
              </summary>
              <p className="mt-3 max-w-3xl text-sm leading-relaxed text-muted-foreground">{f.a}</p>
            </details>
          ))}
        </div>

        <div className="siren mt-12 flex flex-col items-start gap-4 rounded-3xl border border-btc/40 bg-ink p-8 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <p className="font-mono text-[11px] uppercase tracking-[0.16em] text-btc-ink">Not live yet</p>
            <p className="mt-2 text-2xl font-extrabold tracking-tight">NoKeys goes first. The crew follows.</p>
          </div>
          <div className="flex flex-wrap gap-3">
            <Link
              href="/"
              className="inline-flex h-12 items-center gap-2 rounded-full bg-btc px-6 text-sm font-semibold text-ink transition-transform hover:scale-[1.03]"
            >
              See NoKeys <ArrowRight className="size-4" />
            </Link>
            <Link href="/drops" className="inline-flex h-12 items-center rounded-full border px-6 text-sm font-medium hover:bg-white/5">
              All drops
            </Link>
          </div>
        </div>

        <p className="mt-10 max-w-3xl text-xs leading-relaxed text-muted-foreground">
          $HEIST is a concept for a speculative memecoin. It is not an investment, gives no claim on any vault and promises
          no return. Original world: no third-party game names, logos or characters. Nothing here is financial advice.
        </p>
      </Section>
    </div>
  )
}
