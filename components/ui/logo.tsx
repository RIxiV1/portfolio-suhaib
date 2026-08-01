// The "Signal" mark: a clean S — the signal — resolved out of the dotted grid.
// Smooth stroke reads at any size; optional noise dots frame it when large.
export const SIGNAL_PATH =
  'M66 33 C66 24 58 22 50 22 C40 22 34 28 34 37 C34 46 42 49 50 49 C58 49 66 52 66 62 C66 72 58 76 50 76 C42 76 34 74 34 66'

// A sparse, fixed scatter that frames the S at larger sizes (favicon-size omits it).
const NOISE = [
  { x: 15, y: 22, r: 2, o: 0.5 },
  { x: 85, y: 27, r: 1.6, o: 0.4 },
  { x: 22, y: 79, r: 1.7, o: 0.45 },
  { x: 82, y: 80, r: 2, o: 0.5 },
  { x: 11, y: 52, r: 1.4, o: 0.32 },
  { x: 89, y: 58, r: 1.5, o: 0.4 },
  { x: 50, y: 11, r: 1.5, o: 0.4 },
  { x: 49, y: 90, r: 1.6, o: 0.38 },
]

export function Logo({
  size = 28,
  color = 'currentColor',
  plate,
  noise,
  className,
}: {
  size?: number
  /** Stroke color of the S. Defaults to currentColor so it inherits text color. */
  color?: string
  /** Optional rounded background tile (favicon / app-icon contexts). */
  plate?: string
  /** Optional color for the framing noise dots; omit to hide them. */
  noise?: string
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
      {noise &&
        NOISE.map((d, i) => (
          <circle
            key={i}
            cx={d.x}
            cy={d.y}
            r={d.r}
            fill={noise}
            opacity={d.o}
          />
        ))}
      <path
        d={SIGNAL_PATH}
        stroke={color}
        strokeWidth="12"
        strokeLinecap="round"
      />
    </svg>
  )
}
