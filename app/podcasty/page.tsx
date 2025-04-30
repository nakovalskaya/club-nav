'use client';

import { useRouter } from 'next/navigation';
import { allCards } from '../data/allCards';
import CardComponent from '../components/CardComponent';

export default function PodcastyPage() {
  const router = useRouter();
  const podcastCards = allCards.filter((card) => card.category === 'podcasty');

  return (
    <main className="min-h-screen bg-black text-[#EBDEC8] p-4 pb-24 text-sm font-normal">
      <button onClick={() => router.back()} className="mb-4">
        <img src="/back.svg" alt="Назад" className="w-7 h-7" />
      </button>

      <h1 className="text-xl font-semibold mb-4">Подкасты</h1>

      <div className="space-y-4">
        {podcastCards.map((card) => (
          <CardComponent key={card.id} card={card} />
        ))}
      </div>
    </main>
  );
}