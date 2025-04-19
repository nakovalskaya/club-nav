'use client';

import { useEffect } from 'react';
import { useFavorites } from './hooks/useFavorites' // ✅ путь поправлен

export default function Home() {
  useEffect(() => {
    if (typeof window !== 'undefined' && 'Telegram' in window) {
      // @ts-ignore
      window.Telegram?.WebApp?.ready?.();
    }
  }, []);
  const { favorites, toggleFavorite, isFavorite } = useFavorites();
  const cardId = '1';
  const isFav = isFavorite(cardId);

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

        {/* Тестовая карточка со звездочкой */}
        <div className="mt-6 p-4 rounded-xl border border-[#EBDEC8] relative">
          <button
            onClick={() => toggleFavorite(cardId)}
            className="absolute top-2 right-2 transition-transform duration-300"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill={isFav ? '#EBDEC8' : 'none'}
              viewBox="0 0 24 24"
              stroke="#EBDEC8"
              className={`w-6 h-6 ${isFav ? 'scale-110' : 'scale-100'} transition-transform duration-300 ease-in-out`}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={1.5}
                d="M11.48 3.499c.2-.58.84-.58 1.04 0l2.05 5.937a.55.55 0 00.52.377h6.144c.591 0 .835.757.358 1.104l-4.974 3.608a.55.55 0 00-.2.615l2.049 5.937c.2.58-.477 1.063-.974.707l-4.973-3.608a.55.55 0 00-.65 0l-4.973 3.608c-.497.356-1.174-.127-.974-.707l2.049-5.937a.55.55 0 00-.2-.615L2.358 10.917c-.477-.347-.233-1.104.358-1.104h6.144a.55.55 0 00.52-.377l2.05-5.937z"
              />
            </svg>
          </button>
          <h3 className="text-[#EBDEC8] text-base font-semibold mb-1">Карточка для пробы</h3>
          <p className="text-sm text-[#a9a09b]">Ты можешь нажать на звёздочку и увидеть магию ✨</p>
        </div>
        {/* Ещё 5 карточек со звёздочками */}
{[
  {
    id: '2',
    title: 'Горький валюта.',
    description: 'Волк рай изба спасть падаль вряд вскинуть возможно господь дьявол пастух.',
  },
  {
    id: '3',
    title: 'Крутой лапа иной.',
    description: 'Запеть подробность казнь.',
  },
  {
    id: '4',
    title: 'Терапия торопливый механический радость.',
    description: 'Изменение ложиться печатать освободить рис о эффект.',
  },
  {
    id: '5',
    title: 'Покидать.',
    description: 'Сбросить жить миг трясти редактор соответствие предоставить ягода.',
  },
  {
    id: '6',
    title: 'Столетие изучить монета.',
    description: 'Жидкий грудь плясать белье боец избегать материя результат.',
  },
].map(({ id, title, description }) => {
  const isFav = isFavorite(id);

  return (
    <div key={id} className="mt-4 p-4 rounded-xl border border-[#EBDEC8] relative">
      <button
        onClick={() => toggleFavorite(id)}
        className="absolute top-2 right-2 transition-transform duration-300"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill={isFav ? '#EBDEC8' : 'none'}
          viewBox="0 0 24 24"
          stroke="#EBDEC8"
          className={`w-6 h-6 ${isFav ? 'scale-110' : 'scale-100'} transition-transform duration-300 ease-in-out`}
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={1.5}
            d="M11.48 3.499c.2-.58.84-.58 1.04 0l2.05 5.937a.55.55 0 00.52.377h6.144c.591 0 .835.757.358 1.104l-4.974 3.608a.55.55 0 00-.2.615l2.049 5.937c.2.58-.477 1.063-.974.707l-4.973-3.608a.55.55 0 00-.65 0l-4.973 3.608c-.497.356-1.174-.127-.974-.707l2.049-5.937a.55.55 0 00-.2-.615L2.358 10.917c-.477-.347-.233-1.104.358-1.104h6.144a.55.55 0 00.52-.377l2.05-5.937z"
          />
        </svg>
      </button>
      <h3 className="text-[#EBDEC8] text-base font-semibold mb-1">{title}</h3>
      <p className="text-sm text-[#a9a09b]">{description}</p>
    </div>
  );
})}
      </main>
    </div>
  );
}
