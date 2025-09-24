'use client';
import { usePathname } from 'next/navigation';
import Link from 'next/link';

export default function BottomNav() {
  const currentPath = usePathname();
  const links = [
    { label: 'Главная', href: '/', icon: '/icons/home.svg' },
    { label: 'О клубе', href: '/about', icon: '/icons/about.svg' },
    { label: 'Избранное', href: '/favorites', icon: '/icons/star.svg' },
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
                        ${isActive ? 'text-[#EBDEC8]' : 'text-[#665d61] hover:text-white'}`}
            draggable={false}
            style={{
              WebkitTapHighlightColor: 'transparent',
              WebkitTouchCallout: 'none',
              WebkitUserSelect: 'none',
            }}
          >
            <div className="relative w-10 h-10 flex items-center justify-center translate-y-1 overflow-visible">
              {/* Градиентная подсветка */}
              <div
                className={`absolute inset-1 rounded-full blur-md
                            bg-gradient-to-tr from-[#EC1C3B]/70 to-[#3b82f6]/30
                            transition-opacity duration-200
                            ${isActive ? 'opacity-100' : 'opacity-0'}`}
              />
              {/* Светящаяся аура снизу */}
              <div
                className={`absolute bottom-0 left-1/2 -translate-x-1/2 
                            w-6 h-2 bg-[#991428]/20 rounded-full blur-sm z-0
                            transition-opacity duration-200
                            ${isActive ? 'opacity-100' : 'opacity-0'}`}
              />
              {/* Иконка фиксированного размера */}
              <img
                src={icon}
                alt={label}
                className={`w-5 h-5 relative z-10
                            transition-[filter] duration-200
                            ${isActive
                              ? 'filter brightness-0 invert sepia hue-rotate-[330deg] saturate-500'
                              : ''}`}
                draggable={false}
              />
            </div>
            {/* Подпись — только цвет меняется */}
            <span className="mt-[2px] transition-colors duration-200">
              {label}
            </span>
          </Link>
        );
      })}
    </nav>
  );
}