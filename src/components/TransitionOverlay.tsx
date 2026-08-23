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

  // ponytail: home is '/' or '/en' — covers locale-less and explicit-locale home
  const isHome = pathname === '/' || pathname === '/en';
  const targetState = isHome ? 'bar' : 'hide';

  const [state, setState] = useState<'wipe' | 'bar' | 'hide'>('wipe');
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
    transition: 'height 0.3s ease-in-out',
    height: state === 'wipe' ? '50vh' : state === 'bar' ? '10vh' : '0vh',
  };

  return (
    <div id="top-bar" style={{ ...barStyle, top: 0 }}></div>
  );
}
