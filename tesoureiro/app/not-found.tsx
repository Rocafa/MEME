import Link from "next/link"
import { Mascot } from "@/components/site/mascot"

export const metadata = { title: "Not found — NoKeys" }

export default function NotFound() {
  return (
    <section className="grid min-h-[80svh] place-items-center px-4 pb-16 pt-28 sm:px-6">
      <div className="mx-auto flex max-w-xl flex-col items-center text-center">
        <Mascot mood="deny" className="w-36 text-foreground sm:w-44" />
        <p className="mt-8 font-mono text-[11px] uppercase tracking-[0.18em] text-btc-ink">Error 404</p>
        <h1 className="mt-3 text-[clamp(2rem,5vw,3.2rem)] font-extrabold leading-[1.02] tracking-[-0.03em] text-balance">
          Nothing here. Not even keys.
        </h1>
        <p className="mt-4 text-base leading-relaxed text-muted-foreground">
          This page doesn&apos;t exist. If someone sent you here with a contract address, be careful: the only real one is
          published on this site on launch day.
        </p>
        <div className="mt-8 flex flex-wrap justify-center gap-3">
          <Link href="/" className="inline-flex h-11 items-center rounded-full bg-btc px-5 text-sm font-semibold text-ink">
            Back to the vault
          </Link>
          <Link href="/dashboard#verify" className="inline-flex h-11 items-center rounded-full border px-5 text-sm font-semibold">
            Verify the wallets
          </Link>
        </div>
      </div>
    </section>
  )
}
