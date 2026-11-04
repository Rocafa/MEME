import type { Metadata } from "next"
import "./globals.css"
import { sans, mono } from "@/lib/fonts"
import { Nav } from "@/components/site/nav"
import { SiteFooter } from "@/components/site/footer"

export const metadata: Metadata = {
  title: "Tesoureiro — the AI that keeps a Bitcoin vault",
  description:
    "Every trade of $TESOUREIRO fills a public Bitcoin vault on Solana. An AI proposes, a Guardian checks fixed rules, a 2-of-3 multisig signs. The AI holds no keys.",
  openGraph: {
    title: "Tesoureiro — the AI that keeps a Bitcoin vault",
    description: "Every trade fills a public Bitcoin vault. The AI proposes, the Guardian checks, a multisig signs. Pre-launch.",
    type: "website",
  },
  twitter: { card: "summary_large_image", title: "Tesoureiro — the AI that keeps a Bitcoin vault" },
}

export const viewport = { themeColor: "#0b0b0c" }

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${sans.variable} ${mono.variable} h-full antialiased`}>
      <body className="min-h-full flex flex-col bg-background">
        <a href="#main" className="skip-link">
          Skip to content
        </a>
        <Nav />
        <main id="main" className="flex-1">
          {children}
        </main>
        <SiteFooter fontFamily={sans.style.fontFamily} monoFamily={mono.style.fontFamily} />
      </body>
    </html>
  )
}
