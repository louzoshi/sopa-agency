// src/components/Contact.tsx
// sopa.team/contato port: terminal-styled brief form + short LLM follow-up chat.
import { useRef, useState } from 'react';

const TYPES = ["presença digital", "site / landing", "identidade", "campanha", "comunidade", "produto digital"];
const BUDGETS = ["até 5k", "5–15k", "15–40k", "40k+", "a definir"];
const DEADLINES = ["sem pressa", "1 mês", "este trimestre", "ontem"];
const MAX_TURNS = 3;

type Turn = { role: 'user' | 'assistant'; content: string };

function Pill({ label, on, onClick }: { label: string; on: boolean; onClick: () => void }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`rounded-full border px-3 py-1 text-xs transition-colors ${
        on ? 'border-amber-300 bg-amber-300/10 text-amber-200' : 'border-white/20 text-white/50 hover:border-white/40'
      }`}
    >
      {label}
    </button>
  );
}

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <label className="block">
      <div className="mb-1.5 text-[11px] text-white/40">{label}</div>
      {children}
    </label>
  );
}

const inputCls =
  'w-full rounded-lg border border-white/20 bg-black/40 px-3 py-2 text-sm text-white placeholder:text-white/25 focus:border-amber-300 focus:outline-none';

export default function Contact({ title, locale }: { title?: string; locale: string }) {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [types, setTypes] = useState<Set<string>>(new Set());
  const [budget, setBudget] = useState<string | null>(null);
  const [deadline, setDeadline] = useState<string | null>(null);
  const [msg, setMsg] = useState('');
  const [status, setStatus] = useState<'idle' | 'sending' | 'chat' | 'done' | 'error'>('idle');
  const [turn, setTurn] = useState(0);
  const [chat, setChat] = useState<Turn[]>([]);
  const [followUp, setFollowUp] = useState('');
  const chatEnd = useRef<HTMLDivElement>(null);

  const briefPayload = (message: string) => ({
    name,
    email,
    message,
    types: [...types].join(', '),
    budget,
    deadline,
    turn,
    history: chat.slice(0, -1),
  });

  async function callBot(message: string) {
    setStatus('sending');
    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(briefPayload(message)),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data?.error ?? 'erro');
      setTurn((t) => t + 1);
      setChat((c) => [...c, { role: 'assistant', content: data.reply ?? '' }]);
      setStatus(turn + 1 >= MAX_TURNS ? 'done' : 'chat');
      setTimeout(() => chatEnd.current?.scrollIntoView({ behavior: 'smooth' }), 50);
    } catch {
      setStatus('error');
    }
  }

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    if (!msg.trim()) return;
    setChat([{ role: 'user', content: msg }]);
    await callBot(msg);
  }

  async function sendFollowUp(e: React.FormEvent) {
    e.preventDefault();
    if (!followUp.trim()) return;
    const next = [...chat, { role: 'user' as const, content: followUp }];
    setChat(next);
    setFollowUp('');
    // reuse payload with last user message as `message`
    setStatus('sending');
    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...briefPayload(followUp), message: chat[0]?.content ?? followUp, history: next.slice(0, -1), turn }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data?.error ?? 'erro');
      setTurn((t) => t + 1);
      setChat([...next, { role: 'assistant', content: data.reply ?? '' }]);
      if (turn + 1 >= MAX_TURNS) setStatus('done');
      setTimeout(() => chatEnd.current?.scrollIntoView({ behavior: 'smooth' }), 50);
    } catch {
      // keep the user bubble; surface the fallback line
      setChat(next);
      setStatus('error');
    }
  }

  function reset() {
    setStatus('idle');
    setTurn(0);
    setChat([]);
    setMsg('');
    setFollowUp('');
  }

  const toggleType = (t: string) => {
    setTypes((prev) => {
      const next = new Set(prev);
      if (next.has(t)) next.delete(t); else next.add(t);
      return next;
    });
  };

  return (
    <section className="max-w-3xl mx-auto px-6 py-16">
      <h2 className="text-3xl font-bold mb-2 page-title-anim">{title}</h2>
      <p className="mb-6 opacity-70 page-title-anim page-title-anim-d1">
        {locale === 'pt'
          ? 'Descreva o projeto em linhas gerais. Nosso agente ajuda a definir o escopo.'
          : 'Describe the project in broad strokes. Our agent can help you build your project scope.'}
      </p>

      {/* Direct Contact Bar */}
      <div className="mb-8 flex flex-wrap gap-3 font-mono text-xs page-anim">
        <a
          href="mailto:crew@sopa.team"
          className="flex items-center gap-2 rounded-xl border border-white/15 bg-black/40 px-3.5 py-2 text-white/80 hover:border-amber-300 hover:text-amber-300 transition-colors"
        >
          <span>✉️</span>
          <span>crew@sopa.team</span>
        </a>
        <a
          href="https://warpcast.com/~/channel/gnars"
          target="_blank"
          rel="noreferrer"
          className="flex items-center gap-2 rounded-xl border border-white/15 bg-black/40 px-3.5 py-2 text-white/80 hover:border-amber-300 hover:text-amber-300 transition-colors"
        >
          <span>🟪</span>
          <span>Farcaster /gnars</span>
        </a>
        <a
          href="https://sopa.team"
          target="_blank"
          rel="noreferrer"
          className="flex items-center gap-2 rounded-xl border border-white/15 bg-black/40 px-3.5 py-2 text-white/80 hover:border-amber-300 hover:text-amber-300 transition-colors"
        >
          <span>🌐</span>
          <span>sopa.team</span>
        </a>
      </div>

      <form
        className="page-anim rounded-2xl border border-white/15 bg-black/40 p-6 backdrop-blur-sm md:p-8"
        onSubmit={submit}
      >
        <div className="grid gap-5 sm:grid-cols-2">
          <Field label="nome / coletivo">
            <input className={inputCls} placeholder="quem tá chamando" value={name} onChange={(e) => setName(e.target.value)} />
          </Field>
          <Field label="email / @">
            <input className={inputCls} type="email" placeholder="pra gente responder" value={email} onChange={(e) => setEmail(e.target.value)} />
          </Field>
        </div>

        <div className="mt-6">
          <div className="mb-2 text-[11px] text-white/40">o que é — pode marcar mais de um</div>
          <div className="flex flex-wrap gap-2">
            {TYPES.map((t) => (
              <Pill key={t} label={t} on={types.has(t)} onClick={() => toggleType(t)} />
            ))}
          </div>
        </div>

        <div className="mt-6 grid gap-5 sm:grid-cols-2">
          <div>
            <div className="mb-2 text-[11px] text-white/40">orçamento</div>
            <div className="flex flex-wrap gap-2">
              {BUDGETS.map((b) => (
                <Pill key={b} label={b} on={budget === b} onClick={() => setBudget(budget === b ? null : b)} />
              ))}
            </div>
          </div>
          <div>
            <div className="mb-2 text-[11px] text-white/40">prazo</div>
            <div className="flex flex-wrap gap-2">
              {DEADLINES.map((d) => (
                <Pill key={d} label={d} on={deadline === d} onClick={() => setDeadline(deadline === d ? null : d)} />
              ))}
            </div>
          </div>
        </div>

        <div className="mt-6">
          <Field label="conta mais">
            <div className="relative">
              <span className="pointer-events-none absolute left-3 top-2.5 font-mono text-sm text-amber-300">&gt;</span>
              <textarea
                className={`${inputCls} pl-7 leading-relaxed`}
                rows={4}
                placeholder="o projeto, a vibe, referências, links do que já existe..."
                value={msg}
                onChange={(e) => setMsg(e.target.value)}
              />
            </div>
          </Field>
        </div>

        <div className="mt-6 flex flex-wrap items-center justify-between gap-3">
          <div className="text-[11px] text-white/30">
                      {status === 'error'
                        ? (locale === 'pt'
                            ? '● nossos agentes estão ocupados agora, mas relaxa — seu contato foi salvo e a gente lê e responde o mais rápido possível.'
                            : '● our agents are busy right now, but don\'t worry — your message was saved and we\'ll read and reply asap.')
                        : status === 'idle'
                        ? (locale === 'pt'
                            ? 'a gente lê o brief inteiro antes de responder.'
                            : 'we read the full brief before replying.')
                        : ''}
                    </div>
          <div className="flex gap-3">
            <button
              type="submit"
              disabled={status === 'sending' || status !== 'idle'}
              className="rounded-lg bg-amber-300 px-5 py-2.5 text-sm font-semibold text-black transition-opacity hover:bg-amber-200 disabled:opacity-60"
            >
              {status === 'sending'
                ? (locale === 'pt' ? 'enviando…' : 'sending…')
                : locale === 'pt'
                ? 'enviar brief →'
                : 'send brief →'}
            </button>
            <button
              type="button"
              className="rounded-lg border border-white/20 px-5 py-2.5 text-sm font-medium text-white/80 transition-colors hover:border-white/40 hover:text-white"
            >
              {locale === 'pt' ? 'falar com nosso agente' : 'talk to our agent'}
            </button>
          </div>
        </div>
      </form>

      {status !== 'idle' && status !== 'error' && (
        <div className="mt-4 rounded-xl border border-white/15 bg-black/40 p-5 backdrop-blur-sm page-anim">
          <div className="mb-3 font-mono text-[10px] uppercase tracking-widest text-white/40">
                      {'>'} {locale === 'pt' ? 'bot de plantão' : 'on-duty bot'} · turno {Math.min(turn, MAX_TURNS)}/{MAX_TURNS}
                    </div>
          <div className="space-y-3 max-h-96 overflow-y-auto text-xs leading-relaxed">
            {chat.map((m, i) => (
              <div key={i} className={m.role === 'assistant' ? 'whitespace-pre-wrap text-white/80' : 'text-right'}>
                <span className={m.role === 'user' ? 'inline-block rounded-lg bg-amber-300/10 px-3 py-2 text-left whitespace-pre-wrap text-white/70' : ''}>
                  {m.content}
                </span>
              </div>
            ))}
            {status === 'sending' && <div className="animate-pulse text-white/30">digitando…</div>}
            <div ref={chatEnd} />
          </div>

          {status === 'done' ? (
            <div className="mt-4 flex items-center justify-between gap-3">
              <span className="text-[11px] text-amber-200">● Beleza, temos tudo — a gente entra em contato em breve 🤙</span>
              <button
                type="button"
                onClick={reset}
                className="rounded-lg bg-amber-300 px-5 py-2 text-xs font-semibold text-black transition-opacity hover:bg-amber-200"
              >
                fechar ✓
              </button>
            </div>
          ) : (
            <form onSubmit={sendFollowUp} className="mt-4 flex gap-2">
              <input
                className={inputCls}
                placeholder="responde o bot…"
                value={followUp}
                onChange={(e) => setFollowUp(e.target.value)}
                disabled={status === 'sending'}
              />
              <button
                type="submit"
                disabled={status === 'sending'}
                className="shrink-0 rounded-lg bg-amber-300 px-4 py-2 text-xs font-semibold text-black transition-opacity hover:bg-amber-200 disabled:opacity-60"
              >
                enviar →
              </button>
            </form>
          )}
        </div>
      )}
    </section>
  );
}
