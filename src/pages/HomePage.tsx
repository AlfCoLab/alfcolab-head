import { getCatalogApps } from '../lib/apps';
import { useDocumentMeta } from '../hooks/useDocumentMeta';
import { AppCard } from '../components/AppCard';

/**
 * HomePage — `/`
 *
 * Side-by-side hero: capybara on left, headline on right.
 * Exactly 4 app cards below. Ko-fi link at the bottom.
 * No static elements — everything has subtle animation.
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
      <section className="mx-auto max-w-6xl px-6 pt-12 sm:pt-20 lg:pt-28">
        <div className="flex flex-col lg:flex-row items-center justify-between gap-12 lg:gap-16">

          {/* Hero Image (Capybara with peaceful smile) */}
          <div className="w-full lg:w-1/2 flex justify-center lg:justify-start">
            <img
              src="/capybara-hero.jpg"
              alt="Capybara mascot peacefully working at a desk"
              className="w-full max-w-[420px] object-contain animate-float"
            />
          </div>

          {/* Hero Text */}
          <div className="w-full lg:w-1/2 text-center lg:text-left">
            <h1 className="font-sans text-[42px] leading-[1.08] font-bold tracking-tight text-[#3b2b24] sm:text-[52px] lg:text-[60px]">
              Everyday tasks,<br/>
              Simple tools
            </h1>
            <p className="mt-6 text-[17px] leading-relaxed text-[#5c4f48] max-w-[440px] mx-auto lg:mx-0">
              Streamline your daily operations with intuitive and effective digital tools, tailored to your unique needs.
            </p>
            <p className="mt-3 text-[14px] italic text-[#8a7b70] max-w-[440px] mx-auto lg:mx-0">
              Less stress. More calm.
            </p>
          </div>
        </div>
      </section>

      {/* Cards Grid — exactly 4 cards (1 active + 3 under construction) */}
      <section className="mx-auto max-w-6xl px-6 pt-20 pb-12">
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {catalog.filter(app => app.slug !== 'head').slice(0, 4).map((app) => (
            <AppCard key={app.slug} app={app} />
          ))}
        </div>
      </section>

      {/* Ko-fi Link — must always be present per project requirements */}
      <section className="mx-auto max-w-6xl px-6 pb-20 text-center">
        <a
          href="https://ko-fi.com/alfcosolutions"
          target="_blank"
          rel="noopener noreferrer"
          className="group inline-flex items-center gap-3 rounded-2xl border-2 border-[#d97706]/30 bg-[#d97706]/5 px-8 py-4 text-[16px] font-semibold text-[#b45309] hover:bg-[#d97706] hover:text-white hover:border-[#d97706] hover:-translate-y-1 hover:shadow-lg transition-all duration-300"
        >
          <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor" stroke="none" className="transition-transform duration-300 group-hover:scale-110">
            <path d="M23.881 8.948c-.773-4.085-4.859-4.593-4.859-4.593H.723c-.604 0-.679.798-.679.798s-.082 7.324-.022 11.822c.164 2.424 2.586 2.672 2.586 2.672s8.267-.023 11.966-.049c2.438-.426 2.683-2.566 2.658-3.143V14.1s4.444.665 6.138-1.574c1.396-1.848 1.139-3.393.511-3.578zm-5.066 3.652s-3.793.528-3.793.528V6.997s4.453.513 4.453 1.942c0 1.428-1.077 3.661-.66 3.661z"/>
          </svg>
          Buy us a coffee on Ko-fi
        </a>
      </section>
    </>
  );
}
