'use client';
import { useRouter } from 'next/navigation';

export default function EfiryPage() {
  const router = useRouter();

  return (
    <main className="min-h-screen bg-black text-[#EBDEC8] p-4">
      <button onClick={() => router.back()} className="mb-4">
        <img src="/back.svg" alt="Назад" className="w-7 h-7" />
      </button>
      <p>Раздел пока в разработке...</p>
    </main>
  );
}

// 👇 карточки для главной (рекомендованные подтягиваются оттуда)
export const cards = [
  {
    id: 'efiry-1',
    title: 'Огонь без прогревов',
    description: 'Запись эфира о продажах без сторис и сторителлинга.',
    recommended: true,
  },
  {
    id: 'efiry-2',
    title: 'Как удерживать внимание',
    description: 'Механики и психология для Reels и эфиров.',
  },
];
