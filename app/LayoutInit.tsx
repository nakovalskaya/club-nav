'use client';

import { useEffect } from 'react';
import { useFavoritesStore } from './store/useFavoritesStore';

export default function LayoutInit() {
  const setFavorites = useFavoritesStore.setState;

  useEffect(() => {
    const stored = localStorage.getItem('my-favorites');
    if (stored) {
      setFavorites({ favorites: JSON.parse(stored) });
    }
  }, []);

  return null;
}
