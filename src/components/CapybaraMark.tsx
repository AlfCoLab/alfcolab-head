/**
 * CapybaraMark — the Alfcolab hub mascot.
 *
 * The capybara is the brand's "calm productivity anchor" (Brand Book Basis §5).
 * Sits at the center of the homepage orbit. Inline SVG in the Dolce Vita
 * palette — no image asset dependency, scales crisply, themeable via `currentColor`.
 *
 * Geometry: a rounded, friendly seated capybara on a cream disc, terracotta
 * nose, moss-green notebook pose accent. Deliberately minimal — this is a
 * clean placeholder while the final art direction is unified.
 */
interface CapybaraMarkProps {
  size?: number;
  className?: string;
}

export function CapybaraMark({ size = 160, className }: CapybaraMarkProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 200 200"
      role="img"
      aria-label="Alfcolab capybara mascot"
      className={className}
      xmlns="http://www.w3.org/2000/svg"
    >
      {/* Cream disc backdrop */}
      <circle cx="100" cy="100" r="96" fill="#FFFDF9" />
      <circle
        cx="100"
        cy="100"
        r="96"
        fill="none"
        stroke="#E05E26"
        strokeWidth="2"
        opacity="0.25"
      />

      {/* Ears (behind body) */}
      <ellipse cx="62" cy="78" rx="14" ry="12" fill="#C99E7A" />
      <ellipse cx="138" cy="78" rx="14" ry="12" fill="#C99E7A" />
      <ellipse cx="62" cy="80" rx="7" ry="6" fill="#A87B55" />
      <ellipse cx="138" cy="80" rx="7" ry="6" fill="#A87B55" />

      {/* Body — rounded seated form */}
      <ellipse cx="100" cy="130" rx="58" ry="44" fill="#D9B489" />
      {/* Head */}
      <ellipse cx="100" cy="92" rx="46" ry="40" fill="#E0BD96" />

      {/* Snout / muzzle block (signature capybara shape) */}
      <ellipse cx="100" cy="108" rx="34" ry="26" fill="#EBD0AC" />

      {/* Eyes — small, gentle, slightly closed for "calm" */}
      <path
        d="M78 86 q6 -5 12 0"
        stroke="#0F212E"
        strokeWidth="3"
        strokeLinecap="round"
        fill="none"
      />
      <path
        d="M110 86 q6 -5 12 0"
        stroke="#0F212E"
        strokeWidth="3"
        strokeLinecap="round"
        fill="none"
      />

      {/* Nose — terracotta, the brand accent */}
      <ellipse cx="100" cy="100" rx="9" ry="6.5" fill="#E05E26" />
      <ellipse cx="97.5" cy="98" rx="2.5" ry="1.8" fill="#F4A176" opacity="0.7" />

      {/* Mouth — subtle calm smile */}
      <path
        d="M100 110 v6 M100 116 q-5 4 -10 2 M100 116 q5 4 10 2"
        stroke="#0F212E"
        strokeWidth="2"
        strokeLinecap="round"
        fill="none"
        opacity="0.55"
      />

      {/* Front paws resting */}
      <ellipse cx="78" cy="166" rx="11" ry="8" fill="#C99E7A" />
      <ellipse cx="122" cy="166" rx="11" ry="8" fill="#C99E7A" />
      <line x1="74" y1="164" x2="74" y2="170" stroke="#A87B55" strokeWidth="1.5" strokeLinecap="round" />
      <line x1="78" y1="165" x2="78" y2="171" stroke="#A87B55" strokeWidth="1.5" strokeLinecap="round" />
      <line x1="82" y1="164" x2="82" y2="170" stroke="#A87B55" strokeWidth="1.5" strokeLinecap="round" />
      <line x1="118" y1="164" x2="118" y2="170" stroke="#A87B55" strokeWidth="1.5" strokeLinecap="round" />
      <line x1="122" y1="165" x2="122" y2="171" stroke="#A87B55" strokeWidth="1.5" strokeLinecap="round" />
      <line x1="126" y1="164" x2="126" y2="170" stroke="#A87B55" strokeWidth="1.5" strokeLinecap="round" />

      {/* Notebook pose accent — a small moss-green notepad corner (brand throughline) */}
      <g transform="translate(140 142) rotate(12)">
        <rect x="0" y="0" width="26" height="20" rx="2" fill="#FFFDF9" stroke="#596A4C" strokeWidth="2" />
        <line x1="4" y1="6" x2="20" y2="6" stroke="#596A4C" strokeWidth="1.5" opacity="0.6" />
        <line x1="4" y1="11" x2="18" y2="11" stroke="#596A4C" strokeWidth="1.5" opacity="0.6" />
        <line x1="4" y1="16" x2="16" y2="16" stroke="#596A4C" strokeWidth="1.5" opacity="0.6" />
      </g>
    </svg>
  );
}
