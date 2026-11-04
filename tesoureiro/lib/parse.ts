// Pure parsers for on-chain and market API responses. No imports, no I/O, so they can be unit tested.

export type TxKind = "Fee claim" | "Swap SOL → cbBTC" | "Burn" | "Multisig signature"
export type Tx = { kind: TxKind; amount: string; time: string; sig: string; href: string | null }

export const CBBTC_MINT = "cbbtcf3aa214zXHbiAZQwf4122FBYbraNdFqgw4iMij"
const LAMPORTS = 1_000_000_000

/** Jupiter Price API v3: `{ [mint]: { usdPrice, priceChange24h } }`. */
export function parseJupiterPrice(json: unknown, mint: string): { priceUsd: number | null; change24h: number | null } {
  const row = (json as Record<string, { usdPrice?: unknown; priceChange24h?: unknown }> | null)?.[mint]
  const n = (v: unknown) => (typeof v === "number" && Number.isFinite(v) ? v : null)
  return { priceUsd: n(row?.usdPrice), change24h: n(row?.priceChange24h) }
}

/** DexScreener `/latest/dex/tokens/{mint}`: sum 24h volume across pairs. */
export function parseDexVolume(json: unknown): number | null {
  const pairs = (json as { pairs?: { volume?: { h24?: unknown } }[] } | null)?.pairs
  if (!Array.isArray(pairs) || pairs.length === 0) return null
  return pairs.reduce((s, p) => s + (typeof p.volume?.h24 === "number" ? p.volume.h24 : 0), 0)
}

/** RPC `getTokenAccountsByOwner` (jsonParsed): total UI balance across accounts. */
export function parseTokenBalance(json: unknown): number {
  const value = (json as { result?: { value?: unknown[] } } | null)?.result?.value
  if (!Array.isArray(value)) return 0
  return value.reduce<number>((s, acc) => {
    const ui = (acc as { account?: { data?: { parsed?: { info?: { tokenAmount?: { uiAmount?: unknown } } } } } })
      ?.account?.data?.parsed?.info?.tokenAmount?.uiAmount
    return s + (typeof ui === "number" ? ui : 0)
  }, 0)
}

/** RPC `getTokenSupply`: current UI supply. */
export function parseSupply(json: unknown): number | null {
  const ui = (json as { result?: { value?: { uiAmount?: unknown } } } | null)?.result?.value?.uiAmount
  return typeof ui === "number" ? ui : null
}

/** Helius DAS `getTokenAccounts` page: count accounts with a non-zero balance. */
export function countHolderPage(json: unknown): { count: number; size: number } {
  const list = (json as { result?: { token_accounts?: { amount?: unknown }[] } } | null)?.result?.token_accounts
  if (!Array.isArray(list)) return { count: 0, size: 0 }
  return { count: list.filter((a) => Number(a.amount) > 0).length, size: list.length }
}

export const shortSig = (sig: string) => (sig.length > 10 ? `${sig.slice(0, 4)}…${sig.slice(-4)}` : sig)

export function timeAgo(tsSec: number, nowMs: number): string {
  const s = Math.max(0, Math.round(nowMs / 1000 - tsSec))
  if (s < 60) return "just now"
  if (s < 3600) return `${Math.floor(s / 60)} min ago`
  if (s < 86400) return `${Math.floor(s / 3600)} h ago`
  return `${Math.floor(s / 86400)} d ago`
}

const compact = (n: number) =>
  new Intl.NumberFormat("en-US", { notation: "compact", maximumFractionDigits: 1 }).format(n)

type HeliusTx = {
  signature: string
  timestamp: number
  type?: string
  source?: string
  tokenTransfers?: { mint: string; tokenAmount: number; toUserAccount?: string; fromUserAccount?: string }[]
  nativeTransfers?: { amount: number; toUserAccount?: string }[]
}

/**
 * Helius Enhanced Transactions → activity rows.
 * Swaps that send cbBTC to the vault, burns of the token, SOL into the fee wallet, and Squads signatures.
 * Everything else is ignored. Also returns the raw cbBTC inflows for the history chart.
 */
export function classifyTxs(
  json: unknown,
  w: { vault: string; fee: string; mint: string },
  nowMs: number,
): { rows: Tx[]; swaps: { ts: number; btc: number }[] } {
  const rows: Tx[] = []
  const swaps: { ts: number; btc: number }[] = []
  if (!Array.isArray(json)) return { rows, swaps }

  for (const t of json as HeliusTx[]) {
    if (!t?.signature || typeof t.timestamp !== "number") continue
    const base = { time: timeAgo(t.timestamp, nowMs), sig: shortSig(t.signature), href: `https://solscan.io/tx/${t.signature}` }
    const btcIn = (t.tokenTransfers ?? [])
      .filter((x) => x.mint === CBBTC_MINT && x.toUserAccount === w.vault)
      .reduce((s, x) => s + x.tokenAmount, 0)
    const burned = (t.tokenTransfers ?? [])
      .filter((x) => x.mint === w.mint && (t.type === "BURN" || !x.toUserAccount))
      .reduce((s, x) => s + x.tokenAmount, 0)
    const solIn = (t.nativeTransfers ?? [])
      .filter((x) => x.toUserAccount === w.fee)
      .reduce((s, x) => s + x.amount, 0)

    if (btcIn > 0) {
      rows.push({ kind: "Swap SOL → cbBTC", amount: `+${btcIn.toFixed(4)} BTC`, ...base })
      swaps.push({ ts: t.timestamp, btc: btcIn })
    } else if (burned > 0) {
      rows.push({ kind: "Burn", amount: `−${compact(burned)}`, ...base })
    } else if (solIn > 0) {
      rows.push({ kind: "Fee claim", amount: `+${(solIn / LAMPORTS).toFixed(2)} SOL`, ...base })
    } else if (t.source === "SQUADS") {
      rows.push({ kind: "Multisig signature", amount: "2 of 3", ...base })
    }
  }
  return { rows, swaps }
}

/**
 * Daily vault balance for the last `days` days, ending at today's balance,
 * walking back through known cbBTC inflows.
 */
export function historyFromSwaps(balance: number, swaps: { ts: number; btc: number }[], nowMs: number, days = 90): number[] {
  const perDay = new Array<number>(days).fill(0)
  for (const s of swaps) {
    const ago = Math.floor((nowMs / 1000 - s.ts) / 86400)
    if (ago >= 0 && ago < days) perDay[days - 1 - ago] += s.btc
  }
  const out = new Array<number>(days)
  let v = balance
  for (let i = days - 1; i >= 0; i--) {
    out[i] = Math.max(0, Number(v.toFixed(8)))
    v -= perDay[i]
  }
  return out
}
