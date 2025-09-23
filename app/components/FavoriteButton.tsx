'use client';
import { useFavoritesStore } from '../store/useFavoritesStore';
import { useState, useCallback } from 'react';

type Props = { id: string };

export default function FavoriteButton({ id }: Props) {
  const favorites = useFavoritesStore((s) => s.favorites);
  const toggleFavorite = useFavoritesStore((s) => s.toggleFavorite);
  const [animating, setAnimating] = useState<null | 'in' | 'out'>(null);
  const [clickAnimating, setClickAnimating] = useState(false);

  const fav = favorites.includes(id);

  const handleClick = useCallback((e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();

    // Запускаем анимацию клика на фиксированное время (мягкий зум)
    setClickAnimating(true);
    setTimeout(() => setClickAnimating(false), 600); // 600ms как в мягком зуме

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
      {/* улучшенная тёмная подложка */}
      <div 
        className="absolute inset-0 w-8 h-8 rounded-full blur-[2px] z-[-1]"
        style={{
          background: 'radial-gradient(circle, rgba(0,0,0,0.6) 0%, rgba(0,0,0,0.3) 70%, rgba(0,0,0,0.1) 100%)'
        }}
      />

      <button
        type="button"
        onClick={handleClick}
        className={`w-8 h-8 flex items-center justify-center bg-transparent p-1 rounded-full
                   transition-opacity duration-150 ease-out hover:opacity-90 bookmark-button
                   ${clickAnimating ? 'click-animating' : ''}`}
        aria-pressed={displayFav}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill={displayFav ? '#FFD894' : 'none'}
          stroke={displayFav ? '#FFD894' : '#EBDEC8'}
          className="w-6 h-6 bookmark-icon"
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
          transition: all 300ms ease-in-out;
          transform: scale(1);
        }

        /* Фиксированная анимация клика - мягкий зум */
        .bookmark-button {
          transform: scale(1);
        }
        
        .click-animating .bookmark-icon {
          animation: bookmark-click-zoom 600ms cubic-bezier(0.25, 0.46, 0.45, 0.94) forwards;
        }

        @keyframes bookmark-click-zoom {
          0% { 
            transform: scale(1); 
          }
          40% { 
            transform: scale(1.15); 
          }
          100% { 
            transform: scale(1); 
          }
        }

        /* Состояния для fill и stroke в зависимости от displayFav */
        .bookmark-button[aria-pressed="true"] .bookmark-icon {
          fill: #FFD894;
          stroke: #FFD894;
        }
        
        .bookmark-button[aria-pressed="false"] .bookmark-icon {
          fill: none;
          stroke: #EBDEC8;
        }
      `}</style>
    </div>
  );
}