import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { LanguageProvider } from './context/LanguageContext';
import { Layout } from './components/Layout';
import { HomePage } from './pages/HomePage';
import { CatalogPage } from './pages/CatalogPage';
import { AppPage } from './pages/AppPage';
import { AboutPage } from './pages/AboutPage';
import { NotFoundPage } from './pages/NotFoundPage';

/**
 * App — routes.
 *
 *   /             → HomePage
 *   /apps         → CatalogPage
 *   /about        → AboutPage
 *   /app/:slug    → AppPage
 *   *             → NotFoundPage
 */
export function App() {
  return (
    <LanguageProvider>
      <BrowserRouter>
        <Routes>
          <Route element={<Layout />}>
            <Route index element={<HomePage />} />
            <Route path="apps" element={<CatalogPage />} />
            <Route path="about" element={<AboutPage />} />
            <Route path="app/:slug" element={<AppPage />} />
            <Route path="*" element={<NotFoundPage />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </LanguageProvider>
  );
}
