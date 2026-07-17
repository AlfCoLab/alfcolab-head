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
    'Alf & Co Solutions — Dashboard',
    'Streamline your daily operations with intuitive and effective digital tools.',
  );

  const catalog = getCatalogApps();

  return (
    <>
      {/* Hero */}
      <section className="mx-auto max-w-6xl px-6 pt-16 sm:pt-24 lg:pt-32">
        <div className="flex flex-col lg:flex-row items-center justify-between gap-12 lg:gap-8">
          
          {/* Hero Image (Capybara) */}
          <div className="w-full lg:w-1/2 flex justify-center lg:justify-start">
            <img
              src="/capybara-banner.jpg"
              alt="Capybara mascot working at a desk"
              className="w-full max-w-[480px] object-contain drop-shadow-sm"
              style={{ mixBlendMode: 'multiply' }}
            />
          </div>

          {/* Hero Text */}
          <div className="w-full lg:w-1/2 text-center lg:text-left">
            <h1 className="font-sans text-[42px] leading-[1.1] font-bold tracking-tight text-[#3b2b24] sm:text-[56px] lg:text-[64px]">
              Everyday tasks,<br/>
              Simple tools
            </h1>
            <p className="mt-6 text-[18px] leading-relaxed text-[#5c4f48] max-w-[440px] mx-auto lg:mx-0">
              Streamline your daily operations with intuitive and effective digital tools, tailored to your unique needs.
            </p>
          </div>
        </div>
      </section>

      {/* Cards Grid */}
      <section className="mx-auto max-w-6xl px-6 pt-24 pb-16">
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {catalog.map((app) => (
            <AppCard key={app.slug} app={app} />
          ))}
        </div>
      </section>
    </>
  );
}
