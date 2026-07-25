import { Link } from 'react-router-dom';
import { useDocumentMeta } from '../hooks/useDocumentMeta';
import { useLanguage } from '../context/LanguageContext';

export function HomePage() {
  const { t } = useLanguage();
  useDocumentMeta(
    'Alf&Co LAB — Soft Laboratory',
    'Small products for everyday life. Simple tools for everyday tasks.',
  );

  return (
    <div className="w-full max-w-6xl mx-auto p-4 sm:p-6 flex flex-col items-center justify-center">
      {/* Main Container Card */}
      <div className="relative w-full rounded-[2rem] shadow-xl border border-stone-200/50 overflow-hidden flex flex-col p-6 md:p-10 my-2">
        {/* Background Image & Gradient */}
        <div
          className="absolute inset-0 z-0 bg-cover"
          style={{
            backgroundImage: "url('/hero-bg.png')",
            backgroundPosition: '100% 50%',
          }}
        />
        <div
          className="absolute inset-0 z-0"
          style={{
            background: 'linear-gradient(105deg, #FBF6EE 30%, rgba(251, 246, 238, 0.85) 55%, transparent 90%)',
          }}
        />

        {/* 1. Hero Content */}
        <div className="relative z-10 flex-1 flex flex-col md:flex-row items-center justify-center gap-8 w-full py-4 min-h-[320px]">
          {/* Mascot Image */}
          <div className="w-full md:w-2/5 flex items-center justify-center p-2 max-h-[380px]">
            <img
              src="/mascot-hero.png"
              alt="Alf&Co LAB Mascot"
              className="masked-img block max-h-full max-w-full w-auto object-contain drop-shadow-md"
            />
          </div>

          {/* Headline Text */}
          <div className="w-full md:w-3/5 max-w-xl text-center md:text-left flex flex-col justify-center">
            <div className="inline-block self-center md:self-start px-3 py-1 bg-amber-100/90 text-amber-900 rounded-full text-xs font-bold mb-3 border border-amber-200/80 shadow-xs">
              <span>{t('hero.badge')}</span>
            </div>
            <h1 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold tracking-tight text-stone-900 mb-3 leading-tight">
              {t('hero.title')}
            </h1>
            <p className="text-sm md:text-base text-stone-600 max-w-lg mx-auto md:mx-0 leading-relaxed">
              {t('hero.desc')}
            </p>
            <p className="text-xs italic text-amber-800/80 font-medium mt-3">
              {t('hero.motto')}
            </p>
          </div>
        </div>

        {/* 2. Compact App Cards Grid */}
        <div className="relative z-10 w-full grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 pt-6">
          {/* App 1: Verbio */}
          <Link
            to="/app/verbio"
            className="vibrant-card p-4 text-left cursor-pointer flex flex-col justify-between hover:border-blue-300 group"
          >
            <div>
              <div className="flex justify-between items-center mb-2.5">
                <div className="w-9 h-9 rounded-lg flex items-center justify-center font-bold text-sm bg-blue-500 text-white flex-shrink-0 shadow-sm">
                  V
                </div>
                <span className="inline-flex items-center gap-1.5 text-xs font-semibold text-blue-700 bg-blue-50 px-2.5 py-0.5 rounded-full border border-blue-100">
                  <span className="w-1.5 h-1.5 bg-blue-500 rounded-full animate-pulse" />
                  {t('badge.beta')}
                </span>
              </div>
              <h3 className="text-base font-bold text-stone-900 leading-tight">Verbio</h3>
              <p className="text-xs text-stone-500 mt-1 mb-2">
                {t('app.verbio.desc')}
              </p>
            </div>
            <div className="flex items-center text-xs font-bold text-blue-600 group-hover:translate-x-1 transition-transform">
              <span>{t('btn.openPage')}</span>
              <svg className="w-3.5 h-3.5 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
              </svg>
            </div>
          </Link>

          {/* App 2: Notes */}
          <div className="vibrant-card p-4 opacity-75 flex flex-col justify-between cursor-not-allowed">
            <div>
              <div className="flex justify-between items-center mb-2.5">
                <div className="w-9 h-9 rounded-lg flex items-center justify-center font-bold text-sm bg-purple-500 text-white flex-shrink-0 shadow-sm">
                  N
                </div>
                <span className="inline-flex items-center gap-1.5 text-xs font-medium text-stone-600 bg-stone-100 px-2.5 py-0.5 rounded-full border border-stone-200">
                  <span className="w-1.5 h-1.5 bg-stone-400 rounded-full" />
                  {t('badge.soon')}
                </span>
              </div>
              <h3 className="text-base font-bold text-stone-900 leading-tight">{t('app.notes.name')}</h3>
              <p className="text-xs text-stone-500 mt-1 mb-2">
                {t('app.notes.desc')}
              </p>
            </div>
            <div className="text-xs font-medium text-stone-400">
              {t('badge.inDev')}
            </div>
          </div>

          {/* App 3: Habits */}
          <div className="vibrant-card p-4 opacity-75 flex flex-col justify-between cursor-not-allowed">
            <div>
              <div className="flex justify-between items-center mb-2.5">
                <div className="w-9 h-9 rounded-lg flex items-center justify-center font-bold text-sm bg-green-500 text-white flex-shrink-0 shadow-sm">
                  H
                </div>
                <span className="inline-flex items-center gap-1.5 text-xs font-medium text-stone-600 bg-stone-100 px-2.5 py-0.5 rounded-full border border-stone-200">
                  <span className="w-1.5 h-1.5 bg-stone-400 rounded-full" />
                  {t('badge.soon')}
                </span>
              </div>
              <h3 className="text-base font-bold text-stone-900 leading-tight">{t('app.habits.name')}</h3>
              <p className="text-xs text-stone-500 mt-1 mb-2">
                {t('app.habits.desc')}
              </p>
            </div>
            <div className="text-xs font-medium text-stone-400">
              {t('badge.inDev')}
            </div>
          </div>

          {/* App 4: Tracker */}
          <div className="vibrant-card p-4 opacity-75 flex flex-col justify-between cursor-not-allowed">
            <div>
              <div className="flex justify-between items-center mb-2.5">
                <div className="w-9 h-9 rounded-lg flex items-center justify-center font-bold text-sm bg-amber-500 text-white flex-shrink-0 shadow-sm">
                  T
                </div>
                <span className="inline-flex items-center gap-1.5 text-xs font-medium text-stone-600 bg-stone-100 px-2.5 py-0.5 rounded-full border border-stone-200">
                  <span className="w-1.5 h-1.5 bg-stone-400 rounded-full" />
                  {t('badge.soon')}
                </span>
              </div>
              <h3 className="text-base font-bold text-stone-900 leading-tight">{t('app.tracker.name')}</h3>
              <p className="text-xs text-stone-500 mt-1 mb-2">
                {t('app.tracker.desc')}
              </p>
            </div>
            <div className="text-xs font-medium text-stone-400">
              {t('badge.inDev')}
            </div>
          </div>
        </div>
      </div>

      {/* Ko-fi Support Link */}
      <div className="py-4 text-center">
        <a
          href="https://ko-fi.com/alfcosolutions"
          target="_blank"
          rel="noopener noreferrer"
          className="text-xs font-bold text-stone-500 hover:text-amber-800 transition-colors"
        >
          {t('footer.kofi')}
        </a>
      </div>
    </div>
  );
}
