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
      className="fixed bottom-8 right-6 z-40 flex flex-col gap-3 rounded-[30px] border border-black/10 bg-white/80 p-3 text-charcoal backdrop-blur-xl shadow-soft-xl transition-colors duration-500 dark:border-white/10 dark:bg-black/60 dark:text-white sm:right-10"
      style={{ opacity, y: translateY }}
    >
      <ModeToggle />
      <AmbientAudioToggle />
      <ThemeToggle />
    </motion.aside>
  );
}
