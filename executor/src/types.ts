import type { Proposal, Verdict } from "../../tesoureiro/lib/guardian.ts"

export type { Proposal, Verdict }

/** What the executor can read from the chain. */
export type State = {
  /** Unclaimed + claimed SOL sitting in the fee wallet. */
  feeSol: number
  /** cbBTC held by the vault multisig. */
  vaultBtc: number
}

export interface ChainReader {
  read(): Promise<State>
}

/** Where approved proposals go. Dry run logs them; the Squads submitter (T12b) creates multisig proposals. */
export interface Submitter {
  readonly mode: "dry-run" | "squads"
  submit(p: Proposal, why: string): Promise<{ id: string }>
}

export type Plan = { proposal: Proposal; why: string }

export type LedgerEntry = {
  at: string
  state: State
  proposal: Proposal
  why: string
  verdict: Verdict
  submitted: { mode: Submitter["mode"]; id: string } | null
}

export interface Ledger {
  append(e: LedgerEntry): Promise<void>
  /** Last milestone (BTC) the Treasurer already acted on. */
  lastMilestone(): Promise<number>
}
