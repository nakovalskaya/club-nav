'use client';

import { useFavoritesStore } from '../store/useFavoritesStore';
import { allCards } from '../data/allCards';
import { useEffect, useState } from 'react';
import CardComponent from '../components/CardComponent';

export default function FavoritesPage() {
  const [saved, setSaved] = useState(() =>
    allCards.filter((item) =>
      useFavoritesStore.getState().favorites.includes(item.id)
    )
  );

  useEffect(() => {
    const updateSaved = () => {
      const updated = allCards.filter((item) =>
        useFavoritesStore.getState().favorites.includes(item.id)
      );
      setSaved(updated);
    };

    updateSaved();
    window.addEventListener('favorites-updated', updateSaved);
    return () => window.removeEventListener('favorites-updated', updateSaved);
  }, []);

  return (
    <main className="min-h-screen bg-black text-[#EBDEC8] p-4 pb-24">
      <h1 className="text-xl font-semibold mb-4">Избранное</h1>

      {saved.length === 0 ? (
        <p className="text-sm text-[#9e948f]">Пока пусто. Добавь что-нибудь ⭐️</p>
      ) : (
        <div className="space-y-4">
          {saved.map((card) => (
            <CardComponent key={card.id} card={card} />
          ))}
        </div>
      )}
    </main>
  );
}