import { test } from "node:test"
import assert from "node:assert/strict"
import { check, PRESETS } from "../lib/guardian.ts"

const base = { slippage: 0.5, announced: false }

test("spending from the vault is always refused (R1)", () => {
  const v = check({ ...base, action: "spend", amount: 1 })
  assert.equal(v.ok, false)
  assert.equal(v.rule, "R1")
})

test("payouts to holders are always refused (R2)", () => {
  const v = check({ ...base, action: "payout", amount: 0.0001 })
  assert.equal(v.ok, false)
  assert.equal(v.rule, "R2")
})

test("swaps need at least 0.5 SOL and at most 1% slippage (R3)", () => {
  assert.equal(check({ ...base, action: "swap", amount: 0.49 }).ok, false)
  assert.equal(check({ ...base, action: "swap", amount: 0.5 }).ok, true)
  assert.equal(check({ ...base, action: "swap", amount: 2, slippage: 1.01 }).ok, false)
  assert.equal(check({ ...base, action: "swap", amount: 2, slippage: 1 }).ok, true)
})

test("burns are capped at 2% and need notice from 1% (R4, R5)", () => {
  assert.equal(check({ ...base, action: "burn", amount: 0.5 }).ok, true)
  const unannounced = check({ ...base, action: "burn", amount: 1 })
  assert.equal(unannounced.ok, false)
  assert.equal(unannounced.rule, "R5")
  assert.equal(check({ ...base, action: "burn", amount: 1, announced: true }).ok, true)
  assert.equal(check({ ...base, action: "burn", amount: 2.5, announced: true }).rule, "R4")
})

test("presets give the verdicts the copy promises", () => {
  const verdicts = PRESETS.map((x) => check(x.p).ok)
  assert.deepEqual(verdicts, [true, false, false, false, false, true])
})
