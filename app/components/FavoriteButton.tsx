'use client';

import { useFavoritesStore } from '../store/useFavoritesStore';
import { useState, useCallback } from 'react';

type Props = { id: string };

export default function FavoriteButton({ id }: Props) {
  const favorites = useFavoritesStore((s) => s.favorites);
  const toggleFavorite = useFavoritesStore((s) => s.toggleFavorite);

  const [animating, setAnimating] = useState<null | 'in' | 'out'>(null);

  const fav = favorites.includes(id);

  const handleClick = useCallback((e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();

    const DURATION = 600;

    if (fav) {
      // начинаем анимацию снятия
      setAnimating('out');
      setTimeout(() => {
        toggleFavorite(id);
        setAnimating(null);
        // убрано: window.dispatchEvent — событие уже шлёт стор
      }, DURATION);
    } else {
      // начинаем анимацию добавления
      toggleFavorite(id);
      // убрано: window.dispatchEvent — событие уже шлёт стор
      setAnimating('in');
      setTimeout(() => setAnimating(null), DURATION);
    }
  }, [fav, id, toggleFavorite]);

  // Показываем звезду, если она в избранном или анимируется снятие
  const displayFav = fav || animating === 'out';

  return (
    <div className="absolute top-2 right-2 z-10">
      <div className="absolute inset-0 w-8 h-8 bg-gradient-to-br from-black/80 to-black/40 rounded-full blur-sm z-[-1]" />

      <button
        type="button"
        onClick={handleClick}
        className="w-8 h-8 flex items-center justify-center bg-transparent p-1 rounded-full"
        aria-pressed={displayFav}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill={displayFav ? '#EFC988' : 'none'}
          stroke={displayFav ? '#EFC988' : '#D2BCA7'}
          className={`w-6 h-6 transition-all duration-500 ease-in-out
            ${animating === 'in' ? 'rotate-[360deg] scale-110 glow opacity-100' : ''}
            ${animating === 'out' ? '-rotate-[360deg] scale-90 opacity-0' : ''}
            ${!animating && fav ? 'opacity-100' : ''}
          `}
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="1.2"
            d="M11.48 3.499c.2-.58.84-.58 1.04 0l2.05 5.937h6.144c.59 0 .83.76.36 1.1l-4.97 3.61 2.05 5.94c.2.58-.48 1.06-.97.71l-4.97-3.61-4.97 3.61c-.5.35-1.17-.13-.97-.71l2.05-5.94-4.97-3.61c-.47-.34-.23-1.1.36-1.1h6.14л2.05-5.94z"
          />
        </svg>
      </button>

      <style jsx>{`
        .glow {
          filter: drop-shadow(0 0 6px #EFC988);
        }
      `}</style>
    </div>
  );
}
