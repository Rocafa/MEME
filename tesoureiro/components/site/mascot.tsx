import { cn } from "@/lib/utils"

export type Mood = "stack" | "deny" | "burn"

/**
 * The Treasurer: a small walking vault with a Bitcoin badge and an empty key hook.
 * Original art, drawn in SVG. Animations live in globals.css (.mascot-*).
 */
export function Mascot({ mood = "stack", className }: { mood?: Mood; className?: string }) {
  return (
    <svg
      viewBox="0 0 200 220"
      role="img"
      aria-label="The Treasurer, a small vault with a Bitcoin badge and no keys"
      className={cn("mascot-bob overflow-visible", className)}
    >
      {/* shadow */}
      <ellipse cx="100" cy="210" rx="52" ry="7" fill="currentColor" opacity="0.12" className="mascot-shadow" />

      {/* legs */}
      <rect x="66" y="170" width="18" height="30" rx="8" fill="#17150f" />
      <rect x="116" y="170" width="18" height="30" rx="8" fill="#17150f" />

      {/* body */}
      <rect x="30" y="40" width="140" height="138" rx="30" fill="#2a2723" />
      <rect x="38" y="48" width="124" height="122" rx="24" fill="#3a362f" />

      {/* hinges */}
      <rect x="24" y="70" width="10" height="22" rx="4" fill="#17150f" />
      <rect x="24" y="128" width="10" height="22" rx="4" fill="#17150f" />

      {/* face plate */}
      <rect x="54" y="62" width="92" height="50" rx="18" fill="#f5f2ea" />
      <g className="mascot-blink">
        {mood === "deny" ? (
          <>
            <path d="M72 82 L90 90" stroke="#17150f" strokeWidth="6" strokeLinecap="round" />
            <path d="M128 82 L110 90" stroke="#17150f" strokeWidth="6" strokeLinecap="round" />
          </>
        ) : (
          <>
            <circle cx="80" cy="86" r="7" fill="#17150f" />
            <circle cx="120" cy="86" r="7" fill="#17150f" />
            <circle cx="82.5" cy="83.5" r="2.2" fill="#f5f2ea" />
            <circle cx="122.5" cy="83.5" r="2.2" fill="#f5f2ea" />
          </>
        )}
      </g>
      {mood === "deny" ? (
        <path d="M86 102 H114" stroke="#17150f" strokeWidth="4" strokeLinecap="round" />
      ) : (
        <path d="M86 99 Q100 108 114 99" stroke="#17150f" strokeWidth="4" fill="none" strokeLinecap="round" />
      )}

      {/* Bitcoin dial */}
      <g className="mascot-dial" style={{ transformOrigin: "100px 140px" }}>
        <circle cx="100" cy="140" r="22" fill="#f7931a" />
        <circle cx="100" cy="140" r="22" fill="none" stroke="#17150f" strokeOpacity="0.25" strokeWidth="3" strokeDasharray="3 5" />
        <text x="100" y="149" textAnchor="middle" fontSize="26" fontWeight="800" fill="#17150f" fontFamily="system-ui, sans-serif">
          ₿
        </text>
      </g>

      {/* arm with empty key hook */}
      <path d="M170 100 Q188 104 186 124" stroke="#2a2723" strokeWidth="10" fill="none" strokeLinecap="round" />
      <path d="M186 124 v10 a6 6 0 1 1 -10 4" stroke="#8a8478" strokeWidth="3" fill="none" strokeLinecap="round" />
      <g transform="translate(150 150) rotate(-8)">
        <rect width="46" height="18" rx="4" fill="#f5f2ea" stroke="#17150f" strokeWidth="1.5" />
        <text x="23" y="12.5" textAnchor="middle" fontSize="8.5" fontWeight="700" fill="#17150f" fontFamily="ui-monospace, monospace">
          NO KEYS
        </text>
      </g>

      {/* mood extras */}
      {mood === "burn" && (
        <path
          className="mascot-flame"
          d="M100 6 C112 20 118 28 112 40 C108 34 104 34 102 40 C96 30 86 26 100 6 Z"
          fill="#f7931a"
        />
      )}
      {mood === "stack" && (
        <g className="mascot-coin">
          <circle cx="160" cy="26" r="11" fill="#f7931a" />
          <text x="160" y="31" textAnchor="middle" fontSize="13" fontWeight="800" fill="#17150f" fontFamily="system-ui, sans-serif">
            ₿
          </text>
        </g>
      )}
      {mood === "deny" && (
        <g transform="translate(26 6)">
          <rect width="58" height="24" rx="12" fill="#17150f" />
          <text x="29" y="16" textAnchor="middle" fontSize="11" fontWeight="800" fill="#f7931a" fontFamily="ui-monospace, monospace">
            NOPE
          </text>
        </g>
      )}
    </svg>
  )
}
