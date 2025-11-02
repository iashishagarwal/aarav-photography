'use client';

import { motion, useScroll, useTransform } from 'framer-motion';
import { ModeToggle } from '@/components/ModeToggle';
import { ThemeToggle } from '@/components/ThemeToggle';

export function FloatingControlRail() {
  const { scrollYProgress } = useScroll();
  const opacity = useTransform(scrollYProgress, [0.05, 0.15], [0, 1]);
  const translateY = useTransform(scrollYProgress, [0.05, 0.25], [30, 0]);

  return (
    <motion.aside
      className="fixed bottom-8 right-5 z-40 flex flex-col items-center gap-1.5 rounded-[22px] border border-slate-300 bg-white/80 p-2.5 text-slate-700 shadow-[0_18px_45px_-26px_rgba(15,23,42,0.35)] backdrop-blur-xl transition-colors duration-500 dark:border-white/10 dark:bg-obsidian/80 dark:text-mist dark:shadow-[0_18px_45px_-26px_rgba(8,11,22,0.55)] sm:right-9"
      style={{ opacity, y: translateY }}
    >
      <ModeToggle />
      <ThemeToggle />
    </motion.aside>
  );
}
