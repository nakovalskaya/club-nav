'use client';

import { useFavorites } from '../hooks/useFavorites';
import FavoriteButton from '../components/FavoriteButton';

import * as efiryModule from '../efiry/cards';
import * as podcastyModule from '../podcasty/cards';
import * as kursyModule from '../kursy/cards';
import * as gidyModule from '../gidy/cards';
import * as prodazhiModule from '../prodazhi/cards';
import * as voronkiModule from '../voronki/cards';
import * as instagramModule from '../instagram/cards';
import * as telegramModule from '../telegram/cards';
import * as threadsModule from '../threads/cards';
import * as nejrosetiModule from '../nejroseti/cards';
import * as reelsModule from '../reels/cards';

const allCards = [
  ...efiryModule.cards,
  ...podcastyModule.cards,
  ...kursyModule.cards,
  ...gidyModule.cards,
  ...prodazhiModule.cards,
  ...voronkiModule.cards,
  ...instagramModule.cards,
  ...telegramModule.cards,
  ...threadsModule.cards,
  ...nejrosetiModule.cards,
  ...reelsModule.cards,
];

export default function FavoritesPage() {
  const { favorites } = useFavorites();
  const saved = allCards.filter((item) => favorites.includes(item.id));

  return (
    <main className="min-h-screen bg-black text-[#EBDEC8] p-4">
      <h1 className="text-xl font-semibold mb-4">Избранное</h1>

      {saved.length === 0 ? (
        <p className="text-sm text-[#9e948f]">Пока пусто. Добавь что-нибудь ⭐️</p>
      ) : (
        <div className="space-y-4">
          {saved.map((item) => (
            <div key={item.id} className="border border-[#EBDEC8] p-4 rounded-xl relative">
              <FavoriteButton id={item.id} />
              <h2 className="text-lg font-semibold mb-1">{item.title}</h2>
              <p className="text-sm text-[#9e948f]">{item.description}</p>
            </div>
          ))}
        </div>
      )}
    </main>
  );
}
