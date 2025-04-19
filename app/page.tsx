'use client';

import { useEffect } from 'react';
import { useFavorites } from './hooks/useFavorites';
import FavoriteButton from './components/FavoriteButton';
import { allCards } from './data/allCards';

const recommendedCards = allCards.filter(card => card.recommended);

export default function Home() {
  const { favorites, toggleFavorite, isFavorite } = useFavorites();

  useEffect(() => {
    if (typeof window !== 'undefined' && 'Telegram' in window) {
      // @ts-ignore
      window.Telegram.WebApp.ready?.();
    }
  }, []);

  return (
    <div className="min-h-screen bg-black text-white font-sans flex justify-center">
      <main className="w-full px-4 py-6 pb-24">
        {/* Сетка из 4 карточек */}
        <div className="grid grid-cols-2 gap-1 mb-4 -mt-1">
          <a href="/efiry" className="rounded-xl overflow-hidden h-[110px]">
            <img src="/efiry.jpg" alt="Эфиры" className="w-full h-full object-cover" />
          </a>
          <a href="/podcasty" className="rounded-xl overflow-hidden h-[110px]">
            <img src="/podcasty.jpg" alt="Подкасты" className="w-full h-full object-cover" />
          </a>
          <a href="/kursy" className="rounded-xl overflow-hidden h-[110px]">
            <img src="/kursy.jpg" alt="Курсы" className="w-full h-full object-cover" />
          </a>
          <a href="/gidy" className="rounded-xl overflow-hidden h-[110px]">
            <img src="/gidy.jpg" alt="Гиды" className="w-full h-full object-cover" />
          </a>
        </div>

        {/* Разделы */}
        <h2 className="text-lg font-semibold mb-2 text-[#EBDEC8]">Разделы</h2>
        <div className="flex space-x-2 overflow-x-auto pb-2 scrollbar-hide scroll-smooth">
          {[
            { label: 'воронки', path: 'voronki' },
            { label: 'продажи', path: 'prodazhi' },
            { label: 'instagram', path: 'instagram' },
            { label: 'telegram', path: 'telegram' },
            { label: 'threads', path: 'threads' },
            { label: 'нейросети', path: 'nejroseti' },
            { label: 'reels', path: 'reels' },
          ].map(({ label, path }) => (
            <a
              key={path}
              href={`/${path}`}
              className="whitespace-nowrap border border-[#EBDEC8] text-[#EBDEC8] rounded-full px-5 py-2 text-sm font-normal shrink-0 bg-transparent hover:bg-black transition-all duration-200 hover:scale-[1.03]"
            >
              {label}
            </a>
          ))}
        </div>

        {/* Рекомендованные карточки */}
        {recommendedCards.length > 0 && (
          <>
            <h2 className="text-lg font-semibold mt-8 mb-4 text-[#EBDEC8]">Рекомендованные</h2>
            <div className="space-y-4">
              {recommendedCards.map(({ id, title, description }) => {
                const fav = isFavorite(id);

                return (
                  <div key={id} className="p-4 border border-[#EBDEC8] rounded-xl relative">
                    <FavoriteButton id={id} />
                    <h3 className="text-[#EBDEC8] text-base font-semibold mb-1">{title}</h3>
                    <p className="text-sm text-[#a9a09b]">{description}</p>
                  </div>
                );
              })}
            </div>
          </>
        )}
      </main>
    </div>
  );
}
