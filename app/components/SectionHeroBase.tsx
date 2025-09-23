'use client';

import { motion } from 'framer-motion';

export type HeroViewProps = {
  imageSrc: string;
  title: string;
  subtitle?: string;
  description?: string;
};

export default function SectionHeroBase({
  imageSrc,
  title,
  subtitle,
  description,
}: HeroViewProps) {
  return (
    <motion.section
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="relative w-full overflow-hidden rounded-3xl shadow-xl"
    >
      <img src={imageSrc} alt="" className="absolute inset-0 h-full w-full object-cover" />
      <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent" />

      <div className="relative z-10 px-5 sm:px-7 md:px-8 py-8 sm:py-10 md:py-12">
        <div className="max-w-3xl">
          <h1 className="font-bebas text-white text-5xl sm:text-6xl leading-none tracking-wide drop-shadow-[0_2px_8px_rgba(0,0,0,0.7)]">
            {title}
          </h1>
          {subtitle && (
            <p className="mt-2 font-bebas text-white text-3xl sm:text-4xl leading-none drop-shadow-[0_2px_8px_rgba(0,0,0,0.7)]">
              {subtitle}
            </p>
          )}
          {description && (
            <p className="mt-4 text-white/90 text-base sm:text-lg leading-relaxed drop-shadow-[0_2px_8px_rgba(0,0,0,0.6)]">
              {description}
            </p>
          )}
        </div>
      </div>

      {/* адаптивная высота — ~28–40% от ширины */}
      <div className="pt-[38%] sm:pt-[34%] md:pt-[28%]" />
    </motion.section>
  );
}
