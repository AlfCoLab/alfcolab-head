import type { AppEntry } from '../types';
import { AppCard } from './AppCard';

/**
 * AppsOrbit — the homepage centerpiece.
 *
 * A pure-CSS 3D ring of app cards rotating around the capybara (Alfcolab
 * hub) at the center. No Three.js, no canvas — just `perspective` +
 * `transform-style: preserve-3d` + a slow `rotateY` keyframe (defined as
 * `--animate-spin-slow` in index.css). Each card counter-rotates so its
 * face stays toward the viewer.
 *
 * Behavior:
 *   - desktop: orbit spins at ~60s/rev, pauses on hover/focus
 *   - prefers-reduced-motion: static ring, no spin
 *   - mobile (<lg): orbit hidden; caller renders a grid instead (spec:
 *     "на мобильных — удобный список/сетка")
 */
interface AppsOrbitProps {
  apps: AppEntry[];
}

export function AppsOrbit({ apps }: AppsOrbitProps) {
  const count = apps.length;
  // ring radius scales gently with the number of cards
  const radius = 260;

  return (
    <div
      className="relative mx-auto hidden h-[560px] w-full max-w-4xl items-center justify-center lg:flex"
      // Pauses the spin when the cursor enters the scene (hover) or keyboard
      // focus moves inside. Tailwind has no group-focus-within-play-state, so
      // we drop to a tiny inline style hook.
      style={{ perspective: '1400px' }}
    >
      {/* Center hub — the capybara = Alfcolab */}
      <div className="absolute z-20 flex flex-col items-center">
        <img
          src="/capybara-hero.jpg"
          alt="Alfcolab capybara mascot"
          className="h-[180px] w-[180px] rounded-full object-cover shadow-lg"
        />
      </div>

      {/* The rotating ring */}
      <div
        className="orbit-ring relative h-full w-full"
        style={{ transformStyle: 'preserve-3d' }}
      >
        {apps.map((app, i) => {
          const angle = (360 / count) * i;
          return (
            <div
              key={app.slug}
              className="orbit-card absolute left-1/2 top-1/2"
              style={{
                transform: `rotateY(${angle}deg) translateZ(${radius}px) translate(-50%, -50%)`,
              }}
            >
              {/* Counter-rotate so the card faces outward. The negative ring
                  rotation is applied via the orbit-counter class which uses
                  the same keyframe in reverse (see index.css sibling below). */}
              <div className="orbit-counter">
                <AppCard app={app} compact />
              </div>
            </div>
          );
        })}
      </div>

      {/* Inline keyframes for the counter-rotation, scoped to this scene.
          Kept here (not in index.css) because they depend on the ring's
          animation and only apply to this component. */}
      <style>{`
        .orbit-ring {
          animation: orbit-spin 60s linear infinite;
        }
        .orbit-card .orbit-counter {
          animation: orbit-spin 60s linear infinite reverse;
          transform-origin: center center;
        }
        /* Pause everything on hover/focus-within for readability. */
        .orbit-ring:hover,
        .orbit-ring:hover .orbit-counter,
        .orbit-ring:focus-within,
        .orbit-ring:focus-within .orbit-counter {
          animation-play-state: paused;
        }
        @media (prefers-reduced-motion: reduce) {
          .orbit-ring,
          .orbit-card .orbit-counter {
            animation: none;
          }
        }
      `}</style>
    </div>
  );
}
