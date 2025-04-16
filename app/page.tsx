'use client';
import { useEffect } from 'react';

// ✅ Добавляем расширение глобального объекта window
declare global {
  interface Window {
    Telegram?: {
      WebApp?: {
        ready: () => void;
      };
    };
  }
}

export default function Home() {
  useEffect(() => {
    if (typeof window !== 'undefined' && window.Telegram?.WebApp) {
      window.Telegram.WebApp.ready();
    }
  }, []);

  return (
    <main className="min-h-screen bg-black text-white font-sans p-4">
      {/* Карточка */}
      <div className="bg-[#EFE0BF] text-black rounded-2xl p-4 mb-20">
        <img
          src="/cover.jpg"
          alt="Ноль справа"
          className="w-full rounded-2xl mb-4"
        />
        <p className="text-sm leading-snug mb-4">
          Приглашаю вас на мою авторскую программу для предпринимателей о том, как масштабировать бизнес
        </p>
        <p className="font-bold text-base mb-4">
          Длительность<br />2 месяца
        </p>
        <a
          href="https://t.me/nakovalskaa/470"
          target="_blank"
          rel="noopener noreferrer"
          className="bg-black text-white rounded-xl py-2 px-4 font-semibold block text-center"
        >
          Оставить заявку
        </a>
      </div>

      {/* Нижняя навигация */}
      <nav className="fixed bottom-0 left-0 right-0 bg-[#0A1A1A] flex justify-around items-center p-2">
        <NavButton icon="▶️" label="Видео" active />
        <NavButton icon="📍" label="События" />
        <NavButton icon="👤" label="Главная" center />
        <NavButton icon="🤍" label="Польза" />
        <NavButton icon="➕" label="Пойнты" />
      </nav>
    </main>
  );
}

function NavButton({ icon, label, active = false, center = false }) {
  return (
    <div className={`flex flex-col items-center text-xs ${center ? 'scale-125' : ''}`}>
      <div className={`text-xl ${active ? 'text-blue-400' : ''}`}>{icon}</div>
      <div className={active ? 'text-blue-400' : ''}>{label}</div>
    </div>
  );
}