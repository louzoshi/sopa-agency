// src/components/Footer.tsx
// Site footer: brand + socials + "work with us" CTA.
// No section nav here — the header/menu carry crawlable links; a footer copy
// would just be discounted boilerplate. Reveals with a fade + slide on scroll-in.
'use client';
import { useEffect, useRef, useState } from 'react';
import { site } from '@/data/site';
import ApplyModal from '@/components/ApplyModal';

// icon paths for socials rendered as a glyph strip; anything else falls back to a text row
const ICON: Record<string, string> = {
  Instagram:
    'M12 2.16c3.2 0 3.58.01 4.85.07 3.25.15 4.77 1.69 4.92 4.92.06 1.27.07 1.64.07 4.85 0 3.2-.01 3.58-.07 4.85-.15 3.23-1.66 4.77-4.92 4.92-1.27.06-1.64.07-4.85.07-3.2 0-3.58-.01-4.85-.07-3.26-.15-4.77-1.7-4.92-4.92-.06-1.27-.07-1.64-.07-4.85 0-3.2.01-3.58.07-4.85.15-3.23 1.66-4.77 4.92-4.92C8.42 2.17 8.8 2.16 12 2.16M12 0C8.74 0 8.33.01 7.05.07 2.7.27.27 2.69.07 7.05.01 8.33 0 8.74 0 12c0 3.26.01 3.67.07 4.95.2 4.36 2.62 6.78 6.98 6.98C8.33 23.99 8.74 24 12 24s3.67-.01 4.95-.07c4.35-.2 6.78-2.62 6.98-6.98.06-1.28.07-1.69.07-4.95s-.01-3.67-.07-4.95c-.2-4.35-2.62-6.78-6.98-6.98C15.67.01 15.26 0 12 0m0 5.84a6.16 6.16 0 100 12.32 6.16 6.16 0 000-12.32M12 16a4 4 0 110-8 4 4 0 010 8m6.41-11.85a1.44 1.44 0 100 2.88 1.44 1.44 0 000-2.88',
  X: 'M18.9 1.6h3.7l-8.1 9.2 9.5 12.6h-7.4l-5.8-7.6-6.6 7.6H.9l8.6-9.9L0 1.6h7.6l5.2 6.9 6.1-6.9Zm-1.3 19.5h2L6.5 3.6H4.3l13.3 17.5Z',
  GitHub:
    'M12 .5C5.37.5 0 5.78 0 12.29c0 5.2 3.44 9.6 8.2 11.16.6.1.82-.25.82-.56 0-.28-.01-1.02-.02-2-3.34.7-4.04-1.6-4.04-1.6-.55-1.36-1.33-1.73-1.33-1.73-1.09-.72.08-.71.08-.71 1.2.08 1.83 1.2 1.83 1.2 1.07 1.8 2.8 1.28 3.49.98.11-.76.42-1.28.76-1.57-2.67-.3-5.47-1.3-5.47-5.8 0-1.28.47-2.33 1.24-3.15-.13-.3-.54-1.5.11-3.15 0 0 1.01-.32 3.3 1.2a11.6 11.6 0 0 1 6 0c2.29-1.52 3.3-1.2 3.3-1.2.65 1.65.24 2.85.12 3.15.77.82 1.23 1.87 1.23 3.15 0 4.51-2.81 5.5-5.49 5.79.43.36.81 1.09.81 2.2 0 1.59-.01 2.87-.01 3.26 0 .31.21.68.83.56A12.02 12.02 0 0 0 24 12.29C24 5.78 18.63.5 12 .5Z',
};

export default function Footer({ locale }: { locale: string }) {
  const s = site[locale as keyof typeof site] ?? site.en;
  const pt = locale === 'pt';
  const [showApply, setShowApply] = useState(false);
  const ref = useRef<HTMLElement>(null);
  const [shown, setShown] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) {
          setShown(true);
          io.disconnect();
        }
      },
      { rootMargin: '0px 0px -48px 0px' },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  const socials = s.socials ?? [];
  const iconSocials = socials.filter(x => ICON[x.name]);
  const email = socials.find(x => x.url.startsWith('mailto:'));
  const farcaster = socials.find(x => x.name.toLowerCase().includes('farcaster'));

  return (
    <footer
      ref={ref}
      className={`relative z-20 border-t border-white/10 bg-black text-white transition-all duration-700 ease-out ${
        shown ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0'
      }`}
    >
      {/* warm glow rising from the very bottom — mirrors the CTA section */}
      <div
        className="pointer-events-none absolute inset-x-0 bottom-0 h-40"
        style={{ background: 'radial-gradient(60% 120% at 50% 100%, rgba(255,204,0,0.10), transparent 70%)' }}
      />

      <div className="relative mx-auto max-w-5xl px-6 py-10 sm:py-14">
        <div className="flex flex-col items-center gap-8 text-center sm:flex-row sm:items-start sm:justify-between sm:text-left">
          {/* brand */}
          <div>
            <a
              href={`/${locale}`}
              className="text-2xl font-bold tracking-tight transition-colors hover:text-amber-300"
            >
              SOPA
            </a>
            <p className="mt-3 max-w-xs text-sm leading-relaxed text-white/50 max-sm:mx-auto">{s.tagline}</p>
            <p className="mt-3 hidden font-mono text-[11px] text-amber-300/70 sm:block">
              {pt ? 'Do clássico ao onchain, do humano ao agente. 🛹⚡' : 'Classic to onchain, human to agent. 🛹⚡'}
            </p>
          </div>

          {/* connect */}
          <div className="flex flex-col items-center sm:items-end sm:text-right">
            <h3 className="mb-3 hidden font-mono text-[10px] uppercase tracking-[0.3em] text-white/35 sm:block">
              {pt ? 'conectar' : 'connect'}
            </h3>

            <div className="mb-4 flex gap-2">
              {iconSocials.map(x => (
                <a
                  key={x.name}
                  href={x.url}
                  target="_blank"
                  rel="noreferrer"
                  aria-label={x.name}
                  className="-m-1 p-1 text-white/45 transition-colors hover:text-amber-300"
                >
                  <svg viewBox="0 0 24 24" width={17} height={17} fill="currentColor" aria-hidden>
                    <path d={ICON[x.name]} />
                  </svg>
                </a>
              ))}
            </div>

            <ul className="space-y-2 text-sm">
              {farcaster && (
                <li>
                  <a
                    href={farcaster.url}
                    target="_blank"
                    rel="noreferrer"
                    className="text-white/60 transition-colors hover:text-amber-300"
                  >
                    {farcaster.name}
                  </a>
                </li>
              )}
              {email && (
                <li>
                  <a href={email.url} className="font-mono text-white/60 transition-colors hover:text-amber-300">
                    {email.name}
                  </a>
                </li>
              )}
            </ul>

            {/* work with us — dev / contributor applications (join the collective) */}
            <button
              onClick={() => setShowApply(true)}
              className="mt-5 inline-flex items-center gap-2 rounded-xl border border-amber-300/30 bg-amber-300/5 px-4 py-2 font-mono text-xs tracking-widest text-amber-200 transition-colors hover:border-amber-300/70 hover:bg-amber-300/10 cursor-pointer"
            >
              {pt ? 'trabalhe com a gente' : 'work with us'} →
            </button>
            <p className="mt-2 text-[11px] text-white/35">
              {pt ? 'devs e agentes — entrar no coletivo' : 'devs & agents — join the collective'}
            </p>
          </div>
        </div>

        {/* bottom bar */}
        <div className="mt-10 flex flex-col items-center gap-3 border-t border-white/10 pt-6 sm:mt-12 sm:flex-row sm:justify-between">
          <p className="text-xs text-white/40">
            sopa © {new Date().getFullYear()} ·{' '}
            {pt ? 'rede de criadores · feito coletivamente' : 'creator network · made collectively'}
          </p>
          <button
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            className="font-mono text-[11px] text-white/40 transition-colors hover:text-amber-300 cursor-pointer"
          >
            ↑ {pt ? 'topo' : 'back to top'}
          </button>
        </div>
      </div>

      {showApply && <ApplyModal locale={locale} onClose={() => setShowApply(false)} />}
    </footer>
  );
}
