import type { MetadataRoute } from "next"
import { DROPS } from "@/lib/data"
import { SITE_URL } from "@/lib/site"

export default function sitemap(): MetadataRoute.Sitemap {
  const pages = ["", "/dashboard", "/docs", "/drops", "/heist", "/launchpad", "/terms", "/privacy"]
  return [
    ...pages.map((p) => ({ url: `${SITE_URL}${p}`, changeFrequency: "weekly" as const, priority: p === "" ? 1 : 0.7 })),
    ...DROPS.map((d) => ({ url: `${SITE_URL}/drops/${d.slug}`, changeFrequency: "monthly" as const, priority: 0.5 })),
  ]
}
