"use client"

import HalftoneWordmarkFooter from "@/components/ui/halftone-wordmark-footer"

export function SiteFooter({ fontFamily, monoFamily }: { fontFamily: string; monoFamily: string }) {
  return (
    <div className="w-full">
      <HalftoneWordmarkFooter
        wordmark="no keys."
        label="Tesoureiro · Bitcoin vault"
        meta="©2026 · Solana · pre-launch · not financial advice"
        preset="paper"
        palette={{ background: "#efebe3", ink: "#17150f", warm: "#e2780f" }}
        fontFamily={fontFamily}
        monoFamily={monoFamily}
        height="500px"
        crop={0.22}
        columns={[
          {
            title: "Product",
            links: [
              { label: "Dashboard", href: "/dashboard" },
              { label: "How to buy", href: "/dashboard#buy" },
              { label: "Next drops", href: "/drops" },
            ],
          },
          {
            title: "Verify",
            links: [
              { label: "Wallets (at launch)", href: "/dashboard#verify" },
              { label: "Vault activity", href: "/dashboard#activity" },
              { label: "Guardian rules", href: "/#guardian" },
            ],
          },
          {
            title: "Read first",
            links: [
              { label: "How you can lose", href: "/#risks" },
              { label: "No payouts to holders", href: "/#faq" },
            ],
          },
        ]}
      />
    </div>
  )
}
