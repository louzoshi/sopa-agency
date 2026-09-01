// src/components/SectionFolio.tsx
// Editorial "folio index" header — replaces the oversized ghost watermark.
// Reads:  03 / 06 ─────────────────────────────
// Just the position in the set — the section name already lives in the <h2>
// right below and in the active navbar link, so the folio doesn't repeat it.
// Thin, mono, and mobile-safe (the rule flexes; there's nothing to overflow).
'use client';
import { folioOrder, type FolioSection } from '@/data/i18n';

export default function SectionFolio({
  section,
  locale,
}: {
  section: string;
  locale: string;
}) {
  const idx = folioOrder.indexOf(section as FolioSection);
  if (idx === -1) return null;

  const num = String(idx + 1).padStart(2, '0');
  const total = String(folioOrder.length).padStart(2, '0');
  const aria =
    locale === 'pt'
      ? `Seção ${idx + 1} de ${folioOrder.length}`
      : `Section ${idx + 1} of ${folioOrder.length}`;

  return (
    <div
      aria-label={aria}
      className="mb-5 flex items-center gap-3 font-mono text-[10px] sm:text-[11px] tracking-[0.2em] sm:tracking-[0.28em] text-white/40 page-title-anim"
    >
      <span className="tabular-nums text-amber-300/80">{num}</span>
      <span className="tabular-nums text-white/25">/ {total}</span>
      <span className="h-px flex-1 bg-white/12" />
    </div>
  );
}
