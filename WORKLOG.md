# WORKLOG

Running log of the project. Each task ends with a commit + push, gets logged here with its commit, and the next task in the queue starts. Any session can resume by reading this file and `git log`.

**How to resume:** open the first unchecked task in the queue, do it, check it, commit and push. Each task commit also logs the previous task's commit hash in the Done log.

## Rules that never change

- Everything user-facing in English.
- All market and vault numbers are simulated until launch and labelled as such. Never show inflated or fake numbers as real.
- No GTA / Rockstar names, logos or art. No promise of profit. No distribution to holders and no paid raffles without legal review.
- Commits authored by Matheus Roçafa, no co-author lines.

## Queue — round 2 (site v2)

- [x] **T1 — Layout v2 in English.** POP-style floating pill nav, halftone wordmark as the full-screen hero (first thing a visitor sees), floating stat pills, contract line, bottom ticker. Translate data and copy to English.
- [x] **T2 — Interactions.** Guardian game (propose an action, see it approved or refused with the rule), vault growth simulator (volume slider → BTC and milestone ETA), "run a trade" pipeline animation, count-up stats, live-style event ticker, copy-with-toast.
- [x] **T3 — Next drops.** `/drops` index and `/drops/[slug]` concept pages for the next coins ($HEIST, Heist Launchpad, $INDEX, $GIVE, $BOUNTY, $NECRO), each with its own halftone wordmark and palette.
- [x] **T4 — Dashboard v2.** English, interactive chart (hover values, range tabs), milestone tracker, buy guide, calculator, filterable vault activity.
- [x] **T5 — Apply UI research.** Use the subagent research on crypto landing patterns to polish typography, motion, trust UI and accessibility.
- [x] **T6 — QA.** Lint, typecheck, production build, desktop + mobile check in the browser, no horizontal scroll, reduced-motion respected.

## Done log

| Date | Task | Commit |
|---|---|---|
| 2026-11-04 | Strategy pack (ideas ranking, stack, references, roadmap) | `c17c794` |
| 2026-11-04 | Site v1 (PT-BR): landing, buyer dashboard, halftone footer | `a2f6817` |
| 2026-11-04 | T1 — Layout v2 in English, halftone hero | `d3f673a` |
| 2026-11-04 | T2 — Guardian game, vault simulator, count-ups, diary filter, mobile buy bar | `a9be0f6` |
| 2026-11-04 | T3 — /drops index and six concept pages | `03572f9` |
| 2026-11-04 | T4 — Buyer dashboard v2 in English | `fdda5f8` |
| 2026-11-04 | T5 — Polish from UI research | `545f276` |
| 2026-11-04 | T6 — QA, build, tests, mobile, Next 16 params fix | `9a742e7` |
| 2026-11-04 | T7 — Live data adapter (Helius, Jupiter, DexScreener) | `2eecff2` |
| 2026-11-04 | T8 — $HEIST full concept site with loot planner | `015aa62` |
| 2026-11-04 | T9 — Open Graph images per page | `6301841` |
| 2026-11-04 | T10 — /docs page with scroll-spy table of contents | `144a9fd` |
| 2026-11-04 | T13 — Heist Launchpad concept site | `944ed9c` |

## Queue — round 3 (proposed next)

- [x] **T7 — Real data adapter.** `lib/source.ts` that reads Helius/Jupiter when `SIMULATED = false`, with the same shapes as `lib/data.ts`.
- [x] **T8 — $HEIST site.** Promote the $HEIST concept to its own full site using the same components.
- [x] **T9 — Social images.** Open Graph images per page (`opengraph-image.tsx`).
- [x] **T10 — Docs page.** `/docs` with table of contents, rules, wallets table and "how this loses", POP/OTC style.

## Queue — round 4 (proposed, not started)

- [ ] **T11 — Deploy.** Vercel project, `NEXT_PUBLIC_SITE_URL`, check the social cards with a link preview. Needs the owner's Vercel account.
- [x] **T12 — Guardian executor (dry run).** `executor/`: read chain → Treasurer proposes → Guardian checks → dry-run submit → JSONL ledger. Signs nothing. Tested, and run once against devnet.
- [ ] **T12b — Squads submitter on devnet.** Create a Squads v4 proposal per approved action; the bot key can only propose. Needs a devnet multisig and test keys.
- [x] **T13 — Heist Launchpad site.** Full concept site for the launchpad, same pattern as `/heist`.
- [ ] **T14 — Legal review pack.** One-page summary of the split, rules and "no payouts" for a lawyer before any launch.
