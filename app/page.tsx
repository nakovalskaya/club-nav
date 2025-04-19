'use client';

import { useEffect } from 'react';
import { useFavorites } from './hooks/useFavorites';

import * as efiryModule from './efiry/page';
import * as podcastyModule from './podcasty/page';
import * as kursyModule from './kursy/page';
import * as gidyModule from './gidy/page';
import * as prodazhiModule from './prodazhi/page';
import * as voronkiModule from './voronki/page';
import * as instagramModule from './instagram/page';
import * as telegramModule from './telegram/page';
import * as threadsModule from './threads/page';
import * as nejrosetiModule from './nejroseti/page';
import * as reelsModule from './reels/page';

const efiryCards = Array.isArray(efiryModule.cards) ? efiryModule.cards : [];
const podcastyCards = Array.isArray(podcastyModule.cards) ? podcastyModule.cards : [];
const kursyCards = Array.isArray(kursyModule.cards) ? kursyModule.cards : [];
const gidyCards = Array.isArray(gidyModule.cards) ? gidyModule.cards : [];
const prodazhiCards = Array.isArray(prodazhiModule.cards) ? prodazhiModule.cards : [];
const voronkiCards = Array.isArray(voronkiModule.cards) ? voronkiModule.cards : [];
const instagramCards = Array.isArray(instagramModule.cards) ? instagramModule.cards : [];
const telegramCards = Array.isArray(telegramModule.cards) ? telegramModule.cards : [];
const threadsCards = Array.isArray(threadsModule.cards) ? threadsModule.cards : [];
const nejrosetiCards = Array.isArray(nejrosetiModule.cards) ? nejrosetiModule.cards : [];
const reelsCards = Array.isArray(reelsModule.cards) ? reelsModule.cards : [];

type Card = {
  id: string;
  title: string;
  description: string;
  recommended?: boolean;
};

const recommendedCards = [
  ...efiryCards,
  ...podcastyCards,
  ...kursyCards,
  ...gidyCards,
  ...prodazhiCards,
  ...voronkiCards,
  ...instagramCards,
  ...telegramCards,
  ...threadsCards,
  ...nejrosetiCards,
  ...reelsCards,
].filter(card => card.recommended);

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
      <main className="w-full px-4 py-6">
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
                    <button
                      onClick={() => toggleFavorite(id)}
                      className="absolute top-2 right-2 transition-transform duration-300"
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill={fav ? '#EBDEC8' : 'none'}
                        viewBox="0 0 24 24"
                        stroke="#EBDEC8"
                        className={`w-6 h-6 ${fav ? 'scale-110' : 'scale-100'} transition-transform duration-300 ease-in-out`}
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={1.5}
                          d="M11.48 3.499c.2-.58.84-.58 1.04 0l2.05 5.937h6.144c.59 0 .83.76.36 1.1l-4.97 3.61 2.05 5.94c.2.58-.48 1.06-.97.71l-4.97-3.61-4.97 3.61c-.5.35-1.17-.13-.97-.71l2.05-5.94-4.97-3.61c-.47-.34-.23-1.1.36-1.1h6.14l2.05-5.94z"
                        />
                      </svg>
                    </button>
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
