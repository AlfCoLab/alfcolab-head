/**
 * VerbioMark — placeholder logo for the Verbio app.
 *
 * The Verbio docs use the 📚 book emoji as their logo glyph in mockups.
 * This is an inline-SVG interpretation of an open book in Verbio's own
 * accent color (sky blue, hsl(200 90% 55%)), kept on-brand for the Dolce
 * Vita hub while signaling the app's identity. Swap for the real logo
 * asset when finalized.
 */
interface VerbioMarkProps {
  size?: number;
  className?: string;
}

export function VerbioMark({ size = 64, className }: VerbioMarkProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 64 64"
      role="img"
      aria-label="Verbio"
      className={className}
      xmlns="http://www.w3.org/2000/svg"
    >
      {/* Disc in Verbio's accent */}
      <circle cx="32" cy="32" r="30" fill="hsl(200 90% 55%)" />
      {/* Open book — two pages */}
      <path
        d="M32 20 q-7 -4 -14 -2 v22 q7 -2 14 2 q7 -4 14 -2 v-22 q-7 -2 -14 2 Z"
        fill="#FFFDF9"
      />
      <line x1="32" y1="20" x2="32" y2="42" stroke="hsl(200 90% 45%)" strokeWidth="1.5" />
      {/* Page lines */}
      <line x1="22" y1="24" x2="28" y2="23" stroke="hsl(200 90% 45%)" strokeWidth="1.5" opacity="0.5" strokeLinecap="round" />
      <line x1="22" y1="28" x2="28" y2="27" stroke="hsl(200 90% 45%)" strokeWidth="1.5" opacity="0.5" strokeLinecap="round" />
      <line x1="22" y1="32" x2="28" y2="31" stroke="hsl(200 90% 45%)" strokeWidth="1.5" opacity="0.5" strokeLinecap="round" />
      <line x1="36" y1="23" x2="42" y2="24" stroke="hsl(200 90% 45%)" strokeWidth="1.5" opacity="0.5" strokeLinecap="round" />
      <line x1="36" y1="27" x2="42" y2="28" stroke="hsl(200 90% 45%)" strokeWidth="1.5" opacity="0.5" strokeLinecap="round" />
      <line x1="36" y1="31" x2="42" y2="32" stroke="hsl(200 90% 45%)" strokeWidth="1.5" opacity="0.5" strokeLinecap="round" />
    </svg>
  );
}
