// src/app/api/apply/route.ts
// Receives team applications ("join the collective" modal). Validates and logs;
// ponytail: no persistence yet — add DB/table when the briefs store lands.
import { NextResponse } from 'next/server';

export const runtime = 'nodejs';

export async function POST(req: Request) {
  let body: Record<string, unknown>;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: 'invalid json' }, { status: 400 });
  }

  const handle = String(body.handle ?? '').trim().slice(0, 100);
  const github = String(body.github ?? '').trim().slice(0, 100).replace(/^@/, '');
  const about = String(body.about ?? '').trim().slice(0, 4000);

  if (!handle || !about) {
    return NextResponse.json({ error: 'handle e about são obrigatórios' }, { status: 422 });
  }
  if (!/^@?[a-z0-9-_.]{2,64}$/i.test(handle)) {
    return NextResponse.json({ error: 'handle inválido' }, { status: 422 });
  }

  console.log(`[APPLY] @${handle} gh:${github || '—'} :: ${about.slice(0, 200)}`);
  return NextResponse.json({ ok: true });
}
