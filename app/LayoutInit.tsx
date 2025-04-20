'use client';

import { useEffect } from 'react';
import { useFavoritesStore, loadFavoritesFromApi } from './store/useFavoritesStore';

export default function LayoutInit() {
  const setFavorites = useFavoritesStore.setState;

  useEffect(() => {
    // первоначальная загрузка
    async function init() {
      const data = await loadFavoritesFromApi();
      setFavorites(data);
      window.dispatchEvent(new Event('favorites-updated'));
    }

    init();

    // при возврате в фокус — синхронизировать
    const handleFocus = async () => {
      const data = await loadFavoritesFromApi();
      setFavorites(data);
      window.dispatchEvent(new Event('favorites-updated'));
    };

    window.addEventListener('focus', handleFocus);
    document.addEventListener('visibilitychange', () => {
      if (document.visibilityState === 'visible') handleFocus();
    });

    // если хочешь дополнительно автообновление каждые 10 сек — раскомментируй
    // const interval = setInterval(handleFocus, 10000);

    return () => {
      window.removeEventListener('focus', handleFocus);
      document.removeEventListener('visibilitychange', handleFocus);
      // clearInterval(interval);
    };
  }, []);

  return null;
}
