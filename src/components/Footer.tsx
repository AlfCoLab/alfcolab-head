import { Link } from 'react-router-dom';
import { Heart } from 'lucide-react';

/**
 * Footer — calm, minimal. Contacts, legal links, and a small brand seal.
 *
 * Per Brand Book tone of voice: no exclamation points, no hype, just the
 * steady motto and the essentials.
 */
export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="mt-24 border-t border-edge bg-card/40">
      <div className="mx-auto max-w-6xl px-6 py-12">
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          <div>
            <div className="flex items-center gap-2">
              <span className="text-lg font-semibold tracking-tight text-ink">Alfcolab</span>
              <Heart size={14} className="fill-clay text-clay" aria-hidden="true" />
            </div>
            <p className="mt-2 max-w-xs text-sm text-ink-soft">
              Everyday tasks, simple tools, less stress. A calm workspace for everyday apps.
            </p>
          </div>

          <nav aria-label="Footer" className="flex flex-col gap-2 text-sm">
            <Link to="/" className="text-ink-soft hover:text-clay transition-colors">
              Home
            </Link>
            <Link to="/apps" className="text-ink-soft hover:text-clay transition-colors">
              Apps catalog
            </Link>
            <Link
              to="/app/verbio"
              className="text-ink-soft hover:text-clay transition-colors"
            >
              Verbio
            </Link>
          </nav>

          <nav aria-label="Legal" className="flex flex-col gap-2 text-sm">
            {/* Stubbed routes — wire to real pages when the legal copy is ready */}
            <span className="text-ink-soft/60">Privacy policy</span>
            <span className="text-ink-soft/60">Terms of use</span>
            <a
              href="mailto:hello@alfcolab.com"
              className="text-ink-soft hover:text-clay transition-colors"
            >
              hello@alfcolab.com
            </a>
          </nav>
        </div>

        <div className="mt-10 flex flex-col gap-2 border-t border-edge pt-6 text-xs text-ink-soft/60 sm:flex-row sm:items-center sm:justify-between">
          <p>© {year} Alfcolab. All rights reserved.</p>
          <p className="font-mono">alfcolab.com</p>
        </div>
      </div>
    </footer>
  );
}
