'use client';

import { useEffect } from 'react';
import { useFavoritesStore } from './store/useFavoritesStore';

declare global {
  interface Window {
    Telegram: any;
  }
}

// ——— helper: promisify getItem ———
function cloudGet(key: string): Promise<string | null> {
  return new Promise((resolve, reject) => {
    if (!window.Telegram?.WebApp?.CloudStorage) {
      return resolve(null);
    }
    window.Telegram.WebApp.CloudStorage.getItem(
      key,
      (err: any, value: string | null) => {
        if (err) reject(err);
        else resolve(value);
      }
    );
  });
}

export default function LayoutInit() {
  const setFavorites = useFavoritesStore.setState;

  useEffect(() => {
    async function loadFavorites() {
      let raw: string | null = null;

      if (window?.Telegram?.WebApp?.CloudStorage) {
        try {
          raw = await cloudGet('my-favorites');
        } catch (e) {
          console.warn('CloudStorage error, fallback to localStorage', e);
        }
      }
      if (!raw) raw = localStorage.getItem('my-favorites');

      if (raw) setFavorites({ favorites: JSON.parse(raw) });

      window.dispatchEvent(new Event('favorites-updated'));
    }

    loadFavorites();
  }, []);

  return null;
}
