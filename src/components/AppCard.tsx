import { Link } from 'react-router-dom';
import type { AppEntry } from '../types';
import { StatusBadge } from './StatusBadge';

/**
 * AppCard — the catalog card with unique icons per app and dynamic hover.
 *
 * Per project rules: cards must NOT be static. They use hover states,
 * subtle scaling, and dynamic shadows.
 */

/* Map each app slug to a unique SVG icon */
function AppIcon({ slug, color }: { slug: string; color: string }) {
  const props = { width: 26, height: 26, viewBox: '0 0 24 24', fill: 'none', stroke: color, strokeWidth: 2, strokeLinecap: 'round' as const, strokeLinejoin: 'round' as const };

  switch (slug) {
    case 'verbio':
      return (
        <svg {...props}>
          <path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20" />
          <path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z" />
          <path d="M8 7h8M8 11h6" />
        </svg>
      );
    case 'app-2':
      return (
        <svg {...props}>
          <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
          <polyline points="14 2 14 8 20 8" />
          <line x1="16" y1="13" x2="8" y2="13" />
          <line x1="16" y1="17" x2="8" y2="17" />
        </svg>
      );
    case 'app-3':
      return (
        <svg {...props}>
          <polyline points="22 12 18 12 15 21 9 3 6 12 2 12" />
        </svg>
      );
    case 'app-4':
      return (
        <svg {...props}>
          <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
          <circle cx="9" cy="7" r="4" />
          <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
          <path d="M16 3.13a4 4 0 0 1 0 7.75" />
        </svg>
      );
    default:
      return (
        <svg {...props}>
          <rect x="3" y="3" width="18" height="18" rx="2" ry="2" />
          <path d="M9 12l2 2 4-4" />
        </svg>
      );
  }
}

interface AppCardProps {
  app: AppEntry;
}

export function AppCard({ app }: AppCardProps) {
  const iconBg = app.accentColor.startsWith('#')
    ? `${app.accentColor}18`
    : 'rgba(217, 119, 6, 0.08)';

  return (
    <Link
      to={`/app/${app.slug}`}
      aria-label={`${app.name} — ${app.shortDescription}`}
      className="group relative flex flex-col rounded-[18px] bg-card border-[2px] border-[#e05e26]/25 p-6 transition-all duration-300 ease-out hover:-translate-y-2 hover:scale-[1.03] hover:shadow-[6px_6px_0_#d97706] cursor-pointer"
      style={{ boxShadow: '4px 4px 0 #d97706' }}
    >
      <div className="flex items-start justify-between gap-3 mb-4">
        {/* Icon Box — unique per app */}
        <div
          className="flex h-12 w-12 items-center justify-center rounded-xl transition-transform duration-300 group-hover:scale-110 group-hover:rotate-3"
          style={{ backgroundColor: iconBg }}
        >
          <AppIcon slug={app.slug} color={app.accentColor} />
        </div>
        <StatusBadge app={app} />
      </div>

      <div className="min-w-0">
        <h3 className="font-sans font-bold text-ink text-[19px] tracking-tight group-hover:text-clay transition-colors duration-300">
          {app.name}
        </h3>
        <p className="mt-2 text-[14px] leading-[1.5] text-ink-soft">
          {app.shortDescription}
        </p>
      </div>
    </Link>
  );
}
