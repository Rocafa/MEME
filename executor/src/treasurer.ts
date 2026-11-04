// The Treasurer: turns chain state into proposals. It has no keys and cannot send anything.
// Deterministic for now; an LLM can later write the diary text around the same proposals.

import type { Plan, State } from "./types.ts"

export const MILESTONES_BTC = [0.01, 0.05, 0.1, 0.5, 1]

export type TreasurerConfig = {
  /** Swap when the fee wallet holds at least this much SOL. Matches Guardian rule R3. */
  minSwapSol: number
  /** Slippage the Treasurer asks for. */
  slippagePct: number
  /** SOL kept in the fee wallet for network fees. */
  reserveSol: number
  /** Burn size (% of supply) proposed when a new milestone is reached. Below 1% needs no notice (R5). */
  milestoneBurnPct: number
}

export const DEFAULT_TREASURER: TreasurerConfig = {
  minSwapSol: 0.5,
  slippagePct: 0.5,
  reserveSol: 0.02,
  milestoneBurnPct: 0.5,
}

export function propose(s: State, lastMilestone: number, cfg: TreasurerConfig = DEFAULT_TREASURER): Plan[] {
  const plans: Plan[] = []

  const swappable = Number(Math.max(0, s.feeSol - cfg.reserveSol).toFixed(4))
  if (swappable >= cfg.minSwapSol) {
    plans.push({
      proposal: { action: "swap", amount: swappable, slippage: cfg.slippagePct, announced: false },
      why: `Fee wallet holds ${s.feeSol} SOL. Swapping ${swappable} SOL to cbBTC, keeping ${cfg.reserveSol} SOL for fees.`,
    })
  }

  const reached = MILESTONES_BTC.filter((m) => s.vaultBtc >= m && m > lastMilestone)
  if (reached.length) {
    const top = reached[reached.length - 1]
    plans.push({
      proposal: { action: "burn", amount: cfg.milestoneBurnPct, slippage: 0, announced: false },
      why: `Vault reached ${top} BTC. Proposing the milestone burn of ${cfg.milestoneBurnPct}% of supply from the buyback share.`,
    })
  }

  return plans
}
