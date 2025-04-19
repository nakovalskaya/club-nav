'use client';

import { useFavorites } from '../hooks/useFavorites';
import { allCards } from '../data/allCards';
import FavoriteButton from '../components/FavoriteButton';

export default function FavoritesPage() {
  const { favorites, isReady } = useFavorites();

  const saved = allCards.filter((item) => favorites.includes(item.id));

  if (!isReady) return null;

  return (
    <main className="min-h-screen bg-black text-[#EBDEC8] p-4 pb-24">
      <h1 className="text-xl font-semibold mb-4">Избранное</h1>

      {saved.length === 0 ? (
        <p className="text-sm text-[#9e948f]">Пока пусто. Добавь что-нибудь ⭐️</p>
      ) : (
        <div className="space-y-4">
          {saved.map((item) => (
            <div key={item.id} className="border border-[#EBDEC8] p-4 rounded-xl relative">
              <FavoriteButton id={item.id} />
              <h2 className="text-lg font-semibold mb-1">{item.title}</h2>
              <p className="text-sm text-[#9e948f]">{item.description}</p>
            </div>
          ))}
        </div>
      )}
    </main>
  );
}
