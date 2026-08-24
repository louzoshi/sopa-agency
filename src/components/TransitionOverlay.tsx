// src/components/TransitionOverlay.tsx
// Full-screen black layer: CSS animation holds black 2s then fades out over 1s.
// Carries SOPA title + tagline during load; fading reveals orb + hero beneath.
// withWipe() restarts the animation during section transitions.
'use client';

import { site } from '@/data/site';

export function withWipe(onNavigate: () => void) {
  const bar = document.getElementById("top-bar");
  if (!bar) return;
  // restart the CSS animation
  bar.style.animation = 'none';
  void bar.offsetHeight; // reflow
  bar.style.animation = '';
  setTimeout(onNavigate, 500);
}

export default function TransitionOverlay({ hidden, locale }: { hidden?: boolean; locale?: string }) {
  const l = (locale ?? 'en') as keyof typeof site;
  const t = site[l] ?? site.en;

  return (
    <div
      id="top-bar"
      hidden={hidden}
      style={{
        position: 'fixed',
        inset: 0,
        background: 'black',
        zIndex: 9999,
        pointerEvents: 'none',
        opacity: 0,
        animation: 'loader-fade 3s ease-in-out forwards',
      }}
    >
      {/* loading title — sits above the black, fades out with it */}
      <div className="absolute inset-0 flex flex-col items-center justify-center text-center px-6">
        <h1 className="font-display text-5xl sm:text-7xl md:text-8xl font-black uppercase tracking-tighter text-white leading-[0.9]">
          {t.title}
        </h1>
        <p className="mt-4 max-w-xl text-sm sm:text-base text-white/60">{t.tagline}</p>
      </div>
    </div>
  );
}
