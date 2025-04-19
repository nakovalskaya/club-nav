'use client';

import { useFavorites } from '../hooks/useFavorites';
import { useState } from 'react';

type Props = { id: string };

export default function FavoriteButton({ id }: Props) {
  const { isFavorite, toggleFavorite, isReady } = useFavorites();
  const [clicked, setClicked] = useState(false);

  if (!isReady) return null;

  const fav = isFavorite(id);

  const handleClick = () => {
    toggleFavorite(id);
    setClicked(true);
    setTimeout(() => setClicked(false), 600);
  };

  return (
    <div className="absolute top-2 right-2 z-10">
      {/* Градиентный фон-кружочек */}
      <div className="absolute inset-0 w-8 h-8 bg-gradient-to-br from-black/80 to-black/40 rounded-full blur-sm z-[-1]" />

      <button
        onClick={handleClick}
        className="w-8 h-8 flex items-center justify-center transition-transform duration-300 bg-transparent p-1 rounded-full"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill={fav ? '#EFC988' : 'none'}
          stroke={fav ? '#EFC988' : '#D2BCA7'}
          className={`w-6 h-6 transition-all duration-500 ease-in-out ${
            fav ? 'rotate-[360deg] scale-110' : 'scale-100'
          } ${fav && clicked ? 'glow' : ''}`}
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
        .glow {
          filter: drop-shadow(0 0 6px #EFC988);
        }
      `}</style>
    </div>
  );
}
