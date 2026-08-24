// src/app/[locale]/LayoutClient.tsx
// Single-page app: WebGL/video background mounts once,
// menu clicks swap sections client-side behind the bar wipe.
'use client';

import { useEffect, useState, useMemo } from 'react';
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import MobileMenu from "@/components/MobileMenu";
import TransitionOverlay, { withWipe } from "@/components/TransitionOverlay";
import WebGL from "@/components/WebGL";
import Showreel from "@/components/Showreel";
import WorkDetail from "@/components/WorkDetail";
import Loader from "@/components/Loader";
import ScrollShowcase from "@/components/ScrollShowcase";
import { site } from "@/data/site";
import { work } from "@/data/work";
import type { WorkItem } from "@/data/work";
import { team } from "@/data/team";
import Team from "@/components/Team";
import Solutions from "@/components/Solutions";
import About from "@/components/About";
import Contact from "@/components/Contact";
import ThemeSwitcher from "@/components/ThemeSwitcher";
import { feed } from "@/data/feed";

type Section = 'home' | 'work' | 'team' | 'feed' | 'solutions' | 'about' | 'contact';

// ponytail: solutions/contact have no data files yet — inline until they earn one
const EXTRA = {
  en: {
    solutions: { title: 'Solutions', body: 'AI agents, campaign engineering, portals & onchain tooling.' },
    contact: { title: 'Contact', body: 'crew@sopa.team' },
  },
  pt: {
    solutions: { title: 'Soluções', body: 'Agentes de IA, engenharia de campanhas, portais e ferramentas onchain.' },
    contact: { title: 'Contato', body: 'crew@sopa.team' },
  },
} as const;

export default function LayoutClient({
  children,
  locale,
}: {
  children: React.ReactNode;
  locale: string;
}) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [section, setSection] = useState<Section>('home');
  const [reelUrl, setReelUrl] = useState<string | null>(null);
  const [detailItem, setDetailItem] = useState<WorkItem | null>(null);
  const [progress, setProgress] = useState(0);
  const [workFilter, setWorkFilter] = useState<'all' | 'events' | 'marketing' | 'production' | 'branding'>('all');
  // globe/video layer: home hero opens up (orb unfolds) as you scroll into the presentation
  const [scrollP, setScrollP] = useState(0); // 0 top of hero .. 1 fully into presentation
  // menu sections: orb opens on entry and STAYS open while on that section
  const [menuOpenAnim, setMenuOpenAnim] = useState(0);
  const heroVisible = true; // orb + particles always visible as background (all pages)
  const orbOpen = section === 'home' ? scrollP : menuOpenAnim;
  const loaded = progress >= 1;

  useEffect(() => {
    if (section === 'home') return;
    // open: 0 -> 1 over ~0.85s, then stay open (orb remains unfolded behind page content)
    let start: number;
    let handle: number;
    const duration = 850;
    const tick = (now: number) => {
      if (!start) start = now;
      const t = Math.min(1, (now - start) / duration);
      // easeOutCubic
      setMenuOpenAnim(1 - Math.pow(1 - t, 3));
      if (t < 1) handle = requestAnimationFrame(tick);
    };
    handle = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(handle);
  }, [section]);

  useEffect(() => {
    if (section !== 'home') return;
    const onScroll = () => setScrollP(Math.min(1, window.scrollY / (window.innerHeight * 1.2)));
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener('scroll', onScroll);
  }, [section]);

  useEffect(() => {
    // reveal gate: orb first frame (WebGL fires onProgress on its first render)
    // AND a minimum loader display time, so the loading line is actually seen
    // instead of the video flashing in first
    let ready = false;
    let minDone = false;
    function maybeReveal() {
      if (ready && minDone) setProgress(1);
    }
    const t = setTimeout(() => { minDone = true; maybeReveal(); }, 1200);
    (window as unknown as { __orbFirstFrame?: () => void }).__orbFirstFrame = () => { ready = true; maybeReveal(); };
    return () => clearTimeout(t);
  }, []);

  const l = locale as keyof typeof site;
  const t = site[l] ?? site.en;
  const ex = EXTRA[l] ?? EXTRA.en;

  const navigate = (s: Section) => {
    if (s === section) {
      // already there — just go back to top
      window.scrollTo({ top: 0, behavior: 'smooth' });
      return;
    }
    withWipe(() => {
      window.scrollTo({ top: 0 });
      setSection(s);
    });
  };

  const list = work[l]?.list ?? [];

  const filteredList = useMemo(() => {
    if (workFilter === 'all') return list;
    return list.filter(item => item.category === workFilter);
  }, [list, workFilter]);

  return (
    <>
      <Loader progress={loaded ? 1 : 0.5} done={loaded} />
      {/* Orb background — fixed, full-screen, always behind content */}
      <div
        className="fixed inset-0 z-0 transition-opacity duration-1000 ease-in-out"
        style={{
          visibility: heroVisible ? 'visible' : 'hidden',
          opacity: loaded ? 1 : 0
        }}
        data-hero-bg
      >
        <div className="absolute inset-0">
          <WebGL section={section} open={orbOpen} onProgress={setProgress} />
        </div>
      </div>

      <Header locale={locale} isMenuOpen={isMenuOpen} setIsMenuOpen={setIsMenuOpen} onNavigate={navigate} />

      {/* Hero content overlay — only on home, over orb */}
      {section === 'home' && (
        <div
          className="fixed inset-0 z-10 flex flex-col items-center justify-center min-h-screen text-center px-6 pointer-events-none transition-opacity duration-700"
          style={{ opacity: 1 - scrollP }}
        >
          <div className="page-anim font-futura pointer-events-auto max-w-5xl">
            <div className="mb-6 inline-flex items-center gap-2 rounded-xl border border-amber-300/30 bg-amber-300/10 px-4 py-2 font-mono text-xs text-amber-200 backdrop-blur-sm">
              <span>Web</span>
              <span className="opacity-40">·</span>
              <span>AI</span>
              <span className="opacity-40">·</span>
              <span>Base</span>
            </div>
            <h1
              className="text-6xl sm:text-7xl md:text-8xl lg:text-9xl font-black uppercase tracking-tighter text-white leading-[0.9] mb-6"
              style={{ textShadow: '0 8px 40px rgba(0,0,0,0.8), 0 2px 12px rgba(0,0,0,0.6)' }}
            >
              {t.title}
            </h1>
            <p className="text-xl sm:text-2xl md:text-3xl font-semibold text-white/95 mb-4 tracking-tight"
              style={{ textShadow: '0 8px 40px rgba(0,0,0,0.8), 0 2px 12px rgba(0,0,0,0.6)' }}
            >
              {t.tagline}
            </p>
            <p className="text-sm sm:text-base md:text-lg text-white/60 max-w-2xl mx-auto leading-relaxed"
              style={{ textShadow: '0 8px 40px rgba(0,0,0,0.8), 0 2px 12px rgba(0,0,0,0.6)' }}
            >
              {t.description}
            </p>
            <span className="mt-12 inline-block text-xs opacity-40 animate-pulse pointer-events-auto">↓</span>
          </div>
        </div>
      )}

      <main className="relative z-20 flex-grow text-white pt-16">
        {children}
        {/* ghost watermark title behind content — slides up with page-anim */}
        {section !== 'home' && (
          <div key={'g' + section} className="page-anim fixed inset-x-0 top-[12vh] overflow-hidden pointer-events-none">
            <div className="ghost-title">{section}</div>
          </div>
        )}
        {section === 'home' && <ScrollShowcase />}
        <div key={section}>
          {section === 'work' && (
            <div className="max-w-7xl mx-auto px-6 py-16">
              {/* title: slides from right */}
              <h2 className="text-3xl font-bold mb-2 page-title-anim">{work[l]?.title}</h2>
              <p className="mb-6 opacity-70 page-title-anim page-title-anim-d1">{work[l]?.subtitle}</p>
              {/* filter tabs */}
              <div className="flex flex-wrap gap-2 mb-8" role="tablist" aria-label="Work categories">
                {(['all', 'events', 'marketing', 'production', 'branding'] as const).map(cat => (
                  <button
                    key={cat}
                    role="tab"
                    aria-selected={workFilter === cat}
                    onClick={() => setWorkFilter(cat)}
                    className={`px-4 py-1.5 text-sm font-medium rounded-xl border transition-colors ${
                      workFilter === cat
                        ? 'border-amber-300/30 bg-amber-300/10 text-amber-200'
                        : 'border-white/20 text-white/70 hover:border-white/40 hover:text-white'
                    }`}
                  >
                    {cat.charAt(0).toUpperCase() + cat.slice(1)}
                  </button>
                ))}
              </div>
              {/* grid: drifts up */}
              <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 page-anim page-anim-d1">
                {filteredList.map((item, i) => (
                  <div
                    key={i}
                    className="group relative overflow-hidden cursor-pointer work-tile"
                    onClick={() => item.video ? setReelUrl(item.video) : setDetailItem(item.detail ? item : null)}
                  >
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img src={item.thumb} alt={item.title} loading="lazy" className="w-full aspect-video object-cover" />
                    <div className="absolute inset-0 flex flex-col justify-end p-4 bg-gradient-to-t from-black/80 via-black/20 to-transparent">
                      <span className="text-sm opacity-70">{item.subtitle}</span>
                      <span className="font-semibold">{item.title}</span>
                      {item.video && <span className="mt-1 text-xs opacity-60">▶ watch</span>}
                      {!item.video && item.detail && <span className="mt-1 text-xs opacity-60">read more →</span>}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
          {section === 'team' && <Team title={team[l]?.title} subtitle={team[l]?.subtitle} locale={locale} />}
          {section === 'feed' && (
            <div className="max-w-7xl mx-auto px-6 py-16">
              <h2 className="text-3xl font-bold mb-2 page-title-anim">{feed[l]?.title}</h2>
              <p className="mt-4 opacity-50 page-anim page-anim-d1">Coming soon.</p>
            </div>
          )}
          {section === 'solutions' && <Solutions title={ex.solutions.title} locale={locale} />}
                  {section === 'about' && <About locale={locale} />}
                  {section === 'contact' && <Contact title={ex.contact.title} locale={locale} />}
        </div>
      </main>

      {/* Footer: normal flow — appears naturally after content when scrolled */}
      <Footer locale={locale} />

      <MobileMenu isOpen={isMenuOpen} onClose={() => setIsMenuOpen(false)} locale={locale} onNavigate={navigate} />
      <TransitionOverlay />
      <Showreel videoUrl={reelUrl} onClose={() => setReelUrl(null)} />
      <WorkDetail item={detailItem} onClose={() => setDetailItem(null)} />
      <ThemeSwitcher />
    </>
  );
}