import { Link } from 'react-router-dom';
import { ArrowLeft, Mail } from 'lucide-react';
import { useDocumentMeta } from '../hooks/useDocumentMeta';
import { useLanguage } from '../context/LanguageContext';

export function AboutPage() {
  const { t } = useLanguage();

  useDocumentMeta(
    'About — Alf&Co LAB',
    'Everyday tasks, Simple tools = Less stress. Learn about our philosophy and everyday apps.',
  );

  return (
    <div className="w-full max-w-4xl mx-auto p-4 sm:p-6 md:p-8 flex flex-col items-center">
      <div className="w-full mb-6">
        <Link
          to="/"
          className="inline-flex items-center gap-1.5 text-sm font-semibold text-stone-600 hover:text-amber-800 transition-colors"
        >
          <ArrowLeft size={16} />
          {t('nav.backToLab')}
        </Link>
      </div>

      <div className="w-full rounded-[2rem] bg-white/90 border border-stone-200/60 shadow-xl p-6 sm:p-10 md:p-12 relative overflow-hidden">
        {/* Decorative background blob */}
        <div className="absolute top-0 right-0 w-80 h-80 bg-amber-100/40 rounded-full blur-3xl -z-10 pointer-events-none" />

        <div className="flex flex-col md:flex-row items-center gap-8 mb-10 pb-8 border-b border-stone-200/50">
          <div className="w-32 h-32 sm:w-40 sm:h-40 rounded-3xl bg-amber-50 border-2 border-amber-200 p-2 flex items-center justify-center shrink-0 shadow-md">
            <img
              src="/mascot-hero.png"
              alt="Alf&Co LAB Capybara Mascot"
              className="w-full h-full object-contain drop-shadow-sm"
            />
          </div>

          <div className="text-center md:text-left">
            <div className="inline-block px-3 py-1 bg-amber-100 text-amber-900 rounded-full text-xs font-bold mb-3 border border-amber-200">
              Alf&Co LAB
            </div>
            <h1 className="text-3xl sm:text-4xl font-extrabold text-stone-900 tracking-tight mb-2">
              {t('about.title')}
            </h1>
            <p className="text-base sm:text-lg font-medium text-amber-800">
              {t('about.subtitle')}
            </p>
          </div>
        </div>

        {/* Story / Philosophy */}
        <div className="space-y-6 text-stone-700 leading-relaxed text-base">
          <p className="text-lg text-stone-800 font-medium leading-relaxed">
            {t('about.p1')}
          </p>

          <p>
            {t('about.p2')}
          </p>

          <div className="my-8 p-6 rounded-2xl bg-amber-50/70 border border-amber-200/70 flex flex-col sm:flex-row items-start sm:items-center gap-4">
            <div className="w-12 h-12 rounded-xl bg-amber-500 text-white flex items-center justify-center font-bold text-xl shrink-0 shadow-xs">
              ☕
            </div>
            <div>
              <h3 className="font-bold text-stone-900 text-base mb-1">
                Supported by people like you
              </h3>
              <p className="text-xs sm:text-sm text-stone-600">
                We believe in simple, clean tools without invasive ads or dark patterns.
              </p>
            </div>
            <a
              href="https://ko-fi.com/alfcosolutions"
              target="_blank"
              rel="noopener noreferrer"
              className="sm:ml-auto px-4 py-2.5 bg-stone-900 text-white font-semibold text-xs rounded-xl hover:bg-stone-800 transition-colors whitespace-nowrap"
            >
              {t('footer.kofi')}
            </a>
          </div>

          {/* Contact Box */}
          <div className="pt-6 border-t border-stone-200/60 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div>
              <h3 className="font-bold text-stone-900 text-base">
                {t('about.contactHeading')}
              </h3>
              <p className="text-xs text-stone-500 mt-0.5">
                {t('about.contactDesc')}
              </p>
            </div>
            <a
              href="mailto:mail@alfcolab.com"
              className="inline-flex items-center gap-2 px-5 py-3 rounded-xl bg-amber-600 text-white font-bold text-sm hover:bg-amber-700 transition-colors shadow-xs"
            >
              <Mail size={16} />
              mail@alfcolab.com
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
