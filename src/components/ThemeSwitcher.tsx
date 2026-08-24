// src/components/ThemeSwitcher.tsx
'use client';

import { useEffect, useState } from 'react';

export type FontTheme = 'next-gen' | 'cyber' | 'avant-garde';

const THEMES: { id: FontTheme; name: string; display: string; body: string }[] = [
  {
    id: 'next-gen',
    name: 'Next-Gen AI',
    display: 'Space Grotesk',
    body: 'Plus Jakarta',
  },
  {
    id: 'cyber',
    name: 'Cybernetic',
    display: 'Outfit',
    body: 'Inter',
  },
  {
    id: 'avant-garde',
    name: 'Avant-Garde',
    display: 'Syne',
    body: 'Plus Jakarta',
  },
];

export default function ThemeSwitcher() {
  // SSR always renders 'next-gen'; saved theme applied after mount (avoids hydration mismatch)
  const [currentTheme, setCurrentTheme] = useState<FontTheme>('next-gen');
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const saved = localStorage.getItem('sopa-font-theme') as FontTheme | null;
    if (saved && ['next-gen', 'cyber', 'avant-garde'].includes(saved)) setCurrentTheme(saved);
  }, []);

  useEffect(() => {
    document.documentElement.setAttribute('data-font-theme', currentTheme);
  }, [currentTheme]);

  const selectTheme = (theme: FontTheme) => {
    setCurrentTheme(theme);
    document.documentElement.setAttribute('data-font-theme', theme);
    localStorage.setItem('sopa-font-theme', theme);
    setIsOpen(false);
  };

  return (
    <div className="fixed bottom-4 right-[104px] z-50">
      {isOpen && (
        <div className="mb-2 p-2 rounded-xl border border-white/20 bg-black/90 backdrop-blur-xl shadow-2xl flex flex-col gap-1 min-w-[200px] page-anim">
          <div className="px-3 py-1 text-[11px] font-mono uppercase tracking-wider text-white/50 border-b border-white/10 mb-1">
            Select Font Theme
          </div>
          {THEMES.map((t) => (
            <button
              key={t.id}
              onClick={() => selectTheme(t.id)}
              className={`flex flex-col items-start px-3 py-2 rounded-lg text-left transition-all ${
                currentTheme === t.id
                  ? 'bg-amber-400/20 text-amber-300 border border-amber-400/40'
                  : 'text-white/80 hover:bg-white/10 hover:text-white'
              }`}
            >
              <span className="text-xs font-semibold">{t.name}</span>
              <span className="text-[10px] opacity-60">
                {t.display} + {t.body}
              </span>
            </button>
          ))}
        </div>
      )}

      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2 px-3 py-2 rounded-full border border-white/20 bg-black/80 backdrop-blur-md text-white text-xs hover:border-amber-400 hover:text-amber-300 transition-all shadow-lg cursor-pointer"
        title="Switch Typography Theme"
      >
        <span className="font-mono text-amber-400 font-bold">Aa</span>
        <span className="opacity-80">
          {THEMES.find((t) => t.id === currentTheme)?.name}
        </span>
        <span className="text-[10px] opacity-50">▼</span>
      </button>
    </div>
  );
}
