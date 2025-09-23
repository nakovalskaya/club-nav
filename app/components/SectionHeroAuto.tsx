'use client';

import { usePathname } from 'next/navigation';
import { getHeroForPath } from '../lib/heroConfig';
import SectionHeroBase from './SectionHeroBase';

export default function SectionHeroAuto() {
  const pathname = usePathname();
  const hero = getHeroForPath(pathname);

  if (!hero) return null; // если в конфиге ничего не задано для этой страницы

  return (
    <SectionHeroBase
      imageSrc={hero.imageSrc}
      title={hero.title}
      subtitle={hero.subtitle}
      description={hero.description}
    />
  );
}
