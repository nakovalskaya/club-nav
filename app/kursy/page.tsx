'use client';

import { useRouter } from 'next/navigation';
import { allCards } from '../data/allCards';
import CardComponent from '../components/CardComponent';
import { useEffect, useState } from 'react';
import LoadingWrapper from '../components/LoadingWrapper';

export default function KursyPage() {
  const router = useRouter();
  const kursyCards = allCards.filter((card) => card.category === 'kursy');

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setTimeout(() => setLoading(false), 1000);
  }, []);

  return (
    <LoadingWrapper isLoading={loading}>
      <main className="min-h-screen bg-black text-[#EBDEC8] p-4 pb-24 text-sm font-normal">
        <button onClick={() => router.back()} className="mb-4">
          <img src="/back.svg" alt="Назад" className="w-7 h-7" />
        </button>

        <h1 className="text-xl font-semibold mb-4">Курсы</h1>

        <div className="space-y-4">
          {kursyCards.map((card) => (
            <CardComponent key={card.id} card={card} />
          ))}
        </div>
      </main>
    </LoadingWrapper>
  );
}