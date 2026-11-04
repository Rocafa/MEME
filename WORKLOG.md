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
- [ ] **T3 — Next drops.** `/drops` index and `/drops/[slug]` concept pages for the next coins ($HEIST, Heist Launchpad, $INDEX, $GIVE, $BOUNTY, $NECRO), each with its own halftone wordmark and palette.
- [ ] **T4 — Dashboard v2.** English, interactive chart (hover values, range tabs), milestone tracker, buy guide, calculator, filterable vault activity.
- [ ] **T5 — Apply UI research.** Use the subagent research on crypto landing patterns to polish typography, motion, trust UI and accessibility.
- [ ] **T6 — QA.** Lint, typecheck, production build, desktop + mobile check in the browser, no horizontal scroll, reduced-motion respected.

## Done log

| Date | Task | Commit |
|---|---|---|
| 2026-11-04 | Strategy pack (ideas ranking, stack, references, roadmap) | `c17c794` |
| 2026-11-04 | Site v1 (PT-BR): landing, buyer dashboard, halftone footer | `a2f6817` |
| 2026-11-04 | T1 — Layout v2 in English, halftone hero | `d3f673a` |
