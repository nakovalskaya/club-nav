'use client';

import { create } from 'zustand';

type Store = {
  favorites: string[];
  toggleFavorite: (id: string) => void;
  isFavorite: (id: string) => boolean;
};

function cloudAvailable() {
  return !!window?.Telegram?.WebApp?.CloudStorage;
}

// promisify setItem
function cloudSet(key: string, value: string): Promise<void> {
  return new Promise((resolve, reject) => {
    window.Telegram.WebApp.CloudStorage.setItem(
      key,
      value,
      (err: any) => (err ? reject(err) : resolve())
    );
  });
}

export const useFavoritesStore = create<Store>((set, get) => ({
  favorites: [],

  toggleFavorite: async (id) => {
    const curr = get().favorites;
    const updated = curr.includes(id)
      ? curr.filter((i) => i !== id)
      : [...curr, id];

    set({ favorites: updated });

    const json = JSON.stringify(updated);

    if (cloudAvailable()) {
      try {
        await cloudSet('my-favorites', json);
      } catch {
        localStorage.setItem('my-favorites', json);
      }
    } else {
      localStorage.setItem('my-favorites', json);
    }

    window.dispatchEvent(new Event('favorites-updated'));
  },

  isFavorite: (id) => get().favorites.includes(id),
}));
