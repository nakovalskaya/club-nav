'use client';

import { useRouter } from 'next/navigation';
import FavoriteButton from '../components/FavoriteButton';

export const cards = [
  {
    id: 'prodazhi-1',
    title: 'Как продавать без прогревов',
    description: 'Гайд по воронкам без сторис.',
    recommended: true,
  },
  {
    id: 'prodazhi-2',
    title: 'Ошибки в переписке',
    description: 'Разбор 5 ошибок в чат-продажах.',
    recommended: false,
  },
  {
    id: 'prodazhi-3',
    title: 'Дорогой продукт — без боли',
    description: 'Стратегия мягких продаж на большие чеки.',
    recommended: true,
  },
];

export default function ProdazhiPage() {
  const router = useRouter();

  return (
    <main className="min-h-screen bg-black text-[#EBDEC8] p-4">
      <button onClick={() => router.back()} className="mb-4">
        <img src="/back.svg" alt="Назад" className="w-7 h-7" />
      </button>

      <h1 className="text-xl font-semibold mb-4">Продажи</h1>

      <div className="space-y-4">
        {cards.map(({ id, title, description }) => (
          <div key={id} className="p-4 border border-[#EBDEC8] rounded-xl relative">
            <FavoriteButton id={id} />
            <h3 className="text-[#EBDEC8] text-base font-semibold mb-1">{title}</h3>
            <p className="text-sm text-[#a9a09b]">{description}</p>
          </div>
        ))}
      </div>
    </main>
  );
}
