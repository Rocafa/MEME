import type { Metadata } from "next"
import Link from "next/link"
import { ArrowRight, Hash } from "lucide-react"
import { CREATOR_FEE, FEE_SPLIT, MILESTONES, RISKS, TOKEN } from "@/lib/data"
import { RULES } from "@/lib/guardian"
import { fmtBtc, fmtCompact } from "@/lib/format"
import { DocsToc } from "@/components/site/docs-toc"
import { cn } from "@/lib/utils"

export const metadata: Metadata = {
  title: "Docs — Tesoureiro",
  description:
    "How the Tesoureiro works: the fee flow, the split, the Guardian's rules, milestones, wallets, how to verify everything and how you can lose.",
}

const TOC = [
  { id: "overview", label: "Overview" },
  { id: "flow", label: "How a fee becomes BTC" },
  { id: "split", label: "The split" },
  { id: "rules", label: "The Guardian's rules" },
  { id: "milestones", label: "Milestones" },
  { id: "wallets", label: "Wallets" },
  { id: "verify", label: "Verify it yourself" },
  { id: "lose", label: "How this loses" },
  { id: "never", label: "What we will never do" },
  { id: "glossary", label: "Glossary" },
]

const FLOW = [
  { who: "Trader", what: `Buys or sells ${TOKEN.ticker} on pump.fun. The launchpad keeps a ${(CREATOR_FEE * 100).toFixed(2)}% creator fee.` },
  { who: "Fee wallet", what: "The creator fee lands here. The bot claims it about once a minute." },
  { who: "Treasurer (AI)", what: "Reads the balance and writes a proposal: swap, burn or announce. It has no keys and cannot send anything." },
  { who: "Guardian (no AI)", what: "Checks the proposal against the five rules below. Same input, same verdict, every time." },
  { who: "Multisig (2 of 3)", what: "Two of three human signers approve on Squads. Only then does anything move." },
  { who: "Vault", what: "SOL is swapped to cbBTC through Jupiter and sits in the vault. Nothing ever leaves it." },
]

const NEVER = [
  "Pay holders from the vault or the fees: no airdrops, dividends, yield or raffles.",
  "Give the AI a private key, a signer seat or a way to send transactions.",
  "DM you, ask for your recovery phrase or ask you to connect a wallet to “verify”.",
  "Change the split or the rules without a public notice first.",
  "Show a simulated number without labelling it as simulated.",
  "Use any third-party game's name, logo or art.",
]

const GLOSSARY = [
  { t: "cbBTC", d: "Bitcoin wrapped by Coinbase as a Solana token, backed 1:1. Coinbase can freeze it." },
  { t: "Creator fee", d: "A share of every trade on the launchpad that goes to the coin's creator wallet." },
  { t: "Multisig", d: "A wallet that needs several signatures to move funds. Ours needs 2 of 3, on Squads." },
  { t: "Burn", d: "Sending tokens to an address nobody controls, removing them from supply for good." },
  { t: "Slippage", d: "How far the price may move between quoting a swap and executing it. The Guardian caps it at 1%." },
  { t: "Sats", d: "Satoshis. One BTC is 100,000,000 sats." },
]

export default function DocsPage() {
  return (
    <div className="mx-auto w-full max-w-6xl px-4 pb-24 pt-28 sm:px-6">
      <header className="max-w-3xl">
        <p className="font-mono text-[11px] uppercase tracking-[0.18em] text-btc-ink">Docs</p>
        <h1 className="mt-3 text-[clamp(2.4rem,6vw,4rem)] font-extrabold leading-[0.98] tracking-[-0.035em]">
          Everything, in plain words.
        </h1>
        <p className="mt-4 text-lg leading-relaxed text-muted-foreground">
          How the vault fills, who can move what, and how to check every claim on this site without trusting us.
        </p>
      </header>

      <div className="mt-12 grid gap-10 lg:grid-cols-[220px_minmax(0,1fr)] lg:gap-14">
        <aside>
          <DocsToc items={TOC} />
        </aside>

        <article className="min-w-0 space-y-20">
          <Doc id="overview" title="Overview">
            <p>
              {TOKEN.ticker} is a Solana memecoin with one job: every trade fills a public Bitcoin vault. An AI called the
              Treasurer runs the vault&apos;s routine and writes a diary about it, but it never holds a key. A rule engine
              called the Guardian checks everything it proposes, and a 2-of-3 multisig signs.
            </p>
            <p>
              The vault only accumulates. Holders have no claim on it, and nothing is paid out. Until launch, every number
              on this site is simulated and labelled <Tag>Sim</Tag>.
            </p>
          </Doc>

          <Doc id="flow" title="How a fee becomes BTC">
            <ol className="relative mt-2 space-y-3 border-l pl-6">
              {FLOW.map((s, i) => (
                <li key={s.who} className="relative">
                  <span className="absolute -left-[33px] top-1 grid size-4 place-items-center rounded-full border-2 border-background bg-btc" />
                  <p className="font-mono text-[10.5px] uppercase tracking-[0.16em] text-muted-foreground">Step {i + 1}</p>
                  <p className="mt-0.5 font-semibold text-foreground">{s.who}</p>
                  <p className="text-sm">{s.what}</p>
                </li>
              ))}
            </ol>
          </Doc>

          <Doc id="split" title="The split">
            <p>Fixed at launch. Changed only with public notice.</p>
            <div className="mt-4 flex h-3 overflow-hidden rounded-full">
              {FEE_SPLIT.map((f, i) => (
                <div
                  key={f.label}
                  className={cn(i === 0 ? "bg-btc" : i === 1 ? "bg-foreground/70" : "bg-foreground/20")}
                  style={{ width: `${f.pct}%` }}
                />
              ))}
            </div>
            <Table head={["Share", "Goes to", "What happens"]} rows={FEE_SPLIT.map((f) => [`${f.pct}%`, f.label, f.note])} />
          </Doc>

          <Doc id="rules" title="The Guardian's rules">
            <p>
              Deterministic code, no AI. The same rules run in the{" "}
              <Link href="/#guardian" className="font-medium text-foreground underline underline-offset-4">
                Guardian game
              </Link>{" "}
              on the home page and are covered by automated tests.
            </p>
            <Table head={["Rule", "Name", "What it enforces"]} rows={RULES.map((r) => [r.id, r.title, r.text])} mono />
          </Doc>

          <Doc id="milestones" title="Milestones">
            <p>Each milestone is a vault balance. Reaching one triggers a public post and, for most, a burn.</p>
            <Table
              head={["BTC in vault", "Milestone", "What happens"]}
              rows={MILESTONES.map((m) => [`₿ ${fmtBtc(m.btc)}`, m.title, m.reward])}
              mono
            />
          </Doc>

          <Doc id="wallets" title="Wallets">
            <p>
              Published here on launch day, and nowhere else first. Any address going around before that is fake.
            </p>
            <Table
              head={["Wallet", "Role", "Address"]}
              rows={[
                ["Token mint", `${TOKEN.ticker}, ${fmtCompact(TOKEN.supply)} supply`, TOKEN.contract ?? "Published at launch"],
                ["Vault", "Squads 2-of-3 multisig holding cbBTC", "Published at launch"],
                ["Fee wallet", "Receives the creator fee before the split", "Published at launch"],
                ["Burn wallet", "Buys the token and burns it", "Published at launch"],
              ]}
              mono
            />
          </Doc>

          <Doc id="verify" title="Verify it yourself">
            <ol className="list-decimal space-y-2 pl-5">
              <li>Copy the vault address from the table above and open it on Solscan.</li>
              <li>Check its cbBTC balance against the number on the dashboard.</li>
              <li>Open the Squads multisig and check it needs 2 of 3 signers and that none of them is a bot.</li>
              <li>Pick any row in the dashboard&apos;s vault activity and open its transaction.</li>
              <li>For burns, check the token supply went down by the amount posted.</li>
            </ol>
            <Link
              href="/dashboard#verify"
              className="mt-4 inline-flex min-h-11 items-center gap-2 font-semibold text-foreground hover:underline"
            >
              Go to the dashboard <ArrowRight className="size-4" />
            </Link>
          </Doc>

          <Doc id="lose" title="How this loses">
            <ul className="grid gap-3 sm:grid-cols-2">
              {RISKS.map((r) => (
                <li key={r.title} className="rounded-2xl border bg-card p-5">
                  <p className="font-semibold text-foreground">{r.title}</p>
                  <p className="mt-1 text-sm">{r.text}</p>
                </li>
              ))}
            </ul>
          </Doc>

          <Doc id="never" title="What we will never do">
            <ul className="space-y-2">
              {NEVER.map((n) => (
                <li key={n} className="flex gap-3">
                  <span className="mt-2 size-1.5 shrink-0 rounded-full bg-btc" />
                  {n}
                </li>
              ))}
            </ul>
          </Doc>

          <Doc id="glossary" title="Glossary">
            <dl className="divide-y rounded-2xl border bg-card">
              {GLOSSARY.map((g) => (
                <div key={g.t} className="grid gap-1 p-4 sm:grid-cols-[140px_1fr] sm:gap-6">
                  <dt className="font-mono text-sm font-semibold text-foreground">{g.t}</dt>
                  <dd className="text-sm">{g.d}</dd>
                </div>
              ))}
            </dl>
            <p className="mt-8 text-xs">
              {TOKEN.ticker} is a speculative memecoin. It is not an investment, gives no claim on the vault and promises
              no return. Nothing here is financial advice.
            </p>
          </Doc>
        </article>
      </div>
    </div>
  )
}

function Doc({ id, title, children }: { id: string; title: string; children: React.ReactNode }) {
  return (
    <section id={id} className="scroll-mt-28">
      <h2 className="group flex items-center gap-2 text-[clamp(1.5rem,3vw,2rem)] font-extrabold tracking-tight">
        {title}
        <a
          href={`#${id}`}
          aria-label={`Link to ${title}`}
          className="grid size-8 place-items-center rounded-lg text-muted-foreground opacity-0 transition-opacity hover:bg-muted focus-visible:opacity-100 group-hover:opacity-100"
        >
          <Hash className="size-4" />
        </a>
      </h2>
      <div className="mt-4 space-y-4 text-base leading-relaxed text-muted-foreground">{children}</div>
    </section>
  )
}

function Table({ head, rows, mono }: { head: string[]; rows: string[][]; mono?: boolean }) {
  return (
    <div className="mt-4 overflow-x-auto rounded-2xl border bg-card">
      <table className="w-full min-w-[520px] text-left text-sm">
        <thead>
          <tr className="border-b text-xs uppercase tracking-wider">
            {head.map((h) => (
              <th key={h} scope="col" className="px-4 py-3 font-medium">
                {h}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((r) => (
            <tr key={r.join("|")} className="border-b last:border-0">
              {r.map((c, i) => (
                <td
                  key={i}
                  className={cn(
                    "px-4 py-3 align-top",
                    i === 0 && "whitespace-nowrap font-semibold text-foreground",
                    i === 0 && mono && "font-mono",
                  )}
                >
                  {c}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

function Tag({ children }: { children: React.ReactNode }) {
  return (
    <span className="inline-flex items-center rounded-full border border-btc/40 px-1.5 py-px align-middle font-mono text-[10px] font-semibold uppercase tracking-[0.14em] text-btc-ink">
      {children}
    </span>
  )
}
