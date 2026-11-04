import type { Metadata } from "next"
import Link from "next/link"
import { LegalPage } from "@/components/site/legal-page"

export const metadata: Metadata = {
  title: "Terms of use — NoKeys",
  description: "Draft terms of use for the NoKeys site and the $NOKEYS memecoin. Pending legal review.",
}

export default function Terms() {
  return (
    <LegalPage
      title="Terms of use"
      updated="November 4, 2026"
      intro={
        <p>
          These terms cover this website and the $NOKEYS memecoin. By using the site or holding $NOKEYS you accept them. If
          you don&apos;t, don&apos;t use the site and don&apos;t buy the token.
        </p>
      }
      sections={[
        {
          title: "What $NOKEYS is",
          body: (
            <>
              <p>
                $NOKEYS is a speculative memecoin on Solana. A share of its trading fees is swapped to cbBTC and kept in a
                public multisig vault under the rules published in the <Link href="/docs">docs</Link>.
              </p>
              <p>
                <strong>It is not an investment, a security, a share or a deposit.</strong> It gives no ownership, no vote
                over the vault, no right to profits and no claim on the vault&apos;s Bitcoin.
              </p>
            </>
          ),
        },
        {
          title: "No payouts, no promises",
          body: (
            <p>
              Holders receive no dividends, yield, airdrops, raffles or rewards of any kind. Nobody promises that the price
              will go up, that volume will last or that any milestone will be reached. Projections on this site are
              simulations and are labeled as such.
            </p>
          ),
        },
        {
          title: "Risks you accept",
          body: (
            <>
              <p>
                You can lose all the money you put in. Memecoin prices are set only by buyers and sellers, volume can stop at
                any time, Bitcoin can fall, and cbBTC is issued by a third party that can freeze it. Smart contracts, wallets
                and blockchains can fail or be attacked.
              </p>
              <p>
                Read <Link href="/#risks">how you can lose</Link> before buying. Only use money you can afford to lose.
              </p>
            </>
          ),
        },
        {
          title: "Official addresses and copycats",
          body: (
            <p>
              The only official contract and wallets are the ones published on this site on launch day. Any other token,
              account or address using the NoKeys name is not ours. We are not responsible for losses from copycats, phishing
              or fake support accounts. We will never message you first or ask for your recovery phrase.
            </p>
          ),
        },
        {
          title: "Who can use it",
          body: (
            <p>
              You must be an adult and allowed to buy crypto assets where you live. Following the laws and tax rules of your
              country is your responsibility. Restricted jurisdictions will be listed here after legal review.
            </p>
          ),
        },
        {
          title: "The site and the AI",
          body: (
            <p>
              The site, the Treasurer&apos;s diary and every number on it are provided as they are, without warranties. The
              Treasurer is software that writes proposals and text. It holds no keys and its words are not advice.
              Third-party services linked here, such as pump.fun, Jupiter and Solscan, have their own terms.
            </p>
          ),
        },
        {
          title: "Not financial advice",
          body: <p>Nothing on this site is financial, legal or tax advice. Do your own research.</p>,
        },
        {
          title: "Changes and contact",
          body: (
            <p>
              These terms may be updated; the date at the top always shows the latest version. The operating entity,
              governing law and contact address will be added after legal review and before launch.
            </p>
          ),
        },
      ]}
    />
  )
}
