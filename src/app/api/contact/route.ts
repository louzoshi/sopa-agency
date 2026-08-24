// src/app/api/contact/route.ts
// Receives the brief, sends it to the Pioneers LLM (OpenAI-compatible) for an
// instant first response. Supports a short follow-up chat: the client sends the
// accumulated messages; MAX_TURNS caps the exchange, then the bot wraps up.
import { NextResponse } from 'next/server';

export const runtime = 'nodejs';

const MAX_TURNS = 3;

const SYSTEM = (locale: string) => `You are SOPA Agency's intake agent. You receive a project brief.
Your job: extract project details. Ask ONE smart question per reply to fill gaps (audience, scope, references, goals).
ALWAYS reply in ${locale === 'pt' ? 'Portuguese (pt-BR)' : 'English'} — never switch languages mid-conversation, regardless of what language the user writes in.
Max 80 words, warm and direct tone. Sign as "— SOPA (bot de plantão)".
Turn counter: the client tells you "turn N of ${MAX_TURNS}".
- If N < ${MAX_TURNS}: ask your question.
- If N >= ${MAX_TURNS} (or you have enough details): do NOT ask anything. Wrap up with a summary of what you captured and close with "${locale === 'pt' ? 'Beleza, temos tudo — a gente entra em contato em breve. 🤙' : 'Got everything — we\'ll be in touch soon. 🤙'}"`;

export async function POST(req: Request) {
  let body: Record<string, unknown>;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: 'invalid json' }, { status: 400 });
  }

  // trust-boundary validation: name/email/message required, everything stringified + capped
  const pick = (k: string) => String(body[k] ?? '').slice(0, 4000);
  const name = pick('name').trim();
  const email = pick('email').trim();
  const message = pick('message').trim();
  if (!name || !message || !/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(email)) {
    return NextResponse.json({ error: 'nome, email e mensagem são obrigatórios' }, { status: 422 });
  }
  // chat history: [{role:'assistant'|'user', content}] — capped hard
  const history = Array.isArray(body.history)
    ? body.history.slice(-10).map((m: Record<string, unknown>) => ({
        role: m.role === 'assistant' ? 'assistant' : 'user',
        content: String(m.content ?? '').slice(0, 4000),
      })).filter((m: { content: string }) => m.content)
    : [];
  const locale = body.locale === 'pt' ? 'pt' : 'en';
  const turn = Math.min(Number(body.turn) || 1, MAX_TURNS);

  const summary = [
    `nome: ${name}`,
    `email: ${email}`,
    `tipo: ${pick('types') || '—'}`,
    `orçamento: ${pick('budget') || '—'}`,
    `prazo: ${pick('deadline') || '—'}`,
    '',
    message,
  ].join('\n');

  const apiKey = process.env.PIONEERS_API_KEY;
  if (!apiKey || apiKey.includes('REPLACE_ME')) {
    return NextResponse.json({ error: 'llm not configured', reply: null }, { status: 503 });
  }

  try {
    const res = await fetch(`${process.env.PIONEERS_BASE_URL ?? 'https://alpha.pioneers.dev/api/v1'}/chat/completions`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${apiKey}`,
      },
      body: JSON.stringify({
        model: process.env.PIONEERS_MODEL ?? 'auto',
        messages: [
          { role: 'system', content: SYSTEM(locale) },
          { role: 'user', content: `${summary}\n\n(turn ${turn} of ${MAX_TURNS})` },
          ...history,
        ],
        max_tokens: 1000, // ponytail: local Qwen burns tokens on reasoning first; raise if a reasoning-heavy model lands here
      }),
      signal: AbortSignal.timeout(30_000),
    });
    if (!res.ok) {
      console.error('pioneers error', res.status);
      return NextResponse.json({ error: 'llm unavailable', reply: null }, { status: 502 });
    }
    const data = await res.json();
    const reply: string | undefined = data?.choices?.[0]?.message?.content;
    return NextResponse.json({ reply: reply ?? null, done: turn >= MAX_TURNS });
  } catch (e) {
    console.error('llm call failed', e);
    return NextResponse.json({ error: 'llm timeout', reply: null }, { status: 502 });
  }
}
