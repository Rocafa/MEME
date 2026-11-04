import { ImageResponse } from "next/og"
import { ICON_SVG } from "@/lib/icon-svg"

export const size = { width: 180, height: 180 }
export const contentType = "image/png"

export default function AppleIcon() {
  const src = `data:image/svg+xml;base64,${Buffer.from(ICON_SVG).toString("base64")}`
  return new ImageResponse(
    (
      <div style={{ width: "100%", height: "100%", display: "flex", background: "#0b0b0c" }}>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={src} width={180} height={180} alt="" />
      </div>
    ),
    size,
  )
}
