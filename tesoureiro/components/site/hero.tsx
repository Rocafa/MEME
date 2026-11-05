"use client"

import Link from "next/link"
import HalftoneWordmarkFooter from "@/components/ui/halftone-wordmark-footer"
import { ContractLine } from "@/components/site/contract-line"

type Stat = { label: string; value: string }

/**
 * The opening of every page: the wordmark alone, printed whole across the
 * screen, and the words that explain it directly underneath.
 *
 * Nothing is laid over the wordmark and nothing is set in a capsule. One ink
 * carries every line, the same ink the dots are printed in, so a sentence
 * never changes colour halfway through.
 */
export function Hero({
  wordmark,
  note,
  title,
  sub,
  primary,
  secondary,
  stats = [],
  palette,
  fontFamily,
  monoFamily,
  showContract = true,
}: {
  wordmark: string
  /** One plain line above the headline. Never a badge. */
  note?: string
  title: string
  sub: string
  primary: { href: string; label: string }
  secondary?: { href: string; label: string }
  /** Printed as a plain band under the buttons, not as floating pills. */
  stats?: Stat[]
  palette: { background: string; ink: string; warm: string }
  fontFamily: string
  monoFamily: string
  showContract?: boolean
}) {
  const ink = palette.ink

  return (
    <section aria-label={`${wordmark} introduction`} style={{ background: palette.background }}>
      {/* The wordmark owns the first screen on its own. */}
      <HalftoneWordmarkFooter
        as="div"
        ariaLabel={wordmark}
        wordmark={wordmark}
        label=""
        meta=""
        columns={[]}
        backToTop={false}
        palette={palette}
        fontFamily={fontFamily}
        monoFamily={monoFamily}
        height="min(78svh, 620px)"
        align="center"
        crop={0}
        radius={110}
        grain={0.6}
      />

      {/* The explanation, directly below it. */}
      <div className="mx-auto w-full max-w-3xl px-5 pb-[clamp(3.5rem,7vw,6rem)] text-center sm:px-6">
        {note ? (
          <p
            className="font-mono text-[11px] uppercase tracking-[0.18em]"
            style={{ color: `${ink}70`, fontFamily: monoFamily }}
          >
            {note}
          </p>
        ) : null}

        <h1
          className="mt-4 text-[clamp(2rem,5.2vw,3.6rem)] font-extrabold leading-[1.02] tracking-[-0.03em] text-balance"
          style={{ color: ink }}
        >
          {title}
        </h1>

        <p className="mx-auto mt-5 max-w-xl text-[15px] leading-relaxed sm:text-base" style={{ color: `${ink}b3` }}>
          {sub}
        </p>

        <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
          <Link
            href={primary.href}
            // The buy destination is off-site once the coin is live.
            {...(primary.href.startsWith("http") ? { target: "_blank", rel: "noopener noreferrer" } : {})}
            // One rule across the site: type is all one ink, and the accent is
            // reserved for things you click. It never lands inside a sentence.
            className="inline-flex h-12 items-center px-7 text-[15px] font-semibold transition-opacity hover:opacity-85"
            style={{ background: palette.warm, color: palette.background }}
          >
            {primary.label}
          </Link>
          {secondary && (
            <Link
              href={secondary.href}
              className="inline-flex h-12 items-center border px-7 text-[15px] font-medium transition-colors"
              style={{ borderColor: `${ink}33`, color: ink }}
            >
              {secondary.label}
            </Link>
          )}
        </div>

        {showContract && <ContractLine className="mt-7" />}

        {stats.length > 0 && (
          <dl
            className="mx-auto mt-10 grid max-w-2xl grid-cols-2 gap-x-8 gap-y-5 border-t pt-8 sm:grid-cols-3"
            style={{ borderColor: `${ink}1f` }}
          >
            {stats.map((s) => (
              <div key={s.label}>
                <dt
                  className="font-mono text-[10.5px] uppercase tracking-[0.16em]"
                  style={{ color: `${ink}70`, fontFamily: monoFamily }}
                >
                  {s.label}
                </dt>
                <dd className="mt-1.5 text-lg font-semibold tabular-nums" style={{ color: ink }}>
                  {s.value}
                </dd>
              </div>
            ))}
          </dl>
        )}
      </div>
    </section>
  )
}
