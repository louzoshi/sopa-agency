// src/components/Header.tsx
'use client';

interface HeaderProps {
  locale: string;
  isMenuOpen: boolean;
  setIsMenuOpen: (open: boolean) => void;
  onNavigate: (section: 'home' | 'work' | 'team' | 'portfolio' | 'solutions' | 'about' | 'contact') => void;
}

export default function Header({ setIsMenuOpen, onNavigate }: HeaderProps) {
  return (
    <header className="fixed top-0 inset-x-0 z-30 flex h-16 items-center justify-between px-4 bg-black/70 backdrop-blur text-white">
      <div className="flex items-center space-x-4">
        <a href="#" className="flex items-center" onClick={e => { e.preventDefault(); onNavigate('home'); }}>
          <span className="text-xl font-bold">SOPA</span>
        </a>
      </div>
      <nav className="hidden md:flex space-x-6">
        <a href="#" className="hover:text-gray-300 transition-colors" onClick={e => { e.preventDefault(); onNavigate('home'); }}>home</a>
        <a href="#" className="hover:text-gray-300 transition-colors" onClick={e => { e.preventDefault(); onNavigate('work'); }}>work</a>
        <a href="#" className="hover:text-gray-300 transition-colors" onClick={e => { e.preventDefault(); onNavigate('team'); }}>team</a>
        <a href="#" className="hover:text-gray-300 transition-colors" onClick={e => { e.preventDefault(); onNavigate('portfolio'); }}>portfolio</a>
        <a href="#" className="hover:text-gray-300 transition-colors" onClick={e => { e.preventDefault(); onNavigate('solutions'); }}>solutions</a>
        <a href="#" className="hover:text-gray-300 transition-colors" onClick={e => { e.preventDefault(); onNavigate('about'); }}>about</a>
        <a href="#" className="hover:text-gray-300 transition-colors" onClick={e => { e.preventDefault(); onNavigate('contact'); }}>contact</a>
      </nav>
      <button className="md:hidden" aria-label="Open menu" onClick={() => setIsMenuOpen(true)}>
        <span className="block h-0.5 w-6 bg-white mb-1.5"></span>
        <span className="block h-0.5 w-6 bg-white mb-1.5"></span>
        <span className="block h-0.5 w-6 bg-white"></span>
      </button>
    </header>
  );
}
