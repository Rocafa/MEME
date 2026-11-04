import type { Metadata } from "next"
import { ArrowDownRight, ArrowUpRight, Check } from "lucide-react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { cn } from "@/lib/utils"
import { MILESTONES, REF, TOKEN } from "@/lib/data"
import { getSnapshot } from "@/lib/source"
import { fmtBtc, fmtCompact, fmtCompactUsd, fmtInt, fmtNum, fmtUsd, satsPerMillion } from "@/lib/format"
import { VaultChart } from "@/components/site/vault-chart"
import { ContractCard } from "@/components/site/contract-card"
import { BuyCalculator } from "@/components/site/buy-calculator"
import { ActivityTable } from "@/components/site/activity-table"
import { Sim } from "@/components/site/section"

export const metadata: Metadata = {
  title: "Dashboard — Tesoureiro",
  description: "Price, the Bitcoin vault, milestones, vault activity and a safe step-by-step guide to buying $TESOUREIRO.",
}

const BUY_STEPS = {
  pump: [
    { t: "Install a Solana wallet", d: "Phantom, Solflare or Backpack. Write the recovery phrase on paper. Never in a photo or the cloud." },
    { t: "Fund it with SOL", d: "Buy SOL on a regulated exchange and send it to your wallet. Keep a little extra for network fees." },
    { t: "Open the official link only", d: "Use the pump.fun link published on this page, and check the contract matches the card on the right." },
    { t: "Buy, then verify", d: "Pick an amount, set slippage to 1–3%, confirm in your wallet. Your transaction shows on Solscan in seconds." },
  ],
  jupiter: [
    { t: "Install a Solana wallet", d: "Phantom, Solflare or Backpack. Write the recovery phrase on paper. Never in a photo or the cloud." },
    { t: "Fund it with SOL or USDC", d: "Jupiter swaps any Solana token. Keep a little SOL for network fees." },
    { t: "Paste the contract, not the name", d: "On jup.ag, paste the official address into the token field. Searching by name can surface copycats." },
    { t: "Swap, then verify", d: "Check the route and the minimum received, confirm in your wallet, then check it on Solscan." },
  ],
}

export default async function Dashboard() {
  const s = await getSnapshot()
  const V = s.vault
  const M = s.market
  const dash = <T,>(v: T | null, f: (x: T) => string) => (v === null ? "—" : f(v))
  const mcap = M.priceUsd === null ? null : M.priceUsd * TOKEN.supply
  const sats = satsPerMillion(V.btc, TOKEN.supply)
  const up = M.change24h === null ? undefined : M.change24h >= 0
  const reached = MILESTONES.filter((m) => V.btc >= m.btc).length
  const asOf = s.asOf

  const kpis = [
    { label: "Price", value: dash(M.priceUsd, fmtUsd), sub: dash(M.change24h, (c) => `${c >= 0 ? "+" : ""}${fmtNum(c, 1)}% in 24h`), trend: up },
    { label: "Market cap", value: dash(mcap, fmtCompactUsd), sub: `${fmtCompact(TOKEN.supply)} supply` },
    { label: "24h volume", value: dash(M.volume24hUsd, fmtCompactUsd), sub: "pump.fun + DEXs" },
    { label: "Holders", value: dash(M.holders, fmtInt), sub: "wallets with a balance" },
  ]

  return (
    <div className="mx-auto flex w-full max-w-6xl flex-col gap-6 px-4 pb-20 pt-28 sm:px-6">
      <header className="flex flex-wrap items-end gap-x-4 gap-y-2">
        <div>
          <p className="font-mono text-[11px] uppercase tracking-[0.18em] text-btc-ink">Buyer dashboard</p>
          <h1 className="mt-2 text-[clamp(2.2rem,5vw,3.4rem)] font-extrabold leading-none tracking-[-0.03em]">{TOKEN.ticker}</h1>
        </div>
        <div className="mb-1 flex flex-wrap items-center gap-2">
          {!s.live && <Sim />}
          <span className="font-mono text-[11px] text-muted-foreground">{s.live ? "Live data" : "Simulated data"} as of {asOf}</span>
        </div>
      </header>

      <section className="grid grid-cols-2 gap-3 lg:grid-cols-4" aria-label="Market">
        {kpis.map((k) => (
          <div key={k.label} className={cn("rounded-2xl border bg-card p-5", !s.live && "sim-stripe")}>
            <p className="text-xs font-medium uppercase tracking-wider text-muted-foreground">{k.label}</p>
            <p className="mt-2 text-xl font-extrabold tabular-nums tracking-tight sm:text-2xl">{k.value}</p>
            <p
              className={cn(
                "mt-1 flex items-center gap-1 text-xs text-muted-foreground",
                k.trend === true && "text-emerald-700",
                k.trend === false && "text-red-700",
              )}
            >
              {k.trend === true && <ArrowUpRight className="size-3.5" />}
              {k.trend === false && <ArrowDownRight className="size-3.5" />}
              {k.sub}
            </p>
          </div>
        ))}
      </section>

      <section className="grid gap-3 lg:grid-cols-3">
        <div className="min-w-0 rounded-2xl bg-ink p-6 text-ink-foreground lg:col-span-2">
          <div className="mb-5 flex flex-wrap gap-x-8 gap-y-2 border-b border-white/10 pb-5 text-sm">
            <span>
              <span className="text-ink-foreground/55">Sats per 1M tokens </span>
              <b className="tabular-nums">{fmtInt(sats)}</b>
            </span>
            <span>
              <span className="text-ink-foreground/55">≈ value </span>
              <b className="tabular-nums">{fmtUsd(V.btc * REF.btcUsd)}</b>
              <span className="text-ink-foreground/40"> at a ${fmtCompact(REF.btcUsd)} reference</span>
            </span>
            <span className="text-ink-foreground/55">Symbolic, not redeemable</span>
          </div>
          <VaultChart data={s.history} />
        </div>

        <div id="milestones" className="min-w-0 scroll-mt-24 rounded-2xl border bg-card p-6">
          <div className="flex items-center justify-between">
            <h2 className="font-bold">Milestones</h2>
            <span className="font-mono text-xs text-muted-foreground">
              {reached}/{MILESTONES.length}
            </span>
          </div>
          <ol className="mt-4 space-y-4">
            {MILESTONES.map((m, i) => {
              const prev = i ? MILESTONES[i - 1].btc : 0
              const pct = Math.max(0, Math.min(1, (V.btc - prev) / (m.btc - prev)))
              const done = V.btc >= m.btc
              return (
                <li key={m.btc} className="group">
                  <div className="flex items-center gap-2 text-sm">
                    <span
                      className={cn(
                        "grid size-5 shrink-0 place-items-center rounded-full border text-[10px]",
                        done ? "border-btc bg-btc text-ink" : "text-muted-foreground",
                      )}
                    >
                      {done ? <Check className="size-3" /> : i + 1}
                    </span>
                    <span className={cn("font-semibold", !done && pct === 0 && "text-muted-foreground")}>{m.title}</span>
                    <span className="ml-auto font-mono text-xs tabular-nums text-muted-foreground">{fmtBtc(m.btc)}</span>
                  </div>
                  <div className="ml-7 mt-1.5 h-1.5 overflow-hidden rounded-full bg-muted">
                    <div className="h-full rounded-full bg-btc transition-[width] duration-700" style={{ width: `${pct * 100}%` }} />
                  </div>
                  <p className="ml-7 mt-1 text-xs text-muted-foreground">
                    {m.reward}
                    {!done && pct > 0 && (
                      <span className="ml-1 text-btc-ink">· {fmtBtc(m.btc - V.btc)} BTC to go</span>
                    )}
                  </p>
                </li>
              )
            })}
          </ol>
        </div>
      </section>

      <section id="buy" className="grid scroll-mt-24 gap-3 lg:grid-cols-5">
        <div className="min-w-0 rounded-2xl border bg-card p-6 lg:col-span-3">
          <h2 className="text-xl font-extrabold tracking-tight">How to buy safely</h2>
          <p className="mt-1 text-sm text-muted-foreground">Four steps. Step three is the one that matters.</p>
          <Tabs defaultValue="pump" className="mt-5">
            <TabsList>
              <TabsTrigger value="pump">On pump.fun</TabsTrigger>
              <TabsTrigger value="jupiter">On Jupiter</TabsTrigger>
            </TabsList>
            {(["pump", "jupiter"] as const).map((k) => (
              <TabsContent key={k} value={k}>
                <ol className="mt-3 space-y-4">
                  {BUY_STEPS[k].map((s, i) => (
                    <li key={s.t} className="flex gap-3">
                      <span
                        className={cn(
                          "grid size-8 shrink-0 place-items-center rounded-full border font-mono text-xs",
                          i === 2 && "border-btc bg-btc text-ink",
                        )}
                      >
                        {i + 1}
                      </span>
                      <div>
                        <p className="text-sm font-semibold">{s.t}</p>
                        <p className="text-sm leading-relaxed text-muted-foreground">{s.d}</p>
                      </div>
                    </li>
                  ))}
                </ol>
              </TabsContent>
            ))}
          </Tabs>
          <p className="mt-6 rounded-xl bg-muted p-3 text-xs leading-relaxed text-muted-foreground">
            Nobody from the team will ever DM you, ask for your recovery phrase or ask you to connect your wallet to
            &ldquo;verify&rdquo; anything.
          </p>
        </div>
        <div className="flex min-w-0 flex-col gap-3 lg:col-span-2">
          <ContractCard />
          <BuyCalculator />
        </div>
      </section>

      <section id="activity" className="scroll-mt-24 rounded-2xl border bg-card pb-2">
        <div className="flex flex-wrap items-center gap-2 p-5 pb-3">
          <h2 className="text-xl font-extrabold tracking-tight">Vault activity</h2>
          {!s.live && <Sim />}
          <p className="w-full text-sm text-muted-foreground">{s.live ? "Every row opens its transaction on Solscan." : "After launch, every row opens its transaction on Solscan."}</p>
        </div>
        <ActivityTable rows={s.txs} />
      </section>

      <section id="verify" className="scroll-mt-24">
        <h2 className="text-xl font-extrabold tracking-tight">Verify it yourself</h2>
        <p className="mt-1 text-sm text-muted-foreground">Don&apos;t trust the site. Check the wallets.</p>
        <div className="mt-4 grid gap-3 sm:grid-cols-3">
          {[
            { t: "Vault wallet", d: "Squads 2-of-3 multisig holding the cbBTC." },
            { t: "Fee wallet", d: "Receives the pump.fun creator fee before the split." },
            { t: "Burn wallet", d: "Buys $TESOUREIRO and burns it in a separate transaction." },
          ].map((w) => (
            <div key={w.t} className="rounded-2xl border border-dashed bg-card/60 p-5">
              <p className="text-sm font-semibold">{w.t}</p>
              <p className="mt-1 text-xs text-muted-foreground">{w.d}</p>
              <p className="mt-4 font-mono text-xs text-muted-foreground">Address published at launch</p>
            </div>
          ))}
        </div>
      </section>

      <p className="text-xs leading-relaxed text-muted-foreground">
        {s.live ? null : "Every number on this page is simulated until launch. "}$TESOUREIRO is speculative, gives no claim on the vault and
        promises no return.
      </p>
    </div>
  )
}
