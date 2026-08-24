// src/components/TransitionOverlay.tsx
// Full-screen black layer: CSS animation holds black 2s then fades out over 1s.
// withWipe() flashes it back on during section transitions (restarts the animation).
'use client';

export function withWipe(onNavigate: () => void) {
  const bar = document.getElementById("top-bar");
  if (!bar) return;
  // restart the CSS animation
  bar.style.animation = 'none';
  void bar.offsetHeight; // reflow
  bar.style.animation = '';
  setTimeout(onNavigate, 500);
}

export default function TransitionOverlay({ hidden }: { hidden?: boolean }) {
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
    />
  );
}
