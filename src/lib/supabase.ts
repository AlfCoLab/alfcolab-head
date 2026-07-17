import { createClient, type SupabaseClient } from '@supabase/supabase-js';

/**
 * Supabase client for the hub.
 *
 * Both env vars are PUBLIC values (URL + anon key). Security is enforced
 * by Row Level Security in your Supabase project, not by hiding these.
 *
 * For the current MVP the client is optional: if the vars are unset we
 * export `null` and the development-status pages treat every visitor as
 * unauthenticated (safe default — they see the restricted-access screen).
 *
 * Wire real auth later by setting the vars in `.env` (local) or Vercel
 * project settings (prod), then build the sign-in flow on top of
 * `supabase.auth`.
 */
const url = import.meta.env.VITE_SUPABASE_URL as string | undefined;
const anonKey = import.meta.env.VITE_SUPABASE_ANON_KEY as string | undefined;

export const isSupabaseConfigured = Boolean(url && anonKey);

export const supabase: SupabaseClient | null = isSupabaseConfigured
  ? createClient(url as string, anonKey as string)
  : null;
