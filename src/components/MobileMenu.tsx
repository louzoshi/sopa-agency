// src/components/MobileMenu.tsx
'use client';
import { useEffect, useState } from 'react';

type Section = 'home' | 'work' | 'team' | 'feed' | 'solutions' | 'about' | 'contact';

interface MobileMenuProps {
  isOpen: boolean;
  onClose: () => void;
  locale: string;
  section: Section;
  onNavigate: (section: Section) => void;
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

export default function MobileMenu({ isOpen, onClose, locale, section, onNavigate }: MobileMenuProps) {
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
  const hrefFor = (id: string) => (id === 'home' ? `/${locale}` : `/${locale}/${id}`);

  return (
    <div className={`fixed inset-0 bg-black/95 backdrop-blur-2xl z-50 flex flex-col justify-between p-6 sm:p-10 ${closing ? 'menu-out' : 'menu-in'}`}>
      {/* Top bar with Logo and Close button */}
      <div className="flex items-center justify-between border-b border-white/10 pb-4">
        <span className="text-xl font-bold font-display tracking-tight text-white">SOPA</span>
        <button
          onClick={onClose}
          className="-mr-2 flex h-11 w-11 items-center justify-center text-xl text-white/70 hover:text-amber-400 transition-colors cursor-pointer"
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
          const active = section === item.id;

          return (
            <a
              key={item.id}
              href={hrefFor(item.id)}
              aria-current={active ? 'page' : undefined}
              className={`group flex items-baseline justify-between py-2 border-b transition-all menu-link-in ${
                active ? 'border-amber-400/40' : 'border-white/5 hover:border-amber-400/40'
              }`}
              style={{ animationDelay: closing ? '0s' : `${0.06 + index * 0.045}s` }}
              onClick={(e) => {
                e.preventDefault();
                onNavigate(item.id);
                onClose();
              }}
            >
              <span
                className={`text-3xl sm:text-4xl font-bold font-display transition-all ${
                  active
                    ? 'text-amber-300 translate-x-2'
                    : 'text-white group-hover:text-amber-300 group-hover:translate-x-2'
                }`}
              >
                {label}
              </span>
              <span
                className={`font-mono text-xs transition-colors ${
                  active ? 'text-amber-400' : 'text-white/40 group-hover:text-amber-400'
                }`}
              >
                {num}
              </span>
            </a>
          );
        })}
      </nav>
    </div>
  );
}
