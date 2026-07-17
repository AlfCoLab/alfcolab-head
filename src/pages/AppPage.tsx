import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import type { Session } from '@supabase/supabase-js';
import { getAppBySlug } from '../lib/apps';
import { isSupabaseConfigured, supabase } from '../lib/supabase';
import { useDocumentMeta } from '../hooks/useDocumentMeta';
import { NotFoundPage } from './NotFoundPage';
import { StatusBadge } from '../components/StatusBadge';
import { PlatformLinks } from '../components/PlatformLinks';
import { RestrictedAccess } from '../components/RestrictedAccess';
import { VerbioMark } from '../components/VerbioMark';

/**
 * AppPage — `/app/:slug`
 *
 * Dynamic, status-driven marketing + routing page. Per spec this is always
 * the first stop from a catalog card — the user lands here before going to
 * the app's subdomain.
 *
 * Status logic:
 *   - ready → public page, full content, platform links
 *   - testing / development → requiresAuth; restricted screen until a real
 *     Supabase session exists, then reveals the preview/beta link
 */
export function AppPage() {
  const { slug = '' } = useParams<{ slug: string }>();
  const app = getAppBySlug(slug);

  const [session, setSession] = useState<Session | null>(null);
  const [authReady, setAuthReady] = useState(!isSupabaseConfigured);

  // Subscribe to the Supabase auth session when configured. No-op otherwise.
  useEffect(() => {
    if (!supabase) {
      setAuthReady(true);
      return;
    }
    let active = true;
    supabase.auth
      .getSession()
      .then(({ data }) => {
        if (active) {
          setSession(data.session);
          setAuthReady(true);
        }
      })
      .catch(() => {
        if (active) setAuthReady(true);
      });
    const { data: sub } = supabase.auth.onAuthStateChange((_event, newSession) => {
      setSession(newSession);
    });
    return () => {
      active = false;
      sub.subscription.unsubscribe();
    };
  }, []);

  // Hook must run unconditionally on every render path (Rules of Hooks),
  // so compute its arguments defensively before the early return.
  useDocumentMeta(
    app ? `${app.name} — Alfcolab` : 'Not found — Alfcolab',
    app?.shortDescription,
  );

  // Unknown slug → 404. (NotFoundPage sets its own meta.)
  if (!app) return <NotFoundPage />;

  const isAuthenticated = Boolean(session);
  const isAdmin = session?.user?.email === 'alfico2025@gmail.com';
  const needsAuth = app.status !== 'ready';
  
  let showRestricted = needsAuth && !isAuthenticated;
  if (app.slug === 'verbio') {
    showRestricted = !isAdmin;
  }

  return (
    <article>
      {/* App Hero — carries the app's own accent (per design.md freedom) */}
      <header
        className="border-b border-edge"
        style={{
          background: `linear-gradient(180deg, ${app.accentColor}14, transparent)`,
        }}
      >
        <div className="mx-auto max-w-4xl px-6 py-12">
          <Link
            to="/apps"
            className="inline-flex items-center gap-1.5 text-sm text-ink-soft hover:text-clay transition-colors"
          >
            <ArrowLeft size={14} />
            Back to catalog
          </Link>

          <div className="mt-6 flex items-start gap-4">
            <AppGlyph slug={app.slug} accent={app.accentColor} />
            <div>
              <div className="flex flex-wrap items-center gap-3">
                <h1 className="font-sans text-3xl font-semibold tracking-tight text-ink sm:text-4xl">
                  {app.name}
                </h1>
                <StatusBadge app={app} size="md" />
              </div>
              <p className="mt-2 font-sans text-lg text-ink-soft">{app.tagline}</p>
            </div>
          </div>
        </div>
      </header>

      <div className="mx-auto max-w-4xl px-6 py-12">
        {/* Description */}
        <section>
          <h2 className="font-sans text-lg font-semibold text-ink">About</h2>
          <p className="mt-3 leading-relaxed text-ink-soft">{app.description}</p>
          <p className="mt-4 text-sm text-ink-soft/70">
            Belongs to:{' '}
            <span className="font-medium text-ink-soft">{app.humanActivity}</span>
          </p>
        </section>

        {/* Status & access summary */}
        <section className="mt-12">
          <h2 className="font-sans text-lg font-semibold text-ink">Status & access</h2>
          <p className="mt-3 text-ink-soft">{accessCopy(app.status, isAuthenticated)}</p>
        </section>

        {/* Platform links OR restricted gate */}
        <section className="mt-12">
          <h2 className="mb-4 font-sans text-lg font-semibold text-ink">
            {showRestricted ? 'Access' : 'Use it'}
          </h2>
          {!authReady ? (
            <p className="text-sm text-ink-soft/60">Checking access…</p>
          ) : showRestricted ? (
            <RestrictedAccess app={app} />
          ) : (
            <PlatformLinks app={app} authenticated={isAuthenticated} />
          )}
        </section>
      </div>
    </article>
  );
}

/** Friendly status-specific copy, in the steady Brand Book voice. */
function accessCopy(status: AppEntryStatus, authenticated: boolean): string {
  switch (status) {
    case 'ready':
      return 'The production version is available. Public access, no sign-in needed.';
    case 'testing':
      return authenticated
        ? 'You are signed in. The beta version is available below.'
        : 'Beta testing is open, but access requires sign-in.';
    case 'development':
      return authenticated
        ? 'You are signed in. A private preview is available below.'
        : 'This app is currently in private development. Login is required to access the preview.';
  }
}

type AppEntryStatus = 'development' | 'testing' | 'ready';

/** Renders the right glyph for an app — falls back to an accent disc. */
function AppGlyph({ slug, accent }: { slug: string; accent: string }) {
  if (slug === 'verbio') return <VerbioMark size={64} />;
  // Generic monogram disc in the app's accent color.
  return (
    <div
      className="flex h-16 w-16 items-center justify-center rounded-card text-2xl font-sans font-semibold text-white shadow-card"
      style={{ backgroundColor: accent }}
      aria-hidden="true"
    >
      {slug.charAt(0).toUpperCase()}
    </div>
  );
}
