// src/components/MobileMenu.tsx
'use client';
import { useEffect, useState } from 'react';

interface MobileMenuProps {
  isOpen: boolean;
  onClose: () => void;
  locale: string;
  onNavigate: (section: 'home' | 'work' | 'team' | 'feed' | 'solutions' | 'about' | 'contact') => void;
}

const LINKS = [
  { id: 'home', en: 'Home', pt: 'Início' },
  { id: 'work', en: 'Work', pt: 'Trabalho' },
  { id: 'team', en: 'Team', pt: 'Equipe' },
  { id: 'feed', en: 'Feed', pt: 'Feed' },
  { id: 'solutions', en: 'Solutions', pt: 'Soluções' },
  { id: 'about', en: 'About', pt: 'Sobre' },
  { id: 'contact', en: 'Contact', pt: 'Contato' },
] as const;

const EXIT_MS = 220; // matches .menu-out duration in globals.css

export default function MobileMenu({ isOpen, onClose, locale, onNavigate }: MobileMenuProps) {
  // stay mounted through the close animation instead of vanishing instantly
  const [rendered, setRendered] = useState(isOpen);
  const [closing, setClosing] = useState(false);

  useEffect(() => {
    if (isOpen) {
      // eslint-disable-next-line react-hooks/set-state-in-effect -- mount before the open animation plays
      setRendered(true);
      setClosing(false);
      return;
    }
    if (!rendered) return;
    setClosing(true);
    const t = setTimeout(() => setRendered(false), EXIT_MS);
    return () => clearTimeout(t);
    // eslint-disable-next-line react-hooks/exhaustive-deps -- only re-run on open/close toggles
  }, [isOpen]);

  if (!rendered) return null;

  const isPt = locale === 'pt';

  return (
    <div className={`fixed inset-0 bg-black/95 backdrop-blur-2xl z-50 flex flex-col justify-between p-6 sm:p-10 ${closing ? 'menu-out' : 'menu-in'}`}>
      {/* Top bar with Logo and Close button */}
      <div className="flex items-center justify-between border-b border-white/10 pb-4">
        <span className="text-xl font-bold font-display tracking-tight text-white">SOPA</span>
        <button
          onClick={onClose}
          className="w-11 h-11 flex items-center justify-center rounded-full border border-white/20 bg-white/5 text-white hover:border-amber-400 hover:text-amber-400 transition-all text-xl cursor-pointer"
          aria-label="Close menu"
        >
          ✕
        </button>
      </div>

      {/* Main navigation list with large stylish typography */}
      <nav className="my-auto py-6 flex flex-col space-y-4">
        {LINKS.map((item, index) => {
          const num = String(index + 1).padStart(2, '0');
          const label = isPt ? item.pt : item.en;

          return (
            <a
              key={item.id}
              href={`#${item.id}`}
              className="group flex items-baseline justify-between py-2 border-b border-white/5 hover:border-amber-400/40 transition-all menu-link-in"
              style={{ animationDelay: closing ? '0s' : `${0.06 + index * 0.045}s` }}
              onClick={(e) => {
                e.preventDefault();
                onNavigate(item.id);
                onClose();
              }}
            >
              <span className="text-3xl sm:text-4xl font-bold font-display text-white group-hover:text-amber-300 group-hover:translate-x-2 transition-all">
                {label}
              </span>
              <span className="font-mono text-xs text-white/40 group-hover:text-amber-400 transition-colors">
                {num}
              </span>
            </a>
          );
        })}
      </nav>
    </div>
  );
}
