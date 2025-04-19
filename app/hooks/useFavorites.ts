'use client';

import { useState, useEffect } from 'react';

const STORAGE_KEY = 'my-favorites';

export function useFavorites() {
  const [favorites, setFavorites] = useState<string[]>([]);
  const [isReady, setIsReady] = useState(false);

  // Загружаем из localStorage при старте
  useEffect(() => {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) {
      setFavorites(JSON.parse(stored));
    }
    setIsReady(true);
  }, []);

  // Обновляем localStorage при изменении favorites
  useEffect(() => {
    if (isReady) {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(favorites));
    }
  }, [favorites, isReady]);

  // ✅ toggle с событием
  const toggleFavorite = (id: string) => {
    setFavorites((prev) => {
      const updated = prev.includes(id)
        ? prev.filter((item) => item !== id)
        : [...prev, id];

      // Сохраняем
      localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));

      // 🚀 Испускаем событие
      window.dispatchEvent(new Event('favorites-updated'));

      return updated;
    });
  };

  const isFavorite = (id: string) => favorites.includes(id);

  return { favorites, toggleFavorite, isFavorite, isReady };
}
