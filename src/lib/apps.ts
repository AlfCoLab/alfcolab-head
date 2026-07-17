import type { AppEntry, AppStatus, StatusConfig } from '../types';
import { apps } from '../data/apps';

/** Return every app flagged for public catalog display. */
export function getCatalogApps(): AppEntry[] {
  return apps.filter((app) => app.showInCatalog);
}

/** Look up a single app by slug. Returns undefined when not found. */
export function getAppBySlug(slug: string): AppEntry | undefined {
  return apps.find((app) => app.slug === slug);
}

/** All known slugs — useful for generating routes or validation. */
export function getSlugs(): string[] {
  return apps.map((app) => app.slug);
}

/**
 * Per-status styling and copy. Centralized so cards, badges, and the app
 * page all agree on what each status looks and sounds like.
 */
export function getStatusConfig(status: AppStatus): StatusConfig {
  switch (status) {
    case 'ready':
      return {
        textClass: 'text-ready',
        bgClass: 'bg-ready/10',
        dotClass: 'bg-ready',
        defaultLabel: 'ready',
        cta: 'Open app',
      };
    case 'testing':
      return {
        textClass: 'text-beta',
        bgClass: 'bg-beta/10',
        dotClass: 'bg-beta',
        defaultLabel: 'beta version',
        cta: 'Open beta',
      };
    case 'development':
      return {
        textClass: 'text-dev',
        bgClass: 'bg-dev/10',
        dotClass: 'bg-dev',
        defaultLabel: 'private preview',
        cta: 'Request access',
      };
  }
}

/** Resolve the label to show in a status badge (explicit label wins). */
export function getStatusLabel(app: AppEntry): string {
  return app.statusLabel ?? getStatusConfig(app.status).defaultLabel;
}
