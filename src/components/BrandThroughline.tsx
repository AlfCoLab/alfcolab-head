/**
 * BrandThroughline — the recurring brand marks that tie every page to
 * Alfcolab without forcing a shared UI (Brand Book design.md: "минимальная
 * рамка").
 *
 * Implements the "throughline elements" concept from preview_alf_elements.html:
 *   - heart badge (terracotta seal, top-right)
 *   - corner wordmark (moss-green "alfcolab.com" type)
 *
 * These are intentionally subtle, fixed-position, and non-interactive so
 * they never compete with the page content.
 */
export function BrandThroughline() {
  return (
    <>
      {/* Heart badge — author's seal, top-right, +4px overflow (per brand system) */}
      <div
        className="pointer-events-none fixed right-4 top-4 z-40 hidden md:block"
        aria-hidden="true"
      >
        <div className="flex h-8 w-8 translate-x-1 -translate-y-1 items-center justify-center rounded-full bg-clay shadow-card">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none">
            <path
              d="M12 21s-7-4.5-9.5-9C.5 8 3 4 6.5 4c2 0 3.5 1 5.5 3 2-2 3.5-3 5.5-3 3.5 0 6 4 4 8-2.5 4.5-9.5 9-9.5 9z"
              fill="#FFFDF9"
            />
          </svg>
        </div>
      </div>
    </>
  );
}
