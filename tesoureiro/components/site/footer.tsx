"use client"

import HalftoneWordmarkFooter from "@/components/ui/halftone-wordmark-footer"

export function SiteFooter({ fontFamily, monoFamily }: { fontFamily: string; monoFamily: string }) {
  return (
    <div className="w-full">
      <HalftoneWordmarkFooter
        wordmark="tesoureiro"
        label="Tesoureiro · cofre de BTC"
        meta="©2026 · Solana · pré-lançamento"
        palette={{ background: "#141210", ink: "#efe9dd", warm: "#f7931a" }}
        fontFamily={fontFamily}
        monoFamily={monoFamily}
        height="520px"
        crop={0.22}
        columns={[
          {
            title: "Produto",
            links: [
              { label: "Dashboard", href: "/dashboard" },
              { label: "Como comprar", href: "/dashboard#comprar" },
              { label: "Como funciona", href: "/#como-funciona" },
            ],
          },
          {
            title: "Verificar",
            links: [
              { label: "Carteiras (no lançamento)", href: "/dashboard#verificar" },
              { label: "Transações", href: "/dashboard#transacoes" },
              { label: "Riscos", href: "/#riscos" },
            ],
          },
          {
            title: "Aviso",
            links: [
              { label: "Não é investimento", href: "/#riscos" },
              { label: "Sem distribuição a holders", href: "/#faq" },
            ],
          },
        ]}
      />
    </div>
  )
}
