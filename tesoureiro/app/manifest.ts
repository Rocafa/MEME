import type { MetadataRoute } from "next"

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "NoKeys — the AI that keeps a Bitcoin vault",
    short_name: "NoKeys",
    description: "Every trade of $NOKEYS fills a public Bitcoin vault. The AI proposes, a Guardian checks, a multisig signs.",
    start_url: "/",
    display: "standalone",
    background_color: "#0b0b0c",
    theme_color: "#0b0b0c",
    icons: [
      { src: "/icon.svg", sizes: "any", type: "image/svg+xml" },
      { src: "/apple-icon", sizes: "180x180", type: "image/png" },
    ],
  }
}
