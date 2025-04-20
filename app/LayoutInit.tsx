'use client';

import { useEffect } from 'react';
import { useFavoritesStore, loadFavoritesFromApi } from './store/useFavoritesStore';

export default function LayoutInit() {
  const setFavorites = useFavoritesStore.setState;

  useEffect(() => {
    async function syncFavorites(source: string) {
      console.log(`🔁 Синхронизация (${source})`);
      const data = await loadFavoritesFromApi();
      console.log('📡 Получено избранное:', data);
      setFavorites(data);
      window.dispatchEvent(new Event('favorites-updated'));
    }

    // начальная загрузка
    syncFavorites('старт');

    // фокус/переключение окна
    const handleFocus = () => syncFavorites('фокус/возврат');
    window.addEventListener('focus', handleFocus);
    document.addEventListener('visibilitychange', () => {
      if (document.visibilityState === 'visible') handleFocus();
    });

    // автообновление каждые 10 секунд
    const interval = setInterval(() => syncFavorites('таймер 10с'), 10000);

    return () => {
      window.removeEventListener('focus', handleFocus);
      document.removeEventListener('visibilitychange', handleFocus);
      clearInterval(interval);
    };
  }, []);

  return null;
}
