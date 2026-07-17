import { Lock, LogIn } from 'lucide-react';
import type { AppEntry } from '../types';
import { isSupabaseConfigured } from '../lib/supabase';

/**
 * RestrictedAccess — the gate shown for non-ready apps when the visitor
 * is not authenticated. Covers both `testing` and `development`.
 *
 * Implements the spec's three messages:
 *   - "Приложение находится в разработке" / This app is in development
 *   - "Доступ ограничен" / Access is restricted
 *   - "Войдите или запросите доступ" / Sign in or request access
 *
 * No fake login form. When Supabase is configured we show a "Sign in"
 * affordance that future auth wiring will connect to `supabase.auth.signIn`;
 * when it is not configured we show a "request access" prompt. Both are
 * safe defaults — nothing is ever exposed without a real session.
 */
interface RestrictedAccessProps {
  app: AppEntry;
}

export function RestrictedAccess({ app }: RestrictedAccessProps) {
  return (
    <div className="rounded-card border border-edge bg-card p-8 text-center shadow-card">
      <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-dev/10">
        <Lock size={20} className="text-dev" aria-hidden="true" />
      </div>

      <h3 className="mt-4 font-sans text-xl font-semibold text-ink">
        {app.status === 'testing'
          ? `${app.name} is in beta testing`
          : `${app.name} is in development`}
      </h3>
      <p className="mt-2 text-sm text-ink-soft">
        Access is restricted. Sign in or request access to continue.
      </p>

      <div className="mt-6 flex flex-col items-center gap-3">
        {isSupabaseConfigured ? (
          // Placeholder for the real Supabase Auth flow — wired later.
          // No form: a clear, honest affordance that does nothing until auth
          // is connected, so it can never be mistaken for a working login.
          <button
            type="button"
            disabled
            className="inline-flex items-center gap-2 rounded-soft bg-clay px-4 py-2 text-sm font-medium text-white opacity-60 cursor-not-allowed"
            title="Sign-in flow will be wired to Supabase Auth"
          >
            <LogIn size={16} />
            Sign in
          </button>
        ) : (
          <a
            href="mailto:hello@alfcolab.com"
            className="inline-flex items-center gap-2 rounded-soft bg-clay px-4 py-2 text-sm font-medium text-white hover:bg-clay/90 transition-colors"
          >
            <LogIn size={16} />
            Request access
          </a>
        )}
        <p className="text-xs text-ink-soft/60">
          {isSupabaseConfigured
            ? 'Sign-in is being prepared. Check back shortly.'
            : 'Send us a note and we will open the door.'}
        </p>
      </div>
    </div>
  );
}
