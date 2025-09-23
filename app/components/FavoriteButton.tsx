'use client';
import { useFavoritesStore } from '../store/useFavoritesStore';
import { useState, useCallback } from 'react';

type Props = { id: string };

export default function FavoriteButton({ id }: Props) {
  const favorites = useFavoritesStore((s) => s.favorites);
  const toggleFavorite = useFavoritesStore((s) => s.toggleFavorite);
  const [clickAnimating, setClickAnimating] = useState(false);

  const fav = favorites.includes(id);

  const handleClick = useCallback(
    (e: React.MouseEvent) => {
      e.preventDefault();
      e.stopPropagation();

      setClickAnimating(true);
      setTimeout(() => setClickAnimating(false), 600);

      toggleFavorite(id);
      if (typeof window !== 'undefined') {
        window.dispatchEvent(new Event('favorites-updated'));
      }
    },
    [id, toggleFavorite]
  );

  return (
    <div className="absolute top-1.5 right-1.5 z-10">
      {/* Подложка */}
      <div
        className="absolute inset-0 w-8 h-8 rounded-full blur-[2px] z-[-1]"
        style={{
          background:
            'radial-gradient(circle, rgba(0,0,0,0.6) 0%, rgba(0,0,0,0.3) 70%, rgba(0,0,0,0.1) 100%)',
        }}
      />

      <button
        type="button"
        onClick={handleClick}
        className={`w-8 h-8 flex items-center justify-center bg-transparent rounded-full
                   transition-opacity duration-150 ease-out hover:opacity-90 bookmark-button
                   ${clickAnimating ? 'click-animating' : ''}`}
        aria-pressed={fav}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          width="24"
          height="24"
          className="bookmark-icon"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M6 2H18C18.5523 2 19 2.44772 19 3V22L12 19L5 22V3C5 2.44772 5.44772 2 6 2Z"
            fill={fav ? '#FFD894' : 'none'}
            stroke={fav ? '#FFD894' : '#EBDEC8'}
          />
        </svg>
      </button>

      <style jsx>{`
        .bookmark-icon {
          transition: all 300ms ease-in-out;
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
      `}</style>
    </div>
  );
}
