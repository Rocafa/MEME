// Heist Launchpad: concept site content. Not launched, no program deployed, nothing to buy.

export const PAD = {
  name: "Heist Launchpad",
  palette: { background: "#101010", ink: "#f1ede4", warm: "#f7931a" },
}

/** Split of every creator fee on every coin launched through the pad. */
export const PAD_SPLIT = [
  { key: "vault", label: "The coin's own vault", pct: 65, note: "Swapped to cbBTC into a vault that belongs to that coin. Nothing leaves it." },
  { key: "pass", label: "Crew Pass pot", pct: 10, note: "Pooled for Crew Pass holders. Needs legal review before launch: it may change or be removed." },
  { key: "burn", label: "Parent buyback & burn", pct: 10, note: "Buys the pad's parent token and burns it." },
  { key: "protocol", label: "Protocol", pct: 12.5, note: "Servers, RPC, audits, team." },
  { key: "rent", label: "Account rent", pct: 2.5, note: "Solana account rent for each coin's vault and records." },
] as const

export const PAD_STEPS = [
  { t: "Name it", d: "Name, ticker, image. That's the whole form." },
  { t: "Deploy on the curve", d: "One transaction launches the coin on pump.fun with fee sharing pointed at the pad." },
  { t: "Open its vault", d: "The pad creates a cbBTC vault for the coin, owned by the same 2-of-3 multisig model." },
  { t: "Fees start working", d: "Every trade's creator fee is claimed about once a minute and split as below." },
]

export const PAD_FAQ = [
  { q: "Is the launchpad live?", a: "No. It's phase 3 of the plan, after the Tesoureiro and $HEIST. No program is deployed and there is no parent token yet." },
  {
    q: "Who owns a coin's vault?",
    a: "Nobody can withdraw from it. Like the Tesoureiro, each vault only accumulates, and moves need 2 of 3 signatures under public rules.",
  },
  {
    q: "What is the Crew Pass?",
    a: "A planned NFT with its own vault that collects 10% of every coin's fees. Paying anything to holders can make it a security, so it will not ship without a lawyer's sign-off.",
  },
  {
    q: "Can I launch a coin today?",
    a: "No. The form on this page is a preview: it builds a card in your browser and sends nothing.",
  },
]

export const PAD_RISKS = [
  { title: "Most coins die", text: "On launchpads, the vast majority of coins lose almost all volume within days. The calculator defaults to that." },
  { title: "Custom programs need audits", text: "The pad needs its own Solana programs. Unaudited code holding money is how vaults get drained." },
  { title: "Holder payouts are a legal risk", text: "The Crew Pass pot looks like profit sharing. It may be removed if a lawyer says so." },
  { title: "Platform rules can change", text: "The model depends on launchpad fee-sharing staying as it is today." },
]
