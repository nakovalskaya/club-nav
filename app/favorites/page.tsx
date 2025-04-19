'use client';

import { useEffect, useState } from 'react';
import { useFavorites } from '../hooks/useFavorites';
import { allCards } from '../data/allCards';
import FavoriteButton from '../components/FavoriteButton';

export default function FavoritesPage() {
  const { favorites, isFavorite } = useFavorites();
  const [saved, setSaved] = useState(allCards.filter((item) => favorites.includes(item.id)));

  // Обновляем список при изменении favorites
  useEffect(() => {
    setSaved(allCards.filter((item) => favorites.includes(item.id)));
  }, [favorites]);

  return (
    <main className="min-h-screen bg-black text-[#EBDEC8] p-4">
      <h1 className="text-xl font-semibold mb-4">Избранное</h1>

      {saved.length === 0 ? (
        <p className="text-sm text-gray-500">Пока пусто. Добавь что-нибудь ⭐️</p>
      ) : (
        saved.map((item) => (
          <div key={item.id} className="mb-4 border border-[#EBDEC8] p-4 rounded-lg relative">
            <FavoriteButton id={item.id} />
            <h2 className="text-lg">{item.title}</h2>
            <p className="text-sm text-[#9e948f]">{item.description}</p>
          </div>
        ))
      )}
    </main>
  );
}
