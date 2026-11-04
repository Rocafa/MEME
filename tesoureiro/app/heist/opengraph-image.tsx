import { ogCard, OG_SIZE } from "@/lib/og"
import { HEIST } from "@/lib/heist"

export const alt = "$HEIST: the crew is stealing Bitcoin, one trade at a time. Concept, not live."
export const size = OG_SIZE
export const contentType = "image/png"

export default async function Image() {
  return ogCard({
    wordmark: "heist",
    title: "The crew is stealing Bitcoin.",
    sub: "Every trade fills a cbBTC vault and raises a five-star wanted level. Nobody walks out with the loot.",
    tag: "Concept · not live",
    palette: HEIST.palette,
  })
}
