// Minimal, geometric monogram 'SS' — compact, legible at small sizes, and
// designed to feel technical yet refined. Uses simple strokes so it renders
// well as an SVG, favicon, and when converted by Satori for OG images.
export function Logo({
  size = 28,
  color = 'currentColor',
  accent = 'var(--accent)',
  plate,
  className,
}: {
  size?: number
  /** Primary stroke colour. Defaults to currentColor. */
  color?: string
  /** Small accent dot colour. Defaults to the accent token. */
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
      role="img"
    >
      {plate && (
        <rect x="2" y="2" width="96" height="96" rx="20" fill={plate} />
      )}

      {/* Two stylized 'S' strokes, mirrored and tightened into a compact monogram */}
      <g stroke={color} strokeWidth={8} strokeLinecap="round" strokeLinejoin="round" fill="none">
        <path d="M68 18 C50 18 44 34 60 40 C78 47 52 64 36 68 C20 72 22 86 40 86" />
        <path d="M56 18 C38 18 32 34 48 40 C66 47 40 64 24 68 C8 72 10 86 28 86" opacity="0.18" />
      </g>

      {/* Accent: small indigo dot for signal and brand recognition */}
      <circle cx="74" cy="24" r="4.5" fill={accent} />

      {/* Optional subtle outline when used without a plate to improve contrast */}
      {!plate && (
        <rect x="1" y="1" width="98" height="98" rx="22" stroke="none" fill="none" />
      )}
    </svg>
  )
}
