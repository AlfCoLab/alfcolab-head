/**
 * Alfcolab apps registry — shared types.
 *
 * The registry is the single source of truth for every app shown on the hub.
 * Components must never hardcode an app; they read from `src/data/apps.ts`.
 */

export type AppStatus = 'development' | 'testing' | 'ready';

export interface AppStoreUrls {
  ios: string | null;
  android: string | null;
}

export interface AppEntry {
  /** URL slug, used for `/app/:slug` and the subdomain `<slug>.alfcolab.com`. */
  slug: string;
  /** Display name, e.g. "Verbio". */
  name: string;
  status: AppStatus;
  /** Machine category, e.g. "language-learning". */
  category: string;
  /** Human-readable activity the app belongs to, e.g. "Language learning". */
  humanActivity: string;
  shortDescription: string;
  description: string;
  tagline: string;
  /** Per-app accent color (CSS color). Overrides the site palette on `/app/:slug`. */
  accentColor: string;
  showInCatalog: boolean;
  /** Whether viewing the app link requires an authenticated session. */
  requiresAuth: boolean;
  webUrl: string | null;
  mobileStoreUrls: AppStoreUrls;
  desktopDownloadUrl: string | null;
  /** Short label shown in the status badge, e.g. "beta version". */
  statusLabel: string | null;
}

export interface StatusConfig {
  /** Tailwind text color utility, e.g. "text-ready". */
  textClass: string;
  /** Tailwind background tint utility, e.g. "bg-ready/10". */
  bgClass: string;
  /** Solid dot color utility. */
  dotClass: string;
  /** Default badge label when `statusLabel` is null. */
  defaultLabel: string;
  /** CTA verb phrase for the open button. */
  cta: string;
}
