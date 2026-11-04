import type { Metadata } from "next"
import Link from "next/link"
import { ArrowRight, Scale, TriangleAlert } from "lucide-react"
import { sans, mono } from "@/lib/fonts"
import { PAD, PAD_FAQ, PAD_RISKS, PAD_SPLIT } from "@/lib/launchpad"
import { Hero } from "@/components/site/hero"
import { Ticker } from "@/components/site/ticker"
import { Section } from "@/components/site/section"
import { LaunchPreview } from "@/components/site/launch-preview"
import { PadEconomy } from "@/components/site/pad-economy"

export const metadata: Metadata = {
  title: "Heist Launchpad — every coin gets a Bitcoin vault · concept",
  description:
    "Concept: launch a coin and its fees fill its own cbBTC vault and burn the pad's parent token. Not live, no program deployed.",
}

const TICKER = [
  "Concept · phase 3 · not live",
  "Every coin gets its own vault",
  "65% of fees to the coin's vault",
  "10% buys back and burns the parent",
  "Vaults only accumulate",
  "2-of-3 multisig model",
  "Crew Pass pending legal review",
]

export default function LaunchpadPage() {
  return (
    <div className="theme-pad">
      <Hero
        wordmark="launchpad"
        eyebrow="Concept · phase 3 · not live · nothing to buy"
        title="Launch a coin."
        accent="It gets its own vault."
        sub="The machine version of NoKeys. Every coin launched through the pad fills a cbBTC vault of its own, and a slice of every fee burns the pad's parent token."
        primary={{ href: "#try", label: "Try a launch" }}
        secondary={{ href: "#economy", label: "Run the numbers" }}
        left={[
          { label: "Coin vault", value: "65%" },
          { label: "Parent burn", value: "10%" },
          { label: "Crew Pass", value: "10%*" },
        ]}
        right={[
          { label: "Status", value: "Concept" },
          { label: "Program", value: "Not deployed" },
          { label: "Signers", value: "2 of 3" },
        ]}
        palette={PAD.palette}
        fontFamily={sans.style.fontFamily}
        monoFamily={mono.style.fontFamily}
        hint="Move through it. Click to send a shockwave."
        showContract={false}
      />

      <Ticker items={TICKER} className="border-y border-white/10 bg-ink text-ink-foreground/80" />

      <div className="flex items-center justify-center gap-2 bg-btc px-4 py-3 text-center font-mono text-[11px] uppercase tracking-[0.14em] text-ink">
        <TriangleAlert className="size-3.5 shrink-0" /> Concept only. No program, no parent token, nothing to buy.
      </div>

      <Section
        id="try"
        index="01"
        eyebrow="Try a launch"
        title={
          <>
            Name it. <span className="text-btc-ink">Watch it get a vault.</span>
          </>
        }
        lead="Type a name and a ticker and simulate the launch. It all happens in your browser: nothing is signed, nothing is sent."
      >
        <LaunchPreview />
      </Section>

      <Section
        id="economy"
        index="02"
        eyebrow="Pad economics"
        title="What a day on the pad could look like."
        lead="How many coins launch, how many survive, how much a survivor trades. The defaults assume most coins die, because they do."
        className="bg-paper"
      >
        <PadEconomy />
      </Section>

      <Section id="split" index="03" eyebrow="Where every fee goes" title="Five lines, on every coin.">
        <div className="reveal overflow-hidden rounded-2xl border bg-card">
          <div className="flex h-3">
            {PAD_SPLIT.map((s, i) => (
              <div key={s.key} className="bg-btc" style={{ width: `${s.pct}%`, opacity: 1 - i * 0.18 }} />
            ))}
          </div>
          <ul className="divide-y">
            {PAD_SPLIT.map((s, i) => (
              <li key={s.key} className="grid gap-1 p-5 sm:grid-cols-[80px_220px_1fr] sm:items-baseline sm:gap-6">
                <span className="font-mono text-lg font-bold" style={{ opacity: 1 - i * 0.12 }}>
                  {s.pct}%
                </span>
                <span className="font-semibold">{s.label}</span>
                <span className="text-sm text-muted-foreground">{s.note}</span>
              </li>
            ))}
          </ul>
        </div>
        <p className="mt-4 flex items-start gap-2 text-sm text-muted-foreground">
          <Scale className="mt-0.5 size-4 shrink-0 text-btc" />
          * The Crew Pass pot pays NFT holders, which can make it a security. It ships only with a lawyer&apos;s sign-off;
          otherwise that 10% goes to the coin&apos;s vault.
        </p>
      </Section>

      <Section id="risks" index="04" eyebrow="Read first" title="How the pad goes wrong." className="bg-paper">
        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
          {PAD_RISKS.map((r, i) => (
            <article key={r.title} className="reveal rounded-2xl border bg-card p-6">
              <span className="font-mono text-xs text-muted-foreground">0{i + 1}</span>
              <h3 className="mt-3 font-bold">{r.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{r.text}</p>
            </article>
          ))}
        </div>
      </Section>

      <Section id="faq" index="05" eyebrow="Questions" title="What builders ask.">
        <div className="divide-y rounded-2xl border bg-card">
          {PAD_FAQ.map((f) => (
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

        <div className="mt-12 flex flex-col items-start gap-4 rounded-3xl border border-btc/40 bg-ink p-8 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <p className="font-mono text-[11px] uppercase tracking-[0.16em] text-btc-ink">The order</p>
            <p className="mt-2 text-2xl font-extrabold tracking-tight">NoKeys, then $HEIST, then the pad.</p>
          </div>
          <div className="flex flex-wrap gap-3">
            <Link
              href="/"
              className="inline-flex h-12 items-center gap-2 rounded-full bg-btc px-6 text-sm font-semibold text-ink transition-transform hover:scale-[1.03]"
            >
              See NoKeys <ArrowRight className="size-4" />
            </Link>
            <Link href="/heist" className="inline-flex h-12 items-center rounded-full border px-6 text-sm font-medium hover:bg-white/5">
              $HEIST
            </Link>
          </div>
        </div>

        <p className="mt-10 max-w-3xl text-xs leading-relaxed text-muted-foreground">
          Heist Launchpad is a concept. Nothing here is an offer, an investment or financial advice, and no part of it is
          live.
        </p>
      </Section>
    </div>
  )
}
