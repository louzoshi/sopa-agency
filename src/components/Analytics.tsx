// src/components/Analytics.tsx
// Google tag (gtag.js) + SPA section tracking. Since the site is a single-page
// app where sections swap client-side, we fire page_view on every section change
// and a scroll_depth event so scrolling is measurable too.
'use client';
import { useEffect } from 'react';
import { usePathname } from 'next/navigation';

const GA_ID = 'G-HWM0ZNJJVF';

declare global {
  interface Window {
    dataLayer: unknown[];
    gtag: (...args: unknown[]) => void;
  }
}

export default function Analytics({ section }: { section?: string }) {
  const pathname = usePathname();

  // load gtag once
  useEffect(() => {
    const id = GA_ID;
    const s = document.createElement('script');
    s.async = true;
    s.src = `https://www.googletagmanager.com/gtag/js?id=${id}`;
    document.head.appendChild(s);
    window.dataLayer = window.dataLayer || [];
    window.gtag = function gtag(...args: unknown[]) { window.dataLayer.push(args); };
    window.gtag('js', new Date());
    window.gtag('config', id);
  }, []);

  // fire page_view whenever section/pathname changes (SPA nav)
  useEffect(() => {
    if (!window.gtag || !section) return;
    window.gtag('event', 'page_view', {
      page_title: section,
      page_path: `${pathname}/${section === 'home' ? '' : section}`,
      section,
      locale: pathname.startsWith('/pt') ? 'pt-BR' : 'en',
    });
  }, [section, pathname]);

  // scroll depth milestones (25/50/75/100%)
  useEffect(() => {
    const fired = new Set<number>();
    const onScroll = () => {
      const max = document.documentElement.scrollHeight - window.innerHeight;
      if (max <= 0) return;
      const pct = Math.round((window.scrollY / max) * 100);
      for (const step of [25, 50, 75, 100]) {
        if (pct >= step && !fired.has(step)) {
          fired.add(step);
          window.gtag?.('event', 'scroll_depth', { percent: step, section: section ?? '' });
        }
      }
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, [section]);

  return null;
}
