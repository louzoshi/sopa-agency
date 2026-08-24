// src/components/Team.tsx
'use client';
import { useRef, useState } from 'react';
import { members, skillLabels, type Member } from '@/data/team';
import MemberPanel from '@/components/MemberPanel';
import ApplyModal from '@/components/ApplyModal';

function Bars({ member, locale }: { member: Member; locale: string }) {
  if (!member.skills?.length) return null;
  return (
    <div className="w-full space-y-1.5 font-mono text-[10px] leading-tight text-white/50">
      {member.skills.map(([key, val]) => (
        <div key={key}>
          <div className="flex justify-between">
            <span>{skillLabels[key]?.[locale as 'en' | 'pt'] ?? key}</span>
            <span>{val}</span>
          </div>
          <div className="h-1 w-full bg-white/10">
            <div className="h-full bg-amber-300" style={{ width: `${val}%` }} />
          </div>
        </div>
      ))}
    </div>
  );
}

function Card({ member, locale, delay, onOpen }: { member: Member; locale: string; delay: number; onOpen: () => void }) {
  const ref = useRef<HTMLDivElement>(null);

  // CSS 3D tilt on hover — the WebGL stars behind provide the depth
  const onMove = (e: React.MouseEvent) => {
    const el = ref.current;
    if (!el) return;
    const r = el.getBoundingClientRect();
    const x = (e.clientX - r.left) / r.width - 0.5;
    const y = (e.clientY - r.top) / r.height - 0.5;
    el.style.transform = `perspective(600px) rotateY(${x * 14}deg) rotateX(${-y * 14}deg) translateZ(8px)`;
  };
  const onLeave = () => {
    if (ref.current) ref.current.style.transform = '';
  };

  return (
    <div
      ref={ref}
      className="group relative flex flex-col gap-4 rounded-2xl border border-white/15 bg-black/40 p-4 backdrop-blur-sm transition-[transform,border-color,background-color] duration-200 will-change-transform hover:-translate-y-1 hover:border-amber-300/60"
      style={{ transitionDelay: `${delay}ms` }}
      onMouseMove={onMove}
      onMouseLeave={onLeave}
      onClick={onOpen}
      role="button"
      tabIndex={0}
      onKeyDown={e => { if (e.key === 'Enter' || e.key === ' ') onOpen(); }}
      title={locale === 'pt' ? 'verificar atividade' : 'verify activity'}
    >
      {/* ID layout: photo left, handle + skills right */}
      <div className="flex items-center gap-4">
        <span className="relative shrink-0">
          {member.ai ? (
            <span className="flex h-18 w-18 items-center justify-center rounded-lg bg-gradient-to-br from-amber-400/80 to-pink-500/80 text-lg font-bold text-black ring-1 ring-white/20">
              AI
            </span>
          ) : (
          /* eslint-disable-next-line @next/next/no-img-element */
          <img
            src={`https://images.hive.blog/u/${member.handle}/avatar`}
            alt={`@${member.handle}`}
            width={72}
            height={72}
            loading="lazy"
            className="h-18 w-18 rounded-lg object-cover ring-1 ring-white/20 group-hover:ring-amber-300 transition-colors"
          />
          )}
          {member.github && (
            /* eslint-disable-next-line @next/next/no-img-element */
            <img
              src={`https://github.com/${member.github}.png?size=64`}
              alt={`GitHub: ${member.github}`}
              width={22}
              height={22}
              loading="lazy"
              title={`GitHub: @${member.github}`}
              className="absolute -bottom-1 -right-1 h-[22px] w-[22px] rounded-full border-2 border-black object-cover bg-black"
            />
          )}
        </span>
        <div className="min-w-0 flex-1">
          <div className="truncate text-sm font-semibold text-white/80 group-hover:text-white">
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
          {member.github && <div className="truncate text-[10px] text-white/30">gh/{member.github}</div>}
          <Bars member={member} locale={locale} />
        </div>
      </div>
      {member.bio && <p className="border-t border-white/10 pt-3 text-xs leading-relaxed text-white/50">{member.bio[locale as 'en' | 'pt'] ?? member.bio.en}</p>}
    </div>
  );
}

export default function Team({ title, subtitle, locale }: { title?: string; subtitle?: string; locale: string }) {
  const [selected, setSelected] = useState<Member | null>(null);
  const [showApply, setShowApply] = useState(false);
  return (
    <section className="max-w-7xl mx-auto px-6 py-16">
      <h2 className="text-3xl font-bold mb-2 page-title-anim">{title}</h2>
      {subtitle && <p className="mb-10 opacity-70 page-title-anim page-title-anim-d1">{subtitle}</p>}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 page-anim page-anim-d2" style={{ perspective: '1000px' }}>
        {members.map((m, i) => (
          <Card key={m.handle} member={m} locale={locale} delay={Math.min(i * 22, 300)} onOpen={() => setSelected(m)} />
        ))}
      </div>

      <MemberPanel member={selected} locale={locale} onClose={() => setSelected(null)} />

      {/* join-the-collective CTA */}
      <div className="mt-12 text-center page-anim">
        <div className="inline-block rounded-xl border border-white/20 bg-black/60 px-5 py-2 font-mono text-xs tracking-widest text-amber-200 backdrop-blur-sm">
          [ {locale === 'pt' ? 'entrar no coletivo' : 'join the collective'} ]
        </div>
        <p className="mt-3 text-sm text-white/70">
          {locale === 'pt' ? 'Faz parte da agência SOPA?' : 'Part of the SOPA agency?'}
        </p>
        <button
          onClick={() => setShowApply(true)}
          className="mt-2 inline-block font-mono text-sm text-amber-300 hover:text-amber-200 transition-colors cursor-pointer"
        >
          {locale === 'pt' ? 'candidatar perfil →' : 'apply with your profile →'}
        </button>
      </div>

      {showApply && <ApplyModal locale={locale} onClose={() => setShowApply(false)} />}
    </section>
  );
}
