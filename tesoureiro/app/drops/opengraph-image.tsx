import { ogCard, OG_SIZE } from "@/lib/og"

export const alt = "Next drops: concept coins in the pipeline"
export const size = OG_SIZE
export const contentType = "image/png"

export default async function Image() {
  return ogCard({
    wordmark: "drops",
    title: "One vault is the start.",
    sub: "Concept coins in the pipeline. None of them is live, and none of them is for sale.",
    tag: "Concepts",
    palette: { background: "#101010", ink: "#f1ede4", warm: "#f7931a" },
  })
}
