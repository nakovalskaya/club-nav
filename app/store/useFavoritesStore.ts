'use client';

import { create } from 'zustand';

type Store = {
  favorites: string[];
  toggleFavorite: (id: string) => void;
  isFavorite: (id: string) => boolean;
};

/* ---------- helpers ---------- */

function getUserId(): string | null {
  if (typeof window === 'undefined' || !window.Telegram?.WebApp) {
    console.warn('❌ Telegram WebApp не инициализирован');
    return null;
  }

  const user = window.Telegram.WebApp.initDataUnsafe?.user;
  if (!user?.id) {
    console.warn('❌ Нет user.id из Telegram');
    return null;
  }

  const id = String(user.id);
  console.log('✅ Telegram user_id =', id);
  return id;
}

// ---------- Сохраняем избранное ----------
async function apiSave(list: string[]) {
  const uid = getUserId();
  console.log('💾 [apiSave] uid =', uid, '→', list);

  if (!uid) {
    localStorage.setItem('my-favorites', JSON.stringify(list));
    return;
  }

  try {
    const response = await fetch('/api/favorites', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ user_id: uid, list }),
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error('❌ [apiSave] Redis Error:', response.status, errorText);
    }
  } catch (err) {
    console.error('🔥 [apiSave] Network Error:', err);
  }
}

// ---------- Загружаем избранное ----------
async function apiLoad(): Promise<string[]> {
  const uid = getUserId();
  console.log('🔍 [apiLoad] uid =', uid);

  if (!uid) {
    const raw = localStorage.getItem('my-favorites');
    return raw ? JSON.parse(raw) : [];
  }

  try {
    const r = await fetch('/api/favorites?user_id=' + uid);
    if (!r.ok) {
      const error = await r.text();
      console.error('❌ [apiLoad] API Error:', r.status, error);
      return [];
    }

    const json = await r.json();
    console.log('📦 [apiLoad] result =', json);

    if (Array.isArray(json)) return json;
    if (Array.isArray(json.value)) return json.value;
    if (typeof json === 'object' && Array.isArray(json.result)) return json.result;

    return [];
  } catch (err) {
    console.error('🔥 [apiLoad] Network Error:', err);
    return [];
  }
}

/* ---------- Zustand‑store ---------- */

export const useFavoritesStore = create<Store>((set, get) => ({
  favorites: [],

  toggleFavorite: async (id) => {
    const current = get().favorites || [];
    const updated = current.includes(id)
      ? current.filter((item) => item !== id)
      : [...current, id];

    set({ favorites: updated });
    await apiSave(updated);
    window.dispatchEvent(new Event('favorites-updated'));
  },

  isFavorite: (id) => get().favorites.includes(id),
}));

/* ---------- LayoutInit ---------- */

export async function loadFavoritesFromApi() {
  const list = await apiLoad();
  return { favorites: list };
}
