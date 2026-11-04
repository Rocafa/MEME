import { ogCard, OG_SIZE } from "@/lib/og"
import { DROPS } from "@/lib/data"

export const alt = "Concept coin from NoKeys pipeline"
export const size = OG_SIZE
export const contentType = "image/png"

export function generateStaticParams() {
  return DROPS.map((d) => ({ slug: d.slug }))
}

export default async function Image({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const d = DROPS.find((x) => x.slug === slug) ?? DROPS[0]
  return ogCard({
    wordmark: d.wordmark,
    title: d.ticker,
    sub: d.tagline,
    tag: "Concept · not for sale",
    palette: d.palette,
  })
}
