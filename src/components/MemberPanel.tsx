// src/components/MemberPanel.tsx
// "Verifiable, not vibes" side panel: pulls live public data for a member.
// Humans → GitHub public events (commits/PRs). AI agents → Hive posts by handle.
'use client';
import { useEffect, useState } from 'react';
import { members, skillLabels, type Member } from '@/data/team';

type Proof =
  | { kind: 'gh'; repo: string; text: string; date: string; url: string }
  | { kind: 'hive'; text: string; date: string; url: string };

function useProofs(member: Member | null) {
  const [proofs, setProofs] = useState<Proof[] | null>(null);
  useEffect(() => {
    if (!member) return;
    // eslint-disable-next-line react-hooks/set-state-in-effect -- reset while switching members
    setProofs(null);
    let dead = false;
    (async () => {
      try {
        if (member.ai) {
          const res = await fetch(
            `https://api.hive.blog`,
            {
              method: 'POST',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify({
                jsonrpc: '2.0', method: 'condenser_api.get_discussions_by_author_before_date',
                params: [{ author: member.handle, limit: 5 }], id: 1,
              }),
            },
          );
          const j = await res.json();
          const posts = (j.result ?? []) as { title: string; created: string; url: string; permlink: string }[];
          if (!dead) setProofs(posts.map(p => ({
            kind: 'hive', text: p.title || p.permlink, date: p.created, url: `https://hive.blog${p.url}`,
          })));
        } else if (member.github) {
          const res = await fetch(`https://api.github.com/users/${member.github}/events/public?per_page=10`);
          if (!res.ok) throw new Error('github');
          const evts = (await res.json()) as { type: string; repo: { name: string }; created_at: string; payload: { commits?: unknown[]; pull_request?: { title?: string } } }[];
          const out: Proof[] = [];
          for (const e of evts) {
            if (e.type === 'PushEvent') {
              const n = e.payload.commits?.length ?? 1;
              out.push({ kind: 'gh', repo: e.repo.name, text: `${n} commit${n > 1 ? 's' : ''} pushed`, date: e.created_at, url: `https://github.com/${e.repo.name}` });
            } else if (e.type === 'PullRequestEvent') {
              out.push({ kind: 'gh', repo: e.repo.name, text: e.payload.pull_request?.title ?? 'pull request', date: e.created_at, url: `https://github.com/${e.repo.name}` });
            }
          }
          if (!dead) setProofs(out.slice(0, 5));
        } else {
          if (!dead) setProofs([]);
        }
      } catch {
        if (!dead) setProofs([]);
      }
    })();
    return () => { dead = true; };
  }, [member]);
  return proofs;
}

export default function MemberPanel({ member, locale, onClose }: { member: Member | null; locale: string; onClose: () => void }) {
  const proofs = useProofs(member);
  if (!member) return null;

  return (
    <div className="fixed inset-0 z-[60] flex items-center justify-center p-4 pt-24" onClick={onClose}>
      <div className="absolute inset-0 bg-black/70 backdrop-blur-sm" />
      <div
        className="relative w-full max-w-lg max-h-[80vh] overflow-y-auto rounded-2xl border border-white/15 bg-black/90 p-8 shadow-[0_0_60px_rgba(255,204,0,0.08)] backdrop-blur-xl"
        style={{ animation: 'modal-pop 0.25s cubic-bezier(0.34,1.56,0.64,1) both' }}
        onClick={e => e.stopPropagation()}
      >
        <button
          onClick={onClose}
          aria-label={locale === 'pt' ? 'fechar' : 'close'}
          className="absolute right-4 top-4 rounded-lg border border-white/20 px-3 py-1 font-mono text-xs text-white/70 hover:border-amber-300 hover:text-amber-300 transition-colors cursor-pointer"
        >
          ✕
        </button>

        <div className="flex items-center gap-4 mb-6">
          {member.ai ? (
            <span className="flex h-16 w-16 items-center justify-center rounded-xl bg-gradient-to-br from-amber-400/80 to-pink-500/80 text-lg font-bold text-black">AI</span>
          ) : (
            /* eslint-disable-next-line @next/next/no-img-element */
            <img src={`https://images.hive.blog/u/${member.handle}/avatar`} alt="" className="h-16 w-16 rounded-xl object-cover ring-1 ring-white/20" />
          )}
          <div>
            <div className="text-2xl font-bold tracking-tight">@{member.handle}</div>
            <div className="font-mono text-xs text-white/40">
              {member.github && <>gh/{member.github} · </>}
              {locale === 'pt' ? (member.ai ? 'agente autônomo' : 'humano verificável') : (member.ai ? 'autonomous agent' : 'verifiable human')}
            </div>
          </div>
        </div>

        {member.bio && (
          <p className="mb-6 text-sm leading-relaxed text-white/70">{member.bio[locale as 'en' | 'pt'] ?? member.bio.en}</p>
        )}

        {member.skills?.length ? (
          <div className="mb-6">
            <div className="mb-2 font-mono text-[10px] uppercase tracking-widest text-white/40">
              {locale === 'pt' ? 'skills' : 'skills'}
            </div>
            <div className="space-y-1.5 font-mono text-xs text-white/50">
              {member.skills.map(([key, val]) => (
                <div key={key}>
                  <div className="flex justify-between">
                    <span>{skillLabels[key]?.[locale as 'en' | 'pt'] ?? key}</span><span>{val}</span>
                  </div>
                  <div className="h-1 w-full bg-white/10"><div className="h-full bg-amber-300" style={{ width: `${val}%` }} /></div>
                </div>
              ))}
            </div>
          </div>
        ) : null}

        {/* live verifiable activity */}
        <div>
          <div className="mb-2 flex items-center gap-2 font-mono text-[10px] uppercase tracking-widest text-white/40">
            <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 animate-pulse" />
            {locale === 'pt' ? 'atividade recente — ao vivo' : 'recent activity — live'}
          </div>
          {proofs === null ? (
            <div className="space-y-2 animate-pulse">
              {[0, 1, 2].map(i => <div key={i} className="h-10 rounded-lg bg-white/5" />)}
            </div>
          ) : proofs.length === 0 ? (
            <p className="font-mono text-xs text-white/30">
              {locale === 'pt' ? 'sem atividade pública recente.' : 'no recent public activity.'}
            </p>
          ) : (
            <ul className="space-y-2">
              {proofs.map((p, i) => (
                <li key={i}>
                  <a
                    href={p.url}
                    target="_blank"
                    rel="noreferrer"
                    className="block rounded-lg border border-white/10 bg-white/[0.03] px-3 py-2 hover:border-amber-300/40 transition-colors"
                  >
                    <div className="truncate text-xs text-white/80">
                      {p.kind === 'gh' && <span className="mr-1.5 font-mono text-[10px] text-amber-300">{p.repo}</span>}
                      {p.text}
                    </div>
                    <div className="mt-0.5 font-mono text-[10px] text-white/30">
                      {new Date(p.date).toLocaleDateString(locale === 'pt' ? 'pt-BR' : 'en-US')}
                    </div>
                  </a>
                </li>
              ))}
            </ul>
          )}
        </div>

        <div className="mt-8 border-t border-white/10 pt-4 font-mono text-[10px] leading-relaxed text-white/30">
          {locale === 'pt'
            ? 'dados públicos ao vivo: GitHub Events API / Hive blockchain. verificável, não vibes.'
            : 'live public data: GitHub Events API / Hive blockchain. verifiable, not vibes.'}
        </div>
      </div>
    </div>
  );
}

export { members };
