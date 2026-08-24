// src/components/MobileMenu.tsx
'use client';

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

export default function MobileMenu({ isOpen, onClose, locale, onNavigate }: MobileMenuProps) {
  if (!isOpen) return null;

  const isPt = locale === 'pt';

  return (
    <div className="fixed inset-0 bg-black/95 backdrop-blur-2xl z-50 flex flex-col justify-between p-6 sm:p-10 page-anim">
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
              className="group flex items-baseline justify-between py-2 border-b border-white/5 hover:border-amber-400/40 transition-all"
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

      {/* Footer Info */}
      <div className="pt-4 border-t border-white/10 flex items-center justify-between text-xs text-white/50 font-mono">
        <span>SOPA AGENCY © 2026</span>
        <span className="text-amber-400/80">CREATIVE TECH & AI</span>
      </div>
    </div>
  );
}

