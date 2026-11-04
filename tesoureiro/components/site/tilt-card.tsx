"use client"

import * as React from "react"
import Link from "next/link"
import { cn } from "@/lib/utils"

/** Card that tilts toward the pointer, with a soft sheen. Only on hover-capable devices. */
export function TiltCard({
  href,
  accent,
  className,
  children,
}: {
  href: string
  accent: string
  className?: string
  children: React.ReactNode
}) {
  const ref = React.useRef<HTMLAnchorElement>(null)

  const onMove = (e: React.PointerEvent) => {
    const el = ref.current
    if (!el || e.pointerType !== "mouse") return
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return
    const r = el.getBoundingClientRect()
    const x = (e.clientX - r.left) / r.width
    const y = (e.clientY - r.top) / r.height
    el.style.setProperty("--rx", `${(0.5 - y) * 8}deg`)
    el.style.setProperty("--ry", `${(x - 0.5) * 10}deg`)
    el.style.setProperty("--mx", `${x * 100}%`)
    el.style.setProperty("--my", `${y * 100}%`)
  }
  const onLeave = () => {
    const el = ref.current
    if (!el) return
    el.style.setProperty("--rx", "0deg")
    el.style.setProperty("--ry", "0deg")
  }

  return (
    <Link
      ref={ref}
      href={href}
      onPointerMove={onMove}
      onPointerLeave={onLeave}
      className={cn("tilt group relative block overflow-hidden rounded-2xl", className)}
      style={{ "--accent": accent } as React.CSSProperties}
    >
      <span
        aria-hidden
        className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100"
        style={{
          background: "radial-gradient(420px circle at var(--mx,50%) var(--my,50%), color-mix(in srgb, var(--accent) 22%, transparent), transparent 60%)",
        }}
      />
      <span className="relative block">{children}</span>
    </Link>
  )
}
