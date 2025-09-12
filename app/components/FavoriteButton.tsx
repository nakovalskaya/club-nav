'use client';

import { useFavoritesStore } from '../store/useFavoritesStore';
import { useState, useCallback } from 'react';

type Props = { id: string };

export default function FavoriteButton({ id }: Props) {
  const favorites = useFavoritesStore((s) => s.favorites);
  const toggleFavorite = useFavoritesStore((s) => s.toggleFavorite);

  // Было у тебя — оставляю
  const [clicked, setClicked] = useState(false);

  // Новое: флаг "анимация снятия избранного идёт"
  const [animOut, setAnimOut] = useState(false);

  const fav = favorites.includes(id);

  // Пока крутится снятие — отображаем заполнённую звезду,
  // чтобы она не исчезала до конца анимации.
  const displayFav = fav || animOut;

  const handleClick = useCallback((e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();

    // Снятие из избранного: крутим, ПАРКУЕМ удаление до конца анимации
    if (fav) {
      setClicked(true);
      setAnimOut(true);

      // Дай анимации отыграть, затем реально уберём из избранного
      const DURATION = 600; // у тебя так и было
      setTimeout(() => {
        toggleFavorite(id);
        setAnimOut(false);
        setClicked(false);
        if (typeof window !== 'undefined') {
          window.dispatchEvent(new Event('favorites-updated'));
        }
      }, DURATION);

      return;
    }

    // Добавление в избранное: сразу ставим, анимация как раньше
    toggleFavorite(id);
    if (typeof window !== 'undefined') {
      window.dispatchEvent(new Event('favorites-updated'));
    }
    setClicked(true);
    setTimeout(() => setClicked(false), 600);
  }, [fav, id, toggleFavorite]);

  return (
    <div className="absolute top-2 right-2 z-10">
      {/* твой тёмный градиентный кружок под звёздой */}
      <div className="absolute inset-0 w-8 h-8 bg-gradient-to-br from-black/80 to-black/40 rounded-full blur-sm z-[-1]" />

      <button
        type="button"
        onClick={handleClick}
        className="w-8 h-8 flex items-center justify-center transition-transform duration-300 bg-transparent p-1 rounded-full"
        aria-pressed={displayFav}
        aria-label={displayFav ? 'Удалить из избранного' : 'Добавить в избранное'}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill={displayFav ? '#EFC988' : 'none'}
          stroke={displayFav ? '#EFC988' : '#D2BCA7'}
          className={`w-6 h-6 transition-all duration-500 ease-in-out
            ${displayFav ? 'rotate-[360deg] scale-110' : 'scale-100'}
            ${displayFav && clicked ? 'glow' : ''}`}
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="1.2"
            d="M11.48 3.499c.2-.58.84-.58 1.04 0l2.05 5.937h6.144c.59 0 .83.76.36 1.1l-4.97 3.61 2.05 5.94c.2.58-.48 1.06-.97.71l-4.97-3.61-4.97 3.61c-.5.35-1.17-.13-.97-.71l2.05-5.94-4.97-3.61c-.47-.34-.23-1.1.36-1.1h6.14l2.05-5.94z"
          />
        </svg>
      </button>

      <style jsx>{`
        .glow { filter: drop-shadow(0 0 6px #EFC988); }
      `}</style>
    </div>
  );
}
