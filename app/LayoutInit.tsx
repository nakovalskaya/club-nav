'use client';

import { useEffect } from 'react';
import { useFavoritesStore, loadFavoritesFromApi } from './store/useFavoritesStore';

export default function LayoutInit() {
  const setFavorites = useFavoritesStore.setState;

  useEffect(() => {
    async function syncFavorites() {
      const data = await loadFavoritesFromApi();
      setFavorites(data);
      window.dispatchEvent(new Event('favorites-updated'));
    }

    // Загрузка при старте
    syncFavorites();

    // Обновление при возврате в окно
    const handleFocus = () => syncFavorites();
    window.addEventListener('focus', handleFocus);
    document.addEventListener('visibilitychange', () => {
      if (document.visibilityState === 'visible') syncFavorites();
    });

    // Автообновление раз в 10 секунд
    const interval = setInterval(syncFavorites, 10000);

    return () => {
      window.removeEventListener('focus', handleFocus);
      document.removeEventListener('visibilitychange', handleFocus);
      clearInterval(interval);
    };
  }, []);

  return null;
}
