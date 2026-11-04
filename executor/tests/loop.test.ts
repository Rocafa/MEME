import { test } from "node:test"
import assert from "node:assert/strict"
import { mkdtemp, rm } from "node:fs/promises"
import { tmpdir } from "node:os"
import { join } from "node:path"
import { tick } from "../src/loop.ts"
import { propose } from "../src/treasurer.ts"
import { DryRunSubmitter, FileLedger, MemoryLedger, summarize } from "../src/adapters.ts"
import type { ChainReader, Proposal, State, Submitter } from "../src/types.ts"

const reader = (s: State): ChainReader => ({ read: async () => s })
const fixed = () => new Date("2026-11-04T12:00:00Z")

class SpySubmitter implements Submitter {
  readonly mode = "dry-run" as const
  sent: Proposal[] = []
  async submit(p: Proposal) {
    this.sent.push(p)
    return { id: `spy-${this.sent.length}` }
  }
}

test("treasurer: below the minimum it proposes nothing", () => {
  assert.deepEqual(propose({ feeSol: 0.4, vaultBtc: 0 }, 0), [])
})

test("treasurer: swaps everything above the reserve", () => {
  const [p] = propose({ feeSol: 0.72, vaultBtc: 0 }, 0)
  assert.equal(p.proposal.action, "swap")
  assert.equal(p.proposal.amount, 0.7)
  assert.equal(p.proposal.slippage, 0.5)
})

test("treasurer: proposes one burn per new milestone, not again for the same one", () => {
  assert.equal(propose({ feeSol: 0, vaultBtc: 0.06 }, 0).length, 1)
  assert.equal(propose({ feeSol: 0, vaultBtc: 0.06 }, 0.05).length, 0)
  assert.equal(propose({ feeSol: 0, vaultBtc: 0.11 }, 0.05)[0].proposal.action, "burn")
})

test("tick: approved proposals go to the submitter and are logged", async () => {
  const ledger = new MemoryLedger()
  const spy = new SpySubmitter()
  const rows = await tick({ chain: reader({ feeSol: 0.62, vaultBtc: 0.012 }), submitter: spy, ledger, now: fixed })
  assert.equal(rows.length, 2)
  assert.ok(rows.every((r) => r.verdict.ok))
  assert.deepEqual(spy.sent.map((p) => p.action), ["swap", "burn"])
  assert.equal(ledger.rows.length, 2)
  assert.equal(rows[0].submitted?.id, "spy-1")
  assert.equal(rows[0].at, "2026-11-04T12:00:00.000Z")
})

test("tick: a milestone burn is not proposed twice", async () => {
  const ledger = new MemoryLedger()
  const deps = { chain: reader({ feeSol: 0, vaultBtc: 0.012 }), submitter: new SpySubmitter(), ledger, now: fixed }
  assert.equal((await tick(deps)).length, 1)
  assert.equal((await tick(deps)).length, 0)
})

test("tick: refused proposals are logged and never submitted", async () => {
  const ledger = new MemoryLedger()
  const spy = new SpySubmitter()
  // Slippage above the Guardian's 1% cap.
  const rows = await tick({
    chain: reader({ feeSol: 2, vaultBtc: 0 }),
    submitter: spy,
    ledger,
    treasurer: { minSwapSol: 0.5, slippagePct: 3, reserveSol: 0.02, milestoneBurnPct: 0.5 },
  })
  assert.equal(rows.length, 1)
  assert.equal(rows[0].verdict.ok, false)
  assert.equal(rows[0].verdict.rule, "R3")
  assert.equal(rows[0].submitted, null)
  assert.equal(spy.sent.length, 0)
  assert.deepEqual(summarize(ledger.rows), { proposals: 1, refused: 1 })
})

test("file ledger: survives restarts and remembers milestones", async () => {
  const dir = await mkdtemp(join(tmpdir(), "ledger-"))
  try {
    const path = join(dir, "ledger.jsonl")
    const deps = { chain: reader({ feeSol: 0.9, vaultBtc: 0.051 }), submitter: new DryRunSubmitter(), now: fixed }
    await tick({ ...deps, ledger: new FileLedger(path) })
    const again = new FileLedger(path)
    assert.equal(await again.lastMilestone(), 0.05)
    const rows = await tick({ ...deps, ledger: again })
    assert.deepEqual(rows.map((r) => r.proposal.action), ["swap"])
    assert.equal((await again.entries()).length, 3)
    assert.match(rows[0].submitted!.id, /^dry-/)
  } finally {
    await rm(dir, { recursive: true, force: true })
  }
})
