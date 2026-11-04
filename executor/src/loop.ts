// One tick: read → Treasurer proposes → Guardian checks → approved go to the submitter. Everything is logged.

import { check } from "../../tesoureiro/lib/guardian.ts"
import { MILESTONES_BTC, propose, type TreasurerConfig } from "./treasurer.ts"
import type { ChainReader, Ledger, LedgerEntry, Submitter } from "./types.ts"

export async function tick(deps: {
  chain: ChainReader
  submitter: Submitter
  ledger: Ledger
  now?: () => Date
  treasurer?: TreasurerConfig
}): Promise<LedgerEntry[]> {
  const now = deps.now ?? (() => new Date())
  const state = await deps.chain.read()
  const plans = propose(state, await deps.ledger.lastMilestone(), deps.treasurer)
  const out: LedgerEntry[] = []

  for (const { proposal, why } of plans) {
    const verdict = check(proposal)
    const submitted = verdict.ok ? { mode: deps.submitter.mode, ...(await deps.submitter.submit(proposal, why)) } : null
    const entry: LedgerEntry = { at: now().toISOString(), state, proposal, why, verdict, submitted }
    await deps.ledger.append(entry)
    out.push(entry)
  }
  return out
}

/** Highest milestone a ledger entry acted on (burns carry the vault balance that triggered them). */
export function milestoneOf(e: LedgerEntry): number {
  if (e.proposal.action !== "burn" || !e.verdict.ok) return 0
  return MILESTONES_BTC.filter((m) => e.state.vaultBtc >= m).pop() ?? 0
}
