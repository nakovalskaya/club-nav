'use client';

import { useEffect } from 'react';
import { useFavoritesStore, loadFavoritesFromApi } from './store/useFavoritesStore';

export default function LayoutInit() {
  const setFavorites = useFavoritesStore.setState;

  useEffect(() => {
    async function init() {
      const data = await loadFavoritesFromApi(); // подтянули с бэкенда или localStorage
      setFavorites(data);
      window.dispatchEvent(new Event('favorites-updated'));
    }
    init();
  }, []);

  return null;
}
