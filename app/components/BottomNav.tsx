'use client';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

export default function BottomNav() {
  const currentPath = usePathname();

  // === Настройки ауры (крути тут) =========================
  const AURA_RING_INSET = 'inset-0';          // было inset-0 — не зажимает
  const AURA_RING_BLUR  = 'blur-lg';          // blur-sm | blur-md | blur-lg | blur-xl
  const AURA_RING_FROM  = 'from-[#EC1C3B]/60';// прозрачность 0–100
  const AURA_RING_TO    = 'to-[#3b82f6]/30';

  const AURA_BOTTOM_W   = 'w-10';             // ширина нижнего пятна
  const AURA_BOTTOM_H   = 'h-5';              // высота нижнего пятна
  const AURA_BOTTOM_Y   = '-bottom-1';        // насколько «сползает» вниз
  const AURA_BOTTOM_BLUR= 'blur-xl';          // сильная дымка
  const AURA_BOTTOM_BG  = 'bg-[#991428]/22';  // прозрачность нижней дымки
  // =========================================================

  const links = [
    { label: 'Главная',   href: '/',         icon: '/icons/home.svg' },
    { label: 'О клубе',   href: '/about',    icon: '/icons/about.svg' },
    { label: 'Избранное', href: '/favorites',icon: '/icons/star.svg' },
  ];

  return (
    <nav
      className="fixed bottom-0 left-0 w-full h-20 z-50 px-2 pt-0.5 pb-6
                 flex justify-around items-end
                 bg-gradient-to-b from-black/50 to-black/20
                 backdrop-blur-lg border-t border-white/10"
    >
      {links.map(({ label, href, icon }) => {
        const isActive = currentPath === href;

        return (
          <Link
            key={label}
            href={href}
            className={`flex flex-col items-center justify-end w-16
                        text-[10px] select-none touch-manipulation
                        transition-colors duration-300
                        ${isActive ? 'text-[#EBDEC8]' : 'text-[#665d61] hover:text-white'}`}
            draggable={false}
            style={{
              WebkitTapHighlightColor: 'transparent',
              WebkitTouchCallout: 'none',
              WebkitUserSelect: 'none',
            }}
          >
            <div className="relative w-10 h-10 flex items-center justify-center transition-all duration-300">
              {/* Палочка сверху */}
              <div
                className={`absolute -top-1 left-1/2 -translate-x-1/2 w-5 h-1.5 rounded-t-xl 
                            bg-[#991428] z-20 transition-opacity duration-300
                            ${isActive ? 'opacity-100' : 'opacity-0'}`}
              />
              {/* Круговая подсветка (не обрезается, потому что inset-0 и без ограничений) */}
              <div
                className={`absolute ${AURA_RING_INSET} rounded-full ${AURA_RING_BLUR}
                            bg-gradient-to-tr ${AURA_RING_FROM} ${AURA_RING_TO}
                            transition-opacity duration-300
                            ${isActive ? 'opacity-100' : 'opacity-0'}`}
              />
              {/* Нижняя дымка (вынесена за границы вниз минус-отступом) */}
              <div
                className={`absolute ${AURA_BOTTOM_Y} left-1/2 -translate-x-1/2
                            ${AURA_BOTTOM_W} ${AURA_BOTTOM_H} ${AURA_BOTTOM_BG}
                            rounded-full ${AURA_BOTTOM_BLUR} z-0
                            transition-opacity duration-300
                            ${isActive ? 'opacity-100' : 'opacity-0'}`}
              />
              {/* Иконка */}
              <img
                src={icon}
                alt={label}
                className={`w-5 h-5 relative z-10 transition-[filter] duration-300
                            ${isActive ? 'filter brightness-0 invert sepia hue-rotate-[330deg] saturate-500' : ''}`}
                draggable={false}
              />
            </div>
            <span className="mt-[2px]">{label}</span>
          </Link>
        );
      })}
    </nav>
  );
}
