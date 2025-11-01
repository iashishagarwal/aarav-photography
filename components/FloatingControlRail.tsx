'use client';

import { motion, useScroll, useTransform } from 'framer-motion';
import { ModeToggle } from '@/components/ModeToggle';
import { AmbientAudioToggle } from '@/components/audio/AmbientAudioToggle';
import { ThemeToggle } from '@/components/ThemeToggle';

export function FloatingControlRail() {
  const { scrollYProgress } = useScroll();
  const opacity = useTransform(scrollYProgress, [0.05, 0.15], [0, 1]);
  const translateY = useTransform(scrollYProgress, [0.05, 0.25], [30, 0]);

  return (
    <motion.aside
      className="fixed bottom-8 right-5 z-40 flex flex-col items-center gap-1.5 rounded-[22px] border border-white/40 bg-white/60 p-2.5 text-charcoal backdrop-blur-xl shadow-[0_18px_35px_-22px_rgba(8,9,10,0.55)] transition-colors duration-500 dark:border-white/20 dark:bg-white/[0.08] dark:text-white sm:right-9"
      style={{ opacity, y: translateY }}
    >
      <ModeToggle />
      <AmbientAudioToggle />
      <ThemeToggle />
    </motion.aside>
  );
}
