// src/components/MobileMenu.tsx
'use client';

interface MobileMenuProps {
  isOpen: boolean;
  onClose: () => void;
  locale: string;
  onNavigate: (section: 'home' | 'work' | 'team' | 'portfolio' | 'solutions' | 'about' | 'contact') => void;
}

const LINKS = ['home', 'work', 'team', 'portfolio', 'solutions', 'about', 'contact'] as const;

export default function MobileMenu({ isOpen, onClose, onNavigate }: MobileMenuProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-40">
      <div className="text-center space-y-6">
        <nav>
          {LINKS.map(s => (
            <a
              key={s}
              href="#"
              className="block py-2 px-4 text-white hover:text-gray-300 transition-colors"
              onClick={e => { e.preventDefault(); onNavigate(s); onClose(); }}
            >
              {s}
            </a>
          ))}
        </nav>
        <button onClick={onClose} className="text-white hover:text-gray-300">✕</button>
      </div>
    </div>
  );
}
