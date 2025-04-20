'use client';

import { useEffect } from 'react';
import { useFavoritesStore } from './store/useFavoritesStore';

/* ---------- объявляем Telegram для TypeScript ---------- */
declare global {
  interface Window {
    Telegram: any; // минимально‑достаточно, нам нужны только WebApp.* свойства
  }
}

export default function LayoutInit() {
  const setFavorites = useFavoritesStore.setState;

  useEffect(() => {
    async function loadFavorites() {
      let raw: string | null = null;

      // Попробуем достать из CloudStorage
      if (window?.Telegram?.WebApp?.CloudStorage) {
        raw = await window.Telegram.WebApp.CloudStorage.getItem(
          'my-favorites'
        );
      } else {
        // Fallback — localStorage (браузер / старый Telegram)
        raw = localStorage.getItem('my-favorites');
      }

      if (raw) {
        setFavorites({ favorites: JSON.parse(raw) });
      }

      window.dispatchEvent(new Event('favorites-updated'));
    }

    loadFavorites();
  }, []);

  return null;
}
