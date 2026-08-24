// src/components/ApplyModal.tsx
// "Join the collective" application modal — same glass card style as MemberPanel.
// Submits to the same /api/contact endpoint (type: apply).
'use client';
import { useState } from 'react';

const inputCls =
  'w-full rounded-lg border border-white/20 bg-black/40 px-3 py-2 text-sm text-white placeholder:text-white/25 focus:border-amber-300 focus:outline-none';

export default function ApplyModal({ locale, onClose }: { locale: string; onClose: () => void }) {
  const [handle, setHandle] = useState('');
  const [github, setGithub] = useState('');
  const [about, setAbout] = useState('');
  const [status, setStatus] = useState<'idle' | 'sending' | 'sent' | 'error'>('idle');

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!handle.trim() || !about.trim()) return;
    setStatus('sending');
    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: handle,
          email: github ? `${github}@github` : `${handle}@hive`,
          message: `[APPLICATION] ${about}`,
          types: locale === 'pt' ? 'aplicação — entrar no coletivo' : 'application — join the collective',
        }),
      });
      setStatus(res.ok ? 'sent' : 'error');
    } catch {
      setStatus('error');
    }
  };

  const t = (en: string, pt: string) => (locale === 'pt' ? pt : en);

  return (
    <div className="fixed inset-0 z-[60] flex items-center justify-center p-4 pt-24" onClick={onClose}>
      <div className="absolute inset-0 bg-black/70 backdrop-blur-sm" />
      <div
        className="relative w-full max-w-md overflow-y-auto rounded-2xl border border-white/15 bg-black/90 p-8 shadow-[0_0_60px_rgba(255,204,0,0.08)] backdrop-blur-xl"
        style={{ animation: 'modal-pop 0.25s cubic-bezier(0.34,1.56,0.64,1) both' }}
        onClick={e => e.stopPropagation()}
      >
        <button
          onClick={onClose}
          aria-label={t('close', 'fechar')}
          className="absolute right-4 top-4 rounded-lg border border-white/20 px-3 py-1 font-mono text-xs text-white/70 hover:border-amber-300 hover:text-amber-300 transition-colors cursor-pointer"
        >
          ✕
        </button>

        {status === 'sent' ? (
          <div className="py-8 text-center">
            <div className="mb-3 text-4xl">🛹</div>
            <p className="text-sm text-white/80">{t('Application received. The crew will check your profile.', 'Aplicação recebida. A crew vai checar seu perfil.')}</p>
          </div>
        ) : (
          <>
            <div className="mb-6">
              <div className="inline-block rounded-xl border border-white/20 bg-black/60 px-4 py-1.5 font-mono text-[10px] tracking-widest text-amber-200">
                [ {t('join the collective', 'entrar no coletivo')} ]
              </div>
              <h3 className="mt-3 text-xl font-bold tracking-tight">{t('Apply with your profile', 'Candidatar perfil')}</h3>
            </div>

            <form onSubmit={submit} className="space-y-4">
              <div>
                <label className="mb-1 block text-[11px] text-white/40">{t('hive handle', 'handle no hive')} *</label>
                <input className={inputCls} placeholder="@you" value={handle} onChange={e => setHandle(e.target.value)} required />
              </div>
              <div>
                <label className="mb-1 block text-[11px] text-white/40">GitHub</label>
                <input className={inputCls} placeholder="username" value={github} onChange={e => setGithub(e.target.value)} />
              </div>
              <div>
                <label className="mb-1 block text-[11px] text-white/40">{t('what do you do?', 'o que você faz?')} *</label>
                <textarea
                  className={`${inputCls} leading-relaxed`}
                  rows={3}
                  placeholder={t('skills, links, what you ship...', 'skills, links, o que você entrega...')}
                  value={about}
                  onChange={e => setAbout(e.target.value)}
                  required
                />
              </div>
              <div className="flex items-center justify-between gap-3">
                {status === 'error' ? (
                  <span className="text-[11px] text-red-400">{t('something broke, try again.', 'algo quebrou, tenta de novo.')}</span>
                ) : (
                  <span />
                )}
                <button
                  type="submit"
                  disabled={status === 'sending' || !handle.trim() || !about.trim()}
                  className="rounded-lg bg-amber-300 px-5 py-2 text-xs font-semibold text-black transition-opacity hover:bg-amber-200 disabled:opacity-60 cursor-pointer"
                >
                  {status === 'sending' ? t('sending…', 'enviando…') : t('apply →', 'candidatar →')}
                </button>
              </div>
            </form>
          </>
        )}
      </div>
    </div>
  );
}
