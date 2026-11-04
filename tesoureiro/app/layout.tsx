import type { Metadata } from "next"
import "./globals.css"
import { sans, mono } from "@/lib/fonts"
import { SiteShell } from "@/components/site/shell"
import { SiteFooter } from "@/components/site/footer"

export const metadata: Metadata = {
  title: "Tesoureiro — o cofre de Bitcoin com um agente de IA",
  description:
    "Um agente de IA cuida de um cofre público de Bitcoin na Solana. Ele propõe, regras fixas conferem e um multisig assina. Ele não tem a chave.",
}

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="pt-BR" className={`${sans.variable} ${mono.variable} h-full antialiased`}>
      <body className="min-h-full flex flex-col">
        <SiteShell>{children}</SiteShell>
        <SiteFooter fontFamily={sans.style.fontFamily} monoFamily={mono.style.fontFamily} />
      </body>
    </html>
  )
}
