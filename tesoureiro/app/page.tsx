import Link from "next/link"
import { ArrowRight, Bot, Coins, Flame, KeyRound, ShieldCheck, Sparkles } from "lucide-react"
import { buttonVariants } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { cn } from "@/lib/utils"
import { DIARY, FAQ, FEE_SPLIT, MILESTONES, RISKS, TOKEN, VAULT } from "@/lib/data"
import { fmtBtc, fmtCompact, fmtInt, fmtNum, satsPerMillion } from "@/lib/format"
import { Diary } from "@/components/site/diary"

const STEPS = [
  {
    icon: Coins,
    title: "Cada negociação paga uma taxa",
    text: "Toda compra e venda de $TESOUREIRO no pump.fun gera 0,30% de taxa de criador.",
  },
  {
    icon: Bot,
    title: "O Tesoureiro propõe",
    text: "O agente de IA lê o saldo e propõe o que fazer: trocar por BTC, anunciar um marco, queimar.",
  },
  {
    icon: ShieldCheck,
    title: "Regras fixas conferem",
    text: "Um executor sem IA compara a proposta com as regras públicas. Fora da regra, é recusada.",
  },
  {
    icon: KeyRound,
    title: "O multisig assina",
    text: "O cofre fica num multisig Squads 2 de 3. O agente nunca tem a chave.",
  },
]

export default function Home() {
  const next = MILESTONES.find((m) => m.btc > VAULT.btc) ?? MILESTONES[MILESTONES.length - 1]
  const stats = [
    { label: "BTC no cofre", value: fmtBtc(VAULT.btc) },
    { label: "Sats por 1 mi", value: fmtInt(satsPerMillion(VAULT.btc, TOKEN.supply)) },
    { label: "Taxas resgatadas", value: `${fmtNum(VAULT.feesClaimedSol, 1)} SOL` },
    { label: "Queimado", value: fmtCompact(VAULT.burned) },
    { label: "Propostas recusadas", value: `${VAULT.refused} / ${VAULT.proposals}` },
  ]

  return (
    <div className="flex flex-col gap-6">
      {/* Destaque */}
      <section className="relative overflow-hidden rounded-2xl bg-ink p-6 text-ink-foreground sm:p-8">
        <div
          aria-hidden
          className="pointer-events-none absolute -right-24 -top-24 size-80 rounded-full bg-btc/25 blur-3xl"
        />
        <p className="font-mono text-[11px] uppercase tracking-[0.18em] text-ink-foreground/60">
          Tesoureiro · cofre de Bitcoin
        </p>
        <h1 className="mt-3 max-w-3xl text-3xl font-semibold leading-[1.08] tracking-tight text-balance sm:text-5xl">
          Uma IA cuida de um cofre de Bitcoin. <span className="text-btc">Ela não tem a chave.</span>
        </h1>
        <p className="mt-4 max-w-2xl text-sm leading-relaxed text-ink-foreground/70 sm:text-base">
          Cada negociação de $TESOUREIRO enche um cofre público de BTC. O Tesoureiro, um agente de IA, propõe o que
          fazer e posta tudo em público. Regras fixas conferem cada proposta e um multisig assina. Você acompanha cada
          satoshi no Solscan.
        </p>

        <dl className="mt-7 grid grid-cols-2 gap-x-6 gap-y-4 sm:grid-cols-3 lg:grid-cols-5">
          {stats.map((s) => (
            <div key={s.label}>
              <dt className="font-mono text-[10.5px] uppercase tracking-[0.14em] text-ink-foreground/50">{s.label}</dt>
              <dd className="mt-1 text-lg font-semibold tabular-nums sm:text-xl">{s.value}</dd>
            </div>
          ))}
        </dl>

        <div className="mt-7 flex flex-wrap items-center gap-3">
          <Link
            href="/dashboard"
            className={cn(buttonVariants({ size: "lg" }), "h-10 bg-ink-foreground px-4 text-ink hover:bg-ink-foreground/85")}
          >
            Abrir dashboard <ArrowRight />
          </Link>
          <Link
            href="/dashboard#comprar"
            className={cn(
              buttonVariants({ variant: "outline", size: "lg" }),
              "h-10 border-ink-foreground/25 bg-transparent px-4 text-ink-foreground hover:bg-ink-foreground/10 hover:text-ink-foreground",
            )}
          >
            Como comprar
          </Link>
          <Badge variant="outline" className="border-ink-foreground/20 text-ink-foreground/70">
            Dados simulados
          </Badge>
        </div>
      </section>

      {/* Aviso */}
      <section className="flex flex-col gap-2 rounded-xl bg-lime px-5 py-4 text-lime-foreground sm:flex-row sm:items-center">
        <p className="text-sm">
          <strong className="font-semibold">Pré-lançamento.</strong> Próximo marco: {next.title} em {fmtBtc(next.btc)}{" "}
          BTC. O contrato oficial será publicado só aqui.
        </p>
        <Link href="/dashboard#marcos" className="shrink-0 whitespace-nowrap text-sm font-medium underline-offset-4 hover:underline sm:ml-auto">
          Ver marcos →
        </Link>
      </section>

      {/* Como funciona */}
      <section id="como-funciona" className="scroll-mt-20">
        <SectionTitle eyebrow="Como funciona" title="Quatro passos, nenhum depende de confiar em alguém" />
        <ol className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
          {STEPS.map(({ icon: Icon, title, text }, i) => (
            <li key={title} className="rounded-xl border bg-card p-5">
              <div className="flex items-center justify-between">
                <span className="grid size-9 place-items-center rounded-lg bg-muted">
                  <Icon className="size-4" />
                </span>
                <span className="font-mono text-xs text-muted-foreground">0{i + 1}</span>
              </div>
              <h3 className="mt-4 font-semibold">{title}</h3>
              <p className="mt-1.5 text-sm leading-relaxed text-muted-foreground">{text}</p>
            </li>
          ))}
        </ol>
      </section>

      {/* Divisão + diário */}
      <section className="grid gap-3 lg:grid-cols-5">
        <div className="rounded-xl border bg-card p-5 lg:col-span-2">
          <h3 className="font-semibold">Para onde vai cada taxa</h3>
          <p className="mt-1 text-sm text-muted-foreground">Fixo no lançamento. Mudanças só com aviso público.</p>
          <div className="mt-5 flex h-3 overflow-hidden rounded-full">
            <div className="bg-btc" style={{ width: `${FEE_SPLIT[0].pct}%` }} />
            <div className="bg-foreground/70" style={{ width: `${FEE_SPLIT[1].pct}%` }} />
            <div className="bg-foreground/20" style={{ width: `${FEE_SPLIT[2].pct}%` }} />
          </div>
          <ul className="mt-5 space-y-4">
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
                    <span className="text-sm font-medium">{f.label}</span>
                    <span className="font-mono text-sm tabular-nums">{f.pct}%</span>
                  </div>
                  <p className="text-xs text-muted-foreground">{f.note}</p>
                </div>
              </li>
            ))}
          </ul>
          <p className="mt-5 flex items-start gap-2 rounded-lg bg-muted p-3 text-xs leading-relaxed text-muted-foreground">
            <Flame className="mt-0.5 size-3.5 shrink-0" />
            Não há distribuição a holders. O cofre acumula, a recompra queima.
          </p>
        </div>

        <div className="rounded-xl border bg-card p-5 lg:col-span-3">
          <div className="flex items-center gap-2">
            <Sparkles className="size-4 text-btc" />
            <h3 className="font-semibold">Diário do Tesoureiro</h3>
            <Badge variant="secondary" className="ml-auto">
              exemplo
            </Badge>
          </div>
          <p className="mt-1 text-sm text-muted-foreground">
            O agente posta cada proposta, inclusive as que o guardião recusa.
          </p>
          <Diary items={DIARY} />
        </div>
      </section>

      {/* Riscos */}
      <section id="riscos" className="scroll-mt-20">
        <SectionTitle eyebrow="Leia antes de comprar" title="Como você pode perder" />
        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {RISKS.map((r) => (
            <article key={r.title} className="rounded-xl border bg-card p-5">
              <h3 className="font-semibold">{r.title}</h3>
              <p className="mt-1.5 text-sm leading-relaxed text-muted-foreground">{r.text}</p>
            </article>
          ))}
        </div>
      </section>

      {/* FAQ */}
      <section id="faq" className="scroll-mt-20">
        <SectionTitle eyebrow="Perguntas" title="O que todo mundo pergunta" />
        <div className="divide-y rounded-xl border bg-card">
          {FAQ.map((f) => (
            <details key={f.q} className="group p-5 [&_summary::-webkit-details-marker]:hidden">
              <summary className="flex cursor-pointer list-none items-center justify-between gap-4 font-medium">
                {f.q}
                <span className="font-mono text-muted-foreground transition-transform group-open:rotate-45">+</span>
              </summary>
              <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{f.a}</p>
            </details>
          ))}
        </div>
      </section>

      <p className="pb-4 text-xs leading-relaxed text-muted-foreground">
        $TESOUREIRO é uma memecoin especulativa. Não é investimento, não dá direito a nenhum ativo do cofre e não
        promete retorno. Nada nesta página é recomendação financeira.
      </p>
    </div>
  )
}

function SectionTitle({ eyebrow, title }: { eyebrow: string; title: string }) {
  return (
    <div className="mb-4 mt-4">
      <p className="font-mono text-[11px] uppercase tracking-[0.16em] text-muted-foreground">{eyebrow}</p>
      <h2 className="mt-1 text-2xl font-semibold tracking-tight">{title}</h2>
    </div>
  )
}
