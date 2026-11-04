// Adapters: read-only Solana RPC reader, dry-run submitter, JSONL ledger, in-memory ledger for tests.

import { appendFile, readFile } from "node:fs/promises"
import { CBBTC_MINT, parseTokenBalance } from "../../tesoureiro/lib/parse.ts"
import { milestoneOf } from "./loop.ts"
import type { ChainReader, Ledger, LedgerEntry, Proposal, State, Submitter } from "./types.ts"

const LAMPORTS = 1_000_000_000

async function rpc(url: string, method: string, params: unknown[]): Promise<unknown> {
  const r = await fetch(url, {
    method: "POST",
    headers: { "content-type": "application/json" },
    body: JSON.stringify({ jsonrpc: "2.0", id: 1, method, params }),
    signal: AbortSignal.timeout(10_000),
  })
  if (!r.ok) throw new Error(`RPC ${method}: HTTP ${r.status}`)
  const j = (await r.json()) as { error?: { message: string } }
  if (j.error) throw new Error(`RPC ${method}: ${j.error.message}`)
  return j
}

/** Reads the fee wallet's SOL and the vault's cbBTC. Read-only: never signs. */
export class RpcReader implements ChainReader {
  private url: string
  private feeWallet: string
  private vaultWallet: string
  private btcMint: string

  constructor(url: string, feeWallet: string, vaultWallet: string, btcMint = CBBTC_MINT) {
    this.url = url
    this.feeWallet = feeWallet
    this.vaultWallet = vaultWallet
    this.btcMint = btcMint
  }

  async read(): Promise<State> {
    const [bal, tok] = await Promise.all([
      rpc(this.url, "getBalance", [this.feeWallet]),
      rpc(this.url, "getTokenAccountsByOwner", [this.vaultWallet, { mint: this.btcMint }, { encoding: "jsonParsed" }]),
    ])
    const lamports = (bal as { result?: { value?: number } }).result?.value ?? 0
    return { feeSol: lamports / LAMPORTS, vaultBtc: parseTokenBalance(tok) }
  }
}

/** Logs what it would send to the multisig. Sends nothing. */
export class DryRunSubmitter implements Submitter {
  readonly mode = "dry-run" as const
  private n = 0
  async submit(_p: Proposal, _why: string) {
    return { id: `dry-${Date.now().toString(36)}-${++this.n}` }
  }
}

/** Append-only JSON Lines file. This is the Guardian's public log. */
export class FileLedger implements Ledger {
  private path: string
  constructor(path: string) {
    this.path = path
  }
  async append(e: LedgerEntry) {
    await appendFile(this.path, JSON.stringify(e) + "\n", "utf8")
  }
  async entries(): Promise<LedgerEntry[]> {
    try {
      const txt = await readFile(this.path, "utf8")
      return txt
        .split("\n")
        .filter(Boolean)
        .map((l) => JSON.parse(l) as LedgerEntry)
    } catch {
      return []
    }
  }
  async lastMilestone() {
    return Math.max(0, ...(await this.entries()).map(milestoneOf))
  }
}

export class MemoryLedger implements Ledger {
  rows: LedgerEntry[] = []
  async append(e: LedgerEntry) {
    this.rows.push(e)
  }
  async lastMilestone() {
    return Math.max(0, ...this.rows.map(milestoneOf))
  }
}

/** Counts for the site: proposals made and refused by the Guardian. */
export function summarize(rows: LedgerEntry[]) {
  return { proposals: rows.length, refused: rows.filter((r) => !r.verdict.ok).length }
}
