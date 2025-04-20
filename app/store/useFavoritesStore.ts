'use client';

import { create } from 'zustand';

type Store = {
  favorites: string[];
  toggleFavorite: (id: string) => void;
  isFavorite: (id: string) => boolean;
};

/* ---------- helpers ---------- */

// Получаем Telegram user_id
function getUserId(): string | null {
  // fallback для dev-режима (например, в StackBlitz)
  if (process.env.NODE_ENV === 'development') {
    return '535118137'; // хардкод на время отладки
  }

  return null;
}
// Сохраняем избранное: либо в Redis, либо в localStorage
async function apiSave(list: string[]) {
  const uid = getUserId();

  console.log('💾 [apiSave] uid =', uid, '→', list);

  if (!uid) {
    localStorage.setItem('my-favorites', JSON.stringify(list));
    return;
  }

  await fetch('/api/favorites', {
    method : 'POST',
    headers: { 'Content-Type': 'application/json' },
    body   : JSON.stringify({ user_id: uid, list })
  });
}

// Загружаем избранное: либо с Redis, либо с localStorage
async function apiLoad(): Promise<string[]> {
  const uid = getUserId();
  console.log('🔍 [apiLoad] uid =', uid);

  if (!uid) {
    const raw = localStorage.getItem('my-favorites');
    return raw ? JSON.parse(raw) : [];
  }

  const r = await fetch('/api/favorites?user_id=' + uid);
  if (!r.ok) return [];

  const json = await r.json();
  console.log('📦 [apiLoad] result =', json);

  return json;
}

/* ---------- Zustand‑store ---------- */

export const useFavoritesStore = create<Store>((set, get) => ({
  favorites: [],

  toggleFavorite: async (id) => {
    const curr    = get().favorites;
    const updated = curr.includes(id)
      ? curr.filter(i => i !== id)
      : [...curr, id];

    set({ favorites: updated });
    await apiSave(updated);
    window.dispatchEvent(new Event('favorites-updated'));
  },

  isFavorite: (id) => get().favorites.includes(id),
}));

/* ---------- для LayoutInit ---------- */

export async function loadFavoritesFromApi() {
  const list = await apiLoad();
  return { favorites: list };
}
