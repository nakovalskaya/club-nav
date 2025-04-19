'use client';
import { useRouter } from 'next/navigation';
import { useFavoritesStore } from '../store/useFavoritesStore';
import { cards } from './cards';
import FavoriteButton from '../components/FavoriteButton';

export default function TelegramPage() {
  const router = useRouter();
  const isFavorite = useFavoritesStore((state) => state.isFavorite);
const toggleFavorite = useFavoritesStore((state) => state.toggleFavorite);

  return (
    <main className="min-h-screen bg-black text-[#EBDEC8] p-4 pb-24">
      <button onClick={() => router.back()} className="mb-4">
        <img src="/back.svg" alt="Назад" className="w-7 h-7" />
      </button>

      <h1 className="text-xl font-semibold mb-4">Telegram</h1>

      <div className="space-y-4">
        {cards.map(({ id, title, description }) => (
          <div key={id} className="p-4 border border-[#EBDEC8] rounded-xl relative">
            <FavoriteButton id={id} /> {/* 👈 звезда со всеми эффектами */}
            <h3 className="text-base font-semibold mb-1">{title}</h3>
            <p className="text-sm text-[#a9a09b]">{description}</p>
          </div>
        ))}
      </div>
    </main>
  );
}
