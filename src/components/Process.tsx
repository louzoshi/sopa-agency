// src/components/Process.tsx
// "How It Works" — 4-phase process journey appended to the Solutions page.
// Scroll-driven: each phase's diagram lights up as it enters the viewport
// (IntersectionObserver, one shared observer). Same amber-glass language as
// the rest of the site; respects prefers-reduced-motion via CSS only.
'use client';
import { useEffect, useRef, useState } from 'react';
import { processIntro, phases, processClosing, processFaq } from '@/data/process';

export default function Process({ locale }: { locale: string }) {
  const t = (o: { en: string; pt: string }) => (locale === 'pt' ? o.pt : o.en);
  const [openFaq, setOpenFaq] = useState<number | null>(0);
  const refs = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    const els = refs.current.filter(Boolean) as HTMLDivElement[];
    const obs = new IntersectionObserver(
      entries => {
        for (const e of entries) {
          if (e.isIntersecting) e.target.classList.add('phase-on');
        }
      },
      { threshold: 0.35 },
    );
    els.forEach(el => obs.observe(el));
    return () => obs.disconnect();
  }, []);

  return (
    <section className="max-w-7xl mx-auto px-6 pb-24">
      {/* intro */}
      <div className="mb-16">
        <div className="inline-flex rounded-xl border border-amber-300/30 bg-amber-300/10 px-4 py-2 font-mono text-xs text-amber-200">
          {processIntro.label}
        </div>
        <h2 className="mt-6 text-3xl sm:text-5xl font-black tracking-tighter uppercase leading-[0.95] page-title-anim">
          {t(processIntro.title)}
        </h2>
        <p className="mt-4 max-w-3xl text-white/70 leading-relaxed page-title-anim page-title-anim-d1">
          {t(processIntro.body)}
        </p>
      </div>

      {/* phases */}
      <div className="space-y-6">
        {phases.map((p, i) => (
          <div
            key={p.num}
            ref={el => { refs.current[i] = el; }}
            className="process-phase rounded-2xl border border-white/15 bg-black/80 backdrop-blur-md p-8 md:p-12 transition-colors hover:border-amber-300/40"
          >
            <div className="grid gap-8 md:grid-cols-12">
              <div className="md:col-span-5 space-y-4 min-w-0">
                <div className="font-mono text-sm font-bold tracking-widest text-amber-300">{t(p.label)}</div>
                <h3 className="text-2xl md:text-3xl font-semibold tracking-tight">{t(p.title)}</h3>
                <p className="text-base leading-relaxed text-white/70">{t(p.body)}</p>
                <ul className="space-y-1.5 pt-2">
                  {p.points.en.map((_, j) =>
                    p.points.pt[j] || _ ? (
                      <li key={j} className="flex items-center gap-2 text-sm text-white/60">
                        <span className="text-amber-300">›</span>
                        {locale === 'pt' ? p.points.pt[j] : _}
                      </li>
                    ) : null,
                  )}
                </ul>
              </div>
              {/* diagram — scrolls inside its own box; min-w-0 lets the grid track shrink */}
              <div className="md:col-span-7 flex items-center min-w-0">
                <div className="w-full min-w-0 rounded-xl border border-white/10 bg-white/[0.03] p-4 sm:p-6 font-mono text-xs overflow-x-auto">
                  <div className="flex items-center gap-2 min-w-max">
                    {(locale === 'pt' ? p.diagram.pt : p.diagram.en).map((node, j, arr) => (
                      <span key={j} className="flex items-center gap-2">
                        <span
                          className={`diag-node rounded-lg border px-3 py-2 whitespace-nowrap ${
                            p.highlight && (locale === 'pt' ? p.highlight.pt : p.highlight.en) === node
                              ? 'border-red-400/40 bg-red-400/10 text-red-300'
                              : 'border-white/15 bg-white/5 text-white/70'
                          }`}
                        >
                          {node}
                        </span>
                        {j < arr.length - 1 && <span className="diag-arrow text-amber-300/70">→</span>}
                      </span>
                    ))}
                  </div>
                  {p.num === '03' && (
                    <div className="mt-4 space-y-1 border-t border-white/10 pt-3 text-emerald-300/80">
                      {['API Connected ✓', 'Integration Verified ✓', 'Security Check Passed ✓'].map(s => (
                        <div key={s}>{s}</div>
                      ))}
                    </div>
                  )}
                  {p.num === '04' && (
                    <div className="mt-4 flex items-center gap-2 border-t border-white/10 pt-3">
                      <span className="h-2.5 w-2.5 rounded-full bg-emerald-400 animate-pulse" />
                      <span className="text-emerald-300">SYSTEM ONLINE</span>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* closing + CTA */}
      <div className="mt-20 text-center">
        <h3 className="mx-auto max-w-3xl text-2xl sm:text-4xl font-black tracking-tighter uppercase leading-[1]">
          {t(processClosing.title)}
        </h3>
        <p className="mx-auto mt-4 max-w-2xl text-white/70 leading-relaxed">{t(processClosing.body)}</p>
        <a
          href="#"
          onClick={e => e.preventDefault()}
          className="mt-8 inline-block rounded-xl border border-amber-300/30 bg-amber-300/10 px-6 py-3 font-mono text-sm text-amber-200 transition-colors hover:bg-amber-300/20"
        >
          {t(processClosing.cta)}
        </a>
      </div>

      {/* FAQ */}
      <div className="mt-20 mx-auto max-w-3xl">
        <h3 className="font-mono text-sm tracking-widest text-white/50 mb-6">FAQ</h3>
        {processFaq.map((f, i) => (
          <div key={i} className="border-b border-white/10">
            <button
              onClick={() => setOpenFaq(openFaq === i ? null : i)}
              aria-expanded={openFaq === i}
              className="flex w-full items-center justify-between py-4 text-left text-base font-medium hover:text-amber-200 transition-colors"
            >
              {t(f.q)}
              <span className={`ml-4 shrink-0 text-amber-300 transition-transform ${openFaq === i ? 'rotate-45' : ''}`}>+</span>
            </button>
            {openFaq === i && <p className="pb-4 text-sm leading-relaxed text-white/70">{t(f.a)}</p>}
          </div>
        ))}
      </div>
    </section>
  );
}
