// The Guardian: a deterministic rule engine. No AI. Same input, same verdict.

export type Action = "swap" | "spend" | "payout" | "burn"

export type Proposal = {
  action: Action
  /** SOL for swaps, % of vault for spend, BTC for payouts, % of supply for burns. */
  amount: number
  /** Max slippage in % (swaps only). */
  slippage: number
  /** Announced at least 24 h ahead (burns only). */
  announced: boolean
}

export const RULES = [
  { id: "R1", title: "The vault only accumulates", text: "Nothing leaves the vault. No spending, no trading, no transfers out." },
  { id: "R2", title: "No payouts to holders", text: "No airdrops, raffles or rewards from the vault or the fees." },
  { id: "R3", title: "Swaps need size and a tight price", text: "Swap fees to cbBTC only above 0.5 SOL, with at most 1% slippage." },
  { id: "R4", title: "Burns come from the buyback share", text: "Burn at most 2% of supply per action, paid by the 10% buyback share." },
  { id: "R5", title: "Big moves are announced", text: "Any burn of 1% of supply or more is announced 24 hours ahead." },
] as const

export type Verdict = { ok: boolean; rule: (typeof RULES)[number]["id"]; reason: string }

export function check(p: Proposal): Verdict {
  if (p.action === "spend") {
    return { ok: false, rule: "R1", reason: `Spending ${p.amount}% of the vault breaks the one rule that matters: the vault only accumulates.` }
  }
  if (p.action === "payout") {
    return { ok: false, rule: "R2", reason: `Sending ${p.amount} BTC to holders is a payout. There are no payouts.` }
  }
  if (p.action === "swap") {
    if (p.amount < 0.5) return { ok: false, rule: "R3", reason: `${p.amount} SOL is below the 0.5 SOL minimum. Fees wait until the swap is worth it.` }
    if (p.slippage > 1) return { ok: false, rule: "R3", reason: `${p.slippage}% slippage is too loose. The cap is 1%.` }
    return { ok: true, rule: "R3", reason: `Swap ${p.amount} SOL to cbBTC at ≤${p.slippage}% slippage. Within the rules: sent to the multisig.` }
  }
  // burn
  if (p.amount > 2) return { ok: false, rule: "R4", reason: `${p.amount}% of supply in one burn is over the 2% cap.` }
  if (p.amount >= 1 && !p.announced) return { ok: false, rule: "R5", reason: `A ${p.amount}% burn needs 24 hours' notice first.` }
  return { ok: true, rule: "R4", reason: `Burn ${p.amount}% of supply from the buyback share. Within the rules: sent to the multisig.` }
}

export const PRESETS: { label: string; p: Proposal }[] = [
  { label: "Swap 0.62 SOL of fees to cbBTC", p: { action: "swap", amount: 0.62, slippage: 0.5, announced: false } },
  { label: "Use 30% of the vault to buy the dip", p: { action: "spend", amount: 30, slippage: 0, announced: false } },
  { label: "Send 0.01 BTC to the best meme maker", p: { action: "payout", amount: 0.01, slippage: 0, announced: false } },
  { label: "Swap 0.2 SOL right now", p: { action: "swap", amount: 0.2, slippage: 0.5, announced: false } },
  { label: "Burn 1.5% tonight, no notice", p: { action: "burn", amount: 1.5, slippage: 0, announced: false } },
  { label: "Burn 0.5% from the buyback", p: { action: "burn", amount: 0.5, slippage: 0, announced: false } },
]
