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
// so the navbar itself shows which section the client is looking at.
// real href (crawlable / cmd-click / no-JS) + onClick for the in-app SPA wipe.
function NavLink({ label, href, active, onClick }: { label: string; href: string; active: boolean; onClick: () => void }) {
  return (
    <a
      href={href}
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

export default function Header({ locale, section, setIsMenuOpen, onNavigate }: HeaderProps) {
  const hrefFor = (id: Section) => (id === 'home' ? `/${locale}` : `/${locale}/${id}`);
  return (
    // solid, self-isolated bar: the dark background does NOT rely on backdrop-filter
    // (stacked backdrop-filter layers can flicker/drop the header in some browsers).
    // isolate = own stacking context so section content can never paint over it.
    <header className="fixed top-0 inset-x-0 z-30 isolate flex h-16 items-center justify-between border-b border-white/10 bg-black/90 px-4 sm:px-6 text-white backdrop-blur-md">
      <div className="flex items-center space-x-4">
        <a href={hrefFor('home')} className="flex items-center" onClick={e => { e.preventDefault(); onNavigate('home'); }}>
          <span className="text-xl font-bold">SOPA</span>
        </a>
      </div>
      <nav className="hidden md:flex space-x-6">
        {LINKS.map(l => (
          <NavLink key={l.id} label={l.label} href={hrefFor(l.id)} active={section === l.id} onClick={() => onNavigate(l.id)} />
        ))}
      </nav>
      <button
        className="md:hidden mr-1 sm:mr-2 -my-2 p-2 flex flex-col justify-center gap-1.5 cursor-pointer"
        aria-label="Open menu"
        onClick={() => setIsMenuOpen(true)}
      >
        <span className="block h-0.5 w-6 bg-white"></span>
        <span className="block h-0.5 w-6 bg-white"></span>
        <span className="block h-0.5 w-6 bg-white"></span>
      </button>
    </header>
  );
}
