
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
  type: 'video' | 'podcast' | 'guide';
  category?: 'efiry' | 'gidy' | 'podcasty' | 'kursy';
  image?: string;
  icon?: string;
  duration?: string;
  recommended?: boolean;
};

export const allCards: Card[] = [
  ...prodazhiCards,
  ...voronkiCards,
  ...instagramCards,
  ...telegramCards,
  ...threadsCards,
  ...nejrosetiCards,
  ...reelsCards,
];