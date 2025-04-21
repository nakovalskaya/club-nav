export const dynamic = 'force-dynamic';
import { NextRequest, NextResponse } from 'next/server';

const REST_URL   = process.env.UPSTASH_REDIS_REST_KV_REST_API_URL!;
const REST_TOKEN = process.env.UPSTASH_REDIS_REST_KV_REST_API_TOKEN!;

// ---------- GET ----------
export async function GET(req: NextRequest) {
  const userId = req.nextUrl.searchParams.get('user_id');
  if (!userId)
    return NextResponse.json({ error: 'Missing user_id' }, { status: 400 });

  const key = `user:${userId}:favorites`;
  console.log(`🔍 [GET] user_id=${userId} → key=${key}`);

  const res = await fetch(`${REST_URL}/get/${key}`, {
    headers: { Authorization: `Bearer ${REST_TOKEN}` }
  });

  const data = await res.json() as { result: string | null };
  const list = data.result ? JSON.parse(data.result) : [];

  console.log(`📦 [GET RESULT]`, list);

  return NextResponse.json(list);
}

// ---------- POST ----------
export async function POST(req: NextRequest) {
  const { user_id, list } = await req.json() as {
    user_id?: string; list?: string[];
  };

  if (!user_id || !Array.isArray(list))
    return NextResponse.json({ error: 'Bad request' }, { status: 400 });

  const key   = `user:${user_id}:favorites`;
  const value = JSON.stringify(list);

  console.log(`⭐ [POST] user_id=${user_id} →`, list);

  await fetch(`${REST_URL}/set/${key}`, {
    method: 'POST',
    headers: {
      Authorization  : `Bearer ${REST_TOKEN}`,
      'Content-Type' : 'application/json'
    },
    body: JSON.stringify({ value })
  });

  return NextResponse.json({ ok: true });
}
