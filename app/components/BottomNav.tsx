'use client';

import { usePathname } from 'next/navigation';

export default function BottomNav() {
  const currentPath = usePathname();

  const links = [
    { label: 'домой', href: '/', icon: '/icons/home.svg' },
    { label: 'о клубе', href: '/about', icon: '/icons/about.svg' },
    { label: 'избранное', href: '/favorites', icon: '/icons/star.svg' },
  ];

  return (
    <nav className="fixed bottom-0 left-0 w-full bg-black flex justify-around items-center h-32 z-50">
      {links.map(({ label, href, icon }) => {
        const isActive = currentPath === href;

        return (
          <a
            key={label}
            href={href}
            className={`flex flex-col items-center text-xs transition-all duration-300 ease-in-out ${
              isActive ? 'text-[#EBDEC8]' : 'text-[#665d61] hover:text-white'
            }`}
          >
            <div className="relative w-12 h-12 flex items-center justify-center transition-all duration-300 ease-in-out">
              {/* Палочка сверху */}
              <div
                className={`absolute -top-2 left-1/2 -translate-x-1/2 w-10 h-2 rounded-t-xl bg-[#991428] z-20 transition-all duration-300 ease-in-out ${
                  isActive ? 'opacity-100' : 'opacity-0'
                }`}
              ></div>

              {/* Градиентная подсветка */}
              <div
                className={`absolute inset-0 rounded-full blur-lg bg-gradient-to-tr from-[#EC1C3B]/70 to-[#3b82f6]/30 transition-opacity duration-300 ease-in-out ${
                  isActive ? 'opacity-100' : 'opacity-0'
                }`}
              ></div>

              {/* Светящаяся аура снизу */}
              <div
                className={`absolute -bottom-1 left-1/2 -translate-x-1/2 w-14 h-6 bg-[#991428]/20 rounded-full blur-xl z-0 transition-opacity duration-300 ease-in-out ${
                  isActive ? 'opacity-100' : 'opacity-0'
                }`}
              ></div>

              {/* Иконка */}
              <img
                src={icon}
                alt={label}
                className={`w-5 h-5 relative z-10 transition-all duration-300 ease-in-out ${
                  isActive
                    ? 'filter brightness-0 invert sepia hue-rotate-[330deg] saturate-500'
                    : ''
                }`}
              />
            </div>
            <span className="mt-0.5 transition-all duration-300 ease-in-out">{label}</span>
          </a>
        );
      })}
    </nav>
  );
}
