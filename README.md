# Alfcolab — HEAD hub site

The central hub for Alfcolab: `alfcolab.com`. A calm showcase of every Alfcolab
app, with a per-app page at `/app/:slug` that routes you to the live app.

**Stack:** Vite + React 19 + TypeScript + Tailwind v4 + React Router v7.
Pure-CSS 3D orbit (no Three.js). Supabase is wired in optional/auth-only.

**Brand:** Dolce Vita palette (warm cream + terracotta + moss), Inter +
Source Sans 3. Steady, no-hype voice per the Brand Book.

---

## Quick start (local)

```bash
npm install
npm run dev      # http://localhost:5173
```

Build & preview the production bundle:

```bash
npm run build    # type-check (tsc) + vite build → dist/
npm run preview  # serve the built dist/
npm run lint     # oxlint
```

Supabase is **optional** for the current MVP. The site runs fully without it;
development-status app pages simply show the restricted-access screen for
everyone. To enable session-aware access, copy `.env.example` to `.env` and
fill in your project values:

```bash
cp .env.example .env
# then edit .env:
# VITE_SUPABASE_URL=https://YOUR-PROJECT.supabase.co
# VITE_SUPABASE_ANON_KEY=your-anon-key
```

---

## Project layout

```
src/
  data/apps.ts        # ← the registry: edit apps here
  lib/apps.ts         # queries + status config
  lib/supabase.ts     # optional Supabase client (graceful when unset)
  hooks/useDocumentMeta.ts
  components/         # Layout, AppCard, AppsOrbit, StatusBadge, CapybaraMark, ...
  pages/              # HomePage, CatalogPage, AppPage, NotFoundPage
  types.ts            # AppEntry, AppStatus
```

### Adding or editing an app

Open `src/data/apps.ts` and edit the `apps` array. Every part of the site
(homepage, catalog, app pages) reads from this single source.

```ts
{
  slug: 'myapp',                       // → /app/myapp and myapp.alfcolab.com
  name: 'My App',
  status: 'development',               // 'development' | 'testing' | 'ready'
  category: 'productivity',
  humanActivity: 'Productivity',
  shortDescription: 'One line.',
  description: 'A paragraph or two.',
  tagline: 'A short tagline.',
  accentColor: '#E05E26',              // per-app accent on its page
  showInCatalog: true,                 // false hides from homepage + /apps
  requiresAuth: true,                  // gate with Supabase session
  webUrl: 'https://myapp.alfcolab.com',
  mobileStoreUrls: { ios: null, android: null },
  desktopDownloadUrl: null,
  statusLabel: 'private preview',      // badge text (or null for default)
}
```

### Status rules (enforced in `AppPage`)

| status | catalog | page | CTA |
| --- | --- | --- | --- |
| `ready` | shown | public | Open app |
| `testing` | shown (beta badge) | public | Open beta |
| `development` | shown or hidden | **restricted until signed in** | Request access |

---

## Deploy: GitHub → Vercel → custom domain

This is a static SPA. The build output is plain `dist/`, so any static host
works; Vercel is the documented target.

### 1. Push to GitHub

```bash
git init
git add .
git commit -m "Alfcolab HEAD hub — initial build"
git branch -M main
# create an empty repo on GitHub first, then:
git remote add origin https://github.com/<you>/alfcolab-head.git
git push -u origin main
```

### 2. Import into Vercel

1. Go to <https://vercel.com/new> and import the GitHub repo.
2. Vercel auto-detects Vite. Confirm:
   - **Build command:** `npm run build`
   - **Output directory:** `dist`
3. Add environment variables (Project → Settings → Environment Variables):
   - `VITE_SUPABASE_URL`
   - `VITE_SUPABASE_ANON_KEY`
   (Optional for the MVP — see above. Mark them exposed/public; the anon key
   is designed to be public, with security enforced by Supabase RLS.)
4. Deploy. You get a `*.vercel.app` URL immediately.

### 3. Connect the custom domain `alfcolab.com`

1. In Vercel: Project → Settings → Domains → add `alfcolab.com` and
   `www.alfcolab.com`.
2. At your DNS provider (per `deploy.md` you migrated to Spaceship), set:
   - **A record** `@` → `76.76.21.21` (Vercel's apex IP), **or**
   - **CNAME** `www` → `cname.vercel-dns.com`
3. Add app subdomains the same way when each app is ready:
   - `verbio` CNAME → `cname.vercel-dns.com` (or to the app's own host)
4. Vercel provisions SSL automatically. Confirm the site loads over HTTPS.

`vercel.json` (in this repo) rewrites all routes to `/index.html` so deep
links like `alfcolab.com/app/verbio` resolve to the SPA.

---

## Supabase setup (when you are ready for auth)

The hub itself does not require Supabase. It becomes useful once you want
development-status apps gated behind real sign-in.

1. Create a project at <https://supabase.com> and copy the **Project URL**
   and **anon public key** from Project Settings → API.
2. Put them in `.env` (local) and Vercel env vars (prod) as above.
3. Enable the auth providers you want (Email, Google, …) under
   Authentication → Providers.
4. (Later) Build the sign-in UI on `supabase.auth.signInWith(...)`. The
   restricted-access screen already has a disabled "Sign in" affordance
   waiting to be wired up.
5. For per-app data, protect tables with **Row Level Security** policies —
   never rely on hiding the anon key.

### Protecting app subdomains (future)

Each app on `<slug>.alfcolab.com` is a separate Vercel project. To gate it:
either run Supabase Auth in that app and check the session before rendering,
or add Vercel middleware that validates a Supabase session cookie and
redirects unauthenticated visitors to the hub's `/app/:slug` page.

---

## Notes

- The capybara is an inline-SVG placeholder for the hub mascot while the
  final art direction is unified. Replace `CapybaraMark` with a real asset
  when ready.
- `VerbioMark` is an inline-SVG placeholder for the Verbio logo.
- No secrets live in this repo. `.env` is gitignored.
