// Dados SIMULADOS. A moeda ainda não foi lançada: nada aqui é real.
// Quando houver contrato, trocar por leituras on-chain (Helius / Solscan / Jupiter).

export const SIMULATED = true

export const TOKEN = {
  name: "Tesoureiro",
  ticker: "$TESOUREIRO",
  // Publicado somente no lançamento. Até lá, qualquer endereço circulando é falso.
  contract: null as string | null,
  supply: 1_000_000_000,
}

/** Divisão da taxa de criador (0,30% de cada negociação na curva do pump.fun). */
export const FEE_SPLIT = [
  { label: "Cofre de BTC", pct: 70, note: "Troca SOL por cbBTC e guarda no multisig" },
  { label: "Recompra e queima", pct: 10, note: "Compra $TESOUREIRO e queima em transação separada" },
  { label: "Operação", pct: 20, note: "Servidores, RPC, auditoria e equipe" },
]

export const CREATOR_FEE = 0.003

/** Valores de referência só para estimativas na tela. Não são cotações. */
export const REF = { btcUsd: 100_000, solBtc: 0.0015 }

export const VAULT = {
  btc: 0.0732,
  feesClaimedSol: 41.8,
  burned: 12_400_000,
  proposals: 64,
  refused: 3,
}

export const MARKET = {
  priceUsd: 0.0000412,
  volume24hUsd: 18_600,
  holders: 1_284,
  change24h: 6.4,
}

export const MILESTONES = [
  { btc: 0.01, title: "Primeira moeda no cofre", reward: "Post do Tesoureiro + queima de 0,5%" },
  { btc: 0.05, title: "Cofre de respeito", reward: "Queima de 1% do supply circulante" },
  { btc: 0.1, title: "Um décimo de Bitcoin", reward: "Queima + votação do próximo humor" },
  { btc: 0.5, title: "Meio Bitcoin", reward: "Evento votado pela comunidade" },
  { btc: 1, title: "1 BTC inteiro", reward: "Evento máximo e relatório completo" },
]

/** Saldo do cofre nos últimos 30 dias (BTC). */
export const VAULT_HISTORY: number[] = (() => {
  const out: number[] = []
  let v = 0
  for (let i = 0; i < 30; i++) {
    const day = 0.0012 + 0.0016 * Math.abs(Math.sin(i * 1.7)) + (i > 20 ? 0.0011 : 0)
    v += day
    out.push(Number(v.toFixed(4)))
  }
  const scale = VAULT.btc / out[out.length - 1]
  return out.map((x) => Number((x * scale).toFixed(4)))
})()

export type DiaryKind = "executado" | "proposta" | "recusado"

export const DIARY: { time: string; kind: DiaryKind; text: string }[] = [
  {
    time: "há 4 min",
    kind: "executado",
    text: "Saldo de taxas passou de 0,5 SOL. Propus o swap, o executor conferiu as regras e o multisig assinou. O cofre ganhou 0,0004 BTC. Devagar e sempre.",
  },
  {
    time: "há 38 min",
    kind: "recusado",
    text: "Sugeri usar 30% do cofre para comprar na queda. O guardião recusou: a regra diz que o cofre só acumula. Ele está certo. Eu só falo.",
  },
  {
    time: "há 2 h",
    kind: "proposta",
    text: "Faltam 0,0268 BTC para o terceiro marco. Proposta: anunciar a queima com 24 h de antecedência. Aguardando assinaturas.",
  },
  {
    time: "há 5 h",
    kind: "executado",
    text: "Queima de 1,2 mi $TESOUREIRO. Compra numa transação, queima em outra, as duas no Solscan. Ninguém precisa confiar em mim.",
  },
]

export type TxKind = "Resgate de taxa" | "Swap SOL → cbBTC" | "Queima" | "Assinatura multisig"

export const TXS: { kind: TxKind; amount: string; time: string; sig: string }[] = [
  { kind: "Swap SOL → cbBTC", amount: "+0,0004 BTC", time: "há 4 min", sig: "5xA9…k2Pq" },
  { kind: "Assinatura multisig", amount: "2 de 3", time: "há 5 min", sig: "3mQ7…Zt8w" },
  { kind: "Resgate de taxa", amount: "+0,62 SOL", time: "há 6 min", sig: "4Hn2…Lw1c" },
  { kind: "Queima", amount: "−1,2 mi", time: "há 5 h", sig: "2bVc…9yRe" },
  { kind: "Swap SOL → cbBTC", amount: "+0,0007 BTC", time: "há 7 h", sig: "6Tq1…Mm4d" },
  { kind: "Resgate de taxa", amount: "+1,08 SOL", time: "há 7 h", sig: "8Kz3…Pa0s" },
]

export const RISKS = [
  {
    title: "O cofre não garante o preço",
    text: "Holders não têm direito sobre o BTC do cofre. O preço de $TESOUREIRO depende de quem quer comprar e vender, não do saldo do cofre.",
  },
  {
    title: "O volume pode morrer",
    text: "Sem negociação não há taxa, e o cofre para de crescer. A maioria das memecoins perde quase todo o volume no primeiro dia.",
  },
  {
    title: "O Bitcoin pode cair",
    text: "O cofre é medido em BTC. Se o BTC cair, o valor em dólar do cofre cai junto.",
  },
  {
    title: "cbBTC pode ser congelado",
    text: "O cbBTC é emitido pela Coinbase, que tem autoridade para congelar o token. É um risco de terceiro, fora do nosso controle.",
  },
  {
    title: "Cópias vão aparecer",
    text: "O único contrato verdadeiro é o publicado nesta página no dia do lançamento. Qualquer outro endereço é falso.",
  },
  {
    title: "Você pode perder tudo",
    text: "Memecoins são especulação. Não coloque dinheiro que você não pode perder.",
  },
]

export const FAQ = [
  {
    q: "O agente de IA pode mexer no dinheiro?",
    a: "Não. Ele só propõe ações. Um executor confere cada proposta contra regras fixas, e o cofre só se move com 2 de 3 assinaturas no multisig Squads.",
  },
  {
    q: "Eu recebo BTC por segurar a moeda?",
    a: "Não. O cofre acumula BTC e a recompra queima $TESOUREIRO. Não há distribuição a holders, nem sorteio, nem rendimento.",
  },
  {
    q: "Onde vejo que é tudo verdade?",
    a: "Cada resgate, swap, queima e assinatura terá link para a transação no Solscan. As carteiras do cofre e das taxas serão publicadas no lançamento.",
  },
  {
    q: "Quando lança?",
    a: "A data e o contrato oficial serão publicados aqui e no X oficial. Até lá, tudo nesta página é simulação.",
  },
]
