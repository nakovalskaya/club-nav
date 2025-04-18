'use client';
import { useEffect } from 'react';

export default function Home() {
  useEffect(() => {
    if (typeof window !== 'undefined' && 'Telegram' in window) {
      // @ts-ignore
      window.Telegram?.WebApp?.ready?.();
    }
  }, []);

  return (
    <main className="min-h-screen bg-black text-white font-sans px-4 py-6">
      {/* Заголовок-картинка */}
      <img src="/logo.png" alt="nakovalskaya" className="mx-auto w-48 mb-6" />

      {/* Сетка из 4 карточек */}
      <div className="grid grid-cols-2 gap-4 mb-8">
        <a href="/efiry" className="rounded-xl overflow-hidden">
          <img src="/efiry.jpg" alt="Эфиры" className="w-full object-cover" />
        </a>
        <a href="/podcasty" className="rounded-xl overflow-hidden">
          <img src="/podcasty.jpg" alt="Подкасты" className="w-full object-cover" />
        </a>
        <a href="/kursy" className="rounded-xl overflow-hidden">
          <img src="/kursy.jpg" alt="Курсы" className="w-full object-cover" />
        </a>
        <a href="/gidy" className="rounded-xl overflow-hidden">
          <img src="/gidy.jpg" alt="Гиды" className="w-full object-cover" />
        </a>
      </div>

      {/* Разделы */}
      <h2 className="text-lg font-semibold mb-2">Разделы</h2>
      <div className="flex space-x-3 overflow-x-auto pb-2 scrollbar-hide">
        {[
          'воронки',
          'продажи',
          'instagram',
          'telegram',
          'threads',
          'нейросети',
          'reels'
        ].map((item) => (
          <button
            key={item}
            className="whitespace-nowrap border border-white rounded-full px-4 py-1 text-sm shrink-0"
          >
            {item}
          </button>
        ))}
      </div>
    </main>
  );
}