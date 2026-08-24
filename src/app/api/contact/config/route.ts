// src/app/api/contact/config/route.ts
// Tells the client whether the LLM agent is configured (hides chat CTA if not).
import { NextResponse } from 'next/server';

export const runtime = 'nodejs';

export async function GET() {
  const key = process.env.PIONEERS_API_KEY;
  const configured = Boolean(key) && !key!.includes('REPLACE_ME');
  return NextResponse.json({ llm: configured });
}
