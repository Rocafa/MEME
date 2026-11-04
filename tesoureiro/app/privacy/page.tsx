import type { Metadata } from "next"
import { LegalPage } from "@/components/site/legal-page"

export const metadata: Metadata = {
  title: "Privacy — NoKeys",
  description: "Draft privacy notice for the NoKeys site. No accounts, no cookies, no tracking. Pending legal review.",
}

export default function Privacy() {
  return (
    <LegalPage
      title="Privacy"
      updated="November 4, 2026"
      intro={
        <p>Short version: this site has no accounts, no forms, no cookies and no analytics. It doesn&apos;t ask who you are.</p>
      }
      sections={[
        {
          title: "What we don't collect",
          body: (
            <p>
              No sign-up, no email list, no tracking pixels, no advertising cookies and no analytics scripts. The site never
              asks you to connect a wallet.
            </p>
          ),
        },
        {
          title: "What stays in your browser",
          body: (
            <p>
              The calculators, the Guardian game and the meme &quot;Copy&quot; buttons run entirely in your browser. Nothing
              you type into them is sent to us. Copying a meme only writes to your own clipboard.
            </p>
          ),
        },
        {
          title: "Hosting logs",
          body: (
            <p>
              Like any website, the hosting provider may keep standard technical logs, such as IP address, browser type and
              time of the request, for security and reliability. We don&apos;t combine them with anything else.
            </p>
          ),
        },
        {
          title: "Blockchains are public",
          body: (
            <p>
              If you buy $NOKEYS, your wallet address and transactions are recorded on Solana, which is public and permanent.
              That data isn&apos;t held by us and we can&apos;t delete it.
            </p>
          ),
        },
        {
          title: "Links to other sites",
          body: <p>Links to pump.fun, Jupiter, Solscan, X or Telegram take you to services with their own privacy policies.</p>,
        },
        {
          title: "Changes and contact",
          body: (
            <p>
              If anything that collects data is ever added, this page changes first. The contact address and the operating
              entity will be added after legal review and before launch.
            </p>
          ),
        },
      ]}
    />
  )
}
