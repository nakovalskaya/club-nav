'use client';

import { create } from 'zustand';

type Store = {
  favorites: string[];
  toggleFavorite: (id: string) => void;
  isFavorite: (id: string) => boolean;
};

/* ---------- helpers ---------- */

// user.id из Telegram; в browser‑preview вернётся null
function getUserId(): string | null {
  // @ts-ignore
  return window.Telegram?.WebApp?.initDataUnsafe?.user?.id ?? null;
}

// POST /api/favorites
async function apiSave(list: string[]) {
  const uid = getUserId();
  if (!uid) {
    localStorage.setItem('my-favorites', JSON.stringify(list));
    return;
  }
  await fetch('/api/favorites', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ user_id: uid, list }),
  });
}

// GET /api/favorites
async function apiLoad(): Promise<string[]> {
  const uid = getUserId();
  if (!uid) {
    const raw = localStorage.getItem('my-favorites');
    return raw ? JSON.parse(raw) : [];
  }
  const r = await fetch('/api/favorites?user_id=' + uid);
  if (!r.ok) return [];
  return await r.json();
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
    await apiSave(updated);
    window.dispatchEvent(new Event('favorites-updated'));
  },

  isFavorite: (id) => get().favorites.includes(id),
}));

/* ---------- экспорт для LayoutInit ---------- */
export async function loadFavoritesFromApi() {
  const list = await apiLoad();
  return { favorites: list };
}
