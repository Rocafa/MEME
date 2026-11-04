import { readFile } from "node:fs/promises"
import { join } from "node:path"
import { ImageResponse } from "next/og"

export const OG_SIZE = { width: 1200, height: 630 }

type Card = {
  wordmark: string
  title: string
  sub: string
  tag: string
  palette: { background: string; ink: string; warm: string }
}

/** Inter Tight (SIL OFL) shipped in assets/fonts. Satori needs TTF/OTF, not woff2. */
async function font(weight: 500 | 800): Promise<ArrayBuffer | null> {
  "use cache"
  try {
    const buf = await readFile(join(process.cwd(), "assets/fonts", `InterTight-${weight}.ttf`))
    return buf.buffer.slice(buf.byteOffset, buf.byteOffset + buf.byteLength) as ArrayBuffer
  } catch {
    return null
  }
}

/** Shared social card: halftone dot field, giant wordmark, title and a status tag. */
export async function ogCard({ wordmark, title, sub, tag, palette }: Card) {
  const [bold, regular] = await Promise.all([font(800), font(500)])
  const fonts = [
    ...(bold ? [{ name: "Inter Tight", data: bold, weight: 800 as const }] : []),
    ...(regular ? [{ name: "Inter Tight", data: regular, weight: 500 as const }] : []),
  ]
  const { background, ink, warm } = palette
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          position: "relative",
          background,
          color: ink,
          padding: "56px 64px",
          fontFamily: fonts.length ? "Inter Tight" : "sans-serif",
        }}
      >
        <div
          style={{
            position: "absolute",
            inset: 0,
            display: "flex",
            backgroundImage: `radial-gradient(circle, ${ink}22 1.6px, transparent 2.2px)`,
            backgroundSize: "14px 14px",
          }}
        />
        <div
          style={{
            position: "absolute",
            left: 40,
            right: 40,
            bottom: -70,
            display: "flex",
            fontSize: wordmark.length > 8 ? 230 : 300,
            fontWeight: 800,
            letterSpacing: -14,
            lineHeight: 1,
            color: `${ink}14`,
          }}
        >
          {wordmark}
        </div>

        <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
          <div style={{ width: 44, height: 44, borderRadius: 44, background: warm, display: "flex" }} />
          <div style={{ fontSize: 28, fontWeight: 800 }}>Tesoureiro</div>
          <div
            style={{
              marginLeft: "auto",
              display: "flex",
              border: `2px solid ${warm}`,
              color: warm,
              borderRadius: 999,
              padding: "8px 18px",
              fontSize: 20,
              letterSpacing: 3,
              textTransform: "uppercase",
            }}
          >
            {tag}
          </div>
        </div>

        <div style={{ display: "flex", flexDirection: "column", marginTop: 70, maxWidth: 980 }}>
          <div style={{ display: "flex", fontSize: 76, fontWeight: 800, lineHeight: 1.02, letterSpacing: -2 }}>{title}</div>
          <div style={{ display: "flex", marginTop: 24, fontSize: 30, lineHeight: 1.35, color: `${ink}b3` }}>{sub}</div>
        </div>
        <div style={{ position: "absolute", left: 64, bottom: 0, width: 160, height: 8, background: warm, display: "flex" }} />
      </div>
    ),
    { ...OG_SIZE, ...(fonts.length ? { fonts } : {}) },
  )
}
