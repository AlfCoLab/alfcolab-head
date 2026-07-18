import { useState } from 'react';
import { getCatalogApps } from '../lib/apps';
import { useDocumentMeta } from '../hooks/useDocumentMeta';
import type { AppEntry } from '../types';

/* ─── Large filled app-icon SVGs (iOS-style, matching mockup) ─── */
function AppIconLarge({ slug }: { slug: string }) {
  const size = 36;
  const common = { width: size, height: size, viewBox: '0 0 24 24', fill: 'none', strokeLinecap: 'round' as const, strokeLinejoin: 'round' as const };

  switch (slug) {
    case 'verbio':
      // Book icon — filled green
      return (
        <svg {...common}>
          <path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20" stroke="#15803d" strokeWidth="2" />
          <path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z" fill="#15803d" fillOpacity="0.15" stroke="#15803d" strokeWidth="2" />
          <path d="M8 7h8M8 11h6" stroke="#15803d" strokeWidth="2" />
        </svg>
      );
    case 'app-2':
      // Document/Notes icon — filled orange
      return (
        <svg {...common}>
          <rect x="4" y="2" width="16" height="20" rx="2" fill="#ea580c" fillOpacity="0.15" stroke="#ea580c" strokeWidth="2" />
          <path d="M8 6h8M8 10h8M8 14h5" stroke="#ea580c" strokeWidth="2" />
        </svg>
      );
    case 'app-3':
      // Chart/Analytics icon — filled green
      return (
        <svg {...common}>
          <rect x="2" y="2" width="20" height="20" rx="3" fill="#16a34a" fillOpacity="0.12" stroke="none" />
          <rect x="5" y="13" width="3.5" height="7" rx="1" fill="#16a34a" />
          <rect x="10.25" y="8" width="3.5" height="12" rx="1" fill="#16a34a" />
          <rect x="15.5" y="4" width="3.5" height="16" rx="1" fill="#16a34a" />
          <path d="M6 10L11 6L16 8L19 3" stroke="#16a34a" strokeWidth="1.8" fill="none" />
          <circle cx="19" cy="3" r="1.2" fill="#16a34a" />
        </svg>
      );
    case 'app-4':
      // People/Community icon — filled blue
      return (
        <svg {...common}>
          <circle cx="9" cy="7" r="3.5" fill="#2563eb" fillOpacity="0.2" stroke="#2563eb" strokeWidth="1.5" />
          <path d="M2 20c0-3.3 2.7-6 6-6h2c3.3 0 6 2.7 6 6" fill="#2563eb" fillOpacity="0.15" stroke="#2563eb" strokeWidth="1.5" />
          <circle cx="17" cy="8" r="2.5" fill="#2563eb" fillOpacity="0.25" stroke="#2563eb" strokeWidth="1.5" />
          <path d="M18 14c2.2 0.5 4 2.5 4 5" stroke="#2563eb" strokeWidth="1.5" />
        </svg>
      );
    default:
      return (
        <svg {...common}>
          <rect x="3" y="3" width="18" height="18" rx="3" fill="#6b7280" fillOpacity="0.15" stroke="#6b7280" strokeWidth="2" />
          <path d="M9 12l2 2 4-4" stroke="#6b7280" strokeWidth="2" />
        </svg>
      );
  }
}

/* Decorative Golden Star Sparkle */
function GoldenStar({ className, style }: { className: string; style?: React.CSSProperties }) {
  return (
    <svg viewBox="0 0 24 24" className={`w-3 h-3 text-[#eab308] fill-current animate-float ${className}`} style={style}>
      <path d="M12 0L14.8 9.2L24 12L14.8 14.8L12 24L9.2 14.8L0 12L9.2 9.2L12 0Z" />
    </svg>
  );
}

/* Icon positions around the capybara (desktop) — matching mockup layout */
const iconPositions = [
  { top: '12%',  left: '2%',   delay: '0s' },     // Top-left (Verbio/Resources)
  { top: '4%',   left: '42%',  delay: '0.6s' },    // Top-center (Notes)
  { bottom: '30%', right: '0%',  delay: '1.2s' },  // Right-middle (Analytics)
  { bottom: '48%', left: '-4%',  delay: '1.8s' },  // Left-bottom (Community)
];

/* Human-readable labels for the app icons */
const appLabels: Record<string, string> = {
  'verbio': 'Verbio',
  'app-2': 'Notes',
  'app-3': 'Analytics',
  'app-4': 'Community',
};

/* Pastel background colors for each icon tile (matching mockup) */
const iconBgColors: Record<string, string> = {
  'verbio': '#dcfce7',   // Soft green
  'app-2': '#fff1e0',    // Soft peach/orange
  'app-3': '#dcfce7',    // Soft green
  'app-4': '#dbeafe',    // Soft blue
};

/* Border colors for selected state */
const iconBorderSelected: Record<string, string> = {
  'verbio': '#22c55e',
  'app-2': '#f59e0b',
  'app-3': '#22c55e',
  'app-4': '#3b82f6',
};

/* ─── Detail panel (matching expanded mockup) ─── */
function AppDetailPanel({ app, onClose }: { app: AppEntry; onClose: () => void }) {
  const isVerbio = app.slug === 'verbio';
  return (
    <div
      className="animate-panel-expand mt-8 mx-auto max-w-5xl rounded-2xl bg-card border-2 p-8 md:p-10"
      style={{
        animationDuration: '0.3s',
        borderColor: '#d97706',
        boxShadow: '4px 4px 0 #d97706',
      }}
    >
      <div className="flex flex-col md:flex-row md:items-start justify-between gap-6">
        <div className="flex-1 min-w-0">
          <h3 className="font-sans text-3xl font-extrabold text-ink tracking-tight">
            {appLabels[app.slug] || app.name}
          </h3>
          <p className="mt-3 text-[16px] text-ink-soft leading-relaxed max-w-xl">
            {isVerbio
              ? 'Master all 148 English irregular verbs with calm, browser-based training. Adaptive spaced repetition, rhyme-based recall, and timed sprints.'
              : app.description}
          </p>
          <p className="mt-5 text-[13px] text-ink-soft/70">
            Request access:{' '}
            <a href="mailto:mail@alfcolab.com" className="text-clay hover:underline font-semibold">
              mail@alfcolab.com
            </a>
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-3 pt-1">
          {isVerbio && app.webUrl ? (
            <a
              href={app.webUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center rounded-xl bg-[#16a34a] px-7 py-3.5 text-[15px] font-bold text-white hover:bg-[#148f40] transition-colors shadow-sm"
            >
              Open Web App
            </a>
          ) : (
            <span className="flex items-center justify-center rounded-xl bg-edge/30 px-6 py-3.5 text-[15px] font-semibold text-ink-soft/50 cursor-default">
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
      {/* Main hero section — fits in one viewport */}
      <section className="mx-auto max-w-6xl px-6 pt-6 sm:pt-8 lg:pt-10">
        <div className="flex flex-col lg:flex-row items-center justify-between gap-6 lg:gap-4">

          {/* Left side: Capybara with floating app icon tiles */}
          <div className="relative w-full lg:w-[55%] flex justify-center" style={{ minHeight: '380px' }}>

            {/* Decorative sparkles */}
            <div className="absolute w-full h-full pointer-events-none" aria-hidden="true">
              <GoldenStar className="absolute top-[10%] left-[28%]" style={{ animationDelay: '0.2s', animationDuration: '4.5s' }} />
              <GoldenStar className="absolute top-[22%] right-[30%]" style={{ animationDelay: '0.8s', animationDuration: '5s' }} />
              <GoldenStar className="absolute bottom-[32%] left-[18%]" style={{ animationDelay: '1.4s', animationDuration: '4.2s' }} />
              <GoldenStar className="absolute bottom-[20%] right-[22%]" style={{ animationDelay: '2.0s', animationDuration: '3.8s' }} />
            </div>

            {/* Desktop: Large floating app-icon tiles around capybara */}
            <div className="hidden lg:block">
              {catalog.map((app, i) => {
                const pos = iconPositions[i];
                const isSelected = selectedApp?.slug === app.slug;
                const bg = iconBgColors[app.slug] || '#f3f4f6';
                const borderColor = isSelected ? (iconBorderSelected[app.slug] || '#d97706') : 'transparent';

                return (
                  <div
                    key={app.slug}
                    className="absolute z-10 flex flex-col items-center gap-1.5 animate-icon-float"
                    style={{
                      ...pos,
                      animationDelay: pos.delay,
                    }}
                  >
                    <button
                      onClick={() => handleIconClick(app)}
                      className="flex items-center justify-center cursor-pointer transition-all duration-300 ease-out"
                      style={{
                        width: '80px',
                        height: '80px',
                        borderRadius: '22px',
                        backgroundColor: bg,
                        border: `3px solid ${borderColor}`,
                        boxShadow: isSelected
                          ? '0 8px 24px rgba(0,0,0,0.12)'
                          : '0 2px 8px rgba(0,0,0,0.06)',
                        transform: isSelected ? 'scale(1.1)' : 'scale(1)',
                      }}
                      onMouseEnter={e => {
                        if (!isSelected) {
                          (e.currentTarget as HTMLButtonElement).style.transform = 'scale(1.08)';
                          (e.currentTarget as HTMLButtonElement).style.boxShadow = '0 6px 20px rgba(0,0,0,0.1)';
                        }
                      }}
                      onMouseLeave={e => {
                        if (!isSelected) {
                          (e.currentTarget as HTMLButtonElement).style.transform = 'scale(1)';
                          (e.currentTarget as HTMLButtonElement).style.boxShadow = '0 2px 8px rgba(0,0,0,0.06)';
                        }
                      }}
                      aria-label={`Open ${appLabels[app.slug]} details`}
                    >
                      <AppIconLarge slug={app.slug} />
                    </button>
                    <span className="text-[13px] font-semibold text-ink-soft select-none mt-1">
                      {appLabels[app.slug]}
                    </span>
                  </div>
                );
              })}
            </div>

            {/* Capybara image — 2D cartoon style, mix-blend-mode: multiply */}
            <img
              src="/capybara-main.jpg"
              alt="Capybara mascot peacefully working at a desk with a two-handled cup"
              className="w-full max-w-[320px] lg:max-w-[360px] object-contain animate-float relative z-0"
              style={{ animationDuration: '6s', mixBlendMode: 'multiply' }}
            />
          </div>

          {/* Right side: Headline text */}
          <div className="w-full lg:w-[43%] text-center lg:text-left">
            <h1 className="font-sans text-[42px] leading-[1.08] font-black tracking-tight text-[#0f212e] sm:text-[52px] lg:text-[58px]">
              Everyday tasks,<br/>Simple tools
            </h1>
            <p className="mt-5 text-[17px] leading-relaxed text-ink-soft max-w-[420px] mx-auto lg:mx-0">
              Simplify your workflow and boost productivity with our intuitive platform.
            </p>
            <p className="mt-3 text-[13px] italic text-ink-soft/60">
              Less stress. More calm.
            </p>
          </div>
        </div>

        {/* Mobile: 2×2 icon grid below capybara */}
        <div className="lg:hidden mt-8 max-w-xs mx-auto">
          <div className="grid grid-cols-2 gap-5 justify-items-center">
            {catalog.map((app) => {
              const isSelected = selectedApp?.slug === app.slug;
              const bg = iconBgColors[app.slug] || '#f3f4f6';
              const borderColor = isSelected ? (iconBorderSelected[app.slug] || '#d97706') : 'transparent';

              return (
                <div key={app.slug} className="flex flex-col items-center gap-2">
                  <button
                    onClick={() => handleIconClick(app)}
                    className="flex items-center justify-center cursor-pointer transition-all duration-300"
                    style={{
                      width: '76px',
                      height: '76px',
                      borderRadius: '20px',
                      backgroundColor: bg,
                      border: `3px solid ${borderColor}`,
                      boxShadow: isSelected
                        ? '0 6px 20px rgba(0,0,0,0.1)'
                        : '0 2px 8px rgba(0,0,0,0.05)',
                      transform: isSelected ? 'scale(1.08)' : 'scale(1)',
                    }}
                    aria-label={`Open ${appLabels[app.slug]} details`}
                  >
                    <AppIconLarge slug={app.slug} />
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
      <section className="mx-auto max-w-6xl px-6 py-5 text-center">
        <a
          href="https://ko-fi.com/alfcosolutions"
          target="_blank"
          rel="noopener noreferrer"
          className="text-[14px] font-bold text-ink-soft/70 hover:text-clay underline transition-colors"
        >
          Buy us a coffee on Ko-fi ☕
        </a>
      </section>

      {/* Bottom CTA bubble (matching mockup — simple blue bubble, no 3D banner) */}
      <section className="mx-auto max-w-3xl px-6 pb-8">
        <div
          className="rounded-2xl px-8 py-5 text-center"
          style={{
            backgroundColor: '#dbeafe',
            color: '#1e3a5f',
          }}
        >
          <p className="text-[16px] font-medium">
            Join us and make work effortless. Start your journey today.
          </p>
        </div>
      </section>
    </>
  );
}
