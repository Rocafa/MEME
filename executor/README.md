# Executor — the Guardian bot (dry run)

The process that runs the Tesoureiro vault. Every tick it:

1. **Reads** the fee wallet's SOL and the vault's cbBTC over Solana RPC (read-only).
2. **Treasurer** turns that into proposals: swap fees to cbBTC above 0.5 SOL, and one burn per new milestone.
3. **Guardian** checks each proposal with `tesoureiro/lib/guardian.ts`, the same rules as the site's Guardian game and its tests.
4. **Approved** proposals go to the submitter. **Refused** ones are only logged.
5. Every decision is appended to `ledger.jsonl`, the Guardian's public log (proposals and refusals).

**This version signs nothing.** The only submitter is `DryRunSubmitter`, which logs what it would send. It holds no keys and there is no code path that creates a transaction.

## Run

Node 23.6+ (runs TypeScript directly, no build, no dependencies).

```bash
cp .env.example .env
npm test
FEE_WALLET=... VAULT_WALLET=... npm start      # one tick
FEE_WALLET=... VAULT_WALLET=... npm run watch  # every TICK_SECONDS
```

On devnet the mainnet cbBTC mint doesn't exist: set `BTC_MINT` to a devnet test token.

## Layout

- `src/treasurer.ts` — proposals from state. Deterministic. An LLM can later write the diary text around the same proposals; it never decides what is sent.
- `src/loop.ts` — one tick: read, propose, check, submit, log.
- `src/adapters.ts` — `RpcReader`, `DryRunSubmitter`, `FileLedger`, `MemoryLedger`, `summarize()`.
- `tests/loop.test.ts` — Treasurer, tick, refusals never submitted, ledger survives restarts.

## Next (T12b)

A `SquadsSubmitter` that creates a Squads v4 proposal for each approved action on devnet: Jupiter swap instructions wrapped in a vault transaction, burns via the token program. Humans still approve 2 of 3. The bot's key may only *propose*, never vote or execute.
