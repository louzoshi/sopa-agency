// src/components/TransitionOverlay.tsx
'use client';

import { useEffect, useState } from 'react';
import { usePathname } from 'next/navigation';

export function withWipe(onNavigate: () => void) {
  document.getElementById("top-bar")?.classList.add("wipe");
  setTimeout(onNavigate, 500);
}

export default function TransitionOverlay() {
  const pathname = usePathname();

  // home = /en or /pt exactly (locale-aware, no hardcode)
  const isHome = /^\/(en|pt)\/?$/.test(pathname);
  const targetState = isHome ? 'bar' : 'hide';

  const [state, setState] = useState<'wipe' | 'bar' | 'hide'>(targetState);
  const [prevPath, setPrevPath] = useState(pathname);

  // reset to wipe during render on route change (React-recommended, no effect)
  if (prevPath !== pathname) {
    setPrevPath(pathname);
    setState('wipe');
  }

  useEffect(() => {
    const timer = setTimeout(() => {
      setState(targetState);
    }, 500);
    return () => clearTimeout(timer);
  }, [pathname, targetState]);

  const barStyle = {
    position: 'fixed' as const,
    left: 0,
    right: 0,
    background: 'black',
    transition: 'height 0.6s ease-in-out',
    // opening screen: starts covering the viewport, retracts upward
    height: state === 'wipe' ? '100vh' : state === 'bar' ? '10vh' : '0vh',
  };

  return (
    <div id="top-bar" style={{ ...barStyle, top: 0 }}></div>
  );
}
