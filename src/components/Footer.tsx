import { Link } from 'react-router-dom';
import { Heart } from 'lucide-react';

/**
 * Footer — calm, minimal. Contacts, legal links, and a small brand seal.
 *
 * Per Brand Book tone of voice: no exclamation points, no hype, just the
 * steady motto and the essentials.
 */
export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="mt-12 border-t border-edge/60">
      <div className="mx-auto flex max-w-6xl flex-col sm:flex-row items-center justify-between px-6 py-8">
        <nav aria-label="Footer" className="flex items-center gap-6 text-[14px] font-medium text-ink-soft">
          <span className="cursor-pointer hover:text-clay transition-colors">Contact</span>
          <span className="cursor-pointer hover:text-clay transition-colors">Services</span>
          <span className="cursor-pointer hover:text-clay transition-colors">Projects</span>
          <span className="cursor-pointer hover:text-clay transition-colors">Resources</span>
          <span className="cursor-pointer hover:text-clay transition-colors">About</span>
        </nav>
        
        <div className="mt-6 sm:mt-0 text-[14px] font-medium text-ink-soft">
          © {year} Alf & Co Solutions
        </div>
      </div>
    </footer>
  );
}
