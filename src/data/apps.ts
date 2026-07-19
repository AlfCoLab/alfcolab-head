import type { AppEntry } from '../types';

/**
 * Alfcolab apps registry.
 *
 * Single source of truth for the hub. Add/edit apps here; the homepage,
 * catalog, and `/app/:slug` pages all read from this array.
 *
 * Subdomain convention: `<slug>.alfcolab.com`.
 */
export const apps: AppEntry[] = [
  {
    slug: 'verbio',
    name: 'Verbio',
    status: 'testing',
    category: 'language-learning',
    humanActivity: 'Language learning',
    shortDescription: 'Master all 148 English irregular verbs.',
    description:
      'Verbio is a calm, browser-based trainer for the 148 English irregular verbs. It mixes an adaptive spaced-repetition queue (Deep Memory), rhyme-based recall, and timed sprints, so every session picks up exactly where your memory is slipping. Works online with cross-device sync and offline as an installable PWA — your verbs are always one tab away.',
    tagline: 'Master English irregular verbs with simple daily practice.',
    accentColor: '#d97706', /* Orange */
    showInCatalog: true,
    requiresAuth: false,
    webUrl: 'https://verbio.alfcolab.com',
    mobileStoreUrls: { ios: null, android: null },
    desktopDownloadUrl: null,
    /* statusLabel: null → falls back to "beta version" via getStatusConfig('testing'). */
    statusLabel: null,
  },
  {
    slug: 'app-2',
    name: 'Under construction',
    status: 'development',
    category: 'productivity',
    humanActivity: 'Document Organizer',
    shortDescription: 'Streamline your daily operations, with intuitive document and organizers.',
    description: 'This application is currently under construction and will be available in the future.',
    tagline: 'Something new is brewing.',
    accentColor: '#eab308', /* Yellow */
    showInCatalog: true,
    requiresAuth: true,
    webUrl: null,
    mobileStoreUrls: { ios: null, android: null },
    desktopDownloadUrl: null,
    statusLabel: 'under construction',
  },
  {
    slug: 'app-3',
    name: 'Under construction',
    status: 'development',
    category: 'productivity',
    humanActivity: 'Project Tracker',
    shortDescription: 'Manage your payments and organization in project tracker.',
    description: 'This application is currently under construction and will be available in the future.',
    tagline: 'Something new is brewing.',
    accentColor: '#16a34a', /* Green */
    showInCatalog: true,
    requiresAuth: true,
    webUrl: null,
    mobileStoreUrls: { ios: null, android: null },
    desktopDownloadUrl: null,
    statusLabel: 'under construction',
  },
  {
    slug: 'app-4',
    name: 'Under construction',
    status: 'development',
    category: 'productivity',
    humanActivity: 'Client Portal',
    shortDescription: 'Digitize your client connectivity or workflows, with your client needs.',
    description: 'This application is currently under construction and will be available in the future.',
    tagline: 'Something new is brewing.',
    accentColor: '#0284c7', /* Blue */
    showInCatalog: true,
    requiresAuth: true,
    webUrl: null,
    mobileStoreUrls: { ios: null, android: null },
    desktopDownloadUrl: null,
    statusLabel: 'under construction',
  },
  {
    // The hub itself — referenced by spec section "/app/head".
    slug: 'head',
    name: 'HEAD',
    status: 'ready',
    category: 'platform',
    humanActivity: 'Navigating apps',
    shortDescription: 'The central hub and catalog for Alfcolab.',
    description:
      'HEAD is alfcolab.com — the calm front door to every Alfcolab app, site, and experiment. It is the single place to see what is ready, what is in beta, and what is still being shaped.',
    tagline: 'The central hub for Alfcolab apps.',
    accentColor: '#0F212E',
    showInCatalog: true,
    requiresAuth: false,
    webUrl: 'https://alfcolab.com',
    mobileStoreUrls: { ios: null, android: null },
    desktopDownloadUrl: null,
    statusLabel: null,
  },
];
