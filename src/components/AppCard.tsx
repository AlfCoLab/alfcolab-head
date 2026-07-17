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
  const config = getStatusConfig(app.status);

  return (
    <Link
      to={`/app/${app.slug}`}
      aria-label={`${app.name} — ${app.shortDescription}`}
      className={[
        'group relative flex flex-col overflow-hidden rounded-card bg-card border border-edge',
        'shadow-card transition-all duration-200 hover:-translate-y-0.5 hover:shadow-lift',
        'focus-visible:-translate-y-0.5',
        compact ? 'w-60 p-4' : 'p-6',
      ].join(' ')}
    >
      {/* Accent top bar — the app's own color, visible at a glance */}
      <span
        className="absolute inset-x-0 top-0 h-1"
        style={{ backgroundColor: app.accentColor }}
        aria-hidden="true"
      />

      <div className="flex items-start justify-between gap-3">
        <div className="min-w-0">
          <h3 className={`font-sans font-semibold text-ink ${compact ? 'text-base' : 'text-lg'}`}>
            {app.name}
          </h3>
          <p className="mt-0.5 text-xs uppercase tracking-wide text-ink-soft/70">
            {app.humanActivity}
          </p>
        </div>
        <StatusBadge app={app} />
      </div>

      <p className={`mt-3 text-ink-soft ${compact ? 'text-sm line-clamp-2' : 'text-sm'}`}>
        {app.shortDescription}
      </p>

      <div className="mt-auto flex items-center pt-4">
        <span
          className={`inline-flex items-center gap-1.5 text-sm font-medium ${config.textClass} transition-all group-hover:gap-2.5`}
        >
          {config.cta}
          <ArrowRight size={14} strokeWidth={2.25} />
        </span>
      </div>
    </Link>
  );
}
