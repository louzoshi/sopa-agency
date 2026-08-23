// src/components/Solutions.tsx
'use client';
// zeitmedia-style sticky card stack: each card sticks at top, next slides over it.
// Reference mechanism (from their bundle): .sticky-card-wrap{position:sticky;top:0}
// + gsap.to(card, {opacity:0, scrollTrigger:{start:'top top', scrub:1}}) on all but the last.
// Ported as a single scroll listener — no GSAP needed for one opacity value per card.
import { useEffect, useRef } from 'react';
import { solutions } from '@/data/solutions';

export default function Solutions({ title, locale }: { title?: string; locale: string }) {
  const wraps = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    const els = wraps.current.filter(Boolean) as HTMLDivElement[];
    let raf = 0;
    const tick = () => {
      raf = 0;
      // fade each wrap out as it pins to viewport top; last one stays
      for (let i = 0; i < els.length - 1; i++) {
        const top = els[i].getBoundingClientRect().top;
        const f = Math.min(1, Math.max(0, -top / 300)); // fully faded 300px past pin
        els[i].style.opacity = String(1 - f);
      }
    };
    const onScroll = () => {
      if (!raf) raf = requestAnimationFrame(tick);
    };
    tick();
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll);
    return () => {
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onScroll);
      if (raf) cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <section className="max-w-7xl mx-auto px-6 py-16">
      <h2 className="text-3xl font-bold page-title-anim">{title}</h2>
      <div className="pb-[60vh]" /> {/* runway so the last cards can stack before section ends */}
      {solutions.map((s, i) => (
        <div
          key={s.num}
          ref={(el) => { wraps.current[i] = el; }}
          className="sticky top-24"
          style={{ zIndex: i + 1 }}
        >
          <div className="grid gap-6 rounded-2xl border border-white/15 bg-black/70 p-8 backdrop-blur-md md:grid-cols-12 md:p-12 mb-6">
            <div className="md:col-span-2 font-mono text-sm text-white/60">{s.num}</div>
            <div className="md:col-span-5">
              <h3 className="text-2xl font-semibold mb-4">{s.title}</h3>
              <p className="text-sm leading-relaxed text-white/70">
                {locale === 'pt' ? s.body.pt : s.body.en}
              </p>
            </div>
          </div>
        </div>
      ))}
    </section>
  );
}