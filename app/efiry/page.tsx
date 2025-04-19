'use client';
import { useRouter } from 'next/navigation';
import { useFavorites } from '../hooks/useFavorites';

export const cards = [
  {
    id: 'efiry-1',
    title: 'Скрытая сила эфиров',
    description: 'Как проводить эфиры, которые реально продают.',
    recommended: true, // 💡 попадёт на главную
  },
  {
    id: 'efiry-2',
    title: 'Структура успешного прямого эфира',
    description: 'Что говорить, чтобы досматривали до конца.',
  },
];

export default function EfiryPage() {
  const router = useRouter();
  const { isFavorite, toggleFavorite } = useFavorites();

  return (
    <main className="min-h-screen bg-black text-[#EBDEC8] p-4">
      <button onClick={() => router.back()} className="mb-4">
        <img src="/back.svg" alt="Назад" className="w-7 h-7" />
      </button>
      <h1 className="text-xl font-semibold mb-4">Эфиры</h1>

      <div className="space-y-4">
        {cards.map(({ id, title, description }) => {
          const fav = isFavorite(id);
          return (
            <div key={id} className="p-4 border border-[#EBDEC8] rounded-xl relative">
              <button
                onClick={() => toggleFavorite(id)}
                className="absolute top-2 right-2 transition-transform duration-300"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="#EBDEC8"
                  className={`w-6 h-6 transform transition-all duration-500 ease-in-out ${
                    fav ? 'fill-[#EBDEC8] rotate-[360deg] scale-110 drop-shadow-glow' : 'scale-100'
                  }`}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="1.5"
                    d="M11.48 3.499c.2-.58.84-.58 1.04 0l2.05 5.937h6.144c.59 0 .83.76.36 1.1l-4.97 3.61 2.05 5.94c.2.58-.48 1.06-.97.71l-4.97-3.61-4.97 3.61c-.5.35-1.17-.13-.97-.71l2.05-5.94-4.97-3.61c-.47-.34-.23-1.1.36-1.1h6.14l2.05-5.94z"
                  />
                </svg>
              </button>
              <h3 className="text-base font-semibold mb-1">{title}</h3>
              <p className="text-sm text-[#a9a09b]">{description}</p>
            </div>
          );
        })}
      </div>
    </main>
  );
}
