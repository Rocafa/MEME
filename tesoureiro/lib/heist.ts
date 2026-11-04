// $HEIST: concept site content. Not launched, no contract, nothing to buy.
// Original world only: no third-party game names, logos or art.

export const HEIST = {
  ticker: "$HEIST",
  palette: { background: "#0b0d1a", ink: "#e8ecff", warm: "#ff3b3b" },
  vaultShare: 0.8,
  heistDayShare: 1,
}

export const HEIST_SPLIT = [
  { label: "The vault", pct: 80, note: "Swapped to cbBTC, locked in a 2-of-3 multisig. Nothing leaves." },
  { label: "The crew (ops)", pct: 20, note: "Servers, RPC, art, audits. On Heist Day this share goes to the vault too." },
]

export const STARS = [
  { btc: 0.01, title: "The cops noticed", beat: "First siren. A small burn and the crew's first case file goes public." },
  { btc: 0.05, title: "Roadblocks", beat: "A bigger burn. The city map opens a new district." },
  { btc: 0.1, title: "Helicopters", beat: "Burn plus a story drop: who is the inside man?" },
  { btc: 0.5, title: "Task force", beat: "Holders vote on the crew's next move in the story." },
  { btc: 1, title: "Most wanted", beat: "One whole Bitcoin in the vault. Full report, final chapter of season one." },
]

export const CREW = [
  { role: "The Planner", who: "An AI", job: "Reads the vault, writes the plan: swap, burn, announce. Never touches the money." },
  { role: "The Inspector", who: "Rule engine, no AI", job: "Checks every plan against fixed public rules. Off-rule means refused." },
  { role: "The Safe", who: "Squads 2-of-3 multisig", job: "Holds the cbBTC. Two humans sign, the AI holds no key." },
  { role: "The Driver", who: "Swap bot", job: "Claims fees and swaps SOL to cbBTC through Jupiter above a minimum size." },
]

export const HEIST_TICKER = [
  "Concept · not live",
  "80% of every fee to the vault",
  "Heist Day: 100% to the vault",
  "Five stars, five burns",
  "The AI holds no keys",
  "Nothing leaves the vault",
  "No payouts to holders",
]

export const HEIST_FAQ = [
  {
    q: "Is $HEIST live?",
    a: "No. This is a concept page. There is no token and no contract. Any $HEIST you see trading right now is not ours.",
  },
  {
    q: "What is Heist Day?",
    a: "A day announced 72 hours ahead where 100% of the creator fee goes to the vault instead of 80%. The crew works for free that day.",
  },
  {
    q: "Is this based on a video game?",
    a: "No. It's an original world with its own city, crew and art. We don't use any game's name, logo or characters.",
  },
  {
    q: "Do holders get the loot?",
    a: "No. The vault only accumulates and stars trigger burns. No payouts, no raffles, no yield.",
  },
]

export const HEIST_RISKS = [
  { title: "The vault doesn't back the price", text: "Holders have no claim on the BTC. Price is set by buyers and sellers." },
  { title: "Hype fades", text: "Theme coins spike on launch week and lose most volume after. No volume, no fees, no stars." },
  { title: "Copycats", text: "Late copies of themed coins usually drop 90%+. Only the contract published here at launch is real." },
  { title: "You can lose everything", text: "It's a memecoin. Don't put in money you can't afford to lose." },
]
