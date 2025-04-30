'use client';

export default function Loader() {
  return (
    <div className="flex gap-1 items-end">
      {[0, 1, 2].map(i => (
        <div
          key={i}
          className="w-1.5 h-5 bg-[#991428] rounded-full"
          style={{
            animation: 'loader-bars 0.8s ease-in-out infinite',
            animationDelay: `${i * 0.15}s`,
          }}
        />
      ))}
    </div>
  );
}