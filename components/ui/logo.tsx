// The mascot: a WALL·E-style robot — boxy body, treads, and the signature
// binocular eyes carrying the indigo accent. Reads down to ~16px. Uses only
// rect / path (M/H/L/Z) / circle so it renders under Satori (favicon + OG).
export function Logo({
  size = 28,
  color = 'currentColor',
  accent = 'var(--accent)',
  plate,
  className,
}: {
  size?: number
  /** Body / outline colour. Defaults to currentColor. */
  color?: string
  /** Eye lenses. Defaults to the accent token. */
  accent?: string
  /** Optional rounded background tile (favicon / app-icon contexts). */
  plate?: string
  className?: string
}) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 100 100"
      fill="none"
      className={className}
      aria-hidden="true"
    >
      {plate && (
        <rect x="2" y="2" width="96" height="96" rx="24" fill={plate} />
      )}
      {/* treads */}
      <rect x="22" y="80" width="26" height="15" rx="7" fill={color} />
      <rect x="52" y="80" width="26" height="15" rx="7" fill={color} />
      {/* body */}
      <path d="M33 50 H67 L73 82 H27 Z" fill={color} />
      {/* arms */}
      <rect x="19" y="54" width="7" height="27" rx="3.5" fill={color} />
      <rect x="74" y="54" width="7" height="27" rx="3.5" fill={color} />
      {/* neck + binocular head */}
      <rect x="46" y="44" width="8" height="8" fill={color} />
      <rect x="23" y="18" width="54" height="27" rx="13.5" fill={color} />
      {/* eyes (accent lenses + dark pupils) */}
      <circle cx="38" cy="31" r="8.5" fill={accent} />
      <circle cx="62" cy="31" r="8.5" fill={accent} />
      <circle cx="38" cy="31" r="3.2" fill="#0a0a0f" />
      <circle cx="62" cy="31" r="3.2" fill="#0a0a0f" />
    </svg>
  )
}
