import type { AppEntry } from '../types';
import { getStatusConfig, getStatusLabel } from '../lib/apps';

/**
 * StatusBadge — compact status pill for cards and app pages.
 *
 * - ready   → calm green dot, no label needed
 * - testing → amber dot, "beta version" label (spec mandates this is visible)
 * - development → muted dot, "private preview"
 *
 * The label can be overridden per-app via `AppEntry.statusLabel`.
 */
interface StatusBadgeProps {
  app: AppEntry;
  /** When true, renders a larger badge suitable for the app-page hero. */
  size?: 'sm' | 'md';
}

export function StatusBadge({ app, size = 'sm' }: StatusBadgeProps) {
  const config = getStatusConfig(app.status);
  const label = getStatusLabel(app);
  const padding = size === 'md' ? 'px-3 py-1.5 text-sm' : 'px-2.5 py-1 text-xs';
  const dot = size === 'md' ? 'h-2 w-2' : 'h-1.5 w-1.5';

  return (
    <span
      className={`inline-flex items-center gap-1.5 rounded-full font-sans font-medium ${config.bgClass} ${config.textClass} ${padding}`}
    >
      <span className={`${dot} rounded-full ${config.dotClass}`} aria-hidden="true" />
      {label}
    </span>
  );
}
