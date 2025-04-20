'use client';

import { useEffect, useState } from 'react';
import { useFavoritesStore, loadFavoritesFromApi } from './store/useFavoritesStore';

export default function LayoutInit() {
  const setFavorites = useFavoritesStore.setState;
  const [lastSync, setLastSync] = useState<string>('не загружено');

  useEffect(() => {
    async function syncFavorites(source: string) {
      const data = await loadFavoritesFromApi();
      setFavorites(data);
      setLastSync(`${source} — ${new Date().toLocaleTimeString()}`);
      window.dispatchEvent(new Event('favorites-updated'));
    }

    syncFavorites('старт');

    const handleFocus = () => syncFavorites('фокус/возврат');
    window.addEventListener('focus', handleFocus);
    document.addEventListener('visibilitychange', () => {
      if (document.visibilityState === 'visible') handleFocus();
    });

    const interval = setInterval(() => syncFavorites('таймер 10с'), 10000);

    return () => {
      window.removeEventListener('focus', handleFocus);
      document.removeEventListener('visibilitychange', handleFocus);
      clearInterval(interval);
    };
  }, []);

  return (
    <div style={{
      position: 'fixed',
      bottom: 8,
      left: 8,
      background: 'black',
      color: 'lime',
      fontSize: '12px',
      padding: '4px 6px',
      borderRadius: '4px',
      zIndex: 9999
    }}>
      🔄 Синхро: {lastSync}
    </div>
  );
}
