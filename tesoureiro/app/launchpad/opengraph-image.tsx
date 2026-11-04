import { ogCard, OG_SIZE } from "@/lib/og"
import { PAD } from "@/lib/launchpad"

export const alt = "Heist Launchpad: launch a coin, its fees fill its own Bitcoin vault. Concept, not live."
export const size = OG_SIZE
export const contentType = "image/png"

export default async function Image() {
  return ogCard({
    wordmark: "launchpad",
    title: "Launch a coin. It gets its own Bitcoin vault.",
    sub: "Every coin's fees fill a cbBTC vault that only accumulates, and burn the pad's parent token.",
    tag: "Concept · phase 3",
    palette: PAD.palette,
  })
}
