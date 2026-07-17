import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Layout } from './components/Layout';
import { HomePage } from './pages/HomePage';
import { CatalogPage } from './pages/CatalogPage';
import { AppPage } from './pages/AppPage';
import { NotFoundPage } from './pages/NotFoundPage';

/**
 * App — routes.
 *
 *   /             → HomePage  (capybara + orbit)
 *   /apps         → CatalogPage (full grid)
 *   /app/:slug    → AppPage    (dynamic, status-driven)
 *   *             → NotFoundPage
 *
 * Vercel's vercel.json rewrites unknown paths to /index.html so client-side
 * deep links (e.g. /app/verbio opened directly) resolve in production.
 */
export function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<Layout />}>
          <Route index element={<HomePage />} />
          <Route path="apps" element={<CatalogPage />} />
          <Route path="app/:slug" element={<AppPage />} />
          <Route path="*" element={<NotFoundPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
