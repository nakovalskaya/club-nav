'use client'

import { useEffect } from 'react'

export default function Home() {
  useEffect(() => {
    // @ts-ignore
    if (typeof window !== 'undefined' && window.Telegram && window.Telegram.WebApp) {
      // @ts-ignore
      window.Telegram.WebApp.ready();
    }
  }, [])

  return (
    <main className="bg-black text-white min-h-screen p-6">
      <h1 className="text-2xl font-bold mb-6">Навигация клуба</h1>

      <div className="space-y-4">
        <div className="bg-gray-800 rounded-xl p-4">📚 Эфиры</div>
        <div className="bg-gray-800 rounded-xl p-4">📁 Материалы</div>
        <div className="bg-gray-800 rounded-xl p-4">✅ Пройденное</div>
        <div className="bg-gray-800 rounded-xl p-4">⭐ Избранное</div>
      </div>
    </main>
  )
}
