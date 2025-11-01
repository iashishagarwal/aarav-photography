'use client';

import { useTheme } from 'next-themes';
import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Moon, Sun } from 'lucide-react';

export function ThemeToggle() {
  const { theme, setTheme, resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const currentTheme = (theme ?? resolvedTheme ?? 'dark') as 'light' | 'dark';

  const handleToggle = () => {
    setTheme(currentTheme === 'dark' ? 'light' : 'dark');
  };

  return (
    <motion.button
      type="button"
      onClick={handleToggle}
      className="group relative flex h-11 w-11 items-center justify-center rounded-full border border-black/10 bg-white/80 text-black/70 shadow-[0_8px_20px_-12px_rgba(8,9,10,0.45)] transition duration-200 hover:border-black/30 hover:text-black dark:border-white/15 dark:bg-white/[0.08] dark:text-white/70 dark:hover:border-white/35 dark:hover:text-white"
      whileTap={{ scale: 0.92 }}
      aria-label="Toggle color theme"
    >
      {mounted ? (
        <motion.span
          key={currentTheme}
          initial={{ scale: 0.75, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.18, ease: 'easeOut' }}
          className="relative z-20 transition-colors"
        >
          {currentTheme === 'dark' ? (
            <Moon className="h-[18px] w-[18px]" strokeWidth={1.6} />
          ) : (
            <Sun className="h-[19px] w-[19px]" strokeWidth={1.5} />
          )}
        </motion.span>
      ) : null}
      <motion.span
        layoutId="rail-control-indicator-theme"
        className="pointer-events-none absolute inset-0 rounded-full border border-white/40 bg-white/20 backdrop-blur-[1px] dark:border-white/20 dark:bg-white/5"
        transition={{ type: 'spring', stiffness: 400, damping: 36 }}
      />
      <span className="pointer-events-none absolute inset-0 rounded-full bg-gradient-to-br from-white/70 via-transparent to-transparent opacity-0 transition duration-300 group-hover:opacity-100 dark:from-white/20" />
    </motion.button>
  );
}
