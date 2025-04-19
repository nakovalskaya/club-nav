'use client';

import { create } from 'zustand';

type Store = {
  favorites: string[];
  toggleFavorite: (id: string) => void;
  isFavorite: (id: string) => boolean;
};

export const useFavoritesStore = create<Store>((set, get) => ({
  favorites: [],
  toggleFavorite: (id: string) => {
    const favorites = get().favorites;
    const updated = favorites.includes(id)
      ? favorites.filter((i) => i !== id)
      : [...favorites, id];

    set({ favorites: updated });
    localStorage.setItem('my-favorites', JSON.stringify(updated));
  },
  isFavorite: (id: string) => get().favorites.includes(id),
}));
