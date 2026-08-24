// src/components/TransitionOverlay.tsx
// Full-screen black layer: quick fade out (~0.6s) revealing the orb. No hold, no text.
// withWipe() restarts the animation during section transitions.
'use client';

export function withWipe(onNavigate: () => void) {
  const bar = document.getElementById("top-bar");
  if (!bar) return;
  // restart the CSS animation
  bar.style.animation = 'none';
  void bar.offsetHeight; // reflow
  bar.style.animation = '';
  setTimeout(onNavigate, 400);
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
        animation: 'loader-fade 0.8s ease-out forwards',
      }}
    />
  );
}
