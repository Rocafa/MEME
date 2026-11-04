"use client"

import * as React from "react"
import { Check, Copy } from "lucide-react"

/**
 * Copy-to-clipboard with a short confirmation toast.
 *
 * The toast matters more than it looks: the address is the one thing a buyer
 * must get exactly right, and a copy that silently failed looks identical to
 * one that worked.
 */
export function useCopy(value: string | null) {
  const [copied, setCopied] = React.useState(false)
  const [failed, setFailed] = React.useState(false)
  const timer = React.useRef<ReturnType<typeof setTimeout> | null>(null)

  React.useEffect(() => () => { if (timer.current) clearTimeout(timer.current) }, [])

  const copy = React.useCallback(async () => {
    if (!value) return
    const done = (ok: boolean) => {
      setCopied(ok)
      setFailed(!ok)
      if (timer.current) clearTimeout(timer.current)
      timer.current = setTimeout(() => { setCopied(false); setFailed(false) }, 2200)
    }
    try {
      await navigator.clipboard.writeText(value)
      done(true)
    } catch {
      // Clipboard is blocked in some in-app browsers. Say so instead of
      // pretending it worked.
      done(false)
    }
  }, [value])

  return { copied, failed, copy }
}

/** Fixed confirmation strip. Renders nothing until a copy happens. */
export function CopyToast({ copied, failed, tail }: { copied: boolean; failed: boolean; tail?: string }) {
  const show = copied || failed
  return (
    <>
      <div
        aria-hidden={!show}
        className={
          "pointer-events-none fixed inset-x-0 bottom-20 z-[60] flex justify-center px-4 transition-all duration-200 md:bottom-8 " +
          (show ? "translate-y-0 opacity-100" : "translate-y-2 opacity-0")
        }
      >
        <div className="rounded-full border border-white/10 bg-ink/95 px-4 py-2.5 text-sm font-medium text-ink-foreground shadow-lg backdrop-blur-md">
          {failed ? (
            "Could not copy here. Select the address and copy it by hand."
          ) : tail ? (
            <>
              Address copied. It must end in <b className="font-mono text-btc">{tail}</b>.
            </>
          ) : (
            "Copied."
          )}
        </div>
      </div>
      <span aria-live="polite" className="sr-only">
        {failed ? "Copy failed" : copied ? `Address copied, ending in ${tail ?? ""}` : ""}
      </span>
    </>
  )
}

/** The address itself, with the characters a buyer should eyeball picked out. */
export function AddressText({ address, tone = "light" }: { address: string; tone?: "dark" | "light" }) {
  const accent = tone === "dark" ? "text-btc" : "text-btc-ink"
  return (
    <>
      <b className={accent}>{address.slice(0, 4)}</b>
      {address.slice(4, -4)}
      <b className={accent}>{address.slice(-4)}</b>
    </>
  )
}

/** Inline copy button used next to an address anywhere on the site. */
export function CopyButton({
  value,
  label = "Copy contract address",
  className,
}: {
  value: string | null
  label?: string
  className?: string
}) {
  const { copied, failed, copy } = useCopy(value)
  return (
    <>
      <button type="button" onClick={copy} disabled={!value} aria-label={label} className={className}>
        {copied ? <Check className="size-4" /> : <Copy className="size-4" />}
      </button>
      <CopyToast copied={copied} failed={failed} tail={value?.slice(-4)} />
    </>
  )
}
