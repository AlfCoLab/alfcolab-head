import { useEffect } from 'react';

/**
 * Set document title and meta description for a page.
 *
 * Lightweight SEO helper — no dependency, no SSR needed. Keeps each page
 * self-describing for link previews and search engines.
 */
export function useDocumentMeta(title: string, description?: string): void {
  useEffect(() => {
    const previous = document.title;
    document.title = title;

    let meta: HTMLMetaElement | null = null;
    let previousContent: string | null = null;
    if (description) {
      meta = document.querySelector('meta[name="description"]');
      if (meta) {
        previousContent = meta.content;
        meta.content = description;
      }
    }

    return () => {
      document.title = previous;
      if (meta && previousContent !== null) {
        meta.content = previousContent;
      }
    };
  }, [title, description]);
}
