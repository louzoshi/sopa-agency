// src/components/CTA.tsx
// End-of-page call-to-action: centered heading + subtext + glowing button.
// Props optional — bilingual defaults (contact section) when used bare.
'use client';
import { site } from '@/data/site';

const COPY = {
  en: {
    title: 'Ready to start?',
    subtitle: "Let's talk about your project.",
    button: 'BOOK DISCOVERY CALL',
  },
  pt: {
    title: 'Pronto para começar?',
    subtitle: 'Vamos conversar sobre seu projeto. A primeira conversa é grátis.',
    button: 'AGENDAR CONVERSA',
  },
} as const;

export default function CTA({
  title,
  subtitle,
  button,
  href = '/contact',
  locale = 'en',
}: {
  title?: string;
  subtitle?: string;
  button?: string;
  href?: string;
  locale?: string;
}) {
  const t = COPY[locale as keyof typeof COPY] ?? COPY.en;
  const section = href.replace(/^\//, '') || 'home';

  return (
    <section className="relative overflow-hidden text-center py-24 px-6">
      {/* glow rising from the bottom */}
      <div
        className="absolute inset-x-0 bottom-0 h-40 pointer-events-none"
        style={{ background: 'radial-gradient(60% 120% at 50% 100%, rgba(var(--accent-rgb),0.14), transparent 70%)' }}
      />
      <h2 className="relative text-3xl md:text-4xl font-bold mb-3">{title ?? t.title}</h2>
      <p className="relative opacity-70 mb-10 max-w-xl mx-auto">{subtitle ?? t.subtitle}</p>
      <button
        onClick={() => window.dispatchEvent(new CustomEvent('sopa:navigate', { detail: section }))}
        className="relative px-8 py-4 rounded-full bg-amber-400 text-black font-bold tracking-wide uppercase text-sm shadow-[0_0_30px_rgba(255,204,0,0.35)] hover:shadow-[0_0_50px_rgba(255,204,0,0.55)] hover:bg-amber-300 transition-all cursor-pointer"
      >
        {button ?? t.button}
      </button>
    </section>
  );
}
