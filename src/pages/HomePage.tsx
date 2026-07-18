import { useState } from 'react';
import { getCatalogApps } from '../lib/apps';
import { useDocumentMeta } from '../hooks/useDocumentMeta';
import type { AppEntry } from '../types';

/* ─── Premium Icon SVGs with filled shapes ─── */
function AppIcon({ slug, color, size = 28 }: { slug: string; color: string; size?: number }) {
  const p = { width: size, height: size, viewBox: '0 0 24 24', fill: 'none', stroke: color, strokeWidth: 2, strokeLinecap: 'round' as const, strokeLinejoin: 'round' as const };
  switch (slug) {
    case 'verbio':
      return (
        <svg {...p}>
          <path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20" />
          <path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z" />
          <path d="M8 7h8M8 11h6" />
        </svg>
      );
    case 'app-2':
      return (
        <svg {...p}>
          <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
          <polyline points="14 2 14 8 20 8" />
          <line x1="16" y1="13" x2="8" y2="13" />
          <line x1="16" y1="17" x2="8" y2="17" />
        </svg>
      );
    case 'app-3':
      return (
        <svg {...p}>
          <line x1="18" y1="20" x2="18" y2="10" />
          <line x1="12" y1="20" x2="12" y2="4" />
          <line x1="6" y1="20" x2="6" y2="14" />
        </svg>
      );
    case 'app-4':
      return (
        <svg {...p}>
          <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
          <circle cx="9" cy="7" r="4" />
          <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
          <path d="M16 3.13a4 4 0 0 1 0 7.75" />
        </svg>
      );
    default:
      return (
        <svg {...p}>
          <rect x="3" y="3" width="18" height="18" rx="2" ry="2" />
          <path d="M9 12l2 2 4-4" />
        </svg>
      );
  }
}

/* Decorative Golden Star Sparkle */
function GoldenStar({ className, style }: { className: string; style?: React.CSSProperties }) {
  return (
    <svg viewBox="0 0 24 24" className={`w-4 h-4 text-[#eab308] fill-current animate-float ${className}`} style={style}>
      <path d="M12 0L14.8 9.2L24 12L14.8 14.8L12 24L9.2 14.8L0 12L9.2 9.2L12 0Z" />
    </svg>
  );
}

/* Icon positions (desktop) */
const iconPositions = [
  { top: '15%',  left: '4%',   delay: '0s' },
  { top: '5%',   right: '8%',  delay: '0.6s' },
  { bottom: '22%', right: '2%',  delay: '1.2s' },
  { bottom: '12%', left: '2%',   delay: '1.8s' },
];

/* Custom human labels for the icons */
const appLabels: Record<string, string> = {
  'verbio': 'Verbio',
  'app-2': 'Notes',
  'app-3': 'Analytics',
  'app-4': 'Community',
};

/* ─── Detail panel matching Picture 1 ─── */
function AppDetailPanel({ app, onClose }: { app: AppEntry; onClose: () => void }) {
  const isVerbio = app.slug === 'verbio';
  return (
    <div className="animate-panel-expand mt-6 mx-auto max-w-5xl rounded-2xl bg-card border border-edge/50 p-8 shadow-[4px_4px_0_#d97706]"
         style={{ animationDuration: '0.3s' }}>
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-3 mb-2">
            <h3 className="font-sans text-3xl font-extrabold text-ink tracking-tight">
              {isVerbio ? 'Verbio' : appLabels[app.slug]}
            </h3>
          </div>
          <p className="text-[16px] text-ink-soft leading-relaxed max-w-xl">
            {isVerbio ? 'Master all 148 English irregular verbs' : app.description}
          </p>
          {app.requiresAuth && (
            <p className="mt-4 text-[13px] text-ink-soft/70">
              Request access: <a href="mailto:mail@alfcolab.com" className="text-clay hover:underline font-semibold">mail@alfcolab.com</a>
            </p>
          )}
        </div>

        <div className="flex flex-wrap items-center gap-3">
          {isVerbio && app.webUrl ? (
            <a href={app.webUrl} target="_blank" rel="noopener noreferrer"
               className="flex items-center justify-center rounded-xl bg-[#16a34a] px-6 py-3.5 text-[15px] font-bold text-white hover:bg-[#148f40] transition-colors shadow-sm">
              Open Web App
            </a>
          ) : (
            <span className="flex items-center justify-center rounded-xl bg-edge/40 px-6 py-3.5 text-[15px] font-bold text-ink-soft/60 cursor-default border border-edge/30">
              Web App — Coming Soon
            </span>
          )}
          <span className="flex items-center justify-center rounded-xl bg-edge/20 px-5 py-3 text-[14px] font-semibold text-ink-soft/50 cursor-default">
            iOS App — Coming Soon
          </span>
          <span className="flex items-center justify-center rounded-xl bg-edge/20 px-5 py-3 text-[14px] font-semibold text-ink-soft/50 cursor-default">
            Android App — Coming Soon
          </span>
        </div>
      </div>
      <div className="mt-6 flex justify-end">
        <button onClick={onClose} className="text-[13px] font-bold text-ink-soft/60 hover:text-clay transition-colors cursor-pointer">
          Close panel
        </button>
      </div>
    </div>
  );
}

/* ─── HomePage ─── */
export function HomePage() {
  useDocumentMeta(
    'Alf & Co Solutions — Dashboard',
    'Everyday tasks, Simple tools = Less stress. Streamline your daily operations with calm digital tools.',
  );

  const catalog = getCatalogApps().filter(app => app.slug !== 'head').slice(0, 4);
  const [selectedApp, setSelectedApp] = useState<AppEntry | null>(null);

  const handleIconClick = (app: AppEntry) => {
    setSelectedApp(prev => prev?.slug === app.slug ? null : app);
  };

  return (
    <>
      {/* Main viewport area */}
      <section className="mx-auto max-w-6xl px-6 pt-4 sm:pt-6 lg:pt-8">
        <div className="flex flex-col lg:flex-row items-center justify-between gap-8 lg:gap-4">

          {/* Capybara with orbiting icons */}
          <div className="relative w-full lg:w-[50%] flex justify-center">
            
            {/* Soft decorative stars */}
            <div className="absolute w-full h-full pointer-events-none" aria-hidden="true">
              <GoldenStar className="absolute top-[8%] left-[24%]" style={{ animationDelay: '0.2s', animationDuration: '4.5s' }} />
              <GoldenStar className="absolute top-[18%] right-[26%]" style={{ animationDelay: '0.8s', animationDuration: '5s' }} />
              <GoldenStar className="absolute bottom-[28%] left-[16%]" style={{ animationDelay: '1.4s', animationDuration: '4.2s' }} />
            </div>

            {/* Desktop floating icons matching Picture 3 (soft glow, text label below) */}
            <div className="hidden lg:block">
              {catalog.map((app, i) => {
                const pos = iconPositions[i];
                const isSelected = selectedApp?.slug === app.slug;
                
                // Pastel colors for the icons matching app status/accent
                const bgColors: Record<string, string> = {
                  'verbio': 'bg-[#eefdf4]', // Soft green background
                  'app-2': 'bg-[#fffbeb]',  // Soft yellow background
                  'app-3': 'bg-[#eefdf4]',  // Soft green background
                  'app-4': 'bg-[#f0f9ff]',  // Soft blue background
                };
                const borderColors: Record<string, string> = {
                  'verbio': 'border-[#22c55e]',
                  'app-2': 'border-[#f59e0b]',
                  'app-3': 'border-[#22c55e]',
                  'app-4': 'border-[#3b82f6]',
                };
                
                return (
                  <div
                    key={app.slug}
                    className="absolute z-10 flex flex-col items-center gap-2 animate-icon-float"
                    style={{
                      ...pos,
                      animationDelay: pos.delay,
                    }}
                  >
                    <button
                      onClick={() => handleIconClick(app)}
                      className={[
                        'flex h-15 w-15 items-center justify-center rounded-[18px] border-2 cursor-pointer',
                        'transition-all duration-300 ease-out shadow-sm',
                        isSelected
                          ? 'scale-110 shadow-md ring-2 ring-clay/40'
                          : 'hover:scale-105 active:scale-95 hover:shadow-md',
                        bgColors[app.slug] || 'bg-card',
                        isSelected ? 'border-clay' : (borderColors[app.slug] || 'border-edge/50'),
                      ].join(' ')}
                      aria-label={`Open ${app.name} details`}
                    >
                      <AppIcon slug={app.slug} color={app.accentColor} />
                    </button>
                    {/* Small text label underneath the icon */}
                    <span className="text-[12px] font-semibold text-ink-soft select-none">
                      {appLabels[app.slug]}
                    </span>
                  </div>
                );
              })}
            </div>

            {/* Capybara image with mix-blend-mode: multiply */}
            <img
              src="/capybara-main.jpg"
              alt="Capybara mascot peacefully working at a desk with a two-handled cup"
              className="w-full max-w-[340px] lg:max-w-[380px] object-contain animate-float relative z-0"
              style={{ animationDuration: '6s', mixBlendMode: 'multiply' }}
            />
          </div>

          {/* Headline Text */}
          <div className="w-full lg:w-[48%] text-center lg:text-left">
            <h1 className="font-sans text-[44px] leading-[1.08] font-black tracking-tight text-[#0f212e] sm:text-[54px] lg:text-[60px]">
              Everyday tasks,<br/>Simple tools
            </h1>
            <p className="mt-5 text-[17px] leading-relaxed text-ink-soft max-w-[420px] mx-auto lg:mx-0">
              Streamline your daily operations with intuitive and effective digital tools, tailored to your unique needs.
            </p>
            <p className="mt-3 text-[13px] italic text-ink-soft/60">
              Less stress. More calm.
            </p>
          </div>
        </div>

        {/* Mobile 2x2 icon grid matching Picture 2 */}
        <div className="lg:hidden mt-8 max-w-xs mx-auto">
          <div className="grid grid-cols-2 gap-6 justify-items-center">
            {catalog.map((app) => {
              const isSelected = selectedApp?.slug === app.slug;
              const bgColors: Record<string, string> = {
                'verbio': 'bg-[#eefdf4]',
                'app-2': 'bg-[#fffbeb]',
                'app-3': 'bg-[#eefdf4]',
                'app-4': 'bg-[#f0f9ff]',
              };
              const borderColors: Record<string, string> = {
                'verbio': 'border-[#22c55e]',
                'app-2': 'border-[#f59e0b]',
                'app-3': 'border-[#22c55e]',
                'app-4': 'border-[#3b82f6]',
              };

              return (
                <div key={app.slug} className="flex flex-col items-center gap-2">
                  <button
                    onClick={() => handleIconClick(app)}
                    className={[
                      'flex h-15 w-15 items-center justify-center rounded-[18px] border-2 cursor-pointer',
                      'transition-all duration-300 shadow-sm',
                      isSelected ? 'scale-110 shadow-md ring-2 ring-clay/40 border-clay' : 'border-edge/50 active:scale-95',
                      bgColors[app.slug] || 'bg-card',
                      isSelected ? 'border-clay' : (borderColors[app.slug] || 'border-edge/60'),
                    ].join(' ')}
                    aria-label={`Open ${app.name} details`}
                  >
                    <AppIcon slug={app.slug} color={app.accentColor} />
                  </button>
                  <span className="text-[12px] font-semibold text-ink-soft select-none">
                    {appLabels[app.slug]}
                  </span>
                </div>
              );
            })}
          </div>
        </div>

        {/* Expanded detail panel */}
        {selectedApp && (
          <AppDetailPanel app={selectedApp} onClose={() => setSelectedApp(null)} />
        )}
      </section>

      {/* Ko-fi link */}
      <section className="mx-auto max-w-6xl px-6 py-6 text-center">
        <a
          href="https://ko-fi.com/alfcosolutions"
          target="_blank"
          rel="noopener noreferrer"
          className="text-[14px] font-bold text-ink-soft/70 hover:text-clay underline transition-colors"
        >
          Buy us a coffee on Ko-fi
        </a>
      </section>

      {/* Bottom Motto Banner */}
      <section className="mx-auto max-w-4xl px-6 pb-6">
        <div className="rounded-2xl bg-[#f5ece0] px-8 py-5 text-center">
          <p className="font-sans text-[17px] font-bold text-[#5c4f48] tracking-tight">
            Everyday tasks + Simple tools = Less stress.
          </p>
        </div>
      </section>
    </>
  );
}
