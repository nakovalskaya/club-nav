import { NextRequest, NextResponse } from 'next/server';

const REST_URL = process.env.UPSTASH_REDIS_REST_URL!;
const REST_TOKEN = process.env.UPSTASH_REDIS_REST_TOKEN!;

export async function GET(req: NextRequest) {
  const userId = req.nextUrl.searchParams.get('user_id');
  if (!userId) return NextResponse.json({ error: 'Missing user_id' }, { status: 400 });

  const key = `user:${userId}:favorites`;
  const res = await fetch(`${REST_URL}/get/${key}`, {
    headers: { Authorization: `Bearer ${REST_TOKEN}` }
  });

  const raw = await res.text();
  try {
    return NextResponse.json(raw ? JSON.parse(raw) : []);
  } catch {
    return NextResponse.json([]);
  }
}

export async function POST(req: NextRequest) {
  const { user_id, list } = await req.json();

  if (!user_id || !Array.isArray(list)) {
    return NextResponse.json({ error: 'Bad request' }, { status: 400 });
  }

  const key = `user:${user_id}:favorites`;
  const value = JSON.stringify(list);

  await fetch(`${REST_URL}/set/${key}`, {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${REST_TOKEN}`,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ value })
  });

  return NextResponse.json({ ok: true });
}
