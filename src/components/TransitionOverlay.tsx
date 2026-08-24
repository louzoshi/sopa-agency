// src/components/TransitionOverlay.tsx
// Full-screen black layer. On load: holds 2s then fades out revealing the orb.
// withWipe() flashes it back on during section transitions.
'use client';

import { useEffect, useState } from 'react';
import { usePathname } from 'next/navigation';

export function withWipe(onNavigate: () => void) {
  const bar = document.getElementById("top-bar");
  if (bar) bar.style.opacity = '1';
  setTimeout(onNavigate, 500);
}

export default function TransitionOverlay({ ready }: { ready?: boolean }) {
  const pathname = usePathname();

  // home = /en or /pt exactly; other pages reveal immediately
  const isHome = /^\/(en|pt)\/?$/.test(pathname);
  // hold black for 2s on home, then fade out over 1s
  const [visible, setVisible] = useState(isHome);

  useEffect(() => {
    setVisible(isHome);
    if (!isHome) return;
    const t = setTimeout(() => setVisible(false), 2000);
    return () => clearTimeout(t);
  }, [isHome, ready]);

  return (
    <div
      id="top-bar"
      style={{
        position: 'fixed',
        inset: 0,
        background: 'black',
        zIndex: 9999,
        pointerEvents: visible ? 'auto' : 'none',
        opacity: visible ? 1 : 0,
        transition: 'opacity 1s ease-in-out',
      }}
    />
  );
}
