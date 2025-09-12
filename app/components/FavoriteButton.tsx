'use client';

import { useFavoritesStore } from '../store/useFavoritesStore';
import { useState, useCallback } from 'react';

type Props = { id: string };

export default function FavoriteButton({ id }: Props) {
  const favorites = useFavoritesStore((s) => s.favorites);
  const toggleFavorite = useFavoritesStore((s) => s.toggleFavorite);
  const [clicked, setClicked] = useState(false);

  const fav = favorites.includes(id);

  const handleClick = useCallback((e?: React.SyntheticEvent) => {
    e?.preventDefault();
    e?.stopPropagation();
    toggleFavorite(id);
    setClicked(true);
    setTimeout(() => setClicked(false), 220);
  }, [id, toggleFavorite]);

  return (
    <div
      role="button"
      tabIndex={0}
      aria-pressed={fav}
      onClick={handleClick}
      onKeyDown={(e) => (e.key === 'Enter' || e.key === ' ') && handleClick(e)}
      className={`p-1 rounded-md cursor-pointer ${clicked ? 'glow' : ''}`}
    >
      {fav ? '⭐️' : '☆'}
    </div>
  );
}