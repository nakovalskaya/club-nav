'use client';

import { useState, useEffect } from 'react';

const STORAGE_KEY = 'my-favorites';

export function useFavorites() {
  const [favorites, setFavorites] = useState<string[]>([]);
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) {
      setFavorites(JSON.parse(stored));
    }
    setIsReady(true);

    // 🔄 Слушаем кастомное событие
    const syncFavorites = () => {
      const updated = localStorage.getItem(STORAGE_KEY);
      if (updated) {
        setFavorites(JSON.parse(updated));
      }
    };

    window.addEventListener('favorites-updated', syncFavorites);

    return () => {
      window.removeEventListener('favorites-updated', syncFavorites);
    };
  }, []);

  useEffect(() => {
    if (isReady) {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(favorites));
    }
  }, [favorites, isReady]);

  const toggleFavorite = (id: string) => {
    setFavorites((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  const isFavorite = (id: string) => favorites.includes(id);

  return { favorites, toggleFavorite, isFavorite, isReady };
}
