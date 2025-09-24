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
      setTimeout(() => setClickAnimating(false), 300);

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
                   transition-opacity duration-150 ease-out
                   ${clickAnimating ? 'click-animating' : ''}`}
        aria-pressed={fav}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          width="20"
          height="20"
          className="star-icon"
        >
          <path
            d="M12 2l2.95 6 6.55.5-5 4.3 1.55 6.2-6-3.7-6 3.7 1.55-6.2-5-4.3 6.55-.5L12 2z"
            fill={fav ? '#FFD894' : 'none'}
            stroke={fav ? '#FFD894' : '#EBDEC8'}
            strokeWidth={2}
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </button>

      <style jsx>{`
        .star-icon {
          transition: transform 200ms ease, fill 200ms ease, stroke 200ms ease,
            filter 200ms ease;
        }
        .click-animating .star-icon {
          transform: scale(1.15);
          filter: drop-shadow(0 0 6px rgba(255, 216, 148, 0.5));
        }
      `}</style>
    </div>
  );
}
