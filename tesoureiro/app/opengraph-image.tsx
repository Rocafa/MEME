import { ogCard, OG_SIZE } from "@/lib/og"

export const alt = "Tesoureiro: the AI that keeps a Bitcoin vault. It holds no keys."
export const size = OG_SIZE
export const contentType = "image/png"

export default async function Image() {
  return ogCard({
    wordmark: "tesoureiro",
    title: "The AI that keeps a Bitcoin vault.",
    sub: "Every trade fills a public cbBTC vault. It proposes, a rule engine checks, a 2-of-3 multisig signs.",
    tag: "Pre-launch",
    palette: { background: "#0b0b0c", ink: "#f5f2ea", warm: "#f7931a" },
  })
}
