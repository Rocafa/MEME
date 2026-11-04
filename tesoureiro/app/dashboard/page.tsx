import type { Metadata } from "next"
import { ArrowDownRight, ArrowUpRight, Check, ExternalLink, Flame, Lock, Repeat, Wallet } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { cn } from "@/lib/utils"
import { MARKET, MILESTONES, REF, TOKEN, TXS, VAULT, VAULT_HISTORY, type TxKind } from "@/lib/data"
import { fmtBtc, fmtCompact, fmtCompactUsd, fmtInt, fmtNum, fmtUsd, satsPerMillion } from "@/lib/format"
import { VaultChart } from "@/components/site/vault-chart"
import { ContractCard } from "@/components/site/contract-card"
import { BuyCalculator } from "@/components/site/buy-calculator"

export const metadata: Metadata = {
  title: "Dashboard — Tesoureiro",
  description: "Preço, cofre de BTC, marcos, transações e o passo a passo para comprar $TESOUREIRO com segurança.",
}

const TX_ICON: Record<TxKind, typeof Repeat> = {
  "Resgate de taxa": Wallet,
  "Swap SOL → cbBTC": Repeat,
  Queima: Flame,
  "Assinatura multisig": Lock,
}

const BUY_STEPS = {
  pump: [
    { t: "Instale uma carteira Solana", d: "Phantom, Solflare ou Backpack. Guarde a frase de recuperação no papel, nunca em foto ou nuvem." },
    { t: "Coloque SOL na carteira", d: "Compre SOL numa exchange autorizada e envie para o endereço da sua carteira. Deixe um pouco para as taxas de rede." },
    { t: "Abra o link oficial", d: "Use só o link do pump.fun publicado nesta página. Confira se o endereço do contrato é igual ao do card ao lado." },
    { t: "Compre e confira", d: "Escolha o valor, defina o slippage (1% a 3%) e confirme na carteira. A transação aparece no Solscan em segundos." },
  ],
  jupiter: [
    { t: "Instale uma carteira Solana", d: "Phantom, Solflare ou Backpack. Guarde a frase de recuperação no papel, nunca em foto ou nuvem." },
    { t: "Coloque SOL ou USDC", d: "O Jupiter troca qualquer token da Solana. Deixe um pouco de SOL para as taxas de rede." },
    { t: "Cole o contrato, não o nome", d: "No jup.ag, cole o endereço oficial no campo de token. Buscar pelo nome pode trazer cópias." },
    { t: "Troque e confira", d: "Revise a rota e o preço mínimo recebido, confirme na carteira e confira no Solscan." },
  ],
}

export default function Dashboard() {
  const mcap = MARKET.priceUsd * TOKEN.supply
  const sats = satsPerMillion(VAULT.btc, TOKEN.supply)
  const up = MARKET.change24h >= 0
  const reached = MILESTONES.filter((m) => VAULT.btc >= m.btc).length

  const kpis = [
    { label: "Preço", value: fmtUsd(MARKET.priceUsd), sub: `${up ? "+" : ""}${fmtNum(MARKET.change24h, 1)}% em 24 h`, trend: up },
    { label: "Market cap", value: fmtCompactUsd(mcap), sub: `${fmtCompact(TOKEN.supply)} de supply` },
    { label: "Volume 24 h", value: fmtCompactUsd(MARKET.volume24hUsd), sub: "pump.fun + DEXs" },
    { label: "Holders", value: fmtInt(MARKET.holders), sub: "carteiras com saldo" },
  ]

  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-wrap items-end gap-3">
        <div>
          <p className="font-mono text-[11px] uppercase tracking-[0.16em] text-muted-foreground">Dashboard do comprador</p>
          <h1 className="mt-1 text-3xl font-semibold tracking-tight">{TOKEN.ticker}</h1>
        </div>
        <Badge variant="outline" className="mb-1 border-btc/40 text-btc">
          Dados simulados · pré-lançamento
        </Badge>
      </div>

      {/* KPIs */}
      <section className="grid grid-cols-2 gap-3 lg:grid-cols-4" aria-label="Mercado">
        {kpis.map((k) => (
          <div key={k.label} className="rounded-xl border bg-card p-4">
            <p className="text-xs font-medium uppercase tracking-wider text-muted-foreground">{k.label}</p>
            <p className="mt-2 text-xl font-semibold tabular-nums sm:text-2xl">{k.value}</p>
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

      {/* Cofre */}
      <section className="grid gap-3 lg:grid-cols-3">
        <div className="min-w-0 rounded-xl bg-ink p-5 text-ink-foreground lg:col-span-2">
          <div className="flex flex-wrap items-start gap-6">
            <div>
              <p className="font-mono text-[10.5px] uppercase tracking-[0.14em] text-ink-foreground/55">Cofre</p>
              <p className="mt-1 text-3xl font-semibold tabular-nums">
                {fmtBtc(VAULT.btc)} <span className="text-btc">BTC</span>
              </p>
              <p className="mt-1 text-xs text-ink-foreground/55">
                ≈ {fmtUsd(VAULT.btc * REF.btcUsd)} com BTC de referência a {fmtUsd(REF.btcUsd)}
              </p>
            </div>
            <div>
              <p className="font-mono text-[10.5px] uppercase tracking-[0.14em] text-ink-foreground/55">Sats por 1 mi</p>
              <p className="mt-1 text-3xl font-semibold tabular-nums">{fmtInt(sats)}</p>
              <p className="mt-1 text-xs text-ink-foreground/55">lastro simbólico, não resgatável</p>
            </div>
          </div>
          <div className="mt-5 text-ink-foreground [&_figcaption]:text-ink-foreground/45 [&_line]:stroke-ink-foreground/10">
            <VaultChart data={VAULT_HISTORY} />
          </div>
        </div>

        <div id="marcos" className="scroll-mt-20 rounded-xl border bg-card p-5">
          <div className="flex items-center justify-between">
            <h2 className="font-semibold">Marcos</h2>
            <span className="font-mono text-xs text-muted-foreground">
              {reached}/{MILESTONES.length}
            </span>
          </div>
          <ol className="mt-4 space-y-4">
            {MILESTONES.map((m, i) => {
              const prev = i ? MILESTONES[i - 1].btc : 0
              const pct = Math.max(0, Math.min(1, (VAULT.btc - prev) / (m.btc - prev)))
              const done = VAULT.btc >= m.btc
              return (
                <li key={m.btc}>
                  <div className="flex items-center gap-2 text-sm">
                    <span
                      className={cn(
                        "grid size-5 shrink-0 place-items-center rounded-full border text-[10px]",
                        done ? "border-btc bg-btc text-ink" : "text-muted-foreground",
                      )}
                    >
                      {done ? <Check className="size-3" /> : i + 1}
                    </span>
                    <span className={cn("font-medium", !done && pct === 0 && "text-muted-foreground")}>{m.title}</span>
                    <span className="ml-auto font-mono text-xs tabular-nums text-muted-foreground">{fmtBtc(m.btc)}</span>
                  </div>
                  <div className="ml-7 mt-1.5 h-1 overflow-hidden rounded-full bg-muted">
                    <div className="h-full rounded-full bg-btc" style={{ width: `${pct * 100}%` }} />
                  </div>
                  <p className="ml-7 mt-1 text-xs text-muted-foreground">{m.reward}</p>
                </li>
              )
            })}
          </ol>
        </div>
      </section>

      {/* Comprar */}
      <section id="comprar" className="scroll-mt-20 grid gap-3 lg:grid-cols-5">
        <div className="min-w-0 rounded-xl border bg-card p-5 lg:col-span-3">
          <h2 className="font-semibold">Como comprar com segurança</h2>
          <p className="mt-1 text-sm text-muted-foreground">Quatro passos. O mais importante é o terceiro.</p>
          <Tabs defaultValue="pump" className="mt-4">
            <TabsList>
              <TabsTrigger value="pump">Pelo pump.fun</TabsTrigger>
              <TabsTrigger value="jupiter">Pelo Jupiter</TabsTrigger>
            </TabsList>
            {(["pump", "jupiter"] as const).map((k) => (
              <TabsContent key={k} value={k}>
                <ol className="mt-2 space-y-3">
                  {BUY_STEPS[k].map((s, i) => (
                    <li key={s.t} className="flex gap-3">
                      <span
                        className={cn(
                          "grid size-7 shrink-0 place-items-center rounded-full border font-mono text-xs",
                          i === 2 && "border-btc bg-btc/15",
                        )}
                      >
                        {i + 1}
                      </span>
                      <div>
                        <p className="text-sm font-medium">{s.t}</p>
                        <p className="text-sm leading-relaxed text-muted-foreground">{s.d}</p>
                      </div>
                    </li>
                  ))}
                </ol>
              </TabsContent>
            ))}
          </Tabs>
        </div>
        <div className="flex min-w-0 flex-col gap-3 lg:col-span-2">
          <ContractCard />
          <BuyCalculator />
        </div>
      </section>

      {/* Transações */}
      <section id="transacoes" className="scroll-mt-20 rounded-xl border bg-card">
        <div className="flex flex-wrap items-center gap-2 p-5 pb-3">
          <h2 className="font-semibold">Movimentos do cofre</h2>
          <Badge variant="secondary">exemplo</Badge>
          <p className="w-full text-sm text-muted-foreground">
            Depois do lançamento, cada linha abre a transação no Solscan.
          </p>
        </div>
        <div className="overflow-x-auto px-2 pb-2">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Tipo</TableHead>
                <TableHead className="text-right">Valor</TableHead>
                <TableHead>Quando</TableHead>
                <TableHead className="text-right">Transação</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {TXS.map((t) => {
                const Icon = TX_ICON[t.kind]
                return (
                  <TableRow key={t.sig}>
                    <TableCell>
                      <span className="flex items-center gap-2">
                        <Icon className="size-4 text-muted-foreground" />
                        {t.kind}
                      </span>
                    </TableCell>
                    <TableCell className="text-right font-mono tabular-nums">{t.amount}</TableCell>
                    <TableCell className="text-muted-foreground">{t.time}</TableCell>
                    <TableCell className="text-right">
                      <span
                        className="inline-flex items-center gap-1 font-mono text-xs text-muted-foreground"
                        title="Exemplo: o link real aparece após o lançamento"
                      >
                        {t.sig}
                        <ExternalLink className="size-3 opacity-40" />
                      </span>
                    </TableCell>
                  </TableRow>
                )
              })}
            </TableBody>
          </Table>
        </div>
      </section>

      {/* Verificar */}
      <section id="verificar" className="scroll-mt-20 grid gap-3 sm:grid-cols-3">
        {[
          { t: "Carteira do cofre", d: "Multisig Squads 2 de 3, onde fica o cbBTC." },
          { t: "Carteira de taxas", d: "Recebe a taxa de criador do pump.fun antes da divisão." },
          { t: "Carteira de queima", d: "Compra $TESOUREIRO e queima em transação separada." },
        ].map((w) => (
          <div key={w.t} className="rounded-xl border border-dashed bg-card/60 p-4">
            <p className="text-sm font-medium">{w.t}</p>
            <p className="mt-1 text-xs text-muted-foreground">{w.d}</p>
            <p className="mt-3 font-mono text-xs text-muted-foreground">Endereço publicado no lançamento</p>
          </div>
        ))}
      </section>

      <p className="pb-4 text-xs leading-relaxed text-muted-foreground">
        Todos os números desta página são simulados até o lançamento. $TESOUREIRO é especulativo, não dá direito ao
        BTC do cofre e não promete retorno.
      </p>
    </div>
  )
}
