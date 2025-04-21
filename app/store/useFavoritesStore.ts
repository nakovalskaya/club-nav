'use client';

import { create } from 'zustand';

type Store = {
  favorites: string[];
  toggleFavorite: (id: string) => void;
  isFavorite: (id: string) => boolean;
};

/* ---------- helpers ---------- */

// Получаем user_id из Telegram WebApp
function getUserId(): string | null {

  // @ts-ignore
   if (!window.Telegram?.WebApp?.initialized) {
     console.warn('⚠️ Telegram WebApp is not initialized yet.');
     return null;
   }
 
  // @ts-ignore
   const id = window.Telegram?.WebApp?.initDataUnsafe?.user?.id;
   console.log('🧠 [getUserId] Telegram user_id =', id);
   return id != null ? String(id) : null;
 }

// ---------- Сохраняем избранное ----------
async function apiSave(list: string[]) {
  const uid = getUserId();
  console.log('💾 [apiSave] uid =', uid, '→', list);

  if (!uid) {
    console.warn('⚠️ user_id не найден → сохраняем в localStorage');
    localStorage.setItem('my-favorites', JSON.stringify(list));
    return;
  }

  try {
    const response = await fetch('/api/favorites', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body  : JSON.stringify({ user_id: uid, list }),
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error('❌ [apiSave] Ошибка при сохранении в Redis:', response.status, errorText);
    } else {
      console.log('✅ [apiSave] Успешно сохранено в Redis');
    }
  } catch (err) {
    console.error('🔥 [apiSave] Ошибка запроса:', err);
  }
}

// ---------- Загружаем избранное ----------
async function apiLoad(): Promise<string[]> {
  const uid = getUserId();
  console.log('🔍 [apiLoad] uid =', uid);

  if (!uid) {
    console.warn('⚠️ user_id не найден → читаем из localStorage');
    const raw = localStorage.getItem('my-favorites');
    return raw ? JSON.parse(raw) : [];
  }

  try {
    const r = await fetch('/api/favorites?user_id=' + uid);
    if (!r.ok) {
      const error = await r.text();
      console.error('❌ [apiLoad] Ошибка от API:', r.status, error);
      return [];
    }

    const json = await r.json();
    console.log('📦 [apiLoad] result =', json);
    return json;
  } catch (err) {
    console.error('🔥 [apiLoad] Сетевая ошибка:', err);
    return [];
  }
}

/* ---------- Zustand‑store ---------- */

export const useFavoritesStore = create<Store>((set, get) => ({
  favorites: [],

  toggleFavorite: async (id) => {
    const curr = get().favorites;
    const updated = curr.includes(id)
      ? curr.filter(i => i !== id)
      : [...curr, id];

    set({ favorites: updated });
    await apiSave(updated);
    window.dispatchEvent(new Event('favorites-updated'));
  },

  isFavorite: (id) => get().favorites.includes(id),
}));

/* ---------- Для LayoutInit ---------- */

export async function loadFavoritesFromApi() {
  const list = await apiLoad();
  return { favorites: list };
}
