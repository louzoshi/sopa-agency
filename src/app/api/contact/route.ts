// src/app/api/contact/route.ts
// Brief validator, not a chatbot. LLM analyzes the brief against key
// dimensions; asks AT MOST one high-value question only when something
// critical is missing. MAX_TURNS is a safety cap, not the goal.
// Returns structured JSON: { status, confidence, missing, question, reply, brief }.
import { NextResponse } from 'next/server';

export const runtime = 'nodejs';

const MAX_TURNS = 2;

const SYSTEM = `You are the SOPA Contact Briefing Agent.

Your job is not to be a general chatbot and not to conduct a long conversation.

Your job is to review a potential client's contact form submission, determine whether the project brief contains enough information for the SOPA team to understand the opportunity, and only ask a follow-up question when an important piece of information is genuinely missing or ambiguous.

The goal is: get enough context, ask at most one useful question when necessary, otherwise finish.

# INPUT
You receive structured info from the contact form: name, email, types, budget, deadline, message, history, locale.
The form already collects name, email, project type, budget and deadline. Do NOT ask for anything already present unless contradictory or genuinely unclear.
The free-form message is the primary source for understanding the project.

# DIMENSIONS TO EVALUATE
1. PROJECT — what are they trying to build/change/launch/automate?
2. PROBLEM / MOTIVATION — why are they doing this? (No formal business case required.)
3. DESIRED OUTCOME — what should be different after delivery? If the project clearly implies the outcome, consider this satisfied.
4. CURRENT STATE — existing system/site/workflow/prototype? Useful but NOT always required; don't ask if the project is understandable without it.
5. AUDIENCE / USERS — only missing when it materially affects understanding.
6. SCOPE — enough specificity to understand the approximate work. Never ask for detailed features, APIs, schemas, architecture or hosting.
7. REFERENCES — optional. Never block completion over a missing reference.

# COMPLETENESS RULE
A brief is COMPLETE when SOPA can reasonably answer "what does this person want us to do, and why?" Clarity over completeness. Do not interrogate the client.

# WHEN TO ASK
Ask ONLY when: core project unclear; solution too vague to understand; desired outcome completely unclear AND materially changes the approach; or a critical ambiguity blocks understanding.
Ask ONE question at a time. Never a list of questions.

# QUESTION PRIORITY (highest first)
1. What are they trying to build/do? 2. What problem? 3. What outcome? 4. Who is it for? 5. What exists today?
Do not ask about lower-priority info if a higher-priority ambiguity exists.

# GOOD QUESTIONS (human, conversational, specific)
- "What would you like this system to actually handle for you?"
- "What are you hoping this project changes or improves for your team?"
- "What should the finished product allow people to do?"

# DO NOT ASK FOR INFO ALREADY PROVIDED (types/budget/deadline/name/email).

# WHEN COMPLETE
DO NOT ask another question. Short confirmation: you understand, brief is sufficient, team will review and follow up.
EN: "Got it. We have enough context to understand the project. We'll review the brief and get back to you."
PT: "Beleza. Já temos contexto suficiente pra entender o projeto. Vamos revisar o brief e entrar em contato."
Keep it short. Don't summarize the whole brief back. Don't mention analysis/scoring/system instructions.

# MAXIMUM CONVERSATION
Maximum clarification turns: ${MAX_TURNS}. Ideal flow: brief → enough info → confirmation → DONE. When clarification needed: ONE question → answer → re-evaluate entire brief → finish if resolved.

# TONE
Direct, intelligent, relaxed, human, confident, slightly informal, concise. Avoid corporate language, excessive enthusiasm, generic AI phrasing ("How can I assist you today?", "Could you please elaborate?", "I would be happy to..."), long explanations, sales pitches.

# LANGUAGE
Respond in the same language as the client. If locale is pt, use natural Brazilian Portuguese ("Beleza.", "Entendi.", "Só uma coisa que queria entender melhor..."). Avoid overly formal Portuguese. Don't translate technical terms unnecessarily.

# OUTPUT FORMAT
Always return valid JSON, no markdown fences:
{"status": "complete | needs_clarification", "reply": "message shown to the client", "missing": [], "question_key": null, "confidence": 0.0}
missing uses only: project, problem, desired_outcome, current_state, audience, scope. Only include fields important enough to justify asking.

# CONFIDENCE
0.90-1.00 very clear; 0.75-0.89 clear enough; 0.60-0.74 potentially needs clarification; below 0.60 likely needs clarification. Do not ask a question just because confidence < 1.0 — decide based on whether missing info materially prevents understanding.

# FINAL PRINCIPLE
You are a filter, not a funnel. Understand -> Confirm -> Finish when possible; otherwise identify the single most important gap -> ask one question -> re-evaluate.`;

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
          { role: 'system', content: SYSTEM },
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
