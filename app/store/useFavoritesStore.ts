'use client';
import { create } from 'zustand';

type Store = {
  favorites: string[];
  toggleFavorite: (id: string) => void;
  isFavorite: (id: string) => boolean;
};

const LS_KEY = 'favorites';

// вытаскиваем user_id из Telegram
function getUserId(): string | null {
  if (typeof window === 'undefined') return null;
  // @ts-ignore
  const user = window?.Telegram?.WebApp?.initDataUnsafe?.user;
  return user?.id ? String(user.id) : null;
}

// загрузка избранного
async function apiLoad(): Promise<string[]> {
  try {
    const uid = getUserId();
    if (!uid) {
      const raw = localStorage.getItem(LS_KEY);
      return raw ? JSON.parse(raw) : [];
    }

    const res = await fetch(`/api/favorites?user_id=${uid}`, { cache: 'no-store' });
    if (!res.ok) throw new Error('API GET failed');
    const data = await res.json();
    return Array.isArray(data?.favorites) ? data.favorites : [];
  } catch {
    const raw = localStorage.getItem(LS_KEY);
    return raw ? JSON.parse(raw) : [];
  }
}

// сохранение избранного
async function apiSave(list: string[]) {
  try {
    // сохраняем локально всегда
    localStorage.setItem(LS_KEY, JSON.stringify(list));

    const uid = getUserId();
    if (!uid) return; // если нет user_id, ничего на сервер не шлём

    await fetch('/api/favorites', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ user_id: uid, list }),
    });
  } catch {
    // если сервер упал — локальное сохранение остаётся
  }
}

export const useFavoritesStore = create<Store>((set, get) => ({
  favorites: [],
  toggleFavorite: (id) => {
    const setNow = new Set(get().favorites);
    setNow.has(id) ? setNow.delete(id) : setNow.add(id);

    const updated = Array.from(setNow);

    // обновляем Zustand сразу (звезда загорается мгновенно)
    set({ favorites: updated });

    // шлём событие для синхронизации страниц
    if (typeof window !== 'undefined') {
      window.dispatchEvent(new Event('favorites-updated'));
    }

    // сохраняем локально + пытаемся отправить на сервер
    void apiSave(updated);
  },
  isFavorite: (id) => get().favorites.includes(id),
}));

// начальная загрузка (при открытии приложения)
export async function loadFavoritesFromApi() {
  const list = await apiLoad();
  return { favorites: list };
}