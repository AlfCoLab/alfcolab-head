import { Link } from 'react-router-dom';
import { useDocumentMeta } from '../hooks/useDocumentMeta';
import { CapybaraMark } from '../components/CapybaraMark';

/**
 * NotFoundPage — 404 for unknown routes and unknown app slugs.
 *
 * Steady voice: no alarm, just a calm redirect home. Reuses the capybara
 * so even the error page feels on-brand.
 */
export function NotFoundPage() {
  useDocumentMeta('Page not found — Alfcolab');

  return (
    <section className="mx-auto flex max-w-xl flex-col items-center px-6 py-24 text-center">
      <CapybaraMark size={120} />
      <h1 className="mt-6 font-sans text-3xl font-semibold tracking-tight text-ink">
        We could not find that.
      </h1>
      <p className="mt-3 text-ink-soft">
        The page or app you were looking for is not here. It may still be in
        development.
      </p>
      <div className="mt-8 flex items-center gap-4">
        <Link
          to="/"
          className="inline-flex items-center rounded-soft bg-ink px-5 py-2.5 text-sm font-medium text-canvas hover:bg-ink/90 transition-colors"
        >
          Back home
        </Link>
        <Link
          to="/apps"
          className="inline-flex items-center rounded-soft border border-edge bg-card px-5 py-2.5 text-sm font-medium text-ink hover:border-clay hover:text-clay transition-colors"
        >
          See the catalog
        </Link>
      </div>
    </section>
  );
}
