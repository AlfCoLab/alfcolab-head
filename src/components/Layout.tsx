import { Link, Outlet } from 'react-router-dom';
import { BrandThroughline } from './BrandThroughline';
import { Footer } from './Footer';

/**
 * Layout — the neutral Alfcolab chrome shared by every page.
 *
 * Header: small capybara disc wordmark + minimal nav. Per design.md the
 * layout stays neutral so each `/app/:slug` can carry its own accent
 * without the chrome fighting it.
 */
export function Layout() {
  return (
    <div className="flex min-h-screen flex-col">
      <BrandThroughline />

      <header className="sticky top-0 z-30 border-b border-edge/60 bg-canvas/80 backdrop-blur-sm">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
          <Link to="/" className="flex items-center gap-2.5 group">
            {/* Mini capybara disc wordmark */}
            <span
              className="flex h-9 w-9 items-center justify-center rounded-full bg-card border border-edge shadow-card transition-transform group-hover:scale-105"
              aria-hidden="true"
            >
              <svg width="22" height="22" viewBox="0 0 40 40">
                <circle cx="20" cy="20" r="13" fill="#E0BD96" />
                <ellipse cx="13" cy="15" rx="3" ry="2.5" fill="#C99E7A" />
                <ellipse cx="27" cy="15" rx="3" ry="2.5" fill="#C99E7A" />
                <ellipse cx="20" cy="20" rx="4" ry="3" fill="#E05E26" />
                <path
                  d="M15 17 q2 -1.5 4 0 M21 17 q2 -1.5 4 0"
                  stroke="#0F212E"
                  strokeWidth="1.4"
                  strokeLinecap="round"
                  fill="none"
                />
              </svg>
            </span>
            <span className="font-sans text-lg font-semibold tracking-tight text-ink">
              Alfcolab
            </span>
          </Link>

          <nav aria-label="Primary" className="flex items-center gap-6 text-sm">
            <Link
              to="/apps"
              className="text-ink-soft hover:text-clay transition-colors"
            >
              Apps
            </Link>
            <Link
              to="/app/verbio"
              className="text-ink-soft hover:text-clay transition-colors"
            >
              Verbio
            </Link>
          </nav>
        </div>
      </header>

      <main className="flex-1">
        <Outlet />
      </main>

      <Footer />
    </div>
  );
}
