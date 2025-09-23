'use client';

import { useRouter } from 'next/navigation';
import { allCards } from '../data/allCards';
import CardComponent from '../components/CardComponent';
import { useEffect, useState } from 'react';
import LoadingWrapper from '../components/LoadingWrapper';

export default function EfiryPage() {
  const router = useRouter();
  const cards = allCards.filter((card) => card.category === 'efiry');

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setTimeout(() => setLoading(false), 1000);
  }, []);

  return (
    <LoadingWrapper isLoading={loading}>
      <main className="min-h-screen bg-black text-[#EBDEC8] p-4 pb-24 text-sm font-normal">
        <button onClick={() => router.back()} className="mb-4">
          <img src="/back.svg" alt="Назад" className="w-7 h-7" />
        </button>

        {/* 👇 здесь вместо h1 теперь картинка */}
        <div className="mb-6 rounded-2xl overflow-hidden">
          <img src="/headers/efiry.jpg" alt="Эфиры" className="w-full h-auto object-cover" />
        </div>

        <div className="space-y-4">
          {cards.map((card) => (
            <CardComponent key={card.id} card={card} />
          ))}
        </div>
      </main>
    </LoadingWrapper>
  );
}
