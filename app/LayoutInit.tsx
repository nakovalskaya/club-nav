'use client';

import { useEffect } from 'react';
import { useFavoritesStore } from './store/useFavoritesStore';

export default function LayoutInit() {
  const setFavorites = useFavoritesStore.setState;

  useEffect(() => {
    const stored = localStorage.getItem('my-favorites');
    if (stored) {
      setFavorites({ favorites: JSON.parse(stored) });

      // 🔔 Обязательно диспатчим событие, чтобы /favorites обновилась
      window.dispatchEvent(new Event('favorites-updated'));
    }
  }, []);

  return null;
}
