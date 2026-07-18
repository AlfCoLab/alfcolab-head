import { Link, Outlet } from 'react-router-dom';
import { BrandThroughline } from './BrandThroughline';
import { Footer } from './Footer';

/**
 * Layout — the neutral Alfcolab chrome shared by every page.
 *
 * Header: "Alf & Co Solutions" text logo + minimal nav. No Log In button
 * on the main site — login is only for verbio.alfcolab.com access.
 */
export function Layout() {
  return (
    <div className="flex min-h-screen flex-col">
      <BrandThroughline />

      <header className="sticky top-0 z-30 bg-canvas/80 backdrop-blur-sm">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-5">
          <Link to="/" className="flex items-center gap-2 group text-clay hover:opacity-80 transition-opacity">
            <span className="font-sans text-xl font-bold tracking-tight">
              Alf &amp; Co Solutions
            </span>
          </Link>

          <nav aria-label="Primary" className="hidden md:flex items-center gap-8 text-[15px] font-medium text-ink">
            <Link
              to="/"
              className="text-clay border-b-2 border-clay pb-1"
            >
              Dashboard
            </Link>
            <Link
              to="/apps"
              className="hover:text-clay transition-colors"
            >
              Services
            </Link>
            <span className="hover:text-clay transition-colors cursor-pointer">
              Projects
            </span>
            <span className="hover:text-clay transition-colors flex items-center gap-1 cursor-pointer">
              Resources
              <svg width="10" height="6" viewBox="0 0 10 6" fill="none">
                <path d="M1 1L5 5L9 1" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </span>
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
