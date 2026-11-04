// SIMULATED data. The coin has not launched: nothing here is real.
// At launch, replace with on-chain reads (Helius / Solscan / Jupiter) and set SIMULATED = false.

export const SIMULATED = true

export const TOKEN = {
  name: "NoKeys",
  ticker: "$NOKEYS",
  // Published only at launch. Until then, any address going around is fake.
  contract: null as string | null,
  supply: 1_000_000_000,
}

/** Split of the creator fee (0.30% of every trade on the pump.fun curve). */
export const FEE_SPLIT = [
  { label: "Bitcoin vault", pct: 70, note: "Swapped from SOL to cbBTC and held in the multisig" },
  { label: "Buyback & burn", pct: 10, note: "Buys $NOKEYS and burns it in a separate transaction" },
  { label: "Operations", pct: 20, note: "Servers, RPC, audits and the team" },
]

export const CREATOR_FEE = 0.003

/** Reference values for on-screen estimates only. Not quotes. */
export const REF = { btcUsd: 100_000, solBtc: 0.0015, solUsd: 150 }

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
  { btc: 0.01, title: "First coin in the vault", reward: "Treasurer post + 0.5% burn" },
  { btc: 0.05, title: "A vault worth respecting", reward: "Burn 1% of circulating supply" },
  { btc: 0.1, title: "A tenth of a Bitcoin", reward: "Burn + vote on the Treasurer's next mood" },
  { btc: 0.5, title: "Half a Bitcoin", reward: "Community-voted event" },
  { btc: 1, title: "One whole Bitcoin", reward: "The big one, plus a full report" },
]

/** Vault balance over the last 90 days (BTC). */
export const VAULT_HISTORY: number[] = (() => {
  const out: number[] = []
  let v = 0
  for (let i = 0; i < 90; i++) {
    const day = 0.0004 + 0.0007 * Math.abs(Math.sin(i * 1.7)) + (i > 60 ? 0.0006 : 0) + (i > 80 ? 0.0004 : 0)
    v += day
    out.push(v)
  }
  const scale = VAULT.btc / out[out.length - 1]
  return out.map((x) => Number((x * scale).toFixed(5)))
})()

export type DiaryKind = "executed" | "proposed" | "refused"

export const DIARY: { time: string; kind: DiaryKind; text: string }[] = [
  {
    time: "4 min ago",
    kind: "executed",
    text: "Fee balance crossed 0.5 SOL. I proposed the swap, the Guardian checked the rules, the multisig signed. The vault gained 0.0004 BTC. Slow and steady.",
  },
  {
    time: "38 min ago",
    kind: "refused",
    text: "I suggested using 30% of the vault to buy the dip. The Guardian refused: the rules say the vault only accumulates. It's right. I only talk.",
  },
  {
    time: "2 h ago",
    kind: "proposed",
    text: "0.0268 BTC to the third milestone. Proposal: announce the burn 24 hours ahead. Waiting for signatures.",
  },
  {
    time: "5 h ago",
    kind: "executed",
    text: "Burned 1.2M $NOKEYS. Bought in one transaction, burned in another, both on Solscan. Nobody has to trust me.",
  },
  {
    time: "9 h ago",
    kind: "refused",
    text: "Asked to send 0.01 BTC to a holder who wrote a nice poem. Refused: no payouts to holders. The poem was good though.",
  },
]

import type { Tx } from "./parse"
export type { Tx, TxKind } from "./parse"

export const TXS: Tx[] = ([
  { kind: "Swap SOL → cbBTC", amount: "+0.0004 BTC", time: "4 min ago", sig: "5xA9…k2Pq" },
  { kind: "Multisig signature", amount: "2 of 3", time: "5 min ago", sig: "3mQ7…Zt8w" },
  { kind: "Fee claim", amount: "+0.62 SOL", time: "6 min ago", sig: "4Hn2…Lw1c" },
  { kind: "Burn", amount: "−1.2M", time: "5 h ago", sig: "2bVc…9yRe" },
  { kind: "Swap SOL → cbBTC", amount: "+0.0007 BTC", time: "7 h ago", sig: "6Tq1…Mm4d" },
  { kind: "Fee claim", amount: "+1.08 SOL", time: "7 h ago", sig: "8Kz3…Pa0s" },
  { kind: "Multisig signature", amount: "2 of 3", time: "7 h ago", sig: "9Ld5…Qw2x" },
  { kind: "Burn", amount: "−0.8M", time: "1 d ago", sig: "7Fp8…Hs3k" },
] as Omit<Tx, "href">[]).map((t) => ({ ...t, href: null }))

/** Short lines for the scrolling ticker. */
export const TICKER = [
  "+0.0004 BTC to the vault",
  "Guardian refused: spend from vault",
  "Burned 1.2M $NOKEYS",
  "Multisig signed 2 of 3",
  "Fee claim +0.62 SOL",
  "Next milestone: 0.1 BTC",
  "Guardian approved: swap 0.6 SOL → cbBTC",
  "Refused 3 of 64 proposals",
]

export const RISKS = [
  {
    title: "The vault doesn't back the price",
    text: "Holders have no claim on the vault's BTC. The price of $NOKEYS is set by buyers and sellers, not by the vault balance.",
  },
  {
    title: "Volume can die",
    text: "No trading means no fees, and the vault stops growing. Most memecoins lose almost all their volume on day one.",
  },
  {
    title: "Bitcoin can fall",
    text: "The vault is held in BTC. If BTC drops, the vault's dollar value drops with it.",
  },
  {
    title: "cbBTC can be frozen",
    text: "cbBTC is issued by Coinbase, which can freeze the token. That's a third-party risk outside our control.",
  },
  {
    title: "Copycats will launch",
    text: "The only real contract is the one published on this site on launch day. Any other address is fake.",
  },
  {
    title: "You can lose everything",
    text: "Memecoins are speculation. Don't put in money you can't afford to lose.",
  },
]

export const FAQ = [
  {
    q: "Can the AI touch the money?",
    a: "No. It only proposes. A Guardian with no AI in it checks every proposal against fixed rules, and the vault only moves with 2 of 3 signatures on a Squads multisig.",
  },
  {
    q: "Do I get BTC for holding?",
    a: "No. The vault accumulates BTC and the buyback burns $NOKEYS. There are no payouts to holders, no raffles and no yield.",
  },
  {
    q: "How do I know any of this is true?",
    a: "Every fee claim, swap, burn and signature will link to its transaction on Solscan. The vault, fee and burn wallets are published at launch.",
  },
  {
    q: "When does it launch?",
    a: "The date and the official contract will be posted here and on the official X account. Until then, every number on this site is simulated.",
  },
]

/* ------------------------------------------------------------------ */
/* Next drops: concept coins in the pipeline. Nothing here is live.    */
/* ------------------------------------------------------------------ */

export type Drop = {
  slug: string
  ticker: string
  wordmark: string
  name: string
  tier: "S" | "A" | "B"
  score: number
  status: string
  tagline: string
  pitch: string
  palette: { background: string; ink: string; warm: string }
  accent: string
  how: { title: string; text: string }[]
  split: { label: string; pct: number }[]
  milestones?: { label: string; reward: string }[]
  whyNow: string
  risks: string[]
  stack: string[]
}

export const DROPS: Drop[] = [
  {
    slug: "heist",
    ticker: "$HEIST",
    wordmark: "heist",
    name: "Heist",
    tier: "S",
    score: 3.85,
    status: "Concept · next up",
    tagline: "The crew is stealing Bitcoin, one trade at a time.",
    pitch:
      "A Bitcoin vault with a crime-thriller skin. Every trade fills a public cbBTC vault, and the vault climbs a five-star wanted level. Each star triggers a burn and a story beat.",
    palette: { background: "#0b0d1a", ink: "#e8ecff", warm: "#ff3b3b" },
    accent: "#ff3b3b",
    how: [
      { title: "Every trade pays the crew", text: "0.30% creator fee on every buy and sell." },
      { title: "The loot goes to the vault", text: "80% is swapped to cbBTC and locked in a 2-of-3 multisig." },
      { title: "Wanted level rises", text: "Each milestone adds a star and triggers a burn." },
      { title: "Heist Day", text: "One day where 100% of fees go to the vault." },
    ],
    split: [
      { label: "Vault", pct: 80 },
      { label: "Crew (ops)", pct: 20 },
    ],
    milestones: [
      { label: "★ 0.01 BTC", reward: "\"The cops noticed\" + small burn" },
      { label: "★★ 0.05 BTC", reward: "Bigger burn" },
      { label: "★★★ 0.1 BTC", reward: "Burn + story drop" },
      { label: "★★★★ 0.5 BTC", reward: "Community vote" },
      { label: "★★★★★ 1 BTC", reward: "MOST WANTED" },
    ],
    whyNow:
      "Crime-game culture is peaking in November 2026 and Bitcoin-reward coins are trending. Late copycats of game-themed coins already dropped 95%: the vault is the difference.",
    risks: [
      "No third-party game names, logos or art. Original world only.",
      "Vault does not back the price; no payouts to holders.",
      "Hype windows close fast; the vault has to carry it after.",
    ],
    stack: ["TypeScript bot", "Jupiter Swap API v2", "Squads multisig", "Next.js dashboard", "PostgreSQL ledger"],
  },
  {
    slug: "launchpad",
    ticker: "Heist Launchpad",
    wordmark: "launchpad",
    name: "Heist Launchpad",
    tier: "S",
    score: 3.75,
    status: "Concept · phase 3",
    tagline: "Launch a coin. Its fees fill its own Bitcoin vault.",
    pitch:
      "The machine version. Anyone launches a coin through the pad; each coin gets its own cbBTC vault, and a slice of every fee buys back and burns the parent token. A Crew Pass NFT with its own vault captures a share of every coin on the pad.",
    palette: { background: "#101010", ink: "#f1ede4", warm: "#f7931a" },
    accent: "#f7931a",
    how: [
      { title: "Launch in one transaction", text: "Name, ticker, image. Deployed on pump.fun with fee sharing set to the protocol." },
      { title: "Each coin gets a vault", text: "Its fees are claimed every minute and swapped to cbBTC." },
      { title: "Parent token gets burned", text: "10% of every fee buys back and burns the parent token." },
      { title: "Crew Pass", text: "An NFT with a vault. Minting burns tokens; the pass earns from every coin." },
    ],
    split: [
      { label: "Coin vault", pct: 65 },
      { label: "Crew Pass pot", pct: 10 },
      { label: "Buyback & burn", pct: 10 },
      { label: "Protocol", pct: 12.5 },
      { label: "Account rent", pct: 2.5 },
    ],
    whyNow:
      "The fee-machine model is already proven on Solana. A Bitcoin-native version with transparent vaults is a clear gap.",
    risks: [
      "Custom Solana programs need an audit before real money.",
      "Paying assets to holders likely needs legal review (securities rules).",
      "Depends on launchpad fee-sharing rules staying as they are.",
    ],
    stack: ["Rust + Anchor 1.x", "@pump-fun/pump-sdk", "Metaplex Core", "Helius webhooks", "Next.js"],
  },
  {
    slug: "index",
    ticker: "$INDEX",
    wordmark: "index",
    name: "Index",
    tier: "A",
    score: 3.35,
    status: "Concept · research",
    tagline: "One token, ten memes.",
    pitch:
      "A treasury that buys a basket of the largest Solana memecoins by a public rule, rebalanced monthly. The basket is shown live; the token is the meme.",
    palette: { background: "#0d1b4d", ink: "#dfe7ff", warm: "#ffcd3c" },
    accent: "#ffcd3c",
    how: [
      { title: "Fees in", text: "Creator fees are claimed and pooled." },
      { title: "Basket out", text: "Above a threshold, the pool buys the basket by market-cap weight." },
      { title: "Monthly rebalance", text: "Public rule: cap, liquidity and age filters." },
      { title: "Everything on chain", text: "Every buy and rebalance links to Solscan." },
    ],
    split: [
      { label: "Basket", pct: 75 },
      { label: "Buyback & burn", pct: 10 },
      { label: "Ops", pct: 15 },
    ],
    whyNow: "Index products are a familiar idea; nobody owns the meme-index narrative on Solana yet.",
    risks: ["Looks like a fund: needs legal review.", "Swap costs across ten assets eat small rounds.", "Basket coins can die."],
    stack: ["TypeScript", "Python (selection rule)", "Jupiter Swap API v2", "PostgreSQL"],
  },
  {
    slug: "give",
    ticker: "$GIVE",
    wordmark: "give",
    name: "Give",
    tier: "A",
    score: 3.35,
    status: "Concept · research",
    tagline: "Every trade donates. Every donation has a link.",
    pitch:
      "A fixed slice of every fee goes to vetted charities that accept crypto, with a public donation feed and receipts.",
    palette: { background: "#0f1f17", ink: "#e6f4ea", warm: "#4ade80" },
    accent: "#4ade80",
    how: [
      { title: "Trade", text: "0.30% creator fee." },
      { title: "Donate", text: "A fixed share goes straight to charity wallets." },
      { title: "Prove", text: "Every donation shows its transaction." },
      { title: "Vote", text: "Holders vote on next quarter's causes." },
    ],
    split: [
      { label: "Charity", pct: 60 },
      { label: "Buyback & burn", pct: 20 },
      { label: "Ops", pct: 20 },
    ],
    whyNow: "Charity-tax tokens are getting traction on other chains; the transparent version is rare.",
    risks: ["Less speculative energy than pure memes.", "Charities must be verified and consenting."],
    stack: ["TypeScript bot", "Next.js", "PostgreSQL"],
  },
  {
    slug: "bounty",
    ticker: "$BOUNTY",
    wordmark: "bounty",
    name: "Bounty",
    tier: "A",
    score: 3.3,
    status: "Concept · module",
    tagline: "The community gets paid to build the meme.",
    pitch:
      "Fees fund weekly bounties for memes, videos, tools and translations. Holders vote on the best work; the treasury pays in SOL.",
    palette: { background: "#1a1206", ink: "#f8ecd4", warm: "#ffb020" },
    accent: "#ffb020",
    how: [
      { title: "Post a bounty", text: "The team or the community posts a task." },
      { title: "Ship the work", text: "Anyone submits." },
      { title: "Vote", text: "Holders vote on the winners." },
      { title: "Get paid", text: "The treasury pays in SOL, on chain." },
    ],
    split: [
      { label: "Bounties", pct: 60 },
      { label: "Buyback & burn", pct: 15 },
      { label: "Ops", pct: 25 },
    ],
    whyNow: "Marketing that pays for itself; works best as a module inside a bigger coin.",
    risks: ["Needs moderation and anti-sybil voting.", "Quality can drop without curation."],
    stack: ["TypeScript (Discord / Telegram bot)", "Next.js", "PostgreSQL"],
  },
  {
    slug: "necro",
    ticker: "$NECRO",
    wordmark: "necro",
    name: "Necro",
    tier: "A",
    score: 3.3,
    status: "Concept · research",
    tagline: "Every week, one dead coin comes back.",
    pitch:
      "The community picks a memecoin that's down 95%+ and still has holders. The treasury buys a small, public position and tells the story.",
    palette: { background: "#120b16", ink: "#efe2f7", warm: "#b26bff" },
    accent: "#b26bff",
    how: [
      { title: "Graveyard", text: "A public filter lists dead coins with holders and some liquidity." },
      { title: "Séance", text: "Holders vote on one." },
      { title: "Revive", text: "The treasury buys a small position in public." },
      { title: "Tell it", text: "A thread for each revival." },
    ],
    split: [
      { label: "Revivals", pct: 60 },
      { label: "Buyback & burn", pct: 20 },
      { label: "Ops", pct: 20 },
    ],
    whyNow: "Every revival pulls in the revived coin's community. Built-in content engine.",
    risks: ["Can look like a coordinated pump: keep sizes small and rules public.", "Most dead coins stay dead."],
    stack: ["TypeScript", "Python (DexScreener filter)", "Jupiter Swap API v2"],
  },
]

/** Official community channels. `url` stays null until the account exists: never link a guess. */
export const SOCIALS: { name: string; handle: string; url: string | null }[] = [
  { name: "X", handle: "Announced at launch", url: null },
  { name: "Telegram", handle: "Announced at launch", url: null },
]

/** Share-ready memes. Text only, so anyone can repost them. */
export const MEMES: { top: string; bottom: string; mood: "deny" | "stack" | "burn" }[] = [
  { top: "Holder: can I have some of the BTC?", bottom: "Guardian: R2. No.", mood: "deny" },
  { top: "Me checking the vault every 4 minutes", bottom: "+0.0004 BTC. We're so back.", mood: "stack" },
  { top: "The AI: what if we bought the dip with the vault?", bottom: "The Guardian: what if you didn't.", mood: "deny" },
  { top: "Other AIs: hold your keys", bottom: "The Treasurer: I don't even have pockets.", mood: "stack" },
  { top: "Milestone hit", bottom: "Tokens go to the burn wallet. Announced 24h ahead, like adults.", mood: "burn" },
  { top: "Copycat token launches", bottom: "Not on the site? Not the contract.", mood: "deny" },
]
