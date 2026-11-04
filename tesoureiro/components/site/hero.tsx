"use client"

import Link from "next/link"
import { ArrowRight, MousePointer2 } from "lucide-react"
import HalftoneWordmarkFooter from "@/components/ui/halftone-wordmark-footer"
import { ContractLine } from "@/components/site/contract-line"
import { cn } from "@/lib/utils"

type Pill = { label: string; value: string }

export function Hero({
  wordmark,
  eyebrow,
  title,
  accent,
  sub,
  primary,
  secondary,
  left = [],
  right = [],
  palette,
  fontFamily,
  monoFamily,
  hint = "Move through it. Click to send a shockwave through the vault.",
  showContract = true,
}: {
  wordmark: string
  eyebrow: string
  title: string
  accent?: string
  sub: string
  primary: { href: string; label: string }
  secondary?: { href: string; label: string }
  left?: Pill[]
  right?: Pill[]
  palette: { background: string; ink: string; warm: string }
  fontFamily: string
  monoFamily: string
  hint?: string
  showContract?: boolean
}) {
  return (
    <HalftoneWordmarkFooter
      as="section"
      ariaLabel={`${wordmark} hero`}
      wordmark={wordmark}
      label=""
      meta=""
      columns={[]}
      backToTop={false}
      palette={palette}
      fontFamily={fontFamily}
      monoFamily={monoFamily}
      height="max(700px, 100svh)"
      crop={0.16}
      radius={95}
      grain={0.6}
    >
      <div className="pointer-events-none absolute inset-0 z-[1] flex flex-col items-center px-5 pt-28 sm:pt-32">
        <p
          className="rounded-full border px-3.5 py-1.5 font-mono text-[10.5px] uppercase tracking-[0.18em]"
          style={{ borderColor: `${palette.ink}26`, color: palette.warm }}
        >
          {eyebrow}
        </p>
        <h1
          className="mt-5 max-w-4xl text-center text-[clamp(2.4rem,7vw,5.6rem)] font-extrabold leading-[0.95] tracking-[-0.035em] text-balance"
          style={{ color: palette.ink }}
        >
          {title} {accent ? <span style={{ color: palette.warm }}>{accent}</span> : null}
        </h1>
        <p
          className="mt-5 max-w-xl text-center text-[15px] leading-relaxed sm:text-base"
          style={{ color: `${palette.ink}b3` }}
        >
          {sub}
        </p>
        <div className="pointer-events-auto mt-7 flex flex-wrap items-center justify-center gap-3">
          <Link
            href={primary.href}
            className="inline-flex h-12 items-center gap-2 rounded-full px-6 text-[15px] font-semibold transition-transform hover:scale-[1.03] active:scale-[0.98]"
            style={{ background: palette.warm, color: palette.background }}
          >
            {primary.label} <ArrowRight className="size-4" />
          </Link>
          {secondary && (
            <Link
              href={secondary.href}
              className="inline-flex h-12 items-center rounded-full border px-6 text-[15px] font-medium backdrop-blur-sm transition-colors hover:bg-white/10"
              style={{ borderColor: `${palette.ink}33`, color: palette.ink }}
            >
              {secondary.label}
            </Link>
          )}
        </div>
        {showContract && <ContractLine className="pointer-events-auto mt-6" />}
        <p
          className="mt-5 hidden items-center gap-2 font-mono text-[10.5px] uppercase tracking-[0.16em] sm:flex"
          style={{ color: `${palette.ink}70` }}
        >
          <MousePointer2 className="size-3.5" /> {hint}
        </p>
      </div>

      {/* Floating stat pills, desktop only */}
      {[left, right].map((pills, side) => (
        <ul
          key={side}
          className={cn(
            "pointer-events-none absolute top-[30%] z-[1] hidden flex-col gap-5 xl:flex",
            side === 0 ? "left-8" : "right-8 items-end",
          )}
        >
          {pills.map((p, i) => (
            <li
              key={p.label}
              className="float rounded-full border px-4 py-2 font-mono text-[11px] uppercase tracking-[0.12em] backdrop-blur-md"
              style={{
                borderColor: `${palette.ink}22`,
                background: `${palette.background}99`,
                color: palette.ink,
                animationDelay: `${(i + side) * 0.9}s`,
              }}
            >
              <span style={{ color: `${palette.ink}80` }}>{p.label}</span>{" "}
              <span className="font-semibold" style={{ color: palette.warm }}>
                {p.value}
              </span>
            </li>
          ))}
        </ul>
      ))}

    </HalftoneWordmarkFooter>
  )
}
