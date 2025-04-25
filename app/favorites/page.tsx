'use client';

import { useFavoritesStore } from '../store/useFavoritesStore';
import { allCards } from '../data/allCards';
import FavoriteButton from '../components/FavoriteButton';
import { useEffect, useState } from 'react';

export default function FavoritesPage() {
  const [saved, setSaved] = useState(() =>
    allCards.filter((item) =>
      useFavoritesStore.getState().favorites.includes(item.id)
    )
  );

  // 🪄 Обновляем карточки при изменении избранного через событие
  useEffect(() => {
    const updateSaved = () => {
      const updated = allCards.filter((item) =>
        useFavoritesStore.getState().favorites.includes(item.id)
      );
      setSaved(updated);
    };

    updateSaved(); // Обновляем сразу при загрузке

    window.addEventListener('favorites-updated', updateSaved);
    return () => window.removeEventListener('favorites-updated', updateSaved);
  }, []);

  return (
    <main className="min-h-screen bg-black text-[#EBDEC8] p-4 pb-24 text-sm font-normal">
      <h1 className="text-xl font-semibold mb-4">Избранное</h1>

      {saved.length === 0 ? (
        <p className="text-sm text-[#9e948f]">Пока пусто. Добавь что-нибудь ⭐️</p>
      ) : (
        <div className="space-y-4">
          {saved.map((item) => (
            <div
              key={item.id}
              className="border border-[#EBDEC8] p-4 rounded-xl relative"
            >
              <FavoriteButton id={item.id} />
              <h2 className="text-base font-semibold mb-1">{item.title}</h2>
              <p className="text-sm text-[#9e948f]">{item.description}</p>
            </div>
          ))}
        </div>
      )}
    </main>
  );
}
