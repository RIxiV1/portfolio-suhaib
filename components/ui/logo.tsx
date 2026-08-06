// The mascot: a friendly little robot. Outline in the foreground colour, the
// indigo signal accent living in his eyes + antenna dot. Reads down to 16px.
// Path uses only M/H/V/Q/Z + circles so it renders under Satori (favicon/OG).
export const ROBOT_HEAD =
  'M40 28 H60 Q78 28 78 46 V64 Q78 82 60 82 H40 Q22 82 22 64 V46 Q22 28 40 28 Z'
export const ROBOT_ANTENNA = 'M50 28 V14'
export const ROBOT_SMILE = 'M43 70 Q50 75 57 70'

export function Logo({
  size = 28,
  color = 'currentColor',
  accent = 'var(--accent)',
  plate,
  className,
}: {
  size?: number
  /** Outline / stroke colour. Defaults to currentColor. */
  color?: string
  /** Eyes + antenna dot. Defaults to the accent token. */
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
        <rect x="3" y="3" width="94" height="94" rx="24" fill={plate} />
      )}
      <path
        d={ROBOT_ANTENNA}
        stroke={color}
        strokeWidth="5"
        strokeLinecap="round"
      />
      <circle cx="50" cy="10" r="4.5" fill={accent} />
      <path d={ROBOT_HEAD} stroke={color} strokeWidth="6" />
      <circle cx="41" cy="52" r="7.5" fill={accent} />
      <circle cx="59" cy="52" r="7.5" fill={accent} />
      <path
        d={ROBOT_SMILE}
        stroke={color}
        strokeWidth="4"
        strokeLinecap="round"
      />
    </svg>
  )
}
