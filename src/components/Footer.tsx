import { Link } from 'react-router-dom';
import { useLanguage } from '../context/LanguageContext';

/**
 * Footer — calm, minimal. Matching the nav structure.
 * Per Brand Book tone of voice: no hype, just the essentials.
 */
export function Footer() {
  const { t } = useLanguage();
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-stone-200/60 bg-white/40 py-4">
      <div className="mx-auto flex max-w-6xl flex-col sm:flex-row items-center justify-between px-6 text-xs text-stone-600">
        <nav aria-label="Footer" className="flex items-center gap-6 font-semibold">
          <a
            href="mailto:mail@alfcolab.com"
            className="hover:text-amber-800 transition-colors"
            title="Send email to Alf&Co LAB"
          >
            Contact
          </a>
          <Link
            to="/apps"
            className="hover:text-amber-800 transition-colors"
            title="View all projects"
          >
            Projects
          </Link>
          <Link
            to="/app/head"
            className="hover:text-amber-800 transition-colors"
            title="About Alf&Co LAB"
          >
            About
          </Link>
        </nav>

        <div className="mt-3 sm:mt-0 flex items-center gap-4">
          <span className="text-stone-500">{t('footer.madeWithCare')}</span>
          <span className="font-bold text-stone-800">© {year} Alf&amp;Co LAB</span>
        </div>
      </div>
    </footer>
  );
}
