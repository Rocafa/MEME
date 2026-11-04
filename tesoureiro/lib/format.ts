const nf = (opts: Intl.NumberFormatOptions) => new Intl.NumberFormat("en-US", opts)

export const fmtBtc = (v: number) => nf({ minimumFractionDigits: 4, maximumFractionDigits: 4 }).format(v)
export const fmtInt = (v: number) => nf({ maximumFractionDigits: 0 }).format(v)
export const fmtUsd = (v: number) =>
  nf({ style: "currency", currency: "USD", maximumFractionDigits: v < 1 ? 7 : 0 }).format(v)
export const fmtCompactUsd = (v: number) =>
  nf({ style: "currency", currency: "USD", notation: "compact", maximumFractionDigits: 1 }).format(v)
export const fmtCompact = (v: number) => nf({ notation: "compact", maximumFractionDigits: 1 }).format(v)
export const fmtNum = (v: number, d = 2) => nf({ maximumFractionDigits: d }).format(v)

/** Satoshis de lastro para cada 1 milhão de tokens. */
export const satsPerMillion = (btc: number, supply: number) => Math.round((btc * 1e8) / (supply / 1e6))
