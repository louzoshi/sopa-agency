// src/components/Footer.tsx
'use client';
import Link from 'next/link';
import { site } from '@/data/site';
import { withWipe } from '@/components/TransitionOverlay';
import { usePathname, useRouter } from 'next/navigation';

export default function Footer({ locale }: { locale: string }) {
  const pathname = usePathname();
  const router = useRouter();
  const isHome = pathname === `/${locale}` || pathname === `/${locale}/`; // Adjust for locale prefix

  const handleLinkClick = (url: string, e: React.MouseEvent<HTMLAnchorElement, MouseEvent>) => {
    e.preventDefault();
    withWipe(() => {
      router.push(url);
    });
  };

  return (
    <footer className="bg-black text-white py-8">
      <div className="max-w-4xl mx-auto px-4">
        {/* Show menu links in footer only on home page */}
        {isHome && (
          <nav className="flex flex-wrap space-x-6 mb-6">
            {(site[locale as keyof typeof site]?.menu ?? []).map((item, index) => (
              <Link
                key={index}
                href={item.link}
                className="hover:text-gray-300 transition-colors"
                onClick={e => handleLinkClick(item.link, e)}
              >
                {item.title}
              </Link>
            ))}
          </nav>
        )}
        <p className="text-center text-sm">
          Made with{' '}
          <a href="https://nextjs.org" target="_blank" rel="noopener noreferrer" className="text-gray-300 hover:text-white">
            Next.js
          </a>
          •
          <a href="https://reactjs.org" target="_blank" rel="noopener noreferrer" className="text-gray-300 hover:text-white">
            React
          </a>
          •
          <a href="https://tailwindcss.com" target="_blank" rel="noopener noreferrer" className="text-gray-300 hover:text-white">
            Tailwind CSS
          </a>
        </p>
      </div>
    </footer>
  );
}