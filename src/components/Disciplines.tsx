// src/components/Disciplines.tsx
// Member disciplines as an editorial middot list — lead discipline emphasised,
// the rest supporting. No proficiency scores: this is capability, not a report card.
// Shared by the Team card and MemberPanel (like SocialLinks).
'use client';
import { skillLabels } from '@/data/team';

export default function Disciplines({
  items,
  locale,
  size = 'sm',
}: {
  items?: string[];
  locale: string;
  size?: 'sm' | 'md';
}) {
  if (!items?.length) return null;
  const lc = locale === 'pt' ? 'pt' : 'en';
  const text = size === 'md' ? 'text-sm' : 'text-xs';
  return (
    <div className={`flex flex-wrap items-baseline gap-x-1.5 gap-y-1 ${text} leading-relaxed`}>
      {items.map((key, i) => (
        <span key={key} className="inline-flex items-baseline gap-1.5">
          {i > 0 && <span className="select-none text-white/20">·</span>}
          <span className={i === 0 ? 'font-medium text-white/85' : 'text-white/45'}>
            {skillLabels[key]?.[lc] ?? key}
          </span>
        </span>
      ))}
    </div>
  );
}
