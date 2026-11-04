import { TOKEN } from "@/lib/data"

/**
 * One place that decides where every "Buy" control on the site points.
 *
 * Nothing is bought on this site: every route here hands the visitor to a
 * venue that holds the liquidity. Before launch there is no contract, so the
 * buttons go to the buy guide instead of to a venue that has nothing to sell.
 */

export const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://nokeys.fun"

/** The buy guide. The fallback destination until the contract exists. */
export const GUIDE_HREF = "/dashboard#buy"

/** pump.fun coin page — the venue while the coin is on the bonding curve. */
export function pumpHref(mint = TOKEN.contract): string | null {
  return mint ? `https://pump.fun/coin/${mint}` : null
}

/** Jupiter — routes once the coin has graduated to a pool. */
export function jupiterHref(mint = TOKEN.contract): string | null {
  return mint ? `https://jup.ag/swap/SOL-${mint}` : null
}

/** Solscan, for checking a transaction or the mint itself. */
export function solscanHref(address: string): string {
  return `https://solscan.io/token/${address}`
}

/**
 * Where the main Buy button goes.
 * After launch: straight to the venue. Before: the guide, which explains why
 * there is no address yet.
 */
export function buyHref(mint = TOKEN.contract): string {
  return pumpHref(mint) ?? GUIDE_HREF
}

/** True once there is a real venue to send people to. */
export function isLive(mint = TOKEN.contract): boolean {
  return Boolean(mint)
}

/**
 * Wallet deep links.
 *
 * Most visitors arrive from a phone, inside the in-app browser of X or
 * Telegram, where no wallet is connected. These links reopen the destination
 * inside the wallet's own browser, where the wallet is already unlocked —
 * which removes the install-and-transfer detour from the middle of the flow.
 */
export type WalletId = "phantom" | "solflare"

export const WALLETS: { id: WalletId; label: string }[] = [
  { id: "phantom", label: "Open in Phantom" },
  { id: "solflare", label: "Open in Solflare" },
]

export function walletBrowseHref(wallet: WalletId, target: string, ref = SITE_URL): string | null {
  // Only absolute http(s) targets can be handed to a wallet browser.
  if (!/^https?:\/\//.test(target)) return null

  if (wallet === "phantom") {
    return `https://phantom.app/ul/browse/${encodeURIComponent(target)}?ref=${encodeURIComponent(ref)}`
  }
  return `https://solflare.com/ul/v1/browse/${encodeURIComponent(target)}?ref=${encodeURIComponent(ref)}`
}
