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
            className={`relative flex flex-col items-center justify-end w-16 
                        text-[10px] select-none touch-manipulation
                        ${isActive ? 'text-[#EBDEC8]' : 'text-[#665d61] hover:text-white'}`}
            draggable={false}
            style={{
              WebkitTapHighlightColor: 'transparent',
              WebkitTouchCallout: 'none',
              WebkitUserSelect: 'none',
            }}
          >
            {/* Аура вынесена сюда */}
            <div
              className={`absolute -inset-4 rounded-full blur-xl
                          bg-gradient-to-tr from-[#EC1C3B]/60 to-[#3b82f6]/30
                          transition-opacity duration-200 pointer-events-none
                          ${isActive ? 'opacity-100' : 'opacity-0'}`}
            />

            {/* Контент */}
            <div className="relative z-10 flex flex-col items-center translate-y-1">
              {/* Иконка */}
              <img
                src={icon}
                alt={label}
                className={`w-6 h-6 transition-[filter] duration-200
                            ${isActive
                              ? 'filter brightness-0 invert sepia hue-rotate-[330deg] saturate-500'
                              : ''}`}
                draggable={false}
              />
              {/* Подпись */}
              <span className="mt-[2px] transition-colors duration-200">
                {label}
              </span>
            </div>
          </Link>
        );
      })}
    </nav>
  );
}
