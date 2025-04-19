'use client';

import { useFavorites } from '../hooks/useFavorites'
export default function FavoritesPage() {
  const { favorites } = useFavorites();

  // Пример карточек, позже заменим на реальные
  const content = [
    { id: '1', title: 'Эфир: как выстраивать воронки', description: 'Глубокий эфир о продажах без перегрева' },
    { id: '2', title: 'Гайд по Telegram', description: 'Выстроим доверие и лояльность' },
    { id: '3', title: 'Интенсив: Сторис без выгорания', description: 'Система сторис без ежедневной рутины' },
  ];

  const saved = content.filter((item) => favorites.includes(item.id));

  return (
    <main className="min-h-screen bg-black text-[#EBDEC8] p-4">
      <h1 className="text-xl font-semibold mb-4">Избранное</h1>

      {saved.length === 0 ? (
        <p className="text-sm text-gray-500">Пока пусто. Добавь что-нибудь ⭐️</p>
      ) : (
        saved.map((item) => (
          <div key={item.id} className="mb-4 border border-[#EBDEC8] p-4 rounded-lg">
            <h2 className="text-lg">{item.title}</h2>
            <p className="text-sm text-[#9e948f]">{item.description}</p>
          </div>
        ))
      )}
    </main>
  );
}
