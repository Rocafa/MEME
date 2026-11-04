# Tesoureiro — site, dashboard and next drops

Site for **$TESOUREIRO**: an AI ("the Treasurer") keeps a public Bitcoin vault on Solana. It proposes, a rule engine with no AI ("the Guardian") checks fixed rules, and a 2-of-3 multisig signs. The AI holds no keys.

**Every number is simulated** until launch (`lib/data.ts`, `SIMULATED = true`).

## Pages

- `/` — full-screen interactive halftone hero, activity ticker, vault stats (count-up), how it works, **Guardian game** (write a proposal, watch it get approved or refused with the rule), **vault simulator** (volume, days, BTC price, volume-decay scenarios, milestone ETAs), fee split, Treasurer's diary with filters, next drops, risks, FAQ.
- `/dashboard` — buyer dashboard: market tiles, interactive vault chart (7D/30D/90D, pointer and arrow keys), milestones, safe buying guide (pump.fun / Jupiter), contract card, buy calculator, filterable vault activity, verify-it-yourself wallets.
- `/drops` and `/drops/[slug]` — concept pages for the next coins ($HEIST, Heist Launchpad, $INDEX, $GIVE, $BOUNTY, $NECRO), each with its own halftone hero and palette. Concepts only: nothing to buy.

## Stack

Next.js 16 (App Router, Cache Components) · React 19 · TypeScript · Tailwind CSS 4 · shadcn/ui (Base UI) · lucide-react. No animation libraries: canvas, CSS and small React components. The hero and footer use `components/ui/halftone-wordmark-footer.tsx` (extended with `as`, `ariaLabel` and `children` so it can run as a hero).

## Run

```bash
npm install
npm run dev
npm test        # Guardian rules + on-chain parsers (node:test)
npm run build
```

## Before launch

1. Put the contract in `TOKEN.contract` (`lib/data.ts`).
2. Copy `.env.example` to `.env.local`, fill in the Helius key, mint and wallets, and set `SIMULATED` to `false`. `lib/source.ts` then reads the vault balance, supply, holders and activity from Helius, price from Jupiter and volume from DexScreener, cached for a minute. Any field it cannot read shows "—" instead of a made-up number.
3. Publish the vault, fee and burn wallets in the dashboard's Verify section and link every activity row to Solscan.
4. Keep `lib/guardian.ts` identical to the rules the real executor enforces.
