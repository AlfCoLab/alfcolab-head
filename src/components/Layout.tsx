import { Link, Outlet } from 'react-router-dom';
import { Footer } from './Footer';
import { useLanguage } from '../context/LanguageContext';

/**
 * Layout — Alf&Co LAB header & chrome shared by every page.
 */
export function Layout() {
  const { lang, setLang, t } = useLanguage();

  return (
    <div className="flex min-h-screen flex-col bg-[#EFEBE4]" style={{
      backgroundImage: 'radial-gradient(circle at 0% 0%, rgba(186, 230, 253, 0.2) 0%, transparent 50%), radial-gradient(circle at 100% 100%, rgba(254, 226, 226, 0.2) 0%, transparent 50%)',
    }}>
      <header className="glass-header sticky top-0 z-50 border-b border-stone-200/50">
        <nav className="max-w-6xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
          <Link to="/" className="flex items-center gap-2">
            <div className="w-10 h-10 rounded-full bg-amber-100 border border-amber-200 flex items-center justify-center overflow-hidden shadow-xs">
              <img src="/mascot-avatar.png" alt="Alf&Co LAB Mascot" className="w-full h-full object-cover" />
            </div>
            <span className="font-extrabold text-lg tracking-tight text-stone-800">
              Alf<span className="text-amber-700">&amp;</span>Co LAB
            </span>
          </Link>

          <div className="flex items-center gap-4">
            <nav aria-label="Primary" className="hidden md:flex items-center gap-6 text-sm font-semibold text-stone-700">
              <Link to="/" className="hover:text-amber-800 transition-colors">
                {t('nav.dashboard')}
              </Link>
              <Link to="/apps" className="hover:text-amber-800 transition-colors">
                {t('nav.projects')}
              </Link>
              <Link to="/about" className="hover:text-amber-800 transition-colors">
                {t('nav.about')}
              </Link>
            </nav>

            <div className="flex items-center bg-white/80 border border-stone-200 rounded-full p-1 text-xs font-semibold shadow-sm">
              <button
                type="button"
                onClick={() => setLang('it')}
                className={`px-3 py-1 rounded-full transition-all cursor-pointer ${
                  lang === 'it'
                    ? 'bg-stone-900 text-white font-bold'
                    : 'text-stone-500 hover:text-stone-900'
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
                    ? 'bg-stone-900 text-white font-bold'
                    : 'text-stone-500 hover:text-stone-900'
                }`}
                aria-label="Switch to English"
              >
                EN
              </button>
            </div>
          </div>
        </nav>
      </header>

      <main className="flex-1 min-h-0">
        <Outlet />
      </main>

      <Footer />
    </div>
  );
}
