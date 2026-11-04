import { fmtBtc } from "@/lib/format"

/** Gráfico de área simples, em SVG, do saldo do cofre. */
export function VaultChart({ data, height = 180 }: { data: number[]; height?: number }) {
  const w = 600
  const h = height
  const pad = 6
  const max = Math.max(...data) * 1.08
  const step = (w - pad * 2) / (data.length - 1)
  const pts = data.map((v, i) => [pad + i * step, h - pad - (v / max) * (h - pad * 2)] as const)
  const line = pts.map(([x, y], i) => (i ? "L" : "M") + x.toFixed(1) + " " + y.toFixed(1)).join(" ")
  const area = `${line} L ${pts[pts.length - 1][0].toFixed(1)} ${h} L ${pts[0][0].toFixed(1)} ${h} Z`
  const last = pts[pts.length - 1]

  return (
    <figure className="w-full">
      <svg
        viewBox={`0 0 ${w} ${h}`}
        preserveAspectRatio="none"
        className="block h-44 w-full"
        role="img"
        aria-label={`Saldo do cofre nos últimos ${data.length} dias, chegando a ${fmtBtc(data[data.length - 1])} BTC`}
      >
        <defs>
          <linearGradient id="vault-fill" x1="0" x2="0" y1="0" y2="1">
            <stop offset="0%" stopColor="var(--btc)" stopOpacity="0.28" />
            <stop offset="100%" stopColor="var(--btc)" stopOpacity="0" />
          </linearGradient>
        </defs>
        {[0.25, 0.5, 0.75].map((t) => (
          <line key={t} x1="0" x2={w} y1={h * t} y2={h * t} stroke="var(--border)" strokeDasharray="3 5" vectorEffect="non-scaling-stroke" />
        ))}
        <path d={area} fill="url(#vault-fill)" />
        <path d={line} fill="none" stroke="var(--btc)" strokeWidth="2" vectorEffect="non-scaling-stroke" strokeLinejoin="round" />
        <circle cx={last[0]} cy={last[1]} r="4" fill="var(--btc)" />
      </svg>
      <figcaption className="mt-2 flex justify-between font-mono text-[11px] text-muted-foreground">
        <span>há {data.length} dias</span>
        <span>hoje</span>
      </figcaption>
    </figure>
  )
}
