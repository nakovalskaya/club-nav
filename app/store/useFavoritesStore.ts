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
    console.warn('⚠️ user_id не найден → сохраняем в localStorage');
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
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    console.log('✅ [apiSave] Успешно сохранено в Redis:', data);
  } catch (error) {
    console.error('🔥 [apiSave] Ошибка при сохранении:', error);
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

    // Защита от разных форматов ответа
    if (Array.isArray(json)) return json;
    if (Array.isArray(json.value)) return json.value;
    if (typeof json === 'object' && Array.isArray(json.result)) return json.result;
    if (typeof json === 'object' && typeof json.value === 'string') {
      try {
        const parsed = JSON.parse(json.value);
        if (Array.isArray(parsed)) return parsed;
      } catch (e) {
        console.error('📛 [apiLoad] Ошибка парсинга json.value');
      }
    }

    return [];
  } catch (err) {
    console.error('🔥 [apiLoad] Сетевая ошибка:', err);
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
