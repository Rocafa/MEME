import { test } from "node:test"
import assert from "node:assert/strict"
import {
  CBBTC_MINT,
  classifyTxs,
  countHolderPage,
  historyFromSwaps,
  parseDexVolume,
  parseJupiterPrice,
  parseSupply,
  parseTokenBalance,
  shortSig,
  timeAgo,
} from "../lib/parse.ts"

const MINT = "Tes0ureiroMint1111111111111111111111111111"
const W = { vault: "VauLt111", fee: "Fee111", mint: MINT }
const NOW = 1_800_000_000_000

test("Jupiter price: reads usdPrice and change, nulls when missing", () => {
  assert.deepEqual(parseJupiterPrice({ [MINT]: { usdPrice: 0.00004, priceChange24h: -3.2 } }, MINT), {
    priceUsd: 0.00004,
    change24h: -3.2,
  })
  assert.deepEqual(parseJupiterPrice({}, MINT), { priceUsd: null, change24h: null })
  assert.deepEqual(parseJupiterPrice(null, MINT), { priceUsd: null, change24h: null })
})

test("DexScreener volume sums pairs, null with no pairs", () => {
  assert.equal(parseDexVolume({ pairs: [{ volume: { h24: 100 } }, { volume: { h24: 50.5 } }, {}] }), 150.5)
  assert.equal(parseDexVolume({ pairs: null }), null)
})

test("token balance and supply", () => {
  const acc = (ui: number) => ({ account: { data: { parsed: { info: { tokenAmount: { uiAmount: ui } } } } } })
  assert.equal(parseTokenBalance({ result: { value: [acc(0.05), acc(0.0232)] } }), 0.0732)
  assert.equal(parseTokenBalance({ error: "x" }), 0)
  assert.equal(parseSupply({ result: { value: { uiAmount: 987_600_000 } } }), 987_600_000)
  assert.equal(parseSupply({}), null)
})

test("holder page counts only non-zero balances", () => {
  assert.deepEqual(countHolderPage({ result: { token_accounts: [{ amount: 5 }, { amount: 0 }, { amount: "12" }] } }), {
    count: 2,
    size: 3,
  })
})

test("short signature and time ago", () => {
  assert.equal(shortSig("5xA9abcdefghijk2Pq"), "5xA9…k2Pq")
  assert.equal(timeAgo(NOW / 1000 - 30, NOW), "just now")
  assert.equal(timeAgo(NOW / 1000 - 240, NOW), "4 min ago")
  assert.equal(timeAgo(NOW / 1000 - 7200, NOW), "2 h ago")
  assert.equal(timeAgo(NOW / 1000 - 86400 * 3, NOW), "3 d ago")
})

test("classify: swap into vault, burn, fee claim, squads, ignore the rest", () => {
  const ts = NOW / 1000 - 600
  const { rows, swaps } = classifyTxs(
    [
      { signature: "S1aaaaaaaaaaaaaaaa", timestamp: ts, type: "SWAP", tokenTransfers: [{ mint: CBBTC_MINT, tokenAmount: 0.0004, toUserAccount: "VauLt111" }] },
      { signature: "S2aaaaaaaaaaaaaaaa", timestamp: ts, type: "BURN", tokenTransfers: [{ mint: MINT, tokenAmount: 1_200_000 }] },
      { signature: "S3aaaaaaaaaaaaaaaa", timestamp: ts, type: "TRANSFER", nativeTransfers: [{ amount: 620_000_000, toUserAccount: "Fee111" }] },
      { signature: "S4aaaaaaaaaaaaaaaa", timestamp: ts, type: "UNKNOWN", source: "SQUADS" },
      { signature: "S5aaaaaaaaaaaaaaaa", timestamp: ts, type: "TRANSFER", nativeTransfers: [{ amount: 1, toUserAccount: "someone" }] },
      { nope: true },
    ],
    W,
    NOW,
  )
  assert.deepEqual(
    rows.map((r) => [r.kind, r.amount]),
    [
      ["Swap SOL → cbBTC", "+0.0004 BTC"],
      ["Burn", "−1.2M"],
      ["Fee claim", "+0.62 SOL"],
      ["Multisig signature", "2 of 3"],
    ],
  )
  assert.equal(rows[0].href, "https://solscan.io/tx/S1aaaaaaaaaaaaaaaa")
  assert.deepEqual(swaps, [{ ts, btc: 0.0004 }])
  assert.deepEqual(classifyTxs({ error: 1 }, W, NOW), { rows: [], swaps: [] })
})

test("history walks back from today's balance through inflows", () => {
  const day = 86400
  const h = historyFromSwaps(0.01, [{ ts: NOW / 1000 - 10, btc: 0.004 }, { ts: NOW / 1000 - 2 * day - 10, btc: 0.002 }], NOW, 5)
  assert.equal(h.length, 5)
  assert.equal(h[4], 0.01)
  assert.equal(h[3], 0.006)
  assert.equal(h[2], 0.006)
  assert.equal(h[1], 0.004)
  assert.equal(h[0], 0.004)
})
