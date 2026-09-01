// src/components/Solutions.tsx
'use client';
// zeitmedia-style sticky card stack: each card sticks at top, next slides over it.
// Reference mechanism (from their bundle): .sticky-card-wrap{position:sticky;top:0}
// + gsap.to(card, {opacity:0, scrollTrigger:{start:'top top', scrub:1}}) on all but the last.
// Ported as a single scroll listener — no GSAP needed for one opacity value per card.
import { useEffect, useRef } from 'react';
import { solutions } from '@/data/solutions';
import SectionFolio from '@/components/SectionFolio';

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
      <SectionFolio section="solutions" locale={locale} />
      <h2 className="font-display text-3xl font-bold page-title-anim">{title}</h2>
      <p className="mt-3 mb-6 max-w-2xl text-white/70 leading-relaxed page-title-anim page-title-anim-d1">
        {locale === 'pt'
          ? 'Sistemas sob medida, construídos em torno da sua operação — de agentes de IA a receita onchain. Entendemos o problema, desenhamos, construímos e colocamos em produção.'
          : 'Custom-built systems engineered around your operation — from AI agents to onchain revenue. We understand the problem, design the system, build it, and put it into production.'}
      </p>
      {solutions.map((s, i) => (
        <div
          key={s.num}
          ref={(el) => { wraps.current[i] = el; }}
          className="sticky top-24"
          style={{ zIndex: i + 1 }}
        >
          <div className="flex flex-col md:flex-row gap-8 rounded-2xl border border-white/15 bg-black/80 p-8 backdrop-blur-md md:p-12 mb-6 hover:border-amber-300/40 transition-colors items-center">
            <div className="flex-1 space-y-4 w-full">
              <h3 className="text-2xl md:text-3xl font-semibold tracking-tight">{s.title}</h3>
              <p className="text-base leading-relaxed text-white/80">
                {locale === 'pt' ? s.body.pt : s.body.en}
              </p>
              {s.tags && s.tags.length > 0 && (
                <div className="flex flex-wrap gap-2 pt-2">
                  {s.tags.map((tag) => (
                    <span
                      key={tag}
                      className="rounded-full border border-white/15 bg-white/5 px-3 py-1 font-mono text-xs text-white/60"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              )}
            </div>
            <div className="w-full md:w-1/2 lg:w-5/12 flex-shrink-0 flex items-center justify-center rounded-xl overflow-hidden bg-white/5 border border-white/10 aspect-video md:aspect-[4/3]">
              {s.image ? (
                /* eslint-disable-next-line @next/next/no-img-element */
                <img src={s.image} alt="" loading="lazy" className="w-full h-full object-cover" />
              ) : (
                <div className="text-8xl opacity-80">{s.icon}</div>
              )}
            </div>
          </div>
        </div>
      ))}
      <div className="pb-[45vh]" /> {/* runway so the last cards can stack before section ends */}
    </section>
  );
}