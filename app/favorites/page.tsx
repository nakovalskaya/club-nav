'use client';

import { useFavoritesStore } from '../store/useFavoritesStore';
import { allCards } from '../data/allCards';
import type { Card } from '../data/allCards';
import { useEffect, useRef, useState } from 'react';
import CardComponent from '../components/CardComponent';
import LoadingWrapper from '../components/LoadingWrapper';
import { AnimatePresence, motion } from 'framer-motion';

export default function FavoritesPage() {
  const [saved, setSaved] = useState<Card[]>([]);
  const [loading, setLoading] = useState(true);

  const mountedRef = useRef(false);
  const debounceRef = useRef<number | null>(null);

  // вычисление списка избранного
  const computeSaved = () =>
    allCards.filter((item) =>
      useFavoritesStore.getState().favorites.includes(item.id)
    );

  // лёгкая проверка, чтобы не сетать то же самое
  const sameByIds = (a: Card[], b: Card[]) => {
    if (a.length !== b.length) return false;
    for (let i = 0; i < a.length; i++) if (a[i].id !== b[i].id) return false;
    return true;
  };

  const debouncedUpdate = () => {
    if (debounceRef.current) window.clearTimeout(debounceRef.current);
    debounceRef.current = window.setTimeout(() => {
      if (!mountedRef.current) return;
      const next = computeSaved();
      setSaved((prev) => (sameByIds(prev, next) ? prev : next));
      // loading трогаем только на первом входе
    }, 120);
  };

  useEffect(() => {
    mountedRef.current = true;

    // твоя искусственная задержка 5 сек — оставляю
    const initial = window.setTimeout(() => {
      if (!mountedRef.current) return;
      const next = computeSaved();
      setSaved(next);
      setLoading(false);
    }, 5000);

    // слушаем одно событие и не спамим апдейтами
    const onFavUpdate = () => debouncedUpdate();
    window.addEventListener('favorites-updated', onFavUpdate);

    // когда вернулись на вкладку/экран — аккуратно обновим без моргания
    const onVisible = () => {
      if (document.visibilityState === 'visible') debouncedUpdate();
    };
    document.addEventListener('visibilitychange', onVisible);

    return () => {
      mountedRef.current = false;
      window.clearTimeout(initial);
      if (debounceRef.current) window.clearTimeout(debounceRef.current);
      window.removeEventListener('favorites-updated', onFavUpdate);
      document.removeEventListener('visibilitychange', onVisible);
    };
  }, []);

  return (
    <LoadingWrapper isLoading={loading}>
      <main className="min-h-screen bg-black text-[#EBDEC8] p-4 pb-24">
        <h1 className="text-xl font-semibold mb-4">Избранное</h1>

        {saved.length === 0 ? (
          <p className="text-sm text-[#9e948f]">Пока пусто. Добавь что-нибудь ⭐️</p>
        ) : (
          <div className="space-y-4">
            {/* initial={false} — не проигрываем «вход» заново при каждом апдейте */}
            <AnimatePresence initial={false}>
              {saved.map((card) => (
                <motion.div
                  key={card.id}
                  layout
                  initial={{ opacity: 0, scale: 0.98 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.98 }}
                  transition={{ duration: 0.28 }}
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
