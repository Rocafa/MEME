import { ogCard, OG_SIZE } from "@/lib/og"

export const alt = "$TESOUREIRO buyer dashboard: vault, milestones, safe buying guide"
export const size = OG_SIZE
export const contentType = "image/png"

export default async function Image() {
  return ogCard({
    wordmark: "vault",
    title: "$TESOUREIRO dashboard",
    sub: "The Bitcoin vault, milestones, vault activity and a safe step-by-step buying guide.",
    tag: "Simulated until launch",
    palette: { background: "#0b0b0c", ink: "#f5f2ea", warm: "#f7931a" },
  })
}
