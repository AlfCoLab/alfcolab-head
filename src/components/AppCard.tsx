import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import type { AppEntry } from '../types';
import { getStatusConfig } from '../lib/apps';
import { StatusBadge } from './StatusBadge';

/**
 * AppCard — the catalog card.
 *
 * Clicking ALWAYS routes to `/app/:slug`, never directly to the subdomain
 * (spec rule: the user first lands on the marketing/routing page). The
 * per-app accent appears as a thin top bar and the activity tag, keeping
 * the card itself within the neutral Dolce Vita chrome.
 */
interface AppCardProps {
  app: AppEntry;
  /** Compact mode for the orbit (smaller padding, fixed width). */
  compact?: boolean;
}

export function AppCard({ app, compact = false }: AppCardProps) {
  // Convert hex accent color to a very light transparent background for the icon box
  const iconBg = app.accentColor.startsWith('#') 
    ? `${app.accentColor}20` 
    : 'rgba(217, 119, 6, 0.1)';

  return (
    <Link
      to={`/app/${app.slug}`}
      aria-label={`${app.name} — ${app.shortDescription}`}
      className="group relative flex flex-col rounded-[18px] bg-card border-[2px] border-[#e05e26]/30 p-6 transition-all duration-200 hover:-translate-y-1"
      style={{ boxShadow: 'var(--shadow-retro)' }}
    >
      <div className="flex items-start justify-between gap-3 mb-4">
        {/* Icon Box */}
        <div 
          className="flex h-12 w-12 items-center justify-center rounded-xl"
          style={{ backgroundColor: iconBg, color: app.accentColor }}
        >
          {/* We'll just render a placeholder icon if we don't have lucide icons mapped in data, or use a generic one */}
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect>
            <path d="M9 12l2 2 4-4"></path>
          </svg>
        </div>
        <StatusBadge app={app} />
      </div>

      <div className="min-w-0">
        <h3 className="font-sans font-bold text-ink text-[19px] tracking-tight">
          {app.name}
        </h3>
        <p className="mt-2 text-[14px] leading-[1.5] text-ink-soft">
          {app.shortDescription}
        </p>
      </div>
    </Link>
  );
}
