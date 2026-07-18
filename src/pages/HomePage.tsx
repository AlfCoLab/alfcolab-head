import { getCatalogApps } from '../lib/apps';
import { useDocumentMeta } from '../hooks/useDocumentMeta';
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
          {catalog.filter(app => app.slug !== 'head').slice(0, 4).map((app) => (
            <AppCard key={app.slug} app={app} />
          ))}
        </div>
      </section>

      {/* Ko-fi Banner */}
      <section className="mx-auto max-w-6xl px-6 pb-24 text-center">
        <div className="mt-8 flex justify-center">
          <a
            href="https://ko-fi.com/alfcosolutions"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 rounded-xl bg-[#d97706] px-6 py-3 text-[15px] font-medium text-white shadow-lg hover:bg-[#b45309] hover:-translate-y-1 transition-all duration-200"
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" stroke="none">
              <path d="M23.881 8.948c-.773-4.085-4.859-4.593-4.859-4.593H.723c-.604 0-.679.798-.679.798s-.082 7.324-.022 11.822c.164 2.424 2.586 2.672 2.586 2.672s8.267-.023 11.966-.049c2.438-.426 2.683-2.566 2.658-3.143V14.1s4.444.665 6.138-1.574c1.396-1.848 1.139-3.393.511-3.578zm-5.066 3.652s-3.793.528-3.793.528V6.997s4.453.513 4.453 1.942c0 1.428-1.077 3.661-.66 3.661z"/>
            </svg>
            Buy us a coffee on Ko-fi
          </a>
        </div>
      </section>
    </>
  );
}
