import { getCatalogApps } from '../lib/apps';
import { useDocumentMeta } from '../hooks/useDocumentMeta';
import { AppCard } from '../components/AppCard';

/**
 * CatalogPage — `/apps`
 *
 * The full browsable grid. Same cards as the homepage, all in one place,
 * no orbit — just calm scannable rows.
 */
export function CatalogPage() {
  useDocumentMeta(
    'Apps catalog — Alfcolab',
    'Every Alfcolab app in one place, with live status and access.',
  );

  const catalog = getCatalogApps();

  return (
    <section className="mx-auto max-w-6xl px-6 py-16">
      <header className="mb-10">
        <p className="font-sans text-xs font-medium uppercase tracking-[0.2em] text-moss">
          Catalog
        </p>
        <h1 className="mt-2 font-sans text-3xl font-semibold tracking-tight text-ink sm:text-4xl">
          Every app, one place.
        </h1>
        <p className="mt-3 max-w-xl text-ink-soft">
          Each card opens the app's page first, then routes you to the live app.
          Status is always visible.
        </p>
      </header>

      <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {catalog.map((app) => (
          <AppCard key={app.slug} app={app} />
        ))}
      </div>
    </section>
  );
}
