'use client';

import { useRouter } from 'next/navigation';
import { useFavoritesStore } from '../store/useFavoritesStore';
import { cards } from './cards';
import CardComponent from '../components/CardComponent';
import { useEffect, useState } from 'react';
import LoadingWrapper from '../components/LoadingWrapper';

export default function NejrosetiPage() {
  const router = useRouter();
  const isFavorite = useFavoritesStore((state) => state.isFavorite);
  const toggleFavorite = useFavoritesStore((state) => state.toggleFavorite);

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setTimeout(() => setLoading(false), 1000);
  }, []);

  return (
    <LoadingWrapper isLoading={loading}>
      <main className="min-h-screen bg-black text-[#EBDEC8] p-4 pb-24">
        <button onClick={() => router.back()} className="mb-4">
          <img src="/back.svg" alt="Назад" className="w-7 h-7" />
        </button>

        <h1 className="text-xl font-semibold mb-4">Нейросети</h1>

        <div className="space-y-4">
          {cards.map((card) => (
            <CardComponent key={card.id} card={card} />
          ))}
        </div>
      </main>
    </LoadingWrapper>
  );
}