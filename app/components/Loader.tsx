'use client';

export default function Loader() {
  return (
    <div className="flex gap-2">
      <div className="w-4 h-4 bg-[#991428] rounded-full animate-bounce [animation-delay:-0.3s]" />
      <div className="w-4 h-4 bg-[#991428] rounded-full animate-bounce [animation-delay:-0.15s]" />
      <div className="w-4 h-4 bg-[#991428] rounded-full animate-bounce" />
    </div>
  );
}