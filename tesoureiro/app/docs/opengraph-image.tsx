import { ogCard, OG_SIZE } from "@/lib/og"

export const alt = "Tesoureiro docs: fee flow, rules, wallets and how this loses"
export const size = OG_SIZE
export const contentType = "image/png"

export default async function Image() {
  return ogCard({
    wordmark: "docs",
    title: "Everything, in plain words.",
    sub: "The fee flow, the Guardian's rules, the wallets, how to verify it all and how you can lose.",
    tag: "Docs",
    palette: { background: "#0b0b0c", ink: "#f5f2ea", warm: "#f7931a" },
  })
}
