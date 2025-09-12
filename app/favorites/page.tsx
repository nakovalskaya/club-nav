'use client';

import { useFavoritesStore } from '../store/useFavoritesStore';
import { allCards } from '../data/allCards';
import type { Card } from '../data/allCards';
import { useEffect, useState } from 'react';
import CardComponent from '../components/CardComponent';
import LoadingWrapper from '../components/LoadingWrapper';
import { AnimatePresence, motion } from 'framer-motion';

export default function FavoritesPage() {
  const [saved, setSaved] = useState<Card[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const updateSaved = () => {
      const updated = allCards.filter((item) =>
        useFavoritesStore.getState().favorites.includes(item.id)
      );
      setSaved(updated);
      setLoading(false);
    };

    setTimeout(updateSaved, 5000); // искусственная задержка 5 сек
    window.addEventListener('favorites-updated', updateSaved);
    return () => window.removeEventListener('favorites-updated', updateSaved);
  }, []);

  return (
    <LoadingWrapper isLoading={loading}>
      <main className="min-h-screen bg-black text-[#EBDEC8] p-4 pb-24">
        <h1 className="text-xl font-semibold mb-4">Избранное</h1>

        {saved.length === 0 ? (
          <p className="text-sm text-[#9e948f]">Пока пусто. Добавь что-нибудь ⭐️</p>
        ) : (
          <div className="space-y-4">
            <AnimatePresence>
              {saved.map((card) => (
                <motion.div
                  key={card.id}
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ duration: 0.4 }}
                >
                  <CardComponent card={card} />
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        )}
      </main>
    </LoadingWrapper>
  );
}
