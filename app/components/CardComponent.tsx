'use client';

import FavoriteButton from './FavoriteButton';
import type { Card } from '../data/allCards';
import { useEffect } from 'react';

type Props = { card: Card };

export default function CardComponent({ card }: Props) {
  const { type, icon, image, duration, title, description, link } = card;

  useEffect(() => {
    if (typeof window !== 'undefined' && 'Telegram' in window) {
      // @ts-ignore
      window.Telegram.WebApp.ready?.();
    }
  }, []);

  const handleClick = () => {
    if (link && typeof window !== 'undefined') {
      // @ts-ignore
      window.Telegram.WebApp.openTelegramLink(link);
    }
  };

  const Wrapper = ({ children }: { children: React.ReactNode }) =>
    link ? (
      <div
        role="button"
        onClick={handleClick}
        className="block w-full text-left cursor-pointer"
      >
        {children}
      </div>
    ) : (
      <>{children}</>
    );

  return (
    <Wrapper>
      <div className="border border-[#EBDEC8] rounded-xl overflow-hidden relative bg-black">
        {/* ✨ Обновили: добавили stopPropagation */}
        <div
          className="absolute top-2 right-2 z-10"
          onClick={(e) => e.stopPropagation()}
        >
          <FavoriteButton id={card.id} />
        </div>

        {/* ВИДЕО: картинка + длительность (в левом нижнем углу) */}
        {type === 'video' && image && (
          <div className="relative w-full aspect-video overflow-hidden">
            <img
              src={image}
              alt={title}
              className="w-full h-full object-cover rounded-b-xl"
            />
            {duration && (
              <span className="absolute bottom-2 left-2 bg-[#991428] text-white text-[10px] px-2 py-0.5 rounded-full">
                {duration}
              </span>
            )}
          </div>
        )}

        {/* ПОДКАСТЫ И ГИДЫ: иконка + длительность под иконкой */}
        {type !== 'video' && (
          <div className="flex items-start gap-3 pl-2 pr-4 py-4">
            {icon && (
              <div className="flex flex-col items-center justify-start w-[44px]">
                <img src={icon} alt="" width={44} height={44} />
                {duration && (
                  <span className="text-[10px] text-[#EBDEC8] opacity-70 mt-1">
                    {duration}
                  </span>
                )}
              </div>
            )}
            <div className="flex-1 flex flex-col justify-center">
              <h3 className="text-base font-semibold">{title}</h3>
              <p className="text-sm text-[#a9a09b]">{description}</p>
            </div>
          </div>
        )}

        {/* Текстовое описание под видео */}
        {type === 'video' && (
          <div className="p-4">
            <h3 className="text-base font-semibold mb-1">{title}</h3>
            <p className="text-sm text-[#a9a09b]">{description}</p>
          </div>
        )}
      </div>
    </Wrapper>
  );
}
