// src/app/api/leads/route.ts
// Lead capture + conversation history. Every "talk to agent" turn and every
// brief submission lands here. ponytail: file-backed JSONL under .data/ —
// swap for a DB table when the briefs store lands.
import { NextResponse } from 'next/server';
import { appendFile, mkdir, readFile, writeFile } from 'fs/promises';
import path from 'path';

export const runtime = 'nodejs';

const DIR = path.join(process.cwd(), '.data');
const FILE = path.join(DIR, 'leads.jsonl');

type Turn = { role: 'user' | 'assistant'; content: string };

async function readLeads(): Promise<Record<string, unknown>[]> {
  try {
    const raw = await readFile(FILE, 'utf8');
    return raw.trim().split('\n').filter(Boolean).map(l => JSON.parse(l));
  } catch {
    return [];
  }
}

export async function POST(req: Request) {
  let body: Record<string, unknown>;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: 'invalid json' }, { status: 400 });
  }

  const name = String(body.name ?? '').trim().slice(0, 200);
  const email = String(body.email ?? '').trim().slice(0, 200);
  if (!name || !email) {
    return NextResponse.json({ error: 'name e email são obrigatórios' }, { status: 422 });
  }

  const leads = await readLeads();
  const existingIdx = leads.findIndex(l => l.email === email);

  const turn: Turn = {
    role: body.role === 'assistant' ? 'assistant' : 'user',
    content: String(body.message ?? '').slice(0, 4000),
  };
  const meta = {
    types: body.types ?? null,
    budget: body.budget ?? null,
    deadline: body.deadline ?? null,
    locale: body.locale === 'pt' ? 'pt' : 'en',
    updatedAt: new Date().toISOString(),
  };

  if (existingIdx >= 0) {
    const lead = leads[existingIdx];
    lead.history = [...((lead.history as Turn[]) ?? []), turn];
    Object.assign(lead, { name, ...meta });
  } else {
    leads.push({
      id: `lead_${Date.now()}_${Math.random().toString(36).slice(2, 8)}`,
      name,
      email,
      ...meta,
      createdAt: meta.updatedAt,
      history: [turn],
    });
  }

  await mkdir(DIR, { recursive: true });
  await writeFile(FILE, leads.map(l => JSON.stringify(l)).join('\n') + '\n');
  return NextResponse.json({ ok: true });
}
