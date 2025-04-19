import { cards as efiryCards } from '../efiry/cards';
import { cards as podcastyCards } from '../podcasty/cards';
import { cards as kursyCards } from '../kursy/cards';
import { cards as gidyCards } from '../gidy/cards';
import { cards as prodazhiCards } from '../prodazhi/cards';
import { cards as voronkiCards } from '../voronki/cards';
import { cards as instagramCards } from '../instagram/cards';
import { cards as telegramCards } from '../telegram/cards';
import { cards as threadsCards } from '../threads/cards';
import { cards as nejrosetiCards } from '../nejroseti/cards';
import { cards as reelsCards } from '../reels/cards';

export type Card = {
  id: string;
  title: string;
  description: string;
  recommended?: boolean;
};

export const allCards: Card[] = [
  ...efiryCards,
  ...podcastyCards,
  ...kursyCards,
  ...gidyCards,
  ...prodazhiCards,
  ...voronkiCards,
  ...instagramCards,
  ...telegramCards,
  ...threadsCards,
  ...nejrosetiCards,
  ...reelsCards,
];