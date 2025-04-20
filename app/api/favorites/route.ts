import { NextRequest, NextResponse } from 'next/server';

const REST_URL   = process.env.UPSTASH_REDIS_REST_URL!;
const REST_TOKEN = process.env.UPSTASH_REDIS_REST_TOKEN!;

// ---------- GET ----------
export async function GET(req: NextRequest) {
  const userId = req.nextUrl.searchParams.get('user_id');
  if (!userId)
    return NextResponse.json({ error: 'Missing user_id' }, { status: 400 });

  const key = `user:${userId}:favorites`;
  const res = await fetch(`${REST_URL}/get/${key}`, {
    headers: { Authorization: `Bearer ${REST_TOKEN}` }
  });

  // Upstash всегда отдаёт JSON { result: "...", ... }
  const data = await res.json() as { result: string | null };
const list = data.result ? JSON.parse(data.result) : [];

  return NextResponse.json(list);          // ← 🔑 массив строк
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
