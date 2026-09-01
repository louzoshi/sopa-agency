// src/components/Header.tsx
'use client';

type Section = 'home' | 'work' | 'team' | 'feed' | 'solutions' | 'about' | 'contact';

interface HeaderProps {
  locale: string;
  section: Section;
  isMenuOpen: boolean;
  setIsMenuOpen: (open: boolean) => void;
  onNavigate: (section: Section) => void;
}

const LINKS: { id: Section; label: string }[] = [
  { id: 'home', label: 'home' },
  { id: 'work', label: 'work' },
  { id: 'team', label: 'team' },
  { id: 'feed', label: 'feed' },
  { id: 'solutions', label: 'solutions' },
  { id: 'about', label: 'about' },
  { id: 'contact', label: 'contact' },
];

// underline grows from the left on hover, stays fully drawn while active —
// so the navbar itself shows which section the client is looking at
function NavLink({ label, active, onClick }: { label: string; active: boolean; onClick: () => void }) {
  return (
    <a
      href="#"
      onClick={e => { e.preventDefault(); onClick(); }}
      aria-current={active ? 'page' : undefined}
      className={`group relative py-1 transition-colors ${active ? 'text-amber-300' : 'text-white/80 hover:text-white'}`}
    >
      {label}
      <span
        className={`absolute -bottom-0.5 left-0 h-px w-full origin-left bg-amber-300 transition-transform duration-300 ease-out ${
          active ? 'scale-x-100' : 'scale-x-0 group-hover:scale-x-100'
        }`}
      />
    </a>
  );
}

export default function Header({ section, setIsMenuOpen, onNavigate }: HeaderProps) {
  return (
    <header className="fixed top-0 inset-x-0 z-30 flex h-16 items-center justify-between px-4 sm:px-6 bg-black/70 backdrop-blur text-white">
      <div className="flex items-center space-x-4">
        <a href="#" className="flex items-center" onClick={e => { e.preventDefault(); onNavigate('home'); }}>
          <span className="text-xl font-bold">SOPA</span>
        </a>
      </div>
      <nav className="hidden md:flex space-x-6">
        {LINKS.map(l => (
          <NavLink key={l.id} label={l.label} active={section === l.id} onClick={() => onNavigate(l.id)} />
        ))}
      </nav>
      <button
        className="md:hidden mr-1 sm:mr-2 p-2 -my-2 flex flex-col justify-center cursor-pointer"
        aria-label="Open menu"
        onClick={() => setIsMenuOpen(true)}
      >
        <span className="block h-0.5 w-6 bg-white mb-1.5"></span>
        <span className="block h-0.5 w-6 bg-white mb-1.5"></span>
        <span className="block h-0.5 w-6 bg-white"></span>
      </button>
    </header>
  );
}
