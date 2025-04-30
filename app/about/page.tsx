'use client';

import { useEffect, useState } from 'react';
import LoadingWrapper from '../components/LoadingWrapper';

export default function AboutPage() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setTimeout(() => setLoading(false), 1000);
  }, []);

  return (
    <LoadingWrapper isLoading={loading}>
      <main className="min-h-screen bg-black text-[#EBDEC8] p-4 pb-24 text-sm">
        <h1 className="text-xl font-semibold mb-4">О клубе</h1>
        <p>Раздел пока в разработке...</p>
      </main>
    </LoadingWrapper>
  );
}