import { useState } from 'react';
import { getCatalogApps } from '../lib/apps';
import { useDocumentMeta } from '../hooks/useDocumentMeta';
import type { AppEntry } from '../types';

/* ─── Premium Icon SVGs with filled shapes ─── */
function AppIcon({ slug, color, size = 26 }: { slug: string; color: string; size?: number }) {
  const p = { width: size, height: size, viewBox: '0 0 24 24', fill: 'none', stroke: color, strokeWidth: 2.25, strokeLinecap: 'round' as const, strokeLinejoin: 'round' as const };
  switch (slug) {
    case 'verbio':
      return (
        <svg {...p}>
          <path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20" />
          <path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z" />
          <circle cx="12" cy="10" r="2" fill={`${color}30`} />
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
          <path d="M3 3v18h18" />
          <path d="M18.7 8l-5.1 5.2-2.8-2.7L7 14.3" />
        </svg>
      );
    case 'app-4':
      return (
        <svg {...p}>
          <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
          <circle cx="9" cy="7" r="4" fill={`${color}20`} />
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

/* ─── Decorative 4-Point Golden Star SVG ─── */
function GoldenStar({ className, style }: { className: string; style?: React.CSSProperties }) {
  return (
    <svg viewBox="0 0 24 24" className={`w-5 h-5 text-[#eab308] fill-current animate-float ${className}`} style={style}>
      <path d="M12 0L14.8 9.2L24 12L14.8 14.8L12 24L9.2 14.8L0 12L9.2 9.2L12 0Z" />
    </svg>
  );
}

/* ─── Floating icon positions (desktop) ─── */
const iconPositions = [
  { top: '8%',   left: '4%',   delay: '0s' },
  { top: '0%',   right: '6%',  delay: '0.6s' },
  { bottom: '16%', right: '0%',  delay: '1.2s' },
  { bottom: '3%',  left: '6%',   delay: '1.8s' },
];

/* ─── Detail panel for a selected app ─── */
function AppDetailPanel({ app, onClose }: { app: AppEntry; onClose: () => void }) {
  const isVerbio = app.slug === 'verbio';
  return (
    <div className="animate-panel-expand mt-10 mx-auto max-w-4xl rounded-2xl bg-card border-2 border-clay/35 p-8 lg:p-10"
         style={{ boxShadow: '6px 6px 0 var(--color-clay)' }}>
      <div className="flex flex-col sm:flex-row items-start justify-between gap-8">
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-3 mb-4">
            <div className="flex h-11 w-11 items-center justify-center rounded-xl"
                 style={{ backgroundColor: `${app.accentColor}18` }}>
              <AppIcon slug={app.slug} color={app.accentColor} size={24} />
            </div>
            <h3 className="font-sans text-2xl font-bold text-ink tracking-tight">{app.name}</h3>
          </div>
          <p className="text-[16px] leading-relaxed text-ink-soft max-w-xl">{app.description}</p>
          {app.requiresAuth && (
            <p className="mt-4 text-[13px] text-ink-soft/70">
              Request access: <a href="mailto:mail@alfcolab.com" className="text-clay hover:underline font-semibold">mail@alfcolab.com</a>
            </p>
          )}
        </div>

        <div className="flex flex-col gap-3 min-w-[210px] w-full sm:w-auto">
          {isVerbio && app.webUrl ? (
            <a href={app.webUrl} target="_blank" rel="noopener noreferrer"
               className="flex items-center justify-center gap-2 rounded-xl bg-clay px-6 py-3.5 text-[14px] font-bold text-white hover:bg-[#c04d1a] hover:-translate-y-0.5 active:translate-y-0 transition-all duration-200 shadow-md">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><line x1="2" y1="12" x2="22" y2="12"/><path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/></svg>
              Open Web App
            </a>
          ) : (
            <span className="flex items-center justify-center gap-2 rounded-xl bg-edge/40 px-6 py-3.5 text-[14px] font-bold text-ink-soft/60 cursor-default border border-edge/30">
              Web App — Coming Soon
            </span>
          )}
          <span className="flex items-center justify-center gap-2 rounded-xl bg-edge/20 px-6 py-3 text-[13px] font-semibold text-ink-soft/50 cursor-default">
            iOS App — Coming Soon
          </span>
          <span className="flex items-center justify-center gap-2 rounded-xl bg-edge/20 px-6 py-3 text-[13px] font-semibold text-ink-soft/50 cursor-default">
            Android App — Coming Soon
          </span>
        </div>
      </div>
      <div className="mt-6 flex justify-end">
        <button onClick={onClose} className="text-[14px] font-bold text-ink-soft/60 hover:text-clay transition-colors cursor-pointer">
          Close Panel
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
      {/* Hero — fits beautifully in one viewport */}
      <section className="mx-auto max-w-6xl px-6 pt-8 sm:pt-12 lg:pt-16">
        <div className="flex flex-col lg:flex-row items-center justify-between gap-10 lg:gap-6">

          {/* Capybara + floating icons container */}
          <div className="relative w-full lg:w-[50%] flex justify-center">
            
            {/* SVG Golden Star sparkles */}
            <div className="absolute w-full h-full pointer-events-none" aria-hidden="true">
              <GoldenStar className="absolute top-[5%] left-[20%]" style={{ animationDelay: '0.2s', animationDuration: '4.5s' }} />
              <GoldenStar className="absolute top-[20%] right-[22%]" style={{ animationDelay: '0.8s', animationDuration: '5s' }} />
              <GoldenStar className="absolute bottom-[24%] left-[12%]" style={{ animationDelay: '1.4s', animationDuration: '4.2s' }} />
              <GoldenStar className="absolute bottom-[18%] right-[16%]" style={{ animationDelay: '2s', animationDuration: '5.5s' }} />
            </div>

            {/* Desktop floating premium icons */}
            <div className="hidden lg:block">
              {catalog.map((app, i) => {
                const pos = iconPositions[i];
                const isSelected = selectedApp?.slug === app.slug;
                
                return (
                  <button
                    key={app.slug}
                    onClick={() => handleIconClick(app)}
                    className={[
                      'absolute z-10 flex h-15 w-15 items-center justify-center rounded-[18px] border-2 cursor-pointer',
                      'transition-all duration-300 ease-out animate-icon-float group',
                      isSelected
                        ? 'scale-115 -translate-y-1'
                        : 'hover:-translate-y-1 hover:scale-110 active:scale-95',
                    ].join(' ')}
                    style={{
                      ...pos,
                      animationDelay: pos.delay,
                      borderColor: isSelected ? 'var(--color-clay)' : '#e05e26',
                      backgroundColor: isSelected ? `${app.accentColor}24` : '#fffdf9',
                      boxShadow: isSelected 
                        ? '4px 4px 0 var(--color-clay)' 
                        : '3px 3px 0 var(--color-clay)',
                    }}
                    aria-label={`Show details for ${app.name}`}
                    title={app.name}
                  >
                    <div className="transition-transform duration-300 group-hover:scale-110">
                      <AppIcon slug={app.slug} color={app.accentColor} />
                    </div>
                  </button>
                );
              })}
            </div>

            {/* Capybara image with mixBlendMode: multiply so it blends with background color */}
            <img
              src="/capybara-main.jpg"
              alt="Capybara mascot peacefully working at a desk with a two-handled cup"
              className="w-full max-w-[360px] lg:max-w-[400px] object-contain animate-float relative z-0"
              style={{ animationDuration: '5.5s', mixBlendMode: 'multiply' }}
            />
          </div>

          {/* Text */}
          <div className="w-full lg:w-[48%] text-center lg:text-left">
            <h1 className="font-sans text-[38px] leading-[1.08] font-bold tracking-tight text-[#3b2b24] sm:text-[48px] lg:text-[56px]">
              Everyday tasks,<br/>Simple tools
            </h1>
            <p className="mt-5 text-[17px] leading-relaxed text-[#5c4f48] max-w-[420px] mx-auto lg:mx-0">
              Streamline your daily operations with intuitive and effective digital tools, tailored to your unique needs.
            </p>
            <p className="mt-3 text-[13px] italic text-[#8a7b70]">
              Less stress. More calm.
            </p>
          </div>
        </div>

        {/* Mobile icon grid — shown below capybara on small screens */}
        <div className="lg:hidden mt-8 flex justify-center gap-5">
          {catalog.map((app) => {
            const isSelected = selectedApp?.slug === app.slug;
            return (
              <button
                key={app.slug}
                onClick={() => handleIconClick(app)}
                className={[
                  'flex h-14 w-14 items-center justify-center rounded-[18px] border-2 cursor-pointer',
                  'transition-all duration-300',
                  isSelected
                    ? 'scale-110'
                    : 'active:scale-95',
                ].join(' ')}
                style={{
                  borderColor: isSelected ? 'var(--color-clay)' : '#e05e26',
                  backgroundColor: isSelected ? `${app.accentColor}24` : '#fffdf9',
                  boxShadow: isSelected ? '3px 3px 0 var(--color-clay)' : '2px 2px 0 var(--color-clay)',
                }}
                aria-label={`Show details for ${app.name}`}
                title={app.name}
              >
                <AppIcon slug={app.slug} color={app.accentColor} />
              </button>
            );
          })}
        </div>

        {/* Expanded detail panel */}
        {selectedApp && (
          <AppDetailPanel app={selectedApp} onClose={() => setSelectedApp(null)} />
        )}
      </section>

      {/* Ko-fi Link — always present below cards */}
      <section className="mx-auto max-w-6xl px-6 py-10 text-center">
        <a
          href="https://ko-fi.com/alfcosolutions"
          target="_blank"
          rel="noopener noreferrer"
          className="group inline-flex items-center gap-3 rounded-2xl border-2 border-[#d97706]/35 bg-[#d97706]/5 px-8 py-3.5 text-[15px] font-bold text-[#b45309] hover:bg-[#d97706] hover:text-white hover:border-[#d97706] hover:-translate-y-1 hover:shadow-lg transition-all duration-300"
        >
          <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" stroke="none" className="transition-transform duration-300 group-hover:scale-110">
            <path d="M23.881 8.948c-.773-4.085-4.859-4.593-4.859-4.593H.723c-.604 0-.679.798-.679.798s-.082 7.324-.022 11.822c.164 2.424 2.586 2.672 2.586 2.672s8.267-.023 11.966-.049c2.438-.426 2.683-2.566 2.658-3.143V14.1s4.444.665 6.138-1.574c1.396-1.848 1.139-3.393.511-3.578zm-5.066 3.652s-3.793.528-3.793.528V6.997s4.453.513 4.453 1.942c0 1.428-1.077 3.661-.66 3.661z"/>
          </svg>
          Buy us a coffee on Ko-fi
        </a>
      </section>

      {/* Motto banner */}
      <section className="mx-auto max-w-4xl px-6 pb-8">
        <div className="rounded-2xl bg-[#f5ece0] px-8 py-5 text-center">
          <p className="font-sans text-[17px] font-semibold text-[#5c4f48] tracking-tight">
            Everyday tasks + Simple tools = Less stress.
          </p>
        </div>
      </section>
    </>
  );
}
