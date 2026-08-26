// src/components/LocaleSwitcher.tsx
// Language pill next to the font switcher. URL is the source of truth:
// swaps the /en <-> /pt segment of the current path.
'use client';
import { usePathname } from 'next/navigation';

const LOCALES = [
  { id: 'en', label: 'EN' },
  { id: 'pt', label: 'PT' },
] as const;

export default function LocaleSwitcher() {
  const pathname = usePathname() || '/en';
  const current = pathname.split('/')[1] === 'pt' ? 'pt' : 'en';

  const swap = (id: string) => {
    if (id === current) return;
    const segs = pathname.split('/');
    segs[1] = id;
    window.location.assign(segs.join('/') || `/${id}`);
  };

  return (
    <div className="relative flex gap-2">
      <div className="flex rounded-full border border-white/20 bg-black/80 backdrop-blur-md overflow-hidden shadow-lg">
        {LOCALES.map(l => (
          <button
            key={l.id}
            onClick={() => swap(l.id)}
            aria-pressed={current === l.id}
            title={l.id === 'en' ? 'English' : 'Português (BR)'}
            className={`px-3 py-2 text-xs font-mono font-bold transition-colors cursor-pointer ${
              current === l.id ? 'bg-amber-400/20 text-amber-300' : 'text-white/70 hover:text-white hover:bg-white/10'
            }`}
          >
            {l.label}
          </button>
        ))}
      </div>
    </div>
  );
}
