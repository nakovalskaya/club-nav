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
      // плавное снятие
      setAnimating('out');
      setTimeout(() => {
        toggleFavorite(id);
        setAnimating(null);
        if (typeof window !== 'undefined') {
          window.dispatchEvent(new Event('favorites-updated'));
        }
      }, DURATION);
    } else {
      // плавное появление
      toggleFavorite(id);
      if (typeof window !== 'undefined') {
        window.dispatchEvent(new Event('favorites-updated'));
      }
      setAnimating('in');
      setTimeout(() => setAnimating(null), DURATION);
    }
  }, [fav, id, toggleFavorite]);

  const displayFav = fav || animating === 'out';

  return (
    <div className="absolute top-1.5 right-1.5 z-10">
      {/* мягкая тёмная подложка */}
      <div className="absolute inset-0 w-8 h-8 bg-gradient-to-br from-black/60 to-black/30 rounded-full blur-sm z-[-1]" />

      <button
        type="button"
        onClick={handleClick}
        className="w-8 h-8 flex items-center justify-center bg-transparent p-1 rounded-full
                   transition-transform duration-150 ease-out active:scale-125 bookmark-button"
        aria-pressed={displayFav}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill={displayFav ? '#FFD894' : 'none'}
          stroke={displayFav ? '#FFD894' : '#EBDEC8'}
          className={`w-6 h-6 bookmark-icon ${displayFav ? 'active' : ''} ${animating === 'in' ? 'animating-in' : ''} ${animating === 'out' ? 'animating-out' : ''}`}
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M6 2H18C18.5523 2 19 2.44772 19 3V22L12 19L5 22V3C5 2.44772 5.44772 2 6 2Z"
          />
        </svg>
      </button>

      <style jsx>{`
        /* Базовые стили для закладки */
        .bookmark-icon {
          transition: all 0.6s cubic-bezier(0.25, 0.46, 0.45, 0.94);
          transform: scale(1);
        }

        /* Мягкий зум эффект при активации */
        .bookmark-button:active .bookmark-icon {
          animation: bookmark-zoom-soft 0.6s cubic-bezier(0.25, 0.46, 0.45, 0.94) forwards;
        }

        /* Анимация при добавлении в избранное */
        .animating-in {
          animation: bookmark-zoom-soft 0.6s cubic-bezier(0.25, 0.46, 0.45, 0.94) forwards;
        }

        /* Анимация при удалении из избранного */
        .animating-out {
          animation: bookmark-shrink-soft 0.4s cubic-bezier(0.25, 0.46, 0.45, 0.94) forwards;
        }

        @keyframes bookmark-zoom-soft {
          0% { 
            transform: scale(1); 
            fill: none; 
            stroke: #EBDEC8; 
          }
          40% { 
            transform: scale(1.15); 
            fill: #FFD894; 
            stroke: #FFD894; 
          }
          100% { 
            transform: scale(1); 
            fill: #FFD894; 
            stroke: #FFD894; 
          }
        }

        @keyframes bookmark-shrink-soft {
          0% { 
            transform: scale(1); 
            fill: #FFD894; 
            stroke: #FFD894; 
          }
          40% { 
            transform: scale(0.9); 
            fill: none; 
            stroke: #EBDEC8; 
          }
          100% { 
            transform: scale(1); 
            fill: none; 
            stroke: #EBDEC8; 
          }
        }

        /* Активное состояние без анимации */
        .active:not(.animating-in):not(.animating-out) {
          fill: #FFD894;
          stroke: #FFD894;
        }
      `}</style>
    </div>
  );
}