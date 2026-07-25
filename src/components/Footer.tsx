import { useLanguage } from '../context/LanguageContext';

/**
 * Footer — calm, minimal. Matching the nav structure.
 * Per Brand Book tone of voice: no hype, just the essentials.
 */
export function Footer() {
  const { t } = useLanguage();
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-edge/60 bg-card/50 py-4">
      <div className="mx-auto flex max-w-6xl flex-col sm:flex-row items-center justify-between px-6 text-xs text-ink-soft">
        <nav aria-label="Footer" className="flex items-center gap-6 font-medium">
          <span className="cursor-pointer hover:text-clay transition-colors">Contact</span>
          <span className="cursor-pointer hover:text-clay transition-colors">Projects</span>
          <span className="cursor-pointer hover:text-clay transition-colors">About</span>
        </nav>

        <div className="mt-3 sm:mt-0 flex items-center gap-4">
          <span className="text-ink-soft/70">{t('footer.madeWithCare')}</span>
          <span className="font-semibold text-ink">© {year} Alf&amp;Co LAB</span>
        </div>
      </div>
    </footer>
  );
}
