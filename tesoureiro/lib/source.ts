// One place the pages read numbers from.
// Simulated (lib/data.ts) until SIMULATED = false and the env vars in .env.example are set.
// Live: Helius RPC + Enhanced Transactions, Jupiter Price API v3, DexScreener for 24h volume.

import { cacheLife } from "next/cache"
import { MARKET, SIMULATED, TOKEN, TXS, VAULT, VAULT_HISTORY } from "@/lib/data"
import {
  CBBTC_MINT,
  classifyTxs,
  countHolderPage,
  historyFromSwaps,
  parseDexVolume,
  parseJupiterPrice,
  parseSupply,
  parseTokenBalance,
  type Tx,
} from "@/lib/parse"

export type Snapshot = {
  live: boolean
  asOf: string
  vault: { btc: number; burned: number | null; feesClaimedSol: number | null; proposals: number | null; refused: number | null }
  market: { priceUsd: number | null; change24h: number | null; volume24hUsd: number | null; holders: number | null }
  txs: Tx[]
  history: number[]
}

const SIM_AS_OF = "Nov 4, 2026 · 14:00 UTC"

function simulated(): Snapshot {
  return { live: false, asOf: SIM_AS_OF, vault: { ...VAULT }, market: { ...MARKET }, txs: TXS, history: VAULT_HISTORY }
}

type Env = { helius: string; mint: string; vault: string; fee: string; jup?: string }

function env(): Env | null {
  const helius = process.env.HELIUS_API_KEY
  const mint = process.env.TOKEN_MINT || TOKEN.contract
  const vault = process.env.VAULT_WALLET
  const fee = process.env.FEE_WALLET
  if (!helius || !mint || !vault || !fee) return null
  return { helius, mint, vault, fee, jup: process.env.JUP_API_KEY || undefined }
}

async function getJson(url: string, init?: RequestInit): Promise<unknown> {
  const r = await fetch(url, { ...init, signal: AbortSignal.timeout(8000) })
  if (!r.ok) throw new Error(`${r.status} ${url.split("?")[0]}`)
  return r.json()
}

const rpc = (key: string, method: string, params: unknown) =>
  getJson(`https://mainnet.helius-rpc.com/?api-key=${key}`, {
    method: "POST",
    headers: { "content-type": "application/json" },
    body: JSON.stringify({ jsonrpc: "2.0", id: method, method, params }),
  })

async function countHolders(key: string, mint: string, maxPages = 10): Promise<number> {
  let total = 0
  for (let page = 1; page <= maxPages; page++) {
    const { count, size } = countHolderPage(await rpc(key, "getTokenAccounts", { mint, page, limit: 1000 }))
    total += count
    if (size < 1000) break
  }
  return total
}

/** Never throws: any failed read falls back to null for that field (and to simulated data if the vault read fails). */
export async function getSnapshot(): Promise<Snapshot> {
  "use cache"
  cacheLife("minutes")

  const e = env()
  if (SIMULATED || !e) return simulated()

  const now = Date.now()
  const safe = <T,>(p: Promise<T>) => p.catch(() => null)

  const [vaultBal, supply, price, dex, holders, txJson] = await Promise.all([
    safe(rpc(e.helius, "getTokenAccountsByOwner", [e.vault, { mint: CBBTC_MINT }, { encoding: "jsonParsed" }])),
    safe(rpc(e.helius, "getTokenSupply", [e.mint])),
    e.jup ? safe(getJson(`https://api.jup.ag/price/v3?ids=${e.mint}`, { headers: { "x-api-key": e.jup } })) : null,
    safe(getJson(`https://api.dexscreener.com/latest/dex/tokens/${e.mint}`)),
    safe(countHolders(e.helius, e.mint)),
    safe(getJson(`https://api.helius.xyz/v0/addresses/${e.vault}/transactions?api-key=${e.helius}&limit=100`)),
  ])
  if (vaultBal === null) return simulated()

  const btc = parseTokenBalance(vaultBal)
  const cur = parseSupply(supply)
  const { rows, swaps } = classifyTxs(txJson, { vault: e.vault, fee: e.fee, mint: e.mint }, now)
  const p = price ? parseJupiterPrice(price, e.mint) : { priceUsd: null, change24h: null }

  return {
    live: true,
    asOf: new Date(now).toUTCString().replace(/:\d\d GMT$/, " UTC"),
    vault: {
      btc,
      burned: cur === null ? null : Math.max(0, TOKEN.supply - cur),
      feesClaimedSol: null,
      // Read from the Guardian's own log once the executor ships. Never fall back to simulated counts.
      proposals: null,
      refused: null,
    },
    market: { priceUsd: p.priceUsd, change24h: p.change24h, volume24hUsd: parseDexVolume(dex), holders },
    txs: rows.slice(0, 20),
    history: historyFromSwaps(btc, swaps, now),
  }
}
