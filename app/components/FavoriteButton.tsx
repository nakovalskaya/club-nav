'use client';

import { useFavorites } from '../hooks/useFavorites';

type Props = { id: string };

export default function FavoriteButton({ id }: Props) {
  const { isFavorite, toggleFavorite, isReady } = useFavorites();

  if (!isReady) return null;

  const fav = isFavorite(id);

  return (
    <button
      onClick={() => toggleFavorite(id)}
      className="absolute top-2 right-2 transition-transform duration-300 p-1 rounded-full z-10"
    >
      <div
        className={`w-6 h-6 relative transition-all duration-500 ease-in-out ${
          fav ? 'scale-110 rotate-[360deg]' : 'scale-100'
        }`}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          className={`w-full h-full stroke-[#EBDEC8] ${
            fav ? 'fill-gold-shine' : ''
          }`}
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="1.5"
            d="M11.48 3.499c.2-.58.84-.58 1.04 0l2.05 5.937h6.144c.59 0 .83.76.36 1.1l-4.97 3.61 2.05 5.94c.2.58-.48 1.06-.97.71l-4.97-3.61-4.97 3.61c-.5.35-1.17-.13-.97-.71l2.05-5.94-4.97-3.61c-.47-.34-.23-1.1.36-1.1h6.14l2.05-5.94z"
          />
        </svg>
      </div>

      <style jsx>{`
        .fill-gold-shine {
          fill: url(#goldGradient);
        }

        svg {
          display: block;
        }
      `}</style>

      {/* SVG defs — золотой градиент */}
      <svg width="0" height="0">
        <defs>
          <linearGradient id="goldGradient" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#fff3b0">
              <animate attributeName="offset" values="0;1" dur="2s" repeatCount="indefinite" />
            </stop>
            <stop offset="100%" stopColor="#facc15">
              <animate attributeName="offset" values="1;0" dur="2s" repeatCount="indefinite" />
            </stop>
          </linearGradient>
        </defs>
      </svg>
    </button>
  );
}
