// src/components/Team.tsx
'use client';
import { useRef, useState } from 'react';
import { members, team, type Member } from '@/data/team';
import MemberPanel from '@/components/MemberPanel';
import SocialLinks from '@/components/SocialLinks';
import Disciplines from '@/components/Disciplines';
import SectionFolio from '@/components/SectionFolio';

function Card({ member, locale, onOpen }: { member: Member; locale: string; onOpen: () => void }) {
  const ref = useRef<HTMLDivElement>(null);

  // subtle CSS 3D tilt toward the cursor — tracks fast, settles back slow on leave
  const onMove = (e: React.MouseEvent) => {
    const el = ref.current;
    if (!el) return;
    const r = el.getBoundingClientRect();
    const x = (e.clientX - r.left) / r.width - 0.5;
    const y = (e.clientY - r.top) / r.height - 0.5;
    el.style.transition = 'transform 120ms ease-out, border-color 200ms';
    el.style.transform = `perspective(900px) rotateY(${x * 6}deg) rotateX(${-y * 6}deg) translateY(-4px)`;
  };
  const onLeave = () => {
    const el = ref.current;
    if (!el) return;
    el.style.transition = 'transform 450ms cubic-bezier(0.22, 1, 0.36, 1), border-color 200ms';
    el.style.transform = '';
  };

  return (
    <div
      ref={ref}
      className="group relative flex flex-col gap-6 rounded-2xl border border-white/15 bg-black/40 p-8 backdrop-blur-sm will-change-transform hover:border-amber-300/60"
      onMouseMove={onMove}
      onMouseLeave={onLeave}
      onClick={onOpen}
      role="button"
      tabIndex={0}
      onKeyDown={e => { if (e.key === 'Enter' || e.key === ' ') onOpen(); }}
      title={locale === 'pt' ? 'verificar atividade' : 'verify activity'}
    >
      {/* ID layout: photo left, handle + skills right */}
      <div className="flex items-center gap-5">
        <span className="shrink-0">
          {member.ai ? (
            <span className="flex h-24 w-24 items-center justify-center rounded-xl bg-gradient-to-br from-amber-400/80 to-pink-500/80 text-2xl font-bold text-black ring-1 ring-white/20">
              AI
            </span>
          ) : (
          /* eslint-disable-next-line @next/next/no-img-element */
          <img
            src={`https://images.hive.blog/u/${member.handle}/avatar`}
            alt={`@${member.handle}`}
            width={96}
            height={96}
            loading="lazy"
            className="h-24 w-24 rounded-xl object-cover ring-1 ring-white/20 group-hover:ring-amber-300 transition-colors"
          />
          )}
        </span>
        <div className="min-w-0 flex-1">
          <div className="truncate text-lg font-semibold text-white/80 group-hover:text-white">
            @{member.handle}
            <span
              className={`ml-2 rounded-full px-1.5 py-0.5 align-middle text-[8px] font-bold uppercase leading-none ${
                member.ai ? 'bg-gradient-to-r from-amber-400 to-pink-500 text-black' : 'bg-white/15 text-white/60'
              }`}
              title={member.ai ? 'AI agent' : 'Human'}
            >
              {member.ai ? 'AI' : 'human'}
            </span>
          </div>
          <SocialLinks member={member} />
          {member.skills?.length ? (
            <div className="mt-3">
              <div className="mb-1 font-mono text-[10px] uppercase tracking-widest text-white/30">
                {(team[locale as 'en' | 'pt'] ?? team.en).disciplines}
              </div>
              <Disciplines items={member.skills} locale={locale} />
            </div>
          ) : null}
        </div>
      </div>
      {member.bio && <p className="border-t border-white/10 pt-4 text-sm leading-relaxed text-white/50">{member.bio[locale as 'en' | 'pt'] ?? member.bio.en}</p>}
    </div>
  );
}

export default function Team({ title, subtitle, locale }: { title?: string; subtitle?: string; locale: string }) {
  const [selected, setSelected] = useState<Member | null>(null);
  return (
    <section className="max-w-7xl mx-auto px-6 py-16">
      <SectionFolio section="team" locale={locale} />
      <div className="mb-12">
        <div className="mb-4 flex items-center gap-3 page-title-anim">
          <span className="h-px w-10 bg-gradient-to-r from-amber-300/70 to-transparent" />
          <span className="font-mono text-[11px] font-medium uppercase tracking-[0.35em] text-amber-300/80">
            {locale === 'pt' ? 'colaboradores verificados' : 'verified contributors'}
          </span>
        </div>
        <h2 className="font-display text-4xl sm:text-5xl font-bold tracking-tight text-white page-title-anim">{title}</h2>
        {subtitle && (
          <p className="mt-4 max-w-xl text-lg font-medium text-white/60 leading-relaxed page-title-anim page-title-anim-d1">
            {subtitle}
          </p>
        )}
      </div>
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 page-anim page-anim-d2">
        {members.map((m) => (
          <Card key={m.handle} member={m} locale={locale} onOpen={() => setSelected(m)} />
        ))}
      </div>

      <MemberPanel member={selected} locale={locale} onClose={() => setSelected(null)} />
    </section>
  );
}
