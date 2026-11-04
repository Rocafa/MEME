import { Bot, Coins, Flame, KeyRound, ShieldCheck } from "lucide-react"
import { sans, mono } from "@/lib/fonts"
import { FAQ, FEE_SPLIT, MILESTONES, RISKS, TICKER, TOKEN } from "@/lib/data"
import { getSnapshot } from "@/lib/source"
import { buyHref, isLive } from "@/lib/buy"
import { fmtBtc, fmtCompact, fmtInt, satsPerMillion } from "@/lib/format"
import { Hero } from "@/components/site/hero"
import { Ticker } from "@/components/site/ticker"
import { Section, Sim } from "@/components/site/section"
import { cn } from "@/lib/utils"
import { CountUp, type CountFormat } from "@/components/site/count-up"
import { GuardianGame } from "@/components/site/guardian-game"
import { VaultSimulator } from "@/components/site/vault-simulator"
import { StickyBuy } from "@/components/site/sticky-buy"
import { BuyCalculator } from "@/components/site/buy-calculator"
import { BuyButton, WalletOpen } from "@/components/site/buy-button"
import { Mascot } from "@/components/site/mascot"
import { MemeKit, Community } from "@/components/site/meme-kit"

const STEPS = [
  { icon: Coins, title: "Every trade pays a fee", text: "Each buy and sell of $NOKEYS on pump.fun pays a 0.30% creator fee." },
  { icon: Bot, title: "The Treasurer proposes", text: "An AI reads the balance and proposes: swap to BTC, announce a milestone, burn." },
  { icon: ShieldCheck, title: "The Guardian checks", text: "A rule engine with no AI compares the proposal to public rules. Off-rule means refused." },
  { icon: KeyRound, title: "The multisig signs", text: "The vault sits in a 2-of-3 Squads multisig. The AI never holds a key." },
]

export default async function Home() {
  const s = await getSnapshot()
  const VAULT = s.vault
  const next = MILESTONES.find((m) => m.btc > VAULT.btc) ?? MILESTONES[MILESTONES.length - 1]
  const sats = satsPerMillion(VAULT.btc, TOKEN.supply)

  return (
    <>
      <Hero
        wordmark="nokeys"
        eyebrow={s.live ? "Live · read from Solana" : "Pre-launch · every number is simulated"}
        title="The AI that keeps a Bitcoin vault."
        accent="It holds no keys."
        sub="Every trade of $NOKEYS fills a public cbBTC vault. The Treasurer proposes, the Guardian checks fixed rules, a 2-of-3 multisig signs."
        primary={{ href: buyHref(), label: isLive() ? "Buy $NOKEYS" : "How to buy $NOKEYS" }}
        secondary={{ href: "#guardian", label: "Try to rob it" }}
        left={[
          { label: "Vault", value: `₿ ${fmtBtc(VAULT.btc)}` },
          { label: "Sats / 1M", value: fmtInt(sats) },
          { label: "Burned", value: VAULT.burned === null ? "—" : fmtCompact(VAULT.burned) },
        ]}
        right={[
          { label: "Next", value: `★ ${fmtBtc(next.btc)} BTC` },
          { label: "Refused", value: `${VAULT.refused ?? "—"} / ${VAULT.proposals ?? "—"}` },
          { label: "Signers", value: "2 of 3" },
        ]}
        palette={{ background: "#0b0b0c", ink: "#f5f2ea", warm: "#f7931a" }}
        fontFamily={sans.style.fontFamily}
        monoFamily={mono.style.fontFamily}
      />

      <Ticker items={TICKER} className="bg-ink text-ink-foreground/80" />

      {/* Guardian game */}
      <Section
        id="guardian"
        index="01"
        eyebrow="Try to rob the vault"
        title={
          <>
            The AI proposes. <span className="text-btc-ink">The Guardian decides.</span>
          </>
        }
        lead="Write a proposal the way the Treasurer would. The Guardian checks it against five public rules, with no AI and no exceptions. Go ahead, try to get money out."
      >
        <GuardianGame />
      </Section>

      {/* How it works */}
      <Section
        id="how"
        index="02"
        eyebrow="How it works"
        title="Four steps. None of them needs you to trust anyone."
        className="bg-paper"
      >
        <ol className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
          {STEPS.map(({ icon: Icon, title, text }, i) => (
            <li key={title} className="reveal rounded-2xl border bg-card p-6">
              <div className="flex items-center justify-between">
                <span className="grid size-10 place-items-center rounded-xl bg-ink text-btc">
                  <Icon className="size-5" />
                </span>
                <span className="font-mono text-xs text-muted-foreground">0{i + 1}</span>
              </div>
              <h3 className="mt-5 text-lg font-bold tracking-tight">{title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{text}</p>
            </li>
          ))}
        </ol>
      </Section>

      {/* Vault */}
      <Section
        id="vault"
        index="03"
        eyebrow="The vault"
        title={
          <>
            One number. <span className="text-btc-ink">It only goes into the vault.</span>
          </>
        }
        lead="Fees come in, get swapped to cbBTC and stay in a multisig. Nothing is paid out. Every move will link to Solscan. Fixed at launch, changed only in public."
      >
        <div className="grid gap-3 lg:grid-cols-5">
        <dl className="grid grid-cols-2 gap-3 lg:col-span-3 lg:content-start">
          {([
            { label: "BTC in the vault", value: VAULT.btc, f: "btc" },
            { label: "Sats per 1M tokens", value: sats, f: "int" },
            { label: "Fees claimed", value: VAULT.feesClaimedSol, f: "sol" },
            { label: "Tokens burned", value: VAULT.burned, f: "compact" },
          ] as { label: string; value: number | null; f: CountFormat }[])
            .filter((x): x is { label: string; value: number; f: CountFormat } => x.value !== null)
            .map((x) => (
            <div key={x.label} className={cn("reveal rounded-2xl border bg-card p-5", !s.live && "sim-stripe")}>
              <dt className="flex items-center justify-between text-xs font-medium uppercase tracking-wider text-muted-foreground">
                {x.label} {!s.live && <Sim />}
              </dt>
              <dd className="mt-3 text-[clamp(1.6rem,3vw,2.3rem)] font-extrabold tabular-nums tracking-tight">
                <CountUp value={x.value} format={x.f} />
              </dd>
            </div>
          ))}
        </dl>
          <div className="reveal rounded-2xl border bg-card p-6 lg:col-span-2 lg:row-span-2">
            <h3 className="font-bold">Every fee, split three ways</h3>
            <div className="mt-5 flex h-3 overflow-hidden rounded-full">
              {FEE_SPLIT.map((f, i) => (
                <div
                  key={f.label}
                  className={cn(i === 0 ? "bg-btc" : i === 1 ? "bg-foreground/70" : "bg-foreground/20")}
                  style={{ width: `${f.pct}%` }}
                />
              ))}
            </div>
            <ul className="mt-6 space-y-4">
              {FEE_SPLIT.map((f, i) => (
                <li key={f.label} className="flex gap-3">
                  <span
                    className={cn(
                      "mt-1.5 size-2.5 shrink-0 rounded-full",
                      i === 0 ? "bg-btc" : i === 1 ? "bg-foreground/70" : "bg-foreground/20",
                    )}
                  />
                  <div className="min-w-0 flex-1">
                    <div className="flex items-baseline justify-between gap-2">
                      <span className="text-sm font-semibold">{f.label}</span>
                      <span className="font-mono text-sm tabular-nums">{f.pct}%</span>
                    </div>
                    <p className="text-xs text-muted-foreground">{f.note}</p>
                  </div>
                </li>
              ))}
            </ul>
            <p className="mt-6 flex items-start gap-2 rounded-xl bg-muted p-3 text-xs leading-relaxed text-muted-foreground">
              <Flame className="mt-0.5 size-3.5 shrink-0" />
              No payouts to holders. The vault accumulates, the buyback burns.
            </p>
          </div>

        </div>

        {/* What a single buy does to the vault. The mechanic, in the reader's
            own numbers, instead of a paragraph describing it. */}
        <div className="mt-3 grid gap-3 lg:grid-cols-5">
          <div className="lg:col-span-3">
            <BuyCalculator />
          </div>
          <div className="flex flex-col justify-between gap-4 rounded-2xl border bg-card p-5 lg:col-span-2">
            <div>
              <h3 className="font-bold">Your trade is the vault</h3>
              <p className="mt-1.5 text-sm leading-relaxed text-muted-foreground">
                There is no other source of funding. No presale, no treasury allocation, no outside money. The vault is
                the fee on trades, and nothing else. Move the slider and the arithmetic is right there.
              </p>
            </div>
            <div className="flex flex-wrap items-center gap-3">
              <BuyButton />
              <WalletOpen />
            </div>
          </div>
        </div>
      </Section>

      {/* Meet the Treasurer */}
      <Section
        id="memes"
        index="04"
        eyebrow="Meet the Treasurer"
        title={
          <>
            It proposes. It gets told no. <span className="text-btc-ink">It&apos;s fine.</span>
          </>
        }
        lead="A small vault with big plans and no keys. Copy a meme, post it, tag $NOKEYS."
        className="bg-paper"
      >
        <div className="reveal mb-3 grid items-center gap-6 rounded-2xl border bg-card p-6 sm:grid-cols-[auto_1fr]">
          <Mascot className="mx-auto w-36 text-foreground sm:w-44" />
          <div className="max-w-xl">
            <p className="text-lg font-bold tracking-tight">Hi. I keep the Bitcoin. I can&apos;t spend it.</p>
            <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
              I read the fee balance, I write proposals, and a rulebook with no sense of humor checks every one. I&apos;ve been
              refused {VAULT.refused ?? "a few"} times{s.live ? "" : " (simulated)"}. Every refusal is public. I&apos;m told that&apos;s the point.
            </p>
            <a href="/dashboard#diary" className="mt-4 inline-flex text-sm font-semibold text-btc-ink underline-offset-4 hover:underline">
              Read my diary →
            </a>
          </div>
        </div>
        <MemeKit />
        <Community />
      </Section>

      {/* Simulator */}
      <Section
        id="simulator"
        index="05"
        eyebrow="Vault simulator"
        title="How fast could the vault fill?"
        lead="Drag the volume. Pick what happens to it. Watch when each milestone lands. It is a projection, and the honest default is that volume fades."
       
      >
        <VaultSimulator />
      </Section>

      {/* Risks */}
      <Section id="risks" index="06" eyebrow="Read before you buy" className="bg-paper" title="Here's how you can lose.">
        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {RISKS.map((r, i) => (
            <article key={r.title} className="reveal rounded-2xl border bg-card p-6">
              <span className="font-mono text-xs text-muted-foreground">0{i + 1}</span>
              <h3 className="mt-3 font-bold">{r.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{r.text}</p>
            </article>
          ))}
        </div>
      </Section>

      {/* FAQ */}
      <Section id="faq" index="07" eyebrow="Questions" title="What everyone asks.">
        <div className="divide-y rounded-2xl border bg-card">
          {FAQ.map((f) => (
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
        <p className="mt-10 max-w-3xl text-xs leading-relaxed text-muted-foreground">
          $NOKEYS is a speculative memecoin. It is not an investment, gives no claim on the vault and promises no
          return. Nothing on this site is financial advice.
        </p>
      </Section>

      <StickyBuy />
    </>
  )
}
