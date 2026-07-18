
/**
 * Footer — calm, minimal. Matching the nav structure.
 * Per Brand Book tone of voice: no hype, just the essentials.
 */
export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-edge/60">
      <div className="mx-auto flex max-w-6xl flex-col sm:flex-row items-center justify-between px-6 py-6">
        <nav aria-label="Footer" className="flex items-center gap-6 text-[14px] font-medium text-ink-soft">
          <span className="cursor-pointer hover:text-clay transition-colors">Contact</span>
          <span className="cursor-pointer hover:text-clay transition-colors">Projects</span>
          <span className="cursor-pointer hover:text-clay transition-colors">About</span>
        </nav>

        <div className="mt-4 sm:mt-0 text-[14px] font-medium text-ink-soft">
          © {year} Alf &amp; Co Solutions
        </div>
      </div>
    </footer>
  );
}
