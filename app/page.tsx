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
    <div className="min-h-screen bg-black text-white font-sans flex justify-center">
      <main className="w-full max-w-sm md:max-w-md lg:max-w-lg px-4 py-6">
        {/* Заголовок-картинка */}
        <img src="/logo.png" alt="nakovalskaya" className="mx-auto w-24 mb-6" />

        {/* Сетка из 4 карточек */}
        <div className="grid grid-cols-2 gap-1 mb-4 -mt-4">
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
<h2 className="text-lg font-semibold mb-2">Разделы</h2>
<div className="flex space-x-2 overflow-x-auto pb-2 scrollbar-hide scroll-smooth">
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
      className="whitespace-nowrap border border-[#EBDEC8] text-[#EBDEC8] rounded-full px-4 py-1 text-sm shrink-0 bg-transparent hover:bg-black transition-all duration-200 hover:scale-[1.03]"
    >
      {item}
    </button>
  ))}
</div>
      </main>
    </div>
  );
}