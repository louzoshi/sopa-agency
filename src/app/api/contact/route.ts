// src/app/api/contact/route.ts
// Brief validator, not a chatbot. LLM analyzes the brief against key
// dimensions; asks AT MOST one high-value question only when something
// critical is missing. MAX_TURNS is a safety cap, not the goal.
// Returns structured JSON: { status, confidence, missing, question, reply, brief }.
import { NextResponse } from 'next/server';

export const runtime = 'nodejs';

const MAX_TURNS = 3;

const SYSTEM = (locale: string) => `You are SOPA Agency's intake assistant. You receive a project brief (form fields + free text) and evaluate whether you truly understand the project.

Reply ONLY with a JSON object, no markdown fences:
{
  "status": "complete" | "needs_clarification",
  "confidence": 0.0-1.0,
  "missing": ["dimension", ...],
  "question": "one question or null",
  "reply": "user-facing message",
  "brief": { "project": "", "problem": "", "solution": "", "current_stack": "", "outcome": "", "audience": "" }
}

Dimensions to evaluate the FREE-TEXT brief against (form already covers type/budget/deadline — never ask for those):
CRITICAL (ask if missing): what they're building (concrete), desired outcome / why.
USEFUL (ask only if critical is fine AND exactly one useful gap stands out): current situation/stack, audience.
OPTIONAL (never ask): tech preferences, detailed features, references.

Rules:
- Ask AT MOST ONE question per reply, and only if a CRITICAL dimension is missing or unclear.
- If everything critical is reasonably clear: status "complete", no question, short warm closing in the reply.
- reply language: ALWAYS ${locale === 'pt' ? 'Portuguese (pt-BR)' : 'English'} regardless of user's language. Max 60 words.
- The "brief" object is an internal summary for the agency — fill every field from available info ("unknown" if absent). User never sees it.`;

export async function POST(req: Request) {
  let body: Record<string, unknown>;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: 'invalid json' }, { status: 400 });
  }

  // trust-boundary validation: name/email required, everything stringified + capped
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
          { role: 'user', content: `${summary}\n\n(turn ${turn} of ${MAX_TURNS} — at the cap, wrap up)` },
          ...history,
        ],
        max_tokens: 1200, // ponytail: local Qwen burns tokens on reasoning first; raise if a reasoning-heavy model lands here
      }),
      signal: AbortSignal.timeout(30_000),
    });
    if (!res.ok) {
      console.error('pioneers error', res.status);
      return NextResponse.json({ error: 'llm unavailable', reply: null }, { status: 502 });
    }
    const data = await res.json();
    const raw: string | undefined = data?.choices?.[0]?.message?.content;
    if (!raw) return NextResponse.json({ error: 'empty reply', reply: null }, { status: 502 });

    // parse the JSON out (tolerate stray fences/prose around it)
    const m = raw.match(/\{[\s\S]*\}/);
    let parsed: Record<string, unknown> | null = null;
    try { parsed = m ? JSON.parse(m[0]) : null; } catch { parsed = null; }

    if (!parsed || typeof parsed.reply !== 'string') {
      // model didn't follow schema — degrade gracefully to plain text
      return NextResponse.json({
        status: turn >= MAX_TURNS ? 'complete' : 'needs_clarification',
        confidence: 0.5,
        missing: [],
        question: null,
        reply: raw.slice(0, 2000),
        brief: null,
        done: turn >= MAX_TURNS,
      });
    }

    const done = parsed.status === 'complete' || turn >= MAX_TURNS;
    return NextResponse.json({ ...parsed, done });
  } catch (e) {
    console.error('llm call failed', e);
    return NextResponse.json({ error: 'llm timeout', reply: null }, { status: 502 });
  }
}
