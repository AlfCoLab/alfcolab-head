import { Link, Outlet } from 'react-router-dom';
import { BrandThroughline } from './BrandThroughline';
import { Footer } from './Footer';
import { useLanguage } from '../context/LanguageContext';

/**
 * Layout — the neutral Alfcolab chrome shared by every page.
 *
 * Header: "Alf & Co Solutions" text logo + minimal nav + language switcher.
 * Nav: Dashboard, Projects only.
 */
export function Layout() {
  const { lang, setLang, t } = useLanguage();

  return (
    <div className="flex min-h-screen flex-col">
      <BrandThroughline />

      <header className="sticky top-0 z-30 pt-4 px-4 bg-canvas/40 backdrop-blur-sm">
        <div className="mx-auto max-w-6xl bg-card border border-edge/40 rounded-2xl shadow-card px-6 sm:px-8 py-3.5 flex items-center justify-between">
          <Link to="/" className="flex items-center gap-2 group text-clay hover:opacity-80 transition-opacity">
            <span className="font-sans text-lg font-extrabold tracking-tight text-ink">
              Alf <span className="text-clay">&amp;</span> Co Solutions
            </span>
          </Link>

          <div className="flex items-center gap-6">
            <nav aria-label="Primary" className="hidden md:flex items-center gap-8 text-[14px] font-medium text-ink">
              <Link
                to="/"
                className="text-clay border-b-2 border-clay pb-0.5"
              >
                {t('nav.dashboard')}
              </Link>
              <span className="hover:text-clay transition-colors cursor-pointer">
                {t('nav.projects')}
              </span>
            </nav>

            {/* Language Switcher pill */}
            <div className="flex items-center bg-canvas border border-edge rounded-full p-1 text-xs font-semibold shadow-sm">
              <button
                type="button"
                onClick={() => setLang('it')}
                className={`px-3 py-1 rounded-full transition-all cursor-pointer ${
                  lang === 'it'
                    ? 'bg-ink text-white font-bold'
                    : 'text-ink-soft hover:text-ink'
                }`}
                aria-label="Passa a Italiano"
              >
                IT
              </button>
              <button
                type="button"
                onClick={() => setLang('en')}
                className={`px-3 py-1 rounded-full transition-all cursor-pointer ${
                  lang === 'en'
                    ? 'bg-ink text-white font-bold'
                    : 'text-ink-soft hover:text-ink'
                }`}
                aria-label="Switch to English"
              >
                EN
              </button>
            </div>
          </div>
        </div>
      </header>

      <main className="flex-1">
        <Outlet />
      </main>

      <Footer />
    </div>
  );
}
