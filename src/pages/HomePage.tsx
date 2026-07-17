import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { getCatalogApps } from '../lib/apps';
import { useDocumentMeta } from '../hooks/useDocumentMeta';
import { AppsOrbit } from '../components/AppsOrbit';
import { AppCard } from '../components/AppCard';
/**
 * HomePage — `/`
 *
 * Hero: a short, calm statement of what Alfcolab is. Then the capybara at
 * the center of an orbit of app cards (desktop), or a capybara hero above
 * a responsive grid (mobile).
 *
 * Voice: steady, no hype. Per Brand Book.
 */
export function HomePage() {
  useDocumentMeta(
    'Alfcolab — everyday apps, calm tools',
    'A unified showcase of apps, sites, and experiments. Calm productivity, one tab away.',
  );

  const catalog = getCatalogApps();

  return (
    <>
      {/* Hero */}
      <section className="mx-auto max-w-6xl px-6 pt-16 text-center sm:pt-24">
        <p className="font-sans text-xs font-medium uppercase tracking-[0.2em] text-moss">
          Alfcolab
        </p>
        <h1 className="mx-auto mt-4 max-w-3xl font-sans text-4xl font-semibold tracking-tight text-ink sm:text-5xl">
          One calm home for everyday apps.
        </h1>
        <p className="mx-auto mt-5 max-w-xl text-lg text-ink-soft">
          A unified showcase of apps, sites, and experiments. Each tool does one
          thing, calmly.
        </p>
        <div className="mt-8 flex items-center justify-center gap-4">
          <Link
            to="/apps"
            className="inline-flex items-center gap-2 rounded-soft bg-ink px-5 py-2.5 text-sm font-medium text-canvas hover:bg-ink/90 transition-colors"
          >
            Browse the catalog
            <ArrowRight size={16} />
          </Link>
          <Link
            to="/app/verbio"
            className="inline-flex items-center gap-2 rounded-soft border border-edge bg-card px-5 py-2.5 text-sm font-medium text-ink hover:border-clay hover:text-clay transition-colors"
          >
            Try Verbio
          </Link>
        </div>
      </section>

      {/* Orbit — desktop only (the scene handles its own lg: visibility) */}
      <section className="mx-auto max-w-6xl px-6 pt-12">
        <AppsOrbit apps={catalog} />
      </section>

      {/* Mobile hero mascot + grid — replaces the orbit on small screens */}
      <section className="mx-auto max-w-6xl px-6 pt-12 lg:hidden">
        <div className="flex flex-col items-center text-center">
          <img
            src="/capybara-hero.jpg"
            alt="Alfcolab capybara mascot"
            className="h-[140px] w-[140px] rounded-full object-cover shadow-lg"
          />
          <p className="mt-2 font-sans text-xs font-medium uppercase tracking-[0.18em] text-moss">
            Alfcolab
          </p>
        </div>
        <div className="mt-10 grid gap-4 sm:grid-cols-2">
          {catalog.map((app) => (
            <AppCard key={app.slug} app={app} />
          ))}
        </div>
      </section>

      {/* Banner & Ko-fi */}
      <section className="mx-auto max-w-6xl px-6 pb-20 pt-20 text-center">
        <img
          src="/capybara-banner.jpg"
          alt="Everyday tasks + Simple tools = Less stress."
          className="mx-auto w-full max-w-4xl rounded-2xl shadow-xl object-cover"
        />
        <div className="mt-8 flex justify-center">
          <a
            href="https://ko-fi.com/alfcosolutions"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 rounded-soft bg-[#d97706] px-5 py-2.5 text-sm font-medium text-white shadow-lg hover:bg-[#b45309] transition-all"
          >
            Buy us a coffee on Ko-fi
          </a>
        </div>
      </section>
    </>
  );
}
