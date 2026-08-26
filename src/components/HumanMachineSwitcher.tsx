'use client';

import { useState, useEffect } from 'react';
import { site } from '@/data/site';
import { workItems } from '@/data/work';
import { members } from '@/data/team';

// basement.studio/ai-inspired machine view — SOPA amber palette.
const DIM = 'text-amber-200/40';
const BRIGHT = 'text-amber-300';

function Rule({ label }: { label: string }) {
  const width = 88;
  const dashes = Math.max(4, width - label.length - 6);
  return (
    <h2 className={`w-full overflow-hidden whitespace-nowrap ${DIM}`}>
      ── {label} {'─'.repeat(dashes)}
    </h2>
  );
}

function Row({ k, v, href }: { k: string; v: string; href?: string }) {
  const dots = '.'.repeat(Math.max(1, 15 - k.length));
  return (
    <div className="flex">
      <dt className={`shrink-0 whitespace-pre ${DIM}`}>{k} {dots} </dt>
      <dd className="min-w-0 [overflow-wrap:anywhere]">
        {href ? (
          <a href={href} className={`underline underline-offset-4 transition-colors hover:${BRIGHT}`}>{v}</a>
        ) : (
          v
        )}
      </dd>
    </div>
  );
}

export default function HumanMachineSwitcher({ locale }: { locale: string }) {
  const [mode, setMode] = useState<'HUMAN' | 'MACHINE'>('HUMAN');
  const [booted, setBooted] = useState(false);

  // always start in HUMAN; no persistence so every visit loads the human site
  useEffect(() => {
    localStorage.removeItem('sopa-mode');
    // eslint-disable-next-line react-hooks/set-state-in-effect -- booted must start false for the machine-view fade-in
    setBooted(true);
  }, []);

  const toggle = (newMode: 'HUMAN' | 'MACHINE') => {
    setMode(newMode);
    if (newMode === 'MACHINE') {
      setBooted(false);
      setTimeout(() => setBooted(true), 350);
    }
  };

  const l = (locale === 'pt' ? 'pt' : 'en') as 'en' | 'pt';
  const t = site[l] || site.en;

  const mdLinks: [string, string][] = [
    ['llms.txt', '/llms.txt'],
    ['index.md', '/index.md'],
    ['work.md', '/work.md'],
    ['team.md', '/team.md'],
    ['feed.md', '/feed.md'],
    ['solutions.md', '/solutions.md'],
    ['about.md', '/about.md'],
    ['contact.md', '/contact.md'],
    ['agents.md', '/agents.md'],
    ['sitemap.md', '/sitemap.md'],
  ];

  return (
    <>
      {/* mode pill — inline child of the grouped switcher bar */}
      <nav aria-label="Site mode" className="relative z-[61]">
        <div className="flex items-center rounded-full border border-amber-300/30 bg-black/90 font-mono text-xs backdrop-blur-md shadow-lg shadow-amber-500/5">
          {(['HUMAN', 'MACHINE'] as const).map((m) => (
            <button
              key={m}
              onClick={() => toggle(m)}
              aria-pressed={mode === m}
              className={`cursor-pointer rounded-full px-4 py-2 uppercase tracking-widest transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-amber-400 ${
                mode === m ? `${BRIGHT}` : 'text-white/50 hover:text-white'
              }`}
            >
              {m}
            </button>
          ))}
        </div>
      </nav>

      {mode === 'MACHINE' && (
        <main
          className={`fixed inset-0 z-[55] overflow-y-auto bg-black font-mono transition-opacity duration-300 ${
            booted ? 'opacity-100' : 'opacity-0'
          }`}
        >
          <div className="mx-auto max-w-5xl px-4 py-10 sm:px-8 md:py-14">
            {/* ASCII banner */}
            <pre aria-hidden className="w-full overflow-hidden text-[min(16px,calc((100vw-2rem)/38))] leading-tight text-amber-300/80">
{`███████╗ ██████╗ ██████╗  █████╗     \n██╔════╝██╔═══██╗██╔══██╗██╔══██╗    \n███████╗██║   ██║██████╔╝███████║    \n╚════██║██║   ██║██╔═══╝ ██╔══██║    \n███████║╚██████╔╝██║     ██║  ██║    \n╚══════╝ ╚═════╝ ╚═╝     ╚═╝  ╚═╝    `}
            </pre>
            <h1 className={`mt-4 ${BRIGHT}`}>sopa.team :: machine-readable index</h1>
            <p className={`mt-1 ${DIM}`}># plain-text mirror of sopa.team for AI agents, crawlers, and humans who prefer it raw.</p>

            <section className="mt-10 flex flex-col gap-2">
              <Rule label="ABOUT" />
              <dl className="flex flex-col gap-1 text-sm sm:text-base">
                <Row k="name" v={`${t.title}`} />
                <Row k="aka" v="SOPA, Sopa Agency" />
                <Row k="founded" v="2024" />
                <Row k="location" v="Global / Decentralized" />
                <Row k="services" v="Creative engineering, AI agents, Onchain/Web3, Campaign architecture, High-end visuals & branding" />
                <Row k="clients" v="Gnars, SkateHive, Morpheus, Venice, Base, Nouns, KeepKey" />
              </dl>
              <p className="mt-3 max-w-3xl text-sm leading-relaxed sm:text-base">{t.description}</p>
            </section>

            <section className="mt-10 flex flex-col gap-2">
              <Rule label="WORK" />
              <ul className="flex flex-col gap-1 text-sm sm:text-base">
                {workItems.map((w) => (
                  <li key={w.title}>
                    <span className={DIM}>- </span>
                    {w.title}: <span className="text-white/70">{w.subtitle}</span>
                  </li>
                ))}
              </ul>
            </section>

            <section className="mt-10 flex flex-col gap-2">
              <Rule label="TEAM" />
              <ul className="flex flex-col gap-1 text-sm sm:text-base">
                {members.map((m) => (
                  <li key={m.handle}>
                    <span className={DIM}>- </span>
                    @{m.handle}
                    {m.ai && <span className={BRIGHT}> [AI AGENT]</span>}
                    {m.bio?.[l] && <span className="text-white/70">: {m.bio[l]}</span>}
                  </li>
                ))}
              </ul>
            </section>

            <section className="mt-10 flex flex-col gap-2">
              <Rule label="FOR_AGENTS" />
              <p className={DIM}># every page also serves markdown: append .md to a URL, or request it with Accept: text/markdown</p>
              <dl className="grid grid-cols-1 gap-x-8 gap-y-1 text-sm sm:grid-cols-2 sm:text-base">
                {mdLinks.map(([k, href]) => (
                  <Row key={k} k={k} v={href} href={href} />
                ))}
              </dl>
            </section>

            <footer className={`mt-12 flex flex-col gap-1 pb-24 ${DIM}`}>
              <p>
                {'© 2026 SOPA Agency — '}
                {/* eslint-disable-next-line @next/next/no-html-link-for-pages -- full reload back to the human site */}
                <a href="/" className="underline underline-offset-4 transition-colors hover:text-white">back to human site</a>
              </p>
              <p>{'/* EOF */'}</p>
            </footer>
          </div>
        </main>
      )}
    </>
  );
}
