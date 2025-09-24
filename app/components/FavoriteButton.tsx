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
    (e: React.MouseEvent | React.TouchEvent) => {
      e.preventDefault();
      e.stopPropagation();

      setClickAnimating(true);
      setTimeout(() => setClickAnimating(false), 300);

      toggleFavorite(id);
      if (typeof window !== 'undefined') {
        window.dispatchEvent(new Event('favorites-updated'));
      }

      // Лёгкий хаптик, если поддерживается
      if ((window as any).Telegram?.WebApp?.HapticFeedback) {
        (window as any).Telegram.WebApp.HapticFeedback.impactOccurred('light');
      }
    },
    [id, toggleFavorite]
  );

  return (
    <button
      type="button"
      onClick={handleClick}
      onTouchStart={handleClick}
      className={`favorite-button ${clickAnimating ? 'click-animating' : ''}`}
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

      <style jsx>{`
        .favorite-button {
          position: absolute;
          top: 6px;
          right: 6px;
          z-index: 10;
          width: 32px;
          height: 32px;
          display: flex;
          align-items: center;
          justify-content: center;
          background: transparent;
          border: none;
          padding: 0;
          border-radius: 50%;
          -webkit-tap-highlight-color: transparent;
          transform: translateZ(0); /* фикс прыжков в WebView */
        }

        .star-icon {
          transition: transform 200ms ease, fill 200ms ease, stroke 200ms ease,
            filter 200ms ease;
          transform-origin: center center;
          will-change: transform, filter;
        }

        .click-animating .star-icon {
          transform: scale(1.15);
          filter: drop-shadow(0 0 6px rgba(255, 216, 148, 0.5));
        }
      `}</style>
    </button>
  );
}
