'use client';

import { useEffect, useState } from 'react';
import { useFavoritesStore } from './store/useFavoritesStore';
import { allCards } from './data/allCards';
import CardComponent from './components/CardComponent';
import LoadingWrapper from './components/LoadingWrapper'; 


const recommendedCards = allCards.filter(card => card.recommended);

export default function Home() {
  const toggleFavorite = useFavoritesStore((state) => state.toggleFavorite);
  const isFavorite = useFavoritesStore((state) => state.isFavorite);

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (typeof window !== 'undefined' && 'Telegram' in window) {
      // @ts-ignore
      window.Telegram.WebApp.ready?.();
    }
    setTimeout(() => setLoading(false), 1000);
  }, []);

  return (
    <LoadingWrapper isLoading={loading}>
      <main className="min-h-screen bg-black text-[#EBDEC8] font-sans flex justify-center">
        <div className="w-full px-4 py-6 pb-24">
          {/* Сетка из 4 карточек */}
          <div className="grid grid-cols-2 gap-1 mb-4 -mt-1">
            <a href="/efiry" className="w-full h-[110px] rounded-[14px] overflow-hidden bg-black">
              <img
                src="/efiry.jpg"
                alt="Эфиры"
                className="w-full h-full object-cover bg-black rounded-[14px]"
              />
            </a>
            <a href="/podcasty" className="w-full h-[110px] rounded-[14px] overflow-hidden bg-black">
              <img
                src="/podcasty.jpg"
                alt="Подкасты"
                className="w-full h-full object-cover bg-black rounded-[14px]"
              />
            </a>
            <a href="/kursy" className="w-full h-[110px] rounded-[14px] overflow-hidden bg-black">
              <img
                src="/kursy.jpg"
                alt="Курсы"
                className="w-full h-full object-cover bg-black rounded-[14px]"
              />
            </a>
            <a href="/gidy" className="w-full h-[110px] rounded-[14px] overflow-hidden bg-black">
              <img
                src="/gidy.jpg"
                alt="Гиды"
                className="w-full h-full object-cover bg-black rounded-[14px]"
              />
            </a>
          </div>

          {/* Разделы */}
          <h2 className="text-lg font-semibold mb-2">Разделы</h2>
          <div className="flex space-x-2 overflow-x-auto pb-2 scrollbar-hide scroll-smooth">
            {[
              { label: 'воронки', path: 'voronki' },
              { label: 'продажи', path: 'prodazhi' },
              { label: 'мышление', path: 'mysli' },
              { label: 'instagram', path: 'instagram' },
              { label: 'telegram', path: 'telegram' },
              { label: 'маркетинг', path: 'marketing' },
              { label: 'threads', path: 'threads' },
              { label: 'нейросети', path: 'nejroseti' },
              { label: 'reels', path: 'reels' },
            ].map(({ label, path }) => (
              <a
                key={path}
                href={`/${path}`}
                className="whitespace-nowrap border border-[#EBDEC8] text-[#EBDEC8] rounded-full px-6 py-2 text-sm font-normal shrink-0 bg-transparent hover:bg-black transition-all duration-200 hover:scale-[1.03]"
              >
                {label}
              </a>
            ))}
          </div>

          {/* Рекомендованные карточки */}
          {recommendedCards.length > 0 && (
            <>
              <h2 className="text-lg font-semibold mt-8 mb-4">Рекомендованные</h2>
              <div className="space-y-4">
                {recommendedCards.map((card) => (
                  <CardComponent key={card.id} card={card} />
                ))}
              </div>
            </>
          )}
        </div>
      </main>
    </LoadingWrapper>
  );
}