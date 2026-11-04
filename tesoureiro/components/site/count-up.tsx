"use client"

import * as React from "react"
import { fmtBtc, fmtCompact, fmtInt, fmtNum } from "@/lib/format"

const FORMATS = {
  btc: (n: number) => "₿ " + fmtBtc(n),
  int: (n: number) => fmtInt(n),
  compact: (n: number) => fmtCompact(n),
  sol: (n: number) => fmtNum(n, 1) + " SOL",
}
export type CountFormat = keyof typeof FORMATS

/**
 * Counts up to `value` once it scrolls into view. The final value is rendered on the
 * server, so there is no layout shift and no animation under reduced motion.
 */
export function CountUp({ value, format, duration = 1400 }: { value: number; format: CountFormat; duration?: number }) {
  const ref = React.useRef<HTMLSpanElement>(null)
  const [shown, setShown] = React.useState(value)

  React.useEffect(() => {
    const el = ref.current
    if (!el || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return
    let raf = 0
    const io = new IntersectionObserver(
      ([entry]) => {
        if (!entry?.isIntersecting) return
        io.disconnect()
        const start = performance.now()
        const tick = (now: number) => {
          const t = Math.min(1, (now - start) / duration)
          const eased = t === 1 ? 1 : 1 - 2 ** (-10 * t)
          setShown(value * eased)
          if (t < 1) raf = requestAnimationFrame(tick)
        }
        setShown(0)
        raf = requestAnimationFrame(tick)
      },
      { threshold: 0.4 },
    )
    io.observe(el)
    return () => {
      io.disconnect()
      cancelAnimationFrame(raf)
    }
  }, [value, duration])

  return (
    <span ref={ref} className="tabular-nums">
      {FORMATS[format](shown)}
    </span>
  )
}
