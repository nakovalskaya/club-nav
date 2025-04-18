'use client';
import { useRouter } from 'next/navigation';

export default function PodcastyPage() {
  const router = useRouter();

  return (
    <main className="min-h-screen bg-black text-[#EBDEC8] p-4">
      <button onClick={() => router.back()} className="mb-4">
        <img src="/back.svg" alt="Назад" className="w-6 h-6" />
      </button>
      <p>Раздел пока в разработке...</p>
    </main>
  );
}
