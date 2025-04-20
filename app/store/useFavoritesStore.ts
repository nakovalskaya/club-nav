'use client';

import { create } from 'zustand';

type Store = {
  favorites: string[];
  toggleFavorite: (id: string) => void;
  isFavorite: (id: string) => boolean;
};

/* ---------- helpers ---------- */

// CloudStorage есть, если объект присутствует
function cloudAvailable() {
  return typeof window !== 'undefined' &&
    // @ts-ignore
    !!window.Telegram?.WebApp?.CloudStorage;
}

// Пишем в облако; если пользователь отказал — делаем fallback
async function saveToCloud(favs: string[]) {
  // @ts-ignore
  const CS = window.Telegram.WebApp.CloudStorage;

  try {
    await CS.setItem('my-favorites', JSON.stringify(favs));
  } catch {
    // @ts-ignore
    const ok = await window.Telegram.WebApp.requestWriteAccess();
    if (ok) {
      await CS.setItem('my-favorites', JSON.stringify(favs));
    } else {
      localStorage.setItem('my-favorites', JSON.stringify(favs));
      console.warn(
        'Избранное сохранено только локально (пользователь отказал в CloudStorage).'
      );
    }
  }
}

/* ---------- Zustand‑store ---------- */

export const useFavoritesStore = create<Store>((set, get) => ({
  favorites: [],

  toggleFavorite: async (id) => {
    const curr = get().favorites;
    const updated = curr.includes(id)
      ? curr.filter((i) => i !== id)
      : [...curr, id];

    set({ favorites: updated });

    if (cloudAvailable()) {
      await saveToCloud(updated);
    } else {
      localStorage.setItem('my-favorites', JSON.stringify(updated));
    }

    window.dispatchEvent(new Event('favorites-updated'));
  },

  isFavorite: (id) => get().favorites.includes(id),
}));