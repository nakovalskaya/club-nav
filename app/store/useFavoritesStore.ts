'use client';
import { create } from 'zustand';

type Store = {
  favorites: string[];
  toggleFavorite: (id: string) => void;
  isFavorite: (id: string) => boolean;
  hydrate: () => Promise<void>;
};

const LS_KEY = 'favorites';
const TG = (typeof window !== 'undefined' ? (window as any).Telegram?.WebApp : undefined);
const CS = TG?.CloudStorage;

// ——— helpers ———
const hasCloud = () => Boolean(CS && typeof CS.getItem === 'function');

function csGetItem(key: string): Promise<string | null> {
  return new Promise((resolve) => {
    if (!hasCloud()) return resolve(null);
    CS.getItem(key, (err: any, value: string | null) => resolve(err ? null : value));
  });
}

function csSetItem(key: string, value: string): Promise<boolean> {
  return new Promise((resolve) => {
    if (!hasCloud()) return resolve(false);
    // на всякий — запрашиваем право записи (некоторым ботам нужно)
    TG?.requestWriteAccess?.();
    CS.setItem(key, value, (err: any) => resolve(!err));
  });
}

const readLocal = (): string[] => {
  try {
    const raw = localStorage.getItem(LS_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch { return []; }
};

const writeLocal = (list: string[]) => {
  try { localStorage.setItem(LS_KEY, JSON.stringify(list)); } catch {}
};

// один ключ «favorites» со списком id — проще и надёжнее
const CLOUD_KEY = 'favorites';

// ——— Zustand store ———
export const useFavoritesStore = create<Store>((set, get) => ({
  favorites: [],

  isFavorite: (id) => get().favorites.includes(id),

  toggleFavorite: (id) => {
    const setNow = new Set(get().favorites);
    setNow.has(id) ? setNow.delete(id) : setNow.add(id);
    const updated = Array.from(setNow);

    // 1) мгновенно обновляем UI
    set({ favorites: updated });

    // 2) локальный бэкап всегда
    if (typeof window !== 'undefined') writeLocal(updated);

    // 3) пихаем в Telegram CloudStorage (если доступен)
    (async () => {
      const ok = await csSetItem(CLOUD_KEY, JSON.stringify(updated));
      // если облако недоступно — ничего страшного, останемся на localStorage
      if (!ok) return;
      // синхро-событие для страниц/листингов
      if (typeof window !== 'undefined') window.dispatchEvent(new Event('favorites-updated'));
    })();
  },

  // начальная загрузка
  hydrate: async () => {
    let list = readLocal();
    // если есть CloudStorage — он приоритетнее
    const cloudRaw = await csGetItem(CLOUD_KEY);
    if (cloudRaw) {
      try { list = JSON.parse(cloudRaw); } catch {}
    }
    set({ favorites: Array.isArray(list) ? list : [] });
    if (typeof window !== 'undefined') window.dispatchEvent(new Event('favorites-updated'));
  },
}));

// Авто-инициализация при первом импорте (без await — не блокируем UI)
(async () => {
  try {
    await useFavoritesStore.getState().hydrate();
  } catch {}
})();
// --- Back-compat для старого кода ---
// Раньше вызывали loadFavoritesFromApi() и ждали { favorites }.
// Оставим тот же интерфейс поверх новой hydrate().
export async function loadFavoritesFromApi() {
  await useFavoritesStore.getState().hydrate();
  return { favorites: useFavoritesStore.getState().favorites };
}
