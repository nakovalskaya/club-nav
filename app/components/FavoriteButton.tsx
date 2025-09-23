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
      // плавное снятие свечения
      setAnimating('out');
      setTimeout(() => {
        toggleFavorite(id);
        setAnimating(null);
        if (typeof window !== 'undefined') {
          window.dispatchEvent(new Event('favorites-updated'));
        }
      }, DURATION);
    } else {
      // плавное появление свечения
      toggleFavorite(id);
      if (typeof window !== 'undefined') {
        window.dispatchEvent(new Event('favorites-updated'));
      }
      setAnimating('in');
      setTimeout(() => setAnimating(null), DURATION);
    }
  }, [fav, id, toggleFavorite]);

  // Свечение видно, пока избранное активно, а также во время плавного снятия
  const displayFav = fav || animating === 'out';

  return (
    <div className="absolute top-1.5 right-1.5 z-10">
      {/* нижняя тёмная подложка — оставил */}
      <div className="absolute inset-0 w-8 h-8 bg-gradient-to-br from-black/80 to-black/40 rounded-full blur-sm z-[-1]" />

      <button
        type="button"
        onClick={handleClick}
        className="w-8 h-8 flex items-center justify-center bg-transparent p-1 rounded-full
                   transition-transform duration-150 ease-out active:scale-125"
        aria-pressed={displayFav}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          // важно: БЕЗ заливки — только контур
          fill="none"
          stroke={displayFav ? '#FFD894' : '#D2BCA7'}
          className={`w-6 h-6 transition-[filter,stroke,opacity] duration-300 ease-in-out
            ${displayFav ? 'glow-on' : 'glow-off'}`}
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={displayFav ? 1.8 : 1.2}
            d="M11.48 3.499c.2-.58.84-.58 1.04 0l2.05 5.937h6.144c.59 0 .83.76.36 1.1l-4.97 3.61 2.05 5.94c.2.58-.48 1.06-.97.71l-4.97-3.61-4.97 3.61c-.5.35-1.17-.13-.97-.71l2.05-5.94-4.97-3.61c-.47-.34-.23-1.1.36-1.1h6.14l2.05-5.94z"
          />
        </svg>
      </button>

      <style jsx>{`
        /* Плавное свечение — с цветом #FFD894 */
        .glow-on {
          filter:
            drop-shadow(0 0 10px rgba(255, 216, 148, 0.75))
            drop-shadow(0 0 2px rgba(255, 216, 148, 0.95));
          opacity: 1;
        }
        .glow-off {
          filter: drop-shadow(0 0 0 rgba(0,0,0,0));
          opacity: 1;
        }
      `}</style>
    </div>
  );
}
