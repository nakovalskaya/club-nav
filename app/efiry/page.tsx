'use client';

import { useRouter } from 'next/navigation';
import { allCards } from '../data/allCards';
import CardComponent from '../components/CardComponent';

export default function EfiryPage() {
  const router = useRouter();

  // Фильтруем карточки, у которых категория "efiry"
  const cards = allCards.filter((card) => card.category === 'efiry');

  return (
    <main className="min-h-screen bg-black text-[#EBDEC8] p-4 pb-24 text-sm font-normal">
      <button onClick={() => router.back()} className="mb-4">
        <img src="/back.svg" alt="Назад" className="w-7 h-7" />
      </button>

      <h1 className="text-xl font-semibold mb-4">Эфиры</h1>

      <div className="space-y-4">
        {cards.map((card) => (
          <CardComponent key={card.id} card={card} />
        ))}
      </div>
    </main>
  );
}