import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import type { Session } from '@supabase/supabase-js';
import { getAppBySlug } from '../lib/apps';
import { isSupabaseConfigured, supabase } from '../lib/supabase';
import { useDocumentMeta } from '../hooks/useDocumentMeta';
import { useLanguage } from '../context/LanguageContext';
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
 */
export function AppPage() {
  const { slug = '' } = useParams<{ slug: string }>();
  const app = getAppBySlug(slug);
  const { t } = useLanguage();

  const [session, setSession] = useState<Session | null>(null);
  const [authReady, setAuthReady] = useState(!isSupabaseConfigured);
  const [cardFlipped, setCardFlipped] = useState(false);

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

  useDocumentMeta(
    app ? `${app.name} — Alfcolab` : 'Not found — Alfcolab',
    app?.shortDescription,
  );

  if (!app) return <NotFoundPage />;

  const isAuthenticated = Boolean(session);
  const showRestricted = app.status === 'development' && !isAuthenticated;
  const isVerbio = app.slug === 'verbio';

  return (
    <article>
      {/* App Hero */}
      <header
        className="border-b border-edge"
        style={{
          background: `linear-gradient(180deg, ${app.accentColor}14, transparent)`,
        }}
      >
        <div className="mx-auto max-w-5xl px-6 py-10 sm:py-12">
          <Link
            to="/"
            className="inline-flex items-center gap-1.5 text-sm font-semibold text-ink-soft hover:text-clay transition-colors"
          >
            <ArrowLeft size={16} />
            {t('nav.backToLab')}
          </Link>

          <div className="mt-6 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
            <div className="flex items-start gap-4">
              <AppGlyph slug={app.slug} accent={app.accentColor} />
              <div>
                <div className="flex flex-wrap items-center gap-3">
                  <h1 className="font-sans text-3xl font-extrabold tracking-tight text-ink sm:text-4xl">
                    {app.name}
                  </h1>
                  <StatusBadge app={app} size="md" />
                </div>
                <p className="mt-2 font-sans text-base sm:text-lg text-ink-soft">
                  {isVerbio ? t('verbio.tagline') : app.tagline}
                </p>
              </div>
            </div>

            {/* Direct Web App Link */}
            {isVerbio && (
              <a
                href={app.webUrl || 'https://verbio.alfcolab.com'}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center rounded-xl bg-ink px-6 py-3 text-sm font-bold text-white hover:bg-stone-800 transition-all shadow-sm shrink-0"
              >
                {t('btn.openWebApp')} →
              </a>
            )}
          </div>
        </div>
      </header>

      <div className="mx-auto max-w-5xl px-6 py-10">
        <div className="grid md:grid-cols-12 gap-10 items-start">
          {/* Main info section */}
          <div className={`${isVerbio ? 'md:col-span-7' : 'md:col-span-12'} space-y-8`}>
            {/* Description */}
            <section className="bg-card p-6 sm:p-8 rounded-2xl border border-edge shadow-sm">
              <h2 className="font-sans text-xl font-bold text-ink mb-3">About {app.name}</h2>
              <p className="leading-relaxed text-ink-soft text-base">
                {isVerbio ? t('verbio.detail') : app.description}
              </p>
              <p className="mt-4 text-xs font-medium text-ink-soft/70">
                Category:{' '}
                <span className="font-semibold text-ink">{app.humanActivity}</span>
              </p>
            </section>

            {/* Access & Platform links */}
            <section className="bg-card p-6 sm:p-8 rounded-2xl border border-edge shadow-sm">
              <h2 className="font-sans text-xl font-bold text-ink mb-3">
                {showRestricted ? 'Access Request' : t('verbio.webVersion')}
              </h2>
              <p className="text-sm text-ink-soft mb-6">
                {showRestricted
                  ? accessCopy(app.status, isAuthenticated)
                  : t('verbio.publicBeta')}
              </p>

              {!authReady ? (
                <p className="text-sm text-ink-soft/60">Checking access…</p>
              ) : showRestricted ? (
                <RestrictedAccess app={app} />
              ) : (
                <PlatformLinks app={app} authenticated={isAuthenticated} />
              )}
            </section>
          </div>

          {/* Verbio Interactive Study Card Mockup (2D Retro Style) */}
          {isVerbio && (
            <div className="md:col-span-5 flex flex-col items-center">
              <div
                className="w-full max-w-sm rounded-2xl bg-card border-2 border-clay p-6 sm:p-8 flex flex-col items-center text-center transition-all"
                style={{
                  boxShadow: '4px 4px 0 #d97706',
                }}
              >
                <span className="text-xs font-bold uppercase tracking-wider text-clay bg-amber-50 px-3 py-1 rounded-full border border-amber-200 mb-6">
                  {t('verbio.studyCard')}
                </span>

                <div className="text-5xl font-black text-ink mb-1">Go</div>
                <div className="text-xs font-medium text-ink-soft mb-6">{t('verbio.irregularVerb')}</div>

                <div className="w-full space-y-3 mb-6">
                  <div className="flex justify-between items-center p-3.5 bg-canvas rounded-xl border border-edge/60">
                    <span className="text-xs font-semibold text-ink-soft">{t('verbio.pastSimple')}</span>
                    <span className="font-extrabold text-blue-600 text-lg">Went</span>
                  </div>
                  <div className="flex justify-between items-center p-3.5 bg-canvas rounded-xl border border-edge/60">
                    <span className="text-xs font-semibold text-ink-soft">{t('verbio.pastParticiple')}</span>
                    <span className="font-extrabold text-blue-600 text-lg">Gone</span>
                  </div>
                </div>

                <button
                  type="button"
                  onClick={() => setCardFlipped(!cardFlipped)}
                  className="w-full py-3 bg-ink text-white rounded-xl font-bold text-sm hover:bg-stone-800 transition-colors shadow-xs cursor-pointer"
                >
                  {cardFlipped ? '✓ Got it!' : t('btn.gotIt')}
                </button>
              </div>
            </div>
          )}
        </div>
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

/** Renders the right glyph for an app. */
function AppGlyph({ slug, accent }: { slug: string; accent: string }) {
  if (slug === 'verbio') return <VerbioMark size={64} />;
  return (
    <div
      className="flex h-16 w-16 items-center justify-center rounded-2xl text-2xl font-sans font-extrabold text-white shadow-sm"
      style={{ backgroundColor: accent }}
      aria-hidden="true"
    >
      {slug.charAt(0).toUpperCase()}
    </div>
  );
}
