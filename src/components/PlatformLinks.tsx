import { Globe, Smartphone, Monitor, ArrowUpRight } from 'lucide-react';
import type { AppEntry } from '../types';
import { getStatusConfig } from '../lib/apps';

/**
 * PlatformLinks — the "where to use it" blocks on an app page.
 *
 * Renders web / mobile / desktop blocks only when the relevant URL exists,
 * so the layout never shows empty "coming soon" rows unless the app is
 * public and simply lacks a platform (then it shows a muted Coming soon).
 *
 * For development-status apps this component is not rendered at all — the
 * RestrictedAccess screen takes its place until the user is authenticated.
 */
interface PlatformLinksProps {
  app: AppEntry;
  /** Whether the user is authenticated (only relevant for development apps). */
  authenticated?: boolean;
}

export function PlatformLinks({ app, authenticated = false }: PlatformLinksProps) {
  const config = getStatusConfig(app.status);
  const hasWeb = Boolean(app.webUrl);
  const hasMobile = Boolean(app.mobileStoreUrls.ios || app.mobileStoreUrls.android);
  const hasDesktop = Boolean(app.desktopDownloadUrl);

  // Nothing to show — return null so the page doesn't render an empty block.
  if (!hasWeb && !hasMobile && !hasDesktop) return null;

  const webCta =
    app.status === 'testing'
      ? 'Open beta'
      : app.status === 'development' && authenticated
        ? 'Open preview'
        : 'Open web app';

  return (
    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
      {hasWeb && (
        <PlatformBlock
          icon={<Globe size={18} />}
          title="Web version"
          cta={webCta}
          href={app.webUrl as string}
          external
        />
      )}

      {hasMobile ? (
        <PlatformBlock icon={<Smartphone size={18} />} title="Mobile apps">
          <div className="flex flex-col gap-2">
            {app.mobileStoreUrls.ios && (
              <StoreLink href={app.mobileStoreUrls.ios} label="App Store" />
            )}
            {app.mobileStoreUrls.android && (
              <StoreLink href={app.mobileStoreUrls.android} label="Google Play" />
            )}
          </div>
        </PlatformBlock>
      ) : (
        app.status !== 'development' && (
          <PlatformBlock icon={<Smartphone size={18} />} title="Mobile apps" muted>
            Coming soon
          </PlatformBlock>
        )
      )}

      {hasDesktop ? (
        <PlatformBlock icon={<Monitor size={18} />} title="Desktop version">
          <a
            href={app.desktopDownloadUrl as string}
            className="inline-flex items-center gap-1.5 text-sm font-medium text-clay hover:underline"
          >
            Download
            <ArrowUpRight size={14} />
          </a>
        </PlatformBlock>
      ) : (
        app.status !== 'development' && (
          <PlatformBlock icon={<Monitor size={18} />} title="Desktop version" muted>
            Not available
          </PlatformBlock>
        )
      )}

      {/* Subtle status hint tied to the CTA verb */}
      <p className="col-span-full mt-1 text-xs text-ink-soft/60">
        Status: <span className={config.textClass}>{app.status}</span>
      </p>
    </div>
  );
}

function PlatformBlock({
  icon,
  title,
  cta,
  href,
  external,
  muted,
  children,
}: {
  icon: React.ReactNode;
  title: string;
  cta?: string;
  href?: string;
  external?: boolean;
  muted?: boolean;
  children?: React.ReactNode;
}) {
  return (
    <div className="flex flex-col gap-3 rounded-card border border-edge bg-card p-5 shadow-card">
      <div className="flex items-center gap-2 text-ink">
        <span className="text-clay" aria-hidden="true">
          {icon}
        </span>
        <h4 className="font-sans text-sm font-semibold">{title}</h4>
      </div>
      {href && (
        <a
          href={href}
          {...(external ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
          className="inline-flex items-center gap-1.5 text-sm font-medium text-clay hover:underline"
        >
          {cta}
          <ArrowUpRight size={14} />
        </a>
      )}
      {children}
      {muted && !href && !children && (
        <p className="text-sm text-ink-soft/50">Coming soon</p>
      )}
    </div>
  );
}

function StoreLink({ href, label }: { href: string; label: string }) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="inline-flex items-center gap-1.5 text-sm font-medium text-clay hover:underline"
    >
      {label}
      <ArrowUpRight size={14} />
    </a>
  );
}
