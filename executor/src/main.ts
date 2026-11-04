// Executor entry point. Dry run only: reads the chain, logs decisions, signs nothing.
//
//   node src/main.ts            one tick
//   node src/main.ts --watch    one tick every TICK_SECONDS (default 60)
//
// Env: RPC_URL (default devnet), FEE_WALLET, VAULT_WALLET, BTC_MINT (default cbBTC), LEDGER (default ledger.jsonl)

import { DryRunSubmitter, FileLedger, RpcReader, summarize } from "./adapters.ts"
import { tick } from "./loop.ts"

const env = process.env
const RPC_URL = env.RPC_URL ?? "https://api.devnet.solana.com"
const FEE_WALLET = env.FEE_WALLET
const VAULT_WALLET = env.VAULT_WALLET

if (!FEE_WALLET || !VAULT_WALLET) {
  console.error("Set FEE_WALLET and VAULT_WALLET (public addresses). See executor/README.md.")
  process.exit(1)
}

const chain = new RpcReader(RPC_URL, FEE_WALLET, VAULT_WALLET, env.BTC_MINT || undefined)
const submitter = new DryRunSubmitter()
const ledger = new FileLedger(env.LEDGER ?? "ledger.jsonl")

async function once() {
  try {
    const rows = await tick({ chain, submitter, ledger })
    const at = new Date().toISOString()
    if (!rows.length) console.log(`${at}  nothing to propose`)
    for (const r of rows) {
      const tag = r.verdict.ok ? `APPROVED → ${r.submitted?.mode} ${r.submitted?.id}` : `REFUSED (${r.verdict.rule})`
      console.log(`${r.at}  ${tag}\n  why: ${r.why}\n  guardian: ${r.verdict.reason}`)
    }
    const s = summarize(await ledger.entries())
    console.log(`  ledger: ${s.proposals} proposals, ${s.refused} refused`)
  } catch (e) {
    console.error(`${new Date().toISOString()}  tick failed: ${(e as Error).message}`)
  }
}

await once()
if (process.argv.includes("--watch")) {
  const every = Number(env.TICK_SECONDS ?? 60) * 1000
  setInterval(once, every)
}
